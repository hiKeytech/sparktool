import {
  Button,
  Card,
  Container,
  Grid,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconBook,
  IconDownload,
  IconPlayerPlay,
  IconPlus,
  IconStar,
  IconUpload,
  IconUsers,
} from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";

import { openCreateCourseModal } from "@/components/modals/create-course-modal";
import { openDeleteCourseModal } from "@/components/modals/delete-course-modal";
import { openDuplicateCourseModal } from "@/components/modals/duplicate-course-modal";
import { openEditCourseModal } from "@/components/modals/edit-course-modal";
import { DataTable } from "@/components/shared/data-table";
import {
  courseTableFilters,
  createCourseColumns,
} from "@/components/shared/data-table/course-table-config";
import { useListCourses, useUpdateCourse } from "@/services/hooks";
import type { TenantUserPageProps } from "@/types/route-page-props";

export function CourseManagement({ tenant, user }: TenantUserPageProps) {
  const navigate = useNavigate();

  // Fetch courses using TanStack Query
  const { data: courses = [], isLoading } = useListCourses(tenant?.id);
  const updateCourse = useUpdateCourse();

  // Combine existing categories from courses with predefined common categories
  const predefinedCategories = [
    "Programming",
    "Data Science",
    "Web Development",
    "Mobile Development",
    "DevOps",
    "Cybersecurity",
    "AI/Machine Learning",
    "Database Management",
    "UI/UX Design",
    "Project Management",
    "Software Engineering",
    "Cloud Computing",
    "Networking",
    "Quality Assurance",
  ];

  const existingCategories = Array.from(
    new Set(
      courses.map((course) => course.category).filter((c): c is string => !!c),
    ),
  );

  const categories = Array.from(
    new Set([...existingCategories, ...predefinedCategories]),
  ).sort();

  // Table handlers
  const tableHandlers = {
    onArchive: (courseId: string) => {
      console.log("Archiving course:", courseId);
      // Archive course functionality would be implemented here
    },
    onDelete: (courseId: string) => {
      const course = courses.find((c) => c.id === courseId);
      if (course) {
        openDeleteCourseModal(course);
      }
    },
    onDuplicate: (courseId: string) => {
      const course = courses.find((c) => c.id === courseId);
      if (course && user) {
        openDuplicateCourseModal(course, user);
      }
    },
    onEdit: (courseId: string) => {
      const course = courses.find((c) => c.id === courseId);
      if (course) {
        openEditCourseModal(course, categories);
      }
    },
    onEditStructure: (courseId: string) => {
      if (!tenant?.id) return;

      navigate({
        params: { courseId, tenant: tenant.id },
        to: "/$tenant/admin/courses/$courseId/edit",
      });
    },
    onTogglePublished: (courseId: string) => {
      const course = courses.find((c) => c.id === courseId);
      if (course) {
        updateCourse.mutate({
          courseData: { published: !course.published },
          courseId: courseId,
        });
      }
    },
    onView: (courseId: string) => {
      console.log("Viewing course:", courseId);
      // Navigate to course details page
    },
    onViewAnalytics: (courseId: string) => {
      console.log("Viewing analytics for course:", courseId);
      // Navigate to course analytics
    },
  };

  return (
    <Container className="py-8" size="xl">
      <div data-aos="fade-up">
        <Stack gap="xl">
          {/* Header */}
          <Group justify="space-between">
            <div>
              <Title className="mb-2 text-gray-800" order={1}>
                Course Management
              </Title>
              <Text className="text-gray-600" size="lg">
                Create, edit, and manage all courses on the platform
              </Text>
            </div>
            <Group>
              <Button leftSection={<IconDownload size={16} />} variant="light">
                Export Data
              </Button>
              <Button leftSection={<IconUpload size={16} />} variant="light">
                Import Courses
              </Button>
              <Button
                className="bg-fun-green-600 hover:bg-fun-green-700"
                leftSection={<IconPlus size={16} />}
                onClick={() => {
                  if (!tenant || !user) {
                    return;
                  }

                  openCreateCourseModal(categories, tenant, user);
                }}
              >
                Create Course
              </Button>
            </Group>
          </Group>

          {/* Stats Cards */}
          <Grid data-aos="fade-up" data-aos-delay="100">
            <Grid.Col span={{ base: 6, md: 3 }}>
              <Card p="md" radius="lg" withBorder>
                <Group justify="space-between">
                  <div>
                    <Text className="mb-1 text-gray-600" size="sm">
                      Total Courses
                    </Text>
                    <Text className="text-blue-600" fw={700} size="xl">
                      {courses.length}
                    </Text>
                  </div>
                  <ThemeIcon color="blue" size={40} variant="light">
                    <IconBook size={20} />
                  </ThemeIcon>
                </Group>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 6, md: 3 }}>
              <Card p="md" radius="lg" withBorder>
                <Group justify="space-between">
                  <div>
                    <Text className="mb-1 text-gray-600" size="sm">
                      Published
                    </Text>
                    <Text className="text-green-600" fw={700} size="xl">
                      {courses.filter((c) => c.published).length}
                    </Text>
                  </div>
                  <ThemeIcon color="green" size={40} variant="light">
                    <IconPlayerPlay size={20} />
                  </ThemeIcon>
                </Group>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 6, md: 3 }}>
              <Card p="md" radius="lg" withBorder>
                <Group justify="space-between">
                  <div>
                    <Text className="mb-1 text-gray-600" size="sm">
                      Total Enrollments
                    </Text>
                    <Text className="text-orange-600" fw={700} size="xl">
                      {courses
                        .reduce(
                          (sum, course) => sum + (course.enrollmentCount || 0),
                          0,
                        )
                        .toLocaleString()}
                    </Text>
                  </div>
                  <ThemeIcon color="orange" size={40} variant="light">
                    <IconUsers size={20} />
                  </ThemeIcon>
                </Group>
              </Card>
            </Grid.Col>
            <Grid.Col span={{ base: 6, md: 3 }}>
              <Card p="md" radius="lg" withBorder>
                <Group justify="space-between">
                  <div>
                    <Text className="mb-1 text-gray-600" size="sm">
                      Avg Rating
                    </Text>
                    <Text className="text-yellow-600" fw={700} size="xl">
                      {courses.length > 0 &&
                      courses.some((c) => (c.averageRating || 0) > 0)
                        ? (
                            courses.reduce(
                              (sum, course) =>
                                sum + (course.averageRating || 0),
                              0,
                            ) /
                            courses.filter(
                              (course) => (course.averageRating || 0) > 0,
                            ).length
                          ).toFixed(1)
                        : "N/A"}
                    </Text>
                  </div>
                  <ThemeIcon color="yellow" size={40} variant="light">
                    <IconStar size={20} />
                  </ThemeIcon>
                </Group>
              </Card>
            </Grid.Col>
          </Grid>

          {/* Courses Table */}
          <div data-aos="fade-up" data-aos-delay="200">
            <DataTable
              columns={createCourseColumns(tableHandlers)}
              data={courses}
              filters={courseTableFilters}
              loading={isLoading}
              searchPlaceholder="Search courses..."
            />
          </div>
        </Stack>
      </div>
    </Container>
  );
}
