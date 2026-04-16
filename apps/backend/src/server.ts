import "dotenv/config";
import cors from "cors";
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import helmet from "helmet";
import { PlatformConfigService } from "./services/platform-config-service.js";
import { TenantService } from "./services/tenant-service.js";
import { getActorFromSession, httpError } from "./lib/request-helpers.js";

import { sessionMiddleware } from "./middleware/session.js";
import { requireSession } from "./middleware/session.js";
import { authRouter } from "./routes/auth.js";
import { usersRouter } from "./routes/users.js";
import { coursesRouter } from "./routes/courses.js";
import {
  sectionsRouter,
  sectionByIdRouter,
  lessonsRouter,
  lessonByIdRouter,
  courseLessonsRouter,
} from "./routes/course-structure.js";
import { courseQuizzesRouter } from "./routes/course-quizzes.js";
import { quizzesRouter } from "./routes/quizzes.js";
import { quizAttemptsRouter } from "./routes/quiz-attempts.js";
import { lessonProgressRouter } from "./routes/lesson-progress.js";
import { studentProgressRouter } from "./routes/student-progress.js";
import { certificatesRouter } from "./routes/certificates.js";
import { liveSessionsRouter } from "./routes/live-sessions.js";
import { notificationsRouter } from "./routes/notifications.js";
import { activityLogsRouter } from "./routes/activity-logs.js";
import { tenantsRouter } from "./routes/tenants.js";
import { dashboardRouter } from "./routes/dashboard.js";
import { lessonResourcesRouter } from "./routes/lesson-resources.js";

const app = express();
const port = Number(process.env.PORT || 4000);

app.set("trust proxy", 1);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(sessionMiddleware);

app.get("/health", (_request, response) => {
  response.json({
    service: "sparktool-backend",
    status: "ok",
    timestamp: Date.now(),
  });
});

app.get("/api/platform-config", async (_request, response) => {
  const config = await PlatformConfigService.getPlatformConfig();

  if (!config) {
    response.status(404).json({ error: "Platform config not found" });
    return;
  }

  response.json(config);
});

app.patch("/api/platform-config", requireSession, async (request, response) => {
  const actor = await getActorFromSession(request);

  if (!actor || actor.role !== "super-admin") {
    throw httpError(
      403,
      "Only platform administrators can update platform config.",
    );
  }

  const updated = await PlatformConfigService.updatePlatformConfig({
    ...request.body,
    id: "platform",
  });

  if (!updated) {
    throw httpError(500, "Failed to update platform config.");
  }

  response.json(updated);
});

app.get("/api/tenants/:tenantId", async (request, response) => {
  const tenant = await TenantService.getTenantById(request.params.tenantId);

  if (!tenant) {
    response.status(404).json({ error: "Tenant not found" });
    return;
  }

  response.json(tenant);
});

app.get("/api/tenants/by-host", async (request, response) => {
  const host = request.hostname;

  if (!host) {
    response.status(400).json({ error: "A valid host query is required" });
    return;
  }

  const tenant = await TenantService.getTenantByHost(host);

  if (!tenant) {
    response.status(404).json({ error: "Tenant not found" });
    return;
  }

  response.json(tenant);
});

// ─── API routers ─────────────────────────────────────────────────────────────

app.use("/api/tenants", tenantsRouter);
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/courses/:courseId/sections/reorder", sectionsRouter);
app.use("/api/courses/:courseId/sections", sectionsRouter);
app.use("/api/courses/:courseId/lessons", courseLessonsRouter);
app.use("/api/sections/:sectionId/lessons/reorder", lessonsRouter);
app.use("/api/sections/:sectionId/lessons", lessonsRouter);
app.use("/api/sections", sectionByIdRouter);
app.use("/api/lessons", lessonByIdRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/course-quizzes", courseQuizzesRouter);
app.use("/api/quizzes", quizzesRouter);
app.use("/api/quiz-attempts", quizAttemptsRouter);
app.use("/api/lesson-progress", lessonProgressRouter);
app.use("/api/student-progress", studentProgressRouter);
app.use("/api/certificates", certificatesRouter);
app.use("/api/live-sessions", liveSessionsRouter);
app.use("/api/notifications", notificationsRouter);
app.use("/api/activity-logs", activityLogsRouter);
app.use("/api/dashboard", dashboardRouter);
app.use("/api/lesson-resources", lessonResourcesRouter);

// ─── global error handler ────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const status = (err as { status?: number })?.status ?? 500;
  const message =
    (err as { message?: string })?.message ?? "Internal Server Error";
  res.status(status).json({ error: message });
});

app.listen(port, () => {
  console.log(`sparktool-backend listening on http://localhost:${port}`);
});
