import { isAfter } from "date-fns";

import { twoWeeksAgo } from "./dates";

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
  activityLogs: any[]
): StudentPerformance {
  // Quiz performance metrics
  const quizScores = quizAttempts
    .filter((attempt) => attempt.score !== undefined)
    .map((attempt) => attempt.score);

  const averageQuizScore =
    quizScores.length > 0
      ? Math.round(
          quizScores.reduce((sum, score) => sum + score, 0) / quizScores.length
        )
      : 0;

  // Top performers (students with highest average quiz scores)
  const studentQuizPerformance = quizAttempts.reduce((acc, attempt) => {
    if (attempt.score !== undefined) {
      if (!acc[attempt.studentId]) {
        acc[attempt.studentId] = { count: 0, scores: [] };
      }
      acc[attempt.studentId].scores.push(attempt.score);
      acc[attempt.studentId].count++;
    }
    return acc;
  }, {} as Record<string, { count: number; scores: number[] }>);

  const topPerformers = Object.entries(studentQuizPerformance)
    .map(([studentId, data]: [string, { count: number, scores: number[] }]) => {
      const averageScore =
        data.scores.reduce(
          (sum: number, score: number) => sum + score,
          0
        ) / data.scores.length;
      const student = users.find((u) => u.id === studentId);
      return {
        averageScore: Math.round(averageScore),
        displayName: student?.displayName || "Unknown Student",
        userId: studentId,
      };
    })
    .sort((a, b) => b.averageScore - a.averageScore)
    .slice(0, 5);

  // Students at risk (low engagement in last 2 weeks)
  const activeStudents = users.filter(
    (user) => user.role === "student" && user.isActive
  );

  const recentlyActiveUsers = new Set(
    activityLogs
      .filter(
        (log) => log.timestamp && isAfter(log.timestamp.toDate(), twoWeeksAgo)
      )
      .map((log) => log.userId)
  );

  const studentsAtRisk = activeStudents.filter(
    (student) => !recentlyActiveUsers.has(student.id)
  ).length;

  return {
    averageQuizScore,
    studentsAtRisk,
    topPerformers,
  };
}
