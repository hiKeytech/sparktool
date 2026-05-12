import { randomUUID } from "node:crypto";

import {
  aiChatRequestSchema,
  aiDocumentLookupSchema,
  aiChatThreadLookupSchema,
  createAiDocumentInputSchema,
  type AiPracticeQuizQuestion,
  generateAiPracticeQuizInputSchema,
  submitAiPracticeQuizInputSchema,
  type AiPracticeQuizResult,
} from "sparktool-contracts/ai";
import { Router } from "express";

import { aiService } from "../lib/ai-service.js";
import { parseUploadedDocument } from "../lib/ai-document-service.js";
import {
  getActorFromSession,
  httpError,
  userHasTenantAccess,
} from "../lib/request-helpers.js";
import { requireTenantSession } from "../middleware/session.js";
import { aiDocumentRepository } from "../repositories/ai-document-repository.js";
import { aiChatThreadRepository } from "../repositories/ai-chat-thread-repository.js";
import { aiPracticeSessionRepository } from "../repositories/ai-practice-session-repository.js";
import { courseLessonRepository } from "../repositories/course-lesson-repository.js";
import { courseRepository } from "../repositories/course-repository.js";

export const aiRouter = Router();

function assertStudentAccess(
  actor: Awaited<ReturnType<typeof getActorFromSession>>,
) {
  if (!actor) {
    throw httpError(401, "Unauthorized");
  }

  if (actor.role !== "student" && actor.role !== "super-admin") {
    throw httpError(403, "Only students can use AI study features.");
  }

  return actor;
}

async function assertCourseAccess(input: {
  actor: NonNullable<Awaited<ReturnType<typeof getActorFromSession>>>;
  courseId: string;
  lessonId?: null | string;
  tenantId: string;
}) {
  const course = await courseRepository.getById(input.courseId);

  if (!course) {
    throw httpError(404, "Course not found.");
  }

  if (course.tenantId !== input.tenantId) {
    throw httpError(403, "Course does not belong to the current tenant.");
  }

  if (!userHasTenantAccess(input.actor, input.tenantId)) {
    throw httpError(403, "You do not have access to this tenant.");
  }

  if (input.lessonId) {
    const lesson = await courseLessonRepository.getById(input.lessonId);

    if (!lesson || lesson.courseId !== input.courseId) {
      throw httpError(404, "Lesson not found for the selected course.");
    }
  }

  return course;
}

async function loadAccessibleDocuments(input: {
  documentIds: string[];
  studentId: string;
  tenantId: string;
}) {
  const documents = await Promise.all(
    input.documentIds.map((documentId) =>
      aiDocumentRepository.getById(documentId),
    ),
  );

  return documents.map((document, index) => {
    if (!document) {
      throw httpError(
        404,
        `Uploaded document ${input.documentIds[index]} not found.`,
      );
    }

    if (
      document.studentId !== input.studentId ||
      document.tenantId !== input.tenantId
    ) {
      throw httpError(
        403,
        "You cannot use another student's uploaded document.",
      );
    }

    return document;
  });
}

function gradePracticeQuiz(input: {
  answers: Map<string, string>;
  questions: AiPracticeQuizQuestion[];
}) {
  const items = input.questions.map((question) => {
    const selectedOptionId = input.answers.get(question.id) ?? null;
    const isCorrect = selectedOptionId === question.correctOptionId;

    return {
      correctOptionId: question.correctOptionId,
      explanation: question.explanation,
      isCorrect,
      questionId: question.id,
      selectedOptionId,
    };
  });

  const correctAnswers = items.filter((item) => item.isCorrect).length;
  const totalQuestions = input.questions.length;
  const percentage =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  let feedbackSummary = "Keep practicing to strengthen this topic.";

  if (percentage >= 85) {
    feedbackSummary = "Strong result. You are ready for a harder revision set.";
  } else if (percentage >= 60) {
    feedbackSummary =
      "Good progress. Review the missed explanations, then try another round.";
  }

  return {
    correctAnswers,
    feedbackSummary,
    items,
    percentage,
    totalQuestions,
  } satisfies AiPracticeQuizResult;
}

