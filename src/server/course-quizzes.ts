import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { courseRepository } from "@/server/repositories/course-repository";
import { courseQuizRepository } from "@/server/repositories/course-quiz-repository";
import {
  assertTenantAdminAccess,
  requireTenantScopedActorWithTenant,
  resolveTenantFromCurrentRequest,
} from "@/server/tenant-context";
import type { CourseQuiz } from "@/types";

const courseQuizFiltersSchema = z
  .object({
    courseId: z.string().optional(),
    lessonId: z.string().optional(),
    placement: z.enum(["course", "lesson", "section"]).optional(),
    sectionId: z.string().optional(),
  })
  .optional();

const courseQuizSchema = z.object({
  courseId: z.string().min(1),
  createdAt: z.number().optional(),
  description: z.string().optional(),
  isRequired: z.boolean(),
  lessonId: z.string().optional(),
  maxAttempts: z.number().optional(),
  order: z.number(),
  passingScore: z.number(),
  placement: z.enum(["course", "lesson", "section"]),
  questions: z.array(z.any()),
  sectionId: z.string().optional(),
  timeLimit: z.number().optional(),
  title: z.string().min(1),
  updatedAt: z.number().optional(),
});

async function getCourseForTenant(courseId: string, tenantId: string) {
  const course = await courseRepository.getById(courseId);

  if (!course || course.tenantId !== tenantId) {
    throw new Error("Course does not belong to the current tenant.");
  }

  return course;
}

export const createCourseQuizFn = createServerFn({ method: "POST" })
  .inputValidator(courseQuizSchema)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();

    assertTenantAdminAccess(actor);
    await getCourseForTenant(data.courseId, tenantId!);

    const createdQuiz = await courseQuizRepository.create(
      data as Omit<CourseQuiz, "id">,
    );

    if (!createdQuiz) {
      throw new Error("Failed to create course quiz.");
    }

    return createdQuiz.id;
  });

export const deleteCourseQuizFn = createServerFn({ method: "POST" })
  .inputValidator((quizId: string) => quizId)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();
    const quiz = await courseQuizRepository.getById(data);

    assertTenantAdminAccess(actor);

    if (!quiz) {
      throw new Error("Course quiz not found.");
    }

    await getCourseForTenant(quiz.courseId, tenantId!);

    await courseQuizRepository.delete(data);
    return { success: true };
  });

export const getCourseQuizFn = createServerFn({ method: "GET" })
  .inputValidator((quizId: string) => quizId)
  .handler(async ({ data }) => {
    const [tenant, quiz] = await Promise.all([
      resolveTenantFromCurrentRequest(),
      courseQuizRepository.getById(data),
    ]);

    if (!quiz) {
      return null;
    }

    if (!tenant) {
      return quiz;
    }

    const course = await courseRepository.getById(quiz.courseId);

    if (!course || course.tenantId !== tenant.id) {
      return null;
    }

    return quiz;
  });

export const listCourseQuizzesFn = createServerFn({ method: "GET" })
  .inputValidator(courseQuizFiltersSchema)
  .handler(async ({ data }) => {
    const tenant = await resolveTenantFromCurrentRequest();

    if (data?.courseId && tenant) {
      await getCourseForTenant(data.courseId, tenant.id);
      return courseQuizRepository.list(data);
    }

    const quizzes = await courseQuizRepository.list(data);

    if (!tenant) {
      return quizzes;
    }

    const tenantCourseIds = new Set(
      (await courseRepository.list(tenant.id)).map((course) => course.id),
    );

    return quizzes.filter((quiz) => tenantCourseIds.has(quiz.courseId));
  });

export const reorderCourseQuizzesFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.array(z.object({ order: z.number(), quizId: z.string().min(1) })),
  )
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();
    const quizzes = await Promise.all(
      data.map(({ quizId }) => courseQuizRepository.getById(quizId)),
    );

    assertTenantAdminAccess(actor);

    for (const quiz of quizzes) {
      if (!quiz) {
        throw new Error("Course quiz not found.");
      }

      await getCourseForTenant(quiz.courseId, tenantId!);
    }

    await Promise.all(
      data.map(({ order, quizId }) =>
        courseQuizRepository.update(quizId, { order }),
      ),
    );

    return { success: true };
  });

export const updateCourseQuizFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      quizData: courseQuizSchema.partial(),
      quizId: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();
    const existingQuiz = await courseQuizRepository.getById(data.quizId);

    assertTenantAdminAccess(actor);

    if (!existingQuiz) {
      throw new Error("Course quiz not found.");
    }

    await getCourseForTenant(existingQuiz.courseId, tenantId!);

    const updatedQuiz = await courseQuizRepository.update(
      data.quizId,
      data.quizData,
    );

    if (!updatedQuiz) {
      throw new Error("Failed to update course quiz.");
    }

    return updatedQuiz.id;
  });
