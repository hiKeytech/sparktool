import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useLayoutEffect } from "react";

import { getPlatformConfig } from "@/actions/platform";
import { PlatformLandingPage } from "@/pages/public/platform-landing";
import { useResolvedAuthState } from "@/providers/auth-provider";
import type { PlatformConfig } from "@/schemas/platform-config";
import { applyBrandingTheme } from "@/utils/branding-theme";
import { resolveRoleHomeTarget } from "@/utils/tenant-paths";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const platform = await getPlatformConfig();

    if (!platform) {
      throw new Error("Platform configuration is not available.");
    }

    return { platform };
  },
  component: PlatformLandingRoute,
});

function PlatformLandingRoute() {
  const { platform } = Route.useRouteContext() as { platform: PlatformConfig };
  const { loading, session, user } = useResolvedAuthState();

  useLayoutEffect(() => {
    applyBrandingTheme({
      ...platform.branding,
      description: platform.marketing.heroDescription,
    });
  }, [platform]);

  if (!loading && user) {
    return (
      <Navigate
        replace
        {...resolveRoleHomeTarget(user.role, session?.tenantIds?.[0])}
      />
    );
  }

  return <PlatformLandingPage platform={platform} />;
}
