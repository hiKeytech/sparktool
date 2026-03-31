import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { activityLogs } from "@/schemas/activity-log";
import { courseRepository } from "@/server/repositories/course-repository";
import { quizAttemptRepository } from "@/server/repositories/quiz-attempt-repository";
import { quizRepository } from "@/server/repositories/quiz-repository";
import { studentProgressRepository } from "@/server/repositories/student-progress-repository";
import { userRepository } from "@/server/repositories/user-repository";
import {
  assertTenantAdminAccess,
  requireTenantScopedActorWithTenant,
  resolveTenantFromCurrentRequest,
  userHasTenantAccess,
} from "@/server/tenant-context";
import type { Quiz, QuizAttempt } from "@/types";

const quizSchema = z.object({
  courseId: z.string().min(1),
  createdAt: z.number(),
  createdBy: z.string().min(1),
  description: z.string().optional(),
  maxAttempts: z.number().optional(),
  passingScore: z.number(),
  questions: z.array(z.any()),
  timeLimit: z.number().optional(),
  title: z.string().min(1),
  updatedAt: z.number(),
});

const createQuizAttemptInputSchema = z.object({
  courseId: z.string().min(1),
  quizId: z.string().min(1),
  studentId: z.string().min(1),
});

const listQuizAttemptsInputSchema = z.object({
  courseId: z.string().optional(),
  quizId: z.string().optional(),
  studentId: z.string().optional(),
});

const updateQuizAttemptInputSchema = z.object({
  attemptData: z.object({
    answers: z.array(z.any()).optional(),
    completedAt: z.number().optional(),
    passed: z.boolean().optional(),
    percentage: z.number().optional(),
    score: z.number().optional(),
    timeSpent: z.number().optional(),
  }),
  attemptId: z.string().min(1),
});

async function syncStudentQuizMetrics(input: {
  courseId: string;
  score: number;
  studentId: string;
}) {
  const progress = await studentProgressRepository.getByStudentAndCourse({
    courseId: input.courseId,
    studentId: input.studentId,
  });

  if (!progress) {
    return;
  }

  const attempts = await quizAttemptRepository.list({
    courseId: input.courseId,
    studentId: input.studentId,
  });
  const completedAttempts = attempts.filter(
    (attempt) => typeof attempt.completedAt === "number",
  );
  const totalQuizzesTaken = completedAttempts.length;
  const quizzesPassed = completedAttempts.filter(
    (attempt) => attempt.passed,
  ).length;
  const averageQuizScore = totalQuizzesTaken
    ? Math.round(
        completedAttempts.reduce(
          (total, attempt) => total + (attempt.percentage || 0),
          0,
        ) / totalQuizzesTaken,
      )
    : 0;

  await studentProgressRepository.update(progress.id, {
    averageQuizScore,
    quizzesPassed,
    totalQuizzesTaken,
  });
}

async function getCourseForTenant(courseId: string, tenantId: string) {
  const course = await courseRepository.getById(courseId);

  if (!course || course.tenantId !== tenantId) {
    throw new Error("Course does not belong to the current tenant.");
  }

  return course;
}

export const createQuizFn = createServerFn({ method: "POST" })
  .inputValidator(quizSchema)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();

    assertTenantAdminAccess(actor);
    await getCourseForTenant(data.courseId, tenantId!);

    const createdQuiz = await quizRepository.create(data as Quiz);

    if (!createdQuiz) {
      throw new Error("Failed to create quiz.");
    }

    return createdQuiz.id;
  });

export const deleteQuizFn = createServerFn({ method: "POST" })
  .inputValidator((quizId: string) => quizId)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();
    const quiz = await quizRepository.getById(data);

    assertTenantAdminAccess(actor);

    if (!quiz) {
      throw new Error("Quiz not found.");
    }

    await getCourseForTenant(quiz.courseId, tenantId!);

    await quizRepository.softDelete(data);
    return { success: true };
  });

