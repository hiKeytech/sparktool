import type { Tenant, User, UserRole } from "@/types";

import {
  ActionIcon,
  Badge,
  Button,
  Card,
  ColorInput,
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
  Tabs,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import {
  IconBuilding,
  IconEdit,
  IconKey,
  IconSearch,
  IconShield,
  IconTrash,
  IconUserCheck,
} from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useDeferredValue, useMemo, useState } from "react";
import { z } from "zod";

import { openResetUserPasswordModal } from "@/components/modals";
import { api } from "@/services/api";
import {
  useCreateTenant,
  useTenants,
  useUpdateTenant,
  useUsers,
} from "@/services/hooks";

type TenantDraft = {
  allowSignup: boolean;
  certificates: boolean;
  domain: string;
  id: string;
  liveClasses: boolean;
  logoUrl: string;
  name: string;
  portalName: string;
  primaryColor: string;
  restrictedDomains: string;
  secondaryColor: string;
  subscriptionStatus: Tenant["subscriptionStatus"];
};

const tenantDraftSchema = z.object({
  allowSignup: z.boolean(),
  certificates: z.boolean(),
  domain: z
    .string()
    .trim()
    .min(1, "Primary domain is required")
    .regex(
      /^[a-z0-9.-]+$/,
      "Use a hostname only. Remove protocols and trailing paths.",
    ),
  id: z
    .string()
    .trim()
    .min(1, "Tenant ID is required")
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens only."),
  liveClasses: z.boolean(),
  logoUrl: z.string().trim().min(1, "Logo URL is required"),
  name: z.string().trim().min(1, "Tenant name is required"),
  portalName: z.string().trim().min(1, "Portal name is required"),
  primaryColor: z.string().trim().min(1, "Primary color is required"),
  restrictedDomains: z.string().trim(),
  secondaryColor: z.string().trim().min(1, "Secondary color is required"),
  subscriptionStatus: z.enum(["active", "inactive", "trial"]),
});

const EMPTY_TENANT_DRAFT: TenantDraft = {
  allowSignup: false,
  certificates: true,
  domain: "",
  id: "",
  liveClasses: false,
  logoUrl: "/logo.png",
  name: "",
  portalName: "",
  primaryColor: "#1b7339",
  restrictedDomains: "",
  secondaryColor: "#f4f8f2",
  subscriptionStatus: "trial",
};

