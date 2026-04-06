import { notifications } from "@mantine/notifications";
import { useMutation, useQuery } from "@tanstack/react-query";

import { api } from "@/services/api";

// Query Keys
export const courseQuizKeys = {
  all: ["courseQuiz"] as const,
  detail: (id: string) => [...courseQuizKeys.details(), id] as const,
  details: () => [...courseQuizKeys.all, "detail"] as const,
  list: (filters?: {
    courseId?: string;
    lessonId?: string;
    placement?: "course" | "lesson" | "section";
    sectionId?: string;
  }) => [...courseQuizKeys.lists(), filters] as const,
  lists: () => [...courseQuizKeys.all, "list"] as const,
};

// Hooks
export const useCourseQuizzes = (filters?: {
  courseId?: string;
  lessonId?: string;
  placement?: "course" | "lesson" | "section";
  sectionId?: string;
}) => {
  return useQuery({
    enabled: !!filters?.courseId, // Only run if courseId is provided
    queryFn: () => api.$use.courseQuiz.list(filters),
    queryKey: api.courseQuiz.list.$use(filters),
  });
};

export const useCourseQuiz = (quizId?: string) => {
  return useQuery({
    enabled: !!quizId,
    queryFn: () => api.$use.courseQuiz.get(quizId!),
    queryKey: api.courseQuiz.get.$use(quizId!),
  });
};

export const useCreateCourseQuiz = () => {
  return useMutation({
    mutationFn: api.$use.courseQuiz.create,
    onError: (error) => {
      notifications.show({
        color: "red",
        message: "Failed to create quiz",
        title: "Error",
      });
      console.error("Create quiz error:", error);
    },
    onSuccess: () => {
      notifications.show({
        color: "green",
        message: "Quiz created successfully",
        title: "Success",
      });
    },
  });
};

export const useUpdateCourseQuiz = () => {
  return useMutation({
    mutationFn: api.$use.courseQuiz.update,
    onError: (error) => {
      notifications.show({
        color: "red",
        message: "Failed to update quiz",
        title: "Error",
      });
      console.error("Update quiz error:", error);
    },
    onSuccess: (_, variables) => {
      notifications.show({
        color: "green",
        message: "Quiz updated successfully",
        title: "Success",
      });
    },
  });
};

export const useDeleteCourseQuiz = () => {
  return useMutation({
    mutationFn: api.$use.courseQuiz.delete,
    onError: (error) => {
      notifications.show({
        color: "red",
        message: "Failed to delete quiz",
        title: "Error",
      });
      console.error("Delete quiz error:", error);
    },
    onSuccess: () => {
      notifications.show({
        color: "green",
        message: "Quiz deleted successfully",
        title: "Success",
      });
    },
  });
};

export const useReorderCourseQuizzes = () => {
  return useMutation({
    mutationFn: api.$use.courseQuiz.reorder,
    onError: (error) => {
      notifications.show({
        color: "red",
        message: "Failed to reorder quizzes",
        title: "Error",
      });
      console.error("Reorder quizzes error:", error);
    },
    onSuccess: () => {
      notifications.show({
        color: "green",
        message: "Quizzes reordered successfully",
        title: "Success",
      });
    },
  });
};
