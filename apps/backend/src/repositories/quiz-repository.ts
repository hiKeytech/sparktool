import { randomUUID } from "node:crypto";
import type { Collection, Filter, Sort } from "mongodb";

import type { Quiz } from "sparktool-contracts/quiz";
import { getMongoDb } from "../db/mongo";

type QuizDocument = Omit<Quiz, never> & {
  _id: string;
  deleted?: boolean;
  deletedAt?: number;
};
export type StoredQuiz = Quiz & { id: string };

function parseStoredQuiz(document: QuizDocument | null): null | StoredQuiz {
  if (!document || document.deleted) {
    return null;
  }

  return {
    ...document,
    id: document._id,
  };
}

async function getQuizCollection(): Promise<Collection<QuizDocument>> {
  const db = await getMongoDb();
  return db.collection<QuizDocument>("quizzes");
}

export const quizRepository = {
  async create(quizData: Omit<Quiz, never> & { id?: string }) {
    const quizzes = await getQuizCollection();
    const quizId = quizData.id || randomUUID();
    const document: QuizDocument = {
      ...quizData,
      _id: quizId,
      createdAt: quizData.createdAt ?? Date.now(),
      updatedAt: Date.now(),
    };

    await quizzes.insertOne(document);

    return parseStoredQuiz(document);
  },

  async softDelete(quizId: string) {
    const quizzes = await getQuizCollection();
    await quizzes.updateOne(
      { _id: quizId },
      {
        $set: {
          deleted: true,
          deletedAt: Date.now(),
          updatedAt: Date.now(),
        },
      },
    );
  },

  async getById(quizId?: string) {
    if (!quizId) {
      return null;
    }

    const quizzes = await getQuizCollection();
    const quiz = await quizzes.findOne({ _id: quizId });

    return parseStoredQuiz(quiz);
  },

  async list(courseId?: string) {
    const quizzes = await getQuizCollection();
    const query: Filter<QuizDocument> = {
      $or: [{ deleted: { $exists: false } }, { deleted: false }],
    };

    if (courseId) {
      query.courseId = courseId;
    }

    const sort: Sort = { createdAt: -1 };

    return (await quizzes.find(query).sort(sort).toArray())
      .map((document) => parseStoredQuiz(document))
      .filter((quiz): quiz is StoredQuiz => quiz !== null);
  },

  async update(quizId: string, updates: Partial<Quiz>) {
    const quizzes = await getQuizCollection();

    await quizzes.updateOne(
      { _id: quizId },
      {
        $set: {
          ...updates,
          updatedAt: Date.now(),
        },
      },
    );

    return this.getById(quizId);
  },
};
