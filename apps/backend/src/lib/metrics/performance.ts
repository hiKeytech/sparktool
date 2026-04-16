import { isAfter } from "date-fns";
import { twoWeeksAgo } from "./dates.js";
export interface StudentPerformance {
  averageQuizScore: number;
  studentsAtRisk: number;
  topPerformers: Array<{
    averageScore: number;
    displayName: string;
    userId: string;
  }>;
}
export function computeStudentPerformance(
  quizAttempts: any[],
  users: any[],
  activityLogs: any[],
): StudentPerformance {
  const quizScores = quizAttempts
    .filter((a) => a.score !== undefined)
    .map((a) => a.score);
  const averageQuizScore =
    quizScores.length > 0
      ? Math.round(quizScores.reduce((s, n) => s + n, 0) / quizScores.length)
      : 0;
  const studentMap = quizAttempts.reduce((acc: Record<string, number[]>, a) => {
    if (a.score !== undefined) {
      acc[a.studentId] = acc[a.studentId] || [];
      acc[a.studentId].push(a.score);
    }
    return acc;
  }, {});
  const topPerformers = Object.entries(studentMap)
    .map(([uid, scores]: [string, number[]]) => {
      const avg = scores.reduce((s, n) => s + n, 0) / scores.length;
      const student = users.find((u) => u.id === uid);
      return {
        averageScore: Math.round(avg),
        displayName: student?.displayName || "Unknown Student",
        userId: uid,
      };
    })
    .sort((a, b) => b.averageScore - a.averageScore)
    .slice(0, 5);
  const activeStudents = users.filter(
    (u) => u.role === "student" && u.isActive,
  );
  const recentlyActive = new Set(
    activityLogs
      .filter((l) => l.timestamp && isAfter(new Date(l.timestamp), twoWeeksAgo))
      .map((l) => l.userId),
  );
  const studentsAtRisk = activeStudents.filter(
    (s) => !recentlyActive.has(s.id),
  ).length;
  return { averageQuizScore, studentsAtRisk, topPerformers };
}
