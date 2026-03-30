import type { QueryClient } from "@tanstack/query-core";
import "lucide-static/font/lucide.css";

import { createRootRouteWithContext } from "@tanstack/react-router";

import { ErrorBoundary } from "@/components/error-boundary";
import { RootLayout } from "@/components/layouts/root-layout";
import { NotFound } from "@/components/not-found";
import { generateHeadContent } from "@/routing/head";

interface RootContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootContext>()({
  component: RootLayout,
  errorComponent: ErrorBoundary,
  head: generateHeadContent,
  notFoundComponent: NotFound,
});
