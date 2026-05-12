import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Container,
  FileInput,
  Group,
  Image,
  Paper,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { getPlatformConfig } from "@/actions/platform";
import {
  useUpdatePlatformConfig,
  useUploadBrandingAsset,
} from "@/services/hooks";
import { BRANDING_IMAGE_ACCEPT } from "@/server/branding-assets";
import type { PlatformConfig } from "@/schemas/platform-config";
import { Globe2, Server, ShieldCheck, Upload } from "lucide-react";

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
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const updatePlatformMutation = useUpdatePlatformConfig();
  const uploadBrandingAsset = useUploadBrandingAsset();

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

  const handlePlatformLogoUpload = async (file: File | null) => {
    if (!file) {
      return;
    }

    setUploadingLogo(true);

    try {
      const uploaded = await uploadBrandingAsset.mutateAsync({
        file,
        scope: "platform",
      });

      setDraft({
        ...draft,
        branding: {
          ...draft.branding,
          logoUrl: uploaded.url,
        },
      });
    } finally {
      setUploadingLogo(false);
    }
  };

  return (
    <Container className="py-8" size="xl">
      <Stack gap="lg">
        <div>
          <Badge color="brand" variant="light">
            Platform setup
          </Badge>
          <Title mt="sm" order={1}>
            Platform Settings
          </Title>
          <Text c="dimmed" maw={760} mt="sm">
            Update the main SparkTool name, sign-in settings, and homepage text.
            These changes affect the shared platform experience.
          </Text>
        </div>

        <Alert color="blue" title="What this changes">
          These changes affect the shared SparkTool experience. Tenant branding
          and tenant sign-in pages stay separate.
        </Alert>

        <SimpleGrid cols={{ base: 1, xl: 3 }} spacing="md">
          <Paper p="lg" radius="lg" withBorder>
            <Group gap="sm" mb="md">
              <Server size={18} className="text-stone-500" />
              <Title order={3}>Branding</Title>
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
              <FileInput
                accept={BRANDING_IMAGE_ACCEPT}
                clearable
                description="Accepted formats: PNG, JPEG, WEBP, SVG. Save your changes after uploading."
                label="Logo upload"
                leftSection={<Upload size={16} />}
                onChange={handlePlatformLogoUpload}
                placeholder="Choose logo image"
              />
              <TextInput
                label="Logo URL"
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
              {draft.branding.logoUrl ? (
                <Image
                  alt="Platform logo preview"
                  className="max-w-40 rounded-md border border-(--app-border) bg-(--app-surface-soft)"
                  fit="contain"
                  h={72}
                  src={draft.branding.logoUrl}
                />
              ) : null}
            </Stack>
          </Paper>

          <Paper p="lg" radius="lg" withBorder>
            <Group gap="sm" mb="md">
              <ShieldCheck size={18} className="text-[#006838]" />
              <Title order={3}>Sign-in settings</Title>
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
                label="Sign-in label"
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
                label="Sign-in methods"
                value={draft.auth.strategies
                  .map((item) => item.type)
                  .join(", ")}
              />
              <TextInput
                label="Allowed email domains"
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
              <Title order={3}>Homepage copy</Title>
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
            Login page copy
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
            disabled={uploadingLogo}
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
