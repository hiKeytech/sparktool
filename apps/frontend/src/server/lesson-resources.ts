import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { api, type ApiSuccessResponse } from "@/lib/api-client";
import {
  lessonResourceSchema,
  type LessonResource,
} from "@/schemas/course-lesson";

const lessonResourceDataSchema = lessonResourceSchema
  .omit({
    createdAt: true,
    id: true,
    storageKey: true,
    storageProvider: true,
    storageResourceType: true,
    updatedAt: true,
  })
  .passthrough();

const serializedFileSchema = z.object({
  dataUrl: z.string().min(1),
  name: z.string().min(1),
  size: z.number().nonnegative(),
  type: z.string().min(1),
});

const createLessonResourceInputSchema = z.object({
  file: serializedFileSchema.optional(),
  resourceData: lessonResourceDataSchema,
});

const deleteLessonResourceInputSchema = z.object({
  resourceId: z.string().min(1),
});

const updateLessonResourceInputSchema = z.object({
  file: serializedFileSchema.optional(),
  resourceData: lessonResourceDataSchema.partial().passthrough(),
  resourceId: z.string().min(1),
});

const resourceIdInputSchema = z.string().min(1);
const lessonIdInputSchema = z.string().min(1);

export const createLessonResourceFn = createServerFn({ method: "POST" })
  .inputValidator(createLessonResourceInputSchema)
  .handler(async ({ data }) => {
    return api.post<string>("/api/lesson-resources", data);
  });

export const deleteLessonResourceFn = createServerFn({ method: "POST" })
  .inputValidator(deleteLessonResourceInputSchema)
  .handler(async ({ data }) => {
    return api.delete<ApiSuccessResponse>(
      `/api/lesson-resources/${data.resourceId}`,
    );
  });

export const getLessonResourceFn = createServerFn({ method: "GET" })
  .inputValidator(resourceIdInputSchema)
  .handler(async ({ data }) => {
    return api.get<LessonResource>(`/api/lesson-resources/${data}`);
  });

export const listLessonResourcesFn = createServerFn({ method: "GET" })
  .inputValidator(lessonIdInputSchema)
  .handler(async ({ data }) => {
    return api.get<LessonResource[]>(`/api/lesson-resources/lesson/${data}`);
  });

export const updateLessonResourceFn = createServerFn({ method: "POST" })
  .inputValidator(updateLessonResourceInputSchema)
  .handler(async ({ data }) => {
    return api.patch<string>(`/api/lesson-resources/${data.resourceId}`, {
      file: data.file,
      resourceData: data.resourceData,
    });
  });
