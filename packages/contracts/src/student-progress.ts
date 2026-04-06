import { z } from "zod";

export const sectionProgressSchema = z.object({
  completedAt: z.number().nullish(),
  completedLessons: z.array(z.string()),
  completedQuizzes: z.array(z.string()),
  courseId: z.string(),
  isCompleted: z.boolean(),
  lessonsCompleted: z.array(z.string()),
  quizzesCompleted: z.array(z.string()),
  sectionId: z.string(),
  timeSpent: z.number(),
});

export const studentAnalyticsSchema = z.object({
  averageScore: z.number(),
  certificatesEarned: z.number(),
  completionRate: z.number(),
  lastLoginAt: z.number(),
  lastUpdated: z.number(),
  learningPath: z.array(z.string()),
  loginStreak: z.number(),
  preferredLearningTime: z.string(),
  studentId: z.string(),
  totalCoursesCompleted: z.number(),
  totalCoursesEnrolled: z.number(),
  totalTimeSpent: z.number(),
});

export const studentProgressSchema = z.object({
  averageQuizScore: z.number().default(0),
  completedAt: z.number().nullish(),
  completionPercentage: z.number().default(0),
  courseId: z.string(),
  currentLessonId: z.string().optional(),
  currentLessonPosition: z.number().optional(),
  currentSectionId: z.string().optional(),
  enrolledAt: z.number().default(() => Date.now()),
  estimatedTimeRemaining: z.number().default(0),
  id: z.string(),
  lastAccessedAt: z.number().default(() => Date.now()),
  quizzesPassed: z.number().default(0),
  sectionProgress: z.array(sectionProgressSchema).default([]),
  startedAt: z.number().optional(),
  status: z
    .enum(["completed", "dropped", "enrolled", "in-progress"])
    .default("enrolled"),
  studentId: z.string(),
  tenantId: z.string(),
  timeSpentMinutes: z.number().default(0),
  totalLessonsCompleted: z.number().default(0),
  totalOptionalLessonsCompleted: z.number().default(0),
  totalQuizzesTaken: z.number().default(0),
  totalRequiredLessons: z.number().default(0),
});

export const createStudentProgressSchema = studentProgressSchema.pick({
  courseId: true,
  enrolledAt: true,
  studentId: true,
});

export const updateStudentProgressSchema = studentProgressSchema.pick({
  completionPercentage: true,
  status: true,
  totalLessonsCompleted: true,
});

export type SectionProgress = z.infer<typeof sectionProgressSchema>;
export type StudentAnalytics = z.infer<typeof studentAnalyticsSchema>;
export type StudentProgress = z.infer<typeof studentProgressSchema>;
export type CreateStudentProgress = z.infer<typeof createStudentProgressSchema>;
export type UpdateStudentProgress = z.infer<typeof updateStudentProgressSchema>;
