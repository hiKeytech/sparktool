import { createHash, randomBytes, randomUUID } from "node:crypto";

import { Router } from "express";
import { createTenantOnboardingInputSchema } from "sparktool-contracts/tenant-contract";

import { activityLogRepository } from "../repositories/activity-log-repository";
import { adminInvitationRepository } from "../repositories/admin-invitation-repository";
import { passwordAuthRepository } from "../repositories/password-auth-repository";
import { tenantRepository } from "../repositories/tenant-repository";
import { userRepository } from "../repositories/user-repository";

import { getActorFromSession, httpError } from "../lib/request-helpers";
import { requireSession } from "../middleware/session";

export const tenantsRouter = Router();

const TENANT_ADMIN_INVITE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function hashInvitationToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

async function createAdminInvitation(input: {
  actorId: string;
  displayName: null | string | undefined;
  email: string;
  tenantId: string;
}) {
  const now = Date.now();
  const invitationId = randomUUID();
  const invitationToken = randomBytes(32).toString("hex");
  const invitation = await adminInvitationRepository.create({
    createdAt: now,
    displayName: input.displayName?.trim() || null,
    email: input.email.trim().toLowerCase(),
    expiresAt: now + TENANT_ADMIN_INVITE_TTL_MS,
    invitedByUserId: input.actorId,
    redeemedAt: null,
    redeemedUserId: null,
    revokedAt: null,
    role: "admin",
    status: "pending",
    tenantId: input.tenantId,
    tokenHash: hashInvitationToken(invitationToken),
    uid: invitationId,
    updatedAt: now,
  });

  if (!invitation) {
    throw new Error("Failed to create tenant administrator invitation.");
  }

  void activityLogRepository.create({
    action: "admin_invitation_created",
    invitedEmail: invitation.email,
    tenantId: input.tenantId,
    userId: input.actorId,
  });

  return {
    invitation: {
      createdAt: invitation.createdAt,
      displayName: invitation.displayName ?? null,
      email: invitation.email,
      expiresAt: invitation.expiresAt,
      id: invitation.id,
      redeemedAt: invitation.redeemedAt ?? null,
      revokedAt: invitation.revokedAt ?? null,
      role: invitation.role,
      status: invitation.status,
      tenantId: invitation.tenantId,
    },
    invitationId,
    invitationToken,
  };
}

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

/** GET /api/tenants/admin-invitations/all */
tenantsRouter.get(
  "/admin-invitations/all",
  requireSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    requireSuperAdmin(actor);

    const invitations = await adminInvitationRepository.list();
    response.json(
      invitations.map((invitation) => ({
        createdAt: invitation.createdAt,
        displayName: invitation.displayName ?? null,
        email: invitation.email,
        expiresAt: invitation.expiresAt,
        id: invitation.id,
        redeemedAt: invitation.redeemedAt ?? null,
        revokedAt: invitation.revokedAt ?? null,
        role: invitation.role,
        status: invitation.status,
        tenantId: invitation.tenantId,
      })),
    );
  },
);

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

/** POST /api/tenants/onboard */
tenantsRouter.post("/onboard", requireSession, async (request, response) => {
  const actor = await getActorFromSession(request);
  const currentActor = requireSuperAdmin(actor);

  const parseResult = createTenantOnboardingInputSchema.safeParse(request.body);

  if (!parseResult.success) {
    throw httpError(400, "Invalid tenant onboarding payload.");
  }

  const { initialAdminInvitation, tenant } = parseResult.data;
  const normalizedEmail = initialAdminInvitation.email.trim().toLowerCase();

  const [existingById, existingByDomain, existingUser, existingAuth] =
    await Promise.all([
      tenantRepository.getById(tenant.id),
      tenantRepository.getByDomain(tenant.domain),
      userRepository.getByEmail(normalizedEmail),
      passwordAuthRepository.getByEmail(normalizedEmail),
    ]);

  if (existingById) {
    throw httpError(409, "A tenant with this ID already exists.");
  }

  if (existingByDomain) {
    throw httpError(409, "A tenant with this domain already exists.");
  }

  if (existingUser || existingAuth) {
    throw httpError(409, "An administrator with this email already exists.");
  }

  const createdTenant = await tenantRepository.create({
    ...tenant,
    subscriptionStatus: tenant.subscriptionStatus ?? "trial",
  });

  if (!createdTenant) {
    throw httpError(500, "Failed to create tenant.");
  }

  try {
    const createdInvitation = await createAdminInvitation({
      actorId: currentActor.id,
      displayName: initialAdminInvitation.displayName,
      email: normalizedEmail,
      tenantId: tenant.id,
    });

    response.status(201).json({
      invitation: createdInvitation.invitation,
      invitationToken: createdInvitation.invitationToken,
      tenant: createdTenant,
    });
  } catch (error) {
    await Promise.allSettled([tenantRepository.delete(tenant.id)]);

    throw httpError(
      500,
      error instanceof Error
        ? error.message
        : "Failed to onboard tenant and initial administrator invitation.",
    );
  }
});

