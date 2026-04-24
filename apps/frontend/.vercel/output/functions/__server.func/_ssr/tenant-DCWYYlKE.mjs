import { c as createServerRpc } from "./api-client-Cl2DaV5u.mjs";
import { t as tenantLookupSchema } from "./tenant-contract-BrIl-2Jr.mjs";
import { T as TenantService } from "./tenant-service-UTCWe4Jf.mjs";
import { c as createServerFn, g as getRequest } from "./index.mjs";
import "../_libs/react.mjs";
import "../_libs/zod.mjs";
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
const getTenant_createServerFn_handler = createServerRpc({
  id: "aebbcdc9cb4e1c1fa242ff0c7252cc0087d16225a06405d60fbbcc45b664042c",
  name: "getTenant",
  filename: "src/actions/tenant.ts"
}, (opts) => getTenant.__executeServer(opts));
const getTenant = createServerFn({
  method: "GET"
}).inputValidator(tenantLookupSchema).handler(getTenant_createServerFn_handler, async ({
  data
}) => {
  if (data) {
    return TenantService.getTenantById(data);
  }
  const request = getRequest();
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host");
  if (!host) {
    console.error("No Host header found in request");
    return null;
  }
  const tenant = await TenantService.getTenantByHost(host);
  return tenant;
});
export {
  getTenant_createServerFn_handler
};
