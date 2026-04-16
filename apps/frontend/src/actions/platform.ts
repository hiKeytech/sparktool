import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { api } from "@/lib/api-client";
import { platformConfigSchema } from "@/schemas/platform-config";
import { PlatformConfigService } from "@/services/platform-config-service";

export const getPlatformConfig = createServerFn({ method: "GET" }).handler(
  async () => {
    return PlatformConfigService.getPlatformConfig();
  },
);

export const updatePlatformConfig = createServerFn({ method: "POST" })
  .inputValidator(platformConfigSchema)
  .handler(async ({ data }) => {
    return api.patch<z.infer<typeof platformConfigSchema>>(
      "/api/platform-config",
      data,
    );
  });
