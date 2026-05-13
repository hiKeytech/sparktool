import { type ComponentType, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconArrowRight,
  IconAtom,
  IconAward,
  IconBook,
  IconBrain,
  IconBriefcase,
  IconCertificate,
  IconChartLine,
  IconClipboardList,
  IconCpu,
  IconDeviceDesktop,
  IconGlobe,
  IconHeart,
  IconLogin,
  IconMath,
  IconMenu2,
  IconPalette,
  IconPlayerPlay,
  IconShieldCheck,
  IconUsers,
  IconX,
} from "@tabler/icons-react";

import { getTenant } from "@/actions/tenant";
import { useListCourses } from "@/services/hooks";
import type { Tenant } from "@/schemas/tenant-contract";

// ─────────────────────────────────────────────────────────────────────────────
// ROUTE
// ─────────────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/nigerian-safety-investigation-bureau")({
  loader: async () => {
    try {
      const tenant = await getTenant({ data: "nsib" });
      return { tenant };
    } catch {
      return { tenant: null as Tenant | null };
    }
  },
  component: NSIBLandingPage,
});

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────

const QS = "'Quicksand', sans-serif";

const FALLBACK_STATS = [
  { label: "Active Students", value: "2,400+" },
  { label: "Completed Courses", value: "8,900+" },
  { label: "Expert Instructors", value: "150+" },
  { label: "Success Rate", value: "98%" },
];

const FALLBACK_CATEGORIES = [
  { icon: "briefcase", name: "Aviation Safety" },
  { icon: "atom", name: "Marine & Waterways" },
  { icon: "chart-line", name: "Road Transport Safety" },
  { icon: "cpu", name: "Accident Investigation" },
  { icon: "device-desktop", name: "Safety Management" },
  { icon: "brain", name: "Technical Analysis" },
  { icon: "globe", name: "International Standards" },
  { icon: "heart", name: "Crisis & Emergency" },
  { icon: "users", name: "Report Writing" },
  { icon: "math", name: "Data & Evidence" },
  { icon: "palette", name: "Field Investigation" },
  { icon: "briefcase", name: "Regulatory Compliance" },
];

const CERT_STEPS = [
  {
    num: 1,
    icon: IconBook,
    title: "Enrol in a Programme",
    desc: "Browse NSIB's curated course catalogue and enrol in programmes aligned with your investigation specialisation.",
  },
  {
    num: 2,
    icon: IconPlayerPlay,
    title: "Learn at Your Own Pace",
    desc: "Access structured video lessons, case study materials, and guided exercises from any device, anywhere.",
  },
  {
    num: 3,
    icon: IconClipboardList,
    title: "Complete Assessments",
    desc: "Reinforce your knowledge through module quizzes and practical scenario-based evaluations.",
  },
  {
    num: 4,
    icon: IconAward,
    title: "Pass the Final Examination",
    desc: "Demonstrate full mastery of your subject area with a comprehensive exam validated by NSIB standards.",
  },
  {
    num: 5,
    icon: IconCertificate,
    title: "Receive Your Certification",
    desc: "Earn a government-recognised digital certificate with a unique authentication key, verifiable online.",
  },
  {
    num: 6,
    icon: IconBriefcase,
    title: "Serve with Authority",
    desc: "Apply your skills in active investigations and contribute to Nigeria's national transport safety mandate.",
  },
];

const ICON_MAP: Record<
  string,
  ComponentType<{ size?: number; color?: string; stroke?: number }>