aiRouter.get("/health", requireTenantSession, async (_request, response) => {
  try {
    aiService.assertConfigured();
    response.json({ configured: true, status: "ok" });
  } catch (error) {
    response.status((error as { status?: number }).status ?? 503).json({
      configured: false,
      error:
        (error as { message?: string }).message ??
        "AI features are unavailable.",
      status: "unavailable",
    });
  }
});

aiRouter.get("/documents", requireTenantSession, async (request, response) => {
  const actor = assertStudentAccess(await getActorFromSession(request));
  const tenantId = request.session.activeTenantId!;
  const filters = aiDocumentLookupSchema.parse({
    courseId: (request.query.courseId as string | undefined) ?? null,
    lessonId: (request.query.lessonId as string | undefined) ?? null,
  });

  if (filters.courseId) {
    await assertCourseAccess({
      actor,
      courseId: filters.courseId,
      lessonId: filters.lessonId,
      tenantId,
    });
  }

  const documents = await aiDocumentRepository.listByStudent({
    courseId: filters.courseId,
    lessonId: filters.lessonId,
    studentId: actor.id,
    tenantId,
  });

  response.json(documents.map(({ chunks: _chunks, ...document }) => document));
});

aiRouter.post("/documents", requireTenantSession, async (request, response) => {
  const actor = assertStudentAccess(await getActorFromSession(request));
  const tenantId = request.session.activeTenantId!;
  const input = createAiDocumentInputSchema.parse(request.body);

  if (input.courseId) {
    await assertCourseAccess({
      actor,
      courseId: input.courseId,
      lessonId: input.lessonId,
      tenantId,
    });
  }

  const parsedFile = await parseUploadedDocument(input.file);
  const timestamp = Date.now();
  const title = input.title?.trim() || input.file.name.replace(/\.[^.]+$/, "");

  const document = await aiDocumentRepository.create({
    bytes: parsedFile.bytes,
    chunks: parsedFile.chunks,
    courseId: input.courseId ?? null,
    createdAt: timestamp,
    lessonId: input.lessonId ?? null,
    mimeType: parsedFile.mimeType,
    name: input.file.name,
    sourceCount: parsedFile.sourceCount,
    studentId: actor.id,
    tenantId,
    title,
    updatedAt: timestamp,
  });

  const { chunks: _chunks, ...serialized } = document;
  response.status(201).json(serialized);
});

aiRouter.post(
  "/practice-quizzes",
  requireTenantSession,
  async (request, response) => {
    const actor = assertStudentAccess(await getActorFromSession(request));
    const tenantId = request.session.activeTenantId!;
    const input = generateAiPracticeQuizInputSchema.parse(request.body);

    await assertCourseAccess({
      actor,
      courseId: input.courseId,
      lessonId: input.lessonId,
      tenantId,
    });

    const generated = await aiService.generatePracticeQuiz(input);
    const session = await aiPracticeSessionRepository.create({
      answers: [],
      courseId: input.courseId,
      createdAt: Date.now(),
      difficulty: input.difficulty,
      lessonId: input.lessonId ?? null,
      questionCount: generated.questions.length,
      questions: generated.questions,
      status: "generated",
      studentId: actor.id,
      submittedAt: null,
      tenantId,
      title: generated.title,
    });

    response.status(201).json(session);
  },
);

aiRouter.get(
  "/practice-quizzes",
  requireTenantSession,
  async (request, response) => {
    const actor = assertStudentAccess(await getActorFromSession(request));
    const tenantId = request.session.activeTenantId!;
    const courseId = request.query.courseId as string | undefined;

    if (courseId) {
      await assertCourseAccess({
        actor,
        courseId,
        tenantId,
      });
    }

    const sessions = await aiPracticeSessionRepository.list({
      courseId,
      studentId: actor.id,
      tenantId,
    });

    response.json(sessions);
  },
);