export const getQuizFn = createServerFn({ method: "GET" })
  .inputValidator((quizId: string | undefined) => quizId)
  .handler(async ({ data }) => {
    const [tenant, quiz] = await Promise.all([
      resolveTenantFromCurrentRequest(),
      quizRepository.getById(data),
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

export const listQuizzesFn = createServerFn({ method: "GET" })
  .inputValidator((courseId: string | undefined) => courseId)
  .handler(async ({ data }) => {
    const tenant = await resolveTenantFromCurrentRequest();

    if (data && tenant) {
      await getCourseForTenant(data, tenant.id);
      return quizRepository.list(data);
    }

    const quizzes = await quizRepository.list(data);

    if (!tenant) {
      return quizzes;
    }

    const tenantCourseIds = new Set(
      (await courseRepository.list(tenant.id)).map((course) => course.id),
    );

    return quizzes.filter((quiz) => tenantCourseIds.has(quiz.courseId));
  });

export const updateQuizFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      quizData: quizSchema.partial(),
      quizId: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();
    const existingQuiz = await quizRepository.getById(data.quizId);

    assertTenantAdminAccess(actor);

    if (!existingQuiz) {
      throw new Error("Quiz not found.");
    }

    await getCourseForTenant(existingQuiz.courseId, tenantId!);

    const updatedQuiz = await quizRepository.update(data.quizId, data.quizData);

    if (!updatedQuiz) {
      throw new Error("Failed to update quiz.");
    }

    return updatedQuiz.id;
  });

export const createQuizAttemptFn = createServerFn({ method: "POST" })
  .inputValidator(createQuizAttemptInputSchema)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();
    const [quiz, student] = await Promise.all([
      quizRepository.getById(data.quizId),
      userRepository.getById(data.studentId),
    ]);

    if (
      actor.role !== "super-admin" &&
      actor.role !== "admin" &&
      actor.id !== data.studentId
    ) {
      throw new Error(
        "You do not have permission to create another student's quiz attempt.",
      );
    }

    if (!quiz) {
      throw new Error("Quiz not found.");
    }

    if (quiz.courseId !== data.courseId) {
      throw new Error("Quiz does not belong to the supplied course.");
    }

    await getCourseForTenant(data.courseId, tenantId!);

    if (!userHasTenantAccess(student, tenantId)) {
      throw new Error("Student does not belong to the current tenant.");
    }

    const attemptNumber = await quizAttemptRepository.nextAttemptNumber({
      quizId: data.quizId,
      studentId: data.studentId,
    });
    const createdAttempt = await quizAttemptRepository.create({
      answers: [],
      attemptNumber,
      courseId: data.courseId,
      passed: false,
      percentage: 0,
      quizId: data.quizId,
      score: 0,
      startedAt: Date.now(),
      studentId: data.studentId,
      timeSpent: 0,
      totalPoints: 0,
    } satisfies Omit<QuizAttempt, "id">);

    if (!createdAttempt) {
      throw new Error("Failed to create quiz attempt.");
    }

    return createdAttempt;
  });

export const listQuizAttemptsFn = createServerFn({ method: "GET" })
  .inputValidator(listQuizAttemptsInputSchema)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();

    if (
      data.studentId &&
      actor.role !== "super-admin" &&
      actor.role !== "admin" &&
      actor.id !== data.studentId
    ) {
      throw new Error(
        "You do not have permission to view another student's quiz attempts.",
      );
    }

    if (data.courseId) {
      await getCourseForTenant(data.courseId, tenantId!);
      return quizAttemptRepository.list(data);
    }

    const attempts = await quizAttemptRepository.list(data);
    const tenantCourseIds = new Set(
      (await courseRepository.list(tenantId!)).map((course) => course.id),
    );

    return attempts.filter((attempt) => tenantCourseIds.has(attempt.courseId));
  });

export const updateQuizAttemptFn = createServerFn({ method: "POST" })
  .inputValidator(updateQuizAttemptInputSchema)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();
    const existingAttempt = await quizAttemptRepository.getById(data.attemptId);

    if (!existingAttempt) {
      throw new Error("Quiz attempt not found.");
    }

    if (
      actor.role !== "super-admin" &&
      actor.role !== "admin" &&
      actor.id !== existingAttempt.studentId
    ) {
      throw new Error(
        "You do not have permission to update another student's quiz attempt.",
      );
    }

    await getCourseForTenant(existingAttempt.courseId, tenantId!);

    const updatedAttempt = await quizAttemptRepository.update(
      data.attemptId,
      data.attemptData,
    );

    if (!updatedAttempt) {
      throw new Error("Failed to update quiz attempt.");
    }

    if (!existingAttempt.completedAt && updatedAttempt.completedAt) {
      await syncStudentQuizMetrics({
        courseId: updatedAttempt.courseId,
        score: updatedAttempt.percentage,
        studentId: updatedAttempt.studentId,
      });

      await activityLogs.create({
        action: "quiz_attempted",
        courseId: updatedAttempt.courseId,
        passed: updatedAttempt.passed,
        quizId: updatedAttempt.quizId,
        score: updatedAttempt.percentage,
        tenantId: tenantId!,
        userId: updatedAttempt.studentId,
      });
    }

    return updatedAttempt.id;
  });
