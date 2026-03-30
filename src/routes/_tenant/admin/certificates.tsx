import { createFileRoute } from "@tanstack/react-router";

import { AdminCertificates } from "@/pages/admin/certificates";

export const Route = createFileRoute("/_tenant/admin/certificates")({
  component: AdminCertificates,
});
