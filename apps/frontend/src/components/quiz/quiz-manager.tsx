import type { CourseQuiz, QuizQuestion } from "@/types";

import {
    ActionIcon,
    Alert,
    Badge,
    Box,
    Button,
    Card,
    Checkbox,
    Divider,
    Group,
    Modal,
    NumberInput,
    Stack,
    Text,
    Textarea,
    TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
    IconAlertCircle,
    IconBook,
    IconClock,
    IconEdit,
    IconList,
    IconPlus,
    IconQuestionMark,
    IconTarget,
    IconTrash,
    IconVideo,
} from "@tabler/icons-react";
import React, { useState } from "react";

import {
    useCreateCourseQuiz,
    useDeleteCourseQuiz,
    useUpdateCourseQuiz,
} from "@/hooks/use-course-quiz";

import { QuestionBuilder } from "./question-builder";

interface QuizFormData {
  description: string;
  isRequired: boolean;
  maxAttempts: null | number;
  order: number;
  passingScore: number;
  questions: Omit<QuizQuestion, "id">[];
  timeLimit: null | number;
  title: string;
}

interface QuizManagerProps {
  courseId: string;
  lessonId?: string;
  placement: "course" | "lesson" | "section";
  quizzes?: CourseQuiz[];
  readonly?: boolean;
  sectionId?: string;
}

