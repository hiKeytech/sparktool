import { createBuilder } from "@ibnlanre/builder";

import { activityLogs } from "@/schemas/activity-log";
import { authService as auth } from "@/services/auth-service";
import { certificates } from "@/schemas/certificates";
import { course } from "@/schemas/course";
import { courseLesson } from "@/schemas/course-lesson";
import { courseProgress } from "@/schemas/course-progress";
import { courseQuiz, quiz } from "@/schemas/course-quiz";
import { courseSection } from "@/schemas/course-section";
import { dashboard } from "@/schemas/dashboard";
import { lessonProgress } from "@/schemas/lesson-progress";
import { lessonResource } from "@/schemas/lesson-resource";
import { liveSessions } from "@/schemas/live-session";
import { notification } from "@/schemas/notification";
import { quizAttempt } from "@/schemas/quiz-attempt";
import { studentProgress } from "@/schemas/student-progress";
import { tenant } from "@/schemas/tenant";
import { user } from "@/schemas/user";

export const api = createBuilder({
  activityLogs,
  auth,
  certificates,
  course,
  courseLesson,
  courseProgress,
  courseQuiz,
  courseSection,
  dashboard,
  lessonProgress,
  lessonResource,
  liveSessions,
  notification,
  quiz,
  quizAttempt,
  studentProgress,
  tenant,
  user,
});
