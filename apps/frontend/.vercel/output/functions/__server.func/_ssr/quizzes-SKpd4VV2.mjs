import { c as createServerRpc, a as api } from "./api-client-Cl2DaV5u.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/react.mjs";
import { o as object, n as number, s as string, a as array, c as any, r as record, u as union } from "../_libs/zod.mjs";
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
const quizSchema = object({
  courseId: string().min(1),
  createdAt: number(),
  createdBy: string().min(1),
  description: string().optional(),
  maxAttempts: number().optional(),
  passingScore: number(),
  questions: array(any()),
  timeLimit: number().optional(),
  title: string().min(1),
  updatedAt: number()
});
const createQuizAttemptInputSchema = object({
  courseId: string().min(1),
  quizId: string().min(1),
  studentId: string().min(1)
});
const listQuizAttemptsInputSchema = object({
  courseId: string().optional(),
  quizId: string().optional(),
  studentId: string().optional()
});
const updateQuizAttemptInputSchema = object({
  attemptData: object({
    completedAt: number().optional(),
    rawAnswers: record(string(), union([number(), string()])).optional(),
    timeSpent: number().optional()
  }),
  attemptId: string().min(1)
});
const createQuizFn_createServerFn_handler = createServerRpc({
  id: "a051c5c4a926735cc4a56b6cff8650dfda69daf9c9128aa1892344cc64847797",
  name: "createQuizFn",
  filename: "src/server/quizzes.ts"
}, (opts) => createQuizFn.__executeServer(opts));
const createQuizFn = createServerFn({
  method: "POST"
}).inputValidator(object({
  quizData: quizSchema
})).handler(createQuizFn_createServerFn_handler, async ({
  data
}) => {
  return api.post("/api/quizzes", data);
});
const deleteQuizFn_createServerFn_handler = createServerRpc({
  id: "b063762a9a46a5b06c50af1c35059e2c12a0041111d912d367d5338b316973f8",
  name: "deleteQuizFn",
  filename: "src/server/quizzes.ts"
}, (opts) => deleteQuizFn.__executeServer(opts));
const deleteQuizFn = createServerFn({
  method: "POST"
}).inputValidator(string().min(1)).handler(deleteQuizFn_createServerFn_handler, async ({
  data
}) => {
  return api.delete(`/api/quizzes/${data}`);
});
const getQuizFn_createServerFn_handler = createServerRpc({
  id: "2bc7188bfdd3f5990d4c63e93127f4e760b6aee086ba14fecef6122d8671f22f",
  name: "getQuizFn",
  filename: "src/server/quizzes.ts"
}, (opts) => getQuizFn.__executeServer(opts));
const getQuizFn = createServerFn({
  method: "GET"
}).inputValidator(string().min(1)).handler(getQuizFn_createServerFn_handler, async ({
  data
}) => {
  return api.get(`/api/quizzes/${data}`);
});
const listQuizzesFn_createServerFn_handler = createServerRpc({
  id: "3cbfd46c6fe774d17ad4fe305b347eb7350dc8b6cef9ca09fac2a466d8c0f5af",
  name: "listQuizzesFn",
  filename: "src/server/quizzes.ts"
}, (opts) => listQuizzesFn.__executeServer(opts));
const listQuizzesFn = createServerFn({
  method: "GET"
}).inputValidator(object({
  courseId: string().min(1).optional()
})).handler(listQuizzesFn_createServerFn_handler, async ({
  data
}) => {
  const params = new URLSearchParams();
  if (data.courseId) {
    params.set("courseId", data.courseId);
  }
  return api.get(`/api/quizzes?${params}`);
});
const updateQuizFn_createServerFn_handler = createServerRpc({
  id: "67e9a562d70ef830ac9ae41a87c9f5ef37681620aa12e6ab84d288d161206ee9",
  name: "updateQuizFn",
  filename: "src/server/quizzes.ts"
}, (opts) => updateQuizFn.__executeServer(opts));
const updateQuizFn = createServerFn({
  method: "POST"
}).inputValidator(object({
  quizData: quizSchema.partial(),
  quizId: string().min(1)
})).handler(updateQuizFn_createServerFn_handler, async ({
  data
}) => {
  return api.patch(`/api/quizzes/${data.quizId}`, data.quizData);
});
const createQuizAttemptFn_createServerFn_handler = createServerRpc({
  id: "0f88dad23eda332e01d160b0fd1b6a56b430b22c72743c7e9872e1b4638ea7a5",
  name: "createQuizAttemptFn",
  filename: "src/server/quizzes.ts"
}, (opts) => createQuizAttemptFn.__executeServer(opts));
const createQuizAttemptFn = createServerFn({
  method: "POST"
}).inputValidator(createQuizAttemptInputSchema).handler(createQuizAttemptFn_createServerFn_handler, async ({
  data
}) => {
  return api.post("/api/quiz-attempts", data);
});
const listQuizAttemptsFn_createServerFn_handler = createServerRpc({
  id: "6a30fb413d6891dbd913152ae0aad47ee151aa68069b78c35fbfc3f056629bb4",
  name: "listQuizAttemptsFn",
  filename: "src/server/quizzes.ts"
}, (opts) => listQuizAttemptsFn.__executeServer(opts));
const listQuizAttemptsFn = createServerFn({
  method: "GET"
}).inputValidator(listQuizAttemptsInputSchema).handler(listQuizAttemptsFn_createServerFn_handler, async ({
  data
}) => {
  const params = new URLSearchParams();
  if (data.quizId) params.set("quizId", data.quizId);
  if (data.studentId) params.set("studentId", data.studentId);
  if (data.courseId) params.set("courseId", data.courseId);
  return api.get(`/api/quiz-attempts?${params}`);
});
const updateQuizAttemptFn_createServerFn_handler = createServerRpc({
  id: "47bab93e9e369ef3f9fc4af0d64ca854f9e4c0c108a2193defd10f7b904f2df4",
  name: "updateQuizAttemptFn",
  filename: "src/server/quizzes.ts"
}, (opts) => updateQuizAttemptFn.__executeServer(opts));
const updateQuizAttemptFn = createServerFn({
  method: "POST"
}).inputValidator(updateQuizAttemptInputSchema).handler(updateQuizAttemptFn_createServerFn_handler, async ({
  data
}) => {
  return api.patch(`/api/quiz-attempts/${data.attemptId}`, data.attemptData);
});
export {
  createQuizAttemptFn_createServerFn_handler,
  createQuizFn_createServerFn_handler,
  deleteQuizFn_createServerFn_handler,
  getQuizFn_createServerFn_handler,
  listQuizAttemptsFn_createServerFn_handler,
  listQuizzesFn_createServerFn_handler,
  updateQuizAttemptFn_createServerFn_handler,
  updateQuizFn_createServerFn_handler
};
