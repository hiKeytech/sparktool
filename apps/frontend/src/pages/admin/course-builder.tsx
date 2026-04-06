import type { CourseLesson, CreateLesson, CreateSection } from "@/types";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Collapse,
  Container,
  Group,
  Menu,
  Modal,
  NumberInput,
  Select,
  Stack,
  Switch,
  TagsInput,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
  IconChevronDown,
  IconChevronRight,
  IconClipboardCheck,
  IconDotsVertical,
  IconEdit,
  IconFiles,
  IconFileText,
  IconGripVertical,
  IconPlus,
  IconPresentation,
  IconQuestionMark,
  IconSettings,
  IconTrash,
  IconVideo,
} from "@tabler/icons-react";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useCallback, useMemo, useState } from "react";

import { QuizManager } from "@/components/quiz/quiz-manager";
import { ResourceManager } from "@/components/resources/resource-manager";
import { PendingOverlay } from "@/components/shared/pending-overlay";
import { useCourseQuizzes } from "@/hooks/use-course-quiz";
import {
  useCourseWithStructure,
  useCreateLesson,
  useCreateSection,
  useDeleteLesson,
  useDeleteSection,
  useReorderSections,
  useUpdateCourse,
  useUpdateLesson,
  useUpdateSection,
} from "@/services/hooks";
import type { CourseSectionData } from "@/schemas/course-section";
import type { TenantPageProps } from "@/types/route-page-props";

// Sortable Section Component
interface SortableSectionProps {
  onAddLesson: (sectionId: string) => void;
  onDeleteLesson: (lessonId: string) => void;
  onDeleteSection: (sectionId: string) => void;
  onEditLesson: (lesson: CourseLesson) => void;
  onEditSection: (section: CourseSectionData) => void;
  onManageLessonQuizzes: (lessonId: string, sectionId: string) => void;
  onManageResources: (lessonId: string, sectionId: string) => void;
  onManageSectionQuizzes: (sectionId: string) => void;
  section: CourseSectionData & { lessons: CourseLesson[] };
}

