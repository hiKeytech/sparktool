import { LoadingOverlay } from "@mantine/core";
import { createFileRoute, Navigate } from "@tanstack/react-router";

import { SuperAdminDashboard } from "@/pages/super-admin/super-admin-dashboard";
import { useResolvedAuthState } from "@/providers/auth-provider";
import { resolveRoleHomeTarget } from "@/utils/tenant-paths";

export const Route = createFileRoute("/super-admin")({
  component: SuperAdminRoute,
});

function SuperAdminRoute() {
  const { loading, session, user } = useResolvedAuthState();

  if (loading) {
    return <LoadingOverlay visible />;
  }

  if (!user) {
    return <Navigate replace to="/login" />;
  }

  if (user.role !== "super-admin") {
    return (
      <Navigate
        replace
        {...resolveRoleHomeTarget(user.role, session?.tenantIds?.[0])}
      />
    );
  }

  return <SuperAdminDashboard />;
}
