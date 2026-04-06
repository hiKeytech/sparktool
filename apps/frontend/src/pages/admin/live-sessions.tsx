import type { LiveSession } from "@/types";

import {
  Button,
  Center,
  Container,
  Grid,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import {
  IconCalendar,
  IconPlus,
  IconUsers,
  IconVideo,
} from "@tabler/icons-react";

import { CreateLiveSessionModal } from "@/components/modals/create-live-session-modal";
import { EditLiveSessionModal } from "@/components/modals/edit-live-session-modal";
import { DataTable } from "@/components/shared/data-table";
import {
  createLiveSessionColumns,
  createLiveSessionTableFilters,
  type LiveSessionTableActions,
} from "@/components/shared/data-table/live-session-table-config";
import {
  useDeleteLiveSession,
  useListCourses,
  useListLiveSessions,
} from "@/services/hooks";
import type { TenantUserPageProps } from "@/types/route-page-props";

export function AdminLiveSessions({ tenant, user }: TenantUserPageProps) {
  const { data: sessions = [], isLoading } = useListLiveSessions(tenant?.id);
  const { data: courses = [] } = useListCourses(tenant?.id);

  const deleteLiveSession = useDeleteLiveSession();

  // Convert courses to the format expected by the table config
  const coursesForTable = courses.map((course) => ({
    id: course.id || "",
    title: course.title || "",
  }));

  // Table handlers
  const tableHandlers: LiveSessionTableActions = {
    onDelete: (sessionId: string) => {
      const session = sessions.find((s) => s.id === sessionId);
      if (session) {
        modals.openConfirmModal({
          children: (
            <Text>
              Are you sure you want to delete the live session "{session.title}
              "? This action cannot be undone.
            </Text>
          ),
          confirmProps: { color: "red" },
          labels: { cancel: "Cancel", confirm: "Delete" },
          onConfirm: () => deleteLiveSession.mutate(session.id),
          title: "Delete Live Session",
        });
      }
    },
    onEdit: (sessionId: string) => {
      const session = sessions.find((s) => s.id === sessionId);
      if (session && tenant) {
        modals.open({
          children: <EditLiveSessionModal session={session} tenant={tenant} />,
          modalId: "edit-live-session",
          size: "lg",
          title: "Edit Live Session",
        });
      }
    },
    onJoinMeeting: (session: LiveSession) => {
      if (session.jitsiMeetUrl) {
        window.open(session.jitsiMeetUrl, "_blank", "noopener,noreferrer");
      }
    },
  };

  const handleCreateSession = () => {
    if (!tenant || !user) {
      return;
    }

    modals.open({
      children: <CreateLiveSessionModal tenant={tenant} user={user} />,
      modalId: "create-live-session",
      size: "lg",
      title: "Create New Live Session",
    });
  };

  if (isLoading) {
    return (
      <Container py="xl" size="xl">
        <Center h={400}>
          <Stack align="center" gap="md">
            <Loader className="text-fun-green-600" size="xl" />
            <Text c="dimmed">Loading live sessions...</Text>
          </Stack>
        </Center>
      </Container>
    );
  }

  return (
    <Container py="xl" size="xl">
      <div data-aos="fade-up">
        {/* Page Header */}
        <Group justify="space-between" mb="xl">
          <div>
            <Title className="text-fun-green-800" order={1}>
              Live Session Management
            </Title>
            <Text c="dimmed">Create and manage live teaching sessions</Text>
          </div>
          <Button
            className="bg-fun-green-600 hover:bg-fun-green-700"
            leftSection={<IconPlus size={16} />}
            onClick={handleCreateSession}
          >
            Create Session
          </Button>
        </Group>

        {/* Stats Cards */}
        <Grid data-aos="fade-up" data-aos-delay="100" mb="xl">
          <Grid.Col span={3}>
            <Paper className="bg-fun-green-50" p="md" radius="md">
              <Group gap="xs">
                <ThemeIcon color="fun-green" size={40} variant="light">
                  <IconCalendar size={20} />
                </ThemeIcon>
                <div>
                  <Text c="dimmed" size="sm">
                    Total Sessions
                  </Text>
                  <Text className="text-fun-green-800" fw={600} size="lg">
                    {sessions.length}
                  </Text>
                </div>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col span={3}>
            <Paper className="bg-blue-50" p="md" radius="md">
              <Group gap="xs">
                <ThemeIcon color="blue" size={40} variant="light">
                  <IconVideo size={20} />
                </ThemeIcon>
                <div>
                  <Text c="dimmed" size="sm">
                    Active Sessions
                  </Text>
                  <Text className="text-blue-800" fw={600} size="lg">
                    {sessions.filter((s) => s.status === "active").length}
                  </Text>
                </div>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col span={3}>
            <Paper className="bg-orange-50" p="md" radius="md">
              <Group gap="xs">
                <ThemeIcon color="orange" size={40} variant="light">
                  <IconUsers size={20} />
                </ThemeIcon>
                <div>
                  <Text c="dimmed" size="sm">
                    Total Participants
                  </Text>
                  <Text className="text-orange-800" fw={600} size="lg">
                    {sessions.reduce(
                      (acc, { participants }) => acc + participants.length,
                      0,
                    )}
                  </Text>
                </div>
              </Group>
            </Paper>
          </Grid.Col>
          <Grid.Col span={3}>
            <Paper className="bg-purple-50" p="md" radius="md">
              <Group gap="xs">
                <ThemeIcon color="purple" size={40} variant="light">
                  <IconCalendar size={20} />
                </ThemeIcon>
                <div>
                  <Text c="dimmed" size="sm">
                    Scheduled Sessions
                  </Text>
                  <Text className="text-purple-800" fw={600} size="lg">
                    {sessions.filter((s) => s.status === "scheduled").length}
                  </Text>
                </div>
              </Group>
            </Paper>
          </Grid.Col>
        </Grid>

        {/* Live Sessions Table */}
        <div data-aos="fade-up" data-aos-delay="200">
          <DataTable
            columns={createLiveSessionColumns(tableHandlers, coursesForTable)}
            data={sessions}
            filters={createLiveSessionTableFilters(coursesForTable)}
            loading={isLoading}
            searchPlaceholder="Search live sessions..."
          />
        </div>
      </div>
    </Container>
  );
}
