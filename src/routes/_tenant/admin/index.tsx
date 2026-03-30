import { createFileRoute } from "@tanstack/react-router";

import { AdminDashboard } from "@/pages/admin/admin-dashboard";

export const Route = createFileRoute("/_tenant/admin/")({
  component: AdminDashboard,
});
