import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { computeBasicAnalytics } from "@/lib/analytics/basic-counts";
import { getTimeframeStartDate } from "@/lib/analytics/date-ranges";
import {
  computeActiveUsers,
  computeCompletionRate,
  computePopularCourses,
} from "@/lib/analytics/engagement";
import { computeBasicMetrics } from "@/lib/metrics/basic";
import { computeEngagementMetrics } from "@/lib/metrics/engagement";
import { computeInsights } from "@/lib/metrics/insights";
import { computeLearningPatterns } from "@/lib/metrics/learning-patterns";
import { computeMonthlyTrends } from "@/lib/metrics/monthly-trends";
import { computeStudentPerformance } from "@/lib/metrics/performance";
import { computeTrendMetrics } from "@/lib/metrics/trend-metrics";
import { activityLogRepository } from "@/server/repositories/activity-log-repository";
import { certificateRepository } from "@/server/repositories/certificate-repository";
import { courseRepository } from "@/server/repositories/course-repository";
import { quizAttemptRepository } from "@/server/repositories/quiz-attempt-repository";
import { studentProgressRepository } from "@/server/repositories/student-progress-repository";
import { userRepository } from "@/server/repositories/user-repository";

import type { DashboardMetrics } from "@/types";

const dashboardAnalyticsInputSchema = z.object({
  tenantId: z.string().min(1),
  timeframe: z.enum(["month", "week", "year"]).default("month"),
});

const dashboardMetricsInputSchema = z.object({
  tenantId: z.string().min(1),
});

export const getDashboardAnalyticsFn = createServerFn({ method: "GET" })
  .inputValidator(dashboardAnalyticsInputSchema)
  .handler(async ({ data }) => {
    const startDate = getTimeframeStartDate(data.timeframe).getTime();
    const [activities, progressData, users, courses] = await Promise.all([
      activityLogRepository
        .list({
          tenantId: data.tenantId,
          userId: "*",
        })
        .then((logs) =>
          logs.filter(
            (log) =>
              log.userId !== "*" &&
              log.timestamp !== null &&
              log.timestamp >= startDate,
          ),
        ),
      studentProgressRepository.listByTenant(data.tenantId, {
        enrolledAfter: startDate,
      }),
      userRepository.list(data.tenantId),
      courseRepository.list(data.tenantId),
    ]);

    const activeUsers = computeActiveUsers(activities);
    const popularCourses = computePopularCourses(activities);
    const { totalCompletions } = computeCompletionRate(progressData);
    const { totalCourses, totalEnrollments, totalStudents } =
      computeBasicAnalytics(users, courses, progressData);

    return {
      activeUsers,
      popularCourses,
      totalCompletions,
      totalCourses,
      totalEnrollments,
      totalStudents,
    };
  });

export const getDashboardMetricsFn = createServerFn({ method: "GET" })
  .inputValidator(dashboardMetricsInputSchema)
  .handler(async ({ data }) => {
    const [
      users,
      courses,
      enrollments,
      certificates,
      activityLogs,
      quizAttempts,
    ] = await Promise.all([
      userRepository.list(data.tenantId),
      courseRepository.list(data.tenantId),
      studentProgressRepository.listByTenant(data.tenantId),
      certificateRepository.list({ tenantId: data.tenantId }),
      activityLogRepository
        .list({ tenantId: data.tenantId, userId: "*" })
        .then((logs) => logs.filter((log) => log.userId !== "*")),
      quizAttemptRepository.list().then((attempts) => {
        const tenantCourseIds = new Set(
          courses.map((course) => course.id).filter(Boolean),
        );
        return attempts.filter((attempt) =>
          tenantCourseIds.has(attempt.courseId),
        );
      }),
    ]);

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

    return {
      ...basicMetrics,
      engagement,
      insights,
      learningPatterns,
      monthlyTrends,
      studentPerformance,
      trends,
    } as DashboardMetrics;
  });
