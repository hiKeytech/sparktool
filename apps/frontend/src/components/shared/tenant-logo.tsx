import type { ComponentProps } from "react";

import clsx from "clsx";

interface TenantLogoProps extends ComponentProps<"img"> {
  fallbackLabel?: string;
  size?: number;
}

function getInitials(value: string) {
  const initials = value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

  return initials || "ST";
}

export function TenantLogo({
  alt,
  className = "",
  fallbackLabel = "SparkTool",
  size = 40,
  src,
  ...props
}: TenantLogoProps) {
  if (src) {
    return (
      <img
        alt={alt ?? `${fallbackLabel} logo`}
        className={clsx("rounded-full object-cover", className)}
        height={size}
        src={src}
        width={size}
        {...props}
      />
    );
  }

  return (
    <div
      aria-label={alt ?? `${fallbackLabel} logo`}
      className={clsx(
        "flex items-center justify-center rounded-full bg-brand-800 text-white font-semibold tracking-wide",
        className,
      )}
      role="img"
      style={{ height: size, width: size }}
      {...props}
    >
      {getInitials(fallbackLabel)}
    </div>
  );
}
