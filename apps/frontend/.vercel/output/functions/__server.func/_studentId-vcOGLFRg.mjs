import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { O as Outlet, u as useRouter, f as useParams } from "./_libs/tanstack__react-router.mjs";
import { aG as Route$9, I as useAuthContext, aH as useUser, J as useUserProgress, aI as useListActivityLogs, aJ as useGetCertificates, f as formatDate, j as formatDateTime, M as DataTable, aK as createStudentProgressTableColumns, an as openSendMessageModal, al as openEditStudentModal } from "./_ssr/router-D664CQ4V.mjs";
import "./_ssr/tenant-contract-BrIl-2Jr.mjs";
import "./_ssr/course-structure-D2f1-VM0.mjs";
import "./_ssr/index.mjs";
import "./_ssr/platform-config-DKda_4-W.mjs";
import "./_ssr/session-DEslDYHo.mjs";
import "./_ssr/course-C8X6AilP.mjs";
import "./_ssr/course-lesson-C_qGHOXP.mjs";
import "./_libs/aos.mjs";
import "./_libs/dayjs.mjs";
import { D as Container, z as Loader, $ as Alert, y as Stack, G as Group, p as ActionIcon, E as Title, T as Text, a as Button, F as Card, H as Grid, a3 as Avatar, Q as Badge, a2 as ThemeIcon, a4 as RingProgress, a5 as Tabs, R as Progress, a6 as Timeline } from "./_libs/mantine__core.mjs";
import { t as IconExclamationMark, u as IconArrowLeft, v as IconMessageCircle, w as IconEdit, x as IconMail, y as IconCalendar, g as IconClock, o as IconBook, z as IconTrophy, q as IconCertificate, A as IconDownload, L as IconActivity, s as IconStar, m as IconUser, I as IconCheck } from "./_libs/tabler__icons-react.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/@tanstack/react-router-ssr-query+[...].mjs";
import "./_libs/tanstack__react-query.mjs";
import "./_libs/@tanstack/router-ssr-query-core+[...].mjs";
import "./_libs/ibnlanre__builder.mjs";
import "./_libs/tanstack__react-query-devtools.mjs";
import "./_libs/@tanstack/react-router-devtools+[...].mjs";
import "./_libs/mantine-form-zod-resolver.mjs";
import "./_libs/zod.mjs";
import "./_libs/tanstack__react-table.mjs";
import "./_libs/tanstack__table-core.mjs";
import "./_libs/date-fns.mjs";
import "./_libs/mantine__notifications.mjs";
import "./_libs/mantine__hooks.mjs";
import "./_libs/mantine__store.mjs";
import "./_libs/react-transition-group.mjs";
import "./_libs/babel__runtime.mjs";
import "./_libs/react-remove-scroll.mjs";
import "tslib";
import "./_libs/react-remove-scroll-bar.mjs";
import "./_libs/react-style-singleton.mjs";
import "./_libs/get-nonce.mjs";
import "./_libs/use-sidecar.mjs";
import "./_libs/use-callback-ref.mjs";
import "./_libs/mantine__modals.mjs";
import "./_libs/mantine__form.mjs";
import "./_libs/klona.mjs";
import "./_libs/fast-deep-equal.mjs";
import "node:async_hooks";
import "./_libs/clsx.mjs";
import "./_libs/react-textarea-autosize.mjs";
import "./_libs/use-latest.mjs";
import "./_libs/use-isomorphic-layout-effect.mjs";
import "./_libs/use-composed-ref.mjs";
import "./_libs/react-number-format.mjs";
import "./_libs/floating-ui__react.mjs";
import "./_libs/floating-ui__utils.mjs";
import "./_libs/floating-ui__react-dom.mjs";
import "./_libs/floating-ui__dom.mjs";
import "./_libs/floating-ui__core.mjs";
function StudentDetails() {
  const {
    tenant
  } = Route$9.useRouteContext();
  const {
    user
  } = useAuthContext();
  const router = useRouter();
  const {
    studentId
  } = useParams({
    strict: false
  });
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const {
    data: studentData,
    error: userError,
    isLoading: userLoading
  } = useUser(studentId || "");
  const {
    data: progressData,
    isLoading: progressLoading
  } = useUserProgress(tenant.id, studentId || "");
  const {
    data: activityLogs = [],
    isLoading: activityLoading
  } = useListActivityLogs(tenant.id, studentId || "");
  const {
    data: certificates = [],
    isLoading: certificatesLoading
  } = useGetCertificates(studentId || "", tenant.id);
  const isLoading = userLoading || progressLoading || activityLoading || certificatesLoading;
  function handleEditStudent() {
    if (!studentData) return;
    openEditStudentModal(studentData);
  }
  function handleSendMessage() {
    if (!studentData || !user) return;
    openSendMessageModal(studentData, user);
  }
  function getStatusColor(status) {
    switch (status) {
      case "active":
        return "green";
      case "completed":
        return "green";
      case "in-progress":
        return "blue";
      case "inactive":
        return "red";
      case "not-started":
        return "gray";
      default:
        return "gray";
    }
  }
  function getActivityIcon(type) {
    switch (type) {
      case "course_completed":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: 16 });
      case "course_enrolled":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconBook, { size: 16 });
      case "login":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconUser, { size: 16 });
      case "quiz_passed":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconStar, { size: 16 });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconActivity, { size: 16 });
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { size: "lg" }) }) });
  }
  if (userError || !studentData) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "red", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconExclamationMark, { size: 16 }), title: "Error", children: "Failed to load student details. Please try again later." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { "data-aos": "fade-up", gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { "data-aos": "fade-right", justify: "space-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ActionIcon, { onClick: () => router.history.go(-1), variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconArrowLeft, { size: 16 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "text-gray-800", order: 1, children: "Student Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "lg", children: "Detailed view of student progress and information" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconMessageCircle, { size: 16 }), onClick: handleSendMessage, variant: "light", children: "Send Message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconEdit, { size: 16 }), onClick: handleEditStudent, variant: "light", children: "Edit Profile" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-aos": "fade-up", "data-aos-delay": "100", padding: "xl", radius: "md", shadow: "sm", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 4
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "ring-4 ring-fun-green-100", radius: "xl", size: 120, src: studentData.photoURL }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 2, children: studentData.displayName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "lg", children: studentData.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mt-2", color: getStatusColor(studentData.isActive ? "active" : "inactive"), size: "lg", variant: "light", children: getStatusColor(studentData.isActive ? "active" : "inactive") })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 8
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "blue", variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconMail, { size: 16 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: studentData.email })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "orange", variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCalendar, { size: 16 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Joined" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: formatDate(studentData.createdAt) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "violet", variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { size: 16 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Last Active" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: formatDateTime(studentData.lastLoginAt) })
          ] })
        ] }) })
      ] }) }) })
    ] }) }),
    progressData && progressData.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { "data-aos": "fade-up", "data-aos-delay": "200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 3,
        sm: 6
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "text-center", padding: "lg", radius: "md", shadow: "sm", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RingProgress, { className: "mx-auto mb-2", label: /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { size: "xs", ta: "center", children: [
          Math.round(progressData.reduce((acc, course) => acc + course.completionPercentage, 0) / progressData.length),
          "%"
        ] }), sections: [{
          color: "fun-green.6",
          value: Math.round(progressData.reduce((acc, course) => acc + course.completionPercentage, 0) / progressData.length)
        }], size: 80, thickness: 8 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Overall Progress" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 3,
        sm: 6
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "text-center", padding: "lg", radius: "md", shadow: "sm", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { className: "mx-auto mb-2", color: "blue", size: 60, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconBook, { size: 28 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 700, size: "xl", children: progressData.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Enrolled Courses" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 3,
        sm: 6
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "text-center", padding: "lg", radius: "md", shadow: "sm", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { className: "mx-auto mb-2", color: "green", size: 60, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrophy, { size: 28 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 700, size: "xl", children: progressData.filter((course) => course.status === "completed").length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Completed" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 3,
        sm: 6
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "text-center", padding: "lg", radius: "md", shadow: "sm", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { className: "mx-auto mb-2", color: "orange", size: 60, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCertificate, { size: 28 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 700, size: "xl", children: certificates.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Certificates" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { "data-aos": "fade-up", "data-aos-delay": "300", onChange: setActiveTab, value: activeTab, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs.List, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Tab, { value: "overview", children: "Overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Tab, { value: "courses", children: "Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Tab, { value: "activity", children: "Activity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Tab, { value: "certificates", children: "Certificates" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Panel, { pt: "xl", value: "overview", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
          base: 12,
          md: 6
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { padding: "lg", radius: "md", shadow: "sm", withBorder: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 4, children: "Learning Progress" }),
          progressData && progressData.length > 0 ? progressData.map((courseProgress) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { className: "mb-1", justify: "space-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { size: "sm", children: [
                "Course ",
                courseProgress.courseId
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
                Math.round(courseProgress.completionPercentage),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { color: "fun-green.6", radius: "xl", size: "sm", value: courseProgress.completionPercentage })
          ] }, courseProgress.courseId)) : /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", py: "xl", ta: "center", children: "No course progress available" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
          base: 12,
          md: 6
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { padding: "lg", radius: "md", shadow: "sm", withBorder: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 4, children: "Recent Activity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Timeline, { active: activityLogs.length, bulletSize: 24, lineWidth: 2, children: activityLogs.slice(0, 5).map((activity) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Timeline.Item, { bullet: getActivityIcon(activity.action || ""), title: (activity.action || "").replace("_", " ").toUpperCase(), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: activity.action }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: formatDateTime(activity.timestamp) })
          ] }, activity.id)) }),
          activityLogs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", py: "xl", ta: "center", children: "No recent activity" })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Panel, { pt: "xl", value: "courses", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { padding: "lg", radius: "md", shadow: "sm", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 4, children: "Course Enrollment" }),
        progressData && progressData.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { columns: createStudentProgressTableColumns(), data: progressData, enableFilters: true, enablePagination: false, enableSearch: false, enableSorting: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", py: "xl", ta: "center", children: "No courses enrolled" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Panel, { pt: "xl", value: "activity", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { padding: "lg", radius: "md", shadow: "sm", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 4, children: "Activity Log" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Timeline, { active: activityLogs.length, bulletSize: 24, lineWidth: 2, children: activityLogs.map((activity) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Timeline.Item, { bullet: getActivityIcon(activity.action || ""), title: (activity.action || "").replace("_", " ").toUpperCase(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: activity.action }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: formatDateTime(activity.timestamp) })
        ] }, activity.id)) }),
        activityLogs.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", py: "xl", ta: "center", children: "No activity recorded" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Panel, { pt: "xl", value: "certificates", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { padding: "lg", radius: "md", shadow: "sm", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 4, children: "Earned Certificates" }),
        certificates.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Grid, { children: certificates.map((certificate) => /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
          base: 12,
          md: 4,
          sm: 6
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { padding: "md", radius: "md", shadow: "xs", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "gold", size: 60, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCertificate, { size: 30 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, size: "sm", children: certificate.courseName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", children: [
              "Issued:",
              " ",
              new Date(certificate.issued?.at || Date.now()).toLocaleDateString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconDownload, { size: 14 }), size: "xs", variant: "light", children: "Download" })
        ] }) }) }, certificate.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", py: "xl", ta: "center", children: "No certificates earned yet" })
      ] }) })
    ] })
  ] }) });
}
const SplitComponent = Outlet;
export {
  StudentDetails,
  SplitComponent as component
};
