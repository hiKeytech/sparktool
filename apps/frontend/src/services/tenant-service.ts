import type { Tenant } from "sparktool-contracts/tenant-contract";
import { api } from "@/lib/api-client";

export const TenantService = {
  async getTenantById(tenantId: string): Promise<Tenant | null> {
    return api.get<Tenant | null>(`/api/tenants/${tenantId}`).catch(() => null);
  },

  async getTenantByHost(host: string): Promise<Tenant | null> {
    return api
      .get<Tenant | null>(
        `/api/tenants/by-host?host=${encodeURIComponent(host)}`,
      )
      .catch(() => null);
  },
};
