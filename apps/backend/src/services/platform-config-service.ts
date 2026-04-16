import {
  platformConfigSchema,
  type PlatformConfig,
} from "sparktool-contracts/platform-config";

import { platformConfigRepository } from "../repositories/platform-config-repository.js";

export const PlatformConfigService = {
  getPlatformConfig: async (): Promise<PlatformConfig | null> => {
    try {
      const config = await platformConfigRepository.get();

      if (!config) {
        return null;
      }

      const parseResult = platformConfigSchema.safeParse(config);

      if (!parseResult.success) {
        console.error("Invalid platform config:", parseResult.error);
        return null;
      }

      return parseResult.data;
    } catch (error) {
      console.error("Error fetching platform config:", error);
      return null;
    }
  },

  updatePlatformConfig: async (
    nextConfig: PlatformConfig,
  ): Promise<PlatformConfig | null> => {
    try {
      const parseResult = platformConfigSchema.safeParse(nextConfig);

      if (!parseResult.success) {
        console.error("Invalid platform config update:", parseResult.error);
        return null;
      }

      return platformConfigRepository.update({
        ...parseResult.data,
        id: "platform",
      });
    } catch (error) {
      console.error("Error updating platform config:", error);
      return null;
    }
  },
};
