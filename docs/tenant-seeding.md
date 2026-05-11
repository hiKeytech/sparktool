**Tenant Seeding**

Use the neutral sample tenant to validate end-to-end multi-tenant flows without embedding customer-specific branding into the product.

**Run It**

From the repo root:

```bash
pnpm --filter sparktool-backend seed:sample
```

Required environment variables:

- `MONGODB_URI`
- `MONGODB_DB_NAME` optional, defaults to `sparktool`

The seed data lives in `apps/backend/scripts/seed-data/sample-tenant.json`.

**What It Creates**

- Tenant id: `sample-academy`
- Tenant domain: `sample-academy.sparktool.local`
- Live classes enabled
- Restricted login domains for `sampleacademy.org`
- Neutral SparkTool-branded tenant copy and assets for testing

**Live Session Test Path**

After seeding, use these routes:

- Admin: `/sample-academy/admin/live-sessions`
- Student: `/sample-academy/student/live-sessions`

Recommended order:

1. Seed the tenant.
2. Sign in as a platform admin and verify the tenant exists in the super-admin console.
3. Create or assign a tenant admin for `sample-academy`.
4. Create a course under that tenant.
5. Create a live session from the admin live-sessions page.
6. Sign in as a student in the same tenant and join from the student live-sessions page.

This keeps seed data operational and reusable while leaving the platform generic.
