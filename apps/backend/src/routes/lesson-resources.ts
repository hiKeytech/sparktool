import { randomUUID } from "node:crypto";
import { Readable } from "node:stream";
import { Router } from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { z } from "zod";
import { lessonResourceSchema } from "sparktool-contracts/course-lesson";
import { courseRepository } from "../repositories/course-repository.js";
import { courseLessonRepository } from "../repositories/course-lesson-repository.js";
import { requireSession } from "../middleware/session.js";

export const lessonResourcesRouter = Router();

const LESSON_RESOURCE_MAX_BYTES = 25 * 1024 * 1024;

const lessonResourceUpload = multer({
  limits: {
    fileSize: LESSON_RESOURCE_MAX_BYTES,
  },
  storage: multer.memoryStorage(),
});

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

const createLessonResourceBodySchema = z.object({
  resourceData: lessonResourceDataSchema,
});

const updateLessonResourceBodySchema = z.object({
  resourceData: lessonResourceDataSchema.partial().passthrough(),
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

async function uploadToCloudinary(lessonId: string, file: Express.Multer.File) {
  configureCloudinary();
  const result = await new Promise<{
    bytes: number;
    public_id: string;
    resource_type: string;
    secure_url: string;
  }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `lesson-resources/${lessonId}`,
        public_id: `${Date.now()}-${randomUUID()}`,
        resource_type: "auto",
      },
      (error, uploadResult) => {
        if (error || !uploadResult) {
          reject(error ?? new Error("Lesson resource upload failed."));
          return;
        }

        resolve({
          bytes: uploadResult.bytes,
          public_id: uploadResult.public_id,
          resource_type: uploadResult.resource_type,
          secure_url: uploadResult.secure_url,
        });
      },
    );

    Readable.from(file.buffer).pipe(uploadStream);
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

function parseMultipartJsonField<TSchema extends z.ZodTypeAny>(input: {
  schema: TSchema;
  value: unknown;
}) {
  if (typeof input.value !== "string") {
    throw Object.assign(new Error("Resource details are required."), {
      status: 400,
    });
  }

  let parsedJson: unknown;

  try {
    parsedJson = JSON.parse(input.value);
  } catch {
    throw Object.assign(new Error("Resource details must be valid JSON."), {
      status: 400,
    });
  }

  const parsed = input.schema.safeParse(parsedJson);

  if (!parsed.success) {
    throw Object.assign(new Error("Invalid lesson resource details."), {
      status: 400,
    });
  }

  return parsed.data;
}

// POST / — create lesson resource
lessonResourcesRouter.post(
  "/",
  requireSession,
  lessonResourceUpload.single("file"),
  async (request, response) => {
    try {
      const resourceData = parseMultipartJsonField({
        schema: createLessonResourceBodySchema.shape.resourceData,
        value: request.body.resourceData,
      });
      const file = request.file;
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
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  },
);

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
  lessonResourceUpload.single("file"),
  async (request, response) => {
    try {
      const resourceData = parseMultipartJsonField({
        schema: updateLessonResourceBodySchema.shape.resourceData,
        value: request.body.resourceData,
      });
      const file = request.file;
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
