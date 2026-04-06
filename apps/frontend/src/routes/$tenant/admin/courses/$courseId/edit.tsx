import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod/v4";

import { CourseBuilder } from "@/pages/admin/course-builder";
import { useAuthContext } from "@/providers/auth-provider";

export const Route = createFileRoute("/$tenant/admin/courses/$courseId/edit")({
  component: CourseBuilderRoute,
  params: {
    parse: z.object({
      courseId: z.string(),
    }).parse,
  },
});

function CourseBuilderRoute() {
  const { tenant } = useAuthContext();

  if (!tenant) {
    return null;
  }

  return <CourseBuilder tenant={tenant} />;
}
