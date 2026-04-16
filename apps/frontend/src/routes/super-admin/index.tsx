import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Alert,
  Badge,
  Container,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Stack,
  Table,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useResolvedAuthState } from "@/providers/auth-provider";
import {
  usePlatformActivityLogs,
  useTenants,
  useUsers,
} from "@/services/hooks";
import { formatDateTime, formatRelativeTime } from "@/utils/date-utils";
import {
  AlertTriangle,
  ArrowRight,
  Building2,
  Globe2,
  History,
  ShieldCheck,
  UserCog,
  Users,
} from "lucide-react";
import type { ActivityLog } from "@/schemas/activity-log";
import type { Tenant } from "@/schemas/tenant";
import type { User } from "@/schemas/user";

export const Route = createFileRoute("/super-admin/")({
  component: SuperAdminDashboard,
});

function SuperAdminDashboard() {
  const { user } = useResolvedAuthState();
  const { data: tenants = [], isLoading: tenantsLoading } = useTenants();
  const { data: users = [], isLoading: usersLoading } = useUsers(null);
  const { data: activityLogs = [], isLoading: activityLoading } =
    usePlatformActivityLogs({ limit: 8 });

  if (tenantsLoading || usersLoading || activityLoading) {
    return (
      <Container py="xl" size="xl">
        <Group justify="center" py="xl">
          <Loader color="green" />
        </Group>
      </Container>
    );
  }

  const platformAdmins = users.filter((entry) => entry.role === "super-admin");
  const tenantAdmins = users.filter((entry) => entry.role === "admin");
  const learners = users.filter((entry) => entry.role === "student");
  const activeTenants = tenants.filter(
    (tenant) => tenant.subscriptionStatus === "active",
  );
  const tenantCoverage = activeTenants.length
    ? Math.round(
        (activeTenants.filter((tenant) =>
          hasAssignedTenantAdmin(tenant, tenantAdmins),
        ).length /
          activeTenants.length) *
          100,
      )
    : 0;
  const inactiveTenants = tenants.filter(
    (tenant) => tenant.subscriptionStatus === "inactive",
  );
  const tenantsWithoutAdmins = tenants.filter(
    (tenant) => !hasAssignedTenantAdmin(tenant, tenantAdmins),
  );
  const dormantPlatformAdmins = platformAdmins.filter(isDormantAccount);

  const attentionItems = [
    ...tenantsWithoutAdmins.map((tenant) => ({
      detail: "No tenant administrator currently assigned",
      label: tenant.name,
      link: "/super-admin/identities",
    })),
    ...inactiveTenants.map((tenant) => ({
      detail: "Tenant is inactive and may require subscription review",
      label: tenant.name,
      link: "/super-admin/tenants",
    })),
    ...dormantPlatformAdmins.map((account) => ({
      detail: "Platform administrator has no recent sign-in activity",
      label: account.displayName,
      link: "/super-admin/identities",
    })),
  ].slice(0, 5);

  return (
    <Container className="py-8" size="xl">
      <Stack gap="xl">
        <header>
          <Group align="flex-start" justify="space-between">
            <div>
              <Group gap="sm" mb="xs">
                <Badge color="green" variant="light">
                  SparkTool Platform
                </Badge>
                <Text c="dimmed" size="sm">
                  Multi-tenant control plane
                </Text>
              </Group>
              <Title order={1}>Platform Overview</Title>
              <Text c="dimmed" maw={760} mt="sm">
                {user?.displayName || "Platform administrator"}, this view
                tracks tenant coverage, administrator ownership, and account
                health across SparkTool. It is intentionally platform-wide, not
                tied to any single tenant.
              </Text>
            </div>
          </Group>
        </header>

        <SimpleGrid cols={{ base: 1, md: 2, xl: 4 }} spacing="md">
          <OverviewStat
            description="Tenants currently serving learners"
            icon={Building2}
            label="Active Tenants"
            tone="green"
            value={String(activeTenants.length)}
          />
          <OverviewStat
            description="SparkTool-wide operator accounts"
            icon={ShieldCheck}
            label="Platform Admins"
            tone="blue"
            value={String(platformAdmins.length)}
          />
          <OverviewStat
            description="Tenant-scoped administrators"
            icon={UserCog}
            label="Tenant Admins"
            tone="orange"
            value={String(tenantAdmins.length)}
          />
          <OverviewStat
            description="Active tenants with assigned administrators"
            icon={Globe2}
            label="Coverage"
            tone="violet"
            value={`${tenantCoverage}%`}
          />
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, lg: 3 }} spacing="md">
          <Link className="block" to="/super-admin/identities">
            <Paper
              className="h-full p-6 transition-shadow border border-stone-200 hover:shadow-md"
              radius="lg"
              withBorder
            >
              <Group justify="space-between" mb="md">
                <ThemeIcon color="green" radius="md" size="xl" variant="light">
                  <Users size={20} />
                </ThemeIcon>
                <ArrowRight size={16} className="text-stone-400" />
              </Group>
              <Title order={3}>Administrator Directory</Title>
              <Text c="dimmed" mt="sm" size="sm">
                Manage {platformAdmins.length + tenantAdmins.length}{" "}
                administrator accounts across platform and tenant scopes.
              </Text>
            </Paper>
          </Link>

          <Link className="block" to="/super-admin/tenants">
            <Paper
              className="h-full p-6 transition-shadow border border-stone-200 hover:shadow-md"
              radius="lg"
              withBorder
            >
              <Group justify="space-between" mb="md">
                <ThemeIcon color="blue" radius="md" size="xl" variant="light">
                  <Building2 size={20} />
                </ThemeIcon>
                <ArrowRight size={16} className="text-stone-400" />
              </Group>
              <Title order={3}>Tenant Registry</Title>
              <Text c="dimmed" mt="sm" size="sm">
                Review subscription status, access posture, and configuration
                readiness for {tenants.length} tenants.
              </Text>
            </Paper>
          </Link>

          <Link className="block" to="/super-admin/telemetry">
            <Paper
              className="h-full p-6 transition-shadow border border-stone-200 hover:shadow-md"
              radius="lg"
              withBorder
            >
              <Group justify="space-between" mb="md">
                <ThemeIcon color="orange" radius="md" size="xl" variant="light">
                  <AlertTriangle size={20} />
                </ThemeIcon>
                <ArrowRight size={16} className="text-stone-400" />
              </Group>
              <Title order={3}>Operational Signals</Title>
              <Text c="dimmed" mt="sm" size="sm">
                Inspect account activity, coverage gaps, and tenant distribution
                using real registry data.
              </Text>
            </Paper>
          </Link>
        </SimpleGrid>

        {attentionItems.length > 0 ? (
          <Alert
            color="orange"
            icon={<AlertTriangle size={16} />}
            title="Needs attention"
          >
            {attentionItems.length} platform condition
            {attentionItems.length === 1 ? " requires" : "s require"} follow-up.
          </Alert>
        ) : (
          <Alert
            color="green"
            icon={<ShieldCheck size={16} />}
            title="Platform posture"
          >
            No immediate tenant coverage or administrator ownership gaps were
            detected from the current platform registry.
          </Alert>
        )}

        <SimpleGrid cols={{ base: 1, xl: 2 }} spacing="md">
          <Paper p="lg" radius="lg" withBorder>
            <Group justify="space-between" mb="md">
              <Title order={3}>Tenant Coverage Snapshot</Title>
              <Badge color="green" variant="light">
                {tenants.length} tenants
              </Badge>
            </Group>
            <Table highlightOnHover verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>Tenant</Table.Th>
                  <Table.Th>Status</Table.Th>
                  <Table.Th>Admins</Table.Th>
                  <Table.Th>Signup</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {tenants.slice(0, 6).map((tenant) => {
                  const adminsAssigned = countAssignedTenantAdmins(
                    tenant,
                    tenantAdmins,
                  );

                  return (
                    <Table.Tr key={tenant.id}>
                      <Table.Td>
                        <div>
                          <Text fw={600} size="sm">
                            {tenant.name}
                          </Text>
                          <Text c="dimmed" size="xs">
                            {tenant.domain}
                          </Text>
                        </div>
                      </Table.Td>
                      <Table.Td>
                        <Badge
                          color={statusColor(tenant.subscriptionStatus)}
                          variant="light"
                        >
                          {tenant.subscriptionStatus}
                        </Badge>
                      </Table.Td>
                      <Table.Td>{adminsAssigned}</Table.Td>
                      <Table.Td>
                        {tenant.config.auth.allowSignup
                          ? "Open"
                          : "Invite only"}
                      </Table.Td>
                    </Table.Tr>
                  );
                })}
              </Table.Tbody>
            </Table>
          </Paper>

          <Paper p="lg" radius="lg" withBorder>
            <Group justify="space-between" mb="md">
              <Title order={3}>Attention Queue</Title>
              <Badge color="orange" variant="light">
                {attentionItems.length}
              </Badge>
            </Group>
            <Stack gap="sm">
              {attentionItems.length === 0 ? (
                <Text c="dimmed" size="sm">
                  No platform blockers are currently derived from tenant and
                  account registry data.
                </Text>
              ) : (
                attentionItems.map((item) => (
                  <Link
                    className="block"
                    key={`${item.label}-${item.detail}`}
                    to={
                      item.link as
                        | "/super-admin/identities"
                        | "/super-admin/tenants"
                    }
                  >
                    <Paper
                      className="transition-colors border border-stone-200 hover:border-orange-300"
                      p="sm"
                      radius="md"
                      withBorder
                    >
                      <Text fw={600} size="sm">
                        {item.label}
                      </Text>
                      <Text c="dimmed" size="xs">
                        {item.detail}
                      </Text>
                    </Paper>
                  </Link>
                ))
              )}
            </Stack>
          </Paper>
        </SimpleGrid>

        <Paper p="lg" radius="lg" withBorder>
          <Group justify="space-between" mb="md">
            <Title order={3}>Account Inventory</Title>
            <Badge color="blue" variant="light">
              {users.length} identities
            </Badge>
          </Group>
          <SimpleGrid cols={{ base: 1, md: 3 }} spacing="md">
            <InventorySummary
              label="Learners"
              meta="Tenant-bound student accounts"
              value={String(learners.length)}
            />
            <InventorySummary
              label="Active Accounts"
              meta="Accounts not marked inactive"
              value={String(
                users.filter((entry) => entry.isActive !== false).length,
              )}
            />
            <InventorySummary
              label="Dormant Admins"
              meta="No login in the last 30 days"
              value={String(
                [...platformAdmins, ...tenantAdmins].filter(isDormantAccount)
                  .length,
              )}
            />
          </SimpleGrid>
          <Text c="dimmed" mt="md" size="xs">
            Last platform admin sign-in: {latestLastSeen(platformAdmins)}
          </Text>
        </Paper>

        <Paper p="lg" radius="lg" withBorder>
          <Group justify="space-between" mb="md">
            <Group gap="sm">
              <ThemeIcon color="green" radius="md" size="lg" variant="light">
                <History size={18} />
              </ThemeIcon>
              <Title order={3}>Recent Platform Activity</Title>
            </Group>
            <Badge color="green" variant="light">
              {activityLogs.length} events
            </Badge>
          </Group>
          <Table highlightOnHover verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Event</Table.Th>
                <Table.Th>Tenant</Table.Th>
                <Table.Th>Actor</Table.Th>
                <Table.Th>When</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {activityLogs.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={4}>
                    <Text c="dimmed" py="lg" ta="center">
                      No recent cross-tenant activity is available.
                    </Text>
                  </Table.Td>
                </Table.Tr>
              ) : (
                activityLogs.map((entry) => (
                  <Table.Tr key={entry.id}>
                    <Table.Td>
                      <Text fw={600} size="sm">
                        {formatActivityAction(entry)}
                      </Text>
                      <Text c="dimmed" size="xs">
                        {formatActivityDetail(entry)}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      {resolveTenantName(entry.tenantId, tenants)}
                    </Table.Td>
                    <Table.Td>{resolveActorName(entry.userId, users)}</Table.Td>
                    <Table.Td>
                      <Text size="sm">
                        {formatRelativeTime(entry.timestamp)}
                      </Text>
                      <Text c="dimmed" size="xs">
                        {formatDateTime(entry.timestamp)}
                      </Text>
                    </Table.Td>
                  </Table.Tr>
                ))
              )}
            </Table.Tbody>
          </Table>
        </Paper>
      </Stack>
    </Container>
  );
}

