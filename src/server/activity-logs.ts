import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { activityLogRepository } from "@/server/repositories/activity-log-repository";

const activityLogCreateInputSchema = z.object({
  action: z.string().min(1).nullable(),
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
    if (!data.action || !data.userId) {
      throw new Error("Activity log action and userId are required.");
    }

    const createdLog = await activityLogRepository.create(data as never);

    if (!createdLog) {
      throw new Error("Failed to create activity log.");
    }

    return createdLog.id;
  });

export const listActivityLogsFn = createServerFn({ method: "GET" })
  .inputValidator(activityLogListInputSchema)
  .handler(async ({ data }) => {
    return activityLogRepository.list(data);
  });
