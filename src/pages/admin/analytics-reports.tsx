import {
    ActionIcon,
    Alert,
    Badge,
    Button,
    Card,
    Center,
    Container,
    Divider,
    Grid,
    Group,
    Paper,
    Progress,
    RingProgress,
    Select,
    SimpleGrid,
    Stack,
    Tabs,
    Text,
    Title,
} from "@mantine/core";
import {
    IconAward,
    IconBook,
    IconCalendar,
    IconCertificate,
    IconChartBar,
    IconClock,
    IconDownload,
    IconEye,
    IconFilter,
    IconInfoCircle,
    IconTarget,
    IconTrendingDown,
    IconTrendingUp,
    IconUsers,
} from "@tabler/icons-react";
import { useState } from "react";

import { DataTable } from "@/components/shared/data-table";
import { createAnalyticsTableColumns } from "@/components/shared/data-table/analytics-table-config";
import { createTrendsTableColumns } from "@/components/shared/data-table/trends-table-config";
import { PendingOverlay } from "@/components/shared/pending-overlay";
import { useAuthContext } from "@/providers/auth-provider";
import { useDashboardMetrics, useListCourses } from "@/services/hooks";

export function AnalyticsReports() {
  const { tenant, user: _user } = useAuthContext();
  const [timeframe, setTimeframe] = useState<"month" | "week" | "year">(
    "month"
  );
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [selectedCategory, setSelectedCategory] = useState<null | string>(null);

  const { data: dashboardMetrics, isLoading: metricsLoading } =
    useDashboardMetrics(tenant?.id || "");
  const { data: courses = [], isLoading: coursesLoading } = useListCourses(
    tenant?.id
  );

  const overallCompletionRate = dashboardMetrics?.completionRate || 0;

  const handleExportReport = (format: "csv" | "excel" | "pdf") => {
    const reportData = {
      certificates: dashboardMetrics?.certificatesIssued || 0,
      completionRate: overallCompletionRate,
      generatedAt: new Date().toISOString(),
      metrics: dashboardMetrics,
      timeframe,
      totalStudents: dashboardMetrics?.totalActiveStudents || 0,
    };

    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `analytics-report-${timeframe}-${
      new Date().toISOString().split("T")[0]
    }.${format === "excel" ? "xlsx" : format}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const isLoading = metricsLoading || coursesLoading;

  if (isLoading) {
    return <PendingOverlay reason="Loading analytics..." visible={isLoading} />;
  }

  return (
    <Container py="xl" size="xl">
      <div data-aos="fade-up" data-aos-duration="500">
        {/* Header */}
        <Group justify="space-between" mb="xl">
          <div>
            <Title className="text-fun-green-800" order={1}>
              Analytics & Reports
            </Title>
            <Text c="dimmed" size="lg">
              Comprehensive insights into platform performance and student
              engagement
            </Text>
          </div>

          <Group>
            <Select
              data={[
                { label: "Last Week", value: "week" },
                { label: "Last Month", value: "month" },
                { label: "Last Year", value: "year" },
              ]}
              leftSection={<IconCalendar size={16} />}
              onChange={(value) =>
                setTimeframe(value as "month" | "week" | "year")}
              placeholder="Timeframe"
              value={timeframe}
            />
            <Button
              leftSection={<IconDownload size={16} />}
              onClick={() => handleExportReport("pdf")}
              variant="outline"
            >
              Export Report
            </Button>
          </Group>
        </Group>

        {/* Key Metrics Overview */}
        <SimpleGrid cols={{ base: 2, md: 4 }} mb="xl" spacing="lg">
          <div data-aos="fade-up" data-aos-delay="100">
            <Card p="lg" radius="lg" withBorder>
              <Group gap="sm">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <IconUsers className="text-blue-600" size={24} />
                </div>
                <div>
                  <Text c="dimmed" size="sm">
                    Total Students
                  </Text>
                  <Text fw={700} size="xl">
                    {dashboardMetrics?.totalActiveStudents || 0}
                  </Text>
                  {dashboardMetrics?.trends?.totalStudents && (
                    <Group gap="xs">
                      {dashboardMetrics.trends.totalStudents.isPositive ? (
                        <IconTrendingUp className="text-green-500" size={12} />
                      ) : (
                        <IconTrendingDown className="text-red-500" size={12} />
                      )}
                      <Text
                        c={
                          dashboardMetrics.trends.totalStudents.isPositive
                            ? "green"
                            : "red"
                        }
                        size="xs"
                      >
                        {dashboardMetrics.trends.totalStudents.isPositive
                          ? "+"
                          : ""}
                        {dashboardMetrics.trends.totalStudents.percentageChange}
                        % vs last month
                      </Text>
                    </Group>
                  )}
                </div>
              </Group>
            </Card>
          </div>

          <div data-aos="fade-up" data-aos-delay="200">
            <Card p="lg" radius="lg" withBorder>
              <Group gap="sm">
                <div className="p-2 rounded-lg bg-fun-green-100">
                  <IconBook className="text-fun-green-600" size={24} />
                </div>
                <div>
                  <Text c="dimmed" size="sm">
                    Active Courses
                  </Text>
                  <Text fw={700} size="xl">
                    {dashboardMetrics?.activeCoursesCount || 0}
                  </Text>
                  {dashboardMetrics?.trends?.activeCourses && (
                    <Group gap="xs">
                      {dashboardMetrics.trends.activeCourses.isPositive ? (
                        <IconTrendingUp className="text-green-500" size={12} />
                      ) : (
                        <IconTrendingDown className="text-red-500" size={12} />
                      )}
                      <Text
                        c={
                          dashboardMetrics.trends.activeCourses.isPositive
                            ? "green"
                            : "red"
                        }
                        size="xs"
                      >
                        {dashboardMetrics.trends.activeCourses.isPositive
                          ? "+"
                          : ""}
                        {dashboardMetrics.trends.activeCourses.percentageChange}
                        % vs last month
                      </Text>
                    </Group>
                  )}
                </div>
              </Group>
            </Card>
          </div>

          <div data-aos="fade-up" data-aos-delay="300">
            <Card p="lg" radius="lg" withBorder>
              <Group gap="sm">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <IconTarget className="text-orange-600" size={24} />
                </div>
                <div>
                  <Text c="dimmed" size="sm">
                    Completion Rate
                  </Text>
                  <Text fw={700} size="xl">
                    {Math.round(overallCompletionRate)}%
                  </Text>
                  {dashboardMetrics?.trends?.completionRate && (
                    <Group gap="xs">
                      {dashboardMetrics.trends.completionRate.isPositive ? (
                        <IconTrendingUp className="text-green-500" size={12} />
                      ) : (
                        <IconTrendingDown className="text-red-500" size={12} />
                      )}
                      <Text
                        c={
                          dashboardMetrics.trends.completionRate.isPositive
                            ? "green"
                            : "red"
                        }
                        size="xs"
                      >
                        {dashboardMetrics.trends.completionRate.isPositive
                          ? "+"
                          : ""}
                        {
                          dashboardMetrics.trends.completionRate
                            .percentageChange
                        }
                        % vs last month
                      </Text>
                    </Group>
                  )}
                </div>
              </Group>
            </Card>
          </div>

          <div data-aos="fade-up" data-aos-delay="400">
            <Card p="lg" radius="lg" withBorder>
              <Group gap="sm">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <IconCertificate className="text-purple-600" size={24} />
                </div>
                <div>
                  <Text c="dimmed" size="sm">
                    Certificates
                  </Text>
                  <Text fw={700} size="xl">
                    {dashboardMetrics?.certificatesIssued || 0}
                  </Text>
                  {dashboardMetrics?.trends?.certificates && (
                    <Group gap="xs">
                      {dashboardMetrics.trends.certificates.isPositive ? (
                        <IconTrendingUp className="text-green-500" size={12} />
                      ) : (
                        <IconTrendingDown className="text-red-500" size={12} />
                      )}
                      <Text
                        c={
                          dashboardMetrics.trends.certificates.isPositive
                            ? "green"
                            : "red"
                        }
                        size="xs"
                      >
                        {dashboardMetrics.trends.certificates.isPositive
                          ? "+"
                          : ""}
                        {dashboardMetrics.trends.certificates.percentageChange}%
                        vs last month
                      </Text>
                    </Group>
                  )}
                </div>
              </Group>
            </Card>
          </div>
        </SimpleGrid>

        {/* Detailed Analytics Tabs */}
        <Tabs
          onChange={(value) => setActiveTab(value || "overview")}
          value={activeTab}
        >
          <Tabs.List>
            <Tabs.Tab leftSection={<IconChartBar size={16} />} value="overview">
              Overview
            </Tabs.Tab>
            <Tabs.Tab leftSection={<IconBook size={16} />} value="courses">
              Course Performance
            </Tabs.Tab>
            <Tabs.Tab leftSection={<IconUsers size={16} />} value="students">
              Student Analytics
            </Tabs.Tab>
            <Tabs.Tab leftSection={<IconTrendingUp size={16} />} value="trends">
              Learning Trends
            </Tabs.Tab>
          </Tabs.List>

          {/* Overview Tab */}
          <Tabs.Panel pt="xl" value="overview">
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Card p="xl" radius="lg" shadow="md">
                  <Title mb="lg" order={3}>
                    Platform Performance Overview
                  </Title>

                  <SimpleGrid cols={2} spacing="lg">
                    <Center>
                      <RingProgress
                        label={
                          <div className="text-center">
                            <Text fw={700} size="xl">
                              {Math.round(overallCompletionRate)}%
                            </Text>
                            <Text c="dimmed" size="sm">
                              Overall Completion
                            </Text>
                          </div>
                        }
                        sections={[
                          {
                            color: "fun-green",
                            tooltip: "Completion Rate",
                            value: overallCompletionRate,
                          },
                        ]}
                        size={240}
                        thickness={12}
                      />
                    </Center>

                    <Stack gap="md">
                      <div>
                        <Group justify="space-between" mb="xs">
                          <Text size="sm">Course Engagement</Text>
                          <Text fw={500} size="sm">
                            {Math.round(
                              dashboardMetrics?.engagement
                                ?.courseEngagementRate || 0
                            )}
                            %
                          </Text>
                        </Group>
                        <Progress
                          color="blue"
                          radius="xl"
                          size="sm"
                          value={
                            dashboardMetrics?.engagement
                              ?.courseEngagementRate || 0
                          }
                        />
                      </div>

                      <div>
                        <Group justify="space-between" mb="xs">
                          <Text size="sm">Student Satisfaction</Text>
                          <Text fw={500} size="sm">
                            {(
                              dashboardMetrics?.engagement
                                ?.studentSatisfactionScore || 0
                            ).toFixed(1)}
                            /5.0
                          </Text>
                        </Group>
                        <Progress
                          color="fun-green"
                          radius="xl"
                          size="sm"
                          value={
                            ((dashboardMetrics?.engagement
                              ?.studentSatisfactionScore || 0) /
                              5) *
                              100
                          }
                        />
                      </div>

                      <div>
                        <Group justify="space-between" mb="xs">
                          <Text size="sm">Platform Utilization</Text>
                          <Text fw={500} size="sm">
                            {Math.round(
                              dashboardMetrics?.engagement
                                ?.platformUtilizationRate || 0
                            )}
                            %
                          </Text>
                        </Group>
                        <Progress
                          color="orange"
                          radius="xl"
                          size="sm"
                          value={
                            dashboardMetrics?.engagement
                              ?.platformUtilizationRate || 0
                          }
                        />
                      </div>

                      <div>
                        <Group justify="space-between" mb="xs">
                          <Text size="sm">Content Quality</Text>
                          <Text fw={500} size="sm">
                            {Math.round(
                              dashboardMetrics?.engagement
                                ?.contentQualityScore || 0
                            )}
                            %
                          </Text>
                        </Group>
                        <Progress
                          color="purple"
                          radius="xl"
                          size="sm"
                          value={
                            dashboardMetrics?.engagement?.contentQualityScore ||
                            0
                          }
                        />
                      </div>
                    </Stack>
                  </SimpleGrid>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack gap="lg">
                  {/* Quick Insights */}
                  {dashboardMetrics?.insights && (
                    <Card p="lg" radius="lg" shadow="md">
                      <Title mb="md" order={4}>
                        Quick Insights
                      </Title>
                      <Stack gap="md">
                        {dashboardMetrics.learningPatterns
                          ?.peakLearningHours && (
                          <Alert
                            color="blue"
                            icon={<IconInfoCircle size={16} />}
                            variant="light"
                          >
                            <Text size="sm">
                              <strong>Peak Learning:</strong>{" "}
                              {
                                dashboardMetrics.learningPatterns
                                  .peakLearningHours.start
                              }{" "}
                              -{" "}
                              {
                                dashboardMetrics.learningPatterns
                                  .peakLearningHours.end
                              }{" "}
                              (
                              {
                                dashboardMetrics.learningPatterns
                                  .peakLearningHours.activityPercentage
                              }
                              % of activity)
                            </Text>
                          </Alert>
                        )}

                        <Alert
                          color="fun-green"
                          icon={<IconAward size={16} />}
                          variant="light"
                        >
                          <Text size="sm">
                            <strong>Top Category:</strong>{" "}
                            {dashboardMetrics.insights.topCourseCategory ||
                              "Technology"}
                          </Text>
                        </Alert>

                        <Alert
                          color="orange"
                          icon={<IconClock size={16} />}
                          variant="light"
                        >
                          <Text size="sm">
                            <strong>Avg. Completion:</strong>{" "}
                            {dashboardMetrics.insights.averageCompletionDays ||
                              "N/A"}{" "}
                            days
                          </Text>
                        </Alert>
                      </Stack>
                    </Card>
                  )}

                  {/* Recent Activity */}
                  <Card p="lg" radius="lg" shadow="md">
                    <Title mb="md" order={4}>
                      Recent Activity
                    </Title>
                    <Stack gap="sm">
                      <Text c="dimmed" size="sm">
                        {dashboardMetrics?.newEnrollmentsThisWeek || 0} new
                        enrollments this week
                      </Text>
                      <Text c="dimmed" size="sm">
                        {dashboardMetrics?.certificatesIssued || 0} total
                        certificates issued
                      </Text>
                      <Text c="dimmed" size="sm">
                        {dashboardMetrics?.totalActiveStudents || 0} active
                        students
                      </Text>
                      {dashboardMetrics?.engagement?.dailyActiveUsers && (
                        <Text c="dimmed" size="sm">
                          {dashboardMetrics.engagement.dailyActiveUsers} daily
                          active users
                        </Text>
                      )}
                    </Stack>
                  </Card>
                </Stack>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          {/* Course Performance Tab */}
          <Tabs.Panel pt="xl" value="courses">
            <Card p="xl" radius="lg" shadow="md">
              <Group justify="space-between" mb="lg">
                <Title order={3}>Course Performance Analysis</Title>
                <Group>
                  <Select
                    data={[
                      { label: "Technology", value: "technology" },
                      { label: "Business", value: "business" },
                      { label: "Design", value: "design" },
                      { label: "Marketing", value: "marketing" },
                    ]}
                    leftSection={<IconFilter size={16} />}
                    onChange={setSelectedCategory}
                    placeholder="Filter by category"
                    value={selectedCategory}
                  />
                  <ActionIcon color="gray" variant="outline">
                    <IconEye size={16} />
                  </ActionIcon>
                </Group>
              </Group>

              <DataTable
                columns={createAnalyticsTableColumns()}
                data={courses}
                enableFilters
                enableSorting
                pageSize={10}
              />
            </Card>
          </Tabs.Panel>

          {/* Student Analytics Tab */}
          <Tabs.Panel pt="xl" value="students">
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card p="xl" radius="lg" shadow="md">
                  <Title mb="lg" order={3}>
                    Student Engagement Metrics
                  </Title>

                  <Stack gap="lg">
                    <div>
                      <Group justify="space-between" mb="xs">
                        <Text>Active Daily Users</Text>
                        <Text fw={500}>
                          {dashboardMetrics?.engagement?.dailyActiveUsers || 0}
                        </Text>
                      </Group>
                      {dashboardMetrics?.engagement?.dailyActiveUsers && (
                        <>
                          <Progress
                            color="blue"
                            radius="xl"
                            size="lg"
                            value={Math.min(
                              (dashboardMetrics.engagement.dailyActiveUsers /
                                dashboardMetrics.totalActiveStudents) *
                                100,
                              100
                            )}
                          />
                          <Text c="dimmed" mt="xs" size="xs">
                            {Math.round(
                              (dashboardMetrics.engagement.dailyActiveUsers /
                                dashboardMetrics.totalActiveStudents) *
                                100
                            )}
                            % of registered students
                          </Text>
                        </>
                      )}
                    </div>

                    <div>
                      <Group justify="space-between" mb="xs">
                        <Text>Course Completion Rate</Text>
                        <Text fw={500}>
                          {Math.round(overallCompletionRate)}%
                        </Text>
                      </Group>
                      <Progress
                        color="fun-green"
                        radius="xl"
                        size="lg"
                        value={overallCompletionRate}
                      />
                    </div>

                    {dashboardMetrics?.engagement?.averageStudyTimePerDay && (
                      <div>
                        <Group justify="space-between" mb="xs">
                          <Text>Average Study Time</Text>
                          <Text fw={500}>
                            {(
                              dashboardMetrics.engagement
                                .averageStudyTimePerDay / 60
                            ).toFixed(1)}{" "}
                            hrs/day
                          </Text>
                        </Group>
                        <Progress
                          color="orange"
                          radius="xl"
                          size="lg"
                          value={Math.min(
                            (dashboardMetrics.engagement
                              .averageStudyTimePerDay /
                              180) *
                              100,
                            100
                          )}
                        />
                        <Text c="dimmed" mt="xs" size="xs">
                          Target: 3 hours/day
                        </Text>
                      </div>
                    )}
                  </Stack>
                </Card>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 6 }}>
                <Card p="xl" radius="lg" shadow="md">
                  <Title mb="lg" order={3}>
                    Learning Patterns
                  </Title>

                  {dashboardMetrics?.learningPatterns ? (
                    <>
                      <SimpleGrid cols={2} mb="lg" spacing="lg">
                        <Paper bg="blue.0" p="md" radius="md">
                          <Text c="blue" fw={700} size="lg">
                            {dashboardMetrics.learningPatterns.mobileVsDesktop
                              .mobile || 0}
                            %
                          </Text>
                          <Text c="dimmed" size="sm">
                            Mobile Learners
                          </Text>
                        </Paper>

                        <Paper bg="fun-green.0" p="md" radius="md">
                          <Text c="fun-green" fw={700} size="lg">
                            {dashboardMetrics.learningPatterns.mobileVsDesktop
                              .desktop || 0}
                            %
                          </Text>
                          <Text c="dimmed" size="sm">
                            Desktop Learners
                          </Text>
                        </Paper>

                        <Paper bg="orange.0" p="md" radius="md">
                          <Text c="orange" fw={700} size="lg">
                            {dashboardMetrics.learningPatterns
                              .weekendActivity || 0}
                            %
                          </Text>
                          <Text c="dimmed" size="sm">
                            Weekend Activity
                          </Text>
                        </Paper>

                        <Paper bg="purple.0" p="md" radius="md">
                          <Text c="purple" fw={700} size="lg">
                            {(
                              dashboardMetrics.engagement
                                ?.studentSatisfactionScore || 0
                            ).toFixed(1)}
                          </Text>
                          <Text c="dimmed" size="sm">
                            Avg. Rating
                          </Text>
                        </Paper>
                      </SimpleGrid>

                      <Divider my="lg" />
                    </>
                  ) : (
                    <Text c="dimmed" py="xl" ta="center">
                      Learning pattern data will be available soon.
                    </Text>
                  )}

                  {dashboardMetrics?.studentPerformance?.topPerformers && (
                    <div>
                      <Text fw={500} mb="md">
                        Top Performing Students
                      </Text>
                      <Stack gap="xs">
                        {dashboardMetrics.studentPerformance.topPerformers
                          .slice(0, 3)
                          .map((student, index) => (
                            <Group justify="space-between" key={student.userId}>
                              <Text size="sm">{student.displayName}</Text>
                              <Badge
                                color={index === 0 ? "fun-green" : "blue"}
                                variant="light"
                              >
                                {student.averageScore}% avg
                              </Badge>
                            </Group>
                          ))}
                      </Stack>
                    </div>
                  )}
                </Card>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          {/* Learning Trends Tab */}
          <Tabs.Panel pt="xl" value="trends">
            <Card p="xl" radius="lg" shadow="md">
              <Title mb="lg" order={3}>
                Learning Trends & Forecasting
              </Title>

              <Grid>
                <Grid.Col span={12}>
                  {dashboardMetrics?.monthlyTrends &&
                    dashboardMetrics.monthlyTrends.length > 0 ? (
                        <DataTable
                          columns={createTrendsTableColumns()}
                          data={dashboardMetrics.monthlyTrends}
                          enableFilters
                          enablePagination={false}
                          enableSorting
                        />
                      ) : (
                        <Text c="dimmed" py="xl" ta="center">
                          Trend data will be available when sufficient historical
                          data is collected.
                        </Text>
                      )}
                </Grid.Col>
              </Grid>
            </Card>
          </Tabs.Panel>
        </Tabs>
      </div>
    </Container>
  );
}
