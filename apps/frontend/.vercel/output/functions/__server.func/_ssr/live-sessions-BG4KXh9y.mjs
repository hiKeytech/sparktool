import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { W as Route$r, I as useAuthContext, X as useListLiveSessions, Y as useJoinLiveSession } from "./router-D664CQ4V.mjs";
import { J as JitsiMeeting } from "../_libs/jitsi__react-sdk.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { D as Container, y as Stack, G as Group, E as Title, T as Text, a as Button, i as SimpleGrid, aa as Paper, F as Card, Q as Badge } from "../_libs/mantine__core.mjs";
import { O as IconVideo, y as IconCalendar, g as IconClock, l as IconUsers } from "../_libs/tabler__icons-react.mjs";
import { a as addMinutes, i as isBefore, b as isAfter, c as format, d as subMinutes } from "../_libs/date-fns.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/@tanstack/react-router-ssr-query+[...].mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/@tanstack/router-ssr-query-core+[...].mjs";
import "../_libs/ibnlanre__builder.mjs";
import "../_libs/tanstack__react-query-devtools.mjs";
import "../_libs/@tanstack/react-router-devtools+[...].mjs";
import "../_libs/mantine-form-zod-resolver.mjs";
import "../_libs/zod.mjs";
import "../_libs/tanstack__react-table.mjs";
import "../_libs/tanstack__table-core.mjs";
import "../_libs/mantine__notifications.mjs";
import "../_libs/mantine__hooks.mjs";
import "../_libs/mantine__store.mjs";
import "../_libs/react-transition-group.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/mantine__modals.mjs";
import "../_libs/mantine__form.mjs";
import "../_libs/klona.mjs";
import "../_libs/fast-deep-equal.mjs";
import "node:async_hooks";
import "../_libs/clsx.mjs";
import "../_libs/react-textarea-autosize.mjs";
import "../_libs/use-latest.mjs";
import "../_libs/use-isomorphic-layout-effect.mjs";
import "../_libs/use-composed-ref.mjs";
import "../_libs/react-number-format.mjs";
import "../_libs/floating-ui__react.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
const statusColors = {
  active: "green",
  cancelled: "red",
  ended: "gray",
  scheduled: "blue"
};
function StudentLiveSessionsPage() {
  const {
    tenant
  } = Route$r.useRouteContext();
  const {
    user
  } = useAuthContext();
  const [activeSession, setActiveSession] = reactExports.useState(null);
  const {
    data: sessions = [],
    isLoading
  } = useListLiveSessions(tenant.id);
  const joinLiveSession = useJoinLiveSession();
  const joinWindowMinutes = tenant.config.liveSessions?.joinWindowMinutes ?? 10;
  const portalName = tenant.config.branding.portalName ?? "SparkTool";
  const interfaceConfig = {
    APP_NAME: tenant.config.liveSessions?.appName ?? `${portalName} Live Session`,
    BRAND_WATERMARK_LINK: "",
    CLOSE_PAGE_GUEST_HINT: false,
    DEFAULT_BACKGROUND: tenant.config.branding.primaryColor ?? "#1b7339",
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
    SUPPORT_URL: tenant.config.liveSessions?.supportEmail ? `mailto:${tenant.config.liveSessions.supportEmail}` : "",
    TILE_VIEW_MAX_COLUMNS: 4,
    VERTICAL_FILMSTRIP: true
  };
  const handleIframeRef = (container) => {
    if (container) container.style.height = "100%";
  };
  const getDisplayStatus = (session) => {
    if (session.status === "cancelled" || session.status === "ended") {
      return session.status;
    }
    const now = /* @__PURE__ */ new Date();
    const sessionStart = new Date(session.scheduledAt);
    const sessionEnd = addMinutes(sessionStart, session.duration);
    if (isBefore(sessionEnd, now)) {
      return "ended";
    }
    if (session.status === "active") {
      return "active";
    }
    if (isAfter(now, sessionStart) && isBefore(now, sessionEnd)) {
      return "active";
    }
    return "scheduled";
  };
  const upcomingSessions = sessions.filter((session) => getDisplayStatus(session) === "scheduled");
  const activeSessions = sessions.filter((session) => getDisplayStatus(session) === "active");
  const pastSessions = sessions.filter((session) => getDisplayStatus(session) === "ended");
  const handleJoinSession = async (session) => {
    if (!user?.uid) {
      console.error("User not authenticated");
      return;
    }
    try {
      await joinLiveSession.mutateAsync({
        courseId: session.courseId,
        sessionId: session.id,
        studentId: user.uid
      });
      setActiveSession(session);
    } catch (error) {
      console.error("Failed to join session:", error);
    }
  };
  const canJoinSession = (session) => {
    const now = /* @__PURE__ */ new Date();
    const sessionStart = new Date(session.scheduledAt);
    const sessionEnd = addMinutes(sessionStart, session.duration);
    const timeMinutesBeforeStart = subMinutes(sessionStart, joinWindowMinutes);
    const isWithinScheduledTime = session.status === "scheduled" && isAfter(now, timeMinutesBeforeStart) && isBefore(now, sessionEnd);
    return session.status === "active" || isWithinScheduledTime;
  };
  const renderSessionCard = (session, showJoinButton = false) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "border border-stone-200", padding: "md", shadow: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "flex-start", justify: "space-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
        flex: 1
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 600, mb: 4, size: "lg", children: session.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", mb: 8, size: "sm", children: session.description })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: statusColors[getDisplayStatus(session)], variant: "light", children: getDisplayStatus(session).charAt(0).toUpperCase() + getDisplayStatus(session).slice(1) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: 8, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconCalendar, { className: "text-stone-500", size: 16 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: format(new Date(session.scheduledAt), "MMM dd, yyyy") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: 8, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { className: "text-stone-500", size: 16 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { size: "sm", children: [
          format(new Date(session.scheduledAt), "h:mm a"),
          " (",
          session.duration,
          " min)"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: 8, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconUsers, { className: "text-stone-500", size: 16 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { size: "sm", children: [
          session.participants.length,
          " participants"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Instructor:" }),
      " ",
      session.instructorName
    ] }),
    showJoinButton && canJoinSession(session) && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-fun-green-800 hover:bg-fun-green-700", fullWidth: true, leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconVideo, { size: 16 }), loading: joinLiveSession.isPending, onClick: () => handleJoinSession(session), children: "Join Session" })
  ] }) }, session.id);
  if (activeSession) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "md", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "center", justify: "space-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 2, children: activeSession.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
            "Live Session with ",
            activeSession.instructorName
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setActiveSession(null), variant: "outline", children: "Leave Session" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-video", style: {
        height: "80vh",
        width: "100%"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(JitsiMeeting, { configOverwrite: {
        enableWelcomePage: false,
        prejoinPageEnabled: false,
        startWithAudioMuted: true,
        startWithVideoMuted: true,
        toolbarConfig: {
          alwaysVisible: true
        }
      }, getIFrameRef: handleIframeRef, interfaceConfigOverwrite: interfaceConfig, roomName: activeSession.meetingId, userInfo: {
        displayName: user?.displayName || "Student",
        email: user?.email || ""
      } }) })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "md", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Title, { mb: 4, order: 2, children: [
        portalName,
        " Live Sessions"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Join scheduled live training sessions and interact with instructors" })
    ] }),
    activeSessions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "text-fun-green-800", mb: "md", order: 3, children: "🔴 Active Sessions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleGrid, { cols: {
        base: 1,
        md: 2
      }, spacing: "lg", children: activeSessions.map((session) => renderSessionCard(session, true)) })
    ] }),
    upcomingSessions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { mb: "md", order: 3, children: "📅 Upcoming Sessions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleGrid, { cols: {
        base: 1,
        md: 2
      }, spacing: "lg", children: upcomingSessions.map((session) => renderSessionCard(session, true)) })
    ] }),
    pastSessions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { mb: "md", order: 3, children: "📚 Past Sessions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleGrid, { cols: {
        base: 1,
        md: 2
      }, spacing: "lg", children: pastSessions.map((session) => renderSessionCard(session, false)) })
    ] }),
    sessions.length === 0 && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(Paper, { className: "text-center border border-stone-200", p: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IconVideo, { className: "text-stone-400", size: 48 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, mb: 4, size: "lg", children: "No Live Sessions" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", children: "There are currently no live sessions available. Check back later for upcoming sessions." })
      ] })
    ] }) }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(Paper, { className: "text-center", p: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", children: "Loading live sessions..." }) })
  ] }) });
}
export {
  StudentLiveSessionsPage as component
};
