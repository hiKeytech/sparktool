import { z } from "zod";
import type { CourseSection } from "./course-section";
import type { CourseLesson } from "./course-lesson";

export const instructorSchema = z.object({
  biography: z.string().nullish(),
  email: z.string().email().nullish(),
  name: z.string().nullish(),
  title: z.string().nullish(),
});

export const courseSchema = z.object({
  averageRating: z.number().default(0),
  category: z.string().nullish(),
  certificateTemplateId: z.string().nullish(),
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

export type CourseWithStructure = Omit<Course, "sections"> & {
  sections: (CourseSection & {
    id: string;
    lessons: (CourseLesson & { id: string })[];
  })[];
};

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
