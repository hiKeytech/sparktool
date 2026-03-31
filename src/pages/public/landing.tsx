import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Group,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Title,
  Paper,
  Badge,
  Flex,
} from "@mantine/core";
import {
  IconCode,
  IconBriefcase,
  IconBrain,
  IconChartLine,
  IconCpu,
  IconDeviceDesktop,
  IconHeart,
  IconUsers,
  IconMath,
  IconAtom,
  IconPalette,
  IconGlobe,
  IconArrowRight,
} from "@tabler/icons-react";
import { useNavigate } from "@tanstack/react-router";

import type { Tenant } from "@/schemas/tenant-contract";
import { useListCourses } from "@/services/hooks";
import { resolveLoginTarget } from "@/utils/tenant-paths";

interface LandingProps {
  tenant: Tenant;
}

const categoryIconMap = {
  atom: IconAtom,
  briefcase: IconBriefcase,
  brain: IconBrain,
  "chart-line": IconChartLine,
  cpu: IconCpu,
  "device-desktop": IconDeviceDesktop,
  globe: IconGlobe,
  heart: IconHeart,
  math: IconMath,
  palette: IconPalette,
  users: IconUsers,
} as const;

export default function Landing({ tenant }: LandingProps) {
  const navigate = useNavigate();
  const publicSite = tenant.config.publicSite;
  const { data: courses = [], isLoading: coursesLoading } = useListCourses(
    tenant.id,
  );

  // Helper function to extract YouTube thumbnail
  const getYouTubeThumbnail = (url: string) => {
    if (!url) return null;

    // Extract YouTube video ID from various URL formats
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    const videoId = match && match[7].length === 11 ? match[7] : null;

    return videoId
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : null;
  };

  // Get the 4 most recently uploaded courses
  const recentCourses = courses
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime(),
    )
    .slice(0, 4);

  const categories = publicSite.categories.map((category) => ({
    ...category,
    icon: categoryIconMap[category.icon],
  }));
  const stats = publicSite.stats;

  return (
    <Box>
      <Box
        className="bg-linear-135 from-0% from-fun-green-700 to-100% to-fun-green-600"
        style={{
          background: "linear-gradient(135deg, #1b7339 0%, #209949 100%)",
          minHeight: "90vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background Pattern */}
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `url('${publicSite.heroBackgroundImageUrl}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.1,
            zIndex: 0,
          }}
        />

        <Container size="xl" style={{ position: "relative", zIndex: 1 }}>
          <Grid align="center" gutter="xl">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack gap="xl" data-aos="fade-up">
                <Group gap="lg" align="center">
                  <Image
                    src={publicSite.heroLogoUrl}
                    alt={publicSite.heroLogoAlt}
                    h={80}
                    w="auto"
                    data-aos="zoom-in"
                  />

                  <Title
                    order={1}
                    size={48}
                    fw={700}
                    c="white"
                    style={{
                      lineHeight: 1.2,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {publicSite.heroTitle}
                  </Title>
                </Group>

                <Text
                  size="xl"
                  c="white"
                  style={{
                    lineHeight: 1.6,
                    opacity: 0.95,
                  }}
                >
                  {publicSite.heroDescription}
                </Text>

                <Group gap="md" data-aos="fade-up" data-aos-delay="200">
                  <Button
                    size="xl"
                    variant="white"
                    px="xl"
                    onClick={() => navigate(resolveLoginTarget(tenant.id))}
                    fw={600}
                    fz={18}
                  >
                    {publicSite.heroPrimaryCtaLabel}
                  </Button>

                  <Button
                    size="xl"
                    variant="outline"
                    px="xl"
                    onClick={() => navigate(resolveLoginTarget(tenant.id))}
                    color="white"
                  >
                    {publicSite.heroSecondaryCtaLabel}
                  </Button>
                </Group>

                {/* Stats */}
                <SimpleGrid cols={{ base: 2, sm: 4 }} mt="xl">
                  {stats.map((stat, index) => (
                    <Paper
                      key={stat.label}
                      p="md"
                      bg="rgba(255, 255, 255, 0.1)"
                      style={{ backdropFilter: "blur(10px)" }}
                      data-aos="fade-up"
                      data-aos-delay={300 + index * 100}
                    >
                      <Text c="white" fw={700} size="xl" ta="center">
                        {stat.value}
                      </Text>
                      <Text c="white" size="sm" ta="center" opacity={0.8}>
                        {stat.label}
                      </Text>
                    </Paper>
                  ))}
                </SimpleGrid>
              </Stack>
            </Grid.Col>
          </Grid>
        </Container>
      </Box>

      <Container size="xl" py="xl">
        <Stack gap="xl">
          {/* Categories Section */}
          <Box data-aos="fade-up">
            <Title order={2} size={28} c="gray.9" mb="lg" fw={600}>
              {publicSite.categorySectionTitle}
            </Title>

            {/* Categories Grid */}
            <Flex wrap="wrap" gap="md">
              {categories.map((category, index) => (
                <Badge
                  variant="light"
                  size="md"
                  key={category.name}
                  leftSection={<category.icon size={14} />}
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                  onClick={() => navigate(resolveLoginTarget(tenant.id))}
                >
                  {category.name}
                </Badge>
              ))}
            </Flex>
          </Box>

          <Box
            style={{
              background: "linear-gradient(135deg, #1b7339 0%, #209949 100%)",
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative",
            }}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            {/* Background Pattern */}
            <Box
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "40%",
                height: "100%",
                background:
                  'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>\') repeat',
                backgroundSize: "20px 20px",
                opacity: 0.3,
              }}
            />

            <Container
              miw={1200}
              p="xl"
              style={{ position: "relative", zIndex: 1 }}
            >
              <Group justify="space-between" align="center" mb="lg">
                <Title order={2} c="white" size={24} fw={600}>
                  {publicSite.featuredCoursesTitle}
                </Title>
                <Button
                  variant="white"
                  size="sm"
                  rightSection={<IconArrowRight size={16} />}
                  onClick={() => navigate(resolveLoginTarget(tenant.id))}
                >
                  {publicSite.featuredCoursesCtaLabel}
                </Button>
              </Group>

              {/* Course Cards Grid */}
              {coursesLoading ? (
                <Group justify="center" py="xl">
                  <Text c="white" size="sm">
                    Loading latest courses...
                  </Text>
                </Group>
              ) : (
                <SimpleGrid
                  cols={{ base: 1, xs: 2, sm: 2, md: 3, lg: 4 }}
                  spacing="md"
                  w="100%"
                >
                  {recentCourses.map((course, index) => {
                    const thumbnailUrl =
                      getYouTubeThumbnail(course.previewVideoUrl || "") ||
                      course.thumbnailUrl;

                    return (
                      <Card
                        key={course.id}
                        p="sm"
                        shadow="sm"
                        radius="lg"
                        style={{
                          cursor: "pointer",
                          transition: "transform 0.2s",
                          width: "100%",
                        }}
                        className="hover:scale-105"
                        data-aos="fade-up"
                        data-aos-delay={300 + index * 100}
                        onClick={() => navigate(resolveLoginTarget(tenant.id))}
                      >
                        {/* YouTube Thumbnail */}
                        <Box
                          h={140}
                          style={{
                            background: thumbnailUrl
                              ? `url(${thumbnailUrl})`
                              : "linear-gradient(45deg, #f1f3f4 0%, #e8eaed 100%)",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            borderRadius: "8px 8px 0 0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                          }}
                        >
                          {!thumbnailUrl && (
                            <IconCode
                              size={32}
                              color="var(--mantine-color-gray-5)"
                            />
                          )}
                          {/* YouTube Play Button Overlay */}
                          {thumbnailUrl && (
                            <Box
                              style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                background: "rgba(0, 0, 0, 0.7)",
                                borderRadius: "50%",
                                width: "48px",
                                height: "48px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Box
                                style={{
                                  width: 0,
                                  height: 0,
                                  borderLeft: "12px solid white",
                                  borderTop: "8px solid transparent",
                                  borderBottom: "8px solid transparent",
                                  marginLeft: "3px",
                                }}
                              />
                            </Box>
                          )}
                        </Box>

                        <Stack
                          gap="xs"
                          py="md"
                          style={{ flex: 1 }}
                          align="start"
                        >
                          {/* Course Title */}
                          <Title
                            order={6}
                            size="sm"
                            lineClamp={2}
                            c="gray.8"
                            fw={600}
                            style={{ lineHeight: 1.3, minHeight: "32px" }}
                          >
                            {course.title}
                          </Title>

                          {/* Course Level */}
                          <Text size="xs" c="gray.6">
                            {course.difficulty
                              ? course.difficulty.charAt(0).toUpperCase() +
                                course.difficulty.slice(1)
                              : "Course"}
                          </Text>
                        </Stack>
                      </Card>
                    );
                  })}
                </SimpleGrid>
              )}
            </Container>
          </Box>
        </Stack>
      </Container>

      <Box bg="gray.0" py="xl">
        <Container size="xl">
          <Paper p="xl" radius="lg" shadow="sm" data-aos="fade-up">
            <Grid align="center" gutter="xl">
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Image
                  src={publicSite.missionImageUrl}
                  alt={publicSite.missionImageAlt}
                  radius="md"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Stack gap="lg">
                  <Title order={2} c="gray.8">
                    {publicSite.missionTitle}
                  </Title>
                  <Text size="lg" c="gray.6">
                    {publicSite.missionDescription}
                  </Text>
                  <Group>
                    <Button
                      variant="subtle"
                      onClick={() => navigate(resolveLoginTarget(tenant.id))}
                    >
                      {publicSite.missionCtaLabel}
                    </Button>
                  </Group>
                </Stack>
              </Grid.Col>
            </Grid>
          </Paper>
        </Container>
      </Box>

      <Box className="bg-fun-green-800" py="lg">
        <Container size="xl">
          <Group justify="space-between" align="center">
            <Group gap="md">
              <Image
                src={publicSite.footerLogoUrl}
                alt={publicSite.footerLogoAlt}
                h={40}
                w="auto"
              />
              <Stack gap={0}>
                <Text c="white" fw={600}>
                  {tenant.config.branding.portalName}
                </Text>
                <Text c="white" size="sm" opacity={0.8}>
                  {publicSite.footerTagline}
                </Text>
              </Stack>
            </Group>
            <Text c="white" size="xs" opacity={0.7}>
              {publicSite.copyright}
            </Text>
          </Group>
        </Container>
      </Box>
    </Box>
  );
}
