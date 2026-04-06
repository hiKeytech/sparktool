import { Router } from "express";
import { tenantRepository } from "../repositories/tenant-repository.js";

import {
  assertAdminAccess,
  getActorFromSession,
  httpError,
} from "../lib/request-helpers.js";
import { requireSession } from "../middleware/session.js";

export const tenantsRouter = Router();

function requireSuperAdmin(
  actor: Awaited<ReturnType<typeof getActorFromSession>>,
) {
  if (!actor || actor.role !== "super-admin") {
    throw httpError(403, "Only platform administrators can manage tenants.");
  }
  return actor;
}

/** GET /api/tenants/by-host  (already in server.ts — no-op here, kept for completeness) */

/** GET /api/tenants */
tenantsRouter.get("/", requireSession, async (request, response) => {
  const actor = await getActorFromSession(request);
  requireSuperAdmin(actor);
  response.json(await tenantRepository.list());
});

/** POST /api/tenants */
tenantsRouter.post("/", requireSession, async (request, response) => {
  const actor = await getActorFromSession(request);
  requireSuperAdmin(actor);

  const tenant = request.body;
  const [existingById, existingByDomain] = await Promise.all([
    tenantRepository.getById(tenant.id),
    tenantRepository.getByDomain(tenant.domain),
  ]);

  if (existingById)
    throw httpError(409, "A tenant with this ID already exists.");
  if (existingByDomain)
    throw httpError(409, "A tenant with this domain already exists.");

  const created = await tenantRepository.create(tenant);
  if (!created) throw httpError(500, "Failed to create tenant.");

  response.status(201).json(created);
});

/** PATCH /api/tenants/:tenantId */
tenantsRouter.patch("/:tenantId", requireSession, async (request, response) => {
  const actor = await getActorFromSession(request);
  requireSuperAdmin(actor);

  const existing = await tenantRepository.getById(request.params.tenantId);
  if (!existing) throw httpError(404, "Tenant not found.");

  const nextTenant = request.body;

  if (nextTenant.domain && nextTenant.domain !== existing.domain) {
    const duplicate = await tenantRepository.getByDomain(nextTenant.domain);
    if (duplicate && duplicate.id !== existing.id) {
      throw httpError(409, "Another tenant already uses this domain.");
    }
  }

  const updated = await tenantRepository.update(
    request.params.tenantId,
    nextTenant,
  );
  if (!updated) throw httpError(500, "Failed to update tenant.");

  response.json(updated);
});
