import { randomUUID } from "node:crypto";
import type { Collection, Sort } from "mongodb";

import type { Notification } from "sparktool-contracts/quiz";
import { getMongoDb } from "../db/mongo";

type NotificationDocument = Omit<Notification, "id"> & { _id: string };
export type StoredNotification = Notification;

function parseStoredNotification(
  document: NotificationDocument | null,
): null | StoredNotification {
  if (!document) {
    return null;
  }

  return {
    ...document,
    id: document._id,
  };
}

async function getNotificationCollection(): Promise<
  Collection<NotificationDocument>
> {
  const db = await getMongoDb();
  return db.collection<NotificationDocument>("notifications");
}

export const notificationRepository = {
  async create(notificationData: Omit<Notification, "id"> & { id?: string }) {
    const notifications = await getNotificationCollection();
    const notificationId = notificationData.id || randomUUID();
    const document: NotificationDocument = {
      ...notificationData,
      _id: notificationId,
    };

    await notifications.insertOne(document);

    return parseStoredNotification(document);
  },

  async getById(notificationId: string) {
    const notifications = await getNotificationCollection();
    const notification = await notifications.findOne({ _id: notificationId });

    return parseStoredNotification(notification);
  },

  async countUnread(userId: string) {
    const notifications = await getNotificationCollection();
    return notifications.countDocuments({ isRead: false, userId });
  },

  async list(userId: string) {
    const notifications = await getNotificationCollection();
    const sort: Sort = { createdAt: -1 };

    return (await notifications.find({ userId }).sort(sort).toArray())
      .map((document) => parseStoredNotification(document))
      .filter(
        (notification): notification is StoredNotification =>
          notification !== null,
      );
  },

  async markAllAsRead(userId: string) {
    const notifications = await getNotificationCollection();
    await notifications.updateMany(
      { isRead: false, userId },
      {
        $set: {
          isRead: true,
          readAt: Date.now(),
        },
      },
    );
  },

  async markAsRead(notificationId: string) {
    const notifications = await getNotificationCollection();
    await notifications.updateOne(
      { _id: notificationId },
      {
        $set: {
          isRead: true,
          readAt: Date.now(),
        },
      },
    );
  },
};
