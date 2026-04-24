import { c as createSsrRpc } from "./course-structure-D2f1-VM0.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/react.mjs";
import { o as object, s as string, r as record, c as any, n as number } from "../_libs/zod.mjs";
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
const createLiveSessionInputSchema = object({
  sessionData: object({
    courseId: string().min(1),
    description: string().min(1),
    duration: number(),
    instructorName: string().min(1),
    maxParticipants: number().optional(),
    scheduledAt: string(),
    title: string().min(1)
  }),
  userId: string().min(1)
});
const sessionIdInputSchema = string().min(1);
const liveSessionListInputSchema = object({
  courseId: string().optional(),
  instructorId: string().optional(),
  status: string().optional(),
  tenantId: string().optional()
}).optional();
const updateLiveSessionInputSchema = object({
  sessionData: record(string(), any()),
  sessionId: string().min(1)
});
const createLiveSessionFn = createServerFn({
  method: "POST"
}).inputValidator(createLiveSessionInputSchema).handler(createSsrRpc("ece1017181ebab6c8ed541848b756f515c0aa8d2cbc7763d87398b203715f1b8"));
const deleteLiveSessionFn = createServerFn({
  method: "POST"
}).inputValidator(sessionIdInputSchema).handler(createSsrRpc("ae0948d663ca51e3f687c58e6279c61595a9c3bb9eba2ddcaefe0db59c7277f3"));
const findLiveSessionFn = createServerFn({
  method: "GET"
}).inputValidator((sessionId) => sessionId).handler(createSsrRpc("e8ecc7b968ab50f4620c111bc5fc54d18eeeb1a54356481ebcf7c64144902a4e"));
const joinLiveSessionFn = createServerFn({
  method: "POST"
}).inputValidator(object({
  courseId: string().min(1),
  sessionId: string().min(1),
  studentId: string().min(1)
})).handler(createSsrRpc("d733555783ade1257fd320815f31d88b3e66605da966f93def2f4ba64c591a5e"));
const leaveLiveSessionFn = createServerFn({
  method: "POST"
}).inputValidator(object({
  sessionId: string().min(1),
  studentId: string().min(1)
})).handler(createSsrRpc("d2fe18eed15a21f96cea8e3cebf8b9b33554f4c0545e45441ea5b9ad1c7295e5"));
const listLiveSessionsFn = createServerFn({
  method: "GET"
}).inputValidator(liveSessionListInputSchema).handler(createSsrRpc("87c298a8879b74dd8cf3b828a26eb5f57ac14fef96f2e619a11bb446d3bc0646"));
const updateLiveSessionFn = createServerFn({
  method: "POST"
}).inputValidator(updateLiveSessionInputSchema).handler(createSsrRpc("9e4a9a458b8d8ebf7c252bb85e8d1855a8637fc404e1c50cb1aedfba2f49fa30"));
export {
  createLiveSessionFn,
  deleteLiveSessionFn,
  findLiveSessionFn,
  joinLiveSessionFn,
  leaveLiveSessionFn,
  listLiveSessionsFn,
  updateLiveSessionFn
};
