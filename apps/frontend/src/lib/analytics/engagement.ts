import type { ActivityLog } from "@/types";

/**
 * Calculate active users from activity logs
 */
export function computeActiveUsers(activities: ActivityLog[]): number {
  const uniqueUserIds = new Set(activities.map(({ userId }) => userId));
  return uniqueUserIds.size;
}

/**
 * Count completion rate from student progress data
 */
export function computeCompletionRate(
  progressData: Array<{ status: string }>
): {
  completionRate: number;
  totalCompletions: number;
} {
  const completions = progressData.filter(
    (progress) => progress.status === "completed"
  );
  const totalCompletions = completions.length;
  const completionRate =
    progressData.length > 0
      ? (totalCompletions / progressData.length) * 100
      : 0;

  return {
    completionRate,
    totalCompletions,
  };
}

/**
 * Calculate popular courses from enrollment activities
 */
export function computePopularCourses(
  activities: ActivityLog[]
): Record<string, number> {
  return activities
    .filter((activity) => activity.action === "course_enrolled")
    .reduce((result, activity) => {
      // Type guard for course_enrolled action
      if (activity.action !== "course_enrolled" || !activity.courseId) return result;
      const courseId = activity.courseId;
      result[courseId] = (result[courseId] || 0) + 1;
      return result;
    }, {} as Record<string, number>);
}
