import { createFileRoute } from "@tanstack/react-router";

import { AdminRouteGuard } from "@/components/guards/admin-route-guard";
import { AdminLayout } from "@/components/layouts/admin-layout";

export const Route = createFileRoute("/_tenant/admin")({
  component: () => (
    <AdminRouteGuard>
      <AdminLayout />
    </AdminRouteGuard>
  ),
});
