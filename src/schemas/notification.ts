import {
  type CreateNotificationFormData,
  createNotificationSchema,
} from "@/schemas";

export const notification = {
  create: async (notificationData: CreateNotificationFormData) => {
    const validatedData = createNotificationSchema.parse(notificationData);
    const { createNotificationFn } = await import("@/server/notifications");
    return createNotificationFn({ data: validatedData });
  },
  getUnreadCount: async (userId: string) => {
    const { getUnreadNotificationCountFn } =
      await import("@/server/notifications");
    return getUnreadNotificationCountFn({ data: userId });
  },
  list: async (userId: string) => {
    const { listNotificationsFn } = await import("@/server/notifications");
    return listNotificationsFn({ data: userId });
  },
  markAllAsRead: async (userId: string) => {
    const { markAllNotificationsAsReadFn } =
      await import("@/server/notifications");
    return markAllNotificationsAsReadFn({ data: userId });
  },
  markAsRead: async (notificationId: string) => {
    const { markNotificationAsReadFn } = await import("@/server/notifications");
    return markNotificationAsReadFn({ data: notificationId });
  },
};
