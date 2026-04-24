import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { ai as Route$g, L as useDashboardMetrics, _ as useListCourses, P as PendingOverlay, M as DataTable } from "./router-D664CQ4V.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { D as Container, G as Group, E as Title, T as Text, K as Select, a as Button, i as SimpleGrid, F as Card, a5 as Tabs, H as Grid, x as Center, a4 as RingProgress, y as Stack, R as Progress, $ as Alert, p as ActionIcon, aa as Paper, ag as Divider, Q as Badge } from "../_libs/mantine__core.mjs";
import { y as IconCalendar, A as IconDownload, l as IconUsers, p as IconTrendingUp, af as IconTrendingDown, o as IconBook, C as IconTarget, q as IconCertificate, W as IconChartBar, a as IconInfoCircle, ag as IconAward, g as IconClock, h as IconFilter, ae as IconEye } from "../_libs/tabler__icons-react.mjs";
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
function createAnalyticsTableColumns() {
  return [
    {
      accessorKey: "title",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, size: "sm", children: row.original.title }),
      header: "Course Title"
    },
    {
      accessorKey: "enrollmentCount",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: row.original.enrollmentCount || 0 }),
      header: "Enrollments"
    },
    {
      accessorKey: "completionCount",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: row.original.completionCount || 0 }),
      header: "Completions"
    },
    {
      cell: ({ row }) => {
        const enrollments = row.original.enrollmentCount || 0;
        const completions = row.original.completionCount || 0;
        const rate = enrollments > 0 ? Math.round(completions / enrollments * 100) : 0;
        const color = rate >= 70 ? "fun-green" : rate >= 50 ? "blue" : "orange";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color, size: "sm", variant: "light", children: [
          rate,
          "%"
        ] });
      },
      header: "Completion Rate",
      id: "completionRate"
    },
    {
      cell: ({ row }) => {
        const enrollments = row.original.enrollmentCount || 0;
        const completions = row.original.completionCount || 0;
        const progress = enrollments > 0 ? Math.round(completions / enrollments * 100) : 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Progress,
            {
              color: "blue",
              size: "sm",
              style: { flex: 1, minWidth: 60 },
              value: progress
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { size: "sm", children: [
            progress,
            "%"
          ] })
        ] });
      },
      header: "Avg. Progress",
      id: "averageProgress"
    },
    {
      accessorKey: "averageRating",
      cell: ({ row }) => {
        const rating = row.original.averageRating || 0;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: rating > 0 ? rating.toFixed(1) : "N/A" }),
          rating > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: "/5.0" })
        ] });
      },
      header: "Rating"
    },
    {
      cell: ({ row }) => {
        const enrollments = row.original.enrollmentCount || 0;
        const completions = row.original.completionCount || 0;
        const dropoutRate = enrollments > 0 ? Math.round((enrollments - completions) / enrollments * 100) : 0;
        const color = dropoutRate <= 20 ? "fun-green" : dropoutRate <= 40 ? "orange" : "red";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color, size: "sm", variant: "light", children: [
          dropoutRate,
          "%"
        ] });
      },
      header: "Dropout Rate",
      id: "dropoutRate"
    }
  ];
}
function createTrendsTableColumns() {
  return [
    {
      accessorKey: "month",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 500, size: "sm", children: [
        getValue(),
        " 2024"
      ] }),
      header: "Month"
    },
    {
      accessorKey: "enrollments",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: getValue().toLocaleString() }),
      header: "New Enrollments"
    },
    {
      accessorKey: "completions",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: getValue().toLocaleString() }),
      header: "Completions"
    },
    {
      accessorKey: "activeUsers",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: getValue().toLocaleString() }),
      header: "Active Users"
    },
    {
      cell: ({ row, table }) => {
        const index = table.getRowModel().rows.findIndex((r) => r.id === row.id);
        if (index === 0) {
          return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "gray", size: "sm", variant: "light", children: "Base" });
        }
        const growthRate = Math.round(10 + index * 5);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color: "fun-green", size: "sm", variant: "light", children: [
          "+",
          growthRate,
          "%"
        ] });
      },
      header: "Growth Rate",
      id: "growthRate"
    }
  ];
}
function AnalyticsReports() {
  const {
    tenant
  } = Route$g.useRouteContext();
  const [timeframe, setTimeframe] = reactExports.useState("month");
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const [selectedCategory, setSelectedCategory] = reactExports.useState(null);
  const {
    data: dashboardMetrics,
    isLoading: metricsLoading
  } = useDashboardMetrics(tenant.id || "");
  const {
    data: courses = [],
    isLoading: coursesLoading
  } = useListCourses(tenant.id);
  const overallCompletionRate = dashboardMetrics?.completionRate || 0;
  const handleExportReport = (format) => {
    const reportData = {
      certificates: dashboardMetrics?.certificatesIssued || 0,
      completionRate: overallCompletionRate,
      generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      metrics: dashboardMetrics,
      timeframe,
      totalStudents: dashboardMetrics?.totalActiveStudents || 0
    };
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], {
      type: "application/json"
    });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `analytics-report-${timeframe}-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.${format}`;
    link.click();
    URL.revokeObjectURL(url);
  };
  const isLoading = metricsLoading || coursesLoading;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PendingOverlay, { reason: "Loading analytics...", visible: isLoading });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-aos": "fade-up", "data-aos-duration": "500", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "text-fun-green-800", order: 1, children: "Analytics & Reports" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "lg", children: "Comprehensive insights into platform performance and student engagement" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { data: [{
          label: "Last Week",
          value: "week"
        }, {
          label: "Last Month",
          value: "month"
        }, {
          label: "Last Year",
          value: "year"
        }], leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCalendar, { size: 16 }), onChange: (value) => setTimeframe(value), placeholder: "Timeframe", value: timeframe }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconDownload, { size: 16 }), onClick: () => handleExportReport("pdf"), variant: "outline", children: "Export Report" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SimpleGrid, { cols: {
      base: 2,
      md: 4
    }, mb: "xl", spacing: "lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-delay": "100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-blue-100 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconUsers, { className: "text-blue-600", size: 24 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Total Students" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 700, size: "xl", children: dashboardMetrics?.totalActiveStudents || 0 }),
          dashboardMetrics?.trends?.totalStudents && /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
            dashboardMetrics.trends.totalStudents.isPositive ? /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrendingUp, { className: "text-green-500", size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrendingDown, { className: "text-red-500", size: 12 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: dashboardMetrics.trends.totalStudents.isPositive ? "green" : "red", size: "xs", children: [
              dashboardMetrics.trends.totalStudents.isPositive ? "+" : "",
              dashboardMetrics.trends.totalStudents.percentageChange,
              "% vs last month"
            ] })
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-delay": "200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-fun-green-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconBook, { className: "text-fun-green-600", size: 24 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Active Courses" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 700, size: "xl", children: dashboardMetrics?.activeCoursesCount || 0 }),
          dashboardMetrics?.trends?.activeCourses && /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
            dashboardMetrics.trends.activeCourses.isPositive ? /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrendingUp, { className: "text-green-500", size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrendingDown, { className: "text-red-500", size: 12 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: dashboardMetrics.trends.activeCourses.isPositive ? "green" : "red", size: "xs", children: [
              dashboardMetrics.trends.activeCourses.isPositive ? "+" : "",
              dashboardMetrics.trends.activeCourses.percentageChange,
              "% vs last month"
            ] })
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-delay": "300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-orange-100 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTarget, { className: "text-orange-600", size: 24 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Completion Rate" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 700, size: "xl", children: [
            Math.round(overallCompletionRate),
            "%"
          ] }),
          dashboardMetrics?.trends?.completionRate && /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
            dashboardMetrics.trends.completionRate.isPositive ? /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrendingUp, { className: "text-green-500", size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrendingDown, { className: "text-red-500", size: 12 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: dashboardMetrics.trends.completionRate.isPositive ? "green" : "red", size: "xs", children: [
              dashboardMetrics.trends.completionRate.isPositive ? "+" : "",
              dashboardMetrics.trends.completionRate.percentageChange,
              "% vs last month"
            ] })
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-delay": "400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-purple-100 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCertificate, { className: "text-purple-600", size: 24 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Certificates" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 700, size: "xl", children: dashboardMetrics?.certificatesIssued || 0 }),
          dashboardMetrics?.trends?.certificates && /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
            dashboardMetrics.trends.certificates.isPositive ? /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrendingUp, { className: "text-green-500", size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrendingDown, { className: "text-red-500", size: 12 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: dashboardMetrics.trends.certificates.isPositive ? "green" : "red", size: "xs", children: [
              dashboardMetrics.trends.certificates.isPositive ? "+" : "",
              dashboardMetrics.trends.certificates.percentageChange,
              "% vs last month"
            ] })
          ] })
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { onChange: (value) => setActiveTab(value || "overview"), value: activeTab, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs.List, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Tab, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconChartBar, { size: 16 }), value: "overview", children: "Overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Tab, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconBook, { size: 16 }), value: "courses", children: "Course Performance" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Tab, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconUsers, { size: 16 }), value: "students", children: "Student Analytics" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Tab, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrendingUp, { size: 16 }), value: "trends", children: "Learning Trends" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Panel, { pt: "xl", value: "overview", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
          base: 12,
          md: 8
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { p: "xl", radius: "lg", shadow: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { mb: "lg", order: 3, children: "Platform Performance Overview" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SimpleGrid, { cols: 2, spacing: "lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Center, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(RingProgress, { label: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 700, size: "xl", children: [
                Math.round(overallCompletionRate),
                "%"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Overall Completion" })
            ] }), sections: [{
              color: "fun-green",
              tooltip: "Completion Rate",
              value: overallCompletionRate
            }], size: 240, thickness: 12 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: "Course Engagement" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 500, size: "sm", children: [
                    Math.round(dashboardMetrics?.engagement?.courseEngagementRate || 0),
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { color: "blue", radius: "xl", size: "sm", value: dashboardMetrics?.engagement?.courseEngagementRate || 0 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: "Student Satisfaction" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 500, size: "sm", children: [
                    (dashboardMetrics?.engagement?.studentSatisfactionScore || 0).toFixed(1),
                    "/5.0"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { color: "fun-green", radius: "xl", size: "sm", value: (dashboardMetrics?.engagement?.studentSatisfactionScore || 0) / 5 * 100 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: "Platform Utilization" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 500, size: "sm", children: [
                    Math.round(dashboardMetrics?.engagement?.platformUtilizationRate || 0),
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { color: "orange", radius: "xl", size: "sm", value: dashboardMetrics?.engagement?.platformUtilizationRate || 0 })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: "Content Quality" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 500, size: "sm", children: [
                    Math.round(dashboardMetrics?.engagement?.contentQualityScore || 0),
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { color: "purple", radius: "xl", size: "sm", value: dashboardMetrics?.engagement?.contentQualityScore || 0 })
              ] })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
          base: 12,
          md: 4
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "lg", children: [
          dashboardMetrics?.insights && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { p: "lg", radius: "lg", shadow: "md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { mb: "md", order: 4, children: "Quick Insights" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
              dashboardMetrics.learningPatterns?.peakLearningHours && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "blue", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconInfoCircle, { size: 16 }), variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { size: "sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Peak Learning:" }),
                " ",
                dashboardMetrics.learningPatterns.peakLearningHours.start,
                " ",
                "-",
                " ",
                dashboardMetrics.learningPatterns.peakLearningHours.end,
                " ",
                "(",
                dashboardMetrics.learningPatterns.peakLearningHours.activityPercentage,
                "% of activity)"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "fun-green", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAward, { size: 16 }), variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { size: "sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Top Category:" }),
                " ",
                dashboardMetrics.insights.topCourseCategory || "Technology"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "orange", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { size: 16 }), variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { size: "sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Avg. Completion:" }),
                " ",
                dashboardMetrics.insights.averageCompletionDays || "N/A",
                " ",
                "days"
              ] }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { p: "lg", radius: "lg", shadow: "md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { mb: "md", order: 4, children: "Recent Activity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
                dashboardMetrics?.newEnrollmentsThisWeek || 0,
                " new enrollments this week"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
                dashboardMetrics?.certificatesIssued || 0,
                " total certificates issued"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
                dashboardMetrics?.totalActiveStudents || 0,
                " active students"
              ] }),
              dashboardMetrics?.engagement?.dailyActiveUsers && /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
                dashboardMetrics.engagement.dailyActiveUsers,
                " daily active users"
              ] })
            ] })
          ] })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Panel, { pt: "xl", value: "courses", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { p: "xl", radius: "lg", shadow: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Course Performance Analysis" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { data: [{
              label: "Technology",
              value: "technology"
            }, {
              label: "Business",
              value: "business"
            }, {
              label: "Design",
              value: "design"
            }, {
              label: "Marketing",
              value: "marketing"
            }], leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconFilter, { size: 16 }), onChange: setSelectedCategory, placeholder: "Filter by category", value: selectedCategory }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ActionIcon, { color: "gray", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconEye, { size: 16 }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { columns: createAnalyticsTableColumns(), data: courses, enableFilters: true, enableSorting: true, pageSize: 10 })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Panel, { pt: "xl", value: "students", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
          base: 12,
          md: 6
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { p: "xl", radius: "lg", shadow: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { mb: "lg", order: 3, children: "Student Engagement Metrics" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: "Active Daily Users" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, children: dashboardMetrics?.engagement?.dailyActiveUsers || 0 })
              ] }),
              dashboardMetrics?.engagement?.dailyActiveUsers && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { color: "blue", radius: "xl", size: "lg", value: Math.min(dashboardMetrics.engagement.dailyActiveUsers / dashboardMetrics.totalActiveStudents * 100, 100) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", mt: "xs", size: "xs", children: [
                  Math.round(dashboardMetrics.engagement.dailyActiveUsers / dashboardMetrics.totalActiveStudents * 100),
                  "% of registered students"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: "Course Completion Rate" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 500, children: [
                  Math.round(overallCompletionRate),
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { color: "fun-green", radius: "xl", size: "lg", value: overallCompletionRate })
            ] }),
            dashboardMetrics?.engagement?.averageStudyTimePerDay && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: "Average Study Time" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 500, children: [
                  (dashboardMetrics.engagement.averageStudyTimePerDay / 60).toFixed(1),
                  " ",
                  "hrs/day"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { color: "orange", radius: "xl", size: "lg", value: Math.min(dashboardMetrics.engagement.averageStudyTimePerDay / 180 * 100, 100) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", mt: "xs", size: "xs", children: "Target: 3 hours/day" })
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
          base: 12,
          md: 6
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { p: "xl", radius: "lg", shadow: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { mb: "lg", order: 3, children: "Learning Patterns" }),
          dashboardMetrics?.learningPatterns ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SimpleGrid, { cols: 2, mb: "lg", spacing: "lg", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { bg: "blue.0", p: "md", radius: "md", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "blue", fw: 700, size: "lg", children: [
                  dashboardMetrics.learningPatterns.mobileVsDesktop.mobile || 0,
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Mobile Learners" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { bg: "fun-green.0", p: "md", radius: "md", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "fun-green", fw: 700, size: "lg", children: [
                  dashboardMetrics.learningPatterns.mobileVsDesktop.desktop || 0,
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Desktop Learners" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { bg: "orange.0", p: "md", radius: "md", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "orange", fw: 700, size: "lg", children: [
                  dashboardMetrics.learningPatterns.weekendActivity || 0,
                  "%"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Weekend Activity" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { bg: "purple.0", p: "md", radius: "md", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "purple", fw: 700, size: "lg", children: (dashboardMetrics.engagement?.studentSatisfactionScore || 0).toFixed(1) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Avg. Rating" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, { my: "lg" })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", py: "xl", ta: "center", children: "Learning pattern data will be available soon." }),
          dashboardMetrics?.studentPerformance?.topPerformers && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, mb: "md", children: "Top Performing Students" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "xs", children: dashboardMetrics.studentPerformance.topPerformers.slice(0, 3).map((student, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: student.displayName }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color: index === 0 ? "fun-green" : "blue", variant: "light", children: [
                student.averageScore,
                "% avg"
              ] })
            ] }, student.userId)) })
          ] })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Panel, { pt: "xl", value: "trends", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { p: "xl", radius: "lg", shadow: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { mb: "lg", order: 3, children: "Learning Trends & Forecasting" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Grid, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 12, children: dashboardMetrics?.monthlyTrends && dashboardMetrics.monthlyTrends.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { columns: createTrendsTableColumns(), data: dashboardMetrics.monthlyTrends, enableFilters: true, enablePagination: false, enableSorting: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", py: "xl", ta: "center", children: "Trend data will be available when sufficient historical data is collected." }) }) })
      ] }) })
    ] })
  ] }) });
}
export {
  AnalyticsReports as component
};
