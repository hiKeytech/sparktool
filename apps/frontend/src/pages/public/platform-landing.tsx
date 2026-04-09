import {
  Badge,
  Button,
  Container,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
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
    ? "Managed self-service"
    : "Admin-approved access";
  const operationalSignals = [
    {
      label: "Access model",
      value: accessModel,
    },
    {
      label: "Authentication",
      value: `${authRouteCount} configured sign-in route${authRouteCount === 1 ? "" : "s"}`,
    },
    {
      label: "Platform focus",
      value: `${highlights.length} highlighted ${highlights.length === 1 ? "capability" : "capabilities"}`,
    },
    {
      label: "Guided entry",
      value: `${loginFeatures.length} onboarding cue${loginFeatures.length === 1 ? "" : "s"}`,
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <section
        className="overflow-hidden text-white"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(255,255,255,0.18), transparent 32%), linear-gradient(135deg, var(--color-primary) 0%, #184f2c 58%, #0f2f1d 100%)",
        }}
      >
        <Container className="py-6 sm:py-8 lg:py-10" size="xl">
          <header className="flex flex-col gap-4 pb-6 mb-10 border-b border-white/10 sm:flex-row sm:items-center sm:justify-between lg:mb-16">
            <Group align="center" gap="md" wrap="nowrap">
              <div className="flex items-center justify-center p-2 border rounded-lg shadow-sm h-14 w-14 border-white/20 bg-white/10 backdrop-blur-sm">
                <img
                  alt={platform.branding.portalName}
                  className="object-contain w-full h-full"
                  src={platform.branding.logoUrl}
                />
              </div>
              <div>
                <Text className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70">
                  Official Learning Platform
                </Text>
                <Text className="font-sans text-lg font-semibold text-white sm:text-xl">
                  {platform.branding.portalName}
                </Text>
              </div>
            </Group>

            <Button
              className="bg-white min-h-11 text-fun-green-800 hover:bg-stone-100"
              onClick={() => navigate({ to: "/login" })}
              rightSection={<ArrowRight size={18} />}
              size="md"
            >
              Portal Access
            </Button>
          </header>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)] lg:items-start lg:gap-8">
            <Stack className="max-w-3xl" gap="xl" data-aos="fade-up">
              <div>
                <Badge
                  className="mb-5 text-white border-white/20 bg-white/10 backdrop-blur-sm"
                  radius="md"
                  size="lg"
                  variant="outline"
                >
                  {hero.eyebrow}
                </Badge>
                <Title
                  className="max-w-4xl font-sans text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl"
                  order={1}
                >
                  {hero.heroTitle}
                </Title>
              </div>

              <Text className="max-w-2xl text-base leading-8 text-white/86 sm:text-lg">
                {hero.heroDescription}
              </Text>

              <Group gap="md">
                <Button
                  className="px-6 bg-white min-h-12 text-fun-green-800 hover:bg-stone-100"
                  onClick={() => navigate({ to: "/login" })}
                  rightSection={<ArrowRight size={18} />}
                  size="lg"
                >
                  {hero.primaryCtaLabel}
                </Button>
                <Button
                  className="px-6 text-white min-h-12 border-white/25 hover:bg-white/10"
                  onClick={() => navigate({ to: "/login" })}
                  size="lg"
                  variant="outline"
                >
                  {hero.secondaryCtaLabel}
                </Button>
              </Group>

              <Group gap="sm">
                <Badge className="text-white bg-white/10" radius="md" size="lg">
                  Role-based access
                </Badge>
                <Badge className="text-white bg-white/10" radius="md" size="lg">
                  Secure authentication
                </Badge>
                <Badge className="text-white bg-white/10" radius="md" size="lg">
                  Structured progress tracking
                </Badge>
              </Group>
            </Stack>

            <Paper
              className="border shadow-2xl border-white/15 bg-white/96 text-stone-900 backdrop-blur-sm"
              data-aos="fade-left"
              p="xl"
              radius="lg"
            >
              <Stack gap="lg">
                <div>
                  <Text className="text-xs font-semibold uppercase tracking-[0.22em] text-fun-green-800">
                    Operational Snapshot
                  </Text>
                  <Title
                    className="mt-2 font-sans text-2xl font-semibold text-stone-900"
                    order={2}
                  >
                    Authoritative access with guided learning pathways.
                  </Title>
                </div>

                <SimpleGrid cols={{ base: 1, xs: 2 }} spacing="md">
                  {operationalSignals.map((signal) => (
                    <Paper
                      className="h-full border border-stone-200 bg-stone-50"
                      key={signal.label}
                      p="md"
                      radius="lg"
                    >
                      <Text className="text-xs font-medium uppercase tracking-[0.18em] text-stone-600">
                        {signal.label}
                      </Text>
                      <Text className="mt-2 text-sm font-semibold leading-6 text-stone-900">
                        {signal.value}
                      </Text>
                    </Paper>
                  ))}
                </SimpleGrid>

                <Divider color="var(--mantine-color-stone-2)" />

                <Stack gap="sm">
                  <Text className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-600">
                    Priority Areas
                  </Text>
                  {highlights.slice(0, 3).map((highlight, index) => {
                    const HighlightIcon =
                      highlightIconCycle[index % highlightIconCycle.length];

                    return (
                      <Group
                        align="flex-start"
                        gap="sm"
                        key={highlight.title}
                        wrap="nowrap"
                      >
                        <ThemeIcon
                          className="mt-1 bg-fun-green-100 text-fun-green-800"
                          radius="md"
                          size={40}
                          variant="light"
                        >
                          <HighlightIcon size={18} />
                        </ThemeIcon>
                        <div>
                          <Text className="text-sm font-semibold text-stone-900">
                            {highlight.title}
                          </Text>
                          <Text className="text-sm leading-6 text-stone-600">
                            {highlight.description}
                          </Text>
                        </div>
                      </Group>
                    );
                  })}
                </Stack>
              </Stack>
            </Paper>
          </div>
        </Container>
      </section>

      {highlights.length > 0 ? (
        <section>
          <Container className="py-16 sm:py-20" size="xl">
            <div className="max-w-2xl mb-10" data-aos="fade-up">
              <Text className="text-xs font-semibold uppercase tracking-[0.22em] text-fun-green-800">
                Platform Capabilities
              </Text>
              <Title
                className="mt-3 font-sans text-3xl font-semibold text-stone-900 sm:text-4xl"
                order={2}
              >
                A stronger front door for secure learning operations.
              </Title>
              <Text className="mt-4 text-base leading-7 text-stone-600">
                The platform is positioned as an official gateway: clear entry,
                visible accountability, and a direct path from sign-in to
                programme participation.
              </Text>
            </div>

            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
              {highlights.map((highlight, index) => {
                const HighlightIcon =
                  highlightIconCycle[index % highlightIconCycle.length];

                return (
                  <Paper
                    className="h-full transition-transform duration-200 ease-out bg-white border shadow-sm border-stone-200 hover:-translate-y-1"
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                    key={highlight.title}
                    p="xl"
                    radius="lg"
                  >
                    <Stack gap="md">
                      <ThemeIcon
                        className="bg-fun-green-100 text-fun-green-800"
                        radius="md"
                        size={48}
                        variant="light"
                      >
                        <HighlightIcon size={22} />
                      </ThemeIcon>
                      <Title
                        className="font-sans text-xl font-semibold text-stone-900"
                        order={3}
                      >
                        {highlight.title}
                      </Title>
                      <Text className="text-sm leading-7 text-stone-600">
                        {highlight.description}
                      </Text>
                    </Stack>
                  </Paper>
                );
              })}
            </SimpleGrid>
          </Container>
        </section>
      ) : null}

      <section className="bg-white">
        <Container className="py-16 sm:py-20" size="xl">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-start">
            <Paper
              className="border border-stone-200 bg-stone-50"
              data-aos="fade-right"
              p="xl"
              radius="lg"
            >
              <Stack gap="xl">
                <div>
                  <Text className="text-xs font-semibold uppercase tracking-[0.22em] text-fun-green-800">
                    Platform Journey
                  </Text>
                  <Title
                    className="mt-3 font-sans text-3xl font-semibold text-stone-900"
                    order={2}
                  >
                    Built for orderly access and visible progression.
                  </Title>
                </div>

                <Stack gap="lg">
                  {[
                    {
                      body: "Users enter through a controlled authentication route aligned to the platform's approved access model.",
                      step: "01",
                      title: "Authenticate with approved credentials",
                    },
                    {
                      body: "Highlighted priorities and guided entry cues point each user toward the right learning pathway immediately.",
                      step: "02",
                      title: "Move directly into the right programme area",
                    },
                    {
                      body: "The experience reinforces completion, oversight, and institutional clarity instead of leaving the next action ambiguous.",
                      step: "03",
                      title: "Track engagement through a structured experience",
                    },
                  ].map((item) => (
                    <Group
                      align="flex-start"
                      gap="md"
                      key={item.step}
                      wrap="nowrap"
                    >
                      <div className="flex items-center justify-center w-12 h-12 text-sm font-semibold text-white rounded-full shrink-0 bg-fun-green-800">
                        {item.step}
                      </div>
                      <div>
                        <Text className="text-base font-semibold text-stone-900">
                          {item.title}
                        </Text>
                        <Text className="mt-1 text-sm leading-7 text-stone-600">
                          {item.body}
                        </Text>
                      </div>
                    </Group>
                  ))}
                </Stack>
              </Stack>
            </Paper>

            <div>
              <div className="max-w-2xl mb-8" data-aos="fade-up">
                <Text className="text-xs font-semibold uppercase tracking-[0.22em] text-fun-green-800">
                  Guided Entry Cues
                </Text>
                <Title
                  className="mt-3 font-sans text-3xl font-semibold text-stone-900"
                  order={2}
                >
                  The supporting details now carry more weight.
                </Title>
              </div>

              <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
                {loginFeatures.map((feature, index) => {
                  const FeatureIcon =
                    featureIconCycle[index % featureIconCycle.length];

                  return (
                    <Paper
                      className="h-full bg-white border shadow-sm border-stone-200"
                      data-aos="fade-up"
                      data-aos-delay={index * 50}
                      key={feature.title}
                      p="lg"
                      radius="lg"
                    >
                      <Stack gap="sm">
                        <ThemeIcon
                          className="bg-fun-green-100 text-fun-green-800"
                          radius="md"
                          size={44}
                          variant="light"
                        >
                          <FeatureIcon size={20} />
                        </ThemeIcon>
                        <Title
                          className="font-sans text-lg font-semibold text-stone-900"
                          order={3}
                        >
                          {feature.title}
                        </Title>
                        <Text className="text-sm leading-7 text-stone-600">
                          {feature.description}
                        </Text>
                      </Stack>
                    </Paper>
                  );
                })}
              </SimpleGrid>
            </div>
          </div>
        </Container>
      </section>

      <section>
        <Container className="pb-16 sm:pb-20" size="xl">
          <Paper
            className="overflow-hidden text-white border shadow-lg border-fun-green-900/10 bg-fun-green-800"
            data-aos="fade-up"
            p="xl"
            radius="lg"
          >
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
              <div>
                <Text className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">
                  Ready For Entry
                </Text>
                <Title
                  className="mt-3 font-sans text-3xl font-semibold text-white sm:text-4xl"
                  order={2}
                >
                  Access {platform.branding.portalName} through the authorised
                  portal.
                </Title>
                <Text className="max-w-2xl mt-4 text-base leading-7 text-white/82">
                  The homepage now establishes trust, direction, and platform
                  readiness before the user reaches authentication.
                </Text>
              </div>

              <Group gap="md">
                <Button
                  className="px-6 bg-white min-h-12 text-fun-green-800 hover:bg-stone-100"
                  onClick={() => navigate({ to: "/login" })}
                  rightSection={<ArrowRight size={18} />}
                  size="lg"
                >
                  {hero.primaryCtaLabel}
                </Button>
              </Group>
            </div>
          </Paper>
        </Container>
      </section>
    </div>
  );
}
