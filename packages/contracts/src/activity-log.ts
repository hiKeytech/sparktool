import type { DistributiveOmit, Nullish, QueryFilters } from "./common.js";

type ActivityLogDetails = Nullish<{
  tenantId?: string;
  timestamp: number;
  userAgent: string;
  userId: string;
}>;

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

export type ActivityLog =
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

export type ActivityLogAction = ActivityLog["action"];

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

export interface ListActivityLogVariables extends QueryFilters<ActivityLog> {
  userId: string;
}

export type CreateActivityLogVariables = DistributiveOmit<
  ActivityLog,
  "timestamp" | "userAgent"
>;
