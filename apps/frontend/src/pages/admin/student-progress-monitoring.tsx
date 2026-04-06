import type { TenantPageProps } from "@/types/route-page-props";
import type { Course, StudentProgress, User } from "../../types";

import {
  ActionIcon,
  Button,
  Card,
  Flex,
  Grid,
  Group,
  Paper,
  Progress,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconCertificate,
  IconClock,
  IconTrophy,
  IconUser,
} from "@tabler/icons-react";
import { Link, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { DataTable } from "../../components/shared/data-table";
import {
  type CourseProgressRow,
  createProgressMonitoringTableColumns,
} from "../../components/shared/data-table/progress-monitoring-table-config";
import { PendingOverlay } from "../../components/shared/pending-overlay";
import {
  useGetCertificates,
  useListCourses,
  useListStudentProgress,
  useUser,
} from "../../services/hooks";
import { formatStudyTime } from "../../utils/date-utils";

// Extended types with Firestore document IDs
interface CourseWithId extends Course {
  id: string;
}

interface StudentProgressData {
  certificates: number;
  completedCourses: number;
  courseProgress: StudentProgress[];
  enrolledCourses: CourseWithId[];
  totalProgress: number;
  totalStudyTime: number;
  user: User;
}

/**
 * StudentProgressMonitoring - Admin page for detailed student progress monitoring
 *
 * Features:
 * - Comprehensive student profile view
 * - Course enrollment and progress tracking
 * - Individual course progress details
 * - Study time analytics
 * - Certificate status
 * - Activity timeline
 */
export function StudentProgressMonitoring({ tenant }: TenantPageProps) {
  const { studentId } = useParams({ strict: false }) as { studentId: string };

  const {
    data: student,
    error: studentError,
    isLoading: studentLoading,
  } = useUser(studentId!);

  const { data: allCourses = [], isLoading: coursesLoading } = useListCourses(
    tenant?.id,
  );

  const { data: progressData = [], isLoading: progressLoading } =
    useListStudentProgress(studentId!, tenant?.id);

  const { data: certificates = [], isLoading: certificatesLoading } =
    useGetCertificates(studentId!, tenant?.id);

  const isLoading =
    studentLoading || coursesLoading || progressLoading || certificatesLoading;

  if (isLoading) {
    return <PendingOverlay visible />;
  }

  if (studentError || !student) {
    return (
      <Card className="text-center p-8">
        <Text c="red">Student not found or error loading student data.</Text>
        <Button
          component={Link}
          mt="md"
          to={tenant?.id ? "/$tenant/admin/users" : "/login"}
          variant="light"
        >
          Back to User Management
        </Button>
      </Card>
    );
  }

  // Filter courses that the student is enrolled in
  const enrolledCourseIds = student.enrolledCourses || [];
  const enrolledCourses = (allCourses as CourseWithId[]).filter((course) =>
    enrolledCourseIds.includes(course.id),
  );

  // Calculate aggregated progress data
  const studentProgressData: StudentProgressData = {
    certificates: certificates.length,
    completedCourses: progressData.filter((p) => p.status === "completed")
      .length,
    courseProgress: progressData,
    enrolledCourses,
    totalProgress: calculateOverallProgress(progressData),
    totalStudyTime: progressData.reduce(
      (total, p) => total + (p.timeSpentMinutes || 0),
      0,
    ),
    user: student,
  };

  // Prepare data for DataTable
  const courseProgressRows: CourseProgressRow[] = enrolledCourses.map(
    (course) => {
      const progress = progressData.find((p) => p.courseId === course.id);
      const hasCertificate = certificates.some(
        (cert) => cert.courseId === course.id,
      );

      return {
        course,
        hasCertificate,
        progress,
      };
    },
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Flex align="center" gap="md" mb="lg">
          <ActionIcon
            className="text-stone-600 hover:text-fun-green-700"
            component={Link}
            size="lg"
            to={tenant?.id ? "/$tenant/admin/users" : "/login"}
            variant="subtle"
          >
            <IconArrowLeft size={20} />
          </ActionIcon>
          <div>
            <Title className="text-stone-900" order={2}>
              {student.displayName}
            </Title>
            <Text c="dimmed">Student Progress Monitoring</Text>
          </div>
        </Flex>
      </motion.div>

      {/* Student Overview Cards */}
      <Grid>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <Card className="bg-white border border-stone-200 shadow-sm">
              <Stack gap="xs">
                <Group gap="xs">
                  <IconUser className="text-fun-green-700" size={20} />
                  <Text className="text-stone-700" fw={500} size="sm">
                    Student Profile
                  </Text>
                </Group>
                <Text className="text-stone-900" fw={700} size="xl">
                  {student.role === "admin" ? "Administrator" : "Student"}
                </Text>
                <Text c="dimmed" size="sm">
                  ID: {student.studentId || student.id}
                </Text>
              </Stack>
            </Card>
          </motion.div>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 3 }}>
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <Card className="bg-white border border-stone-200 shadow-sm">
              <Stack gap="xs">
                <Group gap="xs">
                  <IconTrophy className="text-fun-green-700" size={20} />
                  <Text className="text-stone-700" fw={500} size="sm">
                    Overall Progress
                  </Text>
                </Group>
                <Text className="text-stone-900" fw={700} size="xl">
                  {studentProgressData.totalProgress}%
                </Text>
                <Progress
                  color="fun-green"
                  radius="md"
                  size="sm"
                  value={studentProgressData.totalProgress}
                />
              </Stack>
            </Card>
          </motion.div>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 3 }}>
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            <Card className="bg-white border border-stone-200 shadow-sm">
              <Stack gap="xs">
                <Group gap="xs">
                  <IconCertificate className="text-fun-green-700" size={20} />
                  <Text className="text-stone-700" fw={500} size="sm">
                    Certificates
                  </Text>
                </Group>
                <Text className="text-stone-900" fw={700} size="xl">
                  {studentProgressData.certificates}
                </Text>
                <Text c="dimmed" size="sm">
                  Out of {studentProgressData.completedCourses} completed
                </Text>
              </Stack>
            </Card>
          </motion.div>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 3 }}>
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <Card className="bg-white border border-stone-200 shadow-sm">
              <Stack gap="xs">
                <Group gap="xs">
                  <IconClock className="text-fun-green-700" size={20} />
                  <Text className="text-stone-700" fw={500} size="sm">
                    Study Time
                  </Text>
                </Group>
                <Text className="text-stone-900" fw={700} size="xl">
                  {formatStudyTime(studentProgressData.totalStudyTime)}
                </Text>
                <Text c="dimmed" size="sm">
                  Total hours logged
                </Text>
              </Stack>
            </Card>
          </motion.div>
        </Grid.Col>
      </Grid>

      {/* Course Progress Details */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 20 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <Card className="bg-white border border-stone-200 shadow-sm">
          <Stack gap="lg">
            <Title className="text-stone-900" order={3}>
              Course Progress Details
            </Title>

            {studentProgressData.enrolledCourses.length === 0 ? (
              <Paper className="bg-stone-50 p-8 text-center">
                <Text c="dimmed">
                  This student is not enrolled in any courses yet.
                </Text>
              </Paper>
            ) : (
              <DataTable
                columns={createProgressMonitoringTableColumns()}
                data={courseProgressRows}
                enableFilters
                enablePagination={false}
                enableSearch={false}
                enableSorting
              />
            )}
          </Stack>
        </Card>
      </motion.div>
    </div>
  );
}

// Helper functions
function calculateOverallProgress(progressData: StudentProgress[]): number {
  if (progressData.length === 0) return 0;

  const totalProgress = progressData.reduce(
    (sum, progress) => sum + (progress.completionPercentage || 0),
    0,
  );

  return Math.round(totalProgress / progressData.length);
}
