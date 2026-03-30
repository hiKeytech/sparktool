import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useLayoutEffect } from "react";

import { getTenant } from "@/actions/tenant";
import { AuthProvider } from "@/providers/auth-provider";

export const Route = createFileRoute("/_tenant")({
  beforeLoad: async () => {
    // 1. Fetch Tenant Config (resolves via headers/url -> db query)
    const tenant = await getTenant();

    // If no tenant is found, we operate in "Platform Mode"
    // (e.g., landing page, platform admin, or generic login)
    // Downstream components must handle matching tenant=null
    
    return {
      tenant: tenant || undefined, 
    };
  },
  component: TenantLayout,
});

function TenantLayout() {
  const { tenant } = Route.useRouteContext();

  useLayoutEffect(() => {
    if (tenant?.config.branding) {
      const root = document.documentElement;
      root.style.setProperty(
        "--color-primary",
        tenant.config.branding.primaryColor
      );
      root.style.setProperty(
        "--color-secondary",
        tenant.config.branding.secondaryColor
      );
    }
  }, [tenant]);

  return (
    <AuthProvider tenant={tenant}>
      <Outlet />
    </AuthProvider>
  );
}
