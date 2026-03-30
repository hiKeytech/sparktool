import { createFileRoute } from "@tanstack/react-router";

import { AnalyticsReports } from "@/pages/admin/analytics-reports";

export const Route = createFileRoute("/_tenant/admin/analytics")({
  component: AnalyticsReports,
});
