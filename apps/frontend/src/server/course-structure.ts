import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  api,
  type ApiIdResponse,
  type ApiSuccessResponse,
} from "@/lib/api-client";
import type { CourseLesson } from "@/schemas/course-lesson";
import type { CourseSectionData } from "@/schemas/course-section";

const createSectionInputSchema = z.object({
  data: z.object({
    courseId: z.string().min(1),
    description: z.string().nullish(),
    estimatedDurationInMinutes: z.number(),
    isPublished: z.boolean(),
    order: z.number().nullish(),
    title: z.string().nullish(),
  }),
  userId: z.string().min(1),
});

const sectionIdInputSchema = z.string().min(1);

const reorderSectionsInputSchema = z.object({
  courseId: z.string().min(1),
  reorderData: z.array(
    z.object({
      itemId: z.string().min(1),
      newOrder: z.number(),
      type: z.string().optional(),
    }),
  ),
});

const updateSectionInputSchema = z.object({
  sectionData: z.object({
    updates: z.record(z.string(), z.any()),
    userId: z.string().min(1),
  }),
  sectionId: z.string().min(1),
});

const createLessonInputSchema = z.object({
  lessonData: z.object({
    content: z.record(z.string(), z.any()),
    courseId: z.string().min(1),
    description: z.string().optional(),
    estimatedDuration: z.number(),
    isPublished: z.boolean(),
    isRequired: z.boolean(),
    order: z.number(),
    resources: z.array(z.any()),
    sectionId: z.string().min(1),
    title: z.string().min(1),
    type: z.enum(["assignment", "live-session", "reading", "video"]),
  }),
  userId: z.string().min(1).optional(),
});

const updateLessonInputSchema = z.object({
  lessonData: z.record(z.string(), z.any()),
  lessonId: z.string().min(1),
});

const reorderLessonsInputSchema = z.object({
  reorderData: z.array(
    z.object({
      itemId: z.string().min(1),
      newOrder: z.number(),
    }),
  ),
  sectionId: z.string().min(1),
});

export const createSectionFn = createServerFn({ method: "POST" })
  .inputValidator(createSectionInputSchema)
  .handler(async ({ data }) => {
    return api.post<ApiIdResponse>(
      `/api/courses/${data.data.courseId}/sections`,
      data,
    );
  });

export const deleteSectionFn = createServerFn({ method: "POST" })
  .inputValidator(sectionIdInputSchema)
  .handler(async ({ data }) => {
    return api.delete<ApiSuccessResponse>(`/api/sections/${data}`);
  });

export const getSectionFn = createServerFn({ method: "GET" })
  .inputValidator((sectionId: string) => sectionId)
  .handler(async ({ data }) => {
    return api.get<CourseSectionData | null>(`/api/sections/${data}`);
  });

export const listSectionsFn = createServerFn({ method: "GET" })
  .inputValidator((courseId: string) => courseId)
  .handler(async ({ data }) => {
    return api.get<CourseSectionData[]>(`/api/courses/${data}/sections`);
  });

export const reorderSectionsFn = createServerFn({ method: "POST" })
  .inputValidator(reorderSectionsInputSchema)
  .handler(async ({ data }) => {
    return api.post<ApiSuccessResponse>(
      `/api/courses/${data.courseId}/sections/reorder`,
      {
        reorderData: data.reorderData,
      },
    );
  });

export const updateSectionFn = createServerFn({ method: "POST" })
  .inputValidator(updateSectionInputSchema)
  .handler(async ({ data }) => {
    return api.patch<ApiIdResponse>(
      `/api/sections/${data.sectionId}`,
      data.sectionData,
    );
  });

export const createLessonFn = createServerFn({ method: "POST" })
  .inputValidator(createLessonInputSchema)
  .handler(async ({ data }) => {
    return api.post<ApiIdResponse>(
      `/api/sections/${data.lessonData.sectionId}/lessons`,
      data,
    );
  });

export const deleteLessonFn = createServerFn({ method: "POST" })
  .inputValidator(sectionIdInputSchema)
  .handler(async ({ data }) => {
    return api.delete<ApiSuccessResponse>(`/api/lessons/${data}`);
  });

export const getLessonFn = createServerFn({ method: "GET" })
  .inputValidator((lessonId: string) => lessonId)
  .handler(async ({ data }) => {
    return api.get<CourseLesson | null>(`/api/lessons/${data}`);
  });

export const listLessonsFn = createServerFn({ method: "GET" })
  .inputValidator((sectionId: string) => sectionId)
  .handler(async ({ data }) => {
    return api.get<CourseLesson[]>(`/api/sections/${data}/lessons`);
  });

export const listLessonsByCourseFn = createServerFn({ method: "GET" })
  .inputValidator((courseId: string) => courseId)
  .handler(async ({ data }) => {
    return api.get<CourseLesson[]>(`/api/courses/${data}/lessons`);
  });

export const reorderLessonsFn = createServerFn({ method: "POST" })
  .inputValidator(reorderLessonsInputSchema)
  .handler(async ({ data }) => {
    return api.post<ApiSuccessResponse>(
      `/api/sections/${data.sectionId}/lessons/reorder`,
      {
        reorderData: data.reorderData,
      },
    );
  });

export const updateLessonFn = createServerFn({ method: "POST" })
  .inputValidator(updateLessonInputSchema)
  .handler(async ({ data }) => {
    return api.patch<ApiIdResponse>(
      `/api/lessons/${data.lessonId}`,
      data.lessonData,
    );
  });
