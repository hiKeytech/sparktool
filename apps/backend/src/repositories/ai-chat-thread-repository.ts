import { randomUUID } from "node:crypto";
import type { Collection, Filter, Sort } from "mongodb";

import { aiChatThreadSchema, type AiChatThread } from "sparktool-contracts/ai";
import { getMongoDb } from "../db/mongo.js";

type AiChatThreadDocument = Omit<AiChatThread, "id"> & {
  _id: string;
};

function parseStoredThread(document: AiChatThreadDocument | null) {
  if (!document) {
    return null;
  }

  const parsed = aiChatThreadSchema.safeParse({
    ...document,
    id: document._id,
  });

  if (!parsed.success) {
    console.error("Invalid AI chat thread document", parsed.error);
    return null;
  }

  return parsed.data;
}

async function getAiChatThreadCollection(): Promise<
  Collection<AiChatThreadDocument>
> {
  const db = await getMongoDb();
  return db.collection<AiChatThreadDocument>("aiChatThreads");
}

export const aiChatThreadRepository = {
  async create(
    data: Omit<AiChatThread, "id"> & {
      id?: string;
    },
  ) {
    const threads = await getAiChatThreadCollection();
    const id = data.id ?? randomUUID();
    const parsed = aiChatThreadSchema.parse({
      ...data,
      id,
    });
    const { id: _ignoredId, ...document } = parsed;

    await threads.insertOne({
      ...document,
      _id: id,
    });

    return parsed;
  },

  async getById(id: string) {
    const threads = await getAiChatThreadCollection();
    return parseStoredThread(await threads.findOne({ _id: id }));
  },

  async getLatestForStudent(filters: {
    courseId?: null | string;
    lessonId?: null | string;
    studentId: string;
    tenantId: string;
  }) {
    const threads = await getAiChatThreadCollection();
    const query: Filter<AiChatThreadDocument> = {
      studentId: filters.studentId,
      tenantId: filters.tenantId,
    };

    if (filters.courseId !== undefined) {
      query.courseId = filters.courseId ?? null;
    }

    if (filters.lessonId !== undefined) {
      query.lessonId = filters.lessonId ?? null;
    }

    return parseStoredThread(
      await threads.findOne(query, { sort: { updatedAt: -1 } }),
    );
  },

  async listByStudent(studentId: string, tenantId: string) {
    const threads = await getAiChatThreadCollection();
    const sort: Sort = { updatedAt: -1 };

    return (
      await threads
        .find({
          studentId,
          tenantId,
        })
        .sort(sort)
        .toArray()
    )
      .map((document) => parseStoredThread(document))
      .filter((thread): thread is AiChatThread => thread !== null);
  },

  async update(id: string, updates: Partial<AiChatThread>) {
    const threads = await getAiChatThreadCollection();

    await threads.updateOne(
      { _id: id },
      {
        $set: updates,
      },
    );

    return this.getById(id);
  },
};
