type BrandingTheme = {
  colorScheme?: "dark" | "light";
  description?: string;
  faviconUrl?: string;
  fontFamily?: string;
  portalName: string;
  primaryColor: string;
  secondaryColor: string;
};

type RgbColor = {
  blue: number;
  green: number;
  red: number;
};

const DEFAULT_PRIMARY_COLOR = "#1b7339";
const DEFAULT_SECONDARY_COLOR = "#eef6f1";
const DEFAULT_FONT_FAMILY = '"Inter", system-ui, sans-serif';
const DEFAULT_COLOR_SCHEME = "light";

function clampChannel(channel: number) {
  return Math.max(0, Math.min(255, Math.round(channel)));
}

function normalizeHexColor(value: string | undefined, fallback: string) {
  if (!value) {
    return fallback;
  }

  const normalized = value.trim();
  const shortHexMatch = /^#([\da-fA-F]{3})$/.exec(normalized);

  if (shortHexMatch) {
    return `#${shortHexMatch[1]
      .split("")
      .map((channel) => `${channel}${channel}`)
      .join("")
      .toLowerCase()}`;
  }

  const fullHexMatch = /^#([\da-fA-F]{6})$/.exec(normalized);

  if (fullHexMatch) {
    return `#${fullHexMatch[1].toLowerCase()}`;
  }

  return fallback;
}

function hexToRgb(value: string): RgbColor {
  const normalized = normalizeHexColor(value, DEFAULT_PRIMARY_COLOR).slice(1);

  return {
    blue: Number.parseInt(normalized.slice(4, 6), 16),
    green: Number.parseInt(normalized.slice(2, 4), 16),
    red: Number.parseInt(normalized.slice(0, 2), 16),
  };
}

function rgbToHex(color: RgbColor) {
  return `#${[color.red, color.green, color.blue]
    .map((channel) => clampChannel(channel).toString(16).padStart(2, "0"))
    .join("")}`;
}

function mixColors(base: string, target: string, ratio: number) {
  const baseColor = hexToRgb(base);
  const targetColor = hexToRgb(target);

  return rgbToHex({
    blue: baseColor.blue + (targetColor.blue - baseColor.blue) * ratio,
    green: baseColor.green + (targetColor.green - baseColor.green) * ratio,
    red: baseColor.red + (targetColor.red - baseColor.red) * ratio,
  });
}

function createTenantPalette(primaryColor: string, secondaryColor: string) {
  const normalizedPrimary = normalizeHexColor(
    primaryColor,
    DEFAULT_PRIMARY_COLOR,
  );
  const normalizedSecondary = normalizeHexColor(
    secondaryColor,
    DEFAULT_SECONDARY_COLOR,
  );

  return {
    50: mixColors(normalizedSecondary, "#ffffff", 0.52),
    100: mixColors(normalizedSecondary, "#ffffff", 0.22),
    200: mixColors(normalizedSecondary, normalizedPrimary, 0.14),
    300: mixColors(normalizedSecondary, normalizedPrimary, 0.28),
    400: mixColors(normalizedSecondary, normalizedPrimary, 0.42),
    500: mixColors(normalizedSecondary, normalizedPrimary, 0.58),
    600: mixColors(normalizedSecondary, normalizedPrimary, 0.76),
    700: normalizedPrimary,
    800: mixColors(normalizedPrimary, "#000000", 0.18),
    900: mixColors(normalizedPrimary, "#000000", 0.34),
    950: mixColors(normalizedPrimary, "#000000", 0.52),
  } as const;
}

function applySurfaceTheme(
  root: HTMLElement,
  colorScheme: "dark" | "light",
  primaryColor: string,
  secondaryColor: string,
) {
  const surfaceTheme =
    colorScheme === "dark"
      ? {
          appBg: mixColors(primaryColor, "#020617", 0.9),
          appBorder: mixColors(primaryColor, "#334155", 0.58),
          appBorderStrong: mixColors(primaryColor, "#475569", 0.52),
          appSurface: mixColors(primaryColor, "#111827", 0.76),
          appSurfaceElevated: mixColors(primaryColor, "#1f2937", 0.64),
          appSurfaceSoft: mixColors(primaryColor, "#0f172a", 0.82),
          appText: "#f8fafc",
          appTextMuted: "#cbd5e1",
          appTextSubtle: "#94a3b8",
        }
      : {
          appBg: mixColors(secondaryColor, "#ffffff", 0.42),
          appBorder: mixColors(secondaryColor, primaryColor, 0.2),
          appBorderStrong: mixColors(secondaryColor, primaryColor, 0.34),
          appSurface: "#ffffff",
          appSurfaceElevated: mixColors(secondaryColor, "#ffffff", 0.76),
          appSurfaceSoft: mixColors(secondaryColor, primaryColor, 0.08),
          appText: "#111827",
          appTextMuted: "#475569",
          appTextSubtle: "#64748b",
        };

  root.setAttribute("data-mantine-color-scheme", colorScheme);
  root.style.colorScheme = colorScheme;
  root.style.setProperty("--app-bg", surfaceTheme.appBg);
  root.style.setProperty("--app-border", surfaceTheme.appBorder);
  root.style.setProperty("--app-border-strong", surfaceTheme.appBorderStrong);
  root.style.setProperty("--app-surface", surfaceTheme.appSurface);
  root.style.setProperty(
    "--app-surface-elevated",
    surfaceTheme.appSurfaceElevated,
  );
  root.style.setProperty("--app-surface-soft", surfaceTheme.appSurfaceSoft);
  root.style.setProperty("--app-text", surfaceTheme.appText);
  root.style.setProperty("--app-text-muted", surfaceTheme.appTextMuted);
  root.style.setProperty("--app-text-subtle", surfaceTheme.appTextSubtle);
}

export function applyBrandingTheme(branding: BrandingTheme) {
  const root = document.documentElement;
  const colorScheme = branding.colorScheme ?? DEFAULT_COLOR_SCHEME;
  const palette = createTenantPalette(
    branding.primaryColor,
    branding.secondaryColor,
  );
  const normalizedPrimary = normalizeHexColor(
    branding.primaryColor,
    DEFAULT_PRIMARY_COLOR,
  );
  const normalizedSecondary = normalizeHexColor(
    branding.secondaryColor,
    DEFAULT_SECONDARY_COLOR,
  );

  root.style.setProperty("--color-primary", normalizedPrimary);
  root.style.setProperty("--color-secondary", normalizedSecondary);
  root.style.setProperty(
    "--font-sans",
    branding.fontFamily?.trim() || DEFAULT_FONT_FAMILY,
  );
  applySurfaceTheme(root, colorScheme, normalizedPrimary, normalizedSecondary);

  for (const [shade, value] of Object.entries(palette)) {
    root.style.setProperty(`--color-fun-green-${shade}`, value);
  }

  document.title = branding.portalName;

  let description = document.querySelector<HTMLMetaElement>(
    'meta[name="description"]',
  );

  if (!description) {
    description = document.createElement("meta");
    description.name = "description";
    document.head.appendChild(description);
  }

  if (branding.description) {
    description.content = branding.description;
  }

  if (branding.faviconUrl) {
    let favicon = document.querySelector<HTMLLinkElement>("link[rel='icon']");

    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }

    favicon.href = branding.faviconUrl;
  }
}
