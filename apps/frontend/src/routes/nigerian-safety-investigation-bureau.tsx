import {
  type CSSProperties,
  type ComponentType,
  useEffect,
  useState,
} from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  Badge,
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
  IconPalette,
  IconPlayerPlay,
  IconShieldCheck,
  IconUsers,
} from "@tabler/icons-react";

import { getTenant } from "@/actions/tenant";
import { useListCourses } from "@/services/hooks";
import type { Tenant } from "@/schemas/tenant-contract";

const QS = "'Quicksand', sans-serif";
const FALLBACK_BADGE = "/sparktool-badge.svg";
const FALLBACK_HERO = "/sparktool-learning-hero.svg";

const FALLBACK_STATS = [
  { label: "Active Students", value: "3,500+" },
  { label: "Completed Courses", value: "12,000+" },
  { label: "Expert Instructors", value: "150+" },
  { label: "Success Rate", value: "96%" },
];

const FALLBACK_CATEGORIES = [
  { icon: "briefcase", name: "Aviation Safety" },
  { icon: "atom", name: "Marine Safety" },
  { icon: "chart-line", name: "Road Transport Safety" },
  { icon: "cpu", name: "Accident Investigation" },
  { icon: "device-desktop", name: "Safety Management" },
  { icon: "brain", name: "Technical Analysis" },
  { icon: "globe", name: "International Standards" },
  { icon: "heart", name: "Emergency Response" },
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

function getYouTubeThumbnail(url?: string | null) {
  if (!url) {
    return null;
  }

  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  const videoId = match && match[7].length === 11 ? match[7] : null;

  return videoId
    ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
    : null;
}

function ImageWithFallback({
  alt,
  fallbackSrc,
  src,
  style,
}: {
  alt: string;
  fallbackSrc: string;
  src?: null | string;
  style?: CSSProperties;
}) {
  const [currentSrc, setCurrentSrc] = useState(src ?? fallbackSrc);

  useEffect(() => {
    setCurrentSrc(src ?? fallbackSrc);
  }, [fallbackSrc, src]);

  return (
    <img
      alt={alt}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
      src={currentSrc}
      style={style}
    />
  );
}

export const Route = createFileRoute("/nigerian-safety-investigation-bureau")({
  loader: async () => {
    for (const tenantId of ["nsib", "nigerian-safety-investigation-bureau"]) {
      try {
        const tenant = await getTenant({ data: tenantId });
        return { tenant };
      } catch {
        // try the next candidate
      }
    }

    return { tenant: null as Tenant | null };
  },
  component: NSIBLandingPage,
});

function NSIBLandingPage() {
  const navigate = useNavigate();
  const { tenant } = Route.useLoaderData() as { tenant: Tenant | null };

  const site = tenant?.config.publicSite;
  const branding = tenant?.config.branding;
  const primaryColor = branding?.primaryColor ?? "#1b7339";
  const portalName = branding?.portalName ?? "NSIB Learn";
  const stats = site?.stats ?? FALLBACK_STATS;
  const categories = site?.categories ?? FALLBACK_CATEGORIES;
  const { data: courses = [], isLoading: coursesLoading } = useListCourses(
    tenant?.id,
    { published: true },
  );
  const featuredCourses = courses.slice(0, 8);

  const navLinks = [
    { href: "#guidelines", label: "Guidelines" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
    { href: "/verify-certificate", label: "Verify Certificate" },
  ];

  const footerLinks = [
    { href: "#about", label: "About NSIB" },
    { href: "#courses", label: "Course Catalog" },
    { href: "#guidelines", label: "Guidelines" },
    { href: "#contact", label: "Contact" },
  ];

  const supportLinks = [
    { href: "/login", label: "Help Center" },
    { href: "/login", label: "Technical Support" },
    { href: "/verify-certificate", label: "Certificate Verification" },
    { href: "/login", label: "Privacy Policy" },
  ];

  const handleLogin = () => navigate({ to: "/login" });

  return (
    <Box style={{ fontFamily: QS, background: "#ffffff" }}>
      <Box
        component="header"
        style={{
          background: "white",
          borderBottom: "1px solid #e5e7eb",
          position: "sticky",
          top: 0,
          zIndex: 20,
        }}
      >
        <Container size="xl" py="md">
          <Group justify="space-between" wrap="nowrap">
            <Group gap="md" wrap="nowrap">
              <Box
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: "#f3f4f6",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <ImageWithFallback
                  alt={portalName}
                  fallbackSrc={FALLBACK_BADGE}
                  src={branding?.logoUrl ?? site?.footerLogoUrl}
                  style={{ width: 44, height: 44, objectFit: "cover" }}
                />
              </Box>
              <Stack gap={0}>
                <Text
                  fw={700}
                  style={{
                    color: "#111827",
                    fontFamily: QS,
                    fontSize: "1rem",
                    lineHeight: 1.2,
                  }}
                >
                  {portalName}
                </Text>
                <Text size="sm" c="gray.6" style={{ fontFamily: QS }}>
                  Nigerian Safety Investigation Bureau
                </Text>
              </Stack>
            </Group>

            <Group gap="xl" visibleFrom="md">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  style={{
                    color: "#374151",
                    fontFamily: QS,
                    fontSize: "0.95rem",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </Group>

            <Button
              color="green"
              leftSection={<IconLogin size={16} />}
              onClick={handleLogin}
              radius="md"
              style={{ background: primaryColor, fontFamily: QS }}
            >
              Login
            </Button>
          </Group>
        </Container>
      </Box>

      <Box
        style={{
          minHeight: "calc(100vh - 85px)",
          position: "relative",
          overflow: "hidden",
          background: primaryColor,
        }}
      >
        <ImageWithFallback
          alt={site?.heroLogoAlt ?? portalName}
          fallbackSrc={FALLBACK_HERO}
          src={site?.heroBackgroundImageUrl}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.28,
          }}
        />
        <Box
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(27,115,57,0.80) 0%, rgba(27,115,57,0.88) 100%)",
          }}
        />

        <Container
          size="xl"
          style={{
            position: "relative",
            zIndex: 1,
            minHeight: "calc(100vh - 85px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingTop: 56,
            paddingBottom: 132,
          }}
        >
          <Stack gap={28} style={{ maxWidth: 980 }}>
            <Group gap="xl" align="center" wrap="nowrap">
              <ImageWithFallback
                alt={site?.heroLogoAlt ?? "Nigerian Coat of Arms"}
                fallbackSrc={FALLBACK_BADGE}
                src={site?.heroLogoUrl}
                style={{
                  width: 110,
                  height: 110,
                  objectFit: "contain",
                  flexShrink: 0,
                }}
              />
              <Title
                order={1}
                style={{
                  color: "white",
                  fontFamily: QS,
                  fontSize: "clamp(2.75rem, 5vw, 4.25rem)",
                  fontWeight: 700,
                  lineHeight: 1.12,
                }}
              >
                {site?.heroTitle ?? "Nigerian Safety Investigation Bureau"}
              </Title>
            </Group>

            <Text
              size="xl"
              style={{
                color: "rgba(255,255,255,0.92)",
                fontFamily: QS,
                lineHeight: 1.75,
                maxWidth: 1080,
              }}
            >
              {site?.heroDescription ??
                "The NSIB e-learning platform equips investigators, regulators, and safety professionals with world-class training across aviation, marine, and road transport sectors."}
            </Text>

            <Group gap="md">
              <Button
                onClick={handleLogin}
                radius="sm"
                size="xl"
                style={{
                  background: "white",
                  color: primaryColor,
                  fontFamily: QS,
                  fontWeight: 700,
                }}
              >
                {site?.heroPrimaryCtaLabel ?? "Start Learning Today"}
              </Button>
              <Button
                component="a"
                href="#courses"
                radius="sm"
                size="xl"
                variant="outline"
                style={{
                  borderColor: "rgba(255,255,255,0.7)",
                  color: "white",
                  fontFamily: QS,
                  fontWeight: 700,
                }}
              >
                {site?.heroSecondaryCtaLabel ?? "Explore Courses"}
              </Button>
            </Group>
          </Stack>
        </Container>

        <Container
          size="xl"
          style={{
            position: "absolute",
            bottom: 28,
            left: 0,
            right: 0,
            zIndex: 1,
          }}
        >
          <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
            {stats.map((stat) => (
              <Paper
                key={stat.label}
                p="lg"
                radius="sm"
                style={{
                  background: "rgba(255,255,255,0.14)",
                  border: "1px solid rgba(255,255,255,0.16)",
                  backdropFilter: "blur(3px)",
                }}
              >
                <Text
                  fw={800}
                  style={{
                    color: "white",
                    fontFamily: QS,
                    fontSize: "2rem",
                    lineHeight: 1.1,
                  }}
                >
                  {stat.value}
                </Text>
                <Text
                  size="md"
                  style={{ color: "rgba(255,255,255,0.9)", fontFamily: QS }}
                >
                  {stat.label}
                </Text>
              </Paper>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      <Box id="guidelines" py={72} style={{ background: "white" }}>
        <Container size="xl">
          <Stack gap={36}>
            <Stack align="center" gap={16} ta="center">
              <Title
                order={2}
                style={{
                  color: "#111827",
                  fontFamily: QS,
                  fontSize: "clamp(1.75rem, 3vw, 2.4rem)",
                  fontWeight: 700,
                }}
              >
                {site?.categorySectionTitle ??
                  "Explore NSIB Professional Training Courses"}
              </Title>

              <Group gap="sm" justify="center">
                {categories.map((category) => {
                  const Icon = ICON_MAP[category.icon] ?? IconShieldCheck;

                  return (
                    <Group
                      key={category.name}
                      gap={8}
                      px={14}
                      py={8}
                      style={{
                        border: `1px solid ${primaryColor}`,
                        borderRadius: 999,
                        color: primaryColor,
                      }}
                    >
                      <Icon color={primaryColor} size={14} />
                      <Text
                        style={{
                          fontFamily: QS,
                          fontSize: "0.9rem",
                          fontWeight: 600,
                        }}
                      >
                        {category.name}
                      </Text>
                    </Group>
                  );
                })}
              </Group>
            </Stack>

            <Box
              p={{ base: 20, md: 28 }}
              style={{
                background: primaryColor,
                borderRadius: 18,
              }}
            >
              <Group justify="space-between" mb={20}>
                <Title
                  order={2}
                  style={{
                    color: "white",
                    fontFamily: QS,
                    fontSize: "1.65rem",
                    fontWeight: 700,
                  }}
                >
                  Hot new releases
                </Title>
                <Button
                  onClick={handleLogin}
                  rightSection={<IconArrowRight size={16} />}
                  variant="subtle"
                  style={{ color: "white", fontFamily: QS, fontWeight: 700 }}
                >
                  View All
                </Button>
              </Group>

              {coursesLoading ? (
                <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
                  {Array.from({ length: 8 }).map((_, index) => (
                    <Box
                      key={index}
                      style={{
                        borderRadius: 16,
                        background: "rgba(255,255,255,0.18)",
                        height: 250,
                      }}
                    />
                  ))}
                </SimpleGrid>
              ) : (
                <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
                  {featuredCourses.map((course) => {
                    const thumbnailUrl =
                      getYouTubeThumbnail(course.previewVideoUrl) ||
                      course.thumbnailUrl ||
                      FALLBACK_HERO;

                    return (
                      <Card
                        key={course.id}
                        onClick={handleLogin}
                        padding={0}
                        radius="lg"
                        style={{
                          background: "white",
                          cursor: "pointer",
                          overflow: "hidden",
                        }}
                      >
                        <Box style={{ height: 160, position: "relative" }}>
                          <ImageWithFallback
                            alt={course.title ?? "Course thumbnail"}
                            fallbackSrc={FALLBACK_HERO}
                            src={thumbnailUrl}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <Box
                            style={{
                              position: "absolute",
                              inset: 0,
                              background:
                                "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.28) 100%)",
                            }}
                          />
                          <Box
                            style={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                              width: 44,
                              height: 44,
                              borderRadius: "50%",
                              background: "rgba(0,0,0,0.62)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <IconPlayerPlay color="white" size={18} />
                          </Box>
                          {course.difficulty && (
                            <Badge
                              radius="md"
                              size="sm"
                              style={{
                                position: "absolute",
                                top: 12,
                                left: 12,
                                background: "rgba(0,0,0,0.6)",
                                color: "white",
                                fontFamily: QS,
                              }}
                            >
                              {course.difficulty.charAt(0).toUpperCase() +
                                course.difficulty.slice(1)}
                            </Badge>
                          )}
                        </Box>

                        <Stack gap={4} p="md">
                          <Text
                            fw={700}
                            lineClamp={2}
                            style={{
                              color: "#111827",
                              fontFamily: QS,
                              minHeight: 44,
                            }}
                          >
                            {course.title}
                          </Text>
                          <Text size="sm" c="gray.6" style={{ fontFamily: QS }}>
                            NSIB Certified
                          </Text>
                        </Stack>
                      </Card>
                    );
                  })}
                </SimpleGrid>
              )}
            </Box>
          </Stack>
        </Container>
      </Box>

      <Box id="about" py={80} style={{ background: "#f8faf9" }}>
        <Container size="xl">
          <Grid align="center" gutter={48}>
            <Grid.Col span={{ base: 12, md: 5 }}>
              <Box
                style={{
                  borderRadius: "24px 80px 24px 24px",
                  overflow: "hidden",
                  boxShadow: `0 28px 80px ${primaryColor}33`,
                }}
              >
                <ImageWithFallback
                  alt={site?.missionImageAlt ?? "NSIB mission"}
                  fallbackSrc={FALLBACK_HERO}
                  src={site?.missionImageUrl}
                  style={{
                    width: "100%",
                    height: 420,
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 7 }}>
              <Stack gap={24}>
                <Title
                  order={2}
                  style={{
                    color: "#111827",
                    fontFamily: QS,
                    fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                    fontWeight: 700,
                    lineHeight: 1.35,
                  }}
                >
                  {site?.missionTitle ??
                    "Empowering Safety Excellence Through Technology"}
                </Title>
                <Text
                  size="lg"
                  style={{ color: "#4b5563", fontFamily: QS, lineHeight: 1.8 }}
                >
                  {site?.missionDescription ??
                    "Under the NSIB mandate, we support investigators and safety professionals with accessible, world-class digital training that strengthens transport safety across aviation, marine, and road sectors."}
                </Text>
                <Button
                  onClick={handleLogin}
                  radius="md"
                  rightSection={<IconArrowRight size={16} />}
                  style={{
                    background: primaryColor,
                    color: "white",
                    fontFamily: QS,
                    fontWeight: 700,
                    width: "fit-content",
                  }}
                >
                  {site?.missionCtaLabel ?? "Learn More About Our Mission"}
                </Button>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      <Box id="certification" py={80} style={{ background: "white" }}>
        <Container size="xl">
          <Stack gap={48}>
            <Stack align="center" gap={12} ta="center">
              <Text
                size="xs"
                fw={700}
                style={{
                  color: primaryColor,
                  fontFamily: QS,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                }}
              >
                Step by Step
              </Text>
              <Title
                order={2}
                style={{
                  color: "#111827",
                  fontFamily: QS,
                  fontSize: "clamp(1.8rem, 3vw, 2.4rem)",
                  fontWeight: 700,
                }}
              >
                Your Path to Certification
              </Title>
              <Text
                size="md"
                style={{
                  color: "#6b7280",
                  fontFamily: QS,
                  lineHeight: 1.75,
                  maxWidth: 620,
                }}
              >
                From enrolment to deployment, here is how NSIB professionals
                build and validate their expertise.
              </Text>
            </Stack>

            <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
              {CERT_STEPS.map((step) => (
                <Paper
                  key={step.num}
                  p="xl"
                  radius="xl"
                  style={{ border: "2px solid #f3f4f6" }}
                >
                  <Stack gap="md">
                    <Group align="center" gap="md">
                      <Box
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 16,
                          background: `linear-gradient(135deg, ${primaryColor}, #209949)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <step.icon color="white" size={22} />
                      </Box>
                      <Text
                        style={{
                          color: "#f3f4f6",
                          fontFamily: QS,
                          fontSize: "2.8rem",
                          fontWeight: 800,
                          lineHeight: 1,
                        }}
                      >
                        {String(step.num).padStart(2, "0")}
                      </Text>
                    </Group>
                    <Text fw={700} style={{ color: "#111827", fontFamily: QS }}>
                      {step.title}
                    </Text>
                    <Text
                      style={{
                        color: "#6b7280",
                        fontFamily: QS,
                        lineHeight: 1.75,
                      }}
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

      <Box
        id="contact"
        style={{ background: "white", borderTop: "1px solid #e5e7eb" }}
      >
        <Container size="xl" py={56}>
          <Grid gutter={40}>
            <Grid.Col span={{ base: 12, md: 4 }}>
              <Stack gap={14}>
                <Group gap="md" wrap="nowrap">
                  <Box
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      overflow: "hidden",
                      background: "#f3f4f6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ImageWithFallback
                      alt={portalName}
                      fallbackSrc={FALLBACK_BADGE}
                      src={branding?.logoUrl ?? site?.footerLogoUrl}
                      style={{ width: 48, height: 48, objectFit: "cover" }}
                    />
                  </Box>
                  <Stack gap={0}>
                    <Text fw={700} style={{ fontFamily: QS, color: "#111827" }}>
                      {portalName}
                    </Text>
                    <Text size="sm" c="gray.6" style={{ fontFamily: QS }}>
                      Nigerian Safety Investigation Bureau
                    </Text>
                  </Stack>
                </Group>
                <Text
                  style={{ color: "#4b5563", fontFamily: QS, lineHeight: 1.75 }}
                >
                  Supporting investigators and safety professionals with
                  trusted, government-grade digital learning across aviation,
                  marine, and road transport disciplines.
                </Text>
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 6, md: 2 }}>
              <Stack gap={12}>
                <Text fw={700} style={{ color: "#111827", fontFamily: QS }}>
                  Quick Links
                </Text>
                {footerLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    style={{
                      color: "#4b5563",
                      fontFamily: QS,
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 6, md: 3 }}>
              <Stack gap={12}>
                <Text fw={700} style={{ color: "#111827", fontFamily: QS }}>
                  Support
                </Text>
                {supportLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    style={{
                      color: "#4b5563",
                      fontFamily: QS,
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </a>
                ))}
              </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 3 }}>
              <Stack gap={12}>
                <Text fw={700} style={{ color: "#111827", fontFamily: QS }}>
                  Contact Information
                </Text>
                <Text style={{ color: "#4b5563", fontFamily: QS }}>
                  Nigerian Safety Investigation Bureau
                </Text>
                <Text style={{ color: "#4b5563", fontFamily: QS }}>
                  Abuja, Federal Capital Territory
                </Text>
                <Text style={{ color: "#4b5563", fontFamily: QS }}>
                  support@nsib.gov.ng
                </Text>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>

        <Divider />

        <Container py="lg" size="xl">
          <Text ta="center" style={{ color: "#6b7280", fontFamily: QS }}>
            {site?.copyright ??
              `© ${new Date().getFullYear()} Nigerian Safety Investigation Bureau. All rights reserved.`}
          </Text>
        </Container>
      </Box>
    </Box>
  );
}
