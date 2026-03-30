import { randomUUID } from "node:crypto";
import type { Collection, Filter, Sort } from "mongodb";

import type { CourseQuiz } from "@/types";
import { getMongoDb } from "@/server/db/mongo";

type CourseQuizDocument = Omit<CourseQuiz, "id"> & { _id: string };
export type StoredCourseQuiz = CourseQuiz;

function parseStoredCourseQuiz(
  document: CourseQuizDocument | null,
): null | StoredCourseQuiz {
  if (!document) {
    return null;
  }

  return {
    ...document,
    id: document._id,
  };
}

async function getCourseQuizCollection(): Promise<
  Collection<CourseQuizDocument>
> {
  const db = await getMongoDb();
  return db.collection<CourseQuizDocument>("courseQuizzes");
}

export const courseQuizRepository = {
  async create(quizData: Omit<CourseQuiz, "id"> & { id?: string }) {
    const quizzes = await getCourseQuizCollection();
    const quizId = quizData.id || randomUUID();
    const document: CourseQuizDocument = {
      ...quizData,
      _id: quizId,
      createdAt: quizData.createdAt ?? Date.now(),
      updatedAt: Date.now(),
    };

    await quizzes.insertOne(document);

    return parseStoredCourseQuiz(document);
  },

  async delete(quizId: string) {
    const quizzes = await getCourseQuizCollection();
    await quizzes.deleteOne({ _id: quizId });
  },

  async getById(quizId: string) {
    const quizzes = await getCourseQuizCollection();
    const quiz = await quizzes.findOne({ _id: quizId });

    return parseStoredCourseQuiz(quiz);
  },

  async list(filters?: {
    courseId?: string;
    lessonId?: string;
    placement?: "course" | "lesson" | "section";
    sectionId?: string;
  }) {
    const quizzes = await getCourseQuizCollection();
    const query: Filter<CourseQuizDocument> = {};

    if (filters?.courseId) {
      query.courseId = filters.courseId;
    }

    if (filters?.sectionId) {
      query.sectionId = filters.sectionId;
    }

    if (filters?.lessonId) {
      query.lessonId = filters.lessonId;
    }

    if (filters?.placement) {
      query.placement = filters.placement;
    }

    const sort: Sort = { order: 1, createdAt: 1 };

    return (await quizzes.find(query).sort(sort).toArray())
      .map((document) => parseStoredCourseQuiz(document))
      .filter((quiz): quiz is StoredCourseQuiz => quiz !== null);
  },

  async update(quizId: string, updates: Partial<Omit<CourseQuiz, "id">>) {
    const quizzes = await getCourseQuizCollection();

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
