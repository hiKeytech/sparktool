import type { Course, User } from "@/types";

/**
 * Aggregate basic analytics counts
 */
export function computeBasicAnalytics(
  users: User[],
  courses: Course[],
  progressData: Array<unknown>
) {
  return {
    totalCourses: countCourses(courses),
    totalEnrollments: countEnrollments(progressData),
    totalStudents: countStudents(users),
  };
}

/**
 * Count total courses
 */
export function countCourses(courses: Course[]): number {
  return courses.length;
}

/**
 * Count total enrollments
 */
export function countEnrollments(progressData: Array<unknown>): number {
  return progressData.length;
}

/**
 * Count total students from users data
 */
export function countStudents(users: User[]): number {
  return users.filter((user) => user.role === "student").length;
}
