import { Group, Paper, SimpleGrid, Text, ThemeIcon } from "@mantine/core";
import {
  IconBook,
  IconCertificate,
  IconTrendingUp,
  IconUsers,
} from "@tabler/icons-react";

interface AdminHeaderStatsProps {
  certificatesIssued?: number;
  completionRate?: number;
  loading?: boolean;
  totalCourses?: number;
  totalStudents?: number;
}

export function AdminHeaderStats({
  certificatesIssued = 0,
  completionRate = 0,
  loading = false,
  totalCourses = 0,
  totalStudents = 0,
}: AdminHeaderStatsProps) {
  const stats = [
    {
      color: "blue",
      icon: IconUsers,
      label: "Active Students",
      value: totalStudents.toLocaleString(),
    },
    {
      color: "fun-green",
      icon: IconBook,
      label: "Total Courses",
      value: totalCourses.toLocaleString(),
    },
    {
      color: "orange",
      icon: IconTrendingUp,
      label: "Completion Rate",
      value: `${completionRate.toFixed(1)}%`,
    },
    {
      color: "violet",
      icon: IconCertificate,
      label: "Certificates Issued",
      value: certificatesIssued.toLocaleString(),
    },
  ];

  if (loading) {
    return (
      <SimpleGrid cols={{ base: 2, md: 4 }} mb="xl" spacing="md">
        {stats.map((_, index) => (
          <Paper
            className="animate-pulse"
            key={index}
            p="md"
            radius="md"
            withBorder
          >
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-6 bg-gray-200 rounded"></div>
          </Paper>
        ))}
      </SimpleGrid>
    );
  }

  return (
    <SimpleGrid cols={{ base: 2, md: 4 }} mb="xl" spacing="md">
      {stats.map((stat) => (
        <Paper
          className="hover:shadow-lg transition-shadow"
          key={stat.label}
          p="md"
          radius="md"
          withBorder
        >
          <Group gap="sm">
            <ThemeIcon color={stat.color} radius="md" size="lg">
              <stat.icon size={20} />
            </ThemeIcon>
            <div>
              <Text c="dimmed" fw={500} size="sm">
                {stat.label}
              </Text>
              <Text fw={700} size="xl">
                {stat.value}
              </Text>
            </div>
          </Group>
        </Paper>
      ))}
    </SimpleGrid>
  );
}
