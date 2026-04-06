import { isAfter } from "date-fns";

import { oneWeekAgo } from "./dates";

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
  certificates: any[]
): BasicMetrics {
  const activeStudents = users.filter(
    (user) => user.role === "student" && user.isActive
  );

  const publishedCourses = courses.filter((course) => course.published);

  const completedEnrollments = enrollments.filter(
    (enrollment) => enrollment.status === "completed"
  );

  const inProgressEnrollments = enrollments.filter(
    (enrollment) =>
      enrollment.status === "in-progress" &&
      (enrollment.completionPercentage || 0) > 0
  );

  const totalActiveStudents = activeStudents.length;
  const activeCoursesCount = publishedCourses.length;
  const certificatesIssued = certificates.length;

  const completionRate =
    enrollments.length > 0
      ? Math.round((completedEnrollments.length / enrollments.length) * 100) /
      100
      : 0;

  const coursesInProgress = inProgressEnrollments.length;

  // Calculate average progress
  const totalProgress = enrollments.reduce(
    (sum, enrollment) => sum + (enrollment.completionPercentage || 0),
    0
  );
  const averageProgress =
    enrollments.length > 0 ? Math.round(totalProgress / enrollments.length) : 0;

  // New enrollments this week
  const newEnrollmentsThisWeek = enrollments.filter(
    (enrollment) =>
      enrollment.enrolledAt &&
      isAfter(enrollment.enrolledAt.toDate(), oneWeekAgo)
  ).length;

  return {
    activeCoursesCount,
    averageProgress,
    certificatesIssued,
    completionRate,
    coursesInProgress,
    newEnrollmentsThisWeek,
    totalActiveStudents,
  };
}
