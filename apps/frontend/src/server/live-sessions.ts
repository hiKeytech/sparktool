import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  api,
  type ApiIdResponse,
  type ApiSuccessResponse,
} from "@/lib/api-client";
import type { LiveSession } from "@/schemas/live-session";

const createLiveSessionInputSchema = z.object({
  sessionData: z.object({
    courseId: z.string().min(1),
    description: z.string().min(1),
    duration: z.number(),
    instructorName: z.string().min(1),
    maxParticipants: z.number().optional(),
    scheduledAt: z.string(),
    title: z.string().min(1),
  }),
  userId: z.string().min(1),
});

const sessionIdInputSchema = z.string().min(1);

const liveSessionListInputSchema = z
  .object({
    courseId: z.string().optional(),
    instructorId: z.string().optional(),
    status: z.string().optional(),
  })
  .optional();

const updateLiveSessionInputSchema = z.object({
  sessionData: z.record(z.string(), z.any()),
  sessionId: z.string().min(1),
});

export const createLiveSessionFn = createServerFn({ method: "POST" })
  .inputValidator(createLiveSessionInputSchema)
  .handler(async ({ data }) => {
    return api.post<ApiIdResponse>("/api/live-sessions", data);
  });

export const deleteLiveSessionFn = createServerFn({ method: "POST" })
  .inputValidator(sessionIdInputSchema)
  .handler(async ({ data }) => {
    return api.delete<ApiSuccessResponse>(`/api/live-sessions/${data}`);
  });

export const findLiveSessionFn = createServerFn({ method: "GET" })
  .inputValidator((sessionId: string | undefined) => sessionId)
  .handler(async ({ data }) => {
    if (!data) return null;
    return api.get<LiveSession | null>(`/api/live-sessions/${data}`);
  });

export const joinLiveSessionFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      courseId: z.string().min(1),
      sessionId: z.string().min(1),
      studentId: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    return api.post<ApiSuccessResponse>(
      `/api/live-sessions/${data.sessionId}/join`,
      {
        courseId: data.courseId,
        studentId: data.studentId,
      },
    );
  });

export const leaveLiveSessionFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      sessionId: z.string().min(1),
      studentId: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    return api.post<ApiSuccessResponse>(
      `/api/live-sessions/${data.sessionId}/leave`,
      {
        studentId: data.studentId,
      },
    );
  });

export const listLiveSessionsFn = createServerFn({ method: "GET" })
  .inputValidator(liveSessionListInputSchema)
  .handler(async ({ data }) => {
    const params = new URLSearchParams();
    if (data?.courseId) params.set("courseId", data.courseId);
    if (data?.instructorId) params.set("instructorId", data.instructorId);
    if (data?.status) params.set("status", data.status);
    return api.get<LiveSession[]>(`/api/live-sessions?${params}`);
  });

export const updateLiveSessionFn = createServerFn({ method: "POST" })
  .inputValidator(updateLiveSessionInputSchema)
  .handler(async ({ data }) => {
    return api.patch<ApiIdResponse>(
      `/api/live-sessions/${data.sessionId}`,
      data.sessionData,
    );
  });
