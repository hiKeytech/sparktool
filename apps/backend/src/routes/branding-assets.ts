import { randomUUID } from "node:crypto";
import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";

import {
  assertAdminAccess,
  getActorFromSession,
  userHasTenantAccess,
} from "../lib/request-helpers.js";
import { requireSession } from "../middleware/session.js";

export const brandingAssetsRouter = Router();

const BRANDING_ALLOWED_FORMATS = ["png", "jpg", "jpeg", "webp", "svg"];

const signBrandingAssetUploadInputSchema = z.object({
  scope: z.enum(["platform", "tenant"]),
  tenantId: z.string().trim().min(1).optional(),
});

function getCloudinaryCredentials() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
  const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
  const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

  if (!cloudName || !apiKey || !apiSecret) {
    throw Object.assign(
      new Error("Cloudinary configuration is required for branding uploads."),
      { status: 500 },
    );
  }

  return {
    apiKey,
    apiSecret,
    cloudName,
  };
}

function resolveUploadFolder(
  input: z.infer<typeof signBrandingAssetUploadInputSchema>,
) {
  if (input.scope === "platform") {
    return "branding-assets/platform";
  }

  if (!input.tenantId) {
    throw Object.assign(
      new Error("A tenant ID is required for tenant uploads."),
      { status: 400 },
    );
  }

  return `branding-assets/tenants/${input.tenantId}`;
}

brandingAssetsRouter.post(
  "/signature",
  requireSession,
  async (request, response) => {
    try {
      const actor = await getActorFromSession(request);
      assertAdminAccess(
        actor,
        "Only administrators can upload branding assets.",
      );

      const parsed = signBrandingAssetUploadInputSchema.safeParse(request.body);

      if (!parsed.success) {
        response.status(400).json({
          message: "Invalid branding upload request.",
        });
        return;
      }

      const input = parsed.data;
      const resolvedTenantId = input.tenantId ?? request.session.activeTenantId;

      if (input.scope === "platform" && actor.role !== "super-admin") {
        response.status(403).json({
          message:
            "Only platform administrators can upload platform branding assets.",
        });
        return;
      }

      if (
        input.scope === "tenant" &&
        !userHasTenantAccess(actor, resolvedTenantId)
      ) {
        response.status(403).json({
          message:
            "You do not have permission to upload assets for this tenant.",
        });
        return;
      }

      const { apiKey, apiSecret, cloudName } = getCloudinaryCredentials();
      const folder = resolveUploadFolder({
        ...input,
        tenantId: resolvedTenantId,
      });
      const publicId = `${Date.now()}-${randomUUID()}`;
      const timestamp = Math.floor(Date.now() / 1000);
      const signature = cloudinary.utils.api_sign_request(
        {
          allowed_formats: BRANDING_ALLOWED_FORMATS.join(","),
          folder,
          public_id: publicId,
          timestamp,
        },
        apiSecret,
      );

      response.json({
        allowedFormats: BRANDING_ALLOWED_FORMATS,
        apiKey,
        cloudName,
        folder,
        publicId,
        signature,
        timestamp,
      });
    } catch (error) {
      const status =
        error instanceof Error &&
        "status" in error &&
        typeof error.status === "number"
          ? error.status
          : 500;

      response.status(status).json({
        message:
          error instanceof Error
            ? error.message
            : "Failed to prepare branding upload.",
      });
    }
  },
);
