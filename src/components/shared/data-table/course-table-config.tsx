import type { Course } from "@/types";

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
    IconArchive,
    IconChartBar,
    IconCopy,
    IconDots,
    IconEdit,
    IconEye,
    IconHierarchy,
    IconPlayerPause,
    IconPlayerPlay,
    IconStar,
    IconTrash,
} from "@tabler/icons-react";
import { type ColumnDef } from "@tanstack/react-table";

import { formatDate } from "@/utils/date-utils";

interface CourseTableActionsProps {
  course: CourseWithId;
  onArchive: (courseId: string) => void;
  onDelete: (courseId: string) => void;
  onDuplicate: (courseId: string) => void;
  onEdit: (courseId: string) => void;
  onEditStructure: (courseId: string) => void;
  onTogglePublished: (courseId: string) => void;
  onView: (courseId: string) => void;
  onViewAnalytics: (courseId: string) => void;
}

type CourseWithId = Course & { id: string };

function CourseTableActions({
  course,
  onArchive,
  onDelete,
  onDuplicate,
  onEdit,
  onEditStructure,
  onTogglePublished,
  onView,
  onViewAnalytics,
}: CourseTableActionsProps) {
  return (
    <Group gap="xs">
      <Tooltip label="View Course">
        <ActionIcon
          onClick={() => onView(course.id)}
          size="sm"
          variant="subtle"
        >
          <IconEye size={16} />
        </ActionIcon>
      </Tooltip>

      <Menu position="bottom-end" shadow="md" width={180}>
        <Menu.Target>
          <ActionIcon size="sm" variant="subtle">
            <IconDots size={16} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            leftSection={<IconEdit size={14} />}
            onClick={() => onEdit(course.id)}
          >
            Edit Course
          </Menu.Item>
          <Menu.Item
            leftSection={<IconHierarchy size={14} />}
            onClick={() => onEditStructure(course.id)}
          >
            Edit Structure
          </Menu.Item>
          <Menu.Item
            leftSection={<IconCopy size={14} />}
            onClick={() => onDuplicate(course.id)}
          >
            Duplicate
          </Menu.Item>
          <Menu.Item
            leftSection={
              course.published ? (
                <IconPlayerPause size={14} />
              ) : (
                <IconPlayerPlay size={14} />
              )
            }
            onClick={() => onTogglePublished(course.id)}
          >
            {course.published ? "Unpublish" : "Publish"}
          </Menu.Item>
          <Menu.Item
            leftSection={<IconChartBar size={14} />}
            onClick={() => onViewAnalytics(course.id)}
          >
            View Analytics
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item
            leftSection={<IconArchive size={14} />}
            onClick={() => onArchive(course.id)}
          >
            Archive
          </Menu.Item>
          <Menu.Item
            color="red"
            leftSection={<IconTrash size={14} />}
            onClick={() => onDelete(course.id)}
          >
            Delete
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty) {
    case "advanced":
      return "red";
    case "beginner":
      return "green";
    case "intermediate":
      return "yellow";
    default:
      return "gray";
  }
}

export const createCourseColumns = (
  handlers: Omit<CourseTableActionsProps, "course">
): ColumnDef<CourseWithId>[] => [
  {
    accessorKey: "title",
    cell: ({ row }) => {
      const course = row.original;
      return (
        <Group gap="sm">
          <Avatar
            alt={course.title ?? "Course Cover"}
            radius="md"
            size="md"
            src={course.thumbnailUrl}
          >
            {course.title?.charAt(0).toUpperCase() ?? ""}
          </Avatar>
          <div>
            <Text fw={500} size="sm">
              {course.title ?? "Untitled Course"}
            </Text>
            <Text c="dimmed" size="xs">
              {course.instructors
                ?.map((instructor) => instructor.name)
                .join(", ") || "No instructor assigned"}
            </Text>
          </div>
        </Group>
      );
    },
    header: "Course",
  },
  {
    accessorKey: "category",
    cell: ({ getValue }) => <Text size="sm">{getValue() as string}</Text>,
    header: "Category",
  },
  {
    accessorKey: "difficulty",
    cell: ({ getValue }) => {
      const difficulty = getValue() as string;
      return (
        <Badge color={getDifficultyColor(difficulty)} size="sm" variant="light">
          {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
        </Badge>
      );
    },
    header: "Difficulty",
  },
  {
    cell: ({ row }) => {
      const course = row.original;
      const sectionsCount = course.sections?.length || 0;
      const totalLessons = course.totalLessons || 0;

      return (
        <Group gap="xs">
          <Badge color="green" size="sm" variant="light">
            Hierarchical
          </Badge>
          <Text c="dimmed" size="xs">
            {sectionsCount}s, {totalLessons}l
          </Text>
        </Group>
      );
    },
    header: "Structure",
    id: "structure",
  },
  {
    accessorKey: "enrollmentCount",
    cell: ({ getValue }) => (
      <Text size="sm">{((getValue() as number) || 0).toLocaleString()}</Text>
    ),
    header: "Enrollments",
  },
  {
    cell: ({ row }) => {
      const course = row.original;
      const rate =
        course.enrollmentCount && course.enrollmentCount > 0
          ? ((course.completionCount || 0) / course.enrollmentCount) * 100
          : 0;
      return (
        <Group gap="xs">
          <Progress
            color="fun-green"
            size="sm"
            style={{ width: 60 }}
            value={rate}
          />
          <Text c="dimmed" size="sm">
            {rate.toFixed(1)}%
          </Text>
        </Group>
      );
    },
    header: "Completion Rate",
    id: "completionRate",
  },
  {
    accessorKey: "averageRating",
    cell: ({ getValue }) => {
      const rating = getValue() as number;
      return (
        <Group gap="xs">
          <IconStar className="text-yellow-500" size={14} />
          <Text size="sm">{rating ? rating.toFixed(1) : "N/A"}</Text>
        </Group>
      );
    },
    header: "Rating",
  },
  {
    accessorKey: "published",
    cell: ({ getValue }) => {
      const published = getValue() as boolean;
      return (
        <Badge color={published ? "green" : "gray"} size="sm" variant="light">
          {published ? "Published" : "Draft"}
        </Badge>
      );
    },
    header: "Status",
  },
  {
    accessorKey: "updatedAt",
    cell: ({ getValue }) => {
      const updatedAt = getValue() as number;
      return (
        <Text className="text-gray-600" size="sm">
          {formatDate(updatedAt)}
        </Text>
      );
    },
    header: "Last Updated",
  },
  {
    cell: ({ row }) => (
      <CourseTableActions course={row.original} {...handlers} />
    ),
    header: "Actions",
    id: "actions",
  },
];

export const courseTableFilters = [
  {
    key: "published",
    label: "Status",
    options: [
      { label: "Published", value: "true" },
      { label: "Draft", value: "false" },
    ],
  },
  {
    key: "difficulty",
    label: "Difficulty",
    options: [
      { label: "Beginner", value: "beginner" },
      { label: "Intermediate", value: "intermediate" },
      { label: "Advanced", value: "advanced" },
    ],
  },
];
