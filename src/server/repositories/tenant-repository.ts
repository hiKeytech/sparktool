import type { Collection } from "mongodb";

import { tenantSchema, type Tenant } from "@/schemas/tenant-contract";
import { getMongoDb } from "@/server/db/mongo";
import { normalizeTenantHost } from "@/server/tenant-context";

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
    const normalizedDomain = normalizeTenantHost(domain);

    if (!normalizedDomain) {
      return null;
    }

    const tenants = await getTenantCollection();
    const tenant = await tenants.findOne({ domain: normalizedDomain });

    return parseTenant(tenant);
  },

  async getById(id: string) {
    const tenants = await getTenantCollection();
    const tenant = await tenants.findOne({ _id: id });

    return parseTenant(tenant);
  },

  async getByHost(host: string) {
    const normalizedHost = normalizeTenantHost(host);

    if (!normalizedHost) {
      return null;
    }

    const byDomain = await this.getByDomain(normalizedHost);

    if (byDomain) {
      return byDomain;
    }

    return this.getById(normalizedHost);
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
