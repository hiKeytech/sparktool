import { c as createServerRpc, a as api } from "./api-client-Cl2DaV5u.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/react.mjs";
import { o as object, _ as _enum, s as string } from "../_libs/zod.mjs";
import "node:async_hooks";
import "node:stream";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "node:stream/web";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const dashboardAnalyticsInputSchema = object({
  tenantId: string().min(1),
  timeframe: _enum(["month", "week", "year"]).default("month")
});
const dashboardMetricsInputSchema = object({
  tenantId: string().min(1)
});
const getDashboardAnalyticsFn_createServerFn_handler = createServerRpc({
  id: "3801706cb063e6542cb5aa4ce19c8aa103b18f04e6829697ac431d6b1aca898a",
  name: "getDashboardAnalyticsFn",
  filename: "src/server/dashboard.ts"
}, (opts) => getDashboardAnalyticsFn.__executeServer(opts));
const getDashboardAnalyticsFn = createServerFn({
  method: "GET"
}).inputValidator(dashboardAnalyticsInputSchema).handler(getDashboardAnalyticsFn_createServerFn_handler, async ({
  data
}) => {
  const params = new URLSearchParams({
    tenantId: data.tenantId,
    timeframe: data.timeframe
  });
  return api.get(`/api/dashboard/analytics?${params}`);
});
const getDashboardMetricsFn_createServerFn_handler = createServerRpc({
  id: "66e24e297f7f4e0428f7f75eb5cfd878ec68c8eca70dc76eb6bdf47b7932d203",
  name: "getDashboardMetricsFn",
  filename: "src/server/dashboard.ts"
}, (opts) => getDashboardMetricsFn.__executeServer(opts));
const getDashboardMetricsFn = createServerFn({
  method: "GET"
}).inputValidator(dashboardMetricsInputSchema).handler(getDashboardMetricsFn_createServerFn_handler, async ({
  data
}) => {
  return api.get(`/api/dashboard/metrics?tenantId=${data.tenantId}`);
});
export {
  getDashboardAnalyticsFn_createServerFn_handler,
  getDashboardMetricsFn_createServerFn_handler
};
