import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Badge,
  Button,
  Container,
  Group,
  Loader,
  Modal,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { Building2, Plus } from "lucide-react";
import { useCreateTenant, useTenants, useUpdateTenant } from "@/services/hooks";
import type { Tenant } from "@/schemas/tenant";

type TenantSubscriptionStatus = "active" | "inactive" | "trial";

interface AddTenantForm {
  allowSignup: boolean;
  domain: string;
  id: string;
  name: string;
  subscriptionStatus: TenantSubscriptionStatus;
}

function buildDefaultConfig(name: string, allowSignup: boolean) {
  return {
    auth: {
      allowSignup,
      domains: [],
      restrictedDomains: [],
      strategies: [
        { config: {}, label: "Sign in", type: "email-password" as const },
      ],
    },
    branding: {
      fontFamily: "Inter, sans-serif",
      loginPage: {
        features: [
          {
            description:
              "Role-scoped access for learners and tenant operators.",
            icon: "shield",
            title: "Secure tenant access",
          },
          {
            description:
              "Tenant-specific branding and controls managed from SparkTool.",
            icon: "users",
            title: "Isolated workspace",
          },
        ],
        footnote: "Use your official tenant URL to sign in.",
        formDescription:
          "Enter your official credentials to access this tenant workspace.",
        formTitle: "Sign In",
        heading: name,
        subheading: `${name} operates on SparkTool's multi-tenant learning infrastructure.`,
      },
      logoUrl: "/nigerian-coat-of-arms.svg",
      portalName: name,
      primaryColor: "#006838",
      secondaryColor: "#f4f8f2",
    },
    dashboard: { layout: "modern" as const, widgets: [] },
    modules: {
      certificates: false,
      gamification: false,
      liveClasses: false,
      messaging: false,
      reports: false,
    },
    publicSite: {
      categorySectionTitle: "Explore Courses",
      categories: [{ icon: "briefcase" as const, name: "Business" }],
      copyright: "© 2024 Federal Republic of Nigeria. All rights reserved.",
      featuredCoursesCtaLabel: "View All",
      featuredCoursesTitle: "Featured Courses",
      footerLogoAlt: `${name} logo`,
      footerLogoUrl: "/nigerian-coat-of-arms.svg",
      footerTagline: `${name} learning workspace on SparkTool`,
      heroBackgroundImageUrl: "/nigerian-coat-of-arms.svg",
      heroDescription: `Official digital learning access for ${name}.`,
      heroLogoAlt: `${name} logo`,
      heroLogoUrl: "/nigerian-coat-of-arms.svg",
      heroPrimaryCtaLabel: "Start Learning",
      heroSecondaryCtaLabel: "Explore Courses",
      heroTitle: name,
      missionCtaLabel: "Learn More",
      missionDescription: `${name} uses SparkTool to deliver structured, tenant-isolated learning experiences.`,
      missionImageAlt: `${name} mission graphic`,
      missionImageUrl: "/nigerian-coat-of-arms.svg",
      missionTitle: "Mission",
      stats: [{ label: "Students", value: "0" }],
    },
  };
}

