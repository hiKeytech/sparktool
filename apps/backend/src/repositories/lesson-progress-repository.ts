import { randomUUID } from "node:crypto";
import type { Collection, Filter, Sort } from "mongodb";

import type { LessonProgress } from "sparktool-contracts/quiz";
import { getMongoDb } from "../db/mongo.js";

type LessonProgressDocument = Omit<LessonProgress, never> & { _id: string };
export type StoredLessonProgress = LessonProgress & { id: string };

function parseStoredLessonProgress(
  document: LessonProgressDocument | null,
): null | StoredLessonProgress {
  if (!document) {
    return null;
  }

  return {
    ...document,
    id: document._id,
  };
}

async function getLessonProgressCollection(): Promise<
  Collection<LessonProgressDocument>
> {
  const db = await getMongoDb();
  return db.collection<LessonProgressDocument>("lessonProgress");
}

export const lessonProgressRepository = {
  async create(progressData: Omit<LessonProgress, never> & { id?: string }) {
    const progressCollection = await getLessonProgressCollection();
    const id = progressData.id || randomUUID();
    const document: LessonProgressDocument = {
      ...progressData,
      _id: id,
      lastAccessedAt: Date.now(),
    };

    await progressCollection.insertOne(document);

    return parseStoredLessonProgress(document);
  },

  async getById(progressId: string) {
    const progressCollection = await getLessonProgressCollection();
    const progress = await progressCollection.findOne({ _id: progressId });

    return parseStoredLessonProgress(progress);
  },

  async getByStudentAndLesson(input: { lessonId: string; studentId: string }) {
    const progressCollection = await getLessonProgressCollection();
    const query: Filter<LessonProgressDocument> = {
      lessonId: input.lessonId,
      studentId: input.studentId,
    };
    const progress = await progressCollection.findOne(query);

    return parseStoredLessonProgress(progress);
  },

  async listByStudent(studentId: string) {
    const progressCollection = await getLessonProgressCollection();
    const sort: Sort = { lastAccessedAt: -1 };

    return (await progressCollection.find({ studentId }).sort(sort).toArray())
      .map((document) => parseStoredLessonProgress(document))
      .filter(
        (progress): progress is StoredLessonProgress => progress !== null,
      );
  },

  async listByStudentAndCourse(input: { studentId: string; courseId: string }) {
    const progressCollection = await getLessonProgressCollection();
    const sort: Sort = { lastAccessedAt: -1 };

    return (
      await progressCollection
        .find({ studentId: input.studentId, courseId: input.courseId })
        .sort(sort)
        .toArray()
    )
      .map((document) => parseStoredLessonProgress(document))
      .filter(
        (progress): progress is StoredLessonProgress => progress !== null,
      );
  },

  async update(progressId: string, updates: Partial<LessonProgress>) {
    const progressCollection = await getLessonProgressCollection();

    await progressCollection.updateOne(
      { _id: progressId },
      {
        $set: {
          ...updates,
          lastAccessedAt: Date.now(),
        },
      },
    );

    return this.getById(progressId);
  },
};
