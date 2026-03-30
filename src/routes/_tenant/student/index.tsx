import { createFileRoute } from "@tanstack/react-router";

import { StudentDashboard } from "@/pages/student/student-dashboard";

export const Route = createFileRoute("/_tenant/student/")({
  component: StudentDashboard,
});
