import { MongoClient } from "mongodb";

import { serverEnv } from "../env";

declare global {
  var __sparktoolMongoClientPromise__: Promise<MongoClient> | undefined;
}

function createMongoClient() {
  return new MongoClient(serverEnv.MONGODB_URI, {
    appName: "sparktool",
  });
}

const clientPromise =
  globalThis.__sparktoolMongoClientPromise__ ?? createMongoClient().connect();

if (!globalThis.__sparktoolMongoClientPromise__) {
  globalThis.__sparktoolMongoClientPromise__ = clientPromise;
}

export async function getMongoClient() {
  return clientPromise;
}

export async function getMongoDb() {
  const client = await getMongoClient();
  return client.db(serverEnv.MONGODB_DB_NAME);
}
