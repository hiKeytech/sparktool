import { c as createServerRpc, a as api } from "./api-client-Cl2DaV5u.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/react.mjs";
import { _ as _enum, o as object, s as string, n as number, a as array, b as boolean, c as any } from "../_libs/zod.mjs";
import "node:async_hooks";
import "node:stream";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "node:stream/web";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const activityLogActionSchema = _enum(["admin_invitation_created", "admin_invitation_redeemed", "certificate_earned", "certificate_modified", "course_completed", "course_enrolled", "course_started", "live_session_created", "live_session_ended", "live_session_joined", "login", "logout", "profile_updated", "progress_updated", "lesson_completed", "quiz_attempted", "user_signup", "video_watched"]).nullable();
const activityLogCreateInputSchema = object({
  action: activityLogActionSchema,
  certificateId: string().nullable().optional(),
  courseId: string().nullable().optional(),
  enrollmentMethod: _enum(["admin_enrolled", "self_enrolled"]).optional(),
  invitedEmail: string().email().optional(),
  method: _enum(["manual_login", "session_restore", "social_login", "email_password", "phone_login", "manual_logout", "session_expired", "manual_signup", "social_signup", "phone_signup"]).optional(),
  passed: boolean().optional(),
  progressPercentage: number().optional(),
  quizId: string().nullable().optional(),
  score: number().optional(),
  sessionId: string().nullable().optional(),
  studentId: string().nullable().optional(),
  tenantId: string().nullable().optional(),
  totalDurationInMinutes: number().optional(),
  updatedFields: array(string()).optional(),
  userAgent: string().nullable().optional(),
  userId: string().min(1).nullable(),
  videoId: string().nullable().optional(),
  watchedDurationInMinutes: number().optional(),
  lessonId: string().nullable().optional()
});
const activityLogListInputSchema = object({
  queryFilter: array(any()).optional(),
  queryOrder: array(any()).optional(),
  tenantId: string().optional(),
  userId: string().min(1)
});
const platformActivityLogListInputSchema = object({
  action: activityLogActionSchema.optional(),
  limit: number().int().min(1).max(50).optional(),
  tenantId: string().optional(),
  userId: string().min(1).optional()
});
const createActivityLogFn_createServerFn_handler = createServerRpc({
  id: "2338bbcab1eb054d82ae7ede266c530d3882576f54c6143409d910bed8991e43",
  name: "createActivityLogFn",
  filename: "src/server/activity-logs.ts"
}, (opts) => createActivityLogFn.__executeServer(opts));
const createActivityLogFn = createServerFn({
  method: "POST"
}).inputValidator(activityLogCreateInputSchema).handler(createActivityLogFn_createServerFn_handler, async ({
  data
}) => {
  return api.post("/api/activity-logs", {
    logData: data
  });
});
const listActivityLogsFn_createServerFn_handler = createServerRpc({
  id: "51620865152b4d35ec2253229d0630461cd9b6ebce550d5d63d2b04083b8644e",
  name: "listActivityLogsFn",
  filename: "src/server/activity-logs.ts"
}, (opts) => listActivityLogsFn.__executeServer(opts));
const listActivityLogsFn = createServerFn({
  method: "GET"
}).inputValidator(activityLogListInputSchema).handler(listActivityLogsFn_createServerFn_handler, async ({
  data
}) => {
  const params = new URLSearchParams({
    userId: data.userId
  });
  if (data.tenantId) params.set("tenantId", data.tenantId);
  return api.get(`/api/activity-logs?${params}`);
});
const listPlatformActivityLogsFn_createServerFn_handler = createServerRpc({
  id: "3ef8835a429bcdb395d452bcd8e88ed09649458fd43b2c417d270cea17d45e9c",
  name: "listPlatformActivityLogsFn",
  filename: "src/server/activity-logs.ts"
}, (opts) => listPlatformActivityLogsFn.__executeServer(opts));
const listPlatformActivityLogsFn = createServerFn({
  method: "GET"
}).inputValidator(platformActivityLogListInputSchema).handler(listPlatformActivityLogsFn_createServerFn_handler, async ({
  data
}) => {
  const params = new URLSearchParams();
  if (data.action) params.set("action", data.action);
  if (data.limit) params.set("limit", String(data.limit));
  if (data.tenantId) params.set("tenantId", data.tenantId);
  if (data.userId) params.set("userId", data.userId);
  return api.get(`/api/activity-logs?${params}`);
});
export {
  createActivityLogFn_createServerFn_handler,
  listActivityLogsFn_createServerFn_handler,
  listPlatformActivityLogsFn_createServerFn_handler
};
