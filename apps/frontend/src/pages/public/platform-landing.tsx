import {
  Button,
  Container,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useNavigate } from "@tanstack/react-router";

import type { PlatformConfig } from "@/schemas/platform-config";

interface PlatformLandingPageProps {
  platform: PlatformConfig;
}

export function PlatformLandingPage({ platform }: PlatformLandingPageProps) {
  const navigate = useNavigate();
  const hero = platform.marketing;
  const highlights = hero.highlights;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <section className="text-white bg-primary">
        <Container className="py-20 sm:py-24 lg:py-28" size="lg">
          <Stack gap="xl">
            <Group align="center" gap="md">
              <img
                alt={platform.branding.portalName}
                className="object-contain p-2 rounded-md h-14 w-14 bg-white/10"
                src={platform.branding.logoUrl}
              />
              <div>
                <Text className="text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                  {hero.eyebrow}
                </Text>
                <Title
                  className="font-sans text-3xl font-semibold text-white sm:text-4xl"
                  order={1}
                >
                  {hero.heroTitle}
                </Title>
              </div>
            </Group>

            <Text className="max-w-3xl text-base leading-7 text-white/85 sm:text-lg">
              {hero.heroDescription}
            </Text>

            <Group gap="md">
              <Button
                className="bg-white text-fun-green-800 hover:bg-stone-100"
                onClick={() => navigate({ to: "/login" })}
                size="lg"
              >
                {hero.primaryCtaLabel}
              </Button>
              <Button
                className="text-white border-white/30 hover:bg-white/10"
                onClick={() => navigate({ to: "/login" })}
                size="lg"
                variant="outline"
              >
                {hero.secondaryCtaLabel}
              </Button>
            </Group>
          </Stack>
        </Container>
      </section>

      {highlights.length > 0 ? (
        <section>
          <Container className="py-16" size="lg">
            <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
              {highlights.map((highlight) => (
                <Paper
                  className="h-full bg-white border rounded-lg border-stone-200"
                  key={highlight.title}
                  p="lg"
                  shadow="sm"
                >
                  <Stack gap="sm">
                    <Title
                      className="font-sans text-lg font-semibold text-fun-green-800"
                      order={3}
                    >
                      {highlight.title}
                    </Title>
                    <Text className="text-sm leading-6 text-stone-600">
                      {highlight.description}
                    </Text>
                  </Stack>
                </Paper>
              ))}
            </SimpleGrid>
          </Container>
        </section>
      ) : null}
    </div>
  );
}
