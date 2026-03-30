import type { User } from "@/types";

import {
  ActionIcon,
  Avatar,
  Badge,
  Group,
  Menu,
  Progress,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  IconBan,
  IconCertificate,
  IconDots,
  IconEdit,
  IconEye,
  IconKey,
  IconMail,
  IconTrash,
  IconUserCheck,
  IconUserX,
} from "@tabler/icons-react";
import { type ColumnDef } from "@tanstack/react-table";

import { formatRelativeTime } from "@/utils/date-utils";

interface UserTableActionsProps {
  onDelete: (user: User) => void;
  onEdit: (user: User) => void;
  onResetPassword: (user: User) => void;
  onSendMessage: (user: User) => void;
  onToggleStatus: (userId: string, isActive: boolean) => void;
  onView: (userId: string) => void;
  user: User;
}

export function createUserTableColumns({
  onDelete,
  onEdit,
  onResetPassword,
  onSendMessage,
  onToggleStatus,
  onView,
}: {
  onDelete: (user: User) => void;
  onEdit: (user: User) => void;
  onResetPassword: (user: User) => void;
  onSendMessage: (user: User) => void;
  onToggleStatus: (userId: string, isActive: boolean) => void;
  onView: (userId: string) => void;
}): ColumnDef<User>[] {
  return [
    {
      accessorKey: "displayName",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <Group gap="sm">
            <Avatar radius="xl" size={32} src={user.photoURL}>
              {user.displayName
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </Avatar>
            <div>
              <Text fw={500} size="sm">
                {user.displayName}
              </Text>
              <Text className="text-gray-500" size="xs">
                {user.email}
              </Text>
            </div>
          </Group>
        );
      },
      header: "Student",
    },
    {
      accessorKey: "studentId",
      cell: ({ row }) => (
        <Text fw={500} size="sm">
          {row.original.studentId || "N/A"}
        </Text>
      ),
      header: "Student ID",
    },
    {
      accessorKey: "role",
      cell: ({ row }) => (
        <Badge
          color={row.original.role === "admin" ? "blue" : "gray"}
          size="sm"
          variant="light"
        >
          {row.original.role}
        </Badge>
      ),
      header: "Role",
    },
    {
      cell: ({ row }) => {
        const user = row.original;
        if (user.role !== "student") {
          return (
            <Text className="text-gray-400" size="xs">
              N/A
            </Text>
          );
        }

        // Calculate progress based on completed vs enrolled courses
        const completed = user.completedCourses?.length || 0;
        const enrolled = user.enrolledCourses?.length || 0;
        const progress =
          enrolled > 0 ? Math.round((completed / enrolled) * 100) : 0;

        return (
          <Group gap="xs">
            <Progress
              color="fun-green"
              size="sm"
              style={{ width: 60 }}
              value={progress}
            />
            <Text size="xs">{progress}%</Text>
          </Group>
        );
      },
      header: "Progress",
      id: "progress",
    },
    {
      cell: ({ row }) => {
        const user = row.original;
        const completed = user.completedCourses?.length || 0;
        const enrolled = user.enrolledCourses?.length || 0;
        return (
          <Text size="sm">
            {completed}/{enrolled}
          </Text>
        );
      },
      header: "Courses",
      id: "courses",
    },
    {
      accessorKey: "certificatesEarned",
      cell: ({ row }) => (
        <Group gap="xs">
          <IconCertificate className="text-yellow-500" size={14} />
          <Text size="sm">{row.original.certificatesEarned || 0}</Text>
        </Group>
      ),
      header: "Certificates",
    },
    {
      accessorKey: "lastLoginAt",
      cell: ({ row }) => (
        <Text className="text-gray-600" size="sm">
          {row.original.lastLoginAt
            ? formatRelativeTime(row.original.lastLoginAt)
            : "Never"}
        </Text>
      ),
      header: "Last Active",
    },
    {
      accessorKey: "isActive",
      cell: ({ row }) => (
        <Badge
          color={row.original.isActive ? "green" : "red"}
          size="sm"
          variant="light"
        >
          {row.original.isActive ? "Active" : "Inactive"}
        </Badge>
      ),
      header: "Status",
    },
    {
      cell: ({ row }) => (
        <UserTableActions
          onDelete={onDelete}
          onEdit={onEdit}
          onResetPassword={onResetPassword}
          onSendMessage={onSendMessage}
          onToggleStatus={onToggleStatus}
          onView={onView}
          user={row.original}
        />
      ),
      header: "Actions",
      id: "actions",
    },
  ];
}

function UserTableActions({
  onDelete,
  onEdit,
  onResetPassword,
  onSendMessage,
  onToggleStatus,
  onView,
  user,
}: UserTableActionsProps) {
  return (
    <Group gap="xs">
      <Tooltip label="View Details">
        <ActionIcon
          color="blue"
          onClick={() => onView(user.uid)}
          size="sm"
          variant="light"
        >
          <IconEye size={16} />
        </ActionIcon>
      </Tooltip>
      <Tooltip label="Edit User">
        <ActionIcon
          color="orange"
          onClick={() => onEdit(user)}
          size="sm"
          variant="light"
        >
          <IconEdit size={16} />
        </ActionIcon>
      </Tooltip>
      <Menu>
        <Menu.Target>
          <ActionIcon color="gray" size="sm" variant="light">
            <IconDots size={16} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          {user.isActive ? (
            <Menu.Item
              leftSection={<IconUserX size={16} />}
              onClick={() => onToggleStatus(user.uid, false)}
            >
              Deactivate
            </Menu.Item>
          ) : (
            <Menu.Item
              leftSection={<IconUserCheck size={16} />}
              onClick={() => onToggleStatus(user.uid, true)}
            >
              Activate
            </Menu.Item>
          )}
          <Menu.Item
            leftSection={<IconKey size={16} />}
            onClick={() => onResetPassword(user)}
          >
            Reset Password
          </Menu.Item>
          <Menu.Item
            leftSection={<IconMail size={16} />}
            onClick={() => onSendMessage(user)}
          >
            Send Message
          </Menu.Item>
          <Menu.Item leftSection={<IconCertificate size={16} />}>
            View Certificates
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item color="orange" leftSection={<IconBan size={16} />}>
            Suspend
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<IconTrash size={16} />}
            onClick={() => onDelete(user)}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
