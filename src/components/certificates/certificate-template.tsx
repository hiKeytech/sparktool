import type { CertificateData } from "@/schemas/certificates";

import { Box, Center, Group, Stack, Text, Title } from "@mantine/core";
import { IconCertificate } from "@tabler/icons-react";


import { NCSLogo } from "@/components/shared/ncs-logo";
import { formatDate } from "@/utils/date-utils";

interface CertificateTemplateProps {
  certificate: CertificateData;
  institutionName?: string;
  instructorName?: string;
}

export const CertificateTemplate = (
  { certificate, institutionName = "Nigerian Correctional Service", instructorName = "Training Coordinator", ref }: CertificateTemplateProps & { ref?: React.RefObject<HTMLDivElement | null> }
) => {
  return (
    <Box
      className="bg-white"
      ref={ref}
      style={{
        fontFamily: "Inter, system-ui, sans-serif",
        height: "210mm", // A4 landscape height
        padding: "20mm",
        width: "297mm", // A4 landscape width
      }}
    >
      {/* Header with Nigerian Government Colors */}
      <Center mb={40}>
        <Stack align="center" gap="sm">
          {/* Nigerian Flag Representation */}
          <Group gap={0}>
            <Box
              style={{ backgroundColor: "#359a61", height: 40, width: 30 }}
            />
            <Box
              style={{
                backgroundColor: "white",
                border: "1px solid #359a61",
                height: 40,
                width: 30,
              }}
            />
            <Box
              style={{ backgroundColor: "#359a61", height: 40, width: 30 }}
            />
          </Group>

          {/* Official NCS Logo */}
          <Center>
            <NCSLogo size={60} />
          </Center>

          <Title
            order={1}
            style={{
              color: "#359a61",
              fontSize: "36px",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            FEDERAL REPUBLIC OF NIGERIA
          </Title>

          <Title
            order={2}
            style={{
              color: "#1f2937",
              fontSize: "28px",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {institutionName.toUpperCase()}
          </Title>

          <Text
            style={{
              color: "#6b7280",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            TechForward Professional Development Program
          </Text>
        </Stack>
      </Center>

      {/* Certificate Body */}
      <Center mb={40}>
        <Stack align="center" gap="lg">
          <IconCertificate size={60} style={{ color: "#359a61" }} />

          <Title
            order={1}
            style={{
              color: "#1f2937",
              fontSize: "42px",
              fontWeight: 700,
              textAlign: "center",
            }}
          >
            CERTIFICATE OF COMPLETION
          </Title>

          <Text
            style={{
              color: "#6b7280",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            This is to certify that
          </Text>

          <Box
            style={{
              borderBottom: "3px solid #359a61",
              paddingBottom: "8px",
              paddingLeft: "40px",
              paddingRight: "40px",
            }}
          >
            <Title
              order={1}
              style={{
                color: "#359a61",
                fontSize: "38px",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              {certificate.studentName}
            </Title>
          </Box>

          <Text
            style={{
              color: "#6b7280",
              fontSize: "20px",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            has successfully completed the course
          </Text>

          <Title
            order={2}
            style={{
              color: "#1f2937",
              fontSize: "32px",
              fontWeight: 600,
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            {certificate.courseName}
          </Title>

          <Text
            style={{
              color: "#6b7280",
              fontSize: "18px",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            demonstrating proficiency in the required competencies and meeting
            all assessment criteria
          </Text>
        </Stack>
      </Center>

      {/* Certificate Details */}
      <Group justify="space-around" mb={40}>
        <Stack align="center" gap="xs">
          <Text
            style={{ color: "#359a61", fontSize: "16px", fontWeight: 600 }}
          >
            COMPLETION DATE
          </Text>
          <Text
            style={{ color: "#1f2937", fontSize: "18px", fontWeight: 500 }}
          >
            {formatDate(certificate.completionDate)}
          </Text>
        </Stack>

        <Stack align="center" gap="xs">
          <Text
            style={{ color: "#359a61", fontSize: "16px", fontWeight: 600 }}
          >
            CERTIFICATE ID
          </Text>
          <Text
            style={{
              color: "#1f2937",
              fontFamily: "monospace",
              fontSize: "18px",
              fontWeight: 500,
            }}
          >
            {certificate.id}
          </Text>
        </Stack>
      </Group>

      {/* Footer with Signatures */}
      <Group
        align="flex-end"
        justify="space-between"
        style={{ marginTop: "40px" }}
      >
        <Stack align="center" gap="xs">
          <Box
            style={{
              borderBottom: "2px solid #6b7280",
              height: 1,
              marginBottom: 8,
              width: 200,
            }}
          />
          <Text
            style={{
              color: "#1f2937",
              fontSize: "16px",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            {instructorName}
          </Text>
          <Text
            style={{
              color: "#6b7280",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            Training Coordinator
          </Text>
          <Text
            style={{
              color: "#6b7280",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            Nigerian Correctional Service
          </Text>
        </Stack>

        <Stack align="center" gap="xs">
          <Box
            style={{
              alignItems: "center",
              backgroundColor: "#f0f9f4",
              border: "2px solid #359a61",
              borderRadius: "50%",
              display: "flex",
              height: 120,
              justifyContent: "center",
              width: 120,
            }}
          >
            <Text
              style={{
                color: "#359a61",
                fontSize: "12px",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              OFFICIAL
              <br />
              SEAL
            </Text>
          </Box>
          <Text
            style={{
              color: "#6b7280",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            Government Seal
          </Text>
        </Stack>

        <Stack align="center" gap="xs">
          <Box
            style={{
              borderBottom: "2px solid #6b7280",
              height: 1,
              marginBottom: 8,
              width: 200,
            }}
          />
          <Text
            style={{
              color: "#1f2937",
              fontSize: "16px",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Controller General
          </Text>
          <Text
            style={{
              color: "#6b7280",
              fontSize: "14px",
              textAlign: "center",
            }}
          >
            Nigerian Correctional Service
          </Text>
          <Text
            style={{
              color: "#6b7280",
              fontSize: "12px",
              textAlign: "center",
            }}
          >
            Federal Republic of Nigeria
          </Text>
        </Stack>
      </Group>

      {/* Security Footer */}
      <Box
        style={{
          backgroundColor: "#f9fafb",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          marginTop: "30px",
          padding: "15px",
        }}
      >
        <Text
          style={{
            color: "#6b7280",
            fontSize: "12px",
            lineHeight: 1.5,
            textAlign: "center",
          }}
        >
          This certificate is issued electronically by the Nigerian
          Correctional Service TechForward Program.
          <br />
          For verification of authenticity, visit{" "}
          <strong>techforward.corrections.gov.ng/verify</strong> and enter the
          certificate ID: <strong>{certificate.id}</strong>
          <br />
          This document is protected by digital security measures and is valid
          only when verified through official channels.
        </Text>
      </Box>
    </Box>
  );
};

CertificateTemplate.displayName = "CertificateTemplate";
