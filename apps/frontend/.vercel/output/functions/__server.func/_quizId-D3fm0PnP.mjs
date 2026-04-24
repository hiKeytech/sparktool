import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { O as Outlet, e as useNavigate, f as useParams } from "./_libs/tanstack__react-router.mjs";
import { aL as Route$8, aM as useQuiz, _ as useListCourses, f as formatDate } from "./_ssr/router-D664CQ4V.mjs";
import "./_ssr/tenant-contract-BrIl-2Jr.mjs";
import "./_ssr/course-structure-D2f1-VM0.mjs";
import "./_ssr/index.mjs";
import "./_ssr/platform-config-DKda_4-W.mjs";
import "./_ssr/session-DEslDYHo.mjs";
import "./_ssr/course-C8X6AilP.mjs";
import "./_ssr/course-lesson-C_qGHOXP.mjs";
import "./_libs/aos.mjs";
import "./_libs/dayjs.mjs";
import { D as Container, G as Group, z as Loader, F as Card, y as Stack, E as Title, T as Text, a as Button, H as Grid, a2 as ThemeIcon, Q as Badge } from "./_libs/mantine__core.mjs";
import { u as IconArrowLeft, o as IconBook, B as IconChecklist, C as IconTarget, g as IconClock, y as IconCalendar } from "./_libs/tabler__icons-react.mjs";
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
function QuizDetails() {
  const {
    tenant
  } = Route$8.useRouteContext();
  const navigate = useNavigate();
  const {
    quizId
  } = useParams({
    strict: false
  });
  const {
    data: quiz,
    isLoading
  } = useQuiz(quizId);
  const {
    data: courses = []
  } = useListCourses(tenant.id);
  const course = courses.find((item) => item.id === quiz?.courseId);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { justify: "center", py: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { className: "text-fun-green-600", size: "lg" }) }) });
  }
  if (!quiz) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "xl", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Quiz not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", ta: "center", children: "This quiz could not be loaded for the current tenant." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconArrowLeft, { size: 16 }), onClick: () => tenant.id && navigate({
        params: {
          tenant: tenant.id
        },
        to: "/$tenant/admin/quizzes"
      }), variant: "light", children: "Back to Quiz Management" })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconArrowLeft, { size: 16 }), mb: "md", onClick: () => tenant.id && navigate({
          params: {
            tenant: tenant.id
          },
          to: "/$tenant/admin/quizzes"
        }), variant: "subtle", children: "Back to Quiz Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "text-fun-green-800", order: 1, children: quiz.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", children: "Review assessment settings before editing questions." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => tenant.id && navigate({
        params: {
          quizId: quiz.id,
          tenant: tenant.id
        },
        to: "/$tenant/admin/quizzes/$quizId/questions"
      }), children: "Manage Questions" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 6,
        xl: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "md", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Course" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 700, size: "lg", children: course?.title || "Unknown Course" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "blue", size: 40, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconBook, { size: 20 }) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 6,
        xl: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "md", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Question Count" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 700, size: "lg", children: quiz.questions.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "grape", size: 40, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconChecklist, { size: 20 }) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 6,
        xl: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "md", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Passing Score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 700, size: "lg", children: [
            quiz.passingScore,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "orange", size: 40, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTarget, { size: 20 }) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 6,
        xl: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "md", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Time Limit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 700, size: "lg", children: quiz.timeLimit || "No limit" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "teal", size: 40, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { size: 20 }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Quiz Overview" }),
      quiz.description ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: quiz.description }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", children: "No description has been provided for this quiz." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color: "green", variant: "light", children: [
          "Max Attempts: ",
          quiz.maxAttempts || "Unlimited"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color: "blue", variant: "light", children: [
          "Created ",
          formatDate(quiz.createdAt)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color: "gray", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCalendar, { size: 12 }), variant: "light", children: [
          "Updated ",
          formatDate(quiz.updatedAt)
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Question Preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
          quiz.questions.length,
          " total questions"
        ] })
      ] }),
      quiz.questions.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "sm", children: quiz.questions.map((question, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { bg: "gray.0", p: "md", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 600, children: [
            "Question ",
            index + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "light", children: question.type })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: question.question }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
          "Points: ",
          question.points
        ] })
      ] }) }, question.id || `${question.question}-${index}`)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", children: "No questions have been added yet." })
    ] }) })
  ] }) });
}
const SplitComponent = Outlet;
export {
  QuizDetails,
  SplitComponent as component
};
