import { Stack, Text } from "@mantine/core";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  LockKeyhole,
  Waypoints,
  Activity,
  Users,
  BookOpen,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import type { AdminInvitationPreview } from "@/schemas/invitation";
import type { PlatformConfig } from "@/schemas/platform-config";
import type { TenantConfig } from "@/schemas/tenant-contract";

import { AuthStrategyResolver } from "./auth-strategy-resolver";

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
  invitationError?: string | null;
  invitationPreview?: null | AdminInvitationPreview;
  invitationToken?: string;
  logoUrl: string;
  portalName: string;
}

const iconMap: Record<string, LucideIcon> = {
  users: Users,
  shield: ShieldCheck,
  certificate: BookOpen,
  default: Waypoints,
};

export function LoginShell({
  auth,
  features,
  footnote,
  formDescription,
  formTitle,
  heroHeading,
  heroSubheading,
  invitationError,
  invitationPreview,
  invitationToken,
  portalName,
}: LoginShellProps) {
  const restrictedDomains = auth.restrictedDomains?.length
    ? auth.restrictedDomains
    : auth.domains;

  return (
    <div className="flex min-h-screen bg-stone-50 font-sans selection:bg-fun-green-500/30">
      {/* 
        ========================================================================
        LEFT PANEL (COMMAND SUITE STYLE)
        ========================================================================
      */}
      <div className="relative hidden w-[45%] flex-col justify-between overflow-hidden bg-[#070b09] p-12 text-white lg:flex lg:p-16 border-r border-white/10">
        {/* Deep Nigerian Green Gradient Background */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_32%),linear-gradient(135deg,#1d4f35_0%,#113620_58%,#070b09_100%)]" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        {/* Top Header / Portal Name */}
        <div className="relative z-10 flex items-center space-x-4">
          <div className="flex items-center justify-center p-2 rounded-xl h-12 w-12 bg-white/5 border border-white/10 backdrop-blur-md">
            <ShieldCheck size={26} className="text-fun-green-400" />
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-xl font-bold tracking-wide">
              {portalName}
            </span>
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/50 font-medium">
              Authentication Gateway
            </span>
          </div>
        </div>

        {/* Center Content: Branding & Features */}
        <div className="relative z-10 my-auto pt-12">
          {/* Branding */}
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
            className="mb-16"
          >
            <p className="text-fun-green-400 text-xs font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-3">
              <Activity size={14} />
              <span>Secure Access</span>
            </p>
            <h2 className="text-4xl xl:text-5xl font-semibold text-white tracking-tighter leading-[1.1]">
              {heroHeading.replace(".", "")}
              <span className="text-fun-green-500">.</span>
            </h2>
            <p className="max-w-md mt-6 text-lg font-light leading-relaxed text-white/60">
              {heroSubheading}
            </p>
          </motion.div>

          {/* Features */}
          {features.length > 0 && (
            <div className="space-y-8 max-w-md">
              {features.map((feature, index) => {
                const Icon = iconMap[feature.icon] || iconMap.default;
                return (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    key={feature.title}
                    transition={{
                      delay: 0.2 + index * 0.1,
                      duration: 0.8,
                      ease: [0.19, 1, 0.22, 1],
                    }}
                    className="group flex gap-5 items-start"
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-colors duration-300 group-hover:bg-white/10 group-hover:text-fun-green-400 group-hover:border-white/20 backdrop-blur-sm">
                      <Icon size={20} strokeWidth={1.5} />
                    </div>
                    <div className="flex flex-col pt-0.5">
                      <h3 className="font-semibold tracking-wide text-white text-sm">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm font-light leading-relaxed text-white/50">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between text-[10px] tracking-widest uppercase text-white/40 font-semibold border-t border-white/10 pt-8 mt-12">
          <span>
            © {new Date().getFullYear()} {portalName}.
          </span>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-fun-green-500 animate-pulse" />
            SECURE CONNECTION
          </div>
        </div>
      </div>

      {/* 
        ========================================================================
        RIGHT PANEL (AUTH FORM)
        ========================================================================
      */}
      <div className="relative flex w-full flex-col justify-center bg-white lg:w-[55%]">
        {/* Mobile Header */}
        <div className="absolute top-0 flex w-full items-center px-6 py-5 bg-[#070b09] text-white lg:hidden border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center p-1.5 rounded-lg bg-white/5 border border-white/10">
              <ShieldCheck size={20} className="text-fun-green-400" />
            </div>
            <span className="font-sans font-semibold tracking-wide text-sm">
              {portalName}
            </span>
          </div>
        </div>

        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="mx-auto w-full max-w-md px-6 sm:px-12 xl:px-0 py-24 lg:py-0"
          initial={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.6, ease: [0.19, 1, 0.22, 1] }}
        >
          <Stack gap="xl">
            <div className="text-center lg:text-left">
              <div className="inline-flex lg:hidden items-center justify-center w-12 h-12 rounded-xl bg-fun-green-50 border border-fun-green-100 text-fun-green-700 mb-6">
                <LockKeyhole size={24} strokeWidth={1.5} />
              </div>
              <h1 className="mb-3 font-sans text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl text-balance">
                {formTitle}
              </h1>
              <Text className="font-sans text-base text-stone-600 leading-relaxed font-light">
                {formDescription}
              </Text>
            </div>

            <div className="mt-4">
              <AuthStrategyResolver
                allowSignup={auth.allowSignup}
                invitationError={invitationError}
                invitationPreview={invitationPreview}
                invitationToken={invitationToken}
                restrictedDomains={restrictedDomains}
                strategies={auth.strategies}
              />
            </div>

            {footnote ? (
              <Text className="mt-6 text-center lg:text-left font-sans text-xs text-stone-500 max-w-sm mx-auto lg:mx-0">
                {footnote}
              </Text>
            ) : null}

            <div className="mt-12 flex flex-col items-center gap-3 text-[10px] tracking-widest uppercase text-stone-400 font-semibold lg:hidden">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-fun-green-500 animate-pulse" />
                SECURE CONNECTION
              </div>
              <span>
                © {new Date().getFullYear()} {portalName}.
              </span>
            </div>
          </Stack>
        </motion.div>
      </div>
    </div>
  );
}
