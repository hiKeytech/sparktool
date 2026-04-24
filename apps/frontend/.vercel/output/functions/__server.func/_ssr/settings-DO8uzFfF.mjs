import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { D as Container, y as Stack, E as Title, T as Text, aa as Paper, G as Group, ab as Switch, ag as Divider, a as Button } from "../_libs/mantine__core.mjs";
import { a1 as IconPalette, a8 as IconGlobe, a9 as IconMoon, S as IconBell, aa as IconLock } from "../_libs/tabler__icons-react.mjs";
import "../_libs/mantine__hooks.mjs";
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
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/react-number-format.mjs";
import "../_libs/floating-ui__react.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
function AdminSettings() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { size: "lg", py: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 2, children: "System Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", children: "Manage platform-wide configurations and preferences" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "md", withBorder: true, radius: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { justify: "space-between", mb: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconPalette, { size: 20, className: "text-blue-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, children: "Appearance" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", c: "dimmed", children: "Customize the look and feel of the dashboard" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: "Dark Mode" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { size: "md", onLabel: /* @__PURE__ */ jsxRuntimeExports.jsx(IconMoon, { size: 14 }), offLabel: /* @__PURE__ */ jsxRuntimeExports.jsx(IconGlobe, { size: 14 }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: "Compact View" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { size: "md" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "md", withBorder: true, radius: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { justify: "space-between", mb: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconBell, { size: 20, className: "text-orange-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, children: "Notifications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", c: "dimmed", children: "Configure system alerts and email notifications" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: "Email Notifications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true, size: "md" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: "Push Notifications" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true, size: "md" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "md", withBorder: true, radius: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconLock, { size: 20, className: "text-red-500" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, children: "Access Control" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", c: "dimmed", children: "Manage roles and permissions" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "light", size: "xs", children: "Manage Roles" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", c: "dimmed", children: "Current system has 3 defined roles: Admin, Instructor, and Student." })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "default", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "Save Changes" })
    ] })
  ] }) });
}
export {
  AdminSettings as component
};
