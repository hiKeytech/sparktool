import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { courseRepository } from "@/server/repositories/course-repository";
import { courseLessonRepository } from "@/server/repositories/course-lesson-repository";
import { courseSectionRepository } from "@/server/repositories/course-section-repository";
import {
  assertTenantAdminAccess,
  requireTenantScopedActorWithTenant,
  resolveTenantFromCurrentRequest,
} from "@/server/tenant-context";

const createSectionInputSchema = z.object({
  data: z.object({
    courseId: z.string().min(1),
    description: z.string().nullish(),
    estimatedDurationInMinutes: z.number(),
    isPublished: z.boolean(),
    order: z.number().nullish(),
    title: z.string().nullish(),
  }),
  userId: z.string().min(1),
});

const sectionIdInputSchema = z.string().min(1);

const reorderSectionsInputSchema = z.object({
  courseId: z.string().min(1),
  reorderData: z.array(
    z.object({
      itemId: z.string().min(1),
      newOrder: z.number(),
      type: z.string().optional(),
    }),
  ),
});

const updateSectionInputSchema = z.object({
  sectionData: z.object({
    updates: z.record(z.string(), z.any()),
    userId: z.string().min(1),
  }),
  sectionId: z.string().min(1),
});

const createLessonInputSchema = z.object({
  lessonData: z.object({
    content: z.record(z.string(), z.any()),
    courseId: z.string().min(1),
    description: z.string().optional(),
    estimatedDuration: z.number(),
    isPublished: z.boolean(),
    isRequired: z.boolean(),
    order: z.number(),
    resources: z.array(z.any()),
    sectionId: z.string().min(1),
    title: z.string().min(1),
    type: z.enum(["assignment", "live-session", "reading", "video"]),
  }),
  userId: z.string().min(1).optional(),
});

const updateLessonInputSchema = z.object({
  lessonData: z.record(z.string(), z.any()),
  lessonId: z.string().min(1),
});

const reorderLessonsInputSchema = z.object({
  reorderData: z.array(
    z.object({
      itemId: z.string().min(1),
      newOrder: z.number(),
    }),
  ),
  sectionId: z.string().min(1),
});

async function syncCourseSectionIds(courseId: string) {
  const sections = await courseSectionRepository.listByCourse(courseId);
  await courseRepository.update(courseId, {
    sections: sections.map((section) => section.id),
  });
}

async function getCourseForTenant(courseId: string, tenantId: string) {
  const course = await courseRepository.getById(courseId);

  if (!course || course.tenantId !== tenantId) {
    throw new Error("Course does not belong to the current tenant.");
  }

  return course;
}

export const createSectionFn = createServerFn({ method: "POST" })
  .inputValidator(createSectionInputSchema)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();

    assertTenantAdminAccess(actor);
    await getCourseForTenant(data.data.courseId, tenantId!);

    const createdSection = await courseSectionRepository.create({
      ...data.data,
      createdBy: actor.id,
      createdByMeta: {
        name: actor.displayName,
        photoUrl: actor.photoURL,
      },
      updatedBy: actor.id,
      updatedByMeta: {
        name: actor.displayName,
        photoUrl: actor.photoURL,
      },
    });

    if (!createdSection) {
      throw new Error("Failed to create course section.");
    }

    await syncCourseSectionIds(data.data.courseId);
    await courseRepository.update(data.data.courseId, {
      lastModifiedBy: actor.id,
    });

    return createdSection.id;
  });

export const deleteSectionFn = createServerFn({ method: "POST" })
  .inputValidator(sectionIdInputSchema)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();
    const section = await courseSectionRepository.getById(data);

    assertTenantAdminAccess(actor);

    if (!section) {
      throw new Error("Section not found.");
    }

    await getCourseForTenant(section.courseId, tenantId!);

    const lessons = await courseLessonRepository.listBySection(section.id);

    await Promise.all([
      courseLessonRepository.deleteBySectionId(section.id),
      courseSectionRepository.delete(section.id),
    ]);

    await syncCourseSectionIds(section.courseId);

    const course = await courseRepository.getById(section.courseId);

    if (course) {
      await courseRepository.update(section.courseId, {
        totalLessons: Math.max(0, (course.totalLessons || 0) - lessons.length),
      });
    }

    return { success: true };
  });

export const getSectionFn = createServerFn({ method: "GET" })
  .inputValidator((sectionId: string) => sectionId)
  .handler(async ({ data }) => {
    const [tenant, section] = await Promise.all([
      resolveTenantFromCurrentRequest(),
      courseSectionRepository.getById(data),
    ]);

    if (!section) {
      return null;
    }

    if (!tenant) {
      return section;
    }

    const course = await courseRepository.getById(section.courseId);

    if (!course || course.tenantId !== tenant.id) {
      return null;
    }

    return section;
  });

export const listSectionsFn = createServerFn({ method: "GET" })
  .inputValidator((courseId: string) => courseId)
  .handler(async ({ data }) => {
    const tenant = await resolveTenantFromCurrentRequest();

    if (tenant) {
      await getCourseForTenant(data, tenant.id);
    }

    return courseSectionRepository.listByCourse(data);
  });

