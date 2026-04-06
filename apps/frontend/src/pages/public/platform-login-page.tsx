import { LoginShell } from "@/components/auth/login-shell";
import type { PlatformConfig } from "@/schemas/platform-config";

interface PlatformLoginPageProps {
  platform: PlatformConfig;
}

export function PlatformLoginPage({ platform }: PlatformLoginPageProps) {
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
