import "dotenv/config";
import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import { once } from "node:events";
import test from "node:test";
import type { AddressInfo } from "node:net";
import { defaults as ironDefaults, seal } from "iron-webcrypto";

import type { AdminInvitationPreview } from "sparktool-contracts/invitation";
import type { SessionData } from "sparktool-contracts/session";

import { closeMongoClient, getMongoDb } from "../db/mongo.js";
import { createApp } from "../server.js";

const tenantId = "nigerian-correctional-service";

async function startIntegrationServer() {
  const app = createApp();
  const server = app.listen(0, "127.0.0.1");
  await once(server, "listening");

  const { port } = server.address() as AddressInfo;

  return {
    baseUrl: `http://127.0.0.1:${port}`,
    server,
  };
}

async function stopIntegrationServer(
  server: ReturnType<typeof createApp>["listen"] extends (
    ...args: never[]
  ) => infer TResult
    ? TResult
    : never,
) {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });

  await closeMongoClient();
}

function createInvitationToken() {
  return `${randomUUID().replaceAll("-", "")}${randomUUID().replaceAll("-", "")}`;
}

async function createSessionCookie(sessionData: SessionData) {
  const cookieName = process.env.APP_SESSION_COOKIE_NAME!;
  const sessionSecret = process.env.APP_SESSION_SECRET!;
  const sealed = await seal(
    {
      createdAt: Date.now(),
      data: sessionData,
      id: randomUUID(),
    },
    sessionSecret,
    ironDefaults,
  );

  return `${cookieName}=${sealed}`;
}

test("invited admin can preview, redeem, and sign in even outside restricted domains", async () => {
  const { baseUrl, server } = await startIntegrationServer();
  const db = await getMongoDb();
  const invitationId = randomUUID();
  const token = createInvitationToken();
  const tokenHash = createHash("sha256").update(token).digest("hex");
  const email = `integration-admin-${Date.now()}@example.com`;
  const now = Date.now();
  let userId: null | string = null;

  await db.collection("adminInvitations").insertOne({
    _id: invitationId,
    createdAt: now,
    displayName: "Integration Admin",
    email,
    expiresAt: now + 24 * 60 * 60 * 1000,
    invitedByUserId: "integration-test",
    redeemedAt: null,
    redeemedUserId: null,
    revokedAt: null,
    role: "admin",
    status: "pending",
    tenantId,
    tokenHash,
    uid: invitationId,
    updatedAt: now,
  });

  try {
    const previewResponse = await fetch(
      `${baseUrl}/api/auth/invitations/${encodeURIComponent(token)}`,
    );
    assert.equal(previewResponse.status, 200);

    const preview = (await previewResponse.json()) as AdminInvitationPreview;
    assert.equal(preview.email, email);
    assert.equal(preview.tenantId, tenantId);
    assert.equal(preview.status, "pending");

    const redeemResponse = await fetch(`${baseUrl}/api/auth/redeem-invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        department: null,
        displayName: "Integration Admin",
        location: null,
        password: "TempPass123!",
        tenantId,
        token,
      }),
    });
    assert.equal(redeemResponse.status, 200);

    const redeemPayload = (await redeemResponse.json()) as {
      userData: {
        email: string;
        id: string;
        isActive: boolean;
        tenantIds: string[];
      };
    };
    userId = redeemPayload.userData.id;
    assert.equal(redeemPayload.userData.email, email);
    assert.equal(redeemPayload.userData.isActive, true);
    assert.deepEqual(redeemPayload.userData.tenantIds, [tenantId]);

    const signInResponse = await fetch(`${baseUrl}/api/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: "TempPass123!",
        tenantId,
      }),
    });
    assert.equal(signInResponse.status, 200);

    const signInPayload = (await signInResponse.json()) as {
      userData: {
        email: string;
        id: string;
        tenantIds: string[];
      };
    };
    assert.equal(signInPayload.userData.email, email);
    assert.equal(signInPayload.userData.id, userId);
    assert.deepEqual(signInPayload.userData.tenantIds, [tenantId]);
  } finally {
    await Promise.all([
      db.collection("adminInvitations").deleteOne({ _id: invitationId }),
      userId
        ? db.collection("activityLogs").deleteMany({ userId })
        : Promise.resolve(),
      userId
        ? db.collection("passwordAuth").deleteOne({ userId })
        : Promise.resolve(),
      userId
        ? db.collection("users").deleteOne({ _id: userId })
        : Promise.resolve(),
    ]);

    await stopIntegrationServer(server);
  }
});

