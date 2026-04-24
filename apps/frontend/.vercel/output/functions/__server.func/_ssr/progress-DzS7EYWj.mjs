import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Route$t, I as useAuthContext, O as useListStudentProgress, P as PendingOverlay } from "./router-D664CQ4V.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { D as Container, y as Stack, E as Title, T as Text, i as SimpleGrid, F as Card, a4 as RingProgress, x as Center, a2 as ThemeIcon, G as Group, Q as Badge } from "../_libs/mantine__core.mjs";
import { g as IconClock, o as IconBook } from "../_libs/tabler__icons-react.mjs";
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
function StudentProgress() {
  const {
    tenant
  } = Route$t.useRouteContext();
  const {
    user
  } = useAuthContext();
  const {
    data: progressData,
    isLoading
  } = useListStudentProgress(tenant.id, user?.uid);
  const completedCourses = progressData?.filter(({
    status
  }) => status === "completed").length || 0;
  const inProgressCourses = progressData?.filter(({
    status
  }) => status === "in-progress").length || 0;
  const totalCourses = progressData?.length || 0;
  const completedHours = Math.round((progressData?.reduce((sum, {
    timeSpentMinutes = 0
  }) => sum + timeSpentMinutes, 0) || 0) / 60);
  const completionPercentage = Math.round(totalCourses > 0 ? completedCourses / totalCourses * 100 : 0);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PendingOverlay, { reason: "Loading progress...", visible: isLoading });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-duration": "600", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-aos": "fade-up", "data-aos-delay": "100", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-2 text-gray-800", order: 1, children: "My Learning Progress" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "lg", children: "Track your course progress and learning journey" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SimpleGrid, { cols: {
      base: 2,
      md: 3
    }, "data-aos": "fade-up", "data-aos-delay": "200", spacing: "lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-aos": "fade-up", "data-aos-delay": "250", p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RingProgress, { label: /* @__PURE__ */ jsxRuntimeExports.jsx(Center, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 500, size: "sm", children: [
          completionPercentage,
          "%"
        ] }) }), sections: [{
          color: "fun-green",
          value: completionPercentage
        }], size: 80, thickness: 8 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-700", fw: 500, size: "sm", children: "Course Progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-gray-500", size: "xs", children: [
          completedCourses,
          " of ",
          totalCourses,
          " completed"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-aos": "fade-up", "data-aos-delay": "300", p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "blue", size: 60, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { size: 30 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-700", fw: 500, size: "sm", children: "Learning Hours" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 600, size: "lg", children: completedHours }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-500", size: "xs", children: "Total completed hours" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-aos": "fade-up", "data-aos-delay": "350", p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "green", size: 60, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconBook, { size: 30 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-700", fw: 500, size: "sm", children: "Total Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 600, size: "lg", children: totalCourses }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-500", size: "xs", children: "Enrolled courses" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-up", "data-aos-delay": "400", p: "lg", radius: "lg", withBorder: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 3, children: "Course Details" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: "Courses Completed" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "fun-green", variant: "light", children: completedCourses })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: "In Progress" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "blue", variant: "light", children: inProgressCourses })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: "Total Learning Time" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color: "yellow", variant: "light", children: [
            completedHours,
            " hours"
          ] })
        ] })
      ] })
    ] }),
    progressData && progressData.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-up", "data-aos-delay": "500", p: "lg", radius: "lg", withBorder: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 3, children: "Individual Course Progress" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "md", children: progressData.map((progress, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-aos": "fade-up", "data-aos-delay": index * 100 + 600, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 500, size: "sm", children: [
            "Course ",
            progress.courseId
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: progress.status === "completed" ? "green" : progress.status === "in-progress" ? "blue" : progress.status === "enrolled" ? "yellow" : "gray", variant: "light", children: progress.status })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", children: [
            "Progress: ",
            progress.completionPercentage,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", children: [
            "Time spent: ",
            Math.round(progress.timeSpentMinutes / 60),
            " ",
            "hours"
          ] }),
          progress.completedAt && /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", children: [
            "Completed:",
            " ",
            new Date(progress.completedAt).toLocaleDateString()
          ] })
        ] })
      ] }, progress.courseId)) })
    ] })
  ] }) }) });
}
export {
  StudentProgress as component
};
