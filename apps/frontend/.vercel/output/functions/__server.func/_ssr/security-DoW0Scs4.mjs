import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { I as useAuthContext, S as useChangePassword, U as changePasswordSchema } from "./router-D664CQ4V.mjs";
import { z as zod4Resolver } from "../_libs/mantine-form-zod-resolver.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { u as useForm } from "../_libs/mantine__form.mjs";
import { D as Container, y as Stack, E as Title, T as Text, H as Grid, aa as Paper, G as Group, a8 as PasswordInput, a as Button, $ as Alert } from "../_libs/mantine__core.mjs";
import { ab as IconShieldCheck, ac as IconDeviceDesktop, I as IconCheck, b as IconAlertCircle } from "../_libs/tabler__icons-react.mjs";
import { n as notifications } from "../_libs/mantine__notifications.mjs";
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
import "../_libs/tanstack__react-table.mjs";
import "../_libs/tanstack__table-core.mjs";
import "../_libs/date-fns.mjs";
import "../_libs/mantine__modals.mjs";
import "../_libs/mantine__hooks.mjs";
import "../_libs/zod.mjs";
import "node:async_hooks";
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
import "../_libs/klona.mjs";
import "../_libs/fast-deep-equal.mjs";
function AdminSecurity() {
  const {
    sessionStartTime,
    user
  } = useAuthContext();
  const changePasswordMutation = useChangePassword();
  const passwordForm = useForm({
    initialValues: {
      confirmPassword: "",
      currentPassword: "",
      newPassword: ""
    },
    validate: zod4Resolver(changePasswordSchema)
  });
  const handlePasswordChange = async (values) => {
    await changePasswordMutation.mutateAsync(values, {
      onError: (error) => {
        notifications.show({
          color: "red",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 16 }),
          message: error.message || "Failed to update password.",
          title: "Password Update Failed"
        });
      },
      onSuccess: () => {
        notifications.show({
          color: "green",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: 16 }),
          message: "Your password has been updated successfully.",
          title: "Password Updated"
        });
        passwordForm.reset();
      }
    });
  };
  const sessionStartedLabel = sessionStartTime ? new Date(sessionStartTime).toLocaleString() : "Current session";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { size: "lg", py: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 2, children: "Security Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", children: "Manage password and security preferences" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 8
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Paper, { component: "form", onSubmit: passwordForm.onSubmit(handlePasswordChange), p: "xl", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconShieldCheck, { size: 24, className: "text-fun-green-600" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 4, children: "Change Password" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordInput, { label: "Current Password", placeholder: "Enter current password", ...passwordForm.getInputProps("currentPassword") }, passwordForm.key("currentPassword")),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordInput, { label: "New Password", placeholder: "Enter new password", ...passwordForm.getInputProps("newPassword") }, passwordForm.key("newPassword")),
            /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordInput, { label: "Confirm New Password", placeholder: "Confirm new password", ...passwordForm.getInputProps("confirmPassword") }, passwordForm.key("confirmPassword"))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { justify: "flex-end", mt: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { loading: changePasswordMutation.isPending, type: "submit", children: "Update Password" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Paper, { p: "xl", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 4, children: "Two-Factor Authentication" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "blue", title: "Enhanced Security", children: "Two-factor authentication adds an extra layer of security to your account." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", align: "center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, children: "Two-Factor Authentication (2FA)" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", c: "dimmed", children: "Managed at the platform level for administrator accounts" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: true, variant: "light", children: "Managed by Platform Admins" })
          ] })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 4
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "xl", radius: "md", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 4, mb: "md", children: "Active Sessions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconDeviceDesktop, { size: 32, className: "text-gray-400" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
              flex: 1
            }, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", fw: 500, children: user?.email || "Administrator session" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "xs", c: "green", children: "Current Session" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", children: [
                "Started: ",
                sessionStartedLabel
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "blue", title: "Session visibility", children: "Additional session management is not yet exposed in the tenant admin API. This page shows the verified active session instead of placeholder devices." })
        ] })
      ] }) })
    ] })
  ] }) });
}
export {
  AdminSecurity as component
};
