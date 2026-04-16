import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/$tenant/admin/users")({
  component: Outlet,
});
