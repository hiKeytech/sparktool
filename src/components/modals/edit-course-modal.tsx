import type { Course } from "@/types";

import {
    ActionIcon,
    Autocomplete,
    Box,
    Button,
    Fieldset,
    Grid,
    Group,
    NumberInput,
    Select,
    Stack,
    Switch,
    Text,
    Textarea,
    TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import { zod4Resolver } from "mantine-form-zod-resolver";

import { createCourseSchema } from "@/schemas";
import type { CreateCourseFormData } from "@/schemas";
import { useUpdateCourse } from "@/services/hooks";

type CourseWithId = Course & { id: string };

interface EditCourseModalProps {
  categories: string[];
  course: CourseWithId;
  onSuccess?: () => void;
}

export function EditCourseModal({
  categories,
  course,
  onSuccess,
}: EditCourseModalProps) {
  const updateCourse = useUpdateCourse();

  const form = useForm<CreateCourseFormData>({
    initialValues: {
      category: course.category || "",
      description: course.description || "",
      difficulty: course.difficulty || "beginner",
      estimatedDurationInMinutes: course.estimatedDurationInMinutes || 0,
      featured: course.featured || false,
      instructors: course.instructors?.length
        ? course.instructors.map((i) => ({
            biography: i?.biography || "",
            email: i?.email || "",
            name: i?.name || "",
            title: i?.title || "",
          }))
        : [{ biography: "", email: "", name: "", title: "" }],
      learningObjectives: course.learningObjectives || [],
      prerequisites: course.prerequisites || [],
      price: course.price || 0,
      published: course.published || false,
      shortDescription: course.shortDescription || "",
      tags: course.tags || [],
      thumbnailUrl: course.thumbnailUrl || "",
      title: course.title || "",
      previewVideoUrl: course.previewVideoUrl || "",
    },
    validate: zod4Resolver(createCourseSchema),
  });

  const handleSubmit = (values: CreateCourseFormData) => {
    const submissionData = {
      ...values,
      instructors: values.instructors.map((i) => ({
        ...i,
        biography: i.biography || null,
        email: i.email || null,
        title: i.title || null,
      })),
      shortDescription: values.shortDescription || null,
      thumbnailUrl: values.thumbnailUrl || null,
    };

    updateCourse.mutate(
      {
        courseData: submissionData,
        courseId: course.id,
      },
      {
        onSuccess: () => {
          modals.closeAll();
          onSuccess?.();
        },
      }
    );
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <Text c="dimmed" size="sm">
          Edit course details. Changes will be saved immediately.
        </Text>

        <Grid>
          <Grid.Col span={12}>
            <TextInput
              label="Course Title"
              placeholder="Enter course title"
              required
              {...form.getInputProps("title")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Textarea
              label="Description"
              placeholder="Enter course description"
              required
              rows={3}
              {...form.getInputProps("description")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Autocomplete
              data={categories}
              label="Category"
              placeholder="Select or type a category"
              required
              {...form.getInputProps("category")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Select
              data={[
                { label: "Beginner", value: "beginner" },
                { label: "Intermediate", value: "intermediate" },
                { label: "Advanced", value: "advanced" },
              ]}
              label="Difficulty"
              required
              {...form.getInputProps("difficulty")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <NumberInput
              label="Duration (hours)"
              min={0}
              placeholder="Enter duration"
              required
              {...form.getInputProps("estimatedDurationInMinutes")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Box>
              <Group justify="space-between" mb="md">
                <Text fw={500}>Instructors</Text>
                <Button
                  leftSection={<IconPlus size={14} />}
                  onClick={() =>
                    form.insertListItem("instructors", {
                      biography: "",
                      email: "",
                      name: "",
                      title: "",
                    })}
                  size="xs"
                  variant="light"
                >
                  Add Instructor
                </Button>
              </Group>

              <Stack gap="md">
                {form.values.instructors.map((_, index) => (
                  <Fieldset
                    key={index}
                    legend={
                      <Group justify="space-between" w="100%">
                        <Text fw={500} size="sm">
                          Instructor {index + 1}
                        </Text>
                        {form.values.instructors.length > 1 && (
                          <ActionIcon
                            color="red"
                            onClick={() =>
                              form.removeListItem("instructors", index)}
                            size="sm"
                            variant="light"
                          >
                            <IconTrash size={14} />
                          </ActionIcon>
                        )}
                      </Group>
                    }
                  >
                    <Grid>
                      <Grid.Col span={12}>
                        <TextInput
                          label="Name"
                          placeholder="Enter instructor name"
                          required
                          {...form.getInputProps(`instructors.${index}.name`)}
                        />
                      </Grid.Col>
                      <Grid.Col span={12}>
                        <Textarea
                          label="Bio (optional)"
                          minRows={2}
                          placeholder="Enter instructor bio"
                          {...form.getInputProps(`instructors.${index}.biography`)}
                        />
                      </Grid.Col>
                    </Grid>
                  </Fieldset>
                ))}
              </Stack>
            </Box>
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              label="Video URL"
              placeholder="Enter video URL"
              required
              {...form.getInputProps("previewVideoUrl")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <Switch
              label="Published"
              {...form.getInputProps("published", { type: "checkbox" })}
            />
          </Grid.Col>
        </Grid>

        <Group justify="flex-end" mt="lg">
          <Button onClick={() => modals.closeAll()} variant="light">
            Cancel
          </Button>
          <Button
            className="bg-fun-green-600 hover:bg-fun-green-700"
            loading={updateCourse.isPending}
            type="submit"
          >
            Save Changes
          </Button>
        </Group>
      </Stack>
    </form>
  );
}

export const openEditCourseModal = (
  course: CourseWithId,
  categories: string[],
  onSuccess?: () => void
) => {
  modals.open({
    children: (
      <EditCourseModal
        categories={categories}
        course={course}
        onSuccess={onSuccess}
      />
    ),
    size: "lg",
    title: "Edit Course",
  });
};
