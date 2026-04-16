import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Container,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { getPlatformConfig } from "@/actions/platform";
import { useUpdatePlatformConfig } from "@/services/hooks";
import type { PlatformConfig } from "@/schemas/platform-config";
import { Globe2, Server, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/super-admin/settings")({
  beforeLoad: async () => {
    const platform = await getPlatformConfig();
    return { platform };
  },
  component: SettingsOverview,
});

function SettingsOverview() {
  const { platform } = Route.useRouteContext() as {
    platform: null | PlatformConfig;
  };
  const [draft, setDraft] = useState<null | PlatformConfig>(platform);
  const updatePlatformMutation = useUpdatePlatformConfig();

  useEffect(() => {
    setDraft(platform);
  }, [platform]);

  if (!platform || !draft) {
    return (
      <Container className="py-8" size="xl">
        <Alert color="red" title="Platform configuration unavailable">
          SparkTool platform configuration could not be loaded from the backend.
        </Alert>
      </Container>
    );
  }

  const restrictedDomains =
    draft.auth.restrictedDomains.length > 0
      ? draft.auth.restrictedDomains
      : draft.auth.domains;

  const updateRestrictedDomains = (value: string) => {
    const domains = value
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);

    setDraft({
      ...draft,
      auth: {
        ...draft.auth,
        domains,
        restrictedDomains: domains,
      },
    });
  };

  const updateHighlight = (
    index: number,
    key: "description" | "title",
    value: string,
  ) => {
    setDraft({
      ...draft,
      marketing: {
        ...draft.marketing,
        highlights: draft.marketing.highlights.map((highlight, currentIndex) =>
          currentIndex === index ? { ...highlight, [key]: value } : highlight,
        ),
      },
    });
  };

  const saveChanges = async () => {
    const updated = await updatePlatformMutation.mutateAsync(draft);
    setDraft(updated);
  };

  return (
    <Container className="py-8" size="xl">
      <Stack gap="xl">
        <div>
          <Badge color="green" variant="light">
            Platform policy
          </Badge>
          <Title mt="sm" order={1}>
            Platform Settings
          </Title>
          <Text c="dimmed" maw={760} mt="sm">
            SparkTool platform configuration now edits the backend source of
            truth directly. These changes affect the platform login experience
            and global operator messaging.
          </Text>
        </div>

        <Alert color="blue" title="Platform-wide impact">
          Changes here affect SparkTool platform operators globally. They do not
          overwrite tenant-specific branding or tenant login experiences.
        </Alert>

        <SimpleGrid cols={{ base: 1, xl: 3 }} spacing="md">
          <Paper p="lg" radius="lg" withBorder>
            <Group gap="sm" mb="md">
              <Server size={18} className="text-stone-500" />
              <Title order={3}>Platform Identity</Title>
            </Group>
            <Stack gap="sm">
              <TextInput
                label="Portal name"
                value={draft.branding.portalName}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    branding: {
                      ...draft.branding,
                      portalName: event.currentTarget.value,
                    },
                  })
                }
              />
              <TextInput
                label="Primary color"
                value={draft.branding.primaryColor}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    branding: {
                      ...draft.branding,
                      primaryColor: event.currentTarget.value,
                    },
                  })
                }
              />
              <TextInput
                label="Secondary color"
                value={draft.branding.secondaryColor}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    branding: {
                      ...draft.branding,
                      secondaryColor: event.currentTarget.value,
                    },
                  })
                }
              />
              <TextInput
                label="Font family"
                value={draft.branding.fontFamily}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    branding: {
                      ...draft.branding,
                      fontFamily: event.currentTarget.value,
                    },
                  })
                }
              />
              <TextInput
                label="Logo asset"
                value={draft.branding.logoUrl}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    branding: {
                      ...draft.branding,
                      logoUrl: event.currentTarget.value,
                    },
                  })
                }
              />
            </Stack>
          </Paper>

          <Paper p="lg" radius="lg" withBorder>
            <Group gap="sm" mb="md">
              <ShieldCheck size={18} className="text-[#006838]" />
              <Title order={3}>Authentication Policy</Title>
            </Group>
            <Stack gap="sm">
              <Switch
                checked={draft.auth.allowSignup}
                label="Allow platform self-service sign-up"
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    auth: {
                      ...draft.auth,
                      allowSignup: event.currentTarget.checked,
                    },
                  })
                }
              />
              <TextInput
                label="Strategy label"
                value={draft.auth.strategies[0]?.label || ""}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    auth: {
                      ...draft.auth,
                      strategies: draft.auth.strategies.map((item, index) =>
                        index === 0
                          ? { ...item, label: event.currentTarget.value }
                          : item,
                      ),
                    },
                  })
                }
              />
              <TextInput
                disabled
                label="Auth strategies"
                value={draft.auth.strategies
                  .map((item) => item.type)
                  .join(", ")}
              />
              <TextInput
                label="Domain policy"
                value={restrictedDomains.join(", ")}
                onChange={(event) =>
                  updateRestrictedDomains(event.currentTarget.value)
                }
              />
            </Stack>
          </Paper>

          <Paper p="lg" radius="lg" withBorder>
            <Group gap="sm" mb="md">
              <Globe2 size={18} className="text-blue-500" />
              <Title order={3}>Platform Messaging</Title>
            </Group>
            <Stack gap="sm">
              <TextInput
                label="Hero title"
                value={draft.marketing.heroTitle}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    marketing: {
                      ...draft.marketing,
                      heroTitle: event.currentTarget.value,
                    },
                  })
                }
              />
              <TextInput
                label="Hero eyebrow"
                value={draft.marketing.eyebrow}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    marketing: {
                      ...draft.marketing,
                      eyebrow: event.currentTarget.value,
                    },
                  })
                }
              />
              <TextInput
                label="Primary CTA"
                value={draft.marketing.primaryCtaLabel}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    marketing: {
                      ...draft.marketing,
                      primaryCtaLabel: event.currentTarget.value,
                    },
                  })
                }
              />
              <TextInput
                label="Secondary CTA"
                value={draft.marketing.secondaryCtaLabel}
                onChange={(event) =>
                  setDraft({
                    ...draft,
                    marketing: {
                      ...draft.marketing,
                      secondaryCtaLabel: event.currentTarget.value,
                    },
                  })
                }
              />
            </Stack>
          </Paper>
        </SimpleGrid>

        <Paper p="lg" radius="lg" withBorder>
          <Title mb="md" order={3}>
            Login Surface Copy
          </Title>
          <Stack gap="sm">
            <TextInput
              label="Heading"
              value={draft.branding.loginPage.heading}
              onChange={(event) =>
                setDraft({
                  ...draft,
                  branding: {
                    ...draft.branding,
                    loginPage: {
                      ...draft.branding.loginPage,
                      heading: event.currentTarget.value,
                    },
                  },
                })
              }
            />
            <TextInput
              label="Subheading"
              value={draft.branding.loginPage.subheading}
              onChange={(event) =>
                setDraft({
                  ...draft,
                  branding: {
                    ...draft.branding,
                    loginPage: {
                      ...draft.branding.loginPage,
                      subheading: event.currentTarget.value,
                    },
                  },
                })
              }
            />
            <TextInput
              label="Form title"
              value={draft.branding.loginPage.formTitle}
              onChange={(event) =>
                setDraft({
                  ...draft,
                  branding: {
                    ...draft.branding,
                    loginPage: {
                      ...draft.branding.loginPage,
                      formTitle: event.currentTarget.value,
                    },
                  },
                })
              }
            />
            <TextInput
              label="Form description"
              value={draft.branding.loginPage.formDescription}
              onChange={(event) =>
                setDraft({
                  ...draft,
                  branding: {
                    ...draft.branding,
                    loginPage: {
                      ...draft.branding.loginPage,
                      formDescription: event.currentTarget.value,
                    },
                  },
                })
              }
            />
            <TextInput
              label="Footnote"
              value={draft.branding.loginPage.footnote}
              onChange={(event) =>
                setDraft({
                  ...draft,
                  branding: {
                    ...draft.branding,
                    loginPage: {
                      ...draft.branding.loginPage,
                      footnote: event.currentTarget.value,
                    },
                  },
                })
              }
            />
          </Stack>
        </Paper>

        <Paper p="lg" radius="lg" withBorder>
          <Title mb="md" order={3}>
            Platform Highlights
          </Title>
          <Stack gap="md">
            {draft.marketing.highlights.map((highlight, index) => (
              <SimpleGrid
                cols={{ base: 1, md: 2 }}
                key={`${highlight.icon}-${index}`}
                spacing="md"
              >
                <TextInput
                  label={`Highlight ${index + 1} title`}
                  value={highlight.title}
                  onChange={(event) =>
                    updateHighlight(index, "title", event.currentTarget.value)
                  }
                />
                <TextInput
                  label={`Highlight ${index + 1} description`}
                  value={highlight.description}
                  onChange={(event) =>
                    updateHighlight(
                      index,
                      "description",
                      event.currentTarget.value,
                    )
                  }
                />
              </SimpleGrid>
            ))}
          </Stack>
        </Paper>

        <Group justify="flex-end">
          <Button
            loading={updatePlatformMutation.isPending}
            onClick={saveChanges}
          >
            Save Platform Settings
          </Button>
        </Group>
      </Stack>
    </Container>
  );
}
