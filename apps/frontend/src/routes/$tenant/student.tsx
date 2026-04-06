import { LoadingOverlay } from "@mantine/core";
import { createFileRoute, Navigate } from "@tanstack/react-router";

import { StudentLayout } from "@/components/layouts/student-layout";
import { useResolvedAuthState } from "@/providers/auth-provider";
import type { Tenant } from "@/schemas/tenant-contract";

export const Route = createFileRoute("/$tenant/student")({
  component: TenantStudentRoute,
});

function TenantStudentRoute() {
  const { tenant } = Route.useRouteContext() as { tenant: Tenant };
  const auth = useResolvedAuthState(tenant);
  const { hasTenantAccess, loading, user } = auth;

  if (loading) {
    return <LoadingOverlay visible />;
  }

  if (!user || !hasTenantAccess) {
    return (
      <Navigate params={{ tenant: tenant.id }} replace to="/$tenant/login" />
    );
  }

  if (user.role === "super-admin") {
    return <Navigate replace to="/super-admin" />;
  }

  if (user.role !== "student") {
    return (
      <Navigate params={{ tenant: tenant.id }} replace to="/$tenant/admin" />
    );
  }

  return <StudentLayout auth={auth} />;
}
