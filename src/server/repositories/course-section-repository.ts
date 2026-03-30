import { randomUUID } from "node:crypto";
import type { Collection, Sort } from "mongodb";

import {
  courseSectionSchema,
  type CourseSection,
} from "@/schemas/course-section";
import { getMongoDb } from "@/server/db/mongo";

type CourseSectionDocument = Omit<CourseSection, never> & { _id: string };
export type StoredCourseSection = CourseSection & { id: string };

function parseStoredSection(
  document: CourseSectionDocument | null,
): null | StoredCourseSection {
  if (!document) {
    return null;
  }

  const result = courseSectionSchema.safeParse(document);

  if (!result.success) {
    console.error("Invalid course section document", result.error);
    return null;
  }

  return {
    ...result.data,
    id: document._id,
  };
}

async function getCourseSectionCollection(): Promise<
  Collection<CourseSectionDocument>
> {
  const db = await getMongoDb();
  return db.collection<CourseSectionDocument>("courseSections");
}

export const courseSectionRepository = {
  async create(
    sectionData: Omit<CourseSection, "createdAt" | "updatedAt"> & {
      id?: string;
    },
  ) {
    const sections = await getCourseSectionCollection();
    const id = sectionData.id || randomUUID();
    const parsedSection = courseSectionSchema.parse({
      ...sectionData,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    const document: CourseSectionDocument = {
      ...parsedSection,
      _id: id,
    };

    await sections.insertOne(document);

    return parseStoredSection(document);
  },

  async delete(sectionId: string) {
    const sections = await getCourseSectionCollection();
    await sections.deleteOne({ _id: sectionId });
  },

  async getById(sectionId: string) {
    const sections = await getCourseSectionCollection();
    const section = await sections.findOne({ _id: sectionId });

    return parseStoredSection(section);
  },

  async listByCourse(courseId: string) {
    const sections = await getCourseSectionCollection();
    const sort: Sort = { order: 1, createdAt: 1 };

    return (await sections.find({ courseId }).sort(sort).toArray())
      .map((document) => parseStoredSection(document))
      .filter((section): section is StoredCourseSection => section !== null);
  },

  async update(sectionId: string, updates: Partial<CourseSection>) {
    const sections = await getCourseSectionCollection();

    await sections.updateOne(
      { _id: sectionId },
      {
        $set: {
          ...updates,
          updatedAt: Date.now(),
        },
      },
    );

    return this.getById(sectionId);
  },
};
