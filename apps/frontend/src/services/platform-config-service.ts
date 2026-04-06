import type { PlatformConfig } from "sparktool-contracts/platform-config";
import { api } from "@/lib/api-client";

export const PlatformConfigService = {
  async getPlatformConfig(): Promise<PlatformConfig | null> {
    return api
      .get<PlatformConfig | null>("/api/platform-config")
      .catch(() => null);
  },
};
