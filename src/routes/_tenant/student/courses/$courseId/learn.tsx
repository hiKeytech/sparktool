import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { CourseView } from "@/pages/student/course-view";

export const Route = createFileRoute("/_tenant/student/courses/$courseId/learn")({
  component: CourseView,
  validateSearch: z.object({
    lesson: z.string().optional(),
  }),
});
