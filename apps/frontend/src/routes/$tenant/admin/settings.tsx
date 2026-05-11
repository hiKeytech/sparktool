import { useEffect } from "react";
import { z } from "zod";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useForm } from "@mantine/form";
import { createFileRoute, useRouter } from "@tanstack/react-router";
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
  Textarea,
  Title,
} from "@mantine/core";
import {
  IconBrandTrello,
  IconGlobe,
  IconLock,
  IconWorld,
} from "@tabler/icons-react";

import type { Tenant } from "@/schemas/tenant-contract";
import { useUpdateTenant } from "@/services/hooks";
import { applyBrandingTheme } from "@/utils/branding-theme";

const tenantSettingsSchema = z.object({
  allowSignup: z.boolean(),
  copyright: z.string().trim().min(1, "Copyright text is required"),
  featuredCoursesCtaLabel: z
    .string()
    .trim()
    .min(1, "Featured CTA label is required"),
  featuredCoursesTitle: z
    .string()
    .trim()
    .min(1, "Featured section title is required"),
  footerTagline: z.string().trim().min(1, "Footer tagline is required"),
  heroDescription: z.string().trim().min(1, "Hero description is required"),
  heroLogoUrl: z.string().trim().min(1, "Hero logo URL is required"),
  heroPrimaryCtaLabel: z
    .string()
    .trim()
    .min(1, "Primary CTA label is required"),
  heroSecondaryCtaLabel: z
    .string()
    .trim()
    .min(1, "Secondary CTA label is required"),
  heroTitle: z.string().trim().min(1, "Hero title is required"),
  loginFootnote: z.string().trim().min(1, "Login footnote is required"),
  loginFormDescription: z
    .string()
    .trim()
    .min(1, "Login form description is required"),
  loginHeading: z.string().trim().min(1, "Login heading is required"),
  loginFormTitle: z.string().trim().min(1, "Login form title is required"),
  loginSubheading: z.string().trim().min(1, "Login subheading is required"),
  missionCtaLabel: z.string().trim().min(1, "Mission CTA label is required"),
  missionDescription: z
    .string()
    .trim()
    .min(1, "Mission description is required"),
  missionTitle: z.string().trim().min(1, "Mission title is required"),
  supportEmail: z.email("Enter a valid support email").or(z.literal("")),
  logoUrl: z.string().trim().min(1, "Logo URL is required"),
  portalName: z.string().trim().min(1, "Portal name is required"),
  primaryColor: z.string().trim().min(1, "Primary color is required"),
  restrictedDomains: z.string().trim(),
  secondaryColor: z.string().trim().min(1, "Secondary color is required"),
});

type TenantSettingsFormValues = z.infer<typeof tenantSettingsSchema>;

function getRestrictedDomains(tenant: Tenant) {
  return tenant.config.auth.restrictedDomains.length > 0
    ? tenant.config.auth.restrictedDomains
    : tenant.config.auth.domains;
}

function mapTenantToFormValues(tenant: Tenant): TenantSettingsFormValues {
  return {
    allowSignup: tenant.config.auth.allowSignup,
    copyright: tenant.config.publicSite.copyright,
    featuredCoursesCtaLabel: tenant.config.publicSite.featuredCoursesCtaLabel,
    featuredCoursesTitle: tenant.config.publicSite.featuredCoursesTitle,
    footerTagline: tenant.config.publicSite.footerTagline,
    heroDescription: tenant.config.publicSite.heroDescription,
    heroLogoUrl: tenant.config.publicSite.heroLogoUrl,
    heroPrimaryCtaLabel: tenant.config.publicSite.heroPrimaryCtaLabel,
    heroSecondaryCtaLabel: tenant.config.publicSite.heroSecondaryCtaLabel,
    heroTitle: tenant.config.publicSite.heroTitle,
    loginFootnote: tenant.config.branding.loginPage.footnote,
    loginFormDescription: tenant.config.branding.loginPage.formDescription,
    loginHeading: tenant.config.branding.loginPage.heading,
    loginFormTitle: tenant.config.branding.loginPage.formTitle,
    loginSubheading: tenant.config.branding.loginPage.subheading,
    missionCtaLabel: tenant.config.publicSite.missionCtaLabel,
    missionDescription: tenant.config.publicSite.missionDescription,
    missionTitle: tenant.config.publicSite.missionTitle,
    logoUrl: tenant.config.branding.logoUrl,
    portalName: tenant.config.branding.portalName,
    primaryColor: tenant.config.branding.primaryColor,
    restrictedDomains: getRestrictedDomains(tenant).join(", "),
    secondaryColor: tenant.config.branding.secondaryColor,
    supportEmail: tenant.config.liveSessions?.supportEmail ?? "",
  };
}

