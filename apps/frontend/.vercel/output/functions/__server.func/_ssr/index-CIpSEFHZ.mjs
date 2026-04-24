import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { K as Route$u, L as useDashboardMetrics, g as useUsers, w as useDeleteUser, P as PendingOverlay, M as DataTable } from "./router-D664CQ4V.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { D as Container, y as Stack, G as Group, E as Title, T as Text, a as Button, H as Grid, F as Card, x as Center, a4 as RingProgress, i as SimpleGrid, aa as Paper, a2 as ThemeIcon, Q as Badge, p as ActionIcon } from "../_libs/mantine__core.mjs";
import { A as IconDownload, X as IconPlus, l as IconUsers, o as IconBook, p as IconTrendingUp, q as IconCertificate, m as IconUser, w as IconEdit, $ as IconTrash } from "../_libs/tabler__icons-react.mjs";
import { m as modals } from "../_libs/mantine__modals.mjs";
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
import "../_libs/mantine-form-zod-resolver.mjs";
import "../_libs/zod.mjs";
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
import "../_libs/mantine__form.mjs";
import "../_libs/klona.mjs";
import "../_libs/fast-deep-equal.mjs";
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
function AdminHeaderStats({
  certificatesIssued = 0,
  completionRate = 0,
  loading = false,
  totalCourses = 0,
  totalStudents = 0
}) {
  const stats = [
    {
      color: "blue",
      icon: IconUsers,
      label: "Active Students",
      value: totalStudents.toLocaleString()
    },
    {
      color: "fun-green",
      icon: IconBook,
      label: "Total Courses",
      value: totalCourses.toLocaleString()
    },
    {
      color: "orange",
      icon: IconTrendingUp,
      label: "Completion Rate",
      value: `${completionRate.toFixed(1)}%`
    },
    {
      color: "violet",
      icon: IconCertificate,
      label: "Certificates Issued",
      value: certificatesIssued.toLocaleString()
    }
  ];
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleGrid, { cols: { base: 2, md: 4 }, mb: "xl", spacing: "md", children: stats.map((_, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Paper,
      {
        className: "animate-pulse",
        p: "md",
        radius: "md",
        withBorder: true,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 bg-gray-200 rounded mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 bg-gray-200 rounded" })
        ]
      },
      index
    )) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleGrid, { cols: { base: 2, md: 4 }, mb: "xl", spacing: "md", children: stats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Paper,
    {
      className: "hover:shadow-lg transition-shadow",
      p: "md",
      radius: "md",
      withBorder: true,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: stat.color, radius: "md", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(stat.icon, { size: 20 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", fw: 500, size: "sm", children: stat.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 700, size: "xl", children: stat.value })
        ] })
      ] })
    },
    stat.label
  )) });
}
function AdminDashboardTableActions({
  onDelete,
  onEdit,
  user
}) {
  const handleDelete = () => {
    modals.openConfirmModal({
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { size: "sm", children: [
        "Are you sure you want to permanently delete",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: user.displayName }),
        "? This action cannot be undone."
      ] }),
      confirmProps: { color: "red" },
      labels: { cancel: "Cancel", confirm: "Delete" },
      onConfirm: () => onDelete(user.uid),
      title: "Delete User"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", justify: "flex-end", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ActionIcon,
      {
        "aria-label": `Edit ${user.displayName}`,
        color: "blue",
        onClick: () => onEdit(user),
        size: "sm",
        variant: "subtle",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconEdit, { size: 16 })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ActionIcon,
      {
        "aria-label": `Delete ${user.displayName}`,
        color: "red",
        onClick: handleDelete,
        size: "sm",
        variant: "subtle",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrash, { size: 16 })
      }
    )
  ] });
}
function createAdminDashboardTableColumns({
  onDelete,
  onEdit
}) {
  return [
    {
      accessorKey: "displayName",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconUser, { color: "gray", size: 16 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, size: "sm", children: row.original.displayName })
      ] }),
      header: "Name"
    },
    {
      accessorKey: "email",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: row.original.email }),
      header: "Email"
    },
    {
      accessorKey: "role",
      cell: ({ row }) => {
        const role = row.original.role;
        const color = role === "admin" ? "blue" : "green";
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color, size: "sm", variant: "light", children: role });
      },
      header: "Role"
    },
    {
      accessorKey: "studentId",
      cell: ({ row }) => {
        const studentId = row.original.studentId;
        return studentId ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { ff: "monospace", size: "sm", children: studentId }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "N/A" });
      },
      header: "Student ID"
    },
    {
      accessorKey: "isActive",
      cell: ({ row }) => {
        const isActive = row.original.isActive;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: isActive ? "green" : "red", size: "sm", variant: "light", children: isActive ? "Active" : "Inactive" });
      },
      header: "Status"
    },
    {
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        AdminDashboardTableActions,
        {
          onDelete,
          onEdit,
          user: row.original
        }
      ),
      header: "Actions",
      id: "actions"
    }
  ];
}
function AdminDashboard() {
  const {
    tenant
  } = Route$u.useRouteContext();
  const navigate = useNavigate();
  const {
    data: dashboardData,
    isLoading: isDashboardLoading
  } = useDashboardMetrics(tenant.id || "");
  const {
    data: users = [],
    isLoading: isUsersLoading
  } = useUsers(tenant.id);
  const deleteUserMutation = useDeleteUser();
  function handleEditUser(user) {
    modals.open({
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Edit form for user: ",
          user.uid
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "This will contain the student editing form." })
      ] }),
      size: "lg",
      title: "Edit Student"
    });
  }
  function handleDeleteUser(userId) {
    deleteUserMutation.mutate(userId);
  }
  function handleCreateUser() {
    if (!tenant.id) return;
    navigate({
      params: {
        tenant: tenant.id
      },
      to: "/$tenant/admin/users/new"
    });
  }
  function handleExportData() {
    modals.open({
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Choose export format and data to export:" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Student data (CSV/Excel)" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Course completion reports" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "Certificate records" })
        ] })
      ] }),
      title: "Export Data"
    });
  }
  if (isDashboardLoading || isUsersLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PendingOverlay, { reason: "Loading dashboard...", visible: isDashboardLoading || isUsersLoading });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-duration": "500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-2 text-gray-800", order: 1, children: "Admin Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "lg", children: "Manage students, courses, and monitor platform performance" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconDownload, { size: 16 }), onClick: handleExportData, variant: "light", children: "Export Data" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-fun-green-600 hover:bg-fun-green-700", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlus, { size: 16 }), onClick: handleCreateUser, children: "Add Student" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AdminHeaderStats, { certificatesIssued: dashboardData?.certificatesIssued, completionRate: dashboardData?.completionRate, loading: isDashboardLoading, totalCourses: dashboardData?.activeCoursesCount, totalStudents: dashboardData?.totalActiveStudents }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 8
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { justify: "space-between", mb: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Student Management" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { columns: createAdminDashboardTableColumns({
          onDelete: handleDeleteUser,
          onEdit: handleEditUser
        }), data: users, enableFilters: true, enablePagination: true, enableSearch: true, enableSorting: true, filters: [{
          key: "role",
          label: "Role",
          options: [{
            label: "All Roles",
            value: ""
          }, {
            label: "Student",
            value: "student"
          }, {
            label: "Admin",
            value: "admin"
          }]
        }, {
          key: "isActive",
          label: "Status",
          options: [{
            label: "All Status",
            value: ""
          }, {
            label: "Active",
            value: "true"
          }, {
            label: "Inactive",
            value: "false"
          }]
        }], loading: isUsersLoading, pageSize: 10, searchPlaceholder: "Search students by name, email, or student ID..." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 4
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { p: "lg", radius: "lg", withBorder: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { mb: "md", order: 4, children: "Platform Overview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Center, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(RingProgress, { label: /* @__PURE__ */ jsxRuntimeExports.jsx(Center, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-500", children: "Avg Progress" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 700, size: "lg", children: [
                dashboardData?.completionRate || 0,
                "%"
              ] })
            ] }) }), sections: [{
              color: "fun-green",
              value: dashboardData?.completionRate || 0
            }], size: 240, thickness: 12 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Course Completion Rate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 500, size: "sm", children: [
                  dashboardData?.completionRate || 0,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Active Students" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, size: "sm", children: dashboardData?.totalActiveStudents || 0 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Certificates Issued" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, size: "sm", children: dashboardData?.certificatesIssued || 0 })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { p: "lg", radius: "lg", withBorder: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { mb: "md", order: 4, children: "Platform Overview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Course Completion Rate" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 500, size: "sm", children: [
                dashboardData?.completionRate || 0,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "New Enrollments This Week" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, size: "sm", children: dashboardData?.newEnrollmentsThisWeek || 0 })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Courses in Progress" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, size: "sm", children: dashboardData?.coursesInProgress || 0 })
            ] })
          ] })
        ] })
      ] }) })
    ] })
  ] }) }) });
}
export {
  AdminDashboard as component
};
