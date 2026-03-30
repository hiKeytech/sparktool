import {
    Button,
    Card,
    Container,
    Group,
    Select,
    Stack,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
    IconCertificate,
    IconFilter,
    IconPlus,
    IconSearch,
} from "@tabler/icons-react";
import { useState } from "react";

import { CertificateGenerator } from "@/components/certificates/certificate-generator";
import { CertificatePreview } from "@/components/certificates/certificate-preview";
import { DataTable } from "@/components/shared/data-table";
import { createCertificatesTableColumns } from "@/components/shared/data-table/certificates-table-config";
import { PendingOverlay } from "@/components/shared/pending-overlay";
import {
    useListCertificates,
    useListCourses,
    useUpdateCertificate
} from "@/services/hooks";
import { useAuthContext } from "@/providers/auth-provider";
export function AdminCertificates() {
  const { user, tenant } = useAuthContext();
  const { data: courses, isLoading: coursesLoading } = useListCourses(tenant?.id);
  const { data: certificates = [], isLoading: certificatesLoading } =
    useListCertificates(tenant?.id);
  const updateCertificate = useUpdateCertificate();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [courseFilter, setCourseFilter] = useState<string>("all");

  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch =
      (cert.studentName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (cert.courseName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || cert.status === statusFilter;
    const matchesCourse =
      courseFilter === "all" || cert.courseId === courseFilter;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  function handleGenerateCertificate() {
    modals.open({
      children: (
        <CertificateGenerator
          certificate={null}
          onClose={() => modals.close("certificate-generator")}
          onGenerated={() => {
            modals.close("certificate-generator");
          }}
        />
      ),
      modalId: "certificate-generator",
      size: "lg",
      title: "Generate Certificate",
    });
  }

  function handlePreviewCertificate() {
    modals.open({
      children: (
        <CertificatePreview
          certificate={null}
          onClose={() => modals.close("certificate-preview")}
        />
      ),
      modalId: "certificate-preview",
      size: "xl",
      title: "Certificate Preview",
    });
  }

  const handleDownloadCertificate = (certificateId: string) => {
    const cert = certificates.find((c) => c.id === certificateId);
    if (!cert || !user?.uid) return;

    updateCertificate.mutate({
      certificateId,
      updates: {
        downloadCount: (cert.downloadCount || 0) + 1,
        status: cert.status || "issued",
      },
      userId: user.uid,
    });

    modals.openConfirmModal({
      children:
        "This feature will be implemented to download the certificate as PDF.",
      labels: { cancel: "Cancel", confirm: "OK" },
      onConfirm: () => {},
      title: "Download Certificate",
    });
  };

  const handleRevokeCertificate = (certificateId: string) => {
    modals.openConfirmModal({
      children:
        "Are you sure you want to revoke this certificate? This action cannot be undone.",
      confirmProps: { color: "red" },
      labels: { cancel: "Cancel", confirm: "Revoke" },
      onConfirm: () => {
        const cert = certificates.find((c) => c.id === certificateId);
        if (!cert || !user?.uid) return;

        updateCertificate.mutate({
          certificateId,
          updates: { 
            status: "revoked",
            downloadCount: cert.downloadCount || 0 
          },
          userId: user.uid,
        });
      },
      title: "Revoke Certificate",
    });
  };

  const totalCertificates = certificates.length;
  const issuedCertificates = certificates.filter(
    (c) => c.status === "issued"
  ).length;
  const pendingCertificates = certificates.filter(
    (c) => c.status === "pending"
  ).length;

  const isLoading = coursesLoading || certificatesLoading;

  if (isLoading) {
    return (
      <PendingOverlay reason="Loading certificates..." visible={isLoading} />
    );
  }

  return (
    <Container className="py-8" size="xl">
      <div data-aos="fade-up" data-aos-duration="500">
        <Stack gap="xl">
          {/* Header */}
          <div>
            <Title className="text-fun-green-800" order={1}>
              Certificate Management
            </Title>
            <Text c="dimmed" size="lg">
              Generate, manage, and track certificates for course completions
            </Text>
          </div>

          {/* Statistics Cards */}
          <div data-aos="fade-up" data-aos-delay="100">
            <Group grow>
              <Card p="lg" radius="lg" withBorder>
                <Group gap="sm">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconCertificate className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <Text c="dimmed" size="sm">
                      Total Certificates
                    </Text>
                    <Text fw={700} size="xl">
                      {totalCertificates}
                    </Text>
                  </div>
                </Group>
              </Card>

              <Card p="lg" radius="lg" withBorder>
                <Group gap="sm">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <IconCertificate className="text-green-600" size={24} />
                  </div>
                  <div>
                    <Text c="dimmed" size="sm">
                      Issued
                    </Text>
                    <Text fw={700} size="xl">
                      {issuedCertificates}
                    </Text>
                  </div>
                </Group>
              </Card>

              <Card p="lg" radius="lg" withBorder>
                <Group gap="sm">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <IconCertificate className="text-yellow-600" size={24} />
                  </div>
                  <div>
                    <Text c="dimmed" size="sm">
                      Pending
                    </Text>
                    <Text fw={700} size="xl">
                      {pendingCertificates}
                    </Text>
                  </div>
                </Group>
              </Card>
            </Group>
          </div>

          {/* Filters and Actions */}
          <div data-aos="fade-up" data-aos-delay="200">
            <Card p="lg" radius="lg" withBorder>
              <Group justify="space-between">
                <Group>
                  <TextInput
                    leftSection={<IconSearch size={16} />}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search certificates..."
                    style={{ minWidth: 300 }}
                    value={searchQuery}
                  />

                  <Select
                    data={[
                      { label: "All Status", value: "all" },
                      { label: "Issued", value: "issued" },
                      { label: "Pending", value: "pending" },
                      { label: "Revoked", value: "revoked" },
                    ]}
                    leftSection={<IconFilter size={16} />}
                    onChange={(value) => setStatusFilter(value || "all")}
                    placeholder="Status"
                    value={statusFilter}
                  />

                  <Select
                    data={[
                      { label: "All Courses", value: "all" },
                      ...(courses || []).map((course) => ({
                        label: course.title || "Untitled Course",
                        value: course.id,
                      })),
                    ]}
                    onChange={(value) => setCourseFilter(value || "all")}
                    placeholder="Course"
                    value={courseFilter}
                  />
                </Group>

                <Button
                  color="fun-green"
                  leftSection={<IconPlus size={16} />}
                  onClick={() =>
                    modals.open({
                      children: (
                        <CertificateGenerator
                          certificate={null}
                          onClose={() => modals.close("certificate-generator")}
                          onGenerated={() => {
                            modals.close("certificate-generator");
                          }}
                        />
                      ),
                      modalId: "certificate-generator",
                      size: "lg",
                      title: "Generate Certificate",
                    })}
                >
                  Generate Certificate
                </Button>
              </Group>
            </Card>
          </div>

          {/* Certificates Table */}
          <div data-aos="fade-up" data-aos-delay="300">
            <Card p="lg" radius="lg" withBorder>
              <DataTable
                columns={createCertificatesTableColumns({
                  onDownload: handleDownloadCertificate,
                  onGenerate: handleGenerateCertificate,
                  onPreview: handlePreviewCertificate,
                  onRevoke: handleRevokeCertificate,
                })}
                data={filteredCertificates}
                enableFilters
                enableSearch
                enableSorting
                pageSize={10}
                searchPlaceholder="Search certificates..."
              />

              {filteredCertificates.length === 0 && (
                <div className="py-8 text-center">
                  <Text c="dimmed">
                    No certificates found matching your criteria
                  </Text>
                </div>
              )}
            </Card>
          </div>
        </Stack>
      </div>
    </Container>
  );
}
