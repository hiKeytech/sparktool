import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { a0 as Route$p, I as useAuthContext, a1 as useAiHealth, _ as useListCourses, a2 as useCourseWithStructure, a3 as useAiChatThread, a4 as useListAiPracticeQuizSessions, a5 as useGenerateAiPracticeQuiz, a6 as useSubmitAiPracticeQuiz, a7 as useSendAiChatMessage, P as PendingOverlay } from "./router-D664CQ4V.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { D as Container, y as Stack, G as Group, E as Title, T as Text, Q as Badge, $ as Alert, i as SimpleGrid, F as Card, K as Select, a5 as Tabs, aa as Paper, S as ScrollArea, z as Loader, a7 as Textarea, a1 as List, a as Button, aj as Radio } from "../_libs/mantine__core.mjs";
import { n as IconSparkles, b as IconAlertCircle, a3 as IconTargetArrow, a4 as IconBrain, v as IconMessageCircle, a5 as IconSend, d as IconPlayerPlay, a6 as IconRefresh, g as IconClock, a7 as IconArrowRight } from "../_libs/tabler__icons-react.mjs";
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
function StudentAiAssistantPage() {
  const {
    tenant
  } = Route$p.useRouteContext();
  const {
    user
  } = useAuthContext();
  const navigate = useNavigate();
  const search = Route$p.useSearch();
  const [selectedCourseId, setSelectedCourseId] = reactExports.useState(search.courseId ?? null);
  const [selectedLessonId, setSelectedLessonId] = reactExports.useState(null);
  const [difficulty, setDifficulty] = reactExports.useState("intermediate");
  const [questionCount, setQuestionCount] = reactExports.useState("5");
  const [practiceSession, setPracticeSession] = reactExports.useState(null);
  const [practiceAnswers, setPracticeAnswers] = reactExports.useState({});
  const [chatMessage, setChatMessage] = reactExports.useState("");
  const [activeTab, setActiveTab] = reactExports.useState("chat");
  const {
    data: aiHealth,
    error: aiHealthError,
    isLoading: aiHealthLoading
  } = useAiHealth();
  const {
    data: courses = [],
    isLoading: coursesLoading
  } = useListCourses(tenant.id, {
    published: true
  });
  const {
    data: courseStructure,
    isLoading: structureLoading
  } = useCourseWithStructure(selectedCourseId || "", {
    enabled: !!selectedCourseId
  });
  const {
    data: chatThread,
    error: chatError,
    isLoading: chatLoading
  } = useAiChatThread({
    courseId: selectedCourseId,
    lessonId: selectedLessonId
  }, {
    enabled: aiHealth?.configured !== false
  });
  const {
    data: practiceSessions = [],
    error: practiceSessionsError,
    isLoading: practiceSessionsLoading
  } = useListAiPracticeQuizSessions(selectedCourseId, {
    enabled: Boolean(selectedCourseId) && aiHealth?.configured !== false
  });
  const generatePracticeQuiz = useGenerateAiPracticeQuiz();
  const submitPracticeQuiz = useSubmitAiPracticeQuiz();
  const sendChatMessage = useSendAiChatMessage();
  const courseOptions = reactExports.useMemo(() => courses.map((course) => ({
    label: course.title || "Untitled course",
    value: course.id
  })), [courses]);
  const selectedCourse = courseOptions.find((course) => course.value === selectedCourseId);
  const lessonOptions = reactExports.useMemo(() => {
    if (!courseStructure?.sections) {
      return [];
    }
    return courseStructure.sections.flatMap((section) => (section.lessons ?? []).map((lesson) => ({
      label: `${section.title}: ${lesson.title}`,
      value: lesson.id
    })));
  }, [courseStructure]);
  const latestPracticeSession = practiceSessions[0] ?? null;
  const unansweredCount = practiceSession?.questions.filter((question) => !practiceAnswers[question.id]).length ?? 0;
  const aiUnavailable = aiHealth?.configured === false || Boolean(aiHealthError);
  reactExports.useEffect(() => {
    if (!practiceSession && latestPracticeSession) {
      setPracticeSession(latestPracticeSession);
      setPracticeAnswers(Object.fromEntries((latestPracticeSession.answers ?? []).map((answer) => [answer.questionId, answer.selectedOptionId])));
    }
  }, [latestPracticeSession, practiceSession]);
  const handleGeneratePracticeQuiz = () => {
    if (!selectedCourseId) {
      notifications.show({
        color: "yellow",
        message: "Choose a course before generating a practice quiz.",
        title: "Course required"
      });
      return;
    }
    generatePracticeQuiz.mutate({
      courseId: selectedCourseId,
      difficulty,
      lessonId: selectedLessonId,
      questionCount: Number(questionCount)
    }, {
      onError: (error) => {
        notifications.show({
          color: "red",
          message: error.message || "Could not generate AI practice quiz.",
          title: "Generation failed"
        });
      },
      onSuccess: (session) => {
        setPracticeSession(session);
        setPracticeAnswers({});
        setActiveTab("practice");
        notifications.show({
          color: "green",
          message: "Your AI practice quiz is ready.",
          title: "Practice quiz generated"
        });
      }
    });
  };
  const handleSubmitPracticeQuiz = () => {
    if (!practiceSession) {
      return;
    }
    if (Object.keys(practiceAnswers).length === 0) {
      notifications.show({
        color: "yellow",
        message: "Answer at least one question before submitting.",
        title: "No answers yet"
      });
      return;
    }
    submitPracticeQuiz.mutate({
      answers: Object.entries(practiceAnswers).map(([questionId, selectedOptionId]) => ({
        questionId,
        selectedOptionId
      })),
      sessionId: practiceSession.id
    }, {
      onError: (error) => {
        notifications.show({
          color: "red",
          message: error.message || "Could not submit AI practice quiz.",
          title: "Submission failed"
        });
      },
      onSuccess: (session) => {
        setPracticeSession(session);
        notifications.show({
          color: "green",
          message: `You scored ${session.result?.percentage ?? 0}%.`,
          title: "Practice quiz submitted"
        });
      }
    });
  };
  const handleSendChatMessage = () => {
    const trimmed = chatMessage.trim();
    if (!trimmed) {
      return;
    }
    if (aiUnavailable) {
      notifications.show({
        color: "yellow",
        message: "AI chat is currently unavailable.",
        title: "Unavailable"
      });
      return;
    }
    sendChatMessage.mutate({
      courseId: selectedCourseId,
      lessonId: selectedLessonId,
      message: trimmed,
      threadId: chatThread?.id ?? null
    }, {
      onError: (error) => {
        notifications.show({
          color: "red",
          message: error.message || "Could not send AI message.",
          title: "Chat failed"
        });
      },
      onSuccess: () => {
        setChatMessage("");
      }
    });
  };
  if (aiHealthLoading || coursesLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PendingOverlay, { instruction: "Preparing the AI study space.", reason: "Loading AI assistant...", visible: true });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "flex-start", justify: "space-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 1, children: "AI Assistant" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", mt: "xs", children: "Open a dedicated study space for practice quizzes and course-aware chat." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "fun-green", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSparkles, { size: 12 }), size: "lg", children: "Student Study Mode" })
    ] }),
    aiHealth?.configured === false && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "yellow", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 16 }), title: "AI is unavailable", children: aiHealth.error || "AI features are not configured yet. Add the AI environment variables before enabling this page in production." }),
    aiHealthError && aiHealth?.configured !== false && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "red", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 16 }), title: "Could not verify AI service", children: aiHealthError.message }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SimpleGrid, { cols: {
      base: 1,
      md: 3
    }, spacing: "lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "blue", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTargetArrow, { size: 12 }), variant: "light", children: "Scope" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 4, children: selectedCourse?.label ?? "No course selected" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: selectedLessonId ? lessonOptions.find((lesson) => lesson.value === selectedLessonId)?.label ?? "Focused lesson" : "All lessons in the selected course" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "grape", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconBrain, { size: 12 }), variant: "light", children: "Latest Practice" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 4, children: latestPracticeSession ? `${latestPracticeSession.questionCount} questions` : "No quiz yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: latestPracticeSession?.result ? `${latestPracticeSession.result.percentage}% on your latest attempt` : latestPracticeSession ? "Resume your most recent practice session." : "Generate a revision quiz when you are ready." })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "green", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconMessageCircle, { size: 12 }), variant: "light", children: "Chat State" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 4, children: (chatThread?.messages?.length ?? 0) > 0 ? `${chatThread?.messages.length} messages` : "Fresh conversation" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: selectedCourseId ? "Chat answers are grounded in the selected course where possible." : "Select a course for context-aware help, or ask for general study support." })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 4, children: "Study Scope" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "end", grow: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { clearable: true, data: courseOptions, label: "Course", onChange: (value) => {
          setSelectedCourseId(value);
          setSelectedLessonId(null);
          setPracticeSession(null);
          setPracticeAnswers({});
          navigate({
            params: {
              tenant: tenant.id
            },
            search: {
              courseId: value || void 0
            },
            to: "/$tenant/student/ai"
          });
        }, placeholder: "Choose a course", value: selectedCourseId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { clearable: true, data: lessonOptions, disabled: !selectedCourseId || structureLoading, label: "Lesson", onChange: setSelectedLessonId, placeholder: "Optional lesson focus", value: selectedLessonId })
      ] }),
      !selectedCourseId && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Select a course first. Practice quizzes require a course, while chat works best with course context." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { onChange: setActiveTab, value: activeTab, variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs.List, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Tab, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconMessageCircle, { size: 16 }), value: "chat", children: "Study Chat" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Tab, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconBrain, { size: 16 }), value: "practice", children: "Practice Quiz" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Panel, { pt: "lg", value: "chat", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 4, children: "Ask Anything" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Ask for explanations, summaries, revision help, or likely practice areas." })
          ] }),
          selectedCourseId ? /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "light", children: selectedCourse?.label }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "gray", variant: "light", children: "General mode" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Paper, { bg: "gray.0", p: "md", radius: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { h: 360, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "sm", children: [
          chatLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { size: "sm" }),
          chatError && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "red", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 16 }), children: chatError.message }),
          !chatLoading && (chatThread?.messages?.length ?? 0) === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Start the conversation. Ask the assistant to explain a topic, summarize a lesson, or quiz you." }),
          chatThread?.messages.map((message) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { bg: message.role === "assistant" ? "fun-green.0" : "white", p: "sm", radius: "md", withBorder: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", fw: 600, size: "xs", tt: "uppercase", children: message.role === "assistant" ? "AI Tutor" : user?.displayName || "You" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { mt: 4, style: {
              whiteSpace: "pre-wrap"
            }, children: message.content })
          ] }, message.id))
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { autosize: true, label: "Your message", minRows: 3, onChange: (event) => setChatMessage(event.currentTarget.value), placeholder: "Explain this lesson in simpler terms...", value: chatMessage }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(List, { c: "dimmed", size: "sm", spacing: 4, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(List.Item, { children: "Ask for a simpler explanation of a lesson." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(List.Item, { children: "Ask for 5 revision questions before a real quiz." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(List.Item, { children: "Ask what topic to revise next based on the course scope." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { justify: "flex-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "fun-green", disabled: !chatMessage.trim() || aiUnavailable, leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSend, { size: 16 }), loading: sendChatMessage.isPending, onClick: handleSendChatMessage, children: "Send" }) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Panel, { pt: "lg", value: "practice", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 4, children: "Generate a Practice Quiz" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Build an on-demand revision quiz from the selected course or lesson." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
              latestPracticeSession && latestPracticeSession.id !== practiceSession?.id && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlayerPlay, { size: 16 }), onClick: () => {
                setPracticeSession(latestPracticeSession);
                setPracticeAnswers(Object.fromEntries((latestPracticeSession.answers ?? []).map((answer) => [answer.questionId, answer.selectedOptionId])));
              }, variant: "light", children: "Resume Latest" }),
              practiceSession && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconRefresh, { size: 16 }), onClick: () => {
                setPracticeSession(null);
                setPracticeAnswers({});
              }, variant: "light", children: "Reset" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "end", grow: true, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { data: [{
              label: "Beginner",
              value: "beginner"
            }, {
              label: "Intermediate",
              value: "intermediate"
            }, {
              label: "Advanced",
              value: "advanced"
            }], label: "Difficulty", onChange: (value) => setDifficulty(value || "intermediate"), value: difficulty }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { data: [{
              label: "3 questions",
              value: "3"
            }, {
              label: "5 questions",
              value: "5"
            }, {
              label: "8 questions",
              value: "8"
            }, {
              label: "10 questions",
              value: "10"
            }], label: "Question count", onChange: (value) => setQuestionCount(value || "5"), value: questionCount }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "fun-green", disabled: !selectedCourseId || aiUnavailable, leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSparkles, { size: 16 }), loading: generatePracticeQuiz.isPending, onClick: handleGeneratePracticeQuiz, children: "Generate" })
          ] })
        ] }) }),
        practiceSessionsError && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "red", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 16 }), children: practiceSessionsError.message }),
        practiceSessionsLoading && selectedCourseId && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { size: "sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: "Checking for recent AI practice sessions..." })
        ] }) }),
        practiceSession && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: practiceSession.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", mt: "xs", size: "sm", children: [
              practiceSession.questionCount,
              " questions •",
              " ",
              practiceSession.difficulty
            ] })
          ] }),
          !practiceSession.result && unansweredCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { color: "yellow", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { size: 16 }), title: "Quiz in progress", children: [
            unansweredCount,
            " question",
            unansweredCount === 1 ? "" : "s",
            " still unanswered."
          ] }),
          practiceSession.questions.map((question, index) => {
            const resultItem = practiceSession.result?.items.find((item) => item.questionId === question.id);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(Paper, { p: "md", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 600, children: [
                  index + 1,
                  ". ",
                  question.prompt
                ] }),
                resultItem && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: resultItem.isCorrect ? "green" : "red", variant: "light", children: resultItem.isCorrect ? "Correct" : "Review" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Radio.Group, { onChange: (value) => setPracticeAnswers((current) => ({
                ...current,
                [question.id]: value
              })), value: practiceAnswers[question.id] || "", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "xs", children: question.options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { disabled: Boolean(practiceSession.result), label: option.text, value: option.id }, option.id)) }) }),
              resultItem && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: resultItem.isCorrect ? "green" : "blue", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconArrowRight, { size: 16 }), title: "Explanation", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: resultItem.explanation }) })
            ] }) }, question.id);
          }),
          practiceSession.result ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { color: "fun-green", title: "Practice Summary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { children: [
              practiceSession.result.correctAnswers,
              "/",
              practiceSession.result.totalQuestions,
              " correct (",
              practiceSession.result.percentage,
              "%)"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { mt: "xs", size: "sm", children: practiceSession.result.feedbackSummary })
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { justify: "flex-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "fun-green", disabled: Object.keys(practiceAnswers).length === 0, loading: submitPracticeQuiz.isPending, onClick: handleSubmitPracticeQuiz, children: "Submit Practice Quiz" }) })
        ] }) })
      ] }) })
    ] })
  ] }) });
}
export {
  StudentAiAssistantPage as component
};
