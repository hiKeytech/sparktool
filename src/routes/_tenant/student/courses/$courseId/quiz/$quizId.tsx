import { createFileRoute } from "@tanstack/react-router";

import { QuizAssessment } from "@/pages/student/quiz-assessment";

export const Route = createFileRoute(
  "/_tenant/student/courses/$courseId/quiz/$quizId"
)({
  component: QuizAssessment,
});
