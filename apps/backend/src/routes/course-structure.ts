import { Router } from "express";
import { TenantService } from "../services/tenant-service.js";

import { courseLessonRepository } from "../repositories/course-lesson-repository.js";
import { courseRepository } from "../repositories/course-repository.js";
import { courseSectionRepository } from "../repositories/course-section-repository.js";
import {
  assertAdminAccess,
  getActorFromSession,
  httpError,
} from "../lib/request-helpers.js";
import { requireTenantSession } from "../middleware/session.js";

export const sectionsRouter = Router({ mergeParams: true });
export const lessonsRouter = Router({ mergeParams: true });

// ─── helpers ─────────────────────────────────────────────────────────────────

async function getCourseForTenant(courseId: string, tenantId: string) {
  const course = await courseRepository.getById(courseId);
  if (!course || course.tenantId !== tenantId) {
    throw httpError(403, "Course does not belong to the current tenant.");
  }
  return course;
}

async function syncCourseSectionIds(courseId: string) {
  const sections = await courseSectionRepository.listByCourse(courseId);
  await courseRepository.update(courseId, {
    sections: sections.map((s) => s.id),
  });
}

// ─── sections ────────────────────────────────────────────────────────────────

/** GET /api/courses/:courseId/sections */
sectionsRouter.get("/", async (request, response) => {
  const tenant = await TenantService.getTenantByHost(request.hostname);
  if (tenant) await getCourseForTenant(request.params.courseId, tenant.id);
  response.json(
    await courseSectionRepository.listByCourse(request.params.courseId),
  );
});

/** POST /api/courses/:courseId/sections */
sectionsRouter.post("/", requireTenantSession, async (request, response) => {
  const actor = await getActorFromSession(request);
  assertAdminAccess(actor);
  await getCourseForTenant(
    request.params.courseId,
    request.session.activeTenantId!,
  );

  const { data } = request.body;
  const created = await courseSectionRepository.create({
    ...data,
    createdBy: actor.id,
    createdByMeta: { name: actor.displayName, photoUrl: actor.photoURL },
    updatedBy: actor.id,
    updatedByMeta: { name: actor.displayName, photoUrl: actor.photoURL },
  });
  if (!created) throw httpError(500, "Failed to create section.");

  await syncCourseSectionIds(request.params.courseId);
  await courseRepository.update(request.params.courseId, {
    lastModifiedBy: actor.id,
  });

  response.status(201).json({ id: created.id });
});

/** POST /api/courses/:courseId/sections/reorder */
sectionsRouter.post(
  "/reorder",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    assertAdminAccess(actor);
    await getCourseForTenant(
      request.params.courseId,
      request.session.activeTenantId!,
    );

    const { reorderData } = request.body;
    await Promise.all(
      reorderData.map(
        ({ itemId, newOrder }: { itemId: string; newOrder: number }) =>
          courseSectionRepository.update(itemId, { order: newOrder }),
      ),
    );
    await syncCourseSectionIds(request.params.courseId);
    response.json({ success: true });
  },
);

/** GET /api/sections/:sectionId */
export const sectionByIdRouter = Router();

sectionByIdRouter.get("/:sectionId", async (request, response) => {
  const [tenant, section] = await Promise.all([
    TenantService.getTenantByHost(request.hostname),
    courseSectionRepository.getById(request.params.sectionId),
  ]);
  if (!section) return response.json(null);
  if (tenant) {
    const course = await courseRepository.getById(section.courseId);
    if (!course || course.tenantId !== tenant.id) return response.json(null);
  }
  response.json(section);
});

/** PATCH /api/sections/:sectionId */
sectionByIdRouter.patch(
  "/:sectionId",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    assertAdminAccess(actor);

    const section = await courseSectionRepository.getById(
      request.params.sectionId,
    );
    if (!section) throw httpError(404, "Section not found.");
    await getCourseForTenant(section.courseId, request.session.activeTenantId!);

    const { sectionData } = request.body;
    const updated = await courseSectionRepository.update(
      request.params.sectionId,
      {
        ...(sectionData.updates ?? sectionData),
        updatedBy: actor.id,
        updatedByMeta: { name: actor.displayName, photoUrl: actor.photoURL },
      },
    );
    if (!updated) throw httpError(500, "Failed to update section.");
    response.json({ id: updated.id });
  },
);