> = {
  atom: IconAtom,
  brain: IconBrain,
  briefcase: IconBriefcase,
  "chart-line": IconChartLine,
  cpu: IconCpu,
  "device-desktop": IconDeviceDesktop,
  globe: IconGlobe,
  heart: IconHeart,
  math: IconMath,
  palette: IconPalette,
  users: IconUsers,
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function NSIBLandingPage() {
  const navigate = useNavigate();
  const { tenant } = Route.useLoaderData() as { tenant: Tenant | null };
  const [mobileOpen, setMobileOpen] = useState(false);

  const site = tenant?.config.publicSite;
  const branding = tenant?.config.branding;
  const primaryColor = branding?.primaryColor ?? "#1b7339";
  const darkColor = "#0d3319";
  const portalName = branding?.portalName ?? "NSIB Learn";

  const stats = site?.stats ?? FALLBACK_STATS;
  const categories = site?.categories ?? FALLBACK_CATEGORIES;

  const { data: courses = [], isLoading: coursesLoading } = useListCourses(
    tenant?.id,
    { published: true },
  );
  const featuredCourses = courses.slice(0, 8);

  const handleLogin = () => navigate({ to: "/login" });

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Courses", href: "#courses" },
    { label: "Contact", href: "#contact" },
    { label: "Verify Certificate", href: "/verify-certificate" },
  ];

  return (
    <Box style={{ fontFamily: QS }}>
      {/* ══════════════════════════════════════════════════════════════
          NAV
      ══════════════════════════════════════════════════════════════ */}
      <Box
        component="header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          background: "white",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Container size="xl">
          <Group justify="space-between" py="sm">
            {/* Logo */}
            <Group gap="sm">
              {branding?.logoUrl ? (
                <img
                  src={branding.logoUrl}
                  alt={portalName}
                  style={{ height: 40, width: "auto" }}
                />
              ) : (
                <Box
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: primaryColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconShieldCheck size={22} color="white" />
                </Box>
              )}
              <Stack gap={0}>
                <Text
                  fw={700}
                  size="sm"
                  style={{ fontFamily: QS, color: "#111827", lineHeight: 1.2 }}
                >
                  {portalName}
                </Text>
                <Text
                  size="xs"
                  style={{ color: "#6b7280", fontFamily: QS, lineHeight: 1.2 }}
                >
                  Nigerian Safety Investigation Bureau
                </Text>
              </Stack>
            </Group>

            {/* Desktop links */}
            <Group gap="xl" visibleFrom="md">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "#374151",
                    textDecoration: "none",
                    fontFamily: QS,
                  }}
                >
                  {link.label}
                </a>
              ))}
            </Group>

            {/* Desktop login */}
            <Group visibleFrom="md">
              <Button
                leftSection={<IconLogin size={16} />}
                onClick={handleLogin}
                fw={600}
                style={{
                  fontFamily: QS,
                  background: primaryColor,
                  borderRadius: 8,
                }}
              >
                Login
              </Button>
            </Group>

            {/* Mobile toggle */}
            <Box hiddenFrom="md">
              <Button
                variant="subtle"
                color="dark"
                px="xs"
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                {mobileOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
              </Button>
            </Box>
          </Group>

          {mobileOpen && (
            <Stack gap="lg" pb="xl" hiddenFrom="md">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#111827",
                    textDecoration: "none",
                    fontFamily: QS,
                  }}
                >
                  {link.label}
                </a>
              ))}
              <Button
                fullWidth
                onClick={handleLogin}
                style={{ fontFamily: QS, background: primaryColor }}
              >
                Login
              </Button>
            </Stack>
          )}
        </Container>
      </Box>

      {/* ══════════════════════════════════════════════════════════════
          HERO  —  full-bleed photo + green overlay, bottom-left content
      ══════════════════════════════════════════════════════════════ */}
      <Box
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: "hidden",
        }}
      >
        {/* Background photo */}
        {site?.heroBackgroundImageUrl && (
          <Box
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url('${site.heroBackgroundImageUrl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              zIndex: 0,
            }}
          />
        )}

        {/* Green overlay */}
        <Box
          style={{
            position: "absolute",
            inset: 0,
            background: site?.heroBackgroundImageUrl
              ? "linear-gradient(to bottom right, rgba(13,51,25,0.80), rgba(27,115,57,0.68))"
              : `linear-gradient(140deg, ${darkColor} 0%, ${primaryColor} 55%, #1d8a42 100%)`,
            zIndex: 1,
          }}
        />

        {/* Content block (bottom-left) */}
        <Container
          size="xl"
          style={{
            position: "relative",
            zIndex: 2,
            paddingTop: 120,
            paddingBottom: 0,
          }}
        >
          <Box style={{ maxWidth: 680, paddingBottom: 40 }}>
            <Group gap="lg" mb={20} data-aos="fade-up">
              {site?.heroLogoUrl ? (
                <img
                  src={site.heroLogoUrl}
                  alt={site.heroLogoAlt ?? "NSIB Logo"}
                  style={{ height: 72, width: "auto" }}
                />
              ) : (
                <img
                  src="/nigerian-coat-of-arms.svg"
                  alt="Nigerian Coat of Arms"
                  style={{ height: 72, width: "auto" }}
                />
              )}
              <Title
                order={1}
                c="white"
                style={{
                  fontFamily: QS,
                  fontSize: "clamp(1.75rem, 4vw, 3.2rem)",
                  fontWeight: 700,
                  lineHeight: 1.2,
                }}
              >
                {site?.heroTitle ?? "Nigerian Safety Investigation Bureau"}
              </Title>
            </Group>

            <Text
              mb={32}
              style={{
                color: "rgba(255,255,255,0.88)",
                lineHeight: 1.75,
                maxWidth: 600,
                fontFamily: QS,
                fontSize: "1.0625rem",
              }}
              data-aos="fade-up"
              data-aos-delay="80"
            >
              {site?.heroDescription ??
                "The NSIB e-learning platform equips investigators, regulators, and safety professionals with world-class training across aviation, marine, and road transport sectors."}
            </Text>

            <Group gap="md" data-aos="fade-up" data-aos-delay="160">
              <Button
                size="lg"
                variant="white"
                onClick={handleLogin}
                fw={700}
                style={{
                  fontFamily: QS,
                  borderRadius: 6,
                  paddingLeft: 28,
                  paddingRight: 28,
                  color: primaryColor,
                }}
              >
                {site?.heroPrimaryCtaLabel ?? "Start Learning Today"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                color="white"
                component="a"
                href="#courses"
                fw={600}
                style={{
                  fontFamily: QS,
                  borderRadius: 6,
                  paddingLeft: 28,
                  paddingRight: 28,
                  borderColor: "rgba(255,255,255,0.5)",
                }}
              >
                {site?.heroSecondaryCtaLabel ?? "Explore Courses"}
              </Button>
            </Group>
          </Box>
        </Container>

        {/* Stat panels anchored to bottom */}
        <Box style={{ position: "relative", zIndex: 2, width: "100%" }}>
          <SimpleGrid cols={{ base: 2, sm: 4 }}>
            {stats.map((stat) => (
              <Box
                key={stat.label}
                p="lg"
                style={{
                  background: "rgba(0,0,0,0.25)",
                  backdropFilter: "blur(8px)",
                  borderTop: "1px solid rgba(255,255,255,0.12)",
                  textAlign: "center",
                }}
              >
                <Text
                  fw={800}
                  size="xl"
                  c="white"
                  style={{ fontFamily: QS }}
                >
                  {stat.value}
                </Text>
                <Text
                  size="xs"
                  style={{ color: "rgba(255,255,255,0.65)", fontFamily: QS }}
                >
                  {stat.label}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Box>

      {/* ══════════════════════════════════════════════════════════════
          CATEGORY PILL TAGS
      ══════════════════════════════════════════════════════════════ */}
      <Box style={{ background: "white", borderBottom: "1px solid #e5e7eb" }}>
        <Container size="xl" py="md">
          <Box style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {categories.map((cat) => {
              const Icon = ICON_MAP[cat.icon] ?? IconShieldCheck;
              return (
                <Group
                  key={cat.name}
                  gap={6}
                  px={12}
                  py={6}
                  style={{
                    border: `1.5px solid ${primaryColor}`,
                    borderRadius: 999,
                    cursor: "pointer",
                    flexShrink: 0,
                    transition: "all 0.15s ease",
                  }}
                  className="hover:bg-green-50"
                  onClick={handleLogin}
                >
                  <Icon size={13} color={primaryColor} />
                  <Text
                    size="xs"
                    fw={700}
                    style={{
                      color: primaryColor,
                      letterSpacing: "0.06em",
                      fontFamily: QS,
                    }}
                  >
                    {cat.name.toUpperCase()}
                  </Text>
                </Group>
              );
            })}
          </Box>
        </Container>
      </Box>

      {/* ══════════════════════════════════════════════════════════════
          FEATURED COURSES — green container
      ══════════════════════════════════════════════════════════════ */}
      <Box id="courses" py={24} px={{ base: 16, sm: 32, md: 60, lg: 80 }}>
        <Box
          p={{ base: 20, md: 32 }}
          style={{ background: primaryColor, borderRadius: 16 }}
        >
          <Group justify="space-between" align="center" mb={24}>
            <Text
              fw={700}
              size="xl"
              c="white"
              style={{ fontFamily: QS }}
            >
              {site?.featuredCoursesTitle ?? "Featured Courses"}
            </Text>
            <Button
              variant="outline"
              color="white"
              size="sm"
              rightSection={<IconArrowRight size={14} />}
              onClick={handleLogin}
              style={{
                fontFamily: QS,
                borderColor: "rgba(255,255,255,0.5)",
                borderRadius: 8,
              }}
            >
              {site?.featuredCoursesCtaLabel ?? "View All"}
            </Button>
          </Group>

          {coursesLoading ? (
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
              {Array.from({ length: 8 }).map((_, i) => (
                <Box
                  key={i}
                  style={{
                    height: 200,
                    borderRadius: 12,
                    background: "rgba(255,255,255,0.12)",
                  }}
                />
              ))}
            </SimpleGrid>
          ) : featuredCourses.length === 0 ? (
            <Paper
              p="xl"
              radius="lg"
              ta="center"
              style={{
                background: "rgba(255,255,255,0.1)",
                border: "2px dashed rgba(255,255,255,0.3)",
              }}
            >
              <IconBook size={36} color="rgba(255,255,255,0.5)" />
              <Text
                c="white"
                mt="md"
                fw={500}
                style={{ fontFamily: QS, opacity: 0.7 }}
              >
                Courses will appear here once published.
              </Text>
            </Paper>
          ) : (
            <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
              {featuredCourses.map((course, i) => (
                <Card
                  key={course.id}
                  radius="lg"
                  padding={0}
                  style={{
                    overflow: "hidden",
                    cursor: "pointer",
                    background: "white",
                    transition: "transform 0.2s ease",
                  }}
                  className="hover:-translate-y-1"
                  onClick={handleLogin}
                  data-aos="fade-up"
                  data-aos-delay={i * 50}
                >
                  <Box
                    style={{
                      height: 150,
                      background: course.thumbnailUrl
                        ? `url(${course.thumbnailUrl}) center/cover no-repeat`
                        : `linear-gradient(135deg, ${darkColor} 0%, ${primaryColor} 100%)`,
                      position: "relative",
                    }}
                  >
                    <Box
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "rgba(0,0,0,0.55)",
                        borderRadius: "50%",
                        width: 40,
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconPlayerPlay size={18} color="white" />
                    </Box>
                  </Box>
                  <Stack gap={4} p="sm">
                    <Text
                      fw={700}
                      size="sm"
                      lineClamp={2}
                      style={{ fontFamily: QS, color: "#111827" }}
                    >
                      {course.title}
                    </Text>
                    {course.difficulty && (
                      <Text
                        size="xs"
                        c="gray.5"
                        style={{ fontFamily: QS }}
                      >
                        {course.difficulty.charAt(0).toUpperCase() +
                          course.difficulty.slice(1)}
                      </Text>
                    )}
                  </Stack>
                </Card>
              ))}
            </SimpleGrid>
          )}
        </Box>
      </Box>

      {/* ══════════════════════════════════════════════════════════════
          MISSION / ABOUT
      ══════════════════════════════════════════════════════════════ */}
      <Box id="about" py={24} px={{ base: 16, sm: 32, md: 60, lg: 80 }}>
        <Paper
          radius="xl"
          p={{ base: 24, md: 40 }}
          style={{ border: "1px solid #e5e7eb" }}
        >
          <Grid gutter={48} align="center">
            <Grid.Col span={{ base: 12, md: 5 }} data-aos="fade-right">
              <Box
                style={{
                  borderRadius: "24px 80px 24px 24px",
                  overflow: "hidden",
                  boxShadow: "0 24px 64px rgba(27,115,57,0.18)",
                  height: 400,
                  background: `linear-gradient(135deg, ${darkColor}, ${primaryColor})`,
                }}
              >
                {site?.missionImageUrl && (
                  <img
                    src={site.missionImageUrl}
                    alt={site.missionImageAlt ?? "NSIB mission"}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                )}
              </Box>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 7 }} data-aos="fade-left">
              <Stack gap={20}>
                <Title
                  order={2}
                  style={{
                    fontFamily: QS,
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "#111827",
                    lineHeight: 1.35,
                  }}
                >
                  {site?.missionTitle ??
                    "Building Nigeria's Transport Safety Expertise"}
                </Title>
                <Text
                  size="md"
                  c="gray.7"
                  style={{ lineHeight: 1.8, fontFamily: QS }}
                >
                  {site?.missionDescription ??
                    "The Nigerian Safety Investigation Bureau is mandated to investigate accidents and serious incidents in the aviation, maritime, and road transport sectors. Our e-learning platform ensures every investigator, regulator, and safety officer has access to the training they need to uphold the highest professional standards."}
                </Text>
                <Button
                  size="md"
                  onClick={handleLogin}
                  fw={700}
                  style={{
                    fontFamily: QS,
                    background: primaryColor,
                    borderRadius: 10,
                    width: "fit-content",
                  }}
                  rightSection={<IconArrowRight size={16} />}
                >
                  {site?.missionCtaLabel ?? "Learn More About Our Mission"}
                </Button>
              </Stack>
            </Grid.Col>
          </Grid>
        </Paper>
      </Box>

      {/* ══════════════════════════════════════════════════════════════
          YOUR PATH TO CERTIFICATION
      ══════════════════════════════════════════════════════════════ */}
      <Box py={80} style={{ background: "white" }}>
        <Container size="xl">
          <Stack gap={56}>
            <Stack
              gap={12}
              align="center"
              ta="center"
              data-aos="fade-up"
            >
              <Text
                size="xs"
                fw={700}
                style={{
                  color: primaryColor,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontFamily: QS,
                }}
              >
                Step by Step
              </Text>
              <Title
                order={2}
                style={{
                  fontFamily: QS,
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                Your Path to Certification
              </Title>
              <Text
                size="md"
                c="gray.6"
                style={{ maxWidth: 520, fontFamily: QS, lineHeight: 1.7 }}
              >
                From enrolment to deployment — here is how NSIB professionals
                build and validate their expertise.
              </Text>
            </Stack>

            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
              {CERT_STEPS.map((step, i) => (
                <Paper
                  key={step.num}
                  p="xl"
                  radius="xl"
                  style={{
                    border: "2px solid #f3f4f6",
                    transition: "all 0.25s ease",
                  }}
                  className="hover:border-green-300 hover:shadow-lg"
                  data-aos="fade-up"
                  data-aos-delay={i * 70}
                >
                  <Stack gap="md">
                    <Group gap="md" align="center">
                      <Box
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 14,
                          background: `linear-gradient(135deg, ${primaryColor}, #209949)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <step.icon size={22} color="white" />
                      </Box>
                      <Text
                        style={{
                          fontSize: "2.8rem",
                          fontWeight: 800,
                          color: "#f3f4f6",
                          lineHeight: 1,
                          fontFamily: QS,
                          userSelect: "none",
                        }}
                      >
                        {String(step.num).padStart(2, "0")}
                      </Text>
                    </Group>
                    <Text
                      fw={700}
                      size="md"
                      style={{ fontFamily: QS, color: "#111827" }}
                    >
                      {step.title}
                    </Text>
                    <Text
                      size="sm"
                      c="gray.6"
                      style={{ lineHeight: 1.75, fontFamily: QS }}
                    >
                      {step.desc}
                    </Text>
                  </Stack>
                </Paper>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* ══════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════ */}
      <Box
        component="footer"
        py={32}
        style={{
          background: darkColor,
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Container size="xl">
          <Group justify="space-between" align="center" wrap="wrap" gap="lg">
            <Group gap="sm">
              {site?.footerLogoUrl ? (
                <img
                  src={site.footerLogoUrl}
                  alt={site.footerLogoAlt ?? portalName}
                  style={{
                    height: 44,
                    width: 44,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Box
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconShieldCheck size={22} color="rgba(255,255,255,0.7)" />
                </Box>
              )}
              <Stack gap={2}>
                <Text fw={700} size="sm" c="white" style={{ fontFamily: QS }}>
                  {portalName}
                </Text>
                <Text
                  size="xs"
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontFamily: QS,
                  }}
                >
                  {site?.footerTagline ?? "Nigerian Safety Investigation Bureau"}
                </Text>
              </Stack>
            </Group>

            <Group gap="lg" wrap="wrap">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.6)",
                    textDecoration: "none",
                    fontFamily: QS,
                  }}
                >
                  {link.label}
                </a>
              ))}
            </Group>
          </Group>

          <Divider
            mt="xl"
            mb="md"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          />
          <Text
            size="xs"
            ta="center"
            style={{ color: "rgba(255,255,255,0.35)", fontFamily: QS }}
          >
            {site?.copyright ??
              `© ${new Date().getFullYear()} Federal Republic of Nigeria. All rights reserved.`}
          </Text>
        </Container>
      </Box>
    </Box>
  );
}
