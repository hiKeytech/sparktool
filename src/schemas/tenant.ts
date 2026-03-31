import type {
  CreateTenantVariables,
  UpdateTenantVariables,
} from "./tenant-contract";

export {
  authStrategySchema,
  createTenantInputSchema,
  tenantConfigSchema,
  tenantDomainSchema,
  tenantIdSchema,
  tenantLookupSchema,
  tenantNameSchema,
  tenantSchema,
  tenantSubscriptionStatusSchema,
  updateTenantInputSchema,
} from "./tenant-contract";

export type {
  CreateTenantVariables,
  Tenant,
  TenantConfig,
  UpdateTenantVariables,
} from "./tenant-contract";

export const tenant = {
  create: async (variables: CreateTenantVariables) => {
    const { createTenantFn } = await import("@/server/tenants");
    return createTenantFn({ data: variables });
  },
  get: async (tenantId: string) => {
    const { getTenantByIdFn } = await import("@/server/tenants");
    return getTenantByIdFn({ data: tenantId });
  },
  list: async () => {
    const { listTenantsFn } = await import("@/server/tenants");
    return listTenantsFn();
  },
  update: async (variables: UpdateTenantVariables) => {
    const { updateTenantFn } = await import("@/server/tenants");
    return updateTenantFn({ data: variables });
  },
};
