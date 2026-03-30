import { createFileRoute } from "@tanstack/react-router";

import { StudentRouteGuard } from "@/components/guards/student-route-guard";
import { StudentLayout } from "@/components/layouts/student-layout";

export const Route = createFileRoute("/_tenant/student")({
  component: () => (
    <StudentRouteGuard>
      <StudentLayout />
    </StudentRouteGuard>
  ),
});
