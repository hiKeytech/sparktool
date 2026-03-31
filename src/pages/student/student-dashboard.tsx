import {
  Avatar,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Progress,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconClock,
  IconMessage,
  IconSettings,
  IconTrendingUp,
} from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";

import { NotificationsDrawer } from "@/components/notifications";
import { NCSLogo } from "@/components/shared/ncs-logo";
import { PendingOverlay } from "@/components/shared/pending-overlay";
import { useUserProgress } from "@/services/hooks";
import type { TenantUserPageProps } from "@/types/route-page-props";

export function StudentDashboard({ tenant, user }: TenantUserPageProps) {
  const navigate = useNavigate();
  const [
    notificationsOpened,
    { close: closeNotifications, open: openNotifications },
  ] = useDisclosure(false);

  const { data: userProgress, isLoading: progressLoading } = useUserProgress(
    tenant?.id,
    user?.uid,
  );

  const completedCourses =
    userProgress?.filter(({ status }) => status === "completed").length || 0;
  const inProgressCourses =
    userProgress?.filter(({ status }) => status === "in-progress").length || 0;
  const totalCourses = userProgress?.length || 0;
  const overallProgress =
    totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0;

  if (progressLoading) {
    return (
      <PendingOverlay reason="Loading dashboard..." visible={progressLoading} />
    );
  }

  return (
    <Container py="lg" size="xl">
      {/* Welcome Header */}
      <div data-aos="fade-up" data-aos-duration="600">
        <Group justify="space-between" mb="xl">
          <div>
            <Group gap="sm" mb="xs">
              <Avatar color="fun-green" size="md" src={user?.photoURL}>
                {user?.displayName?.[0]}
              </Avatar>
              <div>
                <Text c="dimmed" size="sm">
                  Home / Portal
                </Text>
                <Title className="text-gray-800" order={2}>
                  Welcome back, {user?.displayName}
                </Title>
              </div>
            </Group>
          </div>
          <Group>
            <Button
              color="fun-green"
              leftSection={<IconMessage size={16} />}
              onClick={openNotifications}
              variant="light"
            >
              Messages
            </Button>
            <Button
              className="bg-fun-green-800 hover:bg-fun-green-700"
              color="fun-green"
              leftSection={<IconSettings size={16} />}
              onClick={() =>
                tenant?.id &&
                navigate({
                  params: { tenant: tenant.id },
                  to: "/$tenant/student/profile",
                })
              }
              variant="filled"
            >
              Settings
            </Button>
          </Group>
        </Group>
      </div>

      <Grid gutter="lg">
        {/* Left Column */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Stack gap="lg">
            {/* Learning Overview Card */}
            <div data-aos="fade-up" data-aos-delay="100">
              <Card
                className="text-white bg-linear-to-r from-fun-green-600 to-fun-green-700"
                p="xl"
                radius="lg"
              >
                <Group align="flex-start" justify="space-between">
                  <div className="flex-1">
                    <Text className="mb-2 text-fun-green-100" size="sm">
                      My Learning Progress
                    </Text>
                    <Title className="mb-4 text-white" order={3}>
                      Course Progress Overview
                    </Title>
                    <Group gap="xs" mb="md">
                      <IconTrendingUp
                        className="text-fun-green-200"
                        size={16}
                      />
                      <Text className="text-fun-green-100" size="sm">
                        {overallProgress}% Complete
                      </Text>
                    </Group>
                    <Button
                      className="text-fun-green-700"
                      color="fun-green"
                      onClick={() =>
                        tenant?.id &&
                        navigate({
                          params: { tenant: tenant.id },
                          to: "/$tenant/student/courses",
                        })
                      }
                      size="sm"
                      variant="white"
                    >
                      Continue Learning
                    </Button>
                  </div>
                  <div className="text-right">
                    <Text
                      className="leading-none text-white"
                      fw={700}
                      size="3rem"
                    >
                      {overallProgress}%
                    </Text>
                    <Progress
                      className="w-24 mt-2"
                      color="white"
                      radius="xl"
                      size="lg"
                      value={overallProgress}
                    />
                  </div>
                </Group>
              </Card>
            </div>

            {/* Current Courses Card */}
            {userProgress && userProgress.length > 0 && (
              <div data-aos="fade-up" data-aos-delay="200">
                <Card p="lg" radius="lg" withBorder>
                  <Title className="text-gray-800" mb="md" order={4}>
                    Current Courses
                  </Title>
                  <Stack gap="md">
                    {userProgress.slice(0, 3).map((progress, index) => (
                      <div
                        data-aos="fade-up"
                        data-aos-delay={index * 100 + 300}
                        key={progress.courseId}
                      >
                        <Group justify="space-between" mb="xs">
                          <div>
                            <Text className="text-gray-800" fw={500}>
                              {index + 1}. Course {progress.courseId}
                            </Text>
                            <Text c="dimmed" size="sm">
                              Status: {progress.status}
                            </Text>
                          </div>
                          <Text
                            className={
                              progress.completionPercentage >= 50
                                ? "text-fun-green-600"
                                : "text-orange-500"
                            }
                            fw={600}
                            size="lg"
                          >
                            {progress.completionPercentage}%
                          </Text>
                        </Group>
                        <Progress
                          className="mb-3"
                          color={
                            progress.completionPercentage >= 50
                              ? "fun-green"
                              : "orange"
                          }
                          radius="xl"
                          size="sm"
                          value={progress.completionPercentage}
                        />
                      </div>
                    ))}
                  </Stack>
                </Card>
              </div>
            )}

            {/* NCS Branding Card */}
            <div data-aos="fade-up" data-aos-delay="300">
              <Card
                className="text-center bg-gray-50"
                p="lg"
                radius="lg"
                withBorder
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-fun-green-100">
                  <NCSLogo size={44} />
                </div>
                <Title className="mb-1 text-gray-800" order={4}>
                  Nigerian Correctional Service
                </Title>
                <Text c="dimmed" size="sm">
                  E-Learning Platform
                </Text>
              </Card>
            </div>
          </Stack>
        </Grid.Col>

        {/* Right Column */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack gap="lg">
            {/* Progress Summary Card */}
            <div data-aos="fade-up" data-aos-delay="200">
              <Card p="lg" radius="lg" withBorder>
                <Title className="text-gray-800" mb="md" order={4}>
                  Progress Summary
                </Title>
                <SimpleGrid cols={1} spacing="sm">
                  <div className="p-3 text-center rounded-lg bg-fun-green-50">
                    <Text className="text-fun-green-600" fw={700} size="xl">
                      {completedCourses}
                    </Text>
                    <Text className="text-gray-600" size="sm">
                      Completed Courses
                    </Text>
                  </div>
                  <div className="p-3 text-center rounded-lg bg-blue-50">
                    <Text className="text-blue-600" fw={700} size="xl">
                      {inProgressCourses}
                    </Text>
                    <Text className="text-gray-600" size="sm">
                      In Progress
                    </Text>
                  </div>
                  <div className="p-3 text-center rounded-lg bg-gray-50">
                    <Text className="text-gray-600" fw={700} size="xl">
                      {totalCourses}
                    </Text>
                    <Text className="text-gray-600" size="sm">
                      Total Enrolled
                    </Text>
                  </div>
                </SimpleGrid>
              </Card>
            </div>

            {/* Recent Activity Card */}
            <div data-aos="fade-up" data-aos-delay="300">
              <Card p="lg" radius="lg" withBorder>
                <Title className="text-gray-800" mb="md" order={4}>
                  Recent Activity
                </Title>
                <Stack gap="md">
                  {userProgress?.slice(0, 2).map((progress) => (
                    <div key={progress.courseId}>
                      <Text className="mb-1 text-gray-800" fw={500} size="sm">
                        Course Progress Updated
                      </Text>
                      <Text className="mb-2 text-gray-600" size="sm">
                        Course {progress.courseId} -{" "}
                        {progress.completionPercentage}% complete
                      </Text>
                      <Group gap="xs">
                        <IconClock className="text-gray-400" size={12} />
                        <Text c="dimmed" size="xs">
                          {progress.lastAccessedAt
                            ? new Date(
                                progress.lastAccessedAt,
                              ).toLocaleDateString()
                            : "Recently updated"}
                        </Text>
                      </Group>
                    </div>
                  )) || (
                    <Text c="dimmed" size="sm">
                      No recent activity
                    </Text>
                  )}
                </Stack>
              </Card>
            </div>
          </Stack>
        </Grid.Col>
      </Grid>

      {/* Notifications Drawer */}
      {user?.uid && (
        <NotificationsDrawer
          onClose={closeNotifications}
          opened={notificationsOpened}
          userId={user.uid}
        />
      )}
    </Container>
  );
}

export default StudentDashboard;
