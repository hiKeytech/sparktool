import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { useLayoutEffect } from "react";
import { getPlatformConfig } from "@/actions/platform";
import { ServiceUnavailable } from "@/components/service-unavailable";
import { useResolvedAuthState } from "@/providers/auth-provider";
import type { PlatformConfig } from "@/schemas/platform-config";
import { applyBrandingTheme } from "@/utils/branding-theme";
import { resolveRoleHomeTarget } from "@/utils/tenant-paths";
import { Button } from "@mantine/core";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CheckCircle2,
  GraduationCap,
  LockKeyhole,
  type LucideIcon,
  ShieldCheck,
  Users,
  Waypoints,
  Activity,
} from "lucide-react";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    const platform = await getPlatformConfig();
    return { platform };
  },
  component: PlatformLandingRoute,
});

function PlatformLandingRoute() {
  const { platform } = Route.useRouteContext() as {
    platform: PlatformConfig | null;
  };
  const { loading, session, user } = useResolvedAuthState();

  useLayoutEffect(() => {
    if (!platform) return;
    applyBrandingTheme({
      ...platform.branding,
      description: platform.marketing.heroDescription,
    });
  }, [platform]);

  if (!platform) return <ServiceUnavailable />;

  if (!loading && user) {
    return (
      <Navigate
        replace
        {...resolveRoleHomeTarget(user.role, session?.tenantIds?.[0])}
      />
    );
  }

  return <PlatformLandingPage platform={platform} />;
}

interface PlatformLandingPageProps {
  platform: PlatformConfig;
}

const highlightIconCycle: LucideIcon[] = [
  ShieldCheck,
  GraduationCap,
  Users,
  BookOpen,
  Building2,
  CheckCircle2,
];

const featureIconCycle: LucideIcon[] = [
  LockKeyhole,
  Waypoints,
  BookOpen,
  ShieldCheck,
  Users,
  GraduationCap,
];

