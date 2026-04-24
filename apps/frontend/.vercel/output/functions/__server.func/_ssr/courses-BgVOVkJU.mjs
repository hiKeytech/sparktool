import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { O as Outlet, e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { Z as Route$q, I as useAuthContext, _ as useListCourses, J as useUserProgress, $ as useEnrollInCourse, P as PendingOverlay } from "./router-D664CQ4V.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { D as Container, y as Stack, E as Title, T as Text, F as Card, H as Grid, J as TextInput, K as Select, i as SimpleGrid, Q as Badge, G as Group, R as Progress, a as Button } from "../_libs/mantine__core.mjs";
import { c as IconSearch, d as IconPlayerPlay, e as IconBooks, f as IconListCheck, g as IconClock } from "../_libs/tabler__icons-react.mjs";
import { n as notifications } from "../_libs/mantine__notifications.mjs";
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
import "../_libs/mantine__modals.mjs";
import "../_libs/mantine__hooks.mjs";
import "../_libs/mantine__form.mjs";
import "../_libs/klona.mjs";
import "../_libs/fast-deep-equal.mjs";
import "node:async_hooks";
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
import "../_libs/react-number-format.mjs";
import "../_libs/floating-ui__react.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/mantine__store.mjs";
import "../_libs/react-transition-group.mjs";
function CourseCatalog() {
  const {
    tenant
  } = Route$q.useRouteContext();
  const {
    user
  } = useAuthContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [difficultyFilter, setDifficultyFilter] = reactExports.useState(null);
  const [categoryFilter, setCategoryFilter] = reactExports.useState(null);
  const {
    data: courses = [],
    isLoading
  } = useListCourses(tenant.id, {
    category: categoryFilter || void 0,
    difficulty: difficultyFilter || void 0,
    search: searchQuery || void 0
  });
  const {
    data: userProgress = []
  } = useUserProgress(tenant.id, user?.uid);
  const enrollMutation = useEnrollInCourse();
  console.log("userProgress", userProgress);
  console.log("enrolled courses", user);
  const isEnrolled = (courseId) => {
    return user?.enrolledCourses?.includes(courseId) || false;
  };
  const getCourseProgress = (courseId) => {
    const progress = userProgress.find((p) => p.courseId === courseId);
    return progress?.completionPercentage || 0;
  };
  const getCourseStats = (course) => {
    const sections = course.sections || [];
    const totalLessons = course.totalLessons || sections.reduce((acc, section) => acc + (section.lessons?.length || 0), 0);
    const totalDuration = sections.reduce((acc, section) => acc + (section.lessons?.reduce((lessonAcc, lesson) => lessonAcc + (lesson.estimatedDuration || 0), 0) || 0), 0);
    return {
      lessonCount: totalLessons,
      sectionCount: sections.length,
      totalDurationHours: Math.floor((course.estimatedDurationInMinutes || totalDuration) / 60),
      totalDurationMinutes: course.estimatedDurationInMinutes || totalDuration
    };
  };
  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !difficultyFilter || course.difficulty === difficultyFilter;
    const matchesCategory = !categoryFilter || course.category === categoryFilter;
    return matchesSearch && matchesDifficulty && matchesCategory && course.published;
  }).sort((a, b) => {
    const aEnrolled = isEnrolled(a.id);
    const bEnrolled = isEnrolled(b.id);
    if (aEnrolled && !bEnrolled) return -1;
    if (!aEnrolled && bEnrolled) return 1;
    return a.title.localeCompare(b.title);
  });
  const categories = Array.from(new Set(courses.map((course) => course.category)));
  const difficulties = ["beginner", "intermediate", "advanced"];
  function handleEnroll(courseId) {
    if (!user?.uid) return;
    enrollMutation.mutate({
      courseId,
      studentId: user.uid,
      tenantId: tenant.id || ""
    }, {
      onError: (error) => {
        notifications.show({
          color: "red",
          message: error.message || "Failed to enroll in course. Please try again.",
          title: "Enrollment Failed"
        });
      },
      onSuccess: () => {
        notifications.show({
          color: "green",
          message: "You have been successfully enrolled in the course!",
          title: "Enrollment Successful"
        });
      }
    });
  }
  function handleContinue(courseId) {
    if (!tenant.id) return;
    navigate({
      params: {
        courseId,
        tenant: tenant.id
      },
      to: "/$tenant/student/courses/$courseId"
    });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PendingOverlay, { reason: "Loading courses...", visible: isLoading });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 mb-8 bg-white border rounded-lg shadow-sm border-stone-200", "data-aos": "fade-up", "data-aos-duration": "300", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-2 text-gray-800", order: 1, children: "Course Catalog" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "lg", children: "Discover new skills and advance your career with our comprehensive courses" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 6
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSearch, { size: 16 }), onChange: (event) => setSearchQuery(event.currentTarget.value), placeholder: "Search courses...", value: searchQuery }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { clearable: true, data: difficulties.map((diff) => ({
        label: diff.charAt(0).toUpperCase() + diff.slice(1),
        value: diff
      })), onChange: setDifficultyFilter, placeholder: "Difficulty", value: difficultyFilter }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { clearable: true, data: categories.map((cat) => ({
        label: cat,
        value: cat
      })), onChange: setCategoryFilter, placeholder: "Category", value: categoryFilter }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleGrid, { cols: {
      base: 1,
      lg: 3,
      sm: 2
    }, spacing: "lg", children: filteredCourses.map((course, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-delay": index * 100, "data-aos-duration": "500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-full", p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", h: "100%", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-lg aspect-video bg-linear-to-br from-fun-green-100 to-fun-green-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-12 h-12 rounded-full bg-fun-green-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlayerPlay, { className: "text-white", size: 20 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: course.difficulty === "beginner" ? "green" : course.difficulty === "intermediate" ? "yellow" : "red", size: "sm", variant: "filled", children: course.difficulty }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-2 text-gray-800", order: 4, children: course.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mb-3 text-gray-600", lineClamp: 2, size: "sm", children: course.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "lg", mb: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconBooks, { className: "text-gray-500", size: 14 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-gray-600", size: "xs", children: [
              getCourseStats(course).sectionCount,
              " sections"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconListCheck, { className: "text-gray-500", size: 14 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-gray-600", size: "xs", children: [
              getCourseStats(course).lessonCount,
              " lessons"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { className: "text-gray-500", size: 14 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-gray-600", size: "xs", children: [
              getCourseStats(course).totalDurationHours,
              "h"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mb-3 text-gray-700", fw: 500, size: "sm", children: course.instructors?.map(({
          name
        }) => name).join(", ") || "No instructor assigned" }),
        isEnrolled(course.id) && getCourseProgress(course.id) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "xs", children: "Progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-fun-green-600", fw: 500, size: "xs", children: [
              getCourseProgress(course.id),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { color: "fun-green", size: "sm", value: getCourseProgress(course.id) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: isEnrolled(course.id) ? "bg-fun-green-600 hover:bg-fun-green-700" : "bg-gray-800 hover:bg-gray-700", fullWidth: true, loading: enrollMutation.isPending, onClick: () => isEnrolled(course.id) ? handleContinue(course.id) : handleEnroll(course.id), size: "md", children: isEnrolled(course.id) ? getCourseProgress(course.id) > 0 ? "Continue Learning" : "Start Course" : "Enroll Now" })
    ] }) }) }, course.id)) }),
    filteredCourses.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-500", size: "lg", children: "No courses found matching your criteria" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-4", onClick: () => {
        setSearchQuery("");
        setDifficultyFilter(null);
        setCategoryFilter(null);
      }, variant: "light", children: "Clear Filters" })
    ] })
  ] }) }) });
}
const SplitComponent = Outlet;
export {
  CourseCatalog,
  SplitComponent as component
};
