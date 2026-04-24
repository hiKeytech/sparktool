import { s as string, _ as _enum, o as object, e as email, n as number, c as any, a as array, b as boolean, r as record } from "../_libs/zod.mjs";
const adminInvitationRoleSchema = _enum(["admin"]);
const adminInvitationStatusSchema = _enum([
  "pending",
  "redeemed",
  "revoked",
  "expired"
]);
const createTenantAdminInvitationInputSchema = object({
  displayName: string().trim().min(2).optional().nullable(),
  email: email()
});
const redeemAdminInvitationInputSchema = object({
  department: string().trim().optional().nullable(),
  displayName: string().trim().min(2, "Display name is required"),
  location: string().trim().optional().nullable(),
  password: string().min(8, "Password must be at least 8 characters long"),
  tenantId: string().trim().min(1, "Tenant ID is required"),
  token: string().trim().min(1, "Invitation token is required")
});
object({
  createdAt: number(),
  displayName: string().trim().min(2).nullable().optional(),
  email: email(),
  expiresAt: number(),
  invitedByUserId: string().trim().min(1),
  redeemedAt: number().nullable().optional(),
  redeemedUserId: string().trim().min(1).nullable().optional(),
  revokedAt: number().nullable().optional(),
  role: adminInvitationRoleSchema,
  status: adminInvitationStatusSchema,
  tenantId: string().trim().min(1),
  tokenHash: string().trim().min(1),
  uid: string().trim().min(1),
  updatedAt: number()
});
const adminInvitationPreviewSchema = object({
  displayName: string().trim().min(2).nullable().optional(),
  email: email(),
  expiresAt: number(),
  role: adminInvitationRoleSchema,
  status: adminInvitationStatusSchema,
  tenantId: string().trim().min(1)
});
adminInvitationPreviewSchema.extend({
  createdAt: number(),
  id: string().trim().min(1),
  redeemedAt: number().nullable().optional(),
  revokedAt: number().nullable().optional()
});
const VISIBILITY_ROLES = ["student", "admin", "mentor"];
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
  "globe"
];
const tenantIdSchema = string().trim().min(1, "Tenant ID is required");
const tenantLookupSchema = tenantIdSchema.optional();
const tenantDomainSchema = string().trim().min(1, "Domain is required");
const tenantNameSchema = string().trim().min(1, "Tenant name is required");
const tenantSubscriptionStatusSchema = _enum([
  "active",
  "inactive",
  "trial"
]);
const authStrategySchema = object({
  config: any(),
  label: string().optional(),
  type: _enum(["email-password", "sso"])
});
const loginFeatureSchema = object({
  description: string(),
  icon: string(),
  title: string()
});
const loginPageSchema = object({
  features: array(loginFeatureSchema),
  footnote: string().trim().min(1, "Login footnote is required"),
  formDescription: string().trim().min(1, "Login form description is required"),
  formTitle: string().trim().min(1, "Login form title is required"),
  heading: string().trim().min(1, "Login heading is required"),
  subheading: string().trim().min(1, "Login subheading is required")
});
const authConfigSchema = object({
  allowSignup: boolean(),
  domains: array(string()),
  restrictedDomains: array(string()),
  strategies: array(authStrategySchema).min(1)
});
const brandingSchema = object({
  faviconUrl: string().optional(),
  fontFamily: string().default("Inter, sans-serif"),
  loginPage: loginPageSchema,
  logoUrl: string().min(1, "Logo URL is required"),
  portalName: string().min(1, "Portal name is required"),
  primaryColor: string().min(1, "Primary color is required"),
  secondaryColor: string().min(1, "Secondary color is required")
});
const publicCategorySchema = object({
  icon: _enum(PUBLIC_CATEGORY_ICONS),
  name: string().trim().min(1, "Category name is required")
});
const publicStatSchema = object({
  label: string().trim().min(1, "Stat label is required"),
  value: string().trim().min(1, "Stat value is required")
});
const publicSiteSchema = object({
  categorySectionTitle: string().trim().min(1, "Category section title is required"),
  categories: array(publicCategorySchema).min(1, "At least one category is required"),
  copyright: string().trim().min(1, "Copyright text is required"),
  featuredCoursesCtaLabel: string().trim().min(1, "Featured courses CTA label is required"),
  featuredCoursesTitle: string().trim().min(1, "Featured courses title is required"),
  footerLogoAlt: string().trim().min(1, "Footer logo alt text is required"),
  footerLogoUrl: string().trim().min(1, "Footer logo URL is required"),
  footerTagline: string().trim().min(1, "Footer tagline is required"),
  heroBackgroundImageUrl: string().trim().min(1, "Hero background image URL is required"),
  heroDescription: string().trim().min(1, "Hero description is required"),
  heroLogoAlt: string().trim().min(1, "Hero logo alt text is required"),
  heroLogoUrl: string().trim().min(1, "Hero logo URL is required"),
  heroPrimaryCtaLabel: string().trim().min(1, "Primary CTA label is required"),
  heroSecondaryCtaLabel: string().trim().min(1, "Secondary CTA label is required"),
  heroTitle: string().trim().min(1, "Hero title is required"),
  missionCtaLabel: string().trim().min(1, "Mission CTA label is required"),
  missionDescription: string().trim().min(1, "Mission description is required"),
  missionImageAlt: string().trim().min(1, "Mission image alt text is required"),
  missionImageUrl: string().trim().min(1, "Mission image URL is required"),
  missionTitle: string().trim().min(1, "Mission title is required"),
  stats: array(publicStatSchema).min(1, "At least one stat is required")
});
const tenantConfigSchema = object({
  auth: authConfigSchema,
  branding: brandingSchema,
  dashboard: object({
    layout: _enum(["modern", "classic", "dense"]).default("modern"),
    widgets: array(object({
      id: string(),
      position: object({
        h: number(),
        w: number(),
        x: number(),
        y: number()
      }),
      props: record(string(), any()).optional(),
      visibility: array(_enum(VISIBILITY_ROLES))
    })).default([])
  }),
  liveSessions: object({
    appName: string().min(1).optional(),
    joinWindowMinutes: number().int().min(0).max(120).default(10),
    supportEmail: email().optional()
  }).optional(),
  modules: object({
    certificates: boolean().default(false),
    gamification: boolean().default(false),
    liveClasses: boolean().default(false),
    messaging: boolean().default(false),
    reports: boolean().default(false)
  }),
  publicSite: publicSiteSchema,
  monetization: object({
    currency: string().default("NGN"),
    model: _enum(["pay-per-course", "subscription", "free"]).default("pay-per-course"),
    subscriptionConfig: object({
      monthlyPrice: number().optional(),
      yearlyPrice: number().optional()
    }).optional()
  }).optional()
});
const tenantSchema = object({
  config: tenantConfigSchema,
  domain: tenantDomainSchema,
  id: tenantIdSchema,
  name: tenantNameSchema,
  subscriptionStatus: tenantSubscriptionStatusSchema.default("active")
});
const createTenantInputSchema = object({
  config: tenantConfigSchema,
  domain: tenantDomainSchema,
  id: tenantIdSchema,
  name: tenantNameSchema,
  subscriptionStatus: tenantSubscriptionStatusSchema.optional()
});
const createTenantOnboardingInputSchema = object({
  initialAdminInvitation: createTenantAdminInvitationInputSchema,
  tenant: createTenantInputSchema
});
const updateTenantInputSchema = object({
  tenantData: tenantSchema.partial(),
  tenantId: tenantIdSchema
});
export {
  tenantIdSchema as a,
  createTenantOnboardingInputSchema as b,
  createTenantInputSchema as c,
  tenantSchema as d,
  brandingSchema as e,
  authConfigSchema as f,
  loginFeatureSchema as l,
  redeemAdminInvitationInputSchema as r,
  tenantLookupSchema as t,
  updateTenantInputSchema as u
};