function PlatformLandingPage({ platform }: PlatformLandingPageProps) {
  const navigate = useNavigate();
  const hero = platform.marketing;
  const highlights = hero.highlights;
  const loginFeatures = platform.branding.loginPage.features;
  const authRouteCount = platform.auth.strategies.length;
  const accessModel = platform.auth.allowSignup
    ? "Self-Service"
    : "Internal Admin";

  const metrics = [
    { label: "ACCESS MODEL", value: accessModel },
    { label: "AUTH ROUTES", value: authRouteCount.toString().padStart(2, "0") },
    {
      label: "CAPABILITIES",
      value: highlights.length.toString().padStart(2, "0"),
    },
    { label: "UPTIME TARGET", value: "99.9%" },
  ];

  return (
    <div className="min-h-screen bg-[#070b09] text-stone-900 font-sans selection:bg-fun-green-500/30">
      {/* 
        ========================================================================
        HERO SECTION (DARK, COMMAND SUITE STYLE)
        ========================================================================
      */}
      <section className="relative overflow-hidden border-b border-white/5 bg-[#070b09]">
        {/* Deep Nigerian Green Gradient Background */}
        <div className="absolute inset-0 z-0 transition-colors duration-1000 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_32%),linear-gradient(135deg,#1d4f35_0%,#113620_58%,#070b09_100%)] opacity-100" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative z-10 px-6 pt-8 pb-24 mx-auto max-w-7xl lg:px-8 lg:pt-10 lg:pb-32">
          {/* Navigation */}
          <nav className="flex items-center justify-between pb-12 sm:pb-20">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center p-2 border rounded-xl h-11 w-11 bg-white/5 border-white/10 backdrop-blur-md">
                <ShieldCheck size={24} className="text-fun-green-400" />
              </div>
              <div>
                <h2 className="text-sm font-semibold tracking-wide text-white">
                  {platform.branding.portalName}
                </h2>
                <p className="text-white/50 text-[10px] uppercase tracking-[0.2em] font-medium hidden sm:block">
                  Infrastructure
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="mailto:support@correctional.gov.ng"
                className="hidden text-xs font-semibold tracking-widest uppercase transition-colors sm:block text-white/60 hover:text-white"
              >
                Support
              </a>
              <Button
                className="h-10 px-5 text-xs font-bold tracking-wider uppercase transition-all bg-white rounded-lg text-stone-900 hover:bg-stone-200"
                onClick={() => navigate({ to: "/login" })}
              >
                Enter Platform
              </Button>
            </div>
          </nav>

          {/* Hero Content */}
          <div className="max-w-4xl" data-aos="fade-up">
            <p className="text-fun-green-400 text-xs sm:text-sm font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-3">
              <Activity size={16} />
              <span>{hero.eyebrow}</span>
            </p>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold text-white tracking-tighter leading-[1.05] mb-8">
              {hero.heroTitle.replace(".", "")}
              <span className="text-fun-green-500">.</span>
            </h1>
            <p className="max-w-2xl mb-12 text-lg font-light leading-relaxed sm:text-xl text-white/50">
              {hero.heroDescription}
            </p>

            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Button
                className="w-full px-8 text-sm font-bold tracking-wider text-white uppercase transition-all border rounded-lg bg-fun-green-600 hover:bg-fun-green-500 h-14 border-fun-green-500 sm:w-auto"
                onClick={() => navigate({ to: "/login" })}
                rightSection={<ArrowRight size={18} className="opacity-70" />}
              >
                {hero.primaryCtaLabel}
              </Button>
              <Button
                className="w-full px-8 text-sm font-bold tracking-wider text-white uppercase transition-all bg-transparent border rounded-lg hover:bg-white/5 h-14 border-white/15 sm:w-auto"
                onClick={() => navigate({ to: "/login" })}
              >
                {hero.secondaryCtaLabel}
              </Button>
            </div>
          </div>
        </div>

        {/* High-End Metrics Ticker */}
        <div className="relative z-10 border-t border-white/10 bg-white/2 backdrop-blur-xl">
          <div className="px-6 mx-auto max-w-7xl lg:px-8">
            <div className="grid grid-cols-2 divide-y lg:grid-cols-4 divide-white/10 border-x border-white/10 lg:divide-y-0 lg:divide-x">
              {metrics.map((metric, i) => (
                <div
                  key={metric.label}
                  className="px-6 py-6"
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.25em] mb-2">
                    {metric.label}
                  </p>
                  <p className="text-3xl font-medium tracking-tight text-white">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        BENTO GRID (STARK WHITE, INSTITUTIONAL)
        ========================================================================
      */}
      {highlights.length > 0 && (
        <section
          className="py-24 bg-white border-b sm:py-32 border-stone-200"
          id="features"
        >
          <div className="px-6 mx-auto max-w-7xl lg:px-8">
            <div className="max-w-2xl mb-16" data-aos="fade-up">
              <p className="text-fun-green-700 text-xs font-bold uppercase tracking-[0.25em] mb-4">
                Platform Capabilities
              </p>
              <h2 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl text-stone-950">
                Institutional Grade Infrastructure.
              </h2>
              <p className="mt-6 text-lg font-light leading-relaxed text-stone-600">
                Professional-grade environment to onboard, configure, and
                operate learning mandates securely — with absolute confidence.
              </p>
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {highlights.map((highlight, index) => {
                const HighlightIcon =
                  highlightIconCycle[index % highlightIconCycle.length];

                return (
                  <div
                    key={highlight.title}
                    className="relative p-8 transition-colors duration-300 ease-out border group bg-stone-50 rounded-2xl border-stone-200/60 hover:bg-stone-100 hover:border-stone-300"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 mb-6 transition-transform duration-300 bg-white border shadow-sm rounded-xl border-stone-200 text-fun-green-700 group-hover:scale-110">
                      <HighlightIcon size={20} strokeWidth={1.5} />
                    </div>
                    <h3 className="mb-3 text-lg font-semibold tracking-tight text-stone-950">
                      {highlight.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-stone-600">
                      {highlight.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 
        ========================================================================
        STEP-BY-STEP & GUIDED CUES (SLEEK GREY / WHITE CONTRAST)
        ========================================================================
      */}
      <section className="bg-[#fbFAF9] py-24 sm:py-32">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Steps */}
            <div>
              <p
                className="text-fun-green-700 text-xs font-bold uppercase tracking-[0.25em] mb-4"
                data-aos="fade-right"
              >
                Deployment Flow
              </p>
              <h2
                className="mb-12 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl text-stone-950"
                data-aos="fade-right"
              >
                From Authentication to Live Progress, Structurally Complete.
              </h2>

              <div className="space-y-12">
                {[
                  {
                    step: "01",
                    title: "AUTHENTICATE ACCESS",
                    body: "Users enter through a controlled authentication route aligned to the platform's approved, secure access model.",
                  },
                  {
                    step: "02",
                    title: "SELECT LEARNING PATHWAY",
                    body: "Highlighted priorities and guided entry cues point each user toward the correct organizational track immediately.",
                  },
                  {
                    step: "03",
                    title: "EXECUTE MODULES",
                    body: "Track engagement through a heavily structured experience. Progress is logged, timestamped, and auditable.",
                  },
                ].map((item, i) => (
                  <div
                    key={item.step}
                    className="flex gap-6"
                    data-aos="fade-up"
                    data-aos-delay={i * 100}
                  >
                    <div className="pt-1 shrink-0">
                      <span className="text-4xl font-semibold tracking-tighter text-fun-green-700/20">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <h4 className="mb-3 text-sm font-bold tracking-widest uppercase text-stone-950">
                        {item.title}
                      </h4>
                      <p className="text-sm leading-relaxed text-stone-600">
                        {item.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Guided Cues Bento subset */}
            <div>
              <p
                className="text-fun-green-700 text-xs font-bold uppercase tracking-[0.25em] mb-4"
                data-aos="fade-left"
              >
                Guided Variables
              </p>
              <h2
                className="mb-12 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl text-stone-950"
                data-aos="fade-left"
              >
                Configuration Engine.
              </h2>

              <div className="grid gap-4 sm:grid-cols-2">
                {loginFeatures.map((feature, index) => {
                  const FeatureIcon =
                    featureIconCycle[index % featureIconCycle.length];
                  return (
                    <div
                      key={feature.title}
                      className="p-6 bg-white border shadow-sm rounded-2xl border-stone-200/70"
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <FeatureIcon
                        size={20}
                        className="mb-4 text-stone-400"
                        strokeWidth={1.5}
                      />
                      <h4 className="mb-2 text-sm font-semibold tracking-wider uppercase text-stone-950">
                        {feature.title}
                      </h4>
                      <p className="text-xs leading-relaxed text-stone-500">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        ========================================================================
        FOOTER CTA
        ========================================================================
      */}
      <section className="bg-[#070b09] py-24 border-t border-white/10 relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-fun-green-900/30 blur-[120px] rounded-full pointer-events-none" />

        <div
          className="relative z-10 max-w-4xl px-6 mx-auto text-center lg:px-8"
          data-aos="fade-up"
        >
          <p className="text-white/40 text-xs font-bold uppercase tracking-[0.25em] mb-6">
            ENTERPRISE DEPLOYMENT
          </p>
          <h2 className="mb-10 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Scale Your Operational Network.
          </h2>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              className="w-full px-10 text-sm font-bold tracking-wider uppercase transition-all bg-white rounded-lg hover:bg-stone-200 text-stone-950 h-14 sm:w-auto"
              onClick={() => navigate({ to: "/login" })}
            >
              Access Platform
            </Button>
            <Button
              className="w-full px-10 text-sm font-bold tracking-wider text-white uppercase transition-all bg-transparent border rounded-lg hover:bg-white/5 h-14 border-white/15 sm:w-auto"
              onClick={() => navigate({ to: "/login" })}
            >
              Support Hub
            </Button>
          </div>

          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold">
            <p>
              © {new Date().getFullYear()} {platform.branding.portalName}{" "}
              INFRASTRUCTURE. ALL RIGHTS RESERVED.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-fun-green-500 animate-pulse" />
              ALL SYSTEMS OPERATIONAL
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
