import { isAfter } from "date-fns";

import { oneWeekAgo } from "./dates";

export interface InsightsMetrics {
  averageCompletionDays: number;
  mostActiveDay: string;
  retentionRate: number;
  topCourseCategory: null | string;
}

export function computeInsights(
  enrollments: any[],
  courses: any[],
  activityLogs: any[],
  users: any[]
): InsightsMetrics {
  // Top course category - return null instead of fake default
  const courseCategoryCount = courses.reduce((acc, course) => {
    const category = course.category;
    if (category) {
      acc[category] = (acc[category] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const topCourseCategory =
    Object.entries(courseCategoryCount).sort(
      ([, a], [, b]) => (b as number) - (a as number)
    )?.[0]?.[0] ?? null;

  // Calculate average completion days
  const completedEnrollments = enrollments.filter(
    (enrollment) => enrollment.status === "completed"
  );

  const completionTimes = completedEnrollments
    .filter((enrollment) => enrollment.enrolledAt && enrollment.completedAt)
    .map((enrollment) => {
      const enrolled = enrollment.enrolledAt.toDate();
      const completed = enrollment.completedAt.toDate();
      return Math.ceil(
        (completed.getTime() - enrolled.getTime()) / (1000 * 60 * 60 * 24)
      );
    });

  const averageCompletionDays =
    completionTimes.length > 0
      ? Math.round(
          completionTimes.reduce((sum, days) => sum + days, 0) /
          completionTimes.length
        )
      : 30;

  // Most active day
  const dayActivity = Array(7).fill(0);
  activityLogs.forEach((log) => {
    if (log.timestamp) {
      const day = log.timestamp.toDate().getDay();
      dayActivity[day]++;
    }
  });

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const mostActiveDay = dayNames[dayActivity.indexOf(Math.max(...dayActivity))];

  // 7-day retention rate
  const recentActivityUsers = new Set(
    activityLogs
      .filter(
        (log) => log.timestamp && isAfter(log.timestamp.toDate(), oneWeekAgo)
      )
      .map((log) => log.userId)
  );

  const weekOldUsers = users.filter((user) => {
    if (!user.createdAt) return false;
    const created = user.createdAt.toDate();
    return isAfter(created, oneWeekAgo);
  });

  const activeWeekOldUsers = weekOldUsers.filter((user) =>
    recentActivityUsers.has(user.id)
  );

  const retentionRate =
    weekOldUsers.length > 0
      ? Math.round((activeWeekOldUsers.length / weekOldUsers.length) * 100)
      : 0;

  return {
    averageCompletionDays,
    mostActiveDay,
    retentionRate,
    topCourseCategory,
  };
}
