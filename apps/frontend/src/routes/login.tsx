import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useLayoutEffect } from "react";
import { getPlatformConfig } from "@/actions/platform";
import { ServiceUnavailable } from "@/components/service-unavailable";
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
    return { platform };
  },
  component: PlatformLoginRoute,
});

function PlatformLoginRoute() {
  const { platform } = Route.useRouteContext() as {
    platform: PlatformConfig | null;
  };
  const { loading, session, user } = useResolvedAuthState();

  useLayoutEffect(() => {
    if (!platform) return;
    applyBrandingTheme({
      ...platform.branding,
      description: platform.branding.loginPage.subheading,
    });
  }, [platform]);

  if (!platform) return <ServiceUnavailable />;

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
