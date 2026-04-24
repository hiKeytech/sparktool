import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
function NCSLogo({ className = "", size = 40, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "img",
    {
      alt: "Nigerian Correctional Service",
      className: clsx("rounded-full", className),
      height: size,
      src: "/nigerian-correctional-service-badge.png",
      width: size,
      ...props
    }
  );
}
export {
  NCSLogo as N
};
