import type { Options } from "./types";
import type { EmailPasswordCredentials } from "@/types";
import type { StudentProgress } from "@/schemas/student-progress";

import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { minutesToMilliseconds } from "date-fns";

import {
  extractTenantIdFromPath,
  resolveRoleHomeTarget,
} from "@/utils/tenant-paths";

import { api } from "./api";

export function useCreateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to create tenant. Please try again.",
      successMessage: "Tenant created successfully.",
    },
    mutationFn: api.$use.tenant.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tenant"] });
    },
  });
}
// Course Progress Calculation Hooks
export function useCalculateCourseProgress() {
  return useMutation({
    mutationFn: api.$use.courseProgress.calculate,
  });
}

export function useCourseProgress(courseId?: string, studentId?: string) {
  return useQuery({
    enabled: !!(courseId && studentId),
    queryFn: async (): Promise<StudentProgress | null> => {
      const result = await api.$use.studentProgress.get({
        courseId,
        studentId,
      });
      return Array.isArray(result) ? (result[0] ?? null) : result;
    },
    queryKey: api.studentProgress.get.$use({ courseId, studentId }),
  });
}

// Course with full structure
export function useCourseWithStructure(
  courseId: string,
  options: Options<typeof query> = {},
  query = queryOptions({
    enabled: !!courseId,
    queryFn: () => api.$use.course.getWithStructure(courseId),
    queryKey: api.course.getWithStructure.$use(courseId),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useCreateActivityLog() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.$use.activityLogs.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["activityLogs"] });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "analytics"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "metrics"],
      });
    },
  });
}

export function useCreateCertificate() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to create certificate. Please try again.",
      successMessage: "Certificate created successfully.",
    },
    mutationFn: api.$use.certificates.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["certificates"] });
      await queryClient.invalidateQueries({ queryKey: ["activityLogs"] });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "metrics"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "analytics"],
      });
    },
  });
}

export function useCreateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to create course. Please try again.",
      successMessage: "Course created successfully.",
    },
    mutationFn: api.$use.course.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["course", "list"] });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "metrics"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "analytics"],
      });
    },
  });
}

// Lesson Management Hooks
export function useCreateLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to create lesson. Please try again.",
      successMessage: "Lesson created successfully.",
    },
    mutationFn: api.$use.courseLesson.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["courseLesson"] });
      await queryClient.invalidateQueries({
        queryKey: ["course", "getWithStructure"],
      });
      await queryClient.invalidateQueries({ queryKey: ["course", "get"] });
    },
  });
}

// Lesson Progress Hooks
export function useCreateLessonProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.$use.lessonProgress.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["lessonProgress"] });
    },
  });
}

// Lesson Resource Management Hooks
export function useCreateLessonResource() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to create resource. Please try again.",
      successMessage: "Resource created successfully.",
    },
    mutationFn: api.$use.lessonResource.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["lessonResource"] });
      await queryClient.invalidateQueries({ queryKey: ["courseLesson"] });
      await queryClient.invalidateQueries({
        queryKey: ["course", "getWithStructure"],
      });
    },
  });
}

export function useCreateLiveSession() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to create live session. Please try again.",
      successMessage: "Live session created successfully.",
    },
    mutationFn: api.$use.liveSessions.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["liveSessions"] });
      await queryClient.invalidateQueries({ queryKey: ["activityLogs"] });
    },
  });
}

export function useCreateNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to send notification. Please try again.",
      successMessage: "Notification sent successfully.",
    },
    mutationFn: api.$use.notification.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notification"] });
    },
  });
}

export function useCreateQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to create quiz. Please try again.",
      successMessage: "Quiz created successfully.",
    },
    mutationFn: api.$use.quiz.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["quiz"] });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "metrics"],
      });
    },
  });
}

export function useCreateQuizAttempt() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to submit quiz attempt. Please try again.",
      successMessage: "Quiz submitted successfully.",
    },
    mutationFn: api.$use.quizAttempt.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["quizAttempt"] });
    },
  });
}

