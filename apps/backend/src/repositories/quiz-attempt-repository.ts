import { randomUUID } from "node:crypto";
import type { Collection, Filter, Sort } from "mongodb";

import type { QuizAttempt } from "sparktool-contracts/quiz";
import { getMongoDb } from "../db/mongo";

type QuizAttemptDocument = Omit<QuizAttempt, "id"> & { _id: string };
export type StoredQuizAttempt = QuizAttempt;

function parseStoredQuizAttempt(
  document: QuizAttemptDocument | null,
): null | StoredQuizAttempt {
  if (!document) {
    return null;
  }

  return {
    ...document,
    id: document._id,
  };
}

async function getQuizAttemptCollection(): Promise<
  Collection<QuizAttemptDocument>
> {
  const db = await getMongoDb();
  return db.collection<QuizAttemptDocument>("quizAttempts");
}

export const quizAttemptRepository = {
  async create(attemptData: Omit<QuizAttempt, "id"> & { id?: string }) {
    const attempts = await getQuizAttemptCollection();
    const attemptId = attemptData.id || randomUUID();
    const document: QuizAttemptDocument = {
      ...attemptData,
      _id: attemptId,
    };

    await attempts.insertOne(document);

    return parseStoredQuizAttempt(document);
  },

  async getById(attemptId: string) {
    const attempts = await getQuizAttemptCollection();
    const attempt = await attempts.findOne({ _id: attemptId });

    return parseStoredQuizAttempt(attempt);
  },

  async list(
    filters: Partial<{
      courseId: string;
      quizId: string;
      studentId: string;
    }> = {},
  ) {
    const attempts = await getQuizAttemptCollection();
    const query: Filter<QuizAttemptDocument> = {};

    if (filters.studentId) {
      query.studentId = filters.studentId;
    }

    if (filters.quizId) {
      query.quizId = filters.quizId;
    }

    if (filters.courseId) {
      query.courseId = filters.courseId;
    }

    const sort: Sort = { startedAt: -1 };

    return (await attempts.find(query).sort(sort).toArray())
      .map((document) => parseStoredQuizAttempt(document))
      .filter((attempt): attempt is StoredQuizAttempt => attempt !== null);
  },

  async nextAttemptNumber(input: { quizId: string; studentId: string }) {
    const attempts = await this.list(input);
    return (
      attempts.reduce((highestAttemptNumber, attempt) => {
        return Math.max(highestAttemptNumber, attempt.attemptNumber ?? 0);
      }, 0) + 1
    );
  },

  async update(attemptId: string, updates: Partial<QuizAttempt>) {
    const attempts = await getQuizAttemptCollection();

    await attempts.updateOne(
      { _id: attemptId },
      {
        $set: updates,
      },
    );

    return this.getById(attemptId);
  },
};
