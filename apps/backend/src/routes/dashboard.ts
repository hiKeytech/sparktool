import { Router } from "express";

import { computeBasicAnalytics } from "../lib/analytics/basic-counts.js";
import { getTimeframeStartDate } from "../lib/analytics/date-ranges.js";
import { computeActiveUsers, computeCompletionRate, computePopularCourses } from "../lib/analytics/engagement.js";
import { computeBasicMetrics } from "../lib/metrics/basic.js";
import { computeEngagementMetrics } from "../lib/metrics/engagement.js";
import { computeInsights } from "../lib/metrics/insights.js";
import { computeLearningPatterns } from "../lib/metrics/learning-patterns.js";
import { computeMonthlyTrends } from "../lib/metrics/monthly-trends.js";
import { computeStudentPerformance } from "../lib/metrics/performance.js";
import { computeTrendMetrics } from "../lib/metrics/trend-metrics.js";
import { activityLogRepository } from "../repositories/activity-log-repository.js";
import { certificateRepository } from "../repositories/certificate-repository.js";
import { courseRepository } from "../repositories/course-repository.js";
import { quizAttemptRepository } from "../repositories/quiz-attempt-repository.js";
import { studentProgressRepository } from "../repositories/student-progress-repository.js";
import { userRepository } from "../repositories/user-repository.js";
import { requireSession, requireTenantSession } from "../middleware/session.js";

export const dashboardRouter = Router();

dashboardRouter.get("/analytics", requireTenantSession, async (request, response) => {
  try {
    const { tenantId } = request.session;
    const timeframe = (request.query.timeframe as string) || "month";
    const startDate = getTimeframeStartDate(timeframe as any).getTime();

    const [activities, progressData, users, courses] = await Promise.all([
      activityLogRepository.list({ tenantId, userId: "*" }).then((logs) =>
        logs.filter((log) => log.userId !== "*" && log.timestamp !== null && (log.timestamp as number) >= startDate)
      ),
      studentProgressRepository.listByTenant(tenantId, { enrolledAfter: startDate }),
      userRepository.list(tenantId),
      courseRepository.list(tenantId),
    ]);

    const activeUsers = computeActiveUsers(activities);
    const popularCourses = computePopularCourses(activities);
    const { totalCompletions } = computeCompletionRate(progressData);
    const { totalCourses, totalEnrollments, totalStudents } = computeBasicAnalytics(users, courses, progressData);

    response.json({ activeUsers, popularCourses, totalCompletions, totalCourses, totalEnrollments, totalStudents });
  } catch (error) {
    response.status(500).json({ message: error instanceof Error ? error.message : "Internal server error" });
  }
});

dashboardRouter.get("/metrics", requireSession, async (request, response) => {
  try {
    const tenantId = (request.query.tenantId as string) || request.session?.tenantId;

    if (!tenantId) {
      return response.status(400).json({ message: "tenantId is required" });
    }

    const [users, courses, enrollments, certificates, activityLogs, quizAttempts] = await Promise.all([
      userRepository.list(tenantId),
      courseRepository.list(tenantId),
      studentProgressRepository.listByTenant(tenantId),
      certificateRepository.list({ tenantId }),
      activityLogRepository.list({ tenantId, userId: "*" }).then((logs) => logs.filter((l) => l.userId !== "*")),
      quizAttemptRepository.list().then((attempts) => {
        const courseIds = new Set(courses.map((c) => c.id).filter(Boolean));
        return attempts.filter((a) => courseIds.has(a.courseId));
      }),
    ]);

    const basicMetrics = computeBasicMetrics(users, courses, enrollments, certificates);
    const engagement = computeEngagementMetrics(activityLogs, users);
    const learningPatterns = computeLearningPatterns(activityLogs);
    const insights = computeInsights(enrollments, courses, activityLogs, users);
    const studentPerformance = computeStudentPerformance(quizAttempts, users, activityLogs);
    const monthlyTrends = computeMonthlyTrends(enrollments, certificates, activityLogs);
    const trends = computeTrendMetrics(users, courses, enrollments, certificates);

    response.json({ ...basicMetrics, engagement, insights, learningPatterns, monthlyTrends, studentPerformance, trends });
  } catch (error) {
    response.status(500).json({ message: error instanceof Error ? error.message : "Internal server error" });
  }
});
