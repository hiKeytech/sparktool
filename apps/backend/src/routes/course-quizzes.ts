import { Router } from "express";

import { courseQuizRepository } from "../repositories/course-quiz-repository";
import { courseRepository } from "../repositories/course-repository";
import {
  assertAdminAccess,
  getActorFromSession,
  httpError,
} from "../lib/request-helpers";
import { requireTenantSession } from "../middleware/session";

export const courseQuizzesRouter = Router();

/** GET /api/course-quizzes */
courseQuizzesRouter.get(
  "/",
  requireTenantSession,
  async (request, response) => {
    const { courseId } = request.query as Record<string, string>;
    if (courseId) {
      return response.json(await courseQuizRepository.list({ courseId }));
    }
    response.json([]);
  },
);

/** POST /api/course-quizzes */
courseQuizzesRouter.post(
  "/",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    assertAdminAccess(actor);
    const tenantId = request.session.activeTenantId!;
    const { quizData } = request.body;

    const course = await courseRepository.getById(quizData.courseId);
    if (!course || course.tenantId !== tenantId) {
      throw httpError(403, "Course does not belong to the current tenant.");
    }

    const created = await courseQuizRepository.create(quizData);
    if (!created) throw httpError(500, "Failed to create course quiz.");

    await courseRepository.update(quizData.courseId, {
      totalQuizzes: (course.totalQuizzes ?? 0) + 1,
    });

    response.status(201).json({ id: created.id });
  },
);

/** POST /api/course-quizzes/reorder */
courseQuizzesRouter.post(
  "/reorder",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    assertAdminAccess(actor);
    const { reorderData } = request.body;
    await Promise.all(
      reorderData.map(
        ({ itemId, newOrder }: { itemId: string; newOrder: number }) =>
          courseQuizRepository.update(itemId, { order: newOrder }),
      ),
    );
    response.json({ success: true });
  },
);

/** GET /api/course-quizzes/:quizId */
courseQuizzesRouter.get(
  "/:quizId",
  requireTenantSession,
  async (request, response) => {
    const quiz = await courseQuizRepository.getById(
      request.params.quizId as string,
    );
    if (!quiz) return response.json(null);
    const tenantId = request.session.activeTenantId!;
    const course = await courseRepository.getById(quiz.courseId);
    if (!course || course.tenantId !== tenantId) return response.json(null);
    response.json(quiz);
  },
);

/** PATCH /api/course-quizzes/:quizId */
courseQuizzesRouter.patch(
  "/:quizId",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    assertAdminAccess(actor);
    const tenantId = request.session.activeTenantId!;

    const quiz = await courseQuizRepository.getById(
      request.params.quizId as string,
    );
    if (!quiz) throw httpError(404, "Course quiz not found.");
    const course = await courseRepository.getById(quiz.courseId);
    if (!course || course.tenantId !== tenantId) {
      throw httpError(403, "Access denied.");
    }

    const updated = await courseQuizRepository.update(
      request.params.quizId as string,
      request.body.quizData ?? request.body,
    );
    if (!updated) throw httpError(500, "Failed to update course quiz.");
    response.json({ id: updated.id });
  },
);

/** DELETE /api/course-quizzes/:quizId */
courseQuizzesRouter.delete(
  "/:quizId",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    assertAdminAccess(actor);
    const tenantId = request.session.activeTenantId!;

    const quiz = await courseQuizRepository.getById(
      request.params.quizId as string,
    );
    if (!quiz) throw httpError(404, "Course quiz not found.");
    const course = await courseRepository.getById(quiz.courseId);
    if (!course || course.tenantId !== tenantId) {
      throw httpError(403, "Access denied.");
    }

    await courseQuizRepository.delete(request.params.quizId as string);
    await courseRepository.update(quiz.courseId, {
      totalQuizzes: Math.max(0, (course.totalQuizzes ?? 0) - 1),
    });
    response.json({ success: true });
  },
);
