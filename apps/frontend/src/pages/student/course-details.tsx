import {
  Alert,
  Badge,
  Button,
  Card,
  Container,
  Grid,
  Group,
  List,
  Rating,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import {
  IconBook,
  IconCertificate,
  IconCheck,
  IconClock,
  IconInfoCircle,
  IconStar,
  IconTrendingUp,
  IconUser, // Replacing IconGraduationCap as it doesn't exist in tabler
  IconUsers,
  IconWorldWww,
} from "@tabler/icons-react";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import { useState } from "react";

import type { TenantUserPageProps } from "@/types/route-page-props";
import {
  useCourseWithStructure,
  useEnrollInCourse,
  useSubscribeToTenant,
} from "@/services/hooks";
import { formatRelativeTime } from "@/utils/date-utils";
import { UniversalVideoPlayer } from "@/components/video/universal-video-player";
import { usePaystackPayment } from "react-paystack";

/**
 * Course Details Page - Student-facing course preview before enrollment
 *
 * Features:
 * - Course preview with video trailer
 * - Detailed course information and syllabus
 * - Instructor profile and credentials
 * - Prerequisites and requirements
 * - Enrollment functionality
 * - Progress tracking integration
 * - Nigerian government branding
 */

// ... imports

export function CourseDetails({ tenant, user }: TenantUserPageProps) {
  const { courseId } = useParams({ strict: false }) as { courseId: string };
  const { data: course, isLoading, error } = useCourseWithStructure(courseId);
  const navigate = useNavigate();
  const [isEnrolling, setIsEnrolling] = useState(false);

  // Enrollment mutation
  const enrollMutation = useEnrollInCourse();

  // Subscribe mutation
  const subscribeMutation = useSubscribeToTenant();

  // Check if user is already enrolled or subscribed
  const isEnrolled = user?.enrolledCourses?.includes(courseId || "") || false;

  const activeSubscription = user?.subscriptions?.find(
    (sub) =>
      sub.tenantId === tenant?.id &&
      sub.status === "active" &&
      sub.expiresAt > Date.now(),
  );

  const hasAccessViaSubscription =
    tenant?.config?.monetization?.model === "subscription" &&
    !!activeSubscription;
  const isFree =
    tenant?.config?.monetization?.model === "free" ||
    (tenant?.config?.monetization?.model === "pay-per-course" &&
      (!course?.price || course.price <= 0));
  const hasAccess = isEnrolled || hasAccessViaSubscription;

  // Paystack configuration logic
  const getPaystackConfig = (
    amount: number,
    type: "enrollment" | "subscription",
    plan?: "monthly" | "yearly",
  ) => ({
    amount: Math.round(amount * 100), // in kobo
    email: user?.email || "",
    metadata: {
      custom_fields: [
        {
          display_name:
            type === "enrollment" ? "Course Title" : "Subscription Plan",
          value:
            type === "enrollment"
              ? course?.title || ""
              : `${plan} Subscription`,
          variable_name:
            type === "enrollment" ? "course_title" : "subscription_plan",
        },
        {
          display_name: "Student ID",
          value: user?.uid || "",
          variable_name: "student_id",
        },
        {
          display_name: "Tenant ID",
          value: tenant?.id || "",
          variable_name: "tenant_id",
        },
      ],
    },
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || "",
    reference:
      new Date().getTime().toString() +
      Math.random().toString(36).substring(2, 7),
  });

  const enrollmentConfig = getPaystackConfig(course?.price || 0, "enrollment");
  const initializeEnrollmentPayment = usePaystackPayment(enrollmentConfig);

  // Handle successful enrollment execution
  const executeEnrollment = async () => {
    if (!user || !courseId || !course) return;

    setIsEnrolling(true);
    try {
      await enrollMutation.mutateAsync({
        courseId,
        studentId: user.uid,
        tenantId: tenant?.id || "",
      });

      // Navigate to course view after successful enrollment
      if (tenant?.id) {
        navigate({
          params: { courseId, tenant: tenant.id },
          search: { lesson: undefined },
          to: "/$tenant/student/courses/$courseId/learn",
        });
      }
    } catch (error) {
      console.error("Enrollment failed:", error);
      setIsEnrolling(false);
    }
  };

  // Handle successful subscription execution
  const executeSubscription = async (plan: "monthly" | "yearly") => {
    if (!user || !tenant?.id) return;

    setIsEnrolling(true);
    try {
      await subscribeMutation.mutateAsync({
        plan,
        tenantId: tenant.id,
        userId: user.uid,
      });

      // After subscribing, automatically enroll them in the requested course
      await executeEnrollment();
    } catch (error) {
      console.error("Subscription failed:", error);
      setIsEnrolling(false);
    }
  };

  // Handle specific subscription plan payment triggering
  const handleSubscribePayment = (
    plan: "monthly" | "yearly",
    amount: number,
  ) => {
    setIsEnrolling(true);

    // NOTE: This uses the global window approach since dynamically configuring usePaystackPayment
    // for multiple plans in an event handler requires complex state management.
    // The main usePaystackPayment hook is used for the primary enrollment flow.
    const config = getPaystackConfig(amount, "subscription", plan);

    const paystack = new (
      window as unknown as { PaystackPop: any }
    ).PaystackPop();
    paystack.newTransaction({
      ...config,
      onClose: () => {
        setIsEnrolling(false);
      },
      onSuccess: () => {
        executeSubscription(plan);
      },
    });
  };

  // Handle enrollment / access button click
  const handleEnrollClick = () => {
    if (!user) {
      if (tenant?.id) {
        navigate({
          params: { tenant: tenant.id },
          search: { redirect: window.location.pathname },
          to: "/$tenant/login",
        });
      } else {
        navigate({
          search: { redirect: window.location.pathname },
          to: "/login",
        });
      }
      return;
    }

    if (
      tenant?.config?.monetization?.model === "subscription" &&
      !activeSubscription
    ) {
      // Logic for rendering payment options will go in the UI below, this button just scrolls them or opens modal
      const subSection = document.getElementById("subscription-options");
      if (subSection) subSection.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (!isFree && tenant?.config?.monetization?.model === "pay-per-course") {
      setIsEnrolling(true);

      initializeEnrollmentPayment({
        onSuccess: () => executeEnrollment(),
        onClose: () => setIsEnrolling(false),
      });
    } else {
      executeEnrollment();
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "advanced":
        return "red";
      case "beginner":
        return "green";
      case "intermediate":
        return "yellow";
      default:
        return "gray";
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <Container className="py-8" size="lg">
        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="lg">
              <Skeleton height={300} radius="lg" />
              <Skeleton height={60} />
              <Skeleton height={120} />
            </Stack>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="lg">
              <Skeleton height={200} radius="lg" />
              <Skeleton height={150} radius="lg" />
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>
    );
  }

  // Error state
  if (error || !course) {
    return (
      <Container className="py-8" size="lg">
        <Alert
          color="red"
          icon={<IconInfoCircle size={16} />}
          title="Course Not Found"
        >
          The course you're looking for could not be found. Please check the URL
          or return to the course catalog.
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-8" size="lg">
      <div data-aos="fade-up" data-aos-duration="500">
        <Grid>
          {/* Main Content */}
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="xl">
              {/* Course Header */}
              <Stack gap="md">
                <Group justify="space-between" wrap="nowrap">
                  <div className="flex-1">
                    <Title className="mb-2 text-gray-800" order={1}>
                      {course.title}
                    </Title>
                    <Text className="mb-4 text-gray-600" size="lg">
                      {course.shortDescription || course.description}
                    </Text>
                  </div>
                </Group>

                {/* Course Meta */}
                <Group gap="lg">
                  <Badge
                    color={getDifficultyColor(
                      course.difficulty || "intermediate",
                    )}
                    size="lg"
                    variant="light"
                  >
                    {(course.difficulty || "intermediate")
                      .charAt(0)
                      .toUpperCase() +
                      (course.difficulty || "intermediate").slice(1)}
                  </Badge>

                  <Group gap="xs">
                    <IconClock className="text-gray-500" size={16} />
                    <Text className="text-gray-600" size="sm">
                      {course.sections?.reduce(
                        (acc: number, section: any) =>
                          acc +
                          (section.lessons?.reduce(
                            (lessonAcc: number, lesson: any) =>
                              lessonAcc + (lesson.estimatedDuration || 0),
                            0,
                          ) || 0),
                        0,
                      ) || 0}
                      m
                    </Text>
                  </Group>

                  <Group gap="xs">
                    <IconUsers className="text-gray-500" size={16} />
                    <Text className="text-gray-600" size="sm">
                      {(course.enrollmentCount || 0).toLocaleString()} enrolled
                    </Text>
                  </Group>

                  {(course.averageRating || 0) > 0 && (
                    <Group gap="xs">
                      <Rating
                        readOnly
                        size="sm"
                        value={course.averageRating || 0}
                      />
                      <Text className="text-gray-600" size="sm">
                        {(course.averageRating || 0).toFixed(1)} (
                        {course.totalRatings || 0})
                      </Text>
                    </Group>
                  )}

                  <Group gap="xs">
                    <IconClock className="text-gray-500" size={16} />
                    <Text className="text-gray-600" size="sm">
                      Created {formatRelativeTime(course.createdAt)}
                    </Text>
                  </Group>
                </Group>
              </Stack>

              {/* Video Preview */}
              <Card
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="500"
                p="lg"
                radius="lg"
                withBorder
              >
                <Title className="mb-4" order={3}>
                  Course Preview
                </Title>
                <UniversalVideoPlayer
                  autoPlay={false}
                  videoUrl={course.previewVideoUrl || ""}
                />
              </Card>

              {/* Course Description */}
              <Card
                data-aos="fade-up"
                data-aos-delay="300"
                data-aos-duration="500"
                p="lg"
                radius="lg"
                withBorder
              >
                <Title className="mb-4" order={3}>
                  About This Course
                </Title>
                <Text className="leading-relaxed text-gray-700">
                  {course.description || "No description available."}
                </Text>
              </Card>

              {/* Learning Objectives */}
              {course.learningObjectives &&
                course.learningObjectives.length > 0 && (
                  <Card
                    data-aos="fade-up"
                    data-aos-delay="400"
                    data-aos-duration="500"
                    p="lg"
                    radius="lg"
                    withBorder
                  >
                    <Title className="mb-4" order={3}>
                      What You'll Learn
                    </Title>
                    <List
                      icon={
                        <ThemeIcon
                          color="fun-green"
                          radius="xl"
                          size={24}
                          variant="light"
                        >
                          <IconCheck size={12} />
                        </ThemeIcon>
                      }
                      spacing="sm"
                    >
                      {course.learningObjectives.map((objective, index) => (
                        <List.Item key={index}>
                          <Text className="text-gray-700">{objective}</Text>
                        </List.Item>
                      ))}
                    </List>
                  </Card>
                )}

              {/* Course Curriculum */}
              {course.sections && course.sections.length > 0 && (
                <Card
                  data-aos="fade-up"
                  data-aos-delay="500"
                  data-aos-duration="500"
                  p="lg"
                  radius="lg"
                  withBorder
                >
                  <Title className="mb-4" order={3}>
                    Course Curriculum
                  </Title>
                  <Stack gap="md">
                    {course.sections.map((section, sectionIndex) => (
                      <div
                        className="border border-gray-200 rounded-lg"
                        key={section.id}
                      >
                        <div className="p-4 bg-gray-50 border-b border-gray-200">
                          <Group align="center" justify="space-between">
                            <div>
                              <Text className="font-medium text-gray-800">
                                Section {sectionIndex + 1}: {section.title}
                              </Text>
                              {section.description && (
                                <Text className="mt-1 text-gray-600" size="sm">
                                  {section.description}
                                </Text>
                              )}
                            </div>
                            <Badge color="fun-green" variant="light">
                              {section.lessons?.length || 0} lessons
                            </Badge>
                          </Group>
                        </div>

                        {section.lessons && section.lessons.length > 0 && (
                          <div className="p-4">
                            <Stack gap="sm">
                              {section.lessons.map((lesson, lessonIndex) => (
                                <Group
                                  className="p-3 bg-white rounded-md border border-gray-100"
                                  gap="sm"
                                  key={lesson.id}
                                >
                                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-fun-green-100 text-fun-green-700 text-xs font-medium">
                                    {lessonIndex + 1}
                                  </div>
                                  <div className="flex-1">
                                    <Text
                                      className="font-medium text-gray-700"
                                      size="sm"
                                    >
                                      {lesson.title}
                                    </Text>
                                    {lesson.type && (
                                      <Text className="text-gray-500" size="xs">
                                        {lesson.type.charAt(0).toUpperCase() +
                                          lesson.type.slice(1)}
                                      </Text>
                                    )}
                                  </div>
                                  {lesson.estimatedDuration && (
                                    <Group gap="xs">
                                      <IconClock
                                        className="text-gray-400"
                                        size={12}
                                      />
                                      <Text className="text-gray-500" size="xs">
                                        {lesson.estimatedDuration}m
                                      </Text>
                                    </Group>
                                  )}
                                </Group>
                              ))}
                            </Stack>
                          </div>
                        )}
                      </div>
                    ))}
                  </Stack>
                </Card>
              )}

              {/* Prerequisites */}
              {course.prerequisites && course.prerequisites.length > 0 && (
                <Card
                  data-aos="fade-up"
                  data-aos-delay="500"
                  data-aos-duration="500"
                  p="lg"
                  radius="lg"
                  withBorder
                >
                  <Title className="mb-4" order={3}>
                    Prerequisites
                  </Title>
                  <List
                    icon={
                      <ThemeIcon
                        color="blue"
                        radius="xl"
                        size={24}
                        variant="light"
                      >
                        <IconInfoCircle size={12} />
                      </ThemeIcon>
                    }
                    spacing="sm"
                  >
                    {course.prerequisites.map((prerequisite, index) => (
                      <List.Item key={index}>
                        <Text className="text-gray-700">{prerequisite}</Text>
                      </List.Item>
                    ))}
                  </List>
                </Card>
              )}

              {/* Instructor Information */}
              <Card
                data-aos="fade-up"
                data-aos-delay="600"
                data-aos-duration="500"
                p="lg"
                radius="lg"
                withBorder
              >
                <Title className="mb-4" order={3}>
                  Your Instructor
                </Title>
                <Group gap="md">
                  <ThemeIcon
                    color="fun-green"
                    radius="xl"
                    size={50}
                    variant="light"
                  >
                    <IconUser size={24} />
                  </ThemeIcon>
                  <div className="flex-1">
                    <Text className="text-lg font-semibold text-gray-800">
                      {course.instructors
                        ?.map((instructor) => instructor?.name || "Unknown")
                        .join(", ") || "No instructor assigned"}
                    </Text>
                    {course.instructors?.some(
                      (instructor) => instructor?.biography, // changed .bio to .biography (schema definition) which is nullable
                    ) && (
                      <div className="mt-2 space-y-1">
                        {course.instructors
                          .filter((instructor) => instructor?.biography) // filtered
                          .map((instructor, index) => (
                            <Text
                              className="text-gray-600"
                              key={index}
                              size="sm"
                            >
                              <strong>{instructor?.name}:</strong>{" "}
                              {instructor?.biography}
                            </Text>
                          ))}
                      </div>
                    )}
                  </div>
                </Group>
              </Card>
            </Stack>
          </Grid.Col>

          {/* Sidebar */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="lg">
              {/* Enrollment Card */}
              <Card
                className="sticky top-4"
                data-aos="fade-left"
                data-aos-delay="200"
                data-aos-duration="500"
                p="lg"
                radius="lg"
                withBorder
              >
                <Stack gap="md">
                  {hasAccess ? (
                    <>
                      <Alert color="green" icon={<IconCheck size={16} />}>
                        You have access to this course
                      </Alert>
                      <Button
                        component={Link}
                        to={`/student/courses/${courseId}/learn`}
                        className="bg-fun-green-600 hover:bg-fun-green-700"
                        fullWidth
                        size="lg"
                      >
                        Continue Learning
                      </Button>
                    </>
                  ) : (
                    <>
                      {tenant?.config?.monetization?.model ===
                      "subscription" ? (
                        <div id="subscription-options" className="space-y-4">
                          <Text size="sm" className="text-gray-600 font-medium">
                            Choose a Subscription Plan to Access
                          </Text>
                          {tenant.config.monetization.subscriptionConfig
                            ?.monthlyPrice && (
                            <Button
                              className="bg-purple-600 hover:bg-purple-700"
                              fullWidth
                              loading={isEnrolling}
                              onClick={() =>
                                handleSubscribePayment(
                                  "monthly",
                                  tenant.config.monetization!
                                    .subscriptionConfig!.monthlyPrice!,
                                )
                              }
                              size="lg"
                              variant="filled"
                            >
                              Monthly Plan - ₦
                              {tenant.config.monetization.subscriptionConfig.monthlyPrice.toLocaleString()}
                            </Button>
                          )}
                          {tenant.config.monetization.subscriptionConfig
                            ?.yearlyPrice && (
                            <Button
                              className="border-purple-600 text-purple-600 hover:bg-purple-50"
                              fullWidth
                              loading={isEnrolling}
                              onClick={() =>
                                handleSubscribePayment(
                                  "yearly",
                                  tenant.config.monetization!
                                    .subscriptionConfig!.yearlyPrice!,
                                )
                              }
                              size="lg"
                              variant="outline"
                            >
                              Yearly Plan - ₦
                              {tenant.config.monetization.subscriptionConfig.yearlyPrice.toLocaleString()}
                            </Button>
                          )}
                        </div>
                      ) : (
                        <Button
                          className="bg-fun-green-600 hover:bg-fun-green-700"
                          fullWidth
                          loading={isEnrolling}
                          onClick={handleEnrollClick}
                          size="lg"
                        >
                          {!isFree
                            ? `Enroll Now - ₦${course.price?.toLocaleString() || 0}`
                            : "Enroll Now - Free"}
                        </Button>
                      )}

                      <Text className="text-center text-gray-500" size="sm">
                        Join {(course.enrollmentCount || 0).toLocaleString()}{" "}
                        other students
                      </Text>
                    </>
                  )}
                </Stack>
              </Card>

              {/* Course Information */}
              <Card
                data-aos="fade-left"
                data-aos-delay="300"
                data-aos-duration="500"
                p="lg"
                radius="lg"
                withBorder
              >
                <Title className="mb-4" order={4}>
                  Course Information
                </Title>
                <Stack gap="md">
                  <Group justify="space-between">
                    <Group gap="xs">
                      <IconBook className="text-gray-500" size={16} />
                      <Text className="text-gray-600" size="sm">
                        Sections
                      </Text>
                    </Group>
                    <Text className="font-medium" size="sm">
                      {course.sections?.length || 0}
                    </Text>
                  </Group>

                  <Group justify="space-between">
                    <Group gap="xs">
                      <IconCheck className="text-gray-500" size={16} />
                      <Text className="text-gray-600" size="sm">
                        Lessons
                      </Text>
                    </Group>
                    <Text className="font-medium" size="sm">
                      {course.sections?.reduce(
                        (acc: number, section: any) =>
                          acc + (section.lessons?.length || 0),
                        0,
                      ) || 0}
                    </Text>
                  </Group>

                  <Group justify="space-between">
                    <Group gap="xs">
                      <IconClock className="text-gray-500" size={16} />
                      <Text className="text-gray-600" size="sm">
                        Duration
                      </Text>
                    </Group>
                    <Text className="font-medium" size="sm">
                      {course.sections?.reduce(
                        (acc: number, section: any) =>
                          acc +
                          (section.lessons?.reduce(
                            (lessonAcc: number, lesson: any) =>
                              lessonAcc + (lesson.estimatedDuration || 0),
                            0,
                          ) || 0),
                        0,
                      ) || 0}
                      m
                    </Text>
                  </Group>

                  <Group justify="space-between">
                    <Group gap="xs">
                      <IconTrendingUp className="text-gray-500" size={16} />
                      <Text className="text-gray-600" size="sm">
                        Level
                      </Text>
                    </Group>
                    <Badge
                      color={getDifficultyColor(
                        course.difficulty || "intermediate",
                      )}
                      size="sm"
                      variant="light"
                    >
                      {(course.difficulty || "intermediate")
                        .charAt(0)
                        .toUpperCase() +
                        (course.difficulty || "intermediate").slice(1)}
                    </Badge>
                  </Group>

                  <Group justify="space-between">
                    <Group gap="xs">
                      <IconBook className="text-gray-500" size={16} />
                      <Text className="text-gray-600" size="sm">
                        Category
                      </Text>
                    </Group>
                    <Text className="font-medium" size="sm">
                      {course.category || "General"}
                    </Text>
                  </Group>

                  <Group justify="space-between">
                    <Group gap="xs">
                      <IconCertificate className="text-gray-500" size={16} />
                      <Text className="text-gray-600" size="sm">
                        Certificate
                      </Text>
                    </Group>
                    <Text className="font-medium" size="sm">
                      Included
                    </Text>
                  </Group>

                  <Group justify="space-between">
                    <Group gap="xs">
                      <IconWorldWww className="text-gray-500" size={16} />
                      <Text className="text-gray-600" size="sm">
                        Access
                      </Text>
                    </Group>
                    <Text className="font-medium" size="sm">
                      Lifetime
                    </Text>
                  </Group>

                  <Group justify="space-between">
                    <Group gap="xs">
                      <IconClock className="text-gray-500" size={16} />
                      <Text className="text-gray-600" size="sm">
                        Last Updated
                      </Text>
                    </Group>
                    <Text className="font-medium" size="sm">
                      {course.updatedAt
                        ? formatRelativeTime(course.updatedAt)
                        : "N/A"}
                    </Text>
                  </Group>
                </Stack>
              </Card>

              {/* Tags */}
              {course.tags && course.tags.length > 0 && (
                <Card
                  data-aos="fade-left"
                  data-aos-delay="400"
                  data-aos-duration="500"
                  p="lg"
                  radius="lg"
                  withBorder
                >
                  <Title className="mb-4" order={4}>
                    Tags
                  </Title>
                  <Group gap="xs">
                    {course.tags.map((tag) => (
                      <Badge key={tag} size="sm" variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </Group>
                </Card>
              )}

              {/* Stats */}
              <Card
                data-aos="fade-left"
                data-aos-delay="500"
                data-aos-duration="500"
                p="lg"
                radius="lg"
                withBorder
              >
                <Title className="mb-4" order={4}>
                  Course Stats
                </Title>
                <Stack gap="md">
                  <Group justify="space-between">
                    <Text className="text-gray-600" size="sm">
                      Students Enrolled
                    </Text>
                    <Text className="font-medium" size="sm">
                      {(course.enrollmentCount || 0).toLocaleString()}
                    </Text>
                  </Group>
                  <Group justify="space-between">
                    <Text className="text-gray-600" size="sm">
                      Completions
                    </Text>
                    <Text className="font-medium" size="sm">
                      {(course.completionCount || 0).toLocaleString()}
                    </Text>
                  </Group>
                  {(course.averageRating || 0) > 0 && (
                    <Group justify="space-between">
                      <Text className="text-gray-600" size="sm">
                        Average Rating
                      </Text>
                      <Group gap="xs">
                        <Text className="font-medium" size="sm">
                          {(course.averageRating || 0).toFixed(1)}
                        </Text>
                        <IconStar
                          className="text-yellow-500"
                          fill="currentColor"
                          size={14}
                        />
                      </Group>
                    </Group>
                  )}
                </Stack>
              </Card>
            </Stack>
          </Grid.Col>
        </Grid>
      </div>
    </Container>
  );
}
