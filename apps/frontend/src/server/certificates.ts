import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { api, type ApiIdResponse } from "@/lib/api-client";
import type { CertificateData } from "@/types";

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
    return api.post<ApiIdResponse>("/api/certificates", data);
  });

export const findCertificateFn = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      certificateId: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    return api.get<CertificateData | null>(
      `/api/certificates/${data.certificateId}`,
    );
  });

export const getStudentCertificatesFn = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      studentId: z.string().min(1),
      tenantId: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    const params = new URLSearchParams({
      studentId: data.studentId,
      tenantId: data.tenantId,
    });
    return api.get<CertificateData[]>(`/api/certificates/student?${params}`);
  });

export const listCertificatesFn = createServerFn({ method: "GET" })
  .inputValidator(
    z.object({
      tenantId: z.string().min(1),
    }),
  )
  .handler(async ({ data }) => {
    return api.get<CertificateData[]>(
      `/api/certificates?tenantId=${data.tenantId}`,
    );
  });

export const updateCertificateFn = createServerFn({ method: "POST" })
  .inputValidator(updateCertificateInputSchema)
  .handler(async ({ data }) => {
    return api.patch<ApiIdResponse>(
      `/api/certificates/${data.certificateId}`,
      data.updates,
    );
  });
