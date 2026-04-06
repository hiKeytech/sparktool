import { courseLessonRepository } from "../repositories/course-lesson-repository.js";
import { courseRepository } from "../repositories/course-repository.js";
import { lessonProgressRepository } from "../repositories/lesson-progress-repository.js";
import { studentProgressRepository } from "../repositories/student-progress-repository.js";

export async function syncStudentSectionProgress(input: {
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

  if (!existingStudentProgress) return;

  const [sectionLessons, completedLessonProgress] = await Promise.all([
    courseLessonRepository.listBySection(input.sectionId),
    lessonProgressRepository.listByStudent(input.studentId),
  ]);

  const completedLessonIds = new Set(
    completedLessonProgress
      .filter((p) => p.courseId === input.courseId && p.isCompleted)
      .map((p) => p.lessonId),
  );
  const sectionLessonIds = sectionLessons.map((l) => l.id);
  const completedInSection = sectionLessonIds.filter((id) =>
    completedLessonIds.has(id),
  );

  const existingSections = existingStudentProgress.sectionProgress ?? [];
  const remainingSections = existingSections.filter(
    (s) => s.sectionId !== input.sectionId,
  );

  remainingSections.push({
    completedAt:
      completedInSection.length === sectionLessonIds.length &&
      sectionLessonIds.length > 0
        ? Date.now()
        : null,
    completedLessons: completedInSection.length,
    completionPercentage:
      sectionLessonIds.length > 0
        ? Math.round(
            (completedInSection.length / sectionLessonIds.length) * 100,
          )
        : 0,
    sectionId: input.sectionId,
    totalLessons: sectionLessonIds.length,
  });

  await studentProgressRepository.update(existingStudentProgress.id, {
    sectionProgress: remainingSections,
  });
}

export async function updateCourseProgress(input: {
  courseId: string;
  studentId: string;
  tenantId: string;
}) {
  const [allLessons, allProgress] = await Promise.all([
    courseLessonRepository.listByCourse(input.courseId),
    lessonProgressRepository.listByStudent(input.studentId),
  ]);

  const courseProgress = allProgress.filter(
    (p) => p.courseId === input.courseId && p.isCompleted,
  );

  const requiredLessons = allLessons.filter((l) => l.isRequired);
  const optionalLessons = allLessons.filter((l) => !l.isRequired);

  const completedRequired = courseProgress.filter((p) =>
    requiredLessons.some((l) => l.id === p.lessonId),
  ).length;
  const completedOptional = courseProgress.filter((p) =>
    optionalLessons.some((l) => l.id === p.lessonId),
  ).length;

  const totalRequired = requiredLessons.length;
  const completionPercentage =
    totalRequired > 0
      ? Math.min(100, Math.round((completedRequired / totalRequired) * 100))
      : 100;
  const isCompleted = totalRequired > 0 && completedRequired >= totalRequired;
  const totalTimeSpent = courseProgress.reduce(
    (sum, p) => sum + ((p as any).timeSpent ?? 0),
    0,
  );

  const existingProgress =
    await studentProgressRepository.getByStudentAndCourse({
      courseId: input.courseId,
      studentId: input.studentId,
      tenantId: input.tenantId,
    });

  const nextStatus = isCompleted
    ? "completed"
    : completionPercentage > 0
      ? "in-progress"
      : "enrolled";

  if (existingProgress) {
    const wasCompleted = existingProgress.status === "completed";

    await studentProgressRepository.update(existingProgress.id, {
      completedAt: isCompleted
        ? (existingProgress.completedAt ?? Date.now())
        : null,
      completionPercentage,
      startedAt:
        existingProgress.startedAt ??
        (completionPercentage > 0 ? Date.now() : undefined),
      status: nextStatus as
        | "completed"
        | "dropped"
        | "enrolled"
        | "in-progress",
      timeSpentMinutes: totalTimeSpent,
      totalLessonsCompleted: courseProgress.length,
      totalOptionalLessonsCompleted: completedOptional,
      totalRequiredLessons: totalRequired,
    });

    if (wasCompleted !== isCompleted) {
      await courseRepository.incrementCompletion(
        input.courseId,
        isCompleted ? 1 : -1,
      );
    }
  } else {
    await studentProgressRepository.create({
      averageQuizScore: 0,
      completedAt: isCompleted ? Date.now() : null,
      completionPercentage,
      courseId: input.courseId,
      enrolledAt: Date.now(),
      estimatedTimeRemaining: 0,
      lastAccessedAt: Date.now(),
      quizzesPassed: 0,
      sectionProgress: [],
      startedAt: completionPercentage > 0 ? Date.now() : undefined,
      status: nextStatus as
        | "completed"
        | "dropped"
        | "enrolled"
        | "in-progress",
      studentId: input.studentId,
      tenantId: input.tenantId,
      timeSpentMinutes: totalTimeSpent,
      totalLessonsCompleted: courseProgress.length,
      totalOptionalLessonsCompleted: completedOptional,
      totalQuizzesTaken: 0,
      totalRequiredLessons: totalRequired,
    });

    if (isCompleted) {
      await courseRepository.incrementCompletion(input.courseId, 1);
    }
  }
}
