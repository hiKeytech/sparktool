import { Router } from "express";

import { computeBasicAnalytics } from "../lib/analytics/basic-counts";
import { getTimeframeStartDate } from "../lib/analytics/date-ranges";
import {
  computeActiveUsers,
  computeCompletionRate,
  computePopularCourses,
} from "../lib/analytics/engagement";
import { computeBasicMetrics } from "../lib/metrics/basic";
import { computeEngagementMetrics } from "../lib/metrics/engagement";
import { computeInsights } from "../lib/metrics/insights";
import { computeLearningPatterns } from "../lib/metrics/learning-patterns";
import { computeMonthlyTrends } from "../lib/metrics/monthly-trends";
import { computeStudentPerformance } from "../lib/metrics/performance";
import { computeTrendMetrics } from "../lib/metrics/trend-metrics";
import { activityLogRepository } from "../repositories/activity-log-repository";
import { certificateRepository } from "../repositories/certificate-repository";
import { courseRepository } from "../repositories/course-repository";
import { quizAttemptRepository } from "../repositories/quiz-attempt-repository";
import { studentProgressRepository } from "../repositories/student-progress-repository";
import { userRepository } from "../repositories/user-repository";
import { requireSession, requireTenantSession } from "../middleware/session";

export const dashboardRouter = Router();

dashboardRouter.get(
  "/analytics",
  requireTenantSession,
  async (request, response) => {
    try {
      const tenantId = request.session.activeTenantId!;
      const timeframe = (request.query.timeframe as string) || "month";
      const startDate = getTimeframeStartDate(timeframe as any).getTime();

      const [activities, progressData, users, courses] = await Promise.all([
        activityLogRepository
          .list({ tenantId, userId: "*" })
          .then((logs) =>
            logs.filter(
              (log) =>
                log.userId !== "*" &&
                log.timestamp !== null &&
                (log.timestamp as number) >= startDate,
            ),
          ),
        studentProgressRepository.listByTenant(tenantId, {
          enrolledAfter: startDate,
        }),
        userRepository.list(tenantId),
        courseRepository.list(tenantId),
      ]);

      const activeUsers = computeActiveUsers(activities);
      const popularCourses = computePopularCourses(activities);
      const { totalCompletions } = computeCompletionRate(progressData);
      const { totalCourses, totalEnrollments, totalStudents } =
        computeBasicAnalytics(users, courses, progressData);

      response.json({
        activeUsers,
        popularCourses,
        totalCompletions,
        totalCourses,
        totalEnrollments,
        totalStudents,
      });
    } catch (error) {
      response.status(500).json({
        message:
          error instanceof Error ? error.message : "Internal server error",
      });
    }
  },
);

dashboardRouter.get("/metrics", requireSession, async (request, response) => {
  try {
    const tenantId =
      (request.query.tenantId as string) || request.session?.activeTenantId;

    if (!tenantId) {
      return response.status(400).json({ message: "tenantId is required" });
    }

    const [
      users,
      courses,
      enrollments,
      certificates,
      activityLogs,
      rawAttempts,
    ] = await Promise.all([
      userRepository.list(tenantId),
      courseRepository.list(tenantId),
      studentProgressRepository.listByTenant(tenantId),
      certificateRepository.list({ tenantId }),
      activityLogRepository
        .list({ tenantId, userId: "*" })
        .then((logs) => logs.filter((l) => l.userId !== "*")),
      quizAttemptRepository.list(),
    ]);
    const courseIds = new Set(courses.map((c) => c.id).filter(Boolean));
    const quizAttempts = rawAttempts.filter((a) => courseIds.has(a.courseId));

    const basicMetrics = computeBasicMetrics(
      users,
      courses,
      enrollments,
      certificates,
    );
    const engagement = computeEngagementMetrics(activityLogs, users);
    const learningPatterns = computeLearningPatterns(activityLogs);
    const insights = computeInsights(enrollments, courses, activityLogs, users);
    const studentPerformance = computeStudentPerformance(
      quizAttempts,
      users,
      activityLogs,
    );
    const monthlyTrends = computeMonthlyTrends(
      enrollments,
      certificates,
      activityLogs,
    );
    const trends = computeTrendMetrics(
      users,
      courses,
      enrollments,
      certificates,
    );

    response.json({
      ...basicMetrics,
      engagement,
      insights,
      learningPatterns,
      monthlyTrends,
      studentPerformance,
      trends,
    });
  } catch (error) {
    response.status(500).json({
      message: error instanceof Error ? error.message : "Internal server error",
    });
  }
});
