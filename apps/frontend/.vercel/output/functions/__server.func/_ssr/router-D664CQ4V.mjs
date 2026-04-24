import { b as QueryClient, c as MutationCache } from "../_libs/tanstack__query-core.mjs";
import { c as createRouter, N as Navigate, u as useRouter, a as useMatch, E as ErrorComponent, L as Link, b as createRootRouteWithContext, H as HeadContent, O as Outlet, S as Scripts, d as createFileRoute, l as lazyRouteComponent, e as useNavigate, f as useParams } from "../_libs/tanstack__react-router.mjs";
import { j as rootRouteId } from "../_libs/tanstack__router-core.mjs";
import { s as setupRouterSsrQueryIntegration } from "../_libs/@tanstack/react-router-ssr-query+[...].mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { t as tenantLookupSchema, r as redeemAdminInvitationInputSchema, a as tenantIdSchema, c as createTenantInputSchema, b as createTenantOnboardingInputSchema, u as updateTenantInputSchema } from "./tenant-contract-BrIl-2Jr.mjs";
import { c as createSsrRpc } from "./course-structure-D2f1-VM0.mjs";
import { c as createServerFn } from "./index.mjs";
import { Q as QueryClientProvider, u as useQuery, q as queryOptions, a as useMutation, b as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { p as platformConfigSchema } from "./platform-config-DKda_4-W.mjs";
import { e as extractTenantIdFromPath, r as resolveRoleHomeTarget, s as sessionDataSchema } from "./session-DEslDYHo.mjs";
import { c as createBuilder } from "../_libs/ibnlanre__builder.mjs";
import { a as course } from "./course-C8X6AilP.mjs";
import { c as courseLesson } from "./course-lesson-C_qGHOXP.mjs";
import { R as ReactQueryDevtools2 } from "../_libs/tanstack__react-query-devtools.mjs";
import { T as TanStackRouterDevtools } from "../_libs/@tanstack/react-router-devtools+[...].mjs";
import { A as Aos } from "../_libs/aos.mjs";
import { d as dayjs, a as duration, r as relativeTime, u as utc } from "../_libs/dayjs.mjs";
import { z as zod4Resolver } from "../_libs/mantine-form-zod-resolver.mjs";
import { u as useReactTable, f as flexRender } from "../_libs/tanstack__react-table.mjs";
import { m as minutesToMilliseconds, s as secondsToMilliseconds } from "../_libs/date-fns.mjs";
import { s as mantineHtmlProps, t as ColorSchemeScript, v as MantineProvider, w as createTheme, L as LoadingOverlay, x as Center, y as Stack, z as Loader, T as Text, D as Container, E as Title, F as Card, H as Grid, J as TextInput, K as Select, i as SimpleGrid, Q as Badge, G as Group, R as Progress, a as Button, V as Menu, W as Checkbox, X as Table, Y as Tooltip, p as ActionIcon, Z as Pagination, _ as Skeleton, $ as Alert, a0 as Rating, a1 as List, a2 as ThemeIcon, a3 as Avatar, a4 as RingProgress, a5 as Tabs, a6 as Timeline, a7 as Textarea, a8 as PasswordInput } from "../_libs/mantine__core.mjs";
import { N as Notifications, n as notifications } from "../_libs/mantine__notifications.mjs";
import { M as ModalsProvider, m as modals } from "../_libs/mantine__modals.mjs";
import { I as IconCheck, a as IconInfoCircle, b as IconAlertCircle, c as IconSearch, d as IconPlayerPlay, e as IconBooks, f as IconListCheck, g as IconClock, h as IconFilter, i as IconColumns, j as IconSortDescending, k as IconSortAscending, l as IconUsers, m as IconUser, n as IconSparkles, o as IconBook, p as IconTrendingUp, q as IconCertificate, r as IconWorldWww, s as IconStar, t as IconExclamationMark, u as IconArrowLeft, v as IconMessageCircle, w as IconEdit, x as IconMail, y as IconCalendar, z as IconTrophy, A as IconDownload, B as IconChecklist, C as IconTarget, D as IconPlayerSkipBack, E as IconPlayerPause, F as IconPlayerSkipForward, G as IconVolumeOff, H as IconVolume, J as IconSettings, K as IconMaximize, L as IconActivity } from "../_libs/tabler__icons-react.mjs";
import { g as getSortedRowModel, a as getPaginationRowModel, b as getFilteredRowModel, d as getCoreRowModel } from "../_libs/tanstack__table-core.mjs";
import { u as useForm } from "../_libs/mantine__form.mjs";
import { o as object, s as string, n as number, a as array, b as boolean, _ as _enum, l as literal, e as email, c as any, r as record, u as union, d as date } from "../_libs/zod.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "node:stream/web";
import "../_libs/@tanstack/router-ssr-query-core+[...].mjs";
import "node:async_hooks";
import "../_libs/mantine__hooks.mjs";
import "../_libs/clsx.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/react-textarea-autosize.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/use-latest.mjs";
import "../_libs/use-isomorphic-layout-effect.mjs";
import "../_libs/use-composed-ref.mjs";
import "../_libs/react-number-format.mjs";
import "../_libs/floating-ui__react.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/mantine__store.mjs";
import "../_libs/react-transition-group.mjs";
import "../_libs/klona.mjs";
import "../_libs/fast-deep-equal.mjs";
function ErrorBoundary({ error }) {
  const router2 = useRouter();
  const isRoot = useMatch({
    select: ({ id }) => id === rootRouteId,
    strict: false
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center flex-1 min-w-0 gap-6 p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorComponent, { error }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          className: "px-2 py-1 font-extrabold text-white uppercase bg-gray-600 rounded-sm dark:bg-gray-700",
          onClick: () => {
            router2.invalidate();
          },
          children: "Try Again"
        }
      ),
      isRoot ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          className: "px-2 py-1 font-extrabold text-white uppercase bg-gray-600 rounded-sm dark:bg-gray-700",
          to: "/",
          children: "Home"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          className: "px-2 py-1 font-extrabold text-white uppercase bg-gray-600 rounded-sm dark:bg-gray-700",
          onClick: (e) => {
            e.preventDefault();
            window.history.back();
          },
          to: "/",
          children: "Go Back"
        }
      )
    ] })
  ] });
}
const activityLogActionSchema = _enum(["admin_invitation_created", "admin_invitation_redeemed", "certificate_earned", "certificate_modified", "course_completed", "course_enrolled", "course_started", "live_session_created", "live_session_ended", "live_session_joined", "login", "logout", "profile_updated", "progress_updated", "lesson_completed", "quiz_attempted", "user_signup", "video_watched"]).nullable();
const activityLogCreateInputSchema = object({
  action: activityLogActionSchema,
  certificateId: string().nullable().optional(),
  courseId: string().nullable().optional(),
  enrollmentMethod: _enum(["admin_enrolled", "self_enrolled"]).optional(),
  invitedEmail: string().email().optional(),
  method: _enum(["manual_login", "session_restore", "social_login", "email_password", "phone_login", "manual_logout", "session_expired", "manual_signup", "social_signup", "phone_signup"]).optional(),
  passed: boolean().optional(),
  progressPercentage: number().optional(),
  quizId: string().nullable().optional(),
  score: number().optional(),
  sessionId: string().nullable().optional(),
  studentId: string().nullable().optional(),
  tenantId: string().nullable().optional(),
  totalDurationInMinutes: number().optional(),
  updatedFields: array(string()).optional(),
  userAgent: string().nullable().optional(),
  userId: string().min(1).nullable(),
  videoId: string().nullable().optional(),
  watchedDurationInMinutes: number().optional(),
  lessonId: string().nullable().optional()
});
const activityLogListInputSchema = object({
  queryFilter: array(any()).optional(),
  queryOrder: array(any()).optional(),
  tenantId: string().optional(),
  userId: string().min(1)
});
const platformActivityLogListInputSchema = object({
  action: activityLogActionSchema.optional(),
  limit: number().int().min(1).max(50).optional(),
  tenantId: string().optional(),
  userId: string().min(1).optional()
});
const createActivityLogFn = createServerFn({
  method: "POST"
}).inputValidator(activityLogCreateInputSchema).handler(createSsrRpc("2338bbcab1eb054d82ae7ede266c530d3882576f54c6143409d910bed8991e43"));
const listActivityLogsFn = createServerFn({
  method: "GET"
}).inputValidator(activityLogListInputSchema).handler(createSsrRpc("51620865152b4d35ec2253229d0630461cd9b6ebce550d5d63d2b04083b8644e"));
const listPlatformActivityLogsFn = createServerFn({
  method: "GET"
}).inputValidator(platformActivityLogListInputSchema).handler(createSsrRpc("3ef8835a429bcdb395d452bcd8e88ed09649458fd43b2c417d270cea17d45e9c"));
const activityLogs$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createActivityLogFn,
  listActivityLogsFn,
  listPlatformActivityLogsFn
}, Symbol.toStringTag, { value: "Module" }));
const getPlatformConfig = createServerFn({
  method: "GET"
}).handler(createSsrRpc("9193d3a3d093fbe269b47489260c584fd9d288e33555d8834ebe4df5c577979c"));
const updatePlatformConfig = createServerFn({
  method: "POST"
}).inputValidator(platformConfigSchema).handler(createSsrRpc("0d6de405338a1b8ed79aeb9ffe11cf5039b9a5bd90fc17bc45f63b050dea9691"));
const setSessionDataSchema = sessionDataSchema.extend({
  uid: string().min(1)
});
const userLookupSchema = string().min(1).nullable();
const invitationLookupSchema = object({
  tenantId: string().min(1, "Tenant ID is required"),
  token: string().min(1, "Invitation token is required")
});
const passwordAuthSchema = object({
  allowSignup: boolean().default(false),
  displayName: string().trim().min(2).optional(),
  email: email(),
  mode: _enum(["sign-in", "sign-up"]).default("sign-in"),
  password: string().min(8, "Password must be at least 8 characters long"),
  restrictedDomains: array(string()).optional(),
  tenantId: string().min(1).optional()
});
const changePasswordSchema$1 = object({
  confirmPassword: string(),
  currentPassword: string().min(1, "Current password is required"),
  newPassword: string().min(8, "New password must be at least 8 characters long")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
const resetUserPasswordSchema$1 = object({
  newPassword: string().min(8, "Temporary password must be at least 8 characters long"),
  userId: string().min(1)
});
createServerFn({
  method: "POST"
}).inputValidator(setSessionDataSchema).handler(createSsrRpc("7783dfd6d92cdf944bd11e25a64239dcf6a9c62ef61008d201f825a5d0ad0575"));
createServerFn({
  method: "POST"
}).handler(createSsrRpc("83c4f1e1fd6a67d2e84e95512ea9c14b38cbe296597739e914c94c69365e7825"));
const getSessionDataFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("779a761f1a825006aa301206dd10631009897c4b7f1a28db45fc8fd134d4709f"));
createServerFn({
  method: "GET"
}).handler(createSsrRpc("eb89faca6fe6e97047ae155b6afc8f404273f7bd19a28aaf1157be1e410abd51"));
const getUserByIdFn = createServerFn({
  method: "GET"
}).inputValidator(userLookupSchema).handler(createSsrRpc("c24b80f27dd9e030968dcc5479c568baf57bb04b19c8cb1cce4e2edd06e3a515"));
const signInWithPasswordFn = createServerFn({
  method: "POST"
}).inputValidator(passwordAuthSchema).handler(createSsrRpc("2a100f17138769f334ee33312a2560b67b2755cbf066b5fdb034aefdc55cf101"));
const signOutUserFn = createServerFn({
  method: "POST"
}).handler(createSsrRpc("436845b47a80b39d6e4f91499a2a94943ab5a4a73ea6218d75d6a18e46839437"));
const getAdminInvitationPreviewFn = createServerFn({
  method: "GET"
}).inputValidator(invitationLookupSchema).handler(createSsrRpc("db03c1a02acbc83487ba5d76b322c137f905a6fbe85292ed569f401d722faa78"));
const redeemAdminInvitationFn = createServerFn({
  method: "POST"
}).inputValidator(redeemAdminInvitationInputSchema).handler(createSsrRpc("4bb39ef5c722da31935fcd6ce957ccda0713995555a72430d81f70af21d90a0d"));
const updateUserProfileFn = createServerFn({
  method: "POST"
}).inputValidator(object({
  updates: record(string(), any()),
  userId: string().min(1)
})).handler(createSsrRpc("d0813b0fc759b8036304659d798f8ff9d0e9929a241814362dc2fc21e4976583"));
const changePasswordFn = createServerFn({
  method: "POST"
}).inputValidator(changePasswordSchema$1).handler(createSsrRpc("2c90d8e9759295c21472cfe7f21a65e1919ea7a3435f8fc24a492411c5eca364"));
const resetUserPasswordFn = createServerFn({
  method: "POST"
}).inputValidator(resetUserPasswordSchema$1).handler(createSsrRpc("0f80b7261914574f6a4379522cabf6fab1c43be27f180014b57b94277cf9730b"));
const invitationActionInputSchema = object({
  invitationId: string().trim().min(1),
  tenantId: tenantIdSchema
});
const createTenantFn = createServerFn({
  method: "POST"
}).inputValidator(createTenantInputSchema).handler(createSsrRpc("9a886cb51873676362f83fec3d1acaa75c8b13df5ce76d2b1efb2205415f642d"));
const createTenantOnboardingFn = createServerFn({
  method: "POST"
}).inputValidator(createTenantOnboardingInputSchema).handler(createSsrRpc("ae144b784bb0547588b0006f141d53cd05e787ee259d2ab15c2326d619174e95"));
const getTenantByIdFn = createServerFn({
  method: "GET"
}).inputValidator(tenantIdSchema).handler(createSsrRpc("90ee5006bfad64717778fef48bf75cfc81fc81047933b9df76d413f4bc8e6b9c"));
const listTenantsFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("564bb5f000cdca9434834676eb3cc89d157fad8bd8096c46b29330ad266425c8"));
const updateTenantFn = createServerFn({
  method: "POST"
}).inputValidator(updateTenantInputSchema).handler(createSsrRpc("5e8f20d1537792d9987b831a7c2e4d7cf5eea68d56f6de7501d9bdd711c93308"));
const listTenantAdminInvitationsFn = createServerFn({
  method: "GET"
}).handler(createSsrRpc("a22e27b766f3a9b7581ec1ab5e1eb8fca0b0735e49955ea0002b4ae565e864c4"));
const reissueTenantAdminInvitationFn = createServerFn({
  method: "POST"
}).inputValidator(invitationActionInputSchema).handler(createSsrRpc("c8f8c3f719e244eb500bc405b06933d25021da3dbe1a5ce3701c94cf2ca6e7aa"));
const revokeTenantAdminInvitationFn = createServerFn({
  method: "POST"
}).inputValidator(invitationActionInputSchema).handler(createSsrRpc("458a5e266b31b4298ab286f2910adf00aa095ce20453db524ba86361683e605c"));
const tenants = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createTenantFn,
  createTenantOnboardingFn,
  getTenantByIdFn,
  listTenantAdminInvitationsFn,
  listTenantsFn,
  reissueTenantAdminInvitationFn,
  revokeTenantAdminInvitationFn,
  updateTenantFn
}, Symbol.toStringTag, { value: "Module" }));
const aiStudy = {
  generatePracticeQuiz: async (variables) => {
    const { generateAiPracticeQuizFn } = await import("./ai-BKQ294uS.mjs");
    return generateAiPracticeQuizFn({ data: variables });
  },
  getChatThread: async (variables) => {
    const { getAiChatThreadFn } = await import("./ai-BKQ294uS.mjs");
    return getAiChatThreadFn({
      data: {
        courseId: variables.courseId ?? null,
        lessonId: variables.lessonId ?? null
      }
    });
  },
  getPracticeQuizSession: async (sessionId) => {
    const { getAiPracticeQuizSessionFn } = await import("./ai-BKQ294uS.mjs");
    return getAiPracticeQuizSessionFn({ data: sessionId });
  },
  listPracticeQuizSessions: async (courseId) => {
    const { listAiPracticeQuizSessionsFn } = await import("./ai-BKQ294uS.mjs");
    return listAiPracticeQuizSessionsFn({ data: courseId ?? null });
  },
  sendChatMessage: async (variables) => {
    const { sendAiChatMessageFn } = await import("./ai-BKQ294uS.mjs");
    return sendAiChatMessageFn({
      data: {
        courseId: variables.courseId ?? null,
        lessonId: variables.lessonId ?? null,
        message: variables.message,
        threadId: variables.threadId ?? null
      }
    });
  },
  submitPracticeQuiz: async (variables) => {
    const { submitAiPracticeQuizFn } = await import("./ai-BKQ294uS.mjs");
    return submitAiPracticeQuizFn({
      data: variables
    });
  }
};
function isDefined(value) {
  return value !== void 0 && value !== null;
}
const activityLogs = {
  create: async (variables) => {
    const { createActivityLogFn: createActivityLogFn2 } = await Promise.resolve().then(() => activityLogs$1);
    const userAgent = typeof navigator === "undefined" ? null : navigator.userAgent;
    const normalizedVariables = Object.fromEntries(
      Object.entries(variables).map(([key, value]) => [
        key,
        value ?? void 0
      ])
    );
    return createActivityLogFn2({
      data: {
        action: variables.action ?? null,
        ...normalizedVariables,
        userAgent,
        userId: variables.userId ?? null
      }
    });
  },
  list: async (variables) => {
    const { listActivityLogsFn: listActivityLogsFn2 } = await Promise.resolve().then(() => activityLogs$1);
    const { queryFilter = [], queryOrder = [], tenantId, userId } = variables;
    if (!isDefined(userId)) {
      return [];
    }
    return listActivityLogsFn2({
      data: {
        queryFilter,
        queryOrder,
        tenantId,
        userId
      }
    });
  }
};
const authService = {
  session: async () => await getSessionDataFn(),
  getCurrentUser: async (userId) => {
    return getUserByIdFn({ data: userId });
  },
  signInWithEmailAndPassword: async (credentials) => {
    return signInWithPasswordFn({ data: credentials });
  },
  getAdminInvitationPreview: async (variables) => {
    return getAdminInvitationPreviewFn({ data: variables });
  },
  redeemAdminInvitation: async (variables) => {
    return redeemAdminInvitationFn({ data: variables });
  },
  signOut: async (_variables) => {
    return signOutUserFn();
  },
  changePassword: async (variables) => {
    return changePasswordFn({ data: variables });
  },
  resetUserPassword: async (variables) => {
    return resetUserPasswordFn({ data: variables });
  },
  updateProfile: async (variables) => {
    const { skipActivityLog = false, updates, userId } = variables;
    const updatedUserId = await updateUserProfileFn({
      data: {
        updates,
        userId
      }
    });
    if (!skipActivityLog) {
      return updatedUserId;
    }
    return updatedUserId;
  }
};
const certificates = {
  create: async (variables) => {
    const { createCertificateFn } = await import("./certificates-7nl8pO6O.mjs");
    return createCertificateFn({
      data: {
        data: {
          ...variables.data,
          status: variables.data.status ?? "issued",
          issued: variables.data.issued ?? {
            at: null,
            by: null,
            name: null,
            photoUrl: null
          },
          modified: variables.data.modified ?? {
            at: null,
            by: null,
            name: null,
            photoUrl: null
          }
        },
        userId: variables.userId
      }
    });
  },
  find: async (certificateId) => {
    if (!certificateId) {
      return null;
    }
    const { findCertificateFn } = await import("./certificates-7nl8pO6O.mjs");
    return findCertificateFn({
      data: {
        certificateId
      }
    });
  },
  get: async (studentId, tenantId) => {
    if (!studentId) return [];
    if (!tenantId)
      throw new Error("tenantId is required to get student certificates.");
    const { getStudentCertificatesFn } = await import("./certificates-7nl8pO6O.mjs");
    return getStudentCertificatesFn({
      data: {
        studentId,
        tenantId
      }
    });
  },
  list: async (tenantId) => {
    if (!tenantId) {
      return [];
    }
    const { listCertificatesFn } = await import("./certificates-7nl8pO6O.mjs");
    return listCertificatesFn({
      data: {
        tenantId
      }
    });
  },
  update: async (variables) => {
    const { updateCertificateFn } = await import("./certificates-7nl8pO6O.mjs");
    return updateCertificateFn({
      data: {
        certificateId: variables.certificateId,
        updates: {
          downloadCount: variables.updates.downloadCount ?? 0,
          status: variables.updates.status ?? "issued"
        },
        userId: variables.userId
      }
    });
  }
};
const courseProgress = {
  calculate: async (variables) => {
    const { courseId, studentId } = variables;
    const allLessons = await api.$use.courseLesson.listByCourse(courseId);
    const requiredLessons = allLessons.filter((lesson) => lesson.isRequired);
    const optionalLessons = allLessons.filter((lesson) => !lesson.isRequired);
    const allProgress = await api.$use.lessonProgress.listByStudent(studentId);
    const currentCourseProgress = allProgress.filter(
      (progress) => progress.courseId === courseId
    );
    const completedRequired = currentCourseProgress.filter(
      (progress) => progress.isCompleted && requiredLessons.some((lesson) => lesson.id === progress.lessonId)
    );
    const completedOptional = currentCourseProgress.filter(
      (progress) => progress.isCompleted && optionalLessons.some((lesson) => lesson.id === progress.lessonId)
    );
    const totalRequiredLessons = requiredLessons.length;
    const totalRequiredCompleted = completedRequired.length;
    const completionPercentage = totalRequiredLessons > 0 ? Math.round(totalRequiredCompleted / totalRequiredLessons * 100) : 100;
    const isCompleted = completionPercentage === 100;
    return {
      completionPercentage,
      courseId,
      isCompleted,
      studentId,
      totalLessonsCompleted: currentCourseProgress.filter((p) => p.isCompleted).length,
      totalOptionalLessonsCompleted: completedOptional.length,
      totalRequiredLessons,
      totalTimeSpent: currentCourseProgress.reduce(
        (total, progress) => total + (progress.timeSpent || 0),
        0
      )
    };
  },
  updateCourseProgress: async (variables) => {
    const { courseId, studentId, tenantId } = variables;
    const calculatedProgress = await api.$use.courseProgress.calculate({
      courseId,
      studentId
    });
    const { upsertCourseProgressSummaryFn } = await import("./student-progress-CyAFiIHW.mjs");
    await upsertCourseProgressSummaryFn({
      data: {
        calculatedProgress,
        tenantId
      }
    });
    return calculatedProgress;
  }
};
const courseQuiz = {
  create: async (quizData) => {
    const { createCourseQuizFn } = await import("./course-quizzes-BTsWg1Vx.mjs");
    return createCourseQuizFn({ data: quizData });
  },
  delete: async (quizId) => {
    const { deleteCourseQuizFn } = await import("./course-quizzes-BTsWg1Vx.mjs");
    return deleteCourseQuizFn({ data: quizId });
  },
  get: async (quizId) => {
    const { getCourseQuizFn } = await import("./course-quizzes-BTsWg1Vx.mjs");
    return getCourseQuizFn({ data: quizId });
  },
  list: async (filters) => {
    const { listCourseQuizzesFn } = await import("./course-quizzes-BTsWg1Vx.mjs");
    return listCourseQuizzesFn({ data: filters });
  },
  reorder: async (quizUpdates) => {
    const { reorderCourseQuizzesFn } = await import("./course-quizzes-BTsWg1Vx.mjs");
    return reorderCourseQuizzesFn({ data: quizUpdates });
  },
  update: async (variables) => {
    const { updateCourseQuizFn } = await import("./course-quizzes-BTsWg1Vx.mjs");
    return updateCourseQuizFn({ data: variables });
  }
};
const quiz = {
  create: async (quizData) => {
    const { createQuizFn } = await import("./quizzes-rf_n3yY8.mjs");
    return createQuizFn({
      data: {
        quizData
      }
    });
  },
  delete: async (quizId) => {
    const { deleteQuizFn } = await import("./quizzes-rf_n3yY8.mjs");
    return deleteQuizFn({ data: quizId });
  },
  get: async (quizId) => {
    if (!quizId) {
      return null;
    }
    const { getQuizFn } = await import("./quizzes-rf_n3yY8.mjs");
    return getQuizFn({ data: quizId });
  },
  list: async (courseId) => {
    const { listQuizzesFn } = await import("./quizzes-rf_n3yY8.mjs");
    return listQuizzesFn({
      data: {
        courseId
      }
    });
  },
  update: async (variables) => {
    const { updateQuizFn } = await import("./quizzes-rf_n3yY8.mjs");
    return updateQuizFn({ data: variables });
  }
};
object({
  courseId: string(),
  createdAt: number().default(() => Date.now()),
  createdBy: string().nullish(),
  createdByMeta: object({
    name: string(),
    photoUrl: string()
  }).nullish(),
  description: string().nullish(),
  estimatedDurationInMinutes: number().default(0),
  isPublished: boolean().default(false),
  order: number().nullish(),
  title: string().nullish(),
  updatedAt: number().default(() => Date.now()),
  updatedBy: string().nullish(),
  updatedByMeta: object({
    name: string(),
    photoUrl: string()
  }).nullish()
});
const courseSection = {
  create: async (variables) => {
    const { createSectionFn } = await import("./course-structure-D2f1-VM0.mjs").then((n) => n.b);
    return createSectionFn({ data: variables });
  },
  delete: async (sectionId) => {
    const { deleteSectionFn } = await import("./course-structure-D2f1-VM0.mjs").then((n) => n.b);
    return deleteSectionFn({ data: sectionId });
  },
  get: async (sectionId) => {
    const { getSectionFn } = await import("./course-structure-D2f1-VM0.mjs").then((n) => n.b);
    return getSectionFn({ data: sectionId });
  },
  list: async (courseId) => {
    const { listSectionsFn } = await import("./course-structure-D2f1-VM0.mjs").then((n) => n.b);
    return listSectionsFn({ data: courseId });
  },
  reorder: async (variables) => {
    const { reorderSectionsFn } = await import("./course-structure-D2f1-VM0.mjs").then((n) => n.b);
    return reorderSectionsFn({ data: variables });
  },
  update: async (variables) => {
    const { updateSectionFn } = await import("./course-structure-D2f1-VM0.mjs").then((n) => n.b);
    return updateSectionFn({ data: variables });
  }
};
const dashboard = {
  analytics: async (timeframe = "month", tenantId) => {
    const { getDashboardAnalyticsFn } = await import("./dashboard-Bu93xrWi.mjs");
    return getDashboardAnalyticsFn({
      data: {
        tenantId,
        timeframe
      }
    });
  },
  metrics: async (tenantId) => {
    const { getDashboardMetricsFn } = await import("./dashboard-Bu93xrWi.mjs");
    return getDashboardMetricsFn({
      data: {
        tenantId
      }
    });
  }
};
const lessonProgress = {
  create: async (variables) => {
    const { createLessonProgressFn } = await import("./lesson-progress-CsOCmP_s.mjs");
    return createLessonProgressFn({ data: variables });
  },
  get: async (variables) => {
    const { getLessonProgressFn } = await import("./lesson-progress-CsOCmP_s.mjs");
    return getLessonProgressFn({ data: variables });
  },
  listByStudent: async (studentId) => {
    const { listLessonProgressByStudentFn } = await import("./lesson-progress-CsOCmP_s.mjs");
    return listLessonProgressByStudentFn({
      data: {
        studentId
      }
    });
  },
  update: async (variables) => {
    const { updateLessonProgressFn } = await import("./lesson-progress-CsOCmP_s.mjs");
    return updateLessonProgressFn({ data: variables });
  },
  markComplete: async (variables) => {
    const { markLessonCompleteFn } = await import("./lesson-progress-CsOCmP_s.mjs");
    return markLessonCompleteFn({ data: variables });
  }
};
async function serializeLessonResourceFile(file) {
  if (!file) {
    return void 0;
  }
  const dataUrl = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => {
      reject(reader.error ?? new Error("Failed to read resource file."));
    };
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("Failed to read resource file."));
        return;
      }
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
  return {
    dataUrl,
    name: file.name,
    size: file.size,
    type: file.type
  };
}
const lessonResource = {
  create: async (variables) => {
    const { createLessonResourceFn } = await import("./lesson-resources-aRs507e_.mjs");
    return createLessonResourceFn({
      data: {
        file: await serializeLessonResourceFile(variables.file),
        resourceData: variables.resourceData
      }
    });
  },
  delete: async (variables) => {
    const { deleteLessonResourceFn } = await import("./lesson-resources-aRs507e_.mjs");
    return deleteLessonResourceFn({ data: variables });
  },
  get: async (resourceId) => {
    const { getLessonResourceFn } = await import("./lesson-resources-aRs507e_.mjs");
    return getLessonResourceFn({ data: resourceId });
  },
  list: async (lessonId) => {
    const { listLessonResourcesFn } = await import("./lesson-resources-aRs507e_.mjs");
    return listLessonResourcesFn({ data: lessonId });
  },
  update: async (variables) => {
    const { updateLessonResourceFn } = await import("./lesson-resources-aRs507e_.mjs");
    return updateLessonResourceFn({
      data: {
        file: await serializeLessonResourceFile(variables.file),
        resourceData: variables.resourceData,
        resourceId: variables.resourceId
      }
    });
  }
};
const liveSessionStatusSchema = _enum([
  "active",
  "cancelled",
  "ended",
  "scheduled"
]);
const liveSessionSchema = object({
  courseId: string(),
  createdAt: number().default(() => Date.now()),
  description: string(),
  duration: number(),
  id: string(),
  instructorId: string(),
  instructorName: string(),
  jitsiMeetUrl: string(),
  maxParticipants: number().optional(),
  meetingId: string(),
  participants: array(string()).default([]),
  recordingUrl: string().optional(),
  scheduledAt: string(),
  status: liveSessionStatusSchema.default("scheduled"),
  tenantId: string(),
  title: string(),
  updatedAt: number().default(() => Date.now())
});
liveSessionSchema.pick({
  courseId: true,
  description: true,
  duration: true,
  instructorName: true,
  maxParticipants: true,
  scheduledAt: true,
  title: true
});
liveSessionSchema.pick({
  description: true,
  duration: true,
  maxParticipants: true,
  recordingUrl: true,
  scheduledAt: true,
  status: true,
  title: true
}).partial();
const liveSessions = {
  create: async (variables) => {
    const { createLiveSessionFn } = await import("./live-sessions-BvAlbNpA.mjs");
    return createLiveSessionFn({ data: variables });
  },
  delete: async (sessionId) => {
    const { deleteLiveSessionFn } = await import("./live-sessions-BvAlbNpA.mjs");
    return deleteLiveSessionFn({ data: sessionId });
  },
  find: async (sessionId) => {
    const { findLiveSessionFn } = await import("./live-sessions-BvAlbNpA.mjs");
    return findLiveSessionFn({ data: sessionId });
  },
  join: async (variables) => {
    const { joinLiveSessionFn } = await import("./live-sessions-BvAlbNpA.mjs");
    return joinLiveSessionFn({ data: variables });
  },
  leave: async (variables) => {
    const { leaveLiveSessionFn } = await import("./live-sessions-BvAlbNpA.mjs");
    return leaveLiveSessionFn({ data: variables });
  },
  list: async (filters = {}) => {
    const { listLiveSessionsFn } = await import("./live-sessions-BvAlbNpA.mjs");
    return listLiveSessionsFn({ data: filters });
  },
  update: async (variables) => {
    const { updateLiveSessionFn } = await import("./live-sessions-BvAlbNpA.mjs");
    return updateLiveSessionFn({ data: variables });
  }
};
const instructorSchema = object({
  biography: string().optional(),
  email: string().email().optional().or(literal("")),
  name: string().min(1, "Instructor name is required"),
  title: string().optional()
});
object({
  email: email("Invalid email address"),
  password: string().min(6, "Password must be at least 6 characters")
});
object({
  confirmPassword: string(),
  email: email("Invalid email address"),
  fullName: string().min(2, "Name must be at least 2 characters"),
  password: string().min(6, "Password must be at least 6 characters"),
  studentId: string().min(3, "Student ID must be at least 3 characters")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
const createCourseSchema = object({
  category: string().min(1, "Category is required"),
  description: string().min(10, "Description must be at least 10 characters"),
  difficulty: _enum(["beginner", "intermediate", "advanced"]),
  estimatedDurationInMinutes: number().min(0, "Duration must be a positive number"),
  featured: boolean().default(false),
  instructors: array(instructorSchema).min(1, "At least one instructor is required"),
  learningObjectives: array(string()).default([]),
  prerequisites: array(string()).default([]),
  price: number().min(0).default(0),
  published: boolean().default(false),
  shortDescription: string().optional(),
  tags: array(string()).default([]),
  thumbnailUrl: string().optional(),
  title: string().min(3, "Title must be at least 3 characters"),
  previewVideoUrl: string().min(1, "Video URL is required")
});
const createUserSchema = object({
  department: string().optional(),
  email: email("Invalid email address"),
  fullName: string().min(2, "Full name must be at least 2 characters"),
  location: string().optional(),
  role: _enum(["admin", "student"]),
  studentId: string().min(3, "Student ID must be at least 3 characters").optional().or(literal("")),
  temporaryPassword: string().min(8, "Password must be at least 8 characters")
});
object({
  difficulty: _enum(["beginner", "intermediate", "advanced"]).optional(),
  duration: string().optional(),
  learningPath: string().optional(),
  search: string().optional(),
  tags: array(string()).optional()
});
object({
  facility: string().optional(),
  learningPath: string().optional(),
  progress: _enum(["not-started", "in-progress", "completed"]).optional(),
  search: string().optional()
});
const updateProfileSchema = object({
  department: string().min(2, "Department is required"),
  displayName: string().min(2, "Name must be at least 2 characters"),
  location: string().optional()
});
const changePasswordSchema = object({
  confirmPassword: string(),
  currentPassword: string().min(1, "Current password is required"),
  newPassword: string().min(8, "New password must be at least 8 characters")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
const userPreferencesSchema = object({
  language: _enum(["en", "fr"]),
  notifications: boolean(),
  theme: _enum(["light", "dark"])
});
const createQuizSchema = object({
  courseId: string().min(1, "Course is required"),
  description: string().optional(),
  maxAttempts: number().min(1, "Max attempts must be at least 1").optional(),
  passingScore: number().min(0, "Passing score must be at least 0").max(100, "Passing score cannot exceed 100"),
  timeLimit: number().min(1, "Time limit must be at least 1 minute").optional(),
  title: string().min(1, "Quiz title is required")
});
object({
  courseId: string().min(1, "Please select a course"),
  description: string().min(1, "Session description is required"),
  duration: number().min(15, "Minimum duration is 15 minutes").max(480, "Maximum duration is 8 hours"),
  instructorName: string().min(1, "Instructor name is required"),
  maxParticipants: number().min(1).optional(),
  scheduledAt: union([string(), date()]),
  title: string().min(1, "Session title is required")
});
object({
  courseId: string().min(1, "Please select a course"),
  description: string().min(1, "Session description is required"),
  duration: number().min(15, "Minimum duration is 15 minutes").max(480, "Maximum duration is 8 hours"),
  instructorName: string().min(1, "Instructor name is required"),
  maxParticipants: number().min(1).optional(),
  scheduledAt: union([string(), date()]),
  status: _enum(["scheduled", "active", "ended", "cancelled"]),
  title: string().min(1, "Session title is required")
});
object({
  assignment: object({
    description: string(),
    dueDate: string().optional(),
    id: string(),
    instructions: string(),
    maxScore: number(),
    submissionType: _enum(["text", "file", "link"]),
    title: string()
  }).optional(),
  quiz: object({
    id: string(),
    passingScore: number().min(0).max(100),
    questions: array(any()),
    timeLimit: number().optional(),
    title: string()
  }).optional(),
  textContent: string().optional(),
  videoUrl: string().url().optional(),
  vimeoId: string().optional()
});
const sendMessageSchema = object({
  message: string().min(1, "Message is required"),
  subject: string().min(1, "Subject is required")
});
const createNotificationSchema = object({
  category: _enum(["message", "system", "achievement", "reminder"]),
  createdAt: any(),
  // Number (ms)
  fromUserId: string().optional(),
  fromUserName: string().optional(),
  isRead: boolean().default(false),
  message: string().min(1, "Message is required"),
  title: string().min(1, "Title is required"),
  userId: string().min(1, "User ID is required")
});
const notification = {
  create: async (notificationData) => {
    const validatedData = createNotificationSchema.parse(notificationData);
    const { createNotificationFn } = await import("./notifications-K5SNQ_tK.mjs");
    return createNotificationFn({ data: validatedData });
  },
  getUnreadCount: async (userId) => {
    const { getUnreadNotificationCountFn } = await import("./notifications-K5SNQ_tK.mjs");
    const result = await getUnreadNotificationCountFn({ data: userId });
    return result.count;
  },
  list: async (userId) => {
    const { listNotificationsFn } = await import("./notifications-K5SNQ_tK.mjs");
    return listNotificationsFn({ data: userId });
  },
  markAllAsRead: async (userId) => {
    const { markAllNotificationsAsReadFn } = await import("./notifications-K5SNQ_tK.mjs");
    return markAllNotificationsAsReadFn({ data: userId });
  },
  markAsRead: async (notificationId) => {
    const { markNotificationAsReadFn } = await import("./notifications-K5SNQ_tK.mjs");
    return markNotificationAsReadFn({ data: notificationId });
  }
};
const quizAttempt = {
  create: async (attemptData) => {
    const { createQuizAttemptFn } = await import("./quizzes-rf_n3yY8.mjs");
    return createQuizAttemptFn({ data: attemptData });
  },
  list: async (filters = {}) => {
    const { listQuizAttemptsFn } = await import("./quizzes-rf_n3yY8.mjs");
    return listQuizAttemptsFn({ data: filters });
  },
  update: async (variables) => {
    const { updateQuizAttemptFn } = await import("./quizzes-rf_n3yY8.mjs");
    return updateQuizAttemptFn({ data: variables });
  }
};
const sectionProgressSchema = object({
  completedAt: number().nullish(),
  completedLessons: array(string()),
  completedQuizzes: array(string()),
  courseId: string(),
  isCompleted: boolean(),
  lessonsCompleted: array(string()),
  // lesson IDs
  quizzesCompleted: array(string()),
  // quiz IDs
  sectionId: string(),
  timeSpent: number()
  // minutes spent in this section
});
object({
  averageScore: number(),
  certificatesEarned: number(),
  completionRate: number(),
  lastLoginAt: number(),
  lastUpdated: number(),
  learningPath: array(string()),
  loginStreak: number(),
  preferredLearningTime: string(),
  studentId: string(),
  totalCoursesCompleted: number(),
  totalCoursesEnrolled: number(),
  totalTimeSpent: number()
  // in minutes
});
const studentProgressSchema = object({
  averageQuizScore: number().default(0),
  completedAt: number().nullish(),
  completionPercentage: number().default(0),
  // 0-100
  courseId: string(),
  currentLessonId: string().optional(),
  currentLessonPosition: number().optional(),
  currentSectionId: string().optional(),
  enrolledAt: number().default(() => Date.now()),
  estimatedTimeRemaining: number().default(0),
  id: string(),
  lastAccessedAt: number().default(() => Date.now()),
  quizzesPassed: number().default(0),
  sectionProgress: array(sectionProgressSchema).default([]),
  startedAt: number().optional(),
  status: _enum(["completed", "dropped", "enrolled", "in-progress"]).default("enrolled"),
  studentId: string(),
  tenantId: string(),
  timeSpentMinutes: number().default(0),
  totalLessonsCompleted: number().default(0),
  totalOptionalLessonsCompleted: number().default(0),
  totalQuizzesTaken: number().default(0),
  totalRequiredLessons: number().default(0)
});
studentProgressSchema.pick({
  courseId: true,
  enrolledAt: true,
  studentId: true
});
studentProgressSchema.pick({
  completionPercentage: true,
  status: true,
  totalLessonsCompleted: true
});
const studentProgress = {
  create: async (progressData) => {
    const course2 = await api.$use.course.get(progressData.courseId);
    if (!course2?.tenantId) {
      throw new Error("A tenant id is required to create student progress.");
    }
    const { createStudentProgressFn } = await import("./student-progress-CyAFiIHW.mjs");
    return createStudentProgressFn({
      data: {
        ...progressData,
        tenantId: course2.tenantId
      }
    });
  },
  get: async (variables) => {
    const { getStudentProgressFn } = await import("./student-progress-CyAFiIHW.mjs");
    return getStudentProgressFn({ data: variables });
  },
  list: async (studentId, tenantId) => {
    if (!studentId) return [];
    const { listStudentProgressFn } = await import("./student-progress-CyAFiIHW.mjs");
    return listStudentProgressFn({
      data: {
        studentId,
        tenantId
      }
    });
  },
  update: async (variables) => {
    const { updateStudentProgressFn } = await import("./student-progress-CyAFiIHW.mjs");
    return updateStudentProgressFn({ data: variables });
  }
};
const tenant = {
  create: async (variables) => {
    const { createTenantFn: createTenantFn2 } = await Promise.resolve().then(() => tenants);
    return createTenantFn2({ data: variables });
  },
  get: async (tenantId) => {
    const { getTenantByIdFn: getTenantByIdFn2 } = await Promise.resolve().then(() => tenants);
    return getTenantByIdFn2({ data: tenantId });
  },
  list: async () => {
    const { listTenantsFn: listTenantsFn2 } = await Promise.resolve().then(() => tenants);
    return listTenantsFn2();
  },
  update: async (variables) => {
    const { updateTenantFn: updateTenantFn2 } = await Promise.resolve().then(() => tenants);
    return updateTenantFn2({ data: variables });
  }
};
function filterUsersBySearch(users, searchTerm) {
  if (!searchTerm) return users;
  const normalizedSearch = searchTerm.toLowerCase().trim();
  return users.filter((user2) => {
    const searchableFields = [
      user2.displayName,
      user2.email,
      user2.studentId
    ].filter(Boolean);
    return searchableFields.some(
      (field) => field?.toLowerCase().includes(normalizedSearch)
    );
  });
}
const userRoleSchema = _enum(["admin", "student", "super-admin"]);
object({
  certificatesEarned: number().nullish(),
  completedCourses: array(string()).nullish(),
  createdAt: number(),
  department: string().nullish(),
  displayName: string(),
  email: string(),
  enrolledCourses: array(string()).nullish(),
  isActive: boolean().nullish(),
  isPending: boolean().nullish(),
  lastLoginAt: number().nullish(),
  location: string().nullish(),
  photoURL: string(),
  preferences: object({
    language: string(),
    notifications: boolean(),
    theme: string()
  }).nullish(),
  role: userRoleSchema,
  studentId: string().nullish(),
  subscriptions: array(
    object({
      expiresAt: number(),
      plan: _enum(["monthly", "yearly"]),
      status: _enum(["active", "canceled", "past_due"]),
      tenantId: string()
    })
  ).nullish(),
  tenantIds: array(string()).nullish(),
  totalWatchTime: number().nullish(),
  uid: string(),
  updatedAt: number()
});
const user = {
  create: async (userData) => {
    const { createUserFn } = await import("./users-Bs_8L9yI.mjs");
    return createUserFn({ data: userData });
  },
  deactivate: async (userId) => {
    const { deactivateUserFn } = await import("./users-Bs_8L9yI.mjs");
    return deactivateUserFn({ data: userId });
  },
  delete: async (userId) => {
    const { deleteUserFn } = await import("./users-Bs_8L9yI.mjs");
    return deleteUserFn({ data: userId });
  },
  get: async (userId) => {
    if (!userId) {
      return null;
    }
    const { getUserFn } = await import("./users-Bs_8L9yI.mjs");
    return getUserFn({ data: userId });
  },
  list: async (tenantId, filters = {}) => {
    const { listUsersFn } = await import("./users-Bs_8L9yI.mjs");
    let users = await listUsersFn({
      data: {
        filters,
        tenantId: tenantId ?? null
      }
    });
    if (isDefined(filters.search) && Array.isArray(users)) {
      users = filterUsersBySearch(users, filters.search);
    }
    return users;
  },
  update: async (variables) => {
    const { userData, userId } = variables;
    const { updateUserFn } = await import("./users-Bs_8L9yI.mjs");
    return updateUserFn({
      data: {
        userData,
        userId
      }
    });
  },
  subscribeToTenant: async (variables) => {
    const { subscribeToTenantFn } = await import("./users-Bs_8L9yI.mjs");
    return subscribeToTenantFn({ data: variables });
  }
};
const api = createBuilder({
  activityLogs,
  auth: authService,
  certificates,
  course,
  courseLesson,
  courseProgress,
  courseQuiz,
  courseSection,
  dashboard,
  lessonProgress,
  lessonResource,
  liveSessions,
  notification,
  quiz,
  quizAttempt,
  studentProgress,
  tenant,
  user
});
function useCreateTenantOnboarding() {
  return useMutation({
    meta: {
      errorMessage: "Failed to create tenant and administrator invitation. Please try again.",
      successMessage: "Tenant and administrator invitation created successfully."
    },
    mutationFn: (variables) => createTenantOnboardingFn({ data: variables })
  });
}
function useTenantAdminInvitation(tenantId, token, options = {}, query = queryOptions({
  enabled: Boolean(tenantId && token),
  queryFn: () => getAdminInvitationPreviewFn({
    data: {
      tenantId,
      token
    }
  }),
  queryKey: ["tenant-admin-invitation", tenantId, token]
})) {
  return useQuery({ ...query, ...options });
}
function useTenantAdminInvitations(options = {}, query = queryOptions({
  queryFn: () => listTenantAdminInvitationsFn(),
  queryKey: ["tenant-admin-invitations"]
})) {
  return useQuery({ ...query, ...options });
}
function useReissueTenantAdminInvitation() {
  const queryClient2 = useQueryClient();
  return useMutation({
    meta: {
      errorMessage: "Failed to reissue administrator invitation.",
      successMessage: "Administrator invitation reissued successfully."
    },
    mutationFn: (variables) => reissueTenantAdminInvitationFn({ data: variables }),
    onSuccess: async (_result, variables) => {
      await queryClient2.invalidateQueries({
        queryKey: ["tenant-admin-invitations", variables.tenantId]
      });
    }
  });
}
function useRevokeTenantAdminInvitation() {
  const queryClient2 = useQueryClient();
  return useMutation({
    meta: {
      errorMessage: "Failed to revoke administrator invitation.",
      successMessage: "Administrator invitation revoked successfully."
    },
    mutationFn: (variables) => revokeTenantAdminInvitationFn({ data: variables }),
    onSuccess: async (_result, variables) => {
      await queryClient2.invalidateQueries({
        queryKey: ["tenant-admin-invitations", variables.tenantId]
      });
    }
  });
}
function useCourseProgress(courseId, studentId) {
  return useQuery({
    enabled: !!(courseId && studentId),
    queryFn: async () => {
      const result = await api.$use.studentProgress.get({
        courseId,
        studentId
      });
      return Array.isArray(result) ? result[0] ?? null : result;
    },
    queryKey: api.studentProgress.get.$use({ courseId, studentId })
  });
}
function useCourseWithStructure(courseId, options = {}, query = queryOptions({
  enabled: !!courseId,
  queryFn: () => api.$use.course.getWithStructure(courseId),
  queryKey: api.course.getWithStructure.$use(courseId)
})) {
  return useQuery({ ...query, ...options });
}
function useCreateCertificate() {
  return useMutation({
    meta: {
      errorMessage: "Failed to create certificate. Please try again.",
      successMessage: "Certificate created successfully."
    },
    mutationFn: api.$use.certificates.create
  });
}
function useCreateCourse() {
  return useMutation({
    meta: {
      errorMessage: "Failed to create course. Please try again.",
      successMessage: "Course created successfully."
    },
    mutationFn: api.$use.course.create
  });
}
function useCreateLesson() {
  return useMutation({
    meta: {
      errorMessage: "Failed to create lesson. Please try again.",
      successMessage: "Lesson created successfully."
    },
    mutationFn: api.$use.courseLesson.create
  });
}
function useCreateLessonResource() {
  return useMutation({
    meta: {
      errorMessage: "Failed to create resource. Please try again.",
      successMessage: "Resource created successfully."
    },
    mutationFn: api.$use.lessonResource.create
  });
}
function useCreateLiveSession() {
  const queryClient2 = useQueryClient();
  return useMutation({
    meta: {
      errorMessage: "Failed to create live session. Please try again.",
      successMessage: "Live session created successfully."
    },
    mutationFn: api.$use.liveSessions.create,
    onSuccess: async () => {
      await queryClient2.invalidateQueries({
        queryKey: api.liveSessions.list.$use()
      });
    }
  });
}
function useCreateNotification() {
  return useMutation({
    meta: {
      errorMessage: "Failed to send notification. Please try again.",
      successMessage: "Notification sent successfully."
    },
    mutationFn: api.$use.notification.create
  });
}
function useCreateQuiz() {
  return useMutation({
    meta: {
      errorMessage: "Failed to create quiz. Please try again.",
      successMessage: "Quiz created successfully."
    },
    mutationFn: api.$use.quiz.create
  });
}
function useCreateQuizAttempt() {
  return useMutation({
    meta: {
      errorMessage: "Failed to start quiz attempt. Please try again."
    },
    mutationFn: api.$use.quizAttempt.create
  });
}
function useCreateSection() {
  return useMutation({
    meta: {
      errorMessage: "Failed to create section. Please try again.",
      successMessage: "Section created successfully."
    },
    mutationFn: api.$use.courseSection.create
  });
}
function useCreateUser() {
  return useMutation({
    meta: {
      errorMessage: "Failed to create user. Please try again.",
      successMessage: "User created successfully."
    },
    mutationFn: api.$use.user.create
  });
}
function useCurrentUser(userId, options = {}, query = queryOptions({
  enabled: !!userId,
  queryFn: () => api.$use.auth.getCurrentUser(userId),
  queryKey: api.auth.getCurrentUser.$use(userId)
})) {
  return useQuery({ ...query, ...options });
}
function useDashboardMetrics(tenantId, options = {}, query = queryOptions({
  enabled: !!tenantId,
  queryFn: () => api.$use.dashboard.metrics(tenantId),
  queryKey: api.dashboard.metrics.$use(tenantId)
})) {
  return useQuery({ ...query, ...options });
}
function useDeleteCourse() {
  return useMutation({
    meta: {
      errorMessage: "Failed to delete course. Please try again.",
      successMessage: "Course deleted successfully."
    },
    mutationFn: api.$use.course.remove
  });
}
function useDeleteLesson() {
  return useMutation({
    meta: {
      errorMessage: "Failed to delete lesson. Please try again.",
      successMessage: "Lesson deleted successfully."
    },
    mutationFn: api.$use.courseLesson.delete
  });
}
function useDeleteLessonResource() {
  return useMutation({
    meta: {
      errorMessage: "Failed to delete resource. Please try again.",
      successMessage: "Resource deleted successfully."
    },
    mutationFn: api.$use.lessonResource.delete
  });
}
function useDeleteLiveSession() {
  const queryClient2 = useQueryClient();
  return useMutation({
    meta: {
      errorMessage: "Failed to delete live session. Please try again.",
      successMessage: "Live session deleted successfully."
    },
    mutationFn: api.$use.liveSessions.delete,
    onSuccess: async () => {
      await queryClient2.invalidateQueries({
        queryKey: api.liveSessions.list.$use()
      });
    }
  });
}
function useDeleteQuiz() {
  return useMutation({
    meta: {
      errorMessage: "Failed to delete quiz. Please try again.",
      successMessage: "Quiz deleted successfully."
    },
    mutationFn: api.$use.quiz.delete
  });
}
function useDeleteSection() {
  return useMutation({
    meta: {
      errorMessage: "Failed to delete section. Please try again.",
      successMessage: "Section deleted successfully."
    },
    mutationFn: api.$use.courseSection.delete
  });
}
function useDeleteUser() {
  return useMutation({
    meta: {
      errorMessage: "Failed to remove user access. Please try again.",
      successMessage: "User access removed successfully."
    },
    mutationFn: api.$use.user.delete
  });
}
function useEnrollInCourse() {
  return useMutation({
    meta: {
      errorMessage: "Failed to enroll in course. Please try again.",
      successMessage: "Successfully enrolled in course."
    },
    mutationFn: api.$use.course.enroll
  });
}
function useFindCertificate(certificateId) {
  return useQuery({
    enabled: !!certificateId,
    queryFn: () => api.$use.certificates.find(certificateId),
    queryKey: api.certificates.find.$use(certificateId)
  });
}
function useGetCertificates(studentId, tenantId, options = {}, query = queryOptions({
  enabled: !!studentId,
  queryFn: () => api.$use.certificates.get(studentId, tenantId),
  queryKey: api.certificates.get.$use(studentId, tenantId)
})) {
  return useQuery({ ...query, ...options });
}
function useJoinLiveSession() {
  const queryClient2 = useQueryClient();
  return useMutation({
    meta: {
      errorMessage: "Failed to join live session. Please try again.",
      successMessage: "Successfully joined the live session."
    },
    mutationFn: api.$use.liveSessions.join,
    onSuccess: async () => {
      await queryClient2.invalidateQueries({
        queryKey: api.liveSessions.list.$use()
      });
    }
  });
}
function useListActivityLogs(tenantId, userId) {
  return useQuery({
    enabled: !!userId && !!tenantId,
    queryFn: () => api.$use.activityLogs.list({ tenantId, userId }),
    queryKey: api.activityLogs.list.$use({ tenantId, userId })
  });
}
function usePlatformActivityLogs(filters = {}) {
  return useQuery({
    queryFn: () => listPlatformActivityLogsFn({
      data: {
        action: filters.action ?? void 0,
        limit: filters.limit,
        tenantId: filters.tenantId,
        userId: filters.userId
      }
    }),
    queryKey: ["platform-activity", filters]
  });
}
function useListCertificates(tenantId) {
  return useQuery({
    enabled: !!tenantId,
    queryFn: () => api.$use.certificates.list(tenantId),
    queryKey: api.certificates.list.$use(tenantId)
  });
}
function useListCourses(tenantId, filters, options = {}, query = queryOptions({
  enabled: !!tenantId,
  queryFn: () => api.$use.course.list(tenantId, filters),
  queryKey: api.course.list.$use(tenantId, filters)
})) {
  return useQuery({ ...query, ...options });
}
function useListLiveSessions(tenantId) {
  return useQuery({
    enabled: !!tenantId,
    queryFn: () => api.$use.liveSessions.list({ tenantId }),
    queryKey: api.liveSessions.list.$use({ tenantId })
  });
}
function useListStudentProgress(tenantId, studentId) {
  return useQuery({
    enabled: !!studentId && !!tenantId,
    queryFn: () => api.$use.studentProgress.list(studentId, tenantId),
    queryKey: api.studentProgress.list.$use(studentId, tenantId)
  });
}
function useMarkAllNotificationsAsRead() {
  return useMutation({
    meta: {
      errorMessage: "Failed to mark notifications as read.",
      successMessage: "All notifications marked as read."
    },
    mutationFn: api.$use.notification.markAllAsRead
  });
}
function useMarkLessonComplete() {
  return useMutation({
    meta: {
      successMessage: "Lesson marked as complete!"
    },
    mutationFn: api.$use.lessonProgress.markComplete
  });
}
function useMarkNotificationAsRead() {
  return useMutation({
    mutationFn: api.$use.notification.markAsRead
  });
}
function useNotifications(userId, options = {}, query = queryOptions({
  enabled: !!userId,
  queryFn: () => api.$use.notification.list(userId),
  queryKey: api.notification.list.$use(userId)
})) {
  return useQuery({ ...query, ...options });
}
function useQuiz(quizId, options = {}, query = queryOptions({
  enabled: !!quizId,
  queryFn: () => api.$use.quiz.get(quizId),
  queryKey: api.quiz.get.$use(quizId)
})) {
  return useQuery({ ...query, ...options });
}
function useQuizAttempts(filters, options = {}, query = queryOptions({
  queryFn: () => api.$use.quizAttempt.list(filters),
  queryKey: api.quizAttempt.list.$use(filters)
})) {
  return useQuery({ ...query, ...options });
}
function useQuizzes(courseId, options = {}, query = queryOptions({
  queryFn: () => api.$use.quiz.list(courseId),
  queryKey: api.quiz.list.$use(courseId)
})) {
  return useQuery({ ...query, ...options });
}
function useReorderSections() {
  return useMutation({
    meta: {
      errorMessage: "Failed to reorder sections. Please try again.",
      successMessage: "Sections reordered successfully."
    },
    mutationFn: api.$use.courseSection.reorder
  });
}
function useSessionData(options = {}, query = queryOptions({
  queryFn: api.$use.auth.session,
  queryKey: api.auth.session.$use()
})) {
  return useQuery({ ...query, ...options });
}
function useChangePassword() {
  return useMutation({
    meta: {
      errorMessage: "Failed to update password. Please try again.",
      successMessage: "Your password has been updated successfully."
    },
    mutationFn: api.$use.auth.changePassword
  });
}
function useAiHealth(options = {}, query = queryOptions({
  queryFn: async () => {
    const { getAiHealthFn } = await import("./ai-BKQ294uS.mjs");
    return getAiHealthFn();
  },
  queryKey: ["ai-health"],
  retry: false,
  staleTime: minutesToMilliseconds(10)
})) {
  return useQuery({ ...query, ...options });
}
function useAiChatThread(variables, options = {}, query = queryOptions({
  queryFn: () => aiStudy.getChatThread({
    courseId: variables.courseId,
    lessonId: variables.lessonId
  }),
  queryKey: ["ai-chat-thread", variables.courseId ?? null, variables.lessonId ?? null]
})) {
  return useQuery({ ...query, ...options });
}
function useGenerateAiPracticeQuiz() {
  return useMutation({
    meta: {
      errorMessage: "Failed to generate AI practice quiz.",
      successMessage: "AI practice quiz generated."
    },
    mutationFn: (variables) => aiStudy.generatePracticeQuiz(variables)
  });
}
function useListAiPracticeQuizSessions(courseId, options = {}, query = queryOptions({
  enabled: courseId !== void 0,
  queryFn: () => aiStudy.listPracticeQuizSessions(courseId),
  queryKey: ["ai-practice-sessions", courseId ?? null]
})) {
  return useQuery({ ...query, ...options });
}
function useSendAiChatMessage() {
  const queryClient2 = useQueryClient();
  return useMutation({
    meta: {
      errorMessage: "Failed to send AI message."
    },
    mutationFn: (variables) => aiStudy.sendChatMessage(variables),
    onSuccess: async (thread, variables) => {
      await queryClient2.setQueryData(
        ["ai-chat-thread", variables.courseId ?? null, variables.lessonId ?? null],
        thread
      );
    }
  });
}
function useSubmitAiPracticeQuiz() {
  const queryClient2 = useQueryClient();
  return useMutation({
    meta: {
      errorMessage: "Failed to submit AI practice quiz.",
      successMessage: "AI practice quiz submitted."
    },
    mutationFn: (variables) => aiStudy.submitPracticeQuiz(variables),
    onSuccess: async (session) => {
      await queryClient2.invalidateQueries({
        queryKey: ["ai-practice-sessions", session.courseId]
      });
    }
  });
}
function useResetUserPassword() {
  return useMutation({
    meta: {
      errorMessage: "Failed to reset password. Please try again.",
      successMessage: "Temporary password set successfully."
    },
    mutationFn: api.$use.auth.resetUserPassword
  });
}
function useSubscribeToTenant() {
  return useMutation({
    meta: {
      errorMessage: "Failed to subscribe to tenant. Please try again.",
      successMessage: "Subscribed to tenant successfully."
    },
    mutationFn: api.$use.user.subscribeToTenant
  });
}
function useSignOut() {
  const queryClient2 = useQueryClient();
  return useMutation({
    meta: {
      errorMessage: "Failed to sign out. Please try again.",
      successMessage: "You have been signed out successfully."
    },
    mutationFn: api.$use.auth.signOut,
    onSuccess: () => {
      queryClient2.clear();
    }
  });
}
function useSignInWithEmailAndPassword() {
  const navigate = useNavigate();
  return useMutation({
    meta: {
      errorMessage: "Failed to authenticate. Please verify your credentials."
    },
    mutationFn: (credentials) => api.$use.auth.signInWithEmailAndPassword({
      ...credentials,
      tenantId: extractTenantIdFromPath(window.location.pathname)
    }),
    onSuccess: (data) => {
      const tenantId = extractTenantIdFromPath(window.location.pathname) ?? data.userData.tenantIds?.[0];
      navigate({
        replace: true,
        ...resolveRoleHomeTarget(data.userData.role, tenantId)
      });
    }
  });
}
function useRedeemAdminInvitation() {
  const navigate = useNavigate();
  return useMutation({
    meta: {
      errorMessage: "Failed to accept the administrator invitation."
    },
    mutationFn: (variables) => redeemAdminInvitationFn({ data: variables }),
    onSuccess: (data) => {
      const tenantId = data.userData.tenantIds?.[0];
      navigate({
        replace: true,
        ...resolveRoleHomeTarget(data.userData.role, tenantId)
      });
    }
  });
}
function useUnreadNotificationsCount(userId, options = {}, query = queryOptions({
  enabled: !!userId,
  queryFn: () => api.$use.notification.getUnreadCount(userId),
  queryKey: api.notification.getUnreadCount.$use(userId)
})) {
  return useQuery({ ...query, ...options });
}
function useUpdateCertificate() {
  return useMutation({
    meta: {
      errorMessage: "Failed to update certificate. Please try again.",
      successMessage: "Certificate updated successfully."
    },
    mutationFn: api.$use.certificates.update
  });
}
function useUpdateCourse() {
  return useMutation({
    meta: {
      errorMessage: "Failed to update course. Please try again.",
      successMessage: "Course updated successfully."
    },
    mutationFn: api.$use.course.update
  });
}
function useUpdateLesson() {
  return useMutation({
    meta: {
      errorMessage: "Failed to update lesson. Please try again.",
      successMessage: "Lesson updated successfully."
    },
    mutationFn: api.$use.courseLesson.update
  });
}
function useUpdateLessonResource() {
  return useMutation({
    meta: {
      errorMessage: "Failed to update resource. Please try again.",
      successMessage: "Resource updated successfully."
    },
    mutationFn: api.$use.lessonResource.update
  });
}
function useUpdateLiveSession() {
  const queryClient2 = useQueryClient();
  return useMutation({
    meta: {
      errorMessage: "Failed to update live session. Please try again.",
      successMessage: "Live session updated successfully."
    },
    mutationFn: api.$use.liveSessions.update,
    onSuccess: async () => {
      await queryClient2.invalidateQueries({
        queryKey: api.liveSessions.list.$use()
      });
    }
  });
}
function useUpdateQuiz() {
  return useMutation({
    meta: {
      errorMessage: "Failed to update quiz. Please try again.",
      successMessage: "Quiz updated successfully."
    },
    mutationFn: api.$use.quiz.update
  });
}
function useUpdateQuizAttempt() {
  return useMutation({
    meta: {
      errorMessage: "Failed to update quiz attempt. Please try again.",
      successMessage: "Quiz attempt updated successfully."
    },
    mutationFn: api.$use.quizAttempt.update
  });
}
function useUpdateSection() {
  return useMutation({
    meta: {
      errorMessage: "Failed to update section. Please try again.",
      successMessage: "Section updated successfully."
    },
    mutationFn: api.$use.courseSection.update
  });
}
function useUpdateUser() {
  return useMutation({
    meta: {
      errorMessage: "Failed to update user. Please try again.",
      successMessage: "User updated successfully."
    },
    mutationFn: api.$use.user.update
  });
}
function useUser(userId, options = {}, query = queryOptions({
  enabled: !!userId,
  queryFn: () => api.$use.user.get(userId),
  queryKey: api.user.get.$use(userId)
})) {
  return useQuery({ ...query, ...options });
}
function useUserProgress(tenantId, userId, options = {}, query = queryOptions({
  enabled: !!userId && !!tenantId,
  queryFn: () => api.$use.studentProgress.list(userId, tenantId),
  queryKey: api.studentProgress.list.$use(userId, tenantId)
})) {
  return useQuery({ ...query, ...options });
}
function useUsers(tenantId, filters, options = {}, query = queryOptions({
  enabled: tenantId !== void 0,
  queryFn: () => api.$use.user.list(tenantId ?? void 0, filters),
  queryKey: api.user.list.$use(tenantId ?? void 0, filters)
})) {
  return useQuery({ ...query, ...options });
}
function useTenants(options = {}, query = queryOptions({
  queryFn: () => api.$use.tenant.list(),
  queryKey: api.tenant.list.$use()
})) {
  return useQuery({ ...query, ...options });
}
function useUpdateTenant() {
  return useMutation({
    meta: {
      errorMessage: "Failed to update tenant. Please try again.",
      successMessage: "Tenant updated successfully."
    },
    mutationFn: api.$use.tenant.update
  });
}
function useUpdatePlatformConfig() {
  return useMutation({
    meta: {
      errorMessage: "Failed to update platform configuration. Please try again.",
      successMessage: "Platform configuration updated successfully."
    },
    mutationFn: (config) => updatePlatformConfig({ data: config })
  });
}
const AuthContext = reactExports.createContext(null);
function useBootstrappedAuthState() {
  const { data: sessionData, isLoading: sessionLoading } = useSessionData();
  const [sessionStartTime, setSessionStartTime] = reactExports.useState();
  const loggedSessionUidRef = reactExports.useRef(null);
  const session = sessionData ?? null;
  const sessionUid = session?.uid ?? null;
  const { data: user2, isLoading: userDataLoading } = useCurrentUser(sessionUid);
  reactExports.useEffect(() => {
    if (!sessionUid) {
      loggedSessionUidRef.current = null;
      setSessionStartTime(void 0);
      return;
    }
    if (loggedSessionUidRef.current === sessionUid) {
      return;
    }
    loggedSessionUidRef.current = sessionUid;
    setSessionStartTime(Date.now());
    void createActivityLogFn({
      data: {
        action: "login",
        method: "session_restore",
        userId: sessionUid
      }
    }).catch((error) => {
      console.error("Failed to log activity", error);
      loggedSessionUidRef.current = null;
    });
  }, [sessionUid]);
  return reactExports.useMemo(
    () => ({
      loading: sessionLoading || !!sessionUid && userDataLoading,
      session,
      sessionStartTime,
      user: user2 || null
    }),
    [
      session,
      sessionLoading,
      sessionStartTime,
      sessionUid,
      user2,
      userDataLoading
    ]
  );
}
function useResolvedAuthState(tenant2) {
  const bootstrapState = useBootstrappedAuthState();
  const tenantId = tenant2?.id;
  const memberTenantIds = bootstrapState.user?.tenantIds ?? bootstrapState.session?.tenantIds ?? [];
  const hasTenantAccess = !tenantId || bootstrapState.user?.role === "super-admin" || memberTenantIds.includes(tenantId);
  return reactExports.useMemo(
    () => ({
      ...bootstrapState,
      hasTenantAccess,
      isAuthenticated: Boolean(
        bootstrapState.session?.uid && bootstrapState.user
      ),
      tenant: tenant2
    }),
    [bootstrapState, hasTenantAccess, tenant2]
  );
}
function AuthScope({ children, value }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AuthContext, { value, children });
}
function useAuthContext() {
  const context = reactExports.use(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
function NotFound() {
  const { loading, session, user: user2 } = useResolvedAuthState();
  const tenantId = typeof window === "undefined" ? session?.tenantIds?.[0] : extractTenantIdFromPath(window.location.pathname) ?? session?.tenantIds?.[0];
  if (loading) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { replace: true, ...resolveRoleHomeTarget(user2?.role, tenantId) });
}
function showErrorNotification(options) {
  notifications.show({
    autoClose: options.autoClose ?? 7e3,
    color: "red",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 16 }),
    message: options.message,
    title: options.title,
    withCloseButton: options.withCloseButton ?? true
  });
}
function showInfoNotification(options) {
  notifications.show({
    autoClose: options.autoClose ?? 5e3,
    color: "blue",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconInfoCircle, { size: 16 }),
    message: options.message,
    title: options.title,
    withCloseButton: options.withCloseButton ?? true
  });
}
function showSuccessNotification(options) {
  notifications.show({
    autoClose: options.autoClose ?? 5e3,
    color: "green",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: 16 }),
    message: options.message,
    title: options.title,
    withCloseButton: options.withCloseButton ?? true
  });
}
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: minutesToMilliseconds(5)
    }
  },
  mutationCache: new MutationCache({
    onError: (_error, _variables, _context, mutation) => {
      if (mutation.meta?.errorMessage) {
        showErrorNotification({
          message: mutation.meta.errorMessage
        });
      }
    },
    onSettled: (_data, _error, _variables, _context, mutation) => {
      if (mutation.meta?.infoMessage) {
        showInfoNotification({
          message: mutation.meta.infoMessage
        });
      }
    },
    onSuccess: (_data, _variables, _context, mutation) => {
      queryClient.invalidateQueries({
        predicate(query) {
          return query.options.staleTime !== Number.POSITIVE_INFINITY;
        }
      });
      if (mutation.meta?.successMessage) {
        showSuccessNotification({
          message: mutation.meta.successMessage
        });
      }
    }
  })
});
const theme = createTheme({
  colors: {
    "chalet-green": [
      "#f6f8ed",
      "#e9f0d7",
      "#d5e2b4",
      "#b8ce88",
      "#9db962",
      "#7f9e44",
      "#627d33",
      "#4f642c",
      "#3e4e26",
      "#374324",
      "#1b240f"
    ],
    "fun-green": [
      "#f1fcf4",
      "#defae7",
      "#bff3cf",
      "#8de8ab",
      "#54d47f",
      "#2dba5c",
      "#209949",
      "#1b7339",
      "#1b6033",
      "#184f2c",
      "#082b15"
    ]
  },
  primaryColor: "fun-green"
});
function RootLayout() {
  reactExports.useLayoutEffect(() => {
    Aos.init({
      duration: 300,
      easing: "ease-in-out",
      mirror: false,
      once: true
    });
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", ...mantineHtmlProps, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ColorSchemeScript, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(MantineProvider, { theme, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Notifications, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ModalsProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ReactQueryDevtools2, { buttonPosition: "bottom-left" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TanStackRouterDevtools, { position: "bottom-right" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
const styles = "/assets/index-C7jmmnaM.css";
function generateHeadContent() {
  return {
    links: [
      { href: styles, rel: "stylesheet" },
      {
        href: "/apple-touch-icon.png",
        rel: "apple-touch-icon",
        sizes: "180x180"
      },
      {
        href: "/favicon-32x32.png",
        rel: "icon",
        sizes: "32x32",
        type: "image/png"
      },
      {
        href: "/favicon-16x16.png",
        rel: "icon",
        sizes: "16x16",
        type: "image/png"
      },
      { color: "#fffff", href: "/site.webmanifest", rel: "manifest" },
      { href: "/favicon.ico", rel: "icon" },
      {
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap",
        rel: "stylesheet"
      },
      {
        href: "https://fonts.googleapis.com",
        rel: "preconnect"
      },
      {
        crossOrigin: "anonymous",
        href: "https://fonts.gstatic.com",
        rel: "preconnect"
      }
    ],
    meta: [
      {
        charSet: "utf-8"
      },
      {
        content: "width=device-width, initial-scale=1",
        name: "viewport"
      }
    ]
  };
}
const Route$L = createRootRouteWithContext()({
  component: RootLayout,
  errorComponent: ErrorBoundary,
  head: generateHeadContent,
  notFoundComponent: NotFound
});
const $$splitComponentImporter$K = () => import("./verify-certificate-DekpMMtl.mjs");
const Route$K = createFileRoute("/verify-certificate")({
  component: lazyRouteComponent($$splitComponentImporter$K, "component")
});
const $$splitComponentImporter$J = () => import("./super-admin-BLpAYyNq.mjs");
const Route$J = createFileRoute("/super-admin")({
  component: lazyRouteComponent($$splitComponentImporter$J, "component")
});
const $$splitComponentImporter$I = () => import("./login-CD9ckFhI.mjs");
const Route$I = createFileRoute("/login")({
  beforeLoad: async () => {
    const platform = await getPlatformConfig();
    return {
      platform
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$I, "component")
});
const getTenant = createServerFn({
  method: "GET"
}).inputValidator(tenantLookupSchema).handler(createSsrRpc("aebbcdc9cb4e1c1fa242ff0c7252cc0087d16225a06405d60fbbcc45b664042c"));
const $$splitErrorComponentImporter = () => import("../_tenant-D4Z3zteG.mjs");
const $$splitComponentImporter$H = () => import("../_tenant-B7Km66uq.mjs");
const Route$H = createFileRoute("/$tenant")({
  beforeLoad: async ({
    params
  }) => {
    const tenant2 = await getTenant({
      data: params.tenant
    });
    if (!tenant2) {
      throw new Error(`Tenant '${params.tenant}' was not found.`);
    }
    return {
      tenant: tenant2
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$H, "component"),
  errorComponent: lazyRouteComponent($$splitErrorComponentImporter, "errorComponent")
});
const $$splitComponentImporter$G = () => import("./index-DfJRtoD6.mjs");
const Route$G = createFileRoute("/")({
  beforeLoad: async () => {
    const platform = await getPlatformConfig();
    return {
      platform
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$G, "component")
});
const $$splitComponentImporter$F = () => import("./index-eMHl4ZOj.mjs");
const Route$F = createFileRoute("/super-admin/")({
  component: lazyRouteComponent($$splitComponentImporter$F, "component")
});
const $$splitComponentImporter$E = () => import("./index-CoGr3wtp.mjs");
const Route$E = createFileRoute("/$tenant/")({
  component: lazyRouteComponent($$splitComponentImporter$E, "component")
});
const $$splitComponentImporter$D = () => import("./tenants-CcM7UfSa.mjs");
const Route$D = createFileRoute("/super-admin/tenants")({
  component: lazyRouteComponent($$splitComponentImporter$D, "component")
});
const $$splitComponentImporter$C = () => import("./telemetry-nUv2A6AY.mjs");
const Route$C = createFileRoute("/super-admin/telemetry")({
  component: lazyRouteComponent($$splitComponentImporter$C, "component")
});
const $$splitComponentImporter$B = () => import("./settings-2G4mvTCY.mjs");
const Route$B = createFileRoute("/super-admin/settings")({
  beforeLoad: async () => {
    const platform = await getPlatformConfig();
    return {
      platform
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$B, "component")
});
const $$splitComponentImporter$A = () => import("./invitations-DPtrv2E_.mjs");
const Route$A = createFileRoute("/super-admin/invitations")({
  component: lazyRouteComponent($$splitComponentImporter$A, "component")
});
const $$splitComponentImporter$z = () => import("./identities-DI2cZmTt.mjs");
const Route$z = createFileRoute("/super-admin/identities")({
  component: lazyRouteComponent($$splitComponentImporter$z, "component")
});
const $$splitComponentImporter$y = () => import("./student-B_-I1sYQ.mjs");
const Route$y = createFileRoute("/$tenant/student")({
  component: lazyRouteComponent($$splitComponentImporter$y, "component")
});
const $$splitComponentImporter$x = () => import("./login-DNmryLxG.mjs");
const Route$x = createFileRoute("/$tenant/login")({
  validateSearch: object({
    invite: string().optional(),
    redirect: string().optional()
  }),
  component: lazyRouteComponent($$splitComponentImporter$x, "component")
});
const $$splitComponentImporter$w = () => import("./admin-e9zwJN_F.mjs");
const Route$w = createFileRoute("/$tenant/admin")({
  component: lazyRouteComponent($$splitComponentImporter$w, "component")
});
const $$splitComponentImporter$v = () => import("./index-BdF7ECx7.mjs");
const Route$v = createFileRoute("/$tenant/student/")({
  component: lazyRouteComponent($$splitComponentImporter$v, "component")
});
const $$splitComponentImporter$u = () => import("./index-CIpSEFHZ.mjs");
const Route$u = createFileRoute("/$tenant/admin/")({
  component: lazyRouteComponent($$splitComponentImporter$u, "component")
});
const $$splitComponentImporter$t = () => import("./progress-DzS7EYWj.mjs");
const Route$t = createFileRoute("/$tenant/student/progress")({
  component: lazyRouteComponent($$splitComponentImporter$t, "component")
});
const $$splitComponentImporter$s = () => import("./profile-fZAKXv_F.mjs");
const Route$s = createFileRoute("/$tenant/student/profile")({
  component: lazyRouteComponent($$splitComponentImporter$s, "component")
});
const $$splitComponentImporter$r = () => import("./live-sessions-BG4KXh9y.mjs");
const Route$r = createFileRoute("/$tenant/student/live-sessions")({
  component: lazyRouteComponent($$splitComponentImporter$r, "component")
});
function PendingOverlay({
  instruction,
  reason,
  visible
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    LoadingOverlay,
    {
      color: "fun-green",
      loaderProps: {
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Center, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { color: "fun-green", size: "lg" }),
          reason && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, size: "lg", children: reason }),
          instruction && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", ta: "center", children: instruction })
        ] }) })
      },
      visible
    }
  );
}
const $$splitComponentImporter$q = () => import("./courses-BgVOVkJU.mjs");
const Route$q = createFileRoute("/$tenant/student/courses")({
  component: lazyRouteComponent($$splitComponentImporter$q, "component")
});
function CourseCatalog() {
  const {
    tenant: tenant2
  } = Route$q.useRouteContext();
  const {
    user: user2
  } = useAuthContext();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [difficultyFilter, setDifficultyFilter] = reactExports.useState(null);
  const [categoryFilter, setCategoryFilter] = reactExports.useState(null);
  const {
    data: courses = [],
    isLoading
  } = useListCourses(tenant2.id, {
    category: categoryFilter || void 0,
    difficulty: difficultyFilter || void 0,
    search: searchQuery || void 0
  });
  const {
    data: userProgress = []
  } = useUserProgress(tenant2.id, user2?.uid);
  const enrollMutation = useEnrollInCourse();
  console.log("userProgress", userProgress);
  console.log("enrolled courses", user2);
  const isEnrolled = (courseId) => {
    return user2?.enrolledCourses?.includes(courseId) || false;
  };
  const getCourseProgress = (courseId) => {
    const progress = userProgress.find((p) => p.courseId === courseId);
    return progress?.completionPercentage || 0;
  };
  const getCourseStats = (course2) => {
    const sections = course2.sections || [];
    const totalLessons = course2.totalLessons || sections.reduce((acc, section) => acc + (section.lessons?.length || 0), 0);
    const totalDuration = sections.reduce((acc, section) => acc + (section.lessons?.reduce((lessonAcc, lesson) => lessonAcc + (lesson.estimatedDuration || 0), 0) || 0), 0);
    return {
      lessonCount: totalLessons,
      sectionCount: sections.length,
      totalDurationHours: Math.floor((course2.estimatedDurationInMinutes || totalDuration) / 60),
      totalDurationMinutes: course2.estimatedDurationInMinutes || totalDuration
    };
  };
  const filteredCourses = courses.filter((course2) => {
    const matchesSearch = course2.title.toLowerCase().includes(searchQuery.toLowerCase()) || course2.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = !difficultyFilter || course2.difficulty === difficultyFilter;
    const matchesCategory = !categoryFilter || course2.category === categoryFilter;
    return matchesSearch && matchesDifficulty && matchesCategory && course2.published;
  }).sort((a, b) => {
    const aEnrolled = isEnrolled(a.id);
    const bEnrolled = isEnrolled(b.id);
    if (aEnrolled && !bEnrolled) return -1;
    if (!aEnrolled && bEnrolled) return 1;
    return a.title.localeCompare(b.title);
  });
  const categories = Array.from(new Set(courses.map((course2) => course2.category)));
  const difficulties = ["beginner", "intermediate", "advanced"];
  function handleEnroll(courseId) {
    if (!user2?.uid) return;
    enrollMutation.mutate({
      courseId,
      studentId: user2.uid,
      tenantId: tenant2.id || ""
    }, {
      onError: (error) => {
        notifications.show({
          color: "red",
          message: error.message || "Failed to enroll in course. Please try again.",
          title: "Enrollment Failed"
        });
      },
      onSuccess: () => {
        notifications.show({
          color: "green",
          message: "You have been successfully enrolled in the course!",
          title: "Enrollment Successful"
        });
      }
    });
  }
  function handleContinue(courseId) {
    if (!tenant2.id) return;
    navigate({
      params: {
        courseId,
        tenant: tenant2.id
      },
      to: "/$tenant/student/courses/$courseId"
    });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PendingOverlay, { reason: "Loading courses...", visible: isLoading });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-6 mb-8 bg-white border rounded-lg shadow-sm border-stone-200", "data-aos": "fade-up", "data-aos-duration": "300", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-2 text-gray-800", order: 1, children: "Course Catalog" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "lg", children: "Discover new skills and advance your career with our comprehensive courses" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 6
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSearch, { size: 16 }), onChange: (event) => setSearchQuery(event.currentTarget.value), placeholder: "Search courses...", value: searchQuery }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { clearable: true, data: difficulties.map((diff) => ({
        label: diff.charAt(0).toUpperCase() + diff.slice(1),
        value: diff
      })), onChange: setDifficultyFilter, placeholder: "Difficulty", value: difficultyFilter }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { clearable: true, data: categories.map((cat) => ({
        label: cat,
        value: cat
      })), onChange: setCategoryFilter, placeholder: "Category", value: categoryFilter }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleGrid, { cols: {
      base: 1,
      lg: 3,
      sm: 2
    }, spacing: "lg", children: filteredCourses.map((course2, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-delay": index * 100, "data-aos-duration": "500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "h-full", p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", h: "100%", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-lg aspect-video bg-linear-to-br from-fun-green-100 to-fun-green-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-12 h-12 rounded-full bg-fun-green-600", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlayerPlay, { className: "text-white", size: 20 }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 right-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: course2.difficulty === "beginner" ? "green" : course2.difficulty === "intermediate" ? "yellow" : "red", size: "sm", variant: "filled", children: course2.difficulty }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-2 text-gray-800", order: 4, children: course2.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mb-3 text-gray-600", lineClamp: 2, size: "sm", children: course2.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "lg", mb: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconBooks, { className: "text-gray-500", size: 14 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-gray-600", size: "xs", children: [
              getCourseStats(course2).sectionCount,
              " sections"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconListCheck, { className: "text-gray-500", size: 14 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-gray-600", size: "xs", children: [
              getCourseStats(course2).lessonCount,
              " lessons"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { className: "text-gray-500", size: 14 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-gray-600", size: "xs", children: [
              getCourseStats(course2).totalDurationHours,
              "h"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mb-3 text-gray-700", fw: 500, size: "sm", children: course2.instructors?.map(({
          name
        }) => name).join(", ") || "No instructor assigned" }),
        isEnrolled(course2.id) && getCourseProgress(course2.id) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "xs", children: "Progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-fun-green-600", fw: 500, size: "xs", children: [
              getCourseProgress(course2.id),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { color: "fun-green", size: "sm", value: getCourseProgress(course2.id) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: isEnrolled(course2.id) ? "bg-fun-green-600 hover:bg-fun-green-700" : "bg-gray-800 hover:bg-gray-700", fullWidth: true, loading: enrollMutation.isPending, onClick: () => isEnrolled(course2.id) ? handleContinue(course2.id) : handleEnroll(course2.id), size: "md", children: isEnrolled(course2.id) ? getCourseProgress(course2.id) > 0 ? "Continue Learning" : "Start Course" : "Enroll Now" })
    ] }) }) }, course2.id)) }),
    filteredCourses.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "py-12 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-500", size: "lg", children: "No courses found matching your criteria" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "mt-4", onClick: () => {
        setSearchQuery("");
        setDifficultyFilter(null);
        setCategoryFilter(null);
      }, variant: "light", children: "Clear Filters" })
    ] })
  ] }) }) });
}
const $$splitComponentImporter$p = () => import("./ai-D51bBgth.mjs");
const Route$p = createFileRoute("/$tenant/student/ai")({
  component: lazyRouteComponent($$splitComponentImporter$p, "component"),
  validateSearch: (search) => ({
    courseId: typeof search.courseId === "string" ? search.courseId : void 0
  })
});
const $$splitComponentImporter$o = () => import("./users-hdlc17Rz.mjs");
const Route$o = createFileRoute("/$tenant/admin/users")({
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("./settings-DO8uzFfF.mjs");
const Route$n = createFileRoute("/$tenant/admin/settings")({
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("./security-DoW0Scs4.mjs");
const Route$m = createFileRoute("/$tenant/admin/security")({
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./quizzes-hdlc17Rz.mjs");
const Route$l = createFileRoute("/$tenant/admin/quizzes")({
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./profile-CUwoC-EW.mjs");
const Route$k = createFileRoute("/$tenant/admin/profile")({
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./live-sessions-DndQDDo_.mjs");
const Route$j = createFileRoute("/$tenant/admin/live-sessions")({
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./courses-hdlc17Rz.mjs");
const Route$i = createFileRoute("/$tenant/admin/courses")({
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./certificates-8twUAeno.mjs");
const Route$h = createFileRoute("/$tenant/admin/certificates")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./analytics-CPXn3oWL.mjs");
const Route$g = createFileRoute("/$tenant/admin/analytics")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./index-RS0_qtlW.mjs");
const Route$f = createFileRoute("/$tenant/student/courses/")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./index-BoxznDJ3.mjs");
const Route$e = createFileRoute("/$tenant/admin/users/")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./index-CxxUyn4l.mjs");
const Route$d = createFileRoute("/$tenant/admin/quizzes/")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./index-CLVXDwKB.mjs");
const Route$c = createFileRoute("/$tenant/admin/courses/")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(utc);
const DATE_PICKER_PRESETS = [
  {
    label: "Yesterday",
    value: dayjs().subtract(1, "day").format("YYYY-MM-DD HH:mm:ss")
  },
  { label: "Today", value: dayjs().format("YYYY-MM-DD HH:mm:ss") },
  {
    label: "Tomorrow",
    value: dayjs().add(1, "day").format("YYYY-MM-DD HH:mm:ss")
  },
  {
    label: "Next month",
    value: dayjs().add(1, "month").format("YYYY-MM-DD HH:mm:ss")
  },
  {
    label: "Next year",
    value: dayjs().add(1, "year").format("YYYY-MM-DD HH:mm:ss")
  },
  {
    label: "Last month",
    value: dayjs().subtract(1, "month").format("YYYY-MM-DD HH:mm:ss")
  },
  {
    label: "Last year",
    value: dayjs().subtract(1, "year").format("YYYY-MM-DD HH:mm:ss")
  }
];
function formatDate(timestamp, format = "MMMM D, YYYY") {
  const date2 = toDate(timestamp);
  return date2 ? dayjs(date2).format(format) : "";
}
function formatDateInput(timestamp) {
  const date2 = toDate(timestamp);
  return date2 ? dayjs(date2).format("YYYY-MM-DD HH:mm:ss") : "";
}
function formatDateTime(timestamp) {
  const date2 = toDate(timestamp);
  return date2 ? dayjs(date2).format("MMM DD, YYYY [at] h:mm A") : "";
}
function formatRelativeTime(timestamp) {
  const date2 = toDate(timestamp);
  return date2 ? dayjs(date2).fromNow() : "";
}
function formatStudyTime(minutes) {
  return dayjs.duration(minutes, "minutes").humanize();
}
function formatTime(seconds) {
  const hours = dayjs.duration(seconds, "s").hours();
  return dayjs.utc(seconds * 1e3).format(hours ? "H:mm:ss" : "m:ss");
}
function toDate(timestamp) {
  if (!timestamp) return null;
  if (typeof timestamp === "number") {
    return new Date(timestamp);
  }
  return timestamp instanceof Date ? timestamp : new Date(timestamp);
}
function UniversalVideoPlayer({
  autoPlay = false,
  onComplete,
  onProgress,
  onTimeUpdate,
  startTime = 0,
  videoUrl
}) {
  const videoRef = reactExports.useRef(null);
  const containerRef = reactExports.useRef(null);
  const controlsTimeoutRef = reactExports.useRef(null);
  const [state, setState] = reactExports.useState({
    currentTime: 0,
    duration: 0,
    isFullscreen: false,
    isLoading: true,
    isMuted: false,
    isPlaying: false,
    showControls: true,
    volume: 1
  });
  const getVideoType = reactExports.useCallback((url) => {
    if (url.includes("youtube.com") || url.includes("youtu.be")) {
      return "youtube";
    }
    if (url.includes("vimeo.com")) {
      return "vimeo";
    }
    if (url.includes("dailymotion.com")) {
      return "dailymotion";
    }
    return "direct";
  }, []);
  const extractVideoId = reactExports.useCallback((url, platform2) => {
    switch (platform2) {
      case "dailymotion":
        const dailymotionMatch = url.match(
          /dailymotion\.com\/video\/([a-zA-Z0-9]+)/
        );
        return dailymotionMatch ? dailymotionMatch[1] : null;
      case "vimeo":
        const vimeoMatch = url.match(/vimeo\.com\/(?:.*\/)?(\d+)/);
        return vimeoMatch ? vimeoMatch[1] : null;
      case "youtube":
        const youtubeMatch = url.match(
          /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
        );
        return youtubeMatch ? youtubeMatch[1] : null;
      default:
        return url;
    }
  }, []);
  const getEmbedUrl = reactExports.useCallback(
    (url) => {
      const platform2 = getVideoType(url);
      const videoId = extractVideoId(url, platform2);
      if (!videoId) return url;
      switch (platform2) {
        case "dailymotion":
          return `https://www.dailymotion.com/embed/video/${videoId}?api=postMessage`;
        case "vimeo":
          return `https://player.vimeo.com/video/${videoId}?api=1`;
        case "youtube":
          return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`;
        default:
          return url;
      }
    },
    [getVideoType, extractVideoId]
  );
  const togglePlayPause = reactExports.useCallback(() => {
    if (!videoRef.current) return;
    if (state.isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }, [state.isPlaying]);
  const toggleMute = reactExports.useCallback(() => {
    if (!videoRef.current) return;
    const newMuted = !state.isMuted;
    videoRef.current.muted = newMuted;
    setState((prev) => ({ ...prev, isMuted: newMuted }));
  }, [state.isMuted]);
  const handleSeek = reactExports.useCallback((newTime) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = newTime;
    setState((prev) => ({ ...prev, currentTime: newTime }));
  }, []);
  const skipTime = reactExports.useCallback(
    (seconds) => {
      if (!videoRef.current) return;
      const newTime = Math.max(
        0,
        Math.min(state.duration, state.currentTime + seconds)
      );
      handleSeek(newTime);
    },
    [state.currentTime, state.duration, handleSeek]
  );
  const showControlsTemporarily = reactExports.useCallback(() => {
    setState((prev) => ({ ...prev, showControls: true }));
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      setState((prev) => ({ ...prev, showControls: false }));
    }, 3e3);
  }, []);
  reactExports.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const handleLoadedMetadata = () => {
      setState((prev) => ({
        ...prev,
        duration: video.duration,
        isLoading: false
      }));
      if (startTime > 0 && startTime < video.duration) {
        video.currentTime = startTime;
      }
    };
    const handleTimeUpdate = () => {
      const currentTime = video.currentTime;
      const duration2 = video.duration || 0;
      setState((prev) => ({ ...prev, currentTime }));
      if (onProgress && duration2 > 0) {
        onProgress(currentTime / duration2 * 100);
      }
      if (onTimeUpdate) {
        onTimeUpdate(currentTime, duration2);
      }
    };
    const handlePlay = () => {
      setState((prev) => ({ ...prev, isPlaying: true }));
    };
    const handlePause = () => {
      setState((prev) => ({ ...prev, isPlaying: false }));
    };
    const handleEnded = () => {
      setState((prev) => ({ ...prev, isPlaying: false }));
      if (onComplete) {
        onComplete();
      }
    };
    const handleError = () => {
      setState((prev) => ({
        ...prev,
        error: "Video failed to load. Please check your connection and try again.",
        isLoading: false
      }));
    };
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);
    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, [startTime, onProgress, onTimeUpdate, onComplete]);
  reactExports.useEffect(() => {
    if (autoPlay && videoRef.current && !state.isLoading) {
      videoRef.current.play().catch(() => {
        console.log("Auto-play prevented by browser");
      });
    }
  }, [autoPlay, state.isLoading]);
  reactExports.useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);
  const platform = getVideoType(videoUrl);
  const progress = state.duration > 0 ? state.currentTime / state.duration * 100 : 0;
  if (!videoUrl) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "overflow-hidden bg-black", p: 0, radius: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex items-center justify-center aspect-video bg-gray-900", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-400", size: "sm", children: "No video available" }) }) });
  }
  if (platform !== "direct") {
    const embedUrl = getEmbedUrl(videoUrl);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Card,
      {
        className: "overflow-hidden bg-black",
        p: 0,
        radius: "lg",
        ref: containerRef,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-video", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "iframe",
          {
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
            allowFullScreen: true,
            className: "absolute inset-0 w-full h-full",
            src: embedUrl,
            title: "Video Player"
          }
        ) })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      className: "overflow-hidden bg-black",
      p: 0,
      radius: "lg",
      ref: containerRef,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative cursor-pointer aspect-video group",
          onClick: togglePlayPause,
          onMouseEnter: showControlsTemporarily,
          onMouseMove: showControlsTemporarily,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "video",
              {
                className: "absolute inset-0 object-cover w-full h-full",
                playsInline: true,
                preload: "metadata",
                ref: videoRef,
                src: videoUrl
              }
            ),
            state.isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-gray-900", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 mx-auto mb-4 border-4 rounded-full border-fun-green-600 border-t-transparent animate-spin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-white", size: "sm", children: "Loading video..." })
            ] }) }),
            state.error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-gray-900", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mb-2 text-red-400", size: "lg", children: "Video Error" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-300", size: "sm", children: state.error }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  className: "mt-4 bg-fun-green-600 hover:bg-fun-green-700",
                  onClick: () => window.location.reload(),
                  children: "Retry"
                }
              )
            ] }) }),
            !state.isPlaying && !state.isLoading && !state.error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center bg-black bg-opacity-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-20 h-20 transition-colors rounded-full bg-fun-green-600 hover:bg-fun-green-700", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlayerPlay, { className: "ml-1 text-white", size: 32 }) }) }),
            state.showControls && !state.isLoading && !state.error && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black via-black/70 to-transparent",
                onClick: (e) => e.stopPropagation(),
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Progress,
                    {
                      className: "cursor-pointer",
                      color: "fun-green",
                      onClick: (e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const percentage = clickX / rect.width;
                        const newTime = percentage * state.duration;
                        handleSeek(newTime);
                      },
                      size: "sm",
                      value: progress
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ActionIcon,
                        {
                          className: "text-white hover:text-fun-green-400",
                          onClick: () => skipTime(-10),
                          variant: "transparent",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlayerSkipBack, { size: 20 })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ActionIcon,
                        {
                          className: "text-white hover:text-fun-green-400",
                          onClick: togglePlayPause,
                          variant: "transparent",
                          children: state.isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlayerPause, { size: 20 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlayerPlay, { size: 20 })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ActionIcon,
                        {
                          className: "text-white hover:text-fun-green-400",
                          onClick: () => skipTime(10),
                          variant: "transparent",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlayerSkipForward, { size: 20 })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { gap: "xs", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ActionIcon,
                        {
                          className: "text-white hover:text-fun-green-400",
                          onClick: toggleMute,
                          variant: "transparent",
                          children: state.isMuted ? /* @__PURE__ */ jsxRuntimeExports.jsx(IconVolumeOff, { size: 20 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(IconVolume, { size: 20 })
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-white", size: "sm", children: [
                        formatTime(state.currentTime),
                        " /",
                        " ",
                        formatTime(state.duration)
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ActionIcon,
                        {
                          className: "text-white hover:text-fun-green-400",
                          variant: "transparent",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSettings, { size: 20 })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ActionIcon,
                        {
                          className: "text-white hover:text-fun-green-400",
                          onClick: () => {
                            if (containerRef.current) {
                              if (document.fullscreenElement) {
                                document.exitFullscreen();
                              } else {
                                containerRef.current.requestFullscreen();
                              }
                            }
                          },
                          variant: "transparent",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconMaximize, { size: 20 })
                        }
                      )
                    ] })
                  ] })
                ] })
              }
            )
          ]
        }
      )
    }
  );
}
const $$splitComponentImporter$b = () => import("../_courseId-B-gzRNRY.mjs");
const Route$b = createFileRoute("/$tenant/student/courses/$courseId")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
function CourseDetails() {
  const {
    tenant: tenant2
  } = Route$b.useRouteContext();
  const {
    user: user2
  } = useAuthContext();
  const {
    courseId
  } = useParams({
    strict: false
  });
  const {
    data: course2,
    isLoading,
    error
  } = useCourseWithStructure(courseId);
  const navigate = useNavigate();
  const [isEnrolling, setIsEnrolling] = reactExports.useState(false);
  const enrollMutation = useEnrollInCourse();
  const subscribeMutation = useSubscribeToTenant();
  const isEnrolled = user2?.enrolledCourses?.includes(courseId || "") || false;
  const activeSubscription = user2?.subscriptions?.find((sub) => sub.tenantId === tenant2.id && sub.status === "active" && sub.expiresAt > Date.now());
  const hasAccessViaSubscription = tenant2.config?.monetization?.model === "subscription" && !!activeSubscription;
  const isFree = tenant2.config?.monetization?.model === "free" || tenant2.config?.monetization?.model === "pay-per-course" && (!course2?.price || course2.price <= 0);
  const hasAccess = isEnrolled || hasAccessViaSubscription;
  const getPaystackConfig = (amount, type, plan) => ({
    amount: Math.round(amount * 100),
    // in kobo
    email: user2?.email || "",
    metadata: {
      custom_fields: [{
        display_name: type === "enrollment" ? "Course Title" : "Subscription Plan",
        value: type === "enrollment" ? course2?.title || "" : `${plan} Subscription`,
        variable_name: type === "enrollment" ? "course_title" : "subscription_plan"
      }, {
        display_name: "Student ID",
        value: user2?.uid || "",
        variable_name: "student_id"
      }, {
        display_name: "Tenant ID",
        value: tenant2.id || "",
        variable_name: "tenant_id"
      }]
    },
    publicKey: "pk_test_98a5e099e8c3e04f9861059be7c2fbd4c5cf715c",
    reference: (/* @__PURE__ */ new Date()).getTime().toString() + Math.random().toString(36).substring(2, 7)
  });
  const startPaystackTransaction = (config, onSuccess) => {
    if (typeof window === "undefined") {
      setIsEnrolling(false);
      return;
    }
    const paystackWindow = window;
    const paystack = new paystackWindow.PaystackPop();
    paystack.newTransaction({
      ...config,
      onClose: () => {
        setIsEnrolling(false);
      },
      onSuccess
    });
  };
  const executeEnrollment = async () => {
    if (!user2 || !courseId || !course2) return;
    setIsEnrolling(true);
    try {
      await enrollMutation.mutateAsync({
        courseId,
        studentId: user2.uid,
        tenantId: tenant2.id || ""
      });
      if (tenant2.id) {
        navigate({
          params: {
            courseId,
            tenant: tenant2.id
          },
          search: {
            lesson: void 0
          },
          to: "/$tenant/student/courses/$courseId/learn"
        });
      }
    } catch (error2) {
      console.error("Enrollment failed:", error2);
      setIsEnrolling(false);
    }
  };
  const executeSubscription = async (plan) => {
    if (!user2 || !tenant2.id) return;
    setIsEnrolling(true);
    try {
      await subscribeMutation.mutateAsync({
        plan,
        tenantId: tenant2.id,
        userId: user2.uid
      });
      await executeEnrollment();
    } catch (error2) {
      console.error("Subscription failed:", error2);
      setIsEnrolling(false);
    }
  };
  const handleSubscribePayment = (plan, amount) => {
    setIsEnrolling(true);
    const config = getPaystackConfig(amount, "subscription", plan);
    startPaystackTransaction(config, () => {
      void executeSubscription(plan);
    });
  };
  const handleEnrollClick = () => {
    if (!user2) {
      if (tenant2.id) {
        navigate({
          params: {
            tenant: tenant2.id
          },
          search: {
            redirect: window.location.pathname
          },
          to: "/$tenant/login"
        });
      } else {
        navigate({
          search: {
            redirect: window.location.pathname
          },
          to: "/login"
        });
      }
      return;
    }
    if (tenant2.config?.monetization?.model === "subscription" && !activeSubscription) {
      const subSection = document.getElementById("subscription-options");
      if (subSection) subSection.scrollIntoView({
        behavior: "smooth"
      });
      return;
    }
    if (!isFree && tenant2.config?.monetization?.model === "pay-per-course") {
      setIsEnrolling(true);
      startPaystackTransaction(getPaystackConfig(course2?.price || 0, "enrollment"), () => {
        void executeEnrollment();
      });
    } else {
      void executeEnrollment();
    }
  };
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "advanced":
        return "red";
      case "beginner":
        return "green";
      case "intermediate":
        return "yellow";
      default:
        return "gray";
    }
  };
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 8
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { height: 300, radius: "lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { height: 60 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { height: 120 })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 4
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { height: 200, radius: "lg" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { height: 150, radius: "lg" })
      ] }) })
    ] }) });
  }
  if (error || !course2) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "red", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconInfoCircle, { size: 16 }), title: "Course Not Found", children: "The course you're looking for could not be found. Please check the URL or return to the course catalog." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-duration": "500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
      base: 12,
      md: 8
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { justify: "space-between", wrap: "nowrap", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-2 text-gray-800", order: 1, children: course2.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mb-4 text-gray-600", size: "lg", children: course2.shortDescription || course2.description })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: getDifficultyColor(course2.difficulty || "intermediate"), size: "lg", variant: "light", children: (course2.difficulty || "intermediate").charAt(0).toUpperCase() + (course2.difficulty || "intermediate").slice(1) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { className: "text-gray-500", size: 16 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-gray-600", size: "sm", children: [
              course2.sections?.reduce((acc, section) => acc + (section.lessons?.reduce((lessonAcc, lesson) => lessonAcc + (lesson.estimatedDuration || 0), 0) || 0), 0) || 0,
              "m"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconUsers, { className: "text-gray-500", size: 16 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-gray-600", size: "sm", children: [
              (course2.enrollmentCount || 0).toLocaleString(),
              " enrolled"
            ] })
          ] }),
          (course2.averageRating || 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Rating, { readOnly: true, size: "sm", value: course2.averageRating || 0 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-gray-600", size: "sm", children: [
              (course2.averageRating || 0).toFixed(1),
              " (",
              course2.totalRatings || 0,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { className: "text-gray-500", size: 16 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-gray-600", size: "sm", children: [
              "Created ",
              formatRelativeTime(course2.createdAt)
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-up", "data-aos-delay": "200", "data-aos-duration": "500", p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 3, children: "Course Preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(UniversalVideoPlayer, { autoPlay: false, videoUrl: course2.previewVideoUrl || "" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-up", "data-aos-delay": "300", "data-aos-duration": "500", p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 3, children: "About This Course" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "leading-relaxed text-gray-700", children: course2.description || "No description available." })
      ] }),
      course2.learningObjectives && course2.learningObjectives.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-up", "data-aos-delay": "400", "data-aos-duration": "500", p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 3, children: "What You'll Learn" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(List, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "fun-green", radius: "xl", size: 24, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: 12 }) }), spacing: "sm", children: course2.learningObjectives.map((objective, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(List.Item, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-700", children: objective }) }, index)) })
      ] }),
      course2.sections && course2.sections.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-up", "data-aos-delay": "500", "data-aos-duration": "500", p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 3, children: "Course Curriculum" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "md", children: course2.sections.map((section, sectionIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-gray-200 rounded-lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 bg-gray-50 border-b border-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "center", justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "font-medium text-gray-800", children: [
                "Section ",
                sectionIndex + 1,
                ": ",
                section.title
              ] }),
              section.description && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mt-1 text-gray-600", size: "sm", children: section.description })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color: "fun-green", variant: "light", children: [
              section.lessons?.length || 0,
              " lessons"
            ] })
          ] }) }),
          section.lessons && section.lessons.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "sm", children: section.lessons.map((lesson, lessonIndex) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { className: "p-3 bg-white rounded-md border border-gray-100", gap: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-6 h-6 rounded-full bg-fun-green-100 text-fun-green-700 text-xs font-medium", children: lessonIndex + 1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium text-gray-700", size: "sm", children: lesson.title }),
              lesson.type && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-500", size: "xs", children: lesson.type.charAt(0).toUpperCase() + lesson.type.slice(1) })
            ] }),
            lesson.estimatedDuration && /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { className: "text-gray-400", size: 12 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-gray-500", size: "xs", children: [
                lesson.estimatedDuration,
                "m"
              ] })
            ] })
          ] }, lesson.id)) }) })
        ] }, section.id)) })
      ] }),
      course2.prerequisites && course2.prerequisites.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-up", "data-aos-delay": "500", "data-aos-duration": "500", p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 3, children: "Prerequisites" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(List, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "blue", radius: "xl", size: 24, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconInfoCircle, { size: 12 }) }), spacing: "sm", children: course2.prerequisites.map((prerequisite, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(List.Item, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-700", children: prerequisite }) }, index)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-up", "data-aos-delay": "600", "data-aos-duration": "500", p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 3, children: "Your Instructor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "fun-green", radius: "xl", size: 50, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconUser, { size: 24 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-lg font-semibold text-gray-800", children: course2.instructors?.map((instructor) => instructor?.name || "Unknown").join(", ") || "No instructor assigned" }),
            course2.instructors?.some(
              (instructor) => instructor?.biography
              // changed .bio to .biography (schema definition) which is nullable
            ) && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 space-y-1", children: course2.instructors.filter((instructor) => instructor?.biography).map((instructor, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-gray-600", size: "sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
                instructor?.name,
                ":"
              ] }),
              " ",
              instructor?.biography
            ] }, index)) })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
      base: 12,
      md: 4
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "sticky top-4", "data-aos": "fade-left", "data-aos-delay": "200", "data-aos-duration": "500", p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "md", children: hasAccess ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "green", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: 16 }), children: "You have access to this course" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "violet", fullWidth: true, leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSparkles, { size: 16 }), onClick: () => navigate({
          params: {
            tenant: tenant2.id
          },
          search: {
            courseId
          },
          to: "/$tenant/student/ai"
        }), variant: "light", children: "Open AI Tutor" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-fun-green-600 hover:bg-fun-green-700", fullWidth: true, onClick: () => navigate({
          params: {
            courseId,
            tenant: tenant2.id
          },
          search: {
            lesson: void 0
          },
          to: "/$tenant/student/courses/$courseId/learn"
        }), size: "lg", children: "Continue Learning" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        tenant2.config?.monetization?.model === "subscription" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "subscription-options", className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", className: "text-gray-600 font-medium", children: "Choose a Subscription Plan to Access" }),
          tenant2.config.monetization.subscriptionConfig?.monthlyPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "bg-purple-600 hover:bg-purple-700", fullWidth: true, loading: isEnrolling, onClick: () => handleSubscribePayment("monthly", tenant2.config.monetization.subscriptionConfig.monthlyPrice), size: "lg", variant: "filled", children: [
            "Monthly Plan - ₦",
            tenant2.config.monetization.subscriptionConfig.monthlyPrice.toLocaleString()
          ] }),
          tenant2.config.monetization.subscriptionConfig?.yearlyPrice && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "border-purple-600 text-purple-600 hover:bg-purple-50", fullWidth: true, loading: isEnrolling, onClick: () => handleSubscribePayment("yearly", tenant2.config.monetization.subscriptionConfig.yearlyPrice), size: "lg", variant: "outline", children: [
            "Yearly Plan - ₦",
            tenant2.config.monetization.subscriptionConfig.yearlyPrice.toLocaleString()
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "bg-fun-green-600 hover:bg-fun-green-700", fullWidth: true, loading: isEnrolling, onClick: handleEnrollClick, size: "lg", children: !isFree ? `Enroll Now - ₦${course2.price?.toLocaleString() || 0}` : "Enroll Now - Free" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-center text-gray-500", size: "sm", children: [
          "Join ",
          (course2.enrollmentCount || 0).toLocaleString(),
          " ",
          "other students"
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-left", "data-aos-delay": "300", "data-aos-duration": "500", p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 4, children: "Course Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconBook, { className: "text-gray-500", size: 16 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Sections" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium", size: "sm", children: course2.sections?.length || 0 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { className: "text-gray-500", size: 16 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Lessons" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium", size: "sm", children: course2.sections?.reduce((acc, section) => acc + (section.lessons?.length || 0), 0) || 0 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { className: "text-gray-500", size: 16 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Duration" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "font-medium", size: "sm", children: [
              course2.sections?.reduce((acc, section) => acc + (section.lessons?.reduce((lessonAcc, lesson) => lessonAcc + (lesson.estimatedDuration || 0), 0) || 0), 0) || 0,
              "m"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrendingUp, { className: "text-gray-500", size: 16 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Level" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: getDifficultyColor(course2.difficulty || "intermediate"), size: "sm", variant: "light", children: (course2.difficulty || "intermediate").charAt(0).toUpperCase() + (course2.difficulty || "intermediate").slice(1) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconBook, { className: "text-gray-500", size: 16 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Category" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium", size: "sm", children: course2.category || "General" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconCertificate, { className: "text-gray-500", size: 16 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Certificate" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium", size: "sm", children: "Included" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconWorldWww, { className: "text-gray-500", size: 16 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Access" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium", size: "sm", children: "Lifetime" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { className: "text-gray-500", size: 16 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Last Updated" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium", size: "sm", children: course2.updatedAt ? formatRelativeTime(course2.updatedAt) : "N/A" })
          ] })
        ] })
      ] }),
      course2.tags && course2.tags.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-left", "data-aos-delay": "400", "data-aos-duration": "500", p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 4, children: "Tags" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { gap: "xs", children: course2.tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { size: "sm", variant: "outline", children: tag }, tag)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-left", "data-aos-delay": "500", "data-aos-duration": "500", p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 4, children: "Course Stats" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Students Enrolled" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium", size: "sm", children: (course2.enrollmentCount || 0).toLocaleString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Completions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium", size: "sm", children: (course2.completionCount || 0).toLocaleString() })
          ] }),
          (course2.averageRating || 0) > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "sm", children: "Average Rating" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium", size: "sm", children: (course2.averageRating || 0).toFixed(1) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconStar, { className: "text-yellow-500", fill: "currentColor", size: 14 })
            ] })
          ] })
        ] })
      ] })
    ] }) })
  ] }) }) });
}
const $$splitComponentImporter$a = () => import("./new-C8NbYyZL.mjs");
const Route$a = createFileRoute("/$tenant/admin/users/new")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const duplicateCourseSchema = object({
  title: string().min(3, "Title must be at least 3 characters")
});
function DuplicateCourseModal({
  course: course2,
  onSuccess,
  user: user2
}) {
  const createCourse = useCreateCourse();
  const form = useForm({
    initialValues: {
      title: `${course2.title} (Copy)`
    },
    validate: zod4Resolver(duplicateCourseSchema)
  });
  const handleDuplicate = () => {
    const duplicatedCourseData = {
      category: course2.category,
      description: course2.description,
      difficulty: course2.difficulty,
      estimatedDurationInMinutes: course2.estimatedDurationInMinutes || 0,
      featured: course2.featured || false,
      instructors: course2.instructors || [],
      language: course2.language || "en",
      learningObjectives: course2.learningObjectives,
      level: course2.level || "beginner",
      prerequisites: course2.prerequisites || [],
      previewVideoUrl: course2.previewVideoUrl || "",
      price: course2.price || 0,
      published: false,
      shortDescription: course2.shortDescription || "",
      tags: course2.tags,
      thumbnailUrl: course2.thumbnailUrl || "",
      title: form.values.title
    };
    createCourse.mutate(
      {
        courseData: duplicatedCourseData,
        tenantId: user2.tenantIds?.[0] || "ncs",
        userId: user2.uid
      },
      {
        onSuccess: () => {
          modals.closeAll();
          onSuccess?.();
        }
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: form.onSubmit(handleDuplicate), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
      "Create a copy of ",
      /* @__PURE__ */ jsxRuntimeExports.jsxs("strong", { children: [
        '"',
        course2.title,
        '"'
      ] }),
      ". The duplicated course will include all content and settings but will be saved as a draft."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TextInput,
      {
        label: "New Course Title",
        placeholder: "Enter title for the duplicated course",
        required: true,
        ...form.getInputProps("title")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: "Note: The duplicated course will be created as a draft and can be edited before publishing." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", mt: "lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => modals.closeAll(), variant: "light", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "bg-fun-green-600 hover:bg-fun-green-700",
          loading: createCourse.isPending,
          type: "submit",
          children: "Duplicate Course"
        }
      )
    ] })
  ] }) });
}
const openDuplicateCourseModal = (course2, user2, onSuccess) => {
  modals.open({
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(DuplicateCourseModal, { course: course2, onSuccess, user: user2 }),
    size: "md",
    title: "Duplicate Course"
  });
};
const editStudentSchema = object({
  department: string().optional(),
  displayName: string().min(1, "Full name is required"),
  location: string().optional()
});
function openEditStudentModal(student) {
  modals.open({
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(EditStudentModal, { student }),
    size: "md",
    title: "Edit Student Profile"
  });
}
function EditStudentModal({ student }) {
  const updateUser = useUpdateUser();
  const form = useForm({
    initialValues: {
      department: student.department || "",
      displayName: student.displayName || "",
      location: student.location || ""
    },
    validate: zod4Resolver(editStudentSchema)
  });
  const handleSubmit = (values) => {
    updateUser.mutate(
      {
        userData: values,
        userId: student.uid
      },
      {
        onError: (error) => {
          notifications.show({
            color: "red",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 16 }),
            message: error.message || "Failed to update student profile",
            title: "Error"
          });
        },
        onSuccess: () => {
          notifications.show({
            color: "green",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: 16 }),
            message: "Student profile updated successfully",
            title: "Success"
          });
          modals.closeAll();
        }
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TextInput,
      {
        label: "Full Name",
        required: true,
        ...form.getInputProps("displayName")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Department", ...form.getInputProps("department") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Location", ...form.getInputProps("location") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", mt: "lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => modals.closeAll(), variant: "light", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "bg-fun-green-600 hover:bg-fun-green-700",
          loading: updateUser.isPending,
          type: "submit",
          children: "Save Changes"
        }
      )
    ] })
  ] }) });
}
const resetUserPasswordSchema = object({
  confirmPassword: string(),
  newPassword: string().min(8, "Temporary password must be at least 8 characters")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
function openResetUserPasswordModal(user2) {
  modals.open({
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResetUserPasswordModal, { user: user2 }),
    size: "md",
    title: `Reset Password for ${user2.displayName}`
  });
}
function ResetUserPasswordModal({ user: user2 }) {
  const resetUserPassword = useResetUserPassword();
  const form = useForm({
    initialValues: {
      confirmPassword: "",
      newPassword: ""
    },
    validate: zod4Resolver(resetUserPasswordSchema)
  });
  const handleSubmit = (values) => {
    resetUserPassword.mutate(
      {
        newPassword: values.newPassword,
        userId: user2.uid
      },
      {
        onError: (error) => {
          notifications.show({
            color: "red",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 16 }),
            message: error.message || "Failed to reset user password.",
            title: "Reset Failed"
          });
        },
        onSuccess: () => {
          notifications.show({
            color: "green",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: 16 }),
            message: `Temporary password updated for ${user2.displayName}. Share it securely with the user.`,
            title: "Password Reset"
          });
          modals.closeAll();
        }
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
      "Set a new temporary password for ",
      user2.displayName,
      ". The old password will stop working immediately."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PasswordInput,
      {
        label: "Temporary Password",
        placeholder: "Create a temporary password",
        required: true,
        ...form.getInputProps("newPassword")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PasswordInput,
      {
        label: "Confirm Temporary Password",
        placeholder: "Repeat the temporary password",
        required: true,
        ...form.getInputProps("confirmPassword")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", mt: "lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => modals.closeAll(), variant: "light", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "bg-fun-green-600 hover:bg-fun-green-700",
          loading: resetUserPassword.isPending,
          type: "submit",
          children: "Reset Password"
        }
      )
    ] })
  ] }) });
}
function openSendMessageModal(student, currentUser) {
  modals.open({
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(SendMessageModal, { currentUser, student }),
    size: "md",
    title: `Send Message to ${student.displayName}`
  });
}
function SendMessageModal({ currentUser, student }) {
  const createNotification = useCreateNotification();
  const form = useForm({
    initialValues: {
      message: "",
      subject: ""
    },
    validate: zod4Resolver(sendMessageSchema)
  });
  const handleSubmit = (values) => {
    createNotification.mutate(
      {
        category: "message",
        createdAt: Date.now(),
        // Uses Number (ms)
        fromUserId: currentUser.uid,
        fromUserName: currentUser.displayName || "Administrator",
        isRead: false,
        message: values.message,
        title: values.subject,
        userId: student.uid
      },
      {
        onError: () => {
          notifications.show({
            color: "red",
            message: "Failed to send message. Please try again.",
            title: "Error"
          });
        },
        onSuccess: () => {
          notifications.show({
            color: "green",
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: 16 }),
            message: `Message sent to ${student.displayName}`,
            title: "Success"
          });
          modals.closeAll();
        }
      }
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TextInput,
      {
        label: "Subject",
        placeholder: "Enter message subject",
        required: true,
        ...form.getInputProps("subject")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Textarea,
      {
        label: "Message",
        placeholder: "Type your message here...",
        required: true,
        rows: 6,
        ...form.getInputProps("message")
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", mt: "lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => modals.closeAll(), variant: "light", children: "Cancel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "bg-fun-green-600 hover:bg-fun-green-700",
          type: "submit",
          children: "Send Message"
        }
      )
    ] })
  ] }) });
}
function DataTable({
  columns,
  data,
  enableColumnPinning = false,
  enableColumnResizing = false,
  enableColumnVisibility = true,
  enableFilters = true,
  enableMultiRowSelection = true,
  enablePagination = true,
  enableRowSelection = false,
  enableSearch = true,
  enableSorting = true,
  filters = [],
  loading = false,
  pageSize = 10,
  searchPlaceholder = "Search..."
}) {
  const [sorting, setSorting] = reactExports.useState([]);
  const [columnFilters, setColumnFilters] = reactExports.useState([]);
  const [globalFilter, setGlobalFilter] = reactExports.useState("");
  const [pagination, setPagination] = reactExports.useState({
    pageIndex: 0,
    pageSize
  });
  const [columnVisibility, setColumnVisibility] = reactExports.useState({});
  const [rowSelection, setRowSelection] = reactExports.useState({});
  const [columnPinning, setColumnPinning] = reactExports.useState({
    left: [],
    right: []
  });
  const table = useReactTable({
    columns,
    data,
    enableColumnPinning,
    enableColumnResizing,
    enableMultiRowSelection,
    enableRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: enableFilters ? getFilteredRowModel() : void 0,
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : void 0,
    getSortedRowModel: enableSorting ? getSortedRowModel() : void 0,
    globalFilterFn: "includesString",
    onColumnFiltersChange: setColumnFilters,
    onColumnPinningChange: setColumnPinning,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    state: {
      columnFilters,
      columnPinning,
      columnVisibility,
      globalFilter,
      pagination,
      rowSelection,
      sorting
    }
  });
  const handleFilterChange = (key, value) => {
    if (value) {
      setColumnFilters((prev) => [
        ...prev.filter((filter) => filter.id !== key),
        { id: key, value }
      ]);
    } else {
      setColumnFilters((prev) => prev.filter((filter) => filter.id !== key));
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: "Loading..." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
    enableSearch || enableFilters || enableColumnVisibility || enableRowSelection ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
        enableSearch && /* @__PURE__ */ jsxRuntimeExports.jsx(
          TextInput,
          {
            leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSearch, { size: 16 }),
            onChange: (event) => setGlobalFilter(event.currentTarget.value),
            placeholder: searchPlaceholder,
            style: { minWidth: 250 },
            value: globalFilter
          }
        ),
        enableFilters && filters.map((filter) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Select,
          {
            clearable: true,
            data: filter.options,
            leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconFilter, { size: 16 }),
            onChange: (value) => handleFilterChange(filter.key, value),
            placeholder: filter.label,
            value: columnFilters.find(({ id }) => id === filter.key)?.value
          },
          filter.key
        ))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
        enableRowSelection && Object.keys(rowSelection).length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
          Object.keys(rowSelection).length,
          " row(s) selected"
        ] }),
        enableColumnVisibility && /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { shadow: "md", width: 200, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Target, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconColumns, { size: 16 }),
              size: "sm",
              variant: "subtle",
              children: "Columns"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu.Dropdown, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Label, { children: "Toggle columns" }),
            table.getAllLeafColumns().map((column) => {
              return /* @__PURE__ */ jsxRuntimeExports.jsx(
                Menu.Item,
                {
                  onClick: (e) => {
                    e.preventDefault();
                    column.toggleVisibility();
                  },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Checkbox,
                      {
                        checked: column.getIsVisible(),
                        onChange: () => column.toggleVisibility(),
                        onClick: (e) => e.stopPropagation()
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: typeof column.columnDef.header === "string" ? column.columnDef.header : column.id })
                  ] })
                },
                column.id
              );
            })
          ] })
        ] })
      ] })
    ] }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { highlightOnHover: true, striped: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Thead, { children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Tr, { children: headerGroup.headers.map((header) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Table.Th,
        {
          style: {
            position: "relative",
            width: enableColumnResizing ? header.getSize() : void 0
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", wrap: "nowrap", children: [
              flexRender(
                header.column.columnDef.header,
                header.getContext()
              ),
              enableSorting && header.column.getCanSort() && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  label: header.column.getIsSorted() ? header.column.getIsSorted() === "desc" ? "Sort ascending" : "Sort descending" : "Sort",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ActionIcon,
                    {
                      onClick: header.column.getToggleSortingHandler(),
                      size: "sm",
                      variant: "subtle",
                      children: header.column.getIsSorted() === "desc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(IconSortDescending, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(IconSortAscending, { size: 14 })
                    }
                  )
                }
              )
            ] }),
            enableColumnResizing && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                "aria-label": "Resize column",
                className: `resizer ${header.column.getIsResizing() ? "isResizing" : ""}`,
                onMouseDown: header.getResizeHandler(),
                onTouchStart: header.getResizeHandler(),
                style: {
                  background: header.column.getIsResizing() ? "var(--mantine-color-gray-6)" : "var(--mantine-color-gray-3)",
                  border: "none",
                  cursor: "col-resize",
                  height: "100%",
                  padding: 0,
                  position: "absolute",
                  right: 0,
                  top: 0,
                  touchAction: "none",
                  userSelect: "none",
                  width: "5px"
                },
                type: "button"
              }
            )
          ]
        },
        header.id
      )) }, headerGroup.id)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Tbody, { children: table.getRowModel().rows.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Tr, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { colSpan: columns.length, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", py: "xl", ta: "center", children: "No data available" }) }) }) : table.getRowModel().rows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Table.Tr,
        {
          style: {
            backgroundColor: row.getIsSelected() ? "var(--mantine-color-primary-light)" : void 0
          },
          children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsxRuntimeExports.jsx(Table.Td, { children: flexRender(
            cell.column.columnDef.cell,
            cell.getContext()
          ) }, cell.id))
        },
        row.id
      )) })
    ] }),
    enablePagination ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
        "Showing ",
        table.getState().pagination.pageIndex * pageSize + 1,
        " to",
        " ",
        Math.min(
          (table.getState().pagination.pageIndex + 1) * pageSize,
          table.getFilteredRowModel().rows.length
        ),
        " ",
        "of ",
        table.getFilteredRowModel().rows.length,
        " entries"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Pagination,
        {
          onChange: (page) => setPagination((prev) => ({ ...prev, pageIndex: page - 1 })),
          total: table.getPageCount(),
          value: table.getState().pagination.pageIndex + 1
        }
      )
    ] }) : null
  ] }) });
}
function createStudentProgressTableColumns() {
  return [
    {
      accessorKey: "courseId",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 500, size: "sm", children: [
        "Course ",
        getValue()
      ] }) }),
      header: "Course"
    },
    {
      accessorKey: "completionPercentage",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Progress,
        {
          color: "fun-green.6",
          radius: "xl",
          size: "sm",
          style: { width: "96px" },
          value: getValue()
        }
      ),
      header: "Progress"
    },
    {
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue();
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: getStatusColor(status), size: "sm", variant: "light", children: getStatusText(status) });
      },
      header: "Status"
    },
    {
      accessorKey: "lastAccessedAt",
      cell: ({ getValue }) => {
        const lastAccessed = getValue();
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: lastAccessed ? formatDate(lastAccessed) : "Never accessed" });
      },
      header: "Last Accessed"
    }
  ];
}
function getStatusColor(status) {
  switch (status) {
    case "completed":
      return "green";
    case "dropped":
      return "red";
    case "enrolled":
      return "gray";
    case "in-progress":
      return "blue";
    default:
      return "gray";
  }
}
function getStatusText(status) {
  switch (status) {
    case "completed":
      return "Completed";
    case "dropped":
      return "Dropped";
    case "enrolled":
      return "Enrolled";
    case "in-progress":
      return "In Progress";
    default:
      return "Unknown";
  }
}
const $$splitComponentImporter$9 = () => import("../_studentId-vcOGLFRg.mjs");
const Route$9 = createFileRoute("/$tenant/admin/users/$studentId")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
function StudentDetails() {
  const {
    tenant: tenant2
  } = Route$9.useRouteContext();
  const {
    user: user2
  } = useAuthContext();
  const router2 = useRouter();
  const {
    studentId
  } = useParams({
    strict: false
  });
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const {
    data: studentData,
    error: userError,
    isLoading: userLoading
  } = useUser(studentId || "");
  const {
    data: progressData,
    isLoading: progressLoading
  } = useUserProgress(tenant2.id, studentId || "");
  const {
    data: activityLogs2 = [],
    isLoading: activityLoading
  } = useListActivityLogs(tenant2.id, studentId || "");
  const {
    data: certificates2 = [],
    isLoading: certificatesLoading
  } = useGetCertificates(studentId || "", tenant2.id);
  const isLoading = userLoading || progressLoading || activityLoading || certificatesLoading;
  function handleEditStudent() {
    if (!studentData) return;
    openEditStudentModal(studentData);
  }
  function handleSendMessage() {
    if (!studentData || !user2) return;
    openSendMessageModal(studentData, user2);
  }
  function getStatusColor2(status) {
    switch (status) {
      case "active":
        return "green";
      case "completed":
        return "green";
      case "in-progress":
        return "blue";
      case "inactive":
        return "red";
      case "not-started":
        return "gray";
      default:
        return "gray";
    }
  }
  function getActivityIcon(type) {
    switch (type) {
      case "course_completed":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: 16 });
      case "course_enrolled":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconBook, { size: 16 });
      case "login":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconUser, { size: 16 });
      case "quiz_passed":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconStar, { size: 16 });
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsx(IconActivity, { size: 16 });
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center h-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { size: "lg" }) }) });
  }
  if (userError || !studentData) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "red", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconExclamationMark, { size: 16 }), title: "Error", children: "Failed to load student details. Please try again later." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { "data-aos": "fade-up", gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { "data-aos": "fade-right", justify: "space-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ActionIcon, { onClick: () => router2.history.go(-1), variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconArrowLeft, { size: 16 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "text-gray-800", order: 1, children: "Student Profile" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "lg", children: "Detailed view of student progress and information" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconMessageCircle, { size: 16 }), onClick: handleSendMessage, variant: "light", children: "Send Message" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconEdit, { size: 16 }), onClick: handleEditStudent, variant: "light", children: "Edit Profile" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-aos": "fade-up", "data-aos-delay": "100", padding: "xl", radius: "md", shadow: "sm", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 4
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "ring-4 ring-fun-green-100", radius: "xl", size: 120, src: studentData.photoURL }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 2, children: studentData.displayName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "lg", children: studentData.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "mt-2", color: getStatusColor2(studentData.isActive ? "active" : "inactive"), size: "lg", variant: "light", children: getStatusColor2(studentData.isActive ? "active" : "inactive") })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 8
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "blue", variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconMail, { size: 16 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Email" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: studentData.email })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "orange", variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCalendar, { size: 16 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Joined" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: formatDate(studentData.createdAt) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "violet", variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { size: 16 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Last Active" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: formatDateTime(studentData.lastLoginAt) })
          ] })
        ] }) })
      ] }) }) })
    ] }) }),
    progressData && progressData.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { "data-aos": "fade-up", "data-aos-delay": "200", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 3,
        sm: 6
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "text-center", padding: "lg", radius: "md", shadow: "sm", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RingProgress, { className: "mx-auto mb-2", label: /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { size: "xs", ta: "center", children: [
          Math.round(progressData.reduce((acc, course2) => acc + course2.completionPercentage, 0) / progressData.length),
          "%"
        ] }), sections: [{
          color: "fun-green.6",
          value: Math.round(progressData.reduce((acc, course2) => acc + course2.completionPercentage, 0) / progressData.length)
        }], size: 80, thickness: 8 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Overall Progress" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 3,
        sm: 6
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "text-center", padding: "lg", radius: "md", shadow: "sm", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { className: "mx-auto mb-2", color: "blue", size: 60, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconBook, { size: 28 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 700, size: "xl", children: progressData.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Enrolled Courses" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 3,
        sm: 6
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "text-center", padding: "lg", radius: "md", shadow: "sm", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { className: "mx-auto mb-2", color: "green", size: 60, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrophy, { size: 28 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 700, size: "xl", children: progressData.filter((course2) => course2.status === "completed").length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Completed" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 3,
        sm: 6
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "text-center", padding: "lg", radius: "md", shadow: "sm", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { className: "mx-auto mb-2", color: "orange", size: 60, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCertificate, { size: 28 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 700, size: "xl", children: certificates2.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Certificates" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { "data-aos": "fade-up", "data-aos-delay": "300", onChange: setActiveTab, value: activeTab, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs.List, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Tab, { value: "overview", children: "Overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Tab, { value: "courses", children: "Courses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Tab, { value: "activity", children: "Activity" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Tab, { value: "certificates", children: "Certificates" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Panel, { pt: "xl", value: "overview", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
          base: 12,
          md: 6
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { padding: "lg", radius: "md", shadow: "sm", withBorder: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 4, children: "Learning Progress" }),
          progressData && progressData.length > 0 ? progressData.map((courseProgress2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { className: "mb-1", justify: "space-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { size: "sm", children: [
                "Course ",
                courseProgress2.courseId
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
                Math.round(courseProgress2.completionPercentage),
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { color: "fun-green.6", radius: "xl", size: "sm", value: courseProgress2.completionPercentage })
          ] }, courseProgress2.courseId)) : /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", py: "xl", ta: "center", children: "No course progress available" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
          base: 12,
          md: 6
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { padding: "lg", radius: "md", shadow: "sm", withBorder: true, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 4, children: "Recent Activity" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Timeline, { active: activityLogs2.length, bulletSize: 24, lineWidth: 2, children: activityLogs2.slice(0, 5).map((activity) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Timeline.Item, { bullet: getActivityIcon(activity.action || ""), title: (activity.action || "").replace("_", " ").toUpperCase(), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: activity.action }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: formatDateTime(activity.timestamp) })
          ] }, activity.id)) }),
          activityLogs2.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", py: "xl", ta: "center", children: "No recent activity" })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Panel, { pt: "xl", value: "courses", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { padding: "lg", radius: "md", shadow: "sm", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 4, children: "Course Enrollment" }),
        progressData && progressData.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { columns: createStudentProgressTableColumns(), data: progressData, enableFilters: true, enablePagination: false, enableSearch: false, enableSorting: true }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", py: "xl", ta: "center", children: "No courses enrolled" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Panel, { pt: "xl", value: "activity", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { padding: "lg", radius: "md", shadow: "sm", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 4, children: "Activity Log" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Timeline, { active: activityLogs2.length, bulletSize: 24, lineWidth: 2, children: activityLogs2.map((activity) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Timeline.Item, { bullet: getActivityIcon(activity.action || ""), title: (activity.action || "").replace("_", " ").toUpperCase(), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: activity.action }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: formatDateTime(activity.timestamp) })
        ] }, activity.id)) }),
        activityLogs2.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", py: "xl", ta: "center", children: "No activity recorded" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Panel, { pt: "xl", value: "certificates", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { padding: "lg", radius: "md", shadow: "sm", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "mb-4", order: 4, children: "Earned Certificates" }),
        certificates2.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Grid, { children: certificates2.map((certificate) => /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
          base: 12,
          md: 4,
          sm: 6
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { padding: "md", radius: "md", shadow: "xs", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "gold", size: 60, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCertificate, { size: 30 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, size: "sm", children: certificate.courseName }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", children: [
              "Issued:",
              " ",
              new Date(certificate.issued?.at || Date.now()).toLocaleDateString()
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconDownload, { size: 14 }), size: "xs", variant: "light", children: "Download" })
        ] }) }) }, certificate.id)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", py: "xl", ta: "center", children: "No certificates earned yet" })
      ] }) })
    ] })
  ] }) });
}
const $$splitComponentImporter$8 = () => import("../_quizId-D3fm0PnP.mjs");
const Route$8 = createFileRoute("/$tenant/admin/quizzes/$quizId")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
function QuizDetails() {
  const {
    tenant: tenant2
  } = Route$8.useRouteContext();
  const navigate = useNavigate();
  const {
    quizId
  } = useParams({
    strict: false
  });
  const {
    data: quiz2,
    isLoading
  } = useQuiz(quizId);
  const {
    data: courses = []
  } = useListCourses(tenant2.id);
  const course2 = courses.find((item) => item.id === quiz2?.courseId);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { justify: "center", py: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { className: "text-fun-green-600", size: "lg" }) }) });
  }
  if (!quiz2) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "xl", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Quiz not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", ta: "center", children: "This quiz could not be loaded for the current tenant." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconArrowLeft, { size: 16 }), onClick: () => tenant2.id && navigate({
        params: {
          tenant: tenant2.id
        },
        to: "/$tenant/admin/quizzes"
      }), variant: "light", children: "Back to Quiz Management" })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconArrowLeft, { size: 16 }), mb: "md", onClick: () => tenant2.id && navigate({
          params: {
            tenant: tenant2.id
          },
          to: "/$tenant/admin/quizzes"
        }), variant: "subtle", children: "Back to Quiz Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "text-fun-green-800", order: 1, children: quiz2.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", children: "Review assessment settings before editing questions." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => tenant2.id && navigate({
        params: {
          quizId: quiz2.id,
          tenant: tenant2.id
        },
        to: "/$tenant/admin/quizzes/$quizId/questions"
      }), children: "Manage Questions" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 6,
        xl: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "md", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Course" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 700, size: "lg", children: course2?.title || "Unknown Course" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "blue", size: 40, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconBook, { size: 20 }) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 6,
        xl: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "md", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Question Count" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 700, size: "lg", children: quiz2.questions.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "grape", size: 40, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconChecklist, { size: 20 }) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 6,
        xl: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "md", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Passing Score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 700, size: "lg", children: [
            quiz2.passingScore,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "orange", size: 40, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTarget, { size: 20 }) })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        md: 6,
        xl: 3
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "md", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Time Limit" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 700, size: "lg", children: quiz2.timeLimit || "No limit" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeIcon, { color: "teal", size: 40, variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { size: 20 }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Quiz Overview" }),
      quiz2.description ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: quiz2.description }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", children: "No description has been provided for this quiz." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color: "green", variant: "light", children: [
          "Max Attempts: ",
          quiz2.maxAttempts || "Unlimited"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color: "blue", variant: "light", children: [
          "Created ",
          formatDate(quiz2.createdAt)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color: "gray", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCalendar, { size: 12 }), variant: "light", children: [
          "Updated ",
          formatDate(quiz2.updatedAt)
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Question Preview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
          quiz2.questions.length,
          " total questions"
        ] })
      ] }),
      quiz2.questions.length ? /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "sm", children: quiz2.questions.map((question, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { bg: "gray.0", p: "md", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 600, children: [
            "Question ",
            index + 1
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "light", children: question.type })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: question.question }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
          "Points: ",
          question.points
        ] })
      ] }) }, question.id || `${question.question}-${index}`)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", children: "No questions have been added yet." })
    ] }) })
  ] }) });
}
const $$splitComponentImporter$7 = () => import("./index-CeINWLWB.mjs");
const Route$7 = createFileRoute("/$tenant/student/courses/$courseId/")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./index-AORhbz-H.mjs");
const Route$6 = createFileRoute("/$tenant/admin/users/$studentId/")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./index-CB3nRT6n.mjs");
const Route$5 = createFileRoute("/$tenant/admin/quizzes/$quizId/")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./learn-Bcal8Oqw.mjs");
const Route$4 = createFileRoute("/$tenant/student/courses/$courseId/learn")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component"),
  validateSearch: object({
    lesson: string().optional()
  })
});
const $$splitComponentImporter$3 = () => import("./progress-Tl5zdv_j.mjs");
const Route$3 = createFileRoute("/$tenant/admin/users/$studentId/progress")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./questions-D52xP1LT.mjs");
const Route$2 = createFileRoute("/$tenant/admin/quizzes/$quizId/questions")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./edit-DRxf8KVy.mjs");
const Route$1 = createFileRoute("/$tenant/admin/courses/$courseId/edit")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component"),
  params: {
    parse: object({
      courseId: string()
    }).parse
  }
});
const $$splitComponentImporter = () => import("../_quizId-DWqnipOI.mjs");
const Route = createFileRoute("/$tenant/student/courses/$courseId/quiz/$quizId")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const VerifyCertificateRoute = Route$K.update({
  id: "/verify-certificate",
  path: "/verify-certificate",
  getParentRoute: () => Route$L
});
const SuperAdminRoute = Route$J.update({
  id: "/super-admin",
  path: "/super-admin",
  getParentRoute: () => Route$L
});
const LoginRoute = Route$I.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$L
});
const TenantRoute = Route$H.update({
  id: "/$tenant",
  path: "/$tenant",
  getParentRoute: () => Route$L
});
const IndexRoute = Route$G.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$L
});
const SuperAdminIndexRoute = Route$F.update({
  id: "/",
  path: "/",
  getParentRoute: () => SuperAdminRoute
});
const TenantIndexRoute = Route$E.update({
  id: "/",
  path: "/",
  getParentRoute: () => TenantRoute
});
const SuperAdminTenantsRoute = Route$D.update({
  id: "/tenants",
  path: "/tenants",
  getParentRoute: () => SuperAdminRoute
});
const SuperAdminTelemetryRoute = Route$C.update({
  id: "/telemetry",
  path: "/telemetry",
  getParentRoute: () => SuperAdminRoute
});
const SuperAdminSettingsRoute = Route$B.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => SuperAdminRoute
});
const SuperAdminInvitationsRoute = Route$A.update({
  id: "/invitations",
  path: "/invitations",
  getParentRoute: () => SuperAdminRoute
});
const SuperAdminIdentitiesRoute = Route$z.update({
  id: "/identities",
  path: "/identities",
  getParentRoute: () => SuperAdminRoute
});
const TenantStudentRoute = Route$y.update({
  id: "/student",
  path: "/student",
  getParentRoute: () => TenantRoute
});
const TenantLoginRoute = Route$x.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => TenantRoute
});
const TenantAdminRoute = Route$w.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => TenantRoute
});
const TenantStudentIndexRoute = Route$v.update({
  id: "/",
  path: "/",
  getParentRoute: () => TenantStudentRoute
});
const TenantAdminIndexRoute = Route$u.update({
  id: "/",
  path: "/",
  getParentRoute: () => TenantAdminRoute
});
const TenantStudentProgressRoute = Route$t.update({
  id: "/progress",
  path: "/progress",
  getParentRoute: () => TenantStudentRoute
});
const TenantStudentProfileRoute = Route$s.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => TenantStudentRoute
});
const TenantStudentLiveSessionsRoute = Route$r.update({
  id: "/live-sessions",
  path: "/live-sessions",
  getParentRoute: () => TenantStudentRoute
});
const TenantStudentCoursesRoute = Route$q.update({
  id: "/courses",
  path: "/courses",
  getParentRoute: () => TenantStudentRoute
});
const TenantStudentAiRoute = Route$p.update({
  id: "/ai",
  path: "/ai",
  getParentRoute: () => TenantStudentRoute
});
const TenantAdminUsersRoute = Route$o.update({
  id: "/users",
  path: "/users",
  getParentRoute: () => TenantAdminRoute
});
const TenantAdminSettingsRoute = Route$n.update({
  id: "/settings",
  path: "/settings",
  getParentRoute: () => TenantAdminRoute
});
const TenantAdminSecurityRoute = Route$m.update({
  id: "/security",
  path: "/security",
  getParentRoute: () => TenantAdminRoute
});
const TenantAdminQuizzesRoute = Route$l.update({
  id: "/quizzes",
  path: "/quizzes",
  getParentRoute: () => TenantAdminRoute
});
const TenantAdminProfileRoute = Route$k.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => TenantAdminRoute
});
const TenantAdminLiveSessionsRoute = Route$j.update({
  id: "/live-sessions",
  path: "/live-sessions",
  getParentRoute: () => TenantAdminRoute
});
const TenantAdminCoursesRoute = Route$i.update({
  id: "/courses",
  path: "/courses",
  getParentRoute: () => TenantAdminRoute
});
const TenantAdminCertificatesRoute = Route$h.update({
  id: "/certificates",
  path: "/certificates",
  getParentRoute: () => TenantAdminRoute
});
const TenantAdminAnalyticsRoute = Route$g.update({
  id: "/analytics",
  path: "/analytics",
  getParentRoute: () => TenantAdminRoute
});
const TenantStudentCoursesIndexRoute = Route$f.update({
  id: "/",
  path: "/",
  getParentRoute: () => TenantStudentCoursesRoute
});
const TenantAdminUsersIndexRoute = Route$e.update({
  id: "/",
  path: "/",
  getParentRoute: () => TenantAdminUsersRoute
});
const TenantAdminQuizzesIndexRoute = Route$d.update({
  id: "/",
  path: "/",
  getParentRoute: () => TenantAdminQuizzesRoute
});
const TenantAdminCoursesIndexRoute = Route$c.update({
  id: "/",
  path: "/",
  getParentRoute: () => TenantAdminCoursesRoute
});
const TenantStudentCoursesCourseIdRoute = Route$b.update({
  id: "/$courseId",
  path: "/$courseId",
  getParentRoute: () => TenantStudentCoursesRoute
});
const TenantAdminUsersNewRoute = Route$a.update({
  id: "/new",
  path: "/new",
  getParentRoute: () => TenantAdminUsersRoute
});
const TenantAdminUsersStudentIdRoute = Route$9.update({
  id: "/$studentId",
  path: "/$studentId",
  getParentRoute: () => TenantAdminUsersRoute
});
const TenantAdminQuizzesQuizIdRoute = Route$8.update({
  id: "/$quizId",
  path: "/$quizId",
  getParentRoute: () => TenantAdminQuizzesRoute
});
const TenantStudentCoursesCourseIdIndexRoute = Route$7.update({
  id: "/",
  path: "/",
  getParentRoute: () => TenantStudentCoursesCourseIdRoute
});
const TenantAdminUsersStudentIdIndexRoute = Route$6.update({
  id: "/",
  path: "/",
  getParentRoute: () => TenantAdminUsersStudentIdRoute
});
const TenantAdminQuizzesQuizIdIndexRoute = Route$5.update({
  id: "/",
  path: "/",
  getParentRoute: () => TenantAdminQuizzesQuizIdRoute
});
const TenantStudentCoursesCourseIdLearnRoute = Route$4.update({
  id: "/learn",
  path: "/learn",
  getParentRoute: () => TenantStudentCoursesCourseIdRoute
});
const TenantAdminUsersStudentIdProgressRoute = Route$3.update({
  id: "/progress",
  path: "/progress",
  getParentRoute: () => TenantAdminUsersStudentIdRoute
});
const TenantAdminQuizzesQuizIdQuestionsRoute = Route$2.update({
  id: "/questions",
  path: "/questions",
  getParentRoute: () => TenantAdminQuizzesQuizIdRoute
});
const TenantAdminCoursesCourseIdEditRoute = Route$1.update({
  id: "/$courseId/edit",
  path: "/$courseId/edit",
  getParentRoute: () => TenantAdminCoursesRoute
});
const TenantStudentCoursesCourseIdQuizQuizIdRoute = Route.update({
  id: "/quiz/$quizId",
  path: "/quiz/$quizId",
  getParentRoute: () => TenantStudentCoursesCourseIdRoute
});
const TenantAdminCoursesRouteChildren = {
  TenantAdminCoursesIndexRoute,
  TenantAdminCoursesCourseIdEditRoute
};
const TenantAdminCoursesRouteWithChildren = TenantAdminCoursesRoute._addFileChildren(TenantAdminCoursesRouteChildren);
const TenantAdminQuizzesQuizIdRouteChildren = {
  TenantAdminQuizzesQuizIdQuestionsRoute,
  TenantAdminQuizzesQuizIdIndexRoute
};
const TenantAdminQuizzesQuizIdRouteWithChildren = TenantAdminQuizzesQuizIdRoute._addFileChildren(
  TenantAdminQuizzesQuizIdRouteChildren
);
const TenantAdminQuizzesRouteChildren = {
  TenantAdminQuizzesQuizIdRoute: TenantAdminQuizzesQuizIdRouteWithChildren,
  TenantAdminQuizzesIndexRoute
};
const TenantAdminQuizzesRouteWithChildren = TenantAdminQuizzesRoute._addFileChildren(TenantAdminQuizzesRouteChildren);
const TenantAdminUsersStudentIdRouteChildren = {
  TenantAdminUsersStudentIdProgressRoute,
  TenantAdminUsersStudentIdIndexRoute
};
const TenantAdminUsersStudentIdRouteWithChildren = TenantAdminUsersStudentIdRoute._addFileChildren(
  TenantAdminUsersStudentIdRouteChildren
);
const TenantAdminUsersRouteChildren = {
  TenantAdminUsersStudentIdRoute: TenantAdminUsersStudentIdRouteWithChildren,
  TenantAdminUsersNewRoute,
  TenantAdminUsersIndexRoute
};
const TenantAdminUsersRouteWithChildren = TenantAdminUsersRoute._addFileChildren(TenantAdminUsersRouteChildren);
const TenantAdminRouteChildren = {
  TenantAdminAnalyticsRoute,
  TenantAdminCertificatesRoute,
  TenantAdminCoursesRoute: TenantAdminCoursesRouteWithChildren,
  TenantAdminLiveSessionsRoute,
  TenantAdminProfileRoute,
  TenantAdminQuizzesRoute: TenantAdminQuizzesRouteWithChildren,
  TenantAdminSecurityRoute,
  TenantAdminSettingsRoute,
  TenantAdminUsersRoute: TenantAdminUsersRouteWithChildren,
  TenantAdminIndexRoute
};
const TenantAdminRouteWithChildren = TenantAdminRoute._addFileChildren(
  TenantAdminRouteChildren
);
const TenantStudentCoursesCourseIdRouteChildren = {
  TenantStudentCoursesCourseIdLearnRoute,
  TenantStudentCoursesCourseIdIndexRoute,
  TenantStudentCoursesCourseIdQuizQuizIdRoute
};
const TenantStudentCoursesCourseIdRouteWithChildren = TenantStudentCoursesCourseIdRoute._addFileChildren(
  TenantStudentCoursesCourseIdRouteChildren
);
const TenantStudentCoursesRouteChildren = {
  TenantStudentCoursesCourseIdRoute: TenantStudentCoursesCourseIdRouteWithChildren,
  TenantStudentCoursesIndexRoute
};
const TenantStudentCoursesRouteWithChildren = TenantStudentCoursesRoute._addFileChildren(TenantStudentCoursesRouteChildren);
const TenantStudentRouteChildren = {
  TenantStudentAiRoute,
  TenantStudentCoursesRoute: TenantStudentCoursesRouteWithChildren,
  TenantStudentLiveSessionsRoute,
  TenantStudentProfileRoute,
  TenantStudentProgressRoute,
  TenantStudentIndexRoute
};
const TenantStudentRouteWithChildren = TenantStudentRoute._addFileChildren(
  TenantStudentRouteChildren
);
const TenantRouteChildren = {
  TenantAdminRoute: TenantAdminRouteWithChildren,
  TenantLoginRoute,
  TenantStudentRoute: TenantStudentRouteWithChildren,
  TenantIndexRoute
};
const TenantRouteWithChildren = TenantRoute._addFileChildren(TenantRouteChildren);
const SuperAdminRouteChildren = {
  SuperAdminIdentitiesRoute,
  SuperAdminInvitationsRoute,
  SuperAdminSettingsRoute,
  SuperAdminTelemetryRoute,
  SuperAdminTenantsRoute,
  SuperAdminIndexRoute
};
const SuperAdminRouteWithChildren = SuperAdminRoute._addFileChildren(
  SuperAdminRouteChildren
);
const rootRouteChildren = {
  IndexRoute,
  TenantRoute: TenantRouteWithChildren,
  LoginRoute,
  SuperAdminRoute: SuperAdminRouteWithChildren,
  VerifyCertificateRoute
};
const routeTree = Route$L._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const queryClient2 = new QueryClient();
  const router2 = createRouter({
    context: { queryClient: queryClient2 },
    defaultErrorComponent: ErrorBoundary,
    defaultNotFoundComponent: NotFound,
    defaultPreload: "intent",
    defaultPreloadStaleTime: secondsToMilliseconds(10),
    defaultStaleTime: minutesToMilliseconds(5),
    routeTree,
    scrollRestoration: true
  });
  setupRouterSsrQueryIntegration({
    queryClient: queryClient2,
    router: router2
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  useEnrollInCourse as $,
  AuthScope as A,
  useNotifications as B,
  useMarkAllNotificationsAsRead as C,
  useMarkNotificationAsRead as D,
  Route$x as E,
  useTenantAdminInvitation as F,
  Route$w as G,
  Route$v as H,
  useAuthContext as I,
  useUserProgress as J,
  Route$u as K,
  useDashboardMetrics as L,
  DataTable as M,
  Route$t as N,
  useListStudentProgress as O,
  PendingOverlay as P,
  Route$s as Q,
  Route$I as R,
  useChangePassword as S,
  updateProfileSchema as T,
  changePasswordSchema as U,
  userPreferencesSchema as V,
  Route$r as W,
  useListLiveSessions as X,
  useJoinLiveSession as Y,
  Route$q as Z,
  useListCourses as _,
  useResolvedAuthState as a,
  useCreateSection as a$,
  Route$p as a0,
  useAiHealth as a1,
  useCourseWithStructure as a2,
  useAiChatThread as a3,
  useListAiPracticeQuizSessions as a4,
  useGenerateAiPracticeQuiz as a5,
  useSubmitAiPracticeQuiz as a6,
  useSendAiChatMessage as a7,
  useCreateLiveSession as a8,
  formatDateInput as a9,
  openDuplicateCourseModal as aA,
  Route$b as aB,
  useSubscribeToTenant as aC,
  UniversalVideoPlayer as aD,
  Route$a as aE,
  createUserSchema as aF,
  Route$9 as aG,
  useUser as aH,
  useListActivityLogs as aI,
  useGetCertificates as aJ,
  createStudentProgressTableColumns as aK,
  Route$8 as aL,
  useQuiz as aM,
  CourseDetails as aN,
  StudentDetails as aO,
  QuizDetails as aP,
  Route$4 as aQ,
  useCourseProgress as aR,
  useMarkLessonComplete as aS,
  formatStudyTime as aT,
  Route$3 as aU,
  Route$2 as aV,
  api as aW,
  useCreateLessonResource as aX,
  useUpdateLessonResource as aY,
  useDeleteLessonResource as aZ,
  Route$1 as a_,
  DATE_PICKER_PRESETS as aa,
  useUpdateLiveSession as ab,
  Route$j as ac,
  useDeleteLiveSession as ad,
  useCreateCertificate as ae,
  Route$h as af,
  useListCertificates as ag,
  useUpdateCertificate as ah,
  Route$g as ai,
  CourseCatalog as aj,
  Route$e as ak,
  openEditStudentModal as al,
  openResetUserPasswordModal as am,
  openSendMessageModal as an,
  useCreateQuiz as ao,
  createQuizSchema as ap,
  useDeleteQuiz as aq,
  useUpdateQuiz as ar,
  Route$d as as,
  useQuizzes as at,
  useQuizAttempts as au,
  useCreateCourse as av,
  createCourseSchema as aw,
  useDeleteCourse as ax,
  useUpdateCourse as ay,
  Route$c as az,
  useSignOut as b,
  useCreateLesson as b0,
  useUpdateSection as b1,
  useUpdateLesson as b2,
  useDeleteSection as b3,
  useDeleteLesson as b4,
  useReorderSections as b5,
  Route as b6,
  useCreateQuizAttempt as b7,
  useUpdateQuizAttempt as b8,
  formatTime as b9,
  router as ba,
  Route$H as c,
  Route$G as d,
  useTenants as e,
  formatDate as f,
  useUsers as g,
  usePlatformActivityLogs as h,
  formatRelativeTime as i,
  formatDateTime as j,
  Route$E as k,
  useTenantAdminInvitations as l,
  useCreateTenantOnboarding as m,
  useReissueTenantAdminInvitation as n,
  useRevokeTenantAdminInvitation as o,
  useUpdateTenant as p,
  useSignInWithEmailAndPassword as q,
  useRedeemAdminInvitation as r,
  Route$B as s,
  useUpdatePlatformConfig as t,
  useFindCertificate as u,
  useCreateUser as v,
  useDeleteUser as w,
  useUpdateUser as x,
  Route$y as y,
  useUnreadNotificationsCount as z
};
