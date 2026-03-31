import { createFileRoute } from "@tanstack/react-router";

import { StudentDetails } from "@/pages/admin/student-details";
import { useAuthContext } from "@/providers/auth-provider";

export const Route = createFileRoute("/$tenant/admin/users/$studentId")({
  component: StudentDetailsRoute,
});

function StudentDetailsRoute() {
  const { tenant, user } = useAuthContext();

  if (!tenant || !user) {
    return null;
  }

  return <StudentDetails tenant={tenant} user={user} />;
}