export const QuizManager: React.FC<QuizManagerProps> = ({
  courseId,
  lessonId,
  placement,
  quizzes = [],
  readonly = false,
  sectionId,
}) => {
  const [modalOpen, { close: closeModal, open: openModal }] =
    useDisclosure(false);
  const [editingQuiz, setEditingQuiz] = useState<CourseQuiz | null>(null);

  const createQuizMutation = useCreateCourseQuiz();
  const updateQuizMutation = useUpdateCourseQuiz();
  const deleteQuizMutation = useDeleteCourseQuiz();

  const form = useForm<QuizFormData>({
    initialValues: {
      description: "",
      isRequired: true,
      maxAttempts: null,
      order: (quizzes?.length || 0) + 1,
      passingScore: 70,
      questions: [],
      timeLimit: null,
      title: "",
    },
    validate: {
      passingScore: (value) =>
        value < 0 || value > 100 ? "Passing score must be between 0-100" : null,
      questions: (value) =>
        value.length === 0 ? "At least one question is required" : null,
      title: (value) => (!value.trim() ? "Title is required" : null),
    },
  });

  const handleOpenModal = () => {
    form.reset();
    setEditingQuiz(null);
    openModal();
  };

  const handleEditQuiz = (quiz: CourseQuiz) => {
    setEditingQuiz(quiz);
    form.setValues({
      description: quiz.description || "",
      isRequired: quiz.isRequired,
      maxAttempts: quiz.maxAttempts || null,
      order: quiz.order,
      passingScore: quiz.passingScore,
      questions: quiz.questions || [],
      timeLimit: quiz.timeLimit || null,
      title: quiz.title,
    });
    openModal();
  };

  const handleCloseModal = () => {
    closeModal();
    form.reset();
    setEditingQuiz(null);
  };

  const handleSubmit = async (values: QuizFormData) => {
    try {
      const quizData = {
        courseId,
        createdAt: editingQuiz ? editingQuiz.createdAt : Date.now(),
        createdBy: "current-user-id", // TODO: Get from auth context
        description: values.description,
        isRequired: values.isRequired,
        lessonId,
        maxAttempts: values.maxAttempts || undefined,
        order: values.order,
        passingScore: values.passingScore,
        placement,
        questions: values.questions as QuizQuestion[],
        sectionId,
        timeLimit: values.timeLimit || undefined,
        title: values.title,
        unlockConditions: {
          requirePreviousCompletion: true,
        },
        updatedAt: editingQuiz ? editingQuiz.updatedAt : Date.now(),
      };

      if (editingQuiz) {
        await updateQuizMutation.mutateAsync({
          quizData,
          quizId: editingQuiz.id,
        });
      } else {
        await createQuizMutation.mutateAsync(quizData);
      }

      handleCloseModal();
    } catch (error) {
      console.error("Quiz submission error:", error);
    }
  };

  const handleDeleteQuiz = async (quizId: string) => {
    if (confirm("Are you sure you want to delete this quiz?")) {
      try {
        await deleteQuizMutation.mutateAsync(quizId);
      } catch (error) {
        console.error("Delete quiz error:", error);
      }
    }
  };

  const getPlacementIcon = () => {
    switch (placement) {
      case "course":
        return <IconBook size={16} />;
      case "lesson":
        return <IconVideo size={16} />;
      case "section":
        return <IconList size={16} />;
    }
  };

  const getPlacementLabel = () => {
    switch (placement) {
      case "course":
        return "Course Level";
      case "lesson":
        return "Lesson Level";
      case "section":
        return "Section Level";
    }
  };

  return (
    <Stack gap="md">
      <Group align="center" justify="space-between">
        <Group gap="xs">
          {getPlacementIcon()}
          <Text fw={600} size="sm">
            {getPlacementLabel()} Quizzes
          </Text>
          <Badge size="sm" variant="light">
            {quizzes.length}
          </Badge>
        </Group>

        {!readonly && (
          <Button
            leftSection={<IconPlus size={14} />}
            onClick={handleOpenModal}
            size="xs"
            variant="light"
          >
            Add Quiz
          </Button>
        )}
      </Group>

      {quizzes.length > 0 ? (
        <Stack gap="sm">
          {quizzes.map((quiz) => (
            <Card key={quiz.id} p="sm" withBorder>
              <Stack gap="xs">
                <Group align="flex-start" justify="space-between">
                  <Box flex={1}>
                    <Group gap="xs" mb="xs">
                      <Text fw={600} size="sm">
                        {quiz.title}
                      </Text>
                      {quiz.isRequired && (
                        <Badge color="red" size="xs" variant="light">
                          Required
                        </Badge>
                      )}
                    </Group>
                    {quiz.description && (
                      <Text c="dimmed" lineClamp={2} size="xs">
                        {quiz.description}
                      </Text>
                    )}
                  </Box>

                  {!readonly && (
                    <Group gap="xs">
                      <ActionIcon
                        onClick={() => handleEditQuiz(quiz)}
                        size="sm"
                        variant="subtle"
                      >
                        <IconEdit size={14} />
                      </ActionIcon>
                      <ActionIcon
                        color="red"
                        onClick={() => handleDeleteQuiz(quiz.id)}
                        size="sm"
                        variant="subtle"
                      >
                        <IconTrash size={14} />
                      </ActionIcon>
                    </Group>
                  )}
                </Group>

                <Group gap="md">
                  <Group gap="xs">
                    <IconQuestionMark size={14} />
                    <Text c="dimmed" size="xs">
                      {quiz.questions?.length || 0} questions
                    </Text>
                  </Group>

                  <Group gap="xs">
                    <IconTarget size={14} />
                    <Text c="dimmed" size="xs">
                      {quiz.passingScore}% to pass
                    </Text>
                  </Group>

                  {quiz.timeLimit && (
                    <Group gap="xs">
                      <IconClock size={14} />
                      <Text c="dimmed" size="xs">
                        {quiz.timeLimit} min
                      </Text>
                    </Group>
                  )}
                </Group>
              </Stack>
            </Card>
          ))}
        </Stack>
      ) : (
        <Alert icon={<IconAlertCircle size={16} />} variant="light">
          No quizzes have been created for this {placement} yet.
        </Alert>
      )}

      {/* Quiz Creation/Edit Modal */}
      <Modal
        onClose={handleCloseModal}
        opened={modalOpen}
        size="lg"
        title={editingQuiz ? "Edit Quiz" : "Create New Quiz"}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Quiz Title"
              placeholder="Enter quiz title"
              required
              {...form.getInputProps("title")}
            />

            <Textarea
              label="Description"
              placeholder="Enter quiz description (optional)"
              rows={3}
              {...form.getInputProps("description")}
            />

            <Group grow>
              <NumberInput
                label="Passing Score (%)"
                max={100}
                min={0}
                placeholder="70"
                required
                {...form.getInputProps("passingScore")}
              />

              <NumberInput
                label="Time Limit (minutes)"
                min={1}
                placeholder="Optional"
                {...form.getInputProps("timeLimit")}
              />
            </Group>

            <Group grow>
              <NumberInput
                label="Max Attempts"
                min={1}
                placeholder="Unlimited"
                {...form.getInputProps("maxAttempts")}
              />

              <NumberInput
                label="Order"
                min={0}
                required
                {...form.getInputProps("order")}
              />
            </Group>

            <Checkbox
              description="Students must pass this quiz to progress"
              label="Required for completion"
              {...form.getInputProps("isRequired", { type: "checkbox" })}
            />

            <Divider label="Questions" labelPosition="center" />

            <QuestionBuilder
              onChange={(questions) =>
                form.setFieldValue("questions", questions)}
              questions={form.values.questions}
            />

            <Group gap="sm" justify="flex-end">
              <Button onClick={handleCloseModal} variant="subtle">
                Cancel
              </Button>
              <Button
                loading={
                  createQuizMutation.isPending || updateQuizMutation.isPending
                }
                type="submit"
              >
                {editingQuiz ? "Update Quiz" : "Create Quiz"}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Stack>
  );
};
