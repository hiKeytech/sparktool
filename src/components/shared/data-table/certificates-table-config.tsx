import type { ColumnDef } from "@tanstack/react-table";

import type { CertificateData } from "@/types";

import { ActionIcon, Badge, Group, Menu, Text, Tooltip } from "@mantine/core";
import {
    IconDots,
    IconDownload,
    IconEye,
    IconSend,
    IconTrash,
} from "@tabler/icons-react";

import { formatDate } from "@/utils/date-utils";

interface CertificateActions {
  onDownload: (certificateId: string) => void;
  onGenerate: () => void;
  onPreview: () => void;
  onRevoke: (certificateId: string) => void;
}

export function createCertificatesTableColumns(
  actions: CertificateActions
): ColumnDef<CertificateData>[] {
  return [
    {
      accessorKey: "studentName",
      cell: ({ row }) => (
        <div>
          <Text fw={500} size="sm">
            {row.original.studentName}
          </Text>
          <Text c="dimmed" size="sm">
            ID: {row.original.studentId}
          </Text>
        </div>
      ),
      header: "Student",
    },
    {
      accessorKey: "courseName",
      cell: ({ getValue }) => (
        <Text fw={500} size="sm">
          {getValue() as string}
        </Text>
      ),
      header: "Course",
    },
    {
      accessorKey: "id",
      cell: ({ getValue }) => (
        <Text className="font-mono" fw={500} size="sm">
          {getValue() as string}
        </Text>
      ),
      header: "Certificate ID",
    },
    {
      accessorKey: "completionDate",
      cell: ({ getValue }) => (
        <Text size="sm">{formatDate(getValue() as number)}</Text>
      ),
      header: "Completion Date",
    },
    {
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue() as CertificateData["status"];
        return <Badge {...getStatusBadge(status)} size="sm" />;
      },
      header: "Status",
    },
    {
      accessorKey: "downloadCount",
      cell: ({ getValue }) => <Text size="sm">{getValue() as number}</Text>,
      header: "Downloads",
    },
    {
      cell: ({ row }) => {
        const certificate = row.original;
        return (
          <Group gap="xs">
            <Tooltip label="Preview Certificate">
              <ActionIcon
                color="blue"
                onClick={() => actions.onPreview()}
                size="sm"
                variant="light"
              >
                <IconEye size={14} />
              </ActionIcon>
            </Tooltip>

            {certificate.status === "issued" && (
              <Tooltip label="Download Certificate">
                <ActionIcon
                  color="green"
                  onClick={() => actions.onDownload(certificate.id)}
                  size="sm"
                  variant="light"
                >
                  <IconDownload size={14} />
                </ActionIcon>
              </Tooltip>
            )}

            <Menu position="bottom-end">
              <Menu.Target>
                <ActionIcon color="gray" size="sm" variant="light">
                  <IconDots size={14} />
                </ActionIcon>
              </Menu.Target>
              <Menu.Dropdown>
                {certificate.status === "pending" && (
                  <Menu.Item
                    leftSection={<IconSend size={14} />}
                    onClick={() => actions.onGenerate()}
                  >
                    Generate & Issue
                  </Menu.Item>
                )}
                {certificate.status === "issued" && (
                  <Menu.Item
                    color="red"
                    leftSection={<IconTrash size={14} />}
                    onClick={() => actions.onRevoke(certificate.id)}
                  >
                    Revoke Certificate
                  </Menu.Item>
                )}
              </Menu.Dropdown>
            </Menu>
          </Group>
        );
      },
      header: "Actions",
      id: "actions",
    },
  ];
}

function getStatusBadge(status: CertificateData["status"]) {
  switch (status) {
    case "issued":
      return { children: "Issued", color: "green" as const };
    case "pending":
      return { children: "Pending", color: "yellow" as const };
    case "revoked":
      return { children: "Revoked", color: "red" as const };
    default:
      return { children: "Unknown", color: "gray" as const };
  }
}
