import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { courseQuizRepository } from "@/server/repositories/course-quiz-repository";
import type { CourseQuiz } from "@/types";

const courseQuizFiltersSchema = z
  .object({
    courseId: z.string().optional(),
    lessonId: z.string().optional(),
    placement: z.enum(["course", "lesson", "section"]).optional(),
    sectionId: z.string().optional(),
  })
  .optional();

const courseQuizSchema = z.object({
  courseId: z.string().min(1),
  createdAt: z.number().optional(),
  description: z.string().optional(),
  isRequired: z.boolean(),
  lessonId: z.string().optional(),
  maxAttempts: z.number().optional(),
  order: z.number(),
  passingScore: z.number(),
  placement: z.enum(["course", "lesson", "section"]),
  questions: z.array(z.any()),
  sectionId: z.string().optional(),
  timeLimit: z.number().optional(),
  title: z.string().min(1),
  updatedAt: z.number().optional(),
});

export const createCourseQuizFn = createServerFn({ method: "POST" })
  .inputValidator(courseQuizSchema)
  .handler(async ({ data }) => {
    const createdQuiz = await courseQuizRepository.create(
      data as Omit<CourseQuiz, "id">,
    );

    if (!createdQuiz) {
      throw new Error("Failed to create course quiz.");
    }

    return createdQuiz.id;
  });

export const deleteCourseQuizFn = createServerFn({ method: "POST" })
  .inputValidator((quizId: string) => quizId)
  .handler(async ({ data }) => {
    await courseQuizRepository.delete(data);
    return { success: true };
  });

export const getCourseQuizFn = createServerFn({ method: "GET" })
  .inputValidator((quizId: string) => quizId)
  .handler(async ({ data }) => {
    return courseQuizRepository.getById(data);
  });

export const listCourseQuizzesFn = createServerFn({ method: "GET" })
  .inputValidator(courseQuizFiltersSchema)
  .handler(async ({ data }) => {
    return courseQuizRepository.list(data);
  });

export const reorderCourseQuizzesFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.array(z.object({ order: z.number(), quizId: z.string().min(1) })),
  )
  .handler(async ({ data }) => {
    await Promise.all(
      data.map(({ order, quizId }) =>
        courseQuizRepository.update(quizId, { order }),
      ),
    );

    return { success: true };
  });

export const updateCourseQuizFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      quizData: courseQuizSchema.partial(),
      quizId: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const updatedQuiz = await courseQuizRepository.update(
      data.quizId,
      data.quizData,
    );

    if (!updatedQuiz) {
      throw new Error("Failed to update course quiz.");
    }

    return updatedQuiz.id;
  });
