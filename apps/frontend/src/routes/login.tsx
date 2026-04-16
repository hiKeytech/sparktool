import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useLayoutEffect } from "react";
import { getPlatformConfig } from "@/actions/platform";
import { useResolvedAuthState } from "@/providers/auth-provider";
import type { PlatformConfig } from "@/schemas/platform-config";
import { applyBrandingTheme } from "@/utils/branding-theme";
import { resolveRoleHomeTarget } from "@/utils/tenant-paths";
import { LoginShell } from "@/components/auth/login-shell";

interface PlatformLoginPageProps {
  platform: PlatformConfig;
}

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

interface PlatformLoginPageProps {
  platform: PlatformConfig;
}

function PlatformLoginPage({ platform }: PlatformLoginPageProps) {
  const branding = platform.branding;
  const loginPage = branding.loginPage;

  return (
    <LoginShell
      auth={platform.auth}
      features={loginPage.features}
      footnote={loginPage.footnote}
      formDescription={loginPage.formDescription}
      formTitle={loginPage.formTitle}
      heroHeading={loginPage.heading}
      heroSubheading={loginPage.subheading}
      logoUrl={branding.logoUrl}
      portalName={branding.portalName}
    />
  );
}
