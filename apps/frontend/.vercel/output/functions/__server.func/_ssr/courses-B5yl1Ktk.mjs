import { c as createSsrRpc } from "./course-structure-D2f1-VM0.mjs";
import { c as courseSchema } from "./course-C8X6AilP.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/react.mjs";
import { o as object, s as string, b as boolean } from "../_libs/zod.mjs";
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
const createCourseInputSchema = object({
  courseData: courseSchema.pick({
    category: true,
    description: true,
    difficulty: true,
    featured: true,
    instructors: true,
    language: true,
    learningObjectives: true,
    level: true,
    prerequisites: true,
    previewVideoUrl: true,
    price: true,
    published: true,
    shortDescription: true,
    tags: true,
    thumbnailUrl: true,
    title: true
  }),
  tenantId: string().min(1),
  userId: string().min(1)
});
const enrollCourseInputSchema = object({
  courseId: string().min(1),
  studentId: string().min(1),
  tenantId: string().min(1)
});
const updateCourseInputSchema = object({
  courseData: courseSchema.partial(),
  courseId: string().min(1)
});
const removeCourseInputSchema = object({
  courseId: string().min(1)
});
const listCoursesInputSchema = object({
  filters: object({
    category: string().optional(),
    difficulty: string().optional(),
    published: boolean().optional(),
    search: string().optional()
  }).optional(),
  tenantId: string().nullable().optional()
});
const createCourseFn = createServerFn({
  method: "POST"
}).inputValidator(createCourseInputSchema).handler(createSsrRpc("6b4ad055e44713cf7897d20ca67a2158558ac1e6ab909f207808d571ba13e2c4"));
const enrollInCourseFn = createServerFn({
  method: "POST"
}).inputValidator(enrollCourseInputSchema).handler(createSsrRpc("fb1b06f8bea18b3fb630131a832bcd4fa835be193e07b1f179dc71d56fcc966a"));
const getCourseFn = createServerFn({
  method: "GET"
}).inputValidator((courseId) => courseId).handler(createSsrRpc("edda1f44c42c2848fd20df0573fc32e1c56b147b30e7736eefc05daf5f80aff3"));
const listCoursesFn = createServerFn({
  method: "GET"
}).inputValidator(listCoursesInputSchema).handler(createSsrRpc("5d5c69de0a5fab2bc62611fd922dbc5d0584de48599069647026868901f80950"));
const removeCourseFn = createServerFn({
  method: "POST"
}).inputValidator(removeCourseInputSchema).handler(createSsrRpc("0641772762862744912e07ad0f16811ecc7665c281e023f732469feef84263f8"));
const updateCourseFn = createServerFn({
  method: "POST"
}).inputValidator(updateCourseInputSchema).handler(createSsrRpc("6e1b6e7039d2a5adf7250687b2c73871ff0d3230b31fe45da1267632ac4ce302"));
export {
  createCourseFn,
  enrollInCourseFn,
  getCourseFn,
  listCoursesFn,
  removeCourseFn,
  updateCourseFn
};
