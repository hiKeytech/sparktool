import type { QuizWithId } from "@/types";

import {
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

import { type CreateQuizFormData, createQuizSchema } from "@/schemas";
import { useUpdateQuiz } from "@/services/hooks";

type CourseWithId = { id: string; title: string };

interface EditQuizModalProps {
  courses: CourseWithId[];
  quiz: QuizWithId;
}

export function openEditQuizModal(quiz: QuizWithId, courses: CourseWithId[]) {
  modals.open({
    children: <EditQuizModal courses={courses} quiz={quiz} />,
    size: "lg",
    title: "Edit Quiz",
  });
}

function EditQuizModal({ courses, quiz }: EditQuizModalProps) {
  const updateQuiz = useUpdateQuiz();

  const form = useForm<CreateQuizFormData>({
    initialValues: {
      courseId: quiz.courseId,
      description: quiz.description || "",
      maxAttempts: quiz.maxAttempts,
      passingScore: quiz.passingScore,
      timeLimit: quiz.timeLimit,
      title: quiz.title,
    },
    validate: zod4Resolver(createQuizSchema),
  });

  const handleSubmit = (values: CreateQuizFormData) => {
    updateQuiz.mutate(
      {
        quizData: {
          ...values,
          updatedAt: Date.now(),
        },
        quizId: quiz.id,
      },
      {
        onError: (error) => {
          notifications.show({
            color: "red",
            icon: <IconAlertCircle size={16} />,
            message: error.message || "Failed to update quiz",
            title: "Error",
          });
        },
        onSuccess: () => {
          notifications.show({
            color: "green",
            icon: <IconCheck size={16} />,
            message: "Quiz updated successfully",
            title: "Success",
          });
          modals.closeAll();
        },
      }
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

        <Group justify="flex-end">
          <Button onClick={() => modals.closeAll()} variant="outline">
            Cancel
          </Button>
          <Button
            className="bg-fun-green-600 hover:bg-fun-green-700"
            loading={updateQuiz.isPending}
            type="submit"
          >
            Update Quiz
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
