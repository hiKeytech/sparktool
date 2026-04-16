import { createFileRoute } from "@tanstack/react-router";
import { CourseCatalog } from "../courses";

export const Route = createFileRoute("/$tenant/student/courses/")({
  component: CourseCatalog,
});
