import { createFileRoute } from "@tanstack/react-router";

import { CourseDetails } from "@/pages/student/course-details";

export const Route = createFileRoute("/_tenant/student/courses/$courseId")({
  component: CourseDetails,
});
