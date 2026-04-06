import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useLayoutEffect } from "react";

import { queryClient } from "@/routing/query-client";
import { theme } from "@/theme/mantine";

import Aos from "aos";


export function RootLayout() {
  useLayoutEffect(() => {
    Aos.init({
      duration: 300,
      easing: "ease-in-out",
      mirror: false,
      once: true,
    });
  }, []);

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <HeadContent />
        <ColorSchemeScript />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
            <MantineProvider theme={theme}>
              <Notifications />

              <ModalsProvider>
                <Outlet />
              </ModalsProvider>
            </MantineProvider>
        </QueryClientProvider>

        <ReactQueryDevtools buttonPosition="bottom-left" />
        <TanStackRouterDevtools position="bottom-right" />
        <Scripts />
      </body>
    </html>
  );
}
