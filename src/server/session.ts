import type { SessionConfig } from "@tanstack/react-start/server";

import { useSession } from "@tanstack/react-start/server";
import { z } from "zod";

import { serverEnv } from "@/server/env";

export const sessionDataSchema = z.object({
  activeTenantId: z.string().optional(),
  email: z.string().optional(),
  role: z.string().nullable().optional(),
  tenantIds: z.array(z.string()).optional(),
  uid: z.string().optional(),
});

export type SessionData = z.infer<typeof sessionDataSchema>;

export const sessionConfig: SessionConfig = {
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
  name: serverEnv.APP_SESSION_COOKIE_NAME,
  password: serverEnv.APP_SESSION_SECRET,
};

export function useAppSession() {
  return useSession<SessionData>(sessionConfig);
}
