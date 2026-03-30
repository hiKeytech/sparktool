import type { QuizWithId } from "@/types";

import { Alert, Button, Group, Stack, Text } from "@mantine/core";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";

import { useDeleteQuiz } from "@/services/hooks";

interface DeleteQuizModalProps {
  quiz: QuizWithId;
}

export function openDeleteQuizModal(quiz: QuizWithId) {
  modals.open({
    centered: true,
    children: <DeleteQuizModal quiz={quiz} />,
    title: "Delete Quiz",
  });
}

function DeleteQuizModal({ quiz }: DeleteQuizModalProps) {
  const deleteQuiz = useDeleteQuiz();

  const handleDelete = () => {
    deleteQuiz.mutate(quiz.id, {
      onError: (error) => {
        notifications.show({
          color: "red",
          icon: <IconAlertCircle size={16} />,
          message: error.message || "Failed to delete quiz",
          title: "Error",
        });
      },
      onSuccess: () => {
        notifications.show({
          color: "green",
          icon: <IconCheck size={16} />,
          message: "Quiz deleted successfully",
          title: "Success",
        });
        modals.closeAll();
      },
    });
  };

  return (
    <Stack gap="md">
      <Text>
        Are you sure you want to delete <strong>{quiz.title}</strong>?
      </Text>

      <Alert color="red" icon={<IconAlertCircle size={16} />} title="Warning">
        This action cannot be undone. All quiz attempts and results will be
        preserved for reporting purposes, but the quiz will no longer be
        available to students.
      </Alert>

      <Group justify="flex-end">
        <Button onClick={() => modals.closeAll()} variant="outline">
          Cancel
        </Button>
        <Button
          color="red"
          loading={deleteQuiz.isPending}
          onClick={handleDelete}
        >
          Delete Quiz
        </Button>
      </Group>
    </Stack>
  );
}
