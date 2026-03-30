import { type Tenant, tenantSchema } from "@/schemas/tenant";
import { tenantRepository } from "@/server/repositories/tenant-repository";

export const dummyTenant: Tenant = {
  config: {
    auth: {
      strategies: [
        {
          type: "email-password",
          config: {},
        },
      ],
      allowSignup: true,
      domains: [],
    },
    branding: {
      fontFamily: "Inter, sans-serif",
      logoUrl: "/logo.png",
      portalName: "Sparktool",
      primaryColor: "#000000",
      secondaryColor: "#ffffff",
      loginPage: {
        heading: "Welcome to Sparktool",
        subheading: "Your gateway to knowledge",
        heroImage:
          "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop",
      },
    },
    dashboard: {
      layout: "modern",
      widgets: [],
    },
    modules: {
      certificates: false,
      gamification: false,
      liveClasses: false,
      messaging: false,
      reports: false,
    },
  },
  domain: "localhost",
  id: "demo",
  name: "Demo Tenant",
  subscriptionStatus: "active",
};

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

      return dummyTenant;
    } catch (error) {
      console.error("Error fetching tenant by host:", error);
      // Fallback to dummy tenant on error
      return dummyTenant;
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
