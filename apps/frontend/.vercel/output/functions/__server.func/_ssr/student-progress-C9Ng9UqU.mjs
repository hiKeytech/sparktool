import { c as createServerRpc, a as api } from "./api-client-Cl2DaV5u.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/react.mjs";
import { o as object, n as number, s as string, _ as _enum, a as array, c as any, r as record, b as boolean } from "../_libs/zod.mjs";
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
const createStudentProgressInputSchema = object({
  averageQuizScore: number().optional(),
  completedAt: number().nullable().optional(),
  completionPercentage: number().optional(),
  courseId: string().min(1),
  currentLessonId: string().optional(),
  currentLessonPosition: number().optional(),
  currentSectionId: string().optional(),
  enrolledAt: number().optional(),
  estimatedTimeRemaining: number().optional(),
  lastAccessedAt: number().optional(),
  quizzesPassed: number().optional(),
  sectionProgress: array(any()).optional(),
  startedAt: number().optional(),
  status: _enum(["completed", "dropped", "enrolled", "in-progress"]).optional(),
  studentId: string().min(1),
  tenantId: string().min(1),
  timeSpentMinutes: number().optional(),
  totalLessonsCompleted: number().optional(),
  totalOptionalLessonsCompleted: number().optional(),
  totalQuizzesTaken: number().optional(),
  totalRequiredLessons: number().optional()
});
const getStudentProgressInputSchema = object({
  courseId: string().optional(),
  studentId: string().optional()
});
const listStudentProgressInputSchema = object({
  studentId: string().min(1),
  tenantId: string().optional().nullable()
});
const updateStudentProgressInputSchema = object({
  progressData: record(string(), any()),
  progressId: string().min(1)
});
const upsertCourseProgressSummaryInputSchema = object({
  calculatedProgress: object({
    completionPercentage: number(),
    courseId: string().min(1),
    isCompleted: boolean(),
    studentId: string().min(1),
    totalLessonsCompleted: number(),
    totalOptionalLessonsCompleted: number(),
    totalRequiredLessons: number(),
    totalTimeSpent: number()
  }),
  tenantId: string().min(1)
});
const createStudentProgressFn_createServerFn_handler = createServerRpc({
  id: "14f092159c4bdbc632f58e19a47c571cd61fa796b5a7e00c059463cd25d66df1",
  name: "createStudentProgressFn",
  filename: "src/server/student-progress.ts"
}, (opts) => createStudentProgressFn.__executeServer(opts));
const createStudentProgressFn = createServerFn({
  method: "POST"
}).inputValidator(createStudentProgressInputSchema).handler(createStudentProgressFn_createServerFn_handler, async ({
  data
}) => {
  return api.post("/api/student-progress", {
    progressData: data
  });
});
const getStudentProgressFn_createServerFn_handler = createServerRpc({
  id: "2cbaedada9014739f1ad4a0f6b69c8cfe85e4303580d387dc21b0cfe52e629fd",
  name: "getStudentProgressFn",
  filename: "src/server/student-progress.ts"
}, (opts) => getStudentProgressFn.__executeServer(opts));
const getStudentProgressFn = createServerFn({
  method: "GET"
}).inputValidator(getStudentProgressInputSchema).handler(getStudentProgressFn_createServerFn_handler, async ({
  data
}) => {
  const params = new URLSearchParams();
  if (data.studentId) params.set("studentId", data.studentId);
  if (data.courseId) params.set("courseId", data.courseId);
  return api.get(`/api/student-progress?${params}`);
});
const listStudentProgressFn_createServerFn_handler = createServerRpc({
  id: "3616758639312335a38328c3e31c5c1bf6dbd86f6c67967880914f6c5103fbca",
  name: "listStudentProgressFn",
  filename: "src/server/student-progress.ts"
}, (opts) => listStudentProgressFn.__executeServer(opts));
const listStudentProgressFn = createServerFn({
  method: "GET"
}).inputValidator(listStudentProgressInputSchema).handler(listStudentProgressFn_createServerFn_handler, async ({
  data
}) => {
  return api.get(`/api/student-progress/student/${data.studentId}`);
});
const updateStudentProgressFn_createServerFn_handler = createServerRpc({
  id: "dea2c76e79df56db35ee532bc2bd211d0e8edd48a6027f97be7a98773ef5841b",
  name: "updateStudentProgressFn",
  filename: "src/server/student-progress.ts"
}, (opts) => updateStudentProgressFn.__executeServer(opts));
const updateStudentProgressFn = createServerFn({
  method: "POST"
}).inputValidator(updateStudentProgressInputSchema).handler(updateStudentProgressFn_createServerFn_handler, async ({
  data
}) => {
  return api.patch(`/api/student-progress/${data.progressId}`, data.progressData);
});
const upsertCourseProgressSummaryFn_createServerFn_handler = createServerRpc({
  id: "a5df79ec842f2711578937fda1fb527198d6c2e4454899d27e0e5959854ffb30",
  name: "upsertCourseProgressSummaryFn",
  filename: "src/server/student-progress.ts"
}, (opts) => upsertCourseProgressSummaryFn.__executeServer(opts));
const upsertCourseProgressSummaryFn = createServerFn({
  method: "POST"
}).inputValidator(upsertCourseProgressSummaryInputSchema).handler(upsertCourseProgressSummaryFn_createServerFn_handler, async ({
  data
}) => {
  return api.post("/api/student-progress/upsert", data);
});
export {
  createStudentProgressFn_createServerFn_handler,
  getStudentProgressFn_createServerFn_handler,
  listStudentProgressFn_createServerFn_handler,
  updateStudentProgressFn_createServerFn_handler,
  upsertCourseProgressSummaryFn_createServerFn_handler
};
