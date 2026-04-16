import { createFileRoute } from "@tanstack/react-router";
import { CourseDetails } from "../$courseId";

export const Route = createFileRoute("/$tenant/student/courses/$courseId/")({
  component: CourseDetails,
});
