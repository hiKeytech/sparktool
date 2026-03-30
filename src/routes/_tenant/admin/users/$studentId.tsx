import { createFileRoute } from "@tanstack/react-router";

import { StudentDetails } from "@/pages/admin/student-details";

export const Route = createFileRoute("/_tenant/admin/users/$studentId")({
  component: StudentDetails,
});
