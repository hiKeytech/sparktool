import { c as createServerRpc, a as api } from "./api-client-Cl2DaV5u.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/react.mjs";
import { _ as _enum, o as object, s as string, e as email, b as boolean, r as record, c as any } from "../_libs/zod.mjs";
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
const userRoleInputSchema = _enum(["admin", "student", "super-admin"]);
const createUserInputSchema = object({
  department: string().trim().optional().nullable(),
  displayName: string().trim().min(2, "Name must be at least 2 characters long"),
  email: email(),
  location: string().trim().optional().nullable(),
  password: string().min(8, "Password must be at least 8 characters long"),
  role: userRoleInputSchema.default("student"),
  studentId: string().trim().optional().nullable(),
  tenantId: string().trim().optional().nullable()
});
const listUsersInputSchema = object({
  filters: object({
    isActive: boolean().optional(),
    role: string().optional(),
    search: string().optional()
  }).optional(),
  tenantId: string().nullable().optional()
});
const updateUserInputSchema = object({
  userData: record(string(), any()),
  userId: string().min(1)
});
const userIdInputSchema = string().min(1);
const subscribeToTenantInputSchema = object({
  plan: _enum(["monthly", "yearly"]),
  tenantId: string().min(1),
  userId: string().min(1)
});
const createUserFn_createServerFn_handler = createServerRpc({
  id: "720e16b1541758b063103a030088354aa38fe698d5df732ff1e966cb47db975b",
  name: "createUserFn",
  filename: "src/server/users.ts"
}, (opts) => createUserFn.__executeServer(opts));
const createUserFn = createServerFn({
  method: "POST"
}).inputValidator(createUserInputSchema).handler(createUserFn_createServerFn_handler, async ({
  data
}) => {
  return api.post("/api/users", data);
});
const getUserFn_createServerFn_handler = createServerRpc({
  id: "91e2359c95a033ccd46100b42773f4d21ed689a5706d958997e081e73cd7aeaa",
  name: "getUserFn",
  filename: "src/server/users.ts"
}, (opts) => getUserFn.__executeServer(opts));
const getUserFn = createServerFn({
  method: "GET"
}).inputValidator((userId) => userId).handler(getUserFn_createServerFn_handler, async ({
  data
}) => {
  if (!data) return null;
  return api.get(`/api/users/${data}`);
});
const listUsersFn_createServerFn_handler = createServerRpc({
  id: "1481d5727bcbe4af8d8858168b18b317940148f7514af151ceb12be7b18037be",
  name: "listUsersFn",
  filename: "src/server/users.ts"
}, (opts) => listUsersFn.__executeServer(opts));
const listUsersFn = createServerFn({
  method: "GET"
}).inputValidator(listUsersInputSchema).handler(listUsersFn_createServerFn_handler, async ({
  data
}) => {
  const params = new URLSearchParams();
  if (data.tenantId) params.set("tenantId", data.tenantId);
  if (data.filters?.isActive !== void 0) params.set("isActive", String(data.filters.isActive));
  if (data.filters?.role) params.set("role", data.filters.role);
  if (data.filters?.search) params.set("search", data.filters.search);
  return api.get(`/api/users?${params}`);
});
const updateUserFn_createServerFn_handler = createServerRpc({
  id: "e0e59869d0cae91e58ad1e1fbe616134a34c65f9febb2d100ff389a7918dc679",
  name: "updateUserFn",
  filename: "src/server/users.ts"
}, (opts) => updateUserFn.__executeServer(opts));
const updateUserFn = createServerFn({
  method: "POST"
}).inputValidator(updateUserInputSchema).handler(updateUserFn_createServerFn_handler, async ({
  data
}) => {
  return api.patch(`/api/users/${data.userId}`, data.userData);
});
const deactivateUserFn_createServerFn_handler = createServerRpc({
  id: "b68153f60357f2ae84367be085f810f95956716bcc7fd1d27fb1bd1a6e4fe6d3",
  name: "deactivateUserFn",
  filename: "src/server/users.ts"
}, (opts) => deactivateUserFn.__executeServer(opts));
const deactivateUserFn = createServerFn({
  method: "POST"
}).inputValidator(userIdInputSchema).handler(deactivateUserFn_createServerFn_handler, async ({
  data
}) => {
  return api.post(`/api/users/${data}/deactivate`, {});
});
const deleteUserFn_createServerFn_handler = createServerRpc({
  id: "a86acec804fd7427f99fde5f353f729ef4a7e76fca80ec34a6d937bf3721b0b3",
  name: "deleteUserFn",
  filename: "src/server/users.ts"
}, (opts) => deleteUserFn.__executeServer(opts));
const deleteUserFn = createServerFn({
  method: "POST"
}).inputValidator(userIdInputSchema).handler(deleteUserFn_createServerFn_handler, async ({
  data
}) => {
  return api.delete(`/api/users/${data}`);
});
const subscribeToTenantFn_createServerFn_handler = createServerRpc({
  id: "525c346226e506585d87bce6fa55d85d6945885375259b2f9d4d6241e91c5d4b",
  name: "subscribeToTenantFn",
  filename: "src/server/users.ts"
}, (opts) => subscribeToTenantFn.__executeServer(opts));
const subscribeToTenantFn = createServerFn({
  method: "POST"
}).inputValidator(subscribeToTenantInputSchema).handler(subscribeToTenantFn_createServerFn_handler, async ({
  data
}) => {
  return api.post("/api/users/subscribe", data);
});
export {
  createUserFn_createServerFn_handler,
  deactivateUserFn_createServerFn_handler,
  deleteUserFn_createServerFn_handler,
  getUserFn_createServerFn_handler,
  listUsersFn_createServerFn_handler,
  subscribeToTenantFn_createServerFn_handler,
  updateUserFn_createServerFn_handler
};
