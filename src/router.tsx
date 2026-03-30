import { QueryClient } from "@tanstack/query-core";
import { createRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { minutesToMilliseconds, secondsToMilliseconds } from "date-fns";

import { ErrorBoundary } from "./components/error-boundary";
import { NotFound } from "./components/not-found";
import { routeTree } from "./routeTree.gen";
import { AuthProvider } from "./providers/auth-provider";


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
    Wrap({ children }) {
      return <AuthProvider>{children}</AuthProvider>
    },
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
