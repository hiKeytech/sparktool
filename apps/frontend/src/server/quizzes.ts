import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  api,
  type ApiIdResponse,
  type ApiSuccessResponse,
} from "@/lib/api-client";
import type { QuizAttempt, QuizWithId } from "@/types";

type QuizAttemptCreateResponse = {
  id: string;
  passed: boolean;
  score: number;
};

const quizSchema = z.object({
  courseId: z.string().min(1),
  createdAt: z.number(),
  createdBy: z.string().min(1),
  description: z.string().optional(),
  maxAttempts: z.number().optional(),
  passingScore: z.number(),
  questions: z.array(z.any()),
  timeLimit: z.number().optional(),
  title: z.string().min(1),
  updatedAt: z.number(),
});

const createQuizAttemptInputSchema = z.object({
  courseId: z.string().min(1),
  quizId: z.string().min(1),
  studentId: z.string().min(1),
});

const listQuizAttemptsInputSchema = z.object({
  courseId: z.string().optional(),
  quizId: z.string().optional(),
  studentId: z.string().optional(),
});

const updateQuizAttemptInputSchema = z.object({
  attemptData: z.object({
    completedAt: z.number().optional(),
    rawAnswers: z
      .record(z.string(), z.union([z.number(), z.string()]))
      .optional(),
    timeSpent: z.number().optional(),
  }),
  attemptId: z.string().min(1),
});

export const createQuizFn = createServerFn({ method: "POST" })
  .inputValidator(z.object({ quizData: quizSchema }))
  .handler(async ({ data }) => {
    return api.post<ApiIdResponse>("/api/quizzes", data);
  });

export const deleteQuizFn = createServerFn({ method: "POST" })
  .inputValidator(z.string().min(1))
  .handler(async ({ data }) => {
    return api.delete<ApiSuccessResponse>(`/api/quizzes/${data}`);
  });

export const getQuizFn = createServerFn({ method: "GET" })
  .inputValidator(z.string().min(1))
  .handler(async ({ data }) => {
    return api.get<QuizWithId | null>(`/api/quizzes/${data}`);
  });

export const listQuizzesFn = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      courseId: z.string().min(1).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const params = new URLSearchParams();
    if (data.courseId) {
      params.set("courseId", data.courseId);
    }

    return api.get<QuizWithId[]>(`/api/quizzes?${params}`);
  });

export const updateQuizFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      quizData: quizSchema.partial(),
      quizId: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    return api.patch<ApiIdResponse>(
      `/api/quizzes/${data.quizId}`,
      data.quizData,
    );
  });

export const createQuizAttemptFn = createServerFn({ method: "POST" })
  .inputValidator(createQuizAttemptInputSchema)
  .handler(async ({ data }) => {
    return api.post<QuizAttemptCreateResponse>("/api/quiz-attempts", data);
  });

export const listQuizAttemptsFn = createServerFn({ method: "GET" })
  .inputValidator(listQuizAttemptsInputSchema)
  .handler(async ({ data }) => {
    const params = new URLSearchParams();
    if (data.quizId) params.set("quizId", data.quizId);
    if (data.studentId) params.set("studentId", data.studentId);
    if (data.courseId) params.set("courseId", data.courseId);
    return api.get<QuizAttempt[]>(`/api/quiz-attempts?${params}`);
  });

export const updateQuizAttemptFn = createServerFn({ method: "POST" })
  .inputValidator(updateQuizAttemptInputSchema)
  .handler(async ({ data }) => {
    return api.patch<ApiIdResponse>(
      `/api/quiz-attempts/${data.attemptId}`,
      data.attemptData,
    );
  });
