import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useTenants, l as useTenantAdminInvitations, m as useCreateTenantOnboarding, n as useReissueTenantAdminInvitation, o as useRevokeTenantAdminInvitation, p as useUpdateTenant, i as formatRelativeTime, j as formatDateTime } from "./router-D664CQ4V.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { D as Container, y as Stack, G as Group, Q as Badge, E as Title, T as Text, a as Button, i as SimpleGrid, aa as Paper, z as Loader, X as Table, M as Modal, J as TextInput, K as Select, ab as Switch, ac as CopyButton } from "../_libs/mantine__core.mjs";
import { P as Plus, B as Building2 } from "../_libs/lucide-react.mjs";
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
function toDataUrl(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
function escapeSvgText(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function buildTenantBadgeDataUrl(name) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("") || "TN";
  return toDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160" fill="none">
      <rect width="160" height="160" rx="32" fill="#0f3d2e"/>
      <rect x="16" y="16" width="128" height="128" rx="24" fill="#15523d" stroke="#8ed5b2" stroke-width="2"/>
      <text x="80" y="92" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="44" font-weight="700" fill="#f3fbf7">${initials}</text>
    </svg>
  `);
}
function buildTenantIllustrationDataUrl(name) {
  const safeName = escapeSvgText(name);
  return toDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720" fill="none">
      <rect width="1200" height="720" fill="#eef6f1"/>
      <circle cx="1040" cy="120" r="220" fill="#d2eadc"/>
      <circle cx="160" cy="640" r="240" fill="#dcefe4"/>
      <rect x="120" y="124" width="960" height="472" rx="40" fill="#ffffff" stroke="#c5dfd1" stroke-width="2"/>
      <rect x="184" y="192" width="224" height="18" rx="9" fill="#1b7339" fill-opacity="0.18"/>
      <rect x="184" y="232" width="448" height="64" rx="20" fill="#114b2d"/>
      <rect x="184" y="320" width="372" height="18" rx="9" fill="#9cc8af"/>
      <rect x="184" y="356" width="312" height="18" rx="9" fill="#c8dfd2"/>
      <rect x="184" y="420" width="192" height="52" rx="26" fill="#1b7339"/>
      <rect x="414" y="420" width="188" height="52" rx="26" fill="#edf5f0" stroke="#d5e7db" stroke-width="2"/>
      <rect x="744" y="220" width="220" height="280" rx="28" fill="#f4faf6" stroke="#d5e7db" stroke-width="2"/>
      <rect x="784" y="268" width="140" height="140" rx="28" fill="#d7eadf"/>
      <text x="184" y="286" font-family="Inter, Arial, sans-serif" font-size="52" font-weight="700" fill="#ffffff">${safeName}</text>
      <text x="184" y="398" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="500" fill="#37644d">Tenant workspace on SparkTool</text>
    </svg>
  `);
}
function buildDefaultConfig(name, allowSignup) {
  const badgeUrl = buildTenantBadgeDataUrl(name);
  const illustrationUrl = buildTenantIllustrationDataUrl(name);
  return {
    auth: {
      allowSignup,
      domains: [],
      restrictedDomains: [],
      strategies: [{
        config: {},
        label: "Sign in",
        type: "email-password"
      }]
    },
    branding: {
      fontFamily: "Inter, sans-serif",
      loginPage: {
        features: [{
          description: "Role-scoped access for learners and tenant operators.",
          icon: "shield",
          title: "Secure tenant access"
        }, {
          description: "Tenant-specific branding and controls managed from SparkTool.",
          icon: "users",
          title: "Isolated workspace"
        }],
        footnote: "Use your official tenant URL to sign in.",
        formDescription: "Enter your official credentials to access this tenant workspace.",
        formTitle: "Sign In",
        heading: name,
        subheading: `${name} operates on SparkTool's multi-tenant learning infrastructure.`
      },
      logoUrl: badgeUrl,
      portalName: name,
      primaryColor: "#1b7339",
      secondaryColor: "#eef6f1"
    },
    dashboard: {
      layout: "modern",
      widgets: []
    },
    modules: {
      certificates: false,
      gamification: false,
      liveClasses: false,
      messaging: false,
      reports: false
    },
    publicSite: {
      categorySectionTitle: "Explore Courses",
      categories: [{
        icon: "briefcase",
        name: "Business"
      }],
      copyright: `© ${(/* @__PURE__ */ new Date()).getFullYear()} ${name}. Powered by SparkTool.`,
      featuredCoursesCtaLabel: "View All",
      featuredCoursesTitle: "Featured Courses",
      footerLogoAlt: `${name} logo`,
      footerLogoUrl: badgeUrl,
      footerTagline: `${name} learning workspace on SparkTool`,
      heroBackgroundImageUrl: illustrationUrl,
      heroDescription: `${name} delivers tenant-isolated learning experiences on SparkTool.`,
      heroLogoAlt: `${name} logo`,
      heroLogoUrl: badgeUrl,
      heroPrimaryCtaLabel: "Start Learning",
      heroSecondaryCtaLabel: "Explore Courses",
      heroTitle: name,
      missionCtaLabel: "Learn More",
      missionDescription: `${name} uses SparkTool to deliver structured, tenant-isolated learning experiences.`,
      missionImageAlt: `${name} mission graphic`,
      missionImageUrl: illustrationUrl,
      missionTitle: "Mission",
      stats: [{
        label: "Students",
        value: "0"
      }]
    }
  };
}
function toSlug(value) {
  return value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}
