import { createFileRoute } from "@tanstack/react-router";
import {
  Alert,
  Badge,
  Container,
  Group,
  Loader,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useTenants, useUsers } from "@/services/hooks";
import { formatRelativeTime } from "@/utils/date-utils";
import { Activity, ShieldCheck } from "lucide-react";
import type { Tenant } from "@/schemas/tenant";
import type { User } from "@/schemas/user";

export const Route = createFileRoute("/super-admin/telemetry")({
  component: TelemetryOverview,
});

function TelemetryOverview() {
  const { data: tenants = [], isLoading: tenantsLoading } = useTenants();
  const { data: users = [], isLoading: usersLoading } = useUsers(null);

  if (tenantsLoading || usersLoading) {
    return (
      <Container py="xl" size="xl">
        <Group justify="center" py="xl">
          <Loader color="green" />
        </Group>
      </Container>
    );
  }

  const activeUsers = users.filter((entry) => entry.isActive !== false);
  const dormantAdmins = users.filter(
    (entry) =>
      (entry.role === "admin" || entry.role === "super-admin") &&
      isDormant(entry),
  );
  const activeTenants = tenants.filter(
    (tenant) => tenant.subscriptionStatus === "active",
  );
  const coveredActiveTenants = activeTenants.filter((tenant) =>
    users.some(
      (entry) =>
        entry.role === "admin" && (entry.tenantIds ?? []).includes(tenant.id),
    ),
  );
  const coverageRate = activeTenants.length
    ? Math.round((coveredActiveTenants.length / activeTenants.length) * 100)
    : 0;

  return (
    <Container className="py-8" size="xl">
      <Stack gap="xl">
        <div>
          <Badge color="green" variant="light">
            Derived platform signals
          </Badge>
          <Title mt="sm" order={1}>
            Operational Signals
          </Title>
          <Text c="dimmed" maw={760} mt="sm">
            SparkTool does not yet expose a dedicated platform telemetry API.
            This page therefore reports operational signals derived from the
            real tenant registry and global identity store instead of pretending
            to have CPU, storage, or request-rate data.
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, md: 2, xl: 4 }} spacing="md">
          <SignalStat
            label="Active Identities"
            value={String(activeUsers.length)}
          />
          <SignalStat
            label="Dormant Admins"
            value={String(dormantAdmins.length)}
          />
          <SignalStat
            label="Active Tenants"
            value={String(activeTenants.length)}
          />
          <SignalStat label="Coverage" value={`${coverageRate}%`} />
        </SimpleGrid>

        <Alert color="blue" icon={<Activity size={16} />} title="Signal source">
          These figures are computed from real tenants and user accounts. They
          should be treated as governance and coverage signals, not
          infrastructure telemetry.
        </Alert>

        <SimpleGrid cols={{ base: 1, xl: 2 }} spacing="md">
          <Paper p="lg" radius="lg" withBorder>
            <Group justify="space-between" mb="md">
              <Title order={3}>Tenant Distribution</Title>
              <Badge color="green" variant="light">
                {tenants.length} tenants
              </Badge>
            </Group>
            <Stack gap="md">
              <DistributionRow
                color="green"
                count={
                  tenants.filter(
                    (tenant) => tenant.subscriptionStatus === "active",
                  ).length
                }
                label="Active"
                total={tenants.length}
              />
              <DistributionRow
                color="yellow"
                count={
                  tenants.filter(
                    (tenant) => tenant.subscriptionStatus === "trial",
                  ).length
                }
                label="Trial"
                total={tenants.length}
              />
              <DistributionRow
                color="red"
                count={
                  tenants.filter(
                    (tenant) => tenant.subscriptionStatus === "inactive",
                  ).length
                }
                label="Inactive"
                total={tenants.length}
              />
            </Stack>
          </Paper>

          <Paper p="lg" radius="lg" withBorder>
            <Group justify="space-between" mb="md">
              <Title order={3}>Identity Mix</Title>
              <Badge color="blue" variant="light">
                {users.length} total
              </Badge>
            </Group>
            <Stack gap="md">
              <DistributionRow
                color="blue"
                count={
                  users.filter((entry) => entry.role === "super-admin").length
                }
                label="Platform admins"
                total={users.length}
              />
              <DistributionRow
                color="green"
                count={users.filter((entry) => entry.role === "admin").length}
                label="Tenant admins"
                total={users.length}
              />
              <DistributionRow
                color="gray"
                count={users.filter((entry) => entry.role === "student").length}
                label="Learners"
                total={users.length}
              />
            </Stack>
          </Paper>
        </SimpleGrid>

        <Paper p="lg" radius="lg" withBorder>
          <Group justify="space-between" mb="md">
            <Title order={3}>Tenant Operations Board</Title>
            <Badge
              color={coverageRate === 100 ? "green" : "orange"}
              variant="light"
            >
              {coverageRate}% covered
            </Badge>
          </Group>
          <Table highlightOnHover verticalSpacing="sm">
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Tenant</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Admins</Table.Th>
                <Table.Th>Learners</Table.Th>
                <Table.Th>Most Recent Admin Sign-in</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {tenants.map((tenant) => {
                const admins = users.filter(
                  (entry) =>
                    entry.role === "admin" &&
                    (entry.tenantIds ?? []).includes(tenant.id),
                );
                const learnersForTenant = users.filter(
                  (entry) =>
                    entry.role === "student" &&
                    (entry.tenantIds ?? []).includes(tenant.id),
                );
                const latestAdminLogin = admins
                  .map((entry) => entry.lastLoginAt ?? 0)
                  .sort((left, right) => right - left)[0];

                return (
                  <Table.Tr key={tenant.id}>
                    <Table.Td>
                      <Text fw={600} size="sm">
                        {tenant.name}
                      </Text>
                      <Text c="dimmed" size="xs">
                        {tenant.domain}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        color={statusColor(tenant.subscriptionStatus)}
                        variant="light"
                      >
                        {tenant.subscriptionStatus}
                      </Badge>
                    </Table.Td>
                    <Table.Td>{admins.length}</Table.Td>
                    <Table.Td>{learnersForTenant.length}</Table.Td>
                    <Table.Td>
                      {latestAdminLogin
                        ? formatRelativeTime(latestAdminLogin)
                        : "No admin sign-in"}
                    </Table.Td>
                  </Table.Tr>
                );
              })}
            </Table.Tbody>
          </Table>
        </Paper>

        {dormantAdmins.length > 0 ? (
          <Paper p="lg" radius="lg" withBorder>
            <Group justify="space-between" mb="md">
              <Title order={3}>Dormant Administrator Accounts</Title>
              <Badge color="orange" variant="light">
                {dormantAdmins.length}
              </Badge>
            </Group>
            <Stack gap="sm">
              {dormantAdmins.slice(0, 5).map((entry) => (
                <Paper
                  bg="var(--mantine-color-orange-0)"
                  key={entry.uid}
                  p="sm"
                  radius="md"
                >
                  <Text fw={600} size="sm">
                    {entry.displayName}
                  </Text>
                  <Text c="dimmed" size="xs">
                    {entry.email} ·{" "}
                    {entry.lastLoginAt
                      ? formatRelativeTime(entry.lastLoginAt)
                      : "No sign-in recorded"}
                  </Text>
                </Paper>
              ))}
            </Stack>
          </Paper>
        ) : (
          <Alert
            color="green"
            icon={<ShieldCheck size={16} />}
            title="Administrator activity"
          >
            No dormant administrator accounts were detected by the current
            inactivity threshold.
          </Alert>
        )}
      </Stack>
    </Container>
  );
}

function isDormant(user: User) {
  if (!user.lastLoginAt) return true;
  return Date.now() - user.lastLoginAt > 30 * 24 * 60 * 60 * 1000;
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

function DistributionRow({
  color,
  count,
  label,
  total,
}: {
  color: string;
  count: number;
  label: string;
  total: number;
}) {
  const value = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div>
      <Group justify="space-between" mb={6}>
        <Text size="sm">{label}</Text>
        <Text fw={600} size="sm">
          {count}
        </Text>
      </Group>
      <Progress color={color} size="lg" value={value} />
    </div>
  );
}

function SignalStat({ label, value }: { label: string; value: string }) {
  return (
    <Paper p="lg" radius="lg" withBorder>
      <Text c="dimmed" size="sm">
        {label}
      </Text>
      <Title order={2}>{value}</Title>
    </Paper>
  );
}
