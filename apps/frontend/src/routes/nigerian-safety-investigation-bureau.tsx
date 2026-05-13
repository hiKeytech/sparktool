import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
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
  IconAward,
  IconBook,
  IconBriefcase,
  IconCertificate,
  IconChartBar,
  IconClipboardList,
  IconFileAnalytics,
  IconFlame,
  IconHelicopter,
  IconMenu2,
  IconPlayerPlay,
  IconRoad,
  IconShieldCheck,
  IconStar,
  IconTrendingUp,
  IconWaveSine,
  IconX,
} from "@tabler/icons-react";

export const Route = createFileRoute("/nigerian-safety-investigation-bureau")({
  component: NSIBLandingPage,
});

// ─────────────────────────────────────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────────────────────────────────────

const QS = "'Quicksand', sans-serif";
const GREEN = "#0d3319";
const MID_GREEN = "#1b7339";
const LIGHT_GREEN = "#86efac";

const stats = [
  { label: "Investigators Trained", value: "2,400+" },
  { label: "Courses Available", value: "60+" },
  { label: "Certifications Issued", value: "8,900+" },
  { label: "Success Rate", value: "98%" },
];

const categories = [
  { name: "Aviation Safety", icon: IconHelicopter },
  { name: "Marine & Waterways", icon: IconWaveSine },
  { name: "Road Transport Safety", icon: IconRoad },
  { name: "Accident Investigation", icon: IconFileAnalytics },
  { name: "Safety Management", icon: IconShieldCheck },
  { name: "Technical Analysis", icon: IconChartBar },
  { name: "Regulatory Compliance", icon: IconClipboardList },
  { name: "Crisis & Emergency", icon: IconFlame },
  { name: "Report Writing", icon: IconBook },
  { name: "Field Investigation", icon: IconBriefcase },
  { name: "Data & Evidence", icon: IconChartBar },
  { name: "International Standards", icon: IconAward },
];

