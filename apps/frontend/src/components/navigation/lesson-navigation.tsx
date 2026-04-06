import type { CourseWithStructure } from "@/schemas/course";
import type { CourseLesson, CourseSection } from "@/types";

import { Button, Card, Group, Progress, Stack, Text } from "@mantine/core";
import {
  IconCheck,
  IconChevronLeft,
  IconChevronRight,
  IconLock,
} from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";

import React from "react";

interface LessonNavigationProps {
  completedLessons?: Set<string>;
  course: CourseWithStructure;
  currentLesson?: CourseLesson;
  currentSection?: CourseSection;
  tenantId?: string;
}

interface NavigationLesson {
  isCompleted: boolean;
  isLocked: boolean;
  lesson: CourseLesson;
  section: CourseSection;
}

export const LessonNavigation: React.FC<LessonNavigationProps> = ({
  completedLessons = new Set(),
  course,
  currentLesson,
  currentSection,
  tenantId,
}) => {
  const navigate = useNavigate();

  // Create flat list of all lessons with their sections
  const allLessons: NavigationLesson[] = [];

  course.sections?.forEach((section) => {
    section.lessons?.forEach((lesson) => {
      const isCompleted = completedLessons.has(lesson.id);
      const isLocked = lesson.isRequired && !isCompleted;

      allLessons.push({
        isCompleted,
        isLocked,
        lesson,
        section,
      });
    });
  });

  // Sort by section order and lesson order
  allLessons.sort((a, b) => {
    if ((a.section.order || 0) !== (b.section.order || 0)) {
      return (a.section.order || 0) - (b.section.order || 0);
    }
    return (a.lesson.order || 0) - (b.lesson.order || 0);
  });

  // Find current lesson index
  const currentLessonIndex = allLessons.findIndex(
    (item) => item.lesson.id === currentLesson?.id,
  );

  const previousLesson =
    currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson =
    currentLessonIndex < allLessons.length - 1
      ? allLessons[currentLessonIndex + 1]
      : null;

  const handleNavigateToLesson = (lesson: CourseLesson) => {
    if (!course.id || !tenantId) return;

    navigate({
      params: { courseId: course.id, tenant: tenantId },
      search: { lesson: lesson.id },
      to: "/$tenant/student/courses/$courseId",
    });
  };

  const calculateProgress = () => {
    if (allLessons.length === 0) return 0;
    return (completedLessons.size / allLessons.length) * 100;
  };

  const completedCount = completedLessons.size;
  const totalCount = allLessons.length;
  const progressPercentage = calculateProgress();

  return (
    <Card p="md" withBorder>
      <Stack gap="md">
        {/* Course Progress */}
        <div>
          <Group justify="space-between" mb="xs">
            <Text fw={600} size="sm">
              Course Progress
            </Text>
            <Text c="dimmed" size="sm">
              {completedCount}/{totalCount} lessons
            </Text>
          </Group>
          <Progress
            color="fun-green"
            radius="sm"
            size="sm"
            value={progressPercentage}
          />
        </div>

        {/* Current Lesson Info */}
        {currentLesson && currentSection && (
          <div>
            <Text c="dimmed" fw={600} mb={2} size="xs" tt="uppercase">
              Currently Watching
            </Text>
            <Text fw={500} lineClamp={1} size="sm">
              {currentSection.title}
            </Text>
            <Text c="fun-green" fw={600} lineClamp={1} size="sm">
              {currentLesson.title}
            </Text>
          </div>
        )}

        {/* Navigation Buttons */}
        <Group grow>
          <Button
            color="gray"
            disabled={!previousLesson}
            leftSection={<IconChevronLeft size={16} />}
            onClick={() =>
              previousLesson && handleNavigateToLesson(previousLesson.lesson)
            }
            size="sm"
            variant="light"
          >
            Previous
          </Button>

          {nextLesson ? (
            <Button
              color="fun-green"
              disabled={nextLesson.isLocked}
              onClick={() => handleNavigateToLesson(nextLesson.lesson)}
              rightSection={
                nextLesson.isLocked ? (
                  <IconLock size={16} />
                ) : (
                  <IconChevronRight size={16} />
                )
              }
              size="sm"
              variant="filled"
            >
              {nextLesson.isLocked ? "Locked" : "Next"}
            </Button>
          ) : (
            <Button
              color="fun-green"
              disabled
              rightSection={<IconCheck size={16} />}
              size="sm"
              variant="filled"
            >
              Complete
            </Button>
          )}
        </Group>

        {/* Next Lesson Preview */}
        {nextLesson && !nextLesson.isLocked && (
          <div>
            <Text c="dimmed" fw={600} mb={2} size="xs" tt="uppercase">
              Up Next
            </Text>
            <Text c="dimmed" lineClamp={1} size="sm">
              {nextLesson.section.title}
            </Text>
            <Text fw={500} lineClamp={2} size="sm">
              {nextLesson.lesson.title}
            </Text>
            {nextLesson.lesson.estimatedDuration && (
              <Text c="dimmed" size="xs">
                {nextLesson.lesson.estimatedDuration} min
              </Text>
            )}
          </div>
        )}

        {/* Completion Message */}
        {!nextLesson &&
          currentLesson &&
          completedLessons.has(currentLesson.id) && (
            <div style={{ textAlign: "center" }}>
              <Text c="fun-green" fw={600} mb="xs" size="sm">
                🎉 Course Completed!
              </Text>
              <Text c="dimmed" size="xs">
                You've finished all lessons in this course.
              </Text>
              <Button
                color="fun-green"
                mt="sm"
                onClick={() =>
                  tenantId &&
                  navigate({
                    params: { tenant: tenantId },
                    to: "/$tenant/student/courses",
                  })
                }
                size="sm"
                variant="light"
              >
                Browse More Courses
              </Button>
            </div>
          )}
      </Stack>
    </Card>
  );
};
