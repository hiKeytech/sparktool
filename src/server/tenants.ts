import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  createTenantInputSchema,
  tenantConfigSchema,
  tenantIdSchema,
  tenantSchema,
  updateTenantInputSchema,
} from "@/schemas/tenant-contract";
import { tenantRepository } from "@/server/repositories/tenant-repository";
import {
  normalizeTenantHost,
  requireAuthenticatedUser,
} from "@/server/tenant-context";

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
    const [existingById, existingByDomain] = await Promise.all([
      tenantRepository.getById(tenant.id),
      tenantRepository.getByDomain(tenant.domain),
    ]);

    if (existingById) {
      throw new Error("A tenant with this ID already exists.");
    }

    if (existingByDomain) {
      throw new Error("A tenant with this domain already exists.");
    }

    const createdTenant = await tenantRepository.create(tenant);

    if (!createdTenant) {
      throw new Error("Failed to create tenant.");
    }

    return createdTenant;
  });

export const getTenantByIdFn = createServerFn({ method: "GET" })
  .inputValidator(tenantIdSchema)
  .handler(async ({ data }) => {
    await requireSuperAdmin();
    return tenantRepository.getById(data);
  });

export const listTenantsFn = createServerFn({ method: "GET" }).handler(
  async () => {
    await requireSuperAdmin();
    return tenantRepository.list();
  },
);

export const updateTenantFn = createServerFn({ method: "POST" })
  .inputValidator(updateTenantInputSchema)
  .handler(async ({ data }) => {
    await requireSuperAdmin();

    const existingTenant = await tenantRepository.getById(data.tenantId);

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

    const duplicateTenant = await tenantRepository.getByDomain(
      nextTenant.domain,
    );

    if (duplicateTenant && duplicateTenant.id !== existingTenant.id) {
      throw new Error("Another tenant already uses this domain.");
    }

    const updatedTenant = await tenantRepository.update(
      data.tenantId,
      nextTenant,
    );

    if (!updatedTenant) {
      throw new Error("Failed to update tenant.");
    }

    return updatedTenant;
  });
