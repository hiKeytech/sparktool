import { createServerFn } from "@tanstack/react-start";
import { randomUUID } from "node:crypto";
import { z } from "zod";

import { activityLogs } from "@/schemas/activity-log";
import { courseSchema } from "@/schemas/course";
import { courseRepository } from "@/server/repositories/course-repository";
import { studentProgressRepository } from "@/server/repositories/student-progress-repository";
import { userRepository } from "@/server/repositories/user-repository";

const createCourseInputSchema = z.object({
  courseData: courseSchema.pick({
    category: true,
    description: true,
    difficulty: true,
    featured: true,
    instructors: true,
    language: true,
    learningObjectives: true,
    level: true,
    prerequisites: true,
    previewVideoUrl: true,
    price: true,
    published: true,
    shortDescription: true,
    tags: true,
    thumbnailUrl: true,
    title: true,
  }),
  tenantId: z.string().min(1),
  userId: z.string().min(1),
});

const enrollCourseInputSchema = z.object({
  courseId: z.string().min(1),
  studentId: z.string().min(1),
  tenantId: z.string().min(1),
});

const updateCourseInputSchema = z.object({
  courseData: courseSchema.partial(),
  courseId: z.string().min(1),
});

const removeCourseInputSchema = z.object({
  courseId: z.string().min(1),
});

const listCoursesInputSchema = z.object({
  filters: z
    .object({
      category: z.string().optional(),
      difficulty: z.string().optional(),
      published: z.boolean().optional(),
      search: z.string().optional(),
    })
    .optional(),
  tenantId: z.string().nullable().optional(),
});

async function logCourseEnrollment(input: {
  courseId: string;
  studentId: string;
  tenantId: string;
}) {
  await activityLogs.create({
    action: "course_enrolled",
    courseId: input.courseId,
    enrollmentMethod: "self_enrolled",
    tenantId: input.tenantId,
    userId: input.studentId,
  });
}

export const createCourseFn = createServerFn({ method: "POST" })
  .inputValidator(createCourseInputSchema)
  .handler(async ({ data }) => {
    const actor = await userRepository.getById(data.userId);
    const courseId = randomUUID();
    const publishedAt = data.courseData.published ? Date.now() : null;
    const course = await courseRepository.create({
      averageRating: 0,
      category: data.courseData.category,
      certificateTemplateId: null,
      completionCount: 0,
      completionRate: 0,
      createdAt: Date.now(),
      createdBy: data.userId,
      createdByMeta: actor
        ? {
            name: actor.displayName,
            photoUrl: actor.photoURL,
          }
        : null,
      description: data.courseData.description,
      difficulty: data.courseData.difficulty,
      enrollmentCount: 0,
      estimatedDurationInMinutes: 0,
      featured: data.courseData.featured ?? false,
      hasCertificate: false,
      id: courseId,
      instructors: data.courseData.instructors,
      language: data.courseData.language,
      lastModifiedBy: data.userId,
      learningObjectives: data.courseData.learningObjectives,
      level: data.courseData.level,
      prerequisites: data.courseData.prerequisites,
      previewVideoUrl: data.courseData.previewVideoUrl,
      price: data.courseData.price,
      published: data.courseData.published,
      publishedAt,
      sections: [],
      shortDescription: data.courseData.shortDescription,
      tags: data.courseData.tags,
      tenantId: data.tenantId,
      thumbnailUrl: data.courseData.thumbnailUrl,
      title: data.courseData.title,
      totalLessons: 0,
      totalQuizzes: 0,
      totalRatings: 0,
      updatedAt: Date.now(),
    });

    if (!course) {
      throw new Error("Failed to create course.");
    }

    return course.id;
  });

export const enrollInCourseFn = createServerFn({ method: "POST" })
  .inputValidator(enrollCourseInputSchema)
  .handler(async ({ data }) => {
    const existingProgress =
      await studentProgressRepository.getByStudentAndCourse(data);

    if (existingProgress) {
      throw new Error("Student is already enrolled in this course");
    }

    const course = await courseRepository.getById(data.courseId);

    if (!course) {
      throw new Error("Course not found.");
    }

    const user = await userRepository.getById(data.studentId);

    if (!user) {
      throw new Error("Student account not found.");
    }

    await studentProgressRepository.create({
      averageQuizScore: 0,
      completionPercentage: 0,
      courseId: data.courseId,
      enrolledAt: Date.now(),
      estimatedTimeRemaining: 0,
      lastAccessedAt: Date.now(),
      quizzesPassed: 0,
      sectionProgress: [],
      status: "enrolled",
      studentId: data.studentId,
      tenantId: data.tenantId,
      timeSpentMinutes: 0,
      totalLessonsCompleted: 0,
      totalOptionalLessonsCompleted: 0,
      totalQuizzesTaken: 0,
      totalRequiredLessons: 0,
    });

    await Promise.all([
      courseRepository.incrementEnrollment(data.courseId, 1),
      userRepository.update(data.studentId, {
        enrolledCourses: Array.from(
          new Set([...(user.enrolledCourses || []), data.courseId]),
        ),
      }),
      logCourseEnrollment(data),
    ]);

    return { success: true };
  });

export const getCourseFn = createServerFn({ method: "GET" })
  .inputValidator((courseId: string) => courseId)
  .handler(async ({ data }) => {
    return courseRepository.getById(data);
  });

export const listCoursesFn = createServerFn({ method: "GET" })
  .inputValidator(listCoursesInputSchema)
  .handler(async ({ data }) => {
    return courseRepository.list(
      data.tenantId ?? undefined,
      data.filters || {},
    );
  });

export const removeCourseFn = createServerFn({ method: "POST" })
  .inputValidator(removeCourseInputSchema)
  .handler(async ({ data }) => {
    const progressRecords = await studentProgressRepository.listByCourse(
      data.courseId,
    );
    const affectedStudentIds = Array.from(
      new Set(progressRecords.map((progress) => progress.studentId)),
    );

    await Promise.all([
      studentProgressRepository.deleteByCourseId(data.courseId),
      courseRepository.delete(data.courseId),
      ...affectedStudentIds.map(async (studentId) => {
        const user = await userRepository.getById(studentId);

        if (!user) {
          return;
        }

        await userRepository.update(studentId, {
          completedCourses: (user.completedCourses || []).filter(
            (courseId) => courseId !== data.courseId,
          ),
          enrolledCourses: (user.enrolledCourses || []).filter(
            (courseId) => courseId !== data.courseId,
          ),
        });
      }),
    ]);

    return { success: true };
  });

export const updateCourseFn = createServerFn({ method: "POST" })
  .inputValidator(updateCourseInputSchema)
  .handler(async ({ data }) => {
    const existingCourse = await courseRepository.getById(data.courseId);

    if (!existingCourse) {
      throw new Error("Course not found.");
    }

    const publishedAt =
      data.courseData.published === true && !existingCourse.publishedAt
        ? Date.now()
        : data.courseData.published === false
          ? null
          : existingCourse.publishedAt;

    const updatedCourse = await courseRepository.update(data.courseId, {
      ...data.courseData,
      publishedAt,
    });

    if (!updatedCourse) {
      throw new Error("Failed to update course.");
    }

    return updatedCourse.id;
  });
