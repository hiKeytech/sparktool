import { createFileRoute } from "@tanstack/react-router";

import { AdminLiveSessions } from "@/pages/admin/live-sessions";
import { useAuthContext } from "@/providers/auth-provider";

export const Route = createFileRoute("/$tenant/admin/live-sessions")({
  component: AdminLiveSessionsRoute,
});

function AdminLiveSessionsRoute() {
  const { tenant, user } = useAuthContext();

  if (!tenant || !user) {
    return null;
  }

  return <AdminLiveSessions tenant={tenant} user={user} />;
}
