import type { LessonProgress } from "@/types";

export const lessonProgress = {
  create: async (variables: { progressData: Omit<LessonProgress, "id"> }) => {
    const { createLessonProgressFn } = await import("@/server/lesson-progress");
    return createLessonProgressFn({ data: variables });
  },
  get: async (variables: { lessonId: string; studentId: string }) => {
    const { getLessonProgressFn } = await import("@/server/lesson-progress");
    return getLessonProgressFn({ data: variables });
  },
  listByStudent: async (studentId: string) => {
    const { listLessonProgressByStudentFn } =
      await import("@/server/lesson-progress");
    return listLessonProgressByStudentFn({ data: studentId });
  },
  update: async (variables: {
    progressData: Partial<LessonProgress>;
    progressId: string;
  }) => {
    const { updateLessonProgressFn } = await import("@/server/lesson-progress");
    return updateLessonProgressFn({ data: variables });
  },
  markComplete: async (variables: {
    courseId: string;
    lessonId: string;
    sectionId: string;
    studentId: string;
  }) => {
    const { markLessonCompleteFn } = await import("@/server/lesson-progress");
    return markLessonCompleteFn({ data: variables });
  },
};
