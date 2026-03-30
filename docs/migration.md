Sparktool backend reset plan.

This document replaces the earlier staged migration plan.

Current assumption:

- there is no production data
- there are no Firebase Auth users
- Firebase can be removed completely
- active app auth should use Mongo-backed email/password only

That changes the strategy from migration to greenfield replacement.

**Implementation Status**

Completed foundation work:

1. named MongoDB env vars added to the app env contract
2. server-side Mongo env parsing added
3. server-side Mongo client singleton added
4. tenant repository scaffolded
5. tenant service switched off Firestore and onto the Mongo repository
6. session config centralized on the server
7. Mongo user repository scaffolded
8. current-user resolution switched from session payloads to Mongo-backed lookup
9. local password-auth repository added
10. active login flow switched toward Mongo-backed email/password auth
11. social auth strategy files removed from the active app flow
12. Firebase auth-specific bootstrap paths reduced to cleanup leftovers
13. user CRUD switched from Firestore to Mongo-backed server functions
14. admin and super-admin user management screens rewired to the Mongo-backed user API
15. admin-created password accounts now work through the app UI
16. authenticated users can now change their password through the profile UI
17. admins can reset a user's password through the management UI
18. course CRUD now runs through Mongo-backed server functions and repositories
19. course enrollment now writes Mongo-backed student progress and Mongo-backed user enrollment state
20. course progress summary updates now persist to Mongo and maintain course completion counters there
21. dashboard analytics and metrics now read users, courses, and enrollments from Mongo-backed repositories
22. course section creation no longer depends on the deleted Firestore users collection
23. course sections and lessons now run through Mongo-backed repositories and server functions
24. lesson progress now persists in Mongo and updates aggregate student progress when lessons are completed
25. quizzes, course quizzes, and quiz attempts now persist through Mongo-backed repositories and server functions
26. quiz attempt submission now fixes attempt numbering and updates aggregate quiz metrics on student progress
27. activity logs now persist through a Mongo-backed repository and server functions
28. certificates now persist through a Mongo-backed repository and server functions
29. dashboard analytics and metrics no longer depend on Firestore reads for activity logs, certificates, or quiz attempts
30. live sessions now run through Mongo-backed repositories and server functions
31. notifications now run through Mongo-backed repositories and server functions
32. lesson resources now persist on Mongo-backed lesson documents and use Cloudinary for uploads
33. the app runtime no longer depends on Firebase packages or Firebase env configuration

Pending in the current slice:

1. self-service password recovery flow
2. cleanup or replacement of Firestore-specific admin scripts and workflows outside the active app runtime

**Recommended Scope**

For this repo, the cleanest plan is:

1. Remove Firebase entirely.
2. Add MongoDB as the system of record.
3. Add a server-side auth system instead of Firebase Auth.
4. Move all persistence and authorization behind server functions and repositories.

This is simpler than preserving Firebase because there is no data, no user ids, and no auth state to migrate.

**Architecture Target**

Target request flow:

1. React hooks call service methods.
2. Service methods call TanStack Start server functions.
3. Server functions call repositories.
4. Repositories talk to MongoDB.
5. Authentication is session-based and server-verified.

Target principles:

- no direct database access from the browser
- no client-side auth SDK dependency for core auth state
- authorization enforced in application code, not database rules
- string ids across the domain model for now

**Recommended Auth Direction**

Because the app is starting from zero, auth should be chosen by product needs, not by the current Firebase implementation.

Current recommendation:

1. local email/password auth backed by MongoDB
2. session-based server auth
3. no Google, Microsoft, phone, or organization auth in the active app flow

Defer unless clearly required later:

1. password reset flow
2. invitation-based account activation
3. organization-specific signup restrictions beyond domain checks

**What To Change First**

Start with the files that define the application boundary and current Firebase assumptions.

1. Firebase bootstrap
   - apps/afri-learn/src/actions/firebase.ts

   Why first:
   - this is the entry point for Firebase Auth and Firestore
   - once replacement foundations exist, this file should be deleted or reduced to a temporary compatibility shim

2. API composition root
   - apps/afri-learn/src/services/api.ts

   Why first:
   - this is the best place to preserve the existing frontend-facing method names while replacing implementations underneath

3. Auth implementation
   - apps/afri-learn/src/services/auth-service.ts
   - apps/afri-learn/src/providers/auth-provider.tsx
   - apps/afri-learn/src/server/auth.ts
   - apps/afri-learn/src/server/session.ts

   Why next:
   - these files assume Firebase user objects and Firebase sign-in flows
   - they need to be reworked before the rest of the app can rely on a stable new identity model

4. Tenant resolution
   - apps/afri-learn/src/services/tenant-service.ts
   - apps/afri-learn/src/actions/tenant.ts

   Why next:
   - tenant lookup is small, important, and a good first Mongo repository slice

5. Core learning domain
   - apps/afri-learn/src/schemas/course.ts
   - apps/afri-learn/src/schemas/course-section.ts
   - apps/afri-learn/src/schemas/course-lesson.ts
   - apps/afri-learn/src/schemas/course-quiz.ts

   Current status:
   - course CRUD, enrollment, sections, lessons, and course quizzes are now Mongo-backed

