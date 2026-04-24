import type { AiDifficulty } from "sparktool-contracts/ai";

export const aiStudy = {
  createDocument: async (variables: {
    courseId?: null | string;
    file: File;
    lessonId?: null | string;
    title?: string;
  }) => {
    const { createAiDocumentFn } = await import("@/server/ai");
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();

      reader.onerror = () => {
        reject(reader.error ?? new Error("Failed to read document."));
      };

      reader.onload = () => {
        if (typeof reader.result !== "string") {
          reject(new Error("Failed to read document."));
          return;
        }

        resolve(reader.result);
      };

      reader.readAsDataURL(variables.file);
    });

    return createAiDocumentFn({
      data: {
        courseId: variables.courseId ?? null,
        file: {
          dataUrl,
          name: variables.file.name,
          size: variables.file.size,
          type: variables.file.type || "application/octet-stream",
        },
        lessonId: variables.lessonId ?? null,
        title: variables.title,
      },
    });
  },

  generatePracticeQuiz: async (variables: {
    courseId: string;
    difficulty: AiDifficulty;
    lessonId?: null | string;
    questionCount: number;
  }) => {
    const { generateAiPracticeQuizFn } = await import("@/server/ai");
    return generateAiPracticeQuizFn({ data: variables });
  },

  getChatThread: async (variables: {
    courseId?: null | string;
    lessonId?: null | string;
  }) => {
    const { getAiChatThreadFn } = await import("@/server/ai");
    return getAiChatThreadFn({
      data: {
        courseId: variables.courseId ?? null,
        lessonId: variables.lessonId ?? null,
      },
    });
  },

  listDocuments: async (variables: {
    courseId?: null | string;
    lessonId?: null | string;
  }) => {
    const { listAiDocumentsFn } = await import("@/server/ai");
    return listAiDocumentsFn({
      data: {
        courseId: variables.courseId ?? null,
        lessonId: variables.lessonId ?? null,
      },
    });
  },

  getPracticeQuizSession: async (sessionId: string) => {
    const { getAiPracticeQuizSessionFn } = await import("@/server/ai");
    return getAiPracticeQuizSessionFn({ data: sessionId });
  },

  listPracticeQuizSessions: async (courseId?: null | string) => {
    const { listAiPracticeQuizSessionsFn } = await import("@/server/ai");
    return listAiPracticeQuizSessionsFn({ data: courseId ?? null });
  },

  sendChatMessage: async (variables: {
    courseId?: null | string;
    documentIds?: string[];
    lessonId?: null | string;
    message: string;
    threadId?: null | string;
  }) => {
    const { sendAiChatMessageFn } = await import("@/server/ai");
    return sendAiChatMessageFn({
      data: {
        courseId: variables.courseId ?? null,
        documentIds: variables.documentIds ?? [],
        lessonId: variables.lessonId ?? null,
        message: variables.message,
        threadId: variables.threadId ?? null,
      },
    });
  },

  submitPracticeQuiz: async (variables: {
    answers: Array<{ questionId: string; selectedOptionId: string }>;
    sessionId: string;
  }) => {
    const { submitAiPracticeQuizFn } = await import("@/server/ai");
    return submitAiPracticeQuizFn({
      data: variables,
    });
  },
};

export type {
  AiChatMessage,
  AiChatRequest,
  AiChatThread,
  AiDocument,
  AiDifficulty,
  AiPracticeQuizAnswer,
  AiPracticeQuizQuestion,
  AiPracticeQuizResult,
  AiPracticeQuizSession,
} from "sparktool-contracts/ai";
