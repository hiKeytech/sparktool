import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuthContext } from "@/providers/auth-provider";
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
import { NotificationsDrawer } from "@/components/notifications";
import { TenantLogo } from "@/components/shared/tenant-logo";
import { PendingOverlay } from "@/components/shared/pending-overlay";
import { useListCourses, useUserProgress } from "@/services/hooks";
import type { Tenant } from "@/schemas/tenant-contract";

export const Route = createFileRoute("/$tenant/student/")({
  component: StudentDashboard,
});

function StudentDashboard() {
  const { tenant } = Route.useRouteContext() as { tenant: Tenant };
  const { user } = useAuthContext();
  const portalName = tenant.config.branding.portalName;
  const logoAlt = `${portalName} logo`;
  const logoUrl = tenant.config.branding.logoUrl;
  const navigate = useNavigate();
  const [
    notificationsOpened,
    { close: closeNotifications, open: openNotifications },
  ] = useDisclosure(false);
  const { data: courses = [] } = useListCourses(tenant.id);

  const { data: userProgress, isLoading: progressLoading } = useUserProgress(
    tenant.id,
    user?.uid,
  );

  const getCourseTitle = (courseId: string) =>
    courses.find((course) => course.id === courseId)?.title ||
    "Untitled course";

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
              <Avatar color="brand" size="md" src={user?.photoURL}>
                {user?.displayName?.[0]}
              </Avatar>
              <div>
                <Text c="dimmed" size="sm">
                  Home
                </Text>
                <Title className="text-(--app-text)" order={2}>
                  Welcome back, {user?.displayName}
                </Title>
              </div>
            </Group>
          </div>
          <Group>
            <Button
              color="brand"
              leftSection={<IconMessage size={16} />}
              onClick={openNotifications}
              variant="light"
            >
              Messages
            </Button>
            <Button
              className="bg-brand-800 hover:bg-brand-700"
              color="brand"
              leftSection={<IconSettings size={16} />}
              onClick={() =>
                tenant.id &&
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
                className="text-white bg-linear-to-r from-brand-600 to-brand-700"
                p="xl"
                radius="lg"
              >
                <Group align="flex-start" justify="space-between">
                  <div className="flex-1">
                    <Text className="mb-2 text-brand-100" size="sm">
                      My Learning Progress
                    </Text>
                    <Title className="mb-4 text-white" order={3}>
                      Course Progress Overview
                    </Title>
                    <Group gap="xs" mb="md">
                      <IconTrendingUp className="text-brand-200" size={16} />
                      <Text className="text-brand-100" size="sm">
                        {overallProgress}% Complete
                      </Text>
                    </Group>
                    <Button
                      className="text-brand-700"
                      color="brand"
                      onClick={() =>
                        tenant.id &&
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
                  <Title className="text-(--app-text)" mb="md" order={4}>
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
                            <Text className="text-(--app-text)" fw={500}>
                              {index + 1}. {getCourseTitle(progress.courseId)}
                            </Text>
                            <Text c="dimmed" size="sm">
                              Status: {progress.status}
                            </Text>
                          </div>
                          <Text
                            className={
                              progress.completionPercentage >= 50
                                ? "text-brand-600"
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
                              ? "brand"
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

            {/* Tenant Branding Card */}
            <div data-aos="fade-up" data-aos-delay="300">
              <Card
                className="text-center bg-(--app-surface-soft)"
                p="lg"
                radius="lg"
                withBorder
              >
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-brand-100">
                  <TenantLogo
                    alt={logoAlt}
                    fallbackLabel={portalName}
                    size={44}
                    src={logoUrl}
                  />
                </div>
                <Title className="mb-1 text-(--app-text)" order={4}>
                  {portalName}
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
                <Title className="text-(--app-text)" mb="md" order={4}>
                  Progress Summary
                </Title>
                <SimpleGrid cols={1} spacing="sm">
                  <div className="p-3 text-center rounded-lg bg-(--app-surface-soft)">
                    <Text fw={700} size="xl">
                      {completedCourses}
                    </Text>
                    <Text className="text-(--app-text-muted)" size="sm">
                      Completed Courses
                    </Text>
                  </div>
                  <div className="p-3 text-center rounded-lg bg-(--app-surface-soft)">
                    <Text fw={700} size="xl">
                      {inProgressCourses}
                    </Text>
                    <Text className="text-(--app-text-muted)" size="sm">
                      In Progress
                    </Text>
                  </div>
                  <div className="p-3 text-center rounded-lg bg-(--app-surface-soft)">
                    <Text
                      className="text-(--app-text-muted)"
                      fw={700}
                      size="xl"
                    >
                      {totalCourses}
                    </Text>
                    <Text className="text-(--app-text-muted)" size="sm">
                      Total Enrolled
                    </Text>
                  </div>
                </SimpleGrid>
              </Card>
            </div>

            {/* Recent Activity Card */}
            <div data-aos="fade-up" data-aos-delay="300">
              <Card p="lg" radius="lg" withBorder>
                <Title className="text-(--app-text)" mb="md" order={4}>
                  Recent Activity
                </Title>
                <Stack gap="md">
                  {userProgress?.slice(0, 2).map((progress) => (
                    <div key={progress.courseId}>
                      <Text
                        className="mb-1 text-(--app-text)"
                        fw={500}
                        size="sm"
                      >
                        Course Progress Updated
                      </Text>
                      <Text className="mb-2 text-(--app-text-muted)" size="sm">
                        {getCourseTitle(progress.courseId)} -{" "}
                        {progress.completionPercentage}% complete
                      </Text>
                      <Group gap="xs">
                        <IconClock
                          className="text-(--app-text-subtle)"
                          size={12}
                        />
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
