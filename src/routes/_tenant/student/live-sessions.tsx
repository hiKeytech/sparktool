import { createFileRoute } from "@tanstack/react-router";

import { StudentLiveSessionsPage } from "@/pages/student/live-sessions";

export const Route = createFileRoute("/_tenant/student/live-sessions")({
  component: StudentLiveSessionsPage,
});
