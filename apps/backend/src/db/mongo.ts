import { MongoClient } from "mongodb";

import { serverEnv } from "../env.js";

declare global {
  var __sparktoolMongoClient__: MongoClient | undefined;
  var __sparktoolMongoClientPromise__: Promise<MongoClient> | undefined;
}

type MongoConnectionStatus = {
  lastAttemptAt: null | number;
  lastConnectedAt: null | number;
  lastError: null | {
    code?: string;
    message: string;
    timestamp: number;
  };
  ready: boolean;
};

const mongoConnectionStatus: MongoConnectionStatus = {
  lastAttemptAt: null,
  lastConnectedAt: null,
  lastError: null,
  ready: false,
};

function createMongoClient() {
  return new MongoClient(serverEnv.MONGODB_URI, {
    appName: "sparktool",
    serverSelectionTimeoutMS: 10_000,
  });
}

async function connectMongoClient() {
  if (globalThis.__sparktoolMongoClient__) {
    mongoConnectionStatus.ready = true;
    return globalThis.__sparktoolMongoClient__;
  }

  if (globalThis.__sparktoolMongoClientPromise__) {
    return globalThis.__sparktoolMongoClientPromise__;
  }

  const client = createMongoClient();
  mongoConnectionStatus.lastAttemptAt = Date.now();

  const clientPromise = client
    .connect()
    .then((connectedClient) => {
      globalThis.__sparktoolMongoClient__ = connectedClient;
      mongoConnectionStatus.lastConnectedAt = Date.now();
      mongoConnectionStatus.lastError = null;
      mongoConnectionStatus.ready = true;
      return connectedClient;
    })
    .catch(async (error: unknown) => {
      mongoConnectionStatus.lastError = {
        code:
          typeof error === "object" && error !== null && "code" in error
            ? String(error.code)
            : undefined,
        message:
          error instanceof Error ? error.message : "Unknown MongoDB error",
        timestamp: Date.now(),
      };
      mongoConnectionStatus.ready = false;
      globalThis.__sparktoolMongoClient__ = undefined;

      try {
        await client.close();
      } catch {
        // Ignore close failures after unsuccessful connection attempts.
      }

      throw error;
    })
    .finally(() => {
      globalThis.__sparktoolMongoClientPromise__ = undefined;
    });

  globalThis.__sparktoolMongoClientPromise__ = clientPromise;
  return clientPromise;
}

export function getMongoConnectionStatus() {
  return {
    ...mongoConnectionStatus,
    ready:
      Boolean(globalThis.__sparktoolMongoClient__) &&
      mongoConnectionStatus.ready,
  };
}

export async function getMongoClient() {
  return connectMongoClient();
}

export async function getMongoDb() {
  const client = await getMongoClient();
  return client.db(serverEnv.MONGODB_DB_NAME);
}

export async function pingMongo() {
  const db = await getMongoDb();
  await db.command({ ping: 1 });
}
