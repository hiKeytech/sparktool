import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { notificationRepository } from "@/server/repositories/notification-repository";
import { userRepository } from "@/server/repositories/user-repository";
import {
  assertTenantAdminAccess,
  requireTenantScopedActor,
  userHasTenantAccess,
} from "@/server/tenant-context";

const createNotificationInputSchema = z.object({
  category: z.enum(["achievement", "message", "reminder", "system"]),
  createdAt: z.number(),
  fromUserId: z.string().optional(),
  fromUserName: z.string().optional(),
  isRead: z.boolean(),
  message: z.string().min(1),
  title: z.string().min(1),
  userId: z.string().min(1),
});

export const createNotificationFn = createServerFn({ method: "POST" })
  .inputValidator(createNotificationInputSchema)
  .handler(async ({ data }) => {
    const { actor, tenant } = await requireTenantScopedActor();
    const recipient = await userRepository.getById(data.userId);

    if (!recipient) {
      throw new Error("Notification recipient not found.");
    }

    if (!userHasTenantAccess(recipient, tenant?.id)) {
      throw new Error(
        "Notification recipient does not belong to the current tenant.",
      );
    }

    if (actor.id !== data.userId) {
      assertTenantAdminAccess(
        actor,
        "You do not have permission to create notifications for another user.",
      );
    }

    const createdNotification = await notificationRepository.create({
      ...data,
      fromUserId: actor.id,
      fromUserName: actor.displayName,
    });

    if (!createdNotification) {
      throw new Error("Failed to create notification.");
    }

    return createdNotification.id;
  });

export const getUnreadNotificationCountFn = createServerFn({ method: "GET" })
  .inputValidator((userId: string) => userId)
  .handler(async ({ data }) => {
    const { actor, tenant } = await requireTenantScopedActor();
    const targetUser = await userRepository.getById(data);

    if (!targetUser || !userHasTenantAccess(targetUser, tenant?.id)) {
      throw new Error("User does not belong to the current tenant.");
    }

    if (actor.id !== data) {
      assertTenantAdminAccess(
        actor,
        "You do not have permission to read another user's notifications.",
      );
    }

    return notificationRepository.countUnread(data);
  });

export const listNotificationsFn = createServerFn({ method: "GET" })
  .inputValidator((userId: string) => userId)
  .handler(async ({ data }) => {
    const { actor, tenant } = await requireTenantScopedActor();
    const targetUser = await userRepository.getById(data);

    if (!targetUser || !userHasTenantAccess(targetUser, tenant?.id)) {
      throw new Error("User does not belong to the current tenant.");
    }

    if (actor.id !== data) {
      assertTenantAdminAccess(
        actor,
        "You do not have permission to read another user's notifications.",
      );
    }

    return notificationRepository.list(data);
  });

export const markAllNotificationsAsReadFn = createServerFn({ method: "POST" })
  .inputValidator((userId: string) => userId)
  .handler(async ({ data }) => {
    const { actor, tenant } = await requireTenantScopedActor();
    const targetUser = await userRepository.getById(data);

    if (!targetUser || !userHasTenantAccess(targetUser, tenant?.id)) {
      throw new Error("User does not belong to the current tenant.");
    }

    if (actor.id !== data) {
      assertTenantAdminAccess(
        actor,
        "You do not have permission to update another user's notifications.",
      );
    }

    await notificationRepository.markAllAsRead(data);
    return { success: true };
  });

export const markNotificationAsReadFn = createServerFn({ method: "POST" })
  .inputValidator((notificationId: string) => notificationId)
  .handler(async ({ data }) => {
    const { actor, tenant } = await requireTenantScopedActor();
    const notification = await notificationRepository.getById(data);

    if (!notification) {
      throw new Error("Notification not found.");
    }

    const targetUser = await userRepository.getById(notification.userId);

    if (!targetUser || !userHasTenantAccess(targetUser, tenant?.id)) {
      throw new Error("Notification does not belong to the current tenant.");
    }

    if (actor.id !== notification.userId) {
      assertTenantAdminAccess(
        actor,
        "You do not have permission to update another user's notifications.",
      );
    }

    await notificationRepository.markAsRead(data);
    return { success: true };
  });
