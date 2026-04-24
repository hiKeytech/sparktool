import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Navigate, O as Outlet, g as useLocation, e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useResolvedAuthState, b as useSignOut } from "./router-D664CQ4V.mjs";
import { r as resolveRoleHomeTarget } from "./session-DEslDYHo.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { L as LoadingOverlay, T as Text, a9 as Anchor, a as Button } from "../_libs/mantine__core.mjs";
import { S as ShieldCheck, L as LayoutDashboard, U as Users, B as Building2, H as History, C as ChartColumn, a as Settings, b as LogOut } from "../_libs/lucide-react.mjs";
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
import "../_libs/mantine__modals.mjs";
import "../_libs/tabler__icons-react.mjs";
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
const navItems = [
  { icon: LayoutDashboard, label: "Overview", path: "/super-admin" },
  {
    icon: Users,
    label: "Administrators",
    path: "/super-admin/identities"
  },
  { icon: Building2, label: "Tenants", path: "/super-admin/tenants" },
  {
    icon: History,
    label: "Invitations",
    path: "/super-admin/invitations"
  },
  {
    icon: ChartColumn,
    label: "Operational Signals",
    path: "/super-admin/telemetry"
  },
  { icon: Settings, label: "Platform Policy", path: "/super-admin/settings" }
];
function SuperAdminSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useResolvedAuthState();
  const { mutateAsync: signOut } = useSignOut();
  const displayName = user?.displayName?.trim() || "Platform Administrator";
  const initials = displayName.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("") || "PA";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "fixed left-0 top-0 z-50 flex h-screen w-64 flex-col justify-between border-r border-stone-800 bg-stone-950 text-white", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-20 items-center border-b border-stone-800 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 20, className: "text-emerald-300" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold tracking-tight text-white", children: "SparkTool" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300", children: "Platform Control" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "p-4 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mb-3 px-3 text-[10px] font-bold uppercase tracking-wider text-stone-500", children: "Navigation" }),
        navItems.map((item) => {
          const isActive = pathname === item.path || item.path !== "/super-admin" && pathname.startsWith(item.path);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Anchor,
            {
              component: Link,
              to: item.path,
              underline: "never",
              className: `flex items-center gap-3 px-3 py-2.5 rounded-md font-medium text-sm transition-all ${isActive ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-200 shadow-sm" : "text-stone-300 hover:bg-white/5 hover:text-white"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { size: 18 }),
                item.label
              ]
            },
            item.path
          );
        })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-stone-800 bg-stone-900 p-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-3 px-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold tracking-wide text-stone-950 shadow-sm", children: initials }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-sm font-bold text-white", children: displayName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "w-32 truncate text-xs text-stone-400", children: user?.email || "platform@sparktool.local" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          fullWidth: true,
          variant: "subtle",
          color: "red",
          onClick: async () => {
            await signOut({});
            navigate({ replace: true, to: "/login" });
          },
          leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 16 }),
          className: "h-10 rounded-md text-sm font-medium text-red-300 hover:bg-red-500/10",
          children: "Sign Out"
        }
      )
    ] })
  ] });
}
function SuperAdminRoute() {
  const {
    loading,
    session,
    user
  } = useResolvedAuthState();
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { visible: true });
  }
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { replace: true, to: "/login" });
  }
  if (user.role !== "super-admin") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { replace: true, ...resolveRoleHomeTarget(user.role, session?.tenantIds?.[0]) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex bg-stone-50 min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SuperAdminSidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 w-full lg:ml-64 overflow-x-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
  ] });
}
export {
  SuperAdminRoute as component
};
