import { createFileRoute } from "@tanstack/react-router";

import { AdminDashboard } from "@/pages/admin/admin-dashboard";
import { useAuthContext } from "@/providers/auth-provider";

export const Route = createFileRoute("/$tenant/admin/")({
  component: AdminDashboardRoute,
});

function AdminDashboardRoute() {
  const { tenant } = useAuthContext();

  if (!tenant) {
    return null;
  }

  return <AdminDashboard tenant={tenant} />;
}
