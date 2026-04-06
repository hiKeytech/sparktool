import type { WithId } from "@/types/with-id";
import { z } from "zod";
import type { Collection, DocumentReference } from "@/types/collection";

export const courseSectionSchema = z.object({
  courseId: z.string(),
  createdAt: z.number().default(() => Date.now()),
  createdBy: z.string().nullish(),
  createdByMeta: z
    .object({
      name: z.string(),
      photoUrl: z.string(),
    })
    .nullish(),
  description: z.string().nullish(),
  estimatedDurationInMinutes: z.number().default(0),
  isPublished: z.boolean().default(false),
  order: z.number().nullish(),
  title: z.string().nullish(),
  updatedAt: z.number().default(() => Date.now()),
  updatedBy: z.string().nullish(),
  updatedByMeta: z
    .object({
      name: z.string(),
      photoUrl: z.string(),
    })
    .nullish(),
});

export type CourseSection = z.infer<typeof courseSectionSchema>;

export type CourseSectionCollection = Collection<CourseSection>;

export type CourseSectionData = WithId<CourseSection>;

export type CourseSectionDocumentReference = DocumentReference<CourseSection>;

export interface CreateCourseSectionVariables {
  data: Pick<
    CourseSection,
    | "courseId"
    | "description"
    | "estimatedDurationInMinutes"
    | "isPublished"
    | "order"
    | "title"
  >;
  userId: string;
}

export type ReorderRequest = {
  itemId: string;
  newOrder: number;
};

export interface UpdateSection {
  updates: Partial<
    Pick<
      CourseSection,
      | "courseId"
      | "description"
      | "estimatedDurationInMinutes"
      | "isPublished"
      | "order"
      | "title"
    >
  >;
  userId: string;
}

export const courseSection = {
  create: async (variables: CreateCourseSectionVariables) => {
    const { createSectionFn } = await import("@/server/course-structure");
    return createSectionFn({ data: variables });
  },
  delete: async (sectionId: string) => {
    const { deleteSectionFn } = await import("@/server/course-structure");
    return deleteSectionFn({ data: sectionId });
  },
  get: async (sectionId: string) => {
    const { getSectionFn } = await import("@/server/course-structure");
    return getSectionFn({ data: sectionId });
  },
  list: async (courseId: string) => {
    const { listSectionsFn } = await import("@/server/course-structure");
    return listSectionsFn({ data: courseId });
  },
  reorder: async (variables: {
    courseId: string;
    reorderData: ReorderRequest[];
  }) => {
    const { reorderSectionsFn } = await import("@/server/course-structure");
    return reorderSectionsFn({ data: variables });
  },
  update: async (variables: {
    sectionData: UpdateSection;
    sectionId: string;
  }) => {
    const { updateSectionFn } = await import("@/server/course-structure");
    return updateSectionFn({ data: variables });
  },
};
