import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod/v4";

import { CourseBuilder } from "@/pages/admin/course-builder";

export const Route = createFileRoute("/_tenant/admin/courses/$courseId/edit")({
  component: CourseBuilder,
  params: {
    parse: z.object({
      courseId: z.string(),
    }).parse,
  },
});
