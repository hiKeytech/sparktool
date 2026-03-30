import { randomUUID } from "node:crypto";
import { unlink } from "node:fs/promises";
import path from "node:path";

import { createServerFn } from "@tanstack/react-start";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";

import { lessonResourceSchema } from "@/schemas/course-lesson";
import { serverEnv } from "@/server/env";
import { courseLessonRepository } from "@/server/repositories/course-lesson-repository";

const lessonResourceDataSchema = lessonResourceSchema
  .omit({
    createdAt: true,
    id: true,
    storageKey: true,
    storageProvider: true,
    storageResourceType: true,
    updatedAt: true,
  })
  .passthrough();

const serializedFileSchema = z.object({
  dataUrl: z.string().min(1),
  name: z.string().min(1),
  size: z.number().nonnegative(),
  type: z.string().min(1),
});

const createLessonResourceInputSchema = z.object({
  file: serializedFileSchema.optional(),
  resourceData: lessonResourceDataSchema,
});

const deleteLessonResourceInputSchema = z.object({
  resourceId: z.string().min(1),
});

const updateLessonResourceInputSchema = z.object({
  file: serializedFileSchema.optional(),
  resourceData: lessonResourceDataSchema.partial().passthrough(),
  resourceId: z.string().min(1),
});

const resourceIdInputSchema = z.string().min(1);
const lessonIdInputSchema = z.string().min(1);

type ManagedResourceAsset = Pick<
  z.infer<typeof lessonResourceSchema>,
  "fileSize" | "storageKey" | "storageProvider" | "storageResourceType" | "url"
>;

let cloudinaryConfigured = false;

function hasCloudinaryConfig() {
  return Boolean(
    serverEnv.CLOUDINARY_CLOUD_NAME?.trim() &&
    serverEnv.CLOUDINARY_API_KEY?.trim() &&
    serverEnv.CLOUDINARY_API_SECRET?.trim(),
  );
}

function assertCloudinaryConfig() {
  if (hasCloudinaryConfig()) {
    return;
  }

  throw new Error(
    "Cloudinary configuration is required for lesson resource uploads.",
  );
}

function configureCloudinary() {
  assertCloudinaryConfig();

  if (cloudinaryConfigured) {
    return;
  }

  cloudinary.config({
    api_key: serverEnv.CLOUDINARY_API_KEY,
    api_secret: serverEnv.CLOUDINARY_API_SECRET,
    cloud_name: serverEnv.CLOUDINARY_CLOUD_NAME,
    secure: true,
  });
  cloudinaryConfigured = true;
}

