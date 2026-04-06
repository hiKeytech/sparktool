import { createServerFn } from "@tanstack/react-start";

import { PlatformConfigService } from "@/services/platform-config-service";

export const getPlatformConfig = createServerFn({ method: "GET" }).handler(
  async () => {
    return PlatformConfigService.getPlatformConfig();
  },
);
