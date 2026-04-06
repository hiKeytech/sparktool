import { createFileRoute } from "@tanstack/react-router";

import { AnalyticsReports } from "@/pages/admin/analytics-reports";
import { useAuthContext } from "@/providers/auth-provider";

export const Route = createFileRoute("/$tenant/admin/analytics")({
  component: AnalyticsReportsRoute,
});

function AnalyticsReportsRoute() {
  const { tenant } = useAuthContext();

  if (!tenant) {
    return null;
  }

  return <AnalyticsReports tenant={tenant} />;
}
