import type { User, UserRole } from "@/types";

import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Container,
  Group,
  Loader,
  Modal,
  Paper,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { openResetUserPasswordModal } from "@/components/modals";
import {
  IconEdit,
  IconKey,
  IconShield,
  IconTrash,
  IconUserCheck,
} from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { api } from "@/services/api";
import { useUsers } from "@/services/hooks";

export function SuperAdminDashboard() {
  const [editingUser, setEditingUser] = useState<null | User>(null);
  const [newRole, setNewRole] = useState<UserRole>("student");
  const queryClient = useQueryClient();

  // Get all users for display
  const { data: users = [], isLoading } = useUsers(null);

  // Update user role mutation
  const updateUserRoleMutation = useMutation({
    mutationFn: async ({
      role,
      userId,
    }: {
      role: UserRole;
      userId: string;
    }) => {
      await api.$use.user.update({
        userData: { role },
        userId,
      });
    },
    onError: (error) => {
      notifications.show({
        color: "red",
        message:
          error instanceof Error ? error.message : "Failed to update role",
        title: "Error",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      notifications.show({
        color: "green",
        message: "User role has been updated successfully",
        title: "Role Updated",
      });
      setEditingUser(null);
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      await api.$use.user.deactivate(userId);
    },
    onError: (error) => {
      notifications.show({
        color: "red",
        message:
          error instanceof Error ? error.message : "Failed to delete user",
        title: "Error",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      notifications.show({
        color: "green",
        message: "User has been deactivated successfully",
        title: "User Deleted",
      });
    },
  });

  const handleEditRole = (user: User) => {
    setEditingUser(user);
    setNewRole(user.role);
  };

  const handleUpdateRole = () => {
    if (!editingUser) return;

    updateUserRoleMutation.mutate({
      role: newRole,
      userId: editingUser.uid,
    });
  };

  const handleDeleteUser = (user: User) => {
    modals.openConfirmModal({
      children: (
        <Text size="sm">
          Are you sure you want to delete <strong>{user.displayName}</strong> (
          {user.email})? This action will deactivate their account and they will
          lose access to the platform.
        </Text>
      ),
      confirmProps: { color: "red" },
      labels: { cancel: "Cancel", confirm: "Delete" },
      onConfirm: () => deleteUserMutation.mutate(user.uid),
      title: "Delete User",
    });
  };

  const handleResetPassword = (user: User) => {
    openResetUserPasswordModal(user);
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "blue";
      case "student":
        return "gray";
      case "super-admin":
        return "red";
      default:
        return "gray";
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "admin":
        return <IconUserCheck size="1rem" />;
      case "student":
        return null;
      case "super-admin":
        return <IconShield size="1rem" />;
      default:
        return null;
    }
  };

  const getStats = () => {
    const stats = users.reduce(
      (acc, user) => {
        acc.total++;
        if (user.isActive) acc.active++;
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      },
      {
        active: 0,
        admin: 0,
        student: 0,
        "super-admin": 0,
        total: 0,
      } as Record<string, number>,
    );
    return stats;
  };

  if (isLoading) {
    return (
      <Container py="xl" size="lg">
        <Loader size="lg" />
      </Container>
    );
  }

  const stats = getStats();

  return (
    <Container py="xl" size="lg">
      <Stack gap="xl">
        <div>
          <Title c="fun-green.8" order={1}>
            Super Admin Dashboard
          </Title>
          <Text c="dimmed" size="lg">
            Manage user roles and permissions across the platform
          </Text>
        </div>

        {/* Stats Cards */}
        <Group grow>
          <Card p="md" radius="md" shadow="sm" withBorder>
            <Stack align="center" gap="xs">
              <Text c="fun-green.7" fw={700} size="xl">
                {stats.total}
              </Text>
              <Text c="dimmed" size="sm">
                Total Users
              </Text>
            </Stack>
          </Card>

          <Card p="md" radius="md" shadow="sm" withBorder>
            <Stack align="center" gap="xs">
              <Text c="blue.6" fw={700} size="xl">
                {stats.active}
              </Text>
              <Text c="dimmed" size="sm">
                Active Users
              </Text>
            </Stack>
          </Card>

          <Card p="md" radius="md" shadow="sm" withBorder>
            <Stack align="center" gap="xs">
              <Text c="red.6" fw={700} size="xl">
                {stats["super-admin"]}
              </Text>
              <Text c="dimmed" size="sm">
                Super Admins
              </Text>
            </Stack>
          </Card>

          <Card p="md" radius="md" shadow="sm" withBorder>
            <Stack align="center" gap="xs">
              <Text c="blue.6" fw={700} size="xl">
                {stats.admin}
              </Text>
              <Text c="dimmed" size="sm">
                Admins
              </Text>
            </Stack>
          </Card>

          <Card p="md" radius="md" shadow="sm" withBorder>
            <Stack align="center" gap="xs">
              <Text c="gray.6" fw={700} size="xl">
                {stats.student}
              </Text>
              <Text c="dimmed" size="sm">
                Students
              </Text>
            </Stack>
          </Card>
        </Group>

        {/* Users Management */}
        <Card p="lg" radius="md" shadow="sm" withBorder>
          <Stack gap="md">
            <div>
              <Title order={3}>User Management</Title>
              <Text c="dimmed" size="sm">
                Change user roles and manage access permissions
              </Text>
            </div>

            <Stack gap="sm">
              {users.map((user) => (
                <Paper key={user.id} p="md" withBorder>
                  <Group align="center" justify="space-between">
                    <div style={{ flex: 1 }}>
                      <Group align="center" gap="sm">
                        <Text fw={500}>{user.displayName}</Text>
                        <Badge
                          color={getRoleBadgeColor(user.role)}
                          leftSection={getRoleIcon(user.role)}
                          size="sm"
                        >
                          {user.role.replace("-", " ")}
                        </Badge>
                        {!user.isActive && (
                          <Badge color="red" size="sm">
                            Deactivated
                          </Badge>
                        )}
                      </Group>
                      <Text c="dimmed" size="sm">
                        {user.email}
                      </Text>
                      <Text c="dimmed" size="xs">
                        Created: {new Date(user.createdAt).toLocaleDateString()}
                      </Text>
                    </div>

                    <Group gap="xs">
                      <ActionIcon
                        color="grape"
                        onClick={() => handleResetPassword(user)}
                        variant="subtle"
                      >
                        <IconKey size="1rem" />
                      </ActionIcon>

                      <ActionIcon
                        color="blue"
                        disabled={user.role === "super-admin"}
                        onClick={() => handleEditRole(user)}
                        variant="subtle"
                      >
                        <IconEdit size="1rem" />
                      </ActionIcon>

                      {user.role !== "super-admin" && (
                        <ActionIcon
                          color="red"
                          loading={deleteUserMutation.isPending}
                          onClick={() => handleDeleteUser(user)}
                          variant="subtle"
                        >
                          <IconTrash size="1rem" />
                        </ActionIcon>
                      )}
                    </Group>
                  </Group>
                </Paper>
              ))}

              {users.length === 0 && (
                <Text c="dimmed" py="xl" ta="center">
                  No users found
                </Text>
              )}
            </Stack>
          </Stack>
        </Card>

        {/* Edit Role Modal */}
        <Modal
          centered
          onClose={() => setEditingUser(null)}
          opened={!!editingUser}
          title="Change User Role"
        >
          {editingUser && (
            <Stack gap="md">
              <div>
                <Text fw={500}>{editingUser.displayName}</Text>
                <Text c="dimmed" size="sm">
                  {editingUser.email}
                </Text>
              </div>

              <Select
                data={[
                  { label: "Student", value: "student" },
                  { label: "Administrator", value: "admin" },
                  { label: "Super Administrator", value: "super-admin" },
                ]}
                label="New Role"
                onChange={(value) => setNewRole(value as UserRole)}
                value={newRole}
              />

              <Group justify="flex-end">
                <Button onClick={() => setEditingUser(null)} variant="subtle">
                  Cancel
                </Button>
                <Button
                  color="fun-green"
                  disabled={newRole === editingUser.role}
                  loading={updateUserRoleMutation.isPending}
                  onClick={handleUpdateRole}
                >
                  Update Role
                </Button>
              </Group>
            </Stack>
          )}
        </Modal>
      </Stack>
    </Container>
  );
}
