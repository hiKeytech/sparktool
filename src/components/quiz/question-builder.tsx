import type { QuizQuestion } from "@/types";

import {
    DragDropContext,
    Draggable,
    Droppable,
    type DropResult,
} from "@hello-pangea/dnd";
import {
    ActionIcon,
    Alert,
    Box,
    Button,
    Card,
    Checkbox,
    Group,
    Modal,
    NumberInput,
    Select,
    Stack,
    Text,
    Textarea,
    TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import {
    IconAlertCircle,
    IconCheck,
    IconEdit,
    IconGripVertical,
    IconPlus,
    IconTrash,
    IconX,
} from "@tabler/icons-react";
import React, { useState } from "react";

interface QuestionBuilderProps {
  onChange: (questions: Omit<QuizQuestion, "id">[]) => void;
  questions: Omit<QuizQuestion, "id">[];
  readonly?: boolean;
}

interface QuestionFormData {
  correctAnswer?: number | string;
  explanation?: string;
  options?: string[];
  points: number;
  question: string;
  type: "essay" | "multiple-choice" | "short-answer" | "true-false";
}

export const QuestionBuilder: React.FC<QuestionBuilderProps> = ({
  onChange,
  questions,
  readonly = false,
}) => {
  const [modalOpen, { close: closeModal, open: openModal }] =
    useDisclosure(false);
  const [editingIndex, setEditingIndex] = useState<null | number>(null);

  const form = useForm<QuestionFormData>({
    initialValues: {
      correctAnswer: 0,
      explanation: "",
      options: ["", "", "", ""],
      points: 1,
      question: "",
      type: "multiple-choice",
    },
    validate: {
      options: (value, values) => {
        if (values.type === "multiple-choice") {
          const validOptions = value?.filter((opt) => opt.trim()) || [];
          if (validOptions.length < 2) {
            return "At least 2 options are required for multiple choice";
          }
        }
        return null;
      },
      points: (value) => (value <= 0 ? "Points must be greater than 0" : null),
      question: (value) => (!value.trim() ? "Question is required" : null),
    },
  });

  const handleOpenModal = () => {
    form.reset();
    setEditingIndex(null);
    openModal();
  };

  const handleEditQuestion = (index: number) => {
    const question = questions[index];
    setEditingIndex(index);

    form.setValues({
      correctAnswer: question.correctAnswer,
      explanation: question.explanation || "",
      options: question.options || ["", "", "", ""],
      points: question.points,
      question: question.question,
      type: question.type,
    });

    openModal();
  };

  const handleCloseModal = () => {
    closeModal();
    form.reset();
    setEditingIndex(null);
  };

  const handleSubmit = (values: QuestionFormData) => {
    const newQuestion: QuizQuestion = {
      id: crypto.randomUUID(),
      correctAnswer: "", // Will be overridden based on type
      explanation: values.explanation,
      points: values.points,
      question: values.question,
      type: values.type,
    };

    // Add type-specific fields
    if (values.type === "multiple-choice") {
      newQuestion.options = values.options?.filter((opt) => opt.trim()) || [];
      newQuestion.correctAnswer = values.correctAnswer as number;
    } else if (values.type === "true-false") {
      newQuestion.options = ["True", "False"];
      newQuestion.correctAnswer = values.correctAnswer as number;
    } else {
      newQuestion.correctAnswer = values.correctAnswer as string;
    }

    if (editingIndex !== null) {
      // Update existing question
      const updatedQuestions = [...questions];
      updatedQuestions[editingIndex] = newQuestion;
      onChange(updatedQuestions);
    } else {
      // Add new question
      onChange([...questions, newQuestion]);
    }

    handleCloseModal();
  };

  const handleDeleteQuestion = (index: number) => {
    if (confirm("Are you sure you want to delete this question?")) {
      const updatedQuestions = questions.filter((_, i) => i !== index);
      onChange(updatedQuestions);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onChange(items);
  };

  const addOption = () => {
    const currentOptions = form.values.options || [];
    form.setFieldValue("options", [...currentOptions, ""]);
  };

  const removeOption = (index: number) => {
    const currentOptions = form.values.options || [];
    if (currentOptions.length > 2) {
      const newOptions = currentOptions.filter((_, i) => i !== index);
      form.setFieldValue("options", newOptions);

      // Adjust correct answer if needed
      if (form.values.correctAnswer === index) {
        form.setFieldValue("correctAnswer", 0);
      } else if (Number(form.values.correctAnswer) > index) {
        form.setFieldValue(
          "correctAnswer",
          (form.values.correctAnswer as number) - 1
        );
      }
    }
  };

  const updateOption = (index: number, value: string) => {
    const currentOptions = form.values.options || [];
    const newOptions = [...currentOptions];
    newOptions[index] = value;
    form.setFieldValue("options", newOptions);
  };

  return (
    <Stack gap="md">
      <Group align="center" justify="space-between">
        <Text fw={600} size="sm">
          Questions ({questions.length})
        </Text>

        {!readonly && (
          <Button
            leftSection={<IconPlus size={14} />}
            onClick={handleOpenModal}
            size="xs"
            variant="light"
          >
            Add Question
          </Button>
        )}
      </Group>

      {questions.length > 0 ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="questions">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Stack gap="sm">
                  {questions.map((question, index) => (
                    <Draggable
                      draggableId={`question-${index}`}
                      index={index}
                      isDragDisabled={readonly}
                      key={index}
                    >
                      {(provided, snapshot) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          p="sm"
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? 0.8 : 1,
                          }}
                          withBorder
                        >
                          <Group align="flex-start" gap="sm">
                            {!readonly && (
                              <ActionIcon
                                {...provided.dragHandleProps}
                                size="sm"
                                style={{ cursor: "grab" }}
                                variant="subtle"
                              >
                                <IconGripVertical size={14} />
                              </ActionIcon>
                            )}

                            <Box flex={1}>
                              <Group
                                align="flex-start"
                                justify="space-between"
                                mb="xs"
                              >
                                <Group gap="xs">
                                  <Text fw={600} size="sm">
                                    Question {index + 1}
                                  </Text>
                                  <Text c="dimmed" size="xs" tt="capitalize">
                                    ({question.type.replace("-", " ")})
                                  </Text>
                                  <Text c="blue" size="xs">
                                    {question.points} pt
                                    {question.points !== 1 ? "s" : ""}
                                  </Text>
                                </Group>

                                {!readonly && (
                                  <Group gap="xs">
                                    <ActionIcon
                                      onClick={() => handleEditQuestion(index)}
                                      size="sm"
                                      variant="subtle"
                                    >
                                      <IconEdit size={14} />
                                    </ActionIcon>
                                    <ActionIcon
                                      color="red"
                                      onClick={() =>
                                        handleDeleteQuestion(index)}
                                      size="sm"
                                      variant="subtle"
                                    >
                                      <IconTrash size={14} />
                                    </ActionIcon>
                                  </Group>
                                )}
                              </Group>

                              <Text mb="xs" size="sm">
                                {question.question}
                              </Text>

                              {(question.type === "multiple-choice" ||
                                question.type === "true-false") && (
                                <Stack gap="xs">
                                  {question.options?.map((option, optIndex) => (
                                    <Group gap="xs" key={optIndex}>
                                      {question.correctAnswer === optIndex ? (
                                        <IconCheck color="green" size={14} />
                                      ) : (
                                        <IconX color="gray" size={14} />
                                      )}
                                      <Text
                                        c={
                                          question.correctAnswer === optIndex
                                            ? "green"
                                            : "dimmed"
                                        }
                                        size="sm"
                                      >
                                        {option}
                                      </Text>
                                    </Group>
                                  ))}
                                </Stack>
                              )}

                              {question.explanation && (
                                <Text
                                  c="dimmed"
                                  mt="xs"
                                  size="xs"
                                  style={{ fontStyle: "italic" }}
                                >
                                  Explanation: {question.explanation}
                                </Text>
                              )}
                            </Box>
                          </Group>
                        </Card>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Stack>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <Alert icon={<IconAlertCircle size={16} />} variant="light">
          No questions have been added to this quiz yet.
        </Alert>
      )}

      {/* Question Creation/Edit Modal */}
      <Modal
        onClose={handleCloseModal}
        opened={modalOpen}
        size="lg"
        title={editingIndex !== null ? "Edit Question" : "Add Question"}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <Select
              data={[
                { label: "Multiple Choice", value: "multiple-choice" },
                { label: "True/False", value: "true-false" },
                { label: "Short Answer", value: "short-answer" },
                { label: "Essay", value: "essay" },
              ]}
              label="Question Type"
              required
              {...form.getInputProps("type")}
            />

            <Textarea
              label="Question"
              placeholder="Enter your question"
              required
              rows={3}
              {...form.getInputProps("question")}
            />

            {form.values.type === "multiple-choice" && (
              <Stack gap="sm">
                <Group justify="space-between">
                  <Text fw={600} size="sm">
                    Options
                  </Text>
                  <Button
                    leftSection={<IconPlus size={14} />}
                    onClick={addOption}
                    size="xs"
                    variant="subtle"
                  >
                    Add Option
                  </Button>
                </Group>

                {form.values.options?.map((option, index) => (
                  <Group align="flex-end" gap="sm" key={index}>
                    <TextInput
                      flex={1}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      value={option}
                    />
                    <Checkbox
                      checked={form.values.correctAnswer === index}
                      label="Correct"
                      onChange={() =>
                        form.setFieldValue("correctAnswer", index)}
                    />
                    {(form.values.options?.length || 0) > 2 && (
                      <ActionIcon
                        color="red"
                        onClick={() => removeOption(index)}
                        variant="subtle"
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    )}
                  </Group>
                ))}
              </Stack>
            )}

            {form.values.type === "true-false" && (
              <Select
                data={[
                  { label: "True", value: "0" },
                  { label: "False", value: "1" },
                ]}
                label="Correct Answer"
                onChange={(value) =>
                  form.setFieldValue("correctAnswer", parseInt(value || "0"))}
                required
                value={form.values.correctAnswer?.toString()}
              />
            )}

            {(form.values.type === "short-answer" ||
              form.values.type === "essay") && (
              <TextInput
                label="Sample Answer (for grading reference)"
                placeholder="Enter a sample correct answer"
                {...form.getInputProps("correctAnswer")}
              />
            )}

            <Group grow>
              <NumberInput
                label="Points"
                min={1}
                required
                {...form.getInputProps("points")}
              />
            </Group>

            <Textarea
              label="Explanation (Optional)"
              placeholder="Provide an explanation for the correct answer"
              rows={2}
              {...form.getInputProps("explanation")}
            />

            <Group gap="sm" justify="flex-end">
              <Button onClick={handleCloseModal} variant="subtle">
                Cancel
              </Button>
              <Button type="submit">
                {editingIndex !== null ? "Update Question" : "Add Question"}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Stack>
  );
};
