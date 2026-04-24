import { c as createServerRpc, a as api } from "./api-client-Cl2DaV5u.mjs";
import { c as courseSchema } from "./course-C8X6AilP.mjs";
import { c as createServerFn } from "./index.mjs";
import "./course-structure-D2f1-VM0.mjs";
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
const createCourseFn_createServerFn_handler = createServerRpc({
  id: "6b4ad055e44713cf7897d20ca67a2158558ac1e6ab909f207808d571ba13e2c4",
  name: "createCourseFn",
  filename: "src/server/courses.ts"
}, (opts) => createCourseFn.__executeServer(opts));
const createCourseFn = createServerFn({
  method: "POST"
}).inputValidator(createCourseInputSchema).handler(createCourseFn_createServerFn_handler, async ({
  data
}) => {
  return api.post("/api/courses", data);
});
const enrollInCourseFn_createServerFn_handler = createServerRpc({
  id: "fb1b06f8bea18b3fb630131a832bcd4fa835be193e07b1f179dc71d56fcc966a",
  name: "enrollInCourseFn",
  filename: "src/server/courses.ts"
}, (opts) => enrollInCourseFn.__executeServer(opts));
const enrollInCourseFn = createServerFn({
  method: "POST"
}).inputValidator(enrollCourseInputSchema).handler(enrollInCourseFn_createServerFn_handler, async ({
  data
}) => {
  return api.post(`/api/courses/${data.courseId}/enroll`, {
    studentId: data.studentId
  });
});
const getCourseFn_createServerFn_handler = createServerRpc({
  id: "edda1f44c42c2848fd20df0573fc32e1c56b147b30e7736eefc05daf5f80aff3",
  name: "getCourseFn",
  filename: "src/server/courses.ts"
}, (opts) => getCourseFn.__executeServer(opts));
const getCourseFn = createServerFn({
  method: "GET"
}).inputValidator((courseId) => courseId).handler(getCourseFn_createServerFn_handler, async ({
  data
}) => {
  return api.get(`/api/courses/${data}`);
});
const listCoursesFn_createServerFn_handler = createServerRpc({
  id: "5d5c69de0a5fab2bc62611fd922dbc5d0584de48599069647026868901f80950",
  name: "listCoursesFn",
  filename: "src/server/courses.ts"
}, (opts) => listCoursesFn.__executeServer(opts));
const listCoursesFn = createServerFn({
  method: "GET"
}).inputValidator(listCoursesInputSchema).handler(listCoursesFn_createServerFn_handler, async ({
  data
}) => {
  const params = new URLSearchParams();
  if (data.tenantId) params.set("tenantId", data.tenantId);
  if (data.filters?.category) params.set("category", data.filters.category);
  if (data.filters?.difficulty) params.set("difficulty", data.filters.difficulty);
  if (data.filters?.published !== void 0) params.set("published", String(data.filters.published));
  if (data.filters?.search) params.set("search", data.filters.search);
  return api.get(`/api/courses?${params}`);
});
const removeCourseFn_createServerFn_handler = createServerRpc({
  id: "0641772762862744912e07ad0f16811ecc7665c281e023f732469feef84263f8",
  name: "removeCourseFn",
  filename: "src/server/courses.ts"
}, (opts) => removeCourseFn.__executeServer(opts));
const removeCourseFn = createServerFn({
  method: "POST"
}).inputValidator(removeCourseInputSchema).handler(removeCourseFn_createServerFn_handler, async ({
  data
}) => {
  return api.delete(`/api/courses/${data.courseId}`);
});
const updateCourseFn_createServerFn_handler = createServerRpc({
  id: "6e1b6e7039d2a5adf7250687b2c73871ff0d3230b31fe45da1267632ac4ce302",
  name: "updateCourseFn",
  filename: "src/server/courses.ts"
}, (opts) => updateCourseFn.__executeServer(opts));
const updateCourseFn = createServerFn({
  method: "POST"
}).inputValidator(updateCourseInputSchema).handler(updateCourseFn_createServerFn_handler, async ({
  data
}) => {
  return api.patch(`/api/courses/${data.courseId}`, {
    courseData: data.courseData
  });
});
export {
  createCourseFn_createServerFn_handler,
  enrollInCourseFn_createServerFn_handler,
  getCourseFn_createServerFn_handler,
  listCoursesFn_createServerFn_handler,
  removeCourseFn_createServerFn_handler,
  updateCourseFn_createServerFn_handler
};
