import { Router } from "express";

import { activityLogRepository } from "../repositories/activity-log-repository.js";
import {
  assertAdminAccess,
  getActorFromSession,
  httpError,
} from "../lib/request-helpers.js";
import { requireSession, requireTenantSession } from "../middleware/session.js";

export const activityLogsRouter = Router();

/** GET /api/activity-logs */
activityLogsRouter.get("/", requireTenantSession, async (request, response) => {
  const actor = await getActorFromSession(request);
  assertAdminAccess(actor);

  const {
    userId,
    courseId,
    action,
    tenantId: queryTenantId,
    limit,
    page,
  } = request.query as Record<string, string>;
  const tenantId = queryTenantId ?? request.session.activeTenantId!;

  const filters: Record<string, unknown> = { tenantId };
  if (userId) filters.userId = userId;
  if (courseId) filters.courseId = courseId;
  if (action) filters.action = action;
  if (limit) filters.limit = Number(limit);
  if (page) filters.page = Number(page);

  response.json(await activityLogRepository.list(filters));
});

/** POST /api/activity-logs */
activityLogsRouter.post("/", requireSession, async (request, response) => {
  const { logData } = request.body;
  const created = await activityLogRepository.create(logData);
  if (!created) throw httpError(500, "Failed to create activity log.");
  response.status(201).json({ id: created.id });
});
