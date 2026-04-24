import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { f as useParams, e as useNavigate } from "./_libs/tanstack__react-router.mjs";
import { b6 as Route, I as useAuthContext, aM as useQuiz, b7 as useCreateQuizAttempt, b8 as useUpdateQuizAttempt, P as PendingOverlay, b9 as formatTime } from "./_ssr/router-D664CQ4V.mjs";
import "./_ssr/tenant-contract-BrIl-2Jr.mjs";
import "./_ssr/course-structure-D2f1-VM0.mjs";
import "./_ssr/index.mjs";
import "./_ssr/platform-config-DKda_4-W.mjs";
import "./_ssr/session-DEslDYHo.mjs";
import "./_ssr/course-C8X6AilP.mjs";
import "./_ssr/course-lesson-C_qGHOXP.mjs";
import "./_libs/aos.mjs";
import "./_libs/dayjs.mjs";
import { D as Container, x as Center, y as Stack, z as Loader, T as Text, F as Card, G as Group, a4 as RingProgress, E as Title, Q as Badge, a as Button, aa as Paper, R as Progress, H as Grid, p as ActionIcon, aj as Radio, a7 as Textarea, ag as Divider, $ as Alert, M as Modal } from "./_libs/mantine__core.mjs";
import { z as IconTrophy, ak as IconX, u as IconArrowLeft, a6 as IconRefresh, g as IconClock, aF as IconFlag, a7 as IconArrowRight, b as IconAlertCircle } from "./_libs/tabler__icons-react.mjs";
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
function QuizAssessment() {
  const {
    tenant
  } = Route.useRouteContext();
  const {
    user
  } = useAuthContext();
  const {
    courseId,
    quizId
  } = useParams({
    strict: false
  });
  const navigate = useNavigate();
  const attemptInitializationRef = reactExports.useRef(false);
  const [quizState, setQuizState] = reactExports.useState({
    answers: {},
    attempt: null,
    currentQuestionIndex: 0,
    isSubmitted: false,
    timeRemaining: 0
  });
  const [showResults, setShowResults] = reactExports.useState(false);
  const [confirmSubmitModal, setConfirmSubmitModal] = reactExports.useState(false);
  const {
    data: quiz,
    isLoading: quizLoading
  } = useQuiz(quizId || "", {
    enabled: !!quizId
  });
  const createAttemptMutation = useCreateQuizAttempt();
  const updateAttemptMutation = useUpdateQuizAttempt();
  reactExports.useEffect(() => {
    if (quizState.timeRemaining > 0 && !quizState.isSubmitted) {
      const timer = setInterval(() => {
        setQuizState((prev) => {
          const newTimeRemaining = prev.timeRemaining - 1;
          if (newTimeRemaining <= 0) {
            handleSubmitQuiz();
            return {
              ...prev,
              timeRemaining: 0
            };
          }
          return {
            ...prev,
            timeRemaining: newTimeRemaining
          };
        });
      }, 1e3);
      return () => clearInterval(timer);
    }
  }, [quizState.timeRemaining, quizState.isSubmitted]);
  reactExports.useEffect(() => {
    if (quiz && user && !quizState.attempt && !attemptInitializationRef.current && !createAttemptMutation.isPending) {
      attemptInitializationRef.current = true;
      const initialTimeLimit = quiz.timeLimit ? quiz.timeLimit * 60 : 3600;
      setQuizState((prev) => ({
        ...prev,
        timeRemaining: initialTimeLimit
      }));
      createAttemptMutation.mutate({
        courseId: quiz.courseId,
        quizId: quiz.id,
        studentId: user.uid
      }, {
        onSuccess: (attempt) => {
          if (!attempt) return;
          setQuizState((prev) => ({
            ...prev,
            attempt
          }));
        },
        onError: () => {
          attemptInitializationRef.current = false;
        }
      });
    }
  }, [createAttemptMutation.isPending, quiz, quizState.attempt, user]);
  reactExports.useEffect(() => {
    if (!updateAttemptMutation.isSuccess) return;
    setQuizState((prev) => {
      if (prev.isSubmitted) return prev;
      return {
        ...prev,
        isSubmitted: true
      };
    });
    setShowResults(true);
    setConfirmSubmitModal(false);
  }, [updateAttemptMutation.isSuccess]);
  const handleAnswerChange = (questionIndex, answer) => {
    setQuizState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionIndex.toString()]: answer
      }
    }));
  };
  const handleNextQuestion = () => {
    if (quiz && quizState.currentQuestionIndex < quiz.questions.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    }
  };
  const handlePreviousQuestion = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1
      }));
    }
  };
  const handleQuestionJump = (index) => {
    setQuizState((prev) => ({
      ...prev,
      currentQuestionIndex: index
    }));
  };
  const calculateResults = reactExports.useCallback(() => {
    if (!quiz) return null;
    let totalPoints = 0;
    let earnedPoints = 0;
    const results = [];
    quiz.questions.forEach((question, index) => {
      const userAnswer = quizState.answers[index.toString()];
      const isCorrect = userAnswer === question.correctAnswer;
      const pointsEarned = isCorrect ? question.points : 0;
      totalPoints += question.points;
      earnedPoints += pointsEarned;
      results.push({
        answer: userAnswer,
        isCorrect,
        pointsEarned,
        questionId: question.id
      });
    });
    const percentage = totalPoints > 0 ? earnedPoints / totalPoints * 100 : 0;
    const passed = percentage >= quiz.passingScore;
    return {
      answers: results,
      passed,
      percentage: Math.round(percentage),
      score: earnedPoints,
      totalPoints
    };
  }, [quiz, quizState.answers]);
  const handleSubmitQuiz = () => {
    if (!quiz || !quizState.attempt) return;
    const results = calculateResults();
    if (!results) return;
    const updateData = {
      completedAt: Date.now(),
      rawAnswers: Object.fromEntries(quiz.questions.map((question, index) => [question.id, quizState.answers[index.toString()]])),
      timeSpent: (quiz.timeLimit ? quiz.timeLimit * 60 : 3600) - quizState.timeRemaining
    };
    updateAttemptMutation.mutate({
      attemptData: updateData,
      attemptId: quizState.attempt.id || ""
    });
  };
  if (!quiz) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Center, { h: 400, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { color: "fun-green", size: "xl" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", children: "Quiz not found" })
    ] }) }) });
  }
  const currentQuestion = quiz.questions[quizState.currentQuestionIndex];
  const progress = (quizState.currentQuestionIndex + 1) / quiz.questions.length * 100;
  const answeredQuestions = Object.keys(quizState.answers).length;
  if (quizLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PendingOverlay, { reason: "Loading quiz...", visible: quizLoading });
  }
  if (showResults && quizState.attempt) {
    const results = calculateResults();
    if (!results) return null;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "xl", radius: "lg", shadow: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "lg", children: [
        results.passed ? /* @__PURE__ */ jsxRuntimeExports.jsx(RingProgress, { label: /* @__PURE__ */ jsxRuntimeExports.jsx(Center, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrophy, { className: "text-fun-green-600", size: 32 }) }), sections: [{
          color: "fun-green",
          value: results.percentage
        }], size: 120, thickness: 8 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(RingProgress, { label: /* @__PURE__ */ jsxRuntimeExports.jsx(Center, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconX, { className: "text-red-600", size: 32 }) }), sections: [{
          color: "red",
          value: results.percentage
        }], size: 120, thickness: 8 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { c: results.passed ? "fun-green" : "red", order: 2, children: results.passed ? "Congratulations!" : "Keep Learning" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 600, size: "lg", children: [
            "Score: ",
            results.score,
            "/",
            results.totalPoints,
            " (",
            results.percentage,
            "%)"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", children: [
            "Passing Score: ",
            quiz.passingScore,
            "%"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: results.passed ? "fun-green" : "red", size: "lg", variant: "light", children: results.passed ? "PASSED" : "NEEDS IMPROVEMENT" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "fun-green", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconArrowLeft, { size: 16 }), onClick: () => tenant.id && navigate({
          params: {
            courseId,
            tenant: tenant.id
          },
          to: "/$tenant/student/courses/$courseId"
        }), variant: "filled", children: "Back to Course" }),
        !results.passed && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "fun-green", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconRefresh, { size: 16 }), onClick: () => {
          attemptInitializationRef.current = false;
          createAttemptMutation.reset();
          updateAttemptMutation.reset();
          setQuizState({
            answers: {},
            attempt: null,
            currentQuestionIndex: 0,
            isSubmitted: false,
            timeRemaining: quiz.timeLimit ? quiz.timeLimit * 60 : 3600
          });
          setShowResults(false);
        }, variant: "outline", children: "Retake Quiz" })
      ] })
    ] }) }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-aos": "fade-up", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { mb: "xl", p: "lg", radius: "lg", shadow: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "text-fun-green-800", order: 2, children: quiz.title }),
          quiz.description && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", mt: "xs", children: quiz.description })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Paper, { bg: "fun-green.0", p: "md", radius: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { className: "text-fun-green-600", size: 20 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: quizState.timeRemaining < 300 ? "red" : "fun-green", fw: 600, children: formatTime(quizState.timeRemaining) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
            "Question ",
            quizState.currentQuestionIndex + 1,
            " of",
            " ",
            quiz.questions.length
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
            answeredQuestions,
            "/",
            quiz.questions.length,
            " answered"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { color: "fun-green", radius: "xl", size: "lg", value: progress })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 3, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { h: "fit-content", p: "md", radius: "lg", shadow: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { mb: "md", order: 4, children: "Questions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "xs", children: quiz.questions.map((_, index) => {
          const isAnswered = index in quizState.answers;
          const isCurrent = index === quizState.currentQuestionIndex;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(ActionIcon, { className: "cursor-pointer", color: isCurrent ? "fun-green" : isAnswered ? "blue" : "gray", onClick: () => handleQuestionJump(index), size: "lg", variant: isCurrent ? "filled" : isAnswered ? "light" : "outline", children: index + 1 }, index);
        }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 9, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-left", "data-aos-duration": "300", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "xl", radius: "lg", shadow: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color: "fun-green", variant: "light", children: [
              currentQuestion.points,
              " points"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "gray", variant: "outline", children: currentQuestion.type.replace("-", " ") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { mb: "md", order: 3, children: currentQuestion.question })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          currentQuestion.type === "multiple-choice" && currentQuestion.options && /* @__PURE__ */ jsxRuntimeExports.jsx(Radio.Group, { onChange: (value) => handleAnswerChange(quizState.currentQuestionIndex, parseInt(value)), value: quizState.answers[quizState.currentQuestionIndex]?.toString() || "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "md", children: currentQuestion.options.map((option, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "p-3 transition-colors border rounded-lg border-stone-200 hover:bg-stone-50", label: option, size: "md", value: index.toString() }, index)) }) }),
          currentQuestion.type === "true-false" && currentQuestion.options && /* @__PURE__ */ jsxRuntimeExports.jsx(Radio.Group, { onChange: (value) => handleAnswerChange(quizState.currentQuestionIndex, parseInt(value)), value: quizState.answers[quizState.currentQuestionIndex]?.toString() || "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { gap: "xl", children: currentQuestion.options.map((option, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { className: "p-4 transition-colors border rounded-lg border-stone-200 hover:bg-stone-50", label: option, size: "lg", value: index.toString() }, index)) }) }),
          currentQuestion.type === "essay" && /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { minRows: 6, onChange: (event) => handleAnswerChange(quizState.currentQuestionIndex, event.currentTarget.value), placeholder: "Enter your answer here...", radius: "md", value: quizState.answers[quizState.currentQuestionIndex]?.toString() || "" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "gray", disabled: quizState.currentQuestionIndex === 0, leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconArrowLeft, { size: 16 }), onClick: handlePreviousQuestion, variant: "outline", children: "Previous" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { children: quizState.currentQuestionIndex === quiz.questions.length - 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "fun-green", disabled: answeredQuestions === 0, onClick: () => setConfirmSubmitModal(true), rightSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconFlag, { size: 16 }), children: "Submit Quiz" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "fun-green", onClick: handleNextQuestion, rightSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconArrowRight, { size: 16 }), children: "Next" }) })
        ] })
      ] }) }) }) })
    ] }),
    answeredQuestions < quiz.questions.length && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { color: "amber", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 16 }), mt: "md", title: "Incomplete Quiz", children: [
      "You have ",
      quiz.questions.length - answeredQuestions,
      " unanswered questions. Make sure to answer all questions before submitting."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Modal, { centered: true, onClose: () => setConfirmSubmitModal(false), opened: confirmSubmitModal, title: "Submit Quiz", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { children: [
        "Are you sure you want to submit your quiz? You have answered",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: answeredQuestions }),
        " out of",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: quiz.questions.length }),
        " questions."
      ] }),
      answeredQuestions < quiz.questions.length && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { color: "amber", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 16 }), children: [
        "You have ",
        quiz.questions.length - answeredQuestions,
        " unanswered questions. These will be marked as incorrect."
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setConfirmSubmitModal(false), variant: "outline", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "fun-green", onClick: handleSubmitQuiz, children: "Submit Quiz" })
      ] })
    ] }) })
  ] }) });
}
export {
  QuizAssessment as component
};
