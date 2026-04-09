import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig } from "vite";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

/**
 * Vite configuration file
 * - Sets up plugins for React, Tailwind CSS, TypeScript path resolution, and TanStack Router
 * - Configures the development server to run on port 4317
 * - Configures the preview server to run on port 4417
 * - Uses root index.html for development (Firebase-free)
 * - public/index.html is preserved for Firebase hosting deployment
 *
 * @see {@link https://vitejs.dev/config/ Vite configuration documentation}
 */
export default defineConfig({
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({ srcDirectory: "src" }),
    react(),
  ],
  root: ".",
  server: {
    port: 4317,
    strictPort: true,
    allowedHosts: [".ngrok-free.dev"],
  },
  preview: {
    port: 4417,
    strictPort: true,
    host: "0.0.0.0",
    allowedHosts: [".ngrok-free.dev"],
  },
});
