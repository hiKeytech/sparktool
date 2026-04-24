import { a as requireReact } from "./react.mjs";
var useIsomorphicLayoutEffect_cjs = {};
var hasRequiredUseIsomorphicLayoutEffect_cjs;
function requireUseIsomorphicLayoutEffect_cjs() {
  if (hasRequiredUseIsomorphicLayoutEffect_cjs) return useIsomorphicLayoutEffect_cjs;
  hasRequiredUseIsomorphicLayoutEffect_cjs = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    var react = requireReact();
    var isClient = typeof document !== "undefined";
    var noop = function noop2() {
    };
    var index = isClient ? react.useLayoutEffect : noop;
    exports$1["default"] = index;
  })(useIsomorphicLayoutEffect_cjs);
  return useIsomorphicLayoutEffect_cjs;
}
export {
  requireUseIsomorphicLayoutEffect_cjs as r
};
