import type { Collection } from "mongodb";

import { tenantSchema, type Tenant } from "@/schemas/tenant";
import { getMongoDb } from "@/server/db/mongo";

type TenantDocument = Tenant & { _id: string };

async function getTenantCollection(): Promise<Collection<TenantDocument>> {
  const db = await getMongoDb();
  return db.collection<TenantDocument>("tenants");
}

function parseTenant(document: null | TenantDocument): Tenant | null {
  if (!document) {
    return null;
  }

  const candidate = {
    ...document,
    id: document.id || document._id,
  };

  const result = tenantSchema.safeParse(candidate);

  if (!result.success) {
    console.error("Invalid tenant document", result.error);
    return null;
  }

  return result.data;
}

export const tenantRepository = {
  async getByDomain(domain: string) {
    const tenants = await getTenantCollection();
    const tenant = await tenants.findOne({ domain });

    return parseTenant(tenant);
  },

  async getById(id: string) {
    const tenants = await getTenantCollection();
    const tenant = await tenants.findOne({ _id: id });

    return parseTenant(tenant);
  },

  async getByHost(host: string) {
    const byDomain = await this.getByDomain(host);

    if (byDomain) {
      return byDomain;
    }

    return this.getById(host);
  },

  async initialize(id: string, data: Tenant) {
    const tenants = await getTenantCollection();

    await tenants.updateOne(
      { _id: id },
      {
        $set: {
          ...data,
          _id: id,
          id,
        },
      },
      { upsert: true }
    );
  },
};