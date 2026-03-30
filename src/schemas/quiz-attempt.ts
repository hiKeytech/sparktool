import type { UpdateQuizAttempt } from "@/types";

export const quizAttempt = {
  create: async (attemptData: {
    courseId: string;
    quizId: string;
    studentId: string;
  }) => {
    const { createQuizAttemptFn } = await import("@/server/quizzes");
    return createQuizAttemptFn({ data: attemptData });
  },
  list: async (
    filters: Partial<{
      courseId: string;
      quizId: string;
      studentId: string;
    }> = {},
  ) => {
    const { listQuizAttemptsFn } = await import("@/server/quizzes");
    return listQuizAttemptsFn({ data: filters });
  },
  update: async (variables: {
    attemptData: UpdateQuizAttempt;
    attemptId: string;
  }) => {
    const { updateQuizAttemptFn } = await import("@/server/quizzes");
    return updateQuizAttemptFn({ data: variables });
  },
};
