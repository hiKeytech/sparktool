import { endOfMonth, startOfMonth, subDays, subMonths } from "date-fns";
export const now = new Date();
export const oneWeekAgo = subDays(now, 7);
export const oneMonthAgo = subMonths(now, 1);
export const twoMonthsAgo = subMonths(now, 2);
export const twoWeeksAgo = subDays(now, 14);
export function getMonthlyRanges(monthsBack = 6) {
  const ranges: { end: Date; label: string; start: Date }[] = [];
  for (let i = monthsBack - 1; i >= 0; i--) {
    const monthStart = startOfMonth(subMonths(now, i));
    const monthEnd = endOfMonth(subMonths(now, i));
    ranges.push({ end: monthEnd, label: monthStart.toLocaleDateString("en-US", { month: "long", year: "numeric" }), start: monthStart });
  }
  return ranges;
}