export const reorderSectionsFn = createServerFn({ method: "POST" })
  .inputValidator(reorderSectionsInputSchema)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();

    assertTenantAdminAccess(actor);
    await getCourseForTenant(data.courseId, tenantId!);

    await Promise.all(
      data.reorderData.map(({ itemId, newOrder }) =>
        courseSectionRepository.update(itemId, { order: newOrder }),
      ),
    );

    await syncCourseSectionIds(data.courseId);

    return { success: true };
  });

export const updateSectionFn = createServerFn({ method: "POST" })
  .inputValidator(updateSectionInputSchema)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();
    const section = await courseSectionRepository.getById(data.sectionId);

    assertTenantAdminAccess(actor);

    if (!section) {
      throw new Error("Section not found.");
    }

    await getCourseForTenant(section.courseId, tenantId!);

    const updatedSection = await courseSectionRepository.update(
      data.sectionId,
      {
        ...data.sectionData.updates,
        updatedBy: actor.id,
        updatedByMeta: {
          name: actor.displayName,
          photoUrl: actor.photoURL,
        },
      },
    );

    if (!updatedSection) {
      throw new Error("Failed to update section.");
    }

    return updatedSection.id;
  });

export const createLessonFn = createServerFn({ method: "POST" })
  .inputValidator(createLessonInputSchema)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();

    assertTenantAdminAccess(actor);
    await getCourseForTenant(data.lessonData.courseId, tenantId!);

    const createdLesson = await courseLessonRepository.create(data.lessonData);

    if (!createdLesson) {
      throw new Error("Failed to create lesson.");
    }

    const course = await courseRepository.getById(data.lessonData.courseId);

    if (course) {
      await courseRepository.update(data.lessonData.courseId, {
        lastModifiedBy: actor.id,
        totalLessons: (course.totalLessons || 0) + 1,
      });
    }

    return createdLesson.id;
  });

export const deleteLessonFn = createServerFn({ method: "POST" })
  .inputValidator(sectionIdInputSchema)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();
    const lesson = await courseLessonRepository.getById(data);

    assertTenantAdminAccess(actor);

    if (!lesson) {
      throw new Error("Lesson not found.");
    }

    await getCourseForTenant(lesson.courseId, tenantId!);

    await courseLessonRepository.delete(lesson.id);

    const course = await courseRepository.getById(lesson.courseId);

    if (course) {
      await courseRepository.update(lesson.courseId, {
        totalLessons: Math.max(0, (course.totalLessons || 0) - 1),
      });
    }

    return { success: true };
  });

export const getLessonFn = createServerFn({ method: "GET" })
  .inputValidator((lessonId: string) => lessonId)
  .handler(async ({ data }) => {
    const [tenant, lesson] = await Promise.all([
      resolveTenantFromCurrentRequest(),
      courseLessonRepository.getById(data),
    ]);

    if (!lesson) {
      return null;
    }

    if (!tenant) {
      return lesson;
    }

    const course = await courseRepository.getById(lesson.courseId);

    if (!course || course.tenantId !== tenant.id) {
      return null;
    }

    return lesson;
  });

export const listLessonsFn = createServerFn({ method: "GET" })
  .inputValidator((sectionId: string) => sectionId)
  .handler(async ({ data }) => {
    const [tenant, section] = await Promise.all([
      resolveTenantFromCurrentRequest(),
      courseSectionRepository.getById(data),
    ]);

    if (!section) {
      return [];
    }

    if (tenant) {
      await getCourseForTenant(section.courseId, tenant.id);
    }

    return courseLessonRepository.listBySection(data);
  });

export const listLessonsByCourseFn = createServerFn({ method: "GET" })
  .inputValidator((courseId: string) => courseId)
  .handler(async ({ data }) => {
    const tenant = await resolveTenantFromCurrentRequest();

    if (tenant) {
      await getCourseForTenant(data, tenant.id);
    }

    return courseLessonRepository.listByCourse(data);
  });

export const reorderLessonsFn = createServerFn({ method: "POST" })
  .inputValidator(reorderLessonsInputSchema)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();
    const section = await courseSectionRepository.getById(data.sectionId);

    assertTenantAdminAccess(actor);

    if (!section) {
      throw new Error("Section not found.");
    }

    await getCourseForTenant(section.courseId, tenantId!);

    await Promise.all(
      data.reorderData.map(({ itemId, newOrder }) =>
        courseLessonRepository.update(itemId, { order: newOrder }),
      ),
    );

    return { success: true };
  });

export const updateLessonFn = createServerFn({ method: "POST" })
  .inputValidator(updateLessonInputSchema)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();
    const lesson = await courseLessonRepository.getById(data.lessonId);

    assertTenantAdminAccess(actor);

    if (!lesson) {
      throw new Error("Lesson not found.");
    }

    await getCourseForTenant(lesson.courseId, tenantId!);

    const updatedLesson = await courseLessonRepository.update(
      data.lessonId,
      data.lessonData,
    );

    if (!updatedLesson) {
      throw new Error("Failed to update lesson.");
    }

    return updatedLesson.id;
  });
