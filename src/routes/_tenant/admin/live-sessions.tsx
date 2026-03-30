import { createFileRoute } from "@tanstack/react-router";

import { AdminLiveSessions } from "@/pages/admin/live-sessions";

export const Route = createFileRoute("/_tenant/admin/live-sessions")({
  component: AdminLiveSessions,
});
