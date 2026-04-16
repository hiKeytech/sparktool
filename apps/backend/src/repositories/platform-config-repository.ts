import type { Collection } from "mongodb";

import {
  platformConfigSchema,
  type PlatformConfig,
} from "sparktool-contracts/platform-config";

import { getMongoDb } from "../db/mongo";

type PlatformConfigDocument = PlatformConfig & { _id: string };

async function getPlatformConfigCollection(): Promise<
  Collection<PlatformConfigDocument>
> {
  const db = await getMongoDb();
  return db.collection<PlatformConfigDocument>("platformConfig");
}

function parsePlatformConfig(
  document: null | PlatformConfigDocument,
): PlatformConfig | null {
  if (!document) {
    return null;
  }

  const result = platformConfigSchema.safeParse({
    ...document,
    id: document.id || document._id,
  });

  if (!result.success) {
    console.error("Invalid platform config document", result.error);
    return null;
  }

  return result.data;
}

const PLATFORM_CONFIG_ID = "platform";

export const platformConfigRepository = {
  async get() {
    const collection = await getPlatformConfigCollection();
    const document = await collection.findOne({ _id: PLATFORM_CONFIG_ID });

    return parsePlatformConfig(document);
  },

  async initialize(data: PlatformConfig) {
    const collection = await getPlatformConfigCollection();

    await collection.updateOne(
      { _id: PLATFORM_CONFIG_ID },
      {
        $set: {
          ...data,
          _id: PLATFORM_CONFIG_ID,
          id: PLATFORM_CONFIG_ID,
        },
      },
      { upsert: true },
    );

    return this.get();
  },

  async update(data: PlatformConfig) {
    const collection = await getPlatformConfigCollection();

    await collection.updateOne(
      { _id: PLATFORM_CONFIG_ID },
      {
        $set: {
          ...data,
          _id: PLATFORM_CONFIG_ID,
          id: PLATFORM_CONFIG_ID,
        },
      },
      { upsert: true },
    );

    return this.get();
  },
};
