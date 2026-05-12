import { createFileRoute } from "@tanstack/react-router";
import { useAuthContext } from "@/providers/auth-provider";
import { changePasswordSchema, type ChangePasswordFormData } from "@/schemas";
import {
  Alert,
  Button,
  Container,
  Grid,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import {
  IconAlertCircle,
  IconCheck,
  IconDeviceDesktop,
  IconShieldCheck,
} from "@tabler/icons-react";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useChangePassword } from "@/services/hooks";

export const Route = createFileRoute("/$tenant/admin/security")({
  component: AdminSecurity,
});

function AdminSecurity() {
  const { sessionStartTime, user } = useAuthContext();
  const changePasswordMutation = useChangePassword();
  const passwordForm = useForm<ChangePasswordFormData>({
    initialValues: {
      confirmPassword: "",
      currentPassword: "",
      newPassword: "",
    },
    validate: zod4Resolver(changePasswordSchema),
  });

  const handlePasswordChange = async (values: ChangePasswordFormData) => {
    await changePasswordMutation.mutateAsync(values, {
      onError: (error) => {
        notifications.show({
          color: "red",
          icon: <IconAlertCircle size={16} />,
          message: error.message || "Failed to update password.",
          title: "Password Update Failed",
        });
      },
      onSuccess: () => {
        notifications.show({
          color: "green",
          icon: <IconCheck size={16} />,
          message: "Your password has been updated successfully.",
          title: "Password Updated",
        });
        passwordForm.reset();
      },
    });
  };

  const sessionStartedLabel = sessionStartTime
    ? new Date(sessionStartTime).toLocaleString()
    : "Current session";

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={2}>Sign-in and security</Title>
          <Text c="dimmed">
            Update your password and review sign-in details
          </Text>
        </div>

        <Grid>
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Stack gap="lg">
              <Paper
                component="form"
                onSubmit={passwordForm.onSubmit(handlePasswordChange)}
                p="xl"
                radius="md"
                withBorder
              >
                <Stack gap="md">
                  <Group gap="sm">
                    <IconShieldCheck size={24} className="text-fun-green-600" />
                    <Title order={4}>Change Password</Title>
                  </Group>
                  <Stack gap="sm">
                    <PasswordInput
                      key={passwordForm.key("currentPassword")}
                      label="Current Password"
                      placeholder="Enter current password"
                      {...passwordForm.getInputProps("currentPassword")}
                    />
                    <PasswordInput
                      key={passwordForm.key("newPassword")}
                      label="New Password"
                      placeholder="Enter new password"
                      {...passwordForm.getInputProps("newPassword")}
                    />
                    <PasswordInput
                      key={passwordForm.key("confirmPassword")}
                      label="Confirm New Password"
                      placeholder="Confirm new password"
                      {...passwordForm.getInputProps("confirmPassword")}
                    />
                  </Stack>
                  <Group justify="flex-end" mt="md">
                    <Button
                      loading={changePasswordMutation.isPending}
                      type="submit"
                    >
                      Update Password
                    </Button>
                  </Group>
                </Stack>
              </Paper>

              <Paper p="xl" radius="md" withBorder>
                <Stack gap="md">
                  <Title order={4}>Extra sign-in protection</Title>
                  <Alert color="blue" title="Extra protection">
                    Add another confirmation step to help protect your account.
                  </Alert>
                  <Group justify="space-between" align="center">
                    <div>
                      <Text fw={500}>Extra sign-in protection</Text>
                      <Text size="sm" c="dimmed">
                        Contact your platform admin if you want help turning
                        this on.
                      </Text>
                    </div>
                    <Button disabled variant="light">
                      Coming soon
                    </Button>
                  </Group>
                </Stack>
              </Paper>
            </Stack>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper p="xl" radius="md" withBorder>
              <Title order={4} mb="md">
                Signed-in device
              </Title>
              <Stack gap="md">
                <Group>
                  <IconDeviceDesktop
                    size={32}
                    className="text-(--app-text-subtle)"
                  />
                  <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                      {user?.email || "Admin sign-in"}
                    </Text>
                    <Text size="xs" c="green">
                      Current Session
                    </Text>
                    <Text c="dimmed" size="xs">
                      Started: {sessionStartedLabel}
                    </Text>
                  </div>
                </Group>
                <Alert color="blue" title="Current sign-in">
                  This shows the device you are using now. Contact support if
                  you need help with other sign-ins.
                </Alert>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
}
