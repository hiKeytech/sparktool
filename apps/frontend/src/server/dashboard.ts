import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { api } from "@/lib/api-client";
import type { DashboardMetrics } from "@/types";

type DashboardAnalytics = {
  activeUsers: number;
  popularCourses: Record<string, number>;
  totalCompletions: number;
  totalCourses: number;
  totalEnrollments: number;
  totalStudents: number;
};

const dashboardAnalyticsInputSchema = z.object({
  tenantId: z.string().min(1),
  timeframe: z.enum(["month", "week", "year"]).default("month"),
});

const dashboardMetricsInputSchema = z.object({
  tenantId: z.string().min(1),
});

export const getDashboardAnalyticsFn = createServerFn({ method: "GET" })
  .inputValidator(dashboardAnalyticsInputSchema)
  .handler(async ({ data }) => {
    const params = new URLSearchParams({
      tenantId: data.tenantId,
      timeframe: data.timeframe,
    });
    return api.get<DashboardAnalytics>(`/api/dashboard/analytics?${params}`);
  });

export const getDashboardMetricsFn = createServerFn({ method: "GET" })
  .inputValidator(dashboardMetricsInputSchema)
  .handler(async ({ data }) => {
    return api.get<DashboardMetrics>(
      `/api/dashboard/metrics?tenantId=${data.tenantId}`,
    );
  });
