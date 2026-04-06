import { z } from "zod";

import {
  authConfigSchema,
  brandingSchema,
  loginFeatureSchema,
} from "./tenant-contract.js";

export const platformHighlightSchema = loginFeatureSchema;

export const platformMarketingSchema = z.object({
  eyebrow: z.string().trim().min(1, "Platform eyebrow is required"),
  heroDescription: z
    .string()
    .trim()
    .min(1, "Platform hero description is required"),
  heroTitle: z.string().trim().min(1, "Platform hero title is required"),
  highlights: z.array(platformHighlightSchema),
  primaryCtaLabel: z.string().trim().min(1, "Primary CTA label is required"),
  secondaryCtaLabel: z
    .string()
    .trim()
    .min(1, "Secondary CTA label is required"),
});

export const platformConfigSchema = z.object({
  auth: authConfigSchema,
  branding: brandingSchema,
  id: z.string().trim().min(1).default("platform"),
  marketing: platformMarketingSchema,
});

export type PlatformConfig = z.infer<typeof platformConfigSchema>;
