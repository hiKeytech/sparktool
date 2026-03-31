import { createServerFn } from "@tanstack/react-start";
import { randomUUID } from "node:crypto";
import { z } from "zod";

import { passwordAuthRepository } from "@/server/repositories/password-auth-repository";
import { userRepository } from "@/server/repositories/user-repository";
import { PlatformConfigService } from "@/services/platform-config-service";
import { TenantService } from "@/services/tenant-service";
import {
  resolveTenantFromCurrentRequest,
  userHasTenantAccess,
} from "@/server/tenant-context";

import { sessionDataSchema, useAppSession } from "./session";

const setSessionDataSchema = sessionDataSchema.extend({
  uid: z.string().min(1),
});

const userLookupSchema = z.string().min(1).nullable();

const passwordAuthSchema = z.object({
  allowSignup: z.boolean().default(false),
  displayName: z.string().trim().min(2).optional(),
  email: z.email(),
  mode: z.enum(["sign-in", "sign-up"]).default("sign-in"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  restrictedDomains: z.array(z.string()).optional(),
  tenantId: z.string().min(1).optional(),
});

const changePasswordSchema = z
  .object({
    confirmPassword: z.string(),
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const resetUserPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, "Temporary password must be at least 8 characters long"),
  userId: z.string().min(1),
});

function isDomainAllowed(email: string, restrictedDomains?: string[]) {
  if (!restrictedDomains || restrictedDomains.length === 0) {
    return true;
  }

  const normalizedEmail = email.trim().toLowerCase();

  return restrictedDomains.some((domain) =>
    normalizedEmail.endsWith(domain.trim().toLowerCase()),
  );
}

export const setUserSessionFn = createServerFn({ method: "POST" })
  .inputValidator(setSessionDataSchema)
  .handler(async ({ data }) => {
    const session = await useAppSession();
    await session.update(data);
    return { success: true };
  });

export const clearUserSessionFn = createServerFn({ method: "POST" }).handler(
  async () => {
    const session = await useAppSession();
    await session.clear();
    return { success: true };
  },
);

export const getSessionDataFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await useAppSession();

    if (!session.data.uid) {
      return null;
    }

    return sessionDataSchema.parse(session.data);
  },
);

export const getCurrentUserFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await useAppSession();
    if (!session.data.uid) {
      return null;
    }

    const [tenant, user] = await Promise.all([
      resolveTenantFromCurrentRequest(),
      userRepository.getById(session.data.uid),
    ]);

    if (!user) {
      return null;
    }

    if (!userHasTenantAccess(user, tenant?.id)) {
      return null;
    }

    return user;
  },
);

export const getUserByIdFn = createServerFn({ method: "GET" })
  .inputValidator(userLookupSchema)
  .handler(async ({ data: userId }) => {
    const [tenant, user] = await Promise.all([
      resolveTenantFromCurrentRequest(),
      userRepository.getById(userId),
    ]);

    if (!user) {
      return null;
    }

    if (!userHasTenantAccess(user, tenant?.id)) {
      return null;
    }

    return user;
  });

export const signInWithPasswordFn = createServerFn({ method: "POST" })
  .inputValidator(passwordAuthSchema)
  .handler(async ({ data }) => {
    const normalizedEmail = data.email.trim().toLowerCase();
    const resolvedTenant = data.tenantId
      ? await TenantService.getTenantById(data.tenantId)
      : await resolveTenantFromCurrentRequest();
    const platformConfig = resolvedTenant
      ? null
      : await PlatformConfigService.getPlatformConfig();
    const authConfig = resolvedTenant?.config.auth ?? platformConfig?.auth;
    const restrictedDomains = authConfig?.restrictedDomains?.length
      ? authConfig.restrictedDomains
      : authConfig?.domains;

    if (!isDomainAllowed(normalizedEmail, restrictedDomains)) {
      throw new Error(
        `Unauthorized email domain. Expected one of: ${(restrictedDomains || []).join(", ")}`,
      );
    }

    const session = await useAppSession();

    if (data.mode === "sign-up") {
      if (!resolvedTenant) {
        throw new Error("Sign up is not available from the platform login.");
      }

      if (!(authConfig?.allowSignup ?? data.allowSignup)) {
        throw new Error("Sign up is disabled for this tenant.");
      }

      const existingAccount =
        await passwordAuthRepository.getByEmail(normalizedEmail);

      if (existingAccount) {
        throw new Error("An account with this email already exists.");
      }

      const user = await userRepository.provisionIdentityUser({
        displayName: data.displayName || normalizedEmail.split("@")[0],
        email: normalizedEmail,
        tenantIds: resolvedTenant ? [resolvedTenant.id] : [],
        uid: randomUUID(),
      });

      if (!user) {
        throw new Error("Failed to create user account.");
      }

      await passwordAuthRepository.createAccount({
        email: normalizedEmail,
        password: data.password,
        userId: user.id,
      });

      await session.update({
        activeTenantId: resolvedTenant?.id,
        email: user.email,
        role: user.role,
        tenantIds: user.tenantIds || [],
        uid: user.id,
      });

      return { userData: user };
    }

    const passwordAccount = await passwordAuthRepository.verifyPassword({
      email: normalizedEmail,
      password: data.password,
    });

    if (!passwordAccount) {
      throw new Error("Invalid email or password.");
    }

    const user = await userRepository.getById(passwordAccount.userId);

    if (!user) {
      throw new Error("User account is missing. Please contact support.");
    }

    if (!userHasTenantAccess(user, resolvedTenant?.id)) {
      throw new Error("You do not have access to this tenant.");
    }

    if (!resolvedTenant && user.role !== "super-admin") {
      throw new Error("This login is restricted to platform administrators.");
    }

    if (user.isActive === false) {
      throw new Error(
        "This account has been deactivated. Please contact an administrator.",
      );
    }

    const updatedUser = await userRepository.update(user.id, {
      lastLoginAt: Date.now(),
    });

    if (!updatedUser) {
      throw new Error("Failed to update the current user session.");
    }

    await session.update({
      activeTenantId: resolvedTenant?.id,
      email: updatedUser.email,
      role: updatedUser.role,
      tenantIds: updatedUser.tenantIds || [],
      uid: updatedUser.id,
    });

    return { userData: updatedUser };
  });

