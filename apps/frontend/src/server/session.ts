import type { SessionConfig } from "@tanstack/react-start/server";

import { useSession } from "@tanstack/react-start/server";

import { serverEnv } from "@/server/env";
import {
  sessionDataSchema,
  type SessionData,
} from "sparktool-contracts/session";

export { sessionDataSchema, type SessionData };

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
