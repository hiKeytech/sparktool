import { useEffect, useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Alert,
  Badge,
  Button,
  Card,
  Checkbox,
  Container,
  FileInput,
  Group,
  List,
  Loader,
  Paper,
  Radio,
  ScrollArea,
  Select,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import {
  IconAlertCircle,
  IconArrowRight,
  IconBrain,
  IconClock,
  IconFileText,
  IconMessageCircle,
  IconPlayerPlay,
  IconRefresh,
  IconSend,
  IconSparkles,
  IconTargetArrow,
  IconUpload,
} from "@tabler/icons-react";

import { PendingOverlay } from "@/components/shared/pending-overlay";
import { useAuthContext } from "@/providers/auth-provider";
import type { AiDifficulty, AiPracticeQuizSession } from "@/schemas/ai";
import type { Tenant } from "@/schemas/tenant-contract";
import {
  useAiChatThread,
  useAiDocuments,
  useAiHealth,
  useCreateAiDocument,
  useCourseWithStructure,
  useGenerateAiPracticeQuiz,
  useListAiPracticeQuizSessions,
  useListCourses,
  useSendAiChatMessage,
  useSubmitAiPracticeQuiz,
} from "@/services/hooks";

export const Route = createFileRoute("/$tenant/student/ai")({
  component: StudentAiAssistantPage,
  validateSearch: (search: Record<string, unknown>) => ({
    courseId: typeof search.courseId === "string" ? search.courseId : undefined,
  }),
});

function StudentAiAssistantPage() {
  const { tenant } = Route.useRouteContext() as { tenant: Tenant };
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const search = Route.useSearch();

  const [selectedCourseId, setSelectedCourseId] = useState<null | string>(
    search.courseId ?? null,
  );
  const [selectedLessonId, setSelectedLessonId] = useState<null | string>(null);
  const [difficulty, setDifficulty] = useState<AiDifficulty>("intermediate");
  const [questionCount, setQuestionCount] = useState("5");
  const [practiceSession, setPracticeSession] =
    useState<AiPracticeQuizSession | null>(null);
  const [practiceAnswers, setPracticeAnswers] = useState<Record<string, string>>(
    {},
  );
  const [chatMessage, setChatMessage] = useState("");
  const [selectedDocumentIds, setSelectedDocumentIds] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState<null | string>("chat");

  const {
    data: aiHealth,
    error: aiHealthError,
    isLoading: aiHealthLoading,
  } = useAiHealth();
  const {
    data: courses = [],
    isLoading: coursesLoading,
  } = useListCourses(tenant.id, {
    published: true,
  });
  const { data: courseStructure, isLoading: structureLoading } =
    useCourseWithStructure(selectedCourseId || "", {
      enabled: !!selectedCourseId,
    });
  const {
    data: chatThread,
    error: chatError,
    isLoading: chatLoading,
  } = useAiChatThread(
    {
      courseId: selectedCourseId,
      lessonId: selectedLessonId,
    },
    {
      enabled: aiHealth?.configured !== false,
    },
  );
  const {
    data: aiDocuments = [],
    error: aiDocumentsError,
    isLoading: aiDocumentsLoading,
  } = useAiDocuments({
    courseId: selectedCourseId,
    lessonId: selectedLessonId,
  });
  const {
    data: practiceSessions = [],
    error: practiceSessionsError,
    isLoading: practiceSessionsLoading,
  } = useListAiPracticeQuizSessions(selectedCourseId, {
    enabled: Boolean(selectedCourseId) && aiHealth?.configured !== false,
  });

  const createAiDocument = useCreateAiDocument();
  const generatePracticeQuiz = useGenerateAiPracticeQuiz();
  const submitPracticeQuiz = useSubmitAiPracticeQuiz();
  const sendChatMessage = useSendAiChatMessage();

  const courseOptions = useMemo(
    () =>
      courses.map((course) => ({
        label: course.title || "Untitled course",
        value: course.id,
      })),
    [courses],
  );

  const selectedCourse = courseOptions.find(
    (course) => course.value === selectedCourseId,
  );

  const lessonOptions = useMemo(() => {
    if (!courseStructure?.sections) {
      return [];
    }

    return courseStructure.sections.flatMap((section) =>
      (section.lessons ?? []).map((lesson) => ({
        label: `${section.title}: ${lesson.title}`,
        value: lesson.id,
      })),
    );
  }, [courseStructure]);

  const latestPracticeSession = practiceSessions[0] ?? null;
  const unansweredCount =
    practiceSession?.questions.filter((question) => !practiceAnswers[question.id])
      .length ?? 0;
  const aiUnavailable =
    aiHealth?.configured === false || Boolean(aiHealthError);

  useEffect(() => {
    if (!practiceSession && latestPracticeSession) {
      setPracticeSession(latestPracticeSession);
      setPracticeAnswers(
        Object.fromEntries(
          (latestPracticeSession.answers ?? []).map((answer) => [
            answer.questionId,
            answer.selectedOptionId,
          ]),
        ),
      );
    }
  }, [latestPracticeSession, practiceSession]);

  useEffect(() => {
    setSelectedDocumentIds((current) => {
      const next = current.filter((documentId) =>
        aiDocuments.some((document) => document.id === documentId),
      );

      if (
        next.length === current.length &&
        next.every((documentId, index) => documentId === current[index])
      ) {
        return current;
      }

      return next;
    });
  }, [aiDocuments]);

  const handleGeneratePracticeQuiz = () => {
    if (!selectedCourseId) {
      notifications.show({
        color: "yellow",
        message: "Choose a course before generating a practice quiz.",
        title: "Course required",
      });
      return;
    }

    generatePracticeQuiz.mutate(
      {
        courseId: selectedCourseId,
        difficulty,
        lessonId: selectedLessonId,
        questionCount: Number(questionCount),
      },
      {
        onError: (error) => {
          notifications.show({
            color: "red",
            message: error.message || "Could not generate AI practice quiz.",
            title: "Generation failed",
          });
        },
        onSuccess: (session) => {
          setPracticeSession(session);
          setPracticeAnswers({});
          setActiveTab("practice");
          notifications.show({
            color: "green",
            message: "Your AI practice quiz is ready.",
            title: "Practice quiz generated",
          });
        },
      },
    );
  };

  const handleSubmitPracticeQuiz = () => {
    if (!practiceSession) {
      return;
    }

    if (Object.keys(practiceAnswers).length === 0) {
      notifications.show({
        color: "yellow",
        message: "Answer at least one question before submitting.",
        title: "No answers yet",
      });
      return;
    }

    submitPracticeQuiz.mutate(
      {
        answers: Object.entries(practiceAnswers).map(
          ([questionId, selectedOptionId]) => ({
            questionId,
            selectedOptionId,
          }),
        ),
        sessionId: practiceSession.id,
      },
      {
        onError: (error) => {
          notifications.show({
            color: "red",
            message: error.message || "Could not submit AI practice quiz.",
            title: "Submission failed",
          });
        },
        onSuccess: (session) => {
          setPracticeSession(session);
          notifications.show({
            color: "green",
            message: `You scored ${session.result?.percentage ?? 0}%.`,
            title: "Practice quiz submitted",
          });
        },
      },
    );
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
        title: "Unavailable",
      });
      return;
    }

    sendChatMessage.mutate(
      {
        courseId: selectedCourseId,
        documentIds: selectedDocumentIds,
        lessonId: selectedLessonId,
        message: trimmed,
        threadId: chatThread?.id ?? null,
      },
      {
        onError: (error) => {
          notifications.show({
            color: "red",
            message: error.message || "Could not send AI message.",
            title: "Chat failed",
          });
        },
        onSuccess: () => {
          setChatMessage("");
        },
      },
    );
  };

  const handleUploadDocument = () => {
    if (!uploadedFile) {
      notifications.show({
        color: "yellow",
        message: "Choose a PDF or DOCX file first.",
        title: "File required",
      });
      return;
    }

    createAiDocument.mutate(
      {
        courseId: selectedCourseId,
        file: uploadedFile,
        lessonId: selectedLessonId,
      },
      {
        onError: (error) => {
          notifications.show({
            color: "red",
            message: error.message || "Could not upload AI document.",
            title: "Upload failed",
          });
        },
        onSuccess: (document) => {
          setUploadedFile(null);
          setSelectedDocumentIds((current) =>
            current.includes(document.id) ? current : [...current, document.id],
          );
          notifications.show({
            color: "green",
            message: `${document.title} is ready for questions.`,
            title: "Document uploaded",
          });
        },
      },
    );
  };

  if (aiHealthLoading || coursesLoading) {
    return (
      <PendingOverlay
        instruction="Preparing the AI study space."
        reason="Loading AI assistant..."
        visible
      />
    );
  }

  return (
    <Container py="xl" size="xl">
      <Stack gap="xl">
        <Group align="flex-start" justify="space-between">
          <div>
            <Title order={1}>AI Assistant</Title>
            <Text c="dimmed" mt="xs">
              Open a dedicated study space for practice quizzes and course-aware
              chat.
            </Text>
          </div>
          <Badge
            color="fun-green"
            leftSection={<IconSparkles size={12} />}
            size="lg"
          >
            Student Study Mode
          </Badge>
        </Group>

        {aiHealth?.configured === false && (
          <Alert
            color="yellow"
            icon={<IconAlertCircle size={16} />}
            title="AI is unavailable"
          >
            {aiHealth.error ||
              "AI features are not configured yet. Add the AI environment variables before enabling this page in production."}
          </Alert>
        )}

        {aiHealthError && aiHealth?.configured !== false && (
          <Alert
            color="red"
            icon={<IconAlertCircle size={16} />}
            title="Could not verify AI service"
          >
            {aiHealthError.message}
          </Alert>
        )}

        <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
          <Card p="lg" radius="lg" withBorder>
            <Stack gap="xs">
              <Badge
                color="blue"
                leftSection={<IconTargetArrow size={12} />}
                variant="light"
              >
                Scope
              </Badge>
              <Title order={4}>
                {selectedCourse?.label ?? "No course selected"}
              </Title>
              <Text c="dimmed" size="sm">
                {selectedLessonId
                  ? lessonOptions.find((lesson) => lesson.value === selectedLessonId)
                      ?.label ?? "Focused lesson"
                  : "All lessons in the selected course"}
              </Text>
            </Stack>
          </Card>

          <Card p="lg" radius="lg" withBorder>
            <Stack gap="xs">
              <Badge
                color="grape"
                leftSection={<IconBrain size={12} />}
                variant="light"
              >
                Latest Practice
              </Badge>
              <Title order={4}>
                {latestPracticeSession
                  ? `${latestPracticeSession.questionCount} questions`
                  : "No quiz yet"}
              </Title>
              <Text c="dimmed" size="sm">
                {latestPracticeSession?.result
                  ? `${latestPracticeSession.result.percentage}% on your latest attempt`
                  : latestPracticeSession
                    ? "Resume your most recent practice session."
                    : "Generate a revision quiz when you are ready."}
              </Text>
            </Stack>
          </Card>

          <Card p="lg" radius="lg" withBorder>
            <Stack gap="xs">
              <Badge
                color="fun-green"
                leftSection={<IconMessageCircle size={12} />}
                variant="light"
              >
                Chat State
              </Badge>
              <Title order={4}>
                {selectedDocumentIds.length > 0
                  ? `${selectedDocumentIds.length} document${selectedDocumentIds.length === 1 ? "" : "s"} active`
                  : (chatThread?.messages?.length ?? 0) > 0
                  ? `${chatThread?.messages.length} messages`
                  : "Fresh conversation"}
              </Title>
              <Text c="dimmed" size="sm">
                {selectedDocumentIds.length > 0
                  ? "Selected uploads will be searched before the assistant answers."
                  : selectedCourseId
                    ? "Chat answers are grounded in the selected course where possible."
                    : "Select a course for context-aware help, or ask for general study support."}
              </Text>
            </Stack>
          </Card>
        </SimpleGrid>

        <Card p="lg" radius="lg" withBorder>
          <Stack gap="md">
            <Title order={4}>Study Scope</Title>
            <Group align="end" grow>
              <Select
                clearable
                data={courseOptions}
                label="Course"
                onChange={(value) => {
                  setSelectedCourseId(value);
                  setSelectedLessonId(null);
                  setPracticeSession(null);
                  setPracticeAnswers({});
                  navigate({
                    params: { tenant: tenant.id },
                    search: { courseId: value || undefined },
                    to: "/$tenant/student/ai",
                  });
                }}
                placeholder="Choose a course"
                value={selectedCourseId}
              />
              <Select
                clearable
                data={lessonOptions}
                disabled={!selectedCourseId || structureLoading}
                label="Lesson"
                onChange={setSelectedLessonId}
                placeholder="Optional lesson focus"
                value={selectedLessonId}
              />
            </Group>

            {!selectedCourseId && (
              <Text c="dimmed" size="sm">
                Select a course first. Practice quizzes require a course, while
                chat works best with course context.
              </Text>
            )}
          </Stack>
        </Card>

        <Tabs onChange={setActiveTab} value={activeTab} variant="outline">
          <Tabs.List>
            <Tabs.Tab
              leftSection={<IconMessageCircle size={16} />}
              value="chat"
            >
              Study Chat
            </Tabs.Tab>
            <Tabs.Tab leftSection={<IconBrain size={16} />} value="practice">
              Practice Quiz
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel pt="lg" value="chat">
            <Card p="lg" radius="lg" withBorder>
              <Stack gap="md">
                <Group justify="space-between">
                  <div>
                    <Title order={4}>Ask Anything</Title>
                    <Text c="dimmed" size="sm">
                      Ask about course material or uploaded PDFs and DOCX files.
                    </Text>
                  </div>
                  {selectedCourseId ? (
                    <Badge variant="light">{selectedCourse?.label}</Badge>
                  ) : (
                    <Badge color="gray" variant="light">
                      General mode
                    </Badge>
                  )}
                </Group>

                <Card bg="gray.0" p="md" radius="md" withBorder>
                  <Stack gap="md">
                    <div>
                      <Title order={5}>Document Grounding</Title>
                      <Text c="dimmed" size="sm">
                        Upload a PDF or DOCX, then select it to make chat answers use
                        that document as context.
                      </Text>
                    </div>

                    <Group align="end" grow>
                      <FileInput
                        accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        label="Upload document"
                        leftSection={<IconUpload size={16} />}
                        onChange={setUploadedFile}
                        placeholder="Choose PDF or DOCX"
                        value={uploadedFile}
                      />
                      <Button
                        color="fun-green"
                        disabled={!uploadedFile || aiUnavailable}
                        leftSection={<IconFileText size={16} />}
                        loading={createAiDocument.isPending}
                        onClick={handleUploadDocument}
                      >
                        Upload
                      </Button>
                    </Group>

                    {aiDocumentsError && (
                      <Alert color="red" icon={<IconAlertCircle size={16} />}>
                        {aiDocumentsError.message}
                      </Alert>
                    )}

                    {aiDocumentsLoading ? (
                      <Group gap="xs">
                        <Loader size="sm" />
                        <Text size="sm">Loading uploaded documents...</Text>
                      </Group>
                    ) : aiDocuments.length > 0 ? (
                      <Checkbox.Group
                        onChange={setSelectedDocumentIds}
                        value={selectedDocumentIds}
                      >
                        <Stack gap="xs">
                          {aiDocuments.map((document) => (
                            <Paper key={document.id} p="sm" radius="md" withBorder>
                              <Group justify="space-between" wrap="nowrap">
                                <Checkbox
                                  label={
                                    <div>
                                      <Text fw={500} size="sm">
                                        {document.title}
                                      </Text>
                                      <Text c="dimmed" size="xs">
                                        {document.name} • {document.sourceCount} chunks
                                      </Text>
                                    </div>
                                  }
                                  value={document.id}
                                />
                                <Badge color="gray" variant="light">
                                  {document.lessonId ? "Lesson scoped" : document.courseId ? "Course scoped" : "General"}
                                </Badge>
                              </Group>
                            </Paper>
                          ))}
                        </Stack>
                      </Checkbox.Group>
                    ) : (
                      <Alert color="gray" variant="light">
                        No uploaded documents yet. Upload a PDF or DOCX to ask
                        document-specific questions.
                      </Alert>
                    )}
                  </Stack>
                </Card>

                <Paper bg="gray.0" p="md" radius="md">
                  <ScrollArea h={360}>
                    <Stack gap="sm">
                      {chatLoading && <Loader size="sm" />}

                      {chatError && (
                        <Alert
                          color="red"
                          icon={<IconAlertCircle size={16} />}
                        >
                          {chatError.message}
                        </Alert>
                      )}

                      {!chatLoading && (chatThread?.messages?.length ?? 0) === 0 && (
                        <Text c="dimmed" size="sm">
                          Start the conversation. Ask the assistant to explain a
                          topic, summarize a lesson, or quiz you.
                        </Text>
                      )}

                      {chatThread?.messages.map((message) => (
                        <Paper
                          bg={message.role === "assistant" ? "fun-green.0" : "white"}
                          key={message.id}
                          p="sm"
                          radius="md"
                          withBorder
                        >
                          <Text c="dimmed" fw={600} size="xs" tt="uppercase">
                            {message.role === "assistant"
                              ? "AI Tutor"
                              : user?.displayName || "You"}
                          </Text>
                          <Text mt={4} style={{ whiteSpace: "pre-wrap" }}>
                            {message.content}
                          </Text>
                        </Paper>
                      ))}
                    </Stack>
                  </ScrollArea>
                </Paper>

                <Textarea
                  autosize
                  label="Your message"
                  minRows={3}
                  onChange={(event) => setChatMessage(event.currentTarget.value)}
                  placeholder="Explain this lesson in simpler terms..."
                  value={chatMessage}
                />

                <List c="dimmed" size="sm" spacing={4}>
                  <List.Item>Ask for a simpler explanation of a lesson.</List.Item>
                  <List.Item>Upload a PDF handbook and ask for a summary.</List.Item>
                  <List.Item>Ask for 5 revision questions before a real quiz.</List.Item>
                  <List.Item>
                    Ask what topic to revise next based on the course scope.
                  </List.Item>
                </List>

                <Group justify="flex-end">
                  <Button
                    color="fun-green"
                    disabled={!chatMessage.trim() || aiUnavailable}
                    leftSection={<IconSend size={16} />}
                    loading={sendChatMessage.isPending}
                    onClick={handleSendChatMessage}
                  >
                    Send
                  </Button>
                </Group>
              </Stack>
            </Card>
          </Tabs.Panel>

          <Tabs.Panel pt="lg" value="practice">
            <Stack gap="lg">
              <Card p="lg" radius="lg" withBorder>
                <Stack gap="md">
                  <Group justify="space-between">
                    <div>
                      <Title order={4}>Generate a Practice Quiz</Title>
                      <Text c="dimmed" size="sm">
                        Build an on-demand revision quiz from the selected course
                        or lesson.
                      </Text>
                    </div>

                    <Group>
                      {latestPracticeSession &&
                        latestPracticeSession.id !== practiceSession?.id && (
                          <Button
                            leftSection={<IconPlayerPlay size={16} />}
                            onClick={() => {
                              setPracticeSession(latestPracticeSession);
                              setPracticeAnswers(
                                Object.fromEntries(
                                  (latestPracticeSession.answers ?? []).map(
                                    (answer) => [
                                      answer.questionId,
                                      answer.selectedOptionId,
                                    ],
                                  ),
                                ),
                              );
                            }}
                            variant="light"
                          >
                            Resume Latest
                          </Button>
                        )}

                      {practiceSession && (
                        <Button
                          leftSection={<IconRefresh size={16} />}
                          onClick={() => {
                            setPracticeSession(null);
                            setPracticeAnswers({});
                          }}
                          variant="light"
                        >
                          Reset
                        </Button>
                      )}
                    </Group>
                  </Group>

                  <Group align="end" grow>
                    <Select
                      data={[
                        { label: "Beginner", value: "beginner" },
                        { label: "Intermediate", value: "intermediate" },
                        { label: "Advanced", value: "advanced" },
                      ]}
                      label="Difficulty"
                      onChange={(value) =>
                        setDifficulty((value as AiDifficulty) || "intermediate")
                      }
                      value={difficulty}
                    />
                    <Select
                      data={[
                        { label: "3 questions", value: "3" },
                        { label: "5 questions", value: "5" },
                        { label: "8 questions", value: "8" },
                        { label: "10 questions", value: "10" },
                      ]}
                      label="Question count"
                      onChange={(value) => setQuestionCount(value || "5")}
                      value={questionCount}
                    />
                    <Button
                      color="fun-green"
                      disabled={!selectedCourseId || aiUnavailable}
                      leftSection={<IconSparkles size={16} />}
                      loading={generatePracticeQuiz.isPending}
                      onClick={handleGeneratePracticeQuiz}
                    >
                      Generate
                    </Button>
                  </Group>
                </Stack>
              </Card>

              {practiceSessionsError && (
                <Alert color="red" icon={<IconAlertCircle size={16} />}>
                  {practiceSessionsError.message}
                </Alert>
              )}

              {practiceSessionsLoading && selectedCourseId && (
                <Card p="lg" radius="lg" withBorder>
                  <Group>
                    <Loader size="sm" />
                    <Text size="sm">
                      Checking for recent AI practice sessions...
                    </Text>
                  </Group>
                </Card>
              )}

              {practiceSession && (
                <Card p="lg" radius="lg" withBorder>
                  <Stack gap="lg">
                    <div>
                      <Title order={3}>{practiceSession.title}</Title>
                      <Text c="dimmed" mt="xs" size="sm">
                        {practiceSession.questionCount} questions •{" "}
                        {practiceSession.difficulty}
                      </Text>
                    </div>

                    {!practiceSession.result && unansweredCount > 0 && (
                      <Alert
                        color="yellow"
                        icon={<IconClock size={16} />}
                        title="Quiz in progress"
                      >
                        {unansweredCount} question
                        {unansweredCount === 1 ? "" : "s"} still unanswered.
                      </Alert>
                    )}

                    {practiceSession.questions.map((question, index) => {
                      const resultItem = practiceSession.result?.items.find(
                        (item) => item.questionId === question.id,
                      );

                      return (
                        <Paper key={question.id} p="md" radius="md" withBorder>
                          <Stack gap="sm">
                            <Group justify="space-between">
                              <Text fw={600}>
                                {index + 1}. {question.prompt}
                              </Text>
                              {resultItem && (
                                <Badge
                                  color={resultItem.isCorrect ? "green" : "red"}
                                  variant="light"
                                >
                                  {resultItem.isCorrect ? "Correct" : "Review"}
                                </Badge>
                              )}
                            </Group>

                            <Radio.Group
                              onChange={(value) =>
                                setPracticeAnswers((current) => ({
                                  ...current,
                                  [question.id]: value,
                                }))
                              }
                              value={practiceAnswers[question.id] || ""}
                            >
                              <Stack gap="xs">
                                {question.options.map((option) => (
                                  <Radio
                                    disabled={Boolean(practiceSession.result)}
                                    key={option.id}
                                    label={option.text}
                                    value={option.id}
                                  />
                                ))}
                              </Stack>
                            </Radio.Group>

                            {resultItem && (
                              <Alert
                                color={resultItem.isCorrect ? "green" : "blue"}
                                icon={<IconArrowRight size={16} />}
                                title="Explanation"
                              >
                                <Text size="sm">{resultItem.explanation}</Text>
                              </Alert>
                            )}
                          </Stack>
                        </Paper>
                      );
                    })}

                    {practiceSession.result ? (
                      <Alert color="fun-green" title="Practice Summary">
                        <Text>
                          {practiceSession.result.correctAnswers}/
                          {practiceSession.result.totalQuestions} correct (
                          {practiceSession.result.percentage}%)
                        </Text>
                        <Text mt="xs" size="sm">
                          {practiceSession.result.feedbackSummary}
                        </Text>
                      </Alert>
                    ) : (
                      <Group justify="flex-end">
                        <Button
                          color="fun-green"
                          disabled={Object.keys(practiceAnswers).length === 0}
                          loading={submitPracticeQuiz.isPending}
                          onClick={handleSubmitPracticeQuiz}
                        >
                          Submit Practice Quiz
                        </Button>
                      </Group>
                    )}
                  </Stack>
                </Card>
              )}
            </Stack>
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
}
