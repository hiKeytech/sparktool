import type { CertificateData } from "@/schemas/certificates";

import { Button, Center, Group, Stack, Text } from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { useRef } from "react";

import { CertificateTemplate } from "./certificate-template";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface CertificatePreviewProps {
  certificate: CertificateData | null;
  onClose: () => void;
}

export function CertificatePreview({
  certificate,
  onClose,
}: CertificatePreviewProps) {
  const certificateRef = useRef<HTMLDivElement>(null);

  if (!certificate) {
    return (
      <Center h={200}>
        <Text c="dimmed">No certificate selected</Text>
      </Center>
    );
  }

  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;

    try {
      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: "#ffffff",
        height: 794, // A4 landscape height in pixels at 96 DPI
        scale: 2,
        width: 1123, // A4 landscape width in pixels at 96 DPI
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        format: "a4",
        orientation: "landscape",
        unit: "mm",
      });

      const imgWidth = 297; // A4 landscape width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${certificate.id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <Stack gap="lg">
      {/* Certificate Preview */}
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        initial={{ opacity: 0, scale: 0.9 }}
        style={{
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          maxHeight: "70vh",
          overflow: "auto",
        }}
        transition={{ duration: 0.5 }}
      >
        <CertificateTemplate certificate={certificate} ref={certificateRef} />
      </motion.div>

      {/* Action Buttons */}
      <Group justify="space-between">
        <Button onClick={onClose} variant="light">
          Close Preview
        </Button>

        <Button
          className="bg-fun-green-800 hover:bg-fun-green-700"
          leftSection={<IconDownload size={16} />}
          onClick={handleDownloadPDF}
        >
          Download PDF
        </Button>
      </Group>
    </Stack>
  );
}
