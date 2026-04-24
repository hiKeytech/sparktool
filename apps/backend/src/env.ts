import { z } from "zod";

const serverEnvSchema = z.object({
  AI_FEATURES_ENABLED: z
    .enum(["false", "true"])
    .optional()
    .transform((value) => value !== "false"),
  APP_SESSION_COOKIE_NAME: z
    .string()
    .min(1, "APP_SESSION_COOKIE_NAME is required"),
  APP_SESSION_SECRET: z
    .string()
    .min(32, "APP_SESSION_SECRET must be at least 32 characters long"),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  GEMINI_API_KEY: z.string().optional(),
  GEMINI_BASE_URL: z.string().url().optional(),
  GEMINI_MODEL: z.string().optional(),
  MONGODB_DB_NAME: z.string().min(1, "MONGODB_DB_NAME is required"),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
});

export const serverEnv = serverEnvSchema.parse({
  AI_FEATURES_ENABLED: process.env.AI_FEATURES_ENABLED,
  APP_SESSION_COOKIE_NAME: process.env.APP_SESSION_COOKIE_NAME,
  APP_SESSION_SECRET: process.env.APP_SESSION_SECRET,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  GEMINI_BASE_URL: process.env.GEMINI_BASE_URL,
  GEMINI_MODEL: process.env.GEMINI_MODEL,
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
  MONGODB_URI: process.env.MONGODB_URI,
});

export type ServerEnv = typeof serverEnv;
