import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Container,
  Group,
  Loader,
  Modal,
  Paper,
  PasswordInput,
  Select,
  SimpleGrid,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useResolvedAuthState } from "@/providers/auth-provider";
import {
  useCreateUser,
  useDeleteUser,
  useTenants,
  useUpdateUser,
  useUsers,
} from "@/services/hooks";
import { formatDate, formatRelativeTime } from "@/utils/date-utils";
import { ShieldCheck, UserPlus } from "lucide-react";
import type { Tenant } from "@/schemas/tenant";
import type { User } from "@/schemas/user";

interface AddAdminForm {
  department: string;
  displayName: string;
  email: string;
  password: string;
  roleType: "Super Admin" | "Tenant Admin";
  tenantId: string;
}

const defaultAddForm: AddAdminForm = {
  department: "",
  displayName: "",
  email: "",
  password: "",
  roleType: "Tenant Admin",
  tenantId: "",
};

interface EditAdminForm {
  department: string;
  displayName: string;
  isActive: boolean;
  location: string;
  uid: string;
}

export const Route = createFileRoute("/super-admin/identities")({
  component: IdentitiesOverview,
});

function IdentitiesOverview() {
  const { user } = useResolvedAuthState();
  const [roleFilter, setRoleFilter] = useState<"all" | "super-admin" | "admin">(
    "all",
  );
  const [search, setSearch] = useState("");
  const [selectedAdmin, setSelectedAdmin] = useState<EditAdminForm | null>(
    null,
  );
  const [addOpen, setAddOpen] = useState(false);
  const [addForm, setAddForm] = useState<AddAdminForm>(defaultAddForm);

  const { data: tenants = [] } = useTenants();
  const { data: users = [], isLoading, refetch } = useUsers(null);
  const { isPending: isCreating, mutate: createUser } = useCreateUser();
  const { isPending: isRemoving, mutate: removeUser } = useDeleteUser();
  const { isPending: isUpdating, mutate: updateUser } = useUpdateUser();

  if (isLoading) {
    return (
      <Container py="xl" size="xl">
        <Group justify="center" py="xl">
          <Loader color="green" />
        </Group>
      </Container>
    );
  }

  const administrators = users.filter(
    (entry) => entry.role === "admin" || entry.role === "super-admin",
  );
  const filteredAdministrators = administrators.filter((entry) => {
    const roleMatches = roleFilter === "all" || entry.role === roleFilter;
    const searchNeedle = search.trim().toLowerCase();
    const tenantLabel = resolveTenantLabel(entry, tenants).toLowerCase();
    const searchMatches =
      searchNeedle.length === 0 ||
      entry.displayName.toLowerCase().includes(searchNeedle) ||
      entry.email.toLowerCase().includes(searchNeedle) ||
      tenantLabel.includes(searchNeedle);

    return roleMatches && searchMatches;
  });
  const superAdmins = administrators.filter(
    (entry) => entry.role === "super-admin",
  );
  const tenantAdmins = administrators.filter((entry) => entry.role === "admin");
  const dormantAdmins = administrators.filter(isDormantAccount);

  function handleCreateAdministrator() {
    createUser(
      {
        department: addForm.department || null,
        displayName: addForm.displayName,
        email: addForm.email,
        password: addForm.password,
        role: addForm.roleType === "Super Admin" ? "super-admin" : "admin",
        tenantId:
          addForm.roleType === "Super Admin" ? null : addForm.tenantId || null,
      },
      {
        onSuccess: async () => {
          setAddOpen(false);
          setAddForm(defaultAddForm);
          await refetch();
        },
      },
    );
  }

  function handleSaveAdministrator() {
    if (!selectedAdmin) return;

    updateUser(
      {
        userData: {
          department: selectedAdmin.department || null,
          displayName: selectedAdmin.displayName,
          isActive: selectedAdmin.isActive,
          location: selectedAdmin.location || null,
        },
        userId: selectedAdmin.uid,
      },
      {
        onSuccess: async () => {
          setSelectedAdmin(null);
          await refetch();
        },
      },
    );
  }

  return (
    <Container className="py-8" size="xl">
      <Stack gap="xl">
        <Group align="flex-start" justify="space-between">
          <div>
            <Badge color="green" variant="light">
              Platform identity management
            </Badge>
            <Title mt="sm" order={1}>
              Administrators
            </Title>
            <Text c="dimmed" maw={760} mt="sm">
              Platform administrators operate SparkTool globally. Tenant
              administrators operate a specific tenant. This page manages both
              groups from the same platform registry.
            </Text>
          </div>
          <Button
            className="bg-[#006838] text-white hover:bg-[#006838]/90"
            leftSection={<UserPlus size={16} />}
            onClick={() => setAddOpen(true)}
          >
            Add Administrator
          </Button>
        </Group>

        <SimpleGrid cols={{ base: 1, md: 2, xl: 4 }} spacing="md">
          <IdentityStat
            label="All Administrators"
            value={String(administrators.length)}
          />
          <IdentityStat
            label="Platform Admins"
            value={String(superAdmins.length)}
          />
          <IdentityStat
            label="Tenant Admins"
            value={String(tenantAdmins.length)}
          />
          <IdentityStat
            label="Dormant Admins"
            value={String(dormantAdmins.length)}
          />
        </SimpleGrid>

        <Alert
          color="blue"
          icon={<ShieldCheck size={16} />}
          title="Scope model"
        >
          Super admins are platform-wide and are not bound to a tenant. Tenant
          admins should always be assigned to a tenant so ownership is explicit.
        </Alert>

        <Paper p="lg" radius="lg" withBorder>
          <Group justify="space-between" mb="md" wrap="wrap">
            <Title order={3}>Administrator Directory</Title>
            <Group>
              <TextInput
                onChange={(event) => setSearch(event.currentTarget.value)}
                placeholder="Search by name, email, or tenant"
                value={search}
              />
              <Select
                allowDeselect={false}
                data={[
                  { label: "All roles", value: "all" },
                  { label: "Platform admins", value: "super-admin" },
                  { label: "Tenant admins", value: "admin" },
                ]}
                onChange={(value) =>
                  setRoleFilter(
                    (value as "admin" | "all" | "super-admin") || "all",
                  )
                }
                value={roleFilter}
              />
            </Group>
          </Group>

          <Table highlightOnHover verticalSpacing="sm">
            <Table.Thead className="bg-stone-50 border-b border-stone-200">
              <Table.Tr>
                <Table.Th className="text-stone-500 font-semibold text-xs tracking-wide">
                  Administrator
                </Table.Th>
                <Table.Th className="text-stone-500 font-semibold text-xs tracking-wide">
                  Scope
                </Table.Th>
                <Table.Th className="text-stone-500 font-semibold text-xs tracking-wide">
                  Status
                </Table.Th>
                <Table.Th className="text-stone-500 font-semibold text-xs tracking-wide">
                  Last Sign-in
                </Table.Th>
                <Table.Th className="text-stone-500 font-semibold text-xs tracking-wide text-right">
                  Actions
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody className="text-sm">
              {filteredAdministrators.map((entry) => (
                <Table.Tr
                  key={entry.uid}
                  className="border-b border-stone-100 hover:bg-stone-50 transition-colors"
                >
                  <Table.Td>
                    <div>
                      <Text fw={600} size="sm">
                        {entry.displayName}
                      </Text>
                      <Text c="dimmed" size="xs">
                        {entry.email}
                      </Text>
                    </div>
                  </Table.Td>
                  <Table.Td>
                    {entry.role === "super-admin" ? (
                      <Badge
                        color="blue"
                        variant="light"
                        className="font-medium tracking-wide"
                      >
                        Platform-wide
                      </Badge>
                    ) : (
                      <Badge
                        color="green"
                        variant="light"
                        className="font-medium tracking-wide"
                      >
                        {resolveTenantLabel(entry, tenants)}
                      </Badge>
                    )}
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      color={entry.isActive === false ? "red" : "green"}
                      variant="light"
                      className="font-medium"
                    >
                      {entry.isActive === false ? "Inactive" : "Active"}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Text size="sm">
                      {entry.lastLoginAt
                        ? formatRelativeTime(entry.lastLoginAt)
                        : "No sign-in yet"}
                    </Text>
                    {entry.lastLoginAt ? (
                      <Text c="dimmed" size="xs">
                        {formatDate(entry.lastLoginAt, "MMM D, YYYY")}
                      </Text>
                    ) : null}
                  </Table.Td>
                  <Table.Td>
                    <Group justify="flex-end" gap="xs">
                      <Button
                        variant="subtle"
                        color="gray"
                        size="xs"
                        className="text-stone-600 hover:bg-stone-100"
                        onClick={() =>
                          setSelectedAdmin({
                            department: entry.department || "",
                            displayName: entry.displayName,
                            isActive: entry.isActive !== false,
                            location: entry.location || "",
                            uid: entry.uid,
                          })
                        }
                      >
                        Edit
                      </Button>
                      <Button
                        disabled={entry.uid === user?.uid}
                        loading={isRemoving}
                        variant="subtle"
                        color="red"
                        size="xs"
                        className="text-red-600 hover:bg-red-50"
                        onClick={() =>
                          removeUser(entry.uid, {
                            onSuccess: async () => {
                              await refetch();
                            },
                          })
                        }
                      >
                        Remove Access
                      </Button>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
              {filteredAdministrators.length === 0 ? (
                <Table.Tr>
                  <Table.Td colSpan={5}>
                    <Text c="dimmed" py="xl" ta="center">
                      No administrator accounts matched the current filter.
                    </Text>
                  </Table.Td>
                </Table.Tr>
              ) : null}
            </Table.Tbody>
          </Table>
        </Paper>
      </Stack>

      <Modal
        opened={selectedAdmin !== null}
        onClose={() => setSelectedAdmin(null)}
        title="Edit Administrator"
        centered
      >
        <Stack gap="md">
          <TextInput
            label="Display Name"
            value={selectedAdmin?.displayName ?? ""}
            onChange={(event) => {
              if (!selectedAdmin) return;
              setSelectedAdmin({
                ...selectedAdmin,
                displayName: event.currentTarget.value,
              });
            }}
          />
          <TextInput
            label="Department"
            value={selectedAdmin?.department ?? ""}
            onChange={(event) => {
              if (!selectedAdmin) return;
              setSelectedAdmin({
                ...selectedAdmin,
                department: event.currentTarget.value,
              });
            }}
          />
          <TextInput
            label="Location"
            value={selectedAdmin?.location ?? ""}
            onChange={(event) => {
              if (!selectedAdmin) return;
              setSelectedAdmin({
                ...selectedAdmin,
                location: event.currentTarget.value,
              });
            }}
          />
          <Select
            label="Account Status"
            data={[
              { label: "Active", value: "active" },
              { label: "Inactive", value: "inactive" },
            ]}
            value={selectedAdmin?.isActive ? "active" : "inactive"}
            onChange={(value) => {
              if (!selectedAdmin || !value) return;
              setSelectedAdmin({
                ...selectedAdmin,
                isActive: value === "active",
              });
            }}
          />
          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={() => setSelectedAdmin(null)}>
              Cancel
            </Button>
            <Button
              color="green"
              loading={isUpdating}
              onClick={handleSaveAdministrator}
            >
              Save Changes
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Modal
        opened={addOpen}
        onClose={() => {
          setAddOpen(false);
          setAddForm(defaultAddForm);
        }}
        title="Add Administrator"
        centered
      >
        <Stack gap="md">
          <TextInput
            label="Display Name"
            placeholder="e.g. Ada Nwosu"
            required
            value={addForm.displayName}
            onChange={(e) =>
              setAddForm((prev) => ({
                ...prev,
                displayName: e.currentTarget.value,
              }))
            }
          />
          <TextInput
            label="Email Address"
            placeholder="e.g. platform.ops@sparktool.local"
            required
            value={addForm.email}
            onChange={(e) =>
              setAddForm((prev) => ({ ...prev, email: e.currentTarget.value }))
            }
          />
          <PasswordInput
            label="Temporary Password"
            placeholder="At least 8 characters"
            required
            value={addForm.password}
            onChange={(e) =>
              setAddForm((prev) => ({
                ...prev,
                password: e.currentTarget.value,
              }))
            }
          />
          <TextInput
            label="Department"
            placeholder="Platform Operations"
            value={addForm.department}
            onChange={(e) =>
              setAddForm((prev) => ({
                ...prev,
                department: e.currentTarget.value,
              }))
            }
          />
          <Select
            label="Role Type"
            data={[
              { label: "Tenant Admin", value: "Tenant Admin" },
              { label: "Super Admin", value: "Super Admin" },
            ]}
            value={addForm.roleType}
            onChange={(value) =>
              setAddForm((prev) => ({
                ...prev,
                roleType: (value ?? "Tenant Admin") as AddAdminForm["roleType"],
                tenantId: value === "Super Admin" ? "" : prev.tenantId,
              }))
            }
          />
          {addForm.roleType === "Tenant Admin" && (
            <Select
              label="Assign to Tenant"
              placeholder="Select a tenant"
              required
              data={tenants.map((t) => ({
                label: t.name,
                value: t.id,
              }))}
              value={addForm.tenantId || null}
              onChange={(value) =>
                setAddForm((prev) => ({ ...prev, tenantId: value ?? "" }))
              }
            />
          )}
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
                !addForm.displayName ||
                !addForm.email ||
                addForm.password.length < 8 ||
                (addForm.roleType === "Tenant Admin" && !addForm.tenantId)
              }
              onClick={handleCreateAdministrator}
            >
              Add Administrator
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
}

function isDormantAccount(user: User) {
  if (!user.lastLoginAt) return true;
  return Date.now() - user.lastLoginAt > 30 * 24 * 60 * 60 * 1000;
}

function resolveTenantLabel(user: User, tenants: Tenant[]) {
  if (user.role === "super-admin") {
    return "Platform-wide";
  }

  const tenantNames = tenants
    .filter((tenant) => (user.tenantIds ?? []).includes(tenant.id))
    .map((tenant) => tenant.name);

  return tenantNames.length > 0 ? tenantNames.join(", ") : "Unassigned";
}

function IdentityStat({ label, value }: { label: string; value: string }) {
  return (
    <Paper p="lg" radius="lg" withBorder>
      <Text c="dimmed" size="sm">
        {label}
      </Text>
      <Title order={2}>{value}</Title>
    </Paper>
  );
}
