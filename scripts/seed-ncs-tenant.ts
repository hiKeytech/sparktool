import * as dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const mongoUri = process.env.MONGODB_URI;
const mongoDbName = process.env.MONGODB_DB_NAME || "sparktool";

const NCS_TENANT_ID = "ncs";

const ncsTenantData = {
  id: NCS_TENANT_ID,
  name: "Nigerian Correctional Service",
  domain: "ncs.sparktool.com",
  subscriptionStatus: "active",
  config: {
    branding: {
      logoUrl: "/logo.png", // Assuming this exists or will be uploaded
      primaryColor: "#005500", // NCS Green
      secondaryColor: "#ffffff",
      fontFamily: "Inter, sans-serif",
      portalName: "Nigerian Correctional Service",
      faviconUrl: "/favicon.ico",
    },
    modules: {
      certificates: true,
      liveClasses: true,
      messaging: true,
      gamification: false,
      reports: true,
    },
    dashboard: {
      layout: "modern",
      widgets: [
        {
          id: "recent-courses",
          position: { x: 0, y: 0, w: 6, h: 4 },
          visibility: ["student", "admin"],
        },
        {
          id: "learning-progress",
          position: { x: 6, y: 0, w: 6, h: 4 },
          visibility: ["student"],
        },
      ],
    },
    auth: {
      allowSignup: false, // NCS usually strictly controls users
      domains: ["corrections.gov.ng"],
      strategies: [
        {
          type: "email-password",
          config: {},
          label: "Sign in",
        },
      ],
    },
  },
};

type SeedTenantDocument = typeof ncsTenantData & {
  _id: string;
};

async function seedTenant() {
  if (!mongoUri) {
    throw new Error("MONGODB_URI is required to seed tenants.");
  }

  const client = new MongoClient(mongoUri);

  console.log(`Seeding tenant: ${NCS_TENANT_ID}...`);
  try {
    await client.connect();
    const db = client.db(mongoDbName);

    await db.collection<SeedTenantDocument>("tenants").updateOne(
      { _id: NCS_TENANT_ID },
      {
        $set: {
          ...ncsTenantData,
          _id: NCS_TENANT_ID,
        },
      },
      { upsert: true },
    );

    console.log("✅ Tenant seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding tenant:", error);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seedTenant().then(() => process.exit(0));
