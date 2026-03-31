import {
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Loader,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconBook,
  IconCalendar,
  IconChecklist,
  IconClock,
  IconTarget,
} from "@tabler/icons-react";
import { useNavigate, useParams } from "@tanstack/react-router";

import { useListCourses, useQuiz } from "@/services/hooks";
import { formatDate } from "@/utils/date-utils";
import type { TenantPageProps } from "@/types/route-page-props";

export function QuizDetails({ tenant }: TenantPageProps) {
  const navigate = useNavigate();
  const { quizId } = useParams({ strict: false }) as { quizId?: string };
  const { data: quiz, isLoading } = useQuiz(quizId);
  const { data: courses = [] } = useListCourses(tenant?.id);

  const course = courses.find((item) => item.id === quiz?.courseId);

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
        <Card p="xl" radius="lg" withBorder>
          <Stack align="center" gap="md">
            <Title order={3}>Quiz not found</Title>
            <Text c="dimmed" ta="center">
              This quiz could not be loaded for the current tenant.
            </Text>
            <Button
              leftSection={<IconArrowLeft size={16} />}
              onClick={() =>
                tenant?.id &&
                navigate({
                  params: { tenant: tenant.id },
                  to: "/$tenant/admin/quizzes",
                })
              }
              variant="light"
            >
              Back to Quiz Management
            </Button>
          </Stack>
        </Card>
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
                tenant?.id &&
                navigate({
                  params: { tenant: tenant.id },
                  to: "/$tenant/admin/quizzes",
                })
              }
              variant="subtle"
            >
              Back to Quiz Management
            </Button>
            <Title className="text-fun-green-800" order={1}>
              {quiz.title}
            </Title>
            <Text c="dimmed">
              Review assessment settings before editing questions.
            </Text>
          </div>
          <Button
            onClick={() =>
              tenant?.id &&
              navigate({
                params: { quizId: quiz.id, tenant: tenant.id },
                to: "/$tenant/admin/quizzes/$quizId/questions",
              })
            }
          >
            Manage Questions
          </Button>
        </Group>

        <Grid>
          <Grid.Col span={{ base: 12, md: 6, xl: 3 }}>
            <Card p="md" radius="lg" withBorder>
              <Group justify="space-between">
                <div>
                  <Text c="dimmed" size="sm">
                    Course
                  </Text>
                  <Text fw={700} size="lg">
                    {course?.title || "Unknown Course"}
                  </Text>
                </div>
                <ThemeIcon color="blue" size={40} variant="light">
                  <IconBook size={20} />
                </ThemeIcon>
              </Group>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, xl: 3 }}>
            <Card p="md" radius="lg" withBorder>
              <Group justify="space-between">
                <div>
                  <Text c="dimmed" size="sm">
                    Question Count
                  </Text>
                  <Text fw={700} size="lg">
                    {quiz.questions.length}
                  </Text>
                </div>
                <ThemeIcon color="grape" size={40} variant="light">
                  <IconChecklist size={20} />
                </ThemeIcon>
              </Group>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, xl: 3 }}>
            <Card p="md" radius="lg" withBorder>
              <Group justify="space-between">
                <div>
                  <Text c="dimmed" size="sm">
                    Passing Score
                  </Text>
                  <Text fw={700} size="lg">
                    {quiz.passingScore}%
                  </Text>
                </div>
                <ThemeIcon color="orange" size={40} variant="light">
                  <IconTarget size={20} />
                </ThemeIcon>
              </Group>
            </Card>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6, xl: 3 }}>
            <Card p="md" radius="lg" withBorder>
              <Group justify="space-between">
                <div>
                  <Text c="dimmed" size="sm">
                    Time Limit
                  </Text>
                  <Text fw={700} size="lg">
                    {quiz.timeLimit || "No limit"}
                  </Text>
                </div>
                <ThemeIcon color="teal" size={40} variant="light">
                  <IconClock size={20} />
                </ThemeIcon>
              </Group>
            </Card>
          </Grid.Col>
        </Grid>

        <Card p="lg" radius="lg" withBorder>
          <Stack gap="md">
            <Title order={3}>Quiz Overview</Title>
            {quiz.description ? (
              <Text>{quiz.description}</Text>
            ) : (
              <Text c="dimmed">
                No description has been provided for this quiz.
              </Text>
            )}

            <Group gap="sm">
              <Badge color="green" variant="light">
                Max Attempts: {quiz.maxAttempts || "Unlimited"}
              </Badge>
              <Badge color="blue" variant="light">
                Created {formatDate(quiz.createdAt)}
              </Badge>
              <Badge
                color="gray"
                leftSection={<IconCalendar size={12} />}
                variant="light"
              >
                Updated {formatDate(quiz.updatedAt)}
              </Badge>
            </Group>
          </Stack>
        </Card>

        <Card p="lg" radius="lg" withBorder>
          <Stack gap="md">
            <Group justify="space-between">
              <Title order={3}>Question Preview</Title>
              <Text c="dimmed" size="sm">
                {quiz.questions.length} total questions
              </Text>
            </Group>

            {quiz.questions.length ? (
              <Stack gap="sm">
                {quiz.questions.map((question, index) => (
                  <Card
                    key={question.id || `${question.question}-${index}`}
                    bg="gray.0"
                    p="md"
                    withBorder
                  >
                    <Stack gap="xs">
                      <Group justify="space-between">
                        <Text fw={600}>Question {index + 1}</Text>
                        <Badge variant="light">{question.type}</Badge>
                      </Group>
                      <Text>{question.question}</Text>
                      <Text c="dimmed" size="sm">
                        Points: {question.points}
                      </Text>
                    </Stack>
                  </Card>
                ))}
              </Stack>
            ) : (
              <Text c="dimmed">No questions have been added yet.</Text>
            )}
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
