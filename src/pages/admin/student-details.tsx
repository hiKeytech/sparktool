import {
  ActionIcon,
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Loader,
  Progress,
  RingProgress,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
  Timeline,
  Title,
} from "@mantine/core";
import {
  IconActivity,
  IconArrowLeft,
  IconBook,
  IconCalendar,
  IconCertificate,
  IconCheck,
  IconClock,
  IconDownload,
  IconEdit,
  IconExclamationMark,
  IconMail,
  IconMessageCircle,
  IconStar,
  IconTrophy,
  IconUser,
} from "@tabler/icons-react";
import { useParams, useRouter } from "@tanstack/react-router";
import { useState } from "react";

import {
  openEditStudentModal,
  openSendMessageModal,
} from "@/components/modals";
import { DataTable } from "@/components/shared/data-table";
import { createStudentProgressTableColumns } from "@/components/shared/data-table/student-progress-table-config";
import {
  useGetCertificates,
  useListActivityLogs,
  useUser,
  useUserProgress,
} from "@/services/hooks";
import { useAuthContext } from "@/providers/auth-provider";
import { formatDate, formatDateTime } from "@/utils/date-utils";

export function StudentDetails() {
  const { tenant } = useAuthContext();
  const router = useRouter();
  const { studentId } = useParams({ from: "/_tenant/admin/users/$studentId" });
  const [activeTab, setActiveTab] = useState<null | string>("overview");

  // Real API calls
  const {
    data: studentData,
    error: userError,
    isLoading: userLoading,
  } = useUser(studentId || "");
  const { data: progressData, isLoading: progressLoading } = useUserProgress(
    tenant?.id,
    studentId || "",
  );
  const { data: activityLogs = [], isLoading: activityLoading } =
    useListActivityLogs(tenant?.id, studentId || "");
  const { data: certificates = [], isLoading: certificatesLoading } =
    useGetCertificates(studentId || "", tenant?.id);

  const isLoading =
    userLoading || progressLoading || activityLoading || certificatesLoading;

  function handleEditStudent() {
    if (!studentData) return;
    openEditStudentModal(studentData);
  }

  function handleSendMessage() {
    if (!studentData) return;
    openSendMessageModal(studentData);
  }

  function getStatusColor(status: string) {
    switch (status) {
      case "active":
        return "green";
      case "completed":
        return "green";
      case "in-progress":
        return "blue";
      case "inactive":
        return "red";
      case "not-started":
        return "gray";
      default:
        return "gray";
    }
  }

  function getActivityIcon(type: string) {
    switch (type) {
      case "course_completed":
        return <IconCheck size={16} />;
      case "course_enrolled":
        return <IconBook size={16} />;
      case "login":
        return <IconUser size={16} />;
      case "quiz_passed":
        return <IconStar size={16} />;
      default:
        return <IconActivity size={16} />;
    }
  }

  if (isLoading) {
    return (
      <Container className="py-8" size="xl">
        <div className="flex items-center justify-center h-64">
          <Loader size="lg" />
        </div>
      </Container>
    );
  }

  if (userError || !studentData) {
    return (
      <Container className="py-8" size="xl">
        <Alert
          color="red"
          icon={<IconExclamationMark size={16} />}
          title="Error"
        >
          Failed to load student details. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-8" size="xl">
      <Stack data-aos="fade-up" gap="xl">
        {/* Header */}
        <Group data-aos="fade-right" justify="space-between">
          <Group>
            <ActionIcon onClick={() => router.history.go(-1)} variant="light">
              <IconArrowLeft size={16} />
            </ActionIcon>
            <div>
              <Title className="text-gray-800" order={1}>
                Student Profile
              </Title>
              <Text className="text-gray-600" size="lg">
                Detailed view of student progress and information
              </Text>
            </div>
          </Group>
          <Group>
            <Button
              leftSection={<IconMessageCircle size={16} />}
              onClick={handleSendMessage}
              variant="light"
            >
              Send Message
            </Button>
            <Button
              leftSection={<IconEdit size={16} />}
              onClick={handleEditStudent}
              variant="light"
            >
              Edit Profile
            </Button>
          </Group>
        </Group>

        {/* Student Overview Card */}
        <Card
          data-aos="fade-up"
          data-aos-delay="100"
          padding="xl"
          radius="md"
          shadow="sm"
          withBorder
        >
          <Grid>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Stack align="center" gap="md">
                <Avatar
                  className="ring-4 ring-fun-green-100"
                  radius="xl"
                  size={120}
                  src={studentData.photoURL}
                />
                <div className="text-center">
                  <Title order={2}>{studentData.displayName}</Title>
                  <Text c="dimmed" size="lg">
                    {studentData.email}
                  </Text>
                  <Badge
                    className="mt-2"
                    color={getStatusColor(
                      studentData.isActive ? "active" : "inactive",
                    )}
                    size="lg"
                    variant="light"
                  >
                    {getStatusColor(
                      studentData.isActive ? "active" : "inactive",
                    )}
                  </Badge>
                </div>
              </Stack>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack gap="lg">
                <Grid>
                  <Grid.Col span={6}>
                    <Group gap="xs">
                      <ThemeIcon color="blue" variant="light">
                        <IconMail size={16} />
                      </ThemeIcon>
                      <div>
                        <Text c="dimmed" size="sm">
                          Email
                        </Text>
                        <Text size="sm">{studentData.email}</Text>
                      </div>
                    </Group>
                  </Grid.Col>

                  <Grid.Col span={6}>
                    <Group gap="xs">
                      <ThemeIcon color="orange" variant="light">
                        <IconCalendar size={16} />
                      </ThemeIcon>
                      <div>
                        <Text c="dimmed" size="sm">
                          Joined
                        </Text>
                        <Text size="sm">
                          {formatDate(studentData.createdAt)}
                        </Text>
                      </div>
                    </Group>
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <Group gap="xs">
                      <ThemeIcon color="violet" variant="light">
                        <IconClock size={16} />
                      </ThemeIcon>
                      <div>
                        <Text c="dimmed" size="sm">
                          Last Active
                        </Text>
                        <Text size="sm">
                          {formatDateTime(studentData.lastLoginAt)}
                        </Text>
                      </div>
                    </Group>
                  </Grid.Col>
                </Grid>
              </Stack>
            </Grid.Col>
          </Grid>
        </Card>

        {/* Stats Overview */}
        {progressData && progressData.length > 0 && (
          <Grid data-aos="fade-up" data-aos-delay="200">
            <Grid.Col span={{ base: 12, md: 3, sm: 6 }}>
              <Card
                className="text-center"
                padding="lg"
                radius="md"
                shadow="sm"
                withBorder
              >
                <RingProgress
                  className="mx-auto mb-2"
                  label={
                    <Text size="xs" ta="center">
                      {Math.round(
                        progressData.reduce(
                          (acc, course) => acc + course.completionPercentage,
                          0,
                        ) / progressData.length,
                      )}
                      %
                    </Text>
                  }
                  sections={[
                    {
                      color: "fun-green.6",
                      value: Math.round(
                        progressData.reduce(
                          (acc, course) => acc + course.completionPercentage,
                          0,
                        ) / progressData.length,
                      ),
                    },
                  ]}
                  size={80}
                  thickness={8}
                />
                <Text c="dimmed" size="sm">
                  Overall Progress
                </Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3, sm: 6 }}>
              <Card
                className="text-center"
                padding="lg"
                radius="md"
                shadow="sm"
                withBorder
              >
                <ThemeIcon
                  className="mx-auto mb-2"
                  color="blue"
                  size={60}
                  variant="light"
                >
                  <IconBook size={28} />
                </ThemeIcon>
                <Text fw={700} size="xl">
                  {progressData.length}
                </Text>
                <Text c="dimmed" size="sm">
                  Enrolled Courses
                </Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3, sm: 6 }}>
              <Card
                className="text-center"
                padding="lg"
                radius="md"
                shadow="sm"
                withBorder
              >
                <ThemeIcon
                  className="mx-auto mb-2"
                  color="green"
                  size={60}
                  variant="light"
                >
                  <IconTrophy size={28} />
                </ThemeIcon>
                <Text fw={700} size="xl">
                  {
                    progressData.filter(
                      (course) => course.status === "completed",
                    ).length
                  }
                </Text>
                <Text c="dimmed" size="sm">
                  Completed
                </Text>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 12, md: 3, sm: 6 }}>
              <Card
                className="text-center"
                padding="lg"
                radius="md"
                shadow="sm"
                withBorder
              >
                <ThemeIcon
                  className="mx-auto mb-2"
                  color="orange"
                  size={60}
                  variant="light"
                >
                  <IconCertificate size={28} />
                </ThemeIcon>
                <Text fw={700} size="xl">
                  {certificates.length}
                </Text>
                <Text c="dimmed" size="sm">
                  Certificates
                </Text>
              </Card>
            </Grid.Col>
          </Grid>
        )}

        {/* Tabs Section */}
        <Tabs
          data-aos="fade-up"
          data-aos-delay="300"
          onChange={setActiveTab}
          value={activeTab}
        >
          <Tabs.List>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="courses">Courses</Tabs.Tab>
            <Tabs.Tab value="activity">Activity</Tabs.Tab>
            <Tabs.Tab value="certificates">Certificates</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel pt="xl" value="overview">
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card padding="lg" radius="md" shadow="sm" withBorder>
                  <Title className="mb-4" order={4}>
                    Learning Progress
                  </Title>
                  {progressData && progressData.length > 0 ? (
                    progressData.map((courseProgress) => (
                      <div className="mb-4" key={courseProgress.courseId}>
                        <Group className="mb-1" justify="space-between">
                          <Text size="sm">
                            Course {courseProgress.courseId}
                          </Text>
                          <Text c="dimmed" size="sm">
                            {Math.round(courseProgress.completionPercentage)}%
                          </Text>
                        </Group>
                        <Progress
                          color="fun-green.6"
                          radius="xl"
                          size="sm"
                          value={courseProgress.completionPercentage}
                        />
                      </div>
                    ))
                  ) : (
                    <Text c="dimmed" py="xl" ta="center">
                      No course progress available
                    </Text>
                  )}
                </Card>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card padding="lg" radius="md" shadow="sm" withBorder>
                  <Title className="mb-4" order={4}>
                    Recent Activity
                  </Title>
                  <Timeline
                    active={activityLogs.length}
                    bulletSize={24}
                    lineWidth={2}
                  >
                    {activityLogs.slice(0, 5).map((activity) => (
                      <Timeline.Item
                        bullet={getActivityIcon(activity.action || "")}
                        key={activity.id}
                        title={(activity.action || "")
                          .replace("_", " ")
                          .toUpperCase()}
                      >
                        <Text c="dimmed" size="sm">
                          {activity.action}
                        </Text>
                        <Text c="dimmed" size="xs">
                          {formatDateTime(activity.timestamp)}
                        </Text>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                  {activityLogs.length === 0 && (
                    <Text c="dimmed" py="xl" ta="center">
                      No recent activity
                    </Text>
                  )}
                </Card>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel pt="xl" value="courses">
            <Card padding="lg" radius="md" shadow="sm" withBorder>
              <Title className="mb-4" order={4}>
                Course Enrollment
              </Title>

              {progressData && progressData.length ? (
                <DataTable
                  columns={createStudentProgressTableColumns()}
                  data={progressData}
                  enableFilters
                  enablePagination={false}
                  enableSearch={false}
                  enableSorting
                />
              ) : (
                <Text c="dimmed" py="xl" ta="center">
                  No courses enrolled
                </Text>
              )}
            </Card>
          </Tabs.Panel>

          <Tabs.Panel pt="xl" value="activity">
            <Card padding="lg" radius="md" shadow="sm" withBorder>
              <Title className="mb-4" order={4}>
                Activity Log
              </Title>
              <Timeline
                active={activityLogs.length}
                bulletSize={24}
                lineWidth={2}
              >
                {activityLogs.map((activity) => (
                  <Timeline.Item
                    bullet={getActivityIcon(activity.action || "")}
                    key={activity.id}
                    title={(activity.action || "")
                      .replace("_", " ")
                      .toUpperCase()}
                  >
                    <Text c="dimmed" size="sm">
                      {activity.action}
                    </Text>
                    <Text c="dimmed" size="xs">
                      {formatDateTime(activity.timestamp)}
                    </Text>
                  </Timeline.Item>
                ))}
              </Timeline>
              {activityLogs.length === 0 && (
                <Text c="dimmed" py="xl" ta="center">
                  No activity recorded
                </Text>
              )}
            </Card>
          </Tabs.Panel>

          <Tabs.Panel pt="xl" value="certificates">
            <Card padding="lg" radius="md" shadow="sm" withBorder>
              <Title className="mb-4" order={4}>
                Earned Certificates
              </Title>
              {certificates.length > 0 ? (
                <Grid>
                  {certificates.map((certificate) => (
                    <Grid.Col
                      key={certificate.id}
                      span={{ base: 12, md: 4, sm: 6 }}
                    >
                      <Card padding="md" radius="md" shadow="xs" withBorder>
                        <Stack align="center" gap="sm">
                          <ThemeIcon color="gold" size={60} variant="light">
                            <IconCertificate size={30} />
                          </ThemeIcon>
                          <div className="text-center">
                            <Text fw={500} size="sm">
                              {certificate.courseName}
                            </Text>
                            <Text c="dimmed" size="xs">
                              Issued:{" "}
                              {new Date(
                                certificate.issued?.at || Date.now(),
                              ).toLocaleDateString()}
                            </Text>
                          </div>
                          <Button
                            leftSection={<IconDownload size={14} />}
                            size="xs"
                            variant="light"
                          >
                            Download
                          </Button>
                        </Stack>
                      </Card>
                    </Grid.Col>
                  ))}
                </Grid>
              ) : (
                <Text c="dimmed" py="xl" ta="center">
                  No certificates earned yet
                </Text>
              )}
            </Card>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
}
