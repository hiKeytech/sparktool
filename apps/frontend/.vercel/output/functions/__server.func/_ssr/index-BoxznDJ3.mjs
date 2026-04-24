import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { ak as Route$e, I as useAuthContext, g as useUsers, w as useDeleteUser, x as useUpdateUser, M as DataTable, i as formatRelativeTime, al as openEditStudentModal, am as openResetUserPasswordModal, an as openSendMessageModal } from "./router-D664CQ4V.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { D as Container, z as Loader, $ as Alert, y as Stack, G as Group, E as Title, T as Text, a as Button, H as Grid, F as Card, a3 as Avatar, Q as Badge, R as Progress, Y as Tooltip, p as ActionIcon, V as Menu } from "../_libs/mantine__core.mjs";
import { T as IconExclamationCircle, A as IconDownload, X as IconPlus, I as IconCheck, q as IconCertificate, ae as IconEye, w as IconEdit, ad as IconDots, ah as IconUserX, Y as IconUserCheck, ai as IconKey, x as IconMail, aj as IconBan, $ as IconTrash, ak as IconX } from "../_libs/tabler__icons-react.mjs";
import { n as notifications } from "../_libs/mantine__notifications.mjs";
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
import "../_libs/mantine__form.mjs";
import "../_libs/klona.mjs";
import "../_libs/fast-deep-equal.mjs";
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
function createUserTableColumns({
  onDelete,
  onEdit,
  onResetPassword,
  onSendMessage,
  onToggleStatus,
  onView
}) {
  return [
    {
      accessorKey: "displayName",
      cell: ({ row }) => {
        const user = row.original;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { radius: "xl", size: 32, src: user.photoURL, children: user.displayName.split(" ").map((n) => n[0]).join("") }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, size: "sm", children: user.displayName }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-500", size: "xs", children: user.email })
          ] })
        ] });
      },
      header: "Student"
    },
    {
      accessorKey: "studentId",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, size: "sm", children: row.original.studentId || "N/A" }),
      header: "Student ID"
    },
    {
      accessorKey: "role",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          color: row.original.role === "admin" ? "blue" : "gray",
          size: "sm",
          variant: "light",
          children: row.original.role
        }
      ),
      header: "Role"
    },
    {
      cell: ({ row }) => {
        const user = row.original;
        if (user.role !== "student") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-400", size: "xs", children: "N/A" });
        }
        const completed = user.completedCourses?.length || 0;
        const enrolled = user.enrolledCourses?.length || 0;
        const progress = enrolled > 0 ? Math.round(completed / enrolled * 100) : 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Progress,
            {
              color: "fun-green",
              size: "sm",
              style: { width: 60 },
              value: progress
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { size: "xs", children: [
            progress,
            "%"
          ] })
        ] });
      },
      header: "Progress",
      id: "progress"
    },
    {
      cell: ({ row }) => {
        const user = row.original;
        const completed = user.completedCourses?.length || 0;
        const enrolled = user.enrolledCourses?.length || 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { size: "sm", children: [
          completed,
          "/",
          enrolled
        ] });
      },
      header: "Courses",
      id: "courses"
    },
    {
      accessorKey: "certificatesEarned",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconCertificate, { className: "text-yellow-500", size: 14 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: row.original.certificatesEarned || 0 })
      ] }),
      header: "Certificates"
    },
    {
      accessorKey: "lastLoginAt",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: row.original.lastLoginAt ? formatRelativeTime(row.original.lastLoginAt) : "Never" }),
      header: "Last Active"
    },
    {
      accessorKey: "isActive",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          color: row.original.isActive ? "green" : "red",
          size: "sm",
          variant: "light",
          children: row.original.isActive ? "Active" : "Inactive"
        }
      ),
      header: "Status"
    },
    {
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        UserTableActions,
        {
          onDelete,
          onEdit,
          onResetPassword,
          onSendMessage,
          onToggleStatus,
          onView,
          user: row.original
        }
      ),
      header: "Actions",
      id: "actions"
    }
  ];
}
function UserTableActions({
  onDelete,
  onEdit,
  onResetPassword,
  onSendMessage,
  onToggleStatus,
  onView,
  user
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { label: "View Details", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ActionIcon,
      {
        color: "blue",
        onClick: () => onView(user.uid),
        size: "sm",
        variant: "light",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconEye, { size: 16 })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { label: "Edit User", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ActionIcon,
      {
        color: "orange",
        onClick: () => onEdit(user),
        size: "sm",
        variant: "light",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconEdit, { size: 16 })
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Target, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActionIcon, { color: "gray", size: "sm", variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconDots, { size: 16 }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu.Dropdown, { children: [
        user.isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Menu.Item,
          {
            leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconUserX, { size: 16 }),
            onClick: () => onToggleStatus(user.uid, false),
            children: "Deactivate"
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          Menu.Item,
          {
            leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconUserCheck, { size: 16 }),
            onClick: () => onToggleStatus(user.uid, true),
            children: "Activate"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Menu.Item,
          {
            leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconKey, { size: 16 }),
            onClick: () => onResetPassword(user),
            children: "Reset Password"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Menu.Item,
          {
            leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconMail, { size: 16 }),
            onClick: () => onSendMessage(user),
            children: "Send Message"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Item, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCertificate, { size: 16 }), children: "View Certificates" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Divider, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Item, { color: "orange", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconBan, { size: 16 }), children: "Suspend" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Menu.Item,
          {
            color: "red",
            leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrash, { size: 16 }),
            onClick: () => onDelete(user),
            children: "Delete"
          }
        )
      ] })
    ] })
  ] });
}
function UserManagement() {
  const {
    tenant
  } = Route$e.useRouteContext();
  const {
    user: currentUser
  } = useAuthContext();
  const navigate = useNavigate();
  const {
    data: users = [],
    error,
    isLoading
  } = useUsers(tenant.id);
  const deleteUser = useDeleteUser();
  const updateUser = useUpdateUser();
  function handleViewUser(userId) {
    if (!tenant.id) return;
    navigate({
      params: {
        studentId: userId,
        tenant: tenant.id
      },
      to: "/$tenant/admin/users/$studentId"
    });
  }
  function handleEditUser(user) {
    openEditStudentModal(user);
  }
  function handleDeleteUser(user) {
    modals.openConfirmModal({
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { children: [
        "Remove access for ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: user.displayName }),
        "? Their account will be deactivated immediately and they will no longer be able to sign in."
      ] }),
      confirmProps: {
        color: "red"
      },
      labels: {
        cancel: "Cancel",
        confirm: "Remove Access"
      },
      onConfirm: () => {
        deleteUser.mutate(user.uid, {
          onError: () => {
            notifications.show({
              color: "red",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconX, { size: 16 }),
              message: "Failed to remove user access. Please try again.",
              title: "Delete Failed"
            });
          },
          onSuccess: () => {
            notifications.show({
              color: "green",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: 16 }),
              message: `${user.displayName}'s account has been deactivated.`,
              title: "Access Removed"
            });
          }
        });
      },
      title: "Remove User Access"
    });
  }
  function handleSendMessage(user) {
    if (!currentUser) {
      return;
    }
    openSendMessageModal(user, currentUser);
  }
  function handleResetPassword(user) {
    openResetUserPasswordModal(user);
  }
  function handleToggleStatus(userId, isActive) {
    updateUser.mutate({
      userData: {
        isActive
      },
      userId
    }, {
      onError: () => {
        notifications.show({
          color: "red",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconX, { size: 16 }),
          message: "Failed to update user status. Please try again.",
          title: "Update Failed"
        });
      },
      onSuccess: () => {
        notifications.show({
          color: "green",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: 16 }),
          message: `User has been ${isActive ? "activated" : "deactivated"}.`,
          title: "Status Updated"
        });
      }
    });
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
  function handleExportUsers() {
    const headers = ["Name", "Email", "Student ID", "Role", "Status", "Last Login", "Certificates Earned"];
    const csvData = users.map((user) => [user.displayName || "", user.email || "", user.studentId || "", user.role || "", user.isActive ? "Active" : "Inactive", user.lastLoginAt ? new Date(user.lastLoginAt).toLocaleDateString() : "Never", user.certificatesEarned || 0]);
    const csvContent = [headers.join(","), ...csvData.map((row) => row.map((cell) => `"${cell}"`).join(","))].join("\n");
    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;"
    });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `users_export_${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    notifications.show({
      color: "green",
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: 16 }),
      message: "User data has been exported to CSV file.",
      title: "Export Complete"
    });
  }
  const totalUsers = users.length;
  const activeStudents = users.filter((u) => u.isActive && u.role === "student").length;
  const totalCertificates = users.reduce((sum, u) => sum + (u.certificatesEarned || 0), 0);
  const avgProgress = users.filter((u) => u.role === "student").length > 0 ? Math.round(users.filter((u) => u.role === "student").reduce((sum, u) => {
    const completed = u.completedCourses?.length || 0;
    const enrolled = u.enrolledCourses?.length || 0;
    return sum + (enrolled > 0 ? completed / enrolled * 100 : 0);
  }, 0) / users.filter((u) => u.role === "student").length) : 0;
  const columns = createUserTableColumns({
    onDelete: handleDeleteUser,
    onEdit: handleEditUser,
    onResetPassword: handleResetPassword,
    onSendMessage: handleSendMessage,
    onToggleStatus: handleToggleStatus,
    onView: handleViewUser
  });
  const filters = [{
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
  }];
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { size: "lg" }) }) });
  }
  if (error) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "red", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconExclamationCircle, { size: 16 }), title: "Error", children: "Failed to load users. Please try again later." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { "data-aos": "fade-up", gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { "data-aos": "fade-right", justify: "space-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-2 text-gray-800", order: 1, children: "User Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "lg", children: "Manage student accounts, track progress, and control access" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconDownload, { size: 16 }), onClick: handleExportUsers, variant: "light", children: "Export Data" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-fun-green-600 hover:bg-fun-green-700", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlus, { size: 16 }), onClick: handleCreateUser, children: "Add Student" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { "data-aos": "fade-up", "data-aos-delay": "100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 6,
        md: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "text-center", p: "md", radius: "md", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mb-1 text-gray-600", size: "sm", children: "Total Users" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-blue-600", fw: 700, size: "xl", children: totalUsers })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 6,
        md: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "text-center", p: "md", radius: "md", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mb-1 text-gray-600", size: "sm", children: "Active Students" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-green-600", fw: 700, size: "xl", children: activeStudents })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 6,
        md: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "text-center", p: "md", radius: "md", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mb-1 text-gray-600", size: "sm", children: "Avg Progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-orange-600", fw: 700, size: "xl", children: [
          avgProgress,
          "%"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 6,
        md: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "text-center", p: "md", radius: "md", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mb-1 text-gray-600", size: "sm", children: "Certificates" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-purple-600", fw: 700, size: "xl", children: totalCertificates })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-aos": "fade-up", "data-aos-delay": "200", p: "lg", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { columns, data: users, enableFilters: true, enablePagination: true, enableSearch: true, enableSorting: true, filters, loading: isLoading, pageSize: 10, searchPlaceholder: "Search users by name, email, or student ID..." }) })
  ] }) });
}
export {
  UserManagement as component
};
