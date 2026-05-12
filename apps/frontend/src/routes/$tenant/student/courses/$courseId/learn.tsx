import {
  createFileRoute,
  useNavigate,
  useParams,
  useSearch,
} from "@tanstack/react-router";
import { z } from "zod";
import { useAuthContext } from "@/providers/auth-provider";
import type { SectionProgress } from "@/types";
import {
  Button,
  Card,
  Container,
  Grid,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconCheck,
  IconFileText,
  IconSettings,
  IconSparkles,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { CourseBreadcrumbs } from "@/components/navigation/course-breadcrumbs";
import { CourseStructureSidebar } from "@/components/navigation/course-structure-sidebar";
import { LessonNavigation } from "@/components/navigation/lesson-navigation";
import { PendingOverlay } from "@/components/shared/pending-overlay";
import { UniversalVideoPlayer } from "@/components/video/universal-video-player";
import {
  useCourseProgress,
  useCourseWithStructure,
  useMarkLessonComplete,
} from "@/services/hooks";
import type { Tenant } from "@/schemas/tenant-contract";

export const Route = createFileRoute(
  "/$tenant/student/courses/$courseId/learn",
)({
  component: CourseView,
  validateSearch: z.object({
    lesson: z.string().optional(),
  }),
});

function CourseView() {
  const { tenant } = Route.useRouteContext() as { tenant: Tenant };
  const { user } = useAuthContext();
  const { courseId } = useParams({ strict: false }) as { courseId?: string };
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) as { lesson?: string };

  // Get current lesson from URL params
  const currentLessonId = searchParams.lesson as string | undefined;

  const [activeTab, setActiveTab] = useState<
    "description" | "discussion" | "resources"
  >("description");

  // Use the new hierarchical data fetching
  const { data: courseStructure, isLoading: courseLoading } =
    useCourseWithStructure(courseId || "");
  const { data: studentProgress, isLoading: progressLoading } =
    useCourseProgress(courseId || "", user?.uid || "");

  const markLessonCompleteMutation = useMarkLessonComplete();

  // Find current lesson from structure
  const currentLesson = courseStructure?.sections
    ?.flatMap((section) => section.lessons || [])
    ?.find((lesson) => lesson.id === currentLessonId);

  // Get current section (containing current lesson)
  const currentSection = courseStructure?.sections?.find((section) =>
    section.lessons?.some((lesson) => lesson.id === currentLessonId),
  );

  // If no lesson is selected, redirect to first lesson
  useEffect(() => {
    if (!tenant.id || !courseId) return;

    if (!currentLessonId && courseStructure?.sections?.[0]?.lessons?.[0]) {
      const firstLesson = courseStructure.sections[0].lessons[0];
      navigate({
        params: { courseId, tenant: tenant.id },
        replace: true,
        search: { lesson: firstLesson.id },
        to: "/$tenant/student/courses/$courseId/learn",
      });
    }
  }, [courseId, courseStructure, currentLessonId, navigate, tenant.id]);

  const handleLessonSelect = (lessonId: string) => {
    if (!tenant.id || !courseId) return;

    navigate({
      params: { courseId, tenant: tenant.id },
      search: { lesson: lessonId },
      to: "/$tenant/student/courses/$courseId/learn",
    });
  };

  const handleVideoProgress = (progress: number) => {
    if (!user?.uid || !courseId || !currentLesson || progress < 95) return;

    // Auto-complete lesson when 95% watched
    markLessonCompleteMutation.mutate({
      courseId,
      lessonId: currentLesson.id,
      sectionId: currentSection?.id || "",
      studentId: user.uid,
    });
  };

  const handleVideoComplete = () => {
    if (!user?.uid || !courseId || !currentLesson) return;

    markLessonCompleteMutation.mutate({
      courseId,
      lessonId: currentLesson.id,
      sectionId: currentSection?.id || "",
      studentId: user.uid,
    });
  };

  const handleMarkComplete = () => {
    if (!user?.uid || !courseId || !currentLesson) return;

    markLessonCompleteMutation.mutate({
      courseId,
      lessonId: currentLesson.id,
      sectionId: currentSection?.id || "",
      studentId: user.uid,
    });
  };

  // Check if lesson is completed
  const isLessonCompleted = (lessonId: string, sectionId: string) => {
    const sectionProgressData = studentProgress?.sectionProgress?.find(
      (sp: SectionProgress) => sp.sectionId === sectionId,
    );

    return sectionProgressData?.lessonsCompleted?.includes(lessonId) || false;
  };

  if (courseLoading || progressLoading) {
    return (
      <PendingOverlay
        reason="Loading course..."
        visible={courseLoading || progressLoading}
      />
    );
  }

  if (!courseStructure) {
    return (
      <Container className="py-8" size="xl">
        <Text>Course not found</Text>
      </Container>
    );
  }

  return (
    <div className="min-h-screen bg-(--app-bg)">
      {/* Breadcrumb Header */}
      <div className="py-4 border-b bg-(--app-surface) border-(--app-border)">
        <Container size="xl">
          <Group align="center" justify="space-between">
            <CourseBreadcrumbs
              course={courseStructure}
              lesson={currentLesson}
              section={currentSection}
              tenantId={tenant.id}
            />
            <Button
              color="brand"
              leftSection={<IconSettings size={16} />}
              size="sm"
              variant="filled"
            >
              Settings
            </Button>
            <Button
              color="violet"
              leftSection={<IconSparkles size={16} />}
              onClick={() =>
                tenant.id &&
                courseId &&
                navigate({
                  params: { tenant: tenant.id },
                  search: { courseId },
                  to: "/$tenant/student/ai",
                })
              }
              size="sm"
              variant="light"
            >
              Ask AI
            </Button>
          </Group>
        </Container>
      </div>

      <Container className="py-6" size="xl">
        <Grid gutter="lg">
          {/* Main Video and Content Area */}
          <Grid.Col span={{ base: 12, lg: 8 }}>
            <div data-aos="fade-up" data-aos-duration="500">
              <Stack gap="lg">
                {/* Lesson Title */}
                <div>
                  <Text className="mb-1 text-sm font-medium text-brand-600">
                    {currentSection?.title}
                  </Text>
                  <Title className="text-(--app-text)" order={1}>
                    {currentLesson?.title || courseStructure?.title}
                  </Title>
                </div>

                {/* Video Player */}
                {currentLesson?.content?.videoUrl && (
                  <UniversalVideoPlayer
                    autoPlay={false}
                    onComplete={handleVideoComplete}
                    onProgress={handleVideoProgress}
                    videoUrl={currentLesson.content.videoUrl}
                  />
                )}

                {/* Tabs */}
                <div className="border-b border-(--app-border)">
                  <Group gap="lg">
                    <button
                      className={`pb-2 border-b-2 ${
                        activeTab === "description"
                          ? "border-brand-600 text-brand-600"
                          : "border-transparent text-(--app-text-muted)"
                      }`}
                      onClick={() => setActiveTab("description")}
                      type="button"
                    >
                      Description
                    </button>
                    <button
                      className={`pb-2 border-b-2 ${
                        activeTab === "resources"
                          ? "border-brand-600 text-brand-600"
                          : "border-transparent text-(--app-text-muted)"
                      }`}
                      onClick={() => setActiveTab("resources")}
                      type="button"
                    >
                      Resources
                    </button>
                    <button
                      className={`pb-2 border-b-2 ${
                        activeTab === "discussion"
                          ? "border-brand-600 text-brand-600"
                          : "border-transparent text-(--app-text-muted)"
                      }`}
                      onClick={() => setActiveTab("discussion")}
                      type="button"
                    >
                      Q&A Discussion
                    </button>
                  </Group>
                </div>

                {/* Tab Content */}
                <Card p="lg" withBorder>
                  {activeTab === "description" ? (
                    <div>
                      <Text className="text-(--app-text-muted)">
                        {currentLesson?.description ||
                          courseStructure?.description}
                      </Text>
                      {courseStructure?.learningObjectives &&
                        courseStructure.learningObjectives.length > 0 && (
                          <div className="mt-4">
                            <Text
                              className="mb-2 font-medium text-(--app-text)"
                              size="sm"
                            >
                              Learning Objectives:
                            </Text>
                            <ul className="space-y-1 list-disc list-inside">
                              {courseStructure.learningObjectives.map(
                                (objective: string, index: number) => (
                                  <li
                                    className="text-sm text-(--app-text-muted)"
                                    key={index}
                                  >
                                    {objective}
                                  </li>
                                ),
                              )}
                            </ul>
                          </div>
                        )}
                    </div>
                  ) : activeTab === "resources" ? (
                    <div>
                      {currentLesson?.resources &&
                      currentLesson.resources.length > 0 ? (
                        <Stack gap="sm">
                          {currentLesson.resources.map((resource, index) => (
                            <Group
                              className="p-3 border rounded-lg bg-(--app-surface-soft) border-(--app-border)"
                              gap="sm"
                              key={index}
                            >
                              <IconFileText
                                className="text-(--app-text-muted)"
                                size={16}
                              />
                              <div className="flex-1">
                                <Text className="font-medium" size="sm">
                                  {resource.title}
                                </Text>
                                <Text
                                  className="text-(--app-text-muted)"
                                  size="xs"
                                >
                                  {resource.type.charAt(0).toUpperCase() +
                                    resource.type.slice(1)}
                                </Text>
                              </div>
                              <Button
                                component="a"
                                href={resource.url}
                                rel="noopener noreferrer"
                                size="xs"
                                target="_blank"
                                variant="subtle"
                              >
                                Open
                              </Button>
                            </Group>
                          ))}
                        </Stack>
                      ) : (
                        <Text className="text-(--app-text-subtle)">
                          No resources available for this lesson.
                        </Text>
                      )}
                    </div>
                  ) : (
                    <Text className="text-(--app-text-muted)">
                      Ask or answer questions about this lesson to discuss
                      topics with other students and instructors.
                    </Text>
                  )}
                </Card>

                {/* Mark as Complete Button */}
                {currentLesson && (
                  <Button
                    className={`${
                      isLessonCompleted(
                        currentLesson.id,
                        currentSection?.id || "",
                      )
                        ? "bg-(--app-text-subtle) hover:opacity-90"
                        : "bg-brand-600 hover:bg-brand-700"
                    }`}
                    disabled={isLessonCompleted(
                      currentLesson.id,
                      currentSection?.id || "",
                    )}
                    fullWidth
                    leftSection={<IconCheck size={16} />}
                    onClick={handleMarkComplete}
                    size="lg"
                  >
                    {isLessonCompleted(
                      currentLesson.id,
                      currentSection?.id || "",
                    )
                      ? "Completed"
                      : "Mark as Complete"}
                  </Button>
                )}

                {/* Lesson Navigation */}
                {courseStructure && (
                  <LessonNavigation
                    completedLessons={
                      new Set(
                        studentProgress?.sectionProgress?.flatMap(
                          (sp) => sp.lessonsCompleted || [],
                        ) || [],
                      )
                    }
                    course={courseStructure}
                    currentLesson={currentLesson}
                    currentSection={currentSection}
                    tenantId={tenant.id}
                  />
                )}
              </Stack>
            </div>
          </Grid.Col>

          {/* Course Structure Sidebar */}
          <Grid.Col span={{ base: 12, lg: 4 }}>
            {courseStructure && (
              <CourseStructureSidebar
                completedLessons={
                  new Set(
                    studentProgress?.sectionProgress?.flatMap(
                      (sp) => sp.lessonsCompleted || [],
                    ) || [],
                  )
                }
                course={courseStructure}
                currentLessonId={currentLessonId || undefined}
                onLessonSelect={handleLessonSelect}
                tenantId={tenant.id}
              />
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
