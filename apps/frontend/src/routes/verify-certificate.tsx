import { createFileRoute } from "@tanstack/react-router";
import {
  Alert,
  Button,
  Card,
  Container,
  Group,
  LoadingOverlay,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  IconAlertCircle,
  IconCertificate,
  IconCheck,
  IconSearch,
  IconShield,
} from "@tabler/icons-react";
import { useState } from "react";
import { useFindCertificate } from "@/services/hooks";
import { formatDate } from "@/utils/date-utils";

interface CertificateVerificationProps {}

export const Route = createFileRoute("/verify-certificate")({
  component: CertificateVerification,
});

function CertificateVerification(_props: CertificateVerificationProps) {
  const [certificateId, setCertificateId] = useState("");
  const [searchTriggered, setSearchTriggered] = useState(false);

  const {
    data: certificate,
    isLoading,
    error,
  } = useFindCertificate(searchTriggered ? certificateId : "");
  const showMissingCertificate = searchTriggered && !isLoading && !certificate;

  const handleSearch = () => {
    if (certificateId.trim()) {
      setSearchTriggered(true);
    }
  };

  const handleReset = () => {
    setCertificateId("");
    setSearchTriggered(false);
  };

  return (
    <Container className="py-8" size="md">
      <div data-aos="fade-up">
        <Stack gap="xl">
          {/* Header */}
          <div className="text-center">
            <Group justify="center" mb="md">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-fun-green-100">
                <IconShield size={24} className="text-fun-green-600" />
              </div>
            </Group>
            <Title order={1} className="mb-2 text-gray-800">
              Certificate Verification
            </Title>
            <Text size="lg" className="text-gray-600">
              Verify the authenticity of certificates issued by the Nigerian
              Correctional Service TechForward Program
            </Text>
          </div>

          {/* Verification Form */}
          <div data-aos="fade-up" data-aos-delay="100">
            <Card p="lg" radius="lg" withBorder>
              <Stack gap="md">
                <TextInput
                  label="Certificate ID"
                  placeholder="Enter certificate ID (e.g., NCS-REACT-2024-001)"
                  value={certificateId}
                  onChange={(e) => {
                    setCertificateId(e.target.value);
                    setSearchTriggered(false);
                  }}
                  leftSection={<IconCertificate size={16} />}
                  size="lg"
                />

                <Group>
                  <Button
                    onClick={handleSearch}
                    disabled={!certificateId.trim() || isLoading}
                    leftSection={<IconSearch size={16} />}
                    className="bg-fun-green-800 hover:bg-fun-green-700"
                    size="lg"
                  >
                    Verify Certificate
                  </Button>

                  {searchTriggered && (
                    <Button variant="light" onClick={handleReset}>
                      Clear
                    </Button>
                  )}
                </Group>
              </Stack>
            </Card>
          </div>

          {/* Loading State */}
          {isLoading && (
            <Card p="lg" radius="lg" withBorder>
              <div style={{ position: "relative", minHeight: 100 }}>
                <LoadingOverlay visible />
                <Text className="text-center text-gray-600">
                  Verifying certificate authenticity...
                </Text>
              </div>
            </Card>
          )}

          {/* Error State */}
          {showMissingCertificate && (
            <div data-aos="fade-up">
              <Alert
                icon={<IconAlertCircle size={24} />}
                title="Certificate Not Found"
                color="red"
                radius="lg"
              >
                <Text size="sm">
                  {error?.message ||
                    "The certificate ID you entered could not be found in our records. Please check the ID and try again."}
                </Text>
                <Text size="sm" mt="sm" c="dimmed">
                  If you believe this is an error, please contact the Nigerian
                  Correctional Service TechForward Program administration.
                </Text>
              </Alert>
            </div>
          )}

          {/* Success State */}
          {certificate && searchTriggered && !isLoading && (
            <div data-aos="fade-up">
              <Card
                p="lg"
                radius="lg"
                withBorder
                className="border-green-200 bg-green-50"
              >
                <Group align="flex-start" gap="md">
                  <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full">
                    <IconCheck size={24} className="text-green-600" />
                  </div>

                  <Stack gap="sm" style={{ flex: 1 }}>
                    <Group justify="space-between">
                      <Title order={3} className="text-green-800">
                        Certificate Verified ✓
                      </Title>
                      <Text size="sm" className="text-green-600" fw={500}>
                        AUTHENTIC
                      </Text>
                    </Group>

                    <Stack gap="xs">
                      <Group justify="space-between">
                        <Text fw={500} className="text-gray-700">
                          Student Name:
                        </Text>
                        <Text className="text-gray-800">
                          {certificate.studentName}
                        </Text>
                      </Group>

                      <Group justify="space-between">
                        <Text fw={500} className="text-gray-700">
                          Course:
                        </Text>
                        <Text className="text-gray-800">
                          {certificate.courseName}
                        </Text>
                      </Group>

                      <Group justify="space-between">
                        <Text fw={500} className="text-gray-700">
                          Completion Date:
                        </Text>
                        <Text className="text-gray-800">
                          {formatDate(certificate.completionDate)}
                        </Text>
                      </Group>

                      <Group justify="space-between">
                        <Text fw={500} className="text-gray-700">
                          Issue Date:
                        </Text>
                        <Text className="text-gray-800">
                          {formatDate(certificate.issued?.at)}
                        </Text>
                      </Group>

                      <Group justify="space-between">
                        <Text fw={500} className="text-gray-700">
                          Credential ID:
                        </Text>
                        <Text className="font-mono text-gray-800">
                          {certificate.id}
                        </Text>
                      </Group>
                    </Stack>

                    <Alert
                      icon={<IconShield size={16} />}
                      color="green"
                      mt="md"
                    >
                      <Text size="sm">
                        This certificate has been verified as authentic and was
                        issued by the Nigerian Correctional Service TechForward
                        Program.
                      </Text>
                    </Alert>
                  </Stack>
                </Group>
              </Card>
            </div>
          )}

          {/* Information */}
          <div data-aos="fade-up" data-aos-delay="200">
            <Card p="lg" radius="lg" className="border-blue-200 bg-blue-50">
              <Stack gap="sm">
                <Group gap="sm">
                  <IconShield size={20} className="text-blue-600" />
                  <Title order={4} className="text-blue-800">
                    About Certificate Verification
                  </Title>
                </Group>

                <Text size="sm" className="text-blue-700">
                  All certificates issued by the Nigerian Correctional Service
                  TechForward Program are digitally secured and can be verified
                  through this official verification system. Each certificate
                  contains a unique credential ID that can be used to confirm
                  its authenticity.
                </Text>

                <Text size="sm" className="text-blue-700">
                  For additional verification assistance, contact the program
                  administration at{" "}
                  <Text component="span" fw={500}>
                    techforward@corrections.gov.ng
                  </Text>
                </Text>
              </Stack>
            </Card>
          </div>
        </Stack>
      </div>
    </Container>
  );
}
