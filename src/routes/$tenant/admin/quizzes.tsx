import { createFileRoute } from "@tanstack/react-router";

import { QuizManagement } from "@/pages/admin/quiz-management";
import { useAuthContext } from "@/providers/auth-provider";

export const Route = createFileRoute("/$tenant/admin/quizzes")({
  component: QuizManagementRoute,
});

function QuizManagementRoute() {
  const { tenant, user } = useAuthContext();

  if (!tenant || !user) {
    return null;
  }

  return <QuizManagement tenant={tenant} user={user} />;
}