6. Progress and analytics
   - apps/afri-learn/src/schemas/student-progress.ts
   - apps/afri-learn/src/schemas/lesson-progress.ts
   - apps/afri-learn/src/schemas/course-progress.ts
   - apps/afri-learn/src/schemas/dashboard.ts

   Current status:
   - student-progress, lesson-progress, course-progress summaries, quizzes, quiz attempts, and dashboard reads are now Mongo-backed where they depend on users, courses, lessons, enrollments, and quizzes
   - activity logs and certificates are now Mongo-backed

7. Secondary domains
   - apps/afri-learn/src/schemas/notification.ts
   - apps/afri-learn/src/schemas/live-session.ts
   - apps/afri-learn/src/schemas/certificates.ts
   - apps/afri-learn/src/schemas/quiz-attempt.ts
   - apps/afri-learn/src/schemas/activity-log.ts

   Current status:
   - notifications and live sessions are now Mongo-backed
   - certificates, quiz attempts, and activity logs are now Mongo-backed
   - lesson resources are now stored on lesson documents and can upload to Cloudinary for images, PDFs, and videos

**Target Mongo Shape**

Use string ids across the application model even in MongoDB.

Recommended collections:

1. tenants
   - \_id: tenant id string
   - name
   - domain
   - subscriptionStatus
   - config

2. users
   - \_id: user id string
   - email
   - displayName
   - photoURL
   - role
   - tenantIds
   - subscriptions
   - preferences
   - createdAt
   - updatedAt
   - lastLoginAt
   - isActive
   - isPending

3. courses
   - \_id: course id string
   - tenantId
   - title
   - description
   - category
   - difficulty
   - published
   - publishedAt
   - sections
   - createdBy
   - createdByMeta
   - lastModifiedBy
   - enrollmentCount
   - completionCount
   - analytics counters
   - createdAt
   - updatedAt

4. courseSections
   - \_id: section id string
   - courseId
   - title
   - description
   - order
   - createdBy
   - updatedBy
   - createdAt
   - updatedAt

5. lessons
   - \_id: lesson id string
   - courseId
   - sectionId
   - title
   - order
   - content fields
   - isRequired
   - createdAt
   - updatedAt

6. courseQuizzes
   - \_id: course quiz id string
   - courseId
   - sectionId
   - lessonId
   - placement
   - order
   - quizId
   - createdAt
   - updatedAt

7. quizzes
   - \_id: quiz id string
   - courseId
   - title
   - questions
   - passingScore
   - createdAt
   - updatedAt

8. studentProgress
   - \_id: progress id string
   - tenantId
   - studentId
   - courseId
   - status
   - enrolledAt
   - lastAccessedAt
   - completedAt
   - completionPercentage
   - sectionProgress
   - timeSpentMinutes
   - averageQuizScore
   - totalLessonsCompleted
   - totalOptionalLessonsCompleted
   - totalRequiredLessons
   - totalQuizzesTaken
   - quizzesPassed

9. lessonProgress
   - \_id: progress id string
   - studentId
   - lessonId
   - courseId
   - isCompleted
   - completedAt
   - lastAccessedAt
   - timeSpent

10. notifications

- \_id: notification id string
- userId
- tenantId
- title
- body
- isRead
- createdAt

11. activityLogs

- \_id: log id string
- userId
- tenantId
- action
- method
- timestamp
- metadata

12. certificates

- \_id: certificate id string
- tenantId
- studentId
- courseId
- courseName
- studentName
- instructorName
- status
- issued
- modified
- downloadCount

13. quizAttempts

- \_id: attempt id string
- tenantId
- studentId
- courseId
- quizId
- score
- startedAt
- completedAt
- answers
- attemptNumber

14. liveSessions

- \_id: session id string
- tenantId
- courseId
- instructorId
- participants
- scheduledAt
- status
- meeting metadata

**Indexes To Create Early**

1. tenants
   - domain unique

2. users
   - email unique
   - tenantIds
   - role plus createdAt
   - isActive plus createdAt

3. courses
   - tenantId plus createdAt
   - tenantId plus published
   - tenantId plus category
   - tenantId plus difficulty

4. courseSections
   - courseId plus order

5. lessons
   - sectionId plus order
   - courseId plus order

6. studentProgress
   - studentId plus courseId unique
   - tenantId plus studentId plus enrolledAt
   - tenantId plus courseId
   - tenantId plus enrolledAt

7. lessonProgress
   - studentId plus lessonId unique
   - studentId plus courseId

8. notifications
   - userId plus createdAt
   - userId plus isRead

9. activityLogs
   - tenantId plus timestamp
   - userId plus timestamp

10. certificates

- tenantId plus issued.at
- studentId plus issued.at

11. quizAttempts

- studentId plus startedAt
- quizId plus studentId
- tenantId plus courseId

12. liveSessions

- courseId plus scheduledAt
- instructorId plus scheduledAt
- status plus scheduledAt

