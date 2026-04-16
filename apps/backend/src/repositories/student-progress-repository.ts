import { randomUUID } from "node:crypto";
import type { Collection, Filter, Sort } from "mongodb";

import {
  studentProgressSchema,
  type StudentProgress,
} from "sparktool-contracts/student-progress";
import { getMongoDb } from "../db/mongo.js";

type StudentProgressDocument = Omit<StudentProgress, "id"> & { _id: string };
export type StoredStudentProgress = StudentProgress;

function parseStoredStudentProgress(
  document: null | StudentProgressDocument,
): null | StoredStudentProgress {
  if (!document) {
    return null;
  }

  const result = studentProgressSchema.safeParse({
    ...document,
    id: document._id,
  });

  if (!result.success) {
    console.error("Invalid student progress document", result.error);
    return null;
  }

  return result.data;
}

function dedupeProgress<T extends StoredStudentProgress>(
  progressList: T[],
  getKey: (progress: T) => string,
): T[] {
  const seen = new Set<string>();

  return progressList.filter((progress) => {
    const key = getKey(progress);
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

async function getStudentProgressCollection(): Promise<
  Collection<StudentProgressDocument>
> {
  const db = await getMongoDb();
  return db.collection<StudentProgressDocument>("studentProgress");
}

export const studentProgressRepository = {
  async create(progressData: Omit<StudentProgress, "id"> & { id?: string }) {
    const progressCollection = await getStudentProgressCollection();
    const progressId = progressData.id || randomUUID();
    const parsedProgress = studentProgressSchema.parse({
      ...progressData,
      id: progressId,
    });
    const { id, ...documentData } = parsedProgress;
    const document: StudentProgressDocument = {
      ...documentData,
      _id: id,
    };

    await progressCollection.insertOne(document);

    return parseStoredStudentProgress(document);
  },

  async deleteByCourseId(courseId: string) {
    const progressCollection = await getStudentProgressCollection();
    await progressCollection.deleteMany({ courseId });
  },

  async deleteByStudentAndCourse(input: {
    courseId: string;
    studentId: string;
    tenantId?: string;
  }) {
    const progressCollection = await getStudentProgressCollection();
    const query: Filter<StudentProgressDocument> = {
      courseId: input.courseId,
      studentId: input.studentId,
    };

    if (input.tenantId) {
      query.tenantId = input.tenantId;
    }

    await progressCollection.deleteMany(query);
  },

  async getById(progressId: string) {
    const progressCollection = await getStudentProgressCollection();
    const progress = await progressCollection.findOne({ _id: progressId });

    return parseStoredStudentProgress(progress);
  },

  async getByStudentAndCourse(input: {
    courseId: string;
    studentId: string;
    tenantId?: string;
  }) {
    const progressCollection = await getStudentProgressCollection();
    const query: Filter<StudentProgressDocument> = {
      courseId: input.courseId,
      studentId: input.studentId,
    };

    if (input.tenantId) {
      query.tenantId = input.tenantId;
    }

    const sort: Sort = { enrolledAt: -1, lastAccessedAt: -1 };
    const progressDocuments = await progressCollection
      .find(query)
      .sort(sort)
      .toArray();

    for (const progress of progressDocuments) {
      const parsed = parseStoredStudentProgress(progress);
      if (parsed) {
        return parsed;
      }
    }

    return null;
  },

  async listByCourse(courseId: string) {
    const progressCollection = await getStudentProgressCollection();
    const sort: Sort = { enrolledAt: -1, lastAccessedAt: -1 };

    const parsedProgress = (
      await progressCollection.find({ courseId }).sort(sort).toArray()
    )
      .map((document) => parseStoredStudentProgress(document))
      .filter(
        (progress): progress is StoredStudentProgress => progress !== null,
      );

    return dedupeProgress(parsedProgress, (progress) => progress.studentId);
  },

  async listByStudent(studentId: string, tenantId?: string) {
    const progressCollection = await getStudentProgressCollection();
    const query: Filter<StudentProgressDocument> = { studentId };

    if (tenantId) {
      query.tenantId = tenantId;
    }

    const sort: Sort = { enrolledAt: -1, lastAccessedAt: -1 };

    const parsedProgress = (
      await progressCollection.find(query).sort(sort).toArray()
    )
      .map((document) => parseStoredStudentProgress(document))
      .filter(
        (progress): progress is StoredStudentProgress => progress !== null,
      );

    return dedupeProgress(parsedProgress, (progress) => progress.courseId);
  },

  async listByTenant(tenantId: string, options?: { enrolledAfter?: number }) {
    const progressCollection = await getStudentProgressCollection();
    const query: Filter<StudentProgressDocument> = { tenantId };

    if (options?.enrolledAfter) {
      query.enrolledAt = { $gte: options.enrolledAfter };
    }

    const sort: Sort = { enrolledAt: -1, lastAccessedAt: -1 };

    const parsedProgress = (
      await progressCollection.find(query).sort(sort).toArray()
    )
      .map((document) => parseStoredStudentProgress(document))
      .filter(
        (progress): progress is StoredStudentProgress => progress !== null,
      );

    return dedupeProgress(
      parsedProgress,
      (progress) => `${progress.studentId}:${progress.courseId}`,
    );
  },

  async update(progressId: string, progressData: Partial<StudentProgress>) {
    const progressCollection = await getStudentProgressCollection();

    await progressCollection.updateOne(
      { _id: progressId },
      {
        $set: {
          ...progressData,
          lastAccessedAt: Date.now(),
        },
      },
    );

    return this.getById(progressId);
  },
};
