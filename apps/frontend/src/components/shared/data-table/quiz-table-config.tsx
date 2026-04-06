import type { ColumnDef } from "@tanstack/react-table";

import type { QuizWithId } from "@/types";

import { ActionIcon, Badge, Group, Menu, Stack, Text } from "@mantine/core";
import {
  IconCalendar,
  IconClipboard,
  IconDots,
  IconEdit,
  IconEye,
  IconTrash,
} from "@tabler/icons-react";

import { formatDate } from "@/utils/date-utils";

export interface QuizTableActions {
  onDelete: (quizId: string) => void;
  onEdit: (quizId: string) => void;
  onManageQuestions: (quizId: string) => void;
  onView: (quizId: string) => void;
}

interface QuizTableActionsProps {
  actions: QuizTableActions;
  quiz: QuizWithId;
}

export function createQuizColumns(
  actions: QuizTableActions,
  courses: { id: string; title: string }[] = []
): ColumnDef<QuizWithId>[] {
  return [
    {
      accessorFn: (quiz) => quiz.title,
      cell: ({ row }) => {
        const quiz = row.original;
        return (
          <div>
            <Text fw={500}>{quiz.title}</Text>
            {quiz.description && (
              <Text c="dimmed" size="sm" truncate>
                {quiz.description}
              </Text>
            )}
            <Text c="dimmed" size="xs">
              {quiz.questions.length} questions
            </Text>
          </div>
        );
      },
      header: "Quiz Details",
      id: "details",
    },
    {
      accessorKey: "courseId",
      cell: ({ row }) => {
        const quiz = row.original;
        const course = courses.find((c) => c.id === quiz.courseId);
        return (
          <Badge color="blue" variant="light">
            {course?.title || "Unknown Course"}
          </Badge>
        );
      },
      header: "Course",
      id: "course",
    },
    {
      accessorFn: (quiz) => quiz.passingScore,
      cell: ({ row }) => {
        const quiz = row.original;
        return (
          <Stack gap={4}>
            <Text size="sm">Pass: {quiz.passingScore}%</Text>
            <Text size="sm">Time: {quiz.timeLimit || "No limit"} min</Text>
            <Text size="sm">Attempts: {quiz.maxAttempts || "Unlimited"}</Text>
          </Stack>
        );
      },
      header: "Settings",
      id: "settings",
    },
    {
      accessorKey: "createdAt",
      cell: ({ row }) => {
        const quiz = row.original;
        return (
          <Group gap={4}>
            <IconCalendar className="text-gray-400" size={14} />
            <Text c="dimmed" size="sm">
              {formatDate(quiz.createdAt)}
            </Text>
          </Group>
        );
      },
      header: "Created",
      id: "created",
    },
    {
      cell: ({ row }) => (
        <QuizTableActions actions={actions} quiz={row.original} />
      ),
      enableSorting: false,
      header: "Actions",
      id: "actions",
    },
  ];
}

export function createQuizTableFilters(
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
  ];
}

function QuizTableActions({ actions, quiz }: QuizTableActionsProps) {
  return (
    <Menu shadow="md" width={200}>
      <Menu.Target>
        <ActionIcon color="gray" variant="subtle">
          <IconDots size={16} />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={<IconEye size={14} />}
          onClick={() => actions.onView(quiz.id)}
        >
          View Details
        </Menu.Item>
        <Menu.Item
          leftSection={<IconEdit size={14} />}
          onClick={() => actions.onEdit(quiz.id)}
        >
          Edit Quiz
        </Menu.Item>
        <Menu.Item
          leftSection={<IconClipboard size={14} />}
          onClick={() => actions.onManageQuestions(quiz.id)}
        >
          Manage Questions
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item
          color="red"
          leftSection={<IconTrash size={14} />}
          onClick={() => actions.onDelete(quiz.id)}
        >
          Delete Quiz
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
