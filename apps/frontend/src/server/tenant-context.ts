import { getRequest } from "@tanstack/react-start/server";
import { type User } from "sparktool-contracts";
import { type Tenant } from "@/schemas/tenant-contract";
import { extractTenantIdFromPath } from "@/utils/tenant-paths";
import { api } from "@/lib/api-client";
import { useAppSession } from "@/server/session";
import { TenantService } from "@/services/tenant-service";

export type StoredUser = User;

export function userHasTenantAccess(
  user: null | Pick<User, "role" | "tenantIds"> | undefined,
  tenantId: null | string | undefined,
): boolean {
  if (!tenantId) {
    return true;
  }

  if (!user) {
    return false;
  }

  if (user.role === "super-admin") {
    return true;
  }

  return (user.tenantIds || []).includes(tenantId);
}

function extractTenantIdFromUrl(value: null | string | undefined) {
  if (!value) {
    return undefined;
  }

  try {
    return extractTenantIdFromPath(new URL(value).pathname);
  } catch {
    return extractTenantIdFromPath(value);
  }
}

export async function resolveTenantFromCurrentRequest(): Promise<Tenant | null> {
  const request = getRequest();
  const tenantIdFromRequest =
    extractTenantIdFromUrl(request.url) ||
    extractTenantIdFromUrl(request.headers.get("referer"));

  if (tenantIdFromRequest) {
    const tenant = await TenantService.getTenantById(tenantIdFromRequest);

    if (tenant) {
      return tenant;
    }
  }

  const session = await useAppSession();

  if (session.data.activeTenantId) {
    const tenant = await TenantService.getTenantById(
      session.data.activeTenantId,
    );

    if (tenant) {
      return tenant;
    }
  }

  const rawHost =
    request.headers.get("x-forwarded-host") || request.headers.get("host");
  const host = rawHost
    ? rawHost
        .split(",")[0]!
        .trim()
        .replace(/^https?:\/\//, "")
        .split("/")[0]
        ?.split(":")[0]
        ?.trim() || null
    : null;

  if (!host) {
    return null;
  }

  return TenantService.getTenantByHost(host);
}

export async function requireAuthenticatedUser(): Promise<StoredUser> {
  const session = await useAppSession();

  if (!session.data.uid) {
    throw new Error("You must be signed in to perform this action.");
  }

  const actor = await api.get<StoredUser | null>(
    `/api/auth/user/${session.data.uid}`,
  );

  if (!actor) {
    throw new Error("Authenticated user account was not found.");
  }

  return actor;
}

export async function requireTenantScopedActor(): Promise<{
  actor: StoredUser;
  tenant: Tenant | null;
}> {
  const [actor, tenant] = await Promise.all([
    requireAuthenticatedUser(),
    resolveTenantFromCurrentRequest(),
  ]);

  if (tenant && !userHasTenantAccess(actor, tenant.id)) {
    throw new Error("You do not have access to this tenant.");
  }

  return { actor, tenant };
}

export async function requireTenantScopedActorWithTenant(options?: {
  allowMissingTenant?: boolean;
  requestedTenantId?: null | string;
}) {
  const { actor, tenant } = await requireTenantScopedActor();
  const requestedTenantId = options?.requestedTenantId ?? null;

  if (tenant && requestedTenantId && requestedTenantId !== tenant.id) {
    throw new Error("Tenant mismatch for the current request.");
  }

  const tenantId = tenant?.id ?? requestedTenantId ?? null;

  if (!tenantId && !options?.allowMissingTenant) {
    throw new Error("Tenant context is required for this action.");
  }

  if (tenantId && !userHasTenantAccess(actor, tenantId)) {
    throw new Error("You do not have access to this tenant.");
  }

  return {
    actor,
    tenant,
    tenantId,
  };
}

export function assertTenantAdminAccess(
  actor: Pick<StoredUser, "role">,
  message = "You do not have permission to perform this action.",
) {
  if (actor.role !== "admin" && actor.role !== "super-admin") {
    throw new Error(message);
  }
}
