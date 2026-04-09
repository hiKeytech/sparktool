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
import { useNavigate } from "@tanstack/react-router";

import type { PlatformConfig } from "@/schemas/platform-config";

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

export function PlatformLandingPage({ platform }: PlatformLandingPageProps) {
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
        <div className="absolute inset-0 z-0 transition-colors duration-1000 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.08),_transparent_32%),linear-gradient(135deg,_#1d4f35_0%,_#113620_58%,_#070b09_100%)] opacity-100" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative z-10 px-6 pt-8 pb-24 mx-auto max-w-7xl lg:px-8 lg:pt-10 lg:pb-32">
          {/* Navigation */}
          <nav className="flex items-center justify-between pb-12 sm:pb-20">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center p-2 rounded-xl h-11 w-11 bg-white/5 border border-white/10 backdrop-blur-md">
                <ShieldCheck size={24} className="text-fun-green-400" />
              </div>
              <div>
                <h2 className="text-white text-sm font-semibold tracking-wide">
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
                className="hidden sm:block text-xs font-semibold text-white/60 hover:text-white transition-colors tracking-widest uppercase"
              >
                Support
              </a>
              <Button
                className="bg-white text-stone-900 hover:bg-stone-200 h-10 px-5 rounded-lg text-xs tracking-wider uppercase font-bold transition-all"
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
            <p className="text-lg sm:text-xl text-white/50 leading-relaxed max-w-2xl mb-12 font-light">
              {hero.heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <Button
                className="bg-fun-green-600 hover:bg-fun-green-500 text-white h-14 px-8 rounded-lg text-sm tracking-wider uppercase font-bold border border-fun-green-500 transition-all w-full sm:w-auto"
                onClick={() => navigate({ to: "/login" })}
                rightSection={<ArrowRight size={18} className="opacity-70" />}
              >
                {hero.primaryCtaLabel}
              </Button>
              <Button
                className="bg-transparent hover:bg-white/5 text-white h-14 px-8 rounded-lg text-sm tracking-wider uppercase font-bold border border-white/15 transition-all w-full sm:w-auto"
                onClick={() => navigate({ to: "/login" })}
              >
                {hero.secondaryCtaLabel}
              </Button>
            </div>
          </div>
        </div>

        {/* High-End Metrics Ticker */}
        <div className="border-t border-white/10 bg-white/[0.02] backdrop-blur-xl relative z-10">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 divide-y divide-white/10 border-x border-white/10 lg:divide-y-0 lg:divide-x">
              {metrics.map((metric, i) => (
                <div
                  key={metric.label}
                  className="py-6 px-6"
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.25em] mb-2">
                    {metric.label}
                  </p>
                  <p className="text-white text-3xl font-medium tracking-tight">
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
          className="bg-white py-24 sm:py-32 border-b border-stone-200"
          id="features"
        >
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-16 max-w-2xl" data-aos="fade-up">
              <p className="text-fun-green-700 text-xs font-bold uppercase tracking-[0.25em] mb-4">
                Platform Capabilities
              </p>
              <h2 className="text-4xl sm:text-5xl font-semibold text-stone-950 tracking-tight leading-tight">
                Institutional Grade Infrastructure.
              </h2>
              <p className="mt-6 text-lg text-stone-600 leading-relaxed font-light">
                Professional-grade environment to onboard, configure, and
                operate learning mandates securely — with absolute confidence.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {highlights.map((highlight, index) => {
                const HighlightIcon =
                  highlightIconCycle[index % highlightIconCycle.length];

                return (
                  <div
                    key={highlight.title}
                    className="group relative p-8 bg-stone-50 rounded-2xl border border-stone-200/60 hover:bg-stone-100 hover:border-stone-300 transition-colors duration-300 ease-out"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-white border border-stone-200 text-fun-green-700 shadow-sm group-hover:scale-110 transition-transform duration-300">
                      <HighlightIcon size={20} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg font-semibold text-stone-950 mb-3 tracking-tight">
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
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Steps */}
            <div>
              <p
                className="text-fun-green-700 text-xs font-bold uppercase tracking-[0.25em] mb-4"
                data-aos="fade-right"
              >
                Deployment Flow
              </p>
              <h2
                className="text-3xl sm:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-12"
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
                    <div className="shrink-0 pt-1">
                      <span className="text-fun-green-700/20 text-4xl font-semibold tracking-tighter">
                        {item.step}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-stone-950 uppercase tracking-widest mb-3">
                        {item.title}
                      </h4>
                      <p className="text-stone-600 leading-relaxed text-sm">
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
                className="text-3xl sm:text-4xl font-semibold text-stone-950 tracking-tight leading-tight mb-12"
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
                      className="bg-white p-6 rounded-2xl border border-stone-200/70 shadow-sm"
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <FeatureIcon
                        size={20}
                        className="text-stone-400 mb-4"
                        strokeWidth={1.5}
                      />
                      <h4 className="text-sm font-semibold text-stone-950 uppercase tracking-wider mb-2">
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-fun-green-900/30 blur-[120px] rounded-full pointer-events-none" />

        <div
          className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center"
          data-aos="fade-up"
        >
          <p className="text-white/40 text-xs font-bold uppercase tracking-[0.25em] mb-6">
            ENTERPRISE DEPLOYMENT
          </p>
          <h2 className="text-4xl sm:text-5xl font-semibold text-white tracking-tight leading-tight mb-10">
            Scale Your Operational Network.
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Button
              className="bg-white hover:bg-stone-200 text-stone-950 h-14 px-10 rounded-lg text-sm tracking-wider uppercase font-bold transition-all w-full sm:w-auto"
              onClick={() => navigate({ to: "/login" })}
            >
              Access Platform
            </Button>
            <Button
              className="bg-transparent hover:bg-white/5 text-white h-14 px-10 rounded-lg text-sm tracking-wider uppercase font-bold border border-white/15 transition-all w-full sm:w-auto"
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
