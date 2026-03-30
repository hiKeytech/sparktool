import { z } from "zod";

const VISIBILITY_ROLES = ["student", "admin", "mentor"] as const;

export const authStrategySchema = z.object({
  type: z.enum(["email-password", "sso"]),
  config: z.any(), // Provider-specific config (loose for flexibility)
  label: z.string().optional(), // Button text (e.g., "Sign in with School ID")
});

export const tenantConfigSchema = z.object({
  auth: z.object({
    strategies: z.array(authStrategySchema).min(1),
    allowSignup: z.boolean().default(false),
    restrictedDomains: z.array(z.string()).optional(), // Restrict to specific email domains
    domains: z.array(z.string()).default([]), // Keep for backward compatibility if needed, or deprecate
  }),
  branding: z.object({
    faviconUrl: z.string().optional(),
    fontFamily: z.string().default("Inter, sans-serif"),
    logoUrl: z.string().min(1, "Logo URL is required"),
    portalName: z.string().min(1, "Portal name is required"),
    primaryColor: z.string().min(1, "Primary color is required"),
    secondaryColor: z.string().min(1, "Secondary color is required"),
    loginPage: z.object({
      heading: z.string().optional(), // "Renewed Hope Agenda"
      subheading: z.string().optional(), // "Empowering..."
      features: z.array(z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string(), // Tabler icon name
      })).optional(),
      heroImage: z.string().optional(),
    }).optional(),
  }),
  dashboard: z.object({
    layout: z.enum(["modern", "classic", "dense"]).default("modern"),
    widgets: z.array(
      z.object({
        id: z.string(),
        position: z.object({
          h: z.number(),
          w: z.number(),
          x: z.number(),
          y: z.number(),
        }),
        props: z.record(z.string(), z.any()).optional(),
        visibility: z.array(z.enum(VISIBILITY_ROLES)),
      })
    ).default([]),
  }),
  modules: z.object({
    certificates: z.boolean().default(false),
    gamification: z.boolean().default(false),
    liveClasses: z.boolean().default(false),
    messaging: z.boolean().default(false),
    reports: z.boolean().default(false),
  }),
  monetization: z.object({
    currency: z.string().default("NGN"),
    model: z.enum(["pay-per-course", "subscription", "free"]).default("pay-per-course"),
    subscriptionConfig: z.object({
      monthlyPrice: z.number().optional(),
      yearlyPrice: z.number().optional()
    }).optional(),
  }).optional(),
});

export const tenantSchema = z.object({
  config: tenantConfigSchema,
  domain: z.string().min(1, "Domain is required"),
  id: z.string().min(1, "Tenant ID is required"),
  name: z.string().min(1, "Tenant name is required"),
  subscriptionStatus: z.enum(["active", "inactive", "trial"]).default("active"),
});

export type TenantConfig = z.infer<typeof tenantConfigSchema>;
export type Tenant = z.infer<typeof tenantSchema>;
