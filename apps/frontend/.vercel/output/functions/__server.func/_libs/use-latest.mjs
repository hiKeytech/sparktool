import { a as requireReact } from "./react.mjs";
import { r as requireUseIsomorphicLayoutEffect_cjs } from "./use-isomorphic-layout-effect.mjs";
var useLatest_cjs = {};
var hasRequiredUseLatest_cjs;
function requireUseLatest_cjs() {
  if (hasRequiredUseLatest_cjs) return useLatest_cjs;
  hasRequiredUseLatest_cjs = 1;
  (function(exports$1) {
    Object.defineProperty(exports$1, "__esModule", { value: true });
    var React = requireReact();
    var useIsomorphicLayoutEffect = requireUseIsomorphicLayoutEffect_cjs();
    function _interopDefault(e) {
      return e && e.__esModule ? e : { "default": e };
    }
    var React__default = /* @__PURE__ */ _interopDefault(React);
    var useIsomorphicLayoutEffect__default = /* @__PURE__ */ _interopDefault(useIsomorphicLayoutEffect);
    var useLatest = function useLatest2(value) {
      var ref = React__default["default"].useRef(value);
      useIsomorphicLayoutEffect__default["default"](function() {
        ref.current = value;
      });
      return ref;
    };
    exports$1["default"] = useLatest;
  })(useLatest_cjs);
  return useLatest_cjs;
}
export {
  requireUseLatest_cjs as r
};
