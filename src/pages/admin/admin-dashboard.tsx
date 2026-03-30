import type { User } from "@/types";

import {
    Button,
    Card,
    Center,
    Container,
    Grid,
    Group,
    RingProgress,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconDownload, IconPlus } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";

import { AdminHeaderStats } from "@/components/admin/admin-header-stats";
import { DataTable } from "@/components/shared/data-table";
import { createAdminDashboardTableColumns } from "@/components/shared/data-table/admin-dashboard-table-config";
import { PendingOverlay } from "@/components/shared/pending-overlay";
import { useAuthContext } from "@/providers/auth-provider";
import { useDashboardMetrics, useDeleteUser, useUsers } from "@/services/hooks";

export function AdminDashboard() {
  const { tenant } = useAuthContext();
  const navigate = useNavigate();
  const { data: dashboardData, isLoading: isDashboardLoading } =
    useDashboardMetrics(tenant?.id || "");
  const { data: users = [], isLoading: isUsersLoading } = useUsers(
    tenant?.id
  );
  const deleteUserMutation = useDeleteUser();

  function handleEditUser(user: User) {
    modals.open({
      children: (
        <div>
          <p>Edit form for user: {user.uid}</p>
          <p>This will contain the student editing form.</p>
        </div>
      ),
      size: "lg",
      title: "Edit Student",
    });
  }

  function handleDeleteUser(userId: string) {
    deleteUserMutation.mutate(userId);
  }

  function handleCreateUser() {
    navigate({ to: "/admin/users/new" });
  }

  function handleExportData() {
    modals.open({
      children: (
        <div>
          <p>Choose export format and data to export:</p>
          <ul>
            <li>Student data (CSV/Excel)</li>
            <li>Course completion reports</li>
            <li>Certificate records</li>
          </ul>
        </div>
      ),
      title: "Export Data",
    });
  }

  if (isDashboardLoading || isUsersLoading) {
    return (
      <PendingOverlay
        reason="Loading dashboard..."
        visible={isDashboardLoading || isUsersLoading}
      />
    );
  }

  return (
    <Container className="py-8" size="xl">
      <div data-aos="fade-up" data-aos-duration="500">
        <Stack gap="xl">
          {/* Header */}
          <Group justify="space-between">
            <div>
              <Title className="mb-2 text-gray-800" order={1}>
                Admin Dashboard
              </Title>
              <Text className="text-gray-600" size="lg">
                Manage students, courses, and monitor platform performance
              </Text>
            </div>
            <Group>
              <Button
                leftSection={<IconDownload size={16} />}
                onClick={handleExportData}
                variant="light"
              >
                Export Data
              </Button>
              <Button
                className="bg-fun-green-600 hover:bg-fun-green-700"
                leftSection={<IconPlus size={16} />}
                onClick={handleCreateUser}
              >
                Add Student
              </Button>
            </Group>
          </Group>

          {/* Stats Cards */}
          <AdminHeaderStats
            certificatesIssued={dashboardData?.certificatesIssued}
            completionRate={dashboardData?.completionRate}
            loading={isDashboardLoading}
            totalCourses={dashboardData?.activeCoursesCount}
            totalStudents={dashboardData?.totalActiveStudents}
          />

          {/* Recent Activity & Progress Overview */}
          <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Card p="lg" radius="lg" withBorder>
                <Group justify="space-between" mb="lg">
                  <Title order={3}>Student Management</Title>
                </Group>

                <DataTable
                  columns={createAdminDashboardTableColumns({
                    onDelete: handleDeleteUser,
                    onEdit: handleEditUser,
                  })}
                  data={users}
                  enableFilters={true}
                  enablePagination={true}
                  enableSearch={true}
                  enableSorting={true}
                  filters={[
                    {
                      key: "role",
                      label: "Role",
                      options: [
                        { label: "All Roles", value: "" },
                        { label: "Student", value: "student" },
                        { label: "Admin", value: "admin" },
                      ],
                    },
                    {
                      key: "isActive",
                      label: "Status",
                      options: [
                        { label: "All Status", value: "" },
                        { label: "Active", value: "true" },
                        { label: "Inactive", value: "false" },
                      ],
                    },
                  ]}
                  loading={isUsersLoading}
                  pageSize={10}
                  searchPlaceholder="Search students by name, email, or student ID..."
                />
              </Card>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
              <Stack gap="lg">
                {/* Overall Progress */}
                <Card p="lg" radius="lg" withBorder>
                  <Title mb="md" order={4}>
                    Platform Overview
                  </Title>
                  <Stack gap="md">
                    <Center>
                      <RingProgress
                        label={
                          <Center>
                            <div className="text-center">
                              <Text className="text-gray-500">
                                Avg Progress
                              </Text>
                              <Text fw={700} size="lg">
                                {dashboardData?.completionRate || 0}%
                              </Text>
                            </div>
                          </Center>
                        }
                        sections={[
                          {
                            color: "fun-green",
                            value: dashboardData?.completionRate || 0,
                          },
                        ]}
                        size={240}
                        thickness={12}
                      />
                    </Center>

                    <Stack gap="xs">
                      <Group justify="space-between">
                        <Text className="text-gray-600" size="sm">
                          Course Completion Rate
                        </Text>
                        <Text fw={500} size="sm">
                          {dashboardData?.completionRate || 0}%
                        </Text>
                      </Group>
                      <Group justify="space-between">
                        <Text className="text-gray-600" size="sm">
                          Active Students
                        </Text>
                        <Text fw={500} size="sm">
                          {dashboardData?.totalActiveStudents || 0}
                        </Text>
                      </Group>
                      <Group justify="space-between">
                        <Text className="text-gray-600" size="sm">
                          Certificates Issued
                        </Text>
                        <Text fw={500} size="sm">
                          {dashboardData?.certificatesIssued || 0}
                        </Text>
                      </Group>
                    </Stack>
                  </Stack>
                </Card>

                {/* Platform Overview */}
                <Card p="lg" radius="lg" withBorder>
                  <Title mb="md" order={4}>
                    Platform Overview
                  </Title>
                  <Stack gap="md">
                    <Group justify="space-between">
                      <Text className="text-gray-600" size="sm">
                        Course Completion Rate
                      </Text>
                      <Text fw={500} size="sm">
                        {dashboardData?.completionRate || 0}%
                      </Text>
                    </Group>
                    <Group justify="space-between">
                      <Text className="text-gray-600" size="sm">
                        New Enrollments This Week
                      </Text>
                      <Text fw={500} size="sm">
                        {dashboardData?.newEnrollmentsThisWeek || 0}
                      </Text>
                    </Group>
                    <Group justify="space-between">
                      <Text className="text-gray-600" size="sm">
                        Courses in Progress
                      </Text>
                      <Text fw={500} size="sm">
                        {dashboardData?.coursesInProgress || 0}
                      </Text>
                    </Group>
                  </Stack>
                </Card>
              </Stack>
            </Grid.Col>
          </Grid>
        </Stack>
      </div>
    </Container>
  );
}
