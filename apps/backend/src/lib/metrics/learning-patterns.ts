export interface LearningPatterns { mobileVsDesktop: { desktop: number; mobile: number }; peakLearningHours: { activityPercentage: number; end: string; start: string }; weekendActivity: number; }
export function computeLearningPatterns(activityLogs: any[]): LearningPatterns {
  const total = activityLogs.length;
  const mobileActivities = activityLogs.filter((l) => l.userAgent && l.userAgent.toLowerCase().includes("mobile")).length;
  const mobilePercentage = total > 0 ? Math.round((mobileActivities / total) * 100) : 50;
  const weekendActivities = activityLogs.filter((l) => { if (!l.timestamp) return false; const day = new Date(l.timestamp).getDay(); return day === 0 || day === 6; }).length;
  const weekendActivity = total > 0 ? Math.round((weekendActivities / total) * 100) : 0;
  const hourlyActivity = Array(24).fill(0);
  activityLogs.forEach((l) => { if (l.timestamp && l.action === "video_watched") hourlyActivity[new Date(l.timestamp).getHours()]++; });
  const peakHour = hourlyActivity.indexOf(Math.max(...hourlyActivity));
  const peakActivityPercentage = total > 0 ? Math.round((Math.max(...hourlyActivity) / total) * 100) : 0;
  return { mobileVsDesktop: { desktop: 100 - mobilePercentage, mobile: mobilePercentage }, peakLearningHours: { activityPercentage: peakActivityPercentage, end: `${(peakHour + 3) % 24}:00`, start: `${peakHour}:00` }, weekendActivity };
}
