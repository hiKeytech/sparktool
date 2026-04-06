import {
  Badge,
  Card,
  Center,
  Container,
  Group,
  RingProgress,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconBook, IconClock } from "@tabler/icons-react";

import { PendingOverlay } from "@/components/shared/pending-overlay";
import { useListStudentProgress } from "@/services/hooks";
import type { TenantUserPageProps } from "@/types/route-page-props";

export function StudentProgress({ tenant, user }: TenantUserPageProps) {
  const { data: progressData, isLoading } = useListStudentProgress(
    tenant?.id,
    user?.uid,
  );

  const completedCourses =
    progressData?.filter(({ status }) => status === "completed").length || 0;
  const inProgressCourses =
    progressData?.filter(({ status }) => status === "in-progress").length || 0;
  const totalCourses = progressData?.length || 0;
  const completedHours = Math.round(
    (progressData?.reduce(
      (sum, { timeSpentMinutes = 0 }) => sum + timeSpentMinutes,
      0,
    ) || 0) / 60,
  );

  const completionPercentage = Math.round(
    totalCourses > 0 ? (completedCourses / totalCourses) * 100 : 0,
  );

  if (isLoading) {
    return <PendingOverlay reason="Loading progress..." visible={isLoading} />;
  }

  return (
    <Container className="py-8" size="xl">
      <div data-aos="fade-up" data-aos-duration="600">
        <Stack gap="xl">
          {/* Header */}
          <div data-aos="fade-up" data-aos-delay="100">
            <Title className="mb-2 text-gray-800" order={1}>
              My Learning Progress
            </Title>
            <Text className="text-gray-600" size="lg">
              Track your course progress and learning journey
            </Text>
          </div>

          {/* Overview Cards */}
          <SimpleGrid
            cols={{ base: 2, md: 3 }}
            data-aos="fade-up"
            data-aos-delay="200"
            spacing="lg"
          >
            <Card
              data-aos="fade-up"
              data-aos-delay="250"
              p="lg"
              radius="lg"
              withBorder
            >
              <Stack align="center" gap="xs">
                <RingProgress
                  label={
                    <Center>
                      <Text fw={500} size="sm">
                        {completionPercentage}%
                      </Text>
                    </Center>
                  }
                  sections={[
                    { color: "fun-green", value: completionPercentage },
                  ]}
                  size={80}
                  thickness={8}
                />
                <Text className="text-gray-700" fw={500} size="sm">
                  Course Progress
                </Text>
                <Text className="text-gray-500" size="xs">
                  {completedCourses} of {totalCourses} completed
                </Text>
              </Stack>
            </Card>

            <Card
              data-aos="fade-up"
              data-aos-delay="300"
              p="lg"
              radius="lg"
              withBorder
            >
              <Stack align="center" gap="xs">
                <ThemeIcon color="blue" size={60} variant="light">
                  <IconClock size={30} />
                </ThemeIcon>
                <Text className="text-gray-700" fw={500} size="sm">
                  Learning Hours
                </Text>
                <Text fw={600} size="lg">
                  {completedHours}
                </Text>
                <Text className="text-gray-500" size="xs">
                  Total completed hours
                </Text>
              </Stack>
            </Card>

            <Card
              data-aos="fade-up"
              data-aos-delay="350"
              p="lg"
              radius="lg"
              withBorder
            >
              <Stack align="center" gap="xs">
                <ThemeIcon color="green" size={60} variant="light">
                  <IconBook size={30} />
                </ThemeIcon>
                <Text className="text-gray-700" fw={500} size="sm">
                  Total Courses
                </Text>
                <Text fw={600} size="lg">
                  {totalCourses}
                </Text>
                <Text className="text-gray-500" size="xs">
                  Enrolled courses
                </Text>
              </Stack>
            </Card>
          </SimpleGrid>

          {/* Course Progress Details */}
          <Card
            data-aos="fade-up"
            data-aos-delay="400"
            p="lg"
            radius="lg"
            withBorder
          >
            <Title className="mb-4" order={3}>
              Course Details
            </Title>
            <Stack gap="md">
              <Group justify="space-between">
                <Text size="sm">Courses Completed</Text>
                <Badge color="fun-green" variant="light">
                  {completedCourses}
                </Badge>
              </Group>
              <Group justify="space-between">
                <Text size="sm">In Progress</Text>
                <Badge color="blue" variant="light">
                  {inProgressCourses}
                </Badge>
              </Group>
              <Group justify="space-between">
                <Text size="sm">Total Learning Time</Text>
                <Badge color="yellow" variant="light">
                  {completedHours} hours
                </Badge>
              </Group>
            </Stack>
          </Card>

          {/* Individual Course Progress */}
          {progressData && progressData.length > 0 && (
            <Card
              data-aos="fade-up"
              data-aos-delay="500"
              p="lg"
              radius="lg"
              withBorder
            >
              <Title className="mb-4" order={3}>
                Individual Course Progress
              </Title>
              <Stack gap="md">
                {progressData.map((progress, index) => (
                  <div
                    data-aos="fade-up"
                    data-aos-delay={index * 100 + 600}
                    key={progress.courseId}
                  >
                    <Group justify="space-between" mb="xs">
                      <Text fw={500} size="sm">
                        Course {progress.courseId}
                      </Text>
                      <Badge
                        color={
                          progress.status === "completed"
                            ? "green"
                            : progress.status === "in-progress"
                              ? "blue"
                              : progress.status === "enrolled"
                                ? "yellow"
                                : "gray"
                        }
                        variant="light"
                      >
                        {progress.status}
                      </Badge>
                    </Group>
                    <Group gap="xs">
                      <Text c="dimmed" size="xs">
                        Progress: {progress.completionPercentage}%
                      </Text>
                      <Text c="dimmed" size="xs">
                        Time spent: {Math.round(progress.timeSpentMinutes / 60)}{" "}
                        hours
                      </Text>
                      {progress.completedAt && (
                        <Text c="dimmed" size="xs">
                          Completed:{" "}
                          {new Date(progress.completedAt).toLocaleDateString()}
                        </Text>
                      )}
                    </Group>
                  </div>
                ))}
              </Stack>
            </Card>
          )}
        </Stack>
      </div>
    </Container>
  );
}
