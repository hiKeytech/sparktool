export function computeActiveUsers(activities: any[]): number {
  return new Set(activities.map((a) => a.userId)).size;
}
export function computeCompletionRate(progressData: Array<{ status: string }>): { completionRate: number; totalCompletions: number } {
  const totalCompletions = progressData.filter((p) => p.status === "completed").length;
  return {
    completionRate: progressData.length > 0 ? (totalCompletions / progressData.length) * 100 : 0,
    totalCompletions,
  };
}
export function computePopularCourses(activities: any[]): Record<string, number> {
  return activities
    .filter((a) => a.action === "course_enrolled" && a.courseId)
    .reduce((acc: Record<string, number>, a) => { acc[a.courseId] = (acc[a.courseId] || 0) + 1; return acc; }, {});
}