test("reissuing an invitation revokes the previous token and activates the fresh token", async () => {
  const { baseUrl, server } = await startIntegrationServer();
  const db = await getMongoDb();
  const invitationId = randomUUID();
  const originalToken = createInvitationToken();
  const originalTokenHash = createHash("sha256")
    .update(originalToken)
    .digest("hex");
  const email = `reissue-admin-${Date.now()}@example.com`;
  const now = Date.now();
  const actorId = randomUUID();
  const actorEmail = `super-admin-${Date.now()}@example.com`;
  let createdUserId: null | string = null;

  await db.collection("users").insertOne({
    _id: actorId,
    certificatesEarned: 0,
    completedCourses: [],
    createdAt: now,
    department: null,
    displayName: "Integration Super Admin",
    email: actorEmail,
    enrolledCourses: [],
    isActive: true,
    isPending: false,
    lastLoginAt: null,
    location: null,
    photoURL: "",
    preferences: { language: "en", notifications: true, theme: "light" },
    role: "super-admin",
    studentId: null,
    subscriptions: [],
    tenantIds: [],
    totalWatchTime: 0,
    uid: actorId,
    updatedAt: now,
  });

  await db.collection("adminInvitations").insertOne({
    _id: invitationId,
    createdAt: now,
    displayName: "Reissue Admin",
    email,
    expiresAt: now + 24 * 60 * 60 * 1000,
    invitedByUserId: actorId,
    redeemedAt: null,
    redeemedUserId: null,
    revokedAt: null,
    role: "admin",
    status: "pending",
    tenantId,
    tokenHash: originalTokenHash,
    uid: invitationId,
    updatedAt: now,
  });

  const sessionCookie = await createSessionCookie({
    activeTenantId: tenantId,
    email: actorEmail,
    role: "super-admin",
    tenantIds: [],
    uid: actorId,
  });

  try {
    const reissueResponse = await fetch(
      `${baseUrl}/api/tenants/${tenantId}/admin-invitations/${invitationId}/reissue`,
      {
        method: "POST",
        headers: {
          Cookie: sessionCookie,
        },
      },
    );
    assert.equal(reissueResponse.status, 200);

    const reissuePayload = (await reissueResponse.json()) as {
      invitation: {
        email: string;
        id: string;
        status: string;
        tenantId: string;
      };
      invitationToken: string;
    };

    assert.equal(reissuePayload.invitation.email, email);
    assert.equal(reissuePayload.invitation.status, "pending");
    assert.equal(reissuePayload.invitation.tenantId, tenantId);
    assert.notEqual(reissuePayload.invitation.id, invitationId);
    assert.notEqual(reissuePayload.invitationToken, originalToken);

    const revokedPreviewResponse = await fetch(
      `${baseUrl}/api/auth/invitations/${encodeURIComponent(originalToken)}`,
    );
    assert.equal(revokedPreviewResponse.status, 410);
    const revokedPayload = (await revokedPreviewResponse.json()) as {
      error: string;
    };
    assert.equal(revokedPayload.error, "This invitation has been revoked.");

    const freshPreviewResponse = await fetch(
      `${baseUrl}/api/auth/invitations/${encodeURIComponent(reissuePayload.invitationToken)}`,
    );
    assert.equal(freshPreviewResponse.status, 200);

    const freshPreview =
      (await freshPreviewResponse.json()) as AdminInvitationPreview;
    assert.equal(freshPreview.email, email);
    assert.equal(freshPreview.status, "pending");

    const redeemResponse = await fetch(`${baseUrl}/api/auth/redeem-invite`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        department: null,
        displayName: "Reissue Admin",
        location: null,
        password: "TempPass123!",
        tenantId,
        token: reissuePayload.invitationToken,
      }),
    });
    assert.equal(redeemResponse.status, 200);

    const redeemPayload = (await redeemResponse.json()) as {
      userData: {
        email: string;
        id: string;
        tenantIds: string[];
      };
    };
    createdUserId = redeemPayload.userData.id;
    assert.equal(redeemPayload.userData.email, email);
    assert.deepEqual(redeemPayload.userData.tenantIds, [tenantId]);

    const signInResponse = await fetch(`${baseUrl}/api/auth/sign-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: "TempPass123!",
        tenantId,
      }),
    });
    assert.equal(signInResponse.status, 200);

    const originalInvitation = await db
      .collection("adminInvitations")
      .findOne({ _id: invitationId });
    assert.equal(originalInvitation?.status, "revoked");
    assert.equal(typeof originalInvitation?.revokedAt, "number");
  } finally {
    await Promise.all([
      db.collection("adminInvitations").deleteMany({ email }),
      db.collection("activityLogs").deleteMany({
        $or: [
          { invitedEmail: email },
          { userId: actorId },
          { userId: createdUserId },
        ],
      }),
      createdUserId
        ? db.collection("passwordAuth").deleteOne({ userId: createdUserId })
        : Promise.resolve(),
      createdUserId
        ? db.collection("users").deleteOne({ _id: createdUserId })
        : Promise.resolve(),
      db.collection("users").deleteOne({ _id: actorId }),
    ]);

    await stopIntegrationServer(server);
  }
});
