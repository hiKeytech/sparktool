import { c as createServerRpc, a as api } from "./api-client-Cl2DaV5u.mjs";
import { r as redeemAdminInvitationInputSchema } from "./tenant-contract-BrIl-2Jr.mjs";
import { r as resolveTenantFromCurrentRequest } from "./tenant-context-DwBgrysR.mjs";
import { s as sessionDataSchema, u as useAppSession } from "./session-DEslDYHo.mjs";
import { c as createServerFn } from "./index.mjs";
import "./ai-B1BshGYU.mjs";
import "./platform-config-DKda_4-W.mjs";
import "../_libs/react.mjs";
import { s as string, o as object, a as array, _ as _enum, e as email, b as boolean, r as record, c as any } from "../_libs/zod.mjs";
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
const setSessionDataSchema = sessionDataSchema.extend({
  uid: string().min(1)
});
const userLookupSchema = string().min(1).nullable();
const invitationLookupSchema = object({
  tenantId: string().min(1, "Tenant ID is required"),
  token: string().min(1, "Invitation token is required")
});
const passwordAuthSchema = object({
  allowSignup: boolean().default(false),
  displayName: string().trim().min(2).optional(),
  email: email(),
  mode: _enum(["sign-in", "sign-up"]).default("sign-in"),
  password: string().min(8, "Password must be at least 8 characters long"),
  restrictedDomains: array(string()).optional(),
  tenantId: string().min(1).optional()
});
const changePasswordSchema = object({
  confirmPassword: string(),
  currentPassword: string().min(1, "Current password is required"),
  newPassword: string().min(8, "New password must be at least 8 characters long")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
const resetUserPasswordSchema = object({
  newPassword: string().min(8, "Temporary password must be at least 8 characters long"),
  userId: string().min(1)
});
const setUserSessionFn_createServerFn_handler = createServerRpc({
  id: "7783dfd6d92cdf944bd11e25a64239dcf6a9c62ef61008d201f825a5d0ad0575",
  name: "setUserSessionFn",
  filename: "src/server/auth.ts"
}, (opts) => setUserSessionFn.__executeServer(opts));
const setUserSessionFn = createServerFn({
  method: "POST"
}).inputValidator(setSessionDataSchema).handler(setUserSessionFn_createServerFn_handler, async ({
  data
}) => {
  const session = await useAppSession();
  await session.update(data);
  return {
    success: true
  };
});
const clearUserSessionFn_createServerFn_handler = createServerRpc({
  id: "83c4f1e1fd6a67d2e84e95512ea9c14b38cbe296597739e914c94c69365e7825",
  name: "clearUserSessionFn",
  filename: "src/server/auth.ts"
}, (opts) => clearUserSessionFn.__executeServer(opts));
const clearUserSessionFn = createServerFn({
  method: "POST"
}).handler(clearUserSessionFn_createServerFn_handler, async () => {
  const session = await useAppSession();
  await session.clear();
  return {
    success: true
  };
});
const getSessionDataFn_createServerFn_handler = createServerRpc({
  id: "779a761f1a825006aa301206dd10631009897c4b7f1a28db45fc8fd134d4709f",
  name: "getSessionDataFn",
  filename: "src/server/auth.ts"
}, (opts) => getSessionDataFn.__executeServer(opts));
const getSessionDataFn = createServerFn({
  method: "GET"
}).handler(getSessionDataFn_createServerFn_handler, async () => {
  const session = await useAppSession();
  if (!session.data.uid) {
    return null;
  }
  return sessionDataSchema.parse(session.data);
});
const getCurrentUserFn_createServerFn_handler = createServerRpc({
  id: "eb89faca6fe6e97047ae155b6afc8f404273f7bd19a28aaf1157be1e410abd51",
  name: "getCurrentUserFn",
  filename: "src/server/auth.ts"
}, (opts) => getCurrentUserFn.__executeServer(opts));
const getCurrentUserFn = createServerFn({
  method: "GET"
}).handler(getCurrentUserFn_createServerFn_handler, async () => {
  return api.get("/api/auth/me");
});
const getUserByIdFn_createServerFn_handler = createServerRpc({
  id: "c24b80f27dd9e030968dcc5479c568baf57bb04b19c8cb1cce4e2edd06e3a515",
  name: "getUserByIdFn",
  filename: "src/server/auth.ts"
}, (opts) => getUserByIdFn.__executeServer(opts));
const getUserByIdFn = createServerFn({
  method: "GET"
}).inputValidator(userLookupSchema).handler(getUserByIdFn_createServerFn_handler, async ({
  data: userId
}) => {
  return api.get(`/api/auth/user/${userId}`);
});
const signInWithPasswordFn_createServerFn_handler = createServerRpc({
  id: "2a100f17138769f334ee33312a2560b67b2755cbf066b5fdb034aefdc55cf101",
  name: "signInWithPasswordFn",
  filename: "src/server/auth.ts"
}, (opts) => signInWithPasswordFn.__executeServer(opts));
const signInWithPasswordFn = createServerFn({
  method: "POST"
}).inputValidator(passwordAuthSchema).handler(signInWithPasswordFn_createServerFn_handler, async ({
  data
}) => {
  const resolvedTenant = !data.tenantId ? await resolveTenantFromCurrentRequest() : null;
  const result = await api.post("/api/auth/sign-in", {
    ...data,
    tenantId: data.tenantId ?? resolvedTenant?.id
  });
  const session = await useAppSession();
  const user = result.userData;
  await session.update({
    activeTenantId: data.tenantId ?? resolvedTenant?.id,
    email: user.email,
    role: user.role,
    tenantIds: user.tenantIds ?? [],
    uid: user.id
  });
  return result;
});
const signOutUserFn_createServerFn_handler = createServerRpc({
  id: "436845b47a80b39d6e4f91499a2a94943ab5a4a73ea6218d75d6a18e46839437",
  name: "signOutUserFn",
  filename: "src/server/auth.ts"
}, (opts) => signOutUserFn.__executeServer(opts));
const signOutUserFn = createServerFn({
  method: "POST"
}).handler(signOutUserFn_createServerFn_handler, async () => {
  const session = await useAppSession();
  await session.clear();
  return {
    success: true
  };
});
const getAdminInvitationPreviewFn_createServerFn_handler = createServerRpc({
  id: "db03c1a02acbc83487ba5d76b322c137f905a6fbe85292ed569f401d722faa78",
  name: "getAdminInvitationPreviewFn",
  filename: "src/server/auth.ts"
}, (opts) => getAdminInvitationPreviewFn.__executeServer(opts));
const getAdminInvitationPreviewFn = createServerFn({
  method: "GET"
}).inputValidator(invitationLookupSchema).handler(getAdminInvitationPreviewFn_createServerFn_handler, async ({
  data
}) => {
  const preview = await api.get(`/api/auth/invitations/${encodeURIComponent(data.token)}`);
  if (preview.tenantId !== data.tenantId) {
    throw new Error("This invitation does not belong to the current tenant.");
  }
  return preview;
});
const redeemAdminInvitationFn_createServerFn_handler = createServerRpc({
  id: "4bb39ef5c722da31935fcd6ce957ccda0713995555a72430d81f70af21d90a0d",
  name: "redeemAdminInvitationFn",
  filename: "src/server/auth.ts"
}, (opts) => redeemAdminInvitationFn.__executeServer(opts));
const redeemAdminInvitationFn = createServerFn({
  method: "POST"
}).inputValidator(redeemAdminInvitationInputSchema).handler(redeemAdminInvitationFn_createServerFn_handler, async ({
  data
}) => {
  const result = await api.post("/api/auth/redeem-invite", data);
  const session = await useAppSession();
  const user = result.userData;
  await session.update({
    activeTenantId: data.tenantId,
    email: user.email,
    role: user.role,
    tenantIds: user.tenantIds ?? [],
    uid: user.id
  });
  return result;
});
const updateUserProfileFn_createServerFn_handler = createServerRpc({
  id: "d0813b0fc759b8036304659d798f8ff9d0e9929a241814362dc2fc21e4976583",
  name: "updateUserProfileFn",
  filename: "src/server/auth.ts"
}, (opts) => updateUserProfileFn.__executeServer(opts));
const updateUserProfileFn = createServerFn({
  method: "POST"
}).inputValidator(object({
  updates: record(string(), any()),
  userId: string().min(1)
})).handler(updateUserProfileFn_createServerFn_handler, async ({
  data
}) => {
  return api.patch(`/api/users/${data.userId}`, data.updates);
});
const changePasswordFn_createServerFn_handler = createServerRpc({
  id: "2c90d8e9759295c21472cfe7f21a65e1919ea7a3435f8fc24a492411c5eca364",
  name: "changePasswordFn",
  filename: "src/server/auth.ts"
}, (opts) => changePasswordFn.__executeServer(opts));
const changePasswordFn = createServerFn({
  method: "POST"
}).inputValidator(changePasswordSchema).handler(changePasswordFn_createServerFn_handler, async ({
  data
}) => {
  return api.post("/api/auth/change-password", data);
});
const resetUserPasswordFn_createServerFn_handler = createServerRpc({
  id: "0f80b7261914574f6a4379522cabf6fab1c43be27f180014b57b94277cf9730b",
  name: "resetUserPasswordFn",
  filename: "src/server/auth.ts"
}, (opts) => resetUserPasswordFn.__executeServer(opts));
const resetUserPasswordFn = createServerFn({
  method: "POST"
}).inputValidator(resetUserPasswordSchema).handler(resetUserPasswordFn_createServerFn_handler, async ({
  data
}) => {
  return api.post("/api/auth/reset-password", data);
});
export {
  changePasswordFn_createServerFn_handler,
  clearUserSessionFn_createServerFn_handler,
  getAdminInvitationPreviewFn_createServerFn_handler,
  getCurrentUserFn_createServerFn_handler,
  getSessionDataFn_createServerFn_handler,
  getUserByIdFn_createServerFn_handler,
  redeemAdminInvitationFn_createServerFn_handler,
  resetUserPasswordFn_createServerFn_handler,
  setUserSessionFn_createServerFn_handler,
  signInWithPasswordFn_createServerFn_handler,
  signOutUserFn_createServerFn_handler,
  updateUserProfileFn_createServerFn_handler
};
