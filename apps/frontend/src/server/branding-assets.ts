import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { api } from "@/lib/api-client";

export const BRANDING_IMAGE_ACCEPT =
  "image/png,image/jpeg,image/webp,image/svg+xml";

const signBrandingAssetUploadInputSchema = z.object({
  scope: z.enum(["platform", "tenant"]),
  tenantId: z.string().trim().min(1).optional(),
});

const MAX_BRANDING_IMAGE_BYTES = 5 * 1024 * 1024;

const uploadBrandingAssetSignatureSchema = z.object({
  allowedFormats: z.array(z.string().min(1)).min(1),
  apiKey: z.string().min(1),
  cloudName: z.string().min(1),
  folder: z.string().min(1),
  publicId: z.string().min(1),
  signature: z.string().min(1),
  timestamp: z.number().int().positive(),
});

export const uploadBrandingAssetResponseSchema = z.object({
  bytes: z.number().int().nonnegative(),
  publicId: z.string().min(1),
  resourceType: z.literal("image"),
  url: z.string().url(),
});

export type BrandingAssetUploadInput = {
  file: File;
  scope: "platform" | "tenant";
  tenantId?: string;
};

const cloudinaryUploadResultSchema = z.object({
  bytes: z.number().int().nonnegative(),
  public_id: z.string().min(1),
  resource_type: z.string().min(1),
  secure_url: z.string().url(),
});

export type BrandingAssetUploadResponse = z.infer<
  typeof uploadBrandingAssetResponseSchema
>;

export const requestBrandingAssetUploadSignatureFn = createServerFn({
  method: "POST",
})
  .inputValidator(signBrandingAssetUploadInputSchema)
  .handler(async ({ data }) => {
    return api.post<z.infer<typeof uploadBrandingAssetSignatureSchema>>(
      "/api/branding-assets/signature",
      data,
    );
  });

function assertBrandingFile(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Please choose an image file.");
  }

  if (file.size > MAX_BRANDING_IMAGE_BYTES) {
    throw new Error("Please choose an image smaller than 5MB.");
  }
}

export async function uploadBrandingAsset(
  input: BrandingAssetUploadInput,
): Promise<BrandingAssetUploadResponse> {
  assertBrandingFile(input.file);

  const signed = await requestBrandingAssetUploadSignatureFn({
    data: {
      scope: input.scope,
      tenantId: input.tenantId,
    },
  });

  const formData = new FormData();
  formData.set("allowed_formats", signed.allowedFormats.join(","));
  formData.set("api_key", signed.apiKey);
  formData.set("file", input.file);
  formData.set("folder", signed.folder);
  formData.set("public_id", signed.publicId);
  formData.set("signature", signed.signature);
  formData.set("timestamp", String(signed.timestamp));

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${signed.cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    },
  );

  const payload = (await response.json().catch(() => null)) as unknown;

  if (!response.ok) {
    const errorPayload = payload as { error?: { message?: string } } | null;
    throw new Error(
      errorPayload?.error?.message ?? "Upload failed. Please try again.",
    );
  }

  const cloudinaryResult = cloudinaryUploadResultSchema.safeParse(payload);

  if (!cloudinaryResult.success) {
    throw new Error("Cloudinary returned an unexpected response.");
  }

  const parsed = uploadBrandingAssetResponseSchema.safeParse({
    bytes: cloudinaryResult.data.bytes,
    publicId: cloudinaryResult.data.public_id,
    resourceType: cloudinaryResult.data.resource_type,
    url: cloudinaryResult.data.secure_url,
  });

  if (!parsed.success) {
    throw new Error(
      `Unsupported file type: only image uploads are allowed for branding.`,
    );
  }

  return parsed.data;
}
