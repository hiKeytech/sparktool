import type { OmitKeyof, UseQueryOptions } from "@tanstack/react-query";

import type {
  ActivityLog,
  Certificate,
  Course,
  CourseQuiz,
  CourseSection,
  LessonProgress,
  LessonResource,
  LiveSession,
  Notification,
  Quiz,
  QuizAttempt,
  SectionProgress,
  StudentProgress,
  User,
} from "@/types";
import type { Collection, DocumentReference } from "@/types/collection";

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
  success: boolean;
}

export type ActivityLogCollection = Collection<ActivityLog>;

export type CertificateCollection = Collection<Certificate>;

export type CourseCollection = Collection<Course>;

export type CourseDocumentReference = DocumentReference<Course>;

export type CourseQuizCollection = Collection<CourseQuiz>;

export type CourseQuizDocumentReference = DocumentReference<CourseQuiz>;

export type CourseSectionCollection = Collection<CourseSection>;

export type CourseSectionDocumentReference = DocumentReference<CourseSection>;

export type LessonProgressCollection = Collection<LessonProgress>;

export type LessonProgressDocumentReference = DocumentReference<LessonProgress>;

export type LessonResourceCollection = Collection<LessonResource>;

export type LessonResourceDocumentReference = DocumentReference<LessonResource>;

export type LiveSessionCollection = Collection<LiveSession>;

export type LiveSessionDocumentReference = DocumentReference<LiveSession>;

export type NotificationCollection = Collection<Notification>;

export type NotificationDocumentReference = DocumentReference<
  Omit<Notification, "id">
>;
export type Options<TQueryOptions extends UseQueryOptions<any, any, any, any>> =
  OmitKeyof<TQueryOptions, "queryFn" | "queryKey">;

export interface PaginatedResponse<T> {
  data: T[];
  hasNext: boolean;
  hasPrev: boolean;
  limit: number;
  page: number;
  total: number;
}

export type QuizAttemptCollection = Collection<Omit<QuizAttempt, "id">>;

export type QuizAttemptDocumentReference = DocumentReference<QuizAttempt>;

export type QuizCollection = Collection<Quiz>;

export type QuizDocumentReference = DocumentReference<Quiz>;

export type SectionProgressCollection = Collection<SectionProgress>;

export type SectionProgressDocumentReference =
  DocumentReference<SectionProgress>;

export type StudentProgressCollection = Collection<StudentProgress>;

export type StudentProgressDocumentReference =
  DocumentReference<StudentProgress>;

export type UserCollection = Collection<User>;

export type UserDocumentReference = DocumentReference<User>;
