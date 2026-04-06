import { LoginShell } from "@/components/auth/login-shell";
import type { Tenant } from "@/schemas/tenant-contract";

interface TenantLoginPageProps {
  tenant: Tenant;
}

export function TenantLoginPage({ tenant }: TenantLoginPageProps) {
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
