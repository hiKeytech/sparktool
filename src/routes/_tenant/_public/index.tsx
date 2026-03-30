import {
    Badge,
    Box,
    Button,
    Card,
    Container,
    Flex,
    Grid,
    Group,
    Image,
    Paper,
    SimpleGrid,
    Stack,
    Text,
    Title,
} from "@mantine/core";
import {
    IconArrowRight,
    IconAtom,
    IconBrain,
    IconBriefcase,
    IconChartLine,
    IconCode,
    IconCpu,
    IconDeviceDesktop,
    IconGlobe,
    IconHeart,
    IconMath,
    IconPalette,
    IconUsers,
} from "@tabler/icons-react";
import { createFileRoute } from "@tanstack/react-router";
import { Navigate, useNavigate } from "@tanstack/react-router";
import { regex } from "arkregex";

import { useAuthContext } from "@/providers/auth-provider";
import { useListCourses } from "@/services/hooks";

export const Route = createFileRoute("/_tenant/_public/")({
  component: Component,
});

function Component() {
  const navigate = useNavigate();
  const { loading, user } = useAuthContext();
  const { tenant } = useAuthContext();
  const { data: courses = [], isLoading: coursesLoading } = useListCourses(tenant?.id);

  // Helper function to extract YouTube thumbnail
  const getYouTubeThumbnail = (url: string) => {
    if (!url) return null;

    console.log(url, url.match(regex("(?<=embed\/)\w+", "gi")));

    // Extract YouTube video ID from various URL formats
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const matches = url.match(regExp);
    const videoId = matches && matches[7].length === 11 ? matches[7] : null;

    return videoId
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : null;
  };

  // Get the 4 most recently uploaded courses
  const recentCourses = courses
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime()
    )
    .slice(0, 4);

  // Redirect authenticated users to their appropriate dashboard
  if (!loading && user) {
    switch (user.role) {
      case "admin":
        return <Navigate replace to="/admin" />;
      case "student":
        return <Navigate replace to="/student" />;
      case "super-admin":
        return <Navigate replace to="/super-admin" />;
      default:
        // Unknown role, redirect to auth
        return <Navigate replace to="/login" />;
    }
  }

  const categories = [
    { icon: IconBriefcase, name: "Business" },
    { icon: IconBrain, name: "Artificial Intelligence" },
    { icon: IconChartLine, name: "Data Science" },
    { icon: IconCpu, name: "Computer Science" },
    { icon: IconDeviceDesktop, name: "Information Technology" },
    { icon: IconHeart, name: "Personal Development" },
    { icon: IconHeart, name: "Healthcare" },
    { icon: IconGlobe, name: "Language Learning" },
    { icon: IconUsers, name: "Social Sciences" },
    { icon: IconPalette, name: "Arts and Humanities" },
    { icon: IconAtom, name: "Physical Science and Engineering" },
    { icon: IconMath, name: "Math and Logic" },
  ];

  const stats = [
    { label: "Active Students", value: "3,500+" },
    { label: "Completed Courses", value: "12,000+" },
    { label: "Expert Instructors", value: "150+" },
    { label: "Success Rate", value: "96%" },
  ];

  return (
    <Box>
      {/* Hero Section with Nigerian Coat of Arms */}
      <Box
        className="bg-linear-135 from-0% from-fun-green-700 to-100% to-fun-green-600"
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #1b7339 0%, #209949 100%)",
          display: "flex",
          minHeight: "90vh",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Background Pattern */}
        <Box
          style={{
            backgroundImage: "url('/nigerian-correctional-service-staff.jpg')",
            backgroundPosition: "center",
            backgroundSize: "cover",
            bottom: 0,
            left: 0,
            opacity: 0.1,
            position: "absolute",
            right: 0,
            top: 0,
            zIndex: 0,
          }}
        />

        <Container size="xl" style={{ position: "relative", zIndex: 1 }}>
          <Grid align="center" gutter="xl">
            <Grid.Col span={{ base: 12, md: 8 }}>
              <Stack data-aos="fade-up" gap="xl">
                {/* Political Header with Coat of Arms */}
                <Group align="center" gap="lg">
                  <Image
                    alt="Nigerian Coat of Arms"
                    data-aos="zoom-in"
                    h={80}
                    src="/nigerian-coat-of-arms.svg"
                    w="auto"
                  />

                  <Title
                    c="white"
                    fw={700}
                    order={1}
                    size={48}
                    style={{
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                    }}
                  >
                    Nigerian Correctional Service
                  </Title>
                </Group>

                <Text
                  c="white"
                  size="xl"
                  style={{
                    lineHeight: 1.6,
                    opacity: 0.95,
                  }}
                >
                  The <strong>Renewed Hope Agenda</strong> brings comprehensive
                  technology education to the Nigerian Correctional Service.
                  This platform is built to enable and assist those in
                  correctional centres to learn technology skills with our
                  comprehensive e-learning platform.
                </Text>

                <Group data-aos="fade-up" data-aos-delay="200" gap="md">
                  <Button
                    fw={600}
                    fz={18}
                    onClick={() => navigate({ to: "/login" })}
                    px="xl"
                    size="xl"
                    variant="white"
                  >
                    Start Learning Today
                  </Button>

                  <Button
                    color="white"
                    onClick={() => navigate({ to: "/login" })}
                    px="xl"
                    size="xl"
                    variant="outline"
                  >
                    Explore Courses
                  </Button>
                </Group>

                {/* Stats */}
                <SimpleGrid cols={{ base: 2, sm: 4 }} mt="xl">
                  {stats.map((stat, index) => (
                    <Paper
                      bg="rgba(255, 255, 255, 0.1)"
                      data-aos="fade-up"
                      data-aos-delay={300 + index * 100}
                      key={stat.label}
                      p="md"
                      style={{ backdropFilter: "blur(10px)" }}
                    >
                      <Text c="white" fw={700} size="xl" ta="center">
                        {stat.value}
                      </Text>
                      <Text c="white" opacity={0.8} size="sm" ta="center">
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

      <Container py="xl" size="xl">
        <Stack gap="xl">
          {/* Categories Section */}
          <Box data-aos="fade-up">
            <Title c="gray.9" fw={600} mb="lg" order={2} size={28}>
              Explore The Renewed Hope Agenda Correctional Courses
            </Title>

            {/* Categories Grid */}
            <Flex gap="md" wrap="wrap">
              {categories.map((category, index) => (
                <Badge
                  data-aos="fade-up"
                  data-aos-delay={index * 50}
                  key={category.name}
                  leftSection={<category.icon size={14} />}
                  onClick={() => navigate({ to: "/login" })}
                  size="md"
                  variant="light"
                >
                  {category.name}
                </Badge>
              ))}
            </Flex>
          </Box>

          <Box
            data-aos="fade-up"
            data-aos-delay="200"
            style={{
              background: "linear-gradient(135deg, #1b7339 0%, #209949 100%)",
              borderRadius: "12px",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* Background Pattern */}
            <Box
              style={{
                background:
                  'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="2" fill="rgba(255,255,255,0.1)"/></svg>\') repeat',
                backgroundSize: "20px 20px",
                height: "100%",
                opacity: 0.3,
                position: "absolute",
                right: 0,
                top: 0,
                width: "40%",
              }}
            />

            <Container
              miw={1200}
              p="xl"
              style={{ position: "relative", zIndex: 1 }}
            >
              <Group align="center" justify="space-between" mb="lg">
                <Title c="white" fw={600} order={2} size={24}>
                  Hot new releases
                </Title>
                <Button
                  onClick={() => navigate({ to: "/login" })}
                  rightSection={<IconArrowRight size={16} />}
                  size="sm"
                  variant="white"
                >
                  View All
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
                  cols={{ base: 1, lg: 4, md: 3, sm: 2, xs: 2 }}
                  spacing="md"
                  w="100%"
                >
                  {recentCourses.map((course, index) => {
                    const thumbnailUrl =
                      getYouTubeThumbnail(course.previewVideoUrl || "") ||
                      course.thumbnailUrl;

                    return (
                      <Card
                        className="hover:scale-105"
                        data-aos="fade-up"
                        data-aos-delay={300 + index * 100}
                        key={course.id}
                        onClick={() => navigate({ to: "/login" })}
                        p="sm"
                        radius="lg"
                        shadow="sm"
                        style={{
                          cursor: "pointer",
                          transition: "transform 0.2s",
                          width: "100%",
                        }}
                      >
                        {/* YouTube Thumbnail */}
                        <Box
                          h={140}
                          style={{
                            alignItems: "center",
                            background: thumbnailUrl
                              ? `url(${thumbnailUrl})`
                              : "linear-gradient(45deg, #f1f3f4 0%, #e8eaed 100%)",
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            borderRadius: "8px 8px 0 0",
                            display: "flex",
                            justifyContent: "center",
                            position: "relative",
                          }}
                        >
                          {!thumbnailUrl && (
                            <IconCode
                              color="var(--mantine-color-gray-5)"
                              size={32}
                            />
                          )}
                          {/* YouTube Play Button Overlay */}
                          {thumbnailUrl && (
                            <Box
                              style={{
                                alignItems: "center",
                                background: "rgba(0, 0, 0, 0.7)",
                                borderRadius: "50%",
                                display: "flex",
                                height: "48px",
                                justifyContent: "center",
                                left: "50%",
                                position: "absolute",
                                top: "50%",
                                transform: "translate(-50%, -50%)",
                                width: "48px",
                              }}
                            >
                              <Box
                                style={{
                                  borderBottom: "8px solid transparent",
                                  borderLeft: "12px solid white",
                                  borderTop: "8px solid transparent",
                                  height: 0,
                                  marginLeft: "3px",
                                  width: 0,
                                }}
                              />
                            </Box>
                          )}
                        </Box>

                        <Stack
                          align="start"
                          gap="xs"
                          py="md"
                          style={{ flex: 1 }}
                        >
                          {/* Course Title */}
                          <Title
                            c="gray.8"
                            fw={600}
                            lineClamp={2}
                            order={6}
                            size="sm"
                            style={{ lineHeight: 1.3, minHeight: "32px" }}
                          >
                            {course.title}
                          </Title>

                          {/* Course Level */}
                          <Text c="gray.6" size="xs">
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

      {/* Mission Statement Section */}
      <Box bg="gray.0" py="xl">
        <Container size="xl">
          <Paper data-aos="fade-up" p="xl" radius="lg" shadow="sm">
            <Grid align="center" gutter="xl">
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Image
                  alt="Nigerian Correctional Service Office"
                  radius="md"
                  src="/nigerian-correctional-service-office.webp"
                />
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Stack gap="lg">
                  <Title c="gray.8" order={2}>
                    Empowering Correctional Excellence Through Technology
                  </Title>
                  <Text c="gray.6" size="lg">
                    Under the <strong>Renewed Hope Agenda</strong>, we are
                    committed to transforming the Nigerian Correctional Service
                    through cutting-edge technology education. Our platform
                    ensures that every correctional officer has access to
                    world-class digital skills training, supporting
                    rehabilitation programs and modernizing correctional
                    practices across Nigeria.
                  </Text>
                  <Group>
                    <Button
                      onClick={() => navigate({ to: "/login" })}
                      variant="subtle"
                    >
                      Learn More About Our Mission
                    </Button>
                  </Group>
                </Stack>
              </Grid.Col>
            </Grid>
          </Paper>
        </Container>
      </Box>

      {/* Footer with Government Branding */}
      <Box className="bg-fun-green-800" py="lg">
        <Container size="xl">
          <Group align="center" justify="space-between">
            <Group gap="md">
              <Image
                alt="Nigerian Coat of Arms"
                h={40}
                src="/nigerian-coat-of-arms.svg"
                w="auto"
              />
              <Stack gap={0}>
                <Text c="white" fw={600}>
                  Nigerian Correctional Service
                </Text>
                <Text c="white" opacity={0.8} size="sm">
                  Renewed Hope Agenda • Technology Education Platform
                </Text>
              </Stack>
            </Group>
            <Text c="white" opacity={0.7} size="xs">
              © 2024 Federal Republic of Nigeria. All rights reserved.
            </Text>
          </Group>
        </Container>
      </Box>
    </Box>
  );
}
