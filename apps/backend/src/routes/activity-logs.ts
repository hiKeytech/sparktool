import { Router } from "express";

import { activityLogRepository } from "../repositories/activity-log-repository";
import {
  assertAdminAccess,
  getActorFromSession,
  httpError,
} from "../lib/request-helpers";
import { requireSession } from "../middleware/session";

export const activityLogsRouter = Router();

/** GET /api/activity-logs */
activityLogsRouter.get("/", requireSession, async (request, response) => {
  const actor = await getActorFromSession(request);
  assertAdminAccess(actor);

  const {
    userId,
    courseId,
    action,
    tenantId: queryTenantId,
    limit: rawLimit,
  } = request.query as Record<string, string>;
  const tenantId =
    actor.role === "super-admin"
      ? queryTenantId
      : (queryTenantId ?? request.session.activeTenantId!);

  if (actor.role !== "super-admin" && !tenantId) {
    throw httpError(403, "No active tenant");
  }

  const logs = await activityLogRepository.list({
    ...(action && { action }),
    ...(courseId && { courseId }),
    ...(userId && { userId }),
    ...(tenantId && { tenantId }),
  });

  const limit = rawLimit ? Number.parseInt(rawLimit, 10) : undefined;

  response.json(
    Number.isFinite(limit) && (limit ?? 0) > 0 ? logs.slice(0, limit) : logs,
  );
});

/** POST /api/activity-logs */
activityLogsRouter.post("/", requireSession, async (request, response) => {
  const { logData } = request.body;
  const created = await activityLogRepository.create(logData);
  if (!created) throw httpError(500, "Failed to create activity log.");
  response.status(201).json({ id: created.id });
});
