import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { activityLogs } from "@/schemas/activity-log";
import { api } from "@/services/api";
import { courseLessonRepository } from "@/server/repositories/course-lesson-repository";
import { courseRepository } from "@/server/repositories/course-repository";
import { lessonProgressRepository } from "@/server/repositories/lesson-progress-repository";
import { studentProgressRepository } from "@/server/repositories/student-progress-repository";
import { requireTenantScopedActorWithTenant } from "@/server/tenant-context";

const lessonProgressInputSchema = z.object({
  progressData: z.record(z.string(), z.any()),
});

const lessonProgressGetInputSchema = z.object({
  lessonId: z.string().min(1),
  studentId: z.string().min(1),
});

const lessonProgressUpdateInputSchema = z.object({
  progressData: z.record(z.string(), z.any()),
  progressId: z.string().min(1),
});

const markCompleteInputSchema = z.object({
  courseId: z.string().min(1),
  lessonId: z.string().min(1),
  sectionId: z.string().min(1),
  studentId: z.string().min(1),
});

async function syncStudentSectionProgress(input: {
  courseId: string;
  lessonId: string;
  sectionId: string;
  studentId: string;
  tenantId: string;
}) {
  const existingStudentProgress =
    await studentProgressRepository.getByStudentAndCourse({
      courseId: input.courseId,
      studentId: input.studentId,
      tenantId: input.tenantId,
    });

  if (!existingStudentProgress) {
    return;
  }

  const sectionLessons = await courseLessonRepository.listBySection(
    input.sectionId,
  );
  const completedLessonProgress = await lessonProgressRepository.listByStudent(
    input.studentId,
  );
  const completedLessonIds = new Set(
    completedLessonProgress
      .filter(
        (progress) =>
          progress.courseId === input.courseId && progress.isCompleted,
      )
      .map((progress) => progress.lessonId),
  );
  const sectionLessonIds = sectionLessons.map((lesson) => lesson.id);
  const completedInSection = sectionLessonIds.filter((lessonId) =>
    completedLessonIds.has(lessonId),
  );

  const existingSections = existingStudentProgress.sectionProgress || [];
  const remainingSections = existingSections.filter(
    (section) => section.sectionId !== input.sectionId,
  );

  remainingSections.push({
    completedAt:
      completedInSection.length === sectionLessonIds.length &&
      sectionLessonIds.length > 0
        ? Date.now()
        : null,
    completedLessons: completedInSection,
    completedQuizzes: [],
    courseId: input.courseId,
    isCompleted:
      completedInSection.length === sectionLessonIds.length &&
      sectionLessonIds.length > 0,
    lessonsCompleted: completedInSection,
    quizzesCompleted: [],
    sectionId: input.sectionId,
    timeSpent: completedLessonProgress
      .filter((progress) => progress.sectionId === input.sectionId)
      .reduce((total, progress) => total + (progress.timeSpent || 0), 0),
  });

  await studentProgressRepository.update(existingStudentProgress.id, {
    sectionProgress: remainingSections,
  });
}

export const createLessonProgressFn = createServerFn({ method: "POST" })
  .inputValidator(lessonProgressInputSchema)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();
    const progressData = data.progressData as any;

    if (
      progressData.studentId &&
      actor.role !== "super-admin" &&
      actor.role !== "admin" &&
      progressData.studentId !== actor.id
    ) {
      throw new Error(
        "You do not have permission to create lesson progress for another student.",
      );
    }

    if (progressData.courseId) {
      const course = await courseRepository.getById(progressData.courseId);

      if (!course || course.tenantId !== tenantId) {
        throw new Error("Course does not belong to the current tenant.");
      }
    }

    const createdProgress = await lessonProgressRepository.create(progressData);

    if (!createdProgress) {
      throw new Error("Failed to create lesson progress.");
    }

    return createdProgress.id;
  });

