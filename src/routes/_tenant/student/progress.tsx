import { createFileRoute } from "@tanstack/react-router";

import { StudentProgress } from "@/pages/student/student-progress";

export const Route = createFileRoute("/_tenant/student/progress")({
  component: StudentProgress,
});
