import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { f as useParams, e as useNavigate, h as useSearch, L as Link } from "../_libs/tanstack__react-router.mjs";
import { aQ as Route$4, I as useAuthContext, a2 as useCourseWithStructure, aR as useCourseProgress, aS as useMarkLessonComplete, P as PendingOverlay, aD as UniversalVideoPlayer } from "./router-D664CQ4V.mjs";
import { b as buildTenantPath } from "./session-DEslDYHo.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { D as Container, T as Text, G as Group, a as Button, H as Grid, y as Stack, E as Title, F as Card, an as Breadcrumbs, a9 as Anchor, R as Progress, ag as Divider, S as ScrollArea, B as Box, p as ActionIcon, ao as Collapse, Q as Badge } from "../_libs/mantine__core.mjs";
import { J as IconSettings, n as IconSparkles, Z as IconFileText, I as IconCheck, ar as IconHome, o as IconBook, as as IconList, O as IconVideo, at as IconChevronLeft, aa as IconLock, au as IconChevronRight, av as IconChevronDown, d as IconPlayerPlay } from "../_libs/tabler__icons-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
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
import "../_libs/date-fns.mjs";
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
const CourseBreadcrumbs = ({
  course,
  lesson,
  section,
  tenantId,
  variant = "full"
}) => {
  const breadcrumbItems = [
    {
      href: buildTenantPath(tenantId, "/student"),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconHome, { size: 14 }),
      title: "Home"
    },
    {
      href: buildTenantPath(tenantId, "/student/courses"),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconBook, { size: 14 }),
      title: "Course Catalog"
    }
  ];
  if (course) {
    breadcrumbItems.push({
      href: buildTenantPath(tenantId, `/student/courses/${course.id}`),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconBook, { size: 14 }),
      title: course.title ?? "Untitled Course"
    });
  }
  if (section && course) {
    const sectionId = section.id || section.title || "section";
    breadcrumbItems.push({
      href: buildTenantPath(
        tenantId,
        `/student/courses/${course.id}?section=${sectionId}`
      ),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconList, { size: 14 }),
      title: section.title ?? "Untitled Section"
    });
  }
  if (lesson && section && course) {
    breadcrumbItems.push({
      href: buildTenantPath(
        tenantId,
        `/student/courses/${course.id}?lesson=${lesson.id}`
      ),
      icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconVideo, { size: 14 }),
      title: lesson.title ?? "Untitled Lesson"
    });
  }
  if (variant === "compact") {
    const compactItems = breadcrumbItems.slice(-3);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumbs, { separator: "/", children: compactItems.map((item, index) => {
      const isLast = index === compactItems.length - 1;
      const isSecondLast = index === compactItems.length - 2;
      if (isLast) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "fun-green", fw: 600, size: "sm", children: item.title.length > 25 ? `${item.title.substring(0, 25)}...` : item.title }, item.href);
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Anchor,
        {
          c: isSecondLast ? "fun-green.6" : "dimmed",
          component: Link,
          size: "sm",
          to: item.href,
          underline: "hover",
          children: item.title.length > 20 ? `${item.title.substring(0, 20)}...` : item.title
        },
        item.href
      );
    }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumbs, { separator: "/", children: breadcrumbItems.map((item, index) => {
    const isLast = index === breadcrumbItems.length - 1;
    if (isLast) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "fun-green", fw: 600, size: "sm", children: item.title }, item.href);
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Anchor,
      {
        c: "fun-green.6",
        component: Link,
        size: "sm",
        to: item.href,
        underline: "hover",
        children: item.title
      },
      item.href
    );
  }) });
};
const CourseStructureSidebar = ({
  completedLessons = /* @__PURE__ */ new Set(),
  course,
  currentLessonId,
  onLessonSelect,
  tenantId
}) => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = reactExports.useState(
    new Set(course.sections?.map((section) => section.id) || [])
  );
  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };
  const handleLessonClick = (lesson) => {
    if (onLessonSelect) {
      onLessonSelect(lesson.id);
    } else {
      if (!course.id || !tenantId) return;
      navigate({
        params: { courseId: course.id, tenant: tenantId },
        search: { lesson: lesson.id },
        to: "/$tenant/student/courses/$courseId"
      });
    }
  };
  const calculateSectionProgress = (section) => {
    if (!section.lessons || section.lessons.length === 0) return 0;
    const completedInSection = section.lessons.filter(
      (lesson) => completedLessons.has(lesson.id)
    ).length;
    return completedInSection / section.lessons.length * 100;
  };
  const calculateCourseProgress = () => {
    const totalLessons2 = course.sections?.reduce(
      (acc, section) => acc + (section.lessons?.length || 0),
      0
    ) || 0;
    if (totalLessons2 === 0) return 0;
    return completedLessons.size / totalLessons2 * 100;
  };
  const isLessonLocked = (lesson, section) => {
    const sectionLessons = section.lessons || [];
    const currentLessonIndex = sectionLessons.findIndex(
      (l) => l.id === lesson.id
    );
    if (currentLessonIndex === 0) return false;
    const previousLesson = sectionLessons[currentLessonIndex - 1];
    return previousLesson && !completedLessons.has(previousLesson.id);
  };
  const getTotalCourseStats = () => {
    let totalLessons2 = 0;
    const totalQuizzes = 0;
    let totalDuration2 = 0;
    course.sections?.forEach((section) => {
      totalLessons2 += section.lessons?.length || 0;
      totalDuration2 += section.estimatedDurationInMinutes || 0;
      section.lessons?.forEach(() => {
      });
    });
    return { totalDuration: totalDuration2, totalLessons: totalLessons2, totalQuizzes };
  };
  const { totalDuration, totalLessons } = getTotalCourseStats();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Card,
    {
      h: "100%",
      style: { display: "flex", flexDirection: "column" },
      withBorder: true,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", style: { flex: 1 }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 600, lineClamp: 2, mb: "xs", size: "lg", children: course.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "md", mb: "sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconVideo, { size: 14 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", children: [
                totalLessons,
                " lessons"
              ] })
            ] }),
            totalDuration > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconFileText, { size: 14 }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", children: [
                Math.round(totalDuration / 60),
                "h ",
                totalDuration % 60,
                "m"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: 5, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 600, size: "sm", children: "Progress" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", children: [
                completedLessons.size,
                "/",
                totalLessons
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Progress,
              {
                color: "fun-green",
                radius: "sm",
                size: "sm",
                value: calculateCourseProgress()
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { style: { flex: 1 }, type: "scroll", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "sm", children: course.sections?.map((section, sectionIndex) => {
          const isExpanded = expandedSections.has(section.id);
          const sectionProgressValue = calculateSectionProgress(section);
          const isCurrentSection = section.lessons?.some(
            (lesson) => lesson.id === currentLessonId
          );
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Group,
              {
                gap: "sm",
                onClick: () => toggleSection(section.id),
                style: {
                  backgroundColor: isCurrentSection ? "var(--mantine-color-fun-green-0)" : void 0,
                  borderRadius: "6px",
                  cursor: "pointer",
                  padding: "8px"
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ActionIcon,
                    {
                      color: isCurrentSection ? "fun-green" : "gray",
                      size: "sm",
                      variant: "transparent",
                      children: isExpanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(IconChevronDown, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(IconChevronRight, { size: 14 })
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { style: { flex: 1 }, children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "flex-start", justify: "space-between", mb: 2, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Text,
                        {
                          c: isCurrentSection ? "fun-green" : void 0,
                          fw: 600,
                          lineClamp: 1,
                          size: "sm",
                          children: [
                            sectionIndex + 1,
                            ". ",
                            section.title
                          ]
                        }
                      ),
                      sectionProgressValue === 100 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        IconCheck,
                        {
                          color: "var(--mantine-color-fun-green-6)",
                          size: 14
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", mb: 4, children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", children: [
                        section.lessons?.length || 0,
                        " lessons"
                      ] }),
                      section.estimatedDurationInMinutes && /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", children: [
                        "• ",
                        section.estimatedDurationInMinutes,
                        " min"
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Progress,
                      {
                        color: "fun-green",
                        radius: "xs",
                        size: "xs",
                        value: sectionProgressValue
                      }
                    )
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Collapse, { in: isExpanded, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Stack,
              {
                gap: "xs",
                ml: "md",
                mt: "xs",
                pl: "md",
                style: {
                  borderLeft: "2px solid var(--mantine-color-gray-2)"
                },
                children: section.lessons?.map((lesson, lessonIndex) => {
                  const isCompleted = completedLessons.has(lesson.id);
                  const isCurrentLesson = lesson.id === currentLessonId;
                  const isLocked = isLessonLocked(lesson, section);
                  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Group,
                    {
                      gap: "sm",
                      onClick: () => !isLocked && handleLessonClick(lesson),
                      style: {
                        backgroundColor: isCurrentLesson ? "var(--mantine-color-fun-green-1)" : void 0,
                        borderRadius: "4px",
                        cursor: isLocked ? "not-allowed" : "pointer",
                        opacity: isLocked ? 0.6 : 1,
                        padding: "6px 8px"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ActionIcon,
                          {
                            color: isCompleted ? "fun-green" : isCurrentLesson ? "fun-green" : "gray",
                            size: "sm",
                            variant: "transparent",
                            children: isCompleted ? /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: 14 }) : isLocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(IconLock, { size: 14 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlayerPlay, { size: 14 })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { style: { flex: 1 }, children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Text,
                            {
                              c: isCurrentLesson ? "fun-green" : isCompleted ? "dark" : "dimmed",
                              fw: isCurrentLesson ? 600 : 400,
                              lineClamp: 2,
                              size: "sm",
                              children: [
                                lessonIndex + 1,
                                ". ",
                                lesson.title
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", mt: 2, children: [
                            lesson.estimatedDuration && /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", children: [
                              lesson.estimatedDuration,
                              " min"
                            ] }),
                            lesson.type && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "gray", size: "xs", variant: "light", children: lesson.type }),
                            lesson.isRequired && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "red", size: "xs", variant: "light", children: "Required" })
                          ] })
                        ] })
                      ]
                    },
                    lesson.id
                  );
                })
              }
            ) })
          ] }, section.id);
        }) }) })
      ] })
    }
  );
};
const LessonNavigation = ({
  completedLessons = /* @__PURE__ */ new Set(),
  course,
  currentLesson,
  currentSection,
  tenantId
}) => {
  const navigate = useNavigate();
  const allLessons = [];
  course.sections?.forEach((section) => {
    section.lessons?.forEach((lesson) => {
      const isCompleted = completedLessons.has(lesson.id);
      const isLocked = lesson.isRequired && !isCompleted;
      allLessons.push({
        isCompleted,
        isLocked,
        lesson,
        section
      });
    });
  });
  allLessons.sort((a, b) => {
    if ((a.section.order || 0) !== (b.section.order || 0)) {
      return (a.section.order || 0) - (b.section.order || 0);
    }
    return (a.lesson.order || 0) - (b.lesson.order || 0);
  });
  const currentLessonIndex = allLessons.findIndex(
    (item) => item.lesson.id === currentLesson?.id
  );
  const previousLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;
  const handleNavigateToLesson = (lesson) => {
    if (!course.id || !tenantId) return;
    navigate({
      params: { courseId: course.id, tenant: tenantId },
      search: { lesson: lesson.id },
      to: "/$tenant/student/courses/$courseId"
    });
  };
  const calculateProgress = () => {
    if (allLessons.length === 0) return 0;
    return completedLessons.size / allLessons.length * 100;
  };
  const completedCount = completedLessons.size;
  const totalCount = allLessons.length;
  const progressPercentage = calculateProgress();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "md", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 600, size: "sm", children: "Course Progress" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
          completedCount,
          "/",
          totalCount,
          " lessons"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Progress,
        {
          color: "fun-green",
          radius: "sm",
          size: "sm",
          value: progressPercentage
        }
      )
    ] }),
    currentLesson && currentSection && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", fw: 600, mb: 2, size: "xs", tt: "uppercase", children: "Currently Watching" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, lineClamp: 1, size: "sm", children: currentSection.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "fun-green", fw: 600, lineClamp: 1, size: "sm", children: currentLesson.title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { grow: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          color: "gray",
          disabled: !previousLesson,
          leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconChevronLeft, { size: 16 }),
          onClick: () => previousLesson && handleNavigateToLesson(previousLesson.lesson),
          size: "sm",
          variant: "light",
          children: "Previous"
        }
      ),
      nextLesson ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          color: "fun-green",
          disabled: nextLesson.isLocked,
          onClick: () => handleNavigateToLesson(nextLesson.lesson),
          rightSection: nextLesson.isLocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(IconLock, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(IconChevronRight, { size: 16 }),
          size: "sm",
          variant: "filled",
          children: nextLesson.isLocked ? "Locked" : "Next"
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          color: "fun-green",
          disabled: true,
          rightSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: 16 }),
          size: "sm",
          variant: "filled",
          children: "Complete"
        }
      )
    ] }),
    nextLesson && !nextLesson.isLocked && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", fw: 600, mb: 2, size: "xs", tt: "uppercase", children: "Up Next" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", lineClamp: 1, size: "sm", children: nextLesson.section.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, lineClamp: 2, size: "sm", children: nextLesson.lesson.title }),
      nextLesson.lesson.estimatedDuration && /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "xs", children: [
        nextLesson.lesson.estimatedDuration,
        " min"
      ] })
    ] }),
    !nextLesson && currentLesson && completedLessons.has(currentLesson.id) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { textAlign: "center" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "fun-green", fw: 600, mb: "xs", size: "sm", children: "🎉 Course Completed!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "xs", children: "You've finished all lessons in this course." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          color: "fun-green",
          mt: "sm",
          onClick: () => tenantId && navigate({
            params: { tenant: tenantId },
            to: "/$tenant/student/courses"
          }),
          size: "sm",
          variant: "light",
          children: "Browse More Courses"
        }
      )
    ] })
  ] }) });
};
function CourseView() {
  const {
    tenant
  } = Route$4.useRouteContext();
  const {
    user
  } = useAuthContext();
  const {
    courseId
  } = useParams({
    strict: false
  });
  const navigate = useNavigate();
  const searchParams = useSearch({
    strict: false
  });
  const currentLessonId = searchParams.lesson;
  const [activeTab, setActiveTab] = reactExports.useState("description");
  const {
    data: courseStructure,
    isLoading: courseLoading
  } = useCourseWithStructure(courseId || "");
  const {
    data: studentProgress,
    isLoading: progressLoading
  } = useCourseProgress(courseId || "", user?.uid || "");
  const markLessonCompleteMutation = useMarkLessonComplete();
  const currentLesson = courseStructure?.sections?.flatMap((section) => section.lessons || [])?.find((lesson) => lesson.id === currentLessonId);
  const currentSection = courseStructure?.sections?.find((section) => section.lessons?.some((lesson) => lesson.id === currentLessonId));
  reactExports.useEffect(() => {
    if (!tenant.id || !courseId) return;
    if (!currentLessonId && courseStructure?.sections?.[0]?.lessons?.[0]) {
      const firstLesson = courseStructure.sections[0].lessons[0];
      navigate({
        params: {
          courseId,
          tenant: tenant.id
        },
        replace: true,
        search: {
          lesson: firstLesson.id
        },
        to: "/$tenant/student/courses/$courseId/learn"
      });
    }
  }, [courseId, courseStructure, currentLessonId, navigate, tenant.id]);
  const handleLessonSelect = (lessonId) => {
    if (!tenant.id || !courseId) return;
    navigate({
      params: {
        courseId,
        tenant: tenant.id
      },
      search: {
        lesson: lessonId
      },
      to: "/$tenant/student/courses/$courseId/learn"
    });
  };
  const handleVideoProgress = (progress) => {
    if (!user?.uid || !courseId || !currentLesson || progress < 95) return;
    markLessonCompleteMutation.mutate({
      courseId,
      lessonId: currentLesson.id,
      sectionId: currentSection?.id || "",
      studentId: user.uid
    });
  };
  const handleVideoComplete = () => {
    if (!user?.uid || !courseId || !currentLesson) return;
    markLessonCompleteMutation.mutate({
      courseId,
      lessonId: currentLesson.id,
      sectionId: currentSection?.id || "",
      studentId: user.uid
    });
  };
  const handleMarkComplete = () => {
    if (!user?.uid || !courseId || !currentLesson) return;
    markLessonCompleteMutation.mutate({
      courseId,
      lessonId: currentLesson.id,
      sectionId: currentSection?.id || "",
      studentId: user.uid
    });
  };
  const isLessonCompleted = (lessonId, sectionId) => {
    const sectionProgressData = studentProgress?.sectionProgress?.find((sp) => sp.sectionId === sectionId);
    return sectionProgressData?.lessonsCompleted?.includes(lessonId) || false;
  };
  if (courseLoading || progressLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PendingOverlay, { reason: "Loading course...", visible: courseLoading || progressLoading });
  }
  if (!courseStructure) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { children: "Course not found" }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-4 bg-white border-b border-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "center", justify: "space-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CourseBreadcrumbs, { course: courseStructure, lesson: currentLesson, section: currentSection, tenantId: tenant.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "fun-green", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSettings, { size: 16 }), size: "sm", variant: "filled", children: "Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "violet", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSparkles, { size: 16 }), onClick: () => tenant.id && courseId && navigate({
        params: {
          tenant: tenant.id
        },
        search: {
          courseId
        },
        to: "/$tenant/student/ai"
      }), size: "sm", variant: "light", children: "Ask AI" })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-6", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { gutter: "lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        lg: 8
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-duration": "500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mb-1 text-sm font-medium text-fun-green-600", children: currentSection?.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "text-gray-800", order: 1, children: currentLesson?.title || courseStructure?.title })
        ] }),
        currentLesson?.content?.videoUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(UniversalVideoPlayer, { autoPlay: false, onComplete: handleVideoComplete, onProgress: handleVideoProgress, videoUrl: currentLesson.content.videoUrl }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b border-gray-200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `pb-2 border-b-2 ${activeTab === "description" ? "border-fun-green-600 text-fun-green-600" : "border-transparent text-gray-600"}`, onClick: () => setActiveTab("description"), type: "button", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `pb-2 border-b-2 ${activeTab === "resources" ? "border-fun-green-600 text-fun-green-600" : "border-transparent text-gray-600"}`, onClick: () => setActiveTab("resources"), type: "button", children: "Resources" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `pb-2 border-b-2 ${activeTab === "discussion" ? "border-fun-green-600 text-fun-green-600" : "border-transparent text-gray-600"}`, onClick: () => setActiveTab("discussion"), type: "button", children: "Q&A Discussion" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", withBorder: true, children: activeTab === "description" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-700", children: currentLesson?.description || courseStructure?.description }),
          courseStructure?.learningObjectives && courseStructure.learningObjectives.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mb-2 font-medium text-gray-800", size: "sm", children: "Learning Objectives:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1 list-disc list-inside", children: courseStructure.learningObjectives.map((objective, index) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-sm text-gray-600", children: objective }, index)) })
          ] })
        ] }) : activeTab === "resources" ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: currentLesson?.resources && currentLesson.resources.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "sm", children: currentLesson.resources.map((resource, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { className: "p-3 border rounded-lg bg-gray-50", gap: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconFileText, { className: "text-gray-600", size: 16 }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-medium", size: "sm", children: resource.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-600", size: "xs", children: resource.type.charAt(0).toUpperCase() + resource.type.slice(1) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { component: "a", href: resource.url, rel: "noopener noreferrer", size: "xs", target: "_blank", variant: "subtle", children: "Open" })
        ] }, index)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-500", children: "No resources available for this lesson." }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-700", children: "Ask or answer questions about this lesson to discuss topics with other students and instructors." }) }),
        currentLesson && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: `${isLessonCompleted(currentLesson.id, currentSection?.id || "") ? "bg-gray-400 hover:bg-gray-500" : "bg-fun-green-600 hover:bg-fun-green-700"}`, disabled: isLessonCompleted(currentLesson.id, currentSection?.id || ""), fullWidth: true, leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: 16 }), onClick: handleMarkComplete, size: "lg", children: isLessonCompleted(currentLesson.id, currentSection?.id || "") ? "Completed" : "Mark as Complete" }),
        courseStructure && /* @__PURE__ */ jsxRuntimeExports.jsx(LessonNavigation, { completedLessons: new Set(studentProgress?.sectionProgress?.flatMap((sp) => sp.lessonsCompleted || []) || []), course: courseStructure, currentLesson, currentSection, tenantId: tenant.id })
      ] }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: {
        base: 12,
        lg: 4
      }, children: courseStructure && /* @__PURE__ */ jsxRuntimeExports.jsx(CourseStructureSidebar, { completedLessons: new Set(studentProgress?.sectionProgress?.flatMap((sp) => sp.lessonsCompleted || []) || []), course: courseStructure, currentLessonId: currentLessonId || void 0, onLessonSelect: handleLessonSelect, tenantId: tenant.id }) })
    ] }) })
  ] });
}
export {
  CourseView as component
};
