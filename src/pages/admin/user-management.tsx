import type { User } from "@/types";

import {
  Alert,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import {
  IconDownload,
  IconExclamationCircle,
  IconPlus,
} from "@tabler/icons-react";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";

import {
  openEditStudentModal,
  openResetUserPasswordModal,
  openSendMessageModal,
} from "@/components/modals";
import { DataTable } from "@/components/shared/data-table";
import { createUserTableColumns } from "@/components/shared/data-table/user-table-config";
import { useAuthContext } from "@/providers/auth-provider";
import { useDeleteUser, useUpdateUser, useUsers } from "@/services/hooks";

export function UserManagement() {
  const { tenant } = useAuthContext();
  const navigate = useNavigate();

  // Real API calls with basic filters
  const { data: users = [], error, isLoading } = useUsers(tenant?.id);
  const deleteUser = useDeleteUser();
  const updateUser = useUpdateUser();

  function handleViewUser(userId: string) {
    navigate({ to: "/admin/users/$studentId", params: { studentId: userId } });
  }

  function handleEditUser(user: User) {
    openEditStudentModal(user);
  }

  function handleDeleteUser(user: User) {
    modals.openConfirmModal({
      children: (
        <Text>
          Remove access for <strong>{user.displayName}</strong>? Their account
          will be deactivated immediately and they will no longer be able to
          sign in.
        </Text>
      ),
      confirmProps: { color: "red" },
      labels: { cancel: "Cancel", confirm: "Remove Access" },
      onConfirm: () => {
        deleteUser.mutate(user.uid, {
          onError: () => {
            notifications.show({
              color: "red",
              icon: <IconX size={16} />,
              message: "Failed to remove user access. Please try again.",
              title: "Delete Failed",
            });
          },
          onSuccess: () => {
            notifications.show({
              color: "green",
              icon: <IconCheck size={16} />,
              message: `${user.displayName}'s account has been deactivated.`,
              title: "Access Removed",
            });
          },
        });
      },
      title: "Remove User Access",
    });
  }

  function handleSendMessage(user: User) {
    openSendMessageModal(user);
  }

  function handleResetPassword(user: User) {
    openResetUserPasswordModal(user);
  }

  function handleToggleStatus(userId: string, isActive: boolean) {
    updateUser.mutate(
      {
        userData: { isActive },
        userId,
      },
      {
        onError: () => {
          notifications.show({
            color: "red",
            icon: <IconX size={16} />,
            message: "Failed to update user status. Please try again.",
            title: "Update Failed",
          });
        },
        onSuccess: () => {
          notifications.show({
            color: "green",
            icon: <IconCheck size={16} />,
            message: `User has been ${isActive ? "activated" : "deactivated"}.`,
            title: "Status Updated",
          });
        },
      },
    );
  }

  function handleCreateUser() {
    navigate({ to: "/admin/users/new" });
  }

  function handleExportUsers() {
    // Create CSV export
    const headers = [
      "Name",
      "Email",
      "Student ID",
      "Role",
      "Status",
      "Last Login",
      "Certificates Earned",
    ];
    const csvData = users.map((user) => [
      user.displayName || "",
      user.email || "",
      user.studentId || "",
      user.role || "",
      user.isActive ? "Active" : "Inactive",
      user.lastLoginAt
        ? new Date(user.lastLoginAt).toLocaleDateString()
        : "Never",
      user.certificatesEarned || 0,
    ]);

    const csvContent = [
      headers.join(","),
      ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute(
      "download",
      `users_export_${new Date().toISOString().split("T")[0]}.csv`,
    );
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    notifications.show({
      color: "green",
      icon: <IconCheck size={16} />,
      message: "User data has been exported to CSV file.",
      title: "Export Complete",
    });
  }

  // Calculate stats from real data
  const totalUsers = users.length;
  const activeStudents = users.filter(
    (u) => u.isActive && u.role === "student",
  ).length;
  const totalCertificates = users.reduce(
    (sum, u) => sum + (u.certificatesEarned || 0),
    0,
  );
  const avgProgress =
    users.filter((u) => u.role === "student").length > 0
      ? Math.round(
          users
            .filter((u) => u.role === "student")
            .reduce((sum, u) => {
              const completed = u.completedCourses?.length || 0;
              const enrolled = u.enrolledCourses?.length || 0;
              return sum + (enrolled > 0 ? (completed / enrolled) * 100 : 0);
            }, 0) / users.filter((u) => u.role === "student").length,
        )
      : 0;

  const columns = createUserTableColumns({
    onDelete: handleDeleteUser,
    onEdit: handleEditUser,
    onResetPassword: handleResetPassword,
    onSendMessage: handleSendMessage,
    onToggleStatus: handleToggleStatus,
    onView: handleViewUser,
  });

  const filters = [
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
  ];

  if (isLoading) {
    return (
      <Container className="py-8" size="xl">
        <div className="flex items-center justify-center h-64">
          <Loader size="lg" />
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-8" size="xl">
        <Alert
          color="red"
          icon={<IconExclamationCircle size={16} />}
          title="Error"
        >
          Failed to load users. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-8" size="xl">
      <Stack data-aos="fade-up" gap="xl">
        {/* Header */}
        <Group data-aos="fade-right" justify="space-between">
          <div>
            <Title className="mb-2 text-gray-800" order={1}>
              User Management
            </Title>
            <Text className="text-gray-600" size="lg">
              Manage student accounts, track progress, and control access
            </Text>
          </div>
          <Group>
            <Button
              leftSection={<IconDownload size={16} />}
              onClick={handleExportUsers}
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
        <Grid data-aos="fade-up" data-aos-delay="100">
          <Grid.Col span={{ base: 6, md: 3 }}>
            <Card className="text-center" p="md" radius="md" withBorder>
              <Text className="mb-1 text-gray-600" size="sm">
                Total Users
              </Text>
              <Text className="text-blue-600" fw={700} size="xl">
                {totalUsers}
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 3 }}>
            <Card className="text-center" p="md" radius="md" withBorder>
              <Text className="mb-1 text-gray-600" size="sm">
                Active Students
              </Text>
              <Text className="text-green-600" fw={700} size="xl">
                {activeStudents}
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 3 }}>
            <Card className="text-center" p="md" radius="md" withBorder>
              <Text className="mb-1 text-gray-600" size="sm">
                Avg Progress
              </Text>
              <Text className="text-orange-600" fw={700} size="xl">
                {avgProgress}%
              </Text>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 6, md: 3 }}>
            <Card className="text-center" p="md" radius="md" withBorder>
              <Text className="mb-1 text-gray-600" size="sm">
                Certificates
              </Text>
              <Text className="text-purple-600" fw={700} size="xl">
                {totalCertificates}
              </Text>
            </Card>
          </Grid.Col>
        </Grid>

        {/* Users Table */}
        <Card
          data-aos="fade-up"
          data-aos-delay="200"
          p="lg"
          radius="md"
          withBorder
        >
          <DataTable
            columns={columns}
            data={users}
            enableFilters={true}
            enablePagination={true}
            enableSearch={true}
            enableSorting={true}
            filters={filters}
            loading={isLoading}
            pageSize={10}
            searchPlaceholder="Search users by name, email, or student ID..."
          />
        </Card>
      </Stack>
    </Container>
  );
}
