import { createFileRoute } from "@tanstack/react-router";

import { StudentProgress } from "@/pages/student/student-progress";
import { useAuthContext } from "@/providers/auth-provider";

export const Route = createFileRoute("/$tenant/student/progress")({
  component: StudentProgressRoute,
});

function StudentProgressRoute() {
  const { tenant, user } = useAuthContext();

  if (!tenant || !user) return null;

  return <StudentProgress tenant={tenant} user={user} />;
}