function getManagedPublicFilePath(resourceUrl: null | string | undefined) {
  if (!resourceUrl || !resourceUrl.startsWith("/lesson-resources/")) {
    return null;
  }

  return path.join(process.cwd(), "public", resourceUrl.replace(/^\//, ""));
}

async function deleteManagedFile(resourceUrl: null | string | undefined) {
  const filePath = getManagedPublicFilePath(resourceUrl);

  if (!filePath) {
    return;
  }

  try {
    await unlink(filePath);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }
}

async function deleteStoredAsset(
  resource: Partial<z.infer<typeof lessonResourceSchema>>,
) {
  if (resource.storageProvider === "cloudinary" && resource.storageKey) {
    if (!hasCloudinaryConfig()) {
      return;
    }

    configureCloudinary();
    await cloudinary.uploader.destroy(resource.storageKey, {
      invalidate: true,
      resource_type: resource.storageResourceType || "image",
    });
    return;
  }

  await deleteManagedFile(resource.url);
}

async function uploadCloudinaryFile(
  lessonId: string,
  file: z.infer<typeof serializedFileSchema>,
): Promise<ManagedResourceAsset> {
  configureCloudinary();

  const uploadResult = await cloudinary.uploader.upload(file.dataUrl, {
    folder: `lesson-resources/${lessonId}`,
    public_id: `${Date.now()}-${randomUUID()}`,
    resource_type: "auto",
  });

  return {
    fileSize: uploadResult.bytes,
    storageKey: uploadResult.public_id,
    storageProvider: "cloudinary",
    storageResourceType: uploadResult.resource_type as
      | "image"
      | "raw"
      | "video",
    url: uploadResult.secure_url,
  };
}

async function storeResourceFile(
  lessonId: string,
  file: z.infer<typeof serializedFileSchema>,
): Promise<ManagedResourceAsset> {
  return uploadCloudinaryFile(lessonId, file);
}

function clearStorageMetadata() {
  return {
    storageKey: undefined,
    storageProvider: undefined,
    storageResourceType: undefined,
  };
}

async function getLessonOrThrow(lessonId: string) {
  const lesson = await courseLessonRepository.getById(lessonId);

  if (!lesson) {
    throw new Error("Lesson not found.");
  }

  return lesson;
}

async function getLessonResourceOrThrow(resourceId: string) {
  const lesson = await courseLessonRepository.findByResourceId(resourceId);

  if (!lesson) {
    throw new Error("Resource not found.");
  }

  const resource = lesson.resources.find((entry) => entry.id === resourceId);

  if (!resource) {
    throw new Error("Resource not found.");
  }

  return { lesson, resource };
}

export const createLessonResourceFn = createServerFn({ method: "POST" })
  .inputValidator(createLessonResourceInputSchema)
  .handler(async ({ data }) => {
    const lesson = await getLessonOrThrow(data.resourceData.lessonId);
    let nextUrl = data.resourceData.url;
    let nextFileSize = data.resourceData.fileSize;
    let nextStorageKey: string | undefined;
    let nextStorageProvider: "cloudinary" | "local" | undefined;
    let nextStorageResourceType: "image" | "raw" | "video" | undefined;

    if (data.file) {
      const uploadedFile = await storeResourceFile(lesson.id, data.file);
      nextUrl = uploadedFile.url;
      nextFileSize = uploadedFile.fileSize;
      nextStorageKey = uploadedFile.storageKey;
      nextStorageProvider = uploadedFile.storageProvider;
      nextStorageResourceType = uploadedFile.storageResourceType;
    }

    if (data.resourceData.type !== "link" && !nextUrl) {
      throw new Error(
        "A file upload or URL is required for this resource type.",
      );
    }

    const resource = lessonResourceSchema.parse({
      ...data.resourceData,
      createdAt: Date.now(),
      fileSize: nextFileSize,
      id: randomUUID(),
      storageKey: nextStorageKey,
      storageProvider: nextStorageProvider,
      storageResourceType: nextStorageResourceType,
      updatedAt: Date.now(),
      url: nextUrl,
    });

    await courseLessonRepository.update(lesson.id, {
      resources: [...lesson.resources, resource],
    });

    return resource.id;
  });

export const deleteLessonResourceFn = createServerFn({ method: "POST" })
  .inputValidator(deleteLessonResourceInputSchema)
  .handler(async ({ data }) => {
    const { lesson, resource } = await getLessonResourceOrThrow(
      data.resourceId,
    );

    await deleteStoredAsset(resource);

    await courseLessonRepository.update(lesson.id, {
      resources: lesson.resources.filter(
        (entry) => entry.id !== data.resourceId,
      ),
    });

    return { success: true };
  });

export const getLessonResourceFn = createServerFn({ method: "GET" })
  .inputValidator(resourceIdInputSchema)
  .handler(async ({ data }) => {
    const { resource } = await getLessonResourceOrThrow(data);
    return resource;
  });

export const listLessonResourcesFn = createServerFn({ method: "GET" })
  .inputValidator(lessonIdInputSchema)
  .handler(async ({ data }) => {
    const lesson = await getLessonOrThrow(data);

    return [...lesson.resources].sort(
      (left, right) =>
        left.order - right.order || left.createdAt - right.createdAt,
    );
  });

export const updateLessonResourceFn = createServerFn({ method: "POST" })
  .inputValidator(updateLessonResourceInputSchema)
  .handler(async ({ data }) => {
    const { lesson, resource } = await getLessonResourceOrThrow(
      data.resourceId,
    );
    let nextUrl = data.resourceData.url ?? resource.url;
    let nextFileSize = data.resourceData.fileSize ?? resource.fileSize;
    let nextStorageKey = resource.storageKey;
    let nextStorageProvider = resource.storageProvider;
    let nextStorageResourceType = resource.storageResourceType;

    if (data.file) {
      const uploadedFile = await storeResourceFile(lesson.id, data.file);
      await deleteStoredAsset(resource);
      nextUrl = uploadedFile.url;
      nextFileSize = uploadedFile.fileSize;
      nextStorageKey = uploadedFile.storageKey;
      nextStorageProvider = uploadedFile.storageProvider;
      nextStorageResourceType = uploadedFile.storageResourceType;
    } else if (data.resourceData.type === "link" && nextUrl !== resource.url) {
      await deleteStoredAsset(resource);
      ({
        storageKey: nextStorageKey,
        storageProvider: nextStorageProvider,
        storageResourceType: nextStorageResourceType,
      } = clearStorageMetadata());
    }

    const updatedResource = lessonResourceSchema.parse({
      ...resource,
      ...data.resourceData,
      fileSize: nextFileSize,
      id: resource.id,
      storageKey: nextStorageKey,
      storageProvider: nextStorageProvider,
      storageResourceType: nextStorageResourceType,
      updatedAt: Date.now(),
      url: nextUrl,
    });

    await courseLessonRepository.update(lesson.id, {
      resources: lesson.resources.map((entry) =>
        entry.id === resource.id ? updatedResource : entry,
      ),
    });

    return updatedResource.id;
  });
