import { api } from "@/services/api";

export const courseProgress = {
  calculate: async (variables: { courseId: string; studentId: string }) => {
    const { courseId, studentId } = variables;

    // Get all lessons for the course
    const allLessons = await api.$use.courseLesson.listByCourse(courseId);
    const requiredLessons = allLessons.filter((lesson) => lesson.isRequired);
    const optionalLessons = allLessons.filter((lesson) => !lesson.isRequired);

    // Get lesson progress for this student
    const allProgress = await api.$use.lessonProgress.listByStudent(studentId);
    const currentCourseProgress = allProgress.filter(
      (progress) => progress.courseId === courseId,
    );

    // Calculate completion
    const completedRequired = currentCourseProgress.filter(
      (progress) =>
        progress.isCompleted &&
        requiredLessons.some((lesson) => lesson.id === progress.lessonId),
    );
    const completedOptional = currentCourseProgress.filter(
      (progress) =>
        progress.isCompleted &&
        optionalLessons.some((lesson) => lesson.id === progress.lessonId),
    );

    const totalRequiredLessons = requiredLessons.length;
    const totalRequiredCompleted = completedRequired.length;
    const completionPercentage =
      totalRequiredLessons > 0
        ? Math.round((totalRequiredCompleted / totalRequiredLessons) * 100)
        : 100;

    const isCompleted = completionPercentage === 100;

    return {
      completionPercentage,
      courseId,
      isCompleted,
      studentId,
      totalLessonsCompleted: currentCourseProgress.filter((p) => p.isCompleted)
        .length,
      totalOptionalLessonsCompleted: completedOptional.length,
      totalRequiredLessons: totalRequiredLessons,
      totalTimeSpent: currentCourseProgress.reduce(
        (total, progress) => total + (progress.timeSpent || 0),
        0,
      ),
    };
  },

  updateCourseProgress: async (variables: {
    courseId: string;
    studentId: string;
    tenantId: string;
  }) => {
    const { courseId, studentId, tenantId } = variables;

    // Calculate new progress
    const calculatedProgress = await api.$use.courseProgress.calculate({
      courseId,
      studentId,
    });

    const { upsertCourseProgressSummaryFn } =
      await import("@/server/student-progress");

    await upsertCourseProgressSummaryFn({
      data: {
        calculatedProgress,
        tenantId,
      },
    });

    return calculatedProgress;
  },
};
