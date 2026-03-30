import { createFileRoute } from "@tanstack/react-router";

import { SuperAdminRouteGuard } from "@/components/guards/super-admin-route-guard";
import { SuperAdminDashboard } from "@/pages/super-admin/super-admin-dashboard";

export const Route = createFileRoute("/super-admin")({
  component: () => (
    <SuperAdminRouteGuard>
      <SuperAdminDashboard />
    </SuperAdminRouteGuard>
  ),
});
