import type { Collection } from "mongodb";

import {
  adminInvitationSchema,
  type AdminInvitation,
} from "sparktool-contracts/invitation";

import { getMongoDb } from "../db/mongo.js";

type InvitationDocument = AdminInvitation & { _id: string };
export type StoredAdminInvitation = AdminInvitation & { id: string };

function parseStoredAdminInvitation(
  document: InvitationDocument | null,
): null | StoredAdminInvitation {
  if (!document) {
    return null;
  }

  const result = adminInvitationSchema.safeParse({
    ...document,
    uid: document.uid || document._id,
  });

  if (!result.success) {
    console.error("Invalid admin invitation document", result.error);
    return null;
  }

  return {
    ...result.data,
    id: document._id,
  };
}

async function getInvitationCollection(): Promise<
  Collection<InvitationDocument>
> {
  const db = await getMongoDb();
  return db.collection<InvitationDocument>("adminInvitations");
}

export const adminInvitationRepository = {
  async create(invitation: AdminInvitation) {
    const invitations = await getInvitationCollection();
    const document: InvitationDocument = {
      ...invitation,
      _id: invitation.uid,
    };

    await invitations.insertOne(document);
    return parseStoredAdminInvitation(document);
  },

  async list() {
    const invitations = await getInvitationCollection();
    const documents = await invitations
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return documents
      .map((document) => parseStoredAdminInvitation(document))
      .filter(
        (invitation): invitation is StoredAdminInvitation =>
          invitation !== null,
      );
  },

  async listByTenant(tenantId: string) {
    const invitations = await getInvitationCollection();
    const documents = await invitations
      .find({ tenantId })
      .sort({ createdAt: -1 })
      .toArray();

    return documents
      .map((document) => parseStoredAdminInvitation(document))
      .filter(
        (invitation): invitation is StoredAdminInvitation =>
          invitation !== null,
      );
  },

  async delete(invitationId: string) {
    const invitations = await getInvitationCollection();
    await invitations.deleteOne({ _id: invitationId });
  },

  async getById(invitationId: string) {
    const invitations = await getInvitationCollection();
    const invitation = await invitations.findOne({ _id: invitationId });
    return parseStoredAdminInvitation(invitation);
  },

  async getByTokenHash(tokenHash: string) {
    const invitations = await getInvitationCollection();
    const invitation = await invitations.findOne({ tokenHash });
    return parseStoredAdminInvitation(invitation);
  },

  async update(invitationId: string, updates: Partial<AdminInvitation>) {
    const invitations = await getInvitationCollection();

    await invitations.updateOne(
      { _id: invitationId },
      {
        $set: {
          ...updates,
          updatedAt: Date.now(),
        },
      },
    );

    return this.getById(invitationId);
  },
};
