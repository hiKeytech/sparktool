import { createFileRoute, Navigate } from "@tanstack/react-router";

import Landing from "@/pages/public/landing";
import { useResolvedAuthState } from "@/providers/auth-provider";
import type { Tenant } from "@/schemas/tenant-contract";
import { resolveRoleHomeTarget } from "@/utils/tenant-paths";

export const Route = createFileRoute("/$tenant/")({
  component: TenantLandingRoute,
});

function TenantLandingRoute() {
  const { tenant } = Route.useRouteContext() as { tenant: Tenant };
  const { loading, user } = useResolvedAuthState(tenant);

  if (!loading && user) {
    return (
      <Navigate replace {...resolveRoleHomeTarget(user.role, tenant.id)} />
    );
  }

  return <Landing tenant={tenant} />;
}
