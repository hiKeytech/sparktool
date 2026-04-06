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
import { IconCheck, IconFileText, IconSettings } from "@tabler/icons-react";
import { useNavigate, useParams, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { CourseBreadcrumbs } from "@/components/navigation/course-breadcrumbs";
import { CourseStructureSidebar } from "@/components/navigation/course-structure-sidebar";
import { LessonNavigation } from "@/components/navigation/lesson-navigation";
import { PendingOverlay } from "@/components/shared/pending-overlay";
import { UniversalVideoPlayer } from "@/components/video/universal-video-player";
import type { TenantUserPageProps } from "@/types/route-page-props";
import {
  useCourseProgress,
  useCourseWithStructure,
  useMarkLessonComplete,
} from "@/services/hooks";

export function CourseView({ tenant, user }: TenantUserPageProps) {
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
    if (!tenant?.id || !courseId) return;

    if (!currentLessonId && courseStructure?.sections?.[0]?.lessons?.[0]) {
      const firstLesson = courseStructure.sections[0].lessons[0];
      navigate({
        params: { courseId, tenant: tenant.id },
        replace: true,
        search: { lesson: firstLesson.id },
        to: "/$tenant/student/courses/$courseId/learn",
      });
    }
  }, [courseId, courseStructure, currentLessonId, navigate, tenant?.id]);

  const handleLessonSelect = (lessonId: string) => {
    if (!tenant?.id || !courseId) return;

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
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Header */}
      <div className="py-4 bg-white border-b border-gray-200">
        <Container size="xl">
          <Group align="center" justify="space-between">
            <CourseBreadcrumbs
              course={courseStructure}
              lesson={currentLesson}
              section={currentSection}
              tenantId={tenant?.id}
            />
            <Button
              color="fun-green"
              leftSection={<IconSettings size={16} />}
              size="sm"
              variant="filled"
            >
              Settings
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
                  <Text className="mb-1 text-sm font-medium text-fun-green-600">
                    {currentSection?.title}
                  </Text>
                  <Title className="text-gray-800" order={1}>
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
                <div className="border-b border-gray-200">
                  <Group gap="lg">
                    <button
                      className={`pb-2 border-b-2 ${
                        activeTab === "description"
                          ? "border-fun-green-600 text-fun-green-600"
                          : "border-transparent text-gray-600"
                      }`}
                      onClick={() => setActiveTab("description")}
                      type="button"
                    >
                      Description
                    </button>
                    <button
                      className={`pb-2 border-b-2 ${
                        activeTab === "resources"
                          ? "border-fun-green-600 text-fun-green-600"
                          : "border-transparent text-gray-600"
                      }`}
                      onClick={() => setActiveTab("resources")}
                      type="button"
                    >
                      Resources
                    </button>
                    <button
                      className={`pb-2 border-b-2 ${
                        activeTab === "discussion"
                          ? "border-fun-green-600 text-fun-green-600"
                          : "border-transparent text-gray-600"
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
                      <Text className="text-gray-700">
                        {currentLesson?.description ||
                          courseStructure?.description}
                      </Text>
                      {courseStructure?.learningObjectives &&
                        courseStructure.learningObjectives.length > 0 && (
                          <div className="mt-4">
                            <Text
                              className="mb-2 font-medium text-gray-800"
                              size="sm"
                            >
                              Learning Objectives:
                            </Text>
                            <ul className="space-y-1 list-disc list-inside">
                              {courseStructure.learningObjectives.map(
                                (objective: string, index: number) => (
                                  <li
                                    className="text-sm text-gray-600"
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
                              className="p-3 border rounded-lg bg-gray-50"
                              gap="sm"
                              key={index}
                            >
                              <IconFileText
                                className="text-gray-600"
                                size={16}
                              />
                              <div className="flex-1">
                                <Text className="font-medium" size="sm">
                                  {resource.title}
                                </Text>
                                <Text className="text-gray-600" size="xs">
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
                        <Text className="text-gray-500">
                          No resources available for this lesson.
                        </Text>
                      )}
                    </div>
                  ) : (
                    <Text className="text-gray-700">
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
                        ? "bg-gray-400 hover:bg-gray-500"
                        : "bg-fun-green-600 hover:bg-fun-green-700"
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
                    tenantId={tenant?.id}
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
                tenantId={tenant?.id}
              />
            )}
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
