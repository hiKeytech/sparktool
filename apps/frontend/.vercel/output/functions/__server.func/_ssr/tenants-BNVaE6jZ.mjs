import { c as createServerRpc, a as api } from "./api-client-Cl2DaV5u.mjs";
import { a as tenantIdSchema, c as createTenantInputSchema, b as createTenantOnboardingInputSchema, u as updateTenantInputSchema, d as tenantSchema } from "./tenant-contract-BrIl-2Jr.mjs";
import { a as requireAuthenticatedUser } from "./tenant-context-DwBgrysR.mjs";
import { c as createServerFn } from "./index.mjs";
import "./ai-B1BshGYU.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "../_libs/react.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
import "./tenant-service-UTCWe4Jf.mjs";
import "node:async_hooks";
import "node:stream";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "node:stream/web";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const invitationActionInputSchema = object({
  invitationId: string().trim().min(1),
  tenantId: tenantIdSchema
});
function normalizeTenantHost(value) {
  if (!value) return null;
  const candidate = value.split(",")[0].trim().toLowerCase().replace(/^https?:\/\//, "");
  const host = candidate.split("/")[0]?.trim();
  if (!host) return null;
  if (host.startsWith("[")) {
    const i = host.indexOf("]");
    return i === -1 ? host : host.slice(0, i + 1);
  }
  return host.split(":")[0]?.trim() || null;
}
function normalizeTenantRecord(input) {
  const normalizedId = input.id.trim().toLowerCase();
  const normalizedDomain = normalizeTenantHost(input.domain);
  if (!normalizedDomain) {
    throw new Error("A valid tenant domain is required.");
  }
  const restrictedDomains = Array.from(new Set((input.config.auth.restrictedDomains || input.config.auth.domains || []).map((domain) => normalizeTenantHost(domain) || domain.trim().toLowerCase()).filter(Boolean)));
  return tenantSchema.parse({
    config: {
      ...input.config,
      auth: {
        ...input.config.auth,
        domains: restrictedDomains,
        restrictedDomains
      }
    },
    domain: normalizedDomain,
    id: normalizedId,
    name: input.name.trim(),
    subscriptionStatus: input.subscriptionStatus ?? "trial"
  });
}
async function requireSuperAdmin() {
  const actor = await requireAuthenticatedUser();
  if (actor.role !== "super-admin") {
    throw new Error("Only platform administrators can manage tenants.");
  }
  return actor;
}
const createTenantFn_createServerFn_handler = createServerRpc({
  id: "9a886cb51873676362f83fec3d1acaa75c8b13df5ce76d2b1efb2205415f642d",
  name: "createTenantFn",
  filename: "src/server/tenants.ts"
}, (opts) => createTenantFn.__executeServer(opts));
const createTenantFn = createServerFn({
  method: "POST"
}).inputValidator(createTenantInputSchema).handler(createTenantFn_createServerFn_handler, async ({
  data
}) => {
  await requireSuperAdmin();
  const tenant = normalizeTenantRecord(data);
  return api.post("/api/tenants", tenant);
});
const createTenantOnboardingFn_createServerFn_handler = createServerRpc({
  id: "ae144b784bb0547588b0006f141d53cd05e787ee259d2ab15c2326d619174e95",
  name: "createTenantOnboardingFn",
  filename: "src/server/tenants.ts"
}, (opts) => createTenantOnboardingFn.__executeServer(opts));
const createTenantOnboardingFn = createServerFn({
  method: "POST"
}).inputValidator(createTenantOnboardingInputSchema).handler(createTenantOnboardingFn_createServerFn_handler, async ({
  data
}) => {
  await requireSuperAdmin();
  return api.post("/api/tenants/onboard", {
    initialAdminInvitation: {
      displayName: data.initialAdminInvitation.displayName?.trim() || null,
      email: data.initialAdminInvitation.email.trim().toLowerCase()
    },
    tenant: normalizeTenantRecord(data.tenant)
  });
});
const getTenantByIdFn_createServerFn_handler = createServerRpc({
  id: "90ee5006bfad64717778fef48bf75cfc81fc81047933b9df76d413f4bc8e6b9c",
  name: "getTenantByIdFn",
  filename: "src/server/tenants.ts"
}, (opts) => getTenantByIdFn.__executeServer(opts));
const getTenantByIdFn = createServerFn({
  method: "GET"
}).inputValidator(tenantIdSchema).handler(getTenantByIdFn_createServerFn_handler, async ({
  data
}) => {
  await requireSuperAdmin();
  return api.get(`/api/tenants/${data}`);
});
const listTenantsFn_createServerFn_handler = createServerRpc({
  id: "564bb5f000cdca9434834676eb3cc89d157fad8bd8096c46b29330ad266425c8",
  name: "listTenantsFn",
  filename: "src/server/tenants.ts"
}, (opts) => listTenantsFn.__executeServer(opts));
const listTenantsFn = createServerFn({
  method: "GET"
}).handler(listTenantsFn_createServerFn_handler, async () => {
  await requireSuperAdmin();
  return api.get("/api/tenants");
});
const updateTenantFn_createServerFn_handler = createServerRpc({
  id: "5e8f20d1537792d9987b831a7c2e4d7cf5eea68d56f6de7501d9bdd711c93308",
  name: "updateTenantFn",
  filename: "src/server/tenants.ts"
}, (opts) => updateTenantFn.__executeServer(opts));
const updateTenantFn = createServerFn({
  method: "POST"
}).inputValidator(updateTenantInputSchema).handler(updateTenantFn_createServerFn_handler, async ({
  data
}) => {
  await requireSuperAdmin();
  const existingTenant = await api.get(`/api/tenants/${data.tenantId}`);
  if (!existingTenant) {
    throw new Error("Tenant not found.");
  }
  const nextTenant = normalizeTenantRecord({
    config: {
      ...existingTenant.config,
      ...data.tenantData.config
    },
    domain: data.tenantData.domain ?? existingTenant.domain,
    id: existingTenant.id,
    name: data.tenantData.name ?? existingTenant.name,
    subscriptionStatus: data.tenantData.subscriptionStatus ?? existingTenant.subscriptionStatus
  });
  return api.patch(`/api/tenants/${data.tenantId}`, nextTenant);
});
const listTenantAdminInvitationsFn_createServerFn_handler = createServerRpc({
  id: "a22e27b766f3a9b7581ec1ab5e1eb8fca0b0735e49955ea0002b4ae565e864c4",
  name: "listTenantAdminInvitationsFn",
  filename: "src/server/tenants.ts"
}, (opts) => listTenantAdminInvitationsFn.__executeServer(opts));
const listTenantAdminInvitationsFn = createServerFn({
  method: "GET"
}).handler(listTenantAdminInvitationsFn_createServerFn_handler, async () => {
  await requireSuperAdmin();
  return api.get("/api/tenants/admin-invitations/all");
});
const reissueTenantAdminInvitationFn_createServerFn_handler = createServerRpc({
  id: "c8f8c3f719e244eb500bc405b06933d25021da3dbe1a5ce3701c94cf2ca6e7aa",
  name: "reissueTenantAdminInvitationFn",
  filename: "src/server/tenants.ts"
}, (opts) => reissueTenantAdminInvitationFn.__executeServer(opts));
const reissueTenantAdminInvitationFn = createServerFn({
  method: "POST"
}).inputValidator(invitationActionInputSchema).handler(reissueTenantAdminInvitationFn_createServerFn_handler, async ({
  data
}) => {
  await requireSuperAdmin();
  return api.post(`/api/tenants/${data.tenantId}/admin-invitations/${data.invitationId}/reissue`, {});
});
const revokeTenantAdminInvitationFn_createServerFn_handler = createServerRpc({
  id: "458a5e266b31b4298ab286f2910adf00aa095ce20453db524ba86361683e605c",
  name: "revokeTenantAdminInvitationFn",
  filename: "src/server/tenants.ts"
}, (opts) => revokeTenantAdminInvitationFn.__executeServer(opts));
const revokeTenantAdminInvitationFn = createServerFn({
  method: "POST"
}).inputValidator(invitationActionInputSchema).handler(revokeTenantAdminInvitationFn_createServerFn_handler, async ({
  data
}) => {
  await requireSuperAdmin();
  return api.post(`/api/tenants/${data.tenantId}/admin-invitations/${data.invitationId}/revoke`, {});
});
export {
  createTenantFn_createServerFn_handler,
  createTenantOnboardingFn_createServerFn_handler,
  getTenantByIdFn_createServerFn_handler,
  listTenantAdminInvitationsFn_createServerFn_handler,
  listTenantsFn_createServerFn_handler,
  reissueTenantAdminInvitationFn_createServerFn_handler,
  revokeTenantAdminInvitationFn_createServerFn_handler,
  updateTenantFn_createServerFn_handler
};
