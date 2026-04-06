export function computeBasicAnalytics(users: any[], courses: any[], progressData: any[]) {
  return {
    totalCourses: courses.length,
    totalEnrollments: progressData.length,
    totalStudents: users.filter((u) => u.role === "student").length,
  };
}
