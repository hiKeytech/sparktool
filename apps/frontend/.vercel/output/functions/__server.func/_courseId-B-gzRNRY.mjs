import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { O as Outlet, f as useParams, e as useNavigate } from "./_libs/tanstack__react-router.mjs";
import { aB as Route$b, I as useAuthContext, a2 as useCourseWithStructure, $ as useEnrollInCourse, aC as useSubscribeToTenant, i as formatRelativeTime, aD as UniversalVideoPlayer } from "./_ssr/router-D664CQ4V.mjs";
import "./_ssr/tenant-contract-BrIl-2Jr.mjs";
import "./_ssr/course-structure-D2f1-VM0.mjs";
import "./_ssr/index.mjs";
import "./_ssr/platform-config-DKda_4-W.mjs";
import "./_ssr/session-DEslDYHo.mjs";
import "./_ssr/course-C8X6AilP.mjs";
import "./_ssr/course-lesson-C_qGHOXP.mjs";
import "./_libs/aos.mjs";
import "./_libs/dayjs.mjs";
import { D as Container, H as Grid, y as Stack, _ as Skeleton, $ as Alert, G as Group, E as Title, T as Text, Q as Badge, a0 as Rating, F as Card, a1 as List, a2 as ThemeIcon, a as Button } from "./_libs/mantine__core.mjs";
import { a as IconInfoCircle, g as IconClock, l as IconUsers, I as IconCheck, m as IconUser, n as IconSparkles, o as IconBook, p as IconTrendingUp, q as IconCertificate, r as IconWorldWww, s as IconStar } from "./_libs/tabler__icons-react.mjs";
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
function CourseDetails() {
  const {
    tenant
  } = Route$b.useRouteContext();
  const {
    user
  } = useAuthContext();
  const {
    courseId
  } = useParams({
    strict: false
  });
  const {
    data: course,
    isLoading,
    error
  } = useCourseWithStructure(courseId);
  const navigate = useNavigate();
  const [isEnrolling, setIsEnrolling] = reactExports.useState(false);
  const enrollMutation = useEnrollInCourse();
  const subscribeMutation = useSubscribeToTenant();
  const isEnrolled = user?.enrolledCourses?.includes(courseId || "") || false;
  const activeSubscription = user?.subscriptions?.find((sub) => sub.tenantId === tenant.id && sub.status === "active" && sub.expiresAt > Date.now());
  const hasAccessViaSubscription = tenant.config?.monetization?.model === "subscription" && !!activeSubscription;
  const isFree = tenant.config?.monetization?.model === "free" || tenant.config?.monetization?.model === "pay-per-course" && (!course?.price || course.price <= 0);
  const hasAccess = isEnrolled || hasAccessViaSubscription;
  const getPaystackConfig = (amount, type, plan) => ({
    amount: Math.round(amount * 100),
    // in kobo
    email: user?.email || "",
    metadata: {
      custom_fields: [{
        display_name: type === "enrollment" ? "Course Title" : "Subscription Plan",
        value: type === "enrollment" ? course?.title || "" : `${plan} Subscription`,
        variable_name: type === "enrollment" ? "course_title" : "subscription_plan"
      }, {
        display_name: "Student ID",
        value: user?.uid || "",
        variable_name: "student_id"
      }, {
        display_name: "Tenant ID",
        value: tenant.id || "",
        variable_name: "tenant_id"
      }]
    },
    publicKey: "pk_test_98a5e099e8c3e04f9861059be7c2fbd4c5cf715c",
    reference: (/* @__PURE__ */ new Date()).getTime().toString() + Math.random().toString(36).substring(2, 7)
  });
  const startPaystackTransaction = (config, onSuccess) => {
    if (typeof window === "undefined") {
      setIsEnrolling(false);
      return;
    }
    const paystackWindow = window;
    const paystack = new paystackWindow.PaystackPop();
    paystack.newTransaction({
      ...config,
      onClose: () => {
        setIsEnrolling(false);
      },
      onSuccess
    });
  };
  const executeEnrollment = async () => {
    if (!user || !courseId || !course) return;
    setIsEnrolling(true);
    try {
      await enrollMutation.mutateAsync({
        courseId,
        studentId: user.uid,
        tenantId: tenant.id || ""
      });
      if (tenant.id) {
        navigate({
          params: {
            courseId,
            tenant: tenant.id
          },
          search: {
            lesson: void 0
          },
          to: "/$tenant/student/courses/$courseId/learn"
        });
      }
    } catch (error2) {
      console.error("Enrollment failed:", error2);
      setIsEnrolling(false);
    }
  };
  const executeSubscription = async (plan) => {
    if (!user || !tenant.id) return;
    setIsEnrolling(true);
    try {
      await subscribeMutation.mutateAsync({
        plan,
        tenantId: tenant.id,
        userId: user.uid
      });
      await executeEnrollment();
    } catch (error2) {
      console.error("Subscription failed:", error2);
      setIsEnrolling(false);
    }
  };
  const handleSubscribePayment = (plan, amount) => {
    setIsEnrolling(true);
    const config = getPaystackConfig(amount, "subscription", plan);
    startPaystackTransaction(config, () => {
      void executeSubscription(plan);
    });
  };
  const handleEnrollClick = () => {
    if (!user) {
      if (tenant.id) {
        navigate({
          params: {
            tenant: tenant.id
          },
          search: {
            redirect: window.location.pathname
          },
          to: "/$tenant/login"
        });
      } else {
        navigate({
          search: {
            redirect: window.location.pathname
          },
          to: "/login"
        });
      }
      return;
    }
    if (tenant.config?.monetization?.model === "subscription" && !activeSubscription) {
      const subSection = document.getElementById("subscription-options");
      if (subSection) subSection.scrollIntoView({
        behavior: "smooth"
      });
      return;
    }
    if (!isFree && tenant.config?.monetization?.model === "pay-per-course") {
      setIsEnrolling(true);
      startPaystackTransaction(getPaystackConfig(course?.price || 0, "enrollment"), () => {
        void executeEnrollment();
      });
    } else {
      void executeEnrollment();
    }
  };
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "advanced":
        return "red";
      case "beginner":
        return "green";
      case "intermediate":
        return "yellow";
      default:
        return "gray";
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 8
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { height: 300, radius: "lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { height: 60 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { height: 120 })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 4
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { height: 200, radius: "lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { height: 150, radius: "lg" })
      ] }) })
    ] }) });
  }
  if (error || !course) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "red", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconInfoCircle, { size: 16 }), title: "Course Not Found", children: "The course you're looking for could not be found. Please check the URL or return to the course catalog." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-duration": "500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
      base: 12,
      md: 8
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { justify: "space-between", wrap: "nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-2 text-gray-800", order: 1, children: course.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mb-4 text-gray-600", size: "lg", children: course.shortDescription || course.description })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: getDifficultyColor(course.difficulty || "intermediate"), size: "lg", variant: "light", children: (course.difficulty || "intermediate").charAt(0).toUpperCase() + (course.difficulty || "intermediate").slice(1) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { className: "text-gray-500", size: 16 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-gray-600", size: "sm", children: [
              course.sections?.reduce((acc, section) => acc + (section.lessons?.reduce((lessonAcc, lesson) => lessonAcc + (lesson.estimatedDuration || 0), 0) || 0), 0) || 0,
              "m"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconUsers, { className: "text-gray-500", size: 16 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-gray-600", size: "sm", children: [
              (course.enrollmentCount || 0).toLocaleString(),
              " enrolled"
            ] })
          ] }),
          (course.averageRating || 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Rating, { readOnly: true, size: "sm", value: course.averageRating || 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-gray-600", size: "sm", children: [
              (course.averageRating || 0).toFixed(1),
              " (",
              course.totalRatings || 0,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { className: "text-gray-500", size: 16 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-gray-600", size: "sm", children: [
              "Created ",
              formatRelativeTime(course.createdAt)
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-up", "data-aos-delay": "200", "data-aos-duration": "500", p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 3, children: "Course Preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(UniversalVideoPlayer, { autoPlay: false, videoUrl: course.previewVideoUrl || "" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-up", "data-aos-delay": "300", "data-aos-duration": "500", p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 3, children: "About This Course" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "leading-relaxed text-gray-700", children: course.description || "No description available." })
      ] }),
      course.learningObjectives && course.learningObjectives.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-up", "data-aos-delay": "400", "data-aos-duration": "500", p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 3, children: "What You'll Learn" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(List, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "fun-green", radius: "xl", size: 24, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: 12 }) }), spacing: "sm", children: course.learningObjectives.map((objective, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(List.Item, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-700", children: objective }) }, index)) })
      ] }),
      course.sections && course.sections.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-up", "data-aos-delay": "500", "data-aos-duration": "500", p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 3, children: "Course Curriculum" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "md", children: course.sections.map((section, sectionIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-gray-200 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-gray-50 border-b border-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "center", justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "font-medium text-gray-800", children: [
                "Section ",
                sectionIndex + 1,
                ": ",
                section.title
              ] }),
              section.description && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mt-1 text-gray-600", size: "sm", children: section.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color: "fun-green", variant: "light", children: [
              section.lessons?.length || 0,
              " lessons"
            ] })
          ] }) }),
          section.lessons && section.lessons.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "sm", children: section.lessons.map((lesson, lessonIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { className: "p-3 bg-white rounded-md border border-gray-100", gap: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-6 h-6 rounded-full bg-fun-green-100 text-fun-green-700 text-xs font-medium", children: lessonIndex + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium text-gray-700", size: "sm", children: lesson.title }),
              lesson.type && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-500", size: "xs", children: lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1) })
            ] }),
            lesson.estimatedDuration && /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { className: "text-gray-400", size: 12 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-gray-500", size: "xs", children: [
                lesson.estimatedDuration,
                "m"
              ] })
            ] })
          ] }, lesson.id)) }) })
        ] }, section.id)) })
      ] }),
      course.prerequisites && course.prerequisites.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-up", "data-aos-delay": "500", "data-aos-duration": "500", p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 3, children: "Prerequisites" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(List, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "blue", radius: "xl", size: 24, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconInfoCircle, { size: 12 }) }), spacing: "sm", children: course.prerequisites.map((prerequisite, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(List.Item, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-700", children: prerequisite }) }, index)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-up", "data-aos-delay": "600", "data-aos-duration": "500", p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 3, children: "Your Instructor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "fun-green", radius: "xl", size: 50, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconUser, { size: 24 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-lg font-semibold text-gray-800", children: course.instructors?.map((instructor) => instructor?.name || "Unknown").join(", ") || "No instructor assigned" }),
            course.instructors?.some(
              (instructor) => instructor?.biography
              // changed .bio to .biography (schema definition) which is nullable
            ) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 space-y-1", children: course.instructors.filter((instructor) => instructor?.biography).map((instructor, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-gray-600", size: "sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                instructor?.name,
                ":"
              ] }),
              " ",
              instructor?.biography
            ] }, index)) })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
      base: 12,
      md: 4
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "sticky top-4", "data-aos": "fade-left", "data-aos-delay": "200", "data-aos-duration": "500", p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "md", children: hasAccess ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "green", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: 16 }), children: "You have access to this course" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "violet", fullWidth: true, leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSparkles, { size: 16 }), onClick: () => navigate({
          params: {
            tenant: tenant.id
          },
          search: {
            courseId
          },
          to: "/$tenant/student/ai"
        }), variant: "light", children: "Open AI Tutor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-fun-green-600 hover:bg-fun-green-700", fullWidth: true, onClick: () => navigate({
          params: {
            courseId,
            tenant: tenant.id
          },
          search: {
            lesson: void 0
          },
          to: "/$tenant/student/courses/$courseId/learn"
        }), size: "lg", children: "Continue Learning" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        tenant.config?.monetization?.model === "subscription" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "subscription-options", className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", className: "text-gray-600 font-medium", children: "Choose a Subscription Plan to Access" }),
          tenant.config.monetization.subscriptionConfig?.monthlyPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-purple-600 hover:bg-purple-700", fullWidth: true, loading: isEnrolling, onClick: () => handleSubscribePayment("monthly", tenant.config.monetization.subscriptionConfig.monthlyPrice), size: "lg", variant: "filled", children: [
            "Monthly Plan - ₦",
            tenant.config.monetization.subscriptionConfig.monthlyPrice.toLocaleString()
          ] }),
          tenant.config.monetization.subscriptionConfig?.yearlyPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "border-purple-600 text-purple-600 hover:bg-purple-50", fullWidth: true, loading: isEnrolling, onClick: () => handleSubscribePayment("yearly", tenant.config.monetization.subscriptionConfig.yearlyPrice), size: "lg", variant: "outline", children: [
            "Yearly Plan - ₦",
            tenant.config.monetization.subscriptionConfig.yearlyPrice.toLocaleString()
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-fun-green-600 hover:bg-fun-green-700", fullWidth: true, loading: isEnrolling, onClick: handleEnrollClick, size: "lg", children: !isFree ? `Enroll Now - ₦${course.price?.toLocaleString() || 0}` : "Enroll Now - Free" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-center text-gray-500", size: "sm", children: [
          "Join ",
          (course.enrollmentCount || 0).toLocaleString(),
          " ",
          "other students"
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-left", "data-aos-delay": "300", "data-aos-duration": "500", p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 4, children: "Course Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconBook, { className: "text-gray-500", size: 16 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Sections" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium", size: "sm", children: course.sections?.length || 0 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { className: "text-gray-500", size: 16 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Lessons" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium", size: "sm", children: course.sections?.reduce((acc, section) => acc + (section.lessons?.length || 0), 0) || 0 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { className: "text-gray-500", size: 16 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Duration" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "font-medium", size: "sm", children: [
              course.sections?.reduce((acc, section) => acc + (section.lessons?.reduce((lessonAcc, lesson) => lessonAcc + (lesson.estimatedDuration || 0), 0) || 0), 0) || 0,
              "m"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrendingUp, { className: "text-gray-500", size: 16 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Level" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: getDifficultyColor(course.difficulty || "intermediate"), size: "sm", variant: "light", children: (course.difficulty || "intermediate").charAt(0).toUpperCase() + (course.difficulty || "intermediate").slice(1) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconBook, { className: "text-gray-500", size: 16 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Category" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium", size: "sm", children: course.category || "General" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconCertificate, { className: "text-gray-500", size: 16 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Certificate" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium", size: "sm", children: "Included" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconWorldWww, { className: "text-gray-500", size: 16 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Access" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium", size: "sm", children: "Lifetime" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { className: "text-gray-500", size: 16 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Last Updated" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium", size: "sm", children: course.updatedAt ? formatRelativeTime(course.updatedAt) : "N/A" })
          ] })
        ] })
      ] }),
      course.tags && course.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-left", "data-aos-delay": "400", "data-aos-duration": "500", p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 4, children: "Tags" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { gap: "xs", children: course.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { size: "sm", variant: "outline", children: tag }, tag)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-left", "data-aos-delay": "500", "data-aos-duration": "500", p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 4, children: "Course Stats" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Students Enrolled" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium", size: "sm", children: (course.enrollmentCount || 0).toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Completions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium", size: "sm", children: (course.completionCount || 0).toLocaleString() })
          ] }),
          (course.averageRating || 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Average Rating" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium", size: "sm", children: (course.averageRating || 0).toFixed(1) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconStar, { className: "text-yellow-500", fill: "currentColor", size: 14 })
            ] })
          ] })
        ] })
      ] })
    ] }) })
  ] }) }) });
}
const SplitComponent = Outlet;
export {
  CourseDetails,
  SplitComponent as component
};
