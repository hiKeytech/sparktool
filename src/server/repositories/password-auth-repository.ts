import { compare, hash } from "bcryptjs";
import type { Collection } from "mongodb";

import { getMongoDb } from "@/server/db/mongo";

type PasswordAuthDocument = {
  _id: string;
  createdAt: number;
  email: string;
  passwordHash: string;
  updatedAt: number;
  userId: string;
};

async function getPasswordAuthCollection(): Promise<
  Collection<PasswordAuthDocument>
> {
  const db = await getMongoDb();
  return db.collection<PasswordAuthDocument>("passwordAuth");
}

export const passwordAuthRepository = {
  async createAccount(input: {
    email: string;
    password: string;
    userId: string;
  }) {
    const passwordAuth = await getPasswordAuthCollection();
    const normalizedEmail = input.email.trim().toLowerCase();
    const now = Date.now();
    const passwordHash = await hash(input.password, 12);

    const document: PasswordAuthDocument = {
      _id: input.userId,
      createdAt: now,
      email: normalizedEmail,
      passwordHash,
      updatedAt: now,
      userId: input.userId,
    };

    await passwordAuth.insertOne(document);

    return document;
  },

  async getByEmail(email: string) {
    const passwordAuth = await getPasswordAuthCollection();
    return passwordAuth.findOne({ email: email.trim().toLowerCase() });
  },

  async getByUserId(userId: string) {
    const passwordAuth = await getPasswordAuthCollection();
    return passwordAuth.findOne({ userId });
  },

  async deleteByUserId(userId: string) {
    const passwordAuth = await getPasswordAuthCollection();
    await passwordAuth.deleteOne({ userId });
  },

  async verifyPassword(input: { email: string; password: string }) {
    const account = await this.getByEmail(input.email);

    if (!account) {
      return null;
    }

    const isValid = await compare(input.password, account.passwordHash);

    if (!isValid) {
      return null;
    }

    return account;
  },

  async updatePassword(input: { password: string; userId: string }) {
    const passwordAuth = await getPasswordAuthCollection();
    const now = Date.now();
    const passwordHash = await hash(input.password, 12);

    return passwordAuth.findOneAndUpdate(
      { userId: input.userId },
      {
        $set: {
          passwordHash,
          updatedAt: now,
        },
      },
      { returnDocument: "after" },
    );
  },
};
