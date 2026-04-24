import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as useParams, e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { f as useSensors, h as useSensor, D as DndContext, i as closestCenter, j as KeyboardSensor, P as PointerSensor } from "../_libs/dnd-kit__core.mjs";
import { a as arrayMove, S as SortableContext, v as verticalListSortingStrategy, s as sortableKeyboardCoordinates, u as useSortable } from "../_libs/dnd-kit__sortable.mjs";
import { C as CSS } from "../_libs/dnd-kit__utilities.mjs";
import { u as useQuery, a as useMutation } from "../_libs/tanstack__react-query.mjs";
import { a_ as Route$1, a2 as useCourseWithStructure, a$ as useCreateSection, b0 as useCreateLesson, b1 as useUpdateSection, b2 as useUpdateLesson, b3 as useDeleteSection, b4 as useDeleteLesson, b5 as useReorderSections, ay as useUpdateCourse, P as PendingOverlay, aW as api, aX as useCreateLessonResource, aY as useUpdateLessonResource, aZ as useDeleteLessonResource } from "./router-D664CQ4V.mjs";
import { Q as QuestionBuilder } from "./question-builder-BRcYEjl_.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { o as useDisclosure } from "../_libs/mantine__hooks.mjs";
import { u as useForm } from "../_libs/mantine__form.mjs";
import { D as Container, T as Text, G as Group, a as Button, y as Stack, E as Title, F as Card, M as Modal, J as TextInput, a7 as Textarea, ak as NumberInput, ab as Switch, aq as TagsInput, K as Select, p as ActionIcon, Q as Badge, V as Menu, ao as Collapse, $ as Alert, ar as FileInput, B as Box, W as Checkbox, ag as Divider } from "../_libs/mantine__core.mjs";
import { X as IconPlus, ay as IconQuestionMark, J as IconSettings, ax as IconGripVertical, av as IconChevronDown, au as IconChevronRight, az as IconFiles, aA as IconDotsVertical, w as IconEdit, $ as IconTrash, aB as IconExternalLink, am as IconUpload, C as IconTarget, g as IconClock, b as IconAlertCircle, Z as IconFileText, O as IconVideo, aC as IconPresentation, aD as IconClipboardCheck, aE as IconLink, A as IconDownload, as as IconList, o as IconBook } from "../_libs/tabler__icons-react.mjs";
import { n as notifications } from "../_libs/mantine__notifications.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/dnd-kit__accessibility.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/@tanstack/react-router-ssr-query+[...].mjs";
import "../_libs/@tanstack/router-ssr-query-core+[...].mjs";
import "../_libs/ibnlanre__builder.mjs";
import "../_libs/tanstack__react-query-devtools.mjs";
import "../_libs/@tanstack/react-router-devtools+[...].mjs";
import "../_libs/mantine-form-zod-resolver.mjs";
import "../_libs/zod.mjs";
import "../_libs/tanstack__react-table.mjs";
import "../_libs/tanstack__table-core.mjs";
import "../_libs/date-fns.mjs";
import "../_libs/mantine__modals.mjs";
import "node:async_hooks";
import "../_libs/clsx.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/react-textarea-autosize.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/use-latest.mjs";
import "../_libs/use-isomorphic-layout-effect.mjs";
import "../_libs/use-composed-ref.mjs";
import "../_libs/react-number-format.mjs";
import "../_libs/floating-ui__react.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/mantine__store.mjs";
import "../_libs/react-transition-group.mjs";
import "../_libs/klona.mjs";
import "../_libs/fast-deep-equal.mjs";
import "../_libs/hello-pangea__dnd.mjs";
import "../_libs/redux.mjs";
import "../_libs/react-redux.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/css-box-model.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/raf-schd.mjs";
const useCourseQuizzes = (filters) => {
  return useQuery({
    enabled: !!filters?.courseId,
    // Only run if courseId is provided
    queryFn: () => api.$use.courseQuiz.list(filters),
    queryKey: api.courseQuiz.list.$use(filters)
  });
};
const useCreateCourseQuiz = () => {
  return useMutation({
    mutationFn: api.$use.courseQuiz.create,
    onError: (error) => {
      notifications.show({
        color: "red",
        message: "Failed to create quiz",
        title: "Error"
      });
      console.error("Create quiz error:", error);
    },
    onSuccess: () => {
      notifications.show({
        color: "green",
        message: "Quiz created successfully",
        title: "Success"
      });
    }
  });
};
const useUpdateCourseQuiz = () => {
  return useMutation({
    mutationFn: api.$use.courseQuiz.update,
    onError: (error) => {
      notifications.show({
        color: "red",
        message: "Failed to update quiz",
        title: "Error"
      });
      console.error("Update quiz error:", error);
    },
    onSuccess: () => {
      notifications.show({
        color: "green",
        message: "Quiz updated successfully",
        title: "Success"
      });
    }
  });
};
const useDeleteCourseQuiz = () => {
  return useMutation({
    mutationFn: api.$use.courseQuiz.delete,
    onError: (error) => {
      notifications.show({
        color: "red",
        message: "Failed to delete quiz",
        title: "Error"
      });
      console.error("Delete quiz error:", error);
    },
    onSuccess: () => {
      notifications.show({
        color: "green",
        message: "Quiz deleted successfully",
        title: "Success"
      });
    }
  });
};
const QuizManager = ({
  courseId,
  lessonId,
  placement,
  quizzes = [],
  readonly = false,
  sectionId
}) => {
  const [modalOpen, { close: closeModal, open: openModal }] = useDisclosure(false);
  const [editingQuiz, setEditingQuiz] = reactExports.useState(null);
  const createQuizMutation = useCreateCourseQuiz();
  const updateQuizMutation = useUpdateCourseQuiz();
  const deleteQuizMutation = useDeleteCourseQuiz();
  const form = useForm({
    initialValues: {
      description: "",
      isRequired: true,
      maxAttempts: null,
      order: (quizzes?.length || 0) + 1,
      passingScore: 70,
      questions: [],
      timeLimit: null,
      title: ""
    },
    validate: {
      passingScore: (value) => value < 0 || value > 100 ? "Passing score must be between 0-100" : null,
      questions: (value) => value.length === 0 ? "At least one question is required" : null,
      title: (value) => !value.trim() ? "Title is required" : null
    }
  });
  const handleOpenModal = () => {
    form.reset();
    setEditingQuiz(null);
    openModal();
  };
  const handleEditQuiz = (quiz) => {
    setEditingQuiz(quiz);
    form.setValues({
      description: quiz.description || "",
      isRequired: quiz.isRequired,
      maxAttempts: quiz.maxAttempts || null,
      order: quiz.order,
      passingScore: quiz.passingScore,
      questions: quiz.questions || [],
      timeLimit: quiz.timeLimit || null,
      title: quiz.title
    });
    openModal();
  };
  const handleCloseModal = () => {
    closeModal();
    form.reset();
    setEditingQuiz(null);
  };
  const handleSubmit = async (values) => {
    try {
      const quizData = {
        courseId,
        createdAt: editingQuiz ? editingQuiz.createdAt : Date.now(),
        createdBy: "current-user-id",
        // TODO: Get from auth context
        description: values.description,
        isRequired: values.isRequired,
        lessonId,
        maxAttempts: values.maxAttempts || void 0,
        order: values.order,
        passingScore: values.passingScore,
        placement,
        questions: values.questions,
        sectionId,
        timeLimit: values.timeLimit || void 0,
        title: values.title,
        unlockConditions: {
          requirePreviousCompletion: true
        },
        updatedAt: editingQuiz ? editingQuiz.updatedAt : Date.now()
      };
      if (editingQuiz) {
        await updateQuizMutation.mutateAsync({
          quizData,
          quizId: editingQuiz.id
        });
      } else {
        await createQuizMutation.mutateAsync(quizData);
      }
      handleCloseModal();
    } catch (error) {
      console.error("Quiz submission error:", error);
    }
  };
  const handleDeleteQuiz = async (quizId) => {
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
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconBook, { size: 16 });
      case "lesson":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconVideo, { size: 16 });
      case "section":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconList, { size: 16 });
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "center", justify: "space-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
        getPlacementIcon(),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 600, size: "sm", children: [
          getPlacementLabel(),
          " Quizzes"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { size: "sm", variant: "light", children: quizzes.length })
      ] }),
      !readonly && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlus, { size: 14 }),
          onClick: handleOpenModal,
          size: "xs",
          variant: "light",
          children: "Add Quiz"
        }
      )
    ] }),
    quizzes.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "sm", children: quizzes.map((quiz) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "sm", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "flex-start", justify: "space-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { flex: 1, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", mb: "xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 600, size: "sm", children: quiz.title }),
            quiz.isRequired && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "red", size: "xs", variant: "light", children: "Required" })
          ] }),
          quiz.description && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", lineClamp: 2, size: "xs", children: quiz.description })
        ] }),
        !readonly && /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActionIcon,
            {
              onClick: () => handleEditQuiz(quiz),
              size: "sm",
              variant: "subtle",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconEdit, { size: 14 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActionIcon,
            {
              color: "red",
              onClick: () => handleDeleteQuiz(quiz.id),
              size: "sm",
              variant: "subtle",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrash, { size: 14 })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconQuestionMark, { size: 14 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", children: [
            quiz.questions?.length || 0,
            " questions"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconTarget, { size: 14 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", children: [
            quiz.passingScore,
            "% to pass"
          ] })
        ] }),
        quiz.timeLimit && /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { size: 14 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", children: [
            quiz.timeLimit,
            " min"
          ] })
        ] })
      ] })
    ] }) }, quiz.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 16 }), variant: "light", children: [
      "No quizzes have been created for this ",
      placement,
      " yet."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        onClose: handleCloseModal,
        opened: modalOpen,
        size: "lg",
        title: editingQuiz ? "Edit Quiz" : "Create New Quiz",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TextInput,
            {
              label: "Quiz Title",
              placeholder: "Enter quiz title",
              required: true,
              ...form.getInputProps("title")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              label: "Description",
              placeholder: "Enter quiz description (optional)",
              rows: 3,
              ...form.getInputProps("description")
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { grow: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              NumberInput,
              {
                label: "Passing Score (%)",
                max: 100,
                min: 0,
                placeholder: "70",
                required: true,
                ...form.getInputProps("passingScore")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              NumberInput,
              {
                label: "Time Limit (minutes)",
                min: 1,
                placeholder: "Optional",
                ...form.getInputProps("timeLimit")
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { grow: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              NumberInput,
              {
                label: "Max Attempts",
                min: 1,
                placeholder: "Unlimited",
                ...form.getInputProps("maxAttempts")
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              NumberInput,
              {
                label: "Order",
                min: 0,
                required: true,
                ...form.getInputProps("order")
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Checkbox,
            {
              description: "Students must pass this quiz to progress",
              label: "Required for completion",
              ...form.getInputProps("isRequired", { type: "checkbox" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, { label: "Questions", labelPosition: "center" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            QuestionBuilder,
            {
              onChange: (questions) => form.setFieldValue("questions", questions),
              questions: form.values.questions
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", justify: "flex-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleCloseModal, variant: "subtle", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                loading: createQuizMutation.isPending || updateQuizMutation.isPending,
                type: "submit",
                children: editingQuiz ? "Update Quiz" : "Create Quiz"
              }
            )
          ] })
        ] }) })
      }
    )
  ] });
};
function ResourceManager({
  courseId,
  lessonId,
  readonly = false,
  resources,
  sectionId
}) {
  const [opened, { close, open }] = useDisclosure(false);
  const [editingResource, setEditingResource] = reactExports.useState(
    null
  );
  const [formData, setFormData] = reactExports.useState({
    description: "",
    file: void 0,
    title: "",
    type: "pdf",
    url: ""
  });
  const createResourceMutation = useCreateLessonResource();
  const updateResourceMutation = useUpdateLessonResource();
  const deleteResourceMutation = useDeleteLessonResource();
  const handleOpenModal = (resource) => {
    if (resource) {
      setEditingResource(resource);
      setFormData({
        description: resource.description || "",
        file: void 0,
        title: resource.title,
        type: resource.type,
        url: resource.url
      });
    } else {
      setEditingResource(null);
      setFormData({
        description: "",
        file: void 0,
        title: "",
        type: "pdf",
        url: ""
      });
    }
    open();
  };
  const handleCloseModal = () => {
    setEditingResource(null);
    setFormData({
      description: "",
      file: void 0,
      title: "",
      type: "pdf",
      url: ""
    });
    close();
  };
  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      notifications.show({
        color: "red",
        message: "Please enter a resource title",
        title: "Validation Error"
      });
      return;
    }
    if (formData.type !== "link" && !formData.file && !editingResource) {
      notifications.show({
        color: "red",
        message: "Please select a file to upload",
        title: "Validation Error"
      });
      return;
    }
    if (formData.type === "link" && !formData.url.trim()) {
      notifications.show({
        color: "red",
        message: "Please enter a valid URL",
        title: "Validation Error"
      });
      return;
    }
    try {
      const resourceData = {
        courseId,
        description: formData.description,
        isRequired: false,
        lessonId,
        order: (resources?.length || 0) + 1,
        sectionId,
        title: formData.title,
        type: formData.type,
        url: formData.url
      };
      if (editingResource) {
        await updateResourceMutation.mutateAsync({
          file: formData.file,
          resourceData: {
            ...resourceData,
            url: formData.file ? "" : editingResource.url
            // Keep existing URL if no new file
          },
          resourceId: editingResource.id
        });
        notifications.show({
          color: "green",
          message: "Resource updated successfully",
          title: "Success"
        });
      } else {
        await createResourceMutation.mutateAsync({
          file: formData.file,
          resourceData
        });
        notifications.show({
          color: "green",
          message: "Resource created successfully",
          title: "Success"
        });
      }
      handleCloseModal();
    } catch (error) {
      notifications.show({
        color: "red",
        message: `Failed to ${editingResource ? "update" : "create"} resource`,
        title: "Error"
      });
    }
  };
  const handleDelete = async (resourceId) => {
    try {
      await deleteResourceMutation.mutateAsync({ resourceId });
      notifications.show({
        color: "green",
        message: "Resource deleted successfully",
        title: "Success"
      });
    } catch (error) {
      notifications.show({
        color: "red",
        message: "Failed to delete resource",
        title: "Error"
      });
    }
  };
  const getResourceIcon = (type) => {
    switch (type) {
      case "download":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconDownload, { className: "text-green-500", size: 16 });
      case "link":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconLink, { className: "text-blue-500", size: 16 });
      case "pdf":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconFileText, { className: "text-red-500", size: 16 });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconFileText, { className: "text-gray-500", size: 16 });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { p: "lg", withBorder: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium text-gray-800", size: "lg", children: "Lesson Resources" }),
        !readonly && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            color: "fun-green",
            leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlus, { size: 16 }),
            onClick: () => handleOpenModal(),
            size: "sm",
            variant: "light",
            children: "Add Resource"
          }
        )
      ] }),
      (resources?.length || 0) > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "md", children: resources?.map((resource) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-gray-50", p: "md", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "flex-start", justify: "space-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "flex-start", gap: "sm", children: [
          getResourceIcon(resource.type),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium text-gray-800", size: "sm", children: resource.title }),
            resource.description && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", mt: 2, size: "xs", children: resource.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-500", mt: 2, size: "xs", children: resource.type.charAt(0).toUpperCase() + resource.type.slice(1) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              component: "a",
              href: resource.url,
              rel: "noopener noreferrer",
              rightSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconExternalLink, { size: 12 }),
              size: "xs",
              target: "_blank",
              variant: "subtle",
              children: "Open"
            }
          ),
          !readonly && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ActionIcon,
              {
                color: "blue",
                onClick: () => handleOpenModal(resource),
                size: "sm",
                variant: "subtle",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconEdit, { size: 14 })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ActionIcon,
              {
                color: "red",
                onClick: () => handleDelete(resource.id),
                size: "sm",
                variant: "subtle",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrash, { size: 14 })
              }
            )
          ] })
        ] })
      ] }) }, resource.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { color: "gray", variant: "light", children: [
        "No resources available for this lesson.",
        !readonly && " Click 'Add Resource' to get started."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        onClose: handleCloseModal,
        opened,
        size: "md",
        title: editingResource ? "Edit Resource" : "Add Resource",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TextInput,
            {
              label: "Title",
              onChange: (event) => setFormData({ ...formData, title: event.currentTarget.value }),
              placeholder: "Enter resource title",
              required: true,
              value: formData.title
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TextInput,
            {
              label: "Description",
              onChange: (event) => setFormData({
                ...formData,
                description: event.currentTarget.value
              }),
              placeholder: "Brief description (optional)",
              value: formData.description
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Select,
            {
              data: [
                { label: "PDF Document", value: "pdf" },
                { label: "External Link", value: "link" },
                { label: "Download File", value: "download" }
              ],
              label: "Type",
              onChange: (value) => setFormData({
                ...formData,
                type: value
              }),
              required: true,
              value: formData.type
            }
          ),
          formData.type === "link" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            TextInput,
            {
              label: "URL",
              onChange: (event) => setFormData({ ...formData, url: event.currentTarget.value }),
              placeholder: "https://example.com",
              required: true,
              value: formData.url
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            FileInput,
            {
              accept: formData.type === "pdf" ? ".pdf" : void 0,
              label: "File",
              leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconUpload, { size: 16 }),
              onChange: (file) => setFormData({ ...formData, file: file || void 0 }),
              placeholder: "Choose file to upload",
              required: !editingResource,
              value: formData.file
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", justify: "flex-end", mt: "md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleCloseModal, variant: "subtle", children: "Cancel" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                color: "fun-green",
                loading: createResourceMutation.isPending || updateResourceMutation.isPending,
                onClick: handleSubmit,
                children: editingResource ? "Update" : "Create"
              }
            )
          ] })
        ] })
      }
    )
  ] });
}
function CourseBuilder() {
  const {
    tenant
  } = Route$1.useRouteContext();
  const {
    courseId: courseIdParam
  } = useParams({
    strict: false
  });
  const courseId = String(courseIdParam);
  const navigate = useNavigate();
  const {
    data: course,
    error,
    isLoading
  } = useCourseWithStructure(courseId);
  const {
    data: courseQuizzes
  } = useCourseQuizzes({
    courseId
  });
  const createSection = useCreateSection();
  const createLesson = useCreateLesson();
  const updateSection = useUpdateSection();
  const updateLesson = useUpdateLesson();
  const deleteSection = useDeleteSection();
  const deleteLesson = useDeleteLesson();
  const reorderSections = useReorderSections();
  const updateCourse = useUpdateCourse();
  const [sectionModalOpen, {
    close: closeSectionModal,
    open: openSectionModal
  }] = useDisclosure(false);
  const [settingsModalOpen, {
    close: closeSettingsModal,
    open: openSettingsModal
  }] = useDisclosure(false);
  const [lessonModalOpen, {
    close: closeLessonModal,
    open: openLessonModal
  }] = useDisclosure(false);
  const [resourceModalOpen, {
    close: closeResourceModal,
    open: openResourceModal
  }] = useDisclosure(false);
  const [quizModalOpen, {
    close: closeQuizModal,
    open: openQuizModal
  }] = useDisclosure(false);
  const [editingSection, setEditingSection] = reactExports.useState(null);
  const [editingLesson, setEditingLesson] = reactExports.useState(null);
  const [resourceLessonId, setResourceLessonId] = reactExports.useState("");
  const [resourceSectionId, setResourceSectionId] = reactExports.useState("");
  const [quizCourseId, setQuizCourseId] = reactExports.useState("");
  const [quizSectionId, setQuizSectionId] = reactExports.useState("");
  const [quizLessonId, setQuizLessonId] = reactExports.useState("");
  const [quizPlacement, setQuizPlacement] = reactExports.useState("lesson");
  const activeLessonForResources = reactExports.useMemo(() => {
    if (!course || !resourceSectionId || !resourceLessonId) return null;
    const s = course.sections.find((sec) => sec.id === resourceSectionId);
    return s?.lessons.find((les) => les.id === resourceLessonId) || null;
  }, [course, resourceLessonId, resourceSectionId]);
  const settingsForm = useForm({
    initialValues: {
      hasCertificate: false,
      certificateTemplateId: "",
      tags: [],
      learningObjectives: [],
      prerequisites: []
    }
  });
  const sectionForm = useForm({
    initialValues: {
      courseId,
      description: "",
      estimatedDurationInMinutes: 0,
      isPublished: true,
      order: 0,
      title: ""
    }
  });
  const lessonForm = useForm({
    initialValues: {
      content: {},
      courseId,
      description: "",
      estimatedDuration: 0,
      isPublished: true,
      isRequired: true,
      order: 0,
      resources: [],
      sectionId: "",
      title: "",
      type: "video"
    }
  });
  const sensors = useSensors(useSensor(PointerSensor, {
    activationConstraint: {
      distance: 8
    }
  }), useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates
  }));
  const handleDragEnd = reactExports.useCallback((event) => {
    const {
      active,
      over
    } = event;
    if (!over || !course) return;
    const activeId = active.id;
    const overId = over.id;
    if (activeId !== overId) {
      const sections = [...course.sections];
      const oldIndex = sections.findIndex((section) => section.id === activeId);
      const newIndex = sections.findIndex((section) => section.id === overId);
      if (oldIndex !== -1 && newIndex !== -1) {
        const reorderedSections = arrayMove(sections, oldIndex, newIndex);
        const reorderData = reorderedSections.map((section, index) => ({
          itemId: section.id,
          newOrder: index,
          type: "section"
        }));
        reorderSections.mutate({
          courseId,
          reorderData
        });
      }
    }
  }, [course, courseId, reorderSections]);
  const handleOpenSettings = () => {
    if (course) {
      settingsForm.setValues({
        hasCertificate: course.hasCertificate || false,
        certificateTemplateId: course.certificateTemplateId || "",
        tags: course.tags || [],
        learningObjectives: course.learningObjectives || [],
        prerequisites: course.prerequisites || []
      });
    }
    openSettingsModal();
  };
  const handleSettingsSubmit = (values) => {
    updateCourse.mutate({
      courseId,
      courseData: values
    }, {
      onSuccess: () => closeSettingsModal()
    });
  };
  const handleAddSection = () => {
    sectionForm.reset();
    sectionForm.setFieldValue("order", course?.sections.length || 0);
    setEditingSection(null);
    openSectionModal();
  };
  const handleEditSection = (section) => {
    setEditingSection(section);
    sectionForm.setValues(section);
    openSectionModal();
  };
  const handleSectionSubmit = (values) => {
    if (editingSection) {
      const {
        courseId: _courseId,
        ...updateData
      } = values;
      updateSection.mutate({
        sectionData: {
          updates: {
            ...updateData
          },
          userId: "current-user"
          // TODO: Get from auth context
        },
        sectionId: editingSection.id
      }, {
        onSuccess: () => closeSectionModal()
      });
    } else {
      createSection.mutate({
        data: values,
        userId: "current-user"
        // TODO: Get from auth context
      }, {
        onSuccess: () => closeSectionModal()
      });
    }
  };
  const handleDeleteSection = (sectionId) => {
    if (window.confirm("Are you sure you want to delete this section? All lessons in this section will also be deleted.")) {
      deleteSection.mutate(sectionId);
    }
  };
  const handleAddLesson = (sectionId) => {
    const section = course?.sections.find((s) => s.id === sectionId);
    lessonForm.reset();
    lessonForm.setFieldValue("sectionId", sectionId);
    lessonForm.setFieldValue("order", section?.lessons.length || 0);
    setEditingLesson(null);
    openLessonModal();
  };
  const handleEditLesson = (lesson) => {
    setEditingLesson(lesson);
    lessonForm.setValues(lesson);
    openLessonModal();
  };
  const handleLessonSubmit = (values) => {
    if (editingLesson) {
      updateLesson.mutate({
        lessonData: {
          ...values,
          updatedAt: Date.now()
        },
        lessonId: editingLesson.id
      }, {
        onSuccess: () => closeLessonModal()
      });
    } else {
      createLesson.mutate({
        lessonData: values,
        userId: "current-user"
        // TODO: Get from auth context
      }, {
        onSuccess: () => closeLessonModal()
      });
    }
  };
  const handleDeleteLesson = (lessonId) => {
    if (window.confirm("Are you sure you want to delete this lesson?")) {
      deleteLesson.mutate(lessonId);
    }
  };
  const handleManageResources = (lessonId, sectionId) => {
    setResourceLessonId(lessonId);
    setResourceSectionId(sectionId);
    openResourceModal();
  };
  const handleManageCourseQuizzes = () => {
    setQuizCourseId(courseId);
    setQuizSectionId("");
    setQuizLessonId("");
    setQuizPlacement("course");
    openQuizModal();
  };
  const handleManageSectionQuizzes = (sectionId) => {
    setQuizCourseId(courseId);
    setQuizSectionId(sectionId);
    setQuizLessonId("");
    setQuizPlacement("section");
    openQuizModal();
  };
  const handleManageLessonQuizzes = (lessonId, sectionId) => {
    setQuizCourseId(courseId);
    setQuizSectionId(sectionId);
    setQuizLessonId(lessonId);
    setQuizPlacement("lesson");
    openQuizModal();
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PendingOverlay, { reason: "Loading course...", visible: true });
  }
  if (error || !course) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Container, { py: "xl", size: "sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "red", ta: "center", children: "Failed to load course. Please try again." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { justify: "center", mt: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => tenant.id && navigate({
        params: {
          tenant: tenant.id
        },
        to: "/$tenant/admin/courses"
      }), children: "Back to Courses" }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "md", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "center", justify: "space-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 2, children: course.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Build your course structure with sections and lessons" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlus, { size: 16 }), onClick: handleAddSection, variant: "light", children: "Add Section" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconQuestionMark, { size: 16 }), onClick: handleManageCourseQuizzes, variant: "outline", children: "Course Quizzes" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSettings, { size: 16 }), onClick: handleOpenSettings, variant: "outline", children: "Course Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => tenant.id && navigate({
          params: {
            tenant: tenant.id
          },
          to: "/$tenant/admin/courses"
        }), children: "Done" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", withBorder: true, children: course.sections.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(DndContext, { collisionDetection: closestCenter, onDragEnd: handleDragEnd, sensors, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SortableContext, { items: course.sections.map((s) => s.id), strategy: verticalListSortingStrategy, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "md", children: course.sections.map((section) => /* @__PURE__ */ jsxRuntimeExports.jsx(SortableSection, { onAddLesson: handleAddLesson, onDeleteLesson: handleDeleteLesson, onDeleteSection: handleDeleteSection, onEditLesson: handleEditLesson, onEditSection: handleEditSection, onManageLessonQuizzes: handleManageLessonQuizzes, onManageResources: handleManageResources, onManageSectionQuizzes: handleManageSectionQuizzes, section }, section.id)) }) }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-dashed border-stone-300", p: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "lg", ta: "center", children: "No sections yet. Start building your course structure." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlus, { size: 16 }), onClick: handleAddSection, children: "Add Your First Section" })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { onClose: closeSectionModal, opened: sectionModalOpen, size: "md", title: editingSection ? "Edit Section" : "Add New Section", children: /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: sectionForm.onSubmit(handleSectionSubmit), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Section Title", placeholder: "e.g., Introduction to React", required: true, ...sectionForm.getInputProps("title") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { label: "Description", minRows: 3, placeholder: "Brief description of this section", ...sectionForm.getInputProps("description") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NumberInput, { label: "Estimated Duration (minutes)", min: 0, placeholder: "0", ...sectionForm.getInputProps("estimatedDurationInMinutes") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { description: "Students can access this section", label: "Published", ...sectionForm.getInputProps("isPublished", {
        type: "checkbox"
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", mt: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: closeSectionModal, variant: "outline", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-fun-green-800 hover:bg-fun-green-700", loading: createSection.isPending || updateSection.isPending, type: "submit", children: editingSection ? "Update Section" : "Create Section" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { onClose: closeSettingsModal, opened: settingsModalOpen, size: "lg", title: "Course Settings", children: /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: settingsForm.onSubmit(handleSettingsSubmit), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { label: "Enable Certificate", description: "Students will receive a certificate upon course completion", ...settingsForm.getInputProps("hasCertificate", {
        type: "checkbox"
      }) }),
      settingsForm.values.hasCertificate && /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Certificate Template ID", placeholder: "Optional template ID", ...settingsForm.getInputProps("certificateTemplateId") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TagsInput, { label: "Tags", placeholder: "Press Enter to add tags", clearable: true, ...settingsForm.getInputProps("tags") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TagsInput, { label: "Learning Objectives", placeholder: "What will students learn?", clearable: true, ...settingsForm.getInputProps("learningObjectives") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TagsInput, { label: "Prerequisites", placeholder: "What should students know before?", clearable: true, ...settingsForm.getInputProps("prerequisites") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", mt: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: closeSettingsModal, variant: "outline", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { loading: updateCourse.isPending, type: "submit", className: "bg-fun-green-800 hover:bg-fun-green-700", children: "Save Settings" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { onClose: closeLessonModal, opened: lessonModalOpen, size: "lg", title: editingLesson ? "Edit Lesson" : "Add New Lesson", children: /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: lessonForm.onSubmit(handleLessonSubmit), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Lesson Title", placeholder: "e.g., Setting up React Development Environment", required: true, ...lessonForm.getInputProps("title") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { label: "Description", minRows: 3, placeholder: "Brief description of this lesson", ...lessonForm.getInputProps("description") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { grow: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { data: [{
          label: "Video",
          value: "video"
        }, {
          label: "Reading Material",
          value: "reading"
        }, {
          label: "Assignment",
          value: "assignment"
        }, {
          label: "Live Session",
          value: "live-session"
        }], label: "Lesson Type", ...lessonForm.getInputProps("type") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NumberInput, { label: "Estimated Duration (minutes)", min: 0, placeholder: "0", ...lessonForm.getInputProps("estimatedDuration") })
      ] }),
      lessonForm.values.type === "video" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Video URL", placeholder: "https://youtube.com/watch?v=...", ...lessonForm.getInputProps("content.videoUrl") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Subtitle URL (Optional)", description: "Link to a VTT or SRT file for video subtitles", placeholder: "https://example.com/subtitles.vtt", value: lessonForm.values.content?.subtitles?.[0]?.url || "", onChange: (e) => {
          const url = e.currentTarget.value;
          lessonForm.setFieldValue("content.subtitles", url ? [{
            label: "English",
            language: "en",
            url
          }] : []);
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { label: "Video Transcript (Optional)", minRows: 3, placeholder: "Full text transcript of the video...", ...lessonForm.getInputProps("content.transcript") })
      ] }),
      lessonForm.values.type === "reading" && /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { label: "Content", minRows: 5, placeholder: "Enter reading material content...", ...lessonForm.getInputProps("content.textContent") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { grow: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { description: "Students must complete this lesson", label: "Required", ...lessonForm.getInputProps("isRequired", {
          type: "checkbox"
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { description: "Students can access this lesson", label: "Published", ...lessonForm.getInputProps("isPublished", {
          type: "checkbox"
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", mt: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: closeLessonModal, variant: "outline", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-fun-green-800 hover:bg-fun-green-700", loading: createLesson.isPending || updateLesson.isPending, type: "submit", children: editingLesson ? "Update Lesson" : "Create Lesson" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { onClose: () => {
      closeResourceModal();
      setResourceLessonId("");
      setResourceSectionId("");
    }, opened: resourceModalOpen, size: "lg", title: "Manage Lesson Resources", children: resourceLessonId && resourceSectionId && /* @__PURE__ */ jsxRuntimeExports.jsx(ResourceManager, { courseId, lessonId: resourceLessonId, resources: activeLessonForResources?.resources || [], sectionId: resourceSectionId }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { onClose: () => {
      closeQuizModal();
      setQuizCourseId("");
      setQuizSectionId("");
      setQuizLessonId("");
      setQuizPlacement("lesson");
    }, opened: quizModalOpen, size: "xl", title: `Manage ${quizPlacement === "course" ? "Course" : quizPlacement === "section" ? "Section" : "Lesson"} Quizzes`, children: quizCourseId && /* @__PURE__ */ jsxRuntimeExports.jsx(QuizManager, { courseId: quizCourseId, lessonId: quizLessonId || void 0, placement: quizPlacement, quizzes: courseQuizzes?.filter((quiz) => {
      if (quizPlacement === "course") return quiz.placement === "course" && !quiz.sectionId && !quiz.lessonId;
      if (quizPlacement === "section") return quiz.placement === "section" && quiz.sectionId === quizSectionId;
      if (quizPlacement === "lesson") return quiz.placement === "lesson" && quiz.lessonId === quizLessonId;
      return false;
    }) || [], sectionId: quizSectionId || void 0 }) })
  ] }) });
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
  section
}) {
  const [isOpen, setIsOpen] = reactExports.useState(true);
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({
    id: section.id
  });
  const style = {
    opacity: isDragging ? 0.5 : 1,
    transform: CSS.Transform.toString(transform),
    transition
  };
  const getLessonIcon = (type) => {
    switch (type) {
      case "assignment":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconClipboardCheck, { className: "text-orange-600", size: 16 });
      case "live-session":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconPresentation, { className: "text-purple-600", size: 16 });
      case "reading":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconFileText, { className: "text-green-600", size: 16 });
      case "video":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconVideo, { className: "text-blue-600", size: 16 });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconFileText, { className: "text-gray-600", size: 16 });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: `mb-4 border-2 ${isDragging ? "border-fun-green-300" : "border-stone-200"}`, p: "md", ref: setNodeRef, style, withBorder: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "flex-start", justify: "space-between", mb: "sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", style: {
        flex: 1
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ActionIcon, { size: "sm", variant: "subtle", ...attributes, ...listeners, className: "cursor-grab hover:cursor-grabbing", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconGripVertical, { size: 14 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ActionIcon, { onClick: () => setIsOpen(!isOpen), size: "sm", variant: "subtle", children: isOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(IconChevronDown, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(IconChevronRight, { size: 14 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
          flex: 1
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "center", gap: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 600, size: "lg", children: section.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color: "blue", variant: "light", children: [
              section.lessons.length,
              " lessons"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color: "green", variant: "light", children: [
              Math.round(section.estimatedDurationInMinutes || 0),
              " min"
            ] }),
            section.lessons.reduce((acc, obj) => acc + (obj.resources?.length || 0), 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color: "grape", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconFiles, { size: 12 }), variant: "light", children: [
              section.lessons.reduce((acc, obj) => acc + (obj.resources?.length || 0), 0),
              " ",
              "resources"
            ] })
          ] }),
          section.description && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", mt: "xs", size: "sm", children: section.description })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlus, { size: 14 }), onClick: () => onAddLesson(section.id), size: "xs", variant: "light", children: "Add Lesson" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { position: "bottom-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Target, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActionIcon, { size: "sm", variant: "subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconDotsVertical, { size: 14 }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu.Dropdown, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Item, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconEdit, { size: 14 }), onClick: () => onEditSection(section), children: "Edit Section" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Item, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconQuestionMark, { size: 14 }), onClick: () => onManageSectionQuizzes(section.id), children: "Section Quizzes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Item, { color: "red", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrash, { size: 14 }), onClick: () => onDeleteSection(section.id), children: "Delete Section" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Collapse, { in: isOpen, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xs", ml: "xl", children: [
      section.lessons.map((lesson) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-stone-100 bg-stone-50", p: "sm", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "center", justify: "space-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", style: {
          flex: 1
        }, children: [
          getLessonIcon(lesson.type),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
            flex: 1
          }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, size: "sm", children: lesson.title }),
            lesson.description && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: lesson.description })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "gray", size: "sm", variant: "dot", children: lesson.type }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", children: [
              lesson.estimatedDuration,
              " min"
            ] }),
            (lesson.resources?.length || 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "grape", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconFiles, { size: 10 }), size: "xs", variant: "light", children: lesson.resources?.length }),
            lesson.isRequired && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "red", size: "xs", children: "Required" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ActionIcon, { color: "blue", onClick: () => onManageResources(lesson.id, section.id), size: "sm", variant: "subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconFiles, { size: 14 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ActionIcon, { color: "orange", onClick: () => onManageLessonQuizzes(lesson.id, section.id), size: "sm", variant: "subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconQuestionMark, { size: 14 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ActionIcon, { onClick: () => onEditLesson(lesson), size: "sm", variant: "subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconEdit, { size: 14 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ActionIcon, { color: "red", onClick: () => onDeleteLesson(lesson.id), size: "sm", variant: "subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrash, { size: 14 }) })
        ] })
      ] }) }, lesson.id)),
      section.lessons.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-dashed border-stone-300", p: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", ta: "center", children: [
        "No lessons in this section yet.",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "blue", component: "span", onClick: () => onAddLesson(section.id), style: {
          cursor: "pointer"
        }, children: "Add your first lesson" })
      ] }) })
    ] }) })
  ] });
}
export {
  CourseBuilder as component
};
