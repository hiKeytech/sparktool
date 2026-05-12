import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuthContext } from "@/providers/auth-provider";
import {
  Button,
  Center,
  Container,
  Grid,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconClipboard,
  IconClock,
  IconPlus,
  IconTarget,
  IconUsers,
} from "@tabler/icons-react";
import {
  openCreateQuizModal,
  openDeleteQuizModal,
  openEditQuizModal,
} from "@/components/modals";
import { DataTable } from "@/components/shared/data-table";
import {
  createQuizColumns,
  createQuizTableFilters,
  type QuizTableActions,
} from "@/components/shared/data-table/quiz-table-config";
import { useListCourses, useQuizAttempts, useQuizzes } from "@/services/hooks";
import type { Tenant } from "@/schemas/tenant-contract";

export const Route = createFileRoute("/$tenant/admin/quizzes/")({
  component: QuizManagement,
});

function QuizManagement() {
  const { tenant } = Route.useRouteContext() as { tenant: Tenant };
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // Fetch data using TanStack Query
  const { data: quizzesData = [], isLoading: quizzesLoading } = useQuizzes();
  const { data: coursesData = [] } = useListCourses(tenant.id);
  const { data: quizAttempts = [] } = useQuizAttempts({});

  const quizzes = quizzesData;
  const courses = coursesData.map((course) => ({
    id: course.id || "",
    title: course.title || "",
  }));
  const completedAttempts = quizAttempts.filter(
    (attempt) => typeof attempt.completedAt === "number",
  );
  const averagePassRate = completedAttempts.length
    ? Math.round(
        (completedAttempts.filter((attempt) => attempt.passed).length /
          completedAttempts.length) *
          100,
      )
    : null;
  const averageDurationMinutes = completedAttempts.length
    ? Math.max(
        1,
        Math.round(
          completedAttempts.reduce(
            (total, attempt) => total + (attempt.timeSpent || 0),
            0,
          ) /
            completedAttempts.length /
            60,
        ),
      )
    : null;

  // Table handlers
  const tableHandlers: QuizTableActions = {
    onDelete: (quizId: string) => {
      const quiz = quizzes.find((q) => q.id === quizId);
      if (quiz) {
        openDeleteQuizModal(quiz);
      }
    },
    onEdit: (quizId: string) => {
      const quiz = quizzes.find((q) => q.id === quizId);
      if (quiz) {
        openEditQuizModal(quiz, courses);
      }
    },
    onManageQuestions: (quizId: string) => {
      if (!tenant.id) return;

      navigate({
        to: "/$tenant/admin/quizzes/$quizId/questions",
        params: { quizId, tenant: tenant.id },
      });
    },
    onView: (quizId: string) => {
      if (!tenant.id) return;

      navigate({
        to: "/$tenant/admin/quizzes/$quizId",
        params: { quizId, tenant: tenant.id },
      });
    },
  };

  if (quizzesLoading) {
    return (
      <Container py="xl" size="xl">
        <Center h={400}>
          <Stack align="center" gap="md">
            <Loader className="text-brand-600" size="xl" />
            <Text c="dimmed">Loading quizzes...</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <Container py="xl" size="xl">
      <div data-aos="fade-up">
        {/* Page Header */}
        <Group justify="space-between" mb="xl">
          <div>
            <Title className="text-brand-800" order={1}>
              Quiz Management
            </Title>
            <Text c="dimmed">Create and manage course assessments</Text>
          </div>
          <Button
            className="bg-brand-600 hover:bg-brand-700"
            leftSection={<IconPlus size={16} />}
            onClick={() => {
              if (!user) {
                return;
              }

              openCreateQuizModal(courses, user);
            }}
          >
            Create Quiz
          </Button>
        </Group>

        {/* Stats Cards */}
        <Grid data-aos="fade-up" data-aos-delay="100" mb="xl">
          <Grid.Col span={3}>
            <Paper p="md" radius="md">
              <Group gap="xs">
                <ThemeIcon color="brand" size={40} variant="light">
                  <IconClipboard size={20} />
                </ThemeIcon>
                <div>
                  <Text c="dimmed" size="sm">
                    Total Quizzes
                  </Text>
                  <Text fw={600} size="lg">
                    {quizzes.length}
                  </Text>
                </div>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col span={3}>
            <Paper p="md" radius="md">
              <Group gap="xs">
                <ThemeIcon color="blue" size={40} variant="light">
                  <IconUsers size={20} />
                </ThemeIcon>
                <div>
                  <Text c="dimmed" size="sm">
                    Active Courses
                  </Text>
                  <Text fw={600} size="lg">
                    {courses.length}
                  </Text>
                </div>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col span={3}>
            <Paper p="md" radius="md">
              <Group gap="xs">
                <ThemeIcon color="orange" size={40} variant="light">
                  <IconTarget size={20} />
                </ThemeIcon>
                <div>
                  <Text c="dimmed" size="sm">
                    Avg Pass Rate
                  </Text>
                  <Text fw={600} size="lg">
                    {averagePassRate === null
                      ? "No data"
                      : `${averagePassRate}%`}
                  </Text>
                </div>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col span={3}>
            <Paper p="md" radius="md">
              <Group gap="xs">
                <ThemeIcon color="purple" size={40} variant="light">
                  <IconClock size={20} />
                </ThemeIcon>
                <div>
                  <Text c="dimmed" size="sm">
                    Avg Duration
                  </Text>
                  <Text fw={600} size="lg">
                    {averageDurationMinutes === null
                      ? "No data"
                      : `${averageDurationMinutes} min`}
                  </Text>
                </div>
              </Group>
            </Paper>
          </Grid.Col>
        </Grid>

        {/* Quiz Table */}
        <div data-aos="fade-up" data-aos-delay="200">
          <DataTable
            columns={createQuizColumns(tableHandlers, courses)}
            data={quizzes}
            filters={createQuizTableFilters(courses)}
            loading={quizzesLoading}
            searchPlaceholder="Search quizzes..."
          />
        </div>
      </div>
    </Container>
  );
}
