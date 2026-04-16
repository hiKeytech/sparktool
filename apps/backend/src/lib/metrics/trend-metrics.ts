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
  certificates: any[],
): TrendMetrics {
  const activeStudents = users.filter(
    (u) => u.role === "student" && u.isActive,
  );
  const publishedCourses = courses.filter((c) => c.published);
  const inPrev = (d: any) =>
    d &&
    isWithinInterval(new Date(d), { start: twoMonthsAgo, end: oneMonthAgo });
  const prevStudents = users.filter(
    (u) =>
      u.role === "student" && u.isActive && u.createdAt && inPrev(u.createdAt),
  ).length;
  const prevCourses = courses.filter(
    (c) => c.published && c.createdAt && inPrev(c.createdAt),
  ).length;
  const currCompletions = enrollments.filter(
    (e) =>
      e.status === "completed" &&
      e.completedAt &&
      isAfter(new Date(e.completedAt), oneMonthAgo),
  ).length;
  const prevCompletions = enrollments.filter(
    (e) => e.status === "completed" && e.completedAt && inPrev(e.completedAt),
  ).length;
  const currCerts = certificates.filter(
    (c) => c.issueDate && isAfter(new Date(c.issueDate), oneMonthAgo),
  ).length;
  const prevCerts = certificates.filter(
    (c) => c.issueDate && inPrev(c.issueDate),
  ).length;
  return {
    activeCourses: calculateTrend(publishedCourses.length, prevCourses),
    certificates: calculateTrend(currCerts, prevCerts),
    completionRate: calculateTrend(currCompletions, prevCompletions),
    totalStudents: calculateTrend(activeStudents.length, prevStudents),
  };
}
