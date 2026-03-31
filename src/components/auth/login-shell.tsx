import { Stack, Text } from "@mantine/core";
import { motion } from "framer-motion";
import { useState } from "react";

import type { PlatformConfig } from "@/schemas/platform-config";
import type { TenantConfig } from "@/schemas/tenant-contract";

import { AuthStrategyResolver } from "./auth-strategy-resolver";
import { LoginBranding } from "./login-branding";
import { LoginFeatures } from "./login-features";

interface LoginShellProps {
  auth: TenantConfig["auth"] | PlatformConfig["auth"];
  features: Array<{
    description: string;
    icon: string;
    title: string;
  }>;
  footnote?: string;
  formDescription: string;
  formTitle: string;
  heroHeading: string;
  heroSubheading: string;
  logoUrl: string;
  portalName: string;
}

export function LoginShell({
  auth,
  features,
  footnote,
  formDescription,
  formTitle,
  heroHeading,
  heroSubheading,
  logoUrl,
  portalName,
}: LoginShellProps) {
  const [imgError, setImgError] = useState(false);
  const restrictedDomains = auth.restrictedDomains?.length
    ? auth.restrictedDomains
    : auth.domains;

  return (
    <div className="flex min-h-screen bg-primary">
      <div className="relative hidden w-[45%] flex-col justify-between overflow-hidden bg-primary p-12 text-white lg:flex lg:p-16">
        <div className="absolute top-0 left-0 h-full w-full pointer-events-none opacity-20 bg-[radial-gradient(circle_at_top_left,var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />

        <div className="relative z-10 flex items-center space-x-3">
          {!imgError ? (
            <img
              alt="Brand Logo"
              className="h-12 w-12 object-contain brightness-0 invert"
              onError={() => setImgError(true)}
              src={logoUrl}
            />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-md border border-white/20 bg-white/10 font-sans text-xl font-bold text-white">
              {portalName.charAt(0)}
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-sans text-2xl font-bold tracking-wider uppercase">
              {portalName}
            </span>
            <span className="font-sans text-xs tracking-widest uppercase text-white/70">
              {heroSubheading}
            </span>
          </div>
        </div>

        <div className="relative z-10 my-auto">
          <LoginBranding
            branding={{
              heading: heroHeading,
              subheading: heroSubheading,
            }}
          />
          {features.length > 0 ? (
            <div className="mt-16">
              <LoginFeatures features={features} />
            </div>
          ) : null}
        </div>

        <div className="relative z-10 font-sans text-xs tracking-wide text-white/70">
          © {new Date().getFullYear()} {portalName}. All rights reserved.
        </div>
      </div>

      <div className="relative flex w-full flex-col justify-center bg-white lg:w-[55%]">
        <div className="absolute top-0 flex w-full items-center justify-between bg-primary p-6 text-white lg:hidden">
          <div className="flex items-center space-x-2">
            {!imgError ? (
              <img
                alt="Logo"
                className="h-8 w-8 object-contain brightness-0 invert"
                onError={() => setImgError(true)}
                src={logoUrl}
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-white/20 bg-white/10 font-sans text-xs font-bold text-white">
                {portalName.charAt(0)}
              </div>
            )}
            <span className="font-sans font-bold">{portalName}</span>
          </div>
        </div>

        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="mx-auto w-full max-w-md px-6 sm:px-12 xl:px-0"
          initial={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <Stack gap="xl">
            <div className="text-center lg:text-left">
              <h1 className="mb-3 font-sans text-4xl font-semibold tracking-tight text-fun-green-800 lg:text-5xl">
                {formTitle}
              </h1>
              <Text className="font-sans text-lg text-stone-600">
                {formDescription}
              </Text>
              {footnote ? (
                <Text className="mt-3 font-sans text-sm text-stone-500">
                  {footnote}
                </Text>
              ) : null}
            </div>

            <div className="mt-4">
              <AuthStrategyResolver
                allowSignup={auth.allowSignup}
                restrictedDomains={restrictedDomains}
                strategies={auth.strategies}
              />
            </div>

            <div className="mt-12 text-center text-xs text-stone-500 lg:hidden">
              © {new Date().getFullYear()} {portalName}.
            </div>
          </Stack>
        </motion.div>
      </div>
    </div>
  );
}
