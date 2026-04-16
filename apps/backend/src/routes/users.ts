import { randomUUID } from "node:crypto";

import { Router } from "express";

import { passwordAuthRepository } from "../repositories/password-auth-repository.js";
import { userRepository } from "../repositories/user-repository.js";
import {
  getActorFromSession,
  httpError,
  userHasTenantAccess,
} from "../lib/request-helpers.js";
import { requireSession } from "../middleware/session.js";

export const usersRouter = Router();

/** POST /api/users — admin creates a new user */
usersRouter.post("/", requireSession, async (request, response) => {
  const {
    department,
    displayName,
    email,
    location,
    password,
    role = "student",
    studentId,
    tenantId: bodyTenantId,
  } = request.body;

  const actor = await getActorFromSession(request);
  if (!actor) throw httpError(401, "Unauthorized");
  if (actor.role !== "admin" && actor.role !== "super-admin") {
    throw httpError(403, "You do not have permission to create users.");
  }
  if (actor.role !== "super-admin" && role === "super-admin") {
    throw httpError(
      403,
      "Only super administrators can create another super administrator.",
    );
  }

  const tenantId = bodyTenantId ?? request.session.activeTenantId ?? null;

  if (!userHasTenantAccess(actor, tenantId)) {
    throw httpError(403, "You can only create users inside your tenant.");
  }

  const normalizedEmail = email.trim().toLowerCase();
  const [existing, existingAuth] = await Promise.all([
    userRepository.getByEmail(normalizedEmail),
    passwordAuthRepository.getByEmail(normalizedEmail),
  ]);

  if (existing) throw httpError(409, "A user with this email already exists.");
  if (existingAuth) {
    throw httpError(409, "A password account with this email already exists.");
  }

  const now = Date.now();
  const userId = randomUUID();
  const user = await userRepository.create({
    certificatesEarned: 0,
    completedCourses: [],
    createdAt: now,
    department: department ?? null,
    displayName,
    email: normalizedEmail,
    enrolledCourses: [],
    isActive: true,
    isPending: false,
    lastLoginAt: null,
    location: location ?? null,
    photoURL: "",
    preferences: { language: "en", notifications: true, theme: "light" },
    role,
    studentId: studentId ?? null,
    subscriptions: [],
    tenantIds: tenantId ? [tenantId] : [],
    totalWatchTime: 0,
    uid: userId,
    updatedAt: now,
  });
  if (!user) throw httpError(500, "Failed to create user.");

  await passwordAuthRepository.createAccount({
    email: normalizedEmail,
    password,
    userId: user.id,
  });

  response.status(201).json(user);
});

/** GET /api/users */
usersRouter.get("/", requireSession, async (request, response) => {
  const actor = await getActorFromSession(request);
  if (!actor) throw httpError(401, "Unauthorized");

  const tenantId =
    (request.query.tenantId as string | undefined) ??
    request.session.activeTenantId ??
    undefined;

  if (!userHasTenantAccess(actor, tenantId)) {
    throw httpError(403, "You can only view users inside your tenant.");
  }

  const filters: Record<string, unknown> = {};
  if (request.query.role) filters.role = request.query.role as string;
  if (request.query.isActive !== undefined)
    filters.isActive = request.query.isActive === "true";
  if (request.query.search) filters.search = request.query.search as string;

  const users = await userRepository.list(tenantId, filters);
  response.json(users);
});

/** GET /api/users/:userId */
usersRouter.get("/:userId", requireSession, async (request, response) => {
  const actor = await getActorFromSession(request);
  if (!actor) throw httpError(401, "Unauthorized");

  const user = await userRepository.getById(request.params.userId as string);
  if (!user) return response.json(null);

  const tenantId = request.session.activeTenantId;
  if (!userHasTenantAccess(user, tenantId)) return response.json(null);

  if (
    actor.role !== "super-admin" &&
    actor.id !== user.id &&
    !userHasTenantAccess(actor, user.tenantIds?.[0])
  ) {
    return response.json(null);
  }

  response.json(user);
});

/** PATCH /api/users/:userId */
usersRouter.patch("/:userId", requireSession, async (request, response) => {
  const actor = await getActorFromSession(request);
  if (!actor) throw httpError(401, "Unauthorized");

  const targetUser = await userRepository.getById(
    request.params.userId as string,
  );
  if (!targetUser) throw httpError(404, "User not found.");

  const tenantId = request.session.activeTenantId;
  if (!userHasTenantAccess(targetUser, tenantId)) {
    throw httpError(403, "You do not have access to this user.");
  }
  if (actor.role !== "super-admin" && targetUser.role === "super-admin") {
    throw httpError(
      403,
      "Only super administrators can update another super administrator.",
    );
  }

  const updated = await userRepository.update(
    request.params.userId as string,
    request.body,
  );
  if (!updated) throw httpError(500, "Failed to update user.");

  response.json({ id: updated.id });
});

/** POST /api/users/:userId/deactivate */
usersRouter.post(
  "/:userId/deactivate",
  requireSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    if (!actor) throw httpError(401, "Unauthorized");

    const targetUser = await userRepository.getById(
      request.params.userId as string,
    );
    if (!targetUser) throw httpError(404, "User not found.");

    const tenantId = request.session.activeTenantId;
    if (!userHasTenantAccess(targetUser, tenantId)) {
      throw httpError(403, "You do not have access to this user.");
    }
    if (actor.role !== "super-admin" && targetUser.role === "super-admin") {
      throw httpError(
        403,
        "Only super administrators can deactivate another super administrator.",
      );
    }

    const updated = await userRepository.deactivate(
      request.params.userId as string,
    );
    if (!updated) throw httpError(500, "Failed to deactivate user.");

    response.json({ id: updated.id });
  },
);

/** DELETE /api/users/:userId */
usersRouter.delete("/:userId", requireSession, async (request, response) => {
  const actor = await getActorFromSession(request);
  if (!actor) throw httpError(401, "Unauthorized");

  const targetUser = await userRepository.getById(
    request.params.userId as string,
  );
  if (!targetUser) throw httpError(404, "User not found.");

  const tenantId = request.session.activeTenantId;
  if (!userHasTenantAccess(targetUser, tenantId)) {
    throw httpError(403, "You do not have access to this user.");
  }
  if (actor.role !== "super-admin" && targetUser.role === "super-admin") {
    throw httpError(
      403,
      "Only super administrators can remove another super administrator.",
    );
  }

  const updated = await userRepository.deactivate(
    request.params.userId as string,
  );
  if (!updated) throw httpError(500, "Failed to remove user access.");

  response.json({ success: true, userId: updated.id });
});

/** POST /api/users/subscribe */
usersRouter.post("/subscribe", requireSession, async (request, response) => {
  const { plan, tenantId, userId } = request.body;

  const actor = await getActorFromSession(request);
  if (!actor) throw httpError(401, "Unauthorized");

  if (!userHasTenantAccess(actor, tenantId)) {
    throw httpError(
      403,
      "You can only update subscriptions for users in your tenant.",
    );
  }

  const updated = await userRepository.subscribeToTenant({
    plan,
    tenantId,
    userId,
  });
  if (!updated) throw httpError(500, "Failed to update tenant subscription.");

  response.json({ id: updated.id });
});
