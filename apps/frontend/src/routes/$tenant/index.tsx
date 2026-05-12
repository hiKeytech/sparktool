import { Badge, Button, Group, Paper, Text, Title } from "@mantine/core";
import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Atom,
  Brain,
  BriefcaseBusiness,
  Calculator,
  ChartColumn,
  ChevronRight,
  Cpu,
  Globe,
  Heart,
  Monitor,
  Palette,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

import { useResolvedAuthState } from "@/providers/auth-provider";
import type { Tenant } from "@/schemas/tenant-contract";
import { resolveRoleHomeTarget } from "@/utils/tenant-paths";

export const Route = createFileRoute("/$tenant/")({
  component: TenantLandingPage,
});

const CURRENT_YEAR = new Date().getFullYear();

const categoryIconMap: Record<string, LucideIcon> = {
  briefcase: BriefcaseBusiness,
  brain: Brain,
  "chart-line": ChartColumn,
  cpu: Cpu,
  "device-desktop": Monitor,
  heart: Heart,
  users: Users,
  math: Calculator,
  atom: Atom,
  palette: Palette,
  globe: Globe,
};

function CategoryCard({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <Paper
      p="xl"
      radius="lg"
      className="h-full transition-all duration-300 border shadow-sm bg-(--app-surface) border-(--app-border) hover:-translate-y-1 hover:border-(--app-border-strong) hover:shadow-md"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <div className="inline-flex items-center justify-center w-12 h-12 mb-6 text-white rounded-lg bg-fun-green-800">
        <Icon size={22} strokeWidth={1.8} />
      </div>
      <h3 className="mb-3 text-xl font-semibold tracking-tight text-(--app-text)">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-(--app-text-muted) sm:text-base">
        {description}
      </p>
    </Paper>
  );
}

function StatCard({
  label,
  value,
  delay,
}: {
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <div
      className="p-6 border rounded-lg shadow-sm bg-(--app-surface) border-(--app-border)"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-(--app-text-subtle)">
        {label}
      </p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-(--app-text)">
        {value}
      </p>
    </div>
  );
}

