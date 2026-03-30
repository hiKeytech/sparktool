import type { Course } from "@/types";

import { Button, Group, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { IconAlertTriangle } from "@tabler/icons-react";

import { useDeleteCourse } from "@/services/hooks";

type CourseWithId = Course & { id: string };

interface DeleteCourseModalProps {
  course: CourseWithId;
  onSuccess?: () => void;
}

export function DeleteCourseModal({
  course,
  onSuccess,
}: DeleteCourseModalProps) {
  const deleteCourse = useDeleteCourse();

  const handleDelete = () => {
    deleteCourse.mutate(
      { courseId: course.id },
      {
        onSuccess: () => {
          modals.closeAll();
          onSuccess?.();
        },
      }
    );
  };

  return (
    <Stack gap="md">
      <Group gap="sm">
        <IconAlertTriangle color="red" size={20} />
        <Text fw={500}>Confirm Course Deletion</Text>
      </Group>

      <Text c="dimmed" size="sm">
        Are you sure you want to delete <strong>"{course.title}"</strong>? This
        action cannot be undone and will:
      </Text>

      <Stack gap="xs" ml="md">
        <Text c="dimmed" size="sm">
          • Remove the course from all student enrollments
        </Text>
        <Text c="dimmed" size="sm">
          • Delete all course progress and completion data
        </Text>
        <Text c="dimmed" size="sm">
          • Remove associated quiz scores and certificates
        </Text>
        <Text c="dimmed" size="sm">
          • Permanently delete all course content
        </Text>
      </Stack>

      <Group justify="flex-end" mt="lg">
        <Button onClick={() => modals.closeAll()} variant="light">
          Cancel
        </Button>
        <Button
          color="red"
          loading={deleteCourse.isPending}
          onClick={handleDelete}
        >
          Delete Course
        </Button>
      </Group>
    </Stack>
  );
}

export const openDeleteCourseModal = (
  course: CourseWithId,
  onSuccess?: () => void
) => {
  modals.open({
    children: <DeleteCourseModal course={course} onSuccess={onSuccess} />,
    size: "md",
    title: "Delete Course",
  });
};
