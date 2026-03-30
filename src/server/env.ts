import { z } from "zod";

const serverEnvSchema = z.object({
  APP_SESSION_COOKIE_NAME: z
    .string()
    .min(1, "APP_SESSION_COOKIE_NAME is required"),
  APP_SESSION_SECRET: z
    .string()
    .min(32, "APP_SESSION_SECRET must be at least 32 characters long"),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  MONGODB_DB_NAME: z.string().min(1, "MONGODB_DB_NAME is required"),
  MONGODB_URI: z.string().min(1, "MONGODB_URI is required"),
  VITE_SUPER_ADMIN_EMAILS: z.string().optional(),
  VITE_WHITELISTED_ADMIN_EMAILS: z.string().optional(),
});

export const serverEnv = serverEnvSchema.parse({
  APP_SESSION_COOKIE_NAME: process.env.APP_SESSION_COOKIE_NAME,
  APP_SESSION_SECRET: process.env.APP_SESSION_SECRET,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME,
  MONGODB_URI: process.env.MONGODB_URI,
  VITE_SUPER_ADMIN_EMAILS: process.env.VITE_SUPER_ADMIN_EMAILS,
  VITE_WHITELISTED_ADMIN_EMAILS: process.env.VITE_WHITELISTED_ADMIN_EMAILS,
});

export type ServerEnv = typeof serverEnv;
