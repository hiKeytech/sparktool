**Tenant Seeding**

Use the Nigerian Correctional Service configuration as a seed tenant for end-to-end testing without hardcoding NCS into the platform product surface.

**Run It**

From [hikey-learn/apps/sparktool](hikey-learn/apps/sparktool):

```bash
pnpm seed:ncs
```

Required environment variables:

- `MONGODB_URI`
- `MONGODB_DB_NAME` optional, defaults to `sparktool`

The seed data lives in [hikey-learn/apps/sparktool/scripts/seed-data/ncs-tenant.json](hikey-learn/apps/sparktool/scripts/seed-data/ncs-tenant.json).

**What It Creates**

- Tenant id: `nigerian-correctional-service`
- Tenant domain: `nigerian-correctional-service.sparktool.local`
- Live classes enabled
- Restricted login domains for `corrections.gov.ng`
- NCS branding and live-session defaults for testing

**Live Session Test Path**

After seeding, use these routes:

- Admin: `/nigerian-correctional-service/admin/live-sessions`
- Student: `/nigerian-correctional-service/student/live-sessions`

Recommended order:

1. Seed the tenant.
2. Sign in as a platform admin and verify the tenant exists in the super-admin console.
3. Create or assign a tenant admin for `nigerian-correctional-service`.
4. Create a course under that tenant.
5. Create a live session from the admin live-sessions page.
6. Sign in as a student in the same tenant and join from the student live-sessions page.

This keeps seed data operational and reusable while leaving the platform generic.
