import { Router } from "express";

import { activityLogRepository } from "../repositories/activity-log-repository.js";
import { courseRepository } from "../repositories/course-repository.js";
import { liveSessionRepository } from "../repositories/live-session-repository.js";
import {
  assertAdminAccess,
  getActorFromSession,
  httpError,
} from "../lib/request-helpers.js";
import { buildMeetingSlug } from "../lib/live-session.js";
import { requireSession, requireTenantSession } from "../middleware/session.js";

export const liveSessionsRouter = Router();

function getSessionIdParam(sessionId: string | string[] | undefined) {
  const resolvedSessionId = Array.isArray(sessionId) ? sessionId[0] : sessionId;

  if (!resolvedSessionId) {
    throw httpError(400, "Live session ID is required.");
  }

  return resolvedSessionId;
}

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
      createdAt: Date.now(),
      instructorId: actor.id,
      jitsiMeetUrl: `https://meet.jit.si/${buildMeetingSlug(`${tenantId}-${sessionData.title}`)}`,
      meetingId: buildMeetingSlug(`${tenantId}-${sessionData.title}`),
      participants: [],
      status: "scheduled",
      tenantId,
      updatedAt: Date.now(),
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
    const sessionId = getSessionIdParam(request.params.sessionId);
    const session = await liveSessionRepository.getById(sessionId);
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
    const sessionId = getSessionIdParam(request.params.sessionId);

    const session = await liveSessionRepository.getById(sessionId);
    if (!session) throw httpError(404, "Live session not found.");
    if (session.tenantId !== tenantId) throw httpError(403, "Access denied.");

    const updated = await liveSessionRepository.update(
      sessionId,
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
    const sessionId = getSessionIdParam(request.params.sessionId);

    const session = await liveSessionRepository.getById(sessionId);
    if (!session) throw httpError(404, "Live session not found.");
    if (session.tenantId !== tenantId) throw httpError(403, "Access denied.");

    await liveSessionRepository.delete(sessionId);
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
    const sessionId = getSessionIdParam(request.params.sessionId);

    const session = await liveSessionRepository.getById(sessionId);
    if (!session) throw httpError(404, "Live session not found.");

    const participants = session.participants ?? [];
    if (!participants.includes(actor.id)) {
      await liveSessionRepository.update(sessionId, {
        participants: [...participants, actor.id],
      });
    }

    void activityLogRepository.create({
      action: "live_session_joined",
      sessionId,
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
    const sessionId = getSessionIdParam(request.params.sessionId);

    const session = await liveSessionRepository.getById(sessionId);
    if (!session) throw httpError(404, "Live session not found.");

    await liveSessionRepository.update(sessionId, {
      participants: (session.participants ?? []).filter(
        (id) => id !== actor.id,
      ),
    });

    response.json({ success: true });
  },
);
