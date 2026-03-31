import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useLayoutEffect } from "react";

import { getPlatformConfig } from "@/actions/platform";
import { PlatformLoginPage } from "@/pages/public/platform-login-page";
import { useResolvedAuthState } from "@/providers/auth-provider";
import type { PlatformConfig } from "@/schemas/platform-config";
import { applyBrandingTheme } from "@/utils/branding-theme";
import { resolveRoleHomeTarget } from "@/utils/tenant-paths";

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    const platform = await getPlatformConfig();

    if (!platform) {
      throw new Error("Platform configuration is not available.");
    }

    return { platform };
  },
  component: PlatformLoginRoute,
});

function PlatformLoginRoute() {
  const { platform } = Route.useRouteContext() as { platform: PlatformConfig };
  const { loading, session, user } = useResolvedAuthState();

  useLayoutEffect(() => {
    applyBrandingTheme({
      ...platform.branding,
      description: platform.branding.loginPage.subheading,
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

  return <PlatformLoginPage platform={platform} />;
}
