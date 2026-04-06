import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  api,
  type ApiCountResponse,
  type ApiIdResponse,
  type ApiSuccessResponse,
} from "@/lib/api-client";
import type { Notification } from "@/types";

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
    return api.post<ApiIdResponse>("/api/notifications", data);
  });

export const getUnreadNotificationCountFn = createServerFn({ method: "GET" })
  .inputValidator((userId: string) => userId)
  .handler(async ({ data }) => {
    return api.get<ApiCountResponse>(
      `/api/notifications/user/${data}/unread-count`,
    );
  });

export const listNotificationsFn = createServerFn({ method: "GET" })
  .inputValidator((userId: string) => userId)
  .handler(async ({ data }) => {
    return api.get<Notification[]>(`/api/notifications/user/${data}`);
  });

export const markAllNotificationsAsReadFn = createServerFn({ method: "POST" })
  .inputValidator((userId: string) => userId)
  .handler(async ({ data }) => {
    return api.post<ApiSuccessResponse>(
      `/api/notifications/user/${data}/mark-all-read`,
      {},
    );
  });

export const markNotificationAsReadFn = createServerFn({ method: "POST" })
  .inputValidator((notificationId: string) => notificationId)
  .handler(async ({ data }) => {
    return api.patch<ApiIdResponse>(`/api/notifications/${data}/read`, {});
  });
