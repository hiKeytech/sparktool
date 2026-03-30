import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { notificationRepository } from "@/server/repositories/notification-repository";

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
    const createdNotification = await notificationRepository.create(data);

    if (!createdNotification) {
      throw new Error("Failed to create notification.");
    }

    return createdNotification.id;
  });

export const getUnreadNotificationCountFn = createServerFn({ method: "GET" })
  .inputValidator((userId: string) => userId)
  .handler(async ({ data }) => {
    return notificationRepository.countUnread(data);
  });

export const listNotificationsFn = createServerFn({ method: "GET" })
  .inputValidator((userId: string) => userId)
  .handler(async ({ data }) => {
    return notificationRepository.list(data);
  });

export const markAllNotificationsAsReadFn = createServerFn({ method: "POST" })
  .inputValidator((userId: string) => userId)
  .handler(async ({ data }) => {
    await notificationRepository.markAllAsRead(data);
    return { success: true };
  });

export const markNotificationAsReadFn = createServerFn({ method: "POST" })
  .inputValidator((notificationId: string) => notificationId)
  .handler(async ({ data }) => {
    await notificationRepository.markAsRead(data);
    return { success: true };
  });
