import { SuperAdminSidebar } from "@/components/layout/super-admin-sidebar";

import { LoadingOverlay } from "@mantine/core";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

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

  return (
    <div className="flex bg-stone-50 min-h-screen">
      <SuperAdminSidebar />
      <main className="flex-1 w-full lg:ml-64 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
