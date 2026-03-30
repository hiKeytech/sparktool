import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { courseRepository } from "@/server/repositories/course-repository";
import { studentProgressRepository } from "@/server/repositories/student-progress-repository";
import { userRepository } from "@/server/repositories/user-repository";

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

async function syncCompletedCoursesForUser(input: {
  courseId: string;
  isCompleted: boolean;
  studentId: string;
}) {
  const user = await userRepository.getById(input.studentId);

  if (!user) {
    return;
  }

  const completedCourses = input.isCompleted
    ? Array.from(new Set([...(user.completedCourses || []), input.courseId]))
    : (user.completedCourses || []).filter(
        (courseId) => courseId !== input.courseId,
      );

  await userRepository.update(input.studentId, {
    completedCourses,
  });
}

export const createStudentProgressFn = createServerFn({ method: "POST" })
  .inputValidator(createStudentProgressInputSchema)
  .handler(async ({ data }) => {
    const createdProgress = await studentProgressRepository.create({
      averageQuizScore: data.averageQuizScore ?? 0,
      completedAt: data.completedAt ?? null,
      completionPercentage: data.completionPercentage ?? 0,
      courseId: data.courseId,
      currentLessonId: data.currentLessonId,
      currentLessonPosition: data.currentLessonPosition,
      currentSectionId: data.currentSectionId,
      enrolledAt: data.enrolledAt ?? Date.now(),
      estimatedTimeRemaining: data.estimatedTimeRemaining ?? 0,
      lastAccessedAt: data.lastAccessedAt ?? Date.now(),
      quizzesPassed: data.quizzesPassed ?? 0,
      sectionProgress: data.sectionProgress ?? [],
      startedAt: data.startedAt,
      status: data.status ?? "enrolled",
      studentId: data.studentId,
      tenantId: data.tenantId,
      timeSpentMinutes: data.timeSpentMinutes ?? 0,
      totalLessonsCompleted: data.totalLessonsCompleted ?? 0,
      totalOptionalLessonsCompleted: data.totalOptionalLessonsCompleted ?? 0,
      totalQuizzesTaken: data.totalQuizzesTaken ?? 0,
      totalRequiredLessons: data.totalRequiredLessons ?? 0,
    });

    if (!createdProgress) {
      throw new Error("Failed to create student progress.");
    }

    return createdProgress.id;
  });

export const getStudentProgressFn = createServerFn({ method: "GET" })
  .inputValidator(getStudentProgressInputSchema)
  .handler(async ({ data }) => {
    if (!data.studentId || !data.courseId) {
      return null;
    }

    return studentProgressRepository.getByStudentAndCourse({
      courseId: data.courseId,
      studentId: data.studentId,
    });
  });

export const listStudentProgressFn = createServerFn({ method: "GET" })
  .inputValidator(listStudentProgressInputSchema)
  .handler(async ({ data }) => {
    return studentProgressRepository.listByStudent(
      data.studentId,
      data.tenantId ?? undefined,
    );
  });

export const updateStudentProgressFn = createServerFn({ method: "POST" })
  .inputValidator(updateStudentProgressInputSchema)
  .handler(async ({ data }) => {
    const existingProgress = await studentProgressRepository.getById(
      data.progressId,
    );

    if (!existingProgress) {
      throw new Error("Student progress record not found.");
    }

    const nextStatus =
      typeof data.progressData.status === "string"
        ? data.progressData.status
        : existingProgress.status;
    const wasCompleted = existingProgress.status === "completed";
    const isCompleted = nextStatus === "completed";

    const updatedProgress = await studentProgressRepository.update(
      data.progressId,
      {
        ...data.progressData,
        completedAt: isCompleted
          ? existingProgress.completedAt || Date.now()
          : data.progressData.completedAt === null
            ? null
            : existingProgress.completedAt,
      },
    );

    if (!updatedProgress) {
      throw new Error("Failed to update student progress.");
    }

    if (wasCompleted !== isCompleted) {
      await courseRepository.incrementCompletion(
        existingProgress.courseId,
        isCompleted ? 1 : -1,
      );
    }

    await syncCompletedCoursesForUser({
      courseId: existingProgress.courseId,
      isCompleted,
      studentId: existingProgress.studentId,
    });

    return updatedProgress.id;
  });

