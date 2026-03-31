import "dotenv/config";

import { hash } from "bcryptjs";
import { MongoClient } from "mongodb";
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";

const mongoUri = process.env.MONGODB_URI;
const mongoDbName = process.env.MONGODB_DB_NAME || "sparktool";
const courseSeedUrl = new URL("./seed-data/ncs-course.json", import.meta.url);
const platformSeedUrl = new URL(
  "./seed-data/platform-config.json",
  import.meta.url,
);
const seedFileUrl = new URL("./seed-data/ncs-tenant.json", import.meta.url);
const usersSeedUrl = new URL("./seed-data/ncs-users.json", import.meta.url);

async function loadCourseSeed() {
  const raw = await readFile(courseSeedUrl, "utf8");
  return JSON.parse(raw);
}

async function loadPlatformSeed() {
  const raw = await readFile(platformSeedUrl, "utf8");
  return JSON.parse(raw);
}

async function loadTenantSeed() {
  const raw = await readFile(seedFileUrl, "utf8");
  return JSON.parse(raw);
}

async function loadUserSeeds() {
  const raw = await readFile(usersSeedUrl, "utf8");
  return JSON.parse(raw);
}

async function seedTenant() {
  if (!mongoUri) {
    throw new Error("MONGODB_URI is required to seed tenants.");
  }

  const tenant = await loadTenantSeed();
  const platformConfig = await loadPlatformSeed();
  const course = await loadCourseSeed();
  const users = await loadUserSeeds();
  const client = new MongoClient(mongoUri);

  console.log(`Seeding tenant: ${tenant.id}...`);

  try {
    await client.connect();

    const db = client.db(mongoDbName);
    const usersCollection = db.collection("users");
    const passwordAuthCollection = db.collection("passwordAuth");
    const coursesCollection = db.collection("courses");

    await db.collection("platformConfig").updateOne(
      { _id: "platform" },
      {
        $set: {
          ...platformConfig,
          _id: "platform",
          id: "platform",
        },
      },
      { upsert: true },
    );

    await db.collection("tenants").updateOne(
      { _id: tenant.id },
      {
        $set: {
          ...tenant,
          _id: tenant.id,
        },
      },
      { upsert: true },
    );

    for (const user of users) {
      const userId = `${tenant.id}-${user.role}-${user.email.split("@")[0]}`;
      const now = Date.now();

      await usersCollection.updateOne(
        { _id: userId },
        {
          $set: {
            _id: userId,
            certificatesEarned: 0,
            completedCourses: [],
            createdAt: now,
            department: null,
            displayName: user.displayName,
            email: user.email,
            enrolledCourses: [],
            isActive: true,
            isPending: false,
            lastLoginAt: null,
            location: null,
            photoURL: "",
            preferences: {
              language: "en",
              notifications: true,
              theme: "light",
            },
            role: user.role,
            studentId: null,
            subscriptions: [],
            tenantIds: user.tenantIds,
            totalWatchTime: 0,
            uid: userId,
            updatedAt: now,
          },
        },
        { upsert: true },
      );

      await upsertPasswordAccount(passwordAuthCollection, {
        email: user.email,
        password: user.password,
        userId,
      });
    }

    await coursesCollection.updateOne(
      { _id: course.id },
      {
        $set: {
          ...course,
          _id: course.id,
          averageRating: 0,
          completionCount: 0,
          completionRate: 0,
          createdAt: Date.now(),
          createdBy: `${tenant.id}-admin-admin`,
          createdByMeta: {
            name: "NCS Tenant Admin",
            photoUrl: "",
          },
          enrollmentCount: 0,
          estimatedDurationInMinutes: 30,
          publishedAt: Date.now(),
          updatedAt: Date.now(),
        },
      },
      { upsert: true },
    );

    console.log("Seeded tenant successfully.");
    console.log("Platform config seeded successfully.");
    console.log(`Tenant route: /${tenant.id}`);
    console.log(`Admin live sessions: /${tenant.id}/admin/live-sessions`);
    console.log(`Student live sessions: /${tenant.id}/student/live-sessions`);
    console.log("Admin login: admin@corrections.gov.ng / AdminPass123!");
    console.log("Student login: student@corrections.gov.ng / StudentPass123!");
  } finally {
    await client.close();
  }
}

async function upsertPasswordAccount(passwordAuthCollection, input) {
  const passwordHash = await hash(input.password, 12);
  const now = Date.now();

  await passwordAuthCollection.updateOne(
    { _id: input.userId },
    {
      $set: {
        createdAt: now,
        email: input.email,
        passwordHash,
        updatedAt: now,
        userId: input.userId,
      },
    },
    { upsert: true },
  );
}

seedTenant().catch((error) => {
  console.error("Failed to seed tenant:", error);
  process.exit(1);
});