**Repository Structure To Add**

Recommended server-only modules:

1. apps/afri-learn/src/server/db/mongo.ts
   - Mongo client singleton
   - database selection
   - connection reuse

2. apps/afri-learn/src/server/auth/index.ts
   - auth config
   - session helpers
   - provider setup

3. apps/afri-learn/src/server/auth/guards.ts
   - requireAuth
   - requireRole
   - requireTenantAccess

4. apps/afri-learn/src/server/repositories/tenant-repository.ts
5. apps/afri-learn/src/server/repositories/user-repository.ts
6. apps/afri-learn/src/server/repositories/course-repository.ts
7. apps/afri-learn/src/server/repositories/course-section-repository.ts
8. apps/afri-learn/src/server/repositories/lesson-repository.ts
9. apps/afri-learn/src/server/repositories/student-progress-repository.ts
10. apps/afri-learn/src/server/repositories/activity-log-repository.ts

Keep the existing Zod schemas for validation where possible, but move persistence out of the current Firestore-backed modules.

**How To Refactor Without Breaking The Frontend**

Use an anti-corruption layer.

Phase 1 should preserve the current frontend API shape:

- hooks keep calling the same methods
- methods exposed through apps/afri-learn/src/services/api.ts keep the same names
- implementation moves from Firebase client SDK calls to server functions and repositories

That avoids rewriting the React layer and the persistence layer at the same time.

**Greenfield Cutover Plan**

1. Foundation
   - add mongodb dependency
   - add server-only Mongo client
   - add environment variables for Mongo URI, Mongo DB name, session cookie, and session secret
   - stop writing new code against Firebase APIs

2. Auth replacement
   - add session-based auth
   - implement email/password sign-in and sign-up
   - remove Firebase auth state assumptions from the app

3. Tenant repository
   - replace Firestore tenant lookup with Mongo-backed lookup
   - keep the existing tenant resolution contract where practical

4. User provisioning and management
   - provision Mongo user records on first login
   - store role, tenantIds, and account metadata in Mongo
   - update session helpers to read from the new user source
   - route admin user CRUD through Mongo-backed server functions

5. Core learning domain
   - port courses, sections, lessons, and quizzes to repositories
   - replace Firestore batch helpers with Mongo updates or transactions where needed

6. Learner progress
   - port lesson progress, student progress, and course progress
   - add indexes before testing data-heavy flows

7. Secondary features
   - port notifications, certificates, activity logs, quiz attempts, and live sessions

8. Analytics
   - keep analytics as application-side computation first
   - optimize later with aggregation pipelines only when real data exists

9. Cleanup
   - remove Firebase imports and packages
   - remove Firestore rules and indexes files if no longer needed
   - remove dead compatibility code

**What No Longer Needs To Exist**

Because there is no data and no Firebase Auth state, the following work is unnecessary:

1. Firestore export/import
2. dual write or staged read cutover
3. Firebase uid preservation
4. Firestore-to-Mongo data verification
5. temporary hybrid auth plan
6. OAuth provider migration

**What Needs Extra Care**

1. Auth scope
   - local email/password is now the active path
   - the remaining work is account lifecycle, not provider integration

2. Collection naming
   - the current codebase mixes names like lessons and course-sections
   - decide whether Mongo names should be normalized now or preserved initially to reduce code churn

3. Firestore-specific mutation helpers
   - arrayUnion, arrayRemove, increment, and writeBatch appear throughout the current code
   - these need explicit Mongo replacements, not line-by-line translation

4. Authorization ownership
   - Firestore rules currently carry part of the security model
   - once Firebase is removed, all authorization must be enforced in server code

5. Auth provider assumptions in the UI
   - apps/afri-learn/src/providers/auth-provider.tsx currently assumes Firebase user state
   - this file will need a real rewrite, not a small adaptation

**Estimated Timeline**

1. full Firebase removal with Mongo and standard auth, no phone auth
   - about 1 to 3 weeks

2. full Firebase removal with Mongo, password reset, and account lifecycle tooling
   - about 2 to 4 weeks

The main cost driver is now password lifecycle and remaining domain migration, not auth providers.

**Recommended First Implementation Sprint**

Sprint 1 should do only this:

1. add Mongo client and environment contract
2. add password-auth foundation
3. add tenant repository
4. replace tenant lookup
5. add user repository
6. replace user provisioning, CRUD, and session handling

Do not start with courses or analytics.

Deliverable for Sprint 1:

- Firebase is no longer required for auth and tenant resolution
- MongoDB is connected and used by real application paths
- the app has a stable identity model for the next domain slices

**Current Recommendation**

Recommended product scope for v1:

1. MongoDB for all application data
2. Mongo-backed email/password auth
3. session-based server auth
4. postpone password reset until the remaining Mongo domain slices are stable

**Next Step**

Next implementation slice:

1. add password reset and password change flows
2. migrate the course and progress domains off Firestore
3. remove Firebase once no Firestore-backed slices remain
4. replace tenant lookup
5. replace user provisioning and session handling
