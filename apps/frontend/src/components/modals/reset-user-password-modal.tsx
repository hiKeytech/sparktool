import type { User } from "@/types";

import { Button, Group, PasswordInput, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { z } from "zod";

import { useResetUserPassword } from "@/services/hooks";

const resetUserPasswordSchema = z
  .object({
    confirmPassword: z.string(),
    newPassword: z
      .string()
      .min(8, "Temporary password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetUserPasswordFormData = z.infer<typeof resetUserPasswordSchema>;

interface ResetUserPasswordModalProps {
  user: User;
}

export function openResetUserPasswordModal(user: User) {
  modals.open({
    children: <ResetUserPasswordModal user={user} />,
    size: "md",
    title: `Reset Password for ${user.displayName}`,
  });
}

function ResetUserPasswordModal({ user }: ResetUserPasswordModalProps) {
  const resetUserPassword = useResetUserPassword();

  const form = useForm<ResetUserPasswordFormData>({
    initialValues: {
      confirmPassword: "",
      newPassword: "",
    },
    validate: zod4Resolver(resetUserPasswordSchema),
  });

  const handleSubmit = (values: ResetUserPasswordFormData) => {
    resetUserPassword.mutate(
      {
        newPassword: values.newPassword,
        userId: user.uid,
      },
      {
        onError: (error) => {
          notifications.show({
            color: "red",
            icon: <IconAlertCircle size={16} />,
            message: error.message || "Failed to reset user password.",
            title: "Reset Failed",
          });
        },
        onSuccess: () => {
          notifications.show({
            color: "green",
            icon: <IconCheck size={16} />,
            message: `Temporary password updated for ${user.displayName}. Share it securely with the user.`,
            title: "Password Reset",
          });
          modals.closeAll();
        },
      },
    );
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <Text c="dimmed" size="sm">
          Set a new temporary password for {user.displayName}. The old password
          will stop working immediately.
        </Text>
        <PasswordInput
          label="Temporary Password"
          placeholder="Create a temporary password"
          required
          {...form.getInputProps("newPassword")}
        />
        <PasswordInput
          label="Confirm Temporary Password"
          placeholder="Repeat the temporary password"
          required
          {...form.getInputProps("confirmPassword")}
        />
        <Group justify="flex-end" mt="lg">
          <Button onClick={() => modals.closeAll()} variant="light">
            Cancel
          </Button>
          <Button
            className="bg-fun-green-600 hover:bg-fun-green-700"
            loading={resetUserPassword.isPending}
            type="submit"
          >
            Reset Password
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
