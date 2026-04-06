import type { LiveSession } from "@/types";

import {
  Button,
  Group,
  NumberInput,
  Select,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { z } from "zod";

import type { Tenant } from "@/schemas/tenant-contract";
import { useListCourses, useUpdateLiveSession } from "@/services/hooks";
import { DATE_PICKER_PRESETS } from "@/utils/date-utils";

const schema = z.object({
  courseId: z.string().min(1, "Please select a course"),
  description: z.string().min(1, "Session description is required"),
  duration: z
    .number()
    .min(15, "Minimum duration is 15 minutes")
    .max(480, "Maximum duration is 8 hours"),
  instructorName: z.string().min(1, "Instructor name is required"),
  maxParticipants: z.number().min(1).optional(),
  scheduledAt: z.coerce
    .date()
    .min(new Date(), "Scheduled time must be in the future"),
  status: z.enum(["scheduled", "active", "ended", "cancelled"]),
  title: z.string().min(1, "Session title is required"),
});

interface EditLiveSessionModalProps {
  session: LiveSession;
  tenant: Tenant;
}

export function EditLiveSessionModal({
  session,
  tenant,
}: EditLiveSessionModalProps) {
  const { data: courses = [] } = useListCourses(tenant.id);
  const updateLiveSession = useUpdateLiveSession();

  const form = useForm({
    initialValues: {
      courseId: session.courseId,
      description: session.description,
      duration: session.duration,
      instructorName: session.instructorName,
      maxParticipants: session.maxParticipants,
      scheduledAt: session.scheduledAt,
      status: session.status,
      title: session.title,
    },
    validate: zod4Resolver(schema),
  });

  const handleSubmit = async (sessionData: typeof form.values) => {
    await updateLiveSession.mutateAsync({
      sessionData,
      sessionId: session.id,
    });
  };

  const courseOptions = courses.map((course) => ({
    label: course.title ?? "Untitled Course",
    value: course.id,
  }));

  const statusOptions = [
    { label: "Scheduled", value: "scheduled" },
    { label: "Active", value: "active" },
    { label: "Ended", value: "ended" },
    { label: "Cancelled", value: "cancelled" },
  ];

  const handleClose = () => {
    modals.closeAll();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        <TextInput
          label="Session Title"
          placeholder="Enter session title"
          required
          {...form.getInputProps("title")}
        />

        <Textarea
          label="Description"
          minRows={3}
          placeholder="Describe what this session will cover"
          required
          {...form.getInputProps("description")}
        />

        <Select
          data={courseOptions}
          label="Course"
          placeholder="Select a course"
          required
          searchable
          {...form.getInputProps("courseId")}
        />

        <TextInput
          label="Instructor Name"
          placeholder="Enter instructor name"
          required
          {...form.getInputProps("instructorName")}
        />

        <DateTimePicker
          label="Scheduled Date & Time"
          minDate={new Date()}
          placeholder="Select date and time"
          presets={DATE_PICKER_PRESETS}
          required
          {...form.getInputProps("scheduledAt")}
        />

        <NumberInput
          label="Duration (minutes)"
          max={480}
          min={15}
          placeholder="Enter duration in minutes"
          required
          step={15}
          {...form.getInputProps("duration")}
        />

        <NumberInput
          label="Maximum Participants (optional)"
          max={1000}
          min={1}
          placeholder="Leave empty for unlimited"
          {...form.getInputProps("maxParticipants")}
        />

        <Select
          data={statusOptions}
          label="Status"
          placeholder="Select session status"
          required
          {...form.getInputProps("status")}
        />

        <Group justify="flex-end" mt="md">
          <Button onClick={handleClose} variant="outline">
            Cancel
          </Button>

          <Button
            className="bg-fun-green-800 hover:bg-fun-green-700"
            loading={updateLiveSession.isPending}
            type="submit"
          >
            Update Session
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
