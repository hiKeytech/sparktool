import { Router } from "express";

import { activityLogRepository } from "../repositories/activity-log-repository.js";
import { certificateRepository } from "../repositories/certificate-repository.js";
import { userRepository } from "../repositories/user-repository.js";
import {
  assertAdminAccess,
  getActorFromSession,
  httpError,
  userHasTenantAccess,
} from "../lib/request-helpers.js";
import { requireSession, requireTenantSession } from "../middleware/session.js";

export const certificatesRouter = Router();

/** GET /api/certificates */
certificatesRouter.get("/", requireTenantSession, async (request, response) => {
  const actor = await getActorFromSession(request);
  assertAdminAccess(actor);
  const { tenantId: queryTenantId } = request.query as Record<string, string>;
  const tenantId = queryTenantId ?? request.session.activeTenantId!;
  response.json(await certificateRepository.list({ tenantId }));
});

/** GET /api/certificates/student */
certificatesRouter.get(
  "/student",
  requireSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    if (!actor) throw httpError(401, "Unauthorized");
    const { studentId, tenantId: queryTenantId } = request.query as Record<
      string,
      string
    >;
    const targetId = studentId ?? actor.id;

    if (
      actor.id !== targetId &&
      actor.role !== "admin" &&
      actor.role !== "super-admin"
    ) {
      throw httpError(403, "Access denied.");
    }

    response.json(
      await certificateRepository.list({
        studentId: targetId,
        tenantId: queryTenantId,
      }),
    );
  },
);

/** POST /api/certificates */
certificatesRouter.post(
  "/",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    assertAdminAccess(actor);
    const tenantId = request.session.activeTenantId!;

    const { certificateData } = request.body;
    const student = await userRepository.getById(certificateData.studentId);
    if (!student || !userHasTenantAccess(student, tenantId)) {
      throw httpError(403, "Student does not belong to the current tenant.");
    }

    const created = await certificateRepository.create({
      ...certificateData,
      issuedAt: Date.now(),
      tenantId,
    });
    if (!created) throw httpError(500, "Failed to create certificate.");

    void activityLogRepository.create({
      action: "certificate_earned",
      courseId: certificateData.courseId,
      tenantId,
      userId: certificateData.studentId,
    });

    response.status(201).json({ id: created.id });
  },
);

/** GET /api/certificates/:certificateId */
certificatesRouter.get(
  "/:certificateId",
  requireSession,
  async (request, response) => {
    const cert = await certificateRepository.getById(
      request.params.certificateId as string,
    );
    if (!cert) return response.json(null);
    const actor = await getActorFromSession(request);
    if (!actor) throw httpError(401, "Unauthorized");

    if (
      actor.id !== cert.studentId &&
      actor.role !== "admin" &&
      actor.role !== "super-admin"
    ) {
      throw httpError(403, "Access denied.");
    }
    response.json(cert);
  },
);

/** PATCH /api/certificates/:certificateId */
certificatesRouter.patch(
  "/:certificateId",
  requireTenantSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    assertAdminAccess(actor);

    const cert = await certificateRepository.getById(
      request.params.certificateId as string,
    );
    if (!cert) throw httpError(404, "Certificate not found.");

    const tenantId = request.session.activeTenantId!;
    if (cert.tenantId !== tenantId) throw httpError(403, "Access denied.");

    const updated = await certificateRepository.update(
      request.params.certificateId as string,
      request.body,
    );
    if (!updated) throw httpError(500, "Failed to update certificate.");
    response.json({ id: updated.id });
  },
);
