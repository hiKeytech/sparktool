import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { QueryClient } from "@tanstack/query-core";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { minutesToMilliseconds, secondsToMilliseconds } from "date-fns";

import { ErrorBoundary } from "./components/error-boundary";
import { NotFound } from "./components/not-found";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const queryClient = new QueryClient();

  const router = createRouter({
    context: { queryClient },
    defaultErrorComponent: ErrorBoundary,
    defaultNotFoundComponent: NotFound,
    defaultPreload: "intent",
    defaultPreloadStaleTime: secondsToMilliseconds(10),
    defaultStaleTime: minutesToMilliseconds(5),
    routeTree,
    scrollRestoration: true,
  });

  setupRouterSsrQueryIntegration({
    queryClient,
    router,
    wrapQueryClient: true,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}

const router = getRouter();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
