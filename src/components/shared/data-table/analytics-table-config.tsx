import type { ColumnDef } from "@tanstack/react-table";

import type { Course } from "@/types";

import { Badge, Group, Progress, Text } from "@mantine/core";

export function createAnalyticsTableColumns(): ColumnDef<Course>[] {
  return [
    {
      accessorKey: "title",
      cell: ({ row }) => (
        <Text fw={500} size="sm">
          {row.original.title}
        </Text>
      ),
      header: "Course Title",
    },
    {
      accessorKey: "enrollmentCount",
      cell: ({ row }) => (
        <Text size="sm">{row.original.enrollmentCount || 0}</Text>
      ),
      header: "Enrollments",
    },
    {
      accessorKey: "completionCount",
      cell: ({ row }) => (
        <Text size="sm">{row.original.completionCount || 0}</Text>
      ),
      header: "Completions",
    },
    {
      cell: ({ row }) => {
        const enrollments = row.original.enrollmentCount || 0;
        const completions = row.original.completionCount || 0;
        const rate =
          enrollments > 0 ? Math.round((completions / enrollments) * 100) : 0;
        const color = rate >= 70 ? "fun-green" : rate >= 50 ? "blue" : "orange";

        return (
          <Badge color={color} size="sm" variant="light">
            {rate}%
          </Badge>
        );
      },
      header: "Completion Rate",
      id: "completionRate",
    },
    {
      cell: ({ row }) => {
        // Calculate average progress from enrollments vs completions
        const enrollments = row.original.enrollmentCount || 0;
        const completions = row.original.completionCount || 0;
        const progress =
          enrollments > 0 ? Math.round((completions / enrollments) * 100) : 0;

        return (
          <Group gap="xs">
            <Progress
              color="blue"
              size="sm"
              style={{ flex: 1, minWidth: 60 }}
              value={progress}
            />
            <Text size="sm">{progress}%</Text>
          </Group>
        );
      },
      header: "Avg. Progress",
      id: "averageProgress",
    },
    {
      accessorKey: "averageRating",
      cell: ({ row }) => {
        const rating = row.original.averageRating || 0;
        return (
          <Group gap="xs">
            <Text size="sm">{rating > 0 ? rating.toFixed(1) : "N/A"}</Text>
            {rating > 0 && (
              <Text c="dimmed" size="xs">
                /5.0
              </Text>
            )}
          </Group>
        );
      },
      header: "Rating",
    },
    {
      cell: ({ row }) => {
        const enrollments = row.original.enrollmentCount || 0;
        const completions = row.original.completionCount || 0;
        const dropoutRate =
          enrollments > 0
            ? Math.round(((enrollments - completions) / enrollments) * 100)
            : 0;
        const color =
          dropoutRate <= 20
            ? "fun-green"
            : dropoutRate <= 40
              ? "orange"
              : "red";

        return (
          <Badge color={color} size="sm" variant="light">
            {dropoutRate}%
          </Badge>
        );
      },
      header: "Dropout Rate",
      id: "dropoutRate",
    },
  ];
}
