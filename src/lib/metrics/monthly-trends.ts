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
  activityLogs: any[]
): MonthlyTrend[] {
  const monthlyTrends: MonthlyTrend[] = [];

  for (let i = 5; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 0);

    const monthEnrollments = enrollments.filter(
      (enrollment) =>
        enrollment.enrolledAt &&
        isWithinInterval(enrollment.enrolledAt.toDate(), {
          end: monthEnd,
          start: monthStart,
        })
    ).length;

    const monthCompletions = enrollments.filter(
      (enrollment) =>
        enrollment.completedAt &&
        isWithinInterval(enrollment.completedAt.toDate(), {
          end: monthEnd,
          start: monthStart,
        })
    ).length;

    const monthActiveUsers = new Set(
      activityLogs
        .filter(
          (log) =>
            log.timestamp &&
            isWithinInterval(log.timestamp.toDate(), {
              end: monthEnd,
              start: monthStart,
            })
        )
        .map((log) => log.userId)
    ).size;

    const monthCertificates = certificates.filter(
      (cert) =>
        cert.issueDate &&
        isWithinInterval(cert.issueDate.toDate(), {
          end: monthEnd,
          start: monthStart,
        })
    ).length;

    monthlyTrends.push({
      activeUsers: monthActiveUsers,
      certificatesIssued: monthCertificates,
      completions: monthCompletions,
      enrollments: monthEnrollments,
      month: monthStart.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
    });
  }

  return monthlyTrends;
}
