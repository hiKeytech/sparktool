import { z } from "zod";

const VISIBILITY_ROLES = ["student", "admin", "mentor"] as const;
const PUBLIC_CATEGORY_ICONS = [
  "briefcase",
  "brain",
  "chart-line",
  "cpu",
  "device-desktop",
  "heart",
  "users",
  "math",
  "atom",
  "palette",
  "globe",
] as const;

export const tenantIdSchema = z.string().trim().min(1, "Tenant ID is required");

export const tenantLookupSchema = tenantIdSchema.optional();

export const tenantDomainSchema = z
  .string()
  .trim()
  .min(1, "Domain is required");

export const tenantNameSchema = z
  .string()
  .trim()
  .min(1, "Tenant name is required");

export const tenantSubscriptionStatusSchema = z.enum([
  "active",
  "inactive",
  "trial",
]);

export const authStrategySchema = z.object({
  config: z.any(),
  label: z.string().optional(),
  type: z.enum(["email-password", "sso"]),
});

export const loginFeatureSchema = z.object({
  description: z.string(),
  icon: z.string(),
  title: z.string(),
});

export const loginPageSchema = z.object({
  features: z.array(loginFeatureSchema),
  footnote: z.string().trim().min(1, "Login footnote is required"),
  formDescription: z
    .string()
    .trim()
    .min(1, "Login form description is required"),
  formTitle: z.string().trim().min(1, "Login form title is required"),
  heading: z.string().trim().min(1, "Login heading is required"),
  subheading: z.string().trim().min(1, "Login subheading is required"),
});

export const authConfigSchema = z.object({
  allowSignup: z.boolean(),
  domains: z.array(z.string()),
  restrictedDomains: z.array(z.string()),
  strategies: z.array(authStrategySchema).min(1),
});

export const brandingSchema = z.object({
  faviconUrl: z.string().optional(),
  fontFamily: z.string().default("Inter, sans-serif"),
  loginPage: loginPageSchema,
  logoUrl: z.string().min(1, "Logo URL is required"),
  portalName: z.string().min(1, "Portal name is required"),
  primaryColor: z.string().min(1, "Primary color is required"),
  secondaryColor: z.string().min(1, "Secondary color is required"),
});

export const publicCategorySchema = z.object({
  icon: z.enum(PUBLIC_CATEGORY_ICONS),
  name: z.string().trim().min(1, "Category name is required"),
});

export const publicStatSchema = z.object({
  label: z.string().trim().min(1, "Stat label is required"),
  value: z.string().trim().min(1, "Stat value is required"),
});

export const publicSiteSchema = z.object({
  categorySectionTitle: z
    .string()
    .trim()
    .min(1, "Category section title is required"),
  categories: z
    .array(publicCategorySchema)
    .min(1, "At least one category is required"),
  copyright: z.string().trim().min(1, "Copyright text is required"),
  featuredCoursesCtaLabel: z
    .string()
    .trim()
    .min(1, "Featured courses CTA label is required"),
  featuredCoursesTitle: z
    .string()
    .trim()
    .min(1, "Featured courses title is required"),
  footerLogoAlt: z.string().trim().min(1, "Footer logo alt text is required"),
  footerLogoUrl: z.string().trim().min(1, "Footer logo URL is required"),
  footerTagline: z.string().trim().min(1, "Footer tagline is required"),
  heroBackgroundImageUrl: z
    .string()
    .trim()
    .min(1, "Hero background image URL is required"),
  heroDescription: z.string().trim().min(1, "Hero description is required"),
  heroLogoAlt: z.string().trim().min(1, "Hero logo alt text is required"),
  heroLogoUrl: z.string().trim().min(1, "Hero logo URL is required"),
  heroPrimaryCtaLabel: z
    .string()
    .trim()
    .min(1, "Primary CTA label is required"),
  heroSecondaryCtaLabel: z
    .string()
    .trim()
    .min(1, "Secondary CTA label is required"),
  heroTitle: z.string().trim().min(1, "Hero title is required"),
  missionCtaLabel: z.string().trim().min(1, "Mission CTA label is required"),
  missionDescription: z
    .string()
    .trim()
    .min(1, "Mission description is required"),
  missionImageAlt: z
    .string()
    .trim()
    .min(1, "Mission image alt text is required"),
  missionImageUrl: z.string().trim().min(1, "Mission image URL is required"),
  missionTitle: z.string().trim().min(1, "Mission title is required"),
  stats: z.array(publicStatSchema).min(1, "At least one stat is required"),
});

export const tenantConfigSchema = z.object({
  auth: authConfigSchema,
  branding: brandingSchema,
  dashboard: z.object({
    layout: z.enum(["modern", "classic", "dense"]).default("modern"),
    widgets: z
      .array(
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
        }),
      )
      .default([]),
  }),
  liveSessions: z
    .object({
      appName: z.string().min(1).optional(),
      joinWindowMinutes: z.number().int().min(0).max(120).default(10),
      supportEmail: z.email().optional(),
    })
    .optional(),
  modules: z.object({
    certificates: z.boolean().default(false),
    gamification: z.boolean().default(false),
    liveClasses: z.boolean().default(false),
    messaging: z.boolean().default(false),
    reports: z.boolean().default(false),
  }),
  publicSite: publicSiteSchema,
  monetization: z
    .object({
      currency: z.string().default("NGN"),
      model: z
        .enum(["pay-per-course", "subscription", "free"])
        .default("pay-per-course"),
      subscriptionConfig: z
        .object({
          monthlyPrice: z.number().optional(),
          yearlyPrice: z.number().optional(),
        })
        .optional(),
    })
    .optional(),
});

export const tenantSchema = z.object({
  config: tenantConfigSchema,
  domain: tenantDomainSchema,
  id: tenantIdSchema,
  name: tenantNameSchema,
  subscriptionStatus: tenantSubscriptionStatusSchema.default("active"),
});

export const createTenantInputSchema = z.object({
  config: tenantConfigSchema,
  domain: tenantDomainSchema,
  id: tenantIdSchema,
  name: tenantNameSchema,
  subscriptionStatus: tenantSubscriptionStatusSchema.optional(),
});

export const updateTenantInputSchema = z.object({
  tenantData: tenantSchema.partial(),
  tenantId: tenantIdSchema,
});

export type CreateTenantVariables = z.infer<typeof createTenantInputSchema>;
export type Tenant = z.infer<typeof tenantSchema>;
export type TenantConfig = z.infer<typeof tenantConfigSchema>;
export type UpdateTenantVariables = z.infer<typeof updateTenantInputSchema>;
