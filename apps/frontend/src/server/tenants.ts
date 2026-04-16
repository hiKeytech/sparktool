import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  createTenantOnboardingInputSchema,
  createTenantInputSchema,
  tenantConfigSchema,
  tenantIdSchema,
  tenantSchema,
  updateTenantInputSchema,
} from "@/schemas/tenant-contract";
import {
  type AdminInvitationPreview,
  type AdminInvitationSummary,
} from "sparktool-contracts/invitation";
import { api } from "@/lib/api-client";
import { requireAuthenticatedUser } from "@/server/tenant-context";

type Tenant = z.infer<typeof tenantSchema>;
type TenantOnboardingResponse = {
  invitation: AdminInvitationPreview;
  invitationToken: string;
  tenant: Tenant;
};

const invitationActionInputSchema = z.object({
  invitationId: z.string().trim().min(1),
  tenantId: tenantIdSchema,
});

function normalizeTenantHost(value: null | string | undefined): null | string {
  if (!value) return null;
  const candidate = value
    .split(",")[0]!
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "");
  const host = candidate.split("/")[0]?.trim();
  if (!host) return null;
  if (host.startsWith("[")) {
    const i = host.indexOf("]");
    return i === -1 ? host : host.slice(0, i + 1);
  }
  return host.split(":")[0]?.trim() || null;
}

function normalizeTenantRecord(input: {
  config: z.infer<typeof tenantConfigSchema>;
  domain: string;
  id: string;
  name: string;
  subscriptionStatus?: "active" | "inactive" | "trial";
}) {
  const normalizedId = input.id.trim().toLowerCase();
  const normalizedDomain = normalizeTenantHost(input.domain);

  if (!normalizedDomain) {
    throw new Error("A valid tenant domain is required.");
  }

  const restrictedDomains = Array.from(
    new Set(
      (input.config.auth.restrictedDomains || input.config.auth.domains || [])
        .map(
          (domain) =>
            normalizeTenantHost(domain) || domain.trim().toLowerCase(),
        )
        .filter(Boolean),
    ),
  );

  return tenantSchema.parse({
    config: {
      ...input.config,
      auth: {
        ...input.config.auth,
        domains: restrictedDomains,
        restrictedDomains,
      },
    },
    domain: normalizedDomain,
    id: normalizedId,
    name: input.name.trim(),
    subscriptionStatus: input.subscriptionStatus ?? "trial",
  });
}

async function requireSuperAdmin() {
  const actor = await requireAuthenticatedUser();

  if (actor.role !== "super-admin") {
    throw new Error("Only platform administrators can manage tenants.");
  }

  return actor;
}

export const createTenantFn = createServerFn({ method: "POST" })
  .inputValidator(createTenantInputSchema)
  .handler(async ({ data }) => {
    await requireSuperAdmin();
    const tenant = normalizeTenantRecord(data);
    return api.post<Tenant>("/api/tenants", tenant);
  });

export const createTenantOnboardingFn = createServerFn({ method: "POST" })
  .inputValidator(createTenantOnboardingInputSchema)
  .handler(async ({ data }) => {
    await requireSuperAdmin();

    return api.post<TenantOnboardingResponse>("/api/tenants/onboard", {
      initialAdminInvitation: {
        displayName: data.initialAdminInvitation.displayName?.trim() || null,
        email: data.initialAdminInvitation.email.trim().toLowerCase(),
      },
      tenant: normalizeTenantRecord(data.tenant),
    });
  });

export const getTenantByIdFn = createServerFn({ method: "GET" })
  .inputValidator(tenantIdSchema)
  .handler(async ({ data }) => {
    await requireSuperAdmin();
    return api.get<Tenant>(`/api/tenants/${data}`);
  });

export const listTenantsFn = createServerFn({ method: "GET" }).handler(
  async () => {
    await requireSuperAdmin();
    return api.get<Tenant[]>("/api/tenants");
  },
);

export const updateTenantFn = createServerFn({ method: "POST" })
  .inputValidator(updateTenantInputSchema)
  .handler(async ({ data }) => {
    await requireSuperAdmin();

    const existingTenant = await api.get<z.infer<typeof tenantSchema>>(
      `/api/tenants/${data.tenantId}`,
    );

    if (!existingTenant) {
      throw new Error("Tenant not found.");
    }

    const nextTenant = normalizeTenantRecord({
      config: {
        ...existingTenant.config,
        ...data.tenantData.config,
      },
      domain: data.tenantData.domain ?? existingTenant.domain,
      id: existingTenant.id,
      name: data.tenantData.name ?? existingTenant.name,
      subscriptionStatus:
        data.tenantData.subscriptionStatus ?? existingTenant.subscriptionStatus,
    });

    return api.patch<Tenant>(`/api/tenants/${data.tenantId}`, nextTenant);
  });

export const listTenantAdminInvitationsFn = createServerFn({
  method: "GET",
}).handler(async () => {
  await requireSuperAdmin();
  return api.get<AdminInvitationSummary[]>(
    "/api/tenants/admin-invitations/all",
  );
});

export const reissueTenantAdminInvitationFn = createServerFn({ method: "POST" })
  .inputValidator(invitationActionInputSchema)
  .handler(async ({ data }) => {
    await requireSuperAdmin();
    return api.post<{
      invitation: AdminInvitationSummary;
      invitationToken: string;
    }>(
      `/api/tenants/${data.tenantId}/admin-invitations/${data.invitationId}/reissue`,
      {},
    );
  });

export const revokeTenantAdminInvitationFn = createServerFn({ method: "POST" })
  .inputValidator(invitationActionInputSchema)
  .handler(async ({ data }) => {
    await requireSuperAdmin();
    return api.post<{ success: true }>(
      `/api/tenants/${data.tenantId}/admin-invitations/${data.invitationId}/revoke`,
      {},
    );
  });
