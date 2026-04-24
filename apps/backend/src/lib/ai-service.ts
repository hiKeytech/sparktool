import { randomUUID } from "node:crypto";
import type {
  AiChatMessage,
  AiDifficulty,
  AiPracticeQuizQuestion,
} from "sparktool-contracts/ai";
import {
  aiChatMessageSchema,
  aiPracticeQuizQuestionSchema,
} from "sparktool-contracts/ai";
import { serverEnv } from "../env.js";
import { selectRelevantDocumentChunks } from "./ai-document-service.js";
import { courseLessonRepository } from "../repositories/course-lesson-repository.js";
import { courseRepository } from "../repositories/course-repository.js";
import { courseSectionRepository } from "../repositories/course-section-repository.js";

type StructuredChatCompletionResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
    finishReason?: string;
  }>;
  error?: {
    message?: string;
  };
  promptFeedback?: {
    blockReason?: string;
  };
};

const GEMINI_GENERATE_CONTENT_URL = "/models";

function toFriendlyAiProviderError(input: {
  providerMessage?: string;
  responseStatus?: number;
}) {
  const message = (input.providerMessage ?? "").toLowerCase();

  if (
    input.responseStatus === 429 ||
    message.includes("rate limit") ||
    message.includes("quota") ||
    message.includes("resource has been exhausted")
  ) {
    return Object.assign(
      new Error(
        "AI is not available right now because the service is busy. Please try again in a few minutes.",
      ),
      { status: 503 },
    );
  }

  if (
    input.responseStatus === 503 ||
    input.responseStatus === 502 ||
    input.responseStatus === 504 ||
    message.includes("service unavailable") ||
    message.includes("temporarily unavailable") ||
    message.includes("backend error")
  ) {
    return Object.assign(
      new Error(
        "AI is not available right now. Please try again shortly.",
      ),
      { status: 503 },
    );
  }

  return null;
}

function ensureAiEnabled() {
  if (!serverEnv.AI_FEATURES_ENABLED || !serverEnv.GEMINI_API_KEY) {
    throw Object.assign(
      new Error(
        "AI features are not configured for this environment. Set AI_FEATURES_ENABLED and GEMINI_API_KEY.",
      ),
      { status: 503 },
    );
  }
}

function compactText(value: null | string | undefined, fallback = "") {
  return (value ?? fallback).replace(/\s+/g, " ").trim();
}

function clipText(value: string, maxLength: number) {
  return value.length > maxLength ? `${value.slice(0, maxLength)}...` : value;
}

async function buildCourseContext(input: {
  courseId: string;
  lessonId?: null | string;
}) {
  const course = await courseRepository.getById(input.courseId);

  if (!course) {
    throw Object.assign(new Error("Course not found."), { status: 404 });
  }

  const [sections, lessons] = await Promise.all([
    courseSectionRepository.listByCourse(input.courseId),
    courseLessonRepository.listByCourse(input.courseId),
  ]);

  const lessonBySection = new Map<string, typeof lessons>();

  for (const lesson of lessons) {
    const current = lessonBySection.get(lesson.sectionId) ?? [];
    current.push(lesson);
    lessonBySection.set(lesson.sectionId, current);
  }

  const relevantSections = input.lessonId
    ? sections.filter((section) =>
        (lessonBySection.get(section.id) ?? []).some(
          (lesson) => lesson.id === input.lessonId,
        ),
      )
    : sections;

  const relevantLessons = input.lessonId
    ? lessons.filter((lesson) => lesson.id === input.lessonId)
    : lessons;

  const sectionText = relevantSections
    .map((section, index) => {
      const sectionLessons = (lessonBySection.get(section.id) ?? []).filter(
        (lesson) => relevantLessons.some((candidate) => candidate.id === lesson.id),
      );
      const lessonText = sectionLessons
        .map((lesson, lessonIndex) => {
          const blocks = [
            `Lesson ${lessonIndex + 1}: ${compactText(lesson.title, "Untitled lesson")}`,
            compactText(lesson.description),
            compactText(lesson.content.textContent),
            compactText(lesson.content.transcript),
          ]
            .filter(Boolean)
            .map((value) => clipText(value, 1400));

          return blocks.join("\n");
        })
        .filter(Boolean)
        .join("\n\n");

      return [
        `Section ${index + 1}: ${compactText(section.title, "Untitled section")}`,
        compactText(section.description),
        lessonText,
      ]
        .filter(Boolean)
        .join("\n");
    })
    .filter(Boolean)
    .join("\n\n");

  const compiledContext = [
    `Course: ${compactText(course.title, "Untitled course")}`,
    compactText(course.shortDescription),
    compactText(course.description),
    (course.learningObjectives ?? []).length > 0
      ? `Learning objectives: ${(course.learningObjectives ?? []).join("; ")}`
      : "",
    (course.prerequisites ?? []).length > 0
      ? `Prerequisites: ${(course.prerequisites ?? []).join("; ")}`
      : "",
    sectionText,
  ]
    .filter(Boolean)
    .join("\n\n");

  return {
    compiledContext: clipText(compiledContext, 18000),
    course,
    lessons: relevantLessons,
    sections: relevantSections,
  };
}

