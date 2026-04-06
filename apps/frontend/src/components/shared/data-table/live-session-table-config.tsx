import type { ColumnDef } from "@tanstack/react-table";

import type { LiveSession, LiveSessionStatus } from "@/types";

import { ActionIcon, Badge, Group, Menu, Stack, Text } from "@mantine/core";
import {
  IconCalendar,
  IconDots,
  IconEdit,
  IconTrash,
  IconUsers,
  IconVideo,
} from "@tabler/icons-react";
import { format } from "date-fns";

export interface LiveSessionTableActions {
  onDelete: (sessionId: string) => void;
  onEdit: (sessionId: string) => void;
  onJoinMeeting: (session: LiveSession) => void;
}

interface LiveSessionTableActionsProps {
  actions: LiveSessionTableActions;
  session: LiveSession;
}

const statusColors: Record<LiveSessionStatus, string> = {
  active: "green",
  cancelled: "red",
  ended: "gray",
  scheduled: "blue",
};

export function createLiveSessionColumns(
  actions: LiveSessionTableActions,
  courses: { id: string; title: string }[] = []
): ColumnDef<LiveSession>[] {
  return [
    {
      accessorFn: (session) => session.title,
      cell: ({ row }) => {
        const session = row.original;
        const course = courses.find((c) => c.id === session.courseId);
        return (
          <div>
            <Text fw={500}>{session.title}</Text>
            {session.description && (
              <Text c="dimmed" size="sm" truncate>
                {session.description}
              </Text>
            )}
            <Text c="dimmed" size="xs">
              {course?.title || "Unknown Course"}
            </Text>
          </div>
        );
      },
      header: "Session Details",
      id: "details",
    },
    {
      accessorKey: "instructorName",
      cell: ({ row }) => {
        const session = row.original;
        return <Text size="sm">{session.instructorName}</Text>;
      },
      header: "Instructor",
      id: "instructor",
    },
    {
      accessorKey: "scheduledAt",
      cell: ({ row }) => {
        const session = row.original;
        return (
          <Stack gap={4}>
            <Group gap={4}>
              <IconCalendar className="text-gray-400" size={14} />
              <Text size="sm">
                {format(new Date(session.scheduledAt), "MMM dd, yyyy")}
              </Text>
            </Group>
            <Text c="dimmed" size="xs">
              {format(new Date(session.scheduledAt), "h:mm a")} (
              {session.duration} min)
            </Text>
          </Stack>
        );
      },
      header: "Scheduled Time",
      id: "schedule",
    },
    {
      accessorKey: "status",
      cell: ({ row }) => {
        const session = row.original;
        return (
          <Badge color={statusColors[session.status]} variant="light">
            {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
          </Badge>
        );
      },
      header: "Status",
      id: "status",
    },
    {
      accessorFn: (session) => session.participants.length,
      cell: ({ row }) => {
        const session = row.original;
        return (
          <Group gap={4}>
            <IconUsers className="text-gray-400" size={14} />
            <Text size="sm">{session.participants.length}</Text>
            {session.maxParticipants && (
              <Text c="dimmed" size="xs">
                / {session.maxParticipants}
              </Text>
            )}
          </Group>
        );
      },
      header: "Participants",
      id: "participants",
    },
    {
      cell: ({ row }) => (
        <LiveSessionTableActions actions={actions} session={row.original} />
      ),
      enableSorting: false,
      header: "Actions",
      id: "actions",
    },
  ];
}

export function createLiveSessionTableFilters(
  courses: { id: string; title: string }[] = []
) {
  return [
    {
      key: "courseId",
      label: "Course",
      options: courses.map((course) => ({
        label: course.title,
        value: course.id,
      })),
    },
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Scheduled", value: "scheduled" },
        { label: "Active", value: "active" },
        { label: "Ended", value: "ended" },
        { label: "Cancelled", value: "cancelled" },
      ],
    },
  ];
}

function LiveSessionTableActions({
  actions,
  session,
}: LiveSessionTableActionsProps) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon color="gray" variant="subtle">
          <IconDots size={16} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconEdit size={14} />}
          onClick={() => actions.onEdit(session.id)}
        >
          Edit Session
        </Menu.Item>
        {session.jitsiMeetUrl && (
          <Menu.Item
            leftSection={<IconVideo size={14} />}
            onClick={() => actions.onJoinMeeting(session)}
          >
            Join Meeting
          </Menu.Item>
        )}
        <Menu.Divider />
        <Menu.Item
          color="red"
          leftSection={<IconTrash size={14} />}
          onClick={() => actions.onDelete(session.id)}
        >
          Delete Session
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
