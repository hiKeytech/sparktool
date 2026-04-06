import { createFileRoute } from "@tanstack/react-router";

import { QuizAssessment } from "@/pages/student/quiz-assessment";
import { useAuthContext } from "@/providers/auth-provider";

export const Route = createFileRoute(
  "/$tenant/student/courses/$courseId/quiz/$quizId",
)({
  component: QuizAssessmentRoute,
});

function QuizAssessmentRoute() {
  const { tenant, user } = useAuthContext();

  if (!tenant || !user) {
    return null;
  }

  return <QuizAssessment tenant={tenant} user={user} />;
}
