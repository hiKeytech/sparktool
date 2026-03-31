import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { activityLogs } from "@/schemas/activity-log";
import type { Certificate } from "@/schemas/certificates";
import { certificateRepository } from "@/server/repositories/certificate-repository";
import { userRepository } from "@/server/repositories/user-repository";
import {
  assertTenantAdminAccess,
  requireTenantScopedActorWithTenant,
  resolveTenantFromCurrentRequest,
  userHasTenantAccess,
} from "@/server/tenant-context";

const logEntrySchema = z.object({
  at: z.number().nullable(),
  by: z.string().nullable(),
  name: z.string().nullable(),
  photoUrl: z.string().nullable(),
});

const certificateSchema = z.object({
  completionDate: z.number().nullable(),
  courseId: z.string(),
  courseName: z.string().nullable(),
  downloadCount: z.number().nullable(),
  instructorName: z.string().nullable(),
  issued: logEntrySchema.nullable().optional(),
  modified: logEntrySchema.nullable().optional(),
  status: z.enum(["issued", "pending", "revoked"]),
  studentId: z.string(),
  studentName: z.string().nullable(),
  tenantId: z.string(),
});

const createCertificateInputSchema = z.object({
  data: certificateSchema,
  userId: z.string().min(1),
});

const updateCertificateInputSchema = z.object({
  certificateId: z.string().min(1),
  updates: z.object({
    downloadCount: z.number().nullable(),
    status: z.enum(["issued", "pending", "revoked"]),
  }),
  userId: z.string().min(1),
});

export const createCertificateFn = createServerFn({ method: "POST" })
  .inputValidator(createCertificateInputSchema)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant({
      requestedTenantId: data.data.tenantId,
    });

    assertTenantAdminAccess(actor);

    if (
      !userHasTenantAccess(
        await userRepository.getById(data.data.studentId),
        tenantId,
      )
    ) {
      throw new Error("Student does not belong to the current tenant.");
    }

    const createdCertificate = await certificateRepository.create({
      ...data.data,
      issued: {
        at: Date.now(),
        by: actor.id,
        name: actor?.displayName ?? data.data.issued?.name ?? null,
        photoUrl: actor?.photoURL ?? data.data.issued?.photoUrl ?? null,
      },
      modified: {
        at: Date.now(),
        by: actor.id,
        name: actor?.displayName ?? data.data.modified?.name ?? null,
        photoUrl: actor?.photoURL ?? data.data.modified?.photoUrl ?? null,
      },
      tenantId: tenantId!,
    } satisfies Certificate);

    if (!createdCertificate) {
      throw new Error("Failed to create certificate.");
    }

    await activityLogs.create({
      action: "certificate_earned",
      certificateId: createdCertificate.id,
      courseId: data.data.courseId,
      studentId: data.data.studentId,
      tenantId: tenantId!,
      userId: actor.id,
    });

    return createdCertificate.id;
  });

export const findCertificateFn = createServerFn({ method: "GET" })
  .inputValidator((certificateId: string | undefined) => certificateId)
  .handler(async ({ data }) => {
    const [tenant, certificate] = await Promise.all([
      resolveTenantFromCurrentRequest(),
      certificateRepository.getById(data),
    ]);

    if (!certificate) {
      return null;
    }

    if (tenant && certificate.tenantId !== tenant.id) {
      return null;
    }

    return certificate;
  });

export const getStudentCertificatesFn = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      studentId: z.string().min(1),
      tenantId: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant({
      requestedTenantId: data.tenantId,
    });

    if (
      actor.role !== "super-admin" &&
      actor.role !== "admin" &&
      actor.id !== data.studentId
    ) {
      throw new Error("You do not have permission to view these certificates.");
    }

    return certificateRepository.list({
      studentId: data.studentId,
      tenantId: tenantId!,
    });
  });

export const listCertificatesFn = createServerFn({ method: "GET" })
  .inputValidator((tenantId: string | undefined) => tenantId)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant({
      requestedTenantId: data,
    });

    assertTenantAdminAccess(actor);

    return certificateRepository.list({ tenantId: tenantId! });
  });

export const updateCertificateFn = createServerFn({ method: "POST" })
  .inputValidator(updateCertificateInputSchema)
  .handler(async ({ data }) => {
    const { actor, tenantId } = await requireTenantScopedActorWithTenant();

    assertTenantAdminAccess(actor);

    const existingCertificate = await certificateRepository.getById(
      data.certificateId,
    );

    if (!existingCertificate) {
      throw new Error("Certificate not found.");
    }

    if (existingCertificate.tenantId !== tenantId) {
      throw new Error("Certificate does not belong to the current tenant.");
    }

    const updatedCertificate = await certificateRepository.update(
      data.certificateId,
      {
        downloadCount: data.updates.downloadCount,
        modified: {
          at: Date.now(),
          by: actor.id,
          name: actor?.displayName ?? null,
          photoUrl: actor?.photoURL ?? null,
        },
        status: data.updates.status,
      },
    );

    if (!updatedCertificate) {
      throw new Error("Failed to update certificate.");
    }

    await activityLogs.create({
      action: "certificate_modified",
      certificateId: data.certificateId,
      tenantId: updatedCertificate.tenantId,
      userId: actor.id,
    });

    return updatedCertificate.id;
  });
