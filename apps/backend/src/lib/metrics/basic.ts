import { isAfter } from "date-fns";
import { oneWeekAgo } from "./dates.js";
export interface BasicMetrics {
  activeCoursesCount: number;
  averageProgress: number;
  certificatesIssued: number;
  completionRate: number;
  coursesInProgress: number;
  newEnrollmentsThisWeek: number;
  totalActiveStudents: number;
}
export function computeBasicMetrics(
  users: any[],
  courses: any[],
  enrollments: any[],
  certificates: any[],
): BasicMetrics {
  const activeStudents = users.filter(
    (u) => u.role === "student" && u.isActive,
  );
  const publishedCourses = courses.filter((c) => c.published);
  const completedEnrollments = enrollments.filter(
    (e) => e.status === "completed",
  );
  const inProgressEnrollments = enrollments.filter(
    (e) => e.status === "in-progress" && (e.completionPercentage || 0) > 0,
  );
  const completionRate =
    enrollments.length > 0
      ? Math.round((completedEnrollments.length / enrollments.length) * 100)
      : 0;
  const totalProgress = enrollments.reduce(
    (sum, e) => sum + (e.completionPercentage || 0),
    0,
  );
  const averageProgress =
    enrollments.length > 0 ? Math.round(totalProgress / enrollments.length) : 0;
  const newEnrollmentsThisWeek = enrollments.filter(
    (e) =>
      e.enrolledAt &&
      isAfter(
        e.enrolledAt instanceof Date ? e.enrolledAt : new Date(e.enrolledAt),
        oneWeekAgo,
      ),
  ).length;
  return {
    activeCoursesCount: publishedCourses.length,
    averageProgress,
    certificatesIssued: certificates.length,
    completionRate,
    coursesInProgress: inProgressEnrollments.length,
    newEnrollmentsThisWeek,
    totalActiveStudents: activeStudents.length,
  };
}