// Section Management Hooks
export function useCreateSection() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to create section. Please try again.",
      successMessage: "Section created successfully.",
    },
    mutationFn: api.$use.courseSection.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["courseSection"] });
      await queryClient.invalidateQueries({
        queryKey: ["course", "getWithStructure"],
      });
      await queryClient.invalidateQueries({ queryKey: ["course", "get"] });
    },
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to create user. Please try again.",
      successMessage: "User created successfully.",
    },
    mutationFn: api.$use.user.create,
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
  });
}

export function useCurrentUser(
  userId: null | string,
  options: Options<typeof query> = {},
  query = queryOptions({
    enabled: !!userId,
    queryFn: () => api.$use.auth.getCurrentUser(userId),
    queryKey: api.auth.getCurrentUser.$use(userId),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useDashboardAnalytics(
  timeframe: "month" | "week" | "year" = "month",
  tenantId?: string,
  options: Options<typeof query> = {},
  query = queryOptions({
    enabled: !!tenantId,
    queryFn: () => api.$use.dashboard.analytics(timeframe, tenantId!),
    queryKey: api.dashboard.analytics.$use(timeframe, tenantId!),
    staleTime: minutesToMilliseconds(10),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useDashboardMetrics(
  tenantId?: string,
  options: Options<typeof query> = {},
  query = queryOptions({
    enabled: !!tenantId,
    queryFn: () => api.$use.dashboard.metrics(tenantId!),
    queryKey: api.dashboard.metrics.$use(tenantId!),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to delete course. Please try again.",
      successMessage: "Course deleted successfully.",
    },
    mutationFn: api.$use.course.remove,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["course", "list"] });
      await queryClient.invalidateQueries({
        queryKey: ["studentProgress", "list"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "metrics"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "analytics"],
      });
    },
  });
}

export function useDeleteLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to delete lesson. Please try again.",
      successMessage: "Lesson deleted successfully.",
    },
    mutationFn: api.$use.courseLesson.delete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["courseLesson"] });
      await queryClient.invalidateQueries({
        queryKey: ["course", "getWithStructure"],
      });
      await queryClient.invalidateQueries({ queryKey: ["course", "get"] });
    },
  });
}

export function useDeleteLessonResource() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to delete resource. Please try again.",
      successMessage: "Resource deleted successfully.",
    },
    mutationFn: api.$use.lessonResource.delete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["lessonResource"] });
      await queryClient.invalidateQueries({ queryKey: ["courseLesson"] });
      await queryClient.invalidateQueries({
        queryKey: ["course", "getWithStructure"],
      });
    },
  });
}

export function useDeleteLiveSession() {
  return useMutation({
    meta: {
      errorMessage: "Failed to delete live session. Please try again.",
      successMessage: "Live session deleted successfully.",
    },
    mutationFn: api.$use.liveSessions.delete,
  });
}

export function useDeleteQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to delete quiz. Please try again.",
      successMessage: "Quiz deleted successfully.",
    },
    mutationFn: api.$use.quiz.delete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["quiz"] });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "metrics"],
      });
    },
  });
}

// New Hierarchical Course Structure Hooks

export function useDeleteSection() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to delete section. Please try again.",
      successMessage: "Section deleted successfully.",
    },
    mutationFn: api.$use.courseSection.delete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["courseSection"] });
      await queryClient.invalidateQueries({ queryKey: ["courseLesson"] });
      await queryClient.invalidateQueries({
        queryKey: ["course", "getWithStructure"],
      });
      await queryClient.invalidateQueries({ queryKey: ["course", "get"] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to remove user access. Please try again.",
      successMessage: "User access removed successfully.",
    },
    mutationFn: api.$use.user.delete,
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
  });
}

