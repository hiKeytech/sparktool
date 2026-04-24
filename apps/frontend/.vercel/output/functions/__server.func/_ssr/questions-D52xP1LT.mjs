import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate, f as useParams } from "../_libs/tanstack__react-router.mjs";
import { Q as QuestionBuilder } from "./question-builder-BRcYEjl_.mjs";
import { aV as Route$2, aM as useQuiz, ar as useUpdateQuiz } from "./router-D664CQ4V.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { D as Container, G as Group, z as Loader, $ as Alert, y as Stack, a as Button, E as Title, T as Text, F as Card } from "../_libs/mantine__core.mjs";
import { b as IconAlertCircle, u as IconArrowLeft, aw as IconDeviceFloppy } from "../_libs/tabler__icons-react.mjs";
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
import "../_libs/hello-pangea__dnd.mjs";
import "../_libs/redux.mjs";
import "../_libs/react-redux.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/css-box-model.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/raf-schd.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/mantine__hooks.mjs";
import "../_libs/mantine__form.mjs";
import "../_libs/klona.mjs";
import "../_libs/fast-deep-equal.mjs";
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
function QuizQuestionManagement() {
  const {
    tenant
  } = Route$2.useRouteContext();
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
  const updateQuiz = useUpdateQuiz();
  const [questions, setQuestions] = reactExports.useState([]);
  reactExports.useEffect(() => {
    if (quiz) {
      setQuestions((quiz.questions || []).map(({
        id: _id,
        ...question
      }) => question));
    }
  }, [quiz]);
  const handleSave = () => {
    if (!quiz) return;
    updateQuiz.mutate({
      quizData: {
        questions,
        updatedAt: Date.now()
      },
      quizId: quiz.id
    }, {
      onSuccess: () => {
        notifications.show({
          color: "green",
          message: "Quiz questions saved successfully.",
          title: "Saved"
        });
      }
    });
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { justify: "center", py: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { className: "text-fun-green-600", size: "lg" }) }) });
  }
  if (!quiz) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "red", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 16 }), title: "Quiz not found", children: "This quiz could not be loaded for the current tenant." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconArrowLeft, { size: 16 }), mb: "md", onClick: () => tenant.id && navigate({
          params: {
            quizId: quiz.id,
            tenant: tenant.id
          },
          to: "/$tenant/admin/quizzes/$quizId"
        }), variant: "subtle", children: "Back to Quiz Details" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "text-fun-green-800", order: 1, children: "Manage Questions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", children: [
          "Update the assessment content for ",
          quiz.title,
          "."
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconDeviceFloppy, { size: 16 }), loading: updateQuiz.isPending, onClick: handleSave, children: "Save Questions" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", children: "Question order and scoring are saved directly to this quiz. At least one question is required." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(QuestionBuilder, { onChange: setQuestions, questions })
    ] }) })
  ] }) });
}
export {
  QuizQuestionManagement as component
};
