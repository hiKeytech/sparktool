import type { Options } from "./types";
import type { EmailPasswordCredentials } from "@/types";
import type { StudentProgress } from "@/schemas/student-progress";
import type { User } from "@/schemas/user";
import type {
  AdminInvitationPreview,
  AdminInvitationSummary,
  RedeemAdminInvitationInput,
} from "sparktool-contracts";

import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { minutesToMilliseconds } from "date-fns";
import { updatePlatformConfig } from "@/actions/platform";
import { listPlatformActivityLogsFn } from "@/server/activity-logs";
import {
  getAdminInvitationPreviewFn,
  redeemAdminInvitationFn,
} from "@/server/auth";
import {
  createTenantOnboardingFn,
  listTenantAdminInvitationsFn,
  reissueTenantAdminInvitationFn,
  revokeTenantAdminInvitationFn,
} from "@/server/tenants";
import type { ActivityLog } from "@/schemas/activity-log";
import type { PlatformConfig } from "@/schemas/platform-config";
import type { CreateTenantOnboardingVariables } from "@/schemas/tenant-contract";

import {
  extractTenantIdFromPath,
  resolveRoleHomeTarget,
} from "@/utils/tenant-paths";

import { api } from "./api";

export function useCreateTenant() {
  return useMutation({
    meta: {
      errorMessage: "Failed to create tenant. Please try again.",
      successMessage: "Tenant created successfully.",
    },
    mutationFn: api.$use.tenant.create,
  });
}

export function useCreateTenantOnboarding() {
  return useMutation({
    meta: {
      errorMessage:
        "Failed to create tenant and administrator invitation. Please try again.",
      successMessage:
        "Tenant and administrator invitation created successfully.",
    },
    mutationFn: (variables: CreateTenantOnboardingVariables) =>
      createTenantOnboardingFn({ data: variables }),
  });
}

export function useTenantAdminInvitation(
  tenantId: string,
  token?: string,
  options: Options<typeof query> = {},
  query = queryOptions({
    enabled: Boolean(tenantId && token),
    queryFn: () =>
      getAdminInvitationPreviewFn({
        data: {
          tenantId,
          token: token!,
        },
      }) as Promise<AdminInvitationPreview>,
    queryKey: ["tenant-admin-invitation", tenantId, token],
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useTenantAdminInvitations(
  options: Options<typeof query> = {},
  query = queryOptions({
    queryFn: () =>
      listTenantAdminInvitationsFn() as Promise<AdminInvitationSummary[]>,
    queryKey: ["tenant-admin-invitations"],
  }),
) {
  return useQuery({ ...query, ...options });
}

export function useReissueTenantAdminInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to reissue administrator invitation.",
      successMessage: "Administrator invitation reissued successfully.",
    },
    mutationFn: (variables: { invitationId: string; tenantId: string }) =>
      reissueTenantAdminInvitationFn({ data: variables }) as Promise<{
        invitation: AdminInvitationSummary;
        invitationToken: string;
      }>,
    onSuccess: async (_result, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["tenant-admin-invitations", variables.tenantId],
      });
    },
  });
}

export function useRevokeTenantAdminInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to revoke administrator invitation.",
      successMessage: "Administrator invitation revoked successfully.",
    },
    mutationFn: (variables: { invitationId: string; tenantId: string }) =>
      revokeTenantAdminInvitationFn({ data: variables }) as Promise<{
        success: true;
      }>,
    onSuccess: async (_result, variables) => {
      await queryClient.invalidateQueries({
        queryKey: ["tenant-admin-invitations", variables.tenantId],
      });
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
  return useMutation({
    mutationFn: api.$use.activityLogs.create,
  });
}

export function useCreateCertificate() {
  return useMutation({
    meta: {
      errorMessage: "Failed to create certificate. Please try again.",
      successMessage: "Certificate created successfully.",
    },
    mutationFn: api.$use.certificates.create,
  });
}

export function useCreateCourse() {
  return useMutation({
    meta: {
      errorMessage: "Failed to create course. Please try again.",
      successMessage: "Course created successfully.",
    },
    mutationFn: api.$use.course.create,
  });
}

// Lesson Management Hooks
export function useCreateLesson() {
  return useMutation({
    meta: {
      errorMessage: "Failed to create lesson. Please try again.",
      successMessage: "Lesson created successfully.",
    },
    mutationFn: api.$use.courseLesson.create,
  });
}

// Lesson Progress Hooks
export function useCreateLessonProgress() {
  return useMutation({
    mutationFn: api.$use.lessonProgress.create,
  });
}

