import { createFileRoute } from "@tanstack/react-router";

import { QuizDetails } from "@/pages/admin/quiz-details";
import { useAuthContext } from "@/providers/auth-provider";

export const Route = createFileRoute("/$tenant/admin/quizzes/$quizId")({
  component: QuizDetailsRoute,
});

function QuizDetailsRoute() {
  const { tenant } = useAuthContext();

  if (!tenant) {
    return null;
  }

  return <QuizDetails tenant={tenant} />;
}
