import {
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Progress,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconBooks,
  IconClock,
  IconListCheck,
  IconPlayerPlay,
  IconSearch,
} from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import { PendingOverlay } from "@/components/shared/pending-overlay";
import {
  useEnrollInCourse,
  useListCourses,
  useUserProgress,
} from "@/services/hooks";
import type { TenantUserPageProps } from "@/types/route-page-props";

export function CourseCatalog({ tenant, user }: TenantUserPageProps) {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<null | string>(null);
  const [categoryFilter, setCategoryFilter] = useState<null | string>(null);

  // Fetch courses using TanStack Query
  const { data: courses = [], isLoading } = useListCourses(tenant?.id, {
    category: categoryFilter || undefined,
    difficulty: difficultyFilter || undefined,
    search: searchQuery || undefined,
  });
  const { data: userProgress = [] } = useUserProgress(tenant?.id, user?.uid);
  const enrollMutation = useEnrollInCourse();

  console.log("userProgress", userProgress);
  console.log("enrolled courses", user);

  // Helper functions to determine enrollment status
  const isEnrolled = (courseId: string) => {
    return user?.enrolledCourses?.includes(courseId) || false;
  };

  const getCourseProgress = (courseId: string) => {
    const progress = userProgress.find((p) => p.courseId === courseId);
    return progress?.completionPercentage || 0;
  };

  // Calculate course statistics from sections and lessons
  const getCourseStats = (course: any) => {
    const sections = course.sections || [];
    const totalLessons = sections.reduce(
      (acc: number, section: any) => acc + (section.lessons?.length || 0),
      0,
    );
    const totalDuration = sections.reduce(
      (acc: number, section: any) =>
        acc +
        (section.lessons?.reduce(
          (lessonAcc: number, lesson: any) =>
            lessonAcc + (lesson.estimatedDuration || 0),
          0,
        ) || 0),
      0,
    );

    return {
      lessonCount: totalLessons,
      sectionCount: sections.length,
      totalDurationHours: Math.floor(totalDuration / 60),
      totalDurationMinutes: totalDuration,
    };
  };

  // Filter and sort courses based on search and filters
  // Enrolled courses should appear first
  const filteredCourses = courses
    .filter((course: any) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty =
        !difficultyFilter || course.difficulty === difficultyFilter;
      const matchesCategory =
        !categoryFilter || course.category === categoryFilter;

      return (
        matchesSearch &&
        matchesDifficulty &&
        matchesCategory &&
        course.published
      );
    })
    .sort((a: any, b: any) => {
      // Sort enrolled courses first
      const aEnrolled = isEnrolled(a.id);
      const bEnrolled = isEnrolled(b.id);

      if (aEnrolled && !bEnrolled) return -1;
      if (!aEnrolled && bEnrolled) return 1;

      // If both are enrolled or both are not enrolled, sort by title
      return a.title.localeCompare(b.title);
    });

  // Extract unique categories and difficulties from real data
  const categories = Array.from(
    new Set(courses.map((course: any) => course.category)),
  );
  const difficulties = ["beginner", "intermediate", "advanced"];

  function handleEnroll(courseId: string) {
    if (!user?.uid) return;

    enrollMutation.mutate(
      {
        courseId,
        studentId: user.uid,
        tenantId: tenant?.id || "",
      },
      {
        onError: (error) => {
          notifications.show({
            color: "red",
            message:
              error.message || "Failed to enroll in course. Please try again.",
            title: "Enrollment Failed",
          });
        },
        onSuccess: () => {
          notifications.show({
            color: "green",
            message: "You have been successfully enrolled in the course!",
            title: "Enrollment Successful",
          });
        },
      },
    );
  }

  function handleContinue(courseId: string) {
    if (!tenant?.id) return;

    navigate({
      params: { courseId, tenant: tenant.id },
      to: "/$tenant/student/courses/$courseId",
    });
  }

  if (isLoading) {
    return <PendingOverlay reason="Loading courses..." visible={isLoading} />;
  }

  return (
    <Container className="py-8" size="xl">
      <div
        className="p-6 mb-8 bg-white border rounded-lg shadow-sm border-stone-200"
        data-aos="fade-up"
        data-aos-duration="300"
      >
        <Stack gap="xl">
          {/* Header */}
          <div>
            <Title className="mb-2 text-gray-800" order={1}>
              Course Catalog
            </Title>
            <Text className="text-gray-600" size="lg">
              Discover new skills and advance your career with our comprehensive
              courses
            </Text>
          </div>

          {/* Filters */}
          <Card p="lg" withBorder>
            <Grid>
              <Grid.Col span={{ base: 12, md: 6 }}>
                <TextInput
                  leftSection={<IconSearch size={16} />}
                  onChange={(event) =>
                    setSearchQuery(event.currentTarget.value)
                  }
                  placeholder="Search courses..."
                  value={searchQuery}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 3 }}>
                <Select
                  clearable
                  data={difficulties.map((diff) => ({
                    label: diff.charAt(0).toUpperCase() + diff.slice(1),
                    value: diff,
                  }))}
                  onChange={setDifficultyFilter}
                  placeholder="Difficulty"
                  value={difficultyFilter}
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 3 }}>
                <Select
                  clearable
                  data={categories.map((cat: string) => ({
                    label: cat,
                    value: cat,
                  }))}
                  onChange={setCategoryFilter}
                  placeholder="Category"
                  value={categoryFilter}
                />
              </Grid.Col>
            </Grid>
          </Card>

          {/* Course Grid */}
          <SimpleGrid cols={{ base: 1, lg: 3, sm: 2 }} spacing="lg">
            {filteredCourses.map((course: any, index: number) => (
              <div
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="500"
                key={course.id}
              >
                <Card className="h-full" p="lg" radius="lg" withBorder>
                  <Stack gap="md" h="100%">
                    {/* Course Thumbnail */}
                    <div className="relative overflow-hidden rounded-lg aspect-video bg-linear-to-br from-fun-green-100 to-fun-green-200">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-fun-green-600">
                          <IconPlayerPlay className="text-white" size={20} />
                        </div>
                      </div>
                      <div className="absolute top-3 right-3">
                        <Badge
                          color={
                            course.difficulty === "beginner"
                              ? "green"
                              : course.difficulty === "intermediate"
                                ? "yellow"
                                : "red"
                          }
                          size="sm"
                          variant="filled"
                        >
                          {course.difficulty}
                        </Badge>
                      </div>
                    </div>

                    {/* Course Info */}
                    <div className="flex-1">
                      <Title className="mb-2 text-gray-800" order={4}>
                        {course.title}
                      </Title>
                      <Text
                        className="mb-3 text-gray-600"
                        lineClamp={2}
                        size="sm"
                      >
                        {course.description}
                      </Text>

                      {/* Stats */}
                      <Group gap="lg" mb="md">
                        <Group gap="xs">
                          <IconBooks className="text-gray-500" size={14} />
                          <Text className="text-gray-600" size="xs">
                            {getCourseStats(course).sectionCount} sections
                          </Text>
                        </Group>
                        <Group gap="xs">
                          <IconListCheck className="text-gray-500" size={14} />
                          <Text className="text-gray-600" size="xs">
                            {getCourseStats(course).lessonCount} lessons
                          </Text>
                        </Group>
                        <Group gap="xs">
                          <IconClock className="text-gray-500" size={14} />
                          <Text className="text-gray-600" size="xs">
                            {getCourseStats(course).totalDurationHours}h
                          </Text>
                        </Group>
                      </Group>

                      <Text className="mb-3 text-gray-700" fw={500} size="sm">
                        {course.instructors
                          ?.map(({ name }: any) => name)
                          .join(", ") || "No instructor assigned"}
                      </Text>

                      {/* Progress if enrolled */}
                      {isEnrolled(course.id) &&
                        getCourseProgress(course.id) > 0 && (
                          <div className="mb-3">
                            <Group justify="space-between" mb="xs">
                              <Text className="text-gray-600" size="xs">
                                Progress
                              </Text>
                              <Text
                                className="text-fun-green-600"
                                fw={500}
                                size="xs"
                              >
                                {getCourseProgress(course.id)}%
                              </Text>
                            </Group>
                            <Progress
                              color="fun-green"
                              size="sm"
                              value={getCourseProgress(course.id)}
                            />
                          </div>
                        )}
                    </div>

                    {/* Action Button */}
                    <Button
                      className={
                        isEnrolled(course.id)
                          ? "bg-fun-green-600 hover:bg-fun-green-700"
                          : "bg-gray-800 hover:bg-gray-700"
                      }
                      fullWidth
                      loading={enrollMutation.isPending}
                      onClick={() =>
                        isEnrolled(course.id)
                          ? handleContinue(course.id)
                          : handleEnroll(course.id)
                      }
                      size="md"
                    >
                      {isEnrolled(course.id)
                        ? getCourseProgress(course.id) > 0
                          ? "Continue Learning"
                          : "Start Course"
                        : "Enroll Now"}
                    </Button>
                  </Stack>
                </Card>
              </div>
            ))}
          </SimpleGrid>

          {/* Empty State */}
          {filteredCourses.length === 0 && (
            <div className="py-12 text-center">
              <Text className="text-gray-500" size="lg">
                No courses found matching your criteria
              </Text>
              <Button
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setDifficultyFilter(null);
                  setCategoryFilter(null);
                }}
                variant="light"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </Stack>
      </div>
    </Container>
  );
}
