import { l as listSectionsFn, a as listLessonsFn } from "./course-structure-D2f1-VM0.mjs";
import { o as object, s as string, n as number, a as array, b as boolean, _ as _enum } from "../_libs/zod.mjs";
const instructorSchema = object({
  biography: string().nullish(),
  email: string().email().nullish(),
  name: string().nullish(),
  title: string().nullish()
});
const courseSchema = object({
  averageRating: number().default(0),
  category: string().nullish(),
  completionCount: number().default(0),
  completionRate: number().default(0),
  createdAt: number().nullish(),
  createdBy: string().nullish(),
  createdByMeta: object({
    name: string(),
    photoUrl: string()
  }).nullish(),
  description: string().nullish(),
  difficulty: _enum(["advanced", "beginner", "intermediate"]).nullish(),
  enrollmentCount: number().default(0),
  estimatedDurationInMinutes: number().default(0),
  featured: boolean().default(false),
  hasCertificate: boolean().default(false),
  certificateTemplateId: string().nullish(),
  id: string().nullish(),
  instructors: array(instructorSchema).nullish(),
  language: string().nullish(),
  lastModifiedBy: string().nullish(),
  learningObjectives: array(string()).nullish(),
  level: _enum(["advanced", "beginner", "intermediate"]).nullish(),
  prerequisites: array(string()).nullish(),
  previewVideoUrl: string().nullish(),
  price: number().nullish(),
  published: boolean().nullish(),
  publishedAt: number().nullish(),
  sections: array(string()).default([]),
  shortDescription: string().nullish(),
  tags: array(string()).nullish(),
  tenantId: string().nullish(),
  thumbnailUrl: string().nullish(),
  title: string().nullish(),
  totalLessons: number().default(0),
  totalQuizzes: number().default(0),
  totalRatings: number().default(0),
  updatedAt: number().nullish()
});
const create = async (variables) => {
  const { createCourseFn } = await import("./courses-B5yl1Ktk.mjs");
  const result = await createCourseFn({ data: variables });
  return result.id;
};
const remove = async (variables) => {
  const { removeCourseFn } = await import("./courses-B5yl1Ktk.mjs");
  return removeCourseFn({ data: variables });
};
const enroll = async (variables) => {
  const { enrollInCourseFn } = await import("./courses-B5yl1Ktk.mjs");
  return enrollInCourseFn({ data: variables });
};
const get = async (courseId) => {
  const { getCourseFn } = await import("./courses-B5yl1Ktk.mjs");
  return getCourseFn({ data: courseId });
};
const getWithStructure = async (courseId) => {
  const course2 = await get(courseId);
  if (!course2) return null;
  const sections = await listSectionsFn({ data: courseId });
  const sectionsWithLessons = await Promise.all(
    sections.map(async (section) => {
      const lessons = await listLessonsFn({ data: section.id });
      return {
        ...section,
        lessons
      };
    })
  );
  return {
    ...course2,
    sections: sectionsWithLessons
  };
};
const list = async (tenantId, filters = {}) => {
  const { listCoursesFn } = await import("./courses-B5yl1Ktk.mjs");
  return listCoursesFn({
    data: {
      filters,
      tenantId: tenantId ?? null
    }
  });
};
const update = async (variables) => {
  const { updateCourseFn } = await import("./courses-B5yl1Ktk.mjs");
  const result = await updateCourseFn({ data: variables });
  return result.id;
};
const course = {
  create,
  enroll,
  get,
  getWithStructure,
  list,
  remove,
  update
};
export {
  course as a,
  courseSchema as c
};
