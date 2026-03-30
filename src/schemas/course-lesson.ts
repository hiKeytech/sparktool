import { z } from "zod";
import type { Collection, DocumentReference } from "@/types/collection";

export const assignmentSchema = z.object({
  allowedFileTypes: z.array(z.string()).optional(),
  description: z.string(),
  dueDate: z.string().optional(),
  instructions: z.string(),
  maxFileSize: z.number().optional(),
  maxScore: z.number(),
  submissionType: z.enum(["file", "link", "text"]),
  title: z.string(),
});

export const lessonContentSchema = z.object({
  assignment: assignmentSchema.optional(),
  externalUrl: z.string().optional(),
  subtitles: z
    .array(
      z.object({
        label: z.string(),
        language: z.string(),
        url: z.string(),
      }),
    )
    .optional(),
  textContent: z.string().optional(),
  transcript: z.string().optional(),
  videoUrl: z.string().optional(),
});

export const lessonResourceSchema = z.object({
  createdAt: z.number(),
  description: z.string().optional(),
  fileSize: z.number().optional(),
  id: z.string(),
  isRequired: z.boolean(),
  lessonId: z.string(),
  order: z.number(),
  storageKey: z.string().optional(),
  storageProvider: z.enum(["cloudinary", "local"]).optional(),
  storageResourceType: z.enum(["image", "raw", "video"]).optional(),
  title: z.string(),
  type: z.enum(["document", "download", "image", "link", "pdf"]),
  updatedAt: z.number(),
  url: z.string(),
});

export const courseLessonSchema = z.object({
  content: lessonContentSchema,
  courseId: z.string(),
  createdAt: z.number().default(() => Date.now()),
  description: z.string().optional(),
  estimatedDuration: z.number().default(0),
  id: z.string(),
  isPublished: z.boolean().default(false),
  isRequired: z.boolean().default(false),
  order: z.number().default(0),
  resources: z.array(lessonResourceSchema).default([]),
  sectionId: z.string(),
  title: z.string(),
  type: z.enum(["assignment", "live-session", "reading", "video"]),
  updatedAt: z.number().default(() => Date.now()),
});

export type Assignment = z.infer<typeof assignmentSchema>;
export type LessonContent = z.infer<typeof lessonContentSchema>;
export type LessonResource = z.infer<typeof lessonResourceSchema>;
export type CourseLesson = z.infer<typeof courseLessonSchema>;

export type CreateLesson = Pick<
  CourseLesson,
  | "content"
  | "courseId"
  | "description"
  | "estimatedDuration"
  | "isPublished"
  | "isRequired"
  | "order"
  | "resources"
  | "sectionId"
  | "title"
  | "type"
>;

export type UpdateLesson = Partial<
  Omit<CreateLesson, "courseId" | "sectionId">
> & {
  updatedAt: number;
};

export type CourseLessonWrite = Omit<CourseLesson, "id">;
export type CourseLessonCollection = Collection<CourseLessonWrite>;
export type CourseLessonDocumentReference =
  DocumentReference<CourseLessonWrite>;

export type ReorderRequest = {
  itemId: string;
  newOrder: number;
};

export const courseLesson = {
  create: async (variables: { lessonData: CreateLesson; userId: string }) => {
    const { createLessonFn } = await import("@/server/course-structure");
    return createLessonFn({ data: variables });
  },
  delete: async (lessonId: string) => {
    const { deleteLessonFn } = await import("@/server/course-structure");
    return deleteLessonFn({ data: lessonId });
  },
  get: async (lessonId: string) => {
    const { getLessonFn } = await import("@/server/course-structure");
    return getLessonFn({ data: lessonId });
  },
  list: async (sectionId: string) => {
    const { listLessonsFn } = await import("@/server/course-structure");
    return listLessonsFn({ data: sectionId });
  },
  listByCourse: async (courseId: string) => {
    const { listLessonsByCourseFn } = await import("@/server/course-structure");
    return listLessonsByCourseFn({ data: courseId });
  },
  reorder: async (variables: {
    reorderData: ReorderRequest[];
    sectionId: string;
  }) => {
    const { reorderLessonsFn } = await import("@/server/course-structure");
    return reorderLessonsFn({ data: variables });
  },
  update: async (variables: { lessonData: UpdateLesson; lessonId: string }) => {
    const { updateLessonFn } = await import("@/server/course-structure");
    return updateLessonFn({ data: variables });
  },
};
