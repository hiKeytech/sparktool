import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { q as useSignInWithEmailAndPassword, r as useRedeemAdminInvitation, j as formatDateTime } from "./router-D664CQ4V.mjs";
import { z as zod4Resolver } from "../_libs/mantine-form-zod-resolver.mjs";
import { S as ShieldCheck, A as Activity, W as Waypoints, d as BookOpen, U as Users, e as LockKeyhole } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import { y as Stack, T as Text, L as LoadingOverlay, $ as Alert, J as TextInput, a8 as PasswordInput, a as Button } from "../_libs/mantine__core.mjs";
import { u as useForm } from "../_libs/mantine__form.mjs";
import { b as IconAlertCircle } from "../_libs/tabler__icons-react.mjs";
import { o as object, s as string, e as email } from "../_libs/zod.mjs";
const baseSchema = object({
  displayName: string().trim().optional(),
  email: email("Invalid email address"),
  password: string().min(8, "Password must be at least 8 characters"),
  confirmPassword: string().optional()
});
function EmailPasswordStrategy({
  allowSignup = false,
  config: _config,
  invitationError,
  invitationPreview,
  invitationToken,
  label,
  restrictedDomains
}) {
  const isInvitationMode = Boolean(invitationToken);
  const [mode, setMode] = reactExports.useState("sign-in");
  const {
    mutate: signIn,
    isPending,
    error,
    isError
  } = useSignInWithEmailAndPassword();
  const {
    mutate: redeemInvitation,
    isPending: isRedeemingInvitation,
    error: redeemError,
    isError: isRedeemError
  } = useRedeemAdminInvitation();
  const schema = baseSchema.superRefine((values, context) => {
    if (isInvitationMode || mode === "sign-up") {
      if (!values.displayName) {
        context.addIssue({
          code: "custom",
          message: "Display name is required",
          path: ["displayName"]
        });
      } else if (values.displayName.trim().length < 2) {
        context.addIssue({
          code: "custom",
          message: "Display name must be at least 2 characters",
          path: ["displayName"]
        });
      }
      if (values.password !== values.confirmPassword) {
        context.addIssue({
          code: "custom",
          message: "Passwords do not match",
          path: ["confirmPassword"]
        });
      }
    }
  });
  const form = useForm({
    initialValues: {
      confirmPassword: "",
      displayName: invitationPreview?.displayName ?? invitationPreview?.email.split("@")[0] ?? "",
      email: invitationPreview?.email ?? "",
      password: ""
    },
    validate: zod4Resolver(schema)
  });
  const isBusy = isPending || isRedeemingInvitation;
  const handleSubmit = (values) => {
    const displayName = values.displayName?.trim() || void 0;
    if (isInvitationMode && invitationToken && invitationPreview) {
      redeemInvitation({
        department: null,
        displayName: displayName || invitationPreview.email.split("@")[0] || "Admin",
        location: null,
        password: values.password,
        tenantId: invitationPreview.tenantId,
        token: invitationToken
      });
      return;
    }
    signIn({
      allowSignup,
      displayName,
      email: values.email,
      mode,
      password: values.password,
      restrictedDomains
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { visible: isBusy }),
    (isError || isRedeemError || invitationError) && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Alert,
      {
        color: "red",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 16 }),
        mb: "md",
        variant: "light",
        children: invitationError || redeemError?.message || error?.message || "An error occurred during authentication."
      }
    ),
    isInvitationMode && invitationPreview ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { color: "green", mb: "md", variant: "light", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { fw: 600, size: "sm", children: [
        "Administrator invitation for ",
        invitationPreview.email
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
        "Complete account setup before",
        " ",
        formatDateTime(invitationPreview.expiresAt),
        "."
      ] })
    ] }) : null,
    /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
      (mode === "sign-up" || isInvitationMode) && /* @__PURE__ */ jsxRuntimeExports.jsx(
        TextInput,
        {
          classNames: {
            input: "border-stone-300 focus:border-fun-green-700",
            label: "mb-1 font-sans font-medium text-stone-900"
          },
          label: "Display name",
          placeholder: "Jane Doe",
          size: "md",
          ...form.getInputProps("displayName")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TextInput,
        {
          classNames: {
            input: "border-stone-300 focus:border-fun-green-700",
            label: "mb-1 font-sans font-medium text-stone-900"
          },
          disabled: isInvitationMode,
          label: "Email",
          placeholder: "your@email.com",
          size: "md",
          ...form.getInputProps("email")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PasswordInput,
        {
          classNames: {
            input: "border-stone-300 focus:border-fun-green-700",
            label: "mb-1 font-sans font-medium text-stone-900"
          },
          label: "Password",
          placeholder: "Your password",
          size: "md",
          ...form.getInputProps("password")
        }
      ),
      (mode === "sign-up" || isInvitationMode) && /* @__PURE__ */ jsxRuntimeExports.jsx(
        PasswordInput,
        {
          classNames: {
            input: "border-stone-300 focus:border-fun-green-700",
            label: "mb-1 font-sans font-medium text-stone-900"
          },
          label: "Confirm password",
          placeholder: "Repeat your password",
          size: "md",
          ...form.getInputProps("confirmPassword")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "mt-2 bg-fun-green-800 text-white shadow-sm transition-colors duration-300 hover:bg-fun-green-700",
          fullWidth: true,
          loading: isBusy,
          size: "lg",
          type: "submit",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans font-medium tracking-wide", children: isInvitationMode ? label || "Accept invitation" : mode === "sign-up" ? label || "Create account" : label || "Sign in" })
        }
      ),
      allowSignup && !isInvitationMode && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "font-sans text-fun-green-800 hover:bg-fun-green-50",
          onClick: () => {
            setMode(
              (currentMode) => currentMode === "sign-in" ? "sign-up" : "sign-in"
            );
            form.setFieldValue("confirmPassword", "");
          },
          size: "sm",
          type: "button",
          variant: "subtle",
          children: mode === "sign-in" ? "Need an account? Create one" : "Already have an account? Sign in"
        }
      )
    ] }) })
  ] });
}
function AuthStrategyResolver({
  allowSignup = false,
  invitationError,
  invitationPreview,
  invitationToken,
  restrictedDomains,
  strategies
}) {
  if (!strategies || strategies.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: strategies.map((strategy, index) => {
    switch (strategy.type) {
      case "email-password":
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          EmailPasswordStrategy,
          {
            allowSignup,
            config: strategy.config,
            invitationError,
            invitationPreview,
            invitationToken,
            label: strategy.label,
            restrictedDomains
          },
          index
        );
      case "sso":
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-gray-500 text-sm", children: "SSO strategy not yet implemented" }, index);
      default:
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-red-500", children: [
          "Unsupported strategy: ",
          strategy.type
        ] }, index);
    }
  }) });
}
const iconMap = {
  users: Users,
  shield: ShieldCheck,
  certificate: BookOpen,
  default: Waypoints
};
function LoginShell({
  auth,
  features,
  footnote,
  formDescription,
  formTitle,
  heroHeading,
  heroSubheading,
  invitationError,
  invitationPreview,
  invitationToken,
  portalName
}) {
  const restrictedDomains = auth.restrictedDomains?.length ? auth.restrictedDomains : auth.domains;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen bg-stone-50 font-sans selection:bg-fun-green-500/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative hidden w-[45%] flex-col justify-between overflow-hidden bg-[#070b09] p-12 text-white lg:flex lg:p-16 border-r border-white/10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_32%),linear-gradient(135deg,#1d4f35_0%,#113620_58%,#070b09_100%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center space-x-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-2 rounded-xl h-12 w-12 bg-white/5 border border-white/10 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 26, className: "text-fun-green-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans text-xl font-bold tracking-wide", children: portalName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans text-[10px] tracking-[0.2em] uppercase text-white/50 font-medium", children: "Authentication Gateway" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 my-auto pt-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            animate: { opacity: 1, y: 0 },
            initial: { opacity: 0, y: 20 },
            transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
            className: "mb-16",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-fun-green-400 text-xs font-bold uppercase tracking-[0.3em] mb-4 flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 14 }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Secure Access" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-4xl xl:text-5xl font-semibold text-white tracking-tighter leading-[1.1]", children: [
                heroHeading.replace(".", ""),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-fun-green-500", children: "." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-md mt-6 text-lg font-light leading-relaxed text-white/60", children: heroSubheading })
            ]
          }
        ),
        features.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-8 max-w-md", children: features.map((feature, index) => {
          const Icon = iconMap[feature.icon] || iconMap.default;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              animate: { opacity: 1, y: 0 },
              initial: { opacity: 0, y: 20 },
              transition: {
                delay: 0.2 + index * 0.1,
                duration: 0.8,
                ease: [0.19, 1, 0.22, 1]
              },
              className: "group flex gap-5 items-start",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/60 transition-colors duration-300 group-hover:bg-white/10 group-hover:text-fun-green-400 group-hover:border-white/20 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 20, strokeWidth: 1.5 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col pt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold tracking-wide text-white text-sm", children: feature.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm font-light leading-relaxed text-white/50", children: feature.description })
                ] })
              ]
            },
            feature.title
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center justify-between text-[10px] tracking-widest uppercase text-white/40 font-semibold border-t border-white/10 pt-8 mt-12", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          portalName,
          "."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-fun-green-500 animate-pulse" }),
          "SECURE CONNECTION"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex w-full flex-col justify-center bg-white lg:w-[55%]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 flex w-full items-center px-6 py-5 bg-[#070b09] text-white lg:hidden border-b border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-1.5 rounded-lg bg-white/5 border border-white/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 20, className: "text-fun-green-400" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans font-semibold tracking-wide text-sm", children: portalName })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          animate: { opacity: 1, x: 0 },
          className: "mx-auto w-full max-w-md px-6 sm:px-12 xl:px-0 py-24 lg:py-0",
          initial: { opacity: 0, x: 20 },
          transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center lg:text-left", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex lg:hidden items-center justify-center w-12 h-12 rounded-xl bg-fun-green-50 border border-fun-green-100 text-fun-green-700 mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LockKeyhole, { size: 24, strokeWidth: 1.5 }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mb-3 font-sans text-3xl font-semibold tracking-tight text-stone-950 sm:text-4xl text-balance", children: formTitle }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-sans text-base text-stone-600 leading-relaxed font-light", children: formDescription })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              AuthStrategyResolver,
              {
                allowSignup: auth.allowSignup,
                invitationError,
                invitationPreview,
                invitationToken,
                restrictedDomains,
                strategies: auth.strategies
              }
            ) }),
            footnote ? /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "mt-6 text-center lg:text-left font-sans text-xs text-stone-500 max-w-sm mx-auto lg:mx-0", children: footnote }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 flex flex-col items-center gap-3 text-[10px] tracking-widest uppercase text-stone-400 font-semibold lg:hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-fun-green-500 animate-pulse" }),
                "SECURE CONNECTION"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "© ",
                (/* @__PURE__ */ new Date()).getFullYear(),
                " ",
                portalName,
                "."
              ] })
            ] })
          ] })
        }
      )
    ] })
  ] });
}
export {
  LoginShell as L
};
