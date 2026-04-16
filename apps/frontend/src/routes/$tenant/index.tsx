import {
  Anchor,
  Button,
  Group,
  Text,
  Title,
  Paper,
  Badge,
} from "@mantine/core";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { ChevronRight, ShieldCheck, Database, LayoutGrid } from "lucide-react";
import { type LucideIcon } from "lucide-react";

import { useResolvedAuthState } from "@/providers/auth-provider";
import type { Tenant } from "@/schemas/tenant-contract";
import { resolveRoleHomeTarget } from "@/utils/tenant-paths";

export const Route = createFileRoute("/$tenant/")({
  component: TenantLandingPage,
});

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  delay,
}: FeatureCardProps) {
  return (
    <Paper
      p="xl"
      radius="xl"
      className="bg-[#0c160f]/80 backdrop-blur-xl border border-[#1b7339]/20 hover:border-[#1b7339]/50 transition-all duration-500 overflow-hidden relative group h-full"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="absolute inset-0 bg-linear-to-br from-[#1b7339]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">
        <div className="mb-6 inline-flex p-3 rounded-2xl bg-linear-to-br from-[#1b7339] to-[#0f4420] text-white shadow-lg shadow-[#1b7339]/20 ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-500">
          <Icon size={28} strokeWidth={1.5} />
        </div>
        <h3 className="mb-3 text-xl font-bold tracking-tight text-white">
          {title}
        </h3>
        <p className="text-sm font-light leading-relaxed text-white/60 sm:text-base">
          {description}
        </p>
      </div>
    </Paper>
  );
}

const CURRENT_YEAR = new Date().getFullYear();