export function useEnrollInCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to enroll in course. Please try again.",
      successMessage: "Successfully enrolled in course.",
    },
    mutationFn: api.$use.course.enroll,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["course", "list"] });
      await queryClient.invalidateQueries({
        queryKey: ["studentProgress", "list"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["studentProgress", "get"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["auth", "getCurrentUser"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "metrics"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "analytics"],
      });
    },
  });
}

export function useFindCertificate(certificateId?: string) {
  return useQuery({
    enabled: !!certificateId,
    queryFn: () => api.$use.certificates.find(certificateId),
    queryKey: api.certificates.find.$use(certificateId),
  });
}

export function useFindLiveSession(sessionId?: string) {
  return useQuery({
    enabled: !!sessionId,
    queryFn: () => api.$use.liveSessions.find(sessionId),
    queryKey: api.liveSessions.find.$use(sessionId),
  });
}

export function useGetCertificates(
  studentId: string,
  tenantId?: string,
  options: Options<typeof query> = {},
  query = queryOptions({
    enabled: !!studentId,
    queryFn: () => api.$use.certificates.get(studentId, tenantId),
    queryKey: api.certificates.get.$use(studentId, tenantId),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useGetCourse(
  courseId: string,
  options: Options<typeof query> = {},
  query = queryOptions({
    enabled: !!courseId,
    queryFn: () => api.$use.course.get(courseId),
    queryKey: api.course.get.$use(courseId),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useGetLesson(
  lessonId: string,
  options: Options<typeof query> = {},
  query = queryOptions({
    enabled: !!lessonId,
    queryFn: () => api.$use.courseLesson.get(lessonId),
    queryKey: api.courseLesson.get.$use(lessonId),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useGetLessonProgress(
  variables: { lessonId: string; studentId: string },
  options: Options<typeof query> = {},
  query = queryOptions({
    enabled: !!variables.studentId && !!variables.lessonId,
    queryFn: () => api.$use.lessonProgress.get(variables),
    queryKey: api.lessonProgress.get.$use(variables),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useGetLessonResource(
  resourceId: string,
  options: Options<typeof query> = {},
  query = queryOptions({
    enabled: !!resourceId,
    queryFn: () => api.$use.lessonResource.get(resourceId),
    queryKey: api.lessonResource.get.$use(resourceId),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useJoinLiveSession() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to join live session. Please try again.",
      successMessage: "Successfully joined the live session.",
    },
    mutationFn: api.$use.liveSessions.join,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["liveSessions"] });
      await queryClient.invalidateQueries({ queryKey: ["activityLogs"] });
    },
  });
}

export function useLeaveLiveSession() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to leave live session. Please try again.",
    },
    mutationFn: api.$use.liveSessions.leave,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["liveSessions"] });
    },
  });
}

export function useListActivityLogs(tenantId?: string, userId?: string) {
  return useQuery({
    enabled: !!userId && !!tenantId,
    queryFn: () => api.$use.activityLogs.list({ tenantId, userId: userId! }),
    queryKey: api.activityLogs.list.$use({ tenantId, userId: userId! }),
  });
}

export function useListCertificates(tenantId?: string) {
  return useQuery({
    enabled: !!tenantId,
    queryFn: () => api.$use.certificates.list(tenantId),
    queryKey: api.certificates.list.$use(tenantId),
  });
}

export function useListCourses(
  tenantId?: string,
  filters?: Partial<{
    category?: string;
    difficulty?: string;
    published?: boolean;
    search?: string;
  }>,
  options: Options<typeof query> = {},
  query = queryOptions({
    enabled: !!tenantId,
    queryFn: () => api.$use.course.list(tenantId, filters),
    queryKey: api.course.list.$use(tenantId, filters),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useListLessonResources(
  lessonId: string,
  options: Options<typeof query> = {},
  query = queryOptions({
    enabled: !!lessonId,
    queryFn: () => api.$use.lessonResource.list(lessonId),
    queryKey: api.lessonResource.list.$use(lessonId),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useListLessons(
  sectionId: string,
  options: Options<typeof query> = {},
  query = queryOptions({
    enabled: !!sectionId,
    queryFn: () => api.$use.courseLesson.list(sectionId),
    queryKey: api.courseLesson.list.$use(sectionId),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useListLessonsByCourse(
  courseId: string,
  options: Options<typeof query> = {},
  query = queryOptions({
    enabled: !!courseId,
    queryFn: () => api.$use.courseLesson.listByCourse(courseId),
    queryKey: api.courseLesson.listByCourse.$use(courseId),
  }),
) {
  return useQuery({ ...query, ...options });
}

// Live Session Hooks
export function useListLiveSessions() {
  return useQuery({
    queryFn: () => api.$use.liveSessions.list(),
    queryKey: api.liveSessions.list.$use(),
  });
}

export function useListSections(
  courseId: string,
  options: Options<typeof query> = {},
  query = queryOptions({
    enabled: !!courseId,
    queryFn: () => api.$use.courseSection.list(courseId),
    queryKey: api.courseSection.list.$use(courseId),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useListStudentLessonProgress(
  studentId: string,
  options: Options<typeof query> = {},
  query = queryOptions({
    enabled: !!studentId,
    queryFn: () => api.$use.lessonProgress.listByStudent(studentId),
    queryKey: api.lessonProgress.listByStudent.$use(studentId),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useListStudentProgress(tenantId?: string, studentId?: string) {
  return useQuery({
    enabled: !!studentId && !!tenantId,
    queryFn: () => api.$use.studentProgress.list(studentId!, tenantId),
    queryKey: api.studentProgress.list.$use(studentId!, tenantId),
  });
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to mark notifications as read.",
      successMessage: "All notifications marked as read.",
    },
    mutationFn: api.$use.notification.markAllAsRead,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notification"] });
    },
  });
}

export function useMarkLessonComplete() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      successMessage: "Lesson marked as complete!",
    },
    mutationFn: api.$use.lessonProgress.markComplete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["lessonProgress"] });
      await queryClient.invalidateQueries({
        queryKey: ["studentProgress", "get"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["studentProgress", "list"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "metrics"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "analytics"],
      });
    },
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.$use.notification.markAsRead,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["notification"] });
    },
  });
}

export function useNotifications(
  userId?: string,
  options: Options<typeof query> = {},
  query = queryOptions({
    enabled: !!userId,
    queryFn: () => api.$use.notification.list(userId!),
    queryKey: api.notification.list.$use(userId!),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useQuiz(
  quizId?: string,
  options: Options<typeof query> = {},
  query = queryOptions({
    enabled: !!quizId,
    queryFn: () => api.$use.quiz.get(quizId),
    queryKey: api.quiz.get.$use(quizId),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useQuizAttempts(
  filters: { courseId?: string; quizId?: string; studentId?: string },
  options: Options<typeof query> = {},
  query = queryOptions({
    queryFn: () => api.$use.quizAttempt.list(filters),
    queryKey: api.quizAttempt.list.$use(filters),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useQuizzes(
  courseId?: string,
  options: Options<typeof query> = {},
  query = queryOptions({
    queryFn: () => api.$use.quiz.list(courseId),
    queryKey: api.quiz.list.$use(courseId),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useReorderLessons() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to reorder lessons. Please try again.",
      successMessage: "Lessons reordered successfully.",
    },
    mutationFn: api.$use.courseLesson.reorder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["courseLesson"] });
      await queryClient.invalidateQueries({
        queryKey: ["course", "getWithStructure"],
      });
    },
  });
}

export function useReorderSections() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to reorder sections. Please try again.",
      successMessage: "Sections reordered successfully.",
    },
    mutationFn: api.$use.courseSection.reorder,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["courseSection"] });
      await queryClient.invalidateQueries({
        queryKey: ["course", "getWithStructure"],
      });
    },
  });
}

export function useSessionData(
  options: Options<typeof query> = {},
  query = queryOptions({
    queryFn: api.$use.auth.session,
    queryKey: api.auth.session.$use(),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useChangePassword() {
  return useMutation({
    meta: {
      errorMessage: "Failed to update password. Please try again.",
      successMessage: "Your password has been updated successfully.",
    },
    mutationFn: api.$use.auth.changePassword,
  });
}

export function useResetUserPassword() {
  return useMutation({
    meta: {
      errorMessage: "Failed to reset password. Please try again.",
      successMessage: "Temporary password set successfully.",
    },
    mutationFn: api.$use.auth.resetUserPassword,
  });
}

export function useSubscribeToTenant() {
  return useMutation({
    meta: {
      errorMessage: "Failed to subscribe to tenant. Please try again.",
      successMessage: "Subscribed to tenant successfully.",
    },
    mutationFn: api.$use.user.subscribeToTenant,
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to sign out. Please try again.",
      successMessage: "You have been signed out successfully.",
    },
    mutationFn: api.$use.auth.signOut,
    onSuccess: async () => {
      queryClient.clear();
    },
  });
}

export function useSignInWithEmailAndPassword() {
  const navigate = useNavigate();

  return useMutation({
    meta: {
      errorMessage: "Failed to authenticate. Please verify your credentials.",
    },
    mutationFn: (credentials: EmailPasswordCredentials) =>
      api.$use.auth.signInWithEmailAndPassword({
        ...credentials,
        tenantId: extractTenantIdFromPath(window.location.pathname),
      }),
    onSuccess: (data) => {
      const tenantId =
        extractTenantIdFromPath(window.location.pathname) ??
        data.userData.tenantIds?.[0];
      navigate({
        replace: true,
        ...resolveRoleHomeTarget(data.userData.role, tenantId),
      });
    },
  });
}

export function useUnreadNotificationsCount(
  userId?: string,
  options: Options<typeof query> = {},
  query = queryOptions({
    enabled: !!userId,
    queryFn: () => api.$use.notification.getUnreadCount(userId!),
    queryKey: api.notification.getUnreadCount.$use(userId!),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useUpdateCertificate() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to update certificate. Please try again.",
      successMessage: "Certificate updated successfully.",
    },
    mutationFn: api.$use.certificates.update,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["certificates"] });
      await queryClient.invalidateQueries({ queryKey: ["activityLogs"] });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "metrics"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "analytics"],
      });
    },
  });
}

