import type { User } from "@/types";

import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { zod4Resolver } from "mantine-form-zod-resolver";

import { type SendMessageFormData, sendMessageSchema } from "@/schemas";
import { useCreateNotification } from "@/services/hooks";

interface SendMessageModalProps {
  currentUser: User;
  student: User;
}

export function openSendMessageModal(student: User, currentUser: User) {
  modals.open({
    children: <SendMessageModal currentUser={currentUser} student={student} />,
    size: "md",
    title: `Send Message to ${student.displayName}`,
  });
}

function SendMessageModal({ currentUser, student }: SendMessageModalProps) {
  const createNotification = useCreateNotification();

  const form = useForm<SendMessageFormData>({
    initialValues: {
      message: "",
      subject: "",
    },
    validate: zod4Resolver(sendMessageSchema),
  });

  const handleSubmit = (values: SendMessageFormData) => {
    createNotification.mutate(
      {
        category: "message" as const,
        createdAt: Date.now(), // Uses Number (ms)
        fromUserId: currentUser.uid,
        fromUserName: currentUser.displayName || "Administrator",
        isRead: false,
        message: values.message,
        title: values.subject,
        userId: student.uid,
      },
      {
        onError: () => {
          notifications.show({
            color: "red",
            message: "Failed to send message. Please try again.",
            title: "Error",
          });
        },
        onSuccess: () => {
          notifications.show({
            color: "green",
            icon: <IconCheck size={16} />,
            message: `Message sent to ${student.displayName}`,
            title: "Success",
          });
          modals.closeAll();
        },
      },
    );
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Subject"
          placeholder="Enter message subject"
          required
          {...form.getInputProps("subject")}
        />
        <Textarea
          label="Message"
          placeholder="Type your message here..."
          required
          rows={6}
          {...form.getInputProps("message")}
        />
        <Group justify="flex-end" mt="lg">
          <Button onClick={() => modals.closeAll()} variant="light">
            Cancel
          </Button>
          <Button
            className="bg-fun-green-600 hover:bg-fun-green-700"
            type="submit"
          >
            Send Message
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