export const signOutUserFn = createServerFn({ method: "POST" }).handler(
  async () => {
    const session = await useAppSession();
    await session.clear();
    return { success: true };
  },
);

export const updateUserProfileFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      updates: z.record(z.string(), z.any()),
      userId: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const updatedUser = await userRepository.update(data.userId, data.updates);

    if (!updatedUser) {
      throw new Error("Failed to update user profile.");
    }

    return updatedUser.id;
  });

export const changePasswordFn = createServerFn({ method: "POST" })
  .inputValidator(changePasswordSchema)
  .handler(async ({ data }) => {
    const session = await useAppSession();

    if (!session.data.uid) {
      throw new Error("You must be signed in to change your password.");
    }

    const user = await userRepository.getById(session.data.uid);

    if (!user) {
      throw new Error("User account is missing. Please contact support.");
    }

    const passwordAccount = await passwordAuthRepository.getByUserId(user.id);

    if (!passwordAccount) {
      throw new Error("Password account not found. Please contact support.");
    }

    const verifiedAccount = await passwordAuthRepository.verifyPassword({
      email: user.email,
      password: data.currentPassword,
    });

    if (!verifiedAccount) {
      throw new Error("Current password is incorrect.");
    }

    if (data.currentPassword === data.newPassword) {
      throw new Error(
        "New password must be different from your current password.",
      );
    }

    await passwordAuthRepository.updatePassword({
      password: data.newPassword,
      userId: user.id,
    });

    await userRepository.update(user.id, {
      lastLoginAt: Date.now(),
    });

    return { success: true };
  });

export const resetUserPasswordFn = createServerFn({ method: "POST" })
  .inputValidator(resetUserPasswordSchema)
  .handler(async ({ data }) => {
    const session = await useAppSession();

    if (!session.data.uid) {
      throw new Error(
        "You must be signed in to reset another user's password.",
      );
    }

    const actor = await userRepository.getById(session.data.uid);

    if (!actor) {
      throw new Error("Authenticated user account was not found.");
    }

    if (actor.role !== "admin" && actor.role !== "super-admin") {
      throw new Error("You do not have permission to reset passwords.");
    }

    const targetUser = await userRepository.getById(data.userId);

    if (!targetUser) {
      throw new Error("Target user was not found.");
    }

    if (actor.role !== "super-admin") {
      const actorTenantIds = actor.tenantIds || [];
      const targetTenantIds = targetUser.tenantIds || [];
      const sharesTenant = actorTenantIds.some((tenantId) =>
        targetTenantIds.includes(tenantId),
      );

      if (!sharesTenant) {
        throw new Error(
          "You can only reset passwords for users in your tenant.",
        );
      }

      if (targetUser.role === "super-admin") {
        throw new Error(
          "Only super administrators can reset another super administrator's password.",
        );
      }
    }

    const existingPasswordAccount = await passwordAuthRepository.getByUserId(
      targetUser.id,
    );

    if (!existingPasswordAccount) {
      throw new Error("Password account not found for this user.");
    }

    await passwordAuthRepository.updatePassword({
      password: data.newPassword,
      userId: targetUser.id,
    });

    await userRepository.update(targetUser.id, {
      lastLoginAt: null,
    });

    return {
      success: true,
      userId: targetUser.id,
    };
  });
