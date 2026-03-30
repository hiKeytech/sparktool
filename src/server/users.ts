import { createServerFn } from "@tanstack/react-start";
import { randomUUID } from "node:crypto";
import { z } from "zod";

import { passwordAuthRepository } from "@/server/repositories/password-auth-repository";
import { userRepository } from "@/server/repositories/user-repository";

const userRoleInputSchema = z.enum(["admin", "student", "super-admin"]);

const createUserInputSchema = z.object({
  department: z.string().trim().optional().nullable(),
  displayName: z.string().trim().min(2, "Name must be at least 2 characters long"),
  email: z.email(),
  location: z.string().trim().optional().nullable(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: userRoleInputSchema.default("student"),
  studentId: z.string().trim().optional().nullable(),
  tenantId: z.string().trim().optional().nullable(),
});

const listUsersInputSchema = z.object({
  filters: z
    .object({
      isActive: z.boolean().optional(),
      role: z.string().optional(),
      search: z.string().optional(),
    })
    .optional(),
  tenantId: z.string().nullable().optional(),
});

const updateUserInputSchema = z.object({
  userData: z.record(z.string(), z.any()),
  userId: z.string().min(1),
});

const userIdInputSchema = z.string().min(1);

const subscribeToTenantInputSchema = z.object({
  plan: z.enum(["monthly", "yearly"]),
  tenantId: z.string().min(1),
  userId: z.string().min(1),
});

export const createUserFn = createServerFn({ method: "POST" })
  .inputValidator(createUserInputSchema)
  .handler(async ({ data }) => {
    const normalizedEmail = data.email.trim().toLowerCase();
    const existingUser = await userRepository.getByEmail(normalizedEmail);

    if (existingUser) {
      throw new Error("A user with this email already exists.");
    }

    const existingPasswordAccount = await passwordAuthRepository.getByEmail(normalizedEmail);

    if (existingPasswordAccount) {
      throw new Error("A password account with this email already exists.");
    }

    const now = Date.now();
    const userId = randomUUID();
    const user = await userRepository.create({
      certificatesEarned: 0,
      completedCourses: [],
      createdAt: now,
      department: data.department || null,
      displayName: data.displayName,
      email: normalizedEmail,
      enrolledCourses: [],
      isActive: true,
      isPending: false,
      lastLoginAt: null,
      location: data.location || null,
      photoURL: "",
      preferences: {
        language: "en",
        notifications: true,
        theme: "light",
      },
      role: data.role,
      studentId: data.studentId || null,
      subscriptions: [],
      tenantIds: data.tenantId ? [data.tenantId] : [],
      totalWatchTime: 0,
      uid: userId,
      updatedAt: now,
    });

    if (!user) {
      throw new Error("Failed to create user.");
    }

    await passwordAuthRepository.createAccount({
      email: normalizedEmail,
      password: data.password,
      userId: user.id,
    });

    return user;
  });

export const getUserFn = createServerFn({ method: "GET" })
  .inputValidator((userId: undefined | string) => userId)
  .handler(async ({ data }) => {
    return userRepository.getById(data);
  });

export const listUsersFn = createServerFn({ method: "GET" })
  .inputValidator(listUsersInputSchema)
  .handler(async ({ data }) => {
    return userRepository.list(data.tenantId ?? undefined, data.filters || {});
  });

export const updateUserFn = createServerFn({ method: "POST" })
  .inputValidator(updateUserInputSchema)
  .handler(async ({ data }) => {
    const updatedUser = await userRepository.update(data.userId, data.userData);

    if (!updatedUser) {
      throw new Error("Failed to update user.");
    }

    return updatedUser.id;
  });

export const deactivateUserFn = createServerFn({ method: "POST" })
  .inputValidator(userIdInputSchema)
  .handler(async ({ data }) => {
    const updatedUser = await userRepository.deactivate(data);

    if (!updatedUser) {
      throw new Error("Failed to deactivate user.");
    }

    return updatedUser.id;
  });

export const deleteUserFn = createServerFn({ method: "POST" })
  .inputValidator(userIdInputSchema)
  .handler(async ({ data }) => {
    const updatedUser = await userRepository.deactivate(data);

    if (!updatedUser) {
      throw new Error("Failed to remove user access.");
    }

    return { success: true, userId: updatedUser.id };
  });

export const subscribeToTenantFn = createServerFn({ method: "POST" })
  .inputValidator(subscribeToTenantInputSchema)
  .handler(async ({ data }) => {
    const updatedUser = await userRepository.subscribeToTenant(data);

    if (!updatedUser) {
      throw new Error("Failed to update tenant subscription.");
    }

    return updatedUser.id;
  });