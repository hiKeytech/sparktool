import { createFileRoute } from "@tanstack/react-router";

import { CreateUser } from "@/pages/admin/create-user";
import { useAuthContext } from "@/providers/auth-provider";

export const Route = createFileRoute("/$tenant/admin/users/new")({
  component: CreateUserRoute,
});

function CreateUserRoute() {
  const { tenant } = useAuthContext();

  if (!tenant) {
    return null;
  }

  return <CreateUser tenant={tenant} />;
}
