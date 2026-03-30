import { filterUsersBySearch } from "@/lib/search/search-utils";
import { isDefined } from "@/utils/is-defined";

import type { CreateUser, UpdateUser } from "@/types";
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
      })
    )
    .nullish(),
  tenantIds: z.array(z.string()).nullish(),
  totalWatchTime: z.number().nullish(),
  uid: z.string(),
  updatedAt: z.number(),
});

export type UserRole = z.infer<typeof userRoleSchema>;
export type User = z.infer<typeof userSchema>;

export const user = {
  create: async (userData: CreateUser) => {
    const { createUserFn } = await import("@/server/users");
    return createUserFn({ data: userData });
  },
  deactivate: async (userId: string) => {
    const { deactivateUserFn } = await import("@/server/users");
    return deactivateUserFn({ data: userId });
  },
  delete: async (userId: string) => {
    const { deleteUserFn } = await import("@/server/users");
    return deleteUserFn({ data: userId });
  },
  get: async (userId?: string) => {
    if (!userId) {
      return null;
    }

    const { getUserFn } = await import("@/server/users");
    return getUserFn({ data: userId });
  },
  list: async (
    tenantId?: string,
    filters: Partial<{
      isActive: boolean;
      role: string;
      search: string;
    }> = {}
  ) => {
    const { listUsersFn } = await import("@/server/users");
    let users = await listUsersFn({
      data: {
        filters,
        tenantId: tenantId ?? null,
      },
    });

    // Apply client-side search filtering using utility
    if (isDefined(filters.search) && Array.isArray(users)) {
      users = filterUsersBySearch(users, filters.search);
    }

    return users;
  },
  update: async (variables: { userData: UpdateUser; userId: string }) => {
    const { userData, userId } = variables;

    const { updateUserFn } = await import("@/server/users");
    return updateUserFn({
      data: {
        userData,
        userId,
      },
    });
  },
  subscribeToTenant: async (variables: {
    plan: "monthly" | "yearly";
    tenantId: string;
    userId: string;
  }) => {
    const { subscribeToTenantFn } = await import("@/server/users");
    return subscribeToTenantFn({ data: variables });
  },
};
