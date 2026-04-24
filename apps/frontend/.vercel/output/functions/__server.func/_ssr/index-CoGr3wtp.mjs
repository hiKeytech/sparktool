import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Navigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { k as Route$E, a as useResolvedAuthState } from "./router-D664CQ4V.mjs";
import { r as resolveRoleHomeTarget } from "./session-DEslDYHo.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { G as Group, T as Text, a as Button, Q as Badge, E as Title, a9 as Anchor, aa as Paper } from "../_libs/mantine__core.mjs";
import { S as ShieldCheck, i as ChevronRight, j as LayoutGrid, D as Database } from "../_libs/lucide-react.mjs";
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
function FeatureCard({
  icon: Icon,
  title,
  description,
  delay
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "xl", radius: "xl", className: "bg-[#0c160f]/80 backdrop-blur-xl border border-[#1b7339]/20 hover:border-[#1b7339]/50 transition-all duration-500 overflow-hidden relative group h-full", "data-aos": "fade-up", "data-aos-delay": delay, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-linear-to-br from-[#1b7339]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-6 inline-flex p-3 rounded-2xl bg-linear-to-br from-[#1b7339] to-[#0f4420] text-white shadow-lg shadow-[#1b7339]/20 ring-1 ring-white/10 group-hover:scale-110 transition-transform duration-500", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 28, strokeWidth: 1.5 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-xl font-bold tracking-tight text-white", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-light leading-relaxed text-white/60 sm:text-base", children: description })
    ] })
  ] });
}
const CURRENT_YEAR = (/* @__PURE__ */ new Date()).getFullYear();
function TenantLandingPage() {
  const {
    tenant
  } = Route$E.useRouteContext();
  const {
    loading,
    user
  } = useResolvedAuthState(tenant);
  const {
    portalName
  } = tenant.config.branding;
  const {
    copyright,
    footerTagline
  } = tenant.config.publicSite;
  if (!loading && user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { replace: true, ...resolveRoleHomeTarget(user.role, tenant.id) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-[#070b09] selection:bg-[#1b7339]/30 font-sans flex flex-col font-light text-stone-200", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "fixed top-0 left-0 right-0 z-50 px-6 py-5 lg:px-8 bg-[#070b09]/80 backdrop-blur-md border-b border-white/5 transition-all", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", className: "transition-opacity opacity-90 hover:opacity-100", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-linear-to-tr from-[#1b7339] to-[#0f4420] flex items-center justify-center border border-white/10 shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 18, className: "text-white" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-sm font-bold leading-none tracking-wide text-white", children: portalName }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-[10px] text-white/50 uppercase tracking-[0.2em] font-medium leading-none mt-1", children: "Infrastructure" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "hidden md:block text-xs uppercase tracking-widest text-[#1b7339] font-bold", children: "Secure Terminal" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/$tenant/login", params: {
          tenant: tenant.id
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "border-white/20 text-white hover:bg-white hover:text-[#070b09] font-semibold text-xs uppercase tracking-wider h-10 px-6 rounded-xl transition-all", children: "Access Portal" }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center pt-32 pb-20 border-b grow lg:pt-48 lg:pb-32 border-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,rgba(27,115,57,0.15),transparent_40%),linear-gradient(180deg,#070b09_0%,#0a140d_100%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center gap-16 px-6 mx-auto text-center max-w-7xl lg:px-8 sm:text-left md:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 md:pr-12", "data-aos": "fade-up", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "green", variant: "outline", size: "sm", className: "mb-6 tracking-[0.2em] uppercase bg-[#1b7339]/10 border-[#1b7339]/30 text-[#1b7339] font-bold", children: tenant.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Title, { className: "text-5xl sm:text-6xl lg:text-[5rem] font-bold text-white leading-[1.1] tracking-tighter mb-8 max-w-3xl", children: [
            "Knowledge",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-transparent bg-clip-text bg-linear-to-r from-[#1b7339] to-[#34d399] font-serif italic pr-2", children: "Deployments" }),
            " ",
            "at Scale."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-2xl mt-4 mb-10 text-base font-light leading-relaxed sm:text-lg text-white/50", children: "Secure, multi-layered learning infrastructure built for structural integrity and rapid onboarding across distributed agencies." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { className: "justify-center sm:justify-start", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/$tenant/login", params: {
            tenant: tenant.id
          }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", rightSection: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { size: 18 }), className: "bg-linear-to-br from-[#1b7339] to-[#0f4420] text-white hover:opacity-90 shadow-xl shadow-[#1b7339]/20 h-14 px-8 rounded-full font-bold uppercase tracking-wider text-xs transition-all hover:-translate-y-1", children: "Authenticate Now" }) }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 hidden md:block", "data-aos": "zoom-in", "data-aos-delay": "200", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full mx-auto cursor-pointer aspect-square max-w-125 group perspective-1000", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-4 rounded-4xl bg-linear-to-tr from-[#1b7339]/20 to-transparent border border-white/10 backdrop-blur-xl rotate-10 group-hover:rotate-15 transition-all duration-700 ease-out shadow-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-8 rounded-4xl bg-linear-to-b from-[#1b7339]/40 to-[#070b09] border border-[#1b7339]/40 backdrop-blur-2xl -rotate-[5deg] group-hover:-rotate-[8deg] transition-all duration-700 ease-out p-8 flex flex-col justify-end shadow-2xl", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 bg-white mb-6 rounded-xl shadow-[0_0_40px_rgba(255,255,255,0.4)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1/3 h-2 mb-3 rounded-full bg-white/20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-2/3 h-2 rounded-full bg-white/10" })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 w-full px-6 py-24 mx-auto border-b lg:py-32 max-w-7xl lg:px-8 border-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-20 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[#1b7339] text-xs font-bold uppercase tracking-[0.25em] mb-4", children: "Engineered For Scale" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-3xl font-bold tracking-tight text-white sm:text-4xl", children: "Institutional Architecture" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-6 md:grid-cols-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureCard, { icon: LayoutGrid, title: "Multi-Tenant Core", description: "Isolate operations with cryptographically discrete domains. Launch localized environments for separate departments instantly.", delay: 0 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureCard, { icon: ShieldCheck, title: "Sovereign Access", description: "Military-grade role-based access control. Ensure granular visibility bounds for administrative oversight vs generic consumption.", delay: 150 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FeatureCard, { icon: Database, title: "Telemetry Streams", description: "Real-time analytics and metric rollups. Track knowledge propagation and compliance completion across network nodes.", delay: 300 })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "relative bg-[#070b09] border-t border-transparent pt-16 pb-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 mx-auto max-w-7xl lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-between gap-8 pb-12 mb-8 border-b md:flex-row border-white/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", className: "transition-all duration-500 opacity-50 cursor-default grayscale hover:opacity-100 hover:grayscale-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-6 h-6 rounded-md bg-[#1b7339] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 14, className: "text-white" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-sm font-bold tracking-wider text-white uppercase", children: portalName })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { gap: "xl", children: ["Compliance", "Infrastructure", "Security Policy", "Telemetry"].map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(Anchor, { href: "#", className: "text-[10px] uppercase tracking-widest text-white/40 hover:text-white font-bold transition-colors", children: link }, link)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-between gap-4 sm:flex-row", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { className: "text-xs font-medium text-white/30", children: [
          "© ",
          CURRENT_YEAR,
          " ",
          copyright
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-[10px] uppercase text-white/20 font-mono tracking-widest", children: footerTagline })
      ] })
    ] }) })
  ] });
}
export {
  TenantLandingPage as component
};
