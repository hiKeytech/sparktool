export function buildTenantPath(
  tenantId: string | undefined,
  path: string,
): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  if (!tenantId) {
    return normalizedPath;
  }

  return `/${tenantId}${normalizedPath}`;
}

type TenantRouteTarget =
  | { to: "/super-admin" }
  | { to: "/login" }
  | { params: { tenant: string }; to: "/$tenant/admin" }
  | { params: { tenant: string }; to: "/$tenant/login" }
  | { params: { tenant: string }; to: "/$tenant/student" };

export function resolveLoginTarget(tenantId?: string): TenantRouteTarget {
  if (tenantId) {
    return { params: { tenant: tenantId }, to: "/$tenant/login" };
  }

  return { to: "/login" };
}

export function resolveRoleHomeTarget(
  role: string | undefined,
  tenantId?: string,
): TenantRouteTarget {
  switch (role) {
    case "admin":
      return tenantId
        ? { params: { tenant: tenantId }, to: "/$tenant/admin" }
        : { to: "/login" };
    case "student":
      return tenantId
        ? { params: { tenant: tenantId }, to: "/$tenant/student" }
        : { to: "/login" };
    case "super-admin":
      return { to: "/super-admin" };
    default:
      return resolveLoginTarget(tenantId);
  }
}

export function resolveRoleHomePath(
  role: string | undefined,
  tenantId?: string,
): string {
  switch (role) {
    case "admin":
      return tenantId ? buildTenantPath(tenantId, "/admin") : "/login";
    case "student":
      return tenantId ? buildTenantPath(tenantId, "/student") : "/login";
    case "super-admin":
      return "/super-admin";
    default:
      return buildTenantPath(tenantId, "/login");
  }
}

export function extractTenantIdFromPath(pathname: string): string | undefined {
  const [firstSegment] = pathname.split("/").filter(Boolean);

  if (!firstSegment) {
    return undefined;
  }

  const reservedRoots = new Set([
    "admin",
    "contact",
    "courses",
    "guidelines",
    "help",
    "login",
    "privacy",
    "student",
    "super-admin",
    "support",
    "verify-certificate",
  ]);

  return reservedRoots.has(firstSegment) ? undefined : firstSegment;
}
