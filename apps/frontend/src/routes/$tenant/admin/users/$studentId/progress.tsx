import { createFileRoute } from "@tanstack/react-router";

import { StudentProgressMonitoring } from "@/pages/admin/student-progress-monitoring";
import { useAuthContext } from "@/providers/auth-provider";

export const Route = createFileRoute(
  "/$tenant/admin/users/$studentId/progress",
)({
  component: StudentProgressMonitoringRoute,
});

function StudentProgressMonitoringRoute() {
  const { tenant } = useAuthContext();

  if (!tenant) {
    return null;
  }

  return <StudentProgressMonitoring tenant={tenant} />;
}
