import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Container,
  CopyButton,
  Group,
  Loader,
  Modal,
  Paper,
  Select,
  SimpleGrid,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import {
  useReissueTenantAdminInvitation,
  useRevokeTenantAdminInvitation,
  useTenantAdminInvitations,
  useTenants,
} from "@/services/hooks";
import { formatDateTime, formatRelativeTime } from "@/utils/date-utils";
import { History, Mail } from "lucide-react";
import type { AdminInvitationSummary } from "@/schemas/invitation";
import type { Tenant } from "@/schemas/tenant";

type InvitationStatusFilter =
  | "all"
  | "expired"
  | "pending"
  | "redeemed"
  | "revoked";

interface ReissuedLinkState {
  email: string;
  inviteLink: string;
  tenantName: string;
}

export const Route = createFileRoute("/super-admin/invitations")({
  component: InvitationHistoryPage,
});

function InvitationHistoryPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<InvitationStatusFilter>("all");
  const [reissuedLink, setReissuedLink] = useState<ReissuedLinkState | null>(
    null,
  );

  const { data: invitations = [], isLoading: invitationsLoading } =
    useTenantAdminInvitations();
  const { data: tenants = [], isLoading: tenantsLoading } = useTenants();
  const { isPending: isReissuing, mutate: reissueInvitation } =
    useReissueTenantAdminInvitation();
  const { isPending: isRevoking, mutate: revokeInvitation } =
    useRevokeTenantAdminInvitation();

  const tenantMap = useMemo(() => buildTenantMap(tenants), [tenants]);

  const filteredInvitations = useMemo(() => {
    const needle = search.trim().toLowerCase();

    return invitations.filter((invitation) => {
      const tenantLabel = resolveTenantName(invitation.tenantId, tenantMap);
      const statusMatches = status === "all" || invitation.status === status;
      const searchMatches =
        needle.length === 0 ||
        invitation.email.toLowerCase().includes(needle) ||
        (invitation.displayName ?? "").toLowerCase().includes(needle) ||
        tenantLabel.toLowerCase().includes(needle);

      return statusMatches && searchMatches;
    });
  }, [invitations, search, status, tenantMap]);

  if (invitationsLoading || tenantsLoading) {
    return (
      <Container py="xl" size="xl">
        <Group justify="center" py="xl">
          <Loader color="green" />
        </Group>
      </Container>
    );
  }

  const pendingCount = invitations.filter(
    (entry) => entry.status === "pending",
  ).length;
  const redeemedCount = invitations.filter(
    (entry) => entry.status === "redeemed",
  ).length;
  const revokedCount = invitations.filter(
    (entry) => entry.status === "revoked",
  ).length;
  const expiredCount = invitations.filter(
    (entry) => entry.status === "expired",
  ).length;

  return (
    <Container className="py-8" size="xl">
      <Stack gap="xl">
        <div>
          <Badge color="green" variant="light">
            Invitation governance
          </Badge>
          <Title mt="sm" order={1}>
            Administrator Invitations
          </Title>
          <Text c="dimmed" maw={760} mt="sm">
            Review tenant administrator invitations across the platform, track
            whether they were redeemed, revoked, or allowed to expire, and
            reissue fresh links when onboarding stalls.
          </Text>
        </div>

        <SimpleGrid cols={{ base: 1, md: 2, xl: 4 }} spacing="md">
          <InvitationStat label="Pending" value={String(pendingCount)} />
          <InvitationStat label="Redeemed" value={String(redeemedCount)} />
          <InvitationStat label="Revoked" value={String(revokedCount)} />
          <InvitationStat label="Expired" value={String(expiredCount)} />
        </SimpleGrid>

        <Alert color="blue" icon={<History size={16} />} title="Token model">
          Invite links are one-way hashed after issuance. That means SparkTool
          can audit the invitation and enforce redemption or revocation, but it
          cannot show the original link again. Reissuing creates a fresh token
          and invalidates the previous pending link.
        </Alert>

        <Paper p="lg" radius="lg" withBorder>
          <Group justify="space-between" mb="md" wrap="wrap">
            <Title order={3}>Invitation History</Title>
            <Group>
              <TextInput
                placeholder="Search invitee or tenant"
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
              />
              <Select
                allowDeselect={false}
                data={[
                  { label: "All statuses", value: "all" },
                  { label: "Pending", value: "pending" },
                  { label: "Redeemed", value: "redeemed" },
                  { label: "Revoked", value: "revoked" },
                  { label: "Expired", value: "expired" },
                ]}
                value={status}
                onChange={(value) =>
                  setStatus((value as InvitationStatusFilter) || "all")
                }
              />
            </Group>
          </Group>

          <Table highlightOnHover verticalSpacing="sm">
            <Table.Thead className="border-b bg-stone-50 border-stone-200">
              <Table.Tr>
                <Table.Th className="text-xs font-semibold tracking-wide text-stone-500">
                  Invitee
                </Table.Th>
                <Table.Th className="text-xs font-semibold tracking-wide text-stone-500">
                  Tenant
                </Table.Th>
                <Table.Th className="text-xs font-semibold tracking-wide text-stone-500">
                  Status
                </Table.Th>
                <Table.Th className="text-xs font-semibold tracking-wide text-stone-500">
                  Issued
                </Table.Th>
                <Table.Th className="text-xs font-semibold tracking-wide text-stone-500">
                  Outcome
                </Table.Th>
                <Table.Th className="text-xs font-semibold tracking-wide text-right text-stone-500">
                  Actions
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody className="text-sm">
              {filteredInvitations.map((invitation) => {
                const tenantName = resolveTenantName(
                  invitation.tenantId,
                  tenantMap,
                );
                const isPending = invitation.status === "pending";
                const isReissuable =
                  invitation.status === "pending" ||
                  invitation.status === "revoked" ||
                  invitation.status === "expired";

                return (
                  <Table.Tr
                    key={invitation.id}
                    className="transition-colors border-b border-stone-100 hover:bg-stone-50"
                  >
                    <Table.Td>
                      <Text fw={600} size="sm">
                        {invitation.displayName || invitation.email}
                      </Text>
                      <Text c="dimmed" size="xs">
                        {invitation.email}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">{tenantName}</Text>
                      <Text c="dimmed" size="xs">
                        {invitation.tenantId}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <Badge
                        color={statusColor(invitation.status)}
                        variant="light"
                        className="font-medium capitalize"
                      >
                        {invitation.status}
                      </Badge>
                    </Table.Td>
                    <Table.Td>
                      <Text size="sm">
                        {formatRelativeTime(invitation.createdAt)}
                      </Text>
                      <Text c="dimmed" size="xs">
                        {formatDateTime(invitation.createdAt)}
                      </Text>
                    </Table.Td>
                    <Table.Td>
                      <OutcomeCell invitation={invitation} />
                    </Table.Td>
                    <Table.Td>
                      <Group justify="flex-end" gap="xs">
                        {isReissuable ? (
                          <Button
                            variant="subtle"
                            color="green"
                            size="xs"
                            className="text-[#006838] hover:bg-[#006838]/10"
                            loading={isReissuing}
                            onClick={() => {
                              reissueInvitation(
                                {
                                  invitationId: invitation.id,
                                  tenantId: invitation.tenantId,
                                },
                                {
                                  onSuccess: (result) => {
                                    setReissuedLink({
                                      email: result.invitation.email,
                                      inviteLink: `${window.location.origin}/${invitation.tenantId}/login?invite=${result.invitationToken}`,
                                      tenantName,
                                    });
                                  },
                                },
                              );
                            }}
                          >
                            Reissue
                          </Button>
                        ) : null}
                        {isPending ? (
                          <Button
                            variant="subtle"
                            color="red"
                            size="xs"
                            className="text-red-600 hover:bg-red-50"
                            loading={isRevoking}
                            onClick={() => {
                              revokeInvitation({
                                invitationId: invitation.id,
                                tenantId: invitation.tenantId,
                              });
                            }}
                          >
                            Revoke
                          </Button>
                        ) : null}
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                );
              })}
              {filteredInvitations.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={6}>
                    <Text c="dimmed" py="xl" ta="center">
                      No administrator invitations matched the current filter.
                    </Text>
                  </Table.Td>
                </Table.Tr>
              ) : null}
            </Table.Tbody>
          </Table>
        </Paper>

        <Modal
          opened={reissuedLink !== null}
          onClose={() => setReissuedLink(null)}
          title="Fresh Invitation Ready"
          centered
        >
          <Stack gap="md">
            <Text c="dimmed" size="sm">
              A new invite has been issued for {reissuedLink?.email} in{" "}
              {reissuedLink?.tenantName}. Share the link below. The old pending
              link is no longer the active onboarding path.
            </Text>
            <TextInput
              label="Administrator invite link"
              readOnly
              value={reissuedLink?.inviteLink ?? ""}
            />
            <CopyButton value={reissuedLink?.inviteLink ?? ""}>
              {({ copied, copy }) => (
                <Button
                  color="green"
                  leftSection={<Mail size={16} />}
                  onClick={copy}
                >
                  {copied ? "Invite link copied" : "Copy invite link"}
                </Button>
              )}
            </CopyButton>
          </Stack>
        </Modal>
      </Stack>
    </Container>
  );
}