export function SuperAdminDashboard() {
  const [editingTenant, setEditingTenant] = useState<null | Tenant>(null);
  const [editingUser, setEditingUser] = useState<null | User>(null);
  const [newRole, setNewRole] = useState<UserRole>("student");
  const [tenantModalOpen, setTenantModalOpen] = useState(false);
  const [tenantSearch, setTenantSearch] = useState("");
  const deferredTenantSearch = useDeferredValue(tenantSearch);
  const queryClient = useQueryClient();
  const { data: tenants = [], isLoading: tenantsLoading } = useTenants();
  const createTenantMutation = useCreateTenant();
  const updateTenantMutation = useUpdateTenant();
  const tenantForm = useForm<TenantDraft>({
    initialValues: EMPTY_TENANT_DRAFT,
    validate: zod4Resolver(tenantDraftSchema),
  });

  const { data: users = [], isLoading } = useUsers(null);

  // Update user role mutation
  const updateUserRoleMutation = useMutation({
    mutationFn: async ({
      role,
      userId,
    }: {
      role: UserRole;
      userId: string;
    }) => {
      await api.$use.user.update({
        userData: { role },
        userId,
      });
    },
    onError: (error) => {
      notifications.show({
        color: "red",
        message:
          error instanceof Error ? error.message : "Failed to update role",
        title: "Error",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      notifications.show({
        color: "green",
        message: "User role has been updated successfully",
        title: "Role Updated",
      });
      setEditingUser(null);
    },
  });

  // Delete user mutation
  const deleteUserMutation = useMutation({
    mutationFn: async (userId: string) => {
      await api.$use.user.deactivate(userId);
    },
    onError: (error) => {
      notifications.show({
        color: "red",
        message:
          error instanceof Error ? error.message : "Failed to delete user",
        title: "Error",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries();
      notifications.show({
        color: "green",
        message: "User has been deactivated successfully",
        title: "User Deleted",
      });
    },
  });

  const stats = useMemo<{
    active: number;
    activeTenants: number;
    admin: number;
    student: number;
    "super-admin": number;
    total: number;
    totalTenants: number;
    trialTenants: number;
  }>(() => {
    const userStats = users.reduce(
      (acc, user) => {
        acc.total++;
        if (user.isActive) acc.active++;
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      },
      {
        active: 0,
        admin: 0,
        student: 0,
        "super-admin": 0,
        total: 0,
      } as Record<string, number>,
    );

    return {
      active: userStats.active,
      activeTenants: tenants.filter(
        (tenant) => tenant.subscriptionStatus === "active",
      ).length,
      admin: userStats.admin,
      student: userStats.student,
      "super-admin": userStats["super-admin"],
      total: userStats.total,
      totalTenants: tenants.length,
      trialTenants: tenants.filter(
        (tenant) => tenant.subscriptionStatus === "trial",
      ).length,
    };
  }, [tenants, users]);

  const filteredTenants = useMemo(() => {
    const query = deferredTenantSearch.trim().toLowerCase();

    if (!query) {
      return tenants;
    }

    return tenants.filter((tenant) => {
      const fields = [
        tenant.name,
        tenant.id,
        tenant.domain,
        tenant.config.branding.portalName,
      ];

      return fields.some((value) => value.toLowerCase().includes(query));
    });
  }, [deferredTenantSearch, tenants]);

  const closeTenantModal = () => {
    setEditingTenant(null);
    setTenantModalOpen(false);
    tenantForm.setValues(EMPTY_TENANT_DRAFT);
    tenantForm.clearErrors();
  };

  const handleEditRole = (user: User) => {
    setEditingUser(user);
    setNewRole(user.role);
  };

  const handleEditTenant = (tenant: Tenant) => {
    setEditingTenant(tenant);
    tenantForm.setValues(toTenantDraft(tenant));
    tenantForm.clearErrors();
    setTenantModalOpen(true);
  };

  const handleOpenCreateTenant = () => {
    closeTenantModal();
    setTenantModalOpen(true);
  };

  const handleUpdateRole = () => {
    if (!editingUser) return;

    updateUserRoleMutation.mutate({
      role: newRole,
      userId: editingUser.uid,
    });
  };

  const handleDeleteUser = (user: User) => {
    modals.openConfirmModal({
      children: (
        <Text size="sm">
          Are you sure you want to delete <strong>{user.displayName}</strong> (
          {user.email})? This action will deactivate their account and they will
          lose access to the platform.
        </Text>
      ),
      confirmProps: { color: "red" },
      labels: { cancel: "Cancel", confirm: "Delete" },
      onConfirm: () => deleteUserMutation.mutate(user.uid),
      title: "Delete User",
    });
  };

  const handleResetPassword = (user: User) => {
    openResetUserPasswordModal(user);
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "blue";
      case "student":
        return "gray";
      case "super-admin":
        return "red";
      default:
        return "gray";
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case "admin":
        return <IconUserCheck size="1rem" />;
      case "student":
        return null;
      case "super-admin":
        return <IconShield size="1rem" />;
      default:
        return null;
    }
  };

  const handleSaveTenant = tenantForm.onSubmit(async (values) => {
    const payload = buildTenantPayload(values);

    try {
      if (editingTenant) {
        await updateTenantMutation.mutateAsync({
          tenantData: payload,
          tenantId: editingTenant.id,
        });
      } else {
        await createTenantMutation.mutateAsync(payload);
      }

      closeTenantModal();
    } catch (error) {
      notifications.show({
        color: "red",
        message:
          error instanceof Error ? error.message : "Failed to save tenant",
        title: "Error",
      });
    }
  });

  if (isLoading || tenantsLoading) {
    return (
      <Container py="xl" size="lg">
        <Loader size="lg" />
      </Container>
    );
  }
  return (
    <Container py="xl" size="xl">
      <Stack gap="xl">
        <Group justify="space-between">
          <div>
            <Title c="fun-green.8" order={1}>
              Platform Admin Console
            </Title>
            <Text c="dimmed" size="lg">
              Create tenants, manage domains, and oversee platform-wide access.
            </Text>
          </div>
          <Button
            leftSection={<IconBuilding size={16} />}
            onClick={handleOpenCreateTenant}
          >
            Create Tenant
          </Button>
        </Group>

        <SimpleGrid cols={{ base: 2, md: 3, xl: 6 }}>
          <Card withBorder>
            <Text c="dimmed" size="sm">
              Total Tenants
            </Text>
            <Title order={2}>{stats.totalTenants}</Title>
          </Card>
          <Card withBorder>
            <Text c="dimmed" size="sm">
              Active Tenants
            </Text>
            <Title order={2}>{stats.activeTenants}</Title>
          </Card>
          <Card withBorder>
            <Text c="dimmed" size="sm">
              Trial Tenants
            </Text>
            <Title order={2}>{stats.trialTenants}</Title>
          </Card>
          <Card withBorder>
            <Text c="dimmed" size="sm">
              Total Users
            </Text>
            <Title order={2}>{stats.total}</Title>
          </Card>
          <Card withBorder>
            <Text c="dimmed" size="sm">
              Tenant Admins
            </Text>
            <Title order={2}>{stats.admin}</Title>
          </Card>
          <Card withBorder>
            <Text c="dimmed" size="sm">
              Platform Admins
            </Text>
            <Title order={2}>{stats["super-admin"]}</Title>
          </Card>
        </SimpleGrid>

        <Tabs defaultValue="tenants">
          <Tabs.List>
            <Tabs.Tab value="tenants">Tenants</Tabs.Tab>
            <Tabs.Tab value="users">Platform Access</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel pt="md" value="tenants">
            <Card p="lg" radius="md" shadow="sm" withBorder>
              <Stack gap="md">
                <div>
                  <Title order={3}>Tenant Directory</Title>
                  <Text c="dimmed" size="sm">
                    Platform-managed tenants, domain mapping, and access
                    defaults.
                  </Text>
                </div>

                <TextInput
                  leftSection={<IconSearch size="1rem" />}
                  onChange={(event) =>
                    setTenantSearch(event.currentTarget.value)
                  }
                  placeholder="Filter by tenant name, ID, portal, or domain"
                  value={tenantSearch}
                />

                <Table.ScrollContainer minWidth={720}>
                  <Table highlightOnHover>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Tenant ID</Table.Th>
                        <Table.Th>Domain</Table.Th>
                        <Table.Th>Status</Table.Th>
                        <Table.Th>Access</Table.Th>
                        <Table.Th></Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {filteredTenants.map((tenant) => (
                        <Table.Tr key={tenant.id}>
                          <Table.Td>
                            <Stack gap={2}>
                              <Text fw={600}>{tenant.name}</Text>
                              <Text c="dimmed" size="xs">
                                {tenant.config.branding.portalName}
                              </Text>
                            </Stack>
                          </Table.Td>
                          <Table.Td>{tenant.id}</Table.Td>
                          <Table.Td>{tenant.domain}</Table.Td>
                          <Table.Td>
                            <Badge
                              color={
                                tenant.subscriptionStatus === "active"
                                  ? "green"
                                  : tenant.subscriptionStatus === "trial"
                                    ? "yellow"
                                    : "gray"
                              }
                            >
                              {tenant.subscriptionStatus}
                            </Badge>
                          </Table.Td>
                          <Table.Td>
                            <Group gap="xs">
                              <Badge
                                color={
                                  tenant.config.auth.allowSignup
                                    ? "green"
                                    : "gray"
                                }
                                variant="light"
                              >
                                {tenant.config.auth.allowSignup
                                  ? "Signup Open"
                                  : "Invite Only"}
                              </Badge>
                              <Badge
                                color={
                                  tenant.config.modules.liveClasses
                                    ? "blue"
                                    : "gray"
                                }
                                variant="light"
                              >
                                Live Classes{" "}
                                {tenant.config.modules.liveClasses
                                  ? "On"
                                  : "Off"}
                              </Badge>
                            </Group>
                          </Table.Td>
                          <Table.Td>
                            <Group justify="flex-end">
                              <ActionIcon
                                onClick={() => handleEditTenant(tenant)}
                                variant="subtle"
                              >
                                <IconEdit size="1rem" />
                              </ActionIcon>
                            </Group>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </Table.ScrollContainer>

                {filteredTenants.length === 0 ? (
                  <Text c="dimmed" size="sm">
                    No tenants match the current filter.
                  </Text>
                ) : null}
              </Stack>
            </Card>
          </Tabs.Panel>

          <Tabs.Panel pt="md" value="users">
            <Card p="lg" radius="md" shadow="sm" withBorder>
              <Stack gap="md">
                <div>
                  <Title order={3}>Platform Access</Title>
                  <Text c="dimmed" size="sm">
                    Control who can operate tenants and who remains scoped to
                    tenant administration.
                  </Text>
                </div>

                <Stack gap="sm">
                  {users.map((user) => (
                    <Paper key={user.id} p="md" withBorder>
                      <Group align="center" justify="space-between">
                        <div style={{ flex: 1 }}>
                          <Group align="center" gap="sm">
                            <Text fw={500}>{user.displayName}</Text>
                            <Badge
                              color={getRoleBadgeColor(user.role)}
                              leftSection={getRoleIcon(user.role)}
                              size="sm"
                            >
                              {user.role.replace("-", " ")}
                            </Badge>
                            {!user.isActive && (
                              <Badge color="red" size="sm">
                                Deactivated
                              </Badge>
                            )}
                          </Group>
                          <Text c="dimmed" size="sm">
                            {user.email}
                          </Text>
                          <Text c="dimmed" size="xs">
                            Tenant memberships: {(user.tenantIds || []).length}
                          </Text>
                        </div>

                        <Group gap="xs">
                          <ActionIcon
                            color="grape"
                            onClick={() => handleResetPassword(user)}
                            variant="subtle"
                          >
                            <IconKey size="1rem" />
                          </ActionIcon>

                          <ActionIcon
                            color="blue"
                            disabled={user.role === "super-admin"}
                            onClick={() => handleEditRole(user)}
                            variant="subtle"
                          >
                            <IconEdit size="1rem" />
                          </ActionIcon>

                          {user.role !== "super-admin" && (
                            <ActionIcon
                              color="red"
                              loading={deleteUserMutation.isPending}
                              onClick={() => handleDeleteUser(user)}
                              variant="subtle"
                            >
                              <IconTrash size="1rem" />
                            </ActionIcon>
                          )}
                        </Group>
                      </Group>
                    </Paper>
                  ))}
                </Stack>
              </Stack>
            </Card>
          </Tabs.Panel>
        </Tabs>

        <Modal
          centered
          onClose={closeTenantModal}
          opened={tenantModalOpen}
          size="lg"
          title={editingTenant ? "Edit Tenant" : "Create Tenant"}
        >
          <form onSubmit={handleSaveTenant}>
            <Stack gap="md">
              <Text c="dimmed" size="sm">
                The tenant ID becomes the path segment in the tenant app, and
                the primary domain controls host-based resolution.
              </Text>
              <Text c="dimmed" size="sm">
                Configure branding and access here. Live session behavior will
                inherit the tenant name, colors, and domain restrictions.
              </Text>
              <TextInput
                label="Tenant Name"
                {...tenantForm.getInputProps("name")}
              />
              <Group grow>
                <TextInput
                  disabled={Boolean(editingTenant)}
                  label="Tenant ID"
                  {...tenantForm.getInputProps("id")}
                />
                <Select
                  data={[
                    { label: "Trial", value: "trial" },
                    { label: "Active", value: "active" },
                    { label: "Inactive", value: "inactive" },
                  ]}
                  error={tenantForm.errors.subscriptionStatus}
                  label="Subscription Status"
                  onChange={(value) =>
                    tenantForm.setFieldValue(
                      "subscriptionStatus",
                      (value as Tenant["subscriptionStatus"]) || "trial",
                    )
                  }
                  value={tenantForm.values.subscriptionStatus}
                />
              </Group>
              <TextInput
                label="Primary Domain"
                {...tenantForm.getInputProps("domain")}
              />
              <TextInput
                label="Restricted Login Domains"
                placeholder="example.edu, partner.org"
                {...tenantForm.getInputProps("restrictedDomains")}
              />
              {tenantForm.values.id ? (
                <Stack gap={2}>
                  <Text c="dimmed" size="xs">
                    Live session test routes
                  </Text>
                  <Text ff="monospace" size="sm">
                    /{tenantForm.values.id}/admin/live-sessions
                  </Text>
                  <Text ff="monospace" size="sm">
                    /{tenantForm.values.id}/student/live-sessions
                  </Text>
                </Stack>
              ) : null}
              <Group grow>
                <TextInput
                  label="Portal Name"
                  {...tenantForm.getInputProps("portalName")}
                />
                <TextInput
                  label="Logo URL"
                  {...tenantForm.getInputProps("logoUrl")}
                />
              </Group>
              <Group grow>
                <ColorInput
                  error={tenantForm.errors.primaryColor}
                  label="Primary Color"
                  onChange={(value) =>
                    tenantForm.setFieldValue("primaryColor", value)
                  }
                  value={tenantForm.values.primaryColor}
                />
                <ColorInput
                  error={tenantForm.errors.secondaryColor}
                  label="Secondary Color"
                  onChange={(value) =>
                    tenantForm.setFieldValue("secondaryColor", value)
                  }
                  value={tenantForm.values.secondaryColor}
                />
              </Group>
              <Group grow>
                <Switch
                  checked={tenantForm.values.allowSignup}
                  label="Allow self signup"
                  onChange={(event) =>
                    tenantForm.setFieldValue(
                      "allowSignup",
                      event.currentTarget.checked,
                    )
                  }
                />
                <Switch
                  checked={tenantForm.values.certificates}
                  label="Certificates module"
                  onChange={(event) =>
                    tenantForm.setFieldValue(
                      "certificates",
                      event.currentTarget.checked,
                    )
                  }
                />
                <Switch
                  checked={tenantForm.values.liveClasses}
                  label="Live classes module"
                  onChange={(event) =>
                    tenantForm.setFieldValue(
                      "liveClasses",
                      event.currentTarget.checked,
                    )
                  }
                />
              </Group>
              <Group justify="flex-end">
                <Button onClick={closeTenantModal} variant="subtle">
                  Cancel
                </Button>
                <Button
                  loading={
                    createTenantMutation.isPending ||
                    updateTenantMutation.isPending
                  }
                  type="submit"
                >
                  {editingTenant ? "Save Changes" : "Create Tenant"}
                </Button>
              </Group>
            </Stack>
          </form>
        </Modal>

        <Modal
          centered
          onClose={() => setEditingUser(null)}
          opened={!!editingUser}
          title="Change User Role"
        >
          {editingUser && (
            <Stack gap="md">
              <div>
                <Text fw={500}>{editingUser.displayName}</Text>
                <Text c="dimmed" size="sm">
                  {editingUser.email}
                </Text>
              </div>

              <Select
                data={[
                  { label: "Student", value: "student" },
                  { label: "Administrator", value: "admin" },
                  { label: "Super Administrator", value: "super-admin" },
                ]}
                label="New Role"
                onChange={(value) => setNewRole(value as UserRole)}
                value={newRole}
              />

              <Group justify="flex-end">
                <Button onClick={() => setEditingUser(null)} variant="subtle">
                  Cancel
                </Button>
                <Button
                  color="fun-green"
                  disabled={newRole === editingUser.role}
                  loading={updateUserRoleMutation.isPending}
                  onClick={handleUpdateRole}
                >
                  Update Role
                </Button>
              </Group>
            </Stack>
          )}
        </Modal>
      </Stack>
    </Container>
  );
}

function buildTenantPayload(draft: TenantDraft): Tenant {
  const restrictedDomains = draft.restrictedDomains
    .split(",")
    .map((domain) => domain.trim().toLowerCase())
    .filter(Boolean);

  return {
    config: {
      auth: {
        allowSignup: draft.allowSignup,
        domains: restrictedDomains,
        restrictedDomains,
        strategies: [
          {
            config: {},
            label: "Sign in",
            type: "email-password" as const,
          },
        ],
      },
      branding: {
        fontFamily: "Inter, sans-serif",
        loginPage: {
          features: [
            {
              description:
                "Access tenant resources, announcements, and guided learning experiences.",
              icon: "IconBook",
              title: "Learning access",
            },
            {
              description:
                "Join scheduled sessions, briefings, and instructor-led programs from one workspace.",
              icon: "IconVideo",
              title: "Live sessions",
            },
          ],
          footnote:
            "Use the tenant-specific URL to sign in with the correct workspace context.",
          formDescription: "Enter your credentials to access the platform.",
          formTitle: "Sign In",
          heading: draft.portalName || draft.name,
          subheading: `${draft.portalName || draft.name} learning workspace`,
        },
        logoUrl: draft.logoUrl,
        portalName: draft.portalName || draft.name,
        primaryColor: draft.primaryColor,
        secondaryColor: draft.secondaryColor,
      },
      dashboard: {
        layout: "modern" as const,
        widgets: [],
      },
      liveSessions: {
        appName: `${draft.portalName || draft.name} Live Session`,
        joinWindowMinutes: 10,
      },
      modules: {
        certificates: draft.certificates,
        gamification: false,
        liveClasses: draft.liveClasses,
        messaging: false,
        reports: true,
      },
      publicSite: {
        categorySectionTitle: `Explore ${draft.portalName || draft.name} courses`,
        categories: [
          { icon: "briefcase", name: "Business" },
          { icon: "brain", name: "Artificial Intelligence" },
          { icon: "chart-line", name: "Data Science" },
          { icon: "cpu", name: "Computer Science" },
          { icon: "device-desktop", name: "Information Technology" },
          { icon: "heart", name: "Personal Development" },
        ],
        copyright: `© ${new Date().getFullYear()} ${draft.portalName || draft.name}. All rights reserved.`,
        featuredCoursesCtaLabel: "View All",
        featuredCoursesTitle: "Hot new releases",
        footerLogoAlt: `${draft.portalName || draft.name} logo`,
        footerLogoUrl: draft.logoUrl,
        footerTagline: `${draft.portalName || draft.name} learning workspace`,
        heroBackgroundImageUrl: "/placeholder-course-cover.png",
        heroDescription: `${draft.portalName || draft.name} provides secure access to learning resources, guided programs, and live instruction for approved members.`,
        heroLogoAlt: `${draft.portalName || draft.name} logo`,
        heroLogoUrl: draft.logoUrl,
        heroPrimaryCtaLabel: "Start Learning Today",
        heroSecondaryCtaLabel: "Explore Courses",
        heroTitle: draft.portalName || draft.name,
        missionCtaLabel: "Learn More",
        missionDescription: `${draft.portalName || draft.name} uses this learning platform to deliver structured digital training, improve readiness, and support continuous professional development.`,
        missionImageAlt: `${draft.portalName || draft.name} mission image`,
        missionImageUrl: "/placeholder-course-cover.png",
        missionTitle: `About ${draft.portalName || draft.name}`,
        stats: [
          { label: "Active Learners", value: "0" },
          { label: "Courses", value: "0" },
          { label: "Instructors", value: "0" },
          { label: "Completion Rate", value: "0%" },
        ],
      },
    },
    domain: draft.domain,
    id: draft.id,
    name: draft.name,
    subscriptionStatus: draft.subscriptionStatus,
  };
}

function toTenantDraft(
  tenant: Pick<
    Tenant,
    "config" | "domain" | "id" | "name" | "subscriptionStatus"
  >,
): TenantDraft {
  const restrictedDomains = tenant.config.auth.restrictedDomains?.length
    ? tenant.config.auth.restrictedDomains
    : tenant.config.auth.domains;

  return {
    allowSignup: tenant.config.auth.allowSignup,
    certificates: tenant.config.modules.certificates,
    domain: tenant.domain,
    id: tenant.id,
    liveClasses: tenant.config.modules.liveClasses,
    logoUrl: tenant.config.branding.logoUrl,
    name: tenant.name,
    portalName: tenant.config.branding.portalName,
    primaryColor: tenant.config.branding.primaryColor,
    restrictedDomains: (restrictedDomains || []).join(", "),
    secondaryColor: tenant.config.branding.secondaryColor,
    subscriptionStatus: tenant.subscriptionStatus,
  };
}
