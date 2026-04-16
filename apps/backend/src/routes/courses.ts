import { randomUUID } from "node:crypto";

import { Router } from "express";
import { TenantService } from "../services/tenant-service.js";

import { activityLogRepository } from "../repositories/activity-log-repository.js";
import { courseRepository } from "../repositories/course-repository.js";
import { studentProgressRepository } from "../repositories/student-progress-repository.js";
import { userRepository } from "../repositories/user-repository.js";
import {
  assertAdminAccess,
  getActorFromSession,
  httpError,
  userHasTenantAccess,
} from "../lib/request-helpers.js";
import { requireTenantSession } from "../middleware/session.js";

export const coursesRouter = Router();

/** GET /api/courses */
coursesRouter.get("/", async (request, response) => {
  const tenant = await TenantService.getTenantByHost(request.hostname);
  const tenantId =
    (tenant?.id ?? (request.query.tenantId as string | undefined)) || undefined;

  const filters: Record<string, unknown> = {};
  if (request.query.category) filters.category = request.query.category;
  if (request.query.difficulty) filters.difficulty = request.query.difficulty;
  if (request.query.published !== undefined)
    filters.published = request.query.published === "true";
  if (request.query.search) filters.search = request.query.search;

  response.json(await courseRepository.list(tenantId, filters));
});

/** GET /api/courses/:courseId */
coursesRouter.get("/:courseId", async (request, response) => {
  const [tenant, course] = await Promise.all([
    TenantService.getTenantByHost(request.hostname),
    courseRepository.getById(request.params.courseId as string),
  ]);

  if (!course) return response.json(null);
  if (tenant && course.tenantId !== tenant.id) return response.json(null);

  response.json(course);
});

/** POST /api/courses */
coursesRouter.post("/", requireTenantSession, async (request, response) => {
  const { courseData, tenantId: bodyTenantId } = request.body;
  const actor = await getActorFromSession(request);

  assertAdminAccess(actor);

  const tenantId = bodyTenantId ?? request.session.activeTenantId;
  if (!tenantId) throw httpError(400, "Tenant context is required.");

  const courseId = randomUUID();
  const publishedAt = courseData.published ? Date.now() : null;
  const course = await courseRepository.create({
    averageRating: 0,
    category: courseData.category,
    certificateTemplateId: null,
    completionCount: 0,
    completionRate: 0,
    createdAt: Date.now(),
    createdBy: actor.id,
    createdByMeta: { name: actor.displayName, photoUrl: actor.photoURL },
    description: courseData.description,
    difficulty: courseData.difficulty,
    enrollmentCount: 0,
    estimatedDurationInMinutes: 0,
    featured: courseData.featured ?? false,
    hasCertificate: false,
    id: courseId,
    instructors: courseData.instructors,
    language: courseData.language,
    lastModifiedBy: actor.id,
    learningObjectives: courseData.learningObjectives,
    level: courseData.level,
    prerequisites: courseData.prerequisites,
    previewVideoUrl: courseData.previewVideoUrl,
    price: courseData.price,
    published: courseData.published,
    publishedAt,
    sections: [],
    shortDescription: courseData.shortDescription,
    tags: courseData.tags,
    tenantId,
    thumbnailUrl: courseData.thumbnailUrl,
    title: courseData.title,
    totalLessons: 0,
    totalQuizzes: 0,
    totalRatings: 0,
    updatedAt: Date.now(),
  });

  if (!course) throw httpError(500, "Failed to create course.");

  response.status(201).json({ id: course.id });
});

/** PATCH /api/courses/:courseId */
coursesRouter.patch(
  "/:courseId",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    assertAdminAccess(actor);

    const tenantId = request.session.activeTenantId!;
    const existing = await courseRepository.getById(
      request.params.courseId as string,
    );
    if (!existing) throw httpError(404, "Course not found.");
    if (existing.tenantId !== tenantId) {
      throw httpError(403, "Course does not belong to the current tenant.");
    }

    const { courseData } = request.body;
    const publishedAt =
      courseData.published === true && !existing.publishedAt
        ? Date.now()
        : courseData.published === false
          ? null
          : existing.publishedAt;

    const updated = await courseRepository.update(
      request.params.courseId as string,
      {
        ...courseData,
        lastModifiedBy: actor.id,
        publishedAt,
      },
    );
    if (!updated) throw httpError(500, "Failed to update course.");

    response.json({ id: updated.id });
  },
);

