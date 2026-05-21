import type { ComponentProps } from "react";

import clsx from "clsx";

interface BrandLogoProps extends ComponentProps<"img"> {
  size?: number;
}

export function BrandLogo({
  alt,
  className = "",
  size = 40,
  src,
  ...props
}: BrandLogoProps) {
  if (src) {
    return (
      <div
        className={clsx("shrink-0 overflow-hidden rounded-full", className)}
        style={{ height: size, width: size }}
      >
        <img
          alt={alt ?? "Brand logo"}
          className="h-full w-full object-cover"
          height={size}
          src={src}
          width={size}
          {...props}
        />
      </div>
    );
  }

  return (
    <div
      aria-label={alt ?? "Brand logo"}
      className={clsx(
        "shrink-0 rounded-full border border-brand-200 bg-brand-100",
        className,
      )}
      role="img"
      style={{ height: size, width: size }}
      {...props}
    />
  );
}
