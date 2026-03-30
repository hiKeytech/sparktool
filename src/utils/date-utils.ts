

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(utc);

export const DATE_PICKER_PRESETS = [
  {
    label: "Yesterday",
    value: dayjs().subtract(1, "day").format("YYYY-MM-DD HH:mm:ss"),
  },
  { label: "Today", value: dayjs().format("YYYY-MM-DD HH:mm:ss") },
  {
    label: "Tomorrow",
    value: dayjs().add(1, "day").format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    label: "Next month",
    value: dayjs().add(1, "month").format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    label: "Next year",
    value: dayjs().add(1, "year").format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    label: "Last month",
    value: dayjs().subtract(1, "month").format("YYYY-MM-DD HH:mm:ss"),
  },
  {
    label: "Last year",
    value: dayjs().subtract(1, "year").format("YYYY-MM-DD HH:mm:ss"),
  },
];

/**
 * Format a Firebase Timestamp, Date, or number (ms) to a readable date string
 * Examples: "November 6, 2025", "Nov 6, 2025"
 */
export function formatDate(
  timestamp: Date | null | number | undefined,
  format = "MMMM D, YYYY"
): string {
  const date = toDate(timestamp);
  return date ? dayjs(date).format(format) : "";
}

/**
 * Format timestamp to "YYYY-MM-DD HH:mm:ss" string for input fields
 * Examples: "2023-11-06 14:30:00"
 */
export function formatDateInput(
  timestamp: Date | null | number | undefined
): string {
  const date = toDate(timestamp);
  return date ? dayjs(date).format("YYYY-MM-DD HH:mm:ss") : "";
}

/**
 * Format timestamp to date and time string
 * Examples: "Dec 15, 2023 at 2:30 PM", "Jan 1, 2024 at 10:15 AM"
 */
export function formatDateTime(
  timestamp: Date | null | number | undefined
): string {
  const date = toDate(timestamp);
  return date ? dayjs(date).format("MMM DD, YYYY [at] h:mm A") : "";
}

/**
 * Format course duration from hours to human-readable string
 * Examples: "2 hours", "an hour", "30 minutes"
 */
export function formatDuration(hours: number): string {
  return dayjs.duration(hours, "hours").humanize();
}

/**
 * Format timestamp to relative time string
 * Examples: "2 hours ago", "3 days ago", "just now"
 */
export function formatRelativeTime(
  timestamp: Date | null | number | undefined
): string {
  const date = toDate(timestamp);
  return date ? dayjs(date).fromNow() : "";
}

/**
 * Format study time from minutes to human-readable string
 * Examples: "2 hours", "30 minutes", "an hour"
 */
export function formatStudyTime(minutes: number): string {
  return dayjs.duration(minutes, "minutes").humanize();
}

/**
 * Format time in seconds to MM:SS or HH:MM:SS format
 * Examples: "2:30", "1:02:45"
 */
export function formatTime(seconds: number): string {
  const hours = dayjs.duration(seconds, "s").hours();
  return dayjs.utc(seconds * 1000).format(hours ? "H:mm:ss" : "m:ss");
}

/**
 * Convert Firebase Timestamp, number (ms), or Date to Date object safely
 */
function toDate(
  timestamp: Date | null | number | undefined
): Date | null {
  if (!timestamp) return null;

  if (typeof timestamp === "number") {
    return new Date(timestamp);
  }

  return timestamp instanceof Date ? timestamp : new Date(timestamp as unknown as string | number);
}
