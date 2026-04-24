import { o as object, a as array, s as string, n as number, _ as _enum, b as boolean } from "../_libs/zod.mjs";
const aiDifficultySchema = _enum(["beginner", "intermediate", "advanced"]);
const aiPracticeQuizOptionSchema = object({
  id: string(),
  text: string()
});
const aiPracticeQuizQuestionSchema = object({
  correctOptionId: string(),
  explanation: string(),
  id: string(),
  options: array(aiPracticeQuizOptionSchema).min(2).max(4),
  prompt: string(),
  sourceLessonId: string().nullish(),
  sourceLessonTitle: string().nullish(),
  sourceSectionTitle: string().nullish()
});
const aiPracticeQuizResultItemSchema = object({
  correctOptionId: string(),
  explanation: string(),
  isCorrect: boolean(),
  questionId: string(),
  selectedOptionId: string().nullish()
});
const aiPracticeQuizResultSchema = object({
  correctAnswers: number().int().nonnegative(),
  feedbackSummary: string(),
  items: array(aiPracticeQuizResultItemSchema),
  percentage: number().int().min(0).max(100),
  totalQuestions: number().int().positive()
});
const aiPracticeQuizAnswerSchema = object({
  questionId: string(),
  selectedOptionId: string()
});
object({
  answers: array(aiPracticeQuizAnswerSchema).default([]),
  courseId: string(),
  createdAt: number(),
  difficulty: aiDifficultySchema,
  id: string(),
  lessonId: string().nullish(),
  questionCount: number().int().positive(),
  questions: array(aiPracticeQuizQuestionSchema).min(1),
  result: aiPracticeQuizResultSchema.nullish(),
  status: _enum(["completed", "generated"]),
  studentId: string(),
  submittedAt: number().nullish(),
  tenantId: string(),
  title: string()
});
const generateAiPracticeQuizInputSchema = object({
  courseId: string().min(1),
  difficulty: aiDifficultySchema.default("intermediate"),
  lessonId: string().nullish(),
  questionCount: number().int().min(3).max(10).default(5)
});
const submitAiPracticeQuizInputSchema = object({
  answers: array(aiPracticeQuizAnswerSchema)
});
const aiChatMessageSchema = object({
  content: string(),
  createdAt: number(),
  id: string(),
  role: _enum(["assistant", "user"])
});
object({
  courseId: string().nullish(),
  createdAt: number(),
  id: string(),
  lessonId: string().nullish(),
  messages: array(aiChatMessageSchema),
  studentId: string(),
  tenantId: string(),
  updatedAt: number()
});
const aiChatRequestSchema = object({
  courseId: string().nullish(),
  lessonId: string().nullish(),
  message: string().trim().min(1).max(4e3),
  threadId: string().nullish()
});
const aiChatThreadLookupSchema = object({
  courseId: string().nullish(),
  lessonId: string().nullish()
});
export {
  aiChatThreadLookupSchema as a,
  aiChatRequestSchema as b,
  generateAiPracticeQuizInputSchema as g,
  submitAiPracticeQuizInputSchema as s
};
