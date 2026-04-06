import type { ColumnDef } from "@tanstack/react-table";

import type { Course, StudentProgress } from "@/types";

import {
    ActionIcon,
    Badge,
    Group,
    Progress,
    Stack,
    Text,
    Tooltip,
} from "@mantine/core";
import { IconCertificate, IconEye } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

import { formatStudyTime } from "@/utils/date-utils";

interface CourseProgressRow {
  course: Course & { id: string };
  hasCertificate: boolean;
  progress?: StudentProgress;
}

export function createProgressMonitoringTableColumns(): ColumnDef<CourseProgressRow>[] {
  return [
    {
      accessorKey: "course",
      cell: ({ row }) => {
        const course = row.original.course;
        return (
          <div>
            <Text className="text-stone-900" fw={500} size="sm">
              {course.title}
            </Text>
            <Text c="dimmed" size="sm">
              {course.category}
            </Text>
          </div>
        );
      },
      header: "Course",
    },
    {
      cell: ({ row }) => {
        const progressPercent = row.original.progress?.completionPercentage || 0;
        return (
          <Stack gap="xs">
            <Text fw={500} size="sm">
              {progressPercent}%
            </Text>
            <Progress
              color="fun-green"
              radius="md"
              size="sm"
              value={progressPercent}
            />
          </Stack>
        );
      },
      header: "Progress",
      id: "progress",
    },
    {
      cell: ({ row }) => {
        const progress = row.original.progress;

        const color =
          progress?.status === "completed"
            ? "green"
            : progress?.status === "in-progress"
              ? "blue"
              : progress?.status === "dropped"
                ? "red"
                : "gray";

        const label =
          progress?.status === "completed"
            ? "Completed"
            : progress?.status === "in-progress"
              ? "In Progress"
              : progress?.status === "dropped"
                ? "Dropped"
                : "Not Started";

        return (
          <Badge color={color} size="sm" variant="light">
            {label}
          </Badge>
        );
      },
      header: "Status",
      id: "status",
    },
    {
      cell: ({ row }) => {
        const timeSpent = row.original.progress?.timeSpentMinutes || 0;
        return <Text size="sm">{formatStudyTime(timeSpent)}</Text>;
      },
      header: "Study Time",
      id: "studyTime",
    },
    {
      cell: ({ row }) => {
        const hasCertificate = row.original.hasCertificate;
        return hasCertificate ? (
          <Badge color="fun-green" size="sm" variant="light">
            <Group gap="xs">
              <IconCertificate size={12} />
              Issued
            </Group>
          </Badge>
        ) : (
          <Text c="dimmed" size="sm">
            Not issued
          </Text>
        );
      },
      header: "Certificate",
      id: "certificate",
    },
    {
      cell: ({ row }) => {
        const courseId = row.original.course.id;
        return (
          <Tooltip label="View Course Details">
            <ActionIcon
              className="text-stone-600 hover:text-fun-green-700"
              component={Link}
              size="sm"
              to={`/admin/courses/${courseId}`}
              variant="subtle"
            >
              <IconEye size={16} />
            </ActionIcon>
          </Tooltip>
        );
      },
      header: "Actions",
      id: "actions",
    },
  ];
}

export type { CourseProgressRow };
