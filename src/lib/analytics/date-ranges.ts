import { subDays, subMonths, subYears } from "date-fns";

export type TimeframeType = "month" | "week" | "year";

/**
 * Create date range object for analytics queries
 */
export function createTimeframeRange(
  timeframe: TimeframeType,
  referenceDate: Date = new Date()
) {
  return {
    end: referenceDate,
    start: getTimeframeStartDate(timeframe, referenceDate),
    timeframe,
  };
}

/**
 * Calculate start date for analytics timeframe using date-fns
 */
export function getTimeframeStartDate(
  timeframe: TimeframeType,
  referenceDate: Date = new Date()
): Date {
  switch (timeframe) {
    case "month":
      return subMonths(referenceDate, 1);
    case "week":
      return subDays(referenceDate, 7);
    case "year":
      return subYears(referenceDate, 1);
    default:
      return subMonths(referenceDate, 1);
  }
}
