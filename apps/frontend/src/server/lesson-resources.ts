import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { api, type ApiSuccessResponse } from "@/lib/api-client";
import { type LessonResource } from "@/schemas/course-lesson";

const deleteLessonResourceInputSchema = z.object({
  resourceId: z.string().min(1),
});

const resourceIdInputSchema = z.string().min(1);
const lessonIdInputSchema = z.string().min(1);

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
