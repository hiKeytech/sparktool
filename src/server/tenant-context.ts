import { getRequest } from "@tanstack/react-start/server";

import { type Tenant } from "@/schemas/tenant-contract";
import { extractTenantIdFromPath } from "@/utils/tenant-paths";
import {
  userRepository,
  type StoredUser,
} from "@/server/repositories/user-repository";
import { useAppSession } from "@/server/session";
import { TenantService } from "@/services/tenant-service";

export function normalizeTenantHost(
  value: null | string | undefined,
): null | string {
  if (!value) {
    return null;
  }

  const [firstValue] = value.split(",");
  const candidate = firstValue.trim().toLowerCase();

  if (!candidate) {
    return null;
  }

  const withoutProtocol = candidate.replace(/^https?:\/\//, "");
  const host = withoutProtocol.split("/")[0]?.trim();

  if (!host) {
    return null;
  }

  const isIpv6 = host.startsWith("[");
  if (isIpv6) {
    const closingBracketIndex = host.indexOf("]");
    return closingBracketIndex === -1
      ? host
      : host.slice(0, closingBracketIndex + 1);
  }

  return host.split(":")[0]?.trim() || null;
}

export function userHasTenantAccess(
  user: null | Pick<StoredUser, "role" | "tenantIds"> | undefined,
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

  const host = normalizeTenantHost(
    request.headers.get("x-forwarded-host") || request.headers.get("host"),
  );

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

  const actor = await userRepository.getById(session.data.uid);

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
