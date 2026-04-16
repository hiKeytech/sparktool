import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  CopyButton,
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
import {
  useCreateTenantOnboarding,
  useReissueTenantAdminInvitation,
  useRevokeTenantAdminInvitation,
  useTenantAdminInvitations,
  useTenants,
  useUpdateTenant,
} from "@/services/hooks";
import { formatDateTime, formatRelativeTime } from "@/utils/date-utils";
import type { Tenant } from "@/schemas/tenant";
import type { AdminInvitationSummary } from "@/schemas/invitation";

type TenantSubscriptionStatus = "active" | "inactive" | "trial";

interface AddTenantForm {
  adminDisplayName: string;
  adminEmail: string;
  allowSignup: boolean;
  domain: string;
  id: string;
  name: string;
  subscriptionStatus: TenantSubscriptionStatus;
}

interface OnboardingResult {
  inviteLink: string;
  inviteeEmail: string;
  tenantName: string;
}

type InvitationRecordMap = Record<string, AdminInvitationSummary[]>;

function toDataUrl(svg: string) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function escapeSvgText(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildTenantBadgeDataUrl(name: string) {
  const initials =
    name
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "TN";

  return toDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160" fill="none">
      <rect width="160" height="160" rx="32" fill="#0f3d2e"/>
      <rect x="16" y="16" width="128" height="128" rx="24" fill="#15523d" stroke="#8ed5b2" stroke-width="2"/>
      <text x="80" y="92" text-anchor="middle" font-family="Inter, Arial, sans-serif" font-size="44" font-weight="700" fill="#f3fbf7">${initials}</text>
    </svg>
  `);
}

function buildTenantIllustrationDataUrl(name: string) {
  const safeName = escapeSvgText(name);

  return toDataUrl(`
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="720" viewBox="0 0 1200 720" fill="none">
      <rect width="1200" height="720" fill="#eef6f1"/>
      <circle cx="1040" cy="120" r="220" fill="#d2eadc"/>
      <circle cx="160" cy="640" r="240" fill="#dcefe4"/>
      <rect x="120" y="124" width="960" height="472" rx="40" fill="#ffffff" stroke="#c5dfd1" stroke-width="2"/>
      <rect x="184" y="192" width="224" height="18" rx="9" fill="#1b7339" fill-opacity="0.18"/>
      <rect x="184" y="232" width="448" height="64" rx="20" fill="#114b2d"/>
      <rect x="184" y="320" width="372" height="18" rx="9" fill="#9cc8af"/>
      <rect x="184" y="356" width="312" height="18" rx="9" fill="#c8dfd2"/>
      <rect x="184" y="420" width="192" height="52" rx="26" fill="#1b7339"/>
      <rect x="414" y="420" width="188" height="52" rx="26" fill="#edf5f0" stroke="#d5e7db" stroke-width="2"/>
      <rect x="744" y="220" width="220" height="280" rx="28" fill="#f4faf6" stroke="#d5e7db" stroke-width="2"/>
      <rect x="784" y="268" width="140" height="140" rx="28" fill="#d7eadf"/>
      <text x="184" y="286" font-family="Inter, Arial, sans-serif" font-size="52" font-weight="700" fill="#ffffff">${safeName}</text>
      <text x="184" y="398" font-family="Inter, Arial, sans-serif" font-size="24" font-weight="500" fill="#37644d">Tenant workspace on SparkTool</text>
    </svg>
  `);
}

function buildDefaultConfig(name: string, allowSignup: boolean) {
  const badgeUrl = buildTenantBadgeDataUrl(name);
  const illustrationUrl = buildTenantIllustrationDataUrl(name);

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
      logoUrl: badgeUrl,
      portalName: name,
      primaryColor: "#1b7339",
      secondaryColor: "#eef6f1",
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
      copyright: `© ${new Date().getFullYear()} ${name}. Powered by SparkTool.`,
      featuredCoursesCtaLabel: "View All",
      featuredCoursesTitle: "Featured Courses",
      footerLogoAlt: `${name} logo`,
      footerLogoUrl: badgeUrl,
      footerTagline: `${name} learning workspace on SparkTool`,
      heroBackgroundImageUrl: illustrationUrl,
      heroDescription: `${name} delivers tenant-isolated learning experiences on SparkTool.`,
      heroLogoAlt: `${name} logo`,
      heroLogoUrl: badgeUrl,
      heroPrimaryCtaLabel: "Start Learning",
      heroSecondaryCtaLabel: "Explore Courses",
      heroTitle: name,
      missionCtaLabel: "Learn More",
      missionDescription: `${name} uses SparkTool to deliver structured, tenant-isolated learning experiences.`,
      missionImageAlt: `${name} mission graphic`,
      missionImageUrl: illustrationUrl,
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
  adminDisplayName: "",
  adminEmail: "",
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
  const [onboardingResult, setOnboardingResult] =
    useState<OnboardingResult | null>(null);

  const { data: tenants, isLoading } = useTenants();
  const { data: tenantInvitations = [] } = useTenantAdminInvitations();
  const { isPending: isCreating, mutate: createTenantOnboarding } =
    useCreateTenantOnboarding();
  const { isPending: isReissuing, mutate: reissueInvitation } =
    useReissueTenantAdminInvitation();
  const { isPending: isRevoking, mutate: revokeInvitation } =
    useRevokeTenantAdminInvitation();
  const { isPending: isUpdating, mutate: updateTenant } = useUpdateTenant();

  const invitationMap = buildInvitationMap(tenantInvitations);

  function handleAddSubmit() {
    createTenantOnboarding(
      {
        initialAdminInvitation: {
          displayName: addForm.adminDisplayName || null,
          email: addForm.adminEmail,
        },
        tenant: {
          config: buildDefaultConfig(addForm.name, addForm.allowSignup),
          domain: addForm.domain,
          id: addForm.id,
          name: addForm.name,
          subscriptionStatus: addForm.subscriptionStatus,
        },
      },
      {
        onSuccess: (result) => {
          setAddOpen(false);
          setOnboardingResult({
            inviteLink: `${window.location.origin}/${result.tenant.id}/login?invite=${result.invitationToken}`,
            inviteeEmail: result.invitation.email,
            tenantName: result.tenant.name,
          });
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
            <div className="flex items-center justify-center p-12">
              <Loader size="sm" color="green" />
            </div>
          ) : (
            <Table
              verticalSpacing="md"
              horizontalSpacing="md"
              className="w-full"
            >
              <Table.Thead className="border-b bg-stone-50 border-stone-200">
                <Table.Tr>
                  <Table.Th className="text-xs font-semibold tracking-wide text-stone-500">
                    Tenant ID
                  </Table.Th>
                  <Table.Th className="text-xs font-semibold tracking-wide text-stone-500">
                    Tenant
                  </Table.Th>
                  <Table.Th className="text-xs font-semibold tracking-wide text-stone-500">
                    Domain
                  </Table.Th>
                  <Table.Th className="text-xs font-semibold tracking-wide text-stone-500">
                    Access Policy
                  </Table.Th>
                  <Table.Th className="text-xs font-semibold tracking-wide text-stone-500">
                    Modules
                  </Table.Th>
                  <Table.Th className="text-xs font-semibold tracking-wide text-stone-500">
                    Status
                  </Table.Th>
                  <Table.Th className="text-xs font-semibold tracking-wide text-stone-500">
                    Admin Invite
                  </Table.Th>
                  <Table.Th className="text-xs font-semibold tracking-wide text-right text-stone-500">
                    Actions
                  </Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody className="text-sm">
                {(tenants ?? []).map((tenant) => (
                  <Table.Tr
                    key={tenant.id}
                    className="transition-colors border-b border-stone-100 hover:bg-stone-50"
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
                    <Table.Td className="font-mono text-xs text-stone-600">
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
                      <TenantInviteCell
                        invitation={resolveLatestPendingInvitation(
                          invitationMap[tenant.id] ?? [],
                        )}
                      />
                    </Table.Td>
                    <Table.Td>
                      <Group justify="flex-end" gap="xs">
                        {resolveLatestManageableInvitation(
                          invitationMap[tenant.id] ?? [],
                        ) ? (
                          <Button
                            variant="subtle"
                            color="green"
                            size="xs"
                            className="text-[#006838] hover:bg-[#006838]/10"
                            loading={isReissuing}
                            onClick={() => {
                              const invitation =
                                resolveLatestManageableInvitation(
                                  invitationMap[tenant.id] ?? [],
                                );
                              if (!invitation) return;

                              reissueInvitation(
                                {
                                  invitationId: invitation.id,
                                  tenantId: tenant.id,
                                },
                                {
                                  onSuccess: (result) => {
                                    setOnboardingResult({
                                      inviteLink: `${window.location.origin}/${tenant.id}/login?invite=${result.invitationToken}`,
                                      inviteeEmail: result.invitation.email,
                                      tenantName: tenant.name,
                                    });
                                  },
                                },
                              );
                            }}
                          >
                            Reissue Invite
                          </Button>
                        ) : null}
                        {resolveLatestPendingInvitation(
                          invitationMap[tenant.id] ?? [],
                        ) ? (
                          <Button
                            variant="subtle"
                            color="red"
                            size="xs"
                            className="text-red-600 hover:bg-red-50"
                            loading={isRevoking}
                            onClick={() => {
                              const invitation = resolveLatestPendingInvitation(
                                invitationMap[tenant.id] ?? [],
                              );
                              if (!invitation) return;

                              revokeInvitation({
                                invitationId: invitation.id,
                                tenantId: tenant.id,
                              });
                            }}
                          >
                            Revoke Invite
                          </Button>
                        ) : null}
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
                      colSpan={8}
                      className="py-10 text-center text-stone-400"
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
            <Text c="dimmed" size="sm">
              A tenant is not considered operational until it has an accountable
              first administrator. This flow creates the tenant and issues a
              one-time administrator invite instead of pre-creating a dormant
              account.
            </Text>
            <TextInput
              label="Tenant Name"
              placeholder="e.g. Lagos Public Service Academy"
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
            <div className="pt-2">
              <Text fw={600} size="sm">
                Initial Tenant Administrator Invite
              </Text>
              <Text c="dimmed" size="xs">
                This email receives the first admin redemption link for the new
                tenant workspace.
              </Text>
            </div>
            <TextInput
              label="Invitee Name"
              placeholder="e.g. Ada Nwosu"
              value={addForm.adminDisplayName}
              onChange={(e) =>
                setAddForm((prev) => ({
                  ...prev,
                  adminDisplayName: e.currentTarget.value,
                }))
              }
            />
            <TextInput
              label="Invitee Email Address"
              placeholder="e.g. ada@tenant.org"
              required
              value={addForm.adminEmail}
              onChange={(e) =>
                setAddForm((prev) => ({
                  ...prev,
                  adminEmail: e.currentTarget.value,
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
                disabled={
                  !addForm.name ||
                  !addForm.id ||
                  !addForm.domain ||
                  !addForm.adminEmail
                }
                onClick={handleAddSubmit}
              >
                Create Tenant and Invite Admin
              </Button>
            </Group>
          </div>
        </Modal>

        <Modal
          opened={onboardingResult !== null}
          onClose={() => setOnboardingResult(null)}
          title="Administrator Invite Ready"
          centered
        >
          <Stack gap="md">
            <Text c="dimmed" size="sm">
              {onboardingResult?.tenantName} is now provisioned. Share this
              one-time invite with {onboardingResult?.inviteeEmail} so they can
              create the first tenant admin account.
            </Text>
            <TextInput
              label="Administrator invite link"
              readOnly
              value={onboardingResult?.inviteLink ?? ""}
            />
            <CopyButton value={onboardingResult?.inviteLink ?? ""}>
              {({ copied, copy }) => (
                <Button color="green" onClick={copy}>
                  {copied ? "Invite link copied" : "Copy invite link"}
                </Button>
              )}
            </CopyButton>
          </Stack>
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
                template instead of inheriting tenant-specific branding or
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

function buildInvitationMap(invitations: AdminInvitationSummary[]) {
  return invitations.reduce<InvitationRecordMap>((accumulator, invitation) => {
    if (!accumulator[invitation.tenantId]) {
      accumulator[invitation.tenantId] = [];
    }

    accumulator[invitation.tenantId]!.push(invitation);
    return accumulator;
  }, {});
}

function resolveLatestPendingInvitation(invitations: AdminInvitationSummary[]) {
  return (
    invitations.find((invitation) => invitation.status === "pending") ?? null
  );
}

function resolveLatestManageableInvitation(
  invitations: AdminInvitationSummary[],
) {
  return (
    invitations.find(
      (invitation) =>
        invitation.status === "pending" || invitation.status === "revoked",
    ) ?? null
  );
}

function TenantInviteCell({
  invitation,
}: {
  invitation: AdminInvitationSummary | null;
}) {
  if (!invitation) {
    return (
      <Text c="dimmed" size="xs">
        No active invite
      </Text>
    );
  }

  return (
    <div>
      <Text size="sm">{invitation.email}</Text>
      <Text c="dimmed" size="xs">
        Expires {formatRelativeTime(invitation.expiresAt)}
      </Text>
      <Text c="dimmed" size="xs">
        {formatDateTime(invitation.expiresAt)}
      </Text>
    </div>
  );
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
