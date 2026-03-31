import { type Tenant, tenantSchema } from "@/schemas/tenant-contract";
import { tenantRepository } from "@/server/repositories/tenant-repository";

export const TenantService = {
  getTenantByDomain: async (domain: string): Promise<Tenant | null> => {
    try {
      const tenant = await tenantRepository.getByDomain(domain);

      if (!tenant) {
        console.warn(`No tenant found for domain: ${domain}`);
        return null;
      }

      const parseResult = tenantSchema.safeParse(tenant);
      if (!parseResult.success) {
        console.error("Invalid tenant data:", parseResult.error);
        return null;
      }

      return parseResult.data;
    } catch (error) {
      console.error("Error fetching tenant by domain:", error);
      return null;
    }
  },

  getTenantById: async (id: string): Promise<Tenant | null> => {
    try {
      const tenant = await tenantRepository.getById(id);

      if (!tenant) {
        return null;
      }

      const parseResult = tenantSchema.safeParse(tenant);
      if (!parseResult.success) {
        console.error("Invalid tenant data:", parseResult.error);
        return null;
      }

      return parseResult.data;
    } catch (error) {
      console.error("Error fetching tenant by ID:", error);
      return null;
    }
  },

  getTenantByHost: async (host: string): Promise<Tenant | null> => {
    try {
      const tenant = await tenantRepository.getByHost(host);

      if (tenant) {
        const parseResult = tenantSchema.safeParse(tenant);
        if (parseResult.success) {
          return parseResult.data;
        }
      }

      return null;
    } catch (error) {
      console.error("Error fetching tenant by host:", error);
      return null;
    }
  },

  initializeTenant: async (id: string, data: Tenant): Promise<void> => {
    try {
      await tenantRepository.initialize(id, data);
      console.log(`Tenant ${id} initialized successfully.`);
    } catch (error) {
      console.error("Error initializing tenant:", error);
      throw error;
    }
  },
};
