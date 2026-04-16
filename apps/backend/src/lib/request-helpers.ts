import type { Request } from "express";

import {
  userRepository,
  type StoredUser,
} from "../repositories/user-repository.js";

export async function getActorFromSession(
  request: Request,
): Promise<StoredUser | null> {
  if (!request.session.uid) return null;
  return userRepository.getById(request.session.uid);
}

export function assertAdminAccess(
  actor: StoredUser | null | undefined,
  message = "Admin access required",
): asserts actor is StoredUser {
  if (!actor || (actor.role !== "admin" && actor.role !== "super-admin")) {
    throw Object.assign(new Error(message), { status: 403 });
  }
}

export function userHasTenantAccess(
  user: StoredUser | null | undefined,
  tenantId: string | null | undefined,
): boolean {
  if (!user) return false;
  if (user.role === "super-admin") return true;
  if (!tenantId) return true;
  return (user.tenantIds ?? []).includes(tenantId);
}

export function httpError(status: number, message: string): Error {
  return Object.assign(new Error(message), { status });
}