function TenantHeroPreview({
  imageUrl,
  imageAlt,
  logoUrl,
  logoAlt,
  portalName,
}: {
  imageUrl: string;
  imageAlt: string;
  logoUrl: string;
  logoAlt: string;
  portalName: string;
}) {
  return (
    <div className="relative" data-aos="fade-left" data-aos-delay="150">
      <div className="overflow-hidden border rounded-lg shadow-xl bg-(--app-surface) border-(--app-border)">
        <div className="relative h-105 bg-(--app-surface-soft)">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-linear-to-t from-stone-950/35 via-stone-950/5 to-transparent" />
          <div className="absolute inline-flex items-center gap-3 px-4 py-3 border rounded-lg shadow-sm left-6 top-6 border-white/60 bg-(--app-surface-elevated) backdrop-blur">
            <img
              src={logoUrl}
              alt={logoAlt}
              className="object-contain w-10 h-10"
            />
            <div>
              <p className="text-xs font-bold tracking-[0.18em] uppercase text-fun-green-800">
                {portalName}
              </p>
              <p className="text-sm font-medium text-(--app-text-muted)">
                Courses, progress, and live sessions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TenantLandingPage() {
  const { tenant } = Route.useRouteContext() as { tenant: Tenant };
  const { loading, user } = useResolvedAuthState(tenant);
  const allowSignup = tenant.config.auth.allowSignup;
  const { portalName } = tenant.config.branding;
  const publicSite = tenant.config.publicSite;
  const {
    categories,
    categorySectionTitle,
    copyright,
    featuredCoursesCtaLabel,
    featuredCoursesTitle,
    footerLogoAlt,
    footerLogoUrl,
    footerTagline,
    heroBackgroundImageUrl,
    heroDescription,
    heroLogoAlt,
    heroLogoUrl,
    heroPrimaryCtaLabel,
    heroSecondaryCtaLabel,
    heroTitle,
    missionCtaLabel,
    missionDescription,
    missionImageAlt,
    missionImageUrl,
    missionTitle,
    stats,
  } = publicSite;

  if (!loading && user) {
    return (
      <Navigate replace {...resolveRoleHomeTarget(user.role, tenant.id)} />
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans text-(--app-text) bg-(--app-bg) selection:bg-fun-green-500/20">
      <header className="sticky top-0 z-50 px-6 py-4 border-b backdrop-blur-sm bg-(--app-surface-elevated) border-(--app-border) lg:px-8">
        <div className="flex items-center justify-between mx-auto max-w-7xl">
          <Group
            gap="sm"
            className="transition-opacity opacity-90 hover:opacity-100"
          >
            <img
              src={heroLogoUrl}
              alt={heroLogoAlt}
              className="object-contain w-10 h-10 rounded-md"
            />
            <div className="flex flex-col">
              <Text className="text-sm font-bold leading-none tracking-wide text-(--app-text)">
                {portalName}
              </Text>
              <Text className="mt-1 text-[10px] font-medium leading-none uppercase tracking-[0.2em] text-(--app-text-subtle)">
                Learning Portal
              </Text>
            </div>
          </Group>

          <Group gap="md">
            <Text className="hidden text-xs font-bold tracking-widest uppercase md:block text-fun-green-800">
              Explore Courses
            </Text>
            <Link to="/$tenant/login" params={{ tenant: tenant.id }}>
              <Button
                variant="outline"
                className="h-10 px-6 text-xs font-semibold tracking-wider uppercase transition-all border rounded-md border-(--app-border-strong) text-(--app-text) hover:bg-(--app-surface-soft)"
              >
                Access Portal
              </Button>
            </Link>
          </Group>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative overflow-hidden border-b bg-(--app-surface) border-(--app-border)">
          <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top_left,rgba(27,115,57,0.12),transparent_40%)]" />
          <div className="relative px-6 pt-16 pb-20 mx-auto max-w-7xl lg:px-8 lg:pt-24 lg:pb-24">
            <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
              <div data-aos="fade-up">
                <Badge
                  color="green"
                  variant="light"
                  size="sm"
                  className="mb-6 tracking-[0.2em] uppercase font-bold"
                >
                  {tenant.name}
                </Badge>
                <Title className="max-w-3xl mb-8 text-5xl font-semibold leading-[1.05] tracking-tight text-(--app-text) sm:text-6xl lg:text-7xl">
                  {heroTitle}
                </Title>
                <p className="max-w-2xl text-lg leading-relaxed text-(--app-text-muted) sm:text-xl">
                  {heroDescription}
                </p>

                <Group className="mt-10">
                  <Link to="/$tenant/login" params={{ tenant: tenant.id }}>
                    <Button
                      size="lg"
                      rightSection={<ChevronRight size={18} />}
                      className="px-8 text-xs font-bold tracking-wider text-white uppercase rounded-md h-14 bg-fun-green-800 hover:bg-fun-green-700"
                    >
                      {heroPrimaryCtaLabel}
                    </Button>
                  </Link>
                  <Button
                    component="a"
                    href="#learning-overview"
                    variant="light"
                    size="lg"
                    className="px-8 text-xs font-bold tracking-wider uppercase rounded-md h-14 bg-(--app-surface-soft) text-(--app-text) hover:opacity-90"
                  >
                    {heroSecondaryCtaLabel}
                  </Button>
                </Group>

                {allowSignup ? (
                  <Group className="mt-4" gap="sm">
                    <Text className="text-sm font-medium text-(--app-text-muted)">
                      New learner?
                    </Text>
                    <Link
                      params={{ tenant: tenant.id }}
                      search={{ mode: "sign-up" }}
                      to="/$tenant/login"
                    >
                      <Button
                        variant="subtle"
                        className="px-0 text-xs font-bold tracking-wider uppercase text-fun-green-800 hover:bg-transparent hover:text-fun-green-700"
                      >
                        Create student account
                      </Button>
                    </Link>
                  </Group>
                ) : null}
              </div>

              <TenantHeroPreview
                imageUrl={heroBackgroundImageUrl}
                imageAlt={heroLogoAlt}
                logoUrl={heroLogoUrl}
                logoAlt={heroLogoAlt}
                portalName={portalName}
              />
            </div>
          </div>
        </section>

        <section className="px-6 py-16 mx-auto max-w-7xl lg:px-8 lg:py-20">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <StatCard
                key={`${stat.label}-${stat.value}`}
                label={stat.label}
                value={stat.value}
                delay={index * 80}
              />
            ))}
          </div>
        </section>

        <section
          id="learning-overview"
          className="py-20 border-y bg-(--app-surface-soft) border-(--app-border)"
        >
          <div className="grid items-center gap-12 px-6 mx-auto max-w-7xl lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:px-8">
            <div
              className="overflow-hidden border rounded-lg shadow-sm bg-(--app-surface) border-(--app-border)"
              data-aos="fade-right"
            >
              <img
                src={missionImageUrl}
                alt={missionImageAlt}
                className="object-cover w-full h-full min-h-80"
              />
            </div>

            <div data-aos="fade-left">
              <p className="mb-4 text-xs font-bold tracking-[0.25em] uppercase text-fun-green-800">
                Mission
              </p>
              <Title className="text-4xl font-semibold tracking-tight text-(--app-text) sm:text-5xl">
                {missionTitle}
              </Title>
              <Text className="max-w-2xl mt-6 text-lg leading-relaxed text-(--app-text-muted)">
                {missionDescription}
              </Text>
              <Link to="/$tenant/login" params={{ tenant: tenant.id }}>
                <Button
                  size="lg"
                  rightSection={<ArrowRight size={18} />}
                  className="px-8 mt-8 text-xs font-bold tracking-wider text-white uppercase rounded-md h-14 bg-fun-green-800 hover:bg-fun-green-700"
                >
                  {missionCtaLabel}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 mx-auto max-w-7xl lg:px-8 lg:py-24">
          <div className="max-w-3xl mb-14" data-aos="fade-up">
            <p className="mb-4 text-xs font-bold tracking-[0.25em] uppercase text-fun-green-800">
              Learning Areas
            </p>
            <h2 className="text-4xl font-semibold tracking-tight text-(--app-text) sm:text-5xl">
              {categorySectionTitle}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-(--app-text-muted)">
              Browse learning areas to find courses that match your goals and
              get started at your own pace.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {categories.map((category, index) => {
              const Icon = categoryIconMap[category.icon] ?? ShieldCheck;

              return (
                <CategoryCard
                  key={`${category.icon}-${category.name}`}
                  icon={Icon}
                  title={category.name}
                  description={`Explore ${category.name} courses with step-by-step lessons and clear progress tracking.`}
                  delay={index * 90}
                />
              );
            })}
          </div>
        </section>

        <section className="px-6 pb-24 mx-auto max-w-7xl lg:px-8 lg:pb-28">
          <div
            className="p-8 text-white border rounded-lg shadow-lg bg-fun-green-800 border-fun-green-900/80 lg:flex lg:items-center lg:justify-between lg:gap-10 lg:p-10"
            data-aos="fade-up"
          >
            <div className="max-w-3xl">
              <p className="text-xs font-bold tracking-[0.22em] uppercase text-white/70">
                Featured Learning
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                {featuredCoursesTitle}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">
                Sign in to explore course collections, follow structured
                lessons, and continue through guided learning paths.
              </p>
            </div>

            <Link to="/$tenant/login" params={{ tenant: tenant.id }}>
              <Button
                size="lg"
                rightSection={<ArrowRight size={18} />}
                className="px-8 mt-8 text-xs font-bold tracking-wider uppercase rounded-md h-14 bg-(--app-surface) text-fun-green-900 hover:bg-(--app-surface-soft) lg:mt-0"
              >
                {featuredCoursesCtaLabel}
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <footer className="pt-16 pb-8 border-t bg-(--app-surface) border-(--app-border)">
        <div className="px-6 mx-auto max-w-7xl lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 pb-12 mb-8 border-b md:flex-row border-(--app-border)">
            <Group
              gap="sm"
              className="transition-opacity opacity-80 hover:opacity-100"
            >
              <img
                src={footerLogoUrl}
                alt={footerLogoAlt}
                className="object-contain w-8 h-8 rounded-md"
              />
              <Text className="text-sm font-bold tracking-wider uppercase text-(--app-text)">
                {portalName}
              </Text>
            </Group>

            <Text className="text-xs font-medium text-(--app-text-subtle)">
              {footerTagline}
            </Text>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <Text className="text-xs font-medium text-(--app-text-subtle)">
              {copyright || `© ${CURRENT_YEAR} ${portalName}`}
            </Text>
            <Text className="font-mono text-[10px] uppercase tracking-widest text-(--app-text-subtle)">
              {footerTagline}
            </Text>
          </div>
        </div>
      </footer>
    </div>
  );
}
