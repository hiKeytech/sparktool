import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { H as Route$v, I as useAuthContext, J as useUserProgress, P as PendingOverlay } from "./router-D664CQ4V.mjs";
import { N as NotificationsDrawer } from "./notifications-drawer-_Ca04YBO.mjs";
import { N as NCSLogo } from "./ncs-logo-Drvs_Prq.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { o as useDisclosure } from "../_libs/mantine__hooks.mjs";
import { D as Container, G as Group, a3 as Avatar, T as Text, E as Title, a as Button, H as Grid, y as Stack, F as Card, R as Progress, i as SimpleGrid } from "../_libs/mantine__core.mjs";
import { _ as IconMessage, J as IconSettings, p as IconTrendingUp, g as IconClock } from "../_libs/tabler__icons-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
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
function StudentDashboard() {
  const {
    tenant
  } = Route$v.useRouteContext();
  const {
    user
  } = useAuthContext();
  const navigate = useNavigate();
  const [notificationsOpened, {
    close: closeNotifications,
    open: openNotifications
  }] = useDisclosure(false);
  const {
    data: userProgress,
    isLoading: progressLoading
  } = useUserProgress(tenant.id, user?.uid);
  const completedCourses = userProgress?.filter(({
    status
  }) => status === "completed").length || 0;
  const inProgressCourses = userProgress?.filter(({
    status
  }) => status === "in-progress").length || 0;
  const totalCourses = userProgress?.length || 0;
  const overallProgress = totalCourses > 0 ? Math.round(completedCourses / totalCourses * 100) : 0;
  if (progressLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PendingOverlay, { reason: "Loading dashboard...", visible: progressLoading });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Container, { py: "lg", size: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-duration": "600", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", mb: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { color: "fun-green", size: "md", src: user?.photoURL, children: user?.displayName?.[0] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Home / Portal" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Title, { className: "text-gray-800", order: 2, children: [
            "Welcome back, ",
            user?.displayName
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "fun-green", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconMessage, { size: 16 }), onClick: openNotifications, variant: "light", children: "Messages" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-fun-green-800 hover:bg-fun-green-700", color: "fun-green", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSettings, { size: 16 }), onClick: () => tenant.id && navigate({
          params: {
            tenant: tenant.id
          },
          to: "/$tenant/student/profile"
        }), variant: "filled", children: "Settings" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { gutter: "lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 8
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-delay": "100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "text-white bg-linear-to-r from-fun-green-600 to-fun-green-700", p: "xl", radius: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "flex-start", justify: "space-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mb-2 text-fun-green-100", size: "sm", children: "My Learning Progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4 text-white", order: 3, children: "Course Progress Overview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", mb: "md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrendingUp, { className: "text-fun-green-200", size: 16 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-fun-green-100", size: "sm", children: [
                overallProgress,
                "% Complete"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "text-fun-green-700", color: "fun-green", onClick: () => tenant.id && navigate({
              params: {
                tenant: tenant.id
              },
              to: "/$tenant/student/courses"
            }), size: "sm", variant: "white", children: "Continue Learning" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "leading-none text-white", fw: 700, size: "3rem", children: [
              overallProgress,
              "%"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { className: "w-24 mt-2", color: "white", radius: "xl", size: "lg", value: overallProgress })
          ] })
        ] }) }) }),
        userProgress && userProgress.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-delay": "200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { p: "lg", radius: "lg", withBorder: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "text-gray-800", mb: "md", order: 4, children: "Current Courses" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "md", children: userProgress.slice(0, 3).map((progress, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-aos": "fade-up", "data-aos-delay": index * 100 + 300, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-gray-800", fw: 500, children: [
                  index + 1,
                  ". Course ",
                  progress.courseId
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
                  "Status: ",
                  progress.status
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: progress.completionPercentage >= 50 ? "text-fun-green-600" : "text-orange-500", fw: 600, size: "lg", children: [
                progress.completionPercentage,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { className: "mb-3", color: progress.completionPercentage >= 50 ? "fun-green" : "orange", radius: "xl", size: "sm", value: progress.completionPercentage })
          ] }, progress.courseId)) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-delay": "300", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "text-center bg-gray-50", p: "lg", radius: "lg", withBorder: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-16 h-16 mx-auto mb-3 rounded-full bg-fun-green-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NCSLogo, { size: 44 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-1 text-gray-800", order: 4, children: "Nigerian Correctional Service" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "E-Learning Platform" })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 4
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-delay": "200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { p: "lg", radius: "lg", withBorder: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "text-gray-800", mb: "md", order: 4, children: "Progress Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SimpleGrid, { cols: 1, spacing: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 text-center rounded-lg bg-fun-green-50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-fun-green-600", fw: 700, size: "xl", children: completedCourses }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Completed Courses" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 text-center rounded-lg bg-blue-50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-blue-600", fw: 700, size: "xl", children: inProgressCourses }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "In Progress" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 text-center rounded-lg bg-gray-50", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", fw: 700, size: "xl", children: totalCourses }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Total Enrolled" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-delay": "300", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { p: "lg", radius: "lg", withBorder: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "text-gray-800", mb: "md", order: 4, children: "Recent Activity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "md", children: userProgress?.slice(0, 2).map((progress) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mb-1 text-gray-800", fw: 500, size: "sm", children: "Course Progress Updated" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "mb-2 text-gray-600", size: "sm", children: [
              "Course ",
              progress.courseId,
              " -",
              " ",
              progress.completionPercentage,
              "% complete"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { className: "text-gray-400", size: 12 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: progress.lastAccessedAt ? new Date(progress.lastAccessedAt).toLocaleDateString() : "Recently updated" })
            ] })
          ] }, progress.courseId)) || /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "No recent activity" }) })
        ] }) })
      ] }) })
    ] }),
    user?.uid && /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationsDrawer, { onClose: closeNotifications, opened: notificationsOpened, userId: user.uid })
  ] });
}
export {
  StudentDashboard as component
};
