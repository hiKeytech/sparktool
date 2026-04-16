import type { Collection, Filter, Sort } from "mongodb";

import {
  courseSchema,
  type Course,
  type CreateCourseVariables,
} from "sparktool-contracts/course";
import { getMongoDb } from "../db/mongo.js";
import { isDefined } from "../utils/is-defined.js";
import { filterCoursesBySearch } from "../utils/search.js";

type CourseDocument = Course & { _id: string };
export type StoredCourse = Course & { id: string };

function parseStoredCourse(
  document: CourseDocument | null,
): null | StoredCourse {
  if (!document) {
    return null;
  }

  const result = courseSchema.safeParse({
    ...document,
    id: document._id,
  });

  if (!result.success) {
    console.error("Invalid course document", result.error);
    return null;
  }

  return {
    ...result.data,
    id: document._id,
  };
}

async function getCourseCollection(): Promise<Collection<CourseDocument>> {
  const db = await getMongoDb();
  return db.collection<CourseDocument>("courses");
}

export const courseRepository = {
  async create(courseData: Omit<Course, "id"> & { id: string }) {
    const courses = await getCourseCollection();
    const courseId = courseData.id;
    const parsedCourse = courseSchema.parse({
      ...courseData,
      id: courseId,
    });
    const { id: _ignoredId, ...documentData } = parsedCourse;
    const document: CourseDocument = {
      ...documentData,
      _id: courseId,
    };

    await courses.insertOne(document);

    return parseStoredCourse(document);
  },

  async delete(courseId: string) {
    const courses = await getCourseCollection();
    await courses.deleteOne({ _id: courseId });
  },

  async getById(courseId: string) {
    const courses = await getCourseCollection();
    const course = await courses.findOne({ _id: courseId });

    return parseStoredCourse(course);
  },

  async incrementCompletion(courseId: string, amount: number) {
    const courses = await getCourseCollection();

    await courses.updateOne(
      { _id: courseId },
      {
        $inc: {
          completionCount: amount,
        },
        $set: {
          updatedAt: Date.now(),
        },
      },
    );
  },

  async incrementCompletionCount(courseId: string, amount: number) {
    const courses = await getCourseCollection();
    await courses.updateOne(
      { _id: courseId },
      {
        $inc: { completionCount: amount },
        $set: { updatedAt: Date.now() },
      },
    );
  },

  async incrementEnrollment(courseId: string, amount: number) {
    const courses = await getCourseCollection();

    await courses.updateOne(
      { _id: courseId },
      {
        $inc: {
          enrollmentCount: amount,
        },
        $set: {
          updatedAt: Date.now(),
        },
      },
    );
  },

  async list(
    tenantId?: string,
    filters: Partial<{
      category: string;
      difficulty: string;
      published: boolean;
      search: string;
    }> = {},
  ) {
    const courses = await getCourseCollection();
    const query: Filter<CourseDocument> = {};

    if (tenantId) {
      query.tenantId = tenantId;
    }

    if (isDefined(filters.published)) {
      query.published = filters.published;
    }

    if (isDefined(filters.category)) {
      query.category = filters.category;
    }

    if (isDefined(filters.difficulty)) {
      query.difficulty =
        filters.difficulty as CreateCourseVariables["courseData"]["difficulty"];
    }

    const sort: Sort = { createdAt: -1 };
    let parsedCourses = (await courses.find(query).sort(sort).toArray())
      .map((document) => parseStoredCourse(document))
      .filter((course): course is StoredCourse => course !== null);

    if (isDefined(filters.search)) {
      parsedCourses = filterCoursesBySearch(parsedCourses, filters.search);
    }

    return parsedCourses;
  },

  async update(courseId: string, courseData: Partial<Course>) {
    const courses = await getCourseCollection();

    await courses.updateOne(
      { _id: courseId },
      {
        $set: {
          ...courseData,
          updatedAt: Date.now(),
        },
      },
    );

    return this.getById(courseId);
  },
};
