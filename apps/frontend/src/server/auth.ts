import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  adminInvitationPreviewSchema,
  redeemAdminInvitationInputSchema,
} from "sparktool-contracts/invitation";

import {
  api,
  type ApiIdResponse,
  type ApiSuccessResponse,
} from "@/lib/api-client";
import type { User } from "@/schemas/user";
import { resolveTenantFromCurrentRequest } from "@/server/tenant-context";

import { sessionDataSchema, useAppSession } from "./session";

type StoredUser = User & { id: string };
type PasswordAuthResponse = {
  userData: StoredUser & { activeTenantId?: string };
};
type AdminInvitationPreview = z.infer<typeof adminInvitationPreviewSchema>;
type ResetPasswordResponse = ApiSuccessResponse & { userId: string };

const setSessionDataSchema = sessionDataSchema.extend({
  uid: z.string().min(1),
});

const userLookupSchema = z.string().min(1).nullable();

const invitationLookupSchema = z.object({
  tenantId: z.string().min(1, "Tenant ID is required"),
  token: z.string().min(1, "Invitation token is required"),
});

const passwordAuthSchema = z.object({
  allowSignup: z.boolean().default(false),
  displayName: z.string().trim().min(2).optional(),
  email: z.email(),
  mode: z.enum(["sign-in", "sign-up"]).default("sign-in"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  restrictedDomains: z.array(z.string()).optional(),
  tenantId: z.string().min(1).optional(),
});

const changePasswordSchema = z
  .object({
    confirmPassword: z.string(),
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters long"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const resetUserPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, "Temporary password must be at least 8 characters long"),
  userId: z.string().min(1),
});

export const setUserSessionFn = createServerFn({ method: "POST" })
  .inputValidator(setSessionDataSchema)
  .handler(async ({ data }) => {
    const session = await useAppSession();
    await session.update(data);
    return { success: true };
  });

export const clearUserSessionFn = createServerFn({ method: "POST" }).handler(
  async () => {
    const session = await useAppSession();
    await session.clear();
    return { success: true };
  },
);

export const getSessionDataFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const session = await useAppSession();

    if (!session.data.uid) {
      return null;
    }

    return sessionDataSchema.parse(session.data);
  },
);

export const getCurrentUserFn = createServerFn({ method: "GET" }).handler(
  async () => {
    return api.get<StoredUser | null>("/api/auth/me");
  },
);

export const getUserByIdFn = createServerFn({ method: "GET" })
  .inputValidator(userLookupSchema)
  .handler(async ({ data: userId }) => {
    return api.get<StoredUser | null>(`/api/auth/user/${userId}`);
  });

export const signInWithPasswordFn = createServerFn({ method: "POST" })
  .inputValidator(passwordAuthSchema)
  .handler(async ({ data }) => {
    const resolvedTenant = !data.tenantId
      ? await resolveTenantFromCurrentRequest()
      : null;

    const result = await api.post<PasswordAuthResponse>("/api/auth/sign-in", {
      ...data,
      tenantId: data.tenantId ?? resolvedTenant?.id,
    });

    const session = await useAppSession();
    const user = result.userData;

    await session.update({
      activeTenantId: data.tenantId ?? resolvedTenant?.id,
      email: user.email,
      role: user.role,
      tenantIds: user.tenantIds ?? [],
      uid: user.id,
    });

    return result;
  });

export const signOutUserFn = createServerFn({ method: "POST" }).handler(
  async () => {
    const session = await useAppSession();
    await session.clear();
    return { success: true };
  },
);

export const getAdminInvitationPreviewFn = createServerFn({ method: "GET" })
  .inputValidator(invitationLookupSchema)
  .handler(async ({ data }) => {
    const preview = await api.get<AdminInvitationPreview>(
      `/api/auth/invitations/${encodeURIComponent(data.token)}`,
    );

    if (preview.tenantId !== data.tenantId) {
      throw new Error("This invitation does not belong to the current tenant.");
    }

    return preview;
  });

export const redeemAdminInvitationFn = createServerFn({ method: "POST" })
  .inputValidator(redeemAdminInvitationInputSchema)
  .handler(async ({ data }) => {
    const result = await api.post<PasswordAuthResponse>(
      "/api/auth/redeem-invite",
      data,
    );

    const session = await useAppSession();
    const user = result.userData;

    await session.update({
      activeTenantId: data.tenantId,
      email: user.email,
      role: user.role,
      tenantIds: user.tenantIds ?? [],
      uid: user.id,
    });

    return result;
  });

export const updateUserProfileFn = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      updates: z.record(z.string(), z.any()),
      userId: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    return api.patch<ApiIdResponse>(`/api/users/${data.userId}`, data.updates);
  });

export const changePasswordFn = createServerFn({ method: "POST" })
  .inputValidator(changePasswordSchema)
  .handler(async ({ data }) => {
    return api.post<ApiSuccessResponse>("/api/auth/change-password", data);
  });

export const resetUserPasswordFn = createServerFn({ method: "POST" })
  .inputValidator(resetUserPasswordSchema)
  .handler(async ({ data }) => {
    return api.post<ResetPasswordResponse>("/api/auth/reset-password", data);
  });
