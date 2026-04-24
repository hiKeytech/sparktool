import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as useNotifications, C as useMarkAllNotificationsAsRead, D as useMarkNotificationAsRead } from "./router-D664CQ4V.mjs";
import { ah as Drawer, S as ScrollArea, x as Center, z as Loader, $ as Alert, y as Stack, T as Text, G as Group, Q as Badge, a as Button, F as Card, a3 as Avatar, p as ActionIcon } from "../_libs/mantine__core.mjs";
import { T as IconExclamationCircle, S as IconBell, U as IconChecks, I as IconCheck, z as IconTrophy } from "../_libs/tabler__icons-react.mjs";
import { f as formatDistanceToNow } from "../_libs/date-fns.mjs";
function NotificationsDrawer({
  onClose,
  opened,
  userId
}) {
  const { data: notifications, error, isLoading } = useNotifications(userId);
  const markAllAsRead = useMarkAllNotificationsAsRead();
  const handleMarkAllAsRead = () => {
    markAllAsRead.mutate(userId);
  };
  const unreadCount = notifications?.filter((n) => !n.isRead).length || 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Drawer,
    {
      onClose,
      opened,
      overlayProps: { backgroundOpacity: 0.3 },
      position: "right",
      size: "md",
      title: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { className: "w-full", justify: "space-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconBell, { size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 600, size: "lg", children: "Notifications" }),
          unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "red", size: "sm", variant: "filled", children: unreadCount })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { gap: "xs", children: unreadCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconChecks, { size: 14 }),
            loading: markAllAsRead.isPending,
            onClick: handleMarkAllAsRead,
            size: "xs",
            variant: "subtle",
            children: "Mark all read"
          }
        ) })
      ] }),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { className: "h-full", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Center, { className: "py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { size: "md" }) }) : error ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        Alert,
        {
          color: "red",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconExclamationCircle, { size: 16 }),
          title: "Error",
          children: "Failed to load notifications. Please try again."
        }
      ) : notifications && notifications.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "sm", children: notifications.map((notification) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        NotificationItem,
        {
          notification
        },
        notification.id
      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Center, { className: "py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconBell, { className: "text-gray-300", size: 48 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-500", size: "sm", children: "No notifications yet" })
      ] }) }) })
    }
  );
}
function NotificationItem({ notification }) {
  const markAsRead = useMarkNotificationAsRead();
  const handleMarkAsRead = () => {
    if (!notification.isRead) {
      markAsRead.mutate(notification.id);
    }
  };
  const getNotificationIcon = () => {
    switch (notification.category) {
      case "achievement":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrophy, { className: "text-yellow-500", size: 20 });
      case "message":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconBell, { className: "text-blue-500", size: 20 });
      case "system":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconExclamationCircle, { className: "text-gray-500", size: 20 });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconBell, { className: "text-blue-500", size: 20 });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: `border-l-4 ${notification.isRead ? "border-l-gray-200 bg-white" : "border-l-fun-green-500 bg-fun-green-50"}`,
      padding: "md",
      radius: "sm",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "flex-start", gap: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "bg-gray-100", radius: "xl", size: "sm", children: getNotificationIcon() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "flex-start", justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Text,
                {
                  className: "text-gray-900",
                  fw: notification.isRead ? 400 : 600,
                  size: "sm",
                  children: notification.title
                }
              ),
              notification.fromUserName && /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-gray-500", size: "xs", children: [
                "From: ",
                notification.fromUserName
              ] })
            ] }),
            !notification.isRead && /* @__PURE__ */ jsxRuntimeExports.jsx(
              ActionIcon,
              {
                loading: markAsRead.isPending,
                onClick: handleMarkAsRead,
                size: "sm",
                variant: "subtle",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: 14 })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mt-1 text-gray-700", size: "sm", children: notification.message }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mt-2 text-gray-400", size: "xs", children: formatDistanceToNow(new Date(notification.createdAt), {
            addSuffix: true
          }) })
        ] })
      ] })
    }
  );
}
export {
  NotificationsDrawer as N
};
