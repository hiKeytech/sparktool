import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useResolvedAuthState, e as useTenants, g as useUsers, v as useCreateUser, w as useDeleteUser, x as useUpdateUser, i as formatRelativeTime, f as formatDate } from "./router-D664CQ4V.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { D as Container, G as Group, z as Loader, y as Stack, Q as Badge, E as Title, T as Text, a as Button, i as SimpleGrid, $ as Alert, aa as Paper, J as TextInput, K as Select, X as Table, M as Modal, a8 as PasswordInput } from "../_libs/mantine__core.mjs";
import { l as UserPlus, S as ShieldCheck } from "../_libs/lucide-react.mjs";
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
const defaultAddForm = {
  department: "",
  displayName: "",
  email: "",
  password: "",
  roleType: "Tenant Admin",
  tenantId: ""
};
function IdentitiesOverview() {
  const {
    user
  } = useResolvedAuthState();
  const [roleFilter, setRoleFilter] = reactExports.useState("all");
  const [search, setSearch] = reactExports.useState("");
  const [selectedAdmin, setSelectedAdmin] = reactExports.useState(null);
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [addForm, setAddForm] = reactExports.useState(defaultAddForm);
  const {
    data: tenants = []
  } = useTenants();
  const {
    data: users = [],
    isLoading,
    refetch
  } = useUsers(null);
  const {
    isPending: isCreating,
    mutate: createUser
  } = useCreateUser();
  const {
    isPending: isRemoving,
    mutate: removeUser
  } = useDeleteUser();
  const {
    isPending: isUpdating,
    mutate: updateUser
  } = useUpdateUser();
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { justify: "center", py: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { color: "green" }) }) });
  }
  const administrators = users.filter((entry) => entry.role === "admin" || entry.role === "super-admin");
  const filteredAdministrators = administrators.filter((entry) => {
    const roleMatches = roleFilter === "all" || entry.role === roleFilter;
    const searchNeedle = search.trim().toLowerCase();
    const tenantLabel = resolveTenantLabel(entry, tenants).toLowerCase();
    const searchMatches = searchNeedle.length === 0 || entry.displayName.toLowerCase().includes(searchNeedle) || entry.email.toLowerCase().includes(searchNeedle) || tenantLabel.includes(searchNeedle);
    return roleMatches && searchMatches;
  });
  const superAdmins = administrators.filter((entry) => entry.role === "super-admin");
  const tenantAdmins = administrators.filter((entry) => entry.role === "admin");
  const dormantAdmins = administrators.filter(isDormantAccount);
  function handleCreateAdministrator() {
    createUser({
      department: addForm.department || null,
      displayName: addForm.displayName,
      email: addForm.email,
      password: addForm.password,
      role: addForm.roleType === "Super Admin" ? "super-admin" : "admin",
      tenantId: addForm.roleType === "Super Admin" ? null : addForm.tenantId || null
    }, {
      onSuccess: async () => {
        setAddOpen(false);
        setAddForm(defaultAddForm);
        await refetch();
      }
    });
  }
  function handleSaveAdministrator() {
    if (!selectedAdmin) return;
    updateUser({
      userData: {
        department: selectedAdmin.department || null,
        displayName: selectedAdmin.displayName,
        isActive: selectedAdmin.isActive,
        location: selectedAdmin.location || null
      },
      userId: selectedAdmin.uid
    }, {
      onSuccess: async () => {
        setSelectedAdmin(null);
        await refetch();
      }
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Container, { className: "py-8", size: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "flex-start", justify: "space-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "green", variant: "light", children: "Platform identity management" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { mt: "sm", order: 1, children: "Administrators" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", maw: 760, mt: "sm", children: "Platform administrators operate SparkTool globally. Tenant administrators operate a specific tenant. This page manages both groups from the same platform registry." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-[#006838] text-white hover:bg-[#006838]/90", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { size: 16 }), onClick: () => setAddOpen(true), children: "Add Administrator" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SimpleGrid, { cols: {
        base: 1,
        md: 2,
        xl: 4
      }, spacing: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IdentityStat, { label: "All Administrators", value: String(administrators.length) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IdentityStat, { label: "Platform Admins", value: String(superAdmins.length) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IdentityStat, { label: "Tenant Admins", value: String(tenantAdmins.length) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(IdentityStat, { label: "Dormant Admins", value: String(dormantAdmins.length) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "blue", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 16 }), title: "Scope model", children: "Super admins are platform-wide and are not bound to a tenant. Tenant admins should always be assigned to a tenant so ownership is explicit." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", wrap: "wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Administrator Directory" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { onChange: (event) => setSearch(event.currentTarget.value), placeholder: "Search by name, email, or tenant", value: search }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { allowDeselect: false, data: [{
              label: "All roles",
              value: "all"
            }, {
              label: "Platform admins",
              value: "super-admin"
            }, {
              label: "Tenant admins",
              value: "admin"
            }], onChange: (value) => setRoleFilter(value || "all"), value: roleFilter })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { highlightOnHover: true, verticalSpacing: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Thead, { className: "bg-stone-50 border-b border-stone-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Tr, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { className: "text-stone-500 font-semibold text-xs tracking-wide", children: "Administrator" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { className: "text-stone-500 font-semibold text-xs tracking-wide", children: "Scope" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { className: "text-stone-500 font-semibold text-xs tracking-wide", children: "Status" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { className: "text-stone-500 font-semibold text-xs tracking-wide", children: "Last Sign-in" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { className: "text-stone-500 font-semibold text-xs tracking-wide text-right", children: "Actions" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Tbody, { className: "text-sm", children: [
            filteredAdministrators.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Tr, { className: "border-b border-stone-100 hover:bg-stone-50 transition-colors", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 600, size: "sm", children: entry.displayName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: entry.email })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { children: entry.role === "super-admin" ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "blue", variant: "light", className: "font-medium tracking-wide", children: "Platform-wide" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "green", variant: "light", className: "font-medium tracking-wide", children: resolveTenantLabel(entry, tenants) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: entry.isActive === false ? "red" : "green", variant: "light", className: "font-medium", children: entry.isActive === false ? "Inactive" : "Active" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Td, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: entry.lastLoginAt ? formatRelativeTime(entry.lastLoginAt) : "No sign-in yet" }),
                entry.lastLoginAt ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: formatDate(entry.lastLoginAt, "MMM D, YYYY") }) : null
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", gap: "xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "subtle", color: "gray", size: "xs", className: "text-stone-600 hover:bg-stone-100", onClick: () => setSelectedAdmin({
                  department: entry.department || "",
                  displayName: entry.displayName,
                  isActive: entry.isActive !== false,
                  location: entry.location || "",
                  uid: entry.uid
                }), children: "Edit" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: entry.uid === user?.uid, loading: isRemoving, variant: "subtle", color: "red", size: "xs", className: "text-red-600 hover:bg-red-50", onClick: () => removeUser(entry.uid, {
                  onSuccess: async () => {
                    await refetch();
                  }
                }), children: "Remove Access" })
              ] }) })
            ] }, entry.uid)),
            filteredAdministrators.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Tr, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { colSpan: 5, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", py: "xl", ta: "center", children: "No administrator accounts matched the current filter." }) }) }) : null
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { opened: selectedAdmin !== null, onClose: () => setSelectedAdmin(null), title: "Edit Administrator", centered: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Display Name", value: selectedAdmin?.displayName ?? "", onChange: (event) => {
        if (!selectedAdmin) return;
        setSelectedAdmin({
          ...selectedAdmin,
          displayName: event.currentTarget.value
        });
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Department", value: selectedAdmin?.department ?? "", onChange: (event) => {
        if (!selectedAdmin) return;
        setSelectedAdmin({
          ...selectedAdmin,
          department: event.currentTarget.value
        });
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Location", value: selectedAdmin?.location ?? "", onChange: (event) => {
        if (!selectedAdmin) return;
        setSelectedAdmin({
          ...selectedAdmin,
          location: event.currentTarget.value
        });
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Account Status", data: [{
        label: "Active",
        value: "active"
      }, {
        label: "Inactive",
        value: "inactive"
      }], value: selectedAdmin?.isActive ? "active" : "inactive", onChange: (value) => {
        if (!selectedAdmin || !value) return;
        setSelectedAdmin({
          ...selectedAdmin,
          isActive: value === "active"
        });
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", mt: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "default", onClick: () => setSelectedAdmin(null), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "green", loading: isUpdating, onClick: handleSaveAdministrator, children: "Save Changes" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { opened: addOpen, onClose: () => {
      setAddOpen(false);
      setAddForm(defaultAddForm);
    }, title: "Add Administrator", centered: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Display Name", placeholder: "e.g. Ada Nwosu", required: true, value: addForm.displayName, onChange: (e) => setAddForm((prev) => ({
        ...prev,
        displayName: e.currentTarget.value
      })) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Email Address", placeholder: "e.g. platform.ops@sparktool.local", required: true, value: addForm.email, onChange: (e) => setAddForm((prev) => ({
        ...prev,
        email: e.currentTarget.value
      })) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordInput, { label: "Temporary Password", placeholder: "At least 8 characters", required: true, value: addForm.password, onChange: (e) => setAddForm((prev) => ({
        ...prev,
        password: e.currentTarget.value
      })) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Department", placeholder: "Platform Operations", value: addForm.department, onChange: (e) => setAddForm((prev) => ({
        ...prev,
        department: e.currentTarget.value
      })) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Role Type", data: [{
        label: "Tenant Admin",
        value: "Tenant Admin"
      }, {
        label: "Super Admin",
        value: "Super Admin"
      }], value: addForm.roleType, onChange: (value) => setAddForm((prev) => ({
        ...prev,
        roleType: value ?? "Tenant Admin",
        tenantId: value === "Super Admin" ? "" : prev.tenantId
      })) }),
      addForm.roleType === "Tenant Admin" && /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Assign to Tenant", placeholder: "Select a tenant", required: true, data: tenants.map((t) => ({
        label: t.name,
        value: t.id
      })), value: addForm.tenantId || null, onChange: (value) => setAddForm((prev) => ({
        ...prev,
        tenantId: value ?? ""
      })) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", mt: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "default", onClick: () => {
          setAddOpen(false);
          setAddForm(defaultAddForm);
        }, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "green", loading: isCreating, disabled: !addForm.displayName || !addForm.email || addForm.password.length < 8 || addForm.roleType === "Tenant Admin" && !addForm.tenantId, onClick: handleCreateAdministrator, children: "Add Administrator" })
      ] })
    ] }) })
  ] });
}
function isDormantAccount(user) {
  if (!user.lastLoginAt) return true;
  return Date.now() - user.lastLoginAt > 30 * 24 * 60 * 60 * 1e3;
}
function resolveTenantLabel(user, tenants) {
  if (user.role === "super-admin") {
    return "Platform-wide";
  }
  const tenantNames = tenants.filter((tenant) => (user.tenantIds ?? []).includes(tenant.id)).map((tenant) => tenant.name);
  return tenantNames.length > 0 ? tenantNames.join(", ") : "Unassigned";
}
function IdentityStat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "lg", radius: "lg", withBorder: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 2, children: value })
  ] });
}
export {
  IdentitiesOverview as component
};
