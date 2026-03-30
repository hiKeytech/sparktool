import { Button, Container, Group, Paper, PasswordInput, Select, Stack, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useNavigate } from "@tanstack/react-router";
import { zod4Resolver } from "mantine-form-zod-resolver";

import { createUserSchema, type CreateUserFormData } from "@/schemas";
import { useAuthContext } from "@/providers/auth-provider";
import { useCreateUser } from "@/services/hooks";

export function CreateUser() {
    const { tenant } = useAuthContext();
  const navigate = useNavigate();
    const createUser = useCreateUser();

    const form = useForm<CreateUserFormData>({
    initialValues: {
            department: "",
      email: "",
            fullName: "",
            location: "",
      role: "student",
            studentId: "",
            temporaryPassword: "",
    },
        validate: zod4Resolver(createUserSchema),
  });

    const handleSubmit = async (values: CreateUserFormData) => {
        const createdUser = await createUser.mutateAsync({
            department: values.department || null,
            displayName: values.fullName,
            email: values.email,
            location: values.location || null,
            password: values.temporaryPassword,
            role: values.role,
            studentId: values.studentId || null,
            tenantId: tenant?.id || null,
        });

    notifications.show({
            title: "User Created",
            message: `${createdUser.displayName} can now sign in with the credentials you created.`,
            color: "green"
    });

    navigate({ to: "/admin/users" });
  };

  return (
    <Container size="sm" py="xl">
        <Stack gap="xl">
             <div>
                     <Title order={2}>Create New User</Title>
                     <Text c="dimmed">Create a password-based account for a student or administrator</Text>
            </div>

            <Paper p="xl" radius="md" withBorder>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Stack gap="md">
                        <Group grow>
                            <TextInput
                                label="Full Name"
                                placeholder="John Doe"
                                required
                                {...form.getInputProps("fullName")}
                            />
                            <TextInput
                                label="Student ID"
                                placeholder="Optional student number"
                                {...form.getInputProps("studentId")}
                            />
                        </Group>
                        <TextInput
                            label="Email Address"
                            placeholder="john.doe@example.com"
                            required
                            {...form.getInputProps("email")}
                        />
                        <Group grow>
                            <TextInput
                                label="Department"
                                placeholder="Optional department"
                                {...form.getInputProps("department")}
                            />
                            <TextInput
                                label="Location"
                                placeholder="Optional location"
                                {...form.getInputProps("location")}
                            />
                        </Group>
                         <Select
                            label="Role"
                            placeholder="Select role"
                            data={[
                                { value: 'student', label: 'Student' },
                                { value: 'admin', label: 'Administrator' },
                            ]}
                            required
                            {...form.getInputProps("role")}
                        />
                        <PasswordInput
                            label="Temporary Password"
                            placeholder="Create an initial password"
                            required
                            {...form.getInputProps("temporaryPassword")}
                        />

                        <Group justify="flex-end" mt="md">
                            <Button variant="default" onClick={() => navigate({ to: "/admin/users"})}>Cancel</Button>
                            <Button loading={createUser.isPending} type="submit">Create Account</Button>
                        </Group>
                    </Stack>
                </form>
            </Paper>
        </Stack>
    </Container>
  );
}
