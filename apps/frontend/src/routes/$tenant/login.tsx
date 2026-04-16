import { createFileRoute, Navigate } from "@tanstack/react-router";
import { useResolvedAuthState } from "@/providers/auth-provider";
import type { Tenant } from "@/schemas/tenant-contract";
import { resolveRoleHomeTarget } from "@/utils/tenant-paths";
import { LoginShell } from "@/components/auth/login-shell";

export const Route = createFileRoute("/$tenant/login")({
  component: TenantLoginRoute,
});

function TenantLoginRoute() {
  const { tenant } = Route.useRouteContext() as { tenant: Tenant };
  const { loading, user } = useResolvedAuthState(tenant);

  if (!loading && user) {
    return (
      <Navigate replace {...resolveRoleHomeTarget(user.role, tenant.id)} />
    );
  }

  return <TenantLoginPage tenant={tenant} />;
}

interface TenantLoginPageProps {
  tenant: Tenant;
}

function TenantLoginPage({ tenant }: TenantLoginPageProps) {
  const branding = tenant.config.branding;
  const loginPage = branding.loginPage;

  return (
    <LoginShell
      auth={tenant.config.auth}
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
