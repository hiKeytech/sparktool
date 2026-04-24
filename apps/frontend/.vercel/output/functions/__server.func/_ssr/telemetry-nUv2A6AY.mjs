import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useTenants, g as useUsers, i as formatRelativeTime } from "./router-D664CQ4V.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { D as Container, G as Group, z as Loader, y as Stack, Q as Badge, E as Title, T as Text, i as SimpleGrid, $ as Alert, aa as Paper, X as Table, R as Progress } from "../_libs/mantine__core.mjs";
import { A as Activity, S as ShieldCheck } from "../_libs/lucide-react.mjs";
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
function TelemetryOverview() {
  const {
    data: tenants = [],
    isLoading: tenantsLoading
  } = useTenants();
  const {
    data: users = [],
    isLoading: usersLoading
  } = useUsers(null);
  if (tenantsLoading || usersLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { justify: "center", py: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { color: "green" }) }) });
  }
  const activeUsers = users.filter((entry) => entry.isActive !== false);
  const dormantAdmins = users.filter((entry) => (entry.role === "admin" || entry.role === "super-admin") && isDormant(entry));
  const activeTenants = tenants.filter((tenant) => tenant.subscriptionStatus === "active");
  const coveredActiveTenants = activeTenants.filter((tenant) => users.some((entry) => entry.role === "admin" && (entry.tenantIds ?? []).includes(tenant.id)));
  const coverageRate = activeTenants.length ? Math.round(coveredActiveTenants.length / activeTenants.length * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "green", variant: "light", children: "Derived platform signals" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { mt: "sm", order: 1, children: "Operational Signals" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", maw: 760, mt: "sm", children: "SparkTool does not yet expose a dedicated platform telemetry API. This page therefore reports operational signals derived from the real tenant registry and global identity store instead of pretending to have CPU, storage, or request-rate data." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SimpleGrid, { cols: {
      base: 1,
      md: 2,
      xl: 4
    }, spacing: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SignalStat, { label: "Active Identities", value: String(activeUsers.length) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SignalStat, { label: "Dormant Admins", value: String(dormantAdmins.length) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SignalStat, { label: "Active Tenants", value: String(activeTenants.length) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SignalStat, { label: "Coverage", value: `${coverageRate}%` })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "blue", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 16 }), title: "Signal source", children: "These figures are computed from real tenants and user accounts. They should be treated as governance and coverage signals, not infrastructure telemetry." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SimpleGrid, { cols: {
      base: 1,
      xl: 2
    }, spacing: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Tenant Distribution" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color: "green", variant: "light", children: [
            tenants.length,
            " tenants"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DistributionRow, { color: "green", count: tenants.filter((tenant) => tenant.subscriptionStatus === "active").length, label: "Active", total: tenants.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DistributionRow, { color: "yellow", count: tenants.filter((tenant) => tenant.subscriptionStatus === "trial").length, label: "Trial", total: tenants.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DistributionRow, { color: "red", count: tenants.filter((tenant) => tenant.subscriptionStatus === "inactive").length, label: "Inactive", total: tenants.length })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Identity Mix" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color: "blue", variant: "light", children: [
            users.length,
            " total"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DistributionRow, { color: "blue", count: users.filter((entry) => entry.role === "super-admin").length, label: "Platform admins", total: users.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DistributionRow, { color: "green", count: users.filter((entry) => entry.role === "admin").length, label: "Tenant admins", total: users.length }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DistributionRow, { color: "gray", count: users.filter((entry) => entry.role === "student").length, label: "Learners", total: users.length })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "lg", radius: "lg", withBorder: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Tenant Operations Board" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color: coverageRate === 100 ? "green" : "orange", variant: "light", children: [
          coverageRate,
          "% covered"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { highlightOnHover: true, verticalSpacing: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Thead, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Tr, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { children: "Tenant" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { children: "Admins" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { children: "Learners" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { children: "Most Recent Admin Sign-in" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Tbody, { children: tenants.map((tenant) => {
          const admins = users.filter((entry) => entry.role === "admin" && (entry.tenantIds ?? []).includes(tenant.id));
          const learnersForTenant = users.filter((entry) => entry.role === "student" && (entry.tenantIds ?? []).includes(tenant.id));
          const latestAdminLogin = admins.map((entry) => entry.lastLoginAt ?? 0).sort((left, right) => right - left)[0];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Tr, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Td, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 600, size: "sm", children: tenant.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: tenant.domain })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: statusColor(tenant.subscriptionStatus), variant: "light", children: tenant.subscriptionStatus }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { children: admins.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { children: learnersForTenant.length }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { children: latestAdminLogin ? formatRelativeTime(latestAdminLogin) : "No admin sign-in" })
          ] }, tenant.id);
        }) })
      ] })
    ] }),
    dormantAdmins.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "lg", radius: "lg", withBorder: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Dormant Administrator Accounts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "orange", variant: "light", children: dormantAdmins.length })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "sm", children: dormantAdmins.slice(0, 5).map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { bg: "var(--mantine-color-orange-0)", p: "sm", radius: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 600, size: "sm", children: entry.displayName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", children: [
          entry.email,
          " ·",
          " ",
          entry.lastLoginAt ? formatRelativeTime(entry.lastLoginAt) : "No sign-in recorded"
        ] })
      ] }, entry.uid)) })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "green", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 16 }), title: "Administrator activity", children: "No dormant administrator accounts were detected by the current inactivity threshold." })
  ] }) });
}
function isDormant(user) {
  if (!user.lastLoginAt) return true;
  return Date.now() - user.lastLoginAt > 30 * 24 * 60 * 60 * 1e3;
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
function DistributionRow({
  color,
  count,
  label,
  total
}) {
  const value = total > 0 ? Math.round(count / total * 100) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: 6, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 600, size: "sm", children: count })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { color, size: "lg", value })
  ] });
}
function SignalStat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "lg", radius: "lg", withBorder: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 2, children: value })
  ] });
}
export {
  TelemetryOverview as component
};
