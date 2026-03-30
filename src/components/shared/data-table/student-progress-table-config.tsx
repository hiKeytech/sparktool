import type { ColumnDef } from "@tanstack/react-table";

import { Badge, Progress, Text } from "@mantine/core";

import { formatDate } from "@/utils/date-utils";

interface CourseProgress {
  courseId: string;
  lastAccessedAt?: number;
  completionPercentage: number;
  status: "completed" | "dropped" | "enrolled" | "in-progress";
}

export function createStudentProgressTableColumns(): ColumnDef<CourseProgress>[] {
  return [
    {
      accessorKey: "courseId",
      cell: ({ getValue }) => (
        <div>
          <Text fw={500} size="sm">
            Course {getValue() as string}
          </Text>
        </div>
      ),
      header: "Course",
    },
    {
      accessorKey: "completionPercentage",
      cell: ({ getValue }) => (
        <Progress
          color="fun-green.6"
          radius="xl"
          size="sm"
          style={{ width: "96px" }}
          value={getValue() as number}
        />
      ),
      header: "Progress",
    },
    {
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue() as string;
        return (
          <Badge color={getStatusColor(status)} size="sm" variant="light">
            {getStatusText(status)}
          </Badge>
        );
      },
      header: "Status",
    },
    {
      accessorKey: "lastAccessedAt",
      cell: ({ getValue }) => {
        const lastAccessed = getValue() as number;
        return (
          <Text c="dimmed" size="sm">
            {lastAccessed ? formatDate(lastAccessed) : "Never accessed"}
          </Text>
        );
      },
      header: "Last Accessed",
    },
  ];
}

function getStatusColor(status: string) {
  switch (status) {
    case "completed":
      return "green";
    case "dropped":
      return "red";
    case "enrolled":
      return "gray";
    case "in-progress":
      return "blue";
    default:
      return "gray";
  }
}

function getStatusText(status: string) {
  switch (status) {
    case "completed":
      return "Completed";
    case "dropped":
      return "Dropped";
    case "enrolled":
      return "Enrolled";
    case "in-progress":
      return "In Progress";
    default:
      return "Unknown";
  }
}

export type { CourseProgress };
