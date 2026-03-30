import { createFileRoute } from "@tanstack/react-router";

import { CourseManagement } from "@/pages/admin/course-management";

export const Route = createFileRoute("/_tenant/admin/courses")({
  component: CourseManagement,
});
