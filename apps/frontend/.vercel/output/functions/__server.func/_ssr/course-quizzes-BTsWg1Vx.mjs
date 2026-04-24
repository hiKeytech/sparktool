import { c as createSsrRpc } from "./course-structure-D2f1-VM0.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/react.mjs";
import { o as object, s as string, a as array, n as number, c as any, _ as _enum, b as boolean } from "../_libs/zod.mjs";
import "node:async_hooks";
import "node:stream";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "node:stream/web";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const courseQuizFiltersSchema = object({
  courseId: string().optional(),
  lessonId: string().optional(),
  placement: _enum(["course", "lesson", "section"]).optional(),
  sectionId: string().optional()
}).optional();
const courseQuizSchema = object({
  courseId: string().min(1),
  createdAt: number().optional(),
  description: string().optional(),
  isRequired: boolean(),
  lessonId: string().optional(),
  maxAttempts: number().optional(),
  order: number(),
  passingScore: number(),
  placement: _enum(["course", "lesson", "section"]),
  questions: array(any()),
  sectionId: string().optional(),
  timeLimit: number().optional(),
  title: string().min(1),
  updatedAt: number().optional()
});
const createCourseQuizFn = createServerFn({
  method: "POST"
}).inputValidator(courseQuizSchema).handler(createSsrRpc("e47b4284c51947d2d5e729650c9b6b8f0c59ea4809d5a0125a95194060105597"));
const deleteCourseQuizFn = createServerFn({
  method: "POST"
}).inputValidator((quizId) => quizId).handler(createSsrRpc("214956f7768cca7ef6cb4ea5b8d8cfcf6697600b49895bd41cd8301d34fb720b"));
const getCourseQuizFn = createServerFn({
  method: "GET"
}).inputValidator((quizId) => quizId).handler(createSsrRpc("9e33c457e10181e1107c53fdac2f0062d9985cb13100d956b2e6e6ef8375e765"));
const listCourseQuizzesFn = createServerFn({
  method: "GET"
}).inputValidator(courseQuizFiltersSchema).handler(createSsrRpc("1fb4fb2684f1166dd566a41a183edc6b7f1b3a2dd88c6445db0eca178541a6d7"));
const reorderCourseQuizzesFn = createServerFn({
  method: "POST"
}).inputValidator(array(object({
  order: number(),
  quizId: string().min(1)
}))).handler(createSsrRpc("c395cef876657d7d484b8e431d8352b5723fef85a1fb40934cbb8c4c074d54df"));
const updateCourseQuizFn = createServerFn({
  method: "POST"
}).inputValidator(object({
  quizData: courseQuizSchema.partial(),
  quizId: string().min(1)
})).handler(createSsrRpc("4833d382fd026ca45d1dddebca59e9559ae5c80a4991658f6060c02e0b900256"));
export {
  createCourseQuizFn,
  deleteCourseQuizFn,
  getCourseQuizFn,
  listCourseQuizzesFn,
  reorderCourseQuizzesFn,
  updateCourseQuizFn
};
