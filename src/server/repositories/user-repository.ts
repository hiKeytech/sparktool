import type { Collection, Filter, Sort } from "mongodb";

import { userRoleSchema, userSchema, type User, type UserRole } from "@/schemas/user";
import { filterUsersBySearch } from "@/lib/search/search-utils";
import { getMongoDb } from "@/server/db/mongo";
import { serverEnv } from "@/server/env";
import { isDefined } from "@/utils/is-defined";

type UserDocument = User & { _id: string };
export type StoredUser = User & { id: string };

function splitEnvList(value: string | undefined) {
  return (value || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function parseStoredUser(document: null | UserDocument): null | StoredUser {
  if (!document) {
    return null;
  }

  const candidate = {
    ...document,
    uid: document.uid || document._id,
  };

  const result = userSchema.safeParse(candidate);

  if (!result.success) {
    console.error("Invalid user document", result.error);
    return null;
  }

  return {
    ...result.data,
    id: document._id,
  };
}

async function getUserCollection(): Promise<Collection<UserDocument>> {
  const db = await getMongoDb();
  return db.collection<UserDocument>("users");
}

const superAdminEmails = splitEnvList(serverEnv.VITE_SUPER_ADMIN_EMAILS);
const whitelistedAdminEmails = splitEnvList(serverEnv.VITE_WHITELISTED_ADMIN_EMAILS);

function resolveRole(email: string, fallbackRole: UserRole = "student") {
  const normalizedEmail = email.trim().toLowerCase();

  if (superAdminEmails.includes(normalizedEmail)) {
    return userRoleSchema.parse("super-admin");
  }

  if (whitelistedAdminEmails.includes(normalizedEmail)) {
    return userRoleSchema.parse("admin");
  }

  return userRoleSchema.parse(fallbackRole);
}

export const userRepository = {
  async create(userData: User) {
    const users = await getUserCollection();
    const now = Date.now();
    const document: UserDocument = {
      ...userData,
      _id: userData.uid,
      createdAt: userData.createdAt ?? now,
      updatedAt: userData.updatedAt ?? now,
    };

    await users.insertOne(document);

    return parseStoredUser(document);
  },

  async getByEmail(email: string) {
    const users = await getUserCollection();
    const user = await users.findOne({ email });

    return parseStoredUser(user);
  },

  async getById(userId?: string | null) {
    if (!userId) {
      return null;
    }

    const users = await getUserCollection();
    const user = await users.findOne({ _id: userId });

    return parseStoredUser(user);
  },

  async list(
    tenantId?: string,
    filters: Partial<{
      isActive: boolean;
      role: string;
      search: string;
    }> = {}
  ) {
    const users = await getUserCollection();
    const query: Filter<UserDocument> = {};

    if (tenantId) {
      query.tenantIds = tenantId;
    }

    if (isDefined(filters.role)) {
      query.role = filters.role as UserRole;
    }

    if (isDefined(filters.isActive)) {
      query.isActive = filters.isActive;
    }

    const sort: Sort = { createdAt: -1 };
    const userDocuments = await users.find(query).sort(sort).toArray();
    let parsedUsers = userDocuments
      .map((document) => parseStoredUser(document))
      .filter((user): user is StoredUser => user !== null);

    if (isDefined(filters.search)) {
      parsedUsers = filterUsersBySearch(parsedUsers, filters.search);
    }

    return parsedUsers;
  },

  async provisionIdentityUser(identity: {
    displayName?: null | string;
    email: string;
    photoURL?: null | string;
    role?: UserRole;
    tenantIds?: string[];
    uid: string;
  }) {
    const users = await getUserCollection();
    const existingUser = await users.findOne({ _id: identity.uid });
    const now = Date.now();
    const role = resolveRole(identity.email, identity.role);

    const document: UserDocument = {
      _id: identity.uid,
      certificatesEarned: existingUser?.certificatesEarned ?? 0,
      completedCourses: existingUser?.completedCourses ?? [],
      createdAt: existingUser?.createdAt ?? now,
      department: existingUser?.department ?? null,
      displayName: identity.displayName || existingUser?.displayName || identity.email.split("@")[0],
      email: identity.email,
      enrolledCourses: existingUser?.enrolledCourses ?? [],
      isActive: existingUser?.isActive ?? true,
      isPending: existingUser?.isPending ?? false,
      lastLoginAt: now,
      location: existingUser?.location ?? null,
      photoURL: identity.photoURL || existingUser?.photoURL || "",
      preferences: existingUser?.preferences ?? null,
      role,
      studentId: existingUser?.studentId ?? null,
      subscriptions: existingUser?.subscriptions ?? [],
      tenantIds: identity.tenantIds ?? existingUser?.tenantIds ?? [],
      totalWatchTime: existingUser?.totalWatchTime ?? 0,
      uid: identity.uid,
      updatedAt: now,
    };

    await users.updateOne(
      { _id: identity.uid },
      {
        $set: document,
      },
      { upsert: true }
    );

    return parseStoredUser(document);
  },

  async update(userId: string, userData: Partial<User>) {
    const users = await getUserCollection();
    const now = Date.now();

    await users.updateOne(
      { _id: userId },
      {
        $set: {
          ...userData,
          updatedAt: now,
        },
      }
    );

    return this.getById(userId);
  },

  async deactivate(userId: string) {
    return this.update(userId, {
      isActive: false,
    });
  },

  async delete(userId: string) {
    const users = await getUserCollection();
    await users.deleteOne({ _id: userId });
  },

  async subscribeToTenant(input: {
    plan: "monthly" | "yearly";
    tenantId: string;
    userId: string;
  }) {
    const user = await this.getById(input.userId);

    if (!user) {
      return null;
    }

    const now = Date.now();
    const expiresAt =
      now + (input.plan === "yearly" ? 365 : 30) * 24 * 60 * 60 * 1000;
    const subscriptions = (user.subscriptions || []).filter(
      (subscription) => subscription.tenantId !== input.tenantId
    );

    subscriptions.push({
      expiresAt,
      plan: input.plan,
      status: "active",
      tenantId: input.tenantId,
    });

    const tenantIds = Array.from(
      new Set([...(user.tenantIds || []), input.tenantId])
    );

    return this.update(input.userId, {
      subscriptions,
      tenantIds,
    });
  },
};