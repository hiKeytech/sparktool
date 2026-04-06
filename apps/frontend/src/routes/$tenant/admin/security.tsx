import { createFileRoute } from "@tanstack/react-router";

import { AdminSecurity } from "@/pages/admin/security";

export const Route = createFileRoute("/$tenant/admin/security")({
  component: AdminSecurity,
});