function buildTenantMap(tenants: Tenant[]) {
  return tenants.reduce<Record<string, Tenant>>((accumulator, tenant) => {
    accumulator[tenant.id] = tenant;
    return accumulator;
  }, {});
}

function resolveTenantName(
  tenantId: string,
  tenantMap: Record<string, Tenant>,
) {
  return tenantMap[tenantId]?.name || tenantId;
}

function statusColor(status: AdminInvitationSummary["status"]) {
  switch (status) {
    case "pending":
      return "green";
    case "redeemed":
      return "blue";
    case "revoked":
      return "red";
    default:
      return "yellow";
  }
}

function OutcomeCell({ invitation }: { invitation: AdminInvitationSummary }) {
  if (invitation.status === "redeemed") {
    return (
      <>
        <Text size="sm">
          Redeemed {formatRelativeTime(invitation.redeemedAt)}
        </Text>
        <Text c="dimmed" size="xs">
          {formatDateTime(invitation.redeemedAt)}
        </Text>
      </>
    );
  }

  if (invitation.status === "revoked") {
    return (
      <>
        <Text size="sm">
          Revoked {formatRelativeTime(invitation.revokedAt)}
        </Text>
        <Text c="dimmed" size="xs">
          {formatDateTime(invitation.revokedAt)}
        </Text>
      </>
    );
  }

  if (invitation.status === "expired") {
    return (
      <>
        <Text size="sm">
          Expired {formatRelativeTime(invitation.expiresAt)}
        </Text>
        <Text c="dimmed" size="xs">
          {formatDateTime(invitation.expiresAt)}
        </Text>
      </>
    );
  }

  return (
    <>
      <Text size="sm">Expires {formatRelativeTime(invitation.expiresAt)}</Text>
      <Text c="dimmed" size="xs">
        {formatDateTime(invitation.expiresAt)}
      </Text>
    </>
  );
}

function InvitationStat({ label, value }: { label: string; value: string }) {
  return (
    <Paper p="lg" radius="lg" withBorder>
      <Text c="dimmed" size="sm">
        {label}
      </Text>
      <Title order={2}>{value}</Title>
    </Paper>
  );
}
