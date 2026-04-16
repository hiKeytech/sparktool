import { Router } from "express";
import type { QuizAnswer } from "sparktool-contracts/quiz";

import { activityLogRepository } from "../repositories/activity-log-repository.js";
import { quizAttemptRepository } from "../repositories/quiz-attempt-repository.js";
import { quizRepository } from "../repositories/quiz-repository.js";
import { userRepository } from "../repositories/user-repository.js";
import { getActorFromSession, httpError } from "../lib/request-helpers.js";
import { requireTenantSession } from "../middleware/session.js";

export const quizAttemptsRouter = Router();

/** GET /api/quiz-attempts */
quizAttemptsRouter.get("/", requireTenantSession, async (request, response) => {
  const { studentId, quizId, courseId } = request.query as Record<
    string,
    string
  >;
  const actor = await getActorFromSession(request);
  if (!actor) throw httpError(401, "Unauthorized");

  if (quizId) {
    return response.json(await quizAttemptRepository.list({ quizId }));
  }
  if (courseId) {
    return response.json(await quizAttemptRepository.list({ courseId }));
  }
  if (studentId) {
    const targetId = studentId === "me" ? actor.id : studentId;
    return response.json(
      await quizAttemptRepository.list({ studentId: targetId }),
    );
  }

  response.json([]);
});

/** POST /api/quiz-attempts */
quizAttemptsRouter.post(
  "/",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    if (!actor) throw httpError(401, "Unauthorized");

    const tenantId = request.session.activeTenantId!;
    const { courseId, quizId, studentId } = request.body as {
      courseId?: string;
      quizId?: string;
      studentId?: string;
    };

    if (!quizId || !studentId || !courseId) {
      throw httpError(400, "courseId, quizId, and studentId are required.");
    }

    const quiz = await quizRepository.getById(quizId);
    if (!quiz) throw httpError(404, "Quiz not found.");
    const questions = quiz.questions ?? [];

    const existingAttempts = await quizAttemptRepository.list({
      quizId,
      studentId,
    });
    const inProgressAttempt = existingAttempts.find(
      (attempt) => !attempt.completedAt,
    );

    if (inProgressAttempt) {
      return response.status(200).json({
        id: inProgressAttempt.id,
        passed: inProgressAttempt.passed,
        score: inProgressAttempt.score,
      });
    }

    const attemptNumber = await quizAttemptRepository.nextAttemptNumber({
      quizId,
      studentId,
    });
    const totalPoints = questions.reduce((sum, q) => sum + (q.points ?? 1), 0);

    const created = await quizAttemptRepository.create({
      answers: [],
      attemptNumber,
      courseId,
      correctAnswers: 0,
      passed: false,
      percentage: 0,
      quizId,
      score: 0,
      startedAt: Date.now(),
      studentId,
      tenantId,
      timeSpent: 0,
      totalPoints,
      totalQuestions: questions.length,
    });
    if (!created) throw httpError(500, "Failed to start quiz attempt.");

    response.status(201).json({ id: created.id, passed: false, score: 0 });
  },
);

