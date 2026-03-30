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
import { useNavigate } from "@tanstack/react-router";

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
import { useListCourses, useQuizzes } from "@/services/hooks";
import { useAuthContext } from "@/providers/auth-provider";

export function QuizManagement() {
  const { tenant } = useAuthContext();
  const navigate = useNavigate();

  // Fetch data using TanStack Query
  const { data: quizzesData = [], isLoading: quizzesLoading } = useQuizzes();
  const { data: coursesData = [] } = useListCourses(tenant?.id);

  const quizzes = quizzesData;
  const courses = coursesData.map((course) => ({
    id: course.id || "",
    title: course.title || "",
  }));

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
      // @ts-expect-error route not yet implemented
      navigate({ to: "/admin/quizzes/$quizId/questions", params: { quizId } });
    },
    onView: (quizId: string) => {
      // @ts-expect-error route not yet implemented
      navigate({ to: "/admin/quizzes/$quizId", params: { quizId } });
    },
  };

  if (quizzesLoading) {
    return (
      <Container py="xl" size="xl">
        <Center h={400}>
          <Stack align="center" gap="md">
            <Loader className="text-fun-green-600" size="xl" />
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
            <Title className="text-fun-green-800" order={1}>
              Quiz Management
            </Title>
            <Text c="dimmed">Create and manage course assessments</Text>
          </div>
          <Button
            className="bg-fun-green-600 hover:bg-fun-green-700"
            leftSection={<IconPlus size={16} />}
            onClick={() => openCreateQuizModal(courses)}
          >
            Create Quiz
          </Button>
        </Group>

        {/* Stats Cards */}
        <Grid data-aos="fade-up" data-aos-delay="100" mb="xl">
          <Grid.Col span={3}>
            <Paper className="bg-fun-green-50" p="md" radius="md">
              <Group gap="xs">
                <ThemeIcon color="fun-green" size={40} variant="light">
                  <IconClipboard size={20} />
                </ThemeIcon>
                <div>
                  <Text c="dimmed" size="sm">
                    Total Quizzes
                  </Text>
                  <Text className="text-fun-green-800" fw={600} size="lg">
                    {quizzes.length}
                  </Text>
                </div>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col span={3}>
            <Paper className="bg-blue-50" p="md" radius="md">
              <Group gap="xs">
                <ThemeIcon color="blue" size={40} variant="light">
                  <IconUsers size={20} />
                </ThemeIcon>
                <div>
                  <Text c="dimmed" size="sm">
                    Active Courses
                  </Text>
                  <Text className="text-blue-800" fw={600} size="lg">
                    {courses.length}
                  </Text>
                </div>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col span={3}>
            <Paper className="bg-orange-50" p="md" radius="md">
              <Group gap="xs">
                <ThemeIcon color="orange" size={40} variant="light">
                  <IconTarget size={20} />
                </ThemeIcon>
                <div>
                  <Text c="dimmed" size="sm">
                    Avg Pass Rate
                  </Text>
                  <Text className="text-orange-800" fw={600} size="lg">
                    85%
                  </Text>
                </div>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col span={3}>
            <Paper className="bg-purple-50" p="md" radius="md">
              <Group gap="xs">
                <ThemeIcon color="purple" size={40} variant="light">
                  <IconClock size={20} />
                </ThemeIcon>
                <div>
                  <Text c="dimmed" size="sm">
                    Avg Duration
                  </Text>
                  <Text className="text-purple-800" fw={600} size="lg">
                    25 min
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
