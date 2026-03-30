import { createFileRoute } from "@tanstack/react-router";

import { UserProfile } from "@/pages/student/user-profile";

export const Route = createFileRoute("/_tenant/student/profile")({
  component: UserProfile,
});
