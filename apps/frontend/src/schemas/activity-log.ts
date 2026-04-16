import type { Collection } from "@/types/collection";
import type { DocumentReference } from "@/types/collection";
import type { DistributiveOmit } from "@/types/distributive-omit";
import type { Nullish } from "@/types/nullish";
import type { QueryFilters } from "@/types/query-filters";
import { isDefined } from "@/utils/is-defined";

type ActivityLogEntry =
  | LogAdminInvitationCreatedDetails
  | LogAdminInvitationRedeemedDetails
  | LogCertificateEarnedDetails
  | LogCertificateModifiedDetails
  | LogCourseCompletedDetails
  | LogCourseEnrolledDetails
  | LogCourseStartedDetails
  | LogLiveSessionCreatedDetails
  | LogLiveSessionEndedDetails
  | LogLiveSessionJoinedDetails
  | LogLoginDetails
  | LogLogoutDetails
  | LogProfileUpdatedDetails
  | LogProgressUpdatedDetails
  | LogLessonCompletedDetails
  | LogQuizAttemptedDetails
  | LogUserSignupDetails
  | LogVideoWatchedDetails;

export type ActivityLog = ActivityLogEntry & { id: string };

export type ActivityLogCollection = Collection<ActivityLog>;

export type ActivityLogDocumentReference = DocumentReference<ActivityLog>;

export type ActivityLogAction = ActivityLogEntry["action"];

export interface ActivityLogCreateInput {
  action: ActivityLogAction;
  certificateId?: null | string;
  courseId?: null | string;
  enrollmentMethod?: "admin_enrolled" | "self_enrolled";
  lessonId?: null | string;
  method?:
    | "manual_login"
    | "session_restore"
    | "social_login"
    | "email_password"
    | "phone_login"
    | "manual_logout"
    | "session_expired"
    | "manual_signup"
    | "social_signup"
    | "phone_signup";
  passed?: boolean;
  progressPercentage?: number;
  quizId?: null | string;
  score?: number;
  sessionId?: null | string;
  studentId?: null | string;
  tenantId?: string;
  totalDurationInMinutes?: number;
  updatedFields?: string[];
  userAgent?: null | string;
  userId: string;
  videoId?: null | string;
  watchedDurationInMinutes?: number;
}

export interface ListActivityLogVariables extends QueryFilters<ActivityLogEntry> {
  userId: string;
}

type ActivityLogDetails = Nullish<{
  tenantId?: string;
  timestamp: number;
  userAgent: string;
  userId: string;
}>;

export type CreateActivityLogVariables = DistributiveOmit<
  ActivityLogEntry,
  "timestamp" | "userAgent"
>;

interface LogCertificateEarnedDetails
  extends
    ActivityLogDetails,
    Nullish<{
      action: "certificate_earned";
      certificateId: string;
      courseId: string;
      studentId: string;
    }> {}

interface LogCertificateModifiedDetails
  extends
    ActivityLogDetails,
    Nullish<{
      action: "certificate_modified";
      certificateId: string;
    }> {}

interface LogCourseCompletedDetails
  extends
    ActivityLogDetails,
    Nullish<{
      action: "course_completed";
      courseId: string;
    }> {}

interface LogCourseEnrolledDetails
  extends
    ActivityLogDetails,
    Nullish<{
      action: "course_enrolled";
      courseId: string;
      enrollmentMethod: "admin_enrolled" | "self_enrolled";
    }> {}

interface LogCourseStartedDetails
  extends
    ActivityLogDetails,
    Nullish<{
      action: "course_started";
      courseId: string;
    }> {}

interface LogAdminInvitationCreatedDetails
  extends
    ActivityLogDetails,
    Nullish<{
      action: "admin_invitation_created";
      invitedEmail: string;
    }> {}

interface LogAdminInvitationRedeemedDetails
  extends
    ActivityLogDetails,
    Nullish<{
      action: "admin_invitation_redeemed";
    }> {}

interface LogLiveSessionCreatedDetails
  extends
    ActivityLogDetails,
    Nullish<{
      action: "live_session_created";
      courseId: string;
      sessionId: string;
    }> {}

interface LogLiveSessionEndedDetails
  extends
    ActivityLogDetails,
    Nullish<{
      action: "live_session_ended";
      courseId: string;
      sessionId: string;
    }> {}

interface LogLiveSessionJoinedDetails
  extends
    ActivityLogDetails,
    Nullish<{
      action: "live_session_joined";
      courseId: string;
      sessionId: string;
    }> {}

interface LogLoginDetails
  extends
    ActivityLogDetails,
    Nullish<{
      action: "login";
      method:
        | "manual_login"
        | "session_restore"
        | "social_login"
        | "email_password"
        | "phone_login";
    }> {}

interface LogLogoutDetails
  extends
    ActivityLogDetails,
    Nullish<{
      action: "logout";
      method: "manual_logout" | "session_expired";
    }> {}

interface LogProfileUpdatedDetails
  extends
    ActivityLogDetails,
    Nullish<{
      action: "profile_updated";
      updatedFields: string[];
    }> {}

interface LogProgressUpdatedDetails
  extends
    ActivityLogDetails,
    Nullish<{
      action: "progress_updated";
      courseId: string;
      progressPercentage: number;
    }> {}

interface LogLessonCompletedDetails
  extends
    ActivityLogDetails,
    Nullish<{
      action: "lesson_completed";
      courseId: string;
      lessonId: string;
    }> {}

interface LogQuizAttemptedDetails
  extends
    ActivityLogDetails,
    Nullish<{
      action: "quiz_attempted";
      courseId: string;
      passed: boolean;
      quizId: string;
      score: number;
    }> {}

interface LogUserSignupDetails
  extends
    ActivityLogDetails,
    Nullish<{
      action: "user_signup";
      method: "manual_signup" | "social_signup" | "phone_signup";
    }> {}

interface LogVideoWatchedDetails
  extends
    ActivityLogDetails,
    Nullish<{
      action: "video_watched";
      courseId: string;
      totalDurationInMinutes: number;
      videoId: string;
      watchedDurationInMinutes: number;
    }> {}

export const activityLogs = {
  create: async (variables: CreateActivityLogVariables) => {
    const { createActivityLogFn } = await import("@/server/activity-logs");
    const userAgent =
      typeof navigator === "undefined" ? null : navigator.userAgent;
    const normalizedVariables = Object.fromEntries(
      Object.entries(variables).map(([key, value]) => [
        key,
        value ?? undefined,
      ]),
    );

    return createActivityLogFn({
      data: {
        action: variables.action ?? null,
        ...normalizedVariables,
        userAgent,
        userId: variables.userId ?? null,
      },
    });
  },

  list: async (variables: ListActivityLogVariables & { tenantId?: string }) => {
    const { listActivityLogsFn } = await import("@/server/activity-logs");
    const { queryFilter = [], queryOrder = [], tenantId, userId } = variables;

    if (!isDefined(userId)) {
      return [];
    }

    return listActivityLogsFn({
      data: {
        queryFilter,
        queryOrder,
        tenantId,
        userId,
      },
    });
  },
};
