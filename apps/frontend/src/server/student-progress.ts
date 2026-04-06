import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { api, type ApiIdResponse } from "@/lib/api-client";
import type { StudentProgress } from "@/schemas/student-progress";

type StudentProgressLookupResult = StudentProgress[] | StudentProgress | null;

const createStudentProgressInputSchema = z.object({
  averageQuizScore: z.number().optional(),
  completedAt: z.number().nullable().optional(),
  completionPercentage: z.number().optional(),
  courseId: z.string().min(1),
  currentLessonId: z.string().optional(),
  currentLessonPosition: z.number().optional(),
  currentSectionId: z.string().optional(),
  enrolledAt: z.number().optional(),
  estimatedTimeRemaining: z.number().optional(),
  lastAccessedAt: z.number().optional(),
  quizzesPassed: z.number().optional(),
  sectionProgress: z.array(z.any()).optional(),
  startedAt: z.number().optional(),
  status: z
    .enum(["completed", "dropped", "enrolled", "in-progress"])
    .optional(),
  studentId: z.string().min(1),
  tenantId: z.string().min(1),
  timeSpentMinutes: z.number().optional(),
  totalLessonsCompleted: z.number().optional(),
  totalOptionalLessonsCompleted: z.number().optional(),
  totalQuizzesTaken: z.number().optional(),
  totalRequiredLessons: z.number().optional(),
});

const getStudentProgressInputSchema = z.object({
  courseId: z.string().optional(),
  studentId: z.string().optional(),
});

const listStudentProgressInputSchema = z.object({
  studentId: z.string().min(1),
  tenantId: z.string().optional().nullable(),
});

const updateStudentProgressInputSchema = z.object({
  progressData: z.record(z.string(), z.any()),
  progressId: z.string().min(1),
});

const upsertCourseProgressSummaryInputSchema = z.object({
  calculatedProgress: z.object({
    completionPercentage: z.number(),
    courseId: z.string().min(1),
    isCompleted: z.boolean(),
    studentId: z.string().min(1),
    totalLessonsCompleted: z.number(),
    totalOptionalLessonsCompleted: z.number(),
    totalRequiredLessons: z.number(),
    totalTimeSpent: z.number(),
  }),
  tenantId: z.string().min(1),
});

export const createStudentProgressFn = createServerFn({ method: "POST" })
  .inputValidator(createStudentProgressInputSchema)
  .handler(async ({ data }) => {
    return api.post<ApiIdResponse>("/api/student-progress", {
      progressData: data,
    });
  });

export const getStudentProgressFn = createServerFn({ method: "GET" })
  .inputValidator(getStudentProgressInputSchema)
  .handler(async ({ data }) => {
    const params = new URLSearchParams();
    if (data.studentId) params.set("studentId", data.studentId);
    if (data.courseId) params.set("courseId", data.courseId);
    return api.get<StudentProgressLookupResult>(
      `/api/student-progress?${params}`,
    );
  });

export const listStudentProgressFn = createServerFn({ method: "GET" })
  .inputValidator(listStudentProgressInputSchema)
  .handler(async ({ data }) => {
    return api.get<StudentProgress[]>(
      `/api/student-progress/student/${data.studentId}`,
    );
  });

export const updateStudentProgressFn = createServerFn({ method: "POST" })
  .inputValidator(updateStudentProgressInputSchema)
  .handler(async ({ data }) => {
    return api.patch<ApiIdResponse>(
      `/api/student-progress/${data.progressId}`,
      data.progressData,
    );
  });

export const upsertCourseProgressSummaryFn = createServerFn({ method: "POST" })
  .inputValidator(upsertCourseProgressSummaryInputSchema)
  .handler(async ({ data }) => {
    return api.post<ApiIdResponse>("/api/student-progress/upsert", data);
  });
