import { Router } from "express";

import { activityLogRepository } from "../repositories/activity-log-repository";
import { courseLessonRepository } from "../repositories/course-lesson-repository";
import { lessonProgressRepository } from "../repositories/lesson-progress-repository";
import { getActorFromSession, httpError } from "../lib/request-helpers";
import { requireTenantSession } from "../middleware/session";
import {
  updateCourseProgress,
  syncStudentSectionProgress,
} from "../lib/course-progress";

export const lessonProgressRouter = Router();

/** GET /api/lesson-progress */
lessonProgressRouter.get(
  "/",
  requireTenantSession,
  async (request, response) => {
    const { studentId, lessonId } = request.query as Record<string, string>;
    const actor = await getActorFromSession(request);
    if (!actor) throw httpError(401, "Unauthorized");

    if (studentId && lessonId) {
      const progress = await lessonProgressRepository.getByStudentAndLesson({
        studentId,
        lessonId,
      });
      return response.json(progress ?? null);
    }
    response.json(null);
  },
);

/** GET /api/lesson-progress/student/:studentId */
lessonProgressRouter.get(
  "/student/:studentId",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    if (!actor) throw httpError(401, "Unauthorized");

    const targetId =
      (request.params.studentId as string) === "me"
        ? actor.id
        : (request.params.studentId as string);

    if (
      actor.id !== targetId &&
      actor.role !== "admin" &&
      actor.role !== "super-admin"
    ) {
      throw httpError(403, "Access denied.");
    }

    const { courseId } = request.query as Record<string, string>;
    if (courseId) {
      return response.json(
        await lessonProgressRepository.listByStudentAndCourse({
          studentId: targetId,
          courseId,
        }),
      );
    }
    response.json(await lessonProgressRepository.listByStudent(targetId));
  },
);

/** POST /api/lesson-progress */
lessonProgressRouter.post(
  "/",
  requireTenantSession,
  async (request, response) => {
    const { progressData } = request.body;
    const created = await lessonProgressRepository.create(progressData);
    if (!created) throw httpError(500, "Failed to create lesson progress.");
    response.status(201).json({ id: created.id });
  },
);

/** PATCH /api/lesson-progress/:progressId */
lessonProgressRouter.patch(
  "/:progressId",
  requireTenantSession,
  async (request, response) => {
    const updated = await lessonProgressRepository.update(
      request.params.progressId as string,
      request.body,
    );
    if (!updated) throw httpError(500, "Failed to update lesson progress.");
    response.json({ id: updated.id });
  },
);

/** POST /api/lesson-progress/mark-complete */
lessonProgressRouter.post(
  "/mark-complete",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    if (!actor) throw httpError(401, "Unauthorized");

    const { courseId, lessonId, sectionId, studentId, timeSpent } =
      request.body;
    const tenantId = request.session.activeTenantId!;

    const lesson = await courseLessonRepository.getById(lessonId);
    if (!lesson) throw httpError(404, "Lesson not found.");

    const existing = await lessonProgressRepository.getByStudentAndLesson({
      lessonId,
      studentId,
    });

    let progressId: string;

    if (existing) {
      const updated = await lessonProgressRepository.update(existing.id, {
        completedAt: existing.completedAt ?? Date.now(),
        isCompleted: true,
        lastWatchedAt: Date.now(),
        timeSpent: (existing.timeSpent ?? 0) + (timeSpent ?? 0),
      });
      if (!updated) throw httpError(500, "Failed to update lesson progress.");
      progressId = existing.id;
    } else {
      const created = await lessonProgressRepository.create({
        completedAt: Date.now(),
        courseId,
        currentPosition: 0,
        isCompleted: true,
        lastAccessedAt: Date.now(),
        lastWatchedAt: Date.now(),
        lessonId,
        resourcesViewed: [],
        sectionId,
        studentId,
        tenantId,
        timeSpent: timeSpent ?? 0,
        totalDuration: 0,
        viewCount: 1,
        watchedDuration: 0,
        watchPercentage: 100,
      });
      if (!created) throw httpError(500, "Failed to create lesson progress.");
      progressId = created.id;
    }

    // Sync section + course progress
    await syncStudentSectionProgress({
      courseId,
      lessonId,
      sectionId,
      studentId,
      tenantId,
    });
    await updateCourseProgress({ courseId, studentId, tenantId });

    void activityLogRepository.create({
      action: "lesson_completed",
      courseId,
      lessonId,
      tenantId,
      userId: studentId,
    });

    response.json({ id: progressId });
  },
);
