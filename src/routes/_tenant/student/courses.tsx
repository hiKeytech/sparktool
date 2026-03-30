import { createFileRoute } from "@tanstack/react-router";

import { CourseCatalog } from "@/pages/student/course-catalog";

export const Route = createFileRoute("/_tenant/student/courses")({
  component: CourseCatalog,
});