async function createStructuredCompletion<T>(input: {
  jsonSchema: Record<string, unknown>;
  name: string;
  systemPrompt: string;
  userPrompt: string;
}) {
  ensureAiEnabled();
  const apiKey = serverEnv.GEMINI_API_KEY!;
  const model = serverEnv.GEMINI_MODEL ?? "gemini-3-flash-preview";
  let response: Response;

  try {
    response = await fetch(
      `${
        serverEnv.GEMINI_BASE_URL ??
        "https://generativelanguage.googleapis.com/v1beta"
      }${GEMINI_GENERATE_CONTENT_URL}/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${input.systemPrompt}\n\n${input.userPrompt}`,
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
            responseJsonSchema: input.jsonSchema,
            temperature: 0.3,
          },
        }),
      },
    );
  } catch (error) {
    throw Object.assign(
      new Error("AI is not available right now. Please try again shortly."),
      {
        cause: error,
        status: 503,
      },
    );
  }

  const payload = (await response.json()) as StructuredChatCompletionResponse;

  if (!response.ok) {
    const friendlyError = toFriendlyAiProviderError({
      providerMessage: payload.error?.message,
      responseStatus: response.status,
    });

    if (friendlyError) {
      throw friendlyError;
    }

    throw Object.assign(
      new Error(payload.error?.message ?? "AI provider request failed."),
      { status: 502 },
    );
  }

  if (payload.promptFeedback?.blockReason) {
    throw Object.assign(
      new Error(`Gemini blocked the request: ${payload.promptFeedback.blockReason}`),
      { status: 422 },
    );
  }

  const text = payload.candidates?.[0]?.content?.parts
    ?.map((part) => part.text ?? "")
    .join("")
    .trim();

  if (!text) {
    throw Object.assign(
      new Error("Gemini returned an empty response."),
      {
        status: 502,
      },
    );
  }

  return JSON.parse(text) as T;
}

