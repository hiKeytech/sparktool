import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { CourseView } from "@/pages/student/course-view";
import { useAuthContext } from "@/providers/auth-provider";

export const Route = createFileRoute(
  "/$tenant/student/courses/$courseId/learn",
)({
  component: CourseViewRoute,
  validateSearch: z.object({
    lesson: z.string().optional(),
  }),
});

function CourseViewRoute() {
  const { tenant, user } = useAuthContext();

  if (!tenant || !user) {
    return null;
  }

  return <CourseView tenant={tenant} user={user} />;
}
