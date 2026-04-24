import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { as as Route$d, I as useAuthContext, at as useQuizzes, _ as useListCourses, au as useQuizAttempts, M as DataTable, f as formatDate, ao as useCreateQuiz, ap as createQuizSchema, ar as useUpdateQuiz, aq as useDeleteQuiz } from "./router-D664CQ4V.mjs";
import { z as zod4Resolver } from "../_libs/mantine-form-zod-resolver.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { D as Container, x as Center, y as Stack, z as Loader, T as Text, G as Group, E as Title, a as Button, H as Grid, aa as Paper, a2 as ThemeIcon, Q as Badge, J as TextInput, a7 as Textarea, K as Select, ak as NumberInput, $ as Alert, V as Menu, p as ActionIcon } from "../_libs/mantine__core.mjs";
import { X as IconPlus, al as IconClipboard, l as IconUsers, C as IconTarget, g as IconClock, y as IconCalendar, b as IconAlertCircle, ad as IconDots, ae as IconEye, w as IconEdit, $ as IconTrash, I as IconCheck } from "../_libs/tabler__icons-react.mjs";
import { m as modals } from "../_libs/mantine__modals.mjs";
import { u as useForm } from "../_libs/mantine__form.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/@tanstack/react-router-ssr-query+[...].mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/@tanstack/router-ssr-query-core+[...].mjs";
import "../_libs/ibnlanre__builder.mjs";
import "../_libs/tanstack__react-query-devtools.mjs";
import "../_libs/@tanstack/react-router-devtools+[...].mjs";
import "../_libs/tanstack__react-table.mjs";
import "../_libs/tanstack__table-core.mjs";
import "../_libs/date-fns.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/mantine__hooks.mjs";
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
function openCreateQuizModal(courses, user) {
  modals.open({
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreateQuizModal, { courses, user }),
    size: "lg",
    title: "Create New Quiz"
  });
}
function CreateQuizModal({ courses, user }) {
  const createQuiz = useCreateQuiz();
  const form = useForm({
    initialValues: {
      courseId: "",
      description: "",
      maxAttempts: 3,
      passingScore: 70,
      timeLimit: 30,
      title: ""
    },
    validate: zod4Resolver(createQuizSchema)
  });
  const handleSubmit = (values) => {
    createQuiz.mutate(
      {
        ...values,
        createdAt: Date.now(),
        createdBy: user.uid,
        questions: [],
        updatedAt: Date.now()
      },
      {
        onError: (error) => {
          notifications.show({
            color: "red",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 16 }),
            message: error.message || "Failed to create quiz",
            title: "Error"
          });
        },
        onSuccess: () => {
          notifications.show({
            color: "green",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: 16 }),
            message: "Quiz created successfully",
            title: "Success"
          });
          modals.closeAll();
        }
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
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
        minRows: 3,
        placeholder: "Enter quiz description",
        ...form.getInputProps("description")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Select,
      {
        data: courses.map((course) => ({
          label: course.title,
          value: course.id
        })),
        label: "Course",
        placeholder: "Select a course",
        required: true,
        ...form.getInputProps("courseId")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 4, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        NumberInput,
        {
          label: "Passing Score (%)",
          max: 100,
          min: 0,
          placeholder: "70",
          required: true,
          ...form.getInputProps("passingScore")
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 4, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        NumberInput,
        {
          label: "Time Limit (minutes)",
          min: 1,
          placeholder: "30",
          ...form.getInputProps("timeLimit")
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 4, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        NumberInput,
        {
          label: "Max Attempts",
          min: 1,
          placeholder: "3",
          ...form.getInputProps("maxAttempts")
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "blue", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 16 }), title: "Note", children: "You can add questions to this quiz after creating it." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => modals.closeAll(), variant: "outline", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "bg-fun-green-600 hover:bg-fun-green-700",
          loading: createQuiz.isPending,
          type: "submit",
          children: "Create Quiz"
        }
      )
    ] })
  ] }) });
}
function openDeleteQuizModal(quiz) {
  modals.open({
    centered: true,
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(DeleteQuizModal, { quiz }),
    title: "Delete Quiz"
  });
}
function DeleteQuizModal({ quiz }) {
  const deleteQuiz = useDeleteQuiz();
  const handleDelete = () => {
    deleteQuiz.mutate(quiz.id, {
      onError: (error) => {
        notifications.show({
          color: "red",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 16 }),
          message: error.message || "Failed to delete quiz",
          title: "Error"
        });
      },
      onSuccess: () => {
        notifications.show({
          color: "green",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: 16 }),
          message: "Quiz deleted successfully",
          title: "Success"
        });
        modals.closeAll();
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { children: [
      "Are you sure you want to delete ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: quiz.title }),
      "?"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "red", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 16 }), title: "Warning", children: "This action cannot be undone. All quiz attempts and results will be preserved for reporting purposes, but the quiz will no longer be available to students." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => modals.closeAll(), variant: "outline", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          color: "red",
          loading: deleteQuiz.isPending,
          onClick: handleDelete,
          children: "Delete Quiz"
        }
      )
    ] })
  ] });
}
function openEditQuizModal(quiz, courses) {
  modals.open({
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(EditQuizModal, { courses, quiz }),
    size: "lg",
    title: "Edit Quiz"
  });
}
function EditQuizModal({ courses, quiz }) {
  const updateQuiz = useUpdateQuiz();
  const form = useForm({
    initialValues: {
      courseId: quiz.courseId,
      description: quiz.description || "",
      maxAttempts: quiz.maxAttempts,
      passingScore: quiz.passingScore,
      timeLimit: quiz.timeLimit,
      title: quiz.title
    },
    validate: zod4Resolver(createQuizSchema)
  });
  const handleSubmit = (values) => {
    updateQuiz.mutate(
      {
        quizData: {
          ...values,
          updatedAt: Date.now()
        },
        quizId: quiz.id
      },
      {
        onError: (error) => {
          notifications.show({
            color: "red",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 16 }),
            message: error.message || "Failed to update quiz",
            title: "Error"
          });
        },
        onSuccess: () => {
          notifications.show({
            color: "green",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: 16 }),
            message: "Quiz updated successfully",
            title: "Success"
          });
          modals.closeAll();
        }
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
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
        minRows: 3,
        placeholder: "Enter quiz description",
        ...form.getInputProps("description")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Select,
      {
        data: courses.map((course) => ({
          label: course.title,
          value: course.id
        })),
        label: "Course",
        placeholder: "Select a course",
        required: true,
        ...form.getInputProps("courseId")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 4, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        NumberInput,
        {
          label: "Passing Score (%)",
          max: 100,
          min: 0,
          placeholder: "70",
          required: true,
          ...form.getInputProps("passingScore")
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 4, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        NumberInput,
        {
          label: "Time Limit (minutes)",
          min: 1,
          placeholder: "30",
          ...form.getInputProps("timeLimit")
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 4, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        NumberInput,
        {
          label: "Max Attempts",
          min: 1,
          placeholder: "3",
          ...form.getInputProps("maxAttempts")
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => modals.closeAll(), variant: "outline", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "bg-fun-green-600 hover:bg-fun-green-700",
          loading: updateQuiz.isPending,
          type: "submit",
          children: "Update Quiz"
        }
      )
    ] })
  ] }) });
}
function createQuizColumns(actions, courses = []) {
  return [
    {
      accessorFn: (quiz) => quiz.title,
      cell: ({ row }) => {
        const quiz = row.original;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, children: quiz.title }),
          quiz.description && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", truncate: true, children: quiz.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", children: [
            quiz.questions.length,
            " questions"
          ] })
        ] });
      },
      header: "Quiz Details",
      id: "details"
    },
    {
      accessorKey: "courseId",
      cell: ({ row }) => {
        const quiz = row.original;
        const course = courses.find((c) => c.id === quiz.courseId);
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "blue", variant: "light", children: course?.title || "Unknown Course" });
      },
      header: "Course",
      id: "course"
    },
    {
      accessorFn: (quiz) => quiz.passingScore,
      cell: ({ row }) => {
        const quiz = row.original;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: 4, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { size: "sm", children: [
            "Pass: ",
            quiz.passingScore,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { size: "sm", children: [
            "Time: ",
            quiz.timeLimit || "No limit",
            " min"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { size: "sm", children: [
            "Attempts: ",
            quiz.maxAttempts || "Unlimited"
          ] })
        ] });
      },
      header: "Settings",
      id: "settings"
    },
    {
      accessorKey: "createdAt",
      cell: ({ row }) => {
        const quiz = row.original;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: 4, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconCalendar, { className: "text-gray-400", size: 14 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: formatDate(quiz.createdAt) })
        ] });
      },
      header: "Created",
      id: "created"
    },
    {
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(QuizTableActions, { actions, quiz: row.original }),
      enableSorting: false,
      header: "Actions",
      id: "actions"
    }
  ];
}
function createQuizTableFilters(courses = []) {
  return [
    {
      key: "courseId",
      label: "Course",
      options: courses.map((course) => ({
        label: course.title,
        value: course.id
      }))
    }
  ];
}
function QuizTableActions({ actions, quiz }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { shadow: "md", width: 200, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Target, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActionIcon, { color: "gray", variant: "subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconDots, { size: 16 }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu.Dropdown, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Menu.Item,
        {
          leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconEye, { size: 14 }),
          onClick: () => actions.onView(quiz.id),
          children: "View Details"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Menu.Item,
        {
          leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconEdit, { size: 14 }),
          onClick: () => actions.onEdit(quiz.id),
          children: "Edit Quiz"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Menu.Item,
        {
          leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconClipboard, { size: 14 }),
          onClick: () => actions.onManageQuestions(quiz.id),
          children: "Manage Questions"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Divider, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Menu.Item,
        {
          color: "red",
          leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrash, { size: 14 }),
          onClick: () => actions.onDelete(quiz.id),
          children: "Delete Quiz"
        }
      )
    ] })
  ] });
}
function QuizManagement() {
  const {
    tenant
  } = Route$d.useRouteContext();
  const {
    user
  } = useAuthContext();
  const navigate = useNavigate();
  const {
    data: quizzesData = [],
    isLoading: quizzesLoading
  } = useQuizzes();
  const {
    data: coursesData = []
  } = useListCourses(tenant.id);
  const {
    data: quizAttempts = []
  } = useQuizAttempts({});
  const quizzes = quizzesData;
  const courses = coursesData.map((course) => ({
    id: course.id || "",
    title: course.title || ""
  }));
  const completedAttempts = quizAttempts.filter((attempt) => typeof attempt.completedAt === "number");
  const averagePassRate = completedAttempts.length ? Math.round(completedAttempts.filter((attempt) => attempt.passed).length / completedAttempts.length * 100) : null;
  const averageDurationMinutes = completedAttempts.length ? Math.max(1, Math.round(completedAttempts.reduce((total, attempt) => total + (attempt.timeSpent || 0), 0) / completedAttempts.length / 60)) : null;
  const tableHandlers = {
    onDelete: (quizId) => {
      const quiz = quizzes.find((q) => q.id === quizId);
      if (quiz) {
        openDeleteQuizModal(quiz);
      }
    },
    onEdit: (quizId) => {
      const quiz = quizzes.find((q) => q.id === quizId);
      if (quiz) {
        openEditQuizModal(quiz, courses);
      }
    },
    onManageQuestions: (quizId) => {
      if (!tenant.id) return;
      navigate({
        to: "/$tenant/admin/quizzes/$quizId/questions",
        params: {
          quizId,
          tenant: tenant.id
        }
      });
    },
    onView: (quizId) => {
      if (!tenant.id) return;
      navigate({
        to: "/$tenant/admin/quizzes/$quizId",
        params: {
          quizId,
          tenant: tenant.id
        }
      });
    }
  };
  if (quizzesLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Center, { h: 400, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { className: "text-fun-green-600", size: "xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", children: "Loading quizzes..." })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-aos": "fade-up", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "text-fun-green-800", order: 1, children: "Quiz Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", children: "Create and manage course assessments" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-fun-green-600 hover:bg-fun-green-700", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlus, { size: 16 }), onClick: () => {
        if (!user) {
          return;
        }
        openCreateQuizModal(courses, user);
      }, children: "Create Quiz" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { "data-aos": "fade-up", "data-aos-delay": "100", mb: "xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 3, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paper, { className: "bg-fun-green-50", p: "md", radius: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "fun-green", size: 40, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconClipboard, { size: 20 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Total Quizzes" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-fun-green-800", fw: 600, size: "lg", children: quizzes.length })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 3, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paper, { className: "bg-blue-50", p: "md", radius: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "blue", size: 40, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconUsers, { size: 20 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Active Courses" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-blue-800", fw: 600, size: "lg", children: courses.length })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 3, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paper, { className: "bg-orange-50", p: "md", radius: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "orange", size: 40, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTarget, { size: 20 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Avg Pass Rate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-orange-800", fw: 600, size: "lg", children: averagePassRate === null ? "No data" : `${averagePassRate}%` })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 3, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paper, { className: "bg-purple-50", p: "md", radius: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "purple", size: 40, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { size: 20 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Avg Duration" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-purple-800", fw: 600, size: "lg", children: averageDurationMinutes === null ? "No data" : `${averageDurationMinutes} min` })
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-delay": "200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { columns: createQuizColumns(tableHandlers, courses), data: quizzes, filters: createQuizTableFilters(courses), loading: quizzesLoading, searchPlaceholder: "Search quizzes..." }) })
  ] }) });
}
export {
  QuizManagement as component
};
