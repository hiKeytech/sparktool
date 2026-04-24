import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { az as Route$c, I as useAuthContext, _ as useListCourses, ay as useUpdateCourse, M as DataTable, f as formatDate, av as useCreateCourse, aw as createCourseSchema, aA as openDuplicateCourseModal, ax as useDeleteCourse } from "./router-D664CQ4V.mjs";
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
import { D as Container, y as Stack, G as Group, E as Title, T as Text, a as Button, H as Grid, F as Card, a2 as ThemeIcon, a3 as Avatar, Q as Badge, R as Progress, J as TextInput, a7 as Textarea, al as Autocomplete, K as Select, ak as NumberInput, B as Box, am as Fieldset, p as ActionIcon, ab as Switch, Y as Tooltip, V as Menu } from "../_libs/mantine__core.mjs";
import { A as IconDownload, am as IconUpload, X as IconPlus, o as IconBook, d as IconPlayerPlay, l as IconUsers, s as IconStar, $ as IconTrash, ae as IconEye, ad as IconDots, w as IconEdit, an as IconHierarchy, ao as IconCopy, E as IconPlayerPause, W as IconChartBar, ap as IconArchive, aq as IconAlertTriangle } from "../_libs/tabler__icons-react.mjs";
import { m as modals } from "../_libs/mantine__modals.mjs";
import { u as useForm } from "../_libs/mantine__form.mjs";
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
import "../_libs/mantine__notifications.mjs";
import "../_libs/mantine__hooks.mjs";
import "../_libs/mantine__store.mjs";
import "../_libs/react-transition-group.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/clsx.mjs";
import "../_libs/react-textarea-autosize.mjs";
import "../_libs/use-latest.mjs";
import "../_libs/use-isomorphic-layout-effect.mjs";
import "../_libs/use-composed-ref.mjs";
import "../_libs/react-number-format.mjs";
import "../_libs/floating-ui__react.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/klona.mjs";
import "../_libs/fast-deep-equal.mjs";
function CreateCourseModal({
  categories,
  onSuccess,
  tenant,
  user
}) {
  const createCourse = useCreateCourse();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      category: "",
      description: "",
      difficulty: "beginner",
      estimatedDurationInMinutes: 0,
      featured: false,
      instructors: [{ biography: "", email: "", name: "", title: "" }],
      learningObjectives: [],
      prerequisites: [],
      price: 0,
      published: false,
      shortDescription: "",
      tags: [],
      thumbnailUrl: "",
      title: "",
      previewVideoUrl: ""
    },
    validate: zod4Resolver(createCourseSchema)
  });
  const handleSubmit = (values) => {
    const submissionData = {
      ...values,
      instructors: values.instructors.map((i) => ({
        ...i,
        biography: i.biography || null,
        email: i.email || null,
        title: i.title || null
      })),
      shortDescription: values.shortDescription || null,
      thumbnailUrl: values.thumbnailUrl || null,
      language: "en",
      level: "beginner"
    };
    createCourse.mutate(
      {
        courseData: submissionData,
        tenantId: tenant.id,
        userId: user.uid
      },
      {
        onSuccess: (courseId) => {
          modals.closeAll();
          form.reset();
          onSuccess?.();
          if (courseId) {
            navigate({
              params: { courseId, tenant: tenant.id },
              to: "/$tenant/admin/courses/$courseId/edit"
            });
          }
        }
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Create a new course for the platform. Fill in all required fields to get started." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 12, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        TextInput,
        {
          label: "Course Title",
          placeholder: "Enter course title",
          required: true,
          ...form.getInputProps("title")
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 12, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          label: "Description",
          placeholder: "Enter course description",
          required: true,
          rows: 3,
          ...form.getInputProps("description")
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 12, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Autocomplete,
        {
          data: categories,
          label: "Category",
          placeholder: "Select or type a category",
          required: true,
          ...form.getInputProps("category")
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Select,
        {
          data: [
            { label: "Beginner", value: "beginner" },
            { label: "Intermediate", value: "intermediate" },
            { label: "Advanced", value: "advanced" }
          ],
          label: "Difficulty",
          required: true,
          ...form.getInputProps("difficulty")
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        NumberInput,
        {
          label: "Duration (hours)",
          min: 0,
          placeholder: "Enter duration",
          required: true,
          ...form.getInputProps("estimatedDurationInMinutes")
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 12, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, children: "Instructors" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlus, { size: 14 }),
              onClick: () => form.insertListItem("instructors", {
                biography: "",
                email: "",
                name: "",
                title: ""
              }),
              size: "xs",
              variant: "light",
              children: "Add Instructor"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "md", children: form.values.instructors.map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Fieldset,
          {
            legend: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", w: "100%", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 500, size: "sm", children: [
                "Instructor ",
                index + 1
              ] }),
              form.values.instructors.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                ActionIcon,
                {
                  color: "red",
                  onClick: () => form.removeListItem("instructors", index),
                  size: "sm",
                  variant: "light",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrash, { size: 14 })
                }
              )
            ] }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 12, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                TextInput,
                {
                  label: "Name",
                  placeholder: "Enter instructor name",
                  required: true,
                  ...form.getInputProps(`instructors.${index}.name`)
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 12, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  label: "Bio (optional)",
                  minRows: 2,
                  placeholder: "Enter instructor bio",
                  ...form.getInputProps(
                    `instructors.${index}.biography`
                  )
                }
              ) })
            ] })
          },
          index
        )) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 12, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        TextInput,
        {
          label: "Video URL",
          placeholder: "Enter video URL",
          required: true,
          ...form.getInputProps("previewVideoUrl")
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 12, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Switch,
        {
          label: "Publish immediately",
          ...form.getInputProps("published", { type: "checkbox" })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => modals.closeAll(), variant: "light", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "bg-fun-green-600 hover:bg-fun-green-700",
          loading: createCourse.isPending,
          type: "submit",
          children: "Create Course"
        }
      )
    ] })
  ] }) });
}
const openCreateCourseModal = (categories, tenant, user, onSuccess) => {
  modals.open({
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      CreateCourseModal,
      {
        categories,
        onSuccess,
        tenant,
        user
      }
    ),
    size: "lg",
    title: "Create New Course"
  });
};
function DeleteCourseModal({
  course,
  onSuccess
}) {
  const deleteCourse = useDeleteCourse();
  const handleDelete = () => {
    deleteCourse.mutate(
      { courseId: course.id },
      {
        onSuccess: () => {
          modals.closeAll();
          onSuccess?.();
        }
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertTriangle, { color: "red", size: 20 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, children: "Confirm Course Deletion" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
      "Are you sure you want to delete ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
        '"',
        course.title,
        '"'
      ] }),
      "? This action cannot be undone and will:"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xs", ml: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "• Remove the course from all student enrollments" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "• Delete all course progress and completion data" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "• Remove associated quiz scores and certificates" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "• Permanently delete all course content" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", mt: "lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => modals.closeAll(), variant: "light", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          color: "red",
          loading: deleteCourse.isPending,
          onClick: handleDelete,
          children: "Delete Course"
        }
      )
    ] })
  ] });
}
const openDeleteCourseModal = (course, onSuccess) => {
  modals.open({
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(DeleteCourseModal, { course, onSuccess }),
    size: "md",
    title: "Delete Course"
  });
};
function EditCourseModal({
  categories,
  course,
  onSuccess
}) {
  const updateCourse = useUpdateCourse();
  const form = useForm({
    initialValues: {
      category: course.category || "",
      description: course.description || "",
      difficulty: course.difficulty || "beginner",
      estimatedDurationInMinutes: course.estimatedDurationInMinutes || 0,
      featured: course.featured || false,
      instructors: course.instructors?.length ? course.instructors.map((i) => ({
        biography: i?.biography || "",
        email: i?.email || "",
        name: i?.name || "",
        title: i?.title || ""
      })) : [{ biography: "", email: "", name: "", title: "" }],
      learningObjectives: course.learningObjectives || [],
      prerequisites: course.prerequisites || [],
      price: course.price || 0,
      published: course.published || false,
      shortDescription: course.shortDescription || "",
      tags: course.tags || [],
      thumbnailUrl: course.thumbnailUrl || "",
      title: course.title || "",
      previewVideoUrl: course.previewVideoUrl || ""
    },
    validate: zod4Resolver(createCourseSchema)
  });
  const handleSubmit = (values) => {
    const submissionData = {
      ...values,
      instructors: values.instructors.map((i) => ({
        ...i,
        biography: i.biography || null,
        email: i.email || null,
        title: i.title || null
      })),
      shortDescription: values.shortDescription || null,
      thumbnailUrl: values.thumbnailUrl || null
    };
    updateCourse.mutate(
      {
        courseData: submissionData,
        courseId: course.id
      },
      {
        onSuccess: () => {
          modals.closeAll();
          onSuccess?.();
        }
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Edit course details. Changes will be saved immediately." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 12, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        TextInput,
        {
          label: "Course Title",
          placeholder: "Enter course title",
          required: true,
          ...form.getInputProps("title")
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 12, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Textarea,
        {
          label: "Description",
          placeholder: "Enter course description",
          required: true,
          rows: 3,
          ...form.getInputProps("description")
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Autocomplete,
        {
          data: categories,
          label: "Category",
          placeholder: "Select or type a category",
          required: true,
          ...form.getInputProps("category")
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Select,
        {
          data: [
            { label: "Beginner", value: "beginner" },
            { label: "Intermediate", value: "intermediate" },
            { label: "Advanced", value: "advanced" }
          ],
          label: "Difficulty",
          required: true,
          ...form.getInputProps("difficulty")
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        NumberInput,
        {
          label: "Duration (hours)",
          min: 0,
          placeholder: "Enter duration",
          required: true,
          ...form.getInputProps("estimatedDurationInMinutes")
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 12, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, children: "Instructors" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlus, { size: 14 }),
              onClick: () => form.insertListItem("instructors", {
                biography: "",
                email: "",
                name: "",
                title: ""
              }),
              size: "xs",
              variant: "light",
              children: "Add Instructor"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "md", children: form.values.instructors.map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Fieldset,
          {
            legend: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", w: "100%", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 500, size: "sm", children: [
                "Instructor ",
                index + 1
              ] }),
              form.values.instructors.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                ActionIcon,
                {
                  color: "red",
                  onClick: () => form.removeListItem("instructors", index),
                  size: "sm",
                  variant: "light",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrash, { size: 14 })
                }
              )
            ] }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 12, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                TextInput,
                {
                  label: "Name",
                  placeholder: "Enter instructor name",
                  required: true,
                  ...form.getInputProps(`instructors.${index}.name`)
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 12, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Textarea,
                {
                  label: "Bio (optional)",
                  minRows: 2,
                  placeholder: "Enter instructor bio",
                  ...form.getInputProps(`instructors.${index}.biography`)
                }
              ) })
            ] })
          },
          index
        )) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 12, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        TextInput,
        {
          label: "Video URL",
          placeholder: "Enter video URL",
          required: true,
          ...form.getInputProps("previewVideoUrl")
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 12, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Switch,
        {
          label: "Published",
          ...form.getInputProps("published", { type: "checkbox" })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", mt: "lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => modals.closeAll(), variant: "light", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "bg-fun-green-600 hover:bg-fun-green-700",
          loading: updateCourse.isPending,
          type: "submit",
          children: "Save Changes"
        }
      )
    ] })
  ] }) });
}
const openEditCourseModal = (course, categories, onSuccess) => {
  modals.open({
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      EditCourseModal,
      {
        categories,
        course,
        onSuccess
      }
    ),
    size: "lg",
    title: "Edit Course"
  });
};
function CourseTableActions({
  course,
  onArchive,
  onDelete,
  onDuplicate,
  onEdit,
  onEditStructure,
  onTogglePublished,
  onView,
  onViewAnalytics
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { label: "View Course", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ActionIcon,
      {
        onClick: () => onView(course.id),
        size: "sm",
        variant: "subtle",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconEye, { size: 16 })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { position: "bottom-end", shadow: "md", width: 180, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Target, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActionIcon, { size: "sm", variant: "subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconDots, { size: 16 }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu.Dropdown, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Menu.Item,
          {
            leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconEdit, { size: 14 }),
            onClick: () => onEdit(course.id),
            children: "Edit Course"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Menu.Item,
          {
            leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconHierarchy, { size: 14 }),
            onClick: () => onEditStructure(course.id),
            children: "Edit Structure"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Menu.Item,
          {
            leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCopy, { size: 14 }),
            onClick: () => onDuplicate(course.id),
            children: "Duplicate"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Menu.Item,
          {
            leftSection: course.published ? /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlayerPause, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlayerPlay, { size: 14 }),
            onClick: () => onTogglePublished(course.id),
            children: course.published ? "Unpublish" : "Publish"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Menu.Item,
          {
            leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconChartBar, { size: 14 }),
            onClick: () => onViewAnalytics(course.id),
            children: "View Analytics"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Divider, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Menu.Item,
          {
            leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconArchive, { size: 14 }),
            onClick: () => onArchive(course.id),
            children: "Archive"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Menu.Item,
          {
            color: "red",
            leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrash, { size: 14 }),
            onClick: () => onDelete(course.id),
            children: "Delete"
          }
        )
      ] })
    ] })
  ] });
}
function getDifficultyColor(difficulty) {
  switch (difficulty) {
    case "advanced":
      return "red";
    case "beginner":
      return "green";
    case "intermediate":
      return "yellow";
    default:
      return "gray";
  }
}
const createCourseColumns = (handlers) => [
  {
    accessorKey: "title",
    cell: ({ row }) => {
      const course = row.original;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Avatar,
          {
            alt: course.title ?? "Course Cover",
            radius: "md",
            size: "md",
            src: course.thumbnailUrl,
            children: course.title?.charAt(0).toUpperCase() ?? ""
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, size: "sm", children: course.title ?? "Untitled Course" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: course.instructors?.map((instructor) => instructor.name).join(", ") || "No instructor assigned" })
        ] })
      ] });
    },
    header: "Course"
  },
  {
    accessorKey: "category",
    cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: getValue() }),
    header: "Category"
  },
  {
    accessorKey: "difficulty",
    cell: ({ getValue }) => {
      const difficulty = getValue();
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: getDifficultyColor(difficulty), size: "sm", variant: "light", children: difficulty.charAt(0).toUpperCase() + difficulty.slice(1) });
    },
    header: "Difficulty"
  },
  {
    cell: ({ row }) => {
      const course = row.original;
      const sectionsCount = course.sections?.length || 0;
      const totalLessons = course.totalLessons || 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "green", size: "sm", variant: "light", children: "Hierarchical" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", children: [
          sectionsCount,
          "s, ",
          totalLessons,
          "l"
        ] })
      ] });
    },
    header: "Structure",
    id: "structure"
  },
  {
    accessorKey: "enrollmentCount",
    cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: (getValue() || 0).toLocaleString() }),
    header: "Enrollments"
  },
  {
    cell: ({ row }) => {
      const course = row.original;
      const rate = course.enrollmentCount && course.enrollmentCount > 0 ? (course.completionCount || 0) / course.enrollmentCount * 100 : 0;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Progress,
          {
            color: "fun-green",
            size: "sm",
            style: { width: 60 },
            value: rate
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
          rate.toFixed(1),
          "%"
        ] })
      ] });
    },
    header: "Completion Rate",
    id: "completionRate"
  },
  {
    accessorKey: "averageRating",
    cell: ({ getValue }) => {
      const rating = getValue();
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconStar, { className: "text-yellow-500", size: 14 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: rating ? rating.toFixed(1) : "N/A" })
      ] });
    },
    header: "Rating"
  },
  {
    accessorKey: "published",
    cell: ({ getValue }) => {
      const published = getValue();
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: published ? "green" : "gray", size: "sm", variant: "light", children: published ? "Published" : "Draft" });
    },
    header: "Status"
  },
  {
    accessorKey: "updatedAt",
    cell: ({ getValue }) => {
      const updatedAt = getValue();
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: formatDate(updatedAt) });
    },
    header: "Last Updated"
  },
  {
    cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(CourseTableActions, { course: row.original, ...handlers }),
    header: "Actions",
    id: "actions"
  }
];
const courseTableFilters = [
  {
    key: "published",
    label: "Status",
    options: [
      { label: "Published", value: "true" },
      { label: "Draft", value: "false" }
    ]
  },
  {
    key: "difficulty",
    label: "Difficulty",
    options: [
      { label: "Beginner", value: "beginner" },
      { label: "Intermediate", value: "intermediate" },
      { label: "Advanced", value: "advanced" }
    ]
  }
];
function CourseManagement() {
  const {
    tenant
  } = Route$c.useRouteContext();
  const {
    user
  } = useAuthContext();
  const navigate = useNavigate();
  const {
    data: courses = [],
    isLoading
  } = useListCourses(tenant.id);
  const updateCourse = useUpdateCourse();
  const predefinedCategories = ["Programming", "Data Science", "Web Development", "Mobile Development", "DevOps", "Cybersecurity", "AI/Machine Learning", "Database Management", "UI/UX Design", "Project Management", "Software Engineering", "Cloud Computing", "Networking", "Quality Assurance"];
  const existingCategories = Array.from(new Set(courses.map((course) => course.category).filter((c) => !!c)));
  const categories = Array.from(/* @__PURE__ */ new Set([...existingCategories, ...predefinedCategories])).sort();
  const tableHandlers = {
    onArchive: (courseId) => {
      console.log("Archiving course:", courseId);
    },
    onDelete: (courseId) => {
      const course = courses.find((c) => c.id === courseId);
      if (course) {
        openDeleteCourseModal(course);
      }
    },
    onDuplicate: (courseId) => {
      const course = courses.find((c) => c.id === courseId);
      if (course && user) {
        openDuplicateCourseModal(course, user);
      }
    },
    onEdit: (courseId) => {
      const course = courses.find((c) => c.id === courseId);
      if (course) {
        openEditCourseModal(course, categories);
      }
    },
    onEditStructure: (courseId) => {
      if (!tenant.id) return;
      navigate({
        params: {
          courseId,
          tenant: tenant.id
        },
        to: "/$tenant/admin/courses/$courseId/edit"
      });
    },
    onTogglePublished: (courseId) => {
      const course = courses.find((c) => c.id === courseId);
      if (course) {
        updateCourse.mutate({
          courseData: {
            published: !course.published
          },
          courseId
        });
      }
    },
    onView: (courseId) => {
      console.log("Viewing course:", courseId);
    },
    onViewAnalytics: (courseId) => {
      console.log("Viewing analytics for course:", courseId);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-2 text-gray-800", order: 1, children: "Course Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "lg", children: "Create, edit, and manage all courses on the platform" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconDownload, { size: 16 }), variant: "light", children: "Export Data" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconUpload, { size: 16 }), variant: "light", children: "Import Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-fun-green-600 hover:bg-fun-green-700", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlus, { size: 16 }), onClick: () => {
          if (!tenant || !user) {
            return;
          }
          openCreateCourseModal(categories, tenant, user);
        }, children: "Create Course" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { "data-aos": "fade-up", "data-aos-delay": "100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 6,
        md: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "md", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mb-1 text-gray-600", size: "sm", children: "Total Courses" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-blue-600", fw: 700, size: "xl", children: courses.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "blue", size: 40, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconBook, { size: 20 }) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 6,
        md: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "md", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mb-1 text-gray-600", size: "sm", children: "Published" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-green-600", fw: 700, size: "xl", children: courses.filter((c) => c.published).length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "green", size: 40, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlayerPlay, { size: 20 }) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 6,
        md: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "md", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mb-1 text-gray-600", size: "sm", children: "Total Enrollments" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-orange-600", fw: 700, size: "xl", children: courses.reduce((sum, course) => sum + (course.enrollmentCount || 0), 0).toLocaleString() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "orange", size: 40, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconUsers, { size: 20 }) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 6,
        md: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "md", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mb-1 text-gray-600", size: "sm", children: "Avg Rating" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-yellow-600", fw: 700, size: "xl", children: courses.length > 0 && courses.some((c) => (c.averageRating || 0) > 0) ? (courses.reduce((sum, course) => sum + (course.averageRating || 0), 0) / courses.filter((course) => (course.averageRating || 0) > 0).length).toFixed(1) : "N/A" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "yellow", size: 40, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconStar, { size: 20 }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-delay": "200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { columns: createCourseColumns(tableHandlers), data: courses, filters: courseTableFilters, loading: isLoading, searchPlaceholder: "Search courses..." }) })
  ] }) }) });
}
export {
  CourseManagement as component
};
