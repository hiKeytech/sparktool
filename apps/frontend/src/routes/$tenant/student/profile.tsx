import { createFileRoute } from "@tanstack/react-router";

import { UserProfile } from "@/pages/student/user-profile";
import { useAuthContext } from "@/providers/auth-provider";

export const Route = createFileRoute("/$tenant/student/profile")({
  component: UserProfileRoute,
});

function UserProfileRoute() {
  const { tenant, user } = useAuthContext();

  if (!tenant || !user) {
    return null;
  }

  return <UserProfile tenant={tenant} user={user} />;
}
