import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  aiChatRequestSchema,
  aiDocumentLookupSchema,
  aiChatThreadLookupSchema,
  createAiDocumentInputSchema,
  generateAiPracticeQuizInputSchema,
  submitAiPracticeQuizInputSchema,
  type AiDocument,
  type AiChatThread,
  type AiPracticeQuizSession,
} from "sparktool-contracts/ai";

import { api } from "@/lib/api-client";

export const getAiHealthFn = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      const result = await api.get<{
        configured: boolean;
        error?: string;
        status: string;
      }>("/api/ai/health");

      return (
        result ?? {
          configured: false,
          error: "AI health check returned no data.",
          status: "unavailable",
        }
      );
    } catch (error) {
      return {
        configured: false,
        error:
          error instanceof Error
            ? error.message
            : "Could not verify AI service.",
        status: "unavailable",
      };
    }
  },
);

export const generateAiPracticeQuizFn = createServerFn({ method: "POST" })
  .inputValidator(generateAiPracticeQuizInputSchema)
  .handler(async ({ data }) => {
    return api.post<AiPracticeQuizSession>("/api/ai/practice-quizzes", data);
  });

export const getAiPracticeQuizSessionFn = createServerFn({ method: "GET" })
  .inputValidator((sessionId: string) => sessionId)
  .handler(async ({ data }) => {
    return api.get<AiPracticeQuizSession>(`/api/ai/practice-quizzes/${data}`);
  });

export const listAiPracticeQuizSessionsFn = createServerFn({ method: "GET" })
  .inputValidator((courseId?: string | null) => courseId ?? null)
  .handler(async ({ data }) => {
    const params = new URLSearchParams();

    if (data) {
      params.set("courseId", data);
    }

    return api.get<AiPracticeQuizSession[]>(
      `/api/ai/practice-quizzes?${params.toString()}`,
    );
  });

export const submitAiPracticeQuizFn = createServerFn({ method: "POST" })
  .inputValidator(
    submitAiPracticeQuizInputSchema.extend({
      sessionId: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    return api.post<AiPracticeQuizSession>(
      `/api/ai/practice-quizzes/${data.sessionId}/submit`,
      {
        answers: data.answers,
      },
    );
  });

export const getAiChatThreadFn = createServerFn({ method: "GET" })
  .inputValidator(aiChatThreadLookupSchema)
  .handler(async ({ data }) => {
    const params = new URLSearchParams();

    if (data.courseId) {
      params.set("courseId", data.courseId);
    }

    if (data.lessonId) {
      params.set("lessonId", data.lessonId);
    }

    return api.get<AiChatThread | null>(`/api/ai/chat?${params.toString()}`);
  });

export const listAiDocumentsFn = createServerFn({ method: "GET" })
  .inputValidator(aiDocumentLookupSchema)
  .handler(async ({ data }) => {
    const params = new URLSearchParams();

    if (data.courseId) {
      params.set("courseId", data.courseId);
    }

    if (data.lessonId) {
      params.set("lessonId", data.lessonId);
    }

    return api.get<AiDocument[]>(`/api/ai/documents?${params.toString()}`);
  });

export const createAiDocumentFn = createServerFn({ method: "POST" })
  .inputValidator(createAiDocumentInputSchema)
  .handler(async ({ data }) => {
    return api.post<AiDocument>("/api/ai/documents", data);
  });

export const sendAiChatMessageFn = createServerFn({ method: "POST" })
  .inputValidator(aiChatRequestSchema)
  .handler(async ({ data }) => {
    return api.post<AiChatThread>("/api/ai/chat", data);
  });