// Lesson Resource Management Hooks
export function useCreateLessonResource() {
  return useMutation({
    meta: {
      errorMessage: "Failed to create resource. Please try again.",
      successMessage: "Resource created successfully.",
    },
    mutationFn: api.$use.lessonResource.create,
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
      await queryClient.invalidateQueries({
        queryKey: api.liveSessions.list.$use(),
      });
    },
  });
}

export function useCreateNotification() {
  return useMutation({
    meta: {
      errorMessage: "Failed to send notification. Please try again.",
      successMessage: "Notification sent successfully.",
    },
    mutationFn: api.$use.notification.create,
  });
}

export function useCreateQuiz() {
  return useMutation({
    meta: {
      errorMessage: "Failed to create quiz. Please try again.",
      successMessage: "Quiz created successfully.",
    },
    mutationFn: api.$use.quiz.create,
  });
}

export function useCreateQuizAttempt() {
  return useMutation({
    meta: {
      errorMessage: "Failed to start quiz attempt. Please try again.",
    },
    mutationFn: api.$use.quizAttempt.create,
  });
}

// Section Management Hooks
export function useCreateSection() {
  return useMutation({
    meta: {
      errorMessage: "Failed to create section. Please try again.",
      successMessage: "Section created successfully.",
    },
    mutationFn: api.$use.courseSection.create,
  });
}

export function useCreateUser() {
  return useMutation({
    meta: {
      errorMessage: "Failed to create user. Please try again.",
      successMessage: "User created successfully.",
    },
    mutationFn: api.$use.user.create,
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
  return useMutation({
    meta: {
      errorMessage: "Failed to delete course. Please try again.",
      successMessage: "Course deleted successfully.",
    },
    mutationFn: api.$use.course.remove,
  });
}

export function useDeleteLesson() {
  return useMutation({
    meta: {
      errorMessage: "Failed to delete lesson. Please try again.",
      successMessage: "Lesson deleted successfully.",
    },
    mutationFn: api.$use.courseLesson.delete,
  });
}

export function useDeleteLessonResource() {
  return useMutation({
    meta: {
      errorMessage: "Failed to delete resource. Please try again.",
      successMessage: "Resource deleted successfully.",
    },
    mutationFn: api.$use.lessonResource.delete,
  });
}

export function useDeleteLiveSession() {
  const queryClient = useQueryClient();

  return useMutation({
    meta: {
      errorMessage: "Failed to delete live session. Please try again.",
      successMessage: "Live session deleted successfully.",
    },
    mutationFn: api.$use.liveSessions.delete,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: api.liveSessions.list.$use(),
      });
    },
  });
}

export function useDeleteQuiz() {
  return useMutation({
    meta: {
      errorMessage: "Failed to delete quiz. Please try again.",
      successMessage: "Quiz deleted successfully.",
    },
    mutationFn: api.$use.quiz.delete,
  });
}

// New Hierarchical Course Structure Hooks

export function useDeleteSection() {
  return useMutation({
    meta: {
      errorMessage: "Failed to delete section. Please try again.",
      successMessage: "Section deleted successfully.",
    },
    mutationFn: api.$use.courseSection.delete,
  });
}

export function useDeleteUser() {
  return useMutation({
    meta: {
      errorMessage: "Failed to remove user access. Please try again.",
      successMessage: "User access removed successfully.",
    },
    mutationFn: api.$use.user.delete,
  });
}

