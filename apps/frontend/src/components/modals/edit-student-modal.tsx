import type { User } from "@/types";

import { Button, Group, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconAlertCircle, IconCheck } from "@tabler/icons-react";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { z } from "zod";

import { useUpdateUser } from "@/services/hooks";

const editStudentSchema = z.object({
  department: z.string().optional(),
  displayName: z.string().min(1, "Full name is required"),
  location: z.string().optional(),
});

type EditStudentFormData = z.infer<typeof editStudentSchema>;

interface EditStudentModalProps {
  student: User;
}

export function openEditStudentModal(student: User) {
  modals.open({
    children: <EditStudentModal student={student} />,
    size: "md",
    title: "Edit Student Profile",
  });
}

function EditStudentModal({ student }: EditStudentModalProps) {
  const updateUser = useUpdateUser();

  const form = useForm<EditStudentFormData>({
    initialValues: {
      department: student.department || "",
      displayName: student.displayName || "",
      location: student.location || "",
    },
    validate: zod4Resolver(editStudentSchema),
  });

  const handleSubmit = (values: EditStudentFormData) => {
    updateUser.mutate(
      {
        userData: values,
        userId: student.uid,
      },
      {
        onError: (error) => {
          notifications.show({
            color: "red",
            icon: <IconAlertCircle size={16} />,
            message: error.message || "Failed to update student profile",
            title: "Error",
          });
        },
        onSuccess: () => {
          notifications.show({
            color: "green",
            icon: <IconCheck size={16} />,
            message: "Student profile updated successfully",
            title: "Success",
          });
          modals.closeAll();
        },
      }
    );
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Full Name"
          required
          {...form.getInputProps("displayName")}
        />
        <TextInput label="Department" {...form.getInputProps("department")} />
        <TextInput label="Location" {...form.getInputProps("location")} />
        <Group justify="flex-end" mt="lg">
          <Button onClick={() => modals.closeAll()} variant="light">
            Cancel
          </Button>
          <Button
            className="bg-fun-green-600 hover:bg-fun-green-700"
            loading={updateUser.isPending}
            type="submit"
          >
            Save Changes
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
