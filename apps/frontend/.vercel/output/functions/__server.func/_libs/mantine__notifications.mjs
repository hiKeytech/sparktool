import { r as reactExports, j as jsxRuntimeExports } from "./react.mjs";
import { N as Notification, f as factory, g as getDefaultZIndex, u as useProps, b as useMantineTheme, d as useStyles, O as OptionalPortal, B as Box, e as createVarsResolver, r as rem } from "./mantine__core.mjs";
import { s as randomId, t as useForceUpdate, b as useReducedMotion, a as useDidUpdate } from "./mantine__hooks.mjs";
import { c as createStore, u as useStore } from "./mantine__store.mjs";
import { T as Transition$1, a as TransitionGroup } from "./react-transition-group.mjs";
import { R as ReactRemoveScroll } from "./react-remove-scroll.mjs";
function getDistributedNotifications(data, defaultPosition, limit) {
  const queue = [];
  const notifications2 = [];
  const count = {};
  for (const item of data) {
    const position = item.position || defaultPosition;
    count[position] = count[position] || 0;
    count[position] += 1;
    if (count[position] <= limit) {
      notifications2.push(item);
    } else {
      queue.push(item);
    }
  }
  return { notifications: notifications2, queue };
}
const createNotificationsStore = () => createStore({
  notifications: [],
  queue: [],
  defaultPosition: "bottom-right",
  limit: 5
});
const notificationsStore = createNotificationsStore();
const useNotifications = (store = notificationsStore) => useStore(store);
function updateNotificationsState(store, update) {
  const state = store.getState();
  const notifications2 = update([...state.notifications, ...state.queue]);
  const updated = getDistributedNotifications(notifications2, state.defaultPosition, state.limit);
  store.setState({
    notifications: updated.notifications,
    queue: updated.queue,
    limit: state.limit,
    defaultPosition: state.defaultPosition
  });
}
function showNotification(notification, store = notificationsStore) {
  const id = notification.id || randomId();
  updateNotificationsState(store, (notifications2) => {
    if (notification.id && notifications2.some((n) => n.id === notification.id)) {
      return notifications2;
    }
    return [...notifications2, { ...notification, id }];
  });
  return id;
}
function hideNotification(id, store = notificationsStore) {
  updateNotificationsState(
    store,
    (notifications2) => notifications2.filter((notification) => {
      if (notification.id === id) {
        notification.onClose?.(notification);
        return false;
      }
      return true;
    })
  );
  return id;
}
function updateNotification(notification, store = notificationsStore) {
  updateNotificationsState(
    store,
    (notifications2) => notifications2.map((item) => {
      if (item.id === notification.id) {
        return { ...item, ...notification };
      }
      return item;
    })
  );
  return notification.id;
}
function cleanNotifications(store = notificationsStore) {
  updateNotificationsState(store, () => []);
}
function cleanNotificationsQueue(store = notificationsStore) {
  updateNotificationsState(
    store,
    (notifications2) => notifications2.slice(0, store.getState().limit)
  );
}
const notifications = {
  show: showNotification,
  hide: hideNotification,
  update: updateNotification,
  clean: cleanNotifications,
  cleanQueue: cleanNotificationsQueue,
  updateState: updateNotificationsState
};
const positions = [
  "bottom-center",
  "bottom-left",
  "bottom-right",
  "top-center",
  "top-left",
  "top-right"
];
function getGroupedNotifications(notifications2, defaultPosition) {
  return notifications2.reduce(
    (acc, notification) => {
      acc[notification.position || defaultPosition].push(notification);
      return acc;
    },
    positions.reduce((acc, item) => {
      acc[item] = [];
      return acc;
    }, {})
  );
}
const transforms = {
  left: "translateX(-100%)",
  right: "translateX(100%)",
  "top-center": "translateY(-100%)",
  "bottom-center": "translateY(100%)"
};
const noTransform = {
  left: "translateX(0)",
  right: "translateX(0)",
  "top-center": "translateY(0)",
  "bottom-center": "translateY(0)"
};
function getNotificationStateStyles({
  state,
  maxHeight,
  position,
  transitionDuration
}) {
  const [vertical, horizontal] = position.split("-");
  const property = horizontal === "center" ? `${vertical}-center` : horizontal;
  const commonStyles = {
    opacity: 0,
    maxHeight,
    transform: transforms[property],
    transitionDuration: `${transitionDuration}ms, ${transitionDuration}ms, ${transitionDuration}ms`,
    transitionTimingFunction: "cubic-bezier(.51,.3,0,1.21), cubic-bezier(.51,.3,0,1.21), linear",
    transitionProperty: "opacity, transform, max-height"
  };
  const inState = {
    opacity: 1,
    transform: noTransform[property]
  };
  const outState = {
    opacity: 0,
    maxHeight: 0,
    transform: transforms[property]
  };
  const transitionStyles = {
    entering: inState,
    entered: inState,
    exiting: outState,
    exited: outState
  };
  return { ...commonStyles, ...transitionStyles[state] };
}
function getAutoClose(autoClose, notificationAutoClose) {
  if (typeof notificationAutoClose === "number") {
    return notificationAutoClose;
  }
  if (notificationAutoClose === false || autoClose === false) {
    return false;
  }
  return autoClose;
}
const NotificationContainer = reactExports.forwardRef(
  ({ data, onHide, autoClose, ...others }, ref) => {
    const { autoClose: _autoClose, message, ...notificationProps } = data;
    const autoCloseDuration = getAutoClose(autoClose, data.autoClose);
    const autoCloseTimeout = reactExports.useRef(-1);
    const cancelAutoClose = () => window.clearTimeout(autoCloseTimeout.current);
    const handleHide = () => {
      onHide(data.id);
      cancelAutoClose();
    };
    const handleAutoClose = () => {
      if (typeof autoCloseDuration === "number") {
        autoCloseTimeout.current = window.setTimeout(handleHide, autoCloseDuration);
      }
    };
    reactExports.useEffect(() => {
      data.onOpen?.(data);
    }, []);
    reactExports.useEffect(() => {
      handleAutoClose();
      return cancelAutoClose;
    }, [autoCloseDuration]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Notification,
      {
        ...others,
        ...notificationProps,
        onClose: handleHide,
        ref,
        onMouseEnter: cancelAutoClose,
        onMouseLeave: handleAutoClose,
        children: message
      }
    );
  }
);
NotificationContainer.displayName = "@mantine/notifications/NotificationContainer";
var classes = { "root": "m_b37d9ac7", "notification": "m_5ed0edd0" };
const Transition = Transition$1;
const defaultProps = {
  position: "bottom-right",
  autoClose: 4e3,
  transitionDuration: 250,
  containerWidth: 440,
  notificationMaxHeight: 200,
  limit: 5,
  zIndex: getDefaultZIndex("overlay"),
  store: notificationsStore,
  withinPortal: true
};
const varsResolver = createVarsResolver((_, { zIndex, containerWidth }) => ({
  root: {
    "--notifications-z-index": zIndex?.toString(),
    "--notifications-container-width": rem(containerWidth)
  }
}));
const Notifications = factory((_props, ref) => {
  const props = useProps("Notifications", defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    position,
    autoClose,
    transitionDuration,
    containerWidth,
    notificationMaxHeight,
    limit,
    zIndex,
    store,
    portalProps,
    withinPortal,
    ...others
  } = props;
  const theme = useMantineTheme();
  const data = useNotifications(store);
  const forceUpdate = useForceUpdate();
  const shouldReduceMotion = useReducedMotion();
  const refs = reactExports.useRef({});
  const previousLength = reactExports.useRef(0);
  const reduceMotion = theme.respectReducedMotion ? shouldReduceMotion : false;
  const duration = reduceMotion ? 1 : transitionDuration;
  const getStyles = useStyles({
    name: "Notifications",
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver
  });
  reactExports.useEffect(() => {
    store?.updateState((current) => ({
      ...current,
      limit: limit || 5,
      defaultPosition: position
    }));
  }, [limit, position]);
  useDidUpdate(() => {
    if (data.notifications.length > previousLength.current) {
      setTimeout(() => forceUpdate(), 0);
    }
    previousLength.current = data.notifications.length;
  }, [data.notifications]);
  const grouped = getGroupedNotifications(data.notifications, position);
  const groupedComponents = positions.reduce(
    (acc, pos) => {
      acc[pos] = grouped[pos].map(({ style: notificationStyle, ...notification }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Transition,
        {
          timeout: duration,
          onEnter: () => refs.current[notification.id].offsetHeight,
          nodeRef: { current: refs.current[notification.id] },
          children: (state) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            NotificationContainer,
            {
              ref: (node) => {
                if (node) {
                  refs.current[notification.id] = node;
                }
              },
              data: notification,
              onHide: (id) => hideNotification(id, store),
              autoClose,
              ...getStyles("notification", {
                style: {
                  ...getNotificationStateStyles({
                    state,
                    position: pos,
                    transitionDuration: duration,
                    maxHeight: notificationMaxHeight
                  }),
                  ...notificationStyle
                }
              })
            }
          )
        },
        notification.id
      ));
      return acc;
    },
    {}
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(OptionalPortal, { withinPortal, ...portalProps, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ...getStyles("root"), "data-position": "top-center", ref, ...others, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TransitionGroup, { children: groupedComponents["top-center"] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ...getStyles("root"), "data-position": "top-left", ...others, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TransitionGroup, { children: groupedComponents["top-left"] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Box,
      {
        ...getStyles("root", { className: ReactRemoveScroll.classNames.fullWidth }),
        "data-position": "top-right",
        ...others,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(TransitionGroup, { children: groupedComponents["top-right"] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Box,
      {
        ...getStyles("root", { className: ReactRemoveScroll.classNames.fullWidth }),
        "data-position": "bottom-right",
        ...others,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(TransitionGroup, { children: groupedComponents["bottom-right"] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ...getStyles("root"), "data-position": "bottom-left", ...others, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TransitionGroup, { children: groupedComponents["bottom-left"] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ...getStyles("root"), "data-position": "bottom-center", ...others, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TransitionGroup, { children: groupedComponents["bottom-center"] }) })
  ] });
});
Notifications.classes = classes;
Notifications.displayName = "@mantine/notifications/Notifications";
Notifications.show = notifications.show;
Notifications.hide = notifications.hide;
Notifications.update = notifications.update;
Notifications.clean = notifications.clean;
Notifications.cleanQueue = notifications.cleanQueue;
Notifications.updateState = notifications.updateState;
export {
  Notifications as N,
  notifications as n
};
