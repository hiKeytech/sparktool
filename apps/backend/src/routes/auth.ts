import { randomUUID } from "node:crypto";

import { Router } from "express";
import { TenantService } from "../services/tenant-service.js";
import { PlatformConfigService } from "../services/platform-config-service.js";

import { passwordAuthRepository } from "../repositories/password-auth-repository.js";
import { userRepository } from "../repositories/user-repository.js";
import {
  getActorFromSession,
  httpError,
  userHasTenantAccess,
} from "../lib/request-helpers.js";

export const authRouter = Router();

function isDomainAllowed(email: string, restrictedDomains?: string[]) {
  if (!restrictedDomains?.length) return true;
  const normalized = email.trim().toLowerCase();
  return restrictedDomains.some((d) =>
    normalized.endsWith(d.trim().toLowerCase()),
  );
}

/** POST /api/auth/sign-in */
authRouter.post("/sign-in", async (request, response) => {
  const {
    allowSignup = false,
    displayName,
    email,
    mode = "sign-in",
    password,
    restrictedDomains,
    tenantId,
  } = request.body;

  if (!email || !password) {
    throw httpError(400, "Email and password are required.");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const resolvedTenant = tenantId
    ? await TenantService.getTenantById(tenantId)
    : await TenantService.getTenantByHost(request.hostname);
  const platformConfig = resolvedTenant
    ? null
    : await PlatformConfigService.getPlatformConfig();
  const authConfig = resolvedTenant?.config.auth ?? platformConfig?.auth;
  const domains = authConfig?.restrictedDomains?.length
    ? authConfig.restrictedDomains
    : (authConfig?.domains ?? restrictedDomains);

  if (!isDomainAllowed(normalizedEmail, domains)) {
    throw httpError(
      403,
      `Unauthorized email domain. Expected one of: ${(domains ?? []).join(", ")}`,
    );
  }

  if (mode === "sign-up") {
    if (!resolvedTenant) {
      throw httpError(400, "Sign up is not available from the platform login.");
    }
    if (!(authConfig?.allowSignup ?? allowSignup)) {
      throw httpError(403, "Sign up is disabled for this tenant.");
    }

    const existingAccount =
      await passwordAuthRepository.getByEmail(normalizedEmail);
    if (existingAccount) {
      throw httpError(409, "An account with this email already exists.");
    }

    const user = await userRepository.provisionIdentityUser({
      displayName: displayName || normalizedEmail.split("@")[0],
      email: normalizedEmail,
      tenantIds: [resolvedTenant.id],
      uid: randomUUID(),
    });
    if (!user) throw httpError(500, "Failed to create user account.");

    await passwordAuthRepository.createAccount({
      email: normalizedEmail,
      password,
      userId: user.id,
    });

    return response.json({ userData: user });
  }

  const passwordAccount = await passwordAuthRepository.verifyPassword({
    email: normalizedEmail,
    password,
  });
  if (!passwordAccount) {
    throw httpError(401, "Invalid email or password.");
  }

  const user = await userRepository.getById(passwordAccount.userId);
  if (!user) {
    throw httpError(500, "User account is missing. Please contact support.");
  }
  if (!userHasTenantAccess(user, resolvedTenant?.id)) {
    throw httpError(403, "You do not have access to this tenant.");
  }
  if (!resolvedTenant && user.role !== "super-admin") {
    throw httpError(
      403,
      "This login is restricted to platform administrators.",
    );
  }
  if (user.isActive === false) {
    throw httpError(
      403,
      "This account has been deactivated. Please contact an administrator.",
    );
  }

  const updatedUser = await userRepository.update(user.id, {
    lastLoginAt: Date.now(),
  });
  if (!updatedUser) {
    throw httpError(500, "Failed to update the current user session.");
  }

  response.json({ userData: updatedUser });
});

/** GET /api/auth/me */
authRouter.get("/me", async (request, response) => {
  if (!request.session.uid) {
    return response.json(null);
  }

  const [tenant, user] = await Promise.all([
    TenantService.getTenantByHost(request.hostname),
    userRepository.getById(request.session.uid),
  ]);

  if (!user || !userHasTenantAccess(user, tenant?.id)) {
    return response.json(null);
  }

  response.json(user);
});

/** GET /api/auth/user/:userId */
authRouter.get("/user/:userId", async (request, response) => {
  const [tenant, user] = await Promise.all([
    TenantService.getTenantByHost(request.hostname),
    userRepository.getById(request.params.userId),
  ]);

  if (!user || !userHasTenantAccess(user, tenant?.id)) {
    return response.json(null);
  }

  response.json(user);
});

/** POST /api/auth/change-password */
authRouter.post("/change-password", async (request, response) => {
  const { confirmPassword, currentPassword, newPassword } = request.body;

  if (!request.session.uid) {
    throw httpError(401, "You must be signed in to change your password.");
  }
  if (newPassword !== confirmPassword) {
    throw httpError(400, "Passwords do not match.");
  }
  if (newPassword.length < 8) {
    throw httpError(400, "New password must be at least 8 characters long.");
  }

  const user = await userRepository.getById(request.session.uid);
  if (!user) throw httpError(404, "User account is missing.");

  const verified = await passwordAuthRepository.verifyPassword({
    email: user.email,
    password: currentPassword,
  });
  if (!verified) throw httpError(401, "Current password is incorrect.");
  if (currentPassword === newPassword) {
    throw httpError(
      400,
      "New password must be different from your current password.",
    );
  }

  await passwordAuthRepository.updatePassword({
    password: newPassword,
    userId: user.id,
  });
  await userRepository.update(user.id, { lastLoginAt: Date.now() });

  response.json({ success: true });
});

/** POST /api/auth/reset-password */
authRouter.post("/reset-password", async (request, response) => {
  const { newPassword, userId } = request.body;

  if (!request.session.uid) {
    throw httpError(401, "You must be signed in.");
  }
  if (!newPassword || newPassword.length < 8) {
    throw httpError(
      400,
      "Temporary password must be at least 8 characters long.",
    );
  }

  const actor = await getActorFromSession(request);
  if (!actor) throw httpError(404, "Authenticated user account was not found.");
  if (actor.role !== "admin" && actor.role !== "super-admin") {
    throw httpError(403, "You do not have permission to reset passwords.");
  }

  const targetUser = await userRepository.getById(userId);
  if (!targetUser) throw httpError(404, "Target user was not found.");

  if (actor.role !== "super-admin") {
    const sharesTenant = (actor.tenantIds ?? []).some((id) =>
      (targetUser.tenantIds ?? []).includes(id),
    );
    if (!sharesTenant) {
      throw httpError(
        403,
        "You can only reset passwords for users in your tenant.",
      );
    }
    if (targetUser.role === "super-admin") {
      throw httpError(
        403,
        "Only super administrators can reset another super administrator's password.",
      );
    }
  }

  const existing = await passwordAuthRepository.getByUserId(targetUser.id);
  if (!existing) throw httpError(404, "Password account not found.");

  await passwordAuthRepository.updatePassword({
    password: newPassword,
    userId: targetUser.id,
  });
  await userRepository.update(targetUser.id, { lastLoginAt: null });

  response.json({ success: true, userId: targetUser.id });
});
