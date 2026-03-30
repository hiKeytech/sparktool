import type { LogEntry } from "@/types/log";
import type { NullableExcept } from "@/types/nullish";
import type { Collection, DocumentReference } from "@/types/collection";
import type { WithId } from "@/types/with-id";

export type Certificate = NullableExcept<
  {
    completionDate: number;
    courseId: string;
    courseName: string;
    downloadCount: number;
    instructorName: string;
    issued: LogEntry;
    modified: LogEntry;
    status: CertificateStatus;
    studentId: string;
    studentName: string;
    tenantId: string;
  },
  "courseId" | "studentId" | "tenantId"
>;

export type CertificateCollection = Collection<Certificate>;

export type CertificateData = WithId<Certificate>;

export type CertificateDocumentReference = DocumentReference<Certificate>;

export type CertificateStatus = "issued" | "pending" | "revoked";

export interface CreateCertificateVariables {
  data: Certificate;
  userId: string;
}

export interface UpdateCertificateVariables {
  certificateId: string;
  updates: Pick<Certificate, "downloadCount" | "status">;
  userId: string;
}

export const certificates = {
  create: async (variables: CreateCertificateVariables) => {
    const { createCertificateFn } = await import("@/server/certificates");
    return createCertificateFn({
      data: {
        data: {
          ...variables.data,
          status: variables.data.status ?? "issued",
          issued: variables.data.issued ?? {
            at: null,
            by: null,
            name: null,
            photoUrl: null,
          },
          modified: variables.data.modified ?? {
            at: null,
            by: null,
            name: null,
            photoUrl: null,
          },
        },
        userId: variables.userId,
      },
    });
  },
  find: async (certificateId?: string) => {
    const { findCertificateFn } = await import("@/server/certificates");
    return findCertificateFn({ data: certificateId });
  },
  get: async (studentId?: string, tenantId?: string) => {
    if (!studentId) return [];
    if (!tenantId)
      throw new Error("tenantId is required to get student certificates.");

    const { getStudentCertificatesFn } = await import("@/server/certificates");
    return getStudentCertificatesFn({
      data: {
        studentId,
        tenantId,
      },
    });
  },
  list: async (tenantId?: string) => {
    const { listCertificatesFn } = await import("@/server/certificates");
    return listCertificatesFn({ data: tenantId });
  },
  update: async (variables: UpdateCertificateVariables) => {
    const { updateCertificateFn } = await import("@/server/certificates");
    return updateCertificateFn({
      data: {
        certificateId: variables.certificateId,
        updates: {
          downloadCount: variables.updates.downloadCount ?? 0,
          status: variables.updates.status ?? "issued",
        },
        userId: variables.userId,
      },
    });
  },
};