/** DELETE /api/courses/:courseId */
coursesRouter.delete(
  "/:courseId",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    assertAdminAccess(actor);

    const tenantId = request.session.activeTenantId!;
    const course = await courseRepository.getById(
      request.params.courseId as string,
    );
    if (!course) throw httpError(404, "Course not found.");
    if (course.tenantId !== tenantId) {
      throw httpError(403, "Course does not belong to the current tenant.");
    }

    const progressRecords = await studentProgressRepository.listByCourse(
      request.params.courseId as string,
    );
    const affectedStudentIds = Array.from(
      new Set(progressRecords.map((p) => p.studentId)),
    );

    await Promise.all([
      studentProgressRepository.deleteByCourseId(
        request.params.courseId as string,
      ),
      courseRepository.delete(request.params.courseId as string),
      ...affectedStudentIds.map(async (studentId) => {
        const user = await userRepository.getById(studentId);
        if (!user) return;
        await userRepository.update(studentId, {
          completedCourses: (user.completedCourses ?? []).filter(
            (id) => id !== (request.params.courseId as string),
          ),
          enrolledCourses: (user.enrolledCourses ?? []).filter(
            (id) => id !== (request.params.courseId as string),
          ),
        });
      }),
    ]);

    response.json({ success: true });
  },
);

/** POST /api/courses/:courseId/enroll */
coursesRouter.post(
  "/:courseId/enroll",
  requireTenantSession,
  async (request, response) => {
    const { studentId } = request.body;
    const actor = await getActorFromSession(request);
    if (!actor) throw httpError(401, "Unauthorized");

    const tenantId = request.session.activeTenantId!;

    if (
      actor.role !== "super-admin" &&
      actor.role !== "admin" &&
      actor.id !== studentId
    ) {
      throw httpError(403, "You can only enroll yourself in a course.");
    }

    const existing = await studentProgressRepository.getByStudentAndCourse({
      courseId: request.params.courseId as string,
      studentId,
      tenantId,
    });
    if (existing) throw httpError(409, "Student is already enrolled.");

    const [course, user] = await Promise.all([
      courseRepository.getById(request.params.courseId as string),
      userRepository.getById(studentId),
    ]);

    if (!course) throw httpError(404, "Course not found.");
    if (course.tenantId !== tenantId) {
      throw httpError(403, "Course does not belong to the current tenant.");
    }
    if (!user) throw httpError(404, "Student account not found.");
    if (!userHasTenantAccess(user, tenantId)) {
      throw httpError(403, "Student does not belong to the current tenant.");
    }

    await studentProgressRepository.deleteByStudentAndCourse({
      courseId: request.params.courseId as string,
      studentId,
      tenantId,
    });

    await studentProgressRepository.create({
      averageQuizScore: 0,
      completionPercentage: 0,
      courseId: request.params.courseId as string,
      enrolledAt: Date.now(),
      estimatedTimeRemaining: 0,
      lastAccessedAt: Date.now(),
      quizzesPassed: 0,
      sectionProgress: [],
      status: "enrolled",
      studentId,
      tenantId,
      timeSpentMinutes: 0,
      totalLessonsCompleted: 0,
      totalOptionalLessonsCompleted: 0,
      totalQuizzesTaken: 0,
      totalRequiredLessons: 0,
    });

    await Promise.all([
      courseRepository.incrementEnrollment(
        request.params.courseId as string,
        1,
      ),
      userRepository.update(studentId, {
        enrolledCourses: Array.from(
          new Set([
            ...(user.enrolledCourses ?? []),
            request.params.courseId as string,
          ]),
        ),
      }),
      activityLogRepository.create({
        action: "course_enrolled",
        courseId: request.params.courseId as string,
        enrollmentMethod: "self_enrolled",
        tenantId,
        userId: studentId,
      }),
    ]);

    response.json({ success: true });
  },
);
