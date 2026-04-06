import { Router } from "express";

import { activityLogRepository } from "../repositories/activity-log-repository.js";
import { courseRepository } from "../repositories/course-repository.js";
import { liveSessionRepository } from "../repositories/live-session-repository.js";
import {
  assertAdminAccess,
  getActorFromSession,
  httpError,
} from "../lib/request-helpers.js";
import { requireSession, requireTenantSession } from "../middleware/session.js";

export const liveSessionsRouter = Router();

/** GET /api/live-sessions */
liveSessionsRouter.get("/", requireSession, async (request, response) => {
  const { courseId, tenantId: queryTenantId } = request.query as Record<
    string,
    string
  >;
  const tenantId = queryTenantId ?? request.session.activeTenantId;

  if (courseId) {
    return response.json(await liveSessionRepository.list({ courseId }));
  }
  if (tenantId) {
    return response.json(await liveSessionRepository.list({ tenantId }));
  }
  response.json([]);
});

/** POST /api/live-sessions */
liveSessionsRouter.post(
  "/",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    assertAdminAccess(actor);
    const tenantId = request.session.activeTenantId!;
    const { sessionData } = request.body;

    if (sessionData.courseId) {
      const course = await courseRepository.getById(sessionData.courseId);
      if (!course || course.tenantId !== tenantId) {
        throw httpError(403, "Course does not belong to the current tenant.");
      }
    }

    const created = await liveSessionRepository.create({
      ...sessionData,
      attendees: [],
      createdAt: Date.now(),
      instructorId: actor.id,
      tenantId,
    });
    if (!created) throw httpError(500, "Failed to create live session.");
    response.status(201).json({ id: created.id });
  },
);

/** GET /api/live-sessions/:sessionId */
liveSessionsRouter.get(
  "/:sessionId",
  requireSession,
  async (request, response) => {
    const session = await liveSessionRepository.getById(
      request.params.sessionId,
    );
    if (!session) return response.json(null);
    response.json(session);
  },
);

/** PATCH /api/live-sessions/:sessionId */
liveSessionsRouter.patch(
  "/:sessionId",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    assertAdminAccess(actor);
    const tenantId = request.session.activeTenantId!;

    const session = await liveSessionRepository.getById(
      request.params.sessionId,
    );
    if (!session) throw httpError(404, "Live session not found.");
    if (session.tenantId !== tenantId) throw httpError(403, "Access denied.");

    const updated = await liveSessionRepository.update(
      request.params.sessionId,
      request.body.sessionData ?? request.body,
    );
    if (!updated) throw httpError(500, "Failed to update live session.");
    response.json({ id: updated.id });
  },
);

/** DELETE /api/live-sessions/:sessionId */
liveSessionsRouter.delete(
  "/:sessionId",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    assertAdminAccess(actor);
    const tenantId = request.session.activeTenantId!;

    const session = await liveSessionRepository.getById(
      request.params.sessionId,
    );
    if (!session) throw httpError(404, "Live session not found.");
    if (session.tenantId !== tenantId) throw httpError(403, "Access denied.");

    await liveSessionRepository.delete(request.params.sessionId);
    response.json({ success: true });
  },
);

/** POST /api/live-sessions/:sessionId/join */
liveSessionsRouter.post(
  "/:sessionId/join",
  requireSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    if (!actor) throw httpError(401, "Unauthorized");

    const session = await liveSessionRepository.getById(
      request.params.sessionId,
    );
    if (!session) throw httpError(404, "Live session not found.");

    const attendees = session.attendees ?? [];
    if (!attendees.includes(actor.id)) {
      await liveSessionRepository.update(request.params.sessionId, {
        attendees: [...attendees, actor.id],
      });
    }

    void activityLogRepository.create({
      action: "live_session_joined",
      sessionId: request.params.sessionId,
      tenantId: session.tenantId,
      userId: actor.id,
    });

    response.json({ success: true });
  },
);

/** POST /api/live-sessions/:sessionId/leave */
liveSessionsRouter.post(
  "/:sessionId/leave",
  requireSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    if (!actor) throw httpError(401, "Unauthorized");

    const session = await liveSessionRepository.getById(
      request.params.sessionId,
    );
    if (!session) throw httpError(404, "Live session not found.");

    await liveSessionRepository.update(request.params.sessionId, {
      attendees: (session.attendees ?? []).filter((id) => id !== actor.id),
    });

    response.json({ success: true });
  },
);
