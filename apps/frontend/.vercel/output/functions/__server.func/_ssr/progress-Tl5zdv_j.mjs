import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as useParams, e as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { aU as Route$3, aH as useUser, _ as useListCourses, O as useListStudentProgress, aJ as useGetCertificates, P as PendingOverlay, aT as formatStudyTime, M as DataTable } from "./router-D664CQ4V.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { F as Card, T as Text, a as Button, ap as Flex, p as ActionIcon, E as Title, H as Grid, y as Stack, G as Group, R as Progress, aa as Paper, Q as Badge, Y as Tooltip } from "../_libs/mantine__core.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { u as IconArrowLeft, m as IconUser, z as IconTrophy, q as IconCertificate, g as IconClock, ae as IconEye } from "../_libs/tabler__icons-react.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function createProgressMonitoringTableColumns() {
  return [
    {
      accessorKey: "course",
      cell: ({ row }) => {
        const course = row.original.course;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-stone-900", fw: 500, size: "sm", children: course.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: course.category })
        ] });
      },
      header: "Course"
    },
    {
      cell: ({ row }) => {
        const progressPercent = row.original.progress?.completionPercentage || 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 500, size: "sm", children: [
            progressPercent,
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Progress,
            {
              color: "fun-green",
              radius: "md",
              size: "sm",
              value: progressPercent
            }
          )
        ] });
      },
      header: "Progress",
      id: "progress"
    },
    {
      cell: ({ row }) => {
        const progress = row.original.progress;
        const color = progress?.status === "completed" ? "green" : progress?.status === "in-progress" ? "blue" : progress?.status === "dropped" ? "red" : "gray";
        const label = progress?.status === "completed" ? "Completed" : progress?.status === "in-progress" ? "In Progress" : progress?.status === "dropped" ? "Dropped" : "Not Started";
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color, size: "sm", variant: "light", children: label });
      },
      header: "Status",
      id: "status"
    },
    {
      cell: ({ row }) => {
        const timeSpent = row.original.progress?.timeSpentMinutes || 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: formatStudyTime(timeSpent) });
      },
      header: "Study Time",
      id: "studyTime"
    },
    {
      cell: ({ row }) => {
        const hasCertificate = row.original.hasCertificate;
        return hasCertificate ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "fun-green", size: "sm", variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconCertificate, { size: 12 }),
          "Issued"
        ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Not issued" });
      },
      header: "Certificate",
      id: "certificate"
    },
    {
      cell: ({ row }) => {
        const courseId = row.original.course.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { label: "View Course Details", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ActionIcon,
          {
            className: "text-stone-600 hover:text-fun-green-700",
            component: Link,
            size: "sm",
            to: `/admin/courses/${courseId}`,
            variant: "subtle",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconEye, { size: 16 })
          }
        ) });
      },
      header: "Actions",
      id: "actions"
    }
  ];
}
function StudentProgressMonitoring() {
  const {
    tenant
  } = Route$3.useRouteContext();
  const {
    studentId
  } = useParams({
    strict: false
  });
  const navigate = useNavigate();
  const {
    data: student,
    error: studentError,
    isLoading: studentLoading
  } = useUser(studentId);
  const {
    data: allCourses = [],
    isLoading: coursesLoading
  } = useListCourses(tenant.id);
  const {
    data: progressData = [],
    isLoading: progressLoading
  } = useListStudentProgress(tenant.id, studentId);
  const {
    data: certificates = [],
    isLoading: certificatesLoading
  } = useGetCertificates(studentId, tenant.id);
  const isLoading = studentLoading || coursesLoading || progressLoading || certificatesLoading;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PendingOverlay, { visible: true });
  }
  if (studentError || !student) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "text-center p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "red", children: "Student not found or error loading student data." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { mt: "md", onClick: () => {
        if (tenant.id) {
          navigate({
            params: {
              tenant: tenant.id
            },
            to: "/$tenant/admin/users"
          });
          return;
        }
        navigate({
          to: "/login"
        });
      }, variant: "light", children: "Back to User Management" })
    ] });
  }
  const enrolledCourseIds = student.enrolledCourses || [];
  const enrolledCourses = allCourses.filter((course) => enrolledCourseIds.includes(course.id));
  const studentProgressData = {
    certificates: certificates.length,
    completedCourses: progressData.filter((p) => p.status === "completed").length,
    enrolledCourses,
    totalProgress: calculateOverallProgress(progressData),
    totalStudyTime: progressData.reduce((total, p) => total + (p.timeSpentMinutes || 0), 0)
  };
  const courseProgressRows = enrolledCourses.map((course) => {
    const progress = progressData.find((p) => p.courseId === course.id);
    const hasCertificate = certificates.some((cert) => cert.courseId === course.id);
    return {
      course,
      hasCertificate,
      progress
    };
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
      opacity: 1,
      y: 0
    }, initial: {
      opacity: 0,
      y: -20
    }, transition: {
      duration: 0.3
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Flex, { align: "center", gap: "md", mb: "lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ActionIcon, { className: "text-stone-600 hover:text-fun-green-700", onClick: () => {
        if (tenant.id) {
          navigate({
            params: {
              tenant: tenant.id
            },
            to: "/$tenant/admin/users"
          });
          return;
        }
        navigate({
          to: "/login"
        });
      }, size: "lg", variant: "subtle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconArrowLeft, { size: 20 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "text-stone-900", order: 2, children: student.displayName }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", children: "Student Progress Monitoring" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        opacity: 1,
        scale: 1
      }, initial: {
        opacity: 0,
        scale: 0.95
      }, transition: {
        delay: 0.1,
        duration: 0.3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white border border-stone-200 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconUser, { className: "text-fun-green-700", size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-stone-700", fw: 500, size: "sm", children: "Student Profile" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-stone-900", fw: 700, size: "xl", children: student.role === "admin" ? "Administrator" : "Student" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
          "ID: ",
          student.studentId || student.id
        ] })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        opacity: 1,
        scale: 1
      }, initial: {
        opacity: 0,
        scale: 0.95
      }, transition: {
        delay: 0.2,
        duration: 0.3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white border border-stone-200 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrophy, { className: "text-fun-green-700", size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-stone-700", fw: 500, size: "sm", children: "Overall Progress" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-stone-900", fw: 700, size: "xl", children: [
          studentProgressData.totalProgress,
          "%"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { color: "fun-green", radius: "md", size: "sm", value: studentProgressData.totalProgress })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        opacity: 1,
        scale: 1
      }, initial: {
        opacity: 0,
        scale: 0.95
      }, transition: {
        delay: 0.3,
        duration: 0.3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white border border-stone-200 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconCertificate, { className: "text-fun-green-700", size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-stone-700", fw: 500, size: "sm", children: "Certificates" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-stone-900", fw: 700, size: "xl", children: studentProgressData.certificates }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
          "Out of ",
          studentProgressData.completedCourses,
          " completed"
        ] })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
        opacity: 1,
        scale: 1
      }, initial: {
        opacity: 0,
        scale: 0.95
      }, transition: {
        delay: 0.4,
        duration: 0.3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white border border-stone-200 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { className: "text-fun-green-700", size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-stone-700", fw: 500, size: "sm", children: "Study Time" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-stone-900", fw: 700, size: "xl", children: formatStudyTime(studentProgressData.totalStudyTime) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Total hours logged" })
      ] }) }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { animate: {
      opacity: 1,
      y: 0
    }, initial: {
      opacity: 0,
      y: 20
    }, transition: {
      delay: 0.5,
      duration: 0.3
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "bg-white border border-stone-200 shadow-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "text-stone-900", order: 3, children: "Course Progress Details" }),
      studentProgressData.enrolledCourses.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Paper, { className: "bg-stone-50 p-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", children: "This student is not enrolled in any courses yet." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { columns: createProgressMonitoringTableColumns(), data: courseProgressRows, enableFilters: true, enablePagination: false, enableSearch: false, enableSorting: true })
    ] }) }) })
  ] });
}
function calculateOverallProgress(progressData) {
  if (progressData.length === 0) return 0;
  const totalProgress = progressData.reduce((sum, progress) => sum + (progress.completionPercentage || 0), 0);
  return Math.round(totalProgress / progressData.length);
}
export {
  StudentProgressMonitoring as component
};
