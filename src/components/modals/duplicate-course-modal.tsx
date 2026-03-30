import type { Course } from "@/types";

import { Button, Group, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { z } from "zod";

import { useAuthContext } from "@/providers/auth-provider";
import { useCreateCourse } from "@/services/hooks";

type CourseWithId = Course & { id: string };

const duplicateCourseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
});

type DuplicateCourseForm = z.infer<typeof duplicateCourseSchema>;

interface DuplicateCourseModalProps {
  course: CourseWithId;
  onSuccess?: () => void;
}

export function DuplicateCourseModal({
  course,
  onSuccess,
}: DuplicateCourseModalProps) {
  const { user } = useAuthContext();
  const createCourse = useCreateCourse();

  const form = useForm<DuplicateCourseForm>({
    initialValues: {
      title: `${course.title} (Copy)`,
    },
    validate: zod4Resolver(duplicateCourseSchema),
  });

  const handleDuplicate = () => {
    if (user) {
      const duplicatedCourseData = {
        category: course.category,
        description: course.description,
        difficulty: course.difficulty,
        estimatedDurationInMinutes: course.estimatedDurationInMinutes || 0,
        featured: course.featured || false,
        instructors: course.instructors || [],
        language: course.language || "en",
        learningObjectives: course.learningObjectives,
        level: course.level || "beginner",
        prerequisites: course.prerequisites || [],
        previewVideoUrl: course.previewVideoUrl || "",
        price: course.price || 0,
        published: false, // Always start as draft
        shortDescription: course.shortDescription || "",
        tags: course.tags,
        thumbnailUrl: course.thumbnailUrl || "",
        title: form.values.title,
      };

      createCourse.mutate(
        {
          courseData: duplicatedCourseData,
          tenantId: user.tenantIds?.[0] || "ncs",
          userId: user.uid,
        },
        {
          onSuccess: () => {
            modals.closeAll();
            onSuccess?.();
          },
        }
      );
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleDuplicate)}>
      <Stack gap="md">
        <Text c="dimmed" size="sm">
          Create a copy of <strong>"{course.title}"</strong>. The duplicated
          course will include all content and settings but will be saved as a
          draft.
        </Text>

        <TextInput
          label="New Course Title"
          placeholder="Enter title for the duplicated course"
          required
          {...form.getInputProps("title")}
        />

        <Text c="dimmed" size="xs">
          Note: The duplicated course will be created as a draft and can be
          edited before publishing.
        </Text>

        <Group justify="flex-end" mt="lg">
          <Button onClick={() => modals.closeAll()} variant="light">
            Cancel
          </Button>
          <Button
            className="bg-fun-green-600 hover:bg-fun-green-700"
            loading={createCourse.isPending}
            type="submit"
          >
            Duplicate Course
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export const openDuplicateCourseModal = (
  course: CourseWithId,
  onSuccess?: () => void
) => {
  modals.open({
    children: <DuplicateCourseModal course={course} onSuccess={onSuccess} />,
    size: "md",
    title: "Duplicate Course",
  });
};
