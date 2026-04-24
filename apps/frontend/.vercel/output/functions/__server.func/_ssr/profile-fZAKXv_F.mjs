import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { Q as Route$s, I as useAuthContext, S as useChangePassword, x as useUpdateUser, J as useUserProgress, f as formatDate, U as changePasswordSchema, T as updateProfileSchema, V as userPreferencesSchema } from "./router-D664CQ4V.mjs";
import { z as zod4Resolver } from "../_libs/mantine-form-zod-resolver.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { u as useForm } from "../_libs/mantine__form.mjs";
import { D as Container, $ as Alert, F as Card, G as Group, a3 as Avatar, ai as FileButton, p as ActionIcon, E as Title, T as Text, Q as Badge, i as SimpleGrid, aa as Paper, a5 as Tabs, H as Grid, J as TextInput, a as Button, y as Stack, K as Select, ag as Divider, ab as Switch, R as Progress, a8 as PasswordInput } from "../_libs/mantine__core.mjs";
import { b as IconAlertCircle, a0 as IconCamera, m as IconUser, J as IconSettings, M as IconShield, z as IconTrophy, o as IconBook, q as IconCertificate, a1 as IconPalette, a2 as IconLanguage, g as IconClock, I as IconCheck } from "../_libs/tabler__icons-react.mjs";
import { m as modals } from "../_libs/mantine__modals.mjs";
import { n as notifications } from "../_libs/mantine__notifications.mjs";
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
import "../_libs/tanstack__react-table.mjs";
import "../_libs/tanstack__table-core.mjs";
import "../_libs/date-fns.mjs";
import "../_libs/zod.mjs";
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
function UserProfile() {
  const {
    tenant
  } = Route$s.useRouteContext();
  const {
    user
  } = useAuthContext();
  const [activeTab, setActiveTab] = reactExports.useState("profile");
  const resetRef = reactExports.useRef(null);
  const changePasswordMutation = useChangePassword();
  const updateUserMutation = useUpdateUser();
  const {
    data: userProgress = []
  } = useUserProgress(tenant.id, user?.uid || "", {
    enabled: !!user?.uid
  });
  const profileForm = useForm({
    initialValues: {
      department: user?.department || "",
      displayName: user?.displayName || "",
      location: user?.location || ""
    },
    validate: zod4Resolver(updateProfileSchema)
  });
  const passwordForm = useForm({
    initialValues: {
      confirmPassword: "",
      currentPassword: "",
      newPassword: ""
    },
    validate: zod4Resolver(changePasswordSchema)
  });
  const preferencesForm = useForm({
    initialValues: {
      language: user?.preferences?.language || "en",
      notifications: user?.preferences?.notifications ?? true,
      theme: user?.preferences?.theme || "light"
    },
    validate: zod4Resolver(userPreferencesSchema)
  });
  const handleProfileUpdate = async (values) => {
    if (!user) return;
    await updateUserMutation.mutateAsync({
      userData: {
        department: values.department,
        displayName: values.displayName,
        location: values.location
      },
      userId: user.uid || ""
    });
  };
  const handlePasswordChange = async (values) => {
    await changePasswordMutation.mutateAsync(values, {
      onError: (error) => {
        notifications.show({
          color: "red",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 16 }),
          message: error.message || "Failed to update password.",
          title: "Password Update Failed"
        });
      },
      onSuccess: () => {
        notifications.show({
          color: "green",
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: 16 }),
          message: "Your password has been updated successfully.",
          title: "Password Updated"
        });
      }
    });
    passwordForm.reset();
    modals.close("change-password-modal");
  };
  const handlePreferencesUpdate = async (values) => {
    if (!user) return;
    await updateUserMutation.mutateAsync({
      userData: {
        preferences: {
          language: values.language,
          notifications: values.notifications,
          theme: values.theme
        }
      },
      userId: user.uid || ""
    });
  };
  const handleAvatarUpload = (file) => {
    if (!file) return;
    console.log("Avatar upload:", file);
  };
  const openPasswordModal = () => {
    modals.open({
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: passwordForm.onSubmit(handlePasswordChange), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordInput, { label: "Current Password", placeholder: "Enter current password", ...passwordForm.getInputProps("currentPassword") }, passwordForm.key("currentPassword")),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordInput, { label: "New Password", placeholder: "Enter new password", ...passwordForm.getInputProps("newPassword") }, passwordForm.key("newPassword")),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordInput, { label: "Confirm New Password", placeholder: "Confirm new password", ...passwordForm.getInputProps("confirmPassword") }, passwordForm.key("confirmPassword"))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", mt: "xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => modals.close("change-password-modal"), variant: "outline", children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "fun-green", loading: changePasswordMutation.isPending, type: "submit", children: "Update Password" })
        ] })
      ] }),
      modalId: "change-password-modal",
      title: "Change Password"
    });
  };
  const completedCourses = userProgress.filter((p) => p.status === "completed").length;
  const inProgressCourses = userProgress.filter((p) => p.status === "in-progress").length;
  const totalWatchTime = userProgress.reduce((sum, p) => sum + (p.timeSpentMinutes || 0), 0);
  const averageProgress = userProgress.length > 0 ? userProgress.reduce((sum, p) => sum + (p.completionPercentage || 0), 0) / userProgress.length : 0;
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "red", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 16 }), children: "You must be logged in to view your profile." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { py: "xl", size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-aos": "fade-up", "data-aos-duration": "600", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { "data-aos": "fade-up", "data-aos-delay": "100", mb: "xl", p: "xl", radius: "lg", shadow: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "border-4 border-fun-green-200", radius: "xl", size: 80, src: user.photoURL }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileButton, { accept: "image/*", onChange: handleAvatarUpload, resetRef, children: (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(ActionIcon, { ...props, className: "absolute border-2 border-white -bottom-1 -right-1", color: "fun-green", radius: "xl", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCamera, { size: 16 }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "text-fun-green-800", order: 2, children: user.displayName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "lg", children: user.department }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", mt: "xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "fun-green", variant: "light", children: user.role === "student" ? "Student" : "Administrator" }),
            user.studentId && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { color: "gray", variant: "outline", children: [
              "ID: ",
              user.studentId
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SimpleGrid, { className: "text-center", cols: 3, spacing: "lg", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { bg: "fun-green.0", p: "md", radius: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "fun-green", fw: 700, size: "xl", children: completedCourses }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Completed" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { bg: "blue.0", p: "md", radius: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "blue", fw: 700, size: "xl", children: inProgressCourses }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "In Progress" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { bg: "orange.0", p: "md", radius: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "orange", fw: 700, size: "xl", children: [
            Math.round(averageProgress),
            "%"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Avg Progress" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { "data-aos": "fade-up", "data-aos-delay": "200", onChange: setActiveTab, value: activeTab, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs.List, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Tab, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconUser, { size: 16 }), value: "profile", children: "Profile" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Tab, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSettings, { size: 16 }), value: "preferences", children: "Preferences" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Tab, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconShield, { size: 16 }), value: "security", children: "Security" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Tab, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrophy, { size: 16 }), value: "achievements", children: "Achievements" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Panel, { pt: "xl", value: "profile", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-up", "data-aos-delay": "100", p: "xl", radius: "lg", shadow: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { mb: "lg", order: 3, children: "Personal Information" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: profileForm.onSubmit(handleProfileUpdate), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Grid, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Full Name", placeholder: "Enter your full name", ...profileForm.getInputProps("displayName"), leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconUser, { size: 16 }) }, profileForm.key("displayName")) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { disabled: true, label: "Email Address", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconUser, { size: 16 }), value: user.email || "" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Department", placeholder: "Your department", ...profileForm.getInputProps("department"), leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconBook, { size: 16 }) }, profileForm.key("department")) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Location", placeholder: "Your location", ...profileForm.getInputProps("location"), leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconUser, { size: 16 }) }, profileForm.key("location")) }),
            user.studentId && /* @__PURE__ */ jsxRuntimeExports.jsx(Grid.Col, { span: 6, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { disabled: true, label: "Student ID", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCertificate, { size: 16 }), value: user.studentId }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { justify: "flex-end", mt: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "fun-green", loading: updateUserMutation.isPending, type: "submit", children: "Update Profile" }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Panel, { pt: "xl", value: "preferences", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-up", "data-aos-delay": "100", p: "xl", radius: "lg", shadow: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { mb: "lg", order: 3, children: "App Preferences" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: preferencesForm.onSubmit(handlePreferencesUpdate), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { data: [{
              label: "Light Theme",
              value: "light"
            }, {
              label: "Dark Theme",
              value: "dark"
            }], description: "Choose your preferred theme", label: "Theme", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconPalette, { size: 16 }), placeholder: "Select theme", ...preferencesForm.getInputProps("theme") }, preferencesForm.key("theme")),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { data: [{
              label: "English",
              value: "en"
            }, {
              label: "French",
              value: "fr"
            }], description: "Choose your preferred language", label: "Language", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconLanguage, { size: 16 }), placeholder: "Select language", ...preferencesForm.getInputProps("language") }, preferencesForm.key("language")),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, mb: "xs", children: "Notifications" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { description: "Receive notifications about course updates and announcements", label: "Email Notifications", ...preferencesForm.getInputProps("notifications", {
                  type: "checkbox"
                }) }, preferencesForm.key("notifications")),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true, description: "Get reminders about incomplete courses", label: "Course Reminders" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true, description: "Receive notifications about quiz results", label: "Quiz Notifications" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { justify: "flex-end", mt: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "fun-green", loading: updateUserMutation.isPending, type: "submit", children: "Save Preferences" }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Panel, { pt: "xl", value: "security", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-up", "data-aos-delay": "100", p: "xl", radius: "lg", shadow: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { mb: "lg", order: 3, children: "Security Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "blue", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconShield, { size: 16 }), children: "Keep your account secure by using a strong password and enabling security features." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, children: "Password" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Last changed: Never" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "fun-green", onClick: openPasswordModal, variant: "outline", children: "Change Password" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, children: "Two-Factor Authentication" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Add an extra layer of security to your account" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "gray", disabled: true, variant: "outline", children: "Enable 2FA" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Divider, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, mb: "md", children: "Account Activity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: "Last login" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: user.lastLoginAt ? formatDate(user.lastLoginAt, "MMM DD, YYYY") : "Never" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: "Account created" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: formatDate(user.createdAt, "MMM DD, YYYY") })
              ] })
            ] })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs.Panel, { pt: "xl", value: "achievements", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "data-aos": "fade-up", "data-aos-delay": "100", p: "xl", radius: "lg", shadow: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { mb: "lg", order: 3, children: "Your Achievements" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SimpleGrid, { cols: 2, spacing: "lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { bg: "fun-green.0", "data-aos": "fade-up", "data-aos-delay": "150", p: "lg", radius: "md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconBook, { className: "text-fun-green-600", size: 32 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "fun-green", children: "Learning" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 600, size: "lg", children: [
              completedCourses,
              " Courses Completed"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { color: "fun-green", mt: "xs", value: completedCourses / Math.max(userProgress.length, 1) * 100 })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { bg: "blue.0", "data-aos": "fade-up", "data-aos-delay": "200", p: "lg", radius: "md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconClock, { className: "text-blue-600", size: 32 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "blue", children: "Time" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 600, size: "lg", children: [
              Math.round(totalWatchTime / 60),
              " Hours Studied"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", mt: "xs", size: "sm", children: "Keep up the great work!" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { bg: "orange.0", "data-aos": "fade-up", "data-aos-delay": "250", p: "lg", radius: "md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconCertificate, { className: "text-orange-600", size: 32 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "orange", children: "Certified" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 600, size: "lg", children: [
              user.certificatesEarned || 0,
              " Certificates"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", mt: "xs", size: "sm", children: "Professional credentials earned" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { bg: "fun-green.0", "data-aos": "fade-up", "data-aos-delay": "300", p: "lg", radius: "md", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", mb: "md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrophy, { className: "text-fun-green-600", size: 32 }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "fun-green", children: "Achievement" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 600, size: "lg", children: [
              Math.round(averageProgress),
              "% Average"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { color: "fun-green", mt: "xs", value: averageProgress })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, mb: "md", children: "Earned Badges" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
            completedCourses > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "fun-green", size: "lg", variant: "light", children: "First Course Complete" }),
            completedCourses >= 5 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "blue", size: "lg", variant: "light", children: "Course Champion" }),
            totalWatchTime > 600 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "orange", size: "lg", variant: "light", children: "Study Warrior" }),
            averageProgress >= 80 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "purple", size: "lg", variant: "light", children: "High Achiever" })
          ] })
        ] })
      ] }) })
    ] })
  ] }) });
}
export {
  UserProfile as component
};
