import { createFileRoute } from "@tanstack/react-router";

import { AdminProfile } from "@/pages/admin/profile";
import { useAuthContext } from "@/providers/auth-provider";

export const Route = createFileRoute("/$tenant/admin/profile")({
  component: AdminProfileRoute,
});

function AdminProfileRoute() {
  const { user } = useAuthContext();

  if (!user) {
    return null;
  }

  return <AdminProfile user={user} />;
}