function countAssignedTenantAdmins(tenant: Tenant, admins: User[]) {
  return admins.filter((entry) => (entry.tenantIds ?? []).includes(tenant.id))
    .length;
}

function hasAssignedTenantAdmin(tenant: Tenant, admins: User[]) {
  return countAssignedTenantAdmins(tenant, admins) > 0;
}

function isDormantAccount(user: User) {
  if (!user.lastLoginAt) return true;
  return Date.now() - user.lastLoginAt > 30 * 24 * 60 * 60 * 1000;
}

function latestLastSeen(users: User[]) {
  const latest = users
    .map((entry) => entry.lastLoginAt ?? 0)
    .sort((left, right) => right - left)[0];

  return latest ? formatRelativeTime(latest) : "No recorded sign-ins";
}

function statusColor(status: Tenant["subscriptionStatus"]) {
  switch (status) {
    case "active":
      return "green";
    case "trial":
      return "yellow";
    default:
      return "red";
  }
}

function OverviewStat({
  description,
  icon: Icon,
  label,
  tone,
  value,
}: {
  description: string;
  icon: typeof Building2;
  label: string;
  tone: "blue" | "green" | "orange" | "violet";
  value: string;
}) {
  return (
    <Paper p="lg" radius="lg" withBorder>
      <Group justify="space-between" mb="md">
        <ThemeIcon color={tone} radius="md" size="xl" variant="light">
          <Icon size={20} />
        </ThemeIcon>
      </Group>
      <Text c="dimmed" size="sm">
        {label}
      </Text>
      <Title order={2}>{value}</Title>
      <Text c="dimmed" mt="xs" size="xs">
        {description}
      </Text>
    </Paper>
  );
}

