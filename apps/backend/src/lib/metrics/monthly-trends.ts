import { isWithinInterval } from "date-fns";
import { now } from "./dates";
export interface MonthlyTrend {
  activeUsers: number;
  certificatesIssued: number;
  completions: number;
  enrollments: number;
  month: string;
}
export function computeMonthlyTrends(
  enrollments: any[],
  certificates: any[],
  activityLogs: any[],
): MonthlyTrend[] {
  const trends: MonthlyTrend[] = [];
  for (let i = 5; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);
    const inRange = (d: any) =>
      d && isWithinInterval(new Date(d), { start: monthStart, end: monthEnd });
    trends.push({
      activeUsers: new Set(
        activityLogs.filter((l) => inRange(l.timestamp)).map((l) => l.userId),
      ).size,
      certificatesIssued: certificates.filter((c) => inRange(c.issueDate))
        .length,
      completions: enrollments.filter((e) => inRange(e.completedAt)).length,
      enrollments: enrollments.filter((e) => inRange(e.enrolledAt)).length,
      month: monthStart.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
    });
  }
  return trends;
}
