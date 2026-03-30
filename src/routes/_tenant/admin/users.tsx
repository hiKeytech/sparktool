import { createFileRoute } from "@tanstack/react-router";

import { UserManagement } from "@/pages/admin/user-management";

export const Route = createFileRoute("/_tenant/admin/users")({
  component: UserManagement,
});