/** DELETE /api/sections/:sectionId */
sectionByIdRouter.delete(
  "/:sectionId",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    assertAdminAccess(actor);

    const section = await courseSectionRepository.getById(
      request.params.sectionId,
    );
    if (!section) throw httpError(404, "Section not found.");
    await getCourseForTenant(section.courseId, request.session.activeTenantId!);

    const lessons = await courseLessonRepository.listBySection(section.id);
    await Promise.all([
      courseLessonRepository.deleteBySectionId(section.id),
      courseSectionRepository.delete(section.id),
    ]);
    await syncCourseSectionIds(section.courseId);

    const course = await courseRepository.getById(section.courseId);
    if (course) {
      await courseRepository.update(section.courseId, {
        totalLessons: Math.max(0, (course.totalLessons ?? 0) - lessons.length),
      });
    }

    response.json({ success: true });
  },
);

// ─── lessons inside a section ────────────────────────────────────────────────

/** GET /api/sections/:sectionId/lessons */
lessonsRouter.get("/", async (request, response) => {
  const [tenant, section] = await Promise.all([
    TenantService.getTenantByHost(request.hostname),
    courseSectionRepository.getById(request.params.sectionId),
  ]);
  if (!section) return response.json([]);
  if (tenant) await getCourseForTenant(section.courseId, tenant.id);
  response.json(
    await courseLessonRepository.listBySection(request.params.sectionId),
  );
});

/** POST /api/sections/:sectionId/lessons */
lessonsRouter.post("/", requireTenantSession, async (request, response) => {
  const actor = await getActorFromSession(request);
  assertAdminAccess(actor);

  const { lessonData } = request.body;
  await getCourseForTenant(
    lessonData.courseId,
    request.session.activeTenantId!,
  );

  const created = await courseLessonRepository.create(lessonData);
  if (!created) throw httpError(500, "Failed to create lesson.");

  const course = await courseRepository.getById(lessonData.courseId);
  if (course) {
    await courseRepository.update(lessonData.courseId, {
      lastModifiedBy: actor.id,
      totalLessons: (course.totalLessons ?? 0) + 1,
    });
  }

  response.status(201).json({ id: created.id });
});

/** POST /api/sections/:sectionId/lessons/reorder */
lessonsRouter.post(
  "/reorder",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    assertAdminAccess(actor);

    const section = await courseSectionRepository.getById(
      request.params.sectionId,
    );
    if (!section) throw httpError(404, "Section not found.");
    await getCourseForTenant(section.courseId, request.session.activeTenantId!);

    const { reorderData } = request.body;
    await Promise.all(
      reorderData.map(
        ({ itemId, newOrder }: { itemId: string; newOrder: number }) =>
          courseLessonRepository.update(itemId, { order: newOrder }),
      ),
    );
    response.json({ success: true });
  },
);

// ─── lesson by ID ─────────────────────────────────────────────────────────────

export const lessonByIdRouter = Router();

/** GET /api/lessons/:lessonId */
lessonByIdRouter.get("/:lessonId", async (request, response) => {
  const [tenant, lesson] = await Promise.all([
    TenantService.getTenantByHost(request.hostname),
    courseLessonRepository.getById(request.params.lessonId),
  ]);
  if (!lesson) return response.json(null);
  if (tenant) {
    const course = await courseRepository.getById(lesson.courseId);
    if (!course || course.tenantId !== tenant.id) return response.json(null);
  }
  response.json(lesson);
});

/** PATCH /api/lessons/:lessonId */
lessonByIdRouter.patch(
  "/:lessonId",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    assertAdminAccess(actor);

    const lesson = await courseLessonRepository.getById(
      request.params.lessonId,
    );
    if (!lesson) throw httpError(404, "Lesson not found.");
    await getCourseForTenant(lesson.courseId, request.session.activeTenantId!);

    const updated = await courseLessonRepository.update(
      request.params.lessonId,
      request.body.lessonData ?? request.body,
    );
    if (!updated) throw httpError(500, "Failed to update lesson.");
    response.json({ id: updated.id });
  },
);

/** DELETE /api/lessons/:lessonId */
lessonByIdRouter.delete(
  "/:lessonId",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    assertAdminAccess(actor);

    const lesson = await courseLessonRepository.getById(
      request.params.lessonId,
    );
    if (!lesson) throw httpError(404, "Lesson not found.");
    await getCourseForTenant(lesson.courseId, request.session.activeTenantId!);

    await courseLessonRepository.delete(lesson.id);

    const course = await courseRepository.getById(lesson.courseId);
    if (course) {
      await courseRepository.update(lesson.courseId, {
        totalLessons: Math.max(0, (course.totalLessons ?? 0) - 1),
      });
    }

    response.json({ success: true });
  },
);

/** GET /api/courses/:courseId/lessons (all lessons for a course) */
export const courseLessonsRouter = Router({ mergeParams: true });

courseLessonsRouter.get("/", async (request, response) => {
  const tenant = await TenantService.getTenantByHost(request.hostname);
  if (tenant) await getCourseForTenant(request.params.courseId, tenant.id);
  response.json(
    await courseLessonRepository.listByCourse(request.params.courseId),
  );
});
