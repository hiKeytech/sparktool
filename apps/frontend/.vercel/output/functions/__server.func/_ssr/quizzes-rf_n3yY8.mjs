import { c as createSsrRpc } from "./course-structure-D2f1-VM0.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/react.mjs";
import { o as object, s as string, n as number, r as record, u as union, a as array, c as any } from "../_libs/zod.mjs";
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
const createQuizFn = createServerFn({
  method: "POST"
}).inputValidator(object({
  quizData: quizSchema
})).handler(createSsrRpc("a051c5c4a926735cc4a56b6cff8650dfda69daf9c9128aa1892344cc64847797"));
const deleteQuizFn = createServerFn({
  method: "POST"
}).inputValidator(string().min(1)).handler(createSsrRpc("b063762a9a46a5b06c50af1c35059e2c12a0041111d912d367d5338b316973f8"));
const getQuizFn = createServerFn({
  method: "GET"
}).inputValidator(string().min(1)).handler(createSsrRpc("2bc7188bfdd3f5990d4c63e93127f4e760b6aee086ba14fecef6122d8671f22f"));
const listQuizzesFn = createServerFn({
  method: "GET"
}).inputValidator(object({
  courseId: string().min(1).optional()
})).handler(createSsrRpc("3cbfd46c6fe774d17ad4fe305b347eb7350dc8b6cef9ca09fac2a466d8c0f5af"));
const updateQuizFn = createServerFn({
  method: "POST"
}).inputValidator(object({
  quizData: quizSchema.partial(),
  quizId: string().min(1)
})).handler(createSsrRpc("67e9a562d70ef830ac9ae41a87c9f5ef37681620aa12e6ab84d288d161206ee9"));
const createQuizAttemptFn = createServerFn({
  method: "POST"
}).inputValidator(createQuizAttemptInputSchema).handler(createSsrRpc("0f88dad23eda332e01d160b0fd1b6a56b430b22c72743c7e9872e1b4638ea7a5"));
const listQuizAttemptsFn = createServerFn({
  method: "GET"
}).inputValidator(listQuizAttemptsInputSchema).handler(createSsrRpc("6a30fb413d6891dbd913152ae0aad47ee151aa68069b78c35fbfc3f056629bb4"));
const updateQuizAttemptFn = createServerFn({
  method: "POST"
}).inputValidator(updateQuizAttemptInputSchema).handler(createSsrRpc("47bab93e9e369ef3f9fc4af0d64ca854f9e4c0c108a2193defd10f7b904f2df4"));
export {
  createQuizAttemptFn,
  createQuizFn,
  deleteQuizFn,
  getQuizFn,
  listQuizAttemptsFn,
  listQuizzesFn,
  updateQuizAttemptFn,
  updateQuizFn
};
