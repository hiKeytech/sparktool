import { randomUUID } from "node:crypto";
import { Router } from "express";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import { lessonResourceSchema } from "sparktool-contracts";
import { courseRepository } from "../repositories/course-repository.js";
import { courseLessonRepository } from "../repositories/course-lesson-repository.js";
import { requireSession } from "../middleware/session.js";

export const lessonResourcesRouter = Router();

const serializedFileSchema = z.object({
  dataUrl: z.string().min(1),
  name: z.string().min(1),
  size: z.number().nonnegative(),
  type: z.string().min(1),
});

let cloudinaryConfigured = false;

function hasCloudinaryConfig() {
  return Boolean(
    process.env.CLOUDINARY_CLOUD_NAME?.trim() &&
    process.env.CLOUDINARY_API_KEY?.trim() &&
    process.env.CLOUDINARY_API_SECRET?.trim(),
  );
}

function configureCloudinary() {
  if (!hasCloudinaryConfig()) {
    throw new Error(
      "Cloudinary configuration is required for lesson resource uploads.",
    );
  }
  if (cloudinaryConfigured) return;
  cloudinary.config({
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    secure: true,
  });
  cloudinaryConfigured = true;
}

async function uploadToCloudinary(
  lessonId: string,
  file: z.infer<typeof serializedFileSchema>,
) {
  configureCloudinary();
  const result = await cloudinary.uploader.upload(file.dataUrl, {
    folder: `lesson-resources/${lessonId}`,
    public_id: `${Date.now()}-${randomUUID()}`,
    resource_type: "auto",
  });
  return {
    fileSize: result.bytes,
    storageKey: result.public_id,
    storageProvider: "cloudinary" as const,
    storageResourceType: result.resource_type as "image" | "raw" | "video",
    url: result.secure_url,
  };
}

async function deleteStoredAsset(
  resource: Partial<{
    storageKey: string;
    storageProvider: string;
    storageResourceType: string;
    url: string;
  }>,
) {
  if (resource.storageProvider === "cloudinary" && resource.storageKey) {
    if (!hasCloudinaryConfig()) return;
    configureCloudinary();
    await cloudinary.uploader.destroy(resource.storageKey, {
      invalidate: true,
      resource_type: resource.storageResourceType || "image",
    });
  }
}

async function getLessonOrThrow(lessonId: string) {
  const lesson = await courseLessonRepository.getById(lessonId);
  if (!lesson) throw new Error("Lesson not found.");
  return lesson;
}

async function getLessonResourceOrThrow(resourceId: string) {
  const lesson = await courseLessonRepository.findByResourceId(resourceId);
  if (!lesson) throw new Error("Resource not found.");
  const resource = lesson.resources.find((r) => r.id === resourceId);
  if (!resource) throw new Error("Resource not found.");
  return { lesson, resource };
}

async function assertLessonTenantAccess(lessonId: string, tenantId: string) {
  const lesson = await getLessonOrThrow(lessonId);
  const course = await courseRepository.getById(lesson.courseId);
  if (!course || course.tenantId !== tenantId) {
    throw new Error("Lesson does not belong to the current tenant.");
  }
  return lesson;
}

// POST / — create lesson resource
lessonResourcesRouter.post("/", requireSession, async (request, response) => {
  try {
    const { resourceData, file } = request.body;
    const tenantId = request.session.activeTenantId!;

    const lesson = await assertLessonTenantAccess(
      resourceData.lessonId,
      tenantId,
    );

    let nextUrl = resourceData.url;
    let nextFileSize = resourceData.fileSize;
    let nextStorageKey: string | undefined;
    let nextStorageProvider: "cloudinary" | "local" | undefined;
    let nextStorageResourceType: "image" | "raw" | "video" | undefined;

    if (file) {
      const uploaded = await uploadToCloudinary(lesson.id, file);
      nextUrl = uploaded.url;
      nextFileSize = uploaded.fileSize;
      nextStorageKey = uploaded.storageKey;
      nextStorageProvider = uploaded.storageProvider;
      nextStorageResourceType = uploaded.storageResourceType;
    }

    if (resourceData.type !== "link" && !nextUrl) {
      return response.status(400).json({
        message: "A file upload or URL is required for this resource type.",
      });
    }

    const resource = lessonResourceSchema.parse({
      ...resourceData,
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

    response.json(resource.id);
  } catch (error) {
    response.status(500).json({
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});

// GET /:resourceId — get lesson resource
lessonResourcesRouter.get(
  "/:resourceId",
  requireSession,
  async (request, response) => {
    try {
      const resourceId = request.params.resourceId as string;
      const { resource } = await getLessonResourceOrThrow(resourceId);
      response.json(resource);
    } catch (error) {
      response.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  },
);

// GET /lesson/:lessonId — list lesson resources
lessonResourcesRouter.get(
  "/lesson/:lessonId",
  requireSession,
  async (request, response) => {
    try {
      const lesson = await getLessonOrThrow(request.params.lessonId as string);
      const sorted = [...lesson.resources].sort(
        (a, b) => a.order - b.order || a.createdAt - b.createdAt,
      );
      response.json(sorted);
    } catch (error) {
      response.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  },
);

// PATCH /:resourceId — update lesson resource
lessonResourcesRouter.patch(
  "/:resourceId",
  requireSession,
  async (request, response) => {
    try {
      const { resourceData, file } = request.body;
      const tenantId = request.session.activeTenantId!;
      const { lesson, resource } = await getLessonResourceOrThrow(
        request.params.resourceId as string,
      );

      await assertLessonTenantAccess(lesson.id, tenantId);

      let nextUrl = resourceData.url ?? resource.url;
      let nextFileSize = resourceData.fileSize ?? resource.fileSize;
      let nextStorageKey = resource.storageKey;
      let nextStorageProvider = resource.storageProvider;
      let nextStorageResourceType = resource.storageResourceType;

      if (file) {
        const uploaded = await uploadToCloudinary(lesson.id, file);
        await deleteStoredAsset(resource);
        nextUrl = uploaded.url;
        nextFileSize = uploaded.fileSize;
        nextStorageKey = uploaded.storageKey;
        nextStorageProvider = uploaded.storageProvider;
        nextStorageResourceType = uploaded.storageResourceType;
      }

      const updatedResource = {
        ...resource,
        ...resourceData,
        fileSize: nextFileSize,
        storageKey: nextStorageKey,
        storageProvider: nextStorageProvider,
        storageResourceType: nextStorageResourceType,
        updatedAt: Date.now(),
        url: nextUrl,
      };

      await courseLessonRepository.update(lesson.id, {
        resources: lesson.resources.map((r) =>
          r.id === resource.id ? updatedResource : r,
        ),
      });

      response.json(updatedResource.id);
    } catch (error) {
      response.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  },
);

// DELETE /:resourceId — delete lesson resource
lessonResourcesRouter.delete(
  "/:resourceId",
  requireSession,
  async (request, response) => {
    try {
      const tenantId = request.session.activeTenantId!;
      const { lesson, resource } = await getLessonResourceOrThrow(
        request.params.resourceId as string,
      );

      await assertLessonTenantAccess(lesson.id, tenantId);
      await deleteStoredAsset(resource);

      await courseLessonRepository.update(lesson.id, {
        resources: lesson.resources.filter((r) => r.id !== resource.id),
      });

      response.json({ success: true });
    } catch (error) {
      response.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  },
);
