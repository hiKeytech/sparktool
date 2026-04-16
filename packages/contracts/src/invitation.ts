import { z } from "zod";

export const adminInvitationRoleSchema = z.enum(["admin"]);

export const adminInvitationStatusSchema = z.enum([
  "pending",
  "redeemed",
  "revoked",
  "expired",
]);

export const createTenantAdminInvitationInputSchema = z.object({
  displayName: z.string().trim().min(2).optional().nullable(),
  email: z.email(),
});

export const redeemAdminInvitationInputSchema = z.object({
  department: z.string().trim().optional().nullable(),
  displayName: z.string().trim().min(2, "Display name is required"),
  location: z.string().trim().optional().nullable(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  tenantId: z.string().trim().min(1, "Tenant ID is required"),
  token: z.string().trim().min(1, "Invitation token is required"),
});

export const adminInvitationSchema = z.object({
  createdAt: z.number(),
  displayName: z.string().trim().min(2).nullable().optional(),
  email: z.email(),
  expiresAt: z.number(),
  invitedByUserId: z.string().trim().min(1),
  redeemedAt: z.number().nullable().optional(),
  redeemedUserId: z.string().trim().min(1).nullable().optional(),
  revokedAt: z.number().nullable().optional(),
  role: adminInvitationRoleSchema,
  status: adminInvitationStatusSchema,
  tenantId: z.string().trim().min(1),
  tokenHash: z.string().trim().min(1),
  uid: z.string().trim().min(1),
  updatedAt: z.number(),
});

export const adminInvitationPreviewSchema = z.object({
  displayName: z.string().trim().min(2).nullable().optional(),
  email: z.email(),
  expiresAt: z.number(),
  role: adminInvitationRoleSchema,
  status: adminInvitationStatusSchema,
  tenantId: z.string().trim().min(1),
});

export const adminInvitationSummarySchema = adminInvitationPreviewSchema.extend(
  {
    createdAt: z.number(),
    id: z.string().trim().min(1),
    redeemedAt: z.number().nullable().optional(),
    revokedAt: z.number().nullable().optional(),
  },
);

export type AdminInvitation = z.infer<typeof adminInvitationSchema>;
export type AdminInvitationPreview = z.infer<
  typeof adminInvitationPreviewSchema
>;
export type AdminInvitationSummary = z.infer<
  typeof adminInvitationSummarySchema
>;
export type AdminInvitationRole = z.infer<typeof adminInvitationRoleSchema>;
export type AdminInvitationStatus = z.infer<typeof adminInvitationStatusSchema>;
export type CreateTenantAdminInvitationInput = z.infer<
  typeof createTenantAdminInvitationInputSchema
>;
export type RedeemAdminInvitationInput = z.infer<
  typeof redeemAdminInvitationInputSchema
>;