export const upsertCourseProgressSummaryFn = createServerFn({ method: "POST" })
  .inputValidator(upsertCourseProgressSummaryInputSchema)
  .handler(async ({ data }) => {
    const existingProgress =
      await studentProgressRepository.getByStudentAndCourse({
        courseId: data.calculatedProgress.courseId,
        studentId: data.calculatedProgress.studentId,
        tenantId: data.tenantId,
      });
    const nextStatus = data.calculatedProgress.isCompleted
      ? "completed"
      : data.calculatedProgress.completionPercentage > 0
        ? "in-progress"
        : "enrolled";

    if (existingProgress) {
      const wasCompleted = existingProgress.status === "completed";
      const updatedProgress = await studentProgressRepository.update(
        existingProgress.id,
        {
          completedAt: data.calculatedProgress.isCompleted ? Date.now() : null,
          completionPercentage: data.calculatedProgress.completionPercentage,
          startedAt:
            existingProgress.startedAt ||
            (data.calculatedProgress.completionPercentage > 0
              ? Date.now()
              : undefined),
          status: nextStatus,
          timeSpentMinutes: data.calculatedProgress.totalTimeSpent,
          totalLessonsCompleted: data.calculatedProgress.totalLessonsCompleted,
          totalOptionalLessonsCompleted:
            data.calculatedProgress.totalOptionalLessonsCompleted,
          totalRequiredLessons: data.calculatedProgress.totalRequiredLessons,
        },
      );

      if (!updatedProgress) {
        throw new Error("Failed to update course progress.");
      }

      if (wasCompleted !== data.calculatedProgress.isCompleted) {
        await courseRepository.incrementCompletion(
          data.calculatedProgress.courseId,
          data.calculatedProgress.isCompleted ? 1 : -1,
        );
      }

      await syncCompletedCoursesForUser({
        courseId: data.calculatedProgress.courseId,
        isCompleted: data.calculatedProgress.isCompleted,
        studentId: data.calculatedProgress.studentId,
      });

      return updatedProgress.id;
    }

    const createdProgress = await studentProgressRepository.create({
      averageQuizScore: 0,
      completedAt: data.calculatedProgress.isCompleted ? Date.now() : null,
      completionPercentage: data.calculatedProgress.completionPercentage,
      courseId: data.calculatedProgress.courseId,
      enrolledAt: Date.now(),
      estimatedTimeRemaining: 0,
      lastAccessedAt: Date.now(),
      quizzesPassed: 0,
      sectionProgress: [],
      startedAt:
        data.calculatedProgress.completionPercentage > 0
          ? Date.now()
          : undefined,
      status: nextStatus,
      studentId: data.calculatedProgress.studentId,
      tenantId: data.tenantId,
      timeSpentMinutes: data.calculatedProgress.totalTimeSpent,
      totalLessonsCompleted: data.calculatedProgress.totalLessonsCompleted,
      totalOptionalLessonsCompleted:
        data.calculatedProgress.totalOptionalLessonsCompleted,
      totalQuizzesTaken: 0,
      totalRequiredLessons: data.calculatedProgress.totalRequiredLessons,
    });

    if (!createdProgress) {
      throw new Error("Failed to create course progress.");
    }

    if (data.calculatedProgress.isCompleted) {
      await courseRepository.incrementCompletion(
        data.calculatedProgress.courseId,
        1,
      );
    }

    await syncCompletedCoursesForUser({
      courseId: data.calculatedProgress.courseId,
      isCompleted: data.calculatedProgress.isCompleted,
      studentId: data.calculatedProgress.studentId,
    });

    return createdProgress.id;
  });
