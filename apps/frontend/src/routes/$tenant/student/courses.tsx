import { createFileRoute } from "@tanstack/react-router";

import { CourseCatalog } from "@/pages/student/course-catalog";
import { useAuthContext } from "@/providers/auth-provider";

export const Route = createFileRoute("/$tenant/student/courses")({
  component: CourseCatalogRoute,
});

function CourseCatalogRoute() {
  const { tenant, user } = useAuthContext();

  if (!tenant || !user) {
    return null;
  }

  return <CourseCatalog tenant={tenant} user={user} />;
}
