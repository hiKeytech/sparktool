import type { Course } from "@/schemas/course";
import type { CourseSection } from "@/schemas/course-section";
import type { CourseLesson } from "@/schemas/course-lesson";
import type { User, UserRole } from "@/schemas/user";
import type { StudentProgress } from "@/schemas/student-progress";
export type { ActivityLog } from "@/schemas/activity-log";
export type { Certificate, CertificateData } from "@/schemas/certificates";
export type { Course } from "@/schemas/course";
export type { CourseSection } from "@/schemas/course-section";
export type {
  Assignment,
  CourseLesson,
  CreateLesson,
  LessonContent,
  LessonResource,
  UpdateLesson,
} from "@/schemas/course-lesson";
export type { User, UserRole } from "@/schemas/user";
export type {
  CreateLiveSession,
  LiveSession,
  LiveSessionStatus,
  UpdateLiveSession,
} from "@/schemas/live-session";
export type {
  CreateStudentProgress,
  SectionProgress,
  StudentAnalytics,
  StudentProgress,
  UpdateStudentProgress,
} from "@/schemas/student-progress";

// Achievement Types
export interface Achievement {
  courseId?: string;
  description: string;
  earnedAt: Timestamp;
  icon: string;
  metadata?: Record<string, any>;
  title: string;
  type: "certification" | "course_completion" | "quiz_score" | "streak";
  userId: string;
}
export interface Announcement {
  content: string;
  courseId?: string; // if course-specific
  createdAt: Timestamp;
  createdBy: string;
  expiresAt?: Timestamp;
  priority: "high" | "low" | "medium";
  published: boolean;
  publishedAt?: Timestamp;
  targetAudience: "admins" | "all" | "students";
  title: string;
  type: "course" | "general" | "system" | "urgent";
  updatedAt: Timestamp;
}


export interface AuthContextType {
  loading: boolean;
  logout: () => Promise<void>;
  user: null | User;
}

export interface AuthUser {
  displayName: null | string;
  email: null | string;
  emailVerified: boolean;
  photoURL: null | string;
  uid: string;
}

export interface CourseAnalytics {
  averageTimeToComplete: number; // in days
  averageWatchTime: number; // in minutes
  completionRate: number;
  courseId: string;
  dropoffRate: number;
  lastUpdated: Timestamp;
  popularityScore: number;
  revenueGenerated: number;
  totalCompletions: number;
  totalEnrollments: number;
}

export interface CourseBuildingState {
  course: Course;
  lessons: { [sectionId: string]: CourseLesson[] };
  quizzes: { [parentId: string]: CourseQuiz[] }; // parentId can be courseId, sectionId, or lessonId
  sections: CourseSection[];
}

export interface CourseCardProps {
  course: Course;
  onContinue?: (courseId: string) => void;
  onEnroll?: (courseId: string) => void;
  progress?: StudentProgress;
  showProgress?: boolean;
}



// Enhanced Quiz Types for Multi-Level Placement
export interface CourseQuiz extends Omit<Quiz, "courseId"> {
  courseId: string;
  id: string;
  isRequired: boolean; // affects progress calculation
  lessonId?: string; // if lesson-level quiz
  order: number;
  placement: "course" | "lesson" | "section";
  sectionId?: string; // if section-level quiz
  unlockConditions?: {
    minimumScore?: number; // percentage
    requirePreviousCompletion: boolean;
  };
}




export interface CreateQuiz extends Omit<Quiz, "updatedAt"> {
  createdAt: number;
}

export interface CreateQuizForm {
  courseId: string;
  description: string;
  maxAttempts: number;
  passingScore: number;
  questions: Omit<QuizQuestion, "id">[];
  timeLimit: number;
  title: string;
}



export type CreateSection = Pick<
  CourseSection,
  | "courseId"
  | "description"
  | "estimatedDurationInMinutes"
  | "isPublished"
  | "order"
  | "title"
>;

export interface CreateUser
{
  department?: null | string;
  displayName: string;
  email: string;
  location?: null | string;
  password: string;
  role: UserRole;
  studentId?: null | string;
  tenantId?: null | string;
}

// Form Data Types
export interface CreateUserFormData {
  department?: string;
  email: string;
  fullName: string;
  location?: string;
  role: "admin" | "student";
  studentId?: string;
  temporaryPassword: string;
}

export interface DashboardCardProps {
  description?: string;
  icon?: any;
  loading?: boolean;
  title: string;
  trend?: {
    isPositive: boolean;
    value: number;
  };
  value: number | string;
}

