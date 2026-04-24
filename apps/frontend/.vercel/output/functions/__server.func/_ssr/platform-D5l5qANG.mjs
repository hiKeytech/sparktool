import { c as createServerRpc, a as api } from "./api-client-Cl2DaV5u.mjs";
import { p as platformConfigSchema } from "./platform-config-DKda_4-W.mjs";
import { c as createServerFn } from "./index.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
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
const PlatformConfigService = {
  async getPlatformConfig() {
    return api.get("/api/platform-config").catch(() => null);
  }
};
const getPlatformConfig_createServerFn_handler = createServerRpc({
  id: "9193d3a3d093fbe269b47489260c584fd9d288e33555d8834ebe4df5c577979c",
  name: "getPlatformConfig",
  filename: "src/actions/platform.ts"
}, (opts) => getPlatformConfig.__executeServer(opts));
const getPlatformConfig = createServerFn({
  method: "GET"
}).handler(getPlatformConfig_createServerFn_handler, async () => {
  return PlatformConfigService.getPlatformConfig();
});
const updatePlatformConfig_createServerFn_handler = createServerRpc({
  id: "0d6de405338a1b8ed79aeb9ffe11cf5039b9a5bd90fc17bc45f63b050dea9691",
  name: "updatePlatformConfig",
  filename: "src/actions/platform.ts"
}, (opts) => updatePlatformConfig.__executeServer(opts));
const updatePlatformConfig = createServerFn({
  method: "POST"
}).inputValidator(platformConfigSchema).handler(updatePlatformConfig_createServerFn_handler, async ({
  data
}) => {
  return api.patch("/api/platform-config", data);
});
export {
  getPlatformConfig_createServerFn_handler,
  updatePlatformConfig_createServerFn_handler
};
