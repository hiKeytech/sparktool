import type { ColumnDef } from "@tanstack/react-table";

import type { User } from "@/types";

import { ActionIcon, Badge, Group, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconEdit, IconTrash, IconUser } from "@tabler/icons-react";

export function AdminDashboardTableActions({
  onDelete,
  onEdit,
  user,
}: {
  onDelete: (userId: string) => void;
  onEdit: (user: User) => void;
  user: User;
}) {
  const handleDelete = () => {
    modals.openConfirmModal({
      children: (
        <Text size="sm">
          Are you sure you want to permanently delete{" "}
          <strong>{user.displayName}</strong>? This action cannot be undone.
        </Text>
      ),
      confirmProps: { color: "red" },
      labels: { cancel: "Cancel", confirm: "Delete" },
      onConfirm: () => onDelete(user.uid),
      title: "Delete User",
    });
  };

  return (
    <Group gap="xs" justify="flex-end">
      <ActionIcon
        aria-label={`Edit ${user.displayName}`}
        color="blue"
        onClick={() => onEdit(user)}
        size="sm"
        variant="subtle"
      >
        <IconEdit size={16} />
      </ActionIcon>
      <ActionIcon
        aria-label={`Delete ${user.displayName}`}
        color="red"
        onClick={handleDelete}
        size="sm"
        variant="subtle"
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Group>
  );
}

export function createAdminDashboardTableColumns({
  onDelete,
  onEdit,
}: {
  onDelete: (userId: string) => void;
  onEdit: (user: User) => void;
}): ColumnDef<User>[] {
  return [
    {
      accessorKey: "displayName",
      cell: ({ row }) => (
        <Group gap="sm">
          <IconUser color="gray" size={16} />
          <Text fw={500} size="sm">
            {row.original.displayName}
          </Text>
        </Group>
      ),
      header: "Name",
    },
    {
      accessorKey: "email",
      cell: ({ row }) => (
        <Text c="dimmed" size="sm">
          {row.original.email}
        </Text>
      ),
      header: "Email",
    },
    {
      accessorKey: "role",
      cell: ({ row }) => {
        const role = row.original.role;
        const color = role === "admin" ? "blue" : "green";
        return (
          <Badge color={color} size="sm" variant="light">
            {role}
          </Badge>
        );
      },
      header: "Role",
    },
    {
      accessorKey: "studentId",
      cell: ({ row }) => {
        const studentId = row.original.studentId;
        return studentId ? (
          <Text ff="monospace" size="sm">
            {studentId}
          </Text>
        ) : (
          <Text c="dimmed" size="sm">
            N/A
          </Text>
        );
      },
      header: "Student ID",
    },
    {
      accessorKey: "isActive",
      cell: ({ row }) => {
        const isActive = row.original.isActive;
        return (
          <Badge color={isActive ? "green" : "red"} size="sm" variant="light">
            {isActive ? "Active" : "Inactive"}
          </Badge>
        );
      },
      header: "Status",
    },
    {
      cell: ({ row }) => (
        <AdminDashboardTableActions
          onDelete={onDelete}
          onEdit={onEdit}
          user={row.original}
        />
      ),
      header: "Actions",
      id: "actions",
    },
  ];
}