export function useUpdateCourse() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to update course. Please try again.",
      successMessage: "Course updated successfully.",
    },
    mutationFn: api.$use.course.update,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({ queryKey: api.course.list.$use() });
      await queryClient.invalidateQueries({
        queryKey: api.course.get.$use(variables.courseId),
      });
      await queryClient.invalidateQueries({
        queryKey: api.course.getWithStructure.$use(variables.courseId),
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "metrics"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "analytics"],
      });
    },
  });
}

export function useUpdateCourseProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      successMessage: "Progress updated successfully!",
    },
    mutationFn: api.$use.courseProgress.updateCourseProgress,
    onSuccess: async (_, variables) => {
      await queryClient.invalidateQueries({
        queryKey: api.studentProgress.get.$use({
          courseId: variables.courseId,
          studentId: variables.studentId,
        }),
      });
      await queryClient.invalidateQueries({
        queryKey: api.studentProgress.list.$use(
          variables.studentId,
          variables.tenantId,
        ),
      });
      await queryClient.invalidateQueries({
        queryKey: ["auth", "getCurrentUser"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "metrics"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "analytics"],
      });
    },
  });
}

export function useUpdateLesson() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to update lesson. Please try again.",
      successMessage: "Lesson updated successfully.",
    },
    mutationFn: api.$use.courseLesson.update,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["courseLesson"] });
      await queryClient.invalidateQueries({
        queryKey: ["course", "getWithStructure"],
      });
    },
  });
}

