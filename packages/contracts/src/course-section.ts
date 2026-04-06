import { z } from "zod";

export const courseSectionSchema = z.object({
  courseId: z.string(),
  createdAt: z.number().default(() => Date.now()),
  createdBy: z.string().nullish(),
  createdByMeta: z
    .object({
      name: z.string(),
      photoUrl: z.string(),
    })
    .nullish(),
  description: z.string().nullish(),
  estimatedDurationInMinutes: z.number().default(0),
  isPublished: z.boolean().default(false),
  order: z.number().nullish(),
  title: z.string().nullish(),
  updatedAt: z.number().default(() => Date.now()),
  updatedBy: z.string().nullish(),
  updatedByMeta: z
    .object({
      name: z.string(),
      photoUrl: z.string(),
    })
    .nullish(),
});

export type CourseSection = z.infer<typeof courseSectionSchema>;

export interface CreateCourseSectionVariables {
  data: Pick<
    CourseSection,
    | "courseId"
    | "description"
    | "estimatedDurationInMinutes"
    | "isPublished"
    | "order"
    | "title"
  >;
  userId: string;
}
