import type { ColumnDef } from "@tanstack/react-table";

import { Badge, Text } from "@mantine/core";

interface MonthlyTrendData {
  activeUsers: number;
  completions: number;
  enrollments: number;
  month: string;
}

export function createTrendsTableColumns(): ColumnDef<MonthlyTrendData>[] {
  return [
    {
      accessorKey: "month",
      cell: ({ getValue }) => (
        <Text fw={500} size="sm">
          {getValue() as string} 2024
        </Text>
      ),
      header: "Month",
    },
    {
      accessorKey: "enrollments",
      cell: ({ getValue }) => (
        <Text size="sm">{(getValue() as number).toLocaleString()}</Text>
      ),
      header: "New Enrollments",
    },
    {
      accessorKey: "completions",
      cell: ({ getValue }) => (
        <Text size="sm">{(getValue() as number).toLocaleString()}</Text>
      ),
      header: "Completions",
    },
    {
      accessorKey: "activeUsers",
      cell: ({ getValue }) => (
        <Text size="sm">{(getValue() as number).toLocaleString()}</Text>
      ),
      header: "Active Users",
    },
    {
      cell: ({ row, table }) => {
        const index = table
          .getRowModel()
          .rows.findIndex((r) => r.id === row.id);
        if (index === 0) {
          return (
            <Badge color="gray" size="sm" variant="light">
              Base
            </Badge>
          );
        }
        const growthRate = Math.round(10 + index * 5);
        return (
          <Badge color="fun-green" size="sm" variant="light">
            +{growthRate}%
          </Badge>
        );
      },
      header: "Growth Rate",
      id: "growthRate",
    },
  ];
}

export type { MonthlyTrendData };
