import { randomUUID } from "node:crypto";
import type { Collection, Filter, Sort } from "mongodb";

import {
  aiPracticeQuizSessionSchema,
  type AiPracticeQuizSession,
} from "sparktool-contracts/ai";
import { getMongoDb } from "../db/mongo.js";

type AiPracticeQuizSessionDocument = Omit<AiPracticeQuizSession, "id"> & {
  _id: string;
};

function parseStoredSession(
  document: AiPracticeQuizSessionDocument | null,
): AiPracticeQuizSession | null {
  if (!document) {
    return null;
  }

  const parsed = aiPracticeQuizSessionSchema.safeParse({
    ...document,
    id: document._id,
  });

  if (!parsed.success) {
    console.error("Invalid AI practice session document", parsed.error);
    return null;
  }

  return parsed.data;
}

async function getAiPracticeSessionCollection(): Promise<
  Collection<AiPracticeQuizSessionDocument>
> {
  const db = await getMongoDb();
  return db.collection<AiPracticeQuizSessionDocument>("aiPracticeQuizSessions");
}

export const aiPracticeSessionRepository = {
  async create(
    data: Omit<AiPracticeQuizSession, "id"> & {
      id?: string;
    },
  ) {
    const sessions = await getAiPracticeSessionCollection();
    const id = data.id ?? randomUUID();
    const parsed = aiPracticeQuizSessionSchema.parse({
      ...data,
      id,
    });
    const { id: _ignoredId, ...document } = parsed;

    await sessions.insertOne({
      ...document,
      _id: id,
    });

    return parsed;
  },

  async getById(id: string) {
    const sessions = await getAiPracticeSessionCollection();
    return parseStoredSession(await sessions.findOne({ _id: id }));
  },

  async list(
    filters: Partial<{
      courseId: string;
      studentId: string;
      tenantId: string;
    }> = {},
  ) {
    const sessions = await getAiPracticeSessionCollection();
    const query: Filter<AiPracticeQuizSessionDocument> = {};

    if (filters.courseId) {
      query.courseId = filters.courseId;
    }

    if (filters.studentId) {
      query.studentId = filters.studentId;
    }

    if (filters.tenantId) {
      query.tenantId = filters.tenantId;
    }

    const sort: Sort = { createdAt: -1 };

    return (await sessions.find(query).sort(sort).toArray())
      .map((document) => parseStoredSession(document))
      .filter((session): session is AiPracticeQuizSession => session !== null);
  },

  async update(id: string, updates: Partial<AiPracticeQuizSession>) {
    const sessions = await getAiPracticeSessionCollection();

    await sessions.updateOne(
      { _id: id },
      {
        $set: updates,
      },
    );

    return this.getById(id);
  },
};
