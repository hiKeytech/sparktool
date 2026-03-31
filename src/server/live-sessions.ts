import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { activityLogs } from "@/schemas/activity-log";
import { courseRepository } from "@/server/repositories/course-repository";
import { liveSessionRepository } from "@/server/repositories/live-session-repository";
import {
  assertTenantAdminAccess,
  requireTenantScopedActorWithTenant,
  resolveTenantFromCurrentRequest,
} from "@/server/tenant-context";

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

async function getCourseForTenant(courseId: string, tenantId: string) {
  const course = await courseRepository.getById(courseId);

  if (!course || course.tenantId !== tenantId) {
    throw new Error("Course does not belong to the current tenant.");
  }

  return course;
}

export const createLiveSessionFn = createServerFn({ method: "POST" })
  .inputValidator(createLiveSessionInputSchema)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();

    assertTenantAdminAccess(actor);
    await getCourseForTenant(data.sessionData.courseId, tenantId!);

    const sessionId = crypto.randomUUID();
    const meetingName = encodeURIComponent(data.sessionData.title);
    const meetingId = `${sessionId}#config.subject="${meetingName}"`;
    const jitsiMeetUrl = `https://meet.jit.si/${meetingId}`;

    const createdSession = await liveSessionRepository.create({
      ...data.sessionData,
      createdAt: Date.now(),
      id: sessionId,
      instructorId: actor.id,
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
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();
    const session = await liveSessionRepository.getById(data);

    assertTenantAdminAccess(actor);

    if (!session) {
      throw new Error("Live session not found.");
    }

    await getCourseForTenant(session.courseId, tenantId!);

    await liveSessionRepository.delete(data);
    return { success: true };
  });

export const findLiveSessionFn = createServerFn({ method: "GET" })
  .inputValidator((sessionId: string | undefined) => sessionId)
  .handler(async ({ data }) => {
    const [tenant, session] = await Promise.all([
      resolveTenantFromCurrentRequest(),
      liveSessionRepository.getById(data),
    ]);

    if (!session) {
      return null;
    }

    if (!tenant) {
      return session;
    }

    const course = await courseRepository.getById(session.courseId);

    if (!course || course.tenantId !== tenant.id) {
      return null;
    }

    return session;
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
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();
    const session = await liveSessionRepository.getById(data.sessionId);

    if (
      actor.role !== "super-admin" &&
      actor.role !== "admin" &&
      actor.id !== data.studentId
    ) {
      throw new Error(
        "You do not have permission to join a live session for another user.",
      );
    }

    if (!session) {
      throw new Error("Live session not found.");
    }

    if (session.courseId !== data.courseId) {
      throw new Error("Live session does not belong to the supplied course.");
    }

    await getCourseForTenant(session.courseId, tenantId!);

    await liveSessionRepository.update(data.sessionId, {
      participants: Array.from(
        new Set([...(session.participants || []), data.studentId]),
      ),
    });

    await activityLogs.create({
      action: "live_session_joined",
      courseId: data.courseId,
      sessionId: data.sessionId,
      tenantId: tenantId!,
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
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();
    const session = await liveSessionRepository.getById(data.sessionId);

    if (
      actor.role !== "super-admin" &&
      actor.role !== "admin" &&
      actor.id !== data.studentId
    ) {
      throw new Error(
        "You do not have permission to leave a live session for another user.",
      );
    }

    if (!session) {
      throw new Error("Live session not found.");
    }

    await getCourseForTenant(session.courseId, tenantId!);

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
    const tenant = await resolveTenantFromCurrentRequest();

    if (data?.courseId && tenant) {
      await getCourseForTenant(data.courseId, tenant.id);
      return liveSessionRepository.list(data || {});
    }

    const sessions = await liveSessionRepository.list(data || {});

    if (!tenant) {
      return sessions;
    }

    const tenantCourseIds = new Set(
      (await courseRepository.list(tenant.id)).map((course) => course.id),
    );

    return sessions.filter((session) => tenantCourseIds.has(session.courseId));
  });

export const updateLiveSessionFn = createServerFn({ method: "POST" })
  .inputValidator(updateLiveSessionInputSchema)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();
    const existingSession = await liveSessionRepository.getById(data.sessionId);

    assertTenantAdminAccess(actor);

    if (!existingSession) {
      throw new Error("Live session not found.");
    }

    await getCourseForTenant(existingSession.courseId, tenantId!);

    const updatedSession = await liveSessionRepository.update(
      data.sessionId,
      data.sessionData,
    );

    if (!updatedSession) {
      throw new Error("Failed to update live session.");
    }

    return updatedSession.id;
  });
