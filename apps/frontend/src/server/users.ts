import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import {
  api,
  type ApiIdResponse,
  type ApiSuccessResponse,
} from "@/lib/api-client";
import type { User } from "@/schemas/user";

type StoredUser = User & { id: string };
type DeleteUserResponse = ApiSuccessResponse & { userId: string };

const userRoleInputSchema = z.enum(["admin", "student", "super-admin"]);

const createUserInputSchema = z.object({
  department: z.string().trim().optional().nullable(),
  displayName: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters long"),
  email: z.email(),
  location: z.string().trim().optional().nullable(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: userRoleInputSchema.default("student"),
  studentId: z.string().trim().optional().nullable(),
  tenantId: z.string().trim().optional().nullable(),
});

const listUsersInputSchema = z.object({
  filters: z
    .object({
      isActive: z.boolean().optional(),
      role: z.string().optional(),
      search: z.string().optional(),
    })
    .optional(),
  tenantId: z.string().nullable().optional(),
});

const updateUserInputSchema = z.object({
  userData: z.record(z.string(), z.any()),
  userId: z.string().min(1),
});

const userIdInputSchema = z.string().min(1);

const subscribeToTenantInputSchema = z.object({
  plan: z.enum(["monthly", "yearly"]),
  tenantId: z.string().min(1),
  userId: z.string().min(1),
});

export const createUserFn = createServerFn({ method: "POST" })
  .inputValidator(createUserInputSchema)
  .handler(async ({ data }) => {
    return api.post<StoredUser>("/api/users", data);
  });

export const getUserFn = createServerFn({ method: "GET" })
  .inputValidator((userId: undefined | string) => userId)
  .handler(async ({ data }) => {
    if (!data) return null;
    return api.get<StoredUser | null>(`/api/users/${data}`);
  });

export const listUsersFn = createServerFn({ method: "GET" })
  .inputValidator(listUsersInputSchema)
  .handler(async ({ data }) => {
    const params = new URLSearchParams();
    if (data.tenantId) params.set("tenantId", data.tenantId);
    if (data.filters?.isActive !== undefined)
      params.set("isActive", String(data.filters.isActive));
    if (data.filters?.role) params.set("role", data.filters.role);
    if (data.filters?.search) params.set("search", data.filters.search);
    return api.get<StoredUser[]>(`/api/users?${params}`);
  });

export const updateUserFn = createServerFn({ method: "POST" })
  .inputValidator(updateUserInputSchema)
  .handler(async ({ data }) => {
    return api.patch<ApiIdResponse>(`/api/users/${data.userId}`, data.userData);
  });

export const deactivateUserFn = createServerFn({ method: "POST" })
  .inputValidator(userIdInputSchema)
  .handler(async ({ data }) => {
    return api.post<ApiIdResponse>(`/api/users/${data}/deactivate`, {});
  });

export const deleteUserFn = createServerFn({ method: "POST" })
  .inputValidator(userIdInputSchema)
  .handler(async ({ data }) => {
    return api.delete<DeleteUserResponse>(`/api/users/${data}`);
  });

export const subscribeToTenantFn = createServerFn({ method: "POST" })
  .inputValidator(subscribeToTenantInputSchema)
  .handler(async ({ data }) => {
    return api.post<ApiIdResponse>("/api/users/subscribe", data);
  });
