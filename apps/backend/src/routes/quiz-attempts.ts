import { Router } from "express";

import { activityLogRepository } from "../repositories/activity-log-repository.js";
import { courseRepository } from "../repositories/course-repository.js";
import { quizAttemptRepository } from "../repositories/quiz-attempt-repository.js";
import { quizRepository } from "../repositories/quiz-repository.js";
import { userRepository } from "../repositories/user-repository.js";
import { getActorFromSession, httpError } from "../lib/request-helpers.js";
import { requireSession, requireTenantSession } from "../middleware/session.js";

export const quizAttemptsRouter = Router();

/** GET /api/quiz-attempts */
quizAttemptsRouter.get("/", requireTenantSession, async (request, response) => {
  const { studentId, quizId, courseId } = request.query as Record<
    string,
    string
  >;
  const actor = await getActorFromSession(request);
  if (!actor) throw httpError(401, "Unauthorized");

  const tenantId = request.session.activeTenantId!;

  if (quizId) {
    return response.json(await quizAttemptRepository.list({ quizId }));
  }
  if (courseId) {
    return response.json(await quizAttemptRepository.list({ courseId }));
  }
  if (studentId) {
    const targetId = studentId === "me" ? actor.id : studentId;
    return response.json(
      await quizAttemptRepository.list({ studentId: targetId }),
    );
  }

  response.json([]);
});

/** POST /api/quiz-attempts */
quizAttemptsRouter.post(
  "/",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    if (!actor) throw httpError(401, "Unauthorized");

    const tenantId = request.session.activeTenantId!;
    const { attemptData } = request.body;
    const { quizId, studentId, courseId, answers } = attemptData;

    const quiz = await quizRepository.getById(quizId);
    if (!quiz) throw httpError(404, "Quiz not found.");

    // Grade the attempt
    const questions = quiz.questions ?? [];
    let correctAnswers = 0;
    for (const question of questions) {
      const submitted = answers?.[question.id];
      if (submitted !== undefined && submitted === question.correctAnswer) {
        correctAnswers++;
      }
    }
    const totalQuestions = questions.length;
    const score =
      totalQuestions > 0
        ? Math.round((correctAnswers / totalQuestions) * 100)
        : 0;
    const passed = score >= (quiz.passingScore ?? 70);

    const created = await quizAttemptRepository.create({
      answers: answers ?? {},
      completedAt: Date.now(),
      courseId,
      correctAnswers,
      passed,
      quizId,
      score,
      startedAt: Date.now(),
      studentId,
      tenantId,
      timeTaken: attemptData.timeTaken,
      totalQuestions,
    });
    if (!created) throw httpError(500, "Failed to record quiz attempt.");

    // Update user quiz metrics asynchronously
    void syncStudentQuizMetrics({
      courseId,
      passed,
      score,
      studentId,
      tenantId,
    });

    void activityLogRepository.create({
      action: "quiz_attempt",
      courseId,
      passed,
      quizId,
      score,
      tenantId,
      userId: studentId,
    });

    response.status(201).json({ id: created.id, passed, score });
  },
);

/** PATCH /api/quiz-attempts/:attemptId */
quizAttemptsRouter.patch(
  "/:attemptId",
  requireTenantSession,
  async (request, response) => {
    const attempt = await quizAttemptRepository.getById(
      request.params.attemptId,
    );
    if (!attempt) throw httpError(404, "Quiz attempt not found.");

    const updated = await quizAttemptRepository.update(
      request.params.attemptId,
      request.body,
    );
    if (!updated) throw httpError(500, "Failed to update quiz attempt.");
    response.json({ id: updated.id });
  },
);

// ─── helper ──────────────────────────────────────────────────────────────────

async function syncStudentQuizMetrics(input: {
  courseId: string;
  passed: boolean;
  score: number;
  studentId: string;
  tenantId: string;
}) {
  try {
    const user = await userRepository.getById(input.studentId);
    if (!user) return;

    const allAttempts = await quizAttemptRepository.list({
      studentId: input.studentId,
    });
    const courseAttempts = allAttempts.filter(
      (a) => a.courseId === input.courseId && a.passed,
    );
    const quizzesPassed = new Set(courseAttempts.map((a) => a.quizId)).size;

    const totalScore = allAttempts.reduce((sum, a) => sum + (a.score ?? 0), 0);
    const averageQuizScore =
      allAttempts.length > 0 ? Math.round(totalScore / allAttempts.length) : 0;

    await userRepository.update(input.studentId, {
      averageQuizScore,
      quizzesPassed,
    });
  } catch {
    // fire-and-forget — do not surface errors
  }
}
