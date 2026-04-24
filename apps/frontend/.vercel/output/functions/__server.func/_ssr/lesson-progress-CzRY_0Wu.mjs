import { c as createServerRpc, a as api } from "./api-client-Cl2DaV5u.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/react.mjs";
import { o as object, r as record, c as any, s as string, n as number } from "../_libs/zod.mjs";
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
const lessonProgressInputSchema = object({
  progressData: record(string(), any())
});
const lessonProgressGetInputSchema = object({
  lessonId: string().min(1),
  studentId: string().min(1)
});
const lessonProgressUpdateInputSchema = object({
  progressData: record(string(), any()),
  progressId: string().min(1)
});
const markCompleteInputSchema = object({
  courseId: string().min(1),
  lessonId: string().min(1),
  sectionId: string().min(1),
  studentId: string().min(1),
  tenantId: string().min(1).optional(),
  timeSpent: number().optional()
});
const createLessonProgressFn_createServerFn_handler = createServerRpc({
  id: "12b41ded76e0a60d5963e42c7cb76e2552de214164ea1d1a39beb0787e21f807",
  name: "createLessonProgressFn",
  filename: "src/server/lesson-progress.ts"
}, (opts) => createLessonProgressFn.__executeServer(opts));
const createLessonProgressFn = createServerFn({
  method: "POST"
}).inputValidator(lessonProgressInputSchema).handler(createLessonProgressFn_createServerFn_handler, async ({
  data
}) => {
  return api.post("/api/lesson-progress", data);
});
const getLessonProgressFn_createServerFn_handler = createServerRpc({
  id: "e9e8edfd373e7d784b3ded6dac320ce14c5c83f3b63711daefd607287d864631",
  name: "getLessonProgressFn",
  filename: "src/server/lesson-progress.ts"
}, (opts) => getLessonProgressFn.__executeServer(opts));
const getLessonProgressFn = createServerFn({
  method: "GET"
}).inputValidator(lessonProgressGetInputSchema).handler(getLessonProgressFn_createServerFn_handler, async ({
  data
}) => {
  const params = new URLSearchParams({
    lessonId: data.lessonId,
    studentId: data.studentId
  });
  return api.get(`/api/lesson-progress?${params}`);
});
const listLessonProgressByStudentFn_createServerFn_handler = createServerRpc({
  id: "5666d99454c41a7448e849a947fabe25bacb7633e87d5c39ec83a4f82c787726",
  name: "listLessonProgressByStudentFn",
  filename: "src/server/lesson-progress.ts"
}, (opts) => listLessonProgressByStudentFn.__executeServer(opts));
const listLessonProgressByStudentFn = createServerFn({
  method: "GET"
}).inputValidator(object({
  courseId: string().optional(),
  studentId: string().min(1)
})).handler(listLessonProgressByStudentFn_createServerFn_handler, async ({
  data
}) => {
  const params = data.courseId ? `?courseId=${data.courseId}` : "";
  return api.get(`/api/lesson-progress/student/${data.studentId}${params}`);
});
const updateLessonProgressFn_createServerFn_handler = createServerRpc({
  id: "3d6aae239081adbaf70774dce53e5963042e7e8e3e7bc0d9a2a0cfeab04b1ccd",
  name: "updateLessonProgressFn",
  filename: "src/server/lesson-progress.ts"
}, (opts) => updateLessonProgressFn.__executeServer(opts));
const updateLessonProgressFn = createServerFn({
  method: "POST"
}).inputValidator(lessonProgressUpdateInputSchema).handler(updateLessonProgressFn_createServerFn_handler, async ({
  data
}) => {
  return api.patch(`/api/lesson-progress/${data.progressId}`, data.progressData);
});
const markLessonCompleteFn_createServerFn_handler = createServerRpc({
  id: "460ee7723310cc93049ec04b86877256489bfaae39fd4422796ac934f9d6f9d7",
  name: "markLessonCompleteFn",
  filename: "src/server/lesson-progress.ts"
}, (opts) => markLessonCompleteFn.__executeServer(opts));
const markLessonCompleteFn = createServerFn({
  method: "POST"
}).inputValidator(markCompleteInputSchema).handler(markLessonCompleteFn_createServerFn_handler, async ({
  data
}) => {
  return api.post("/api/lesson-progress/mark-complete", data);
});
export {
  createLessonProgressFn_createServerFn_handler,
  getLessonProgressFn_createServerFn_handler,
  listLessonProgressByStudentFn_createServerFn_handler,
  markLessonCompleteFn_createServerFn_handler,
  updateLessonProgressFn_createServerFn_handler
};
