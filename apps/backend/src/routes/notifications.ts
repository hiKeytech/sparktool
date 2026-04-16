import { Router } from "express";

import { notificationRepository } from "../repositories/notification-repository.js";
import { userRepository } from "../repositories/user-repository.js";
import {
  assertAdminAccess,
  getActorFromSession,
  httpError,
  userHasTenantAccess,
} from "../lib/request-helpers.js";
import { requireSession, requireTenantSession } from "../middleware/session.js";

export const notificationsRouter = Router();

/** GET /api/notifications/user/:userId */
notificationsRouter.get(
  "/user/:userId",
  requireSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    if (!actor) throw httpError(401, "Unauthorized");

    const targetId =
      (request.params.userId as string) === "me"
        ? actor.id
        : (request.params.userId as string);

    if (
      actor.id !== targetId &&
      actor.role !== "admin" &&
      actor.role !== "super-admin"
    ) {
      throw httpError(403, "Access denied.");
    }

    const { limit } = request.query as Record<string, string>;
    const all = await notificationRepository.list(targetId);
    response.json(limit ? all.slice(0, Number(limit)) : all);
  },
);

/** GET /api/notifications/user/:userId/unread-count */
notificationsRouter.get(
  "/user/:userId/unread-count",
  requireSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    if (!actor) throw httpError(401, "Unauthorized");

    const targetId =
      (request.params.userId as string) === "me"
        ? actor.id
        : (request.params.userId as string);

    if (
      actor.id !== targetId &&
      actor.role !== "admin" &&
      actor.role !== "super-admin"
    ) {
      throw httpError(403, "Access denied.");
    }

    const count = await notificationRepository.countUnread(targetId);
    response.json({ count });
  },
);

/** POST /api/notifications */
notificationsRouter.post(
  "/",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    assertAdminAccess(actor);
    const tenantId = request.session.activeTenantId!;

    const { notificationData } = request.body;
    const { userId } = notificationData;

    const user = await userRepository.getById(userId);
    if (!user || !userHasTenantAccess(user, tenantId)) {
      throw httpError(403, "User does not belong to the current tenant.");
    }

    const created = await notificationRepository.create({
      ...notificationData,
      createdAt: Date.now(),
      isRead: false,
      tenantId,
    });
    if (!created) throw httpError(500, "Failed to create notification.");
    response.status(201).json({ id: created.id });
  },
);

/** POST /api/notifications/user/:userId/mark-all-read */
notificationsRouter.post(
  "/user/:userId/mark-all-read",
  requireSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    if (!actor) throw httpError(401, "Unauthorized");

    const targetId =
      (request.params.userId as string) === "me"
        ? actor.id
        : (request.params.userId as string);

    if (
      actor.id !== targetId &&
      actor.role !== "admin" &&
      actor.role !== "super-admin"
    ) {
      throw httpError(403, "Access denied.");
    }

    await notificationRepository.markAllAsRead(targetId);
    response.json({ success: true });
  },
);

/** PATCH /api/notifications/:notificationId/read */
notificationsRouter.patch(
  "/:notificationId/read",
  requireSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    if (!actor) throw httpError(401, "Unauthorized");

    const notification = await notificationRepository.getById(
      request.params.notificationId as string,
    );
    if (!notification) throw httpError(404, "Notification not found.");
    if (
      notification.userId !== actor.id &&
      actor.role !== "admin" &&
      actor.role !== "super-admin"
    ) {
      throw httpError(403, "Access denied.");
    }

    await notificationRepository.markAsRead(
      request.params.notificationId as string,
    );
    response.json({ id: request.params.notificationId as string });
  },
);
