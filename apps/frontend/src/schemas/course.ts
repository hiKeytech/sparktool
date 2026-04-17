import { z } from "zod";
import type { CourseSectionData } from "./course-section";
import type { CourseLesson } from "@/types";
import type { Collection, DocumentReference } from "@/types/collection";
import { listSectionsFn, listLessonsFn } from "@/server/course-structure";

export const instructorSchema = z.object({
  biography: z.string().nullish(),
  email: z.string().email().nullish(),
  name: z.string().nullish(),
  title: z.string().nullish(),
});

export const courseSchema = z.object({
  averageRating: z.number().default(0),
  category: z.string().nullish(),
  completionCount: z.number().default(0),
  completionRate: z.number().default(0),
  createdAt: z.number().nullish(),
  createdBy: z.string().nullish(),
  createdByMeta: z
    .object({
      name: z.string(),
      photoUrl: z.string(),
    })
    .nullish(),
  description: z.string().nullish(),
  difficulty: z.enum(["advanced", "beginner", "intermediate"]).nullish(),
  enrollmentCount: z.number().default(0),
  estimatedDurationInMinutes: z.number().default(0),
  featured: z.boolean().default(false),
  hasCertificate: z.boolean().default(false),
  certificateTemplateId: z.string().nullish(),
  id: z.string().nullish(),
  instructors: z.array(instructorSchema).nullish(),
  language: z.string().nullish(),
  lastModifiedBy: z.string().nullish(),
  learningObjectives: z.array(z.string()).nullish(),
  level: z.enum(["advanced", "beginner", "intermediate"]).nullish(),
  prerequisites: z.array(z.string()).nullish(),
  previewVideoUrl: z.string().nullish(),
  price: z.number().nullish(),
  published: z.boolean().nullish(),
  publishedAt: z.number().nullish(),
  sections: z.array(z.string()).default([]),
  shortDescription: z.string().nullish(),
  tags: z.array(z.string()).nullish(),
  tenantId: z.string().nullish(),
  thumbnailUrl: z.string().nullish(),
  title: z.string().nullish(),
  totalLessons: z.number().default(0),
  totalQuizzes: z.number().default(0),
  totalRatings: z.number().default(0),
  updatedAt: z.number().nullish(),
});

export type Instructor = z.infer<typeof instructorSchema>;
export type Course = z.infer<typeof courseSchema>;
export type CourseWithId = Omit<Course, "id"> & { id: string };

export type CourseWithStructure = Omit<CourseWithId, "sections"> & {
  sections: (CourseSectionData & {
    id: string;
    lessons: (CourseLesson & { id: string })[];
  })[];
};

export type CourseCollection = Collection<CourseWithId>;

export type CourseDocumentReference = DocumentReference<CourseWithId>;

export type CourseLevel = "advanced" | "beginner" | "intermediate";

export interface CreateCourseVariables {
  courseData: Pick<
    Course,
    | "category"
    | "description"
    | "difficulty"
    | "featured"
    | "instructors"
    | "language"
    | "learningObjectives"
    | "level"
    | "prerequisites"
    | "previewVideoUrl"
    | "price"
    | "published"
    | "shortDescription"
    | "tags"
    | "thumbnailUrl"
    | "title"
  >;
  tenantId: string;
  userId: string;
}

const create = async (variables: CreateCourseVariables) => {
  const { createCourseFn } = await import("@/server/courses");
  const result = await createCourseFn({ data: variables });
  return result.id;
};

/**
 * This function removes a course and all associated student progress records.
 * It also updates the enrolledCourses array for all students who were enrolled
 * in the course to remove the deleted course.
 */
const remove = async (variables: { courseId: string }) => {
  const { removeCourseFn } = await import("@/server/courses");
  return removeCourseFn({ data: variables });
};

const enroll = async (variables: {
  courseId: string;
  studentId: string;
  tenantId: string;
}) => {
  const { enrollInCourseFn } = await import("@/server/courses");
  return enrollInCourseFn({ data: variables });
};

const get = async (courseId: string) => {
  const { getCourseFn } = await import("@/server/courses");
  return getCourseFn({ data: courseId });
};

const getWithStructure = async (courseId: string) => {
  const course = await get(courseId);
  if (!course) return null;

  const sections = await listSectionsFn({ data: courseId });

  const sectionsWithLessons = await Promise.all(
    sections.map(async (section) => {
      const lessons = await listLessonsFn({ data: section.id });
      return {
        ...section,
        lessons,
      };
    }),
  );

  return {
    ...course,
    sections: sectionsWithLessons,
  };
};

const list = async (
  tenantId?: string,
  filters: Partial<{
    category: string;
    difficulty: string;
    published: boolean;
    search: string;
  }> = {},
) => {
  const { listCoursesFn } = await import("@/server/courses");
  return listCoursesFn({
    data: {
      filters,
      tenantId: tenantId ?? null,
    },
  });
};

const update = async (variables: {
  courseData: Partial<Course>;
  courseId: string;
}) => {
  const { updateCourseFn } = await import("@/server/courses");
  const result = await updateCourseFn({ data: variables });
  return result.id;
};

export const course = {
  create,
  enroll,
  get,
  getWithStructure,
  list,
  remove,
  update,
};
