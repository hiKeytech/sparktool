import { createHash, randomUUID } from "node:crypto";

import { Router } from "express";
import { TenantService } from "../services/tenant-service.js";
import { PlatformConfigService } from "../services/platform-config-service.js";
import { redeemAdminInvitationInputSchema } from "sparktool-contracts/invitation";

import { activityLogRepository } from "../repositories/activity-log-repository.js";
import { adminInvitationRepository } from "../repositories/admin-invitation-repository.js";
import { passwordAuthRepository } from "../repositories/password-auth-repository.js";
import { userRepository } from "../repositories/user-repository.js";
import {
  getActorFromSession,
  httpError,
  userHasTenantAccess,
} from "../lib/request-helpers.js";

export const authRouter = Router();

function hashInvitationToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

async function getInvitationOrThrow(token: string) {
  const invitation = await adminInvitationRepository.getByTokenHash(
    hashInvitationToken(token),
  );

  if (!invitation) {
    throw httpError(404, "Invitation was not found.");
  }

  if (invitation.status === "revoked") {
    throw httpError(410, "This invitation has been revoked.");
  }

  if (invitation.status === "redeemed") {
    throw httpError(409, "This invitation has already been redeemed.");
  }

  if (invitation.expiresAt <= Date.now()) {
    if (invitation.status !== "expired") {
      await adminInvitationRepository.update(invitation.id, {
        status: "expired",
      });
    }

    throw httpError(410, "This invitation has expired.");
  }

  return invitation;
}

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

/** GET /api/auth/invitations/:token */
authRouter.get("/invitations/:token", async (request, response) => {
  const invitation = await getInvitationOrThrow(request.params.token);

  response.json({
    displayName: invitation.displayName ?? null,
    email: invitation.email,
    expiresAt: invitation.expiresAt,
    role: invitation.role,
    status: invitation.status,
    tenantId: invitation.tenantId,
  });
});

/** POST /api/auth/redeem-invite */
authRouter.post("/redeem-invite", async (request, response) => {
  const parseResult = redeemAdminInvitationInputSchema.safeParse(request.body);

  if (!parseResult.success) {
    throw httpError(400, "Invalid invitation redemption payload.");
  }

  const { department, displayName, location, password, tenantId, token } =
    parseResult.data;
  const invitation = await getInvitationOrThrow(token);

  if (invitation.tenantId !== tenantId) {
    throw httpError(
      400,
      "This invitation does not belong to the current tenant.",
    );
  }

  const normalizedEmail = invitation.email.trim().toLowerCase();
  const [existingUser, existingAccount] = await Promise.all([
    userRepository.getByEmail(normalizedEmail),
    passwordAuthRepository.getByEmail(normalizedEmail),
  ]);

  if (existingUser || existingAccount) {
    throw httpError(
      409,
      "An account with this email already exists. Ask a platform administrator to re-issue access.",
    );
  }

  const userId = randomUUID();
  const now = Date.now();
  const createdUser = await userRepository.create({
    certificatesEarned: 0,
    completedCourses: [],
    createdAt: now,
    department: department?.trim() || null,
    displayName: displayName.trim(),
    email: normalizedEmail,
    enrolledCourses: [],
    isActive: true,
    isPending: false,
    lastLoginAt: now,
    location: location?.trim() || null,
    photoURL: "",
    preferences: { language: "en", notifications: true, theme: "light" },
    role: invitation.role,
    studentId: null,
    subscriptions: [],
    tenantIds: [invitation.tenantId],
    totalWatchTime: 0,
    uid: userId,
    updatedAt: now,
  });

  if (!createdUser) {
    throw httpError(500, "Failed to create the invited administrator account.");
  }

  try {
    await passwordAuthRepository.createAccount({
      email: normalizedEmail,
      password,
      userId: createdUser.id,
    });

    await adminInvitationRepository.update(invitation.id, {
      redeemedAt: now,
      redeemedUserId: createdUser.id,
      status: "redeemed",
    });

    void activityLogRepository.create({
      action: "admin_invitation_redeemed",
      tenantId: invitation.tenantId,
      userId: createdUser.id,
    });

    response.json({ userData: createdUser });
  } catch (error) {
    await Promise.allSettled([
      passwordAuthRepository.deleteByUserId(createdUser.id),
      userRepository.delete(createdUser.id),
    ]);

    throw httpError(
      500,
      error instanceof Error
        ? error.message
        : "Failed to redeem the administrator invitation.",
    );
  }
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
