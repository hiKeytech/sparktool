import type { LogEntry, NullableExcept } from "./common";

export type CertificateStatus = "issued" | "pending" | "revoked";

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

export type CertificateData = Certificate & { id: string };

export interface CreateCertificateVariables {
  data: Certificate;
  userId: string;
}

export interface UpdateCertificateVariables {
  certificateId: string;
  updates: Pick<Certificate, "downloadCount" | "status">;
  userId: string;
}
