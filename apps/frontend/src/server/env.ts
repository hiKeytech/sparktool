import { z } from "zod";

const serverEnvSchema = z.object({
  APP_SESSION_COOKIE_NAME: z
    .string()
    .min(1, "APP_SESSION_COOKIE_NAME is required"),
  APP_SESSION_SECRET: z
    .string()
    .min(32, "APP_SESSION_SECRET must be at least 32 characters long"),
});

export const serverEnv = serverEnvSchema.parse({
  APP_SESSION_COOKIE_NAME: process.env.APP_SESSION_COOKIE_NAME,
  APP_SESSION_SECRET: process.env.APP_SESSION_SECRET,
});

export type ServerEnv = typeof serverEnv;
