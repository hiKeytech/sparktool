function isDomainAllowed(email: string, restrictedDomains?: string[]) {
  if (!restrictedDomains?.length) {
    return true;
  }

  const normalizedEmail = email.trim().toLowerCase();

  return restrictedDomains.some((domain) =>
    normalizedEmail.endsWith(domain.trim().toLowerCase()),
  );
}

export function assertAllowedAuthDomain(input: {
  email: string;
  mode: "sign-in" | "sign-up";
  restrictedDomains?: string[];
}) {
  if (input.mode !== "sign-up") {
    return;
  }

  if (isDomainAllowed(input.email, input.restrictedDomains)) {
    return;
  }

  throw Object.assign(
    new Error(
      `Unauthorized email domain. Expected one of: ${(input.restrictedDomains ?? []).join(", ")}`,
    ),
    { status: 403 },
  );
}
