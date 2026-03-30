import type { ComponentProps } from "react";

import clsx from "clsx";

interface NCSLogoProps extends Omit<ComponentProps<"img">, "alt" | "src"> {
  size?: number;
}

/**
 * Nigerian Correctional Service Official Logo Component
 * Features the red eagle and green shield from the official NCS badge
 */
export function NCSLogo({ className = "", size = 40, ...props }: NCSLogoProps) {
  return (
    <img
      alt="Nigerian Correctional Service"
      className={clsx("rounded-full", className)}
      height={size}
      src="/nigerian-correctional-service-badge.png"
      width={size}
      {...props}
    />
  );
}
