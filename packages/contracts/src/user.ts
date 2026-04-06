import { z } from "zod";

export const userRoleSchema = z.enum(["admin", "student", "super-admin"]);

export const userSchema = z.object({
  certificatesEarned: z.number().nullish(),
  completedCourses: z.array(z.string()).nullish(),
  createdAt: z.number(),
  department: z.string().nullish(),
  displayName: z.string(),
  email: z.string(),
  enrolledCourses: z.array(z.string()).nullish(),
  isActive: z.boolean().nullish(),
  isPending: z.boolean().nullish(),
  lastLoginAt: z.number().nullish(),
  location: z.string().nullish(),
  photoURL: z.string(),
  preferences: z
    .object({
      language: z.string(),
      notifications: z.boolean(),
      theme: z.string(),
    })
    .nullish(),
  role: userRoleSchema,
  studentId: z.string().nullish(),
  subscriptions: z
    .array(
      z.object({
        expiresAt: z.number(),
        plan: z.enum(["monthly", "yearly"]),
        status: z.enum(["active", "canceled", "past_due"]),
        tenantId: z.string(),
      }),
    )
    .nullish(),
  tenantIds: z.array(z.string()).nullish(),
  totalWatchTime: z.number().nullish(),
  uid: z.string(),
  updatedAt: z.number(),
});

export type UserRole = z.infer<typeof userRoleSchema>;
export type User = z.infer<typeof userSchema>;

export interface CreateUser {
  department?: null | string;
  displayName: string;
  email: string;
  location?: null | string;
  password: string;
  role: UserRole;
  studentId?: null | string;
  tenantId?: null | string;
}

export interface UpdateUser {
  department?: null | string;
  displayName?: string;
  isActive?: boolean;
  location?: null | string;
  role?: UserRole;
  studentId?: null | string;
}
