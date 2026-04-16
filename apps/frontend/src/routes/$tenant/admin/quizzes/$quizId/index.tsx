import { createFileRoute } from "@tanstack/react-router";
import { QuizDetails } from "../$quizId";

export const Route = createFileRoute("/$tenant/admin/quizzes/$quizId/")({
  component: QuizDetails,
});