function InventorySummary({
  label,
  meta,
  value,
}: {
  label: string;
  meta: string;
  value: string;
}) {
  return (
    <Paper bg="var(--mantine-color-stone-0)" p="md" radius="md" withBorder>
      <Text c="dimmed" size="xs">
        {label}
      </Text>
      <Text fw={700} size="xl">
        {value}
      </Text>
      <Text c="dimmed" size="xs">
        {meta}
      </Text>
    </Paper>
  );
}

function formatActivityAction(entry: ActivityLog) {
  return (entry.action ?? "activity")
    .split("_")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function formatActivityDetail(entry: ActivityLog) {
  if ("courseId" in entry && entry.courseId) {
    return `Course ${entry.courseId}`;
  }

  if ("quizId" in entry && entry.quizId) {
    return `Quiz ${entry.quizId}`;
  }

  if ("method" in entry && entry.method) {
    return `Method: ${entry.method.replace(/_/g, " ")}`;
  }

  return "Platform event";
}

function resolveActorName(userId: null | string | undefined, users: User[]) {
  if (!userId) return "Unknown actor";
  return users.find((entry) => entry.uid === userId)?.displayName || userId;
}

function resolveTenantName(
  tenantId: null | string | undefined,
  tenants: Tenant[],
) {
  if (!tenantId) return "Platform-wide";
  return tenants.find((entry) => entry.id === tenantId)?.name || tenantId;
}
