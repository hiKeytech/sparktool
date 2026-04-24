import { c as createSsrRpc } from "./course-structure-D2f1-VM0.mjs";
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
const createLessonResourceFn = createServerFn({
  method: "POST"
}).inputValidator(createLessonResourceInputSchema).handler(createSsrRpc("722430d82b6722a27993fdcfce6008350bc2af76c521010f25ca81f41c9d744d"));
const deleteLessonResourceFn = createServerFn({
  method: "POST"
}).inputValidator(deleteLessonResourceInputSchema).handler(createSsrRpc("14b7bfbc38b017b8cdd6df60a97928c606c377e7b5ea52a7171ea10701f51a47"));
const getLessonResourceFn = createServerFn({
  method: "GET"
}).inputValidator(resourceIdInputSchema).handler(createSsrRpc("91a7f90dbed39b16898a30807393aefa3a4b06c8899cae5d2968fa37ebe0ce51"));
const listLessonResourcesFn = createServerFn({
  method: "GET"
}).inputValidator(lessonIdInputSchema).handler(createSsrRpc("cde8ec8bfe76196c393a540ef1c33073ece05cbf070624fec62dc3e5738d7da0"));
const updateLessonResourceFn = createServerFn({
  method: "POST"
}).inputValidator(updateLessonResourceInputSchema).handler(createSsrRpc("366efa8a62a37199d348cb992b5f45ac13f46ea65bb86bc03b5632d6be8aee62"));
export {
  createLessonResourceFn,
  deleteLessonResourceFn,
  getLessonResourceFn,
  listLessonResourcesFn,
  updateLessonResourceFn
};
