import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { z as useUnreadNotificationsCount } from "./router-D664CQ4V.mjs";
import { N as NotificationsDrawer } from "./notifications-drawer-_Ca04YBO.mjs";
import { o as useDisclosure } from "../_libs/mantine__hooks.mjs";
import { G as Group, p as ActionIcon, Q as Badge } from "../_libs/mantine__core.mjs";
import { S as IconBell } from "../_libs/tabler__icons-react.mjs";
function NotificationBell({ userId }) {
  const [opened, { close, open }] = useDisclosure(false);
  const { data: unreadCount = 0 } = useUnreadNotificationsCount(userId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { className: "relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      ActionIcon,
      {
        className: "text-white hover:bg-fun-green-700",
        onClick: open,
        size: "lg",
        variant: "light",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconBell, { size: 20 }),
          unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              className: "absolute h-5 text-xs -top-1 -right-1 min-w-5",
              color: "red",
              size: "xs",
              variant: "filled",
              children: unreadCount > 99 ? "99+" : unreadCount
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationsDrawer, { onClose: close, opened, userId })
  ] });
}
export {
  NotificationBell as N
};
