import type { CertificateData } from "@/schemas/certificates";
import { formatDate } from "@/utils/date-utils";

import {
    Badge,
    Button,
    Card,
    Group,
    SimpleGrid,
    Stack,
    Text,
    ThemeIcon,
    Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconCalendar, IconCertificate, IconEye } from "@tabler/icons-react";
import { motion } from "framer-motion";

import { CertificatePreview } from "@/components/certificates/certificate-preview";

import { NCSLogo } from "../shared/ncs-logo";
import { PendingOverlay } from "../shared/pending-overlay";

interface StudentCertificatesProps {
  certificates: CertificateData[];
  isLoading?: boolean;
}

export function StudentCertificates({
  certificates,
  isLoading = false,
}: StudentCertificatesProps) {
  const handlePreview = (certificate: CertificateData) => {
    modals.open({
      children: (
        <CertificatePreview
          certificate={certificate}
          onClose={() => modals.close("certificate-preview")}
        />
      ),
      modalId: "certificate-preview",
      size: "xl",
      title: "Certificate Preview",
    });
  };



  const getStatusBadge = (status: CertificateData["status"]) => {
    switch (status) {
      case "issued":
        return { children: "Issued", color: "green" };
      case "pending":
        return { children: "Pending", color: "yellow" };
      case "revoked":
        return { children: "Revoked", color: "red" };
      default:
        return { children: "Unknown", color: "gray" };
    }
  };

  if (isLoading) {
    return (
      <PendingOverlay reason="Loading Certificate..." visible={isLoading} />
    );
  }

  if (certificates.length === 0) {
    return (
      <Card className="text-center" p="xl" radius="lg" withBorder>
        <ThemeIcon color="gray" mb="md" size="xl" variant="light">
          <IconCertificate size={32} />
        </ThemeIcon>
        <Title className="text-gray-600" mb="sm" order={4}>
          No Certificates Yet
        </Title>
        <Text c="dimmed">
          Complete courses to earn certificates that you can download and share.
        </Text>
      </Card>
    );
  }

  return (
    <>
      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
        {certificates.map((certificate, index) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            key={certificate.id}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card p="lg" radius="lg" withBorder>
              <Group align="flex-start" justify="space-between" mb="md">
                <div className="flex-1">
                  <Group gap="md" mb="md">
                    <NCSLogo size={44} />
                    <div>
                      <Title className="mb-1" order={4}>
                        {certificate.courseName}
                      </Title>
                      <Text c="dimmed" size="sm">
                        Certificate of Completion
                      </Text>
                    </div>
                  </Group>

                  <Stack gap="xs" mb="lg">
                    <Group gap="sm">
                      <IconCalendar className="text-gray-500" size={14} />
                      <Text c="dimmed" size="sm">
                        Issued:{" "}
                        {formatDate(
                          certificate.issued?.at || certificate.completionDate
                        )}
                      </Text>
                    </Group>
                    <Group gap="sm">
                      <Text c="dimmed" size="sm">
                        ID: {certificate.id}
                      </Text>
                    </Group>
                  </Stack>

                  <Group gap="xs" mb="md">
                    <Badge {...getStatusBadge(certificate.status)} />
                  </Group>

                  {certificate.status === "issued" && (
                    <Button
                      color="green"
                      leftSection={<IconEye size={14} />}
                      onClick={() => handlePreview(certificate)}
                      size="sm"
                      variant="light"
                    >
                      Preview
                    </Button>
                  )}
                </div>
              </Group>
            </Card>
          </motion.div>
        ))}
      </SimpleGrid>
    </>
  );
}
