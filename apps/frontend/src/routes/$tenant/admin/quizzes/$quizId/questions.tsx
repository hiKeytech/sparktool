import { createFileRoute } from "@tanstack/react-router";

import { QuizQuestionManagement } from "@/pages/admin/quiz-question-management";
import { useAuthContext } from "@/providers/auth-provider";

export const Route = createFileRoute(
  "/$tenant/admin/quizzes/$quizId/questions",
)({
  component: QuizQuestionManagementRoute,
});

function QuizQuestionManagementRoute() {
  const { tenant } = useAuthContext();

  if (!tenant) {
    return null;
  }

  return <QuizQuestionManagement tenant={tenant} />;
}
