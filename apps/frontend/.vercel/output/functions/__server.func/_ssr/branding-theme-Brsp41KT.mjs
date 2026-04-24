function applyBrandingTheme(branding) {
  const root = document.documentElement;
  root.style.setProperty("--color-primary", branding.primaryColor);
  root.style.setProperty("--color-secondary", branding.secondaryColor);
  document.title = branding.portalName;
  let description = document.querySelector(
    'meta[name="description"]'
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
    let favicon = document.querySelector("link[rel='icon']");
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }
    favicon.href = branding.faviconUrl;
  }
}
export {
  applyBrandingTheme as a
};
