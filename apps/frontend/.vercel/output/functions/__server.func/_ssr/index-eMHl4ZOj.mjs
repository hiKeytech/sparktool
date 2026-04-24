import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useResolvedAuthState, e as useTenants, g as useUsers, h as usePlatformActivityLogs, i as formatRelativeTime, j as formatDateTime } from "./router-D664CQ4V.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { D as Container, G as Group, z as Loader, y as Stack, Q as Badge, T as Text, E as Title, i as SimpleGrid, aa as Paper, a2 as ThemeIcon, $ as Alert, X as Table } from "../_libs/mantine__core.mjs";
import { B as Building2, S as ShieldCheck, h as UserCog, E as Earth, U as Users, f as ArrowRight, T as TriangleAlert, H as History } from "../_libs/lucide-react.mjs";
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
function SuperAdminDashboard() {
  const {
    user
  } = useResolvedAuthState();
  const {
    data: tenants = [],
    isLoading: tenantsLoading
  } = useTenants();
  const {
    data: users = [],
    isLoading: usersLoading
  } = useUsers(null);
  const {
    data: activityLogs = [],
    isLoading: activityLoading
  } = usePlatformActivityLogs({
    limit: 8
  });
  if (tenantsLoading || usersLoading || activityLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { justify: "center", py: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { color: "green" }) }) });
  }
  const platformAdmins = users.filter((entry) => entry.role === "super-admin");
  const tenantAdmins = users.filter((entry) => entry.role === "admin");
  const learners = users.filter((entry) => entry.role === "student");
  const activeTenants = tenants.filter((tenant) => tenant.subscriptionStatus === "active");
  const tenantCoverage = activeTenants.length ? Math.round(activeTenants.filter((tenant) => hasAssignedTenantAdmin(tenant, tenantAdmins)).length / activeTenants.length * 100) : 0;
  const inactiveTenants = tenants.filter((tenant) => tenant.subscriptionStatus === "inactive");
  const tenantsWithoutAdmins = tenants.filter((tenant) => !hasAssignedTenantAdmin(tenant, tenantAdmins));
  const dormantPlatformAdmins = platformAdmins.filter(isDormantAccount);
  const attentionItems = [...tenantsWithoutAdmins.map((tenant) => ({
    detail: "No tenant administrator currently assigned",
    label: tenant.name,
    link: "/super-admin/identities"
  })), ...inactiveTenants.map((tenant) => ({
    detail: "Tenant is inactive and may require subscription review",
    label: tenant.name,
    link: "/super-admin/tenants"
  })), ...dormantPlatformAdmins.map((account) => ({
    detail: "Platform administrator has no recent sign-in activity",
    label: account.displayName,
    link: "/super-admin/identities"
  }))].slice(0, 5);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { align: "flex-start", justify: "space-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", mb: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "green", variant: "light", children: "SparkTool Platform" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Multi-tenant control plane" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 1, children: "Platform Overview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", maw: 760, mt: "sm", children: [
        user?.displayName || "Platform administrator",
        ", this view tracks tenant coverage, administrator ownership, and account health across SparkTool. It is intentionally platform-wide, not tied to any single tenant."
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SimpleGrid, { cols: {
      base: 1,
      md: 2,
      xl: 4
    }, spacing: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewStat, { description: "Tenants currently serving learners", icon: Building2, label: "Active Tenants", tone: "green", value: String(activeTenants.length) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewStat, { description: "SparkTool-wide operator accounts", icon: ShieldCheck, label: "Platform Admins", tone: "blue", value: String(platformAdmins.length) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewStat, { description: "Tenant-scoped administrators", icon: UserCog, label: "Tenant Admins", tone: "orange", value: String(tenantAdmins.length) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewStat, { description: "Active tenants with assigned administrators", icon: Earth, label: "Coverage", tone: "violet", value: `${tenantCoverage}%` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SimpleGrid, { cols: {
      base: 1,
      lg: 3
    }, spacing: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "block", to: "/super-admin/identities", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { className: "h-full p-6 transition-shadow border border-stone-200 hover:shadow-md", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "green", radius: "md", size: "xl", variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 20 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16, className: "text-stone-400" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Administrator Directory" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", mt: "sm", size: "sm", children: [
          "Manage ",
          platformAdmins.length + tenantAdmins.length,
          " ",
          "administrator accounts across platform and tenant scopes."
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "block", to: "/super-admin/tenants", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { className: "h-full p-6 transition-shadow border border-stone-200 hover:shadow-md", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "blue", radius: "md", size: "xl", variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 20 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16, className: "text-stone-400" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Tenant Registry" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", mt: "sm", size: "sm", children: [
          "Review subscription status, access posture, and configuration readiness for ",
          tenants.length,
          " tenants."
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "block", to: "/super-admin/telemetry", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { className: "h-full p-6 transition-shadow border border-stone-200 hover:shadow-md", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "orange", radius: "md", size: "xl", variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 20 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 16, className: "text-stone-400" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Operational Signals" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", mt: "sm", size: "sm", children: "Inspect account activity, coverage gaps, and tenant distribution using real registry data." })
      ] }) })
    ] }),
    attentionItems.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { color: "orange", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 16 }), title: "Needs attention", children: [
      attentionItems.length,
      " platform condition",
      attentionItems.length === 1 ? " requires" : "s require",
      " follow-up."
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "green", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 16 }), title: "Platform posture", children: "No immediate tenant coverage or administrator ownership gaps were detected from the current platform registry." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SimpleGrid, { cols: {
      base: 1,
      xl: 2
    }, spacing: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Tenant Coverage Snapshot" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color: "green", variant: "light", children: [
            tenants.length,
            " tenants"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { highlightOnHover: true, verticalSpacing: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Thead, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Tr, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { children: "Tenant" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { children: "Admins" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { children: "Signup" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Tbody, { children: tenants.slice(0, 6).map((tenant) => {
            const adminsAssigned = countAssignedTenantAdmins(tenant, tenantAdmins);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Tr, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 600, size: "sm", children: tenant.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: tenant.domain })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: statusColor(tenant.subscriptionStatus), variant: "light", children: tenant.subscriptionStatus }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { children: adminsAssigned }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { children: tenant.config.auth.allowSignup ? "Open" : "Invite only" })
            ] }, tenant.id);
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Attention Queue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "orange", variant: "light", children: attentionItems.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "sm", children: attentionItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "No platform blockers are currently derived from tenant and account registry data." }) : attentionItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "block", to: item.link, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { className: "transition-colors border border-stone-200 hover:border-orange-300", p: "sm", radius: "md", withBorder: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 600, size: "sm", children: item.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: item.detail })
        ] }) }, `${item.label}-${item.detail}`)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "lg", radius: "lg", withBorder: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Account Inventory" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color: "blue", variant: "light", children: [
          users.length,
          " identities"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SimpleGrid, { cols: {
        base: 1,
        md: 3
      }, spacing: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(InventorySummary, { label: "Learners", meta: "Tenant-bound student accounts", value: String(learners.length) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InventorySummary, { label: "Active Accounts", meta: "Accounts not marked inactive", value: String(users.filter((entry) => entry.isActive !== false).length) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InventorySummary, { label: "Dormant Admins", meta: "No login in the last 30 days", value: String([...platformAdmins, ...tenantAdmins].filter(isDormantAccount).length) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", mt: "md", size: "xs", children: [
        "Last platform admin sign-in: ",
        latestLastSeen(platformAdmins)
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "lg", radius: "lg", withBorder: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "green", radius: "md", size: "lg", variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { size: 18 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Recent Platform Activity" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color: "green", variant: "light", children: [
          activityLogs.length,
          " events"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { highlightOnHover: true, verticalSpacing: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Thead, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Tr, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { children: "Event" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { children: "Tenant" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { children: "Actor" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { children: "When" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Tbody, { children: activityLogs.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Tr, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { colSpan: 4, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", py: "lg", ta: "center", children: "No recent cross-tenant activity is available." }) }) }) : activityLogs.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Tr, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Td, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 600, size: "sm", children: formatActivityAction(entry) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: formatActivityDetail(entry) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { children: resolveTenantName(entry.tenantId, tenants) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { children: resolveActorName(entry.userId, users) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Td, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: formatRelativeTime(entry.timestamp) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: formatDateTime(entry.timestamp) })
          ] })
        ] }, entry.id)) })
      ] })
    ] })
  ] }) });
}
function countAssignedTenantAdmins(tenant, admins) {
  return admins.filter((entry) => (entry.tenantIds ?? []).includes(tenant.id)).length;
}
function hasAssignedTenantAdmin(tenant, admins) {
  return countAssignedTenantAdmins(tenant, admins) > 0;
}
function isDormantAccount(user) {
  if (!user.lastLoginAt) return true;
  return Date.now() - user.lastLoginAt > 30 * 24 * 60 * 60 * 1e3;
}
function latestLastSeen(users) {
  const latest = users.map((entry) => entry.lastLoginAt ?? 0).sort((left, right) => right - left)[0];
  return latest ? formatRelativeTime(latest) : "No recorded sign-ins";
}
function statusColor(status) {
  switch (status) {
    case "active":
      return "green";
    case "trial":
      return "yellow";
    default:
      return "red";
  }
}
function OverviewStat({
  description,
  icon: Icon,
  label,
  tone,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "lg", radius: "lg", withBorder: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { justify: "space-between", mb: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: tone, radius: "md", size: "xl", variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 20 }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 2, children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", mt: "xs", size: "xs", children: description })
  ] });
}
function InventorySummary({
  label,
  meta,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { bg: "var(--mantine-color-stone-0)", p: "md", radius: "md", withBorder: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 700, size: "xl", children: value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: meta })
  ] });
}
function formatActivityAction(entry) {
  return (entry.action ?? "activity").split("_").map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1)).join(" ");
}
function formatActivityDetail(entry) {
  if ("courseId" in entry && entry.courseId) {
    return `Course ${entry.courseId}`;
  }
  if ("quizId" in entry && entry.quizId) {
    return `Quiz ${entry.quizId}`;
  }
  if ("method" in entry && entry.method) {
    return `Method: ${entry.method.replace(/_/g, " ")}`;
  }
  return "Platform event";
}
function resolveActorName(userId, users) {
  if (!userId) return "Unknown actor";
  return users.find((entry) => entry.uid === userId)?.displayName || userId;
}
function resolveTenantName(tenantId, tenants) {
  if (!tenantId) return "Platform-wide";
  return tenants.find((entry) => entry.id === tenantId)?.name || tenantId;
}
export {
  SuperAdminDashboard as component
};
