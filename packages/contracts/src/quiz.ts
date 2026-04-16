import type { Timestamp } from "./common.ts";

export interface Quiz {
  courseId: string;
  createdAt: Timestamp;
  createdBy: string;
  description?: string;
  maxAttempts?: number;
  passingScore: number;
  questions: QuizQuestion[];
  timeLimit?: number;
  title: string;
  updatedAt: Timestamp;
}

export interface QuizAnswer {
  answer: number | string;
  isCorrect: boolean;
  pointsEarned: number;
  questionId: string;
}

export interface QuizAttempt {
  answers?: QuizAnswer[];
  attemptNumber: number;
  completedAt?: Timestamp;
  correctAnswers?: number;
  courseId: string;
  id: string;
  passed: boolean;
  percentage: number;
  quizId: string;
  score: number;
  startedAt: Timestamp;
  studentId: string;
  tenantId?: string;
  timeSpent: number;
  totalPoints: number;
  totalQuestions?: number;
}

export interface QuizQuestion {
  correctAnswer: number | string;
  explanation?: string;
  id: string;
  options?: string[];
  points: number;
  question: string;
  type: "essay" | "multiple-choice" | "true-false" | "short-answer";
}

export type QuizWithId = Quiz & { id: string };

export interface CourseQuiz extends Omit<Quiz, "courseId"> {
  courseId: string;
  id: string;
  isRequired: boolean;
  lessonId?: string;
  order: number;
  placement: "course" | "lesson" | "section";
  sectionId?: string;
  unlockConditions?: {
    minimumScore?: number;
    requirePreviousCompletion: boolean;
  };
}

export interface LessonProgress {
  completedAt?: Timestamp;
  courseId: string;
  currentPosition: number;
  isCompleted: boolean;
  lastAccessedAt: Timestamp;
  lastWatchedAt?: Timestamp;
  lessonId: string;
  resourcesViewed: string[];
  sectionId: string;
  studentId: string;
  tenantId?: string;
  timeSpent: number;
  totalDuration: number;
  viewCount: number;
  watchedDuration: number;
  watchPercentage: number;
}

export interface Notification {
  category: "achievement" | "message" | "reminder" | "system";
  createdAt: Timestamp;
  fromUserId?: string;
  fromUserName?: string;
  id: string;
  isRead: boolean;
  message: string;
  readAt?: Timestamp;
  title: string;
  userId: string;
}
