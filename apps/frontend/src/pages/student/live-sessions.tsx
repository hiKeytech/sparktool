import type {
  JitsiMeetInterfaceConfig,
  LiveSession,
  LiveSessionStatus,
} from "@/types";

import { JitsiMeeting } from "@jitsi/react-sdk";
import {
  Badge,
  Button,
  Card,
  Container,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import {
  IconCalendar,
  IconClock,
  IconUsers,
  IconVideo,
} from "@tabler/icons-react";
import { addMinutes, format, isAfter, isBefore, subMinutes } from "date-fns";
import { useState } from "react";

import type { TenantUserPageProps } from "@/types/route-page-props";
import { useJoinLiveSession, useListLiveSessions } from "@/services/hooks";

const statusColors: Record<LiveSessionStatus, string> = {
  active: "green",
  cancelled: "red",
  ended: "gray",
  scheduled: "blue",
};

export function StudentLiveSessionsPage({ tenant, user }: TenantUserPageProps) {
  const [activeSession, setActiveSession] = useState<LiveSession | null>(null);

  const { data: sessions = [], isLoading } = useListLiveSessions();
  const joinLiveSession = useJoinLiveSession();
  const joinWindowMinutes =
    tenant?.config.liveSessions?.joinWindowMinutes ?? 10;
  const portalName = tenant?.config.branding.portalName ?? "Sparktool";
  const interfaceConfig: Partial<JitsiMeetInterfaceConfig> = {
    APP_NAME:
      tenant?.config.liveSessions?.appName ?? `${portalName} Live Session`,
    BRAND_WATERMARK_LINK: "",
    CLOSE_PAGE_GUEST_HINT: false,
    DEFAULT_BACKGROUND: tenant?.config.branding.primaryColor ?? "#1b7339",
    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
    GENERATE_ROOMNAMES_ON_WELCOME_PAGE: false,
    JITSI_WATERMARK_LINK: "",
    LANG_DETECTION: true,
    MOBILE_APP_PROMO: false,
    RECENT_LIST_ENABLED: false,
    SETTINGS_SECTIONS: ["devices", "language", "profile"],
    SHOW_BRAND_WATERMARK: false,
    SHOW_CHROME_EXTENSION_BANNER: false,
    SHOW_JITSI_WATERMARK: false,
    SHOW_POWERED_BY: false,
    SHOW_PROMOTIONAL_CLOSE_PAGE: false,
    SUPPORT_URL: tenant?.config.liveSessions?.supportEmail
      ? `mailto:${tenant.config.liveSessions.supportEmail}`
      : "",
    TILE_VIEW_MAX_COLUMNS: 4,
    VERTICAL_FILMSTRIP: true,
  };

  const handleIframeRef = (container: HTMLDivElement) => {
    if (container) container.style.height = "100%";
  };

  // Filter sessions for current student
  const upcomingSessions = sessions.filter((session) => {
    const now = new Date();
    const sessionStart = new Date(session.scheduledAt);
    return session.status === "scheduled" && isAfter(sessionStart, now);
  });

  const activeSessions = sessions.filter((session) => {
    const now = new Date();
    const sessionStart = new Date(session.scheduledAt);
    const sessionEnd = addMinutes(sessionStart, session.duration);
    return (
      session.status === "active" ||
      (session.status === "scheduled" &&
        isAfter(now, sessionStart) &&
        isBefore(now, sessionEnd))
    );
  });

  const pastSessions = sessions.filter((session) => {
    const now = new Date();
    const sessionStart = new Date(session.scheduledAt);
    const sessionEnd = addMinutes(sessionStart, session.duration);
    return session.status === "ended" || isBefore(sessionEnd, now);
  });

  const handleJoinSession = async (session: LiveSession) => {
    if (!user?.uid) {
      console.error("User not authenticated");
      return;
    }

    try {
      await joinLiveSession.mutateAsync({
        courseId: session.courseId,
        sessionId: session.id,
        studentId: user.uid,
      });
      setActiveSession(session);
    } catch (error) {
      console.error("Failed to join session:", error);
    }
  };

  const canJoinSession = (session: LiveSession) => {
    const now = new Date();
    const sessionStart = new Date(session.scheduledAt);
    const sessionEnd = addMinutes(sessionStart, session.duration);
    const timeMinutesBeforeStart = subMinutes(sessionStart, joinWindowMinutes);

    const isWithinScheduledTime =
      session.status === "scheduled" &&
      isAfter(now, timeMinutesBeforeStart) &&
      isBefore(now, sessionEnd);

    return session.status === "active" || isWithinScheduledTime;
  };

  const renderSessionCard = (session: LiveSession, showJoinButton = false) => (
    <Card
      className="border border-stone-200"
      key={session.id}
      padding="md"
      shadow="sm"
    >
      <Stack gap="sm">
        <Group align="flex-start" justify="space-between">
          <div style={{ flex: 1 }}>
            <Text fw={600} mb={4} size="lg">
              {session.title}
            </Text>
            <Text c="dimmed" mb={8} size="sm">
              {session.description}
            </Text>
          </div>
          <Badge color={statusColors[session.status]} variant="light">
            {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
          </Badge>
        </Group>

        <Group gap="lg">
          <Group gap={8}>
            <IconCalendar className="text-stone-500" size={16} />
            <Text size="sm">
              {format(new Date(session.scheduledAt), "MMM dd, yyyy")}
            </Text>
          </Group>
          <Group gap={8}>
            <IconClock className="text-stone-500" size={16} />
            <Text size="sm">
              {format(new Date(session.scheduledAt), "h:mm a")} (
              {session.duration} min)
            </Text>
          </Group>
          <Group gap={8}>
            <IconUsers className="text-stone-500" size={16} />
            <Text size="sm">{session.participants.length} participants</Text>
          </Group>
        </Group>

        <Text c="dimmed" size="sm">
          <strong>Instructor:</strong> {session.instructorName}
        </Text>

        {showJoinButton && canJoinSession(session) && (
          <Button
            className="bg-fun-green-800 hover:bg-fun-green-700"
            fullWidth
            leftSection={<IconVideo size={16} />}
            loading={joinLiveSession.isPending}
            onClick={() => handleJoinSession(session)}
          >
            Join Session
          </Button>
        )}
      </Stack>
    </Card>
  );

  // If actively in a session, show the Jitsi component
  if (activeSession) {
    return (
      <Container py="md" size="xl">
        <Stack gap="lg">
          <Group align="center" justify="space-between">
            <div>
              <Title order={2}>{activeSession.title}</Title>
              <Text c="dimmed" size="sm">
                Live Session with {activeSession.instructorName}
              </Text>
            </div>
            <Button onClick={() => setActiveSession(null)} variant="outline">
              Leave Session
            </Button>
          </Group>

          <div
            className="aspect-video"
            style={{ height: "80vh", width: "100%" }}
          >
            <JitsiMeeting
              configOverwrite={{
                enableWelcomePage: false,
                prejoinPageEnabled: false,
                startWithAudioMuted: true,
                startWithVideoMuted: true,
                toolbarConfig: {
                  alwaysVisible: true,
                },
              }}
              getIFrameRef={handleIframeRef}
              interfaceConfigOverwrite={interfaceConfig}
              roomName={activeSession.meetingId}
              userInfo={{
                displayName: user?.displayName || "Student",
                email: user?.email || "",
              }}
            />
          </div>
        </Stack>
      </Container>
    );
  }

  return (
    <Container py="md" size="xl">
      <Stack gap="xl">
        {/* Header */}
        <div>
          <Title mb={4} order={2}>
            {portalName} Live Sessions
          </Title>
          <Text c="dimmed" size="sm">
            Join scheduled live training sessions and interact with instructors
          </Text>
        </div>

        {/* Active Sessions */}
        {activeSessions.length > 0 && (
          <div>
            <Title className="text-fun-green-800" mb="md" order={3}>
              🔴 Active Sessions
            </Title>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
              {activeSessions.map((session) =>
                renderSessionCard(session, true),
              )}
            </SimpleGrid>
          </div>
        )}

        {/* Upcoming Sessions */}
        {upcomingSessions.length > 0 && (
          <div>
            <Title mb="md" order={3}>
              📅 Upcoming Sessions
            </Title>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
              {upcomingSessions.map((session) =>
                renderSessionCard(session, true),
              )}
            </SimpleGrid>
          </div>
        )}

        {/* Past Sessions */}
        {pastSessions.length > 0 && (
          <div>
            <Title mb="md" order={3}>
              📚 Past Sessions
            </Title>
            <SimpleGrid cols={{ base: 1, md: 2 }} spacing="lg">
              {pastSessions.map((session) => renderSessionCard(session, false))}
            </SimpleGrid>
          </div>
        )}

        {/* Empty State */}
        {sessions.length === 0 && !isLoading && (
          <Paper className="text-center border border-stone-200" p="xl">
            <Stack align="center" gap="md">
              <IconVideo className="text-stone-400" size={48} />
              <div>
                <Text fw={500} mb={4} size="lg">
                  No Live Sessions
                </Text>
                <Text c="dimmed">
                  There are currently no live sessions available. Check back
                  later for upcoming sessions.
                </Text>
              </div>
            </Stack>
          </Paper>
        )}

        {isLoading && (
          <Paper className="text-center" p="xl">
            <Text c="dimmed">Loading live sessions...</Text>
          </Paper>
        )}
      </Stack>
    </Container>
  );
}
