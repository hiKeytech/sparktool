export interface TrendData {
  current: number;
  isPositive: boolean;
  percentageChange: number;
  previous: number;
}

export function calculateTrend(current: number, previous: number): TrendData {
  const percentageChange =
    previous === 0
      ? current > 0
        ? 100
        : 0
      : Math.round(((current - previous) / previous) * 100);

  return {
    current,
    isPositive: current >= previous,
    percentageChange,
    previous,
  };
}
