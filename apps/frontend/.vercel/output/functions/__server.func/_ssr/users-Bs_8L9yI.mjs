import { c as createSsrRpc } from "./course-structure-D2f1-VM0.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/react.mjs";
import { o as object, s as string, _ as _enum, r as record, c as any, b as boolean, e as email } from "../_libs/zod.mjs";
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
const createUserFn = createServerFn({
  method: "POST"
}).inputValidator(createUserInputSchema).handler(createSsrRpc("720e16b1541758b063103a030088354aa38fe698d5df732ff1e966cb47db975b"));
const getUserFn = createServerFn({
  method: "GET"
}).inputValidator((userId) => userId).handler(createSsrRpc("91e2359c95a033ccd46100b42773f4d21ed689a5706d958997e081e73cd7aeaa"));
const listUsersFn = createServerFn({
  method: "GET"
}).inputValidator(listUsersInputSchema).handler(createSsrRpc("1481d5727bcbe4af8d8858168b18b317940148f7514af151ceb12be7b18037be"));
const updateUserFn = createServerFn({
  method: "POST"
}).inputValidator(updateUserInputSchema).handler(createSsrRpc("e0e59869d0cae91e58ad1e1fbe616134a34c65f9febb2d100ff389a7918dc679"));
const deactivateUserFn = createServerFn({
  method: "POST"
}).inputValidator(userIdInputSchema).handler(createSsrRpc("b68153f60357f2ae84367be085f810f95956716bcc7fd1d27fb1bd1a6e4fe6d3"));
const deleteUserFn = createServerFn({
  method: "POST"
}).inputValidator(userIdInputSchema).handler(createSsrRpc("a86acec804fd7427f99fde5f353f729ef4a7e76fca80ec34a6d937bf3721b0b3"));
const subscribeToTenantFn = createServerFn({
  method: "POST"
}).inputValidator(subscribeToTenantInputSchema).handler(createSsrRpc("525c346226e506585d87bce6fa55d85d6945885375259b2f9d4d6241e91c5d4b"));
export {
  createUserFn,
  deactivateUserFn,
  deleteUserFn,
  getUserFn,
  listUsersFn,
  subscribeToTenantFn,
  updateUserFn
};
