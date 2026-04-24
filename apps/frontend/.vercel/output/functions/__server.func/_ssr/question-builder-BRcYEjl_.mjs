import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { D as DragDropContext, C as ConnectedDroppable, P as PublicDraggable } from "../_libs/hello-pangea__dnd.mjs";
import { o as useDisclosure } from "../_libs/mantine__hooks.mjs";
import { u as useForm } from "../_libs/mantine__form.mjs";
import { y as Stack, G as Group, T as Text, a as Button, F as Card, p as ActionIcon, B as Box, $ as Alert, M as Modal, K as Select, a7 as Textarea, J as TextInput, W as Checkbox, ak as NumberInput } from "../_libs/mantine__core.mjs";
import { X as IconPlus, ax as IconGripVertical, w as IconEdit, $ as IconTrash, I as IconCheck, ak as IconX, b as IconAlertCircle } from "../_libs/tabler__icons-react.mjs";
const QuestionBuilder = ({
  onChange,
  questions,
  readonly = false
}) => {
  const [modalOpen, { close: closeModal, open: openModal }] = useDisclosure(false);
  const [editingIndex, setEditingIndex] = reactExports.useState(null);
  const form = useForm({
    initialValues: {
      correctAnswer: 0,
      explanation: "",
      options: ["", "", "", ""],
      points: 1,
      question: "",
      type: "multiple-choice"
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
      points: (value) => value <= 0 ? "Points must be greater than 0" : null,
      question: (value) => !value.trim() ? "Question is required" : null
    }
  });
  const handleOpenModal = () => {
    form.reset();
    setEditingIndex(null);
    openModal();
  };
  const handleEditQuestion = (index) => {
    const question = questions[index];
    setEditingIndex(index);
    form.setValues({
      correctAnswer: question.correctAnswer,
      explanation: question.explanation || "",
      options: question.options || ["", "", "", ""],
      points: question.points,
      question: question.question,
      type: question.type
    });
    openModal();
  };
  const handleCloseModal = () => {
    closeModal();
    form.reset();
    setEditingIndex(null);
  };
  const handleSubmit = (values) => {
    const newQuestion = {
      id: crypto.randomUUID(),
      correctAnswer: "",
      // Will be overridden based on type
      explanation: values.explanation,
      points: values.points,
      question: values.question,
      type: values.type
    };
    if (values.type === "multiple-choice") {
      newQuestion.options = values.options?.filter((opt) => opt.trim()) || [];
      newQuestion.correctAnswer = values.correctAnswer;
    } else if (values.type === "true-false") {
      newQuestion.options = ["True", "False"];
      newQuestion.correctAnswer = values.correctAnswer;
    } else {
      newQuestion.correctAnswer = values.correctAnswer;
    }
    if (editingIndex !== null) {
      const updatedQuestions = [...questions];
      updatedQuestions[editingIndex] = newQuestion;
      onChange(updatedQuestions);
    } else {
      onChange([...questions, newQuestion]);
    }
    handleCloseModal();
  };
  const handleDeleteQuestion = (index) => {
    if (confirm("Are you sure you want to delete this question?")) {
      const updatedQuestions = questions.filter((_, i) => i !== index);
      onChange(updatedQuestions);
    }
  };
  const handleDragEnd = (result) => {
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
  const removeOption = (index) => {
    const currentOptions = form.values.options || [];
    if (currentOptions.length > 2) {
      const newOptions = currentOptions.filter((_, i) => i !== index);
      form.setFieldValue("options", newOptions);
      if (form.values.correctAnswer === index) {
        form.setFieldValue("correctAnswer", 0);
      } else if (Number(form.values.correctAnswer) > index) {
        form.setFieldValue(
          "correctAnswer",
          form.values.correctAnswer - 1
        );
      }
    }
  };
  const updateOption = (index, value) => {
    const currentOptions = form.values.options || [];
    const newOptions = [...currentOptions];
    newOptions[index] = value;
    form.setFieldValue("options", newOptions);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "center", justify: "space-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 600, size: "sm", children: [
        "Questions (",
        questions.length,
        ")"
      ] }),
      !readonly && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlus, { size: 14 }),
          onClick: handleOpenModal,
          size: "xs",
          variant: "light",
          children: "Add Question"
        }
      )
    ] }),
    questions.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(DragDropContext, { onDragEnd: handleDragEnd, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ConnectedDroppable, { droppableId: "questions", children: (provided) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...provided.droppableProps, ref: provided.innerRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "sm", children: [
      questions.map((question, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        PublicDraggable,
        {
          draggableId: `question-${index}`,
          index,
          isDragDisabled: readonly,
          children: (provided2, snapshot) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Card,
            {
              ref: provided2.innerRef,
              ...provided2.draggableProps,
              p: "sm",
              style: {
                ...provided2.draggableProps.style,
                opacity: snapshot.isDragging ? 0.8 : 1
              },
              withBorder: true,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "flex-start", gap: "sm", children: [
                !readonly && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ActionIcon,
                  {
                    ...provided2.dragHandleProps,
                    size: "sm",
                    style: { cursor: "grab" },
                    variant: "subtle",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconGripVertical, { size: 14 })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { flex: 1, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Group,
                    {
                      align: "flex-start",
                      justify: "space-between",
                      mb: "xs",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 600, size: "sm", children: [
                            "Question ",
                            index + 1
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", tt: "capitalize", children: [
                            "(",
                            question.type.replace("-", " "),
                            ")"
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "blue", size: "xs", children: [
                            question.points,
                            " pt",
                            question.points !== 1 ? "s" : ""
                          ] })
                        ] }),
                        !readonly && /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            ActionIcon,
                            {
                              onClick: () => handleEditQuestion(index),
                              size: "sm",
                              variant: "subtle",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconEdit, { size: 14 })
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            ActionIcon,
                            {
                              color: "red",
                              onClick: () => handleDeleteQuestion(index),
                              size: "sm",
                              variant: "subtle",
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrash, { size: 14 })
                            }
                          )
                        ] })
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { mb: "xs", size: "sm", children: question.question }),
                  (question.type === "multiple-choice" || question.type === "true-false") && /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "xs", children: question.options?.map((option, optIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
                    question.correctAnswer === optIndex ? /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { color: "green", size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(IconX, { color: "gray", size: 14 }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Text,
                      {
                        c: question.correctAnswer === optIndex ? "green" : "dimmed",
                        size: "sm",
                        children: option
                      }
                    )
                  ] }, optIndex)) }),
                  question.explanation && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Text,
                    {
                      c: "dimmed",
                      mt: "xs",
                      size: "xs",
                      style: { fontStyle: "italic" },
                      children: [
                        "Explanation: ",
                        question.explanation
                      ]
                    }
                  )
                ] })
              ] })
            }
          )
        },
        index
      )),
      provided.placeholder
    ] }) }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 16 }), variant: "light", children: "No questions have been added to this quiz yet." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        onClose: handleCloseModal,
        opened: modalOpen,
        size: "lg",
        title: editingIndex !== null ? "Edit Question" : "Add Question",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Select,
            {
              data: [
                { label: "Multiple Choice", value: "multiple-choice" },
                { label: "True/False", value: "true-false" },
                { label: "Short Answer", value: "short-answer" },
                { label: "Essay", value: "essay" }
              ],
              label: "Question Type",
              required: true,
              ...form.getInputProps("type")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              label: "Question",
              placeholder: "Enter your question",
              required: true,
              rows: 3,
              ...form.getInputProps("question")
            }
          ),
          form.values.type === "multiple-choice" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 600, size: "sm", children: "Options" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlus, { size: 14 }),
                  onClick: addOption,
                  size: "xs",
                  variant: "subtle",
                  children: "Add Option"
                }
              )
            ] }),
            form.values.options?.map((option, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "flex-end", gap: "sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TextInput,
                {
                  flex: 1,
                  onChange: (e) => updateOption(index, e.target.value),
                  placeholder: `Option ${index + 1}`,
                  value: option
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Checkbox,
                {
                  checked: form.values.correctAnswer === index,
                  label: "Correct",
                  onChange: () => form.setFieldValue("correctAnswer", index)
                }
              ),
              (form.values.options?.length || 0) > 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                ActionIcon,
                {
                  color: "red",
                  onClick: () => removeOption(index),
                  variant: "subtle",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrash, { size: 16 })
                }
              )
            ] }, index))
          ] }),
          form.values.type === "true-false" && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Select,
            {
              data: [
                { label: "True", value: "0" },
                { label: "False", value: "1" }
              ],
              label: "Correct Answer",
              onChange: (value) => form.setFieldValue("correctAnswer", parseInt(value || "0")),
              required: true,
              value: form.values.correctAnswer?.toString()
            }
          ),
          (form.values.type === "short-answer" || form.values.type === "essay") && /* @__PURE__ */ jsxRuntimeExports.jsx(
            TextInput,
            {
              label: "Sample Answer (for grading reference)",
              placeholder: "Enter a sample correct answer",
              ...form.getInputProps("correctAnswer")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { grow: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            NumberInput,
            {
              label: "Points",
              min: 1,
              required: true,
              ...form.getInputProps("points")
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              label: "Explanation (Optional)",
              placeholder: "Provide an explanation for the correct answer",
              rows: 2,
              ...form.getInputProps("explanation")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", justify: "flex-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleCloseModal, variant: "subtle", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: editingIndex !== null ? "Update Question" : "Add Question" })
          ] })
        ] }) })
      }
    )
  ] });
};
export {
  QuestionBuilder as Q
};
