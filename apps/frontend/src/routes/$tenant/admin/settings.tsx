import { createFileRoute } from "@tanstack/react-router";

import { AdminSettings } from "@/pages/admin/settings";

export const Route = createFileRoute("/$tenant/admin/settings")({
  component: AdminSettings,
});
