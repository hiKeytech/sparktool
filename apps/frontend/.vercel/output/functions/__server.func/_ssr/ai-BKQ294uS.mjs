import { c as createSsrRpc } from "./course-structure-D2f1-VM0.mjs";
import { s as submitAiPracticeQuizInputSchema, b as aiChatRequestSchema, a as aiChatThreadLookupSchema, g as generateAiPracticeQuizInputSchema } from "./ai-B1BshGYU.mjs";
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
const getAiHealthFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("c82886004c842626345c88f3d10a84b6f9266146ad47490391557b1392398ff6"));
const generateAiPracticeQuizFn = createServerFn({
  method: "POST"
}).inputValidator(generateAiPracticeQuizInputSchema).handler(createSsrRpc("63950f0587703e9f1f29f16910b74c4efc8350ea4434a842f3ec7ebe792101ae"));
const getAiPracticeQuizSessionFn = createServerFn({
  method: "GET"
}).inputValidator((sessionId) => sessionId).handler(createSsrRpc("10cfce7492c7717480bdb087821b9ea3bc67595456418726ae8a820924fc308f"));
const listAiPracticeQuizSessionsFn = createServerFn({
  method: "GET"
}).inputValidator((courseId) => courseId ?? null).handler(createSsrRpc("bd448bd2061b759d41edfecaea2aeb3b5c4e70e446904afdf0e24acae277289f"));
const submitAiPracticeQuizFn = createServerFn({
  method: "POST"
}).inputValidator(submitAiPracticeQuizInputSchema.extend({
  sessionId: string().min(1)
})).handler(createSsrRpc("be38f376356467ee5258a908fc9e7fc26f4a0edac94bc6ef9bcedcd0c77a563d"));
const getAiChatThreadFn = createServerFn({
  method: "GET"
}).inputValidator(aiChatThreadLookupSchema).handler(createSsrRpc("152c08073ac02706a94d5aa425d008a20ab418485ac376fed140b454c58a6688"));
const sendAiChatMessageFn = createServerFn({
  method: "POST"
}).inputValidator(aiChatRequestSchema).handler(createSsrRpc("c348f50ae39d989f0e7ec3726f14c609b3a06c1ee077dfcec4e3caf8b653472e"));
export {
  generateAiPracticeQuizFn,
  getAiChatThreadFn,
  getAiHealthFn,
  getAiPracticeQuizSessionFn,
  listAiPracticeQuizSessionsFn,
  sendAiChatMessageFn,
  submitAiPracticeQuizFn
};
