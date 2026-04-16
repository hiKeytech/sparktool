import type { Collection } from "mongodb";

import { tenantSchema, type Tenant } from "sparktool-contracts/tenant-contract";

import { getMongoDb } from "../db/mongo";

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
  async create(data: Tenant) {
    const tenants = await getTenantCollection();
    const document: TenantDocument = {
      ...data,
      _id: data.id,
    };

    await tenants.insertOne(document);

    return parseTenant(document);
  },

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
      { upsert: true },
    );
  },

  async list() {
    const tenants = await getTenantCollection();
    const documents = await tenants.find({}).sort({ name: 1 }).toArray();

    return documents
      .map((document) => parseTenant(document))
      .filter((tenant): tenant is Tenant => tenant !== null);
  },

  async delete(id: string) {
    const tenants = await getTenantCollection();
    await tenants.deleteOne({ _id: id });
  },

  async update(id: string, updates: Partial<Tenant>) {
    const tenants = await getTenantCollection();

    await tenants.updateOne(
      { _id: id },
      {
        $set: {
          ...updates,
          id,
        },
      },
    );

    return this.getById(id);
  },
};
