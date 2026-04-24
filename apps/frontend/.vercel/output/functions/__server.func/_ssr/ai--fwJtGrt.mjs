import { c as createServerRpc, a as api } from "./api-client-Cl2DaV5u.mjs";
import { g as generateAiPracticeQuizInputSchema, s as submitAiPracticeQuizInputSchema, a as aiChatThreadLookupSchema, b as aiChatRequestSchema } from "./ai-B1BshGYU.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/react.mjs";
import { s as string } from "../_libs/zod.mjs";
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
const getAiHealthFn_createServerFn_handler = createServerRpc({
  id: "c82886004c842626345c88f3d10a84b6f9266146ad47490391557b1392398ff6",
  name: "getAiHealthFn",
  filename: "src/server/ai.ts"
}, (opts) => getAiHealthFn.__executeServer(opts));
const getAiHealthFn = createServerFn({
  method: "GET"
}).handler(getAiHealthFn_createServerFn_handler, async () => {
  return api.get("/api/ai/health");
});
const generateAiPracticeQuizFn_createServerFn_handler = createServerRpc({
  id: "63950f0587703e9f1f29f16910b74c4efc8350ea4434a842f3ec7ebe792101ae",
  name: "generateAiPracticeQuizFn",
  filename: "src/server/ai.ts"
}, (opts) => generateAiPracticeQuizFn.__executeServer(opts));
const generateAiPracticeQuizFn = createServerFn({
  method: "POST"
}).inputValidator(generateAiPracticeQuizInputSchema).handler(generateAiPracticeQuizFn_createServerFn_handler, async ({
  data
}) => {
  return api.post("/api/ai/practice-quizzes", data);
});
const getAiPracticeQuizSessionFn_createServerFn_handler = createServerRpc({
  id: "10cfce7492c7717480bdb087821b9ea3bc67595456418726ae8a820924fc308f",
  name: "getAiPracticeQuizSessionFn",
  filename: "src/server/ai.ts"
}, (opts) => getAiPracticeQuizSessionFn.__executeServer(opts));
const getAiPracticeQuizSessionFn = createServerFn({
  method: "GET"
}).inputValidator((sessionId) => sessionId).handler(getAiPracticeQuizSessionFn_createServerFn_handler, async ({
  data
}) => {
  return api.get(`/api/ai/practice-quizzes/${data}`);
});
const listAiPracticeQuizSessionsFn_createServerFn_handler = createServerRpc({
  id: "bd448bd2061b759d41edfecaea2aeb3b5c4e70e446904afdf0e24acae277289f",
  name: "listAiPracticeQuizSessionsFn",
  filename: "src/server/ai.ts"
}, (opts) => listAiPracticeQuizSessionsFn.__executeServer(opts));
const listAiPracticeQuizSessionsFn = createServerFn({
  method: "GET"
}).inputValidator((courseId) => courseId ?? null).handler(listAiPracticeQuizSessionsFn_createServerFn_handler, async ({
  data
}) => {
  const params = new URLSearchParams();
  if (data) {
    params.set("courseId", data);
  }
  return api.get(`/api/ai/practice-quizzes?${params.toString()}`);
});
const submitAiPracticeQuizFn_createServerFn_handler = createServerRpc({
  id: "be38f376356467ee5258a908fc9e7fc26f4a0edac94bc6ef9bcedcd0c77a563d",
  name: "submitAiPracticeQuizFn",
  filename: "src/server/ai.ts"
}, (opts) => submitAiPracticeQuizFn.__executeServer(opts));
const submitAiPracticeQuizFn = createServerFn({
  method: "POST"
}).inputValidator(submitAiPracticeQuizInputSchema.extend({
  sessionId: string().min(1)
})).handler(submitAiPracticeQuizFn_createServerFn_handler, async ({
  data
}) => {
  return api.post(`/api/ai/practice-quizzes/${data.sessionId}/submit`, {
    answers: data.answers
  });
});
const getAiChatThreadFn_createServerFn_handler = createServerRpc({
  id: "152c08073ac02706a94d5aa425d008a20ab418485ac376fed140b454c58a6688",
  name: "getAiChatThreadFn",
  filename: "src/server/ai.ts"
}, (opts) => getAiChatThreadFn.__executeServer(opts));
const getAiChatThreadFn = createServerFn({
  method: "GET"
}).inputValidator(aiChatThreadLookupSchema).handler(getAiChatThreadFn_createServerFn_handler, async ({
  data
}) => {
  const params = new URLSearchParams();
  if (data.courseId) {
    params.set("courseId", data.courseId);
  }
  if (data.lessonId) {
    params.set("lessonId", data.lessonId);
  }
  return api.get(`/api/ai/chat?${params.toString()}`);
});
const sendAiChatMessageFn_createServerFn_handler = createServerRpc({
  id: "c348f50ae39d989f0e7ec3726f14c609b3a06c1ee077dfcec4e3caf8b653472e",
  name: "sendAiChatMessageFn",
  filename: "src/server/ai.ts"
}, (opts) => sendAiChatMessageFn.__executeServer(opts));
const sendAiChatMessageFn = createServerFn({
  method: "POST"
}).inputValidator(aiChatRequestSchema).handler(sendAiChatMessageFn_createServerFn_handler, async ({
  data
}) => {
  return api.post("/api/ai/chat", data);
});
export {
  generateAiPracticeQuizFn_createServerFn_handler,
  getAiChatThreadFn_createServerFn_handler,
  getAiHealthFn_createServerFn_handler,
  getAiPracticeQuizSessionFn_createServerFn_handler,
  listAiPracticeQuizSessionsFn_createServerFn_handler,
  sendAiChatMessageFn_createServerFn_handler,
  submitAiPracticeQuizFn_createServerFn_handler
};
