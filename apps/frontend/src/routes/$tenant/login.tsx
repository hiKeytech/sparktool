import { createFileRoute, Navigate } from "@tanstack/react-router";
import { z } from "zod";
import { useResolvedAuthState } from "@/providers/auth-provider";
import { useTenantAdminInvitation } from "@/services/hooks";
import type { Tenant } from "@/schemas/tenant-contract";
import { resolveRoleHomeTarget } from "@/utils/tenant-paths";
import { LoginShell } from "@/components/auth/login-shell";

export const Route = createFileRoute("/$tenant/login")({
  validateSearch: z.object({
    invite: z.string().optional(),
    redirect: z.string().optional(),
  }),
  component: TenantLoginRoute,
});

function TenantLoginRoute() {
  const { tenant } = Route.useRouteContext() as { tenant: Tenant };
  const { invite } = Route.useSearch();
  const { loading, user } = useResolvedAuthState(tenant);
  const { data: invitationPreview, error: invitationError } =
    useTenantAdminInvitation(tenant.id, invite);

  if (!loading && user) {
    return (
      <Navigate replace {...resolveRoleHomeTarget(user.role, tenant.id)} />
    );
  }

  return (
    <TenantLoginPage
      invitationError={invite ? (invitationError?.message ?? null) : null}
      invitationPreview={invitationPreview ?? null}
      invitationToken={invite}
      tenant={tenant}
    />
  );
}

interface TenantLoginPageProps {
  invitationError: null | string;
  invitationPreview: ReturnType<typeof useTenantAdminInvitation>["data"] | null;
  invitationToken?: string;
  tenant: Tenant;
}

function TenantLoginPage({
  invitationError,
  invitationPreview,
  invitationToken,
  tenant,
}: TenantLoginPageProps) {
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
      invitationError={invitationError}
      invitationPreview={invitationPreview}
      invitationToken={invitationToken}
      logoUrl={branding.logoUrl}
      portalName={branding.portalName}
    />
  );
}
