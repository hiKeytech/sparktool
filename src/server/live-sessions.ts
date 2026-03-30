import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { activityLogs } from "@/schemas/activity-log";
import { liveSessionRepository } from "@/server/repositories/live-session-repository";

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
    const sessionId = crypto.randomUUID();
    const meetingName = encodeURIComponent(data.sessionData.title);
    const meetingId = `${sessionId}#config.subject="${meetingName}"`;
    const jitsiMeetUrl = `https://meet.jit.si/${meetingId}`;

    const createdSession = await liveSessionRepository.create({
      ...data.sessionData,
      createdAt: Date.now(),
      id: sessionId,
      instructorId: data.userId,
      jitsiMeetUrl,
      meetingId,
      participants: [],
      status: "scheduled",
      updatedAt: Date.now(),
    });

    if (!createdSession) {
      throw new Error("Failed to create live session.");
    }

    return createdSession.id;
  });

export const deleteLiveSessionFn = createServerFn({ method: "POST" })
  .inputValidator(sessionIdInputSchema)
  .handler(async ({ data }) => {
    await liveSessionRepository.delete(data);
    return { success: true };
  });

export const findLiveSessionFn = createServerFn({ method: "GET" })
  .inputValidator((sessionId: string | undefined) => sessionId)
  .handler(async ({ data }) => {
    return liveSessionRepository.getById(data);
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
    const session = await liveSessionRepository.getById(data.sessionId);

    if (!session) {
      throw new Error("Live session not found.");
    }

    await liveSessionRepository.update(data.sessionId, {
      participants: Array.from(
        new Set([...(session.participants || []), data.studentId]),
      ),
    });

    await activityLogs.create({
      action: "live_session_joined",
      courseId: data.courseId,
      sessionId: data.sessionId,
      userId: data.studentId,
    });

    return { success: true };
  });

export const leaveLiveSessionFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      sessionId: z.string().min(1),
      studentId: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const session = await liveSessionRepository.getById(data.sessionId);

    if (!session) {
      throw new Error("Live session not found.");
    }

    await liveSessionRepository.update(data.sessionId, {
      participants: (session.participants || []).filter(
        (participantId) => participantId !== data.studentId,
      ),
    });

    return { success: true };
  });

export const listLiveSessionsFn = createServerFn({ method: "GET" })
  .inputValidator(liveSessionListInputSchema)
  .handler(async ({ data }) => {
    return liveSessionRepository.list(data || {});
  });

export const updateLiveSessionFn = createServerFn({ method: "POST" })
  .inputValidator(updateLiveSessionInputSchema)
  .handler(async ({ data }) => {
    const updatedSession = await liveSessionRepository.update(
      data.sessionId,
      data.sessionData as never,
    );

    if (!updatedSession) {
      throw new Error("Failed to update live session.");
    }

    return updatedSession.id;
  });
