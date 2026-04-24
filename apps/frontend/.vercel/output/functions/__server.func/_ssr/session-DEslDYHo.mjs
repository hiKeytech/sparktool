import { u as useSession$1 } from "./index.mjs";
import { o as object, s as string, a as array, n as number } from "../_libs/zod.mjs";
const sessionDataSchema = object({
  activeTenantId: string().optional(),
  email: string().optional(),
  role: string().nullable().optional(),
  tenantIds: array(string()).optional(),
  uid: string().optional()
});
object({
  id: string(),
  createdAt: number(),
  data: sessionDataSchema
});
function buildTenantPath(tenantId, path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (!tenantId) {
    return normalizedPath;
  }
  return `/${tenantId}${normalizedPath}`;
}
function resolveLoginTarget(tenantId) {
  if (tenantId) {
    return { params: { tenant: tenantId }, to: "/$tenant/login" };
  }
  return { to: "/login" };
}
function resolveRoleHomeTarget(role, tenantId) {
  switch (role) {
    case "admin":
      return tenantId ? { params: { tenant: tenantId }, to: "/$tenant/admin" } : { to: "/login" };
    case "student":
      return tenantId ? { params: { tenant: tenantId }, to: "/$tenant/student" } : { to: "/login" };
    case "super-admin":
      return { to: "/super-admin" };
    default:
      return resolveLoginTarget(tenantId);
  }
}
function extractTenantIdFromPath(pathname) {
  const [firstSegment] = pathname.split("/").filter(Boolean);
  if (!firstSegment) {
    return void 0;
  }
  const reservedRoots = /* @__PURE__ */ new Set([
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
    "verify-certificate"
  ]);
  return reservedRoots.has(firstSegment) ? void 0 : firstSegment;
}
const serverEnvSchema = object({
  APP_SESSION_COOKIE_NAME: string().min(1, "APP_SESSION_COOKIE_NAME is required"),
  APP_SESSION_SECRET: string().min(32, "APP_SESSION_SECRET must be at least 32 characters long")
});
const serverEnv = serverEnvSchema.parse({
  APP_SESSION_COOKIE_NAME: process.env.APP_SESSION_COOKIE_NAME,
  APP_SESSION_SECRET: process.env.APP_SESSION_SECRET
});
const sessionConfig = {
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: true
  },
  name: serverEnv.APP_SESSION_COOKIE_NAME,
  password: serverEnv.APP_SESSION_SECRET
};
function useAppSession() {
  return useSession$1(sessionConfig);
}
export {
  buildTenantPath as b,
  extractTenantIdFromPath as e,
  resolveRoleHomeTarget as r,
  sessionDataSchema as s,
  useAppSession as u
};