function toSlug(value: string): string {
  return value
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

const statusColors: Record<TenantSubscriptionStatus, string> = {
  active: "green",
  inactive: "red",
  trial: "yellow",
};

const defaultAddForm: AddTenantForm = {
  allowSignup: false,
  domain: "",
  id: "",
  name: "",
  subscriptionStatus: "trial",
};

export const Route = createFileRoute("/super-admin/tenants")({
  component: TenantsOverview,
});

function TenantsOverview() {
  const [addOpen, setAddOpen] = useState(false);
  const [editTenant, setEditTenant] = useState<Tenant | null>(null);
  const [addForm, setAddForm] = useState<AddTenantForm>(defaultAddForm);

  const { data: tenants, isLoading } = useTenants();
  const { isPending: isCreating, mutate: createTenant } = useCreateTenant();
  const { isPending: isUpdating, mutate: updateTenant } = useUpdateTenant();

  function handleAddSubmit() {
    createTenant(
      {
        config: buildDefaultConfig(addForm.name, addForm.allowSignup),
        domain: addForm.domain,
        id: addForm.id,
        name: addForm.name,
        subscriptionStatus: addForm.subscriptionStatus,
      },
      {
        onSuccess: () => {
          setAddOpen(false);
          setAddForm(defaultAddForm);
        },
      },
    );
  }

  function handleEditSubmit() {
    if (!editTenant) return;
    updateTenant(
      {
        tenantData: {
          config: {
            ...editTenant.config,
            auth: {
              ...editTenant.config.auth,
              allowSignup: editTenant.config.auth.allowSignup,
            },
          },
          domain: editTenant.domain,
          name: editTenant.name,
          subscriptionStatus: editTenant.subscriptionStatus,
        },
        tenantId: editTenant.id,
      },
      {
        onSuccess: () => setEditTenant(null),
      },
    );
  }

  return (
    <Container className="py-8" size="xl">
      <Stack gap="xl">
        <Group align="flex-start" justify="space-between">
          <div>
            <Badge color="green" variant="light">
              Multi-tenant registry
            </Badge>
            <Title mt="sm" order={1}>
              Tenants
            </Title>
            <Text c="dimmed" maw={760} mt="sm">
              SparkTool tenants are isolated workspaces with their own domain,
              branding, and access policy. This page manages registry-level
              information and the bootstrap configuration each tenant starts
              from.
            </Text>
          </div>
          <Button
            leftSection={<Plus size={16} />}
            className="bg-[#006838] text-white hover:bg-[#006838]/90"
            onClick={() => setAddOpen(true)}
          >
            Add Tenant
          </Button>
        </Group>

        <SimpleGrid cols={{ base: 1, md: 2, xl: 4 }} spacing="md">
          <TenantStat
            label="All Tenants"
            value={String((tenants ?? []).length)}
          />
          <TenantStat
            label="Active"
            value={String(
              (tenants ?? []).filter(
                (tenant) => tenant.subscriptionStatus === "active",
              ).length,
            )}
          />
          <TenantStat
            label="Trial"
            value={String(
              (tenants ?? []).filter(
                (tenant) => tenant.subscriptionStatus === "trial",
              ).length,
            )}
          />
          <TenantStat
            label="Open Signup"
            value={String(
              (tenants ?? []).filter((tenant) => tenant.config.auth.allowSignup)
                .length,
            )}
          />
        </SimpleGrid>

        <Paper p="lg" radius="lg" withBorder>
          <Group justify="space-between" mb="md">
            <Title order={3}>Tenant Registry</Title>
            <Text c="dimmed" size="sm">
              Domains, access policy, and module footprint
            </Text>
          </Group>

          {isLoading ? (
            <div className="flex justify-center items-center p-12">
              <Loader size="sm" color="green" />
            </div>
          ) : (
            <Table
              verticalSpacing="md"
              horizontalSpacing="md"
              className="w-full"
            >
              <Table.Thead className="bg-stone-50 border-b border-stone-200">
                <Table.Tr>
                  <Table.Th className="text-stone-500 font-semibold text-xs tracking-wide">
                    Tenant ID
                  </Table.Th>
                  <Table.Th className="text-stone-500 font-semibold text-xs tracking-wide">
                    Tenant
                  </Table.Th>
                  <Table.Th className="text-stone-500 font-semibold text-xs tracking-wide">
                    Domain
                  </Table.Th>
                  <Table.Th className="text-stone-500 font-semibold text-xs tracking-wide">
                    Access Policy
                  </Table.Th>
                  <Table.Th className="text-stone-500 font-semibold text-xs tracking-wide">
                    Modules
                  </Table.Th>
                  <Table.Th className="text-stone-500 font-semibold text-xs tracking-wide">
                    Status
                  </Table.Th>
                  <Table.Th className="text-stone-500 font-semibold text-xs tracking-wide text-right">
                    Actions
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody className="text-sm">
                {(tenants ?? []).map((tenant) => (
                  <Table.Tr
                    key={tenant.id}
                    className="border-b border-stone-100 hover:bg-stone-50 transition-colors"
                  >
                    <Table.Td className="font-mono text-xs text-stone-500">
                      {tenant.id}
                    </Table.Td>
                    <Table.Td>
                      <Text className="font-medium text-stone-900">
                        {tenant.name}
                      </Text>
                      <Text c="dimmed" size="xs">
                        {tenant.config.branding.portalName}
                      </Text>
                    </Table.Td>
                    <Table.Td className="text-stone-600 text-xs font-mono">
                      {tenant.domain}
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">
                        {tenant.config.auth.allowSignup
                          ? "Self-service enabled"
                          : "Invite only"}
                      </Text>
                      <Text c="dimmed" size="xs">
                        {tenant.config.auth.restrictedDomains.length > 0
                          ? `${tenant.config.auth.restrictedDomains.length} restricted domain${tenant.config.auth.restrictedDomains.length === 1 ? "" : "s"}`
                          : "No explicit domain lock"}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      {countEnabledModules(tenant.config.modules)} enabled
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        color={
                          statusColors[tenant.subscriptionStatus] ?? "gray"
                        }
                        variant="light"
                        className="font-medium capitalize"
                      >
                        {tenant.subscriptionStatus}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Group justify="flex-end" gap="xs">
                        <Button
                          variant="subtle"
                          color="gray"
                          size="xs"
                          className="text-stone-600 hover:bg-stone-100"
                          onClick={() => setEditTenant(tenant)}
                        >
                          Edit
                        </Button>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))}
                {!isLoading && (tenants ?? []).length === 0 && (
                  <Table.Tr>
                    <Table.Td
                      colSpan={7}
                      className="text-center py-10 text-stone-400"
                    >
                      No tenants registered yet.
                    </Table.Td>
                  </Table.Tr>
                )}
              </Table.Tbody>
            </Table>
          )}
        </Paper>

        <Modal
          opened={addOpen}
          onClose={() => {
            setAddOpen(false);
            setAddForm(defaultAddForm);
          }}
          title="Add New Tenant"
          centered
        >
          <div className="space-y-4">
            <TextInput
              label="Tenant Name"
              placeholder="e.g. Nigerian Correctional Service"
              required
              value={addForm.name}
              onChange={(e) => {
                const name = e.currentTarget.value;
                setAddForm((prev) => ({
                  ...prev,
                  id: toSlug(name),
                  name,
                }));
              }}
            />
            <TextInput
              label="Tenant ID (Slug)"
              placeholder="e.g. nigerian-correctional-service"
              required
              value={addForm.id}
              onChange={(e) =>
                setAddForm((prev) => ({
                  ...prev,
                  id: toSlug(e.currentTarget.value),
                }))
              }
              description="URL-safe identifier, auto-generated from name"
            />
            <TextInput
              label="Primary Domain"
              placeholder="e.g. corrections.gov.ng"
              required
              value={addForm.domain}
              onChange={(e) =>
                setAddForm((prev) => ({
                  ...prev,
                  domain: e.currentTarget.value,
                }))
              }
            />
            <Select
              label="Subscription Status"
              data={[
                { label: "Trial", value: "trial" },
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
              value={addForm.subscriptionStatus}
              onChange={(value) =>
                setAddForm((prev) => ({
                  ...prev,
                  subscriptionStatus: (value ??
                    "trial") as TenantSubscriptionStatus,
                }))
              }
            />
            <Switch
              checked={addForm.allowSignup}
              label="Allow self-service sign-up"
              onChange={(event) =>
                setAddForm((prev) => ({
                  ...prev,
                  allowSignup: event.currentTarget.checked,
                }))
              }
            />
            <Group justify="flex-end" mt="md">
              <Button
                variant="default"
                onClick={() => {
                  setAddOpen(false);
                  setAddForm(defaultAddForm);
                }}
              >
                Cancel
              </Button>
              <Button
                color="green"
                loading={isCreating}
                disabled={!addForm.name || !addForm.id || !addForm.domain}
                onClick={handleAddSubmit}
              >
                Create Tenant
              </Button>
            </Group>
          </div>
        </Modal>

        <Modal
          opened={editTenant !== null}
          onClose={() => setEditTenant(null)}
          title="Edit Tenant"
          centered
        >
          <div className="space-y-4">
            <TextInput
              label="Tenant Name"
              value={editTenant?.name ?? ""}
              onChange={(e) =>
                setEditTenant((prev) =>
                  prev ? { ...prev, name: e.currentTarget.value } : prev,
                )
              }
            />
            <TextInput
              label="Domain"
              value={editTenant?.domain ?? ""}
              onChange={(e) =>
                setEditTenant((prev) =>
                  prev ? { ...prev, domain: e.currentTarget.value } : prev,
                )
              }
            />
            <Select
              label="Subscription Status"
              data={[
                { label: "Trial", value: "trial" },
                { label: "Active", value: "active" },
                { label: "Inactive", value: "inactive" },
              ]}
              value={editTenant?.subscriptionStatus ?? null}
              onChange={(value) =>
                setEditTenant((prev) =>
                  prev
                    ? {
                        ...prev,
                        subscriptionStatus: (value ??
                          "trial") as TenantSubscriptionStatus,
                      }
                    : prev,
                )
              }
            />
            <Switch
              checked={editTenant?.config.auth.allowSignup ?? false}
              label="Allow self-service sign-up"
              onChange={(event) =>
                setEditTenant((prev) =>
                  prev
                    ? {
                        ...prev,
                        config: {
                          ...prev.config,
                          auth: {
                            ...prev.config.auth,
                            allowSignup: event.currentTarget.checked,
                          },
                        },
                      }
                    : prev,
                )
              }
            />
            <Group justify="flex-end" mt="md">
              <Button variant="default" onClick={() => setEditTenant(null)}>
                Cancel
              </Button>
              <Button
                color="green"
                loading={isUpdating}
                onClick={handleEditSubmit}
              >
                Save Changes
              </Button>
            </Group>
          </div>
        </Modal>

        <div>
          <Paper
            className="bg-[#006838]/5 border border-[#006838]/20 p-4 rounded-lg"
            radius="lg"
          >
            <Group gap="sm">
              <Building2 size={16} className="text-[#006838]" />
              <Text className="text-[#006838] text-sm font-medium">
                New tenants now bootstrap from a platform-neutral SparkTool
                template instead of inheriting tenant-specific NCS assets or
                missing placeholder files.
              </Text>
            </Group>
          </Paper>
        </div>
      </Stack>
    </Container>
  );
}

function countEnabledModules(modules: Tenant["config"]["modules"]) {
  return Object.values(modules).filter(Boolean).length;
}

function TenantStat({ label, value }: { label: string; value: string }) {
  return (
    <Paper p="lg" radius="lg" withBorder>
      <Text c="dimmed" size="sm">
        {label}
      </Text>
      <Title order={2}>{value}</Title>
    </Paper>
  );
}
