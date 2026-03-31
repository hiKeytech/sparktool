import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type { ActivityLogCreateInput } from "@/schemas/activity-log";
import { activityLogRepository } from "@/server/repositories/activity-log-repository";
import {
  assertTenantAdminAccess,
  requireTenantScopedActorWithTenant,
} from "@/server/tenant-context";

const activityLogActionSchema = z
  .enum([
    "certificate_earned",
    "certificate_modified",
    "course_completed",
    "course_enrolled",
    "course_started",
    "live_session_created",
    "live_session_ended",
    "live_session_joined",
    "login",
    "logout",
    "profile_updated",
    "progress_updated",
    "lesson_completed",
    "quiz_attempted",
    "user_signup",
    "video_watched",
  ])
  .nullable();

const activityLogCreateInputSchema = z.object({
  action: activityLogActionSchema,
  certificateId: z.string().nullable().optional(),
  courseId: z.string().nullable().optional(),
  enrollmentMethod: z.enum(["admin_enrolled", "self_enrolled"]).optional(),
  method: z
    .enum([
      "manual_login",
      "session_restore",
      "social_login",
      "email_password",
      "phone_login",
      "manual_logout",
      "session_expired",
      "manual_signup",
      "social_signup",
      "phone_signup",
    ])
    .optional(),
  passed: z.boolean().optional(),
  progressPercentage: z.number().optional(),
  quizId: z.string().nullable().optional(),
  score: z.number().optional(),
  sessionId: z.string().nullable().optional(),
  studentId: z.string().nullable().optional(),
  tenantId: z.string().nullable().optional(),
  totalDurationInMinutes: z.number().optional(),
  updatedFields: z.array(z.string()).optional(),
  userAgent: z.string().nullable().optional(),
  userId: z.string().min(1).nullable(),
  videoId: z.string().nullable().optional(),
  watchedDurationInMinutes: z.number().optional(),
  lessonId: z.string().nullable().optional(),
});

const activityLogListInputSchema = z.object({
  queryFilter: z.array(z.any()).optional(),
  queryOrder: z.array(z.any()).optional(),
  tenantId: z.string().optional(),
  userId: z.string().min(1),
});

export const createActivityLogFn = createServerFn({ method: "POST" })
  .inputValidator(activityLogCreateInputSchema)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant({
      allowMissingTenant: true,
      requestedTenantId: data.tenantId ?? null,
    });

    if (!data.action) {
      throw new Error("Activity log action is required.");
    }

    if (
      data.userId &&
      actor.role !== "super-admin" &&
      data.userId !== actor.id
    ) {
      throw new Error("You cannot create an activity log for another user.");
    }

    const logData = {
      ...data,
      tenantId: tenantId ?? data.tenantId ?? undefined,
      userId: actor.id,
    } satisfies ActivityLogCreateInput;

    const createdLog = await activityLogRepository.create(logData);

    if (!createdLog) {
      throw new Error("Failed to create activity log.");
    }

    return createdLog.id;
  });

export const listActivityLogsFn = createServerFn({ method: "GET" })
  .inputValidator(activityLogListInputSchema)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant({
      allowMissingTenant: true,
      requestedTenantId: data.tenantId ?? null,
    });

    assertTenantAdminAccess(actor);

    return activityLogRepository.list({
      ...data,
      tenantId: tenantId ?? data.tenantId,
    });
  });