function parseDomains(value: string) {
  return Array.from(
    new Set(
      value
        .split(",")
        .map((entry) => entry.trim().toLowerCase())
        .filter(Boolean),
    ),
  );
}

export const Route = createFileRoute("/$tenant/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const { tenant } = Route.useRouteContext() as { tenant: Tenant };
  const router = useRouter();
  const updateTenant = useUpdateTenant();
  const form = useForm<TenantSettingsFormValues>({
    initialValues: mapTenantToFormValues(tenant),
    validate: zod4Resolver(tenantSettingsSchema),
  });

  useEffect(() => {
    const nextValues = mapTenantToFormValues(tenant);
    form.setValues(nextValues);
    form.resetDirty(nextValues);
  }, [form, tenant]);

  const saveChanges = form.onSubmit(async (values) => {
    const domains = parseDomains(values.restrictedDomains);
    const updatedTenant = await updateTenant.mutateAsync({
      tenantData: {
        config: {
          ...tenant.config,
          auth: {
            ...tenant.config.auth,
            allowSignup: values.allowSignup,
            domains,
            restrictedDomains: domains,
          },
          branding: {
            ...tenant.config.branding,
            loginPage: {
              ...tenant.config.branding.loginPage,
              footnote: values.loginFootnote,
              formDescription: values.loginFormDescription,
              formTitle: values.loginFormTitle,
              heading: values.loginHeading,
              subheading: values.loginSubheading,
            },
            logoUrl: values.logoUrl,
            portalName: values.portalName,
            primaryColor: values.primaryColor,
            secondaryColor: values.secondaryColor,
          },
          publicSite: {
            ...tenant.config.publicSite,
            copyright: values.copyright,
            featuredCoursesCtaLabel: values.featuredCoursesCtaLabel,
            featuredCoursesTitle: values.featuredCoursesTitle,
            footerTagline: values.footerTagline,
            heroDescription: values.heroDescription,
            heroLogoUrl: values.heroLogoUrl,
            heroPrimaryCtaLabel: values.heroPrimaryCtaLabel,
            heroSecondaryCtaLabel: values.heroSecondaryCtaLabel,
            heroTitle: values.heroTitle,
            missionCtaLabel: values.missionCtaLabel,
            missionDescription: values.missionDescription,
            missionTitle: values.missionTitle,
          },
          liveSessions: tenant.config.liveSessions
            ? {
                ...tenant.config.liveSessions,
                supportEmail: values.supportEmail || undefined,
              }
            : tenant.config.liveSessions,
        },
      },
      tenantId: tenant.id,
    });

    const nextValues = mapTenantToFormValues(updatedTenant);
    form.setValues(nextValues);
    form.resetDirty(nextValues);
    applyBrandingTheme({
      ...updatedTenant.config.branding,
      description: updatedTenant.config.publicSite.heroDescription,
    });
    await router.invalidate();
  });

  return (
    <Container className="py-8" size="xl">
      <Stack gap="xl">
        <div>
          <Badge color="green" variant="light">
            Learning Portal
          </Badge>
          <Title mt="sm" order={2}>
            Portal Settings
          </Title>
          <Text c="dimmed" maw={760} mt="sm">
            Manage the identity, landing page copy, and self-service access
            policy for {tenant.name}.
          </Text>
        </div>

        <Alert color="blue" title="Portal-specific changes">
          Updates here affect this organization&apos;s landing page, login page,
          and learner self-registration flow. They do not change the
          platform-wide SparkTool login.
        </Alert>

        <form onSubmit={saveChanges}>
          <Stack gap="md">
            <SimpleGrid cols={{ base: 1, xl: 2 }} spacing="md">
              <Paper p="lg" radius="lg" withBorder>
                <Group gap="sm">
                  <IconBrandTrello className="text-fun-green-700" size={20} />
                  <Title order={3}>Brand Identity</Title>
                </Group>
                <Stack gap="sm" mt="md">
                  <TextInput
                    label="Portal name"
                    {...form.getInputProps("portalName")}
                  />
                  <TextInput
                    label="Logo URL"
                    {...form.getInputProps("logoUrl")}
                  />
                  <TextInput
                    label="Landing logo URL"
                    {...form.getInputProps("heroLogoUrl")}
                  />
                  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                    <TextInput
                      label="Primary color"
                      {...form.getInputProps("primaryColor")}
                    />
                    <TextInput
                      label="Secondary color"
                      {...form.getInputProps("secondaryColor")}
                    />
                  </SimpleGrid>
                </Stack>
              </Paper>

              <Paper p="lg" radius="lg" withBorder>
                <Group gap="sm">
                  <IconLock className="text-fun-green-700" size={20} />
                  <Title order={3}>Access Policy</Title>
                </Group>
                <Stack gap="sm" mt="md">
                  <Switch
                    label="Allow learner self-registration"
                    {...form.getInputProps("allowSignup", { type: "checkbox" })}
                  />
                  <TextInput
                    description="Comma-separated domains. Leave blank to allow any email domain."
                    label="Allowed email domains"
                    placeholder="example.org, learners.example.org"
                    {...form.getInputProps("restrictedDomains")}
                  />
                </Stack>
              </Paper>

              <Paper p="lg" radius="lg" withBorder>
                <Group gap="sm">
                  <IconGlobe className="text-fun-green-700" size={20} />
                  <Title order={3}>Login Experience</Title>
                </Group>
                <Stack gap="sm" mt="md">
                  <TextInput
                    label="Login heading"
                    {...form.getInputProps("loginHeading")}
                  />
                  <Textarea
                    autosize
                    label="Login subheading"
                    minRows={3}
                    {...form.getInputProps("loginSubheading")}
                  />
                  <Textarea
                    autosize
                    label="Form description"
                    minRows={2}
                    {...form.getInputProps("loginFormDescription")}
                  />
                  <TextInput
                    label="Form title"
                    {...form.getInputProps("loginFormTitle")}
                  />
                  <Textarea
                    autosize
                    label="Footnote"
                    minRows={2}
                    {...form.getInputProps("loginFootnote")}
                  />
                </Stack>
              </Paper>

              <Paper p="lg" radius="lg" withBorder>
                <Group gap="sm">
                  <IconWorld className="text-fun-green-700" size={20} />
                  <Title order={3}>Portal Landing Page</Title>
                </Group>
                <Stack gap="sm" mt="md">
                  <TextInput
                    label="Hero title"
                    {...form.getInputProps("heroTitle")}
                  />
                  <Textarea
                    autosize
                    label="Hero description"
                    minRows={4}
                    {...form.getInputProps("heroDescription")}
                  />
                  <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="sm">
                    <TextInput
                      label="Primary CTA label"
                      {...form.getInputProps("heroPrimaryCtaLabel")}
                    />
                    <TextInput
                      label="Secondary CTA label"
                      {...form.getInputProps("heroSecondaryCtaLabel")}
                    />
                  </SimpleGrid>
                  <TextInput
                    label="Featured section title"
                    {...form.getInputProps("featuredCoursesTitle")}
                  />
                  <TextInput
                    label="Featured section CTA"
                    {...form.getInputProps("featuredCoursesCtaLabel")}
                  />
                  <TextInput
                    label="Mission title"
                    {...form.getInputProps("missionTitle")}
                  />
                  <Textarea
                    autosize
                    label="Mission description"
                    minRows={4}
                    {...form.getInputProps("missionDescription")}
                  />
                  <TextInput
                    label="Mission CTA label"
                    {...form.getInputProps("missionCtaLabel")}
                  />
                  <TextInput
                    label="Footer tagline"
                    {...form.getInputProps("footerTagline")}
                  />
                  <TextInput
                    label="Copyright line"
                    {...form.getInputProps("copyright")}
                  />
                  <TextInput
                    label="Support email"
                    {...form.getInputProps("supportEmail")}
                  />
                </Stack>
              </Paper>
            </SimpleGrid>

            <Group justify="flex-end">
              <Button
                onClick={() => {
                  const nextValues = mapTenantToFormValues(tenant);
                  form.setValues(nextValues);
                  form.resetDirty(nextValues);
                }}
                variant="default"
              >
                Reset
              </Button>
              <Button
                className="bg-fun-green-800 hover:bg-fun-green-700"
                disabled={!form.isDirty()}
                loading={updateTenant.isPending}
                type="submit"
              >
                Save Portal Settings
              </Button>
            </Group>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
}
