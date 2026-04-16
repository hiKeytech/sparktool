import { randomUUID } from "node:crypto";
import type { Collection, Sort } from "mongodb";

import {
  courseLessonSchema,
  type CourseLesson,
} from "sparktool-contracts/course-lesson";
import { getMongoDb } from "../db/mongo";

type CourseLessonDocument = Omit<CourseLesson, "id"> & { _id: string };
export type StoredCourseLesson = CourseLesson;

function parseStoredLesson(
  document: CourseLessonDocument | null,
): null | StoredCourseLesson {
  if (!document) {
    return null;
  }

  const result = courseLessonSchema.safeParse({
    ...document,
    id: document._id,
  });

  if (!result.success) {
    console.error("Invalid course lesson document", result.error);
    return null;
  }

  return result.data;
}

async function getCourseLessonCollection(): Promise<
  Collection<CourseLessonDocument>
> {
  const db = await getMongoDb();
  return db.collection<CourseLessonDocument>("courseLessons");
}

export const courseLessonRepository = {
  async create(
    lessonData: Omit<CourseLesson, "id" | "createdAt" | "updatedAt"> & {
      id?: string;
    },
  ) {
    const lessons = await getCourseLessonCollection();
    const id = lessonData.id || randomUUID();
    const parsedLesson = courseLessonSchema.parse({
      ...lessonData,
      createdAt: Date.now(),
      id,
      updatedAt: Date.now(),
    });
    const { id: _ignoredId, ...documentData } = parsedLesson;
    const document: CourseLessonDocument = {
      ...documentData,
      _id: id,
    };

    await lessons.insertOne(document);

    return parseStoredLesson(document);
  },

  async delete(lessonId: string) {
    const lessons = await getCourseLessonCollection();
    await lessons.deleteOne({ _id: lessonId });
  },

  async deleteBySectionId(sectionId: string) {
    const lessons = await getCourseLessonCollection();
    await lessons.deleteMany({ sectionId });
  },

  async getById(lessonId: string) {
    const lessons = await getCourseLessonCollection();
    const lesson = await lessons.findOne({ _id: lessonId });

    return parseStoredLesson(lesson);
  },

  async findByResourceId(resourceId: string) {
    const lessons = await getCourseLessonCollection();
    const lesson = await lessons.findOne({ "resources.id": resourceId });

    return parseStoredLesson(lesson);
  },

  async listByCourse(courseId: string) {
    const lessons = await getCourseLessonCollection();
    const sort: Sort = { order: 1, createdAt: 1 };

    return (await lessons.find({ courseId }).sort(sort).toArray())
      .map((document) => parseStoredLesson(document))
      .filter((lesson): lesson is StoredCourseLesson => lesson !== null);
  },

  async listBySection(sectionId: string) {
    const lessons = await getCourseLessonCollection();
    const sort: Sort = { order: 1, createdAt: 1 };

    return (await lessons.find({ sectionId }).sort(sort).toArray())
      .map((document) => parseStoredLesson(document))
      .filter((lesson): lesson is StoredCourseLesson => lesson !== null);
  },

  async update(lessonId: string, updates: Partial<CourseLesson>) {
    const lessons = await getCourseLessonCollection();

    await lessons.updateOne(
      { _id: lessonId },
      {
        $set: {
          ...updates,
          updatedAt: Date.now(),
        },
      },
    );

    return this.getById(lessonId);
  },
};
