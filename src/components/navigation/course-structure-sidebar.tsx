import type { CourseWithStructure } from "@/schemas/course";
import type {
    CourseLesson
} from "@/types";

import {
    ActionIcon,
    Badge,
    Box,
    Card,
    Collapse,
    Divider,
    Group,
    Progress,
    ScrollArea,
    Stack,
    Text,
} from "@mantine/core";
import {
    IconCheck,
    IconChevronDown,
    IconChevronRight,
    IconFileText,
    IconLock,
    IconPlayerPlay as IconPlay,
    IconVideo,
} from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";

interface CourseStructureSidebarProps {
  completedLessons?: Set<string>;
  course: CourseWithStructure;
  currentLessonId?: string;
  onLessonSelect?: (lessonId: string) => void;
}

export const CourseStructureSidebar: React.FC<CourseStructureSidebarProps> = ({
  completedLessons = new Set(),
  course,
  currentLessonId,
  onLessonSelect,
}) => {
  const navigate = useNavigate();
  // searchParams removed as it was unused
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(course.sections?.map((section) => section.id) || [])
  );

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const handleLessonClick = (lesson: CourseLesson) => {
    if (onLessonSelect) {
      onLessonSelect(lesson.id);
    } else {
      navigate({
        to: "/student/courses/$courseId",
        params: { courseId: course.id || "" },
        search: (prev: Record<string, any>) => ({ ...prev, lesson: lesson.id }),
      });
    }
  };

  // Removed explicit type alias to rely on inference from course.sections
  const calculateSectionProgress = (section: any) => {
    if (!section.lessons || section.lessons.length === 0) return 0;
    const completedInSection = section.lessons.filter((lesson: any) =>
      completedLessons.has(lesson.id)
    ).length;
    return (completedInSection / section.lessons.length) * 100;
  };

  const calculateCourseProgress = () => {
    const totalLessons =
      course.sections?.reduce(
        (acc, section) => acc + (section.lessons?.length || 0),
        0
      ) || 0;

    if (totalLessons === 0) return 0;
    return (completedLessons.size / totalLessons) * 100;
  };

  const isLessonLocked = (lesson: CourseLesson, section: any) => {
    // Simple sequential unlock logic - can be enhanced based on requirements
    const sectionLessons = section.lessons || [];
    const currentLessonIndex = sectionLessons.findIndex(
      (l: any) => l.id === lesson.id
    );

    if (currentLessonIndex === 0) return false; // First lesson is always unlocked

    // Check if previous lesson is completed
    const previousLesson = sectionLessons[currentLessonIndex - 1];
    return previousLesson && !completedLessons.has(previousLesson.id);
  };

  const getTotalCourseStats = () => {
    let totalLessons = 0;
    const totalQuizzes = 0;
    let totalDuration = 0;

    course.sections?.forEach((section) => {
      totalLessons += section.lessons?.length || 0;
      totalDuration += section.estimatedDurationInMinutes || 0;
      section.lessons?.forEach(() => {
        // Count quizzes (would need quiz data structure)
        // totalQuizzes += lesson.quizzes?.length || 0;
      });
    });

    return { totalDuration, totalLessons, totalQuizzes };
  };

  const { totalDuration, totalLessons } = getTotalCourseStats();

  return (
    <Card
      h="100%"
      style={{ display: "flex", flexDirection: "column" }}
      withBorder
    >
      <Stack gap="md" style={{ flex: 1 }}>
        {/* Course Header */}
        <div>
          <Text fw={600} lineClamp={2} mb="xs" size="lg">
            {course.title}
          </Text>

          {/* Course Stats */}
          <Group gap="md" mb="sm">
            <Group gap="xs">
              <IconVideo size={14} />
              <Text c="dimmed" size="xs">
                {totalLessons} lessons
              </Text>
            </Group>
            {totalDuration > 0 && (
              <Group gap="xs">
                <IconFileText size={14} />
                <Text c="dimmed" size="xs">
                  {Math.round(totalDuration / 60)}h {totalDuration % 60}m
                </Text>
              </Group>
            )}
          </Group>

          {/* Overall Progress */}
          <div>
            <Group justify="space-between" mb={5}>
              <Text fw={600} size="sm">
                Progress
              </Text>
              <Text c="dimmed" size="xs">
                {completedLessons.size}/{totalLessons}
              </Text>
            </Group>
            <Progress
              color="fun-green"
              radius="sm"
              size="sm"
              value={calculateCourseProgress()}
            />
          </div>
        </div>

        <Divider />

        {/* Sections List */}
        <ScrollArea style={{ flex: 1 }} type="scroll">
          <Stack gap="sm">
            {course.sections?.map((section, sectionIndex) => {
              const isExpanded = expandedSections.has(section.id);
              const sectionProgressValue = calculateSectionProgress(section);
              const isCurrentSection = section.lessons?.some(
                (lesson) => lesson.id === currentLessonId
              );

              return (
                <Box key={section.id}>
                  {/* Section Header */}
                  <Group
                    gap="sm"
                    onClick={() => toggleSection(section.id)}
                    style={{
                      backgroundColor: isCurrentSection
                        ? "var(--mantine-color-fun-green-0)"
                        : undefined,
                      borderRadius: "6px",
                      cursor: "pointer",
                      padding: "8px",
                    }}
                  >
                    <ActionIcon
                      color={isCurrentSection ? "fun-green" : "gray"}
                      size="sm"
                      variant="transparent"
                    >
                      {isExpanded ? (
                        <IconChevronDown size={14} />
                      ) : (
                        <IconChevronRight size={14} />
                      )}
                    </ActionIcon>

                    <Box style={{ flex: 1 }}>
                      <Group align="flex-start" justify="space-between" mb={2}>
                        <Text
                          c={isCurrentSection ? "fun-green" : undefined}
                          fw={600}
                          lineClamp={1}
                          size="sm"
                        >
                          {sectionIndex + 1}. {section.title}
                        </Text>
                        {sectionProgressValue === 100 && (
                          <IconCheck
                            color="var(--mantine-color-fun-green-6)"
                            size={14}
                          />
                        )}
                      </Group>

                      <Group gap="xs" mb={4}>
                        <Text c="dimmed" size="xs">
                          {section.lessons?.length || 0} lessons
                        </Text>
                        {section.estimatedDurationInMinutes && (
                          <Text c="dimmed" size="xs">
                            • {section.estimatedDurationInMinutes} min
                          </Text>
                        )}
                      </Group>

                      <Progress
                        color="fun-green"
                        radius="xs"
                        size="xs"
                        value={sectionProgressValue}
                      />
                    </Box>
                  </Group>

                  {/* Lessons List */}
                  <Collapse in={isExpanded}>
                    <Stack
                      gap="xs"
                      ml="md"
                      mt="xs"
                      pl="md"
                      style={{
                        borderLeft: "2px solid var(--mantine-color-gray-2)",
                      }}
                    >
                      {section.lessons?.map((lesson, lessonIndex) => {
                        const isCompleted = completedLessons.has(lesson.id);
                        const isCurrentLesson = lesson.id === currentLessonId;
                        const isLocked = isLessonLocked(lesson, section);

                        return (
                          <Group
                            gap="sm"
                            key={lesson.id}
                            onClick={() =>
                              !isLocked && handleLessonClick(lesson)}
                            style={{
                              backgroundColor: isCurrentLesson
                                ? "var(--mantine-color-fun-green-1)"
                                : undefined,
                              borderRadius: "4px",
                              cursor: isLocked ? "not-allowed" : "pointer",
                              opacity: isLocked ? 0.6 : 1,
                              padding: "6px 8px",
                            }}
                          >
                            <ActionIcon
                              color={
                                isCompleted
                                  ? "fun-green"
                                  : isCurrentLesson
                                    ? "fun-green"
                                    : "gray"
                              }
                              size="sm"
                              variant="transparent"
                            >
                              {isCompleted ? (
                                <IconCheck size={14} />
                              ) : isLocked ? (
                                <IconLock size={14} />
                              ) : (
                                <IconPlay size={14} />
                              )}
                            </ActionIcon>

                            <Box style={{ flex: 1 }}>
                              <Text
                                c={
                                  isCurrentLesson
                                    ? "fun-green"
                                    : isCompleted
                                      ? "dark"
                                      : "dimmed"
                                }
                                fw={isCurrentLesson ? 600 : 400}
                                lineClamp={2}
                                size="sm"
                              >
                                {lessonIndex + 1}. {lesson.title}
                              </Text>

                              <Group gap="xs" mt={2}>
                                {lesson.estimatedDuration && (
                                  <Text c="dimmed" size="xs">
                                    {lesson.estimatedDuration} min
                                  </Text>
                                )}

                                {lesson.type && (
                                  <Badge color="gray" size="xs" variant="light">
                                    {lesson.type}
                                  </Badge>
                                )}

                                {lesson.isRequired && (
                                  <Badge color="red" size="xs" variant="light">
                                    Required
                                  </Badge>
                                )}
                              </Group>
                            </Box>
                          </Group>
                        );
                      })}
                    </Stack>
                  </Collapse>
                </Box>
              );
            })}
          </Stack>
        </ScrollArea>
      </Stack>
    </Card>
  );
};
