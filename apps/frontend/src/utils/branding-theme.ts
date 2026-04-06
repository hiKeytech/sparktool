type BrandingTheme = {
  description?: string;
  faviconUrl?: string;
  portalName: string;
  primaryColor: string;
  secondaryColor: string;
};

export function applyBrandingTheme(branding: BrandingTheme) {
  const root = document.documentElement;

  root.style.setProperty("--color-primary", branding.primaryColor);
  root.style.setProperty("--color-secondary", branding.secondaryColor);
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
