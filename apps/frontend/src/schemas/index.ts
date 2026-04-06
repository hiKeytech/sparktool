import { z } from "zod";

export const instructorSchema = z.object({
  biography: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  name: z.string().min(1, "Instructor name is required"),
  title: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const registerSchema = z
  .object({
    confirmPassword: z.string(),
    email: z.email("Invalid email address"),
    fullName: z.string().min(2, "Name must be at least 2 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    studentId: z.string().min(3, "Student ID must be at least 3 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const createCourseSchema = z.object({
  category: z.string().min(1, "Category is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  estimatedDurationInMinutes: z
    .number()
    .min(0, "Duration must be a positive number"),
  featured: z.boolean().default(false),
  instructors: z
    .array(instructorSchema)
    .min(1, "At least one instructor is required"),
  learningObjectives: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
  price: z.number().min(0).default(0),
  published: z.boolean().default(false),
  shortDescription: z.string().optional(),
  tags: z.array(z.string()).default([]),
  thumbnailUrl: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  previewVideoUrl: z.string().min(1, "Video URL is required"),
});

export const createUserSchema = z.object({
  department: z.string().optional(),
  email: z.email("Invalid email address"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  location: z.string().optional(),
  role: z.enum(["admin", "student"]),
  studentId: z.string().min(3, "Student ID must be at least 3 characters").optional().or(z.literal("")),
  temporaryPassword: z
    .string()
    .min(8, "Password must be at least 8 characters"),
});

export const courseFiltersSchema = z.object({
  difficulty: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  duration: z.string().optional(),
  learningPath: z.string().optional(),
  search: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

export const userFiltersSchema = z.object({
  facility: z.string().optional(),
  learningPath: z.string().optional(),
  progress: z.enum(["not-started", "in-progress", "completed"]).optional(),
  search: z.string().optional(),
});

export const updateProfileSchema = z.object({
  department: z.string().min(2, "Department is required"),
  displayName: z.string().min(2, "Name must be at least 2 characters"),
  location: z.string().optional(),
});

export const changePasswordSchema = z
  .object({
    confirmPassword: z.string(),
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const userPreferencesSchema = z.object({
  language: z.enum(["en", "fr"]),
  notifications: z.boolean(),
  theme: z.enum(["light", "dark"]),
});

export const createQuizSchema = z.object({
  courseId: z.string().min(1, "Course is required"),
  description: z.string().optional(),
  maxAttempts: z.number().min(1, "Max attempts must be at least 1").optional(),
  passingScore: z
    .number()
    .min(0, "Passing score must be at least 0")
    .max(100, "Passing score cannot exceed 100"),
  timeLimit: z
    .number()
    .min(1, "Time limit must be at least 1 minute")
    .optional(),
  title: z.string().min(1, "Quiz title is required"),
});

export const createLiveSessionSchema = z.object({
  courseId: z.string().min(1, "Please select a course"),
  description: z.string().min(1, "Session description is required"),
  duration: z
    .number()
    .min(15, "Minimum duration is 15 minutes")
    .max(480, "Maximum duration is 8 hours"),
  instructorName: z.string().min(1, "Instructor name is required"),
  maxParticipants: z.number().min(1).optional(),
  scheduledAt: z.union([z.string(), z.date()]),
  title: z.string().min(1, "Session title is required"),
});

export const editLiveSessionSchema = z.object({
  courseId: z.string().min(1, "Please select a course"),
  description: z.string().min(1, "Session description is required"),
  duration: z
    .number()
    .min(15, "Minimum duration is 15 minutes")
    .max(480, "Maximum duration is 8 hours"),
  instructorName: z.string().min(1, "Instructor name is required"),
  maxParticipants: z.number().min(1).optional(),
  scheduledAt: z.union([z.string(), z.date()]),
  status: z.enum(["scheduled", "active", "ended", "cancelled"]),
  title: z.string().min(1, "Session title is required"),
});

export const lessonContentSchema = z.object({
  assignment: z
    .object({
      description: z.string(),
      dueDate: z.string().optional(),
      id: z.string(),
      instructions: z.string(),
      maxScore: z.number(),
      submissionType: z.enum(["text", "file", "link"]),
      title: z.string(),
    })
    .optional(),
  quiz: z
    .object({
      id: z.string(),
      passingScore: z.number().min(0).max(100),
      questions: z.array(z.any()),
      timeLimit: z.number().optional(),
      title: z.string(),
    })
    .optional(),
  textContent: z.string().optional(),
  videoUrl: z.string().url().optional(),
  vimeoId: z.string().optional(),
});

export const sendMessageSchema = z.object({
  message: z.string().min(1, "Message is required"),
  subject: z.string().min(1, "Subject is required"),
});

export const createNotificationSchema = z.object({
  category: z.enum(["message", "system", "achievement", "reminder"]),
  createdAt: z.any(), // Number (ms)
  fromUserId: z.string().optional(),
  fromUserName: z.string().optional(),
  isRead: z.boolean().default(false),
  message: z.string().min(1, "Message is required"),
  title: z.string().min(1, "Title is required"),
  userId: z.string().min(1, "User ID is required"),
});

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;
export type CourseFilters = z.infer<typeof courseFiltersSchema>;
export type CreateCourseFormData = z.infer<typeof createCourseSchema>;
export type CreateLiveSessionFormData = z.infer<typeof createLiveSessionSchema>;
export type CreateNotificationFormData = z.infer<
  typeof createNotificationSchema
>;
export type CreateQuizFormData = z.infer<typeof createQuizSchema>;
export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type EditLiveSessionFormData = z.infer<typeof editLiveSessionSchema>;
export type LessonContent = z.infer<typeof lessonContentSchema>;
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type SendMessageFormData = z.infer<typeof sendMessageSchema>;
export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
export type UserFilters = z.infer<typeof userFiltersSchema>;
export type UserPreferencesFormData = z.infer<typeof userPreferencesSchema>;
