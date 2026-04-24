import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Navigate, f as useParams, e as useNavigate, g as useLocation, O as Outlet } from "../_libs/tanstack__react-router.mjs";
import { N as NotificationBell } from "./notification-bell-DLfCVxAh.mjs";
import { y as Route$y, a as useResolvedAuthState, b as useSignOut, A as AuthScope } from "./router-D664CQ4V.mjs";
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
import { L as LoadingOverlay, ad as AppShell, D as Container, G as Group, ae as Burger, T as Text, a as Button, V as Menu, a3 as Avatar, y as Stack, af as NavLink, ag as Divider, Q as Badge } from "../_libs/mantine__core.mjs";
import { o as useDisclosure } from "../_libs/mantine__hooks.mjs";
import { N as IconDashboard, e as IconBooks, O as IconVideo, n as IconSparkles, P as IconProgress, Q as IconUserCircle, m as IconUser, R as IconLogout } from "../_libs/tabler__icons-react.mjs";
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
function StudentLayout({ auth }) {
  const [opened, { toggle }] = useDisclosure();
  const { tenant: tenantParam } = useParams({ strict: false });
  const tenantSlug = tenantParam;
  const { user } = auth;
  const { mutate } = useSignOut();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLogout = () => {
    mutate(
      { userId: user?.uid },
      {
        onSuccess: () => {
          navigate({
            params: { tenant: tenantSlug },
            replace: true,
            to: "/$tenant/login"
          });
        }
      }
    );
  };
  const studentRootPath = buildTenantPath(tenantSlug, "/student");
  const navigateToProfile = () => {
    navigate({
      params: { tenant: tenantSlug },
      to: "/$tenant/student/profile"
    });
  };
  const navigateToItem = (path) => {
    switch (path) {
      case studentRootPath:
        navigate({ params: { tenant: tenantSlug }, to: "/$tenant/student" });
        break;
      case buildTenantPath(tenantSlug, "/student/courses"):
        navigate({
          params: { tenant: tenantSlug },
          to: "/$tenant/student/courses"
        });
        break;
      case buildTenantPath(tenantSlug, "/student/live-sessions"):
        navigate({
          params: { tenant: tenantSlug },
          to: "/$tenant/student/live-sessions"
        });
        break;
      case buildTenantPath(tenantSlug, "/student/progress"):
        navigate({
          params: { tenant: tenantSlug },
          to: "/$tenant/student/progress"
        });
        break;
      case buildTenantPath(tenantSlug, "/student/ai"):
        navigate({
          params: { tenant: tenantSlug },
          search: { courseId: void 0 },
          to: "/$tenant/student/ai"
        });
        break;
      case buildTenantPath(tenantSlug, "/student/profile"):
        navigateToProfile();
        break;
    }
  };
  const navigationItems = [
    {
      icon: IconDashboard,
      label: "Dashboard",
      path: studentRootPath
    },
    {
      icon: IconBooks,
      label: "Course Catalog",
      path: buildTenantPath(tenantSlug, "/student/courses")
    },
    {
      icon: IconVideo,
      label: "Live Sessions",
      path: buildTenantPath(tenantSlug, "/student/live-sessions")
    },
    {
      icon: IconSparkles,
      label: "AI Assistant",
      path: buildTenantPath(tenantSlug, "/student/ai")
    },
    {
      icon: IconProgress,
      label: "My Progress",
      path: buildTenantPath(tenantSlug, "/student/progress")
    },
    {
      icon: IconUserCircle,
      label: "Profile",
      path: buildTenantPath(tenantSlug, "/student/profile")
    }
  ];
  const isActivePath = (path) => {
    if (path === studentRootPath) {
      return location.pathname === studentRootPath;
    }
    return location.pathname.startsWith(path);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthScope, { value: auth, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    AppShell,
    {
      className: "bg-gray-50",
      header: { height: 70 },
      navbar: {
        breakpoint: "sm",
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
                hiddenFrom: "sm",
                onClick: toggle,
                opened,
                size: "sm"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(NCSLogo, { size: 44 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Text,
                {
                  className: "hidden text-white sm:block",
                  fw: 700,
                  size: "xl",
                  children: "Nigerian Correctional Service"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
            user?.uid && /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationBell, { userId: user.uid }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                className: "hidden text-white sm:flex bg-fun-green-700 hover:bg-fun-green-600",
                color: "fun-green",
                leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconUser, { size: 16 }),
                onClick: navigateToProfile,
                size: "sm",
                variant: "light",
                children: "Profile"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { shadow: "md", width: 200, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Target, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { className: "px-3 py-2 transition-colors rounded-lg cursor-pointer hover:bg-fun-green-700", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Avatar,
                  {
                    alt: user?.displayName,
                    color: "fun-green",
                    size: "sm",
                    src: user?.photoURL
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:block", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-white", fw: 500, size: "sm", children: user?.displayName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-fun-green-200", size: "xs", children: user?.email })
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu.Dropdown, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Label, { children: "Account" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Menu.Item,
                  {
                    leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconUser, { size: 14 }),
                    onClick: navigateToProfile,
                    children: "Profile & Settings"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Divider, {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Menu.Item,
                  {
                    color: "red",
                    leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconLogout, { size: 14 }),
                    onClick: handleLogout,
                    children: "Logout"
                  }
                )
              ] })
            ] })
          ] })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell.Navbar, { className: "bg-white border-r border-gray-200", p: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", fw: 600, mb: "xs", size: "xs", tt: "uppercase", children: "Learning Portal" }),
          navigationItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            NavLink,
            {
              active: isActivePath(item.path),
              className: `rounded-lg transition-all duration-200 ${isActivePath(item.path) ? "bg-fun-green-50 text-fun-green-700 border-fun-green-200" : "hover:bg-gray-50"}`,
              label: item.label,
              leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { size: 20 }),
              onClick: () => {
                navigateToItem(item.path);
                toggle();
              }
            },
            item.path
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, { my: "md" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-auto", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", fw: 600, mb: "xs", size: "xs", tt: "uppercase", children: "Account" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Avatar,
                {
                  alt: user?.displayName,
                  color: "fun-green",
                  size: "sm",
                  src: user?.photoURL,
                  children: user?.displayName?.[0] || "S"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, size: "sm", children: user?.displayName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "fun-green", size: "xs", variant: "light", children: "Student" })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AppShell.Main, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "min-h-full",
            "data-aos": "fade-up",
            "data-aos-duration": "500",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {})
          }
        ) })
      ]
    }
  ) });
}
function TenantStudentRoute() {
  const {
    tenant
  } = Route$y.useRouteContext();
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
  if (user.role !== "student") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { params: {
      tenant: tenant.id
    }, replace: true, to: "/$tenant/admin" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StudentLayout, { auth });
}
export {
  TenantStudentRoute as component
};
