import { z } from "zod";

export const aiDifficultySchema = z.enum(["beginner", "intermediate", "advanced"]);

export const aiPracticeQuizOptionSchema = z.object({
  id: z.string(),
  text: z.string(),
});

export const aiPracticeQuizQuestionSchema = z.object({
  correctOptionId: z.string(),
  explanation: z.string(),
  id: z.string(),
  options: z.array(aiPracticeQuizOptionSchema).min(2).max(4),
  prompt: z.string(),
  sourceLessonId: z.string().nullish(),
  sourceLessonTitle: z.string().nullish(),
  sourceSectionTitle: z.string().nullish(),
});

export const aiPracticeQuizResultItemSchema = z.object({
  correctOptionId: z.string(),
  explanation: z.string(),
  isCorrect: z.boolean(),
  questionId: z.string(),
  selectedOptionId: z.string().nullish(),
});

export const aiPracticeQuizResultSchema = z.object({
  correctAnswers: z.number().int().nonnegative(),
  feedbackSummary: z.string(),
  items: z.array(aiPracticeQuizResultItemSchema),
  percentage: z.number().int().min(0).max(100),
  totalQuestions: z.number().int().positive(),
});

export const aiPracticeQuizAnswerSchema = z.object({
  questionId: z.string(),
  selectedOptionId: z.string(),
});

export const aiPracticeQuizSessionSchema = z.object({
  answers: z.array(aiPracticeQuizAnswerSchema).default([]),
  courseId: z.string(),
  createdAt: z.number(),
  difficulty: aiDifficultySchema,
  id: z.string(),
  lessonId: z.string().nullish(),
  questionCount: z.number().int().positive(),
  questions: z.array(aiPracticeQuizQuestionSchema).min(1),
  result: aiPracticeQuizResultSchema.nullish(),
  status: z.enum(["completed", "generated"]),
  studentId: z.string(),
  submittedAt: z.number().nullish(),
  tenantId: z.string(),
  title: z.string(),
});

export const generateAiPracticeQuizInputSchema = z.object({
  courseId: z.string().min(1),
  difficulty: aiDifficultySchema.default("intermediate"),
  lessonId: z.string().nullish(),
  questionCount: z.number().int().min(3).max(10).default(5),
});

export const submitAiPracticeQuizInputSchema = z.object({
  answers: z.array(aiPracticeQuizAnswerSchema),
});

export const aiChatMessageSchema = z.object({
  content: z.string(),
  createdAt: z.number(),
  id: z.string(),
  role: z.enum(["assistant", "user"]),
});

export const aiDocumentSchema = z.object({
  bytes: z.number().int().nonnegative(),
  courseId: z.string().nullish(),
  createdAt: z.number(),
  id: z.string(),
  lessonId: z.string().nullish(),
  mimeType: z.string(),
  name: z.string(),
  sourceCount: z.number().int().positive(),
  studentId: z.string(),
  tenantId: z.string(),
  title: z.string(),
  updatedAt: z.number(),
});

export const aiChatThreadSchema = z.object({
  courseId: z.string().nullish(),
  createdAt: z.number(),
  id: z.string(),
  lessonId: z.string().nullish(),
  messages: z.array(aiChatMessageSchema),
  studentId: z.string(),
  tenantId: z.string(),
  updatedAt: z.number(),
});

export const aiChatRequestSchema = z.object({
  courseId: z.string().nullish(),
  documentIds: z.array(z.string()).max(5).default([]),
  lessonId: z.string().nullish(),
  message: z.string().trim().min(1).max(4000),
  threadId: z.string().nullish(),
});

export const aiChatThreadLookupSchema = z.object({
  courseId: z.string().nullish(),
  lessonId: z.string().nullish(),
});

export const aiDocumentLookupSchema = z.object({
  courseId: z.string().nullish(),
  lessonId: z.string().nullish(),
});

export const aiSerializedDocumentFileSchema = z.object({
  dataUrl: z.string().min(1),
  name: z.string().min(1),
  size: z.number().int().nonnegative(),
  type: z.string().min(1),
});

export const createAiDocumentInputSchema = z.object({
  courseId: z.string().nullish(),
  file: aiSerializedDocumentFileSchema,
  lessonId: z.string().nullish(),
  title: z.string().trim().min(1).max(160).optional(),
});

export type AiChatMessage = z.infer<typeof aiChatMessageSchema>;
export type AiDocument = z.infer<typeof aiDocumentSchema>;
export type AiChatRequest = z.infer<typeof aiChatRequestSchema>;
export type AiChatThread = z.infer<typeof aiChatThreadSchema>;
export type AiDocumentLookup = z.infer<typeof aiDocumentLookupSchema>;
export type AiChatThreadLookup = z.infer<typeof aiChatThreadLookupSchema>;
export type AiDifficulty = z.infer<typeof aiDifficultySchema>;
export type AiPracticeQuizAnswer = z.infer<typeof aiPracticeQuizAnswerSchema>;
export type AiPracticeQuizQuestion = z.infer<typeof aiPracticeQuizQuestionSchema>;
export type AiPracticeQuizResult = z.infer<typeof aiPracticeQuizResultSchema>;
export type AiPracticeQuizSession = z.infer<typeof aiPracticeQuizSessionSchema>;
export type CreateAiDocumentInput = z.infer<typeof createAiDocumentInputSchema>;
export type GenerateAiPracticeQuizInput = z.infer<
  typeof generateAiPracticeQuizInputSchema
>;
export type SubmitAiPracticeQuizInput = z.infer<
  typeof submitAiPracticeQuizInputSchema
>;
