import { o as object, s as string, _ as _enum, n as number, a as array, b as boolean } from "../_libs/zod.mjs";
const assignmentSchema = object({
  allowedFileTypes: array(string()).optional(),
  description: string(),
  dueDate: string().optional(),
  instructions: string(),
  maxFileSize: number().optional(),
  maxScore: number(),
  submissionType: _enum(["file", "link", "text"]),
  title: string()
});
const lessonContentSchema = object({
  assignment: assignmentSchema.optional(),
  externalUrl: string().optional(),
  subtitles: array(
    object({
      label: string(),
      language: string(),
      url: string()
    })
  ).optional(),
  textContent: string().optional(),
  transcript: string().optional(),
  videoUrl: string().optional()
});
const lessonResourceSchema = object({
  createdAt: number(),
  description: string().optional(),
  fileSize: number().optional(),
  id: string(),
  isRequired: boolean(),
  lessonId: string(),
  order: number(),
  storageKey: string().optional(),
  storageProvider: _enum(["cloudinary", "local"]).optional(),
  storageResourceType: _enum(["image", "raw", "video"]).optional(),
  title: string(),
  type: _enum(["document", "download", "image", "link", "pdf"]),
  updatedAt: number(),
  url: string()
});
object({
  content: lessonContentSchema,
  courseId: string(),
  createdAt: number().default(() => Date.now()),
  description: string().optional(),
  estimatedDuration: number().default(0),
  id: string(),
  isPublished: boolean().default(false),
  isRequired: boolean().default(false),
  order: number().default(0),
  resources: array(lessonResourceSchema).default([]),
  sectionId: string(),
  title: string(),
  type: _enum(["assignment", "live-session", "reading", "video"]),
  updatedAt: number().default(() => Date.now())
});
const courseLesson = {
  create: async (variables) => {
    const { createLessonFn } = await import("./course-structure-D2f1-VM0.mjs").then((n) => n.b);
    return createLessonFn({ data: variables });
  },
  delete: async (lessonId) => {
    const { deleteLessonFn } = await import("./course-structure-D2f1-VM0.mjs").then((n) => n.b);
    return deleteLessonFn({ data: lessonId });
  },
  get: async (lessonId) => {
    const { getLessonFn } = await import("./course-structure-D2f1-VM0.mjs").then((n) => n.b);
    return getLessonFn({ data: lessonId });
  },
  list: async (sectionId) => {
    const { listLessonsFn } = await import("./course-structure-D2f1-VM0.mjs").then((n) => n.b);
    return listLessonsFn({ data: sectionId });
  },
  listByCourse: async (courseId) => {
    const { listLessonsByCourseFn } = await import("./course-structure-D2f1-VM0.mjs").then((n) => n.b);
    return listLessonsByCourseFn({ data: courseId });
  },
  reorder: async (variables) => {
    const { reorderLessonsFn } = await import("./course-structure-D2f1-VM0.mjs").then((n) => n.b);
    return reorderLessonsFn({ data: variables });
  },
  update: async (variables) => {
    const { updateLessonFn } = await import("./course-structure-D2f1-VM0.mjs").then((n) => n.b);
    return updateLessonFn({ data: variables });
  }
};
export {
  courseLesson as c,
  lessonResourceSchema as l
};
