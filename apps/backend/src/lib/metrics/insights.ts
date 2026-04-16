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
  users: any[],
): InsightsMetrics {
  const courseCategoryCount = courses.reduce(
    (acc: Record<string, number>, c) => {
      if (c.category) acc[c.category] = (acc[c.category] || 0) + 1;
      return acc;
    },
    {},
  );
  const topCourseCategory =
    Object.entries(courseCategoryCount).sort(
      ([, a], [, b]) => (b as number) - (a as number),
    )?.[0]?.[0] ?? null;
  const completedEnrollments = enrollments.filter(
    (e) => e.status === "completed",
  );
  const completionTimes = completedEnrollments
    .filter((e) => e.enrolledAt && e.completedAt)
    .map((e) =>
      Math.ceil(
        (new Date(e.completedAt).getTime() - new Date(e.enrolledAt).getTime()) /
          (1000 * 60 * 60 * 24),
      ),
    );
  const averageCompletionDays =
    completionTimes.length > 0
      ? Math.round(
          completionTimes.reduce((s, d) => s + d, 0) / completionTimes.length,
        )
      : 30;
  const dayActivity = Array(7).fill(0);
  activityLogs.forEach((l) => {
    if (l.timestamp) dayActivity[new Date(l.timestamp).getDay()]++;
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
  const recentActivityUsers = new Set(
    activityLogs
      .filter((l) => l.timestamp && isAfter(new Date(l.timestamp), oneWeekAgo))
      .map((l) => l.userId),
  );
  const weekOldUsers = users.filter(
    (u) => u.createdAt && isAfter(new Date(u.createdAt), oneWeekAgo),
  );
  const activeWeekOldUsers = weekOldUsers.filter((u) =>
    recentActivityUsers.has(u.id),
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