/** PATCH /api/quiz-attempts/:attemptId */
quizAttemptsRouter.patch(
  "/:attemptId",
  requireTenantSession,
  async (request, response) => {
    const attempt = await quizAttemptRepository.getById(
      request.params.attemptId as string,
    );
    if (!attempt) throw httpError(404, "Quiz attempt not found.");

    const quiz = await quizRepository.getById(attempt.quizId);
    if (!quiz) throw httpError(404, "Quiz not found.");

    const rawAnswers =
      (request.body.rawAnswers as
        | Record<string, number | string>
        | undefined) ??
      Object.fromEntries(
        ((request.body.answers as QuizAnswer[] | undefined) ?? []).map(
          (answer) => [answer.questionId, answer.answer],
        ),
      );

    const gradedAttempt = gradeQuizAttempt({
      quiz,
      rawAnswers,
      timeSpent: request.body.timeSpent as number | undefined,
    });

    const updated = await quizAttemptRepository.update(
      request.params.attemptId as string,
      {
        answers: gradedAttempt.answers,
        completedAt:
          (request.body.completedAt as number | undefined) ?? Date.now(),
        correctAnswers: gradedAttempt.correctAnswers,
        passed: gradedAttempt.passed,
        percentage: gradedAttempt.percentage,
        score: gradedAttempt.score,
        timeSpent: gradedAttempt.timeSpent,
        totalPoints: gradedAttempt.totalPoints,
        totalQuestions: gradedAttempt.totalQuestions,
      },
    );
    if (!updated) throw httpError(500, "Failed to update quiz attempt.");

    void syncStudentQuizMetrics({
      courseId: attempt.courseId,
      passed: gradedAttempt.passed,
      score: gradedAttempt.score,
      studentId: attempt.studentId,
      tenantId: attempt.tenantId ?? request.session.activeTenantId!,
    });

    void activityLogRepository.create({
      action: "quiz_attempted",
      courseId: attempt.courseId,
      passed: gradedAttempt.passed,
      quizId: attempt.quizId,
      score: gradedAttempt.score,
      tenantId: attempt.tenantId ?? request.session.activeTenantId!,
      userId: attempt.studentId,
    });

    response.json({
      id: updated.id,
      passed: gradedAttempt.passed,
      percentage: gradedAttempt.percentage,
      score: gradedAttempt.score,
    });
  },
);

function gradeQuizAttempt(input: {
  quiz: NonNullable<Awaited<ReturnType<typeof quizRepository.getById>>>;
  rawAnswers: Record<string, number | string>;
  timeSpent?: number;
}) {
  const questions = input.quiz.questions ?? [];
  let correctAnswers = 0;
  let earnedPoints = 0;

  const answers: QuizAnswer[] = questions.flatMap((question) => {
    const submitted = input.rawAnswers[question.id];
    if (submitted === undefined) {
      return [];
    }

    const isCorrect = submitted === question.correctAnswer;
    const pointsEarned = isCorrect ? (question.points ?? 1) : 0;

    if (isCorrect) {
      correctAnswers += 1;
      earnedPoints += pointsEarned;
    }

    return [
      {
        answer: submitted,
        isCorrect,
        pointsEarned,
        questionId: question.id,
      },
    ];
  });

  const totalPoints = questions.reduce((sum, question) => {
    return sum + (question.points ?? 1);
  }, 0);
  const totalQuestions = questions.length;
  const percentage =
    totalPoints > 0 ? Math.round((earnedPoints / totalPoints) * 100) : 0;

  return {
    answers,
    correctAnswers,
    passed: percentage >= (input.quiz.passingScore ?? 70),
    percentage,
    score: earnedPoints,
    timeSpent: input.timeSpent ?? 0,
    totalPoints,
    totalQuestions,
  };
}

// ─── helper ──────────────────────────────────────────────────────────────────

async function syncStudentQuizMetrics(input: {
  courseId: string;
  passed: boolean;
  score: number;
  studentId: string;
  tenantId: string;
}) {
  try {
    const user = await userRepository.getById(input.studentId);
    if (!user) return;

    const allAttempts = await quizAttemptRepository.list({
      studentId: input.studentId,
    });
    const courseAttempts = allAttempts.filter(
      (a) => a.courseId === input.courseId && a.passed,
    );
    const quizzesPassed = new Set(courseAttempts.map((a) => a.quizId)).size;

    const totalScore = allAttempts.reduce((sum, a) => sum + (a.score ?? 0), 0);
    const averageQuizScore =
      allAttempts.length > 0 ? Math.round(totalScore / allAttempts.length) : 0;

    await userRepository.update(input.studentId, {
      averageQuizScore,
      quizzesPassed,
    });
  } catch {
    // fire-and-forget — do not surface errors
  }
}
