import {
  platformConfigSchema,
  type PlatformConfig,
} from "@/schemas/platform-config";
import { platformConfigRepository } from "@/server/repositories/platform-config-repository";

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
};
