import type { AnyRouteMatch } from "@tanstack/react-router";

import styles from "@/styles/index.css?url";

type HeadContent = Pick<AnyRouteMatch, RouteMetadata>;
type RouteMetadata = "headScripts" | "links" | "meta" | "styles";

export function generateHeadContent(): Awaited<HeadContent> {
  return {
    links: [
      { href: styles, rel: "stylesheet" },
      {
        href: "/apple-touch-icon.png",
        rel: "apple-touch-icon",
        sizes: "180x180",
      },
      {
        href: "/favicon-32x32.png",
        rel: "icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        href: "/favicon-16x16.png",
        rel: "icon",
        sizes: "16x16",
        type: "image/png",
      },
      { color: "#fffff", href: "/site.webmanifest", rel: "manifest" },
      { href: "/favicon.ico", rel: "icon" },
      {
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
        rel: "stylesheet",
      },
      {
        href: "https://fonts.googleapis.com",
        rel: "preconnect",
      },
      {
        crossOrigin: "anonymous",
        href: "https://fonts.gstatic.com",
        rel: "preconnect",
      },
    ],
    meta: [
      {
        charSet: "utf-8",
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport",
      },
      {
        title:
          "Nigerian Correctional Service - Nigerian Correctional Service E-Learning Platform",
      },
      {
        content:
          "Official e-learning platform for students within the Nigerian Correctional Service, focusing on IT skills and vocational training.",
        name: "description",
      },
    ],
  };
}
