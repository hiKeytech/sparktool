import { randomUUID } from "node:crypto";
import type { Collection, Filter, Sort } from "mongodb";

import {
  liveSessionSchema,
  type LiveSession,
} from "sparktool-contracts/live-session";
import { getMongoDb } from "../db/mongo.js";

type LiveSessionDocument = Omit<LiveSession, "id"> & { _id: string };
export type StoredLiveSession = LiveSession;

function parseStoredLiveSession(
  document: LiveSessionDocument | null,
): null | StoredLiveSession {
  if (!document) {
    return null;
  }

  const result = liveSessionSchema.safeParse({
    ...document,
    id: document._id,
  });

  if (!result.success) {
    console.error("Invalid live session document", result.error);
    return null;
  }

  return result.data;
}

async function getLiveSessionCollection(): Promise<
  Collection<LiveSessionDocument>
> {
  const db = await getMongoDb();
  return db.collection<LiveSessionDocument>("liveSessions");
}

export const liveSessionRepository = {
  async create(sessionData: Omit<LiveSession, "id"> & { id?: string }) {
    const sessions = await getLiveSessionCollection();
    const sessionId = sessionData.id || randomUUID();
    const document: LiveSessionDocument = {
      ...sessionData,
      _id: sessionId,
    };

    await sessions.insertOne(document);

    return parseStoredLiveSession(document);
  },

  async delete(sessionId: string) {
    const sessions = await getLiveSessionCollection();
    await sessions.deleteOne({ _id: sessionId });
  },

  async getById(sessionId?: string) {
    if (!sessionId) {
      return null;
    }

    const sessions = await getLiveSessionCollection();
    const session = await sessions.findOne({ _id: sessionId });

    return parseStoredLiveSession(session);
  },

  async list(
    filters: Partial<{
      courseId: string;
      instructorId: string;
      status: string;
      tenantId: string;
    }> = {},
  ) {
    const sessions = await getLiveSessionCollection();
    const query: Filter<LiveSessionDocument> = {};

    if (filters.courseId) {
      query.courseId = filters.courseId;
    }

    if (filters.instructorId) {
      query.instructorId = filters.instructorId;
    }

    if (filters.status) {
      query.status = filters.status as LiveSession["status"];
    }

    if (filters.tenantId) {
      query.tenantId = filters.tenantId;
    }

    const sort: Sort = { scheduledAt: -1 };

    return (await sessions.find(query).sort(sort).toArray())
      .map((document) => parseStoredLiveSession(document))
      .filter((session): session is StoredLiveSession => session !== null);
  },

  async update(sessionId: string, updates: Partial<LiveSession>) {
    const sessions = await getLiveSessionCollection();

    await sessions.updateOne(
      { _id: sessionId },
      {
        $set: {
          ...updates,
          updatedAt: Date.now(),
        },
      },
    );

    return this.getById(sessionId);
  },
};
