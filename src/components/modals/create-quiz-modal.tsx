import {
  Alert,
  Button,
  Grid,
  Group,
  NumberInput,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { zod4Resolver } from "mantine-form-zod-resolver";

import type { User } from "@/types";
import { type CreateQuizFormData, createQuizSchema } from "@/schemas";
import { useCreateQuiz } from "@/services/hooks";

type CourseWithId = { id: string; title: string };

interface CreateQuizModalProps {
  courses: CourseWithId[];
  user: User;
}

export function openCreateQuizModal(courses: CourseWithId[], user: User) {
  modals.open({
    children: <CreateQuizModal courses={courses} user={user} />,
    size: "lg",
    title: "Create New Quiz",
  });
}

function CreateQuizModal({ courses, user }: CreateQuizModalProps) {
  const createQuiz = useCreateQuiz();

  const form = useForm<CreateQuizFormData>({
    initialValues: {
      courseId: "",
      description: "",
      maxAttempts: 3,
      passingScore: 70,
      timeLimit: 30,
      title: "",
    },
    validate: zod4Resolver(createQuizSchema),
  });

  const handleSubmit = (values: CreateQuizFormData) => {
    createQuiz.mutate(
      {
        ...values,
        createdAt: Date.now(),
        createdBy: user.uid,
        questions: [],
        updatedAt: Date.now(),
      },
      {
        onError: (error) => {
          notifications.show({
            color: "red",
            icon: <IconAlertCircle size={16} />,
            message: error.message || "Failed to create quiz",
            title: "Error",
          });
        },
        onSuccess: () => {
          notifications.show({
            color: "green",
            icon: <IconCheck size={16} />,
            message: "Quiz created successfully",
            title: "Success",
          });
          modals.closeAll();
        },
      },
    );
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Quiz Title"
          placeholder="Enter quiz title"
          required
          {...form.getInputProps("title")}
        />

        <Textarea
          label="Description"
          minRows={3}
          placeholder="Enter quiz description"
          {...form.getInputProps("description")}
        />

        <Select
          data={courses.map((course) => ({
            label: course.title,
            value: course.id,
          }))}
          label="Course"
          placeholder="Select a course"
          required
          {...form.getInputProps("courseId")}
        />

        <Grid>
          <Grid.Col span={4}>
            <NumberInput
              label="Passing Score (%)"
              max={100}
              min={0}
              placeholder="70"
              required
              {...form.getInputProps("passingScore")}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <NumberInput
              label="Time Limit (minutes)"
              min={1}
              placeholder="30"
              {...form.getInputProps("timeLimit")}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <NumberInput
              label="Max Attempts"
              min={1}
              placeholder="3"
              {...form.getInputProps("maxAttempts")}
            />
          </Grid.Col>
        </Grid>

        <Alert color="blue" icon={<IconAlertCircle size={16} />} title="Note">
          You can add questions to this quiz after creating it.
        </Alert>

        <Group justify="flex-end">
          <Button onClick={() => modals.closeAll()} variant="outline">
            Cancel
          </Button>
          <Button
            className="bg-fun-green-600 hover:bg-fun-green-700"
            loading={createQuiz.isPending}
            type="submit"
          >
            Create Quiz
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
