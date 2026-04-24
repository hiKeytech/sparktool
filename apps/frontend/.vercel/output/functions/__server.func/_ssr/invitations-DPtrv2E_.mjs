import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { l as useTenantAdminInvitations, e as useTenants, n as useReissueTenantAdminInvitation, o as useRevokeTenantAdminInvitation, i as formatRelativeTime, j as formatDateTime } from "./router-D664CQ4V.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { D as Container, G as Group, z as Loader, y as Stack, Q as Badge, E as Title, T as Text, i as SimpleGrid, $ as Alert, aa as Paper, J as TextInput, K as Select, X as Table, a as Button, M as Modal, ac as CopyButton } from "../_libs/mantine__core.mjs";
import { H as History, M as Mail } from "../_libs/lucide-react.mjs";
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
function InvitationHistoryPage() {
  const [search, setSearch] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState("all");
  const [reissuedLink, setReissuedLink] = reactExports.useState(null);
  const {
    data: invitations = [],
    isLoading: invitationsLoading
  } = useTenantAdminInvitations();
  const {
    data: tenants = [],
    isLoading: tenantsLoading
  } = useTenants();
  const {
    isPending: isReissuing,
    mutate: reissueInvitation
  } = useReissueTenantAdminInvitation();
  const {
    isPending: isRevoking,
    mutate: revokeInvitation
  } = useRevokeTenantAdminInvitation();
  const tenantMap = reactExports.useMemo(() => buildTenantMap(tenants), [tenants]);
  const filteredInvitations = reactExports.useMemo(() => {
    const needle = search.trim().toLowerCase();
    return invitations.filter((invitation) => {
      const tenantLabel = resolveTenantName(invitation.tenantId, tenantMap);
      const statusMatches = status === "all" || invitation.status === status;
      const searchMatches = needle.length === 0 || invitation.email.toLowerCase().includes(needle) || (invitation.displayName ?? "").toLowerCase().includes(needle) || tenantLabel.toLowerCase().includes(needle);
      return statusMatches && searchMatches;
    });
  }, [invitations, search, status, tenantMap]);
  if (invitationsLoading || tenantsLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { justify: "center", py: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { color: "green" }) }) });
  }
  const pendingCount = invitations.filter((entry) => entry.status === "pending").length;
  const redeemedCount = invitations.filter((entry) => entry.status === "redeemed").length;
  const revokedCount = invitations.filter((entry) => entry.status === "revoked").length;
  const expiredCount = invitations.filter((entry) => entry.status === "expired").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "green", variant: "light", children: "Invitation governance" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { mt: "sm", order: 1, children: "Administrator Invitations" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", maw: 760, mt: "sm", children: "Review tenant administrator invitations across the platform, track whether they were redeemed, revoked, or allowed to expire, and reissue fresh links when onboarding stalls." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SimpleGrid, { cols: {
      base: 1,
      md: 2,
      xl: 4
    }, spacing: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(InvitationStat, { label: "Pending", value: String(pendingCount) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InvitationStat, { label: "Redeemed", value: String(redeemedCount) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InvitationStat, { label: "Revoked", value: String(revokedCount) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(InvitationStat, { label: "Expired", value: String(expiredCount) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "blue", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { size: 16 }), title: "Token model", children: "Invite links are one-way hashed after issuance. That means SparkTool can audit the invitation and enforce redemption or revocation, but it cannot show the original link again. Reissuing creates a fresh token and invalidates the previous pending link." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "lg", radius: "lg", withBorder: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", wrap: "wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Invitation History" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { placeholder: "Search invitee or tenant", value: search, onChange: (event) => setSearch(event.currentTarget.value) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { allowDeselect: false, data: [{
            label: "All statuses",
            value: "all"
          }, {
            label: "Pending",
            value: "pending"
          }, {
            label: "Redeemed",
            value: "redeemed"
          }, {
            label: "Revoked",
            value: "revoked"
          }, {
            label: "Expired",
            value: "expired"
          }], value: status, onChange: (value) => setStatus(value || "all") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { highlightOnHover: true, verticalSpacing: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Thead, { className: "border-b bg-stone-50 border-stone-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Tr, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { className: "text-xs font-semibold tracking-wide text-stone-500", children: "Invitee" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { className: "text-xs font-semibold tracking-wide text-stone-500", children: "Tenant" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { className: "text-xs font-semibold tracking-wide text-stone-500", children: "Status" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { className: "text-xs font-semibold tracking-wide text-stone-500", children: "Issued" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { className: "text-xs font-semibold tracking-wide text-stone-500", children: "Outcome" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Th, { className: "text-xs font-semibold tracking-wide text-right text-stone-500", children: "Actions" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Tbody, { className: "text-sm", children: [
          filteredInvitations.map((invitation) => {
            const tenantName = resolveTenantName(invitation.tenantId, tenantMap);
            const isPending = invitation.status === "pending";
            const isReissuable = invitation.status === "pending" || invitation.status === "revoked" || invitation.status === "expired";
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Tr, { className: "transition-colors border-b border-stone-100 hover:bg-stone-50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Td, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 600, size: "sm", children: invitation.displayName || invitation.email }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: invitation.email })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Td, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: tenantName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: invitation.tenantId })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: statusColor(invitation.status), variant: "light", className: "font-medium capitalize", children: invitation.status }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Table.Td, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: formatRelativeTime(invitation.createdAt) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: formatDateTime(invitation.createdAt) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(OutcomeCell, { invitation }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", gap: "xs", children: [
                isReissuable ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "subtle", color: "green", size: "xs", className: "text-[#006838] hover:bg-[#006838]/10", loading: isReissuing, onClick: () => {
                  reissueInvitation({
                    invitationId: invitation.id,
                    tenantId: invitation.tenantId
                  }, {
                    onSuccess: (result) => {
                      setReissuedLink({
                        email: result.invitation.email,
                        inviteLink: `${window.location.origin}/${invitation.tenantId}/login?invite=${result.invitationToken}`,
                        tenantName
                      });
                    }
                  });
                }, children: "Reissue" }) : null,
                isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "subtle", color: "red", size: "xs", className: "text-red-600 hover:bg-red-50", loading: isRevoking, onClick: () => {
                  revokeInvitation({
                    invitationId: invitation.id,
                    tenantId: invitation.tenantId
                  });
                }, children: "Revoke" }) : null
              ] }) })
            ] }, invitation.id);
          }),
          filteredInvitations.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Tr, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { colSpan: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", py: "xl", ta: "center", children: "No administrator invitations matched the current filter." }) }) }) : null
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { opened: reissuedLink !== null, onClose: () => setReissuedLink(null), title: "Fresh Invitation Ready", centered: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
        "A new invite has been issued for ",
        reissuedLink?.email,
        " in",
        " ",
        reissuedLink?.tenantName,
        ". Share the link below. The old pending link is no longer the active onboarding path."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Administrator invite link", readOnly: true, value: reissuedLink?.inviteLink ?? "" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CopyButton, { value: reissuedLink?.inviteLink ?? "", children: ({
        copied,
        copy
      }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "green", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { size: 16 }), onClick: copy, children: copied ? "Invite link copied" : "Copy invite link" }) })
    ] }) })
  ] }) });
}
function buildTenantMap(tenants) {
  return tenants.reduce((accumulator, tenant) => {
    accumulator[tenant.id] = tenant;
    return accumulator;
  }, {});
}
function resolveTenantName(tenantId, tenantMap) {
  return tenantMap[tenantId]?.name || tenantId;
}
function statusColor(status) {
  switch (status) {
    case "pending":
      return "green";
    case "redeemed":
      return "blue";
    case "revoked":
      return "red";
    default:
      return "yellow";
  }
}
function OutcomeCell({
  invitation
}) {
  if (invitation.status === "redeemed") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { size: "sm", children: [
        "Redeemed ",
        formatRelativeTime(invitation.redeemedAt)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: formatDateTime(invitation.redeemedAt) })
    ] });
  }
  if (invitation.status === "revoked") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { size: "sm", children: [
        "Revoked ",
        formatRelativeTime(invitation.revokedAt)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: formatDateTime(invitation.revokedAt) })
    ] });
  }
  if (invitation.status === "expired") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { size: "sm", children: [
        "Expired ",
        formatRelativeTime(invitation.expiresAt)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: formatDateTime(invitation.expiresAt) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { size: "sm", children: [
      "Expires ",
      formatRelativeTime(invitation.expiresAt)
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: formatDateTime(invitation.expiresAt) })
  ] });
}
function InvitationStat({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "lg", radius: "lg", withBorder: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 2, children: value })
  ] });
}
export {
  InvitationHistoryPage as component
};
