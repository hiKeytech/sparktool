import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
function TenantLookupError() {
  reactExports.useLayoutEffect(() => {
    document.title = "Tenant not found";
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-stone-50 px-6 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-lg rounded-lg border border-stone-200 bg-white p-8 shadow-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-sans text-2xl font-semibold text-stone-900", children: "Tenant not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-sans text-sm leading-6 text-stone-600", children: "The tenant URL you visited does not match any configured workspace. Check the address and try again, or return to the platform entry." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 flex gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: "inline-flex rounded-md bg-fun-green-800 px-4 py-2 font-sans text-sm font-medium text-white hover:bg-fun-green-700", to: "/", children: "Go to platform" }) })
  ] }) });
}
export {
  TenantLookupError as errorComponent
};
