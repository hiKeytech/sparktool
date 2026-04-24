import "./ai-B1BshGYU.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./platform-config-DKda_4-W.mjs";
import { u as useAppSession, e as extractTenantIdFromPath } from "./session-DEslDYHo.mjs";
import { a as api } from "./api-client-Cl2DaV5u.mjs";
import { T as TenantService } from "./tenant-service-UTCWe4Jf.mjs";
import { g as getRequest } from "./index.mjs";
import { o as object, s as string, n as number, a as array, b as boolean, _ as _enum } from "../_libs/zod.mjs";
const instructorSchema = object({
  biography: string().nullish(),
  email: string().email().nullish(),
  name: string().nullish(),
  title: string().nullish()
});
object({
  averageRating: number().default(0),
  category: string().nullish(),
  certificateTemplateId: string().nullish(),
  completionCount: number().default(0),
  completionRate: number().default(0),
  createdAt: number().nullish(),
  createdBy: string().nullish(),
  createdByMeta: object({
    name: string(),
    photoUrl: string()
  }).nullish(),
  description: string().nullish(),
  difficulty: _enum(["advanced", "beginner", "intermediate"]).nullish(),
  enrollmentCount: number().default(0),
  estimatedDurationInMinutes: number().default(0),
  featured: boolean().default(false),
  hasCertificate: boolean().default(false),
  id: string().nullish(),
  instructors: array(instructorSchema).nullish(),
  language: string().nullish(),
  lastModifiedBy: string().nullish(),
  learningObjectives: array(string()).nullish(),
  level: _enum(["advanced", "beginner", "intermediate"]).nullish(),
  prerequisites: array(string()).nullish(),
  previewVideoUrl: string().nullish(),
  price: number().nullish(),
  published: boolean().nullish(),
  publishedAt: number().nullish(),
  sections: array(string()).default([]),
  shortDescription: string().nullish(),
  tags: array(string()).nullish(),
  tenantId: string().nullish(),
  thumbnailUrl: string().nullish(),
  title: string().nullish(),
  totalLessons: number().default(0),
  totalQuizzes: number().default(0),
  totalRatings: number().default(0),
  updatedAt: number().nullish()
});
const assignmentSchema = object({
  allowedFileTypes: array(string()).optional(),
  description: string(),
  dueDate: string().optional(),
  instructions: string(),
  maxFileSize: number().optional(),
  maxScore: number(),
  submissionType: _enum(["file", "link", "text"]),
  title: string()
});
const lessonContentSchema = object({
  assignment: assignmentSchema.optional(),
  externalUrl: string().optional(),
  subtitles: array(object({
    label: string(),
    language: string(),
    url: string()
  })).optional(),
  textContent: string().optional(),
  transcript: string().optional(),
  videoUrl: string().optional()
});
const lessonResourceSchema = object({
  createdAt: number(),
  description: string().optional(),
  fileSize: number().optional(),
  id: string(),
  isRequired: boolean(),
  lessonId: string(),
  order: number(),
  storageKey: string().optional(),
  storageProvider: _enum(["cloudinary", "local"]).optional(),
  storageResourceType: _enum(["image", "raw", "video"]).optional(),
  title: string(),
  type: _enum(["document", "download", "image", "link", "pdf"]),
  updatedAt: number(),
  url: string()
});
object({
  content: lessonContentSchema,
  courseId: string(),
  createdAt: number().default(() => Date.now()),
  description: string().optional(),
  estimatedDuration: number().default(0),
  id: string(),
  isPublished: boolean().default(false),
  isRequired: boolean().default(false),
  order: number().default(0),
  resources: array(lessonResourceSchema).default([]),
  sectionId: string(),
  title: string(),
  type: _enum(["assignment", "live-session", "reading", "video"]),
  updatedAt: number().default(() => Date.now())
});
object({
  courseId: string(),
  createdAt: number().default(() => Date.now()),
  createdBy: string().nullish(),
  createdByMeta: object({
    name: string(),
    photoUrl: string()
  }).nullish(),
  description: string().nullish(),
  estimatedDurationInMinutes: number().default(0),
  isPublished: boolean().default(false),
  order: number().nullish(),
  title: string().nullish(),
  updatedAt: number().default(() => Date.now()),
  updatedBy: string().nullish(),
  updatedByMeta: object({
    name: string(),
    photoUrl: string()
  }).nullish()
});
const liveSessionStatusSchema = _enum([
  "active",
  "cancelled",
  "ended",
  "scheduled"
]);
const liveSessionSchema = object({
  courseId: string(),
  createdAt: number().default(() => Date.now()),
  description: string(),
  duration: number(),
  id: string(),
  instructorId: string(),
  instructorName: string(),
  jitsiMeetUrl: string(),
  maxParticipants: number().optional(),
  meetingId: string(),
  participants: array(string()).default([]),
  recordingUrl: string().optional(),
  scheduledAt: string(),
  status: liveSessionStatusSchema.default("scheduled"),
  tenantId: string(),
  title: string(),
  updatedAt: number().default(() => Date.now())
});
liveSessionSchema.pick({
  courseId: true,
  description: true,
  duration: true,
  instructorName: true,
  maxParticipants: true,
  scheduledAt: true,
  title: true
});
liveSessionSchema.pick({
  description: true,
  duration: true,
  maxParticipants: true,
  recordingUrl: true,
  scheduledAt: true,
  status: true,
  title: true
}).partial();
const sectionProgressSchema = object({
  completedAt: number().nullish(),
  completedLessons: array(string()),
  completedQuizzes: array(string()),
  courseId: string(),
  isCompleted: boolean(),
  lessonsCompleted: array(string()),
  quizzesCompleted: array(string()),
  sectionId: string(),
  timeSpent: number()
});
object({
  averageScore: number(),
  certificatesEarned: number(),
  completionRate: number(),
  lastLoginAt: number(),
  lastUpdated: number(),
  learningPath: array(string()),
  loginStreak: number(),
  preferredLearningTime: string(),
  studentId: string(),
  totalCoursesCompleted: number(),
  totalCoursesEnrolled: number(),
  totalTimeSpent: number()
});
const studentProgressSchema = object({
  averageQuizScore: number().default(0),
  completedAt: number().nullish(),
  completionPercentage: number().default(0),
  courseId: string(),
  currentLessonId: string().optional(),
  currentLessonPosition: number().optional(),
  currentSectionId: string().optional(),
  enrolledAt: number().default(() => Date.now()),
  estimatedTimeRemaining: number().default(0),
  id: string(),
  lastAccessedAt: number().default(() => Date.now()),
  quizzesPassed: number().default(0),
  sectionProgress: array(sectionProgressSchema).default([]),
  startedAt: number().optional(),
  status: _enum(["completed", "dropped", "enrolled", "in-progress"]).default("enrolled"),
  studentId: string(),
  tenantId: string(),
  timeSpentMinutes: number().default(0),
  totalLessonsCompleted: number().default(0),
  totalOptionalLessonsCompleted: number().default(0),
  totalQuizzesTaken: number().default(0),
  totalRequiredLessons: number().default(0)
});
studentProgressSchema.pick({
  courseId: true,
  enrolledAt: true,
  studentId: true
});
studentProgressSchema.pick({
  completionPercentage: true,
  status: true,
  totalLessonsCompleted: true
});
const userRoleSchema = _enum(["admin", "student", "super-admin"]);
object({
  certificatesEarned: number().nullish(),
  completedCourses: array(string()).nullish(),
  createdAt: number(),
  department: string().nullish(),
  displayName: string(),
  email: string(),
  enrolledCourses: array(string()).nullish(),
  isActive: boolean().nullish(),
  isPending: boolean().nullish(),
  lastLoginAt: number().nullish(),
  location: string().nullish(),
  photoURL: string(),
  preferences: object({
    language: string(),
    notifications: boolean(),
    theme: string()
  }).nullish(),
  role: userRoleSchema,
  studentId: string().nullish(),
  subscriptions: array(object({
    expiresAt: number(),
    plan: _enum(["monthly", "yearly"]),
    status: _enum(["active", "canceled", "past_due"]),
    tenantId: string()
  })).nullish(),
  tenantIds: array(string()).nullish(),
  averageQuizScore: number().nullish(),
  quizzesPassed: number().nullish(),
  totalWatchTime: number().nullish(),
  uid: string(),
  updatedAt: number()
});
function extractTenantIdFromUrl(value) {
  if (!value) {
    return void 0;
  }
  try {
    return extractTenantIdFromPath(new URL(value).pathname);
  } catch {
    return extractTenantIdFromPath(value);
  }
}
async function resolveTenantFromCurrentRequest() {
  const request = getRequest();
  const tenantIdFromRequest = extractTenantIdFromUrl(request.url) || extractTenantIdFromUrl(request.headers.get("referer"));
  if (tenantIdFromRequest) {
    const tenant = await TenantService.getTenantById(tenantIdFromRequest);
    if (tenant) {
      return tenant;
    }
  }
  const session = await useAppSession();
  if (session.data.activeTenantId) {
    const tenant = await TenantService.getTenantById(
      session.data.activeTenantId
    );
    if (tenant) {
      return tenant;
    }
  }
  const rawHost = request.headers.get("x-forwarded-host") || request.headers.get("host");
  const host = rawHost ? rawHost.split(",")[0].trim().replace(/^https?:\/\//, "").split("/")[0]?.split(":")[0]?.trim() || null : null;
  if (!host) {
    return null;
  }
  return TenantService.getTenantByHost(host);
}
async function requireAuthenticatedUser() {
  const session = await useAppSession();
  if (!session.data.uid) {
    throw new Error("You must be signed in to perform this action.");
  }
  const actor = await api.get(
    `/api/auth/user/${session.data.uid}`
  );
  if (!actor) {
    throw new Error("Authenticated user account was not found.");
  }
  return actor;
}
export {
  requireAuthenticatedUser as a,
  resolveTenantFromCurrentRequest as r
};
