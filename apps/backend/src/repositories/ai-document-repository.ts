import { randomUUID } from "node:crypto";
import type { Collection, Filter, Sort } from "mongodb";
import { aiDocumentSchema, type AiDocument } from "sparktool-contracts/ai";

import { getMongoDb } from "../db/mongo.js";

type StoredAiDocument = AiDocument & {
  chunks: string[];
};

type AiDocumentRecord = Omit<StoredAiDocument, "id"> & {
  _id: string;
};

function parseStoredDocument(document: AiDocumentRecord | null) {
  if (!document) {
    return null;
  }

  const parsed = aiDocumentSchema.safeParse({
    ...document,
    id: document._id,
  });

  if (!parsed.success) {
    console.error("Invalid AI document", parsed.error);
    return null;
  }

  return {
    ...parsed.data,
    chunks: Array.isArray(document.chunks)
      ? document.chunks.filter((chunk) => typeof chunk === "string")
      : [],
  } satisfies StoredAiDocument;
}

async function getAiDocumentCollection(): Promise<Collection<AiDocumentRecord>> {
  const db = await getMongoDb();
  return db.collection<AiDocumentRecord>("aiDocuments");
}

export const aiDocumentRepository = {
  async create(
    data: Omit<StoredAiDocument, "id"> & {
      id?: string;
    },
  ) {
    const documents = await getAiDocumentCollection();
    const id = data.id ?? randomUUID();
    const parsed = aiDocumentSchema.parse({
      ...data,
      id,
    });

    await documents.insertOne({
      ...parsed,
      _id: id,
      chunks: data.chunks,
    });

    return {
      ...parsed,
      chunks: data.chunks,
    } satisfies StoredAiDocument;
  },

  async getById(id: string) {
    const documents = await getAiDocumentCollection();
    return parseStoredDocument(await documents.findOne({ _id: id }));
  },

  async listByStudent(filters: {
    courseId?: null | string;
    lessonId?: null | string;
    studentId: string;
    tenantId: string;
  }) {
    const documents = await getAiDocumentCollection();
    const query: Filter<AiDocumentRecord> = {
      studentId: filters.studentId,
      tenantId: filters.tenantId,
    };
    const sort: Sort = { updatedAt: -1 };

    if (filters.courseId !== undefined) {
      query.courseId = filters.courseId ?? null;
    }

    if (filters.lessonId !== undefined) {
      query.lessonId = filters.lessonId ?? null;
    }

    return (
      await documents.find(query).sort(sort).toArray()
    )
      .map((document) => parseStoredDocument(document))
      .filter((document): document is StoredAiDocument => document !== null);
  },
};
