import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { ac as Route$j, I as useAuthContext, X as useListLiveSessions, _ as useListCourses, ad as useDeleteLiveSession, M as DataTable, a8 as useCreateLiveSession, a9 as formatDateInput, aa as DATE_PICKER_PRESETS, ab as useUpdateLiveSession } from "./router-D664CQ4V.mjs";
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
import { D as Container, x as Center, y as Stack, z as Loader, T as Text, G as Group, E as Title, a as Button, H as Grid, aa as Paper, a2 as ThemeIcon, Q as Badge, J as TextInput, a7 as Textarea, K as Select, ak as NumberInput, V as Menu, p as ActionIcon } from "../_libs/mantine__core.mjs";
import { X as IconPlus, y as IconCalendar, O as IconVideo, l as IconUsers, ad as IconDots, w as IconEdit, $ as IconTrash } from "../_libs/tabler__icons-react.mjs";
import { a as addMinutes, i as isBefore, b as isAfter, c as format } from "../_libs/date-fns.mjs";
import { m as modals } from "../_libs/mantine__modals.mjs";
import { u as useForm } from "../_libs/mantine__form.mjs";
import { D as DateTimePicker } from "../_libs/mantine__dates.mjs";
import { o as object, s as string, f as date, n as number, _ as _enum } from "../_libs/zod.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/@tanstack/react-router-ssr-query+[...].mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/@tanstack/router-ssr-query-core+[...].mjs";
import "../_libs/ibnlanre__builder.mjs";
import "../_libs/tanstack__react-query-devtools.mjs";
import "../_libs/@tanstack/react-router-devtools+[...].mjs";
import "../_libs/tanstack__react-table.mjs";
import "../_libs/tanstack__table-core.mjs";
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
const schema$1 = object({
  courseId: string().min(1, "Please select a course"),
  description: string().min(1, "Session description is required"),
  duration: number().min(15, "Minimum duration is 15 minutes").max(480, "Maximum duration is 8 hours"),
  instructorName: string().min(1, "Instructor name is required"),
  maxParticipants: number().min(1).optional(),
  scheduledAt: date().min(/* @__PURE__ */ new Date(), "Scheduled time must be in the future"),
  title: string().min(1, "Session title is required")
});
function CreateLiveSessionModal({
  tenant,
  user
}) {
  const { data: courses = [] } = useListCourses(tenant.id);
  const createLiveSession = useCreateLiveSession();
  const form = useForm({
    initialValues: {
      courseId: "",
      description: "",
      duration: 60,
      instructorName: user.displayName ?? "",
      maxParticipants: 1e3,
      scheduledAt: formatDateInput(/* @__PURE__ */ new Date()),
      title: ""
    },
    validate: zod4Resolver(schema$1)
  });
  const handleClose = () => {
    modals.closeAll();
  };
  const handleSubmit = async (sessionData) => {
    await createLiveSession.mutateAsync(
      {
        sessionData,
        userId: user.uid
      },
      {
        onSuccess() {
          handleClose();
        }
      }
    );
  };
  const courseOptions = courses.map((course) => ({
    label: course.title ?? "Untitled Course",
    value: course.id
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TextInput,
      {
        label: "Session Title",
        placeholder: "Enter session title",
        required: true,
        ...form.getInputProps("title")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Textarea,
      {
        label: "Description",
        minRows: 3,
        placeholder: "Describe what this session will cover",
        required: true,
        ...form.getInputProps("description")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Select,
      {
        data: courseOptions,
        label: "Course",
        placeholder: "Select a course",
        required: true,
        searchable: true,
        ...form.getInputProps("courseId")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TextInput,
      {
        label: "Instructor Name",
        placeholder: "Enter instructor name",
        required: true,
        ...form.getInputProps("instructorName")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DateTimePicker,
      {
        label: "Scheduled Date & Time",
        minDate: /* @__PURE__ */ new Date(),
        placeholder: "Select date and time",
        required: true,
        ...form.getInputProps("scheduledAt"),
        presets: DATE_PICKER_PRESETS
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      NumberInput,
      {
        label: "Duration (minutes)",
        max: 480,
        min: 15,
        placeholder: "Enter duration in minutes",
        required: true,
        step: 15,
        ...form.getInputProps("duration")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      NumberInput,
      {
        label: "Maximum Participants (optional)",
        max: 1e3,
        min: 1,
        placeholder: "Leave empty for unlimited",
        ...form.getInputProps("maxParticipants")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", mt: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleClose, variant: "outline", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "bg-fun-green-800 hover:bg-fun-green-700",
          loading: createLiveSession.isPending,
          type: "submit",
          children: "Create Session"
        }
      )
    ] })
  ] }) });
}
const schema = object({
  courseId: string().min(1, "Please select a course"),
  description: string().min(1, "Session description is required"),
  duration: number().min(15, "Minimum duration is 15 minutes").max(480, "Maximum duration is 8 hours"),
  instructorName: string().min(1, "Instructor name is required"),
  maxParticipants: number().min(1).optional(),
  scheduledAt: date().min(/* @__PURE__ */ new Date(), "Scheduled time must be in the future"),
  status: _enum(["scheduled", "active", "ended", "cancelled"]),
  title: string().min(1, "Session title is required")
});
function EditLiveSessionModal({
  session,
  tenant
}) {
  const { data: courses = [] } = useListCourses(tenant.id);
  const updateLiveSession = useUpdateLiveSession();
  const form = useForm({
    initialValues: {
      courseId: session.courseId,
      description: session.description,
      duration: session.duration,
      instructorName: session.instructorName,
      maxParticipants: session.maxParticipants,
      scheduledAt: session.scheduledAt,
      status: session.status,
      title: session.title
    },
    validate: zod4Resolver(schema)
  });
  const handleSubmit = async (sessionData) => {
    await updateLiveSession.mutateAsync({
      sessionData,
      sessionId: session.id
    });
  };
  const courseOptions = courses.map((course) => ({
    label: course.title ?? "Untitled Course",
    value: course.id
  }));
  const statusOptions = [
    { label: "Scheduled", value: "scheduled" },
    { label: "Active", value: "active" },
    { label: "Ended", value: "ended" },
    { label: "Cancelled", value: "cancelled" }
  ];
  const handleClose = () => {
    modals.closeAll();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TextInput,
      {
        label: "Session Title",
        placeholder: "Enter session title",
        required: true,
        ...form.getInputProps("title")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Textarea,
      {
        label: "Description",
        minRows: 3,
        placeholder: "Describe what this session will cover",
        required: true,
        ...form.getInputProps("description")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Select,
      {
        data: courseOptions,
        label: "Course",
        placeholder: "Select a course",
        required: true,
        searchable: true,
        ...form.getInputProps("courseId")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TextInput,
      {
        label: "Instructor Name",
        placeholder: "Enter instructor name",
        required: true,
        ...form.getInputProps("instructorName")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DateTimePicker,
      {
        label: "Scheduled Date & Time",
        minDate: /* @__PURE__ */ new Date(),
        placeholder: "Select date and time",
        presets: DATE_PICKER_PRESETS,
        required: true,
        ...form.getInputProps("scheduledAt")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      NumberInput,
      {
        label: "Duration (minutes)",
        max: 480,
        min: 15,
        placeholder: "Enter duration in minutes",
        required: true,
        step: 15,
        ...form.getInputProps("duration")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      NumberInput,
      {
        label: "Maximum Participants (optional)",
        max: 1e3,
        min: 1,
        placeholder: "Leave empty for unlimited",
        ...form.getInputProps("maxParticipants")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Select,
      {
        data: statusOptions,
        label: "Status",
        placeholder: "Select session status",
        required: true,
        ...form.getInputProps("status")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", mt: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleClose, variant: "outline", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "bg-fun-green-800 hover:bg-fun-green-700",
          loading: updateLiveSession.isPending,
          type: "submit",
          children: "Update Session"
        }
      )
    ] })
  ] }) });
}
const statusColors = {
  active: "green",
  cancelled: "red",
  ended: "gray",
  scheduled: "blue"
};
function createLiveSessionColumns(actions, courses = []) {
  return [
    {
      accessorFn: (session) => session.title,
      cell: ({ row }) => {
        const session = row.original;
        const course = courses.find((c) => c.id === session.courseId);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, children: session.title }),
          session.description && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", truncate: true, children: session.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: course?.title || "Unknown Course" })
        ] });
      },
      header: "Session Details",
      id: "details"
    },
    {
      accessorKey: "instructorName",
      cell: ({ row }) => {
        const session = row.original;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: session.instructorName });
      },
      header: "Instructor",
      id: "instructor"
    },
    {
      accessorKey: "scheduledAt",
      cell: ({ row }) => {
        const session = row.original;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: 4, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: 4, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconCalendar, { className: "text-gray-400", size: 14 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: format(new Date(session.scheduledAt), "MMM dd, yyyy") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", children: [
            format(new Date(session.scheduledAt), "h:mm a"),
            " (",
            session.duration,
            " min)"
          ] })
        ] });
      },
      header: "Scheduled Time",
      id: "schedule"
    },
    {
      accessorKey: "status",
      cell: ({ row }) => {
        const session = row.original;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: statusColors[session.status], variant: "light", children: session.status.charAt(0).toUpperCase() + session.status.slice(1) });
      },
      header: "Status",
      id: "status"
    },
    {
      accessorFn: (session) => session.participants.length,
      cell: ({ row }) => {
        const session = row.original;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: 4, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconUsers, { className: "text-gray-400", size: 14 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: session.participants.length }),
          session.maxParticipants && /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", children: [
            "/ ",
            session.maxParticipants
          ] })
        ] });
      },
      header: "Participants",
      id: "participants"
    },
    {
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(LiveSessionTableActions, { actions, session: row.original }),
      enableSorting: false,
      header: "Actions",
      id: "actions"
    }
  ];
}
function createLiveSessionTableFilters(courses = []) {
  return [
    {
      key: "courseId",
      label: "Course",
      options: courses.map((course) => ({
        label: course.title,
        value: course.id
      }))
    },
    {
      key: "status",
      label: "Status",
      options: [
        { label: "Scheduled", value: "scheduled" },
        { label: "Active", value: "active" },
        { label: "Ended", value: "ended" },
        { label: "Cancelled", value: "cancelled" }
      ]
    }
  ];
}
function LiveSessionTableActions({
  actions,
  session
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { shadow: "md", width: 200, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Target, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActionIcon, { color: "gray", variant: "subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconDots, { size: 16 }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu.Dropdown, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Menu.Item,
        {
          leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconEdit, { size: 14 }),
          onClick: () => actions.onEdit(session.id),
          children: "Edit Session"
        }
      ),
      session.jitsiMeetUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Menu.Item,
        {
          leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconVideo, { size: 14 }),
          onClick: () => actions.onJoinMeeting(session),
          children: "Join Meeting"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Divider, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Menu.Item,
        {
          color: "red",
          leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrash, { size: 14 }),
          onClick: () => actions.onDelete(session.id),
          children: "Delete Session"
        }
      )
    ] })
  ] });
}
function AdminLiveSessions() {
  const {
    tenant
  } = Route$j.useRouteContext();
  const {
    user
  } = useAuthContext();
  const {
    data: sessions = [],
    isLoading
  } = useListLiveSessions(tenant.id);
  const {
    data: courses = []
  } = useListCourses(tenant.id);
  const deleteLiveSession = useDeleteLiveSession();
  const getDisplayStatus = (session) => {
    if (session.status === "cancelled" || session.status === "ended") {
      return session.status;
    }
    const now = /* @__PURE__ */ new Date();
    const sessionStart = new Date(session.scheduledAt);
    const sessionEnd = addMinutes(sessionStart, session.duration);
    if (isBefore(sessionEnd, now)) {
      return "ended";
    }
    if (session.status === "active") {
      return "active";
    }
    if (isAfter(now, sessionStart) && isBefore(now, sessionEnd)) {
      return "active";
    }
    return "scheduled";
  };
  const displaySessions = sessions.map((session) => ({
    ...session,
    status: getDisplayStatus(session)
  }));
  const coursesForTable = courses.map((course) => ({
    id: course.id || "",
    title: course.title || ""
  }));
  const tableHandlers = {
    onDelete: (sessionId) => {
      const session = displaySessions.find((s) => s.id === sessionId);
      if (session) {
        modals.openConfirmModal({
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { children: [
            'Are you sure you want to delete the live session "',
            session.title,
            '"? This action cannot be undone.'
          ] }),
          confirmProps: {
            color: "red"
          },
          labels: {
            cancel: "Cancel",
            confirm: "Delete"
          },
          onConfirm: () => deleteLiveSession.mutate(session.id),
          title: "Delete Live Session"
        });
      }
    },
    onEdit: (sessionId) => {
      const session = displaySessions.find((s) => s.id === sessionId);
      if (session && tenant) {
        modals.open({
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(EditLiveSessionModal, { session, tenant }),
          modalId: "edit-live-session",
          size: "lg",
          title: "Edit Live Session"
        });
      }
    },
    onJoinMeeting: (session) => {
      if (session.jitsiMeetUrl) {
        window.open(session.jitsiMeetUrl, "_blank", "noopener,noreferrer");
      }
    }
  };
  const handleCreateSession = () => {
    if (!tenant || !user) {
      return;
    }
    modals.open({
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CreateLiveSessionModal, { tenant, user }),
      modalId: "create-live-session",
      size: "lg",
      title: "Create New Live Session"
    });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Center, { h: 400, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { className: "text-fun-green-600", size: "xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", children: "Loading live sessions..." })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-aos": "fade-up", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "text-fun-green-800", order: 1, children: "Live Session Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", children: "Create and manage live teaching sessions" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-fun-green-600 hover:bg-fun-green-700", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlus, { size: 16 }), onClick: handleCreateSession, children: "Create Session" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { "data-aos": "fade-up", "data-aos-delay": "100", mb: "xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 3, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paper, { className: "bg-fun-green-50", p: "md", radius: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "fun-green", size: 40, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCalendar, { size: 20 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Total Sessions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-fun-green-800", fw: 600, size: "lg", children: displaySessions.length })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 3, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paper, { className: "bg-blue-50", p: "md", radius: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "blue", size: 40, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconVideo, { size: 20 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Active Sessions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-blue-800", fw: 600, size: "lg", children: displaySessions.filter((s) => s.status === "active").length })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 3, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paper, { className: "bg-orange-50", p: "md", radius: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "orange", size: 40, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconUsers, { size: 20 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Total Participants" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-orange-800", fw: 600, size: "lg", children: displaySessions.reduce((acc, {
            participants
          }) => acc + participants.length, 0) })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 3, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paper, { className: "bg-purple-50", p: "md", radius: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "purple", size: 40, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCalendar, { size: 20 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Scheduled Sessions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-purple-800", fw: 600, size: "lg", children: displaySessions.filter((s) => s.status === "scheduled").length })
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-delay": "200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { columns: createLiveSessionColumns(tableHandlers, coursesForTable), data: displaySessions, filters: createLiveSessionTableFilters(coursesForTable), loading: isLoading, searchPlaceholder: "Search live sessions..." }) })
  ] }) });
}
export {
  AdminLiveSessions as component
};
