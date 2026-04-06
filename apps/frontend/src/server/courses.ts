import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  api,
  type ApiIdResponse,
  type ApiSuccessResponse,
} from "@/lib/api-client";
import { courseSchema, type CourseWithId } from "@/schemas/course";

const createCourseInputSchema = z.object({
  courseData: courseSchema.pick({
    category: true,
    description: true,
    difficulty: true,
    featured: true,
    instructors: true,
    language: true,
    learningObjectives: true,
    level: true,
    prerequisites: true,
    previewVideoUrl: true,
    price: true,
    published: true,
    shortDescription: true,
    tags: true,
    thumbnailUrl: true,
    title: true,
  }),
  tenantId: z.string().min(1),
  userId: z.string().min(1),
});

const enrollCourseInputSchema = z.object({
  courseId: z.string().min(1),
  studentId: z.string().min(1),
  tenantId: z.string().min(1),
});

const updateCourseInputSchema = z.object({
  courseData: courseSchema.partial(),
  courseId: z.string().min(1),
});

const removeCourseInputSchema = z.object({
  courseId: z.string().min(1),
});

const listCoursesInputSchema = z.object({
  filters: z
    .object({
      category: z.string().optional(),
      difficulty: z.string().optional(),
      published: z.boolean().optional(),
      search: z.string().optional(),
    })
    .optional(),
  tenantId: z.string().nullable().optional(),
});

export const createCourseFn = createServerFn({ method: "POST" })
  .inputValidator(createCourseInputSchema)
  .handler(async ({ data }) => {
    return api.post<ApiIdResponse>("/api/courses", data);
  });

export const enrollInCourseFn = createServerFn({ method: "POST" })
  .inputValidator(enrollCourseInputSchema)
  .handler(async ({ data }) => {
    return api.post<ApiSuccessResponse>(
      `/api/courses/${data.courseId}/enroll`,
      {
        studentId: data.studentId,
      },
    );
  });

export const getCourseFn = createServerFn({ method: "GET" })
  .inputValidator((courseId: string) => courseId)
  .handler(async ({ data }) => {
    return api.get<CourseWithId | null>(`/api/courses/${data}`);
  });

export const listCoursesFn = createServerFn({ method: "GET" })
  .inputValidator(listCoursesInputSchema)
  .handler(async ({ data }) => {
    const params = new URLSearchParams();
    if (data.tenantId) params.set("tenantId", data.tenantId);
    if (data.filters?.category) params.set("category", data.filters.category);
    if (data.filters?.difficulty)
      params.set("difficulty", data.filters.difficulty);
    if (data.filters?.published !== undefined)
      params.set("published", String(data.filters.published));
    if (data.filters?.search) params.set("search", data.filters.search);
    return api.get<CourseWithId[]>(`/api/courses?${params}`);
  });

export const removeCourseFn = createServerFn({ method: "POST" })
  .inputValidator(removeCourseInputSchema)
  .handler(async ({ data }) => {
    return api.delete<ApiSuccessResponse>(`/api/courses/${data.courseId}`);
  });

export const updateCourseFn = createServerFn({ method: "POST" })
  .inputValidator(updateCourseInputSchema)
  .handler(async ({ data }) => {
    return api.patch<ApiIdResponse>(`/api/courses/${data.courseId}`, {
      courseData: data.courseData,
    });
  });
