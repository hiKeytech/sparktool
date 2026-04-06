import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  api,
  type ApiIdResponse,
  type ApiSuccessResponse,
} from "@/lib/api-client";
import type { CourseQuiz } from "@/types";

const courseQuizFiltersSchema = z
  .object({
    courseId: z.string().optional(),
    lessonId: z.string().optional(),
    placement: z.enum(["course", "lesson", "section"]).optional(),
    sectionId: z.string().optional(),
  })
  .optional();

const courseQuizSchema = z.object({
  courseId: z.string().min(1),
  createdAt: z.number().optional(),
  description: z.string().optional(),
  isRequired: z.boolean(),
  lessonId: z.string().optional(),
  maxAttempts: z.number().optional(),
  order: z.number(),
  passingScore: z.number(),
  placement: z.enum(["course", "lesson", "section"]),
  questions: z.array(z.any()),
  sectionId: z.string().optional(),
  timeLimit: z.number().optional(),
  title: z.string().min(1),
  updatedAt: z.number().optional(),
});

export const createCourseQuizFn = createServerFn({ method: "POST" })
  .inputValidator(courseQuizSchema)
  .handler(async ({ data }) => {
    return api.post<ApiIdResponse>("/api/course-quizzes", data);
  });

export const deleteCourseQuizFn = createServerFn({ method: "POST" })
  .inputValidator((quizId: string) => quizId)
  .handler(async ({ data }) => {
    return api.delete<ApiSuccessResponse>(`/api/course-quizzes/${data}`);
  });

export const getCourseQuizFn = createServerFn({ method: "GET" })
  .inputValidator((quizId: string) => quizId)
  .handler(async ({ data }) => {
    return api.get<CourseQuiz | null>(`/api/course-quizzes/${data}`);
  });

export const listCourseQuizzesFn = createServerFn({ method: "GET" })
  .inputValidator(courseQuizFiltersSchema)
  .handler(async ({ data }) => {
    const params = new URLSearchParams();
    if (data?.courseId) params.set("courseId", data.courseId);
    if (data?.lessonId) params.set("lessonId", data.lessonId);
    if (data?.sectionId) params.set("sectionId", data.sectionId);
    if (data?.placement) params.set("placement", data.placement);
    return api.get<CourseQuiz[]>(`/api/course-quizzes?${params}`);
  });

export const reorderCourseQuizzesFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.array(z.object({ order: z.number(), quizId: z.string().min(1) })),
  )
  .handler(async ({ data }) => {
    return api.post<ApiSuccessResponse>("/api/course-quizzes/reorder", data);
  });

export const updateCourseQuizFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      quizData: courseQuizSchema.partial(),
      quizId: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    return api.patch<ApiIdResponse>(
      `/api/course-quizzes/${data.quizId}`,
      data.quizData,
    );
  });
