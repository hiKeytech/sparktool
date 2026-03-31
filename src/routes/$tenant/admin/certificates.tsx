import { createFileRoute } from "@tanstack/react-router";

import { AdminCertificates } from "@/pages/admin/certificates";
import { useAuthContext } from "@/providers/auth-provider";

export const Route = createFileRoute("/$tenant/admin/certificates")({
  component: AdminCertificatesRoute,
});

function AdminCertificatesRoute() {
  const { tenant, user } = useAuthContext();

  if (!tenant || !user) {
    return null;
  }

  return <AdminCertificates tenant={tenant} user={user} />;
}
