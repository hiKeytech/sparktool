import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Navigate, f as useParams, g as useLocation, e as useNavigate, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { N as NotificationBell } from "./notification-bell-DLfCVxAh.mjs";
import { G as Route$w, a as useResolvedAuthState, b as useSignOut, A as AuthScope } from "./router-D664CQ4V.mjs";
import { N as NCSLogo } from "./ncs-logo-Drvs_Prq.mjs";
import { b as buildTenantPath } from "./session-DEslDYHo.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { L as LoadingOverlay, ad as AppShell, D as Container, G as Group, ae as Burger, T as Text, Q as Badge, Y as Tooltip, p as ActionIcon, V as Menu, a3 as Avatar, y as Stack, af as NavLink, ag as Divider, a as Button } from "../_libs/mantine__core.mjs";
import { o as useDisclosure } from "../_libs/mantine__hooks.mjs";
import { N as IconDashboard, l as IconUsers, o as IconBook, O as IconVideo, V as IconClipboardList, W as IconChartBar, q as IconCertificate, J as IconSettings, X as IconPlus, Y as IconUserCheck, Z as IconFileText, c as IconSearch, M as IconShield, R as IconLogout } from "../_libs/tabler__icons-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
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
import "./notifications-drawer-_Ca04YBO.mjs";
import "../_libs/date-fns.mjs";
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
import "../_libs/mantine__notifications.mjs";
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
import "../_libs/mantine__modals.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function AdminLayout({ auth }) {
  const { tenant: tenantParam } = useParams({ strict: false });
  const tenantSlug = tenantParam;
  const { user } = auth;
  const { mutateAsync } = useSignOut();
  const [opened, { close, toggle }] = useDisclosure();
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await mutateAsync({ userId: user?.uid });
      navigate({
        params: { tenant: tenantSlug },
        replace: true,
        to: "/$tenant/login"
      });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const adminRootPath = buildTenantPath(tenantSlug, "/admin");
  const navigateToAdminPath = (path) => {
    switch (path) {
      case adminRootPath:
        navigate({ params: { tenant: tenantSlug }, to: "/$tenant/admin" });
        break;
      case buildTenantPath(tenantSlug, "/admin/users"):
        navigate({
          params: { tenant: tenantSlug },
          to: "/$tenant/admin/users"
        });
        break;
      case buildTenantPath(tenantSlug, "/admin/courses"):
        navigate({
          params: { tenant: tenantSlug },
          to: "/$tenant/admin/courses"
        });
        break;
      case buildTenantPath(tenantSlug, "/admin/live-sessions"):
        navigate({
          params: { tenant: tenantSlug },
          to: "/$tenant/admin/live-sessions"
        });
        break;
      case buildTenantPath(tenantSlug, "/admin/quizzes"):
        navigate({
          params: { tenant: tenantSlug },
          to: "/$tenant/admin/quizzes"
        });
        break;
      case buildTenantPath(tenantSlug, "/admin/analytics"):
        navigate({
          params: { tenant: tenantSlug },
          to: "/$tenant/admin/analytics"
        });
        break;
      case buildTenantPath(tenantSlug, "/admin/certificates"):
        navigate({
          params: { tenant: tenantSlug },
          to: "/$tenant/admin/certificates"
        });
        break;
      case buildTenantPath(tenantSlug, "/admin/settings"):
        navigate({
          params: { tenant: tenantSlug },
          to: "/$tenant/admin/settings"
        });
        break;
      case buildTenantPath(tenantSlug, "/admin/profile"):
        navigate({
          params: { tenant: tenantSlug },
          to: "/$tenant/admin/profile"
        });
        break;
      case buildTenantPath(tenantSlug, "/admin/security"):
        navigate({
          params: { tenant: tenantSlug },
          to: "/$tenant/admin/security"
        });
        break;
    }
  };
  const navigationItems = [
    {
      description: "Overview and metrics",
      icon: IconDashboard,
      label: "Dashboard",
      path: adminRootPath
    },
    {
      description: "Manage students and staff",
      icon: IconUsers,
      label: "User Management",
      path: buildTenantPath(tenantSlug, "/admin/users")
    },
    {
      description: "Manage courses and content",
      icon: IconBook,
      label: "Course Management",
      path: buildTenantPath(tenantSlug, "/admin/courses")
    },
    {
      description: "Manage live teaching sessions",
      icon: IconVideo,
      label: "Live Sessions",
      path: buildTenantPath(tenantSlug, "/admin/live-sessions")
    },
    {
      description: "Manage quizzes and assessments",
      icon: IconClipboardList,
      label: "Quiz Management",
      path: buildTenantPath(tenantSlug, "/admin/quizzes")
    },
    {
      description: "Performance insights",
      icon: IconChartBar,
      label: "Analytics & Reports",
      path: buildTenantPath(tenantSlug, "/admin/analytics")
    },
    {
      description: "Manage certificates",
      icon: IconCertificate,
      label: "Certificates",
      path: buildTenantPath(tenantSlug, "/admin/certificates")
    },
    {
      description: "Platform configuration",
      icon: IconSettings,
      label: "System Settings",
      path: buildTenantPath(tenantSlug, "/admin/settings")
    }
  ];
  const quickActions = [
    {
      action: () => navigateToAdminPath(buildTenantPath(tenantSlug, "/admin/courses")),
      color: "fun-green",
      icon: IconPlus,
      label: "Add Course"
    },
    {
      action: () => navigateToAdminPath(buildTenantPath(tenantSlug, "/admin/users")),
      color: "blue",
      icon: IconUserCheck,
      label: "Add User"
    },
    {
      action: () => navigateToAdminPath(buildTenantPath(tenantSlug, "/admin/analytics")),
      color: "orange",
      icon: IconFileText,
      label: "Generate Report"
    }
  ];
  const isActivePath = (path) => {
    if (path === adminRootPath) {
      return location.pathname === adminRootPath;
    }
    return location.pathname.startsWith(path);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthScope, { value: auth, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AppShell,
    {
      className: "bg-gray-50",
      header: { height: 70 },
      navbar: {
        breakpoint: "md",
        collapsed: { mobile: !opened },
        width: 280
      },
      padding: "md",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell.Header, { className: "border-b-2 bg-fun-green-800 border-fun-green-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { h: "100%", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { h: "100%", justify: "space-between", px: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Burger,
              {
                color: "white",
                hiddenFrom: "md",
                onClick: toggle,
                opened,
                size: "sm"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(NCSLogo, { size: 44 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Text,
                  {
                    className: "hidden text-white sm:block",
                    fw: 700,
                    size: "lg",
                    children: "Nigerian Correctional Service"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    className: "hidden sm:block",
                    color: "fun-green",
                    size: "xs",
                    variant: "light",
                    children: "Admin Portal"
                  }
                )
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { className: "hidden lg:flex", gap: "xs", children: quickActions.map((action) => /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { label: action.label, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ActionIcon,
              {
                className: "text-white hover:bg-fun-green-700",
                onClick: action.action,
                size: "lg",
                variant: "light",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(action.icon, { size: 18 })
              }
            ) }, action.label)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { label: "Global Search", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ActionIcon,
              {
                className: "text-white hover:bg-fun-green-700",
                size: "lg",
                variant: "light",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSearch, { size: 18 })
              }
            ) }),
            user?.uid && /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationBell, { userId: user.uid }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { shadow: "md", width: 250, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Target, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { className: "px-3 py-2 transition-colors rounded-lg cursor-pointer hover:bg-fun-green-700", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Avatar,
                  {
                    alt: user?.displayName || "Admin",
                    color: "fun-green",
                    size: "sm",
                    src: user?.photoURL,
                    children: user?.displayName?.[0] || "A"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:block", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-white", fw: 500, size: "sm", children: user?.displayName || "Administrator" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-fun-green-200", size: "xs", children: user?.email })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu.Dropdown, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Label, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(IconShield, { size: 14 }),
                  "Administrator Account"
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Menu.Item,
                  {
                    leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSettings, { size: 14 }),
                    onClick: () => navigateToAdminPath(
                      buildTenantPath(tenantSlug, "/admin/profile")
                    ),
                    children: "Profile Settings"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Menu.Item,
                  {
                    leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconShield, { size: 14 }),
                    onClick: () => navigateToAdminPath(
                      buildTenantPath(tenantSlug, "/admin/security")
                    ),
                    children: "Security Settings"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Divider, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Menu.Item,
                  {
                    color: "red",
                    leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconLogout, { size: 14 }),
                    onClick: handleLogout,
                    children: "Sign Out"
                  }
                )
              ] })
            ] })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell.Navbar, { className: "bg-white border-r border-gray-200", p: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", fw: 600, mb: "xs", size: "xs", tt: "uppercase", children: "Administration" }),
          navigationItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            NavLink,
            {
              active: isActivePath(item.path),
              className: `rounded-lg transition-all duration-200 ${isActivePath(item.path) ? "bg-fun-green-50 text-fun-green-700 border-fun-green-200" : "hover:bg-gray-50"}`,
              description: item.description,
              label: item.label,
              leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { size: 20 }),
              onClick: () => {
                navigateToAdminPath(item.path);
                close();
              }
            },
            item.path
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, { my: "md" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Text,
            {
              c: "dimmed",
              className: "lg:hidden",
              fw: 600,
              mb: "xs",
              size: "xs",
              tt: "uppercase",
              children: "Quick Actions"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "xs", children: quickActions.map((action) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              color: action.color,
              fullWidth: true,
              leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(action.icon, { size: 16 }),
              onClick: action.action,
              size: "sm",
              variant: "light",
              children: action.label
            },
            action.label
          )) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, { className: "lg:hidden", my: "md" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", fw: 600, mb: "xs", size: "xs", tt: "uppercase", children: "System Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "fun-green", size: "sm", variant: "dot", children: "Online" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: "All systems operational" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell.Main, { className: "bg-gray-50", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            animate: { opacity: 1, y: 0 },
            className: "min-h-full",
            initial: { opacity: 0, y: 20 },
            transition: { duration: 0.5 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
          }
        ) })
      ]
    }
  ) });
}
function TenantAdminRoute() {
  const {
    tenant
  } = Route$w.useRouteContext();
  const auth = useResolvedAuthState(tenant);
  const {
    hasTenantAccess,
    loading,
    user
  } = auth;
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { visible: true });
  }
  if (!user || !hasTenantAccess) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { params: {
      tenant: tenant.id
    }, replace: true, to: "/$tenant/login" });
  }
  if (user.role === "super-admin") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { replace: true, to: "/super-admin" });
  }
  if (user.role !== "admin") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { params: {
      tenant: tenant.id
    }, replace: true, to: "/$tenant/student" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminLayout, { auth });
}
export {
  TenantAdminRoute as component
};
