import { createFileRoute } from "@tanstack/react-router";

import { CourseManagement } from "@/pages/admin/course-management";
import { useAuthContext } from "@/providers/auth-provider";

export const Route = createFileRoute("/$tenant/admin/courses")({
  component: CourseManagementRoute,
});

function CourseManagementRoute() {
  const { tenant, user } = useAuthContext();

  if (!tenant || !user) {
    return null;
  }

  return <CourseManagement tenant={tenant} user={user} />;
}
