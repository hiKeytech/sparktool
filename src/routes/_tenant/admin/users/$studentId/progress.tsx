import { createFileRoute } from "@tanstack/react-router";

import { StudentProgressMonitoring } from "@/pages/admin/student-progress-monitoring";

export const Route = createFileRoute("/_tenant/admin/users/$studentId/progress")({
  component: StudentProgressMonitoring,
});
