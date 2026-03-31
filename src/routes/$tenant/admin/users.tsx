import { createFileRoute } from "@tanstack/react-router";

import { UserManagement } from "@/pages/admin/user-management";
import { useAuthContext } from "@/providers/auth-provider";

export const Route = createFileRoute("/$tenant/admin/users")({
  component: UserManagementRoute,
});

function UserManagementRoute() {
  const { tenant, user } = useAuthContext();

  if (!tenant || !user) {
    return null;
  }

  return <UserManagement tenant={tenant} user={user} />;
}
