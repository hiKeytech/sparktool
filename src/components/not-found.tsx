import { Navigate } from "@tanstack/react-router";

import { useResolvedAuthState } from "@/providers/auth-provider";
import {
  extractTenantIdFromPath,
  resolveRoleHomeTarget,
} from "@/utils/tenant-paths";

export function NotFound() {
  const { loading, session, user } = useResolvedAuthState();
  const tenantId =
    typeof window === "undefined"
      ? session?.tenantIds?.[0]
      : (extractTenantIdFromPath(window.location.pathname) ??
        session?.tenantIds?.[0]);

  if (loading) return null;

  return <Navigate replace {...resolveRoleHomeTarget(user?.role, tenantId)} />;
}
