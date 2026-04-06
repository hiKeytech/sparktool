export const dashboard = {
  analytics: async (
    timeframe: "month" | "week" | "year" = "month",
    tenantId: string,
  ) => {
    const { getDashboardAnalyticsFn } = await import("@/server/dashboard");
    return getDashboardAnalyticsFn({
      data: {
        tenantId,
        timeframe,
      },
    });
  },
  metrics: async (tenantId: string) => {
    const { getDashboardMetricsFn } = await import("@/server/dashboard");
    return getDashboardMetricsFn({
      data: {
        tenantId,
      },
    });
  },
};
