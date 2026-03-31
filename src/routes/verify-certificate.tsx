import { createFileRoute } from "@tanstack/react-router";

import { CertificateVerification } from "@/pages/public/certificate-verification";

export const Route = createFileRoute("/verify-certificate")({
  component: CertificateVerification,
});
