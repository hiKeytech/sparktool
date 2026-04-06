import { subDays, subMonths, subYears } from "date-fns";
export type TimeframeType = "month" | "week" | "year";
export function getTimeframeStartDate(timeframe: TimeframeType, referenceDate: Date = new Date()): Date {
  switch (timeframe) {
    case "month": return subMonths(referenceDate, 1);
    case "week": return subDays(referenceDate, 7);
    case "year": return subYears(referenceDate, 1);
    default: return subMonths(referenceDate, 1);
  }
}