// Dashboard and Metrics Types (from index.ts)
export interface DashboardMetrics {
  // Basic Metrics (existing)
  activeCoursesCount: number;
  averageProgress: number;
  certificatesIssued: number;
  completionRate: number;
  coursesInProgress: number;
  // Engagement Metrics
  engagement: {
    averageStudyTimePerDay: number; // In minutes
    contentQualityScore: null | number; // Content effectiveness rating (null if no data)
    courseEngagementRate: number; // % of enrolled students actively learning
    dailyActiveUsers: number;
    platformUtilizationRate: number; // % of features being used
    studentSatisfactionScore: null | number; // Average rating out of 5 (null if no ratings)
  };
  // Quick Insights
  insights: {
    averageCompletionDays: number;
    mostActiveDay: string; // "Monday", "Tuesday", etc.
    retentionRate: number; // 7-day retention percentage
    topCourseCategory: null | string; // null if no courses exist
  };

  // Learning Patterns
  learningPatterns: {
    mobileVsDesktop: {
      desktop: number; // percentage
      mobile: number; // percentage
    };
    peakLearningHours: {
      activityPercentage: number;
      end: string; // "21:00"
      start: string; // "18:00"
    };
    weekendActivity: number; // percentage of learning happening on weekends
  };

  // Monthly Trends (for charts)
  monthlyTrends: Array<{
    activeUsers: number;
    certificatesIssued: number;
    completions: number;
    enrollments: number;
    month: string;
  }>;

  newEnrollmentsThisWeek: number;

  // Student Performance
  studentPerformance: {
    averageQuizScore: number;
    studentsAtRisk: number; // Students with low engagement
    topPerformers: Array<{
      averageScore: number;
      displayName: string;
      userId: string;
    }>;
  };

  totalActiveStudents: number;

  // Trend Data for Key Metrics
  trends: {
    activeCourses: {
      current: number;
      isPositive: boolean;
      percentageChange: number;
      previous: number;
    };
    certificates: {
      current: number;
      isPositive: boolean;
      percentageChange: number;
      previous: number;
    };
    completionRate: {
      current: number;
      isPositive: boolean;
      percentageChange: number;
      previous: number;
    };
    totalStudents: {
      current: number;
      isPositive: boolean;
      percentageChange: number;
      previous: number;
    };
  };
}

// Drag and Drop Types for Course Builder
export interface DragDropItem {
  id: string;
  order: number;
  type: "lesson" | "quiz" | "section";
}

export interface JitsiMeetInterfaceConfig {
  APP_NAME: string;
  AUDIO_LEVEL_PRIMARY_COLOR: string;
  AUDIO_LEVEL_SECONDARY_COLOR: string;
  AUTO_PIN_LATEST_SCREEN_SHARE: string;
  BRAND_WATERMARK_LINK: string;
  CLOSE_PAGE_GUEST_HINT: boolean;
  DEFAULT_BACKGROUND: string;
  DEFAULT_WELCOME_PAGE_LOGO_URL: string;
  DISABLE_DOMINANT_SPEAKER_INDICATOR: boolean;
  DISABLE_JOIN_LEAVE_NOTIFICATIONS: boolean;
  DISABLE_PRESENCE_STATUS: boolean;
  DISABLE_TRANSCRIPTION_SUBTITLES: boolean;
  DISABLE_VIDEO_BACKGROUND: boolean;
  DISPLAY_WELCOME_FOOTER: boolean;
  DISPLAY_WELCOME_PAGE_ADDITIONAL_CARD: boolean;
  DISPLAY_WELCOME_PAGE_CONTENT: boolean;
  DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: boolean;
  ENABLE_DIAL_OUT: boolean;
  FILM_STRIP_MAX_HEIGHT: string;
  GENERATE_ROOMNAMES_ON_WELCOME_PAGE: boolean;
  HIDE_INVITE_MORE_HEADER: boolean;
  JITSI_WATERMARK_LINK: string;
  LANG_DETECTION: boolean;
  LOCAL_THUMBNAIL_RATIO: string;
  MAXIMUM_ZOOMING_COEFFICIENT: number;
  MOBILE_APP_PROMO: boolean;
  OPTIMAL_BROWSERS: (
    | "chrome"
    | "chromium"
    | "electron"
    | "firefox"
    | "safari"
    | "webkit"
    | (string & {})
  )[];
  POLICY_LOGO: null;
  PROVIDER_NAME: "Jitsi";
  RECENT_LIST_ENABLED: boolean;
  REMOTE_THUMBNAIL_RATIO: 1;
  SETTINGS_SECTIONS: (
    | "calendar"
    | "devices"
    | "language"
    | "moderator"
    | "more"
    | "profile"
    | "sounds"
  )[];
  SHOW_BRAND_WATERMARK: boolean;
  SHOW_CHROME_EXTENSION_BANNER: boolean;
  SHOW_JITSI_WATERMARK: boolean;
  SHOW_POWERED_BY: boolean;
  SHOW_PROMOTIONAL_CLOSE_PAGE: boolean;
  SUPPORT_URL: string;
  TILE_VIEW_MAX_COLUMNS: number;
  UNSUPPORTED_BROWSERS: string[];
  VERTICAL_FILMSTRIP: boolean;
  VIDEO_LAYOUT_FIT: "both";
  VIDEO_QUALITY_LABEL_DISABLED: boolean;
}

