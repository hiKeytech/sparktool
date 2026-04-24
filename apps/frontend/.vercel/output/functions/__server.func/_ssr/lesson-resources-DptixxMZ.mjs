import { c as createServerRpc, a as api } from "./api-client-Cl2DaV5u.mjs";
import { l as lessonResourceSchema } from "./course-lesson-C_qGHOXP.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/react.mjs";
import { o as object, s as string, n as number } from "../_libs/zod.mjs";
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
const lessonResourceDataSchema = lessonResourceSchema.omit({
  createdAt: true,
  id: true,
  storageKey: true,
  storageProvider: true,
  storageResourceType: true,
  updatedAt: true
}).passthrough();
const serializedFileSchema = object({
  dataUrl: string().min(1),
  name: string().min(1),
  size: number().nonnegative(),
  type: string().min(1)
});
const createLessonResourceInputSchema = object({
  file: serializedFileSchema.optional(),
  resourceData: lessonResourceDataSchema
});
const deleteLessonResourceInputSchema = object({
  resourceId: string().min(1)
});
const updateLessonResourceInputSchema = object({
  file: serializedFileSchema.optional(),
  resourceData: lessonResourceDataSchema.partial().passthrough(),
  resourceId: string().min(1)
});
const resourceIdInputSchema = string().min(1);
const lessonIdInputSchema = string().min(1);
const createLessonResourceFn_createServerFn_handler = createServerRpc({
  id: "722430d82b6722a27993fdcfce6008350bc2af76c521010f25ca81f41c9d744d",
  name: "createLessonResourceFn",
  filename: "src/server/lesson-resources.ts"
}, (opts) => createLessonResourceFn.__executeServer(opts));
const createLessonResourceFn = createServerFn({
  method: "POST"
}).inputValidator(createLessonResourceInputSchema).handler(createLessonResourceFn_createServerFn_handler, async ({
  data
}) => {
  return api.post("/api/lesson-resources", data);
});
const deleteLessonResourceFn_createServerFn_handler = createServerRpc({
  id: "14b7bfbc38b017b8cdd6df60a97928c606c377e7b5ea52a7171ea10701f51a47",
  name: "deleteLessonResourceFn",
  filename: "src/server/lesson-resources.ts"
}, (opts) => deleteLessonResourceFn.__executeServer(opts));
const deleteLessonResourceFn = createServerFn({
  method: "POST"
}).inputValidator(deleteLessonResourceInputSchema).handler(deleteLessonResourceFn_createServerFn_handler, async ({
  data
}) => {
  return api.delete(`/api/lesson-resources/${data.resourceId}`);
});
const getLessonResourceFn_createServerFn_handler = createServerRpc({
  id: "91a7f90dbed39b16898a30807393aefa3a4b06c8899cae5d2968fa37ebe0ce51",
  name: "getLessonResourceFn",
  filename: "src/server/lesson-resources.ts"
}, (opts) => getLessonResourceFn.__executeServer(opts));
const getLessonResourceFn = createServerFn({
  method: "GET"
}).inputValidator(resourceIdInputSchema).handler(getLessonResourceFn_createServerFn_handler, async ({
  data
}) => {
  return api.get(`/api/lesson-resources/${data}`);
});
const listLessonResourcesFn_createServerFn_handler = createServerRpc({
  id: "cde8ec8bfe76196c393a540ef1c33073ece05cbf070624fec62dc3e5738d7da0",
  name: "listLessonResourcesFn",
  filename: "src/server/lesson-resources.ts"
}, (opts) => listLessonResourcesFn.__executeServer(opts));
const listLessonResourcesFn = createServerFn({
  method: "GET"
}).inputValidator(lessonIdInputSchema).handler(listLessonResourcesFn_createServerFn_handler, async ({
  data
}) => {
  return api.get(`/api/lesson-resources/lesson/${data}`);
});
const updateLessonResourceFn_createServerFn_handler = createServerRpc({
  id: "366efa8a62a37199d348cb992b5f45ac13f46ea65bb86bc03b5632d6be8aee62",
  name: "updateLessonResourceFn",
  filename: "src/server/lesson-resources.ts"
}, (opts) => updateLessonResourceFn.__executeServer(opts));
const updateLessonResourceFn = createServerFn({
  method: "POST"
}).inputValidator(updateLessonResourceInputSchema).handler(updateLessonResourceFn_createServerFn_handler, async ({
  data
}) => {
  return api.patch(`/api/lesson-resources/${data.resourceId}`, {
    file: data.file,
    resourceData: data.resourceData
  });
});
export {
  createLessonResourceFn_createServerFn_handler,
  deleteLessonResourceFn_createServerFn_handler,
  getLessonResourceFn_createServerFn_handler,
  listLessonResourcesFn_createServerFn_handler,
  updateLessonResourceFn_createServerFn_handler
};
