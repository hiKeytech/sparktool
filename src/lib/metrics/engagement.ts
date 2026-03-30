import { isAfter } from "date-fns";

import { oneWeekAgo } from "./dates";

export interface EngagementMetrics {
  averageStudyTimePerDay: number;
  contentQualityScore: null | number;
  courseEngagementRate: number;
  dailyActiveUsers: number;
  platformUtilizationRate: number;
  studentSatisfactionScore: null | number;
}

export function computeEngagementMetrics(
  activityLogs: any[],
  users: any[]
): EngagementMetrics {
  const activeStudents = users.filter(
    (user) => user.role === "student" && user.isActive
  );

  const recentActivityUsers = new Set(
    activityLogs
      .filter(
        (log) => log.timestamp && isAfter(log.timestamp.toDate(), oneWeekAgo)
      )
      .map((log) => log.userId)
  );

  const dailyActiveUsers = recentActivityUsers.size;
  const totalActiveStudents = activeStudents.length;

  const courseEngagementRate =
    totalActiveStudents > 0
      ? Math.round((dailyActiveUsers / totalActiveStudents) * 100)
      : 0;

  // Calculate average study time (from activity logs)
  const studyActivities = activityLogs.filter(
    (log) =>
      log.action === "video_watched" &&
      log.timestamp &&
      isAfter(log.timestamp.toDate(), oneWeekAgo)
  );

  const totalStudyMinutes =
    studyActivities.reduce(
      (sum, log) => sum + (log.details?.duration || 0),
      0
    ) / 60; // Convert to minutes

  const averageStudyTimePerDay =
    studyActivities.length > 0 ? Math.round(totalStudyMinutes / 7) : 0;

  const platformUtilizationRate =
    totalActiveStudents > 0
      ? Math.round((dailyActiveUsers / totalActiveStudents) * 100)
      : 0;

  return {
    averageStudyTimePerDay,
    contentQualityScore: null, // Would be calculated from course completion rates and ratings when implemented
    courseEngagementRate,
    dailyActiveUsers,
    platformUtilizationRate,
    studentSatisfactionScore: null, // Would come from course ratings when implemented
  };
}
