import type { CourseQuiz, Quiz } from "@/types";

export const courseQuiz = {
  create: async (quizData: Omit<CourseQuiz, "id">) => {
    const { createCourseQuizFn } = await import("@/server/course-quizzes");
    return createCourseQuizFn({ data: quizData });
  },

  delete: async (quizId: string) => {
    const { deleteCourseQuizFn } = await import("@/server/course-quizzes");
    return deleteCourseQuizFn({ data: quizId });
  },

  get: async (quizId: string) => {
    const { getCourseQuizFn } = await import("@/server/course-quizzes");
    return getCourseQuizFn({ data: quizId });
  },

  list: async (filters?: {
    courseId?: string;
    lessonId?: string;
    placement?: "course" | "lesson" | "section";
    sectionId?: string;
  }) => {
    const { listCourseQuizzesFn } = await import("@/server/course-quizzes");
    return listCourseQuizzesFn({ data: filters });
  },

  reorder: async (quizUpdates: { order: number; quizId: string }[]) => {
    const { reorderCourseQuizzesFn } = await import("@/server/course-quizzes");
    return reorderCourseQuizzesFn({ data: quizUpdates });
  },

  update: async (variables: {
    quizData: Partial<Omit<CourseQuiz, "id">>;
    quizId: string;
  }) => {
    const { updateCourseQuizFn } = await import("@/server/course-quizzes");
    return updateCourseQuizFn({ data: variables });
  },
};

export const quiz = {
  create: async (quizData: Quiz) => {
    const { createQuizFn } = await import("@/server/quizzes");
    return createQuizFn({ data: quizData });
  },
  delete: async (quizId: string) => {
    const { deleteQuizFn } = await import("@/server/quizzes");
    return deleteQuizFn({ data: quizId });
  },
  get: async (quizId?: string) => {
    const { getQuizFn } = await import("@/server/quizzes");
    return getQuizFn({ data: quizId });
  },
  list: async (courseId?: string) => {
    const { listQuizzesFn } = await import("@/server/quizzes");
    return listQuizzesFn({ data: courseId });
  },
  update: async (variables: { quizData: Partial<Quiz>; quizId: string }) => {
    const { updateQuizFn } = await import("@/server/quizzes");
    return updateQuizFn({ data: variables });
  },
};
