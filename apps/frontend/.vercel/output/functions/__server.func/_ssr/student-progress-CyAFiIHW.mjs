import { c as createSsrRpc } from "./course-structure-D2f1-VM0.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/react.mjs";
import { o as object, s as string, r as record, c as any, n as number, _ as _enum, a as array, b as boolean } from "../_libs/zod.mjs";
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
const createStudentProgressFn = createServerFn({
  method: "POST"
}).inputValidator(createStudentProgressInputSchema).handler(createSsrRpc("14f092159c4bdbc632f58e19a47c571cd61fa796b5a7e00c059463cd25d66df1"));
const getStudentProgressFn = createServerFn({
  method: "GET"
}).inputValidator(getStudentProgressInputSchema).handler(createSsrRpc("2cbaedada9014739f1ad4a0f6b69c8cfe85e4303580d387dc21b0cfe52e629fd"));
const listStudentProgressFn = createServerFn({
  method: "GET"
}).inputValidator(listStudentProgressInputSchema).handler(createSsrRpc("3616758639312335a38328c3e31c5c1bf6dbd86f6c67967880914f6c5103fbca"));
const updateStudentProgressFn = createServerFn({
  method: "POST"
}).inputValidator(updateStudentProgressInputSchema).handler(createSsrRpc("dea2c76e79df56db35ee532bc2bd211d0e8edd48a6027f97be7a98773ef5841b"));
const upsertCourseProgressSummaryFn = createServerFn({
  method: "POST"
}).inputValidator(upsertCourseProgressSummaryInputSchema).handler(createSsrRpc("a5df79ec842f2711578937fda1fb527198d6c2e4454899d27e0e5959854ffb30"));
export {
  createStudentProgressFn,
  getStudentProgressFn,
  listStudentProgressFn,
  updateStudentProgressFn,
  upsertCourseProgressSummaryFn
};
