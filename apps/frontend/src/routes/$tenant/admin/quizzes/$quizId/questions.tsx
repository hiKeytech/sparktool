import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import type { QuizQuestion } from "@/types";
import {
  Alert,
  Button,
  Card,
  Container,
  Group,
  Loader,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconAlertCircle,
  IconArrowLeft,
  IconDeviceFloppy,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { QuestionBuilder } from "@/components/quiz/question-builder";
import { useQuiz, useUpdateQuiz } from "@/services/hooks";
import type { Tenant } from "@/schemas/tenant-contract";

export const Route = createFileRoute(
  "/$tenant/admin/quizzes/$quizId/questions",
)({
  component: QuizQuestionManagement,
});

function QuizQuestionManagement() {
  const { tenant } = Route.useRouteContext() as { tenant: Tenant };
  const navigate = useNavigate();
  const { quizId } = useParams({ strict: false }) as { quizId?: string };
  const { data: quiz, isLoading } = useQuiz(quizId);
  const updateQuiz = useUpdateQuiz();
  const [questions, setQuestions] = useState<Omit<QuizQuestion, "id">[]>([]);

  useEffect(() => {
    if (quiz) {
      setQuestions(
        (quiz.questions || []).map(({ id: _id, ...question }) => question),
      );
    }
  }, [quiz]);

  const handleSave = () => {
    if (!quiz) return;

    updateQuiz.mutate(
      {
        quizData: {
          questions: questions as QuizQuestion[],
          updatedAt: Date.now(),
        },
        quizId: quiz.id,
      },
      {
        onSuccess: () => {
          notifications.show({
            color: "green",
            message: "Quiz questions saved successfully.",
            title: "Saved",
          });
        },
      },
    );
  };

  if (isLoading) {
    return (
      <Container py="xl" size="xl">
        <Group justify="center" py="xl">
          <Loader className="text-fun-green-600" size="lg" />
        </Group>
      </Container>
    );
  }

  if (!quiz) {
    return (
      <Container py="xl" size="xl">
        <Alert
          color="red"
          icon={<IconAlertCircle size={16} />}
          title="Quiz not found"
        >
          This quiz could not be loaded for the current tenant.
        </Alert>
      </Container>
    );
  }

  return (
    <Container py="xl" size="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <div>
            <Button
              leftSection={<IconArrowLeft size={16} />}
              mb="md"
              onClick={() =>
                tenant.id &&
                navigate({
                  params: { quizId: quiz.id, tenant: tenant.id },
                  to: "/$tenant/admin/quizzes/$quizId",
                })
              }
              variant="subtle"
            >
              Back to Quiz Details
            </Button>
            <Title className="text-fun-green-800" order={1}>
              Manage Questions
            </Title>
            <Text c="dimmed">
              Update the assessment content for {quiz.title}.
            </Text>
          </div>

          <Button
            leftSection={<IconDeviceFloppy size={16} />}
            loading={updateQuiz.isPending}
            onClick={handleSave}
          >
            Save Questions
          </Button>
        </Group>

        <Card p="lg" radius="lg" withBorder>
          <Stack gap="md">
            <Text c="dimmed">
              Question order and scoring are saved directly to this quiz. At
              least one question is required.
            </Text>
            <QuestionBuilder onChange={setQuestions} questions={questions} />
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
