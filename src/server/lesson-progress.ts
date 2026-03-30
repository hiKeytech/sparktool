import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { activityLogs } from "@/schemas/activity-log";
import { api } from "@/services/api";
import { courseLessonRepository } from "@/server/repositories/course-lesson-repository";
import { courseRepository } from "@/server/repositories/course-repository";
import { lessonProgressRepository } from "@/server/repositories/lesson-progress-repository";
import { studentProgressRepository } from "@/server/repositories/student-progress-repository";

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
    const createdProgress = await lessonProgressRepository.create(
      data.progressData as any,
    );

    if (!createdProgress) {
      throw new Error("Failed to create lesson progress.");
    }

    return createdProgress.id;
  });

export const getLessonProgressFn = createServerFn({ method: "GET" })
  .inputValidator(lessonProgressGetInputSchema)
  .handler(async ({ data }) => {
    return lessonProgressRepository.getByStudentAndLesson(data);
  });

export const listLessonProgressByStudentFn = createServerFn({ method: "GET" })
  .inputValidator((studentId: string) => studentId)
  .handler(async ({ data }) => {
    return lessonProgressRepository.listByStudent(data);
  });

export const updateLessonProgressFn = createServerFn({ method: "POST" })
  .inputValidator(lessonProgressUpdateInputSchema)
  .handler(async ({ data }) => {
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
      userId: data.studentId,
    });

    return { success: true };
  });