export function useUpdateLessonProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.$use.lessonProgress.update,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["lessonProgress"] });
      await queryClient.invalidateQueries({
        queryKey: ["studentProgress", "get"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["studentProgress", "list"],
      });
    },
  });
}

export function useUpdateLessonResource() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to update resource. Please try again.",
      successMessage: "Resource updated successfully.",
    },
    mutationFn: api.$use.lessonResource.update,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["lessonResource"] });
      await queryClient.invalidateQueries({ queryKey: ["courseLesson"] });
      await queryClient.invalidateQueries({
        queryKey: ["course", "getWithStructure"],
      });
    },
  });
}

export function useUpdateLiveSession() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to update live session. Please try again.",
      successMessage: "Live session updated successfully.",
    },
    mutationFn: api.$use.liveSessions.update,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["liveSessions"] });
    },
  });
}

export function useUpdateProfile() {
  return useMutation({
    meta: {
      errorMessage: "Failed to update profile. Please try again.",
      successMessage: "Your profile has been updated successfully.",
    },
    mutationFn: api.$use.auth.updateProfile,
  });
}

export function useUpdateQuiz() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to update quiz. Please try again.",
      successMessage: "Quiz updated successfully.",
    },
    mutationFn: api.$use.quiz.update,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["quiz"] });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "metrics"],
      });
    },
  });
}

