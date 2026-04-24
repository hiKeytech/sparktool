import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as ServerCrash, R as RefreshCw } from "../_libs/lucide-react.mjs";
import { a as Button } from "../_libs/mantine__core.mjs";
function ServiceUnavailable() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-stone-50 flex flex-col items-center justify-center gap-6 px-6 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-16 h-16 rounded-2xl bg-stone-100 border border-stone-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ServerCrash, { size: 32, className: "text-stone-400" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-sm space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold tracking-widest uppercase text-stone-400", children: "SparkTool" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-stone-900", children: "Service Temporarily Unavailable" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-stone-500", children: "The platform could not be reached. This is usually a temporary issue. Please check your connection and try again." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        color: "green",
        leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { size: 15 }),
        onClick: () => window.location.reload(),
        variant: "filled",
        children: "Try Again"
      }
    )
  ] });
}
export {
  ServiceUnavailable as S
};