const statusColors = {
  active: "green",
  inactive: "red",
  trial: "yellow"
};
const defaultAddForm = {
  adminDisplayName: "",
  adminEmail: "",
  allowSignup: false,
  domain: "",
  id: "",
  name: "",
  subscriptionStatus: "trial"
};
function TenantsOverview() {
  const [addOpen, setAddOpen] = reactExports.useState(false);
  const [editTenant, setEditTenant] = reactExports.useState(null);
  const [addForm, setAddForm] = reactExports.useState(defaultAddForm);
  const [onboardingResult, setOnboardingResult] = reactExports.useState(null);
  const {
    data: tenants,
    isLoading
  } = useTenants();
  const {
    data: tenantInvitations = []
  } = useTenantAdminInvitations();
  const {
    isPending: isCreating,
    mutate: createTenantOnboarding
  } = useCreateTenantOnboarding();
  const {
    isPending: isReissuing,
    mutate: reissueInvitation
  } = useReissueTenantAdminInvitation();
  const {
    isPending: isRevoking,
    mutate: revokeInvitation
  } = useRevokeTenantAdminInvitation();
  const {
    isPending: isUpdating,
    mutate: updateTenant
  } = useUpdateTenant();
  const invitationMap = buildInvitationMap(tenantInvitations);
  function handleAddSubmit() {
    createTenantOnboarding({
      initialAdminInvitation: {
        displayName: addForm.adminDisplayName || null,
        email: addForm.adminEmail
      },
      tenant: {
        config: buildDefaultConfig(addForm.name, addForm.allowSignup),
        domain: addForm.domain,
        id: addForm.id,
        name: addForm.name,
        subscriptionStatus: addForm.subscriptionStatus
      }
    }, {
      onSuccess: (result) => {
        setAddOpen(false);
        setOnboardingResult({
          inviteLink: `${window.location.origin}/${result.tenant.id}/login?invite=${result.invitationToken}`,
          inviteeEmail: result.invitation.email,
          tenantName: result.tenant.name
        });
        setAddForm(defaultAddForm);
      }
    });
  }
  function handleEditSubmit() {
    if (!editTenant) return;
    updateTenant({
      tenantData: {
        config: {
          ...editTenant.config,
          auth: {
            ...editTenant.config.auth,
            allowSignup: editTenant.config.auth.allowSignup
          }
        },
        domain: editTenant.domain,
        name: editTenant.name,
        subscriptionStatus: editTenant.subscriptionStatus
      },
      tenantId: editTenant.id
    }, {
      onSuccess: () => setEditTenant(null)
    });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "flex-start", justify: "space-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "green", variant: "light", children: "Multi-tenant registry" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { mt: "sm", order: 1, children: "Tenants" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", maw: 760, mt: "sm", children: "SparkTool tenants are isolated workspaces with their own domain, branding, and access policy. This page manages registry-level information and the bootstrap configuration each tenant starts from." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }), className: "bg-[#006838] text-white hover:bg-[#006838]/90", onClick: () => setAddOpen(true), children: "Add Tenant" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SimpleGrid, { cols: {
      base: 1,
      md: 2,
      xl: 4
    }, spacing: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TenantStat, { label: "All Tenants", value: String((tenants ?? []).length) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TenantStat, { label: "Active", value: String((tenants ?? []).filter((tenant) => tenant.subscriptionStatus === "active").length) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TenantStat, { label: "Trial", value: String((tenants ?? []).filter((tenant) => tenant.subscriptionStatus === "trial").length) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TenantStat, { label: "Open Signup", value: String((tenants ?? []).filter((tenant) => tenant.config.auth.allowSignup).length) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "lg", radius: "lg", withBorder: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Tenant Registry" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Domains, access policy, and module footprint" })
      ] }),
      isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { size: "sm", color: "green" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { verticalSpacing: "md", horizontalSpacing: "md", className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Thead, { className: "border-b bg-stone-50 border-stone-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Tr, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { className: "text-xs font-semibold tracking-wide text-stone-500", children: "Tenant ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { className: "text-xs font-semibold tracking-wide text-stone-500", children: "Tenant" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { className: "text-xs font-semibold tracking-wide text-stone-500", children: "Domain" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { className: "text-xs font-semibold tracking-wide text-stone-500", children: "Access Policy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { className: "text-xs font-semibold tracking-wide text-stone-500", children: "Modules" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { className: "text-xs font-semibold tracking-wide text-stone-500", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { className: "text-xs font-semibold tracking-wide text-stone-500", children: "Admin Invite" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { className: "text-xs font-semibold tracking-wide text-right text-stone-500", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Tbody, { className: "text-sm", children: [
          (tenants ?? []).map((tenant) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Tr, { className: "transition-colors border-b border-stone-100 hover:bg-stone-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { className: "font-mono text-xs text-stone-500", children: tenant.id }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Td, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium text-stone-900", children: tenant.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: tenant.config.branding.portalName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { className: "font-mono text-xs text-stone-600", children: tenant.domain }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Td, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: tenant.config.auth.allowSignup ? "Self-service enabled" : "Invite only" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: tenant.config.auth.restrictedDomains.length > 0 ? `${tenant.config.auth.restrictedDomains.length} restricted domain${tenant.config.auth.restrictedDomains.length === 1 ? "" : "s"}` : "No explicit domain lock" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Td, { children: [
              countEnabledModules(tenant.config.modules),
              " enabled"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: statusColors[tenant.subscriptionStatus] ?? "gray", variant: "light", className: "font-medium capitalize", children: tenant.subscriptionStatus }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TenantInviteCell, { invitation: resolveLatestPendingInvitation(invitationMap[tenant.id] ?? []) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", gap: "xs", children: [
              resolveLatestManageableInvitation(invitationMap[tenant.id] ?? []) ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "subtle", color: "green", size: "xs", className: "text-[#006838] hover:bg-[#006838]/10", loading: isReissuing, onClick: () => {
                const invitation = resolveLatestManageableInvitation(invitationMap[tenant.id] ?? []);
                if (!invitation) return;
                reissueInvitation({
                  invitationId: invitation.id,
                  tenantId: tenant.id
                }, {
                  onSuccess: (result) => {
                    setOnboardingResult({
                      inviteLink: `${window.location.origin}/${tenant.id}/login?invite=${result.invitationToken}`,
                      inviteeEmail: result.invitation.email,
                      tenantName: tenant.name
                    });
                  }
                });
              }, children: "Reissue Invite" }) : null,
              resolveLatestPendingInvitation(invitationMap[tenant.id] ?? []) ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "subtle", color: "red", size: "xs", className: "text-red-600 hover:bg-red-50", loading: isRevoking, onClick: () => {
                const invitation = resolveLatestPendingInvitation(invitationMap[tenant.id] ?? []);
                if (!invitation) return;
                revokeInvitation({
                  invitationId: invitation.id,
                  tenantId: tenant.id
                });
              }, children: "Revoke Invite" }) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "subtle", color: "gray", size: "xs", className: "text-stone-600 hover:bg-stone-100", onClick: () => setEditTenant(tenant), children: "Edit" })
            ] }) })
          ] }, tenant.id)),
          !isLoading && (tenants ?? []).length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Tr, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { colSpan: 8, className: "py-10 text-center text-stone-400", children: "No tenants registered yet." }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { opened: addOpen, onClose: () => {
      setAddOpen(false);
      setAddForm(defaultAddForm);
    }, title: "Add New Tenant", centered: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "A tenant is not considered operational until it has an accountable first administrator. This flow creates the tenant and issues a one-time administrator invite instead of pre-creating a dormant account." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Tenant Name", placeholder: "e.g. Lagos Public Service Academy", required: true, value: addForm.name, onChange: (e) => {
        const name = e.currentTarget.value;
        setAddForm((prev) => ({
          ...prev,
          id: toSlug(name),
          name
        }));
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Tenant ID (Slug)", placeholder: "e.g. nigerian-correctional-service", required: true, value: addForm.id, onChange: (e) => setAddForm((prev) => ({
        ...prev,
        id: toSlug(e.currentTarget.value)
      })), description: "URL-safe identifier, auto-generated from name" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Primary Domain", placeholder: "e.g. corrections.gov.ng", required: true, value: addForm.domain, onChange: (e) => setAddForm((prev) => ({
        ...prev,
        domain: e.currentTarget.value
      })) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Subscription Status", data: [{
        label: "Trial",
        value: "trial"
      }, {
        label: "Active",
        value: "active"
      }, {
        label: "Inactive",
        value: "inactive"
      }], value: addForm.subscriptionStatus, onChange: (value) => setAddForm((prev) => ({
        ...prev,
        subscriptionStatus: value ?? "trial"
      })) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: addForm.allowSignup, label: "Allow self-service sign-up", onChange: (event) => setAddForm((prev) => ({
        ...prev,
        allowSignup: event.currentTarget.checked
      })) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 600, size: "sm", children: "Initial Tenant Administrator Invite" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: "This email receives the first admin redemption link for the new tenant workspace." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Invitee Name", placeholder: "e.g. Ada Nwosu", value: addForm.adminDisplayName, onChange: (e) => setAddForm((prev) => ({
        ...prev,
        adminDisplayName: e.currentTarget.value
      })) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Invitee Email Address", placeholder: "e.g. ada@tenant.org", required: true, value: addForm.adminEmail, onChange: (e) => setAddForm((prev) => ({
        ...prev,
        adminEmail: e.currentTarget.value
      })) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", mt: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "default", onClick: () => {
          setAddOpen(false);
          setAddForm(defaultAddForm);
        }, children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "green", loading: isCreating, disabled: !addForm.name || !addForm.id || !addForm.domain || !addForm.adminEmail, onClick: handleAddSubmit, children: "Create Tenant and Invite Admin" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { opened: onboardingResult !== null, onClose: () => setOnboardingResult(null), title: "Administrator Invite Ready", centered: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
        onboardingResult?.tenantName,
        " is now provisioned. Share this one-time invite with ",
        onboardingResult?.inviteeEmail,
        " so they can create the first tenant admin account."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Administrator invite link", readOnly: true, value: onboardingResult?.inviteLink ?? "" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CopyButton, { value: onboardingResult?.inviteLink ?? "", children: ({
        copied,
        copy
      }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "green", onClick: copy, children: copied ? "Invite link copied" : "Copy invite link" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { opened: editTenant !== null, onClose: () => setEditTenant(null), title: "Edit Tenant", centered: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Tenant Name", value: editTenant?.name ?? "", onChange: (e) => setEditTenant((prev) => prev ? {
        ...prev,
        name: e.currentTarget.value
      } : prev) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Domain", value: editTenant?.domain ?? "", onChange: (e) => setEditTenant((prev) => prev ? {
        ...prev,
        domain: e.currentTarget.value
      } : prev) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Subscription Status", data: [{
        label: "Trial",
        value: "trial"
      }, {
        label: "Active",
        value: "active"
      }, {
        label: "Inactive",
        value: "inactive"
      }], value: editTenant?.subscriptionStatus ?? null, onChange: (value) => setEditTenant((prev) => prev ? {
        ...prev,
        subscriptionStatus: value ?? "trial"
      } : prev) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: editTenant?.config.auth.allowSignup ?? false, label: "Allow self-service sign-up", onChange: (event) => setEditTenant((prev) => prev ? {
        ...prev,
        config: {
          ...prev.config,
          auth: {
            ...prev.config.auth,
            allowSignup: event.currentTarget.checked
          }
        }
      } : prev) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", mt: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "default", onClick: () => setEditTenant(null), children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "green", loading: isUpdating, onClick: handleEditSubmit, children: "Save Changes" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paper, { className: "bg-[#006838]/5 border border-[#006838]/20 p-4 rounded-lg", radius: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { size: 16, className: "text-[#006838]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-[#006838] text-sm font-medium", children: "New tenants now bootstrap from a platform-neutral SparkTool template instead of inheriting tenant-specific branding or missing placeholder files." })
    ] }) }) })
  ] }) });
}
function countEnabledModules(modules) {
  return Object.values(modules).filter(Boolean).length;
}
function buildInvitationMap(invitations) {
  return invitations.reduce((accumulator, invitation) => {
    if (!accumulator[invitation.tenantId]) {
      accumulator[invitation.tenantId] = [];
    }
    accumulator[invitation.tenantId].push(invitation);
    return accumulator;
  }, {});
}
function resolveLatestPendingInvitation(invitations) {
  return invitations.find((invitation) => invitation.status === "pending") ?? null;
}
function resolveLatestManageableInvitation(invitations) {
  return invitations.find((invitation) => invitation.status === "pending" || invitation.status === "revoked") ?? null;
}
function TenantInviteCell({
  invitation
}) {
  if (!invitation) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: "No active invite" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: invitation.email }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", children: [
      "Expires ",
      formatRelativeTime(invitation.expiresAt)
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: formatDateTime(invitation.expiresAt) })
  ] });
}
function TenantStat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "lg", radius: "lg", withBorder: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 2, children: value })
  ] });
}
export {
  TenantsOverview as component
};
