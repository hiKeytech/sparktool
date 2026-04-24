import { c as createSsrRpc } from "./course-structure-D2f1-VM0.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/react.mjs";
import { o as object, s as string, _ as _enum, n as number } from "../_libs/zod.mjs";
import "node:async_hooks";
import "node:stream";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "node:stream/web";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const logEntrySchema = object({
  at: number().nullable(),
  by: string().nullable(),
  name: string().nullable(),
  photoUrl: string().nullable()
});
const certificateSchema = object({
  completionDate: number().nullable(),
  courseId: string(),
  courseName: string().nullable(),
  downloadCount: number().nullable(),
  instructorName: string().nullable(),
  issued: logEntrySchema.nullable().optional(),
  modified: logEntrySchema.nullable().optional(),
  status: _enum(["issued", "pending", "revoked"]),
  studentId: string(),
  studentName: string().nullable(),
  tenantId: string()
});
const createCertificateInputSchema = object({
  data: certificateSchema,
  userId: string().min(1)
});
const updateCertificateInputSchema = object({
  certificateId: string().min(1),
  updates: object({
    downloadCount: number().nullable(),
    status: _enum(["issued", "pending", "revoked"])
  }),
  userId: string().min(1)
});
const createCertificateFn = createServerFn({
  method: "POST"
}).inputValidator(createCertificateInputSchema).handler(createSsrRpc("19696e3668222a3b9f482a17d23d10c0c487542e0f5bc6cf1233aec35e84a466"));
const findCertificateFn = createServerFn({
  method: "GET"
}).inputValidator(object({
  certificateId: string().min(1)
})).handler(createSsrRpc("637e4e49c7f038c09bd50665bafac35a0f34d1f0a3f77b6eb50721155632b485"));
const getStudentCertificatesFn = createServerFn({
  method: "GET"
}).inputValidator(object({
  studentId: string().min(1),
  tenantId: string().min(1)
})).handler(createSsrRpc("f41538d0e35a438248aaf175a8eef0613071ddf3feb1986c7fdb8bb9520dae4d"));
const listCertificatesFn = createServerFn({
  method: "GET"
}).inputValidator(object({
  tenantId: string().min(1)
})).handler(createSsrRpc("0b350da25d7049e143cc08a154bf8ea541480fbfdc34c1e827d94db8d4ccc356"));
const updateCertificateFn = createServerFn({
  method: "POST"
}).inputValidator(updateCertificateInputSchema).handler(createSsrRpc("bac1e0d62e9a172639ee263859795df9f64249ba3264f6e6f4f46ca5b3313a8c"));
export {
  createCertificateFn,
  findCertificateFn,
  getStudentCertificatesFn,
  listCertificatesFn,
  updateCertificateFn
};
