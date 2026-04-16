import { Router } from "express";

import { courseRepository } from "../repositories/course-repository.js";
import { quizRepository } from "../repositories/quiz-repository.js";
import {
  assertAdminAccess,
  getActorFromSession,
  httpError,
} from "../lib/request-helpers.js";
import { requireTenantSession } from "../middleware/session.js";

export const quizzesRouter = Router();

/** GET /api/quizzes */
quizzesRouter.get("/", requireTenantSession, async (request, response) => {
  const { courseId } = request.query as Record<string, string>;
  response.json(await quizRepository.list(courseId ?? undefined));
});

/** POST /api/quizzes */
quizzesRouter.post("/", requireTenantSession, async (request, response) => {
  const actor = await getActorFromSession(request);
  assertAdminAccess(actor);
  const tenantId = request.session.activeTenantId!;
  const { quizData } = request.body;

  if (quizData.courseId) {
    const course = await courseRepository.getById(quizData.courseId);
    if (!course || course.tenantId !== tenantId) {
      throw httpError(403, "Course does not belong to the current tenant.");
    }
  }

  const created = await quizRepository.create(quizData);
  if (!created) throw httpError(500, "Failed to create quiz.");
  response.status(201).json({ id: created.id });
});

/** GET /api/quizzes/:quizId */
quizzesRouter.get(
  "/:quizId",
  requireTenantSession,
  async (request, response) => {
    const quiz = await quizRepository.getById(request.params.quizId as string);
    if (!quiz) return response.json(null);
    response.json(quiz);
  },
);

/** PATCH /api/quizzes/:quizId */
quizzesRouter.patch(
  "/:quizId",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    assertAdminAccess(actor);

    const quiz = await quizRepository.getById(request.params.quizId as string);
    if (!quiz) throw httpError(404, "Quiz not found.");

    const updated = await quizRepository.update(
      request.params.quizId as string,
      request.body.quizData ?? request.body,
    );
    if (!updated) throw httpError(500, "Failed to update quiz.");
    response.json({ id: updated.id });
  },
);

/** DELETE /api/quizzes/:quizId */
quizzesRouter.delete(
  "/:quizId",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    assertAdminAccess(actor);

    const quiz = await quizRepository.getById(request.params.quizId as string);
    if (!quiz) throw httpError(404, "Quiz not found.");

    await quizRepository.softDelete(request.params.quizId as string);
    response.json({ success: true });
  },
);
