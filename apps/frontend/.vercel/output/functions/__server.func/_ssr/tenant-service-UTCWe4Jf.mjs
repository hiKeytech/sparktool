import { a as api } from "./api-client-Cl2DaV5u.mjs";
const TenantService = {
  async getTenantById(tenantId) {
    return api.get(`/api/tenants/${tenantId}`).catch(() => null);
  },
  async getTenantByHost(host) {
    return api.get(
      `/api/tenants/by-host?host=${encodeURIComponent(host)}`
    ).catch(() => null);
  }
};
export {
  TenantService as T
};