function TenantLandingPage() {
  const { tenant } = Route.useRouteContext() as { tenant: Tenant };
  const { loading, user } = useResolvedAuthState(tenant);
  const { portalName } = tenant.config.branding;
  const { copyright, footerTagline } = tenant.config.publicSite;

  if (!loading && user) {
    return (
      <Navigate replace {...resolveRoleHomeTarget(user.role, tenant.id)} />
    );
  }

  return (
    <div className="min-h-screen bg-[#070b09] selection:bg-[#1b7339]/30 font-sans flex flex-col font-light text-stone-200">
      {/* ====================================================================
          GLOBAL NAVIGATION
          ==================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-5 lg:px-8 bg-[#070b09]/80 backdrop-blur-md border-b border-white/5 transition-all">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <Group
            gap="sm"
            className="transition-opacity opacity-90 hover:opacity-100"
          >
            <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-[#1b7339] to-[#0f4420] flex items-center justify-center border border-white/10 shadow-lg">
              <ShieldCheck size={18} className="text-white" />
            </div>
            <div className="flex flex-col">
              <Text className="text-sm font-bold leading-none tracking-wide text-white">
                {portalName}
              </Text>
              <Text className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-medium leading-none mt-1">
                Infrastructure
              </Text>
            </div>
          </Group>

          <Group gap="md">
            <Text className="hidden md:block text-xs uppercase tracking-widest text-[#1b7339] font-bold">
              Secure Terminal
            </Text>
            <Link to="/$tenant/login" params={{ tenant: tenant.id }}>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white hover:text-[#070b09] font-semibold text-xs uppercase tracking-wider h-10 px-6 rounded-xl transition-all"
              >
                Access Portal
              </Button>
            </Link>
          </Group>
        </div>
      </header>

      {/* ====================================================================
          HERO SECTION
          ==================================================================== */}
      <div className="relative flex items-center pt-32 pb-20 border-b grow lg:pt-48 lg:pb-32 border-white/5">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(27,115,57,0.15),transparent_40%),linear-gradient(180deg,#070b09_0%,#0a140d_100%)]" />
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative z-10 flex flex-col items-center gap-16 px-6 mx-auto text-center max-w-7xl lg:px-8 sm:text-left md:flex-row">
          <div className="flex-1 md:pr-12" data-aos="fade-up">
            <Badge
              color="green"
              variant="outline"
              size="sm"
              className="mb-6 tracking-[0.2em] uppercase bg-[#1b7339]/10 border-[#1b7339]/30 text-[#1b7339] font-bold"
            >
              {tenant.name}
            </Badge>
            <Title className="text-5xl sm:text-6xl lg:text-[5rem] font-bold text-white leading-[1.1] tracking-tighter mb-8 max-w-3xl">
              Knowledge{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-[#1b7339] to-[#34d399] font-serif italic pr-2">
                Deployments
              </span>{" "}
              at Scale.
            </Title>
            <p className="max-w-2xl mt-4 mb-10 text-base font-light leading-relaxed sm:text-lg text-white/50">
              Secure, multi-layered learning infrastructure built for structural
              integrity and rapid onboarding across distributed agencies.
            </p>
            <Group className="justify-center sm:justify-start">
              <Link to="/$tenant/login" params={{ tenant: tenant.id }}>
                <Button
                  size="lg"
                  rightSection={<ChevronRight size={18} />}
                  className="bg-linear-to-br from-[#1b7339] to-[#0f4420] text-white hover:opacity-90 shadow-xl shadow-[#1b7339]/20 h-14 px-8 rounded-full font-bold uppercase tracking-wider text-xs transition-all hover:-translate-y-1"
                >
                  Authenticate Now
                </Button>
              </Link>
            </Group>
          </div>

          <div
            className="flex-1 hidden md:block"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="relative w-full mx-auto cursor-pointer aspect-square max-w-125 group perspective-1000">
              <div className="absolute inset-4 rounded-4xl bg-linear-to-tr from-[#1b7339]/20 to-transparent border border-white/10 backdrop-blur-xl rotate-10 group-hover:rotate-15 transition-all duration-700 ease-out shadow-2xl" />
              <div className="absolute inset-8 rounded-4xl bg-linear-to-b from-[#1b7339]/40 to-[#070b09] border border-[#1b7339]/40 backdrop-blur-2xl -rotate-[5deg] group-hover:-rotate-[8deg] transition-all duration-700 ease-out p-8 flex flex-col justify-end shadow-2xl">
                <div className="w-12 h-12 bg-white mb-6 rounded-xl shadow-[0_0_40px_rgba(255,255,255,0.4)]" />
                <div className="w-1/3 h-2 mb-3 rounded-full bg-white/20" />
                <div className="w-2/3 h-2 rounded-full bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          BENTO GRID FEATURES
          ==================================================================== */}
      <div className="relative z-10 w-full px-6 py-24 mx-auto border-b lg:py-32 max-w-7xl lg:px-8 border-white/5">
        <div className="mb-20 text-center">
          <h2 className="text-[#1b7339] text-xs font-bold uppercase tracking-[0.25em] mb-4">
            Engineered For Scale
          </h2>
          <h3 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Institutional Architecture
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <FeatureCard
            icon={LayoutGrid}
            title="Multi-Tenant Core"
            description="Isolate operations with cryptographically discrete domains. Launch localized environments for separate departments instantly."
            delay={0}
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Sovereign Access"
            description="Military-grade role-based access control. Ensure granular visibility bounds for administrative oversight vs generic consumption."
            delay={150}
          />
          <FeatureCard
            icon={Database}
            title="Telemetry Streams"
            description="Real-time analytics and metric rollups. Track knowledge propagation and compliance completion across network nodes."
            delay={300}
          />
        </div>
      </div>

      {/* ====================================================================
          FOOTER
          ==================================================================== */}
      <footer className="relative bg-[#070b09] border-t border-transparent pt-16 pb-8">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 pb-12 mb-8 border-b md:flex-row border-white/5">
            <Group
              gap="sm"
              className="transition-all duration-500 opacity-50 cursor-default grayscale hover:opacity-100 hover:grayscale-0"
            >
              <div className="w-6 h-6 rounded-md bg-[#1b7339] flex items-center justify-center">
                <ShieldCheck size={14} className="text-white" />
              </div>
              <Text className="text-sm font-bold tracking-wider text-white uppercase">
                {portalName}
              </Text>
            </Group>

            <Group gap="xl">
              {[
                "Compliance",
                "Infrastructure",
                "Security Policy",
                "Telemetry",
              ].map((link) => (
                <Anchor
                  key={link}
                  href="#"
                  className="text-[10px] uppercase tracking-widest text-white/40 hover:text-white font-bold transition-colors"
                >
                  {link}
                </Anchor>
              ))}
            </Group>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Text className="text-xs font-medium text-white/30">
              &copy; {CURRENT_YEAR} {copyright}
            </Text>
            <Text className="text-[10px] uppercase text-white/20 font-mono tracking-widest">
              {footerTagline}
            </Text>
          </div>
        </div>
      </footer>
    </div>
  );
}
