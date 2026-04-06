import {
  Alert,
  Button,
  Center,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import {
  IconAlertCircle,
  IconCertificate,
  IconCheck,
  IconSend,
} from "@tabler/icons-react";
import { useState } from "react";

import {
  useCreateCertificate,
  useListCourses,
  useUsers,
} from "@/services/hooks";

import { PendingOverlay } from "../shared/pending-overlay";

import type { Certificate } from "@/types";
import type { User } from "@/types";
import type { Tenant } from "@/schemas/tenant-contract";
import { formatDateInput } from "@/utils/date-utils";

// ... (keep imports)

// Remove local Certificate interface

interface CertificateFormData {
  completionDate: string;
  courseId: string;
  notes?: string;
  studentId: string;
}

interface CertificateGeneratorProps {
  certificate: Certificate | null;
  onClose: () => void;
  onGenerated: () => void;
  tenant: Tenant;
  user: User;
}

// ... imports

export function CertificateGenerator({
  certificate,
  onClose,
  onGenerated,
  tenant,
  user,
}: CertificateGeneratorProps) {
  const { data: courses } = useListCourses(tenant.id);
  const { data: users } = useUsers(tenant.id);
  const generateCertificateMutation = useCreateCertificate();

  const [generationComplete, setGenerationComplete] = useState(false);

  const form = useForm<CertificateFormData>({
    initialValues: {
      completionDate: certificate?.completionDate
        ? formatDateInput(certificate.completionDate).split(" ")[0]
        : "",
      courseId: certificate?.courseId || "",
      notes: "",
      studentId: certificate?.studentId || "",
    },
    validate: {
      completionDate: (value) =>
        !value ? "Completion date is required" : null,
      courseId: (value) => (!value ? "Course is required" : null),
      studentId: (value) => (!value ? "Student is required" : null),
    },
  });

  const handleSubmit = async (values: CertificateFormData) => {
    const selectedCourse = courses?.find((c) => c.id === values.courseId);
    const selectedStudent = users?.find((u) => u.uid === values.studentId);

    if (!selectedCourse || !selectedStudent) return;

    await generateCertificateMutation.mutateAsync(
      {
        data: {
          completionDate: new Date(values.completionDate).getTime(),
          courseId: values.courseId,
          courseName: selectedCourse.title ?? "Unknown Course",
          downloadCount: 0,
          instructorName: "System",
          issued: {
            at: Date.now(),
            by: user.uid,
            name: user.displayName ?? "System",
            photoUrl: user.photoURL ?? "",
          },
          modified: {
            at: Date.now(),
            by: user.uid,
            name: user.displayName ?? "System",
            photoUrl: user.photoURL ?? "",
          },
          status: "issued",
          studentId: values.studentId,
          studentName: selectedStudent.displayName || "Unknown Student",
          tenantId: tenant.id,
        },
        userId: user.uid,
      },
      {
        onSuccess: () => {
          onGenerated();
          setGenerationComplete(true);
        },
      },
    );
  };

  if (generationComplete) {
    return (
      <Center h={200}>
        <Stack align="center" gap="md">
          <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
            <IconCheck className="text-green-600" size={32} />
          </div>
          <Text className="text-green-800" fw={500} size="lg">
            Certificate Generated Successfully!
          </Text>
          <Text c="dimmed" size="sm" ta="center">
            The certificate has been generated and is ready for download
          </Text>
        </Stack>
      </Center>
    );
  }

  if (generateCertificateMutation.isPending) {
    return (
      <PendingOverlay
        instruction="Please wait while we create the certificate with official branding"
        reason="Generating Certificate..."
        visible={generateCertificateMutation.isPending}
      />
    );
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="lg">
        {/* Header */}
        <Group gap="sm">
          <IconCertificate className="text-fun-green-600" size={24} />
          <div>
            <Text fw={500} size="lg">
              Generate New Certificate
            </Text>
            <Text c="dimmed" size="sm">
              Create an official certificate for course completion
            </Text>
          </div>
        </Group>

        {/* Form Fields */}
        <Stack gap="md">
          <Select
            data={
              users?.map((user) => ({
                label: `${user.displayName || "Unknown"} (${user.email || "No Email"})`,
                value: user.uid || "",
              })) || []
            }
            label="Student"
            placeholder="Select a student"
            required
            searchable
            {...form.getInputProps("studentId")}
          />

          <Select
            data={
              courses?.map((course) => ({
                label: course.title ?? "Untitled Course",
                value: course.id,
              })) || []
            }
            label="Course"
            placeholder="Select a course"
            required
            searchable
            {...form.getInputProps("courseId")}
          />

          <TextInput
            label="Completion Date"
            required
            type="date"
            {...form.getInputProps("completionDate")}
          />

          <TextInput
            label="Additional Notes"
            placeholder="Optional notes for the certificate"
            {...form.getInputProps("notes")}
          />
        </Stack>

        {/* Information Alert */}
        <Alert
          color="blue"
          icon={<IconAlertCircle size={16} />}
          title="Certificate Generation"
        >
          <Text size="sm">
            The certificate will be generated with official Nigerian
            Correctional Service branding and will include a unique verification
            code. Once generated, it can be downloaded as a PDF and will be
            automatically added to the student's achievements.
          </Text>
        </Alert>

        {/* Error Display */}
        {generateCertificateMutation.isError && (
          <Alert
            color="red"
            icon={<IconAlertCircle size={16} />}
            title="Generation Failed"
          >
            <Text size="sm">
              {generateCertificateMutation.error?.message ||
                "An error occurred while generating the certificate. Please try again."}
            </Text>
          </Alert>
        )}

        {/* Action Buttons */}
        <Group justify="space-between" pt="md">
          <Button
            disabled={generateCertificateMutation.isPending}
            onClick={onClose}
            variant="light"
          >
            Cancel
          </Button>

          <Button
            className="bg-fun-green-800 hover:bg-fun-green-700"
            leftSection={<IconSend size={16} />}
            loading={generateCertificateMutation.isPending}
            type="submit"
          >
            Generate Certificate
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
