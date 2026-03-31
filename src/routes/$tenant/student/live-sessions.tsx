import { createFileRoute } from "@tanstack/react-router";

import { StudentLiveSessionsPage } from "@/pages/student/live-sessions";
import { useAuthContext } from "@/providers/auth-provider";

export const Route = createFileRoute("/$tenant/student/live-sessions")({
  component: StudentLiveSessionsRoute,
});

function StudentLiveSessionsRoute() {
  const { tenant, user } = useAuthContext();

  if (!tenant || !user) {
    return null;
  }

  return <StudentLiveSessionsPage tenant={tenant} user={user} />;
}
