import { l as loginFeatureSchema, e as brandingSchema, f as authConfigSchema } from "./tenant-contract-BrIl-2Jr.mjs";
import { o as object, s as string, a as array } from "../_libs/zod.mjs";
const platformHighlightSchema = loginFeatureSchema;
const platformMarketingSchema = object({
  eyebrow: string().trim().min(1, "Platform eyebrow is required"),
  heroDescription: string().trim().min(1, "Platform hero description is required"),
  heroTitle: string().trim().min(1, "Platform hero title is required"),
  highlights: array(platformHighlightSchema),
  primaryCtaLabel: string().trim().min(1, "Primary CTA label is required"),
  secondaryCtaLabel: string().trim().min(1, "Secondary CTA label is required")
});
const platformConfigSchema = object({
  auth: authConfigSchema,
  branding: brandingSchema,
  id: string().trim().min(1).default("platform"),
  marketing: platformMarketingSchema
});
export {
  platformConfigSchema as p
};