aiRouter.get(
  "/practice-quizzes/:sessionId",
  requireTenantSession,
  async (request, response) => {
    const actor = assertStudentAccess(await getActorFromSession(request));
    const session = await aiPracticeSessionRepository.getById(
      request.params.sessionId as string,
    );

    if (!session) {
      throw httpError(404, "AI practice quiz session not found.");
    }

    if (session.studentId !== actor.id) {
      throw httpError(403, "You cannot access another student's AI session.");
    }

    response.json(session);
  },
);

aiRouter.post(
  "/practice-quizzes/:sessionId/submit",
  requireTenantSession,
  async (request, response) => {
    const actor = assertStudentAccess(await getActorFromSession(request));
    const submission = submitAiPracticeQuizInputSchema.parse(request.body);
    const session = await aiPracticeSessionRepository.getById(
      request.params.sessionId as string,
    );

    if (!session) {
      throw httpError(404, "AI practice quiz session not found.");
    }

    if (session.studentId !== actor.id) {
      throw httpError(403, "You cannot submit another student's AI session.");
    }

    const answers = new Map(
      submission.answers.map((answer) => [
        answer.questionId,
        answer.selectedOptionId,
      ]),
    );
    const result = gradePracticeQuiz({
      answers,
      questions: session.questions,
    });

    const updated = await aiPracticeSessionRepository.update(session.id, {
      answers: submission.answers,
      result,
      status: "completed",
      submittedAt: Date.now(),
    });

    response.json(updated);
  },
);

aiRouter.get("/chat", requireTenantSession, async (request, response) => {
  const actor = assertStudentAccess(await getActorFromSession(request));
  const tenantId = request.session.activeTenantId!;
  const lookup = aiChatThreadLookupSchema.parse({
    courseId: (request.query.courseId as string | undefined) ?? null,
    lessonId: (request.query.lessonId as string | undefined) ?? null,
  });

  if (lookup.courseId) {
    await assertCourseAccess({
      actor,
      courseId: lookup.courseId,
      lessonId: lookup.lessonId,
      tenantId,
    });
  }

  const thread = await aiChatThreadRepository.getLatestForStudent({
    courseId: lookup.courseId,
    lessonId: lookup.lessonId,
    studentId: actor.id,
    tenantId,
  });

  response.json(thread);
});

aiRouter.post("/chat", requireTenantSession, async (request, response) => {
  const actor = assertStudentAccess(await getActorFromSession(request));
  const tenantId = request.session.activeTenantId!;
  const input = aiChatRequestSchema.parse(request.body);

  if (input.courseId) {
    await assertCourseAccess({
      actor,
      courseId: input.courseId,
      lessonId: input.lessonId,
      tenantId,
    });
  }

  const existingThread = input.threadId
    ? await aiChatThreadRepository.getById(input.threadId)
    : await aiChatThreadRepository.getLatestForStudent({
        courseId: input.courseId,
        lessonId: input.lessonId,
        studentId: actor.id,
        tenantId,
      });

  if (
    existingThread &&
    (existingThread.studentId !== actor.id ||
      existingThread.tenantId !== tenantId)
  ) {
    throw httpError(403, "You cannot continue another student's AI chat.");
  }

  const userMessage = {
    content: input.message,
    createdAt: Date.now(),
    id: randomUUID(),
    role: "user" as const,
  };

  const assistantMessage = await aiService.answerChat({
    courseId: input.courseId,
    documents:
      input.documentIds.length > 0
        ? await loadAccessibleDocuments({
            documentIds: input.documentIds,
            studentId: actor.id,
            tenantId,
          })
        : [],
    lessonId: input.lessonId,
    message: input.message,
    previousMessages: [...(existingThread?.messages ?? []), userMessage],
  });

  const nextMessages = [
    ...(existingThread?.messages ?? []),
    userMessage,
    assistantMessage,
  ];
  const now = Date.now();

  const thread = existingThread
    ? await aiChatThreadRepository.update(existingThread.id, {
        messages: nextMessages,
        updatedAt: now,
      })
    : await aiChatThreadRepository.create({
        courseId: input.courseId ?? null,
        createdAt: now,
        lessonId: input.lessonId ?? null,
        messages: nextMessages,
        studentId: actor.id,
        tenantId,
        updatedAt: now,
      });

  response.status(201).json(thread);
});
