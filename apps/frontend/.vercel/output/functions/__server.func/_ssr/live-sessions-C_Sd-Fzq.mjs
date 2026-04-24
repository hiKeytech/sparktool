import { c as createServerRpc, a as api } from "./api-client-Cl2DaV5u.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/react.mjs";
import { o as object, s as string, n as number, r as record, c as any } from "../_libs/zod.mjs";
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
const createLiveSessionFn_createServerFn_handler = createServerRpc({
  id: "ece1017181ebab6c8ed541848b756f515c0aa8d2cbc7763d87398b203715f1b8",
  name: "createLiveSessionFn",
  filename: "src/server/live-sessions.ts"
}, (opts) => createLiveSessionFn.__executeServer(opts));
const createLiveSessionFn = createServerFn({
  method: "POST"
}).inputValidator(createLiveSessionInputSchema).handler(createLiveSessionFn_createServerFn_handler, async ({
  data
}) => {
  return api.post("/api/live-sessions", data);
});
const deleteLiveSessionFn_createServerFn_handler = createServerRpc({
  id: "ae0948d663ca51e3f687c58e6279c61595a9c3bb9eba2ddcaefe0db59c7277f3",
  name: "deleteLiveSessionFn",
  filename: "src/server/live-sessions.ts"
}, (opts) => deleteLiveSessionFn.__executeServer(opts));
const deleteLiveSessionFn = createServerFn({
  method: "POST"
}).inputValidator(sessionIdInputSchema).handler(deleteLiveSessionFn_createServerFn_handler, async ({
  data
}) => {
  return api.delete(`/api/live-sessions/${data}`);
});
const findLiveSessionFn_createServerFn_handler = createServerRpc({
  id: "e8ecc7b968ab50f4620c111bc5fc54d18eeeb1a54356481ebcf7c64144902a4e",
  name: "findLiveSessionFn",
  filename: "src/server/live-sessions.ts"
}, (opts) => findLiveSessionFn.__executeServer(opts));
const findLiveSessionFn = createServerFn({
  method: "GET"
}).inputValidator((sessionId) => sessionId).handler(findLiveSessionFn_createServerFn_handler, async ({
  data
}) => {
  if (!data) return null;
  return api.get(`/api/live-sessions/${data}`);
});
const joinLiveSessionFn_createServerFn_handler = createServerRpc({
  id: "d733555783ade1257fd320815f31d88b3e66605da966f93def2f4ba64c591a5e",
  name: "joinLiveSessionFn",
  filename: "src/server/live-sessions.ts"
}, (opts) => joinLiveSessionFn.__executeServer(opts));
const joinLiveSessionFn = createServerFn({
  method: "POST"
}).inputValidator(object({
  courseId: string().min(1),
  sessionId: string().min(1),
  studentId: string().min(1)
})).handler(joinLiveSessionFn_createServerFn_handler, async ({
  data
}) => {
  return api.post(`/api/live-sessions/${data.sessionId}/join`, {
    courseId: data.courseId,
    studentId: data.studentId
  });
});
const leaveLiveSessionFn_createServerFn_handler = createServerRpc({
  id: "d2fe18eed15a21f96cea8e3cebf8b9b33554f4c0545e45441ea5b9ad1c7295e5",
  name: "leaveLiveSessionFn",
  filename: "src/server/live-sessions.ts"
}, (opts) => leaveLiveSessionFn.__executeServer(opts));
const leaveLiveSessionFn = createServerFn({
  method: "POST"
}).inputValidator(object({
  sessionId: string().min(1),
  studentId: string().min(1)
})).handler(leaveLiveSessionFn_createServerFn_handler, async ({
  data
}) => {
  return api.post(`/api/live-sessions/${data.sessionId}/leave`, {
    studentId: data.studentId
  });
});
const listLiveSessionsFn_createServerFn_handler = createServerRpc({
  id: "87c298a8879b74dd8cf3b828a26eb5f57ac14fef96f2e619a11bb446d3bc0646",
  name: "listLiveSessionsFn",
  filename: "src/server/live-sessions.ts"
}, (opts) => listLiveSessionsFn.__executeServer(opts));
const listLiveSessionsFn = createServerFn({
  method: "GET"
}).inputValidator(liveSessionListInputSchema).handler(listLiveSessionsFn_createServerFn_handler, async ({
  data
}) => {
  const params = new URLSearchParams();
  if (data?.courseId) params.set("courseId", data.courseId);
  if (data?.instructorId) params.set("instructorId", data.instructorId);
  if (data?.status) params.set("status", data.status);
  if (data?.tenantId) params.set("tenantId", data.tenantId);
  return api.get(`/api/live-sessions?${params}`);
});
const updateLiveSessionFn_createServerFn_handler = createServerRpc({
  id: "9e4a9a458b8d8ebf7c252bb85e8d1855a8637fc404e1c50cb1aedfba2f49fa30",
  name: "updateLiveSessionFn",
  filename: "src/server/live-sessions.ts"
}, (opts) => updateLiveSessionFn.__executeServer(opts));
const updateLiveSessionFn = createServerFn({
  method: "POST"
}).inputValidator(updateLiveSessionInputSchema).handler(updateLiveSessionFn_createServerFn_handler, async ({
  data
}) => {
  return api.patch(`/api/live-sessions/${data.sessionId}`, data.sessionData);
});
export {
  createLiveSessionFn_createServerFn_handler,
  deleteLiveSessionFn_createServerFn_handler,
  findLiveSessionFn_createServerFn_handler,
  joinLiveSessionFn_createServerFn_handler,
  leaveLiveSessionFn_createServerFn_handler,
  listLiveSessionsFn_createServerFn_handler,
  updateLiveSessionFn_createServerFn_handler
};