export function useUpdateQuizAttempt() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to update quiz attempt. Please try again.",
      successMessage: "Quiz attempt updated successfully.",
    },
    mutationFn: api.$use.quizAttempt.update,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["quizAttempt"] });
      await queryClient.invalidateQueries({
        queryKey: ["studentProgress", "get"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["studentProgress", "list"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "metrics"],
      });
    },
  });
}

export function useUpdateSection() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to update section. Please try again.",
      successMessage: "Section updated successfully.",
    },
    mutationFn: api.$use.courseSection.update,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["courseSection"] });
      await queryClient.invalidateQueries({
        queryKey: ["course", "getWithStructure"],
      });
    },
  });
}

export function useUpdateStudentProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to update student progress. Please try again.",
      successMessage: "Student progress updated successfully.",
    },
    mutationFn: api.$use.studentProgress.update,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["studentProgress", "list"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["studentProgress", "get"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "metrics"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "analytics"],
      });
    },
  });
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to update user. Please try again.",
      successMessage: "User updated successfully.",
    },
    mutationFn: api.$use.user.update,
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
  });
}

export function useUpdateUserProgress() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to update progress. Please try again.",
      successMessage: "Progress updated successfully.",
    },
    mutationFn: api.$use.studentProgress.update,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["studentProgress", "list"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["studentProgress", "get"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "metrics"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["dashboard", "analytics"],
      });
    },
  });
}

export function useUser(
  userId?: string,
  options: Options<typeof query> = {},
  query = queryOptions({
    enabled: !!userId,
    queryFn: () => api.$use.user.get(userId),
    queryKey: api.user.get.$use(userId),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useUserProgress(
  tenantId?: string,
  userId?: string,
  options: Options<typeof query> = {},
  query = queryOptions({
    enabled: !!userId && !!tenantId,
    queryFn: () => api.$use.studentProgress.list(userId!, tenantId),
    queryKey: api.studentProgress.list.$use(userId!, tenantId),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useUsers(
  tenantId?: null | string,
  filters?: {
    isActive?: boolean;
    role?: string;
    search?: string;
  },
  options: Options<typeof query> = {},
  query = queryOptions({
    enabled: tenantId !== undefined,
    queryFn: () => api.$use.user.list(tenantId ?? undefined, filters),
    queryKey: api.user.list.$use(tenantId ?? undefined, filters),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useTenants(
  options: Options<typeof query> = {},
  query = queryOptions({
    queryFn: () => api.$use.tenant.list(),
    queryKey: api.tenant.list.$use(),
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useUpdateTenant() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to update tenant. Please try again.",
      successMessage: "Tenant updated successfully.",
    },
    mutationFn: api.$use.tenant.update,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["tenant"] });
    },
  });
}
