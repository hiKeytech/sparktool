import { isAfter } from "date-fns";
import { oneWeekAgo } from "./dates.js";
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
  users: any[],
): EngagementMetrics {
  const activeStudents = users.filter(
    (u) => u.role === "student" && u.isActive,
  );
  const recentActivityUsers = new Set(
    activityLogs
      .filter((l) => l.timestamp && isAfter(new Date(l.timestamp), oneWeekAgo))
      .map((l) => l.userId),
  );
  const dailyActiveUsers = recentActivityUsers.size;
  const totalActiveStudents = activeStudents.length;
  const courseEngagementRate =
    totalActiveStudents > 0
      ? Math.round((dailyActiveUsers / totalActiveStudents) * 100)
      : 0;
  const studyActivities = activityLogs.filter(
    (l) =>
      l.action === "video_watched" &&
      l.timestamp &&
      isAfter(new Date(l.timestamp), oneWeekAgo),
  );
  const totalStudyMinutes =
    studyActivities.reduce((s, l) => s + (l.details?.duration || 0), 0) / 60;
  const averageStudyTimePerDay =
    studyActivities.length > 0 ? Math.round(totalStudyMinutes / 7) : 0;
  const platformUtilizationRate =
    totalActiveStudents > 0
      ? Math.round((dailyActiveUsers / totalActiveStudents) * 100)
      : 0;
  return {
    averageStudyTimePerDay,
    contentQualityScore: null,
    courseEngagementRate,
    dailyActiveUsers,
    platformUtilizationRate,
    studentSatisfactionScore: null,
  };
}
