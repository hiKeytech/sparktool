import { createFileRoute } from "@tanstack/react-router";
import { StudentDetails } from "../$studentId";

export const Route = createFileRoute("/$tenant/admin/users/$studentId/")({
  component: StudentDetails,
});
