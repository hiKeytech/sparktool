import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { I as useAuthContext } from "./router-D664CQ4V.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { D as Container, y as Stack, E as Title, T as Text, H as Grid, aa as Paper, a3 as Avatar, a as Button, J as TextInput, G as Group } from "../_libs/mantine__core.mjs";
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
function AdminProfile() {
  const {
    user
  } = useAuthContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { size: "lg", py: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 2, children: "Profile Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", children: "Manage your personal information and account details" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 4
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paper, { p: "xl", radius: "md", withBorder: true, className: "text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { src: user?.photoURL, size: 120, radius: 120, color: "fun-green", className: "text-4xl", children: user?.displayName?.[0] || "A" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 600, size: "lg", children: user?.displayName || "Administrator" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", mt: 4, children: user?.email })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { fullWidth: true, variant: "light", mt: "md", children: "Change Avatar" })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 8
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paper, { p: "xl", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 4, children: "Personal Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "First Name", placeholder: "Your first name", defaultValue: user?.displayName?.split(" ")[0] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Last Name", placeholder: "Your last name", defaultValue: user?.displayName?.split(" ")[1] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 12, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Email Address", placeholder: "your@email.com", defaultValue: user?.email || "", disabled: true }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 12, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Role", defaultValue: "Administrator", disabled: true }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { justify: "flex-end", mt: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Save Changes" }) })
      ] }) }) })
    ] })
  ] }) });
}
export {
  AdminProfile as component
};