export function CourseBuilder({ tenant }: TenantPageProps) {
  const { courseId: courseIdParam } = useParams({ strict: false }) as {
    courseId?: string;
  };
  const courseId = String(courseIdParam);
  const navigate = useNavigate();

  // Fetch course with full structure
  const { data: course, error, isLoading } = useCourseWithStructure(courseId!);
  const { data: courseQuizzes } = useCourseQuizzes({ courseId: courseId! });

  // Mutations
  const createSection = useCreateSection();
  const createLesson = useCreateLesson();
  const updateSection = useUpdateSection();
  const updateLesson = useUpdateLesson();
  const deleteSection = useDeleteSection();
  const deleteLesson = useDeleteLesson();
  const reorderSections = useReorderSections();
  const updateCourse = useUpdateCourse();

  // Modal states
  const [
    sectionModalOpen,
    { close: closeSectionModal, open: openSectionModal },
  ] = useDisclosure(false);
  const [
    settingsModalOpen,
    { close: closeSettingsModal, open: openSettingsModal },
  ] = useDisclosure(false);
  const [lessonModalOpen, { close: closeLessonModal, open: openLessonModal }] =
    useDisclosure(false);
  const [
    resourceModalOpen,
    { close: closeResourceModal, open: openResourceModal },
  ] = useDisclosure(false);
  const [quizModalOpen, { close: closeQuizModal, open: openQuizModal }] =
    useDisclosure(false);
  const [editingSection, setEditingSection] =
    useState<CourseSectionData | null>(null);
  const [editingLesson, setEditingLesson] = useState<CourseLesson | null>(null);
  const [resourceLessonId, setResourceLessonId] = useState<string>("");
  const [resourceSectionId, setResourceSectionId] = useState<string>("");
  const [quizCourseId, setQuizCourseId] = useState<string>("");
  const [quizSectionId, setQuizSectionId] = useState<string>("");
  const [quizLessonId, setQuizLessonId] = useState<string>("");
  const [quizPlacement, setQuizPlacement] = useState<
    "course" | "lesson" | "section"
  >("lesson");

  const activeLessonForResources = useMemo(() => {
    if (!course || !resourceSectionId || !resourceLessonId) return null;
    const s = course.sections.find((sec) => sec.id === resourceSectionId);
    return s?.lessons.find((les) => les.id === resourceLessonId) || null;
  }, [course, resourceLessonId, resourceSectionId]);

  // Forms
  const settingsForm = useForm({
    initialValues: {
      hasCertificate: false,
      certificateTemplateId: "",
      tags: [] as string[],
      learningObjectives: [] as string[],
      prerequisites: [] as string[],
    },
  });

  const sectionForm = useForm<CreateSection>({
    initialValues: {
      courseId: courseId!,
      description: "",
      estimatedDurationInMinutes: 0,
      isPublished: true,
      order: 0,
      title: "",
    },
  });

  const lessonForm = useForm<CreateLesson>({
    initialValues: {
      content: {},
      courseId: courseId!,
      description: "",
      estimatedDuration: 0,
      isPublished: true,
      isRequired: true,
      order: 0,
      resources: [],
      sectionId: "",
      title: "",
      type: "video",
    },
  });

  // Drag and drop sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (!over || !course) return;

      const activeId = active.id as string;
      const overId = over.id as string;

      if (activeId !== overId) {
        const sections = [...course.sections];
        const oldIndex = sections.findIndex(
          (section) => section.id === activeId,
        );
        const newIndex = sections.findIndex((section) => section.id === overId);

        if (oldIndex !== -1 && newIndex !== -1) {
          const reorderedSections = arrayMove(sections, oldIndex, newIndex);

          // Update order values and call API
          const reorderData = reorderedSections.map(
            (section: CourseSectionData, index: number) => ({
              itemId: section.id,
              newOrder: index,
              type: "section" as const,
            }),
          );

          reorderSections.mutate({
            courseId: courseId!,
            reorderData,
          });
        }
      }
    },
    [course, courseId, reorderSections],
  );

  const handleOpenSettings = () => {
    if (course) {
      settingsForm.setValues({
        hasCertificate: course.hasCertificate || false,
        certificateTemplateId: course.certificateTemplateId || "",
        tags: course.tags || [],
        learningObjectives: course.learningObjectives || [],
        prerequisites: course.prerequisites || [],
      });
    }
    openSettingsModal();
  };

  const handleSettingsSubmit = (values: typeof settingsForm.values) => {
    updateCourse.mutate(
      {
        courseId: courseId!,
        courseData: values,
      },
      {
        onSuccess: () => closeSettingsModal(),
      },
    );
  };

  // Section handlers
  const handleAddSection = () => {
    sectionForm.reset();
    sectionForm.setFieldValue("order", course?.sections.length || 0);
    setEditingSection(null);
    openSectionModal();
  };

  const handleEditSection = (section: CourseSectionData) => {
    setEditingSection(section);
    sectionForm.setValues(section);
    openSectionModal();
  };

  const handleSectionSubmit = (values: CreateSection) => {
    if (editingSection) {
      const { courseId: _courseId, ...updateData } = values;
      updateSection.mutate(
        {
          sectionData: {
            updates: {
              ...updateData,
            },
            userId: "current-user", // TODO: Get from auth context
          },
          sectionId: editingSection.id,
        },
        {
          onSuccess: () => closeSectionModal(),
        },
      );
    } else {
      createSection.mutate(
        {
          data: values,
          userId: "current-user", // TODO: Get from auth context
        },
        {
          onSuccess: () => closeSectionModal(),
        },
      );
    }
  };

  const handleDeleteSection = (sectionId: string) => {
    if (
      window.confirm(
        "Are you sure you want to delete this section? All lessons in this section will also be deleted.",
      )
    ) {
      deleteSection.mutate(sectionId);
    }
  };

  // Lesson handlers
  const handleAddLesson = (sectionId: string) => {
    const section = course?.sections.find((s) => s.id === sectionId);
    lessonForm.reset();
    lessonForm.setFieldValue("sectionId", sectionId);
    lessonForm.setFieldValue("order", section?.lessons.length || 0);
    setEditingLesson(null);
    openLessonModal();
  };

  const handleEditLesson = (lesson: CourseLesson) => {
    setEditingLesson(lesson);
    lessonForm.setValues(lesson);
    openLessonModal();
  };

  const handleLessonSubmit = (values: CreateLesson) => {
    if (editingLesson) {
      updateLesson.mutate(
        {
          lessonData: {
            ...values,
            updatedAt: Date.now(),
          },
          lessonId: editingLesson.id,
        },
        {
          onSuccess: () => closeLessonModal(),
        },
      );
    } else {
      createLesson.mutate(
        {
          lessonData: values,
          userId: "current-user", // TODO: Get from auth context
        },
        {
          onSuccess: () => closeLessonModal(),
        },
      );
    }
  };

  const handleDeleteLesson = (lessonId: string) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      deleteLesson.mutate(lessonId);
    }
  };

  const handleManageResources = (lessonId: string, sectionId: string) => {
    setResourceLessonId(lessonId);
    setResourceSectionId(sectionId);
    openResourceModal();
  };

  // Quiz Management Handlers
  const handleManageCourseQuizzes = () => {
    setQuizCourseId(courseId!);
    setQuizSectionId("");
    setQuizLessonId("");
    setQuizPlacement("course");
    openQuizModal();
  };

  const handleManageSectionQuizzes = (sectionId: string) => {
    setQuizCourseId(courseId!);
    setQuizSectionId(sectionId);
    setQuizLessonId("");
    setQuizPlacement("section");
    openQuizModal();
  };

  const handleManageLessonQuizzes = (lessonId: string, sectionId: string) => {
    setQuizCourseId(courseId!);
    setQuizSectionId(sectionId);
    setQuizLessonId(lessonId);
    setQuizPlacement("lesson");
    openQuizModal();
  };

  if (isLoading) {
    return <PendingOverlay reason="Loading course..." visible={true} />;
  }

  if (error || !course) {
    return (
      <Container py="xl" size="sm">
        <Text c="red" ta="center">
          Failed to load course. Please try again.
        </Text>
        <Group justify="center" mt="md">
          <Button
            onClick={() =>
              tenant?.id &&
              navigate({
                params: { tenant: tenant.id },
                to: "/$tenant/admin/courses",
              })
            }
          >
            Back to Courses
          </Button>
        </Group>
      </Container>
    );
  }

  return (
    <Container py="md" size="lg">
      <Stack gap="lg">
        {/* Header */}
        <Group align="center" justify="space-between">
          <div>
            <Title order={2}>{course.title}</Title>
            <Text c="dimmed" size="sm">
              Build your course structure with sections and lessons
            </Text>
          </div>
          <Group>
            <Button
              leftSection={<IconPlus size={16} />}
              onClick={handleAddSection}
              variant="light"
            >
              Add Section
            </Button>
            <Button
              leftSection={<IconQuestionMark size={16} />}
              onClick={handleManageCourseQuizzes}
              variant="outline"
            >
              Course Quizzes
            </Button>
            <Button
              leftSection={<IconSettings size={16} />}
              onClick={handleOpenSettings}
              variant="outline"
            >
              Course Settings
            </Button>
            <Button
              onClick={() =>
                tenant?.id &&
                navigate({
                  params: { tenant: tenant.id },
                  to: "/$tenant/admin/courses",
                })
              }
            >
              Done
            </Button>
          </Group>
        </Group>

        {/* Course Structure */}
        <Card p="lg" withBorder>
          {course.sections.length > 0 ? (
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
              sensors={sensors}
            >
              <SortableContext
                items={course.sections.map((s) => s.id)}
                strategy={verticalListSortingStrategy}
              >
                <Stack gap="md">
                  {course.sections.map((section) => (
                    <SortableSection
                      key={section.id}
                      onAddLesson={handleAddLesson}
                      onDeleteLesson={handleDeleteLesson}
                      onDeleteSection={handleDeleteSection}
                      onEditLesson={handleEditLesson}
                      onEditSection={handleEditSection}
                      onManageLessonQuizzes={handleManageLessonQuizzes}
                      onManageResources={handleManageResources}
                      onManageSectionQuizzes={handleManageSectionQuizzes}
                      section={section}
                    />
                  ))}
                </Stack>
              </SortableContext>
            </DndContext>
          ) : (
            <Card className="border border-dashed border-stone-300" p="xl">
              <Stack align="center" gap="md">
                <Text c="dimmed" size="lg" ta="center">
                  No sections yet. Start building your course structure.
                </Text>
                <Button
                  leftSection={<IconPlus size={16} />}
                  onClick={handleAddSection}
                >
                  Add Your First Section
                </Button>
              </Stack>
            </Card>
          )}
        </Card>

        {/* Section Modal */}
        <Modal
          onClose={closeSectionModal}
          opened={sectionModalOpen}
          size="md"
          title={editingSection ? "Edit Section" : "Add New Section"}
        >
          <form onSubmit={sectionForm.onSubmit(handleSectionSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Section Title"
                placeholder="e.g., Introduction to React"
                required
                {...sectionForm.getInputProps("title")}
              />

              <Textarea
                label="Description"
                minRows={3}
                placeholder="Brief description of this section"
                {...sectionForm.getInputProps("description")}
              />

              <NumberInput
                label="Estimated Duration (minutes)"
                min={0}
                placeholder="0"
                {...sectionForm.getInputProps("estimatedDurationInMinutes")}
              />

              <Switch
                description="Students can access this section"
                label="Published"
                {...sectionForm.getInputProps("isPublished", {
                  type: "checkbox",
                })}
              />

              <Group justify="flex-end" mt="md">
                <Button onClick={closeSectionModal} variant="outline">
                  Cancel
                </Button>
                <Button
                  className="bg-fun-green-800 hover:bg-fun-green-700"
                  loading={createSection.isPending || updateSection.isPending}
                  type="submit"
                >
                  {editingSection ? "Update Section" : "Create Section"}
                </Button>
              </Group>
            </Stack>
          </form>
        </Modal>

        {/* Course Settings Modal */}
        <Modal
          onClose={closeSettingsModal}
          opened={settingsModalOpen}
          size="lg"
          title="Course Settings"
        >
          <form onSubmit={settingsForm.onSubmit(handleSettingsSubmit)}>
            <Stack gap="md">
              <Switch
                label="Enable Certificate"
                description="Students will receive a certificate upon course completion"
                {...settingsForm.getInputProps("hasCertificate", {
                  type: "checkbox",
                })}
              />

              {settingsForm.values.hasCertificate && (
                <TextInput
                  label="Certificate Template ID"
                  placeholder="Optional template ID"
                  {...settingsForm.getInputProps("certificateTemplateId")}
                />
              )}

              <TagsInput
                label="Tags"
                placeholder="Press Enter to add tags"
                clearable
                {...settingsForm.getInputProps("tags")}
              />

              <TagsInput
                label="Learning Objectives"
                placeholder="What will students learn?"
                clearable
                {...settingsForm.getInputProps("learningObjectives")}
              />

              <TagsInput
                label="Prerequisites"
                placeholder="What should students know before?"
                clearable
                {...settingsForm.getInputProps("prerequisites")}
              />

              <Group justify="flex-end" mt="md">
                <Button onClick={closeSettingsModal} variant="outline">
                  Cancel
                </Button>
                <Button
                  loading={updateCourse.isPending}
                  type="submit"
                  className="bg-fun-green-800 hover:bg-fun-green-700"
                >
                  Save Settings
                </Button>
              </Group>
            </Stack>
          </form>
        </Modal>

        {/* Lesson Modal */}
        <Modal
          onClose={closeLessonModal}
          opened={lessonModalOpen}
          size="lg"
          title={editingLesson ? "Edit Lesson" : "Add New Lesson"}
        >
          <form onSubmit={lessonForm.onSubmit(handleLessonSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Lesson Title"
                placeholder="e.g., Setting up React Development Environment"
                required
                {...lessonForm.getInputProps("title")}
              />

              <Textarea
                label="Description"
                minRows={3}
                placeholder="Brief description of this lesson"
                {...lessonForm.getInputProps("description")}
              />

              <Group grow>
                <Select
                  data={[
                    { label: "Video", value: "video" },
                    { label: "Reading Material", value: "reading" },
                    { label: "Assignment", value: "assignment" },
                    { label: "Live Session", value: "live-session" },
                  ]}
                  label="Lesson Type"
                  {...lessonForm.getInputProps("type")}
                />

                <NumberInput
                  label="Estimated Duration (minutes)"
                  min={0}
                  placeholder="0"
                  {...lessonForm.getInputProps("estimatedDuration")}
                />
              </Group>

              {lessonForm.values.type === "video" && (
                <Stack gap="sm">
                  <TextInput
                    label="Video URL"
                    placeholder="https://youtube.com/watch?v=..."
                    {...lessonForm.getInputProps("content.videoUrl")}
                  />
                  <TextInput
                    label="Subtitle URL (Optional)"
                    description="Link to a VTT or SRT file for video subtitles"
                    placeholder="https://example.com/subtitles.vtt"
                    value={lessonForm.values.content?.subtitles?.[0]?.url || ""}
                    onChange={(e) => {
                      const url = e.currentTarget.value;
                      lessonForm.setFieldValue(
                        "content.subtitles",
                        url ? [{ label: "English", language: "en", url }] : [],
                      );
                    }}
                  />
                  <Textarea
                    label="Video Transcript (Optional)"
                    minRows={3}
                    placeholder="Full text transcript of the video..."
                    {...lessonForm.getInputProps("content.transcript")}
                  />
                </Stack>
              )}

              {lessonForm.values.type === "reading" && (
                <Textarea
                  label="Content"
                  minRows={5}
                  placeholder="Enter reading material content..."
                  {...lessonForm.getInputProps("content.textContent")}
                />
              )}

              <Group grow>
                <Switch
                  description="Students must complete this lesson"
                  label="Required"
                  {...lessonForm.getInputProps("isRequired", {
                    type: "checkbox",
                  })}
                />

                <Switch
                  description="Students can access this lesson"
                  label="Published"
                  {...lessonForm.getInputProps("isPublished", {
                    type: "checkbox",
                  })}
                />
              </Group>

              <Group justify="flex-end" mt="md">
                <Button onClick={closeLessonModal} variant="outline">
                  Cancel
                </Button>
                <Button
                  className="bg-fun-green-800 hover:bg-fun-green-700"
                  loading={createLesson.isPending || updateLesson.isPending}
                  type="submit"
                >
                  {editingLesson ? "Update Lesson" : "Create Lesson"}
                </Button>
              </Group>
            </Stack>
          </form>
        </Modal>

        {/* Resource Management Modal */}
        <Modal
          onClose={() => {
            closeResourceModal();
            setResourceLessonId("");
            setResourceSectionId("");
          }}
          opened={resourceModalOpen}
          size="lg"
          title="Manage Lesson Resources"
        >
          {resourceLessonId && resourceSectionId && (
            <ResourceManager
              courseId={courseId!}
              lessonId={resourceLessonId}
              resources={activeLessonForResources?.resources || []}
              sectionId={resourceSectionId}
            />
          )}
        </Modal>

        {/* Quiz Management Modal */}
        <Modal
          onClose={() => {
            closeQuizModal();
            setQuizCourseId("");
            setQuizSectionId("");
            setQuizLessonId("");
            setQuizPlacement("lesson");
          }}
          opened={quizModalOpen}
          size="xl"
          title={`Manage ${quizPlacement === "course" ? "Course" : quizPlacement === "section" ? "Section" : "Lesson"} Quizzes`}
        >
          {quizCourseId && (
            <QuizManager
              courseId={quizCourseId}
              lessonId={quizLessonId || undefined}
              placement={quizPlacement}
              quizzes={
                courseQuizzes?.filter((quiz: any) => {
                  if (quizPlacement === "course")
                    return (
                      quiz.placement === "course" &&
                      !quiz.sectionId &&
                      !quiz.lessonId
                    );
                  if (quizPlacement === "section")
                    return (
                      quiz.placement === "section" &&
                      quiz.sectionId === quizSectionId
                    );
                  if (quizPlacement === "lesson")
                    return (
                      quiz.placement === "lesson" &&
                      quiz.lessonId === quizLessonId
                    );
                  return false;
                }) || []
              }
              sectionId={quizSectionId || undefined}
            />
          )}
        </Modal>
      </Stack>
    </Container>
  );
}

function SortableSection({
  onAddLesson,
  onDeleteLesson,
  onDeleteSection,
  onEditLesson,
  onEditSection,
  onManageLessonQuizzes,
  onManageResources,
  onManageSectionQuizzes,
  section,
}: SortableSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: section.id });

  const style = {
    opacity: isDragging ? 0.5 : 1,
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const getLessonIcon = (type: CourseLesson["type"]) => {
    switch (type) {
      case "assignment":
        return <IconClipboardCheck className="text-orange-600" size={16} />;
      case "live-session":
        return <IconPresentation className="text-purple-600" size={16} />;
      case "reading":
        return <IconFileText className="text-green-600" size={16} />;
      case "video":
        return <IconVideo className="text-blue-600" size={16} />;
      default:
        return <IconFileText className="text-gray-600" size={16} />;
    }
  };

  return (
    <Card
      className={`mb-4 border-2 ${isDragging ? "border-fun-green-300" : "border-stone-200"}`}
      p="md"
      ref={setNodeRef}
      style={style}
      withBorder
    >
      <Group align="flex-start" justify="space-between" mb="sm">
        <Group gap="xs" style={{ flex: 1 }}>
          <ActionIcon
            size="sm"
            variant="subtle"
            {...attributes}
            {...listeners}
            className="cursor-grab hover:cursor-grabbing"
          >
            <IconGripVertical size={14} />
          </ActionIcon>

          <ActionIcon
            onClick={() => setIsOpen(!isOpen)}
            size="sm"
            variant="subtle"
          >
            {isOpen ? (
              <IconChevronDown size={14} />
            ) : (
              <IconChevronRight size={14} />
            )}
          </ActionIcon>

          <div style={{ flex: 1 }}>
            <Group align="center" gap="sm">
              <Text fw={600} size="lg">
                {section.title}
              </Text>
              <Badge color="blue" variant="light">
                {section.lessons.length} lessons
              </Badge>
              <Badge color="green" variant="light">
                {Math.round(section.estimatedDurationInMinutes || 0)} min
              </Badge>
              {section.lessons.reduce(
                (acc, obj) => acc + (obj.resources?.length || 0),
                0,
              ) > 0 && (
                <Badge
                  color="grape"
                  leftSection={<IconFiles size={12} />}
                  variant="light"
                >
                  {section.lessons.reduce(
                    (acc, obj) => acc + (obj.resources?.length || 0),
                    0,
                  )}{" "}
                  resources
                </Badge>
              )}
            </Group>
            {section.description && (
              <Text c="dimmed" mt="xs" size="sm">
                {section.description}
              </Text>
            )}
          </div>
        </Group>

        <Group gap="xs">
          <Button
            leftSection={<IconPlus size={14} />}
            onClick={() => onAddLesson(section.id)}
            size="xs"
            variant="light"
          >
            Add Lesson
          </Button>

          <Menu position="bottom-end">
            <Menu.Target>
              <ActionIcon size="sm" variant="subtle">
                <IconDotsVertical size={14} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={<IconEdit size={14} />}
                onClick={() => onEditSection(section)}
              >
                Edit Section
              </Menu.Item>
              <Menu.Item
                leftSection={<IconQuestionMark size={14} />}
                onClick={() => onManageSectionQuizzes(section.id)}
              >
                Section Quizzes
              </Menu.Item>
              <Menu.Item
                color="red"
                leftSection={<IconTrash size={14} />}
                onClick={() => onDeleteSection(section.id)}
              >
                Delete Section
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>

      <Collapse in={isOpen}>
        <Stack gap="xs" ml="xl">
          {section.lessons.map((lesson) => (
            <Card
              className="border border-stone-100 bg-stone-50"
              key={lesson.id}
              p="sm"
              withBorder
            >
              <Group align="center" justify="space-between">
                <Group gap="sm" style={{ flex: 1 }}>
                  {getLessonIcon(lesson.type)}
                  <div style={{ flex: 1 }}>
                    <Text fw={500} size="sm">
                      {lesson.title}
                    </Text>
                    {lesson.description && (
                      <Text c="dimmed" size="xs">
                        {lesson.description}
                      </Text>
                    )}
                  </div>
                  <Group gap="xs">
                    <Badge color="gray" size="sm" variant="dot">
                      {lesson.type}
                    </Badge>
                    <Text c="dimmed" size="xs">
                      {lesson.estimatedDuration} min
                    </Text>
                    {(lesson.resources?.length || 0) > 0 && (
                      <Badge
                        color="grape"
                        leftSection={<IconFiles size={10} />}
                        size="xs"
                        variant="light"
                      >
                        {lesson.resources?.length}
                      </Badge>
                    )}
                    {lesson.isRequired && (
                      <Badge color="red" size="xs">
                        Required
                      </Badge>
                    )}
                  </Group>
                </Group>

                <Group gap="xs">
                  <ActionIcon
                    color="blue"
                    onClick={() => onManageResources(lesson.id, section.id)}
                    size="sm"
                    variant="subtle"
                  >
                    <IconFiles size={14} />
                  </ActionIcon>
                  <ActionIcon
                    color="orange"
                    onClick={() => onManageLessonQuizzes(lesson.id, section.id)}
                    size="sm"
                    variant="subtle"
                  >
                    <IconQuestionMark size={14} />
                  </ActionIcon>
                  <ActionIcon
                    onClick={() => onEditLesson(lesson)}
                    size="sm"
                    variant="subtle"
                  >
                    <IconEdit size={14} />
                  </ActionIcon>
                  <ActionIcon
                    color="red"
                    onClick={() => onDeleteLesson(lesson.id)}
                    size="sm"
                    variant="subtle"
                  >
                    <IconTrash size={14} />
                  </ActionIcon>
                </Group>
              </Group>
            </Card>
          ))}

          {section.lessons.length === 0 && (
            <Card className="border border-dashed border-stone-300" p="md">
              <Text c="dimmed" size="sm" ta="center">
                No lessons in this section yet.{" "}
                <Text
                  c="blue"
                  component="span"
                  onClick={() => onAddLesson(section.id)}
                  style={{ cursor: "pointer" }}
                >
                  Add your first lesson
                </Text>
              </Text>
            </Card>
          )}
        </Stack>
      </Collapse>
    </Card>
  );
}
