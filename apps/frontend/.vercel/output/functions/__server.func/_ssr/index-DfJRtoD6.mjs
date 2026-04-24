import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Navigate, e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { S as ServiceUnavailable } from "./service-unavailable-CvUKZURI.mjs";
import { d as Route$G, a as useResolvedAuthState } from "./router-D664CQ4V.mjs";
import { a as applyBrandingTheme } from "./branding-theme-Brsp41KT.mjs";
import { r as resolveRoleHomeTarget } from "./session-DEslDYHo.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { S as ShieldCheck, A as Activity, f as ArrowRight, G as GraduationCap, U as Users, d as BookOpen, B as Building2, g as CircleCheck, e as LockKeyhole, W as Waypoints } from "../_libs/lucide-react.mjs";
import { a as Button } from "../_libs/mantine__core.mjs";
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
import "../_libs/tabler__icons-react.mjs";
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
function PlatformLandingRoute() {
  const {
    platform
  } = Route$G.useRouteContext();
  const {
    loading,
    session,
    user
  } = useResolvedAuthState();
  reactExports.useLayoutEffect(() => {
    if (!platform) return;
    applyBrandingTheme({
      ...platform.branding,
      description: platform.marketing.heroDescription
    });
  }, [platform]);
  if (!platform) return /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceUnavailable, {});
  if (!loading && user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { replace: true, ...resolveRoleHomeTarget(user.role, session?.tenantIds?.[0]) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PlatformLandingPage, { platform });
}
const highlightIconCycle = [ShieldCheck, GraduationCap, Users, BookOpen, Building2, CircleCheck];
const featureIconCycle = [LockKeyhole, Waypoints, BookOpen, ShieldCheck, Users, GraduationCap];
function PlatformLandingPage({
  platform
}) {
  const navigate = useNavigate();
  const hero = platform.marketing;
  const highlights = hero.highlights;
  const loginFeatures = platform.branding.loginPage.features;
  const authRouteCount = platform.auth.strategies.length;
  const accessModel = platform.auth.allowSignup ? "Self-Service" : "Internal Admin";
  const metrics = [{
    label: "ACCESS MODEL",
    value: accessModel
  }, {
    label: "AUTH ROUTES",
    value: authRouteCount.toString().padStart(2, "0")
  }, {
    label: "CAPABILITIES",
    value: highlights.length.toString().padStart(2, "0")
  }, {
    label: "UPTIME TARGET",
    value: "99.9%"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#070b09] text-stone-900 font-sans selection:bg-fun-green-500/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-white/5 bg-[#070b09]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-0 transition-colors duration-1000 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_32%),linear-gradient(135deg,#1d4f35_0%,#113620_58%,#070b09_100%)] opacity-100" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 px-6 pt-8 pb-24 mx-auto max-w-7xl lg:px-8 lg:pt-10 lg:pb-32", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "flex items-center justify-between pb-12 sm:pb-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center p-2 border rounded-xl h-11 w-11 bg-white/5 border-white/10 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 24, className: "text-fun-green-400" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold tracking-wide text-white", children: platform.branding.portalName }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/50 text-[10px] uppercase tracking-[0.2em] font-medium hidden sm:block", children: "Infrastructure" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:support@correctional.gov.ng", className: "hidden text-xs font-semibold tracking-widest uppercase transition-colors sm:block text-white/60 hover:text-white", children: "Support" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "h-10 px-5 text-xs font-bold tracking-wider uppercase transition-all bg-white rounded-lg text-stone-900 hover:bg-stone-200", onClick: () => navigate({
              to: "/login"
            }), children: "Enter Platform" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl", "data-aos": "fade-up", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-fun-green-400 text-xs sm:text-sm font-bold uppercase tracking-[0.3em] mb-6 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 16 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: hero.eyebrow })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-4xl sm:text-6xl lg:text-7xl font-semibold text-white tracking-tighter leading-[1.05] mb-8", children: [
            hero.heroTitle.replace(".", ""),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-fun-green-500", children: "." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-2xl mb-12 text-lg font-light leading-relaxed sm:text-xl text-white/50", children: hero.heroDescription }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start gap-4 sm:flex-row sm:items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full px-8 text-sm font-bold tracking-wider text-white uppercase transition-all border rounded-lg bg-fun-green-600 hover:bg-fun-green-500 h-14 border-fun-green-500 sm:w-auto", onClick: () => navigate({
              to: "/login"
            }), rightSection: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 18, className: "opacity-70" }), children: hero.primaryCtaLabel }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full px-8 text-sm font-bold tracking-wider text-white uppercase transition-all bg-transparent border rounded-lg hover:bg-white/5 h-14 border-white/15 sm:w-auto", onClick: () => navigate({
              to: "/login"
            }), children: hero.secondaryCtaLabel })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 border-t border-white/10 bg-white/2 backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 mx-auto max-w-7xl lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 divide-y lg:grid-cols-4 divide-white/10 border-x border-white/10 lg:divide-y-0 lg:divide-x", children: metrics.map((metric, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-6", "data-aos": "fade-up", "data-aos-delay": i * 100, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-[10px] font-bold uppercase tracking-[0.25em] mb-2", children: metric.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-medium tracking-tight text-white", children: metric.value })
      ] }, metric.label)) }) }) })
    ] }),
    highlights.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-white border-b sm:py-32 border-stone-200", id: "features", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 mx-auto max-w-7xl lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mb-16", "data-aos": "fade-up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-fun-green-700 text-xs font-bold uppercase tracking-[0.25em] mb-4", children: "Platform Capabilities" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-semibold leading-tight tracking-tight sm:text-5xl text-stone-950", children: "Institutional Grade Infrastructure." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-lg font-light leading-relaxed text-stone-600", children: "Professional-grade environment to onboard, configure, and operate learning mandates securely — with absolute confidence." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-8 sm:grid-cols-2 lg:grid-cols-3", children: highlights.map((highlight, index) => {
        const HighlightIcon = highlightIconCycle[index % highlightIconCycle.length];
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-8 transition-colors duration-300 ease-out border group bg-stone-50 rounded-2xl border-stone-200/60 hover:bg-stone-100 hover:border-stone-300", "data-aos": "fade-up", "data-aos-delay": index * 100, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "inline-flex items-center justify-center w-12 h-12 mb-6 transition-transform duration-300 bg-white border shadow-sm rounded-xl border-stone-200 text-fun-green-700 group-hover:scale-110", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HighlightIcon, { size: 20, strokeWidth: 1.5 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-lg font-semibold tracking-tight text-stone-950", children: highlight.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-stone-600", children: highlight.description })
        ] }, highlight.title);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-[#fbFAF9] py-24 sm:py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 mx-auto max-w-7xl lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-16 lg:grid-cols-2 lg:gap-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-fun-green-700 text-xs font-bold uppercase tracking-[0.25em] mb-4", "data-aos": "fade-right", children: "Deployment Flow" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-12 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl text-stone-950", "data-aos": "fade-right", children: "From Authentication to Live Progress, Structurally Complete." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-12", children: [{
          step: "01",
          title: "AUTHENTICATE ACCESS",
          body: "Users enter through a controlled authentication route aligned to the platform's approved, secure access model."
        }, {
          step: "02",
          title: "SELECT LEARNING PATHWAY",
          body: "Highlighted priorities and guided entry cues point each user toward the correct organizational track immediately."
        }, {
          step: "03",
          title: "EXECUTE MODULES",
          body: "Track engagement through a heavily structured experience. Progress is logged, timestamped, and auditable."
        }].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", "data-aos": "fade-up", "data-aos-delay": i * 100, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-1 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-semibold tracking-tighter text-fun-green-700/20", children: item.step }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-3 text-sm font-bold tracking-widest uppercase text-stone-950", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-stone-600", children: item.body })
          ] })
        ] }, item.step)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-fun-green-700 text-xs font-bold uppercase tracking-[0.25em] mb-4", "data-aos": "fade-left", children: "Guided Variables" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-12 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl text-stone-950", "data-aos": "fade-left", children: "Configuration Engine." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 sm:grid-cols-2", children: loginFeatures.map((feature, index) => {
          const FeatureIcon = featureIconCycle[index % featureIconCycle.length];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 bg-white border shadow-sm rounded-2xl border-stone-200/70", "data-aos": "fade-up", "data-aos-delay": index * 100, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureIcon, { size: 20, className: "mb-4 text-stone-400", strokeWidth: 1.5 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "mb-2 text-sm font-semibold tracking-wider uppercase text-stone-950", children: feature.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs leading-relaxed text-stone-500", children: feature.description })
          ] }, feature.title);
        }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "bg-[#070b09] py-24 border-t border-white/10 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-fun-green-900/30 blur-[120px] rounded-full pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 max-w-4xl px-6 mx-auto text-center lg:px-8", "data-aos": "fade-up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/40 text-xs font-bold uppercase tracking-[0.25em] mb-6", children: "ENTERPRISE DEPLOYMENT" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-10 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl", children: "Scale Your Operational Network." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-4 sm:flex-row", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full px-10 text-sm font-bold tracking-wider uppercase transition-all bg-white rounded-lg hover:bg-stone-200 text-stone-950 h-14 sm:w-auto", onClick: () => navigate({
            to: "/login"
          }), children: "Access Platform" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full px-10 text-sm font-bold tracking-wider text-white uppercase transition-all bg-transparent border rounded-lg hover:bg-white/5 h-14 border-white/15 sm:w-auto", onClick: () => navigate({
            to: "/login"
          }), children: "Support Hub" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/40 font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            " ",
            platform.branding.portalName,
            " ",
            "INFRASTRUCTURE. ALL RIGHTS RESERVED."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-fun-green-500 animate-pulse" }),
            "ALL SYSTEMS OPERATIONAL"
          ] })
        ] })
      ] })
    ] })
  ] });
}
export {
  PlatformLandingRoute as component
};
