import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { courseRepository } from "@/server/repositories/course-repository";
import { courseLessonRepository } from "@/server/repositories/course-lesson-repository";
import { courseSectionRepository } from "@/server/repositories/course-section-repository";
import { userRepository } from "@/server/repositories/user-repository";

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

export const createSectionFn = createServerFn({ method: "POST" })
  .inputValidator(createSectionInputSchema)
  .handler(async ({ data }) => {
    const actor = await userRepository.getById(data.userId);
    const createdSection = await courseSectionRepository.create({
      ...data.data,
      createdBy: data.userId,
      createdByMeta: actor
        ? {
            name: actor.displayName,
            photoUrl: actor.photoURL,
          }
        : null,
      updatedBy: data.userId,
      updatedByMeta: actor
        ? {
            name: actor.displayName,
            photoUrl: actor.photoURL,
          }
        : null,
    });

    if (!createdSection) {
      throw new Error("Failed to create course section.");
    }

    await syncCourseSectionIds(data.data.courseId);
    await courseRepository.update(data.data.courseId, {
      lastModifiedBy: data.userId,
    });

    return createdSection.id;
  });

export const deleteSectionFn = createServerFn({ method: "POST" })
  .inputValidator(sectionIdInputSchema)
  .handler(async ({ data }) => {
    const section = await courseSectionRepository.getById(data);

    if (!section) {
      throw new Error("Section not found.");
    }

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
    return courseSectionRepository.getById(data);
  });

export const listSectionsFn = createServerFn({ method: "GET" })
  .inputValidator((courseId: string) => courseId)
  .handler(async ({ data }) => {
    return courseSectionRepository.listByCourse(data);
  });

export const reorderSectionsFn = createServerFn({ method: "POST" })
  .inputValidator(reorderSectionsInputSchema)
  .handler(async ({ data }) => {
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
    const section = await courseSectionRepository.getById(data.sectionId);

    if (!section) {
      throw new Error("Section not found.");
    }

    const actor = await userRepository.getById(data.sectionData.userId);
    const updatedSection = await courseSectionRepository.update(
      data.sectionId,
      {
        ...data.sectionData.updates,
        updatedBy: data.sectionData.userId,
        updatedByMeta: actor
          ? {
              name: actor.displayName,
              photoUrl: actor.photoURL,
            }
          : section.updatedByMeta,
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
    const createdLesson = await courseLessonRepository.create(data.lessonData);

    if (!createdLesson) {
      throw new Error("Failed to create lesson.");
    }

    const course = await courseRepository.getById(data.lessonData.courseId);

    if (course) {
      await courseRepository.update(data.lessonData.courseId, {
        lastModifiedBy: data.userId,
        totalLessons: (course.totalLessons || 0) + 1,
      });
    }

    return createdLesson.id;
  });

export const deleteLessonFn = createServerFn({ method: "POST" })
  .inputValidator(sectionIdInputSchema)
  .handler(async ({ data }) => {
    const lesson = await courseLessonRepository.getById(data);

    if (!lesson) {
      throw new Error("Lesson not found.");
    }

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
    return courseLessonRepository.getById(data);
  });

export const listLessonsFn = createServerFn({ method: "GET" })
  .inputValidator((sectionId: string) => sectionId)
  .handler(async ({ data }) => {
    return courseLessonRepository.listBySection(data);
  });

export const listLessonsByCourseFn = createServerFn({ method: "GET" })
  .inputValidator((courseId: string) => courseId)
  .handler(async ({ data }) => {
    return courseLessonRepository.listByCourse(data);
  });

export const reorderLessonsFn = createServerFn({ method: "POST" })
  .inputValidator(reorderLessonsInputSchema)
  .handler(async ({ data }) => {
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
    const updatedLesson = await courseLessonRepository.update(
      data.lessonId,
      data.lessonData,
    );

    if (!updatedLesson) {
      throw new Error("Failed to update lesson.");
    }

    return updatedLesson.id;
  });