// Learning Path Types
export interface LearningPath {
  color: string;
  courses: string[]; // Course IDs rather than full Course objects for Firebase efficiency
  description: string;
  estimatedDuration: string;
  icon: string;
  name: string;
  prerequisites?: string[];
}



export interface LessonProgress {
  completedAt?: Timestamp;
  courseId: string;
  currentPosition: number; // current playback position
  // Completion Status
  isCompleted: boolean;

  lastAccessedAt: Timestamp;
  lessonId: string;

  // Resources
  resourcesViewed: string[]; // resource IDs viewed/downloaded
  sectionId: string;
  studentId: string;
  // Engagement
  timeSpent: number; // total time spent on lesson (minutes)

  totalDuration: number; // total video duration
  viewCount: number; // how many times accessed
  // Video Progress (if applicable)
  watchedDuration: number; // seconds watched

  watchPercentage: number; // percentage watched
}





export interface LoginFormData {
  password: string;
  studentId: string;
}

export interface EmailPasswordCredentials {
  allowSignup?: boolean;
  displayName?: string;
  email: string;
  mode?: "sign-in" | "sign-up";
  password: string;
  restrictedDomains?: string[];
}

// Notification System
export interface Notification {
  category: "achievement" | "message" | "reminder" | "system";
  createdAt: Timestamp;
  fromUserId?: string; // Admin who sent the message
  fromUserName?: string; // Admin's display name
  id: string;
  isRead: boolean;
  message: string;
  readAt?: Timestamp;
  title: string;
  userId: string;
}

// UI Component Props
export interface ProgressBarProps {
  color?: string;
  label?: string;
  showPercentage?: boolean;
  size?: "lg" | "md" | "sm";
  value: number;
}

export interface Quiz {
  courseId: string;
  createdAt: Timestamp;
  createdBy: string;
  description?: string;
  maxAttempts?: number;
  passingScore: number;
  questions: QuizQuestion[];
  timeLimit?: number; // in minutes
  title: string;
  updatedAt: Timestamp;
}
export interface QuizAnswer {
  answer: number | string;
  isCorrect: boolean;
  pointsEarned: number;
  questionId: string;
}

export interface QuizAttempt {
  answers?: QuizAnswer[];
  attemptNumber: number;
  completedAt?: Timestamp;
  courseId: string;
  id: string;
  passed: boolean;
  percentage: number;
  quizId: string;
  score: number;
  startedAt: Timestamp;
  studentId: string;
  timeSpent: number; // in seconds
  totalPoints: number;
}

export interface QuizQuestion {
  correctAnswer: number | string;
  explanation?: string;
  id: string;
  options?: string[]; // for multiple choice
  points: number;
  question: string;
  type: "essay" | "multiple-choice" | "true-false" | "short-answer";
}

export type QuizWithId = Quiz & { id: string };

export interface ReorderRequest {
  itemId: string;
  newOrder: number;
  parentId?: string; // sectionId for lessons, courseId for sections
  type: "lesson" | "quiz" | "section";
}

export interface SearchFilters {
  category?: string;
  difficulty?: string;
  limit?: number;
  page?: number;
  query?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  status?: string;
}


export type Timestamp = number;

export type CreateCourse = Pick<
  Course,
  | "category"
  | "description"
  | "difficulty"
  | "featured"
  | "instructors"
  | "language"
  | "learningObjectives"
  | "level"
  | "prerequisites"
  | "previewVideoUrl"
  | "price"
  | "published"
  | "shortDescription"
  | "tags"
  | "thumbnailUrl"
  | "title"
>;

export type UpdateCourse = Partial<CreateCourse> & {
  lastModifiedBy: string;
  updatedAt: Timestamp;
};





export interface UpdateProfileForm {
  department: string;
  displayName: string;
  location: string;
}

export interface UpdateQuiz
  extends Partial<
    Pick<
      Quiz,
      | "description"
      | "maxAttempts"
      | "passingScore"
      | "questions"
      | "timeLimit"
      | "title"
    >
  > {
  updatedAt: number;
}

export type UpdateQuizAttempt = Pick<
  QuizAttempt,
  "answers" | "completedAt" | "passed" | "percentage" | "score" | "timeSpent"
>;

export type UpdateSection = Partial<Omit<CreateSection, "courseId">> & {
  updatedAt: Timestamp;
};



export type UpdateUser = Partial<
  Pick<
    User,
    | "department"
    | "displayName"
    | "isActive"
    | "location"
    | "preferences"
    | "role"
    | "studentId"
  >
>;



export interface VideoPlayerProps {
  autoPlay?: boolean;
  onComplete?: () => void;
  onProgress?: (progress: number) => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  startTime?: number;
  videoUrl: string;
}
