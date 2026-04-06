import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { api, type ApiIdResponse } from "@/lib/api-client";
import type { LessonProgress } from "@/types";

const lessonProgressInputSchema = z.object({
  progressData: z.record(z.string(), z.any()),
});

const lessonProgressGetInputSchema = z.object({
  lessonId: z.string().min(1),
  studentId: z.string().min(1),
});

const lessonProgressUpdateInputSchema = z.object({
  progressData: z.record(z.string(), z.any()),
  progressId: z.string().min(1),
});

const markCompleteInputSchema = z.object({
  courseId: z.string().min(1),
  lessonId: z.string().min(1),
  sectionId: z.string().min(1),
  studentId: z.string().min(1),
  tenantId: z.string().min(1).optional(),
  timeSpent: z.number().optional(),
});

export const createLessonProgressFn = createServerFn({ method: "POST" })
  .inputValidator(lessonProgressInputSchema)
  .handler(async ({ data }) => {
    return api.post<ApiIdResponse>("/api/lesson-progress", data);
  });

export const getLessonProgressFn = createServerFn({ method: "GET" })
  .inputValidator(lessonProgressGetInputSchema)
  .handler(async ({ data }) => {
    const params = new URLSearchParams({
      lessonId: data.lessonId,
      studentId: data.studentId,
    });
    return api.get<LessonProgress | null>(`/api/lesson-progress?${params}`);
  });

export const listLessonProgressByStudentFn = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      courseId: z.string().optional(),
      studentId: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const params = data.courseId ? `?courseId=${data.courseId}` : "";
    return api.get<LessonProgress[]>(
      `/api/lesson-progress/student/${data.studentId}${params}`,
    );
  });

export const updateLessonProgressFn = createServerFn({ method: "POST" })
  .inputValidator(lessonProgressUpdateInputSchema)
  .handler(async ({ data }) => {
    return api.patch<ApiIdResponse>(
      `/api/lesson-progress/${data.progressId}`,
      data.progressData,
    );
  });

export const markLessonCompleteFn = createServerFn({ method: "POST" })
  .inputValidator(markCompleteInputSchema)
  .handler(async ({ data }) => {
    return api.post<ApiIdResponse>("/api/lesson-progress/mark-complete", data);
  });
