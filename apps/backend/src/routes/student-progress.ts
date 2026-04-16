import { Router } from "express";

import { courseRepository } from "../repositories/course-repository.js";
import { studentProgressRepository } from "../repositories/student-progress-repository.js";
import { userRepository } from "../repositories/user-repository.js";
import {
  assertAdminAccess,
  getActorFromSession,
  httpError,
} from "../lib/request-helpers.js";
import { requireTenantSession } from "../middleware/session.js";

export const studentProgressRouter = Router();

/** GET /api/student-progress */
studentProgressRouter.get(
  "/",
  requireTenantSession,
  async (request, response) => {
    const { studentId, courseId } = request.query as Record<string, string>;
    const actor = await getActorFromSession(request);
    if (!actor) throw httpError(401, "Unauthorized");

    if (studentId && courseId) {
      const tenantId = request.session.activeTenantId!;
      const progress = await studentProgressRepository.getByStudentAndCourse({
        courseId,
        studentId,
        tenantId,
      });
      return response.json(progress ?? null);
    }

    if (courseId) {
      assertAdminAccess(
        actor,
        "Only admins can list all students in a course.",
      );
      return response.json(
        await studentProgressRepository.listByCourse(courseId),
      );
    }

    response.json(null);
  },
);

/** GET /api/student-progress/student/:studentId */
studentProgressRouter.get(
  "/student/:studentId",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    if (!actor) throw httpError(401, "Unauthorized");

    const targetId =
      (request.params.studentId as string) === "me" ? actor.id : (request.params.studentId as string);

    if (
      actor.id !== targetId &&
      actor.role !== "admin" &&
      actor.role !== "super-admin"
    ) {
      throw httpError(403, "Access denied.");
    }

    const tenantId = request.session.activeTenantId!;
    response.json(
      await studentProgressRepository.listByStudent(targetId, tenantId),
    );
  },
);

/** POST /api/student-progress */
studentProgressRouter.post(
  "/",
  requireTenantSession,
  async (request, response) => {
    const { progressData } = request.body;
    const created = await studentProgressRepository.create(progressData);
    if (!created) throw httpError(500, "Failed to create student progress.");
    response.status(201).json({ id: created.id });
  },
);

/** PATCH /api/student-progress/:progressId */
studentProgressRouter.patch(
  "/:progressId",
  requireTenantSession,
  async (request, response) => {
    const updated = await studentProgressRepository.update(
      (request.params.progressId as string),
      request.body,
    );
    if (!updated) throw httpError(500, "Failed to update student progress.");
    response.json({ id: updated.id });
  },
);

/** POST /api/student-progress/upsert */
studentProgressRouter.post(
  "/upsert",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    if (!actor) throw httpError(401, "Unauthorized");

    const { calculatedProgress, tenantId } = request.body;
    const { courseId, studentId } = calculatedProgress;

    const existing = await studentProgressRepository.getByStudentAndCourse({
      courseId,
      studentId,
      tenantId,
    });

    let updatedId: string;

    if (existing) {
      const updated = await studentProgressRepository.update(existing.id, {
        ...calculatedProgress,
        lastAccessedAt: Date.now(),
      });
      if (!updated) throw httpError(500, "Failed to update progress.");
      updatedId = existing.id;
    } else {
      const created = await studentProgressRepository.create({
        ...calculatedProgress,
        enrolledAt: Date.now(),
        lastAccessedAt: Date.now(),
        tenantId,
      });
      if (!created) throw httpError(500, "Failed to create progress.");
      updatedId = created.id;
    }

    // Keep user.completedCourses in sync
    if (calculatedProgress.isCompleted) {
      const user = await userRepository.getById(studentId);
      if (user && !user.completedCourses?.includes(courseId)) {
        await userRepository.update(studentId, {
          completedCourses: [...(user.completedCourses ?? []), courseId],
        });
        await courseRepository.incrementCompletionCount(courseId, 1);
      }
    }

    response.json({ id: updatedId });
  },
);