const journeySteps = [
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

const missionPoints = [
  "Accredited by the Federal Ministry of Aviation & Aerospace Development",
  "Aligned with ICAO, IMO, and international safety standards",
  "Structured pathways for all investigation disciplines",
  "Digital certificates verifiable through NSIB's secure portal",
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

function NSIBLandingPage() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Courses", href: "#courses" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Partners", href: "#partners" },
  ];

  const handleLogin = () => navigate({ to: "/login" });

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
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid #e5e7eb",
        }}
      >
        <Container size="xl">
          <Group justify="space-between" py="md">
            {/* Logo */}
            <Group gap="sm">
              <Box
                style={{
                  width: 36,
                  height: 36,
                  background: MID_GREEN,
                  borderRadius: 8,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <IconShieldCheck size={20} color="white" />
              </Box>
              <Stack gap={0}>
                <Text
                  fw={800}
                  size="sm"
                  style={{ fontFamily: QS, color: GREEN, lineHeight: 1.2 }}
                >
                  NSIB Learn
                </Text>
                <Text
                  size="xs"
                  style={{ color: "#6b7280", fontFamily: QS, lineHeight: 1.2 }}
                >
                  Nigerian Safety Investigation Bureau
                </Text>
              </Stack>
            </Group>

            {/* Desktop nav */}
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

            {/* Desktop CTA */}
            <Group gap="sm" visibleFrom="md">
              <Button
                variant="subtle"
                color="dark"
                fw={600}
                style={{ fontFamily: QS }}
                onClick={handleLogin}
              >
                Sign In
              </Button>
              <Button
                fw={700}
                style={{
                  fontFamily: QS,
                  background: MID_GREEN,
                  borderRadius: 10,
                }}
                onClick={handleLogin}
                rightSection={<IconArrowRight size={15} />}
              >
                Start Learning
              </Button>
            </Group>

            {/* Mobile menu toggle */}
            <Box hiddenFrom="md">
              <Button
                variant="subtle"
                color="dark"
                px="xs"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <IconX size={22} /> : <IconMenu2 size={22} />}
              </Button>
            </Box>
          </Group>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <Stack gap="lg" pb="xl" hiddenFrom="md">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    fontSize: "1.1rem",
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
                fw={700}
                style={{
                  fontFamily: QS,
                  background: MID_GREEN,
                  borderRadius: 10,
                }}
                onClick={handleLogin}
              >
                Sign In / Start Learning
              </Button>
            </Stack>
          )}
        </Container>
      </Box>

      {/* ══════════════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════════════ */}
      <Box
        style={{
          background: `linear-gradient(140deg, ${GREEN} 0%, ${MID_GREEN} 55%, #1d8a42 100%)`,
          minHeight: "100vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background texture */}
        <Box
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            opacity: 0.04,
            zIndex: 0,
          }}
        />
        {/* Decorative orbs */}
        <Box
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
            zIndex: 0,
          }}
        />
        <Box
          style={{
            position: "absolute",
            bottom: -160,
            left: -80,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
            zIndex: 0,
          }}
        />

        <Container size="xl" style={{ position: "relative", zIndex: 1 }}>
          <Grid
            align="center"
            gutter={60}
            style={{ minHeight: "100vh", paddingTop: 110, paddingBottom: 60 }}
          >
            {/* LEFT — headline + CTAs */}
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap={32}>
                {/* Eyebrow */}
                <Group gap="md" data-aos="fade-up">
                  <img
                    src="/nigerian-coat-of-arms.svg"
                    alt="Nigerian Coat of Arms"
                    style={{ height: 64, width: "auto" }}
                  />
                  <Box
                    px={16}
                    py={6}
                    style={{
                      background: "rgba(255,255,255,0.12)",
                      borderRadius: 999,
                      border: "1px solid rgba(255,255,255,0.25)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <Text
                      size="xs"
                      fw={700}
                      c="white"
                      style={{ letterSpacing: "0.1em", fontFamily: QS }}
                    >
                      FEDERAL REPUBLIC OF NIGERIA
                    </Text>
                  </Box>
                </Group>

                {/* Headline */}
                <Stack gap={16} data-aos="fade-up" data-aos-delay="100">
                  <Title
                    order={1}
                    style={{
                      fontFamily: QS,
                      fontSize: "clamp(2.4rem, 5vw, 3.8rem)",
                      fontWeight: 700,
                      color: "white",
                      lineHeight: 1.15,
                    }}
                  >
                    Advancing Safety Through{" "}
                    <span style={{ color: LIGHT_GREEN }}>Knowledge</span>
                  </Title>
                  <Text
                    size="lg"
                    style={{
                      color: "rgba(255,255,255,0.85)",
                      lineHeight: 1.75,
                      maxWidth: 520,
                      fontFamily: QS,
                    }}
                  >
                    The{" "}
                    <strong style={{ color: LIGHT_GREEN }}>
                      Nigerian Safety Investigation Bureau
                    </strong>{" "}
                    e-learning platform equips investigators, regulators, and
                    safety professionals with world-class training across
                    aviation, marine, and road transport sectors.
                  </Text>
                </Stack>

                {/* CTAs */}
                <Group gap="md" data-aos="fade-up" data-aos-delay="200">
                  <Button
                    size="lg"
                    variant="white"
                    onClick={handleLogin}
                    fw={700}
                    style={{
                      fontFamily: QS,
                      borderRadius: 12,
                      paddingLeft: 28,
                      paddingRight: 28,
                    }}
                    rightSection={<IconArrowRight size={18} />}
                  >
                    Start Learning Today
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    color="white"
                    href="#courses"
                    component="a"
                    fw={600}
                    style={{
                      fontFamily: QS,
                      borderRadius: 12,
                      paddingLeft: 28,
                      paddingRight: 28,
                      borderColor: "rgba(255,255,255,0.45)",
                    }}
                  >
                    Explore Courses
                  </Button>
                </Group>

                {/* Trust chips */}
                <Group gap="xl" data-aos="fade-up" data-aos-delay="300">
                  {[
                    { icon: IconShieldCheck, label: "Government Accredited" },
                    { icon: IconTrendingUp, label: "98% Success Rate" },
                    { icon: IconStar, label: "ICAO & IMO Aligned" },
                  ].map(({ icon: Icon, label }) => (
                    <Group key={label} gap={6}>
                      <Icon size={16} color={LIGHT_GREEN} />
                      <Text
                        size="sm"
                        style={{
                          color: "rgba(255,255,255,0.85)",
                          fontFamily: QS,
                        }}
                      >
                        {label}
                      </Text>
                    </Group>
                  ))}
                </Group>
              </Stack>
            </Grid.Col>

            {/* RIGHT — floating stat cards (desktop only) */}
            <Grid.Col span={{ base: 0, md: 6 }} visibleFrom="md">
              <Box
                style={{ position: "relative", height: 520 }}
                data-aos="fade-left"
                data-aos-delay="150"
              >
                {/* Background card */}
                <Box
                  style={{
                    position: "absolute",
                    inset: 0,
                    borderRadius: "24px 24px 24px 80px",
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    backdropFilter: "blur(8px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Stack align="center" gap="md">
                    <Box
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.1)",
                        border: "2px solid rgba(255,255,255,0.2)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <IconShieldCheck
                        size={48}
                        color="rgba(255,255,255,0.7)"
                      />
                    </Box>
                    <Text
                      fw={700}
                      size="xl"
                      c="white"
                      ta="center"
                      style={{ fontFamily: QS, maxWidth: 280 }}
                    >
                      Nigerian Safety
                      <br />
                      Investigation Bureau
                    </Text>
                    <Text
                      size="sm"
                      ta="center"
                      style={{
                        color: "rgba(255,255,255,0.6)",
                        fontFamily: QS,
                        maxWidth: 240,
                      }}
                    >
                      Securing Nigeria's skies, waters, and roads through
                      professional excellence.
                    </Text>
                  </Stack>
                </Box>

                {/* Floating stat cards */}
                {(
                  [
                    {
                      value: "2,400+",
                      label: "Investigators Trained",
                      style: { top: "8%", left: "-13%" },
                    },
                    {
                      value: "60+",
                      label: "Available Courses",
                      style: { top: "44%", right: "-11%" },
                    },
                    {
                      value: "98%",
                      label: "Success Rate",
                      style: { bottom: "10%", left: "-11%" },
                    },
                  ] as const
                ).map((s) => (
                  <Paper
                    key={s.label}
                    p="md"
                    radius="xl"
                    shadow="xl"
                    style={{
                      position: "absolute",
                      ...s.style,
                      background: "white",
                      minWidth: 148,
                      zIndex: 2,
                    }}
                  >
                    <Text
                      fw={800}
                      size="xl"
                      style={{ color: MID_GREEN, fontFamily: QS }}
                    >
                      {s.value}
                    </Text>
                    <Text
                      size="xs"
                      c="gray.5"
                      fw={600}
                      style={{ fontFamily: QS }}
                    >
                      {s.label}
                    </Text>
                  </Paper>
                ))}
              </Box>
            </Grid.Col>
          </Grid>
        </Container>

        {/* Scroll hint */}
        <Stack
          align="center"
          gap={8}
          style={{
            position: "absolute",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 1,
          }}
        >
          <Text
            size="xs"
            style={{
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.12em",
              fontFamily: QS,
              textTransform: "uppercase",
            }}
          >
            Scroll to Explore
          </Text>
          <Box
            style={{
              width: 2,
              height: 36,
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
              borderRadius: 1,
            }}
          />
        </Stack>
      </Box>

      {/* ══════════════════════════════════════════════════════════════
          STATS STRIP
      ══════════════════════════════════════════════════════════════ */}
      <Box style={{ background: "white", borderBottom: "1px solid #e5e7eb" }}>
        <Container size="xl">
          <SimpleGrid cols={{ base: 2, sm: 4 }} py={44}>
            {stats.map((stat, i) => (
              <Box
                key={stat.label}
                ta="center"
                style={{
                  borderRight:
                    i < stats.length - 1 ? "1px solid #e5e7eb" : "none",
                  padding: "0 20px",
                }}
                data-aos="fade-up"
                data-aos-delay={i * 80}
              >
                <Text
                  fw={800}
                  style={{
                    fontSize: "2.2rem",
                    color: MID_GREEN,
                    fontFamily: QS,
                    lineHeight: 1.2,
                  }}
                >
                  {stat.value}
                </Text>
                <Text
                  size="sm"
                  c="gray.6"
                  fw={500}
                  mt={4}
                  style={{ fontFamily: QS }}
                >
                  {stat.label}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* ══════════════════════════════════════════════════════════════
          COURSES SECTION
      ══════════════════════════════════════════════════════════════ */}
      <Box id="courses" py={80} style={{ background: "#f8faf9" }}>
        <Container size="xl">
          <Stack gap={48}>
            <Group justify="space-between" align="flex-end" data-aos="fade-up">
              <Box>
                <Text
                  size="xs"
                  fw={700}
                  mb={8}
                  style={{
                    color: MID_GREEN,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontFamily: QS,
                  }}
                >
                  Course Categories
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
                  Explore Learning Pathways
                </Title>
                <Text
                  size="md"
                  c="gray.6"
                  mt="xs"
                  style={{ maxWidth: 500, fontFamily: QS, lineHeight: 1.7 }}
                >
                  From aviation accident investigation to marine safety
                  standards — find the programme that matches your role and
                  responsibilities.
                </Text>
              </Box>
              <Button
                variant="subtle"
                color="green"
                rightSection={<IconArrowRight size={16} />}
                onClick={handleLogin}
                fw={600}
                style={{ fontFamily: QS }}
              >
                View All Courses
              </Button>
            </Group>

            <SimpleGrid cols={{ base: 2, sm: 3, md: 4, lg: 6 }} spacing="md">
              {categories.map((cat, i) => (
                <Paper
                  key={cat.name}
                  p="lg"
                  radius="xl"
                  style={{
                    cursor: "pointer",
                    border: "2px solid #e5e7eb",
                    textAlign: "center",
                    transition: "all 0.2s ease",
                    background: "white",
                  }}
                  className="hover:shadow-md hover:-translate-y-1"
                  onClick={handleLogin}
                  data-aos="fade-up"
                  data-aos-delay={i * 35}
                >
                  <Stack gap="sm" align="center">
                    <Box
                      style={{
                        width: 52,
                        height: 52,
                        background: "#f0fdf4",
                        borderRadius: 16,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <cat.icon size={26} color={MID_GREEN} />
                    </Box>
                    <Text
                      size="xs"
                      fw={700}
                      style={{
                        fontFamily: QS,
                        color: "#374151",
                        lineHeight: 1.3,
                      }}
                    >
                      {cat.name}
                    </Text>
                  </Stack>
                </Paper>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* ══════════════════════════════════════════════════════════════
          MISSION / ABOUT
      ══════════════════════════════════════════════════════════════ */}
      <Box
        id="about"
        py={80}
        style={{
          background: "#f0fdf4",
          borderTop: "1px solid #dcfce7",
          borderBottom: "1px solid #dcfce7",
        }}
      >
        <Container size="xl">
          <Grid gutter={60} align="center">
            <Grid.Col span={{ base: 12, md: 5 }} data-aos="fade-right">
              <Box
                style={{
                  borderRadius: "24px 80px 24px 24px",
                  overflow: "hidden",
                  boxShadow: "0 24px 64px rgba(27,115,57,0.18)",
                  background: `linear-gradient(135deg, ${GREEN} 0%, ${MID_GREEN} 100%)`,
                  minHeight: 400,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Stack align="center" gap="xl" p="xl">
                  <Box
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.12)",
                      border: "2px solid rgba(255,255,255,0.25)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconShieldCheck size={56} color="rgba(255,255,255,0.9)" />
                  </Box>
                  <Stack align="center" gap="xs">
                    <Text
                      fw={800}
                      size="xl"
                      c="white"
                      ta="center"
                      style={{ fontFamily: QS }}
                    >
                      NSIB
                    </Text>
                    <Text
                      size="sm"
                      ta="center"
                      style={{
                        color: "rgba(255,255,255,0.7)",
                        fontFamily: QS,
                        maxWidth: 220,
                        lineHeight: 1.6,
                      }}
                    >
                      Nigerian Safety Investigation Bureau
                    </Text>
                  </Stack>
                  <SimpleGrid cols={3} spacing="md" style={{ width: "100%" }}>
                    {[
                      { icon: IconHelicopter, label: "Aviation" },
                      { icon: IconWaveSine, label: "Marine" },
                      { icon: IconRoad, label: "Road" },
                    ].map(({ icon: Icon, label }) => (
                      <Stack key={label} align="center" gap={6}>
                        <Icon size={24} color={LIGHT_GREEN} />
                        <Text
                          size="xs"
                          c="white"
                          fw={600}
                          style={{ fontFamily: QS }}
                        >
                          {label}
                        </Text>
                      </Stack>
                    ))}
                  </SimpleGrid>
                </Stack>
              </Box>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 7 }} data-aos="fade-left">
              <Stack gap={28}>
                <Box>
                  <Text
                    size="xs"
                    fw={700}
                    mb={8}
                    style={{
                      color: MID_GREEN,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      fontFamily: QS,
                    }}
                  >
                    Our Mission
                  </Text>
                  <Title
                    order={2}
                    style={{
                      fontFamily: QS,
                      fontSize: "1.85rem",
                      fontWeight: 700,
                      color: "#111827",
                      lineHeight: 1.35,
                    }}
                  >
                    Building Nigeria's Transport Safety Expertise
                  </Title>
                </Box>

                <Text
                  size="lg"
                  c="gray.7"
                  style={{ lineHeight: 1.8, fontFamily: QS }}
                >
                  The{" "}
                  <strong style={{ color: MID_GREEN }}>
                    Nigerian Safety Investigation Bureau
                  </strong>{" "}
                  is mandated to investigate accidents and serious incidents in
                  the aviation, maritime, and road transport sectors. Our
                  e-learning platform ensures every investigator, regulator, and
                  safety officer has access to the training they need to uphold
                  the highest professional standards.
                </Text>

                <Stack gap={10}>
                  {missionPoints.map((point) => (
                    <Group key={point} gap="sm">
                      <Box
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          background: MID_GREEN,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <IconShieldCheck size={13} color="white" />
                      </Box>
                      <Text
                        size="sm"
                        fw={600}
                        c="gray.7"
                        style={{ fontFamily: QS }}
                      >
                        {point}
                      </Text>
                    </Group>
                  ))}
                </Stack>

                <Button
                  size="md"
                  onClick={handleLogin}
                  fw={700}
                  style={{
                    fontFamily: QS,
                    background: MID_GREEN,
                    borderRadius: 12,
                    width: "fit-content",
                  }}
                  rightSection={<IconArrowRight size={16} />}
                >
                  Access the Platform
                </Button>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      {/* ══════════════════════════════════════════════════════════════
          LEARNING JOURNEY
      ══════════════════════════════════════════════════════════════ */}
      <Box id="how-it-works" py={80} style={{ background: "white" }}>
        <Container size="xl">
          <Stack gap={56}>
            <Stack gap={12} align="center" ta="center" data-aos="fade-up">
              <Text
                size="xs"
                fw={700}
                style={{
                  color: MID_GREEN,
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
              {journeySteps.map((step, i) => (
                <Card
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
                          background: `linear-gradient(135deg, ${MID_GREEN}, #209949)`,
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
                </Card>
              ))}
            </SimpleGrid>
          </Stack>
        </Container>
      </Box>

      {/* ══════════════════════════════════════════════════════════════
          PARTNERS
      ══════════════════════════════════════════════════════════════ */}
      <Box
        id="partners"
        py={60}
        style={{ background: "#f8faf9", borderTop: "1px solid #e5e7eb" }}
      >
        <Container size="xl">
          <Stack gap={40} align="center">
            <Text
              size="xs"
              fw={700}
              ta="center"
              style={{
                color: "#9ca3af",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontFamily: QS,
              }}
              data-aos="fade-up"
            >
              Operating Under
            </Text>

            <Group
              justify="center"
              gap={56}
              wrap="wrap"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <Stack align="center" gap="xs">
                <Box
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg, ${GREEN}, ${MID_GREEN})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconShieldCheck size={30} color="white" />
                </Box>
                <Text
                  fw={700}
                  size="sm"
                  style={{ fontFamily: QS, color: "#374151" }}
                >
                  Nigerian Safety Investigation Bureau
                </Text>
                <Text size="xs" c="gray.5" style={{ fontFamily: QS }}>
                  Accident Investigation Agency
                </Text>
              </Stack>

              <Divider
                orientation="vertical"
                style={{ height: 64, alignSelf: "center" }}
              />

              <Stack align="center" gap="xs">
                <Box
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    background: "#f0fdf4",
                    border: `2px solid ${MID_GREEN}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src="/nigerian-coat-of-arms.svg"
                    alt="Nigerian Coat of Arms"
                    style={{ width: 40, height: 40, objectFit: "contain" }}
                  />
                </Box>
                <Text
                  fw={700}
                  size="sm"
                  style={{ fontFamily: QS, color: "#374151" }}
                >
                  Federal Ministry of Aviation
                </Text>
                <Text size="xs" c="gray.5" style={{ fontFamily: QS }}>
                  &amp; Aerospace Development
                </Text>
              </Stack>
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* ══════════════════════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════════════════════ */}
      <Box
        py={80}
        style={{
          background: `linear-gradient(140deg, ${GREEN} 0%, ${MID_GREEN} 100%)`,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.04)",
          }}
        />
        <Box
          style={{
            position: "absolute",
            bottom: -100,
            left: -60,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.03)",
          }}
        />

        <Container size="xl" style={{ position: "relative", zIndex: 1 }}>
          <Stack align="center" gap={32} ta="center">
            <Stack gap={16} align="center" data-aos="fade-up">
              <Title
                order={2}
                c="white"
                style={{
                  fontFamily: QS,
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 700,
                  maxWidth: 640,
                }}
              >
                Ready to Elevate Your Safety Expertise?
              </Title>
              <Text
                size="lg"
                style={{
                  color: "rgba(255,255,255,0.82)",
                  maxWidth: 520,
                  lineHeight: 1.75,
                  fontFamily: QS,
                }}
              >
                Join thousands of safety professionals already training on
                Nigeria's official accident investigation e-learning platform.
              </Text>
            </Stack>

            <Group gap="md" data-aos="fade-up" data-aos-delay="100">
              <Button
                size="xl"
                variant="white"
                onClick={handleLogin}
                fw={700}
                style={{
                  fontFamily: QS,
                  borderRadius: 14,
                  paddingLeft: 36,
                  paddingRight: 36,
                }}
                rightSection={<IconArrowRight size={18} />}
              >
                Begin Your Journey
              </Button>
              <Button
                size="xl"
                variant="outline"
                color="white"
                component="a"
                href="/verify-certificate"
                fw={600}
                style={{
                  fontFamily: QS,
                  borderRadius: 14,
                  paddingLeft: 36,
                  paddingRight: 36,
                  borderColor: "rgba(255,255,255,0.45)",
                }}
              >
                Verify a Certificate
              </Button>
            </Group>

            <Group gap="xl" data-aos="fade-up" data-aos-delay="200">
              {[
                { icon: IconShieldCheck, label: "Government accredited" },
                { icon: IconStar, label: "ICAO & IMO aligned" },
                { icon: IconTrendingUp, label: "Track your progress" },
              ].map(({ icon: Icon, label }) => (
                <Group key={label} gap={6}>
                  <Icon size={15} color="rgba(255,255,255,0.6)" />
                  <Text
                    size="sm"
                    style={{ color: "rgba(255,255,255,0.7)", fontFamily: QS }}
                  >
                    {label}
                  </Text>
                </Group>
              ))}
            </Group>
          </Stack>
        </Container>
      </Box>

      {/* ══════════════════════════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════════════════════════ */}
      <Box
        component="footer"
        py={48}
        style={{
          background: GREEN,
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <Container size="xl">
          <Group
            justify="space-between"
            align="flex-start"
            wrap="wrap"
            gap="xl"
          >
            <Stack gap="xs">
              <Group gap="sm">
                <Box
                  style={{
                    width: 32,
                    height: 32,
                    background: LIGHT_GREEN,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconShieldCheck size={18} color={GREEN} />
                </Box>
                <Text fw={800} size="lg" c="white" style={{ fontFamily: QS }}>
                  NSIB Learn
                </Text>
              </Group>
              <Text
                size="sm"
                style={{
                  color: "rgba(255,255,255,0.55)",
                  fontFamily: QS,
                  maxWidth: 280,
                }}
              >
                The official e-learning platform of the Nigerian Safety
                Investigation Bureau.
              </Text>
            </Stack>

            <Group gap="xl" wrap="wrap">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "rgba(255,255,255,0.65)",
                    textDecoration: "none",
                    fontFamily: QS,
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/login"
                style={{
                  fontSize: "0.875rem",
                  fontWeight: 700,
                  color: LIGHT_GREEN,
                  textDecoration: "none",
                  fontFamily: QS,
                }}
              >
                Sign In
              </a>
            </Group>
          </Group>

          <Divider
            mt="xl"
            mb="lg"
            style={{ borderColor: "rgba(255,255,255,0.1)" }}
          />
          <Text
            size="xs"
            ta="center"
            style={{ color: "rgba(255,255,255,0.35)", fontFamily: QS }}
          >
            © {new Date().getFullYear()} Nigerian Safety Investigation Bureau.
            All rights reserved.
          </Text>
        </Container>
      </Box>
    </Box>
  );
}
