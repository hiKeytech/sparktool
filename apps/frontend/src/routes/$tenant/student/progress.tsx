import { createFileRoute } from "@tanstack/react-router";

import { StudentProgress } from "@/pages/student/student-progress";
import { useAuthContext } from "@/providers/auth-provider";

export const Route = createFileRoute("/$tenant/student/progress")({
  component: StudentProgressRoute,
});

function StudentProgressRoute() {
  const { user } = useAuthContext();

  if (!user) {
    return null;
  }

  return <StudentProgress user={user} />;
}
