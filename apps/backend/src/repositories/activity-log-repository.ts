import { randomUUID } from "node:crypto";
import type { Collection, Filter, Sort } from "mongodb";

import type {
  ActivityLog,
  ActivityLogCreateInput,
  ListActivityLogVariables,
} from "sparktool-contracts/activity-log";
import { getMongoDb } from "../db/mongo.js";

type ActivityLogDocument = ActivityLog & { _id: string };
export type StoredActivityLog = ActivityLog & { id: string };

function parseStoredActivityLog(
  document: ActivityLogDocument | null,
): null | StoredActivityLog {
  if (!document) {
    return null;
  }

  return {
    ...document,
    id: document._id,
  };
}

async function getActivityLogCollection(): Promise<
  Collection<ActivityLogDocument>
> {
  const db = await getMongoDb();
  return db.collection<ActivityLogDocument>("activityLogs");
}

export const activityLogRepository = {
  async create(logData: ActivityLogCreateInput) {
    const activityLogs = await getActivityLogCollection();
    const logId = randomUUID();
    const document: ActivityLogDocument = {
      ...logData,
      _id: logId,
      timestamp: Date.now(),
      userAgent: logData.userAgent ?? null,
    } as ActivityLogDocument;

    await activityLogs.insertOne(document);

    return parseStoredActivityLog(document);
  },

  async list(variables: ListActivityLogVariables & { tenantId?: string }) {
    const activityLogs = await getActivityLogCollection();
    const { queryFilter = [], queryOrder = [], tenantId, userId } = variables;
    const query: Filter<ActivityLogDocument> = {};

    if (userId) {
      query.userId = userId;
    }

    if (tenantId) {
      query.tenantId = tenantId;
    }

    for (const filter of queryFilter) {
      Object.assign(query, {
        [filter.field]: {
          [filter.operator]: filter.value,
        },
      });
    }

    const sort: Sort = queryOrder.length
      ? queryOrder.reduce<Record<string, 1 | -1>>((acc, order) => {
          acc[order.field as string] = order.value === "asc" ? 1 : -1;
          return acc;
        }, {})
      : { timestamp: -1 };

    return (await activityLogs.find(query).sort(sort).toArray())
      .map((document) => parseStoredActivityLog(document))
      .filter((log): log is StoredActivityLog => log !== null);
  },
};
