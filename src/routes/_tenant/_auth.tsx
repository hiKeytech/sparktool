import { createFileRoute, redirect } from "@tanstack/react-router";
import { createServerOnlyFn } from "@tanstack/react-start";
import { getSession } from "@tanstack/react-start/server";

import { sessionConfig } from "@/hooks/use-app-session";
import type { SessionData } from "@/server/session";

export const getAppSession = createServerOnlyFn(async () => {
  return getSession<SessionData>(sessionConfig);
});

export const Route = createFileRoute("/_tenant/_auth")({
  beforeLoad: async () => {
    const { data } = await getAppSession();
    if (!data) throw redirect({ to: "/" });
  },
});
