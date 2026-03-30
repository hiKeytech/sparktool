export interface LearningPatterns {
  mobileVsDesktop: {
    desktop: number;
    mobile: number;
  };
  peakLearningHours: {
    activityPercentage: number;
    end: string;
    start: string;
  };
  weekendActivity: number;
}

export function computeLearningPatterns(activityLogs: any[]): LearningPatterns {
  const totalActivities = activityLogs.length;

  // Mobile vs Desktop usage
  const mobileActivities = activityLogs.filter(
    (log) => log.userAgent && log.userAgent.toLowerCase().includes("mobile")
  ).length;

  const mobilePercentage =
    totalActivities > 0
      ? Math.round((mobileActivities / totalActivities) * 100)
      : 50;

  // Weekend activity
  const weekendActivities = activityLogs.filter((log) => {
    if (!log.timestamp) return false;
    const day = log.timestamp.toDate().getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  }).length;

  const weekendActivity =
    totalActivities > 0
      ? Math.round((weekendActivities / totalActivities) * 100)
      : 0;

  // Peak learning hours (analyze activity by hour)
  const hourlyActivity = Array(24).fill(0);
  activityLogs.forEach((log) => {
    if (log.timestamp && log.action === "video_watched") {
      const hour = log.timestamp.toDate().getHours();
      hourlyActivity[hour]++;
    }
  });

  const peakHour = hourlyActivity.indexOf(Math.max(...hourlyActivity));
  const peakActivityPercentage =
    totalActivities > 0
      ? Math.round((Math.max(...hourlyActivity) / totalActivities) * 100)
      : 0;

  return {
    mobileVsDesktop: {
      desktop: 100 - mobilePercentage,
      mobile: mobilePercentage,
    },
    peakLearningHours: {
      activityPercentage: peakActivityPercentage,
      end: `${(peakHour + 3) % 24}:00`,
      start: `${peakHour}:00`,
    },
    weekendActivity,
  };
}
