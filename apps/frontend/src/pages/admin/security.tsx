import { Alert, Button, Container, Group, Paper, PasswordInput, Stack, Text, Title } from "@mantine/core";
import { IconDeviceDesktop, IconShieldCheck } from "@tabler/icons-react";

export function AdminSecurity() {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={2}>Security Settings</Title>
          <Text c="dimmed">Manage password and security preferences</Text>
        </div>

        <Grid>
            <Grid.Col span={{ base: 12, md: 8 }}>
                <Stack gap="lg">
                    <Paper p="xl" radius="md" withBorder>
                        <Stack gap="md">
                            <Group gap="sm">
                                <IconShieldCheck size={24} className="text-fun-green-600" />
                                <Title order={4}>Change Password</Title>
                            </Group>
                            <Stack gap="sm">
                                <PasswordInput label="Current Password" placeholder="Enter current password" />
                                <PasswordInput label="New Password" placeholder="Enter new password" />
                                <PasswordInput label="Confirm New Password" placeholder="Confirm new password" />
                            </Stack>
                            <Group justify="flex-end" mt="md">
                                <Button>Update Password</Button>
                            </Group>
                        </Stack>
                    </Paper>

                    <Paper p="xl" radius="md" withBorder>
                        <Stack gap="md">
                            <Title order={4}>Two-Factor Authentication</Title>
                            <Alert color="blue" title="Enhanced Security">
                                Two-factor authentication adds an extra layer of security to your account.
                            </Alert>
                             <Group justify="space-between" align="center">
                                <div>
                                    <Text fw={500}>Two-Factor Authentication (2FA)</Text>
                                    <Text size="sm" c="dimmed">Currently disabled</Text>
                                </div>
                                <Button variant="light">Enable 2FA</Button>
                            </Group>
                        </Stack>
                    </Paper>
                </Stack>
            </Grid.Col>

            <Grid.Col span={{ base: 12, md: 4 }}>
                <Paper p="xl" radius="md" withBorder>
                    <Title order={4} mb="md">Active Sessions</Title>
                    <Stack gap="md">
                        <Group>
                            <IconDeviceDesktop size={32} className="text-gray-400" />
                            <div style={{ flex: 1 }}>
                                <Text size="sm" fw={500}>MacBook Pro</Text>
                                <Text size="xs" c="green">Current Session</Text>
                            </div>
                        </Group>
                        <Divider />
                         <Group>
                            <IconDeviceDesktop size={32} className="text-gray-400" />
                            <div style={{ flex: 1 }}>
                                <Text size="sm" fw={500}>Windows PC</Text>
                                <Text size="xs" c="dimmed">Last active: 2 days ago</Text>
                            </div>
                            <Button size="xs" variant="subtle" color="red">Revoke</Button>
                        </Group>
                    </Stack>
                </Paper>
            </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
}

// Helper Grid component since it was missing in imports
import { Grid, Divider } from "@mantine/core";
