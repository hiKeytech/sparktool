import { createFileRoute } from "@tanstack/react-router";
import { Button, Container, Divider, Group, Paper, Stack, Switch, Text, Title } from "@mantine/core";
import { IconBell, IconGlobe, IconLock, IconMoon, IconPalette } from "@tabler/icons-react";

export const Route = createFileRoute("/$tenant/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={2}>System Settings</Title>
          <Text c="dimmed">Manage platform-wide configurations and preferences</Text>
        </div>

        <Stack gap="md">
          <Paper p="md" withBorder radius="md">
            <Group justify="space-between" mb="md">
              <Group gap="sm">
                <IconPalette size={20} className="text-blue-500" />
                <div>
                  <Text fw={500}>Appearance</Text>
                  <Text size="sm" c="dimmed">Customize the look and feel of the dashboard</Text>
                </div>
              </Group>
            </Group>
            <Stack gap="md">
              <Group justify="space-between">
                <Text size="sm">Dark Mode</Text>
                <Switch size="md" onLabel={<IconMoon size={14} />} offLabel={<IconGlobe size={14} />} />
              </Group>
              <Divider />
              <Group justify="space-between">
                <Text size="sm">Compact View</Text>
                <Switch size="md" />
              </Group>
            </Stack>
          </Paper>

          <Paper p="md" withBorder radius="md">
            <Group justify="space-between" mb="md">
              <Group gap="sm">
                <IconBell size={20} className="text-orange-500" />
                <div>
                  <Text fw={500}>Notifications</Text>
                  <Text size="sm" c="dimmed">Configure system alerts and email notifications</Text>
                </div>
              </Group>
            </Group>
            <Stack gap="md">
              <Group justify="space-between">
                <Text size="sm">Email Notifications</Text>
                <Switch defaultChecked size="md" />
              </Group>
              <Divider />
              <Group justify="space-between">
                <Text size="sm">Push Notifications</Text>
                <Switch defaultChecked size="md" />
              </Group>
            </Stack>
          </Paper>

          <Paper p="md" withBorder radius="md">
            <Group justify="space-between" mb="md">
              <Group gap="sm">
                <IconLock size={20} className="text-red-500" />
                <div>
                  <Text fw={500}>Access Control</Text>
                  <Text size="sm" c="dimmed">Manage roles and permissions</Text>
                </div>
              </Group>
              <Button variant="light" size="xs">Manage Roles</Button>
            </Group>
            <Text size="sm" c="dimmed">
              Current system has 3 defined roles: Admin, Instructor, and Student.
            </Text>
          </Paper>
        </Stack>

        <Group justify="flex-end">
            <Button variant="default">Cancel</Button>
            <Button>Save Changes</Button>
        </Group>
      </Stack>
    </Container>
  );
}