export const aiService = {
  assertConfigured() {
    ensureAiEnabled();
  },

  async generatePracticeQuiz(input: {
    courseId: string;
    difficulty: AiDifficulty;
    lessonId?: null | string;
    questionCount: number;
  }) {
    const { compiledContext, course, lessons } = await buildCourseContext(input);

    const schema = {
      type: "object",
      additionalProperties: false,
      properties: {
        title: { type: "string" },
        questions: {
          type: "array",
          minItems: input.questionCount,
          maxItems: input.questionCount,
          items: {
            type: "object",
            additionalProperties: false,
            properties: {
              correctOptionId: { type: "string" },
              explanation: { type: "string" },
              id: { type: "string" },
              options: {
                type: "array",
                minItems: 4,
                maxItems: 4,
                items: {
                  type: "object",
                  additionalProperties: false,
                  properties: {
                    id: { type: "string" },
                    text: { type: "string" },
                  },
                  required: ["id", "text"],
                },
              },
              prompt: { type: "string" },
              sourceLessonId: { type: ["string", "null"] },
              sourceLessonTitle: { type: ["string", "null"] },
              sourceSectionTitle: { type: ["string", "null"] },
            },
            required: [
              "correctOptionId",
              "explanation",
              "id",
              "options",
              "prompt",
              "sourceLessonId",
              "sourceLessonTitle",
              "sourceSectionTitle",
            ],
          },
        },
      },
      required: ["questions", "title"],
    };

    const result = await createStructuredCompletion<{
      questions: AiPracticeQuizQuestion[];
      title: string;
    }>({
      jsonSchema: schema,
      name: "practice_quiz_generation",
      systemPrompt:
        "You generate self-practice quiz questions for students. Use only the supplied course context. Do not invent facts not present in the material. Return four options for every question, exactly one correct option, and concise explanations.",
      userPrompt: [
        `Generate ${input.questionCount} multiple-choice self-practice questions.`,
        `Difficulty: ${input.difficulty}.`,
        input.lessonId
          ? `Focus on the selected lesson: ${lessons[0]?.title ?? "selected lesson"}.`
          : `Cover the broader course: ${course.title}.`,
        "Question IDs and option IDs must be stable strings you create yourself.",
        "Course material:",
        compiledContext,
      ].join("\n\n"),
    });

    return {
      questions: result.questions.map((question) =>
        aiPracticeQuizQuestionSchema.parse(question),
      ),
      title: compactText(result.title, `${course.title} practice quiz`),
    };
  },

  async answerChat(input: {
    courseId?: null | string;
    documents?: Array<{
      chunks: string[];
      id: string;
      title: string;
    }>;
    lessonId?: null | string;
    message: string;
    previousMessages: AiChatMessage[];
  }) {
    const context = input.courseId
      ? await buildCourseContext({
          courseId: input.courseId,
          lessonId: input.lessonId,
        })
      : null;

    const recentMessages = input.previousMessages
      .slice(-6)
      .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
      .join("\n");
    const documentContext =
      input.documents && input.documents.length > 0
        ? selectRelevantDocumentChunks({
            documents: input.documents,
            maxChunks: 4,
            message: input.message,
          })
            .map(
              (chunk) =>
                `[${chunk.title} | chunk ${chunk.index + 1}]\n${chunk.chunk}`,
            )
            .join("\n\n")
        : "";

    const schema = {
      type: "object",
      additionalProperties: false,
      properties: {
        answer: { type: "string" },
        followUpSuggestions: {
          type: "array",
          items: { type: "string" },
          minItems: 0,
          maxItems: 3,
        },
      },
      required: ["answer", "followUpSuggestions"],
    };

    const result = await createStructuredCompletion<{
      answer: string;
      followUpSuggestions: string[];
    }>({
      jsonSchema: schema,
      name: "study_chat_response",
      systemPrompt:
        "You are a study assistant inside a learning platform. Be concise, accurate, and supportive. If course content or uploaded document excerpts are supplied, prioritize them over general knowledge. When you rely on uploaded document excerpts, mention the document title naturally in the answer. Be explicit when you are making a general inference rather than citing the provided material.",
      userPrompt: [
        context
          ? `Course context for ${context.course.title}:\n${context.compiledContext}`
          : "No specific course context was selected. Answer with general study help only.",
        documentContext
          ? `Uploaded document excerpts:\n${documentContext}`
          : "",
        recentMessages ? `Recent chat:\n${recentMessages}` : "",
        `Student message: ${input.message}`,
      ]
        .filter(Boolean)
        .join("\n\n"),
    });

    const followUpText =
      result.followUpSuggestions.length > 0
        ? `\n\nTry next:\n- ${result.followUpSuggestions.join("\n- ")}`
        : "";

    return aiChatMessageSchema.parse({
      content: `${compactText(result.answer)}${followUpText}`,
      createdAt: Date.now(),
      id: randomUUID(),
      role: "assistant",
    });
  },
};
