import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/$tenant/admin/quizzes")({
  component: Outlet,
});