export function useEnrollInCourse() {
  return useMutation({
    meta: {
      errorMessage: "Failed to enroll in course. Please try again.",
      successMessage: "Successfully enrolled in course.",
    },
    mutationFn: api.$use.course.enroll,
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
      await queryClient.invalidateQueries({
        queryKey: api.liveSessions.list.$use(),
      });
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
      await queryClient.invalidateQueries({
        queryKey: api.liveSessions.list.$use(),
      });
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

export function usePlatformActivityLogs(
  filters: {
    action?: ActivityLog["action"] | null;
    limit?: number;
    tenantId?: string;
    userId?: string;
  } = {},
) {
  return useQuery({
    queryFn: () =>
      listPlatformActivityLogsFn({
        data: {
          action: filters.action ?? undefined,
          limit: filters.limit,
          tenantId: filters.tenantId,
          userId: filters.userId,
        },
      }),
    queryKey: ["platform-activity", filters],
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
export function useListLiveSessions(tenantId?: string) {
  return useQuery({
    enabled: !!tenantId,
    queryFn: () => api.$use.liveSessions.list({ tenantId }),
    queryKey: api.liveSessions.list.$use({ tenantId }),
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
  return useMutation({
    meta: {
      errorMessage: "Failed to mark notifications as read.",
      successMessage: "All notifications marked as read.",
    },
    mutationFn: api.$use.notification.markAllAsRead,
  });
}

export function useMarkLessonComplete() {
  return useMutation({
    meta: {
      successMessage: "Lesson marked as complete!",
    },
    mutationFn: api.$use.lessonProgress.markComplete,
  });
}

export function useMarkNotificationAsRead() {
  return useMutation({
    mutationFn: api.$use.notification.markAsRead,
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
  return useMutation({
    meta: {
      errorMessage: "Failed to reorder lessons. Please try again.",
      successMessage: "Lessons reordered successfully.",
    },
    mutationFn: api.$use.courseLesson.reorder,
  });
}

export function useReorderSections() {
  return useMutation({
    meta: {
      errorMessage: "Failed to reorder sections. Please try again.",
      successMessage: "Sections reordered successfully.",
    },
    mutationFn: api.$use.courseSection.reorder,
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
    onSuccess: () => {
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

export function useRedeemAdminInvitation() {
  const navigate = useNavigate();

  return useMutation({
    meta: {
      errorMessage: "Failed to accept the administrator invitation.",
    },
    mutationFn: (variables: RedeemAdminInvitationInput) =>
      redeemAdminInvitationFn({ data: variables }) as Promise<{
        userData: User & { id: string };
      }>,
    onSuccess: (data: { userData: User & { id: string } }) => {
      const tenantId = data.userData.tenantIds?.[0];
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
  return useMutation({
    meta: {
      errorMessage: "Failed to update certificate. Please try again.",
      successMessage: "Certificate updated successfully.",
    },
    mutationFn: api.$use.certificates.update,
  });
}

export function useUpdateCourse() {
  return useMutation({
    meta: {
      errorMessage: "Failed to update course. Please try again.",
      successMessage: "Course updated successfully.",
    },
    mutationFn: api.$use.course.update,
  });
}

export function useUpdateCourseProgress() {
  return useMutation({
    meta: {
      successMessage: "Progress updated successfully!",
    },
    mutationFn: api.$use.courseProgress.updateCourseProgress,
  });
}

export function useUpdateLesson() {
  return useMutation({
    meta: {
      errorMessage: "Failed to update lesson. Please try again.",
      successMessage: "Lesson updated successfully.",
    },
    mutationFn: api.$use.courseLesson.update,
  });
}

export function useUpdateLessonProgress() {
  return useMutation({
    mutationFn: api.$use.lessonProgress.update,
  });
}

export function useUpdateLessonResource() {
  return useMutation({
    meta: {
      errorMessage: "Failed to update resource. Please try again.",
      successMessage: "Resource updated successfully.",
    },
    mutationFn: api.$use.lessonResource.update,
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
      await queryClient.invalidateQueries({
        queryKey: api.liveSessions.list.$use(),
      });
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
  return useMutation({
    meta: {
      errorMessage: "Failed to update quiz. Please try again.",
      successMessage: "Quiz updated successfully.",
    },
    mutationFn: api.$use.quiz.update,
  });
}

export function useUpdateQuizAttempt() {
  return useMutation({
    meta: {
      errorMessage: "Failed to update quiz attempt. Please try again.",
      successMessage: "Quiz attempt updated successfully.",
    },
    mutationFn: api.$use.quizAttempt.update,
  });
}

export function useUpdateSection() {
  return useMutation({
    meta: {
      errorMessage: "Failed to update section. Please try again.",
      successMessage: "Section updated successfully.",
    },
    mutationFn: api.$use.courseSection.update,
  });
}

export function useUpdateStudentProgress() {
  return useMutation({
    meta: {
      errorMessage: "Failed to update student progress. Please try again.",
      successMessage: "Student progress updated successfully.",
    },
    mutationFn: api.$use.studentProgress.update,
  });
}

export function useUpdateUser() {
  return useMutation({
    meta: {
      errorMessage: "Failed to update user. Please try again.",
      successMessage: "User updated successfully.",
    },
    mutationFn: api.$use.user.update,
  });
}

export function useUpdateUserProgress() {
  return useMutation({
    meta: {
      errorMessage: "Failed to update progress. Please try again.",
      successMessage: "Progress updated successfully.",
    },
    mutationFn: api.$use.studentProgress.update,
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
  return useMutation({
    meta: {
      errorMessage: "Failed to update tenant. Please try again.",
      successMessage: "Tenant updated successfully.",
    },
    mutationFn: api.$use.tenant.update,
  });
}

export function useUpdatePlatformConfig() {
  return useMutation({
    meta: {
      errorMessage:
        "Failed to update platform configuration. Please try again.",
      successMessage: "Platform configuration updated successfully.",
    },
    mutationFn: (config: PlatformConfig) =>
      updatePlatformConfig({ data: config }),
  });
}
