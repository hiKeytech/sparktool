import type { TrendData } from "./trends";

import { isAfter, isWithinInterval } from "date-fns";

import { oneMonthAgo, twoMonthsAgo } from "./dates";
import { calculateTrend } from "./trends";

export interface TrendMetrics {
  activeCourses: TrendData;
  certificates: TrendData;
  completionRate: TrendData;
  totalStudents: TrendData;
}

export function computeTrendMetrics(
  users: any[],
  courses: any[],
  enrollments: any[],
  certificates: any[]
): TrendMetrics {
  // Current month vs previous month data
  const activeStudents = users.filter(
    (user) => user.role === "student" && user.isActive
  );

  const publishedCourses = courses.filter((course) => course.published);

  // Previous month data
  const previousMonthStudents = users.filter(
    (user) =>
      user.role === "student" &&
      user.isActive &&
      user.createdAt &&
      isWithinInterval(user.createdAt.toDate(), {
        end: oneMonthAgo,
        start: twoMonthsAgo,
      })
  ).length;

  const previousMonthCourses = courses.filter(
    (course) =>
      course.published &&
      course.createdAt &&
      isWithinInterval(course.createdAt.toDate(), {
        end: oneMonthAgo,
        start: twoMonthsAgo,
      })
  ).length;

  const currentMonthCompletions = enrollments.filter(
    (enrollment) =>
      enrollment.status === "completed" &&
      enrollment.completedAt &&
      isAfter(enrollment.completedAt.toDate(), oneMonthAgo)
  ).length;

  const previousMonthCompletions = enrollments.filter(
    (enrollment) =>
      enrollment.status === "completed" &&
      enrollment.completedAt &&
      isWithinInterval(enrollment.completedAt.toDate(), {
        end: oneMonthAgo,
        start: twoMonthsAgo,
      })
  ).length;

  const currentMonthCertificates = certificates.filter(
    (cert) => cert.issueDate && isAfter(cert.issueDate.toDate(), oneMonthAgo)
  ).length;

  const previousMonthCertificates = certificates.filter(
    (cert) =>
      cert.issueDate &&
      isWithinInterval(cert.issueDate.toDate(), {
        end: oneMonthAgo,
        start: twoMonthsAgo,
      })
  ).length;

  return {
    activeCourses: calculateTrend(
      publishedCourses.length,
      previousMonthCourses
    ),
    certificates: calculateTrend(
      currentMonthCertificates,
      previousMonthCertificates
    ),
    completionRate: calculateTrend(
      currentMonthCompletions,
      previousMonthCompletions
    ),
    totalStudents: calculateTrend(activeStudents.length, previousMonthStudents),
  };
}
