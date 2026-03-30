import { useState } from "react";
import { Text, Stack } from "@mantine/core";
import { AuthStrategyResolver } from "@/components/auth/auth-strategy-resolver";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { LoginBranding } from "@/components/auth/login-branding";
import { LoginFeatures } from "@/components/auth/login-features";

export const Route = createFileRoute("/_tenant/login")({
  component: LoginPage,
});

export function LoginPage() {
  const { tenant } = Route.useRouteContext();

  if (!tenant) {
    throw new Error("Tenant context is missing");
  }

  const { auth, branding } = tenant.config;
  const loginBranding = branding.loginPage || { features: [] };
  const strategies = auth.strategies;
  const restrictedDomains = auth.restrictedDomains?.length
    ? auth.restrictedDomains
    : auth.domains;
  const [imgError, setImgError] = useState(false);

  const fallbackFeatures = [
    {
      title: "Premium Experience",
      description: "Designed for high-taste creators and ambitious learners.",
      icon: "IconDiamond",
    },
    {
      title: "Secure Access",
      description: "Enterprise-grade security protecting your progress.",
      icon: "IconShieldCheck",
    },
  ];

  const featuresToDisplay =
    loginBranding.features && loginBranding.features.length > 0
      ? loginBranding.features
      : fallbackFeatures;

  return (
    <div className="flex min-h-screen bg-primary">
      {/* Left Panel - Editorial Branding (Hidden on Mobile) */}
      <div className="relative hidden w-[45%] lg:flex flex-col justify-between overflow-hidden text-accent-cream p-12 lg:p-16">
        {/* Subtle Background Glow Map */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />

        {/* Editorial Header Logo area */}
        <div className="relative z-10 flex items-center space-x-3">
          {!imgError ? (
            <img
              alt="Brand Logo"
              className="w-12 h-12 object-contain brightness-0 invert"
              onError={() => setImgError(true)}
              src={branding.logoUrl || "/logo.png"}
            />
          ) : (
            <div className="w-12 h-12 flex items-center justify-center rounded border border-accent-cream/20 bg-accent-cream/5 text-accent-cream font-bold font-display text-xl">
              {branding.portalName.charAt(0)}
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-display font-bold text-2xl uppercase tracking-wider">
              {branding.portalName}
            </span>
            <span className="text-xs text-accent-cream/60 font-sans tracking-widest uppercase">
              {loginBranding.subheading || "Technology Education"}
            </span>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="relative z-10 my-auto">
          <LoginBranding branding={loginBranding} />
          <div className="mt-16">
            <LoginFeatures features={featuresToDisplay} />
          </div>
        </div>

        {/* Legal Footer Left Panel */}
        <div className="relative z-10 text-xs text-accent-cream/40 font-sans tracking-wide">
          © {new Date().getFullYear()} {branding.portalName}. All rights
          reserved under license.
        </div>
      </div>

      {/* Right Panel - Soft SaaS Authentication */}
      <div className="flex flex-col justify-center w-full lg:w-[55%] bg-accent-cream relative">
        {/* Mobile Header (Only visible on small screens) */}
        <div className="lg:hidden absolute top-0 w-full p-6 flex justify-between items-center bg-primary text-accent-cream">
          <div className="flex items-center space-x-2">
            {!imgError ? (
              <img
                alt="Logo"
                className="w-8 h-8 object-contain brightness-0 invert"
                onError={() => setImgError(true)}
                src={branding.logoUrl || "/logo.png"}
              />
            ) : (
              <div className="w-8 h-8 flex items-center justify-center rounded border border-accent-cream/20 bg-accent-cream/5 text-accent-cream font-bold font-display text-xs">
                {branding.portalName.charAt(0)}
              </div>
            )}
            <span className="font-display font-bold">
              {branding.portalName || "Sparktool"}
            </span>
          </div>
        </div>

        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md px-6 mx-auto sm:px-12 xl:px-0"
          initial={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <Stack gap="xl">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-display font-medium text-primary tracking-tight mb-3">
                Sign In
              </h1>
              <Text className="text-text-muted font-sans text-lg">
                Enter your credentials to access the platform.
              </Text>
            </div>

            {/* Strategy Resolver Handles the Login Inputs/Buttons */}
            <div className="mt-4">
              <AuthStrategyResolver
                allowSignup={auth.allowSignup}
                restrictedDomains={restrictedDomains}
                strategies={strategies}
              />
            </div>

            {/* Mobile Footer */}
            <div className="lg:hidden mt-12 text-center text-xs text-text-muted/60">
              © {new Date().getFullYear()} {branding.portalName}.
            </div>
          </Stack>
        </motion.div>
      </div>
    </div>
  );
}