export const getLessonProgressFn = createServerFn({ method: "GET" })
  .inputValidator(lessonProgressGetInputSchema)
  .handler(async ({ data }) => {
    const { actor } = await requireTenantScopedActorWithTenant();

    if (
      actor.role !== "super-admin" &&
      actor.role !== "admin" &&
      data.studentId !== actor.id
    ) {
      throw new Error(
        "You do not have permission to view another student's lesson progress.",
      );
    }

    return lessonProgressRepository.getByStudentAndLesson(data);
  });

export const listLessonProgressByStudentFn = createServerFn({ method: "GET" })
  .inputValidator((studentId: string) => studentId)
  .handler(async ({ data }) => {
    const { actor } = await requireTenantScopedActorWithTenant();

    if (
      actor.role !== "super-admin" &&
      actor.role !== "admin" &&
      data !== actor.id
    ) {
      throw new Error(
        "You do not have permission to view another student's lesson progress.",
      );
    }

    return lessonProgressRepository.listByStudent(data);
  });

export const updateLessonProgressFn = createServerFn({ method: "POST" })
  .inputValidator(lessonProgressUpdateInputSchema)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();
    const existingProgress = await lessonProgressRepository.getById(
      data.progressId,
    );

    if (!existingProgress) {
      throw new Error("Lesson progress not found.");
    }

    if (
      actor.role !== "super-admin" &&
      actor.role !== "admin" &&
      existingProgress.studentId !== actor.id
    ) {
      throw new Error(
        "You do not have permission to update another student's lesson progress.",
      );
    }

    const course = await courseRepository.getById(existingProgress.courseId);

    if (!course || course.tenantId !== tenantId) {
      throw new Error("Lesson progress does not belong to the current tenant.");
    }

    const updatedProgress = await lessonProgressRepository.update(
      data.progressId,
      data.progressData as any,
    );

    if (!updatedProgress) {
      throw new Error("Failed to update lesson progress.");
    }

    return updatedProgress.id;
  });

export const markLessonCompleteFn = createServerFn({ method: "POST" })
  .inputValidator(markCompleteInputSchema)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();

    if (
      actor.role !== "super-admin" &&
      actor.role !== "admin" &&
      actor.id !== data.studentId
    ) {
      throw new Error(
        "You do not have permission to complete a lesson for another student.",
      );
    }

    const existingProgress =
      await lessonProgressRepository.getByStudentAndLesson({
        lessonId: data.lessonId,
        studentId: data.studentId,
      });

    if (existingProgress) {
      await lessonProgressRepository.update(existingProgress.id, {
        completedAt: Date.now(),
        isCompleted: true,
        watchPercentage: 100,
      });
    } else {
      await lessonProgressRepository.create({
        completedAt: Date.now(),
        courseId: data.courseId,
        currentPosition: 0,
        isCompleted: true,
        lastAccessedAt: Date.now(),
        lessonId: data.lessonId,
        resourcesViewed: [],
        sectionId: data.sectionId,
        studentId: data.studentId,
        timeSpent: 0,
        totalDuration: 0,
        viewCount: 1,
        watchedDuration: 0,
        watchPercentage: 100,
      });
    }

    const course = await courseRepository.getById(data.courseId);

    if (!course?.tenantId) {
      throw new Error("Course tenant not found.");
    }

    if (course.tenantId !== tenantId) {
      throw new Error("Course does not belong to the current tenant.");
    }

    await syncStudentSectionProgress({
      courseId: data.courseId,
      lessonId: data.lessonId,
      sectionId: data.sectionId,
      studentId: data.studentId,
      tenantId: course.tenantId,
    });

    await api.$use.courseProgress.updateCourseProgress({
      courseId: data.courseId,
      studentId: data.studentId,
      tenantId: course.tenantId,
    });

    await activityLogs.create({
      action: "lesson_completed",
      courseId: data.courseId,
      lessonId: data.lessonId,
      tenantId: tenantId!,
      userId: data.studentId,
    });

    return { success: true };
  });
