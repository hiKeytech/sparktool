import {
  createFileRoute,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { useAuthContext } from "@/providers/auth-provider";
import type { QuizAnswer, QuizAttempt, UpdateQuizAttempt } from "@/types";
import {
  ActionIcon,
  Alert,
  Badge,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Grid,
  Group,
  Loader,
  Modal,
  Paper,
  Progress,
  Radio,
  RingProgress,
  Stack,
  Text,
  Textarea,
  Title,
} from "@mantine/core";
import {
  IconAlertCircle,
  IconArrowLeft,
  IconArrowRight,
  IconClock,
  IconFlag,
  IconRefresh,
  IconTrophy,
  IconX,
} from "@tabler/icons-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { PendingOverlay } from "@/components/shared/pending-overlay";
import {
  useCreateQuizAttempt,
  useQuiz,
  useUpdateQuizAttempt,
} from "@/services/hooks";
import { formatTime } from "@/utils/date-utils";
import type { Tenant } from "@/schemas/tenant-contract";

interface QuizState {
  answers: Record<string, number | string>;
  attempt: null | Partial<QuizAttempt>;
  currentQuestionIndex: number;
  isSubmitted: boolean;
  timeRemaining: number;
}

export const Route = createFileRoute(
  "/$tenant/student/courses/$courseId/quiz/$quizId",
)({
  component: QuizAssessment,
});

function QuizAssessment() {
  const { tenant } = Route.useRouteContext() as { tenant: Tenant };
  const { user } = useAuthContext();
  const { courseId, quizId } = useParams({ strict: false }) as {
    courseId: string;
    quizId: string;
  };

  const navigate = useNavigate();
  const attemptInitializationRef = useRef(false);

  const [quizState, setQuizState] = useState<QuizState>({
    answers: {},
    attempt: null,
    currentQuestionIndex: 0,
    isSubmitted: false,
    timeRemaining: 0,
  });

  const [showResults, setShowResults] = useState(false);
  const [confirmSubmitModal, setConfirmSubmitModal] = useState(false);

  const { data: quiz, isLoading: quizLoading } = useQuiz(quizId || "", {
    enabled: !!quizId,
  });
  const createAttemptMutation = useCreateQuizAttempt();
  const updateAttemptMutation = useUpdateQuizAttempt();

  useEffect(() => {
    if (quizState.timeRemaining > 0 && !quizState.isSubmitted) {
      const timer = setInterval(() => {
        setQuizState((prev) => {
          const newTimeRemaining = prev.timeRemaining - 1;
          if (newTimeRemaining <= 0) {
            handleSubmitQuiz();
            return { ...prev, timeRemaining: 0 };
          }
          return { ...prev, timeRemaining: newTimeRemaining };
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [quizState.timeRemaining, quizState.isSubmitted]);

  useEffect(() => {
    if (
      quiz &&
      user &&
      !quizState.attempt &&
      !attemptInitializationRef.current &&
      !createAttemptMutation.isPending
    ) {
      attemptInitializationRef.current = true;
      const initialTimeLimit = quiz.timeLimit ? quiz.timeLimit * 60 : 3600;
      setQuizState((prev) => ({
        ...prev,
        timeRemaining: initialTimeLimit,
      }));

      createAttemptMutation.mutate(
        {
          courseId: quiz.courseId,
          quizId: quiz.id,
          studentId: user.uid,
        },
        {
          onSuccess: (attempt) => {
            if (!attempt) return;
            setQuizState((prev) => ({ ...prev, attempt }));
          },
          onError: () => {
            attemptInitializationRef.current = false;
          },
        },
      );
    }
  }, [createAttemptMutation.isPending, quiz, quizState.attempt, user]);

  useEffect(() => {
    if (!updateAttemptMutation.isSuccess) return;

    setQuizState((prev) => {
      if (prev.isSubmitted) return prev;

      return {
        ...prev,
        isSubmitted: true,
      };
    });
    setShowResults(true);
    setConfirmSubmitModal(false);
  }, [updateAttemptMutation.isSuccess]);

  const handleAnswerChange = (
    questionIndex: number,
    answer: number | string,
  ) => {
    setQuizState((prev) => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionIndex.toString()]: answer,
      },
    }));
  };

  const handleNextQuestion = () => {
    if (quiz && quizState.currentQuestionIndex < quiz.questions.length - 1) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1,
      }));
    }
  };

  const handlePreviousQuestion = () => {
    if (quizState.currentQuestionIndex > 0) {
      setQuizState((prev) => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex - 1,
      }));
    }
  };

  const handleQuestionJump = (index: number) => {
    setQuizState((prev) => ({
      ...prev,
      currentQuestionIndex: index,
    }));
  };

  const calculateResults = useCallback(() => {
    if (!quiz) return null;

    let totalPoints = 0;
    let earnedPoints = 0;
    const results: QuizAnswer[] = [];

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
        questionId: question.id,
      });
    });

    const percentage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
    const passed = percentage >= quiz.passingScore;

    return {
      answers: results,
      passed,
      percentage: Math.round(percentage),
      score: earnedPoints,
      totalPoints,
    };
  }, [quiz, quizState.answers]);

  const handleSubmitQuiz = () => {
    if (!quiz || !quizState.attempt) return;

    const results = calculateResults();
    if (!results) return;

    const updateData: UpdateQuizAttempt = {
      completedAt: Date.now(),
      rawAnswers: Object.fromEntries(
        quiz.questions.map((question, index) => [
          question.id,
          quizState.answers[index.toString()],
        ]),
      ),
      timeSpent:
        (quiz.timeLimit ? quiz.timeLimit * 60 : 3600) - quizState.timeRemaining,
    };

    updateAttemptMutation.mutate({
      attemptData: updateData,
      attemptId: quizState.attempt.id || "",
    });
  };

  if (!quiz) {
    return (
      <Container py="xl" size="lg">
        <Center h={400}>
          <Stack align="center" gap="md">
            <Loader color="fun-green" size="xl" />
            <Text c="dimmed">Quiz not found</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  const currentQuestion = quiz.questions[quizState.currentQuestionIndex];
  const progress =
    ((quizState.currentQuestionIndex + 1) / quiz.questions.length) * 100;
  const answeredQuestions = Object.keys(quizState.answers).length;

  if (quizLoading) {
    return <PendingOverlay reason="Loading quiz..." visible={quizLoading} />;
  }

  if (showResults && quizState.attempt) {
    const results = calculateResults();
    if (!results) return null;

    return (
      <Container py="xl" size="lg">
        <div data-aos="fade-up">
          <Card p="xl" radius="lg" shadow="md">
            <Stack align="center" gap="xl">
              {/* Results Header */}
              <Group gap="lg">
                {results.passed ? (
                  <RingProgress
                    label={
                      <Center>
                        <IconTrophy className="text-fun-green-600" size={32} />
                      </Center>
                    }
                    sections={[
                      { color: "fun-green", value: results.percentage },
                    ]}
                    size={120}
                    thickness={8}
                  />
                ) : (
                  <RingProgress
                    label={
                      <Center>
                        <IconX className="text-red-600" size={32} />
                      </Center>
                    }
                    sections={[{ color: "red", value: results.percentage }]}
                    size={120}
                    thickness={8}
                  />
                )}
                <Stack gap="xs">
                  <Title c={results.passed ? "fun-green" : "red"} order={2}>
                    {results.passed ? "Congratulations!" : "Keep Learning"}
                  </Title>
                  <Text fw={600} size="lg">
                    Score: {results.score}/{results.totalPoints} (
                    {results.percentage}%)
                  </Text>
                  <Text c="dimmed">Passing Score: {quiz.passingScore}%</Text>
                </Stack>
              </Group>

              {/* Status Badge */}
              <Badge
                color={results.passed ? "fun-green" : "red"}
                size="lg"
                variant="light"
              >
                {results.passed ? "PASSED" : "NEEDS IMPROVEMENT"}
              </Badge>

              {/* Action Buttons */}
              <Group>
                <Button
                  color="fun-green"
                  leftSection={<IconArrowLeft size={16} />}
                  onClick={() =>
                    tenant.id &&
                    navigate({
                      params: { courseId, tenant: tenant.id },
                      to: "/$tenant/student/courses/$courseId",
                    })
                  }
                  variant="filled"
                >
                  Back to Course
                </Button>
                {!results.passed && (
                  <Button
                    color="fun-green"
                    leftSection={<IconRefresh size={16} />}
                    onClick={() => {
                      attemptInitializationRef.current = false;
                      createAttemptMutation.reset();
                      updateAttemptMutation.reset();
                      setQuizState({
                        answers: {},
                        attempt: null,
                        currentQuestionIndex: 0,
                        isSubmitted: false,
                        timeRemaining: quiz.timeLimit
                          ? quiz.timeLimit * 60
                          : 3600,
                      });
                      setShowResults(false);
                    }}
                    variant="outline"
                  >
                    Retake Quiz
                  </Button>
                )}
              </Group>
            </Stack>
          </Card>
        </div>
      </Container>
    );
  }

  return (
    <Container py="xl" size="lg">
      <div data-aos="fade-up">
        {/* Quiz Header */}
        <Card mb="xl" p="lg" radius="lg" shadow="md">
          <Group justify="space-between" mb="md">
            <div>
              <Title className="text-fun-green-800" order={2}>
                {quiz.title}
              </Title>
              {quiz.description && (
                <Text c="dimmed" mt="xs">
                  {quiz.description}
                </Text>
              )}
            </div>

            {/* Timer */}
            <Paper bg="fun-green.0" p="md" radius="md">
              <Group gap="xs">
                <IconClock className="text-fun-green-600" size={20} />
                <Text
                  c={quizState.timeRemaining < 300 ? "red" : "fun-green"}
                  fw={600}
                >
                  {formatTime(quizState.timeRemaining)}
                </Text>
              </Group>
            </Paper>
          </Group>

          {/* Progress Bar */}
          <Stack gap="xs">
            <Group justify="space-between">
              <Text c="dimmed" size="sm">
                Question {quizState.currentQuestionIndex + 1} of{" "}
                {quiz.questions.length}
              </Text>
              <Text c="dimmed" size="sm">
                {answeredQuestions}/{quiz.questions.length} answered
              </Text>
            </Group>
            <Progress
              color="fun-green"
              radius="xl"
              size="lg"
              value={progress}
            />
          </Stack>
        </Card>

        <Grid>
          {/* Question Navigation Sidebar */}
          <Grid.Col span={3}>
            <Card h="fit-content" p="md" radius="lg" shadow="md">
              <Title mb="md" order={4}>
                Questions
              </Title>
              <Stack gap="xs">
                {quiz.questions.map((_, index) => {
                  const isAnswered = index in quizState.answers;
                  const isCurrent = index === quizState.currentQuestionIndex;

                  return (
                    <ActionIcon
                      className="cursor-pointer"
                      color={
                        isCurrent ? "fun-green" : isAnswered ? "blue" : "gray"
                      }
                      key={index}
                      onClick={() => handleQuestionJump(index)}
                      size="lg"
                      variant={
                        isCurrent ? "filled" : isAnswered ? "light" : "outline"
                      }
                    >
                      {index + 1}
                    </ActionIcon>
                  );
                })}
              </Stack>
            </Card>
          </Grid.Col>

          {/* Question Content */}
          <Grid.Col span={9}>
            <div data-aos="fade-left" data-aos-duration="300">
              <Card p="xl" radius="lg" shadow="md">
                {/* Question */}
                <Stack gap="xl">
                  <div>
                    <Group justify="space-between" mb="md">
                      <Badge color="fun-green" variant="light">
                        {currentQuestion.points} points
                      </Badge>
                      <Badge color="gray" variant="outline">
                        {currentQuestion.type.replace("-", " ")}
                      </Badge>
                    </Group>
                    <Title mb="md" order={3}>
                      {currentQuestion.question}
                    </Title>
                  </div>

                  {/* Answer Options */}
                  <div>
                    {currentQuestion.type === "multiple-choice" &&
                      currentQuestion.options && (
                        <Radio.Group
                          onChange={(value) =>
                            handleAnswerChange(
                              quizState.currentQuestionIndex,
                              parseInt(value),
                            )
                          }
                          value={
                            quizState.answers[
                              quizState.currentQuestionIndex
                            ]?.toString() || ""
                          }
                        >
                          <Stack gap="md">
                            {currentQuestion.options.map((option, index) => (
                              <Radio
                                className="p-3 transition-colors border rounded-lg border-stone-200 hover:bg-stone-50"
                                key={index}
                                label={option}
                                size="md"
                                value={index.toString()}
                              />
                            ))}
                          </Stack>
                        </Radio.Group>
                      )}

                    {currentQuestion.type === "true-false" &&
                      currentQuestion.options && (
                        <Radio.Group
                          onChange={(value) =>
                            handleAnswerChange(
                              quizState.currentQuestionIndex,
                              parseInt(value),
                            )
                          }
                          value={
                            quizState.answers[
                              quizState.currentQuestionIndex
                            ]?.toString() || ""
                          }
                        >
                          <Group gap="xl">
                            {currentQuestion.options.map((option, index) => (
                              <Radio
                                className="p-4 transition-colors border rounded-lg border-stone-200 hover:bg-stone-50"
                                key={index}
                                label={option}
                                size="lg"
                                value={index.toString()}
                              />
                            ))}
                          </Group>
                        </Radio.Group>
                      )}

                    {currentQuestion.type === "essay" && (
                      <Textarea
                        minRows={6}
                        onChange={(event) =>
                          handleAnswerChange(
                            quizState.currentQuestionIndex,
                            event.currentTarget.value,
                          )
                        }
                        placeholder="Enter your answer here..."
                        radius="md"
                        value={
                          quizState.answers[
                            quizState.currentQuestionIndex
                          ]?.toString() || ""
                        }
                      />
                    )}
                  </div>

                  {/* Navigation */}
                  <Divider />
                  <Group justify="space-between">
                    <Button
                      color="gray"
                      disabled={quizState.currentQuestionIndex === 0}
                      leftSection={<IconArrowLeft size={16} />}
                      onClick={handlePreviousQuestion}
                      variant="outline"
                    >
                      Previous
                    </Button>

                    <Group>
                      {quizState.currentQuestionIndex ===
                      quiz.questions.length - 1 ? (
                        <Button
                          color="fun-green"
                          disabled={answeredQuestions === 0}
                          onClick={() => setConfirmSubmitModal(true)}
                          rightSection={<IconFlag size={16} />}
                        >
                          Submit Quiz
                        </Button>
                      ) : (
                        <Button
                          color="fun-green"
                          onClick={handleNextQuestion}
                          rightSection={<IconArrowRight size={16} />}
                        >
                          Next
                        </Button>
                      )}
                    </Group>
                  </Group>
                </Stack>
              </Card>
            </div>
          </Grid.Col>
        </Grid>

        {/* Warning for unanswered questions */}
        {answeredQuestions < quiz.questions.length && (
          <Alert
            color="amber"
            icon={<IconAlertCircle size={16} />}
            mt="md"
            title="Incomplete Quiz"
          >
            You have {quiz.questions.length - answeredQuestions} unanswered
            questions. Make sure to answer all questions before submitting.
          </Alert>
        )}

        {/* Submit Confirmation Modal */}
        <Modal
          centered
          onClose={() => setConfirmSubmitModal(false)}
          opened={confirmSubmitModal}
          title="Submit Quiz"
        >
          <Stack gap="md">
            <Text>
              Are you sure you want to submit your quiz? You have answered{" "}
              <strong>{answeredQuestions}</strong> out of{" "}
              <strong>{quiz.questions.length}</strong> questions.
            </Text>

            {answeredQuestions < quiz.questions.length && (
              <Alert color="amber" icon={<IconAlertCircle size={16} />}>
                You have {quiz.questions.length - answeredQuestions} unanswered
                questions. These will be marked as incorrect.
              </Alert>
            )}

            <Group justify="flex-end">
              <Button
                onClick={() => setConfirmSubmitModal(false)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button color="fun-green" onClick={handleSubmitQuiz}>
                Submit Quiz
              </Button>
            </Group>
          </Stack>
        </Modal>
      </div>
    </Container>
  );
}