/** GET /api/tenants/:tenantId/admin-invitations */
tenantsRouter.get(
  "/:tenantId/admin-invitations",
  requireSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    requireSuperAdmin(actor);

    const tenantId = request.params.tenantId as string;
    const tenant = await tenantRepository.getById(tenantId);
    if (!tenant) {
      throw httpError(404, "Tenant not found.");
    }

    const invitations = await adminInvitationRepository.listByTenant(tenantId);
    response.json(
      invitations.map((invitation) => ({
        createdAt: invitation.createdAt,
        displayName: invitation.displayName ?? null,
        email: invitation.email,
        expiresAt: invitation.expiresAt,
        id: invitation.id,
        redeemedAt: invitation.redeemedAt ?? null,
        revokedAt: invitation.revokedAt ?? null,
        role: invitation.role,
        status: invitation.status,
        tenantId: invitation.tenantId,
      })),
    );
  },
);

/** POST /api/tenants/:tenantId/admin-invitations/:invitationId/reissue */
tenantsRouter.post(
  "/:tenantId/admin-invitations/:invitationId/reissue",
  requireSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    const currentActor = requireSuperAdmin(actor);
    const tenantId = request.params.tenantId as string;
    const invitationId = request.params.invitationId as string;

    const [tenant, existingInvitation] = await Promise.all([
      tenantRepository.getById(tenantId),
      adminInvitationRepository.getById(invitationId),
    ]);

    if (!tenant) {
      throw httpError(404, "Tenant not found.");
    }
    if (!existingInvitation || existingInvitation.tenantId !== tenantId) {
      throw httpError(404, "Invitation not found.");
    }
    if (existingInvitation.status === "redeemed") {
      throw httpError(409, "Redeemed invitations cannot be reissued.");
    }

    if (existingInvitation.status === "pending") {
      await adminInvitationRepository.update(existingInvitation.id, {
        revokedAt: Date.now(),
        status: "revoked",
      });
    }

    const createdInvitation = await createAdminInvitation({
      actorId: currentActor.id,
      displayName: existingInvitation.displayName,
      email: existingInvitation.email,
      tenantId,
    });

    response.json({
      invitation: createdInvitation.invitation,
      invitationToken: createdInvitation.invitationToken,
    });
  },
);

/** POST /api/tenants/:tenantId/admin-invitations/:invitationId/revoke */
tenantsRouter.post(
  "/:tenantId/admin-invitations/:invitationId/revoke",
  requireSession,
  async (request, response) => {
    const actor = await getActorFromSession(request);
    requireSuperAdmin(actor);
    const tenantId = request.params.tenantId as string;
    const invitationId = request.params.invitationId as string;

    const existingInvitation =
      await adminInvitationRepository.getById(invitationId);

    if (!existingInvitation || existingInvitation.tenantId !== tenantId) {
      throw httpError(404, "Invitation not found.");
    }
    if (existingInvitation.status !== "pending") {
      throw httpError(409, "Only pending invitations can be revoked.");
    }

    const revoked = await adminInvitationRepository.update(invitationId, {
      revokedAt: Date.now(),
      status: "revoked",
    });
    if (!revoked) {
      throw httpError(500, "Failed to revoke invitation.");
    }

    response.json({ success: true });
  },
);

/** PATCH /api/tenants/:tenantId */
tenantsRouter.patch("/:tenantId", requireSession, async (request, response) => {
  const actor = await getActorFromSession(request);
  requireSuperAdmin(actor);

  const existing = await tenantRepository.getById(
    request.params.tenantId as string,
  );
  if (!existing) throw httpError(404, "Tenant not found.");

  const nextTenant = request.body;

  if (nextTenant.domain && nextTenant.domain !== existing.domain) {
    const duplicate = await tenantRepository.getByDomain(nextTenant.domain);
    if (duplicate && duplicate.id !== existing.id) {
      throw httpError(409, "Another tenant already uses this domain.");
    }
  }

  const updated = await tenantRepository.update(
    request.params.tenantId as string,
    nextTenant,
  );
  if (!updated) throw httpError(500, "Failed to update tenant.");

  response.json(updated);
});
