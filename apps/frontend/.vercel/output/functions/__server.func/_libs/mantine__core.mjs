import { r as reactExports, j as jsxRuntimeExports, R as React } from "./react.mjs";
import { u as useIsomorphicEffect, a as useDidUpdate, m as mergeRefs, b as useReducedMotion, c as useCallbackRef, d as useMergedRef, e as useDebouncedCallback, f as assignRef, g as useFocusTrap, h as useFocusReturn, i as useUncontrolled, j as useId, k as useClickOutside, l as useWindowEvent, n as useClipboard, o as useDisclosure, p as clamp$1, q as usePagination, r as usePrevious } from "./mantine__hooks.mjs";
import { c as clsx } from "./clsx.mjs";
import { R as ReactRemoveScroll } from "./react-remove-scroll.mjs";
import { r as reactTextareaAutosize_cjs_defaultExports } from "./react-textarea-autosize.mjs";
import { r as reactDomExports, a as ReactDOM } from "./react-dom.mjs";
import { N as NumericFormat } from "./react-number-format.mjs";
import { u as useMergeRefs, a as useFloating, F as FloatingDelayGroup, b as useDelayGroup, c as useInteractions, d as useHover, e as useFocus, f as useRole, g as useDismiss } from "./floating-ui__react.mjs";
import { o as offset, h as hide, f as flip, s as shift, i as inline, a as arrow, b as size, l as limitShift } from "./floating-ui__react-dom.mjs";
import { g as getOverflowAncestors } from "./floating-ui__utils.mjs";
import { a as autoUpdate } from "./floating-ui__dom.mjs";
function keys(object) {
  return Object.keys(object);
}
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}
function deepMerge(target, source) {
  const result = { ...target };
  const _source = source;
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach((key) => {
      if (isObject(_source[key])) {
        if (!(key in target)) {
          result[key] = _source[key];
        } else {
          result[key] = deepMerge(result[key], _source[key]);
        }
      } else {
        result[key] = _source[key];
      }
    });
  }
  return result;
}
function camelToKebabCase(value) {
  return value.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}
function getTransformedScaledValue(value) {
  if (typeof value !== "string" || !value.includes("var(--mantine-scale)")) {
    return value;
  }
  return value.match(/^calc\((.*?)\)$/)?.[1].split("*")[0].trim();
}
function px(value) {
  const transformedValue = getTransformedScaledValue(value);
  if (typeof transformedValue === "number") {
    return transformedValue;
  }
  if (typeof transformedValue === "string") {
    if (transformedValue.includes("calc") || transformedValue.includes("var")) {
      return transformedValue;
    }
    if (transformedValue.includes("px")) {
      return Number(transformedValue.replace("px", ""));
    }
    if (transformedValue.includes("rem")) {
      return Number(transformedValue.replace("rem", "")) * 16;
    }
    if (transformedValue.includes("em")) {
      return Number(transformedValue.replace("em", "")) * 16;
    }
    return Number(transformedValue);
  }
  return NaN;
}
function scaleRem(remValue) {
  if (remValue === "0rem") {
    return "0rem";
  }
  return `calc(${remValue} * var(--mantine-scale))`;
}
function createConverter(units, { shouldScale = false } = {}) {
  function converter(value) {
    if (value === 0 || value === "0") {
      return `0${units}`;
    }
    if (typeof value === "number") {
      const val = `${value / 16}${units}`;
      return shouldScale ? scaleRem(val) : val;
    }
    if (typeof value === "string") {
      if (value === "") {
        return value;
      }
      if (value.startsWith("calc(") || value.startsWith("clamp(") || value.includes("rgba(")) {
        return value;
      }
      if (value.includes(",")) {
        return value.split(",").map((val) => converter(val)).join(",");
      }
      if (value.includes(" ")) {
        return value.split(" ").map((val) => converter(val)).join(" ");
      }
      const replaced = value.replace("px", "");
      if (!Number.isNaN(Number(replaced))) {
        const val = `${Number(replaced) / 16}${units}`;
        return shouldScale ? scaleRem(val) : val;
      }
    }
    return value;
  }
  return converter;
}
const rem = createConverter("rem", { shouldScale: true });
const em = createConverter("em");
function filterProps(props) {
  return Object.keys(props).reduce((acc, key) => {
    if (props[key] !== void 0) {
      acc[key] = props[key];
    }
    return acc;
  }, {});
}
function isNumberLike(value) {
  if (typeof value === "number") {
    return true;
  }
  if (typeof value === "string") {
    if (value.startsWith("calc(") || value.startsWith("var(") || value.includes(" ") && value.trim() !== "") {
      return true;
    }
    const cssUnitsRegex = /^[+-]?[0-9]+(\.[0-9]+)?(px|em|rem|ex|ch|lh|rlh|vw|vh|vmin|vmax|vb|vi|svw|svh|lvw|lvh|dvw|dvh|cm|mm|in|pt|pc|q|cqw|cqh|cqi|cqb|cqmin|cqmax|%)?$/;
    const values2 = value.trim().split(/\s+/);
    return values2.every((val) => cssUnitsRegex.test(val));
  }
  return false;
}
function isElement(value) {
  if (Array.isArray(value) || value === null) {
    return false;
  }
  if (typeof value === "object") {
    if (value.type === reactExports.Fragment) {
      return false;
    }
    return true;
  }
  return false;
}
function createSafeContext(errorMessage) {
  const Context = reactExports.createContext(null);
  const useSafeContext = () => {
    const ctx = reactExports.useContext(Context);
    if (ctx === null) {
      throw new Error(errorMessage);
    }
    return ctx;
  };
  const Provider = ({ children, value }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
  return [Provider, useSafeContext];
}
function createOptionalContext(initialValue = null) {
  const Context = reactExports.createContext(initialValue);
  const useOptionalContext = () => reactExports.useContext(Context);
  const Provider = ({ children, value }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
  return [Provider, useOptionalContext];
}
function getSafeId(uid, errorMessage) {
  return (value) => {
    if (typeof value !== "string" || value.trim().length === 0) {
      throw new Error(errorMessage);
    }
    return `${uid}-${value}`;
  };
}
function findElementAncestor(element, selector) {
  let _element = element;
  while ((_element = _element.parentElement) && !_element.matches(selector)) {
  }
  return _element;
}
function getPreviousIndex$1(current, elements, loop) {
  for (let i = current - 1; i >= 0; i -= 1) {
    if (!elements[i].disabled) {
      return i;
    }
  }
  if (loop) {
    for (let i = elements.length - 1; i > -1; i -= 1) {
      if (!elements[i].disabled) {
        return i;
      }
    }
  }
  return current;
}
function getNextIndex$1(current, elements, loop) {
  for (let i = current + 1; i < elements.length; i += 1) {
    if (!elements[i].disabled) {
      return i;
    }
  }
  if (loop) {
    for (let i = 0; i < elements.length; i += 1) {
      if (!elements[i].disabled) {
        return i;
      }
    }
  }
  return current;
}
function onSameLevel(target, sibling, parentSelector) {
  return findElementAncestor(target, parentSelector) === findElementAncestor(sibling, parentSelector);
}
function createScopedKeydownHandler({
  parentSelector,
  siblingSelector,
  onKeyDown,
  loop = true,
  activateOnFocus = false,
  dir = "rtl",
  orientation
}) {
  return (event) => {
    onKeyDown?.(event);
    const elements = Array.from(
      findElementAncestor(event.currentTarget, parentSelector)?.querySelectorAll(
        siblingSelector
      ) || []
    ).filter((node) => onSameLevel(event.currentTarget, node, parentSelector));
    const current = elements.findIndex((el) => event.currentTarget === el);
    const _nextIndex = getNextIndex$1(current, elements, loop);
    const _previousIndex = getPreviousIndex$1(current, elements, loop);
    const nextIndex = dir === "rtl" ? _previousIndex : _nextIndex;
    const previousIndex = dir === "rtl" ? _nextIndex : _previousIndex;
    switch (event.key) {
      case "ArrowRight": {
        if (orientation === "horizontal") {
          event.stopPropagation();
          event.preventDefault();
          elements[nextIndex].focus();
          activateOnFocus && elements[nextIndex].click();
        }
        break;
      }
      case "ArrowLeft": {
        if (orientation === "horizontal") {
          event.stopPropagation();
          event.preventDefault();
          elements[previousIndex].focus();
          activateOnFocus && elements[previousIndex].click();
        }
        break;
      }
      case "ArrowUp": {
        if (orientation === "vertical") {
          event.stopPropagation();
          event.preventDefault();
          elements[_previousIndex].focus();
          activateOnFocus && elements[_previousIndex].click();
        }
        break;
      }
      case "ArrowDown": {
        if (orientation === "vertical") {
          event.stopPropagation();
          event.preventDefault();
          elements[_nextIndex].focus();
          activateOnFocus && elements[_nextIndex].click();
        }
        break;
      }
      case "Home": {
        event.stopPropagation();
        event.preventDefault();
        !elements[0].disabled && elements[0].focus();
        break;
      }
      case "End": {
        event.stopPropagation();
        event.preventDefault();
        const last = elements.length - 1;
        !elements[last].disabled && elements[last].focus();
        break;
      }
    }
  };
}
const elevations = {
  app: 100,
  modal: 200,
  popover: 300,
  overlay: 400,
  max: 9999
};
function getDefaultZIndex(level) {
  return elevations[level];
}
const noop = () => {
};
function closeOnEscape(callback, options = { active: true }) {
  if (typeof callback !== "function" || !options.active) {
    return options.onKeyDown || noop;
  }
  return (event) => {
    if (event.key === "Escape") {
      callback(event);
      options.onTrigger?.();
    }
  };
}
function getSize(size2, prefix = "size", convertToRem = true) {
  if (size2 === void 0) {
    return void 0;
  }
  return isNumberLike(size2) ? convertToRem ? rem(size2) : size2 : `var(--${prefix}-${size2})`;
}
function getSpacing(size2) {
  return getSize(size2, "mantine-spacing");
}
function getRadius(size2) {
  if (size2 === void 0) {
    return "var(--mantine-radius-default)";
  }
  return getSize(size2, "mantine-radius");
}
function getFontSize(size2) {
  return getSize(size2, "mantine-font-size");
}
function getLineHeight(size2) {
  return getSize(size2, "mantine-line-height", false);
}
function getShadow(size2) {
  if (!size2) {
    return void 0;
  }
  return getSize(size2, "mantine-shadow", false);
}
function createEventHandler(parentEventHandler, eventHandler) {
  return (event) => {
    parentEventHandler?.(event);
    eventHandler?.(event);
  };
}
function getBreakpointValue$1(breakpoint, breakpoints) {
  if (breakpoint in breakpoints) {
    return px(breakpoints[breakpoint]);
  }
  return px(breakpoint);
}
function getSortedBreakpoints(values2, breakpoints) {
  const convertedBreakpoints = values2.map((breakpoint) => ({
    value: breakpoint,
    px: getBreakpointValue$1(breakpoint, breakpoints)
  }));
  convertedBreakpoints.sort((a, b) => a.px - b.px);
  return convertedBreakpoints;
}
function getBaseValue$1(value) {
  if (typeof value === "object" && value !== null) {
    if ("base" in value) {
      return value.base;
    }
    return void 0;
  }
  return value;
}
function getContextItemIndex(elementSelector, parentSelector, node) {
  if (!node) {
    return null;
  }
  return Array.from(
    findElementAncestor(node, parentSelector)?.querySelectorAll(elementSelector) || []
  ).findIndex((element) => element === node);
}
function dispatchEvent(type, detail) {
  window.dispatchEvent(new CustomEvent(type, { detail }));
}
function createUseExternalEvents(prefix) {
  function _useExternalEvents(events) {
    const handlers = Object.keys(events).reduce((acc, eventKey) => {
      acc[`${prefix}:${eventKey}`] = (event) => events[eventKey](event.detail);
      return acc;
    }, {});
    useIsomorphicEffect(() => {
      Object.keys(handlers).forEach((eventKey) => {
        window.removeEventListener(eventKey, handlers[eventKey]);
        window.addEventListener(eventKey, handlers[eventKey]);
      });
      return () => Object.keys(handlers).forEach((eventKey) => {
        window.removeEventListener(eventKey, handlers[eventKey]);
      });
    }, [handlers]);
  }
  function createEvent(event) {
    return (...payload) => dispatchEvent(`${prefix}:${String(event)}`, payload[0]);
  }
  return [_useExternalEvents, createEvent];
}
function getEnv() {
  if (typeof process !== "undefined" && process.env && "production") {
    return "production";
  }
  return "development";
}
function getRefProp(element) {
  const version = React.version;
  if (typeof React.version !== "string") {
    return element?.ref;
  }
  if (version.startsWith("18.")) {
    return element?.ref;
  }
  return element?.props?.ref;
}
function findElementBySelector(selector, root = document) {
  const element = root.querySelector(selector);
  if (element) {
    return element;
  }
  const allElements = root.querySelectorAll("*");
  for (let i = 0; i < allElements.length; i += 1) {
    const el = allElements[i];
    if (el.shadowRoot) {
      const shadowElement = findElementBySelector(selector, el.shadowRoot);
      if (shadowElement) {
        return shadowElement;
      }
    }
  }
  return null;
}
function findElementsBySelector(selector, root = document) {
  const results = [];
  const elements = root.querySelectorAll(selector);
  results.push(...Array.from(elements));
  const allElements = root.querySelectorAll("*");
  for (let i = 0; i < allElements.length; i += 1) {
    const el = allElements[i];
    if (el.shadowRoot) {
      const shadowElements = findElementsBySelector(selector, el.shadowRoot);
      results.push(...shadowElements);
    }
  }
  return results;
}
function getRootElement(targetElement) {
  if (!targetElement) {
    return document;
  }
  const root = targetElement.getRootNode();
  return root instanceof ShadowRoot || root instanceof Document ? root : document;
}
function getSingleElementChild(children) {
  const _children = reactExports.Children.toArray(children);
  if (_children.length !== 1 || !isElement(_children[0])) {
    return null;
  }
  return _children[0];
}
function createVarsResolver(resolver) {
  return resolver;
}
const EMPTY_CLASS_NAMES = {};
function mergeClassNames(objects) {
  const merged = {};
  objects.forEach((obj) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (merged[key]) {
        merged[key] = clsx(merged[key], value);
      } else {
        merged[key] = value;
      }
    });
  });
  return merged;
}
function resolveClassNames({ theme, classNames, props, stylesCtx }) {
  const arrayClassNames = Array.isArray(classNames) ? classNames : [classNames];
  const resolvedClassNames = arrayClassNames.map(
    (item) => typeof item === "function" ? item(theme, props, stylesCtx) : item || EMPTY_CLASS_NAMES
  );
  return mergeClassNames(resolvedClassNames);
}
function resolveStyles({ theme, styles, props, stylesCtx }) {
  const arrayStyles = Array.isArray(styles) ? styles : [styles];
  return arrayStyles.reduce((acc, style) => {
    if (typeof style === "function") {
      return { ...acc, ...style(theme, props, stylesCtx) };
    }
    return { ...acc, ...style };
  }, {});
}
const MantineContext = reactExports.createContext(null);
function useMantineContext() {
  const ctx = reactExports.useContext(MantineContext);
  if (!ctx) {
    throw new Error("[@mantine/core] MantineProvider was not found in tree");
  }
  return ctx;
}
function useMantineCssVariablesResolver() {
  return useMantineContext().cssVariablesResolver;
}
function useMantineClassNamesPrefix() {
  return useMantineContext().classNamesPrefix;
}
function useMantineStyleNonce() {
  return useMantineContext().getStyleNonce;
}
function useMantineWithStaticClasses() {
  return useMantineContext().withStaticClasses;
}
function useMantineIsHeadless() {
  return useMantineContext().headless;
}
function useMantineSxTransform() {
  return useMantineContext().stylesTransform?.sx;
}
function useMantineStylesTransform() {
  return useMantineContext().stylesTransform?.styles;
}
function useMantineEnv() {
  return useMantineContext().env || "default";
}
function isHexColor(hex) {
  const HEX_REGEXP = /^#?([0-9A-F]{3}){1,2}([0-9A-F]{2})?$/i;
  return HEX_REGEXP.test(hex);
}
function hexToRgba(color) {
  let hexString = color.replace("#", "");
  if (hexString.length === 3) {
    const shorthandHex = hexString.split("");
    hexString = [
      shorthandHex[0],
      shorthandHex[0],
      shorthandHex[1],
      shorthandHex[1],
      shorthandHex[2],
      shorthandHex[2]
    ].join("");
  }
  if (hexString.length === 8) {
    const alpha2 = parseInt(hexString.slice(6, 8), 16) / 255;
    return {
      r: parseInt(hexString.slice(0, 2), 16),
      g: parseInt(hexString.slice(2, 4), 16),
      b: parseInt(hexString.slice(4, 6), 16),
      a: alpha2
    };
  }
  const parsed = parseInt(hexString, 16);
  const r = parsed >> 16 & 255;
  const g = parsed >> 8 & 255;
  const b = parsed & 255;
  return {
    r,
    g,
    b,
    a: 1
  };
}
function rgbStringToRgba(color) {
  const [r, g, b, a] = color.replace(/[^0-9,./]/g, "").split(/[/,]/).map(Number);
  return { r, g, b, a: a === void 0 ? 1 : a };
}
function hslStringToRgba(hslaString) {
  const hslaRegex = /^hsla?\(\s*(\d+)\s*,\s*(\d+%)\s*,\s*(\d+%)\s*(,\s*(0?\.\d+|\d+(\.\d+)?))?\s*\)$/i;
  const matches = hslaString.match(hslaRegex);
  if (!matches) {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 1
    };
  }
  const h = parseInt(matches[1], 10);
  const s = parseInt(matches[2], 10) / 100;
  const l = parseInt(matches[3], 10) / 100;
  const a = matches[5] ? parseFloat(matches[5]) : void 0;
  const chroma = (1 - Math.abs(2 * l - 1)) * s;
  const huePrime = h / 60;
  const x = chroma * (1 - Math.abs(huePrime % 2 - 1));
  const m = l - chroma / 2;
  let r;
  let g;
  let b;
  if (huePrime >= 0 && huePrime < 1) {
    r = chroma;
    g = x;
    b = 0;
  } else if (huePrime >= 1 && huePrime < 2) {
    r = x;
    g = chroma;
    b = 0;
  } else if (huePrime >= 2 && huePrime < 3) {
    r = 0;
    g = chroma;
    b = x;
  } else if (huePrime >= 3 && huePrime < 4) {
    r = 0;
    g = x;
    b = chroma;
  } else if (huePrime >= 4 && huePrime < 5) {
    r = x;
    g = 0;
    b = chroma;
  } else {
    r = chroma;
    g = 0;
    b = x;
  }
  return {
    r: Math.round((r + m) * 255),
    g: Math.round((g + m) * 255),
    b: Math.round((b + m) * 255),
    a: a || 1
  };
}
function toRgba(color) {
  if (isHexColor(color)) {
    return hexToRgba(color);
  }
  if (color.startsWith("rgb")) {
    return rgbStringToRgba(color);
  }
  if (color.startsWith("hsl")) {
    return hslStringToRgba(color);
  }
  return {
    r: 0,
    g: 0,
    b: 0,
    a: 1
  };
}
function darken(color, alpha2) {
  if (color.startsWith("var(")) {
    return `color-mix(in srgb, ${color}, black ${alpha2 * 100}%)`;
  }
  const { r, g, b, a } = toRgba(color);
  const f = 1 - alpha2;
  const dark = (input) => Math.round(input * f);
  return `rgba(${dark(r)}, ${dark(g)}, ${dark(b)}, ${a})`;
}
function getPrimaryShade(theme, colorScheme) {
  if (typeof theme.primaryShade === "number") {
    return theme.primaryShade;
  }
  if (colorScheme === "dark") {
    return theme.primaryShade.dark;
  }
  return theme.primaryShade.light;
}
function gammaCorrect(c) {
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}
function getLightnessFromOklch(oklchColor) {
  const match = oklchColor.match(/oklch\((.*?)%\s/);
  return match ? parseFloat(match[1]) : null;
}
function luminance(color) {
  if (color.startsWith("oklch(")) {
    return (getLightnessFromOklch(color) || 0) / 100;
  }
  const { r, g, b } = toRgba(color);
  const sR = r / 255;
  const sG = g / 255;
  const sB = b / 255;
  const rLinear = gammaCorrect(sR);
  const gLinear = gammaCorrect(sG);
  const bLinear = gammaCorrect(sB);
  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear;
}
function isLightColor(color, luminanceThreshold = 0.179) {
  if (color.startsWith("var(")) {
    return false;
  }
  return luminance(color) > luminanceThreshold;
}
function parseThemeColor({
  color,
  theme,
  colorScheme
}) {
  if (typeof color !== "string") {
    throw new Error(
      `[@mantine/core] Failed to parse color. Expected color to be a string, instead got ${typeof color}`
    );
  }
  if (color === "bright") {
    return {
      color,
      value: colorScheme === "dark" ? theme.white : theme.black,
      shade: void 0,
      isThemeColor: false,
      isLight: isLightColor(
        colorScheme === "dark" ? theme.white : theme.black,
        theme.luminanceThreshold
      ),
      variable: "--mantine-color-bright"
    };
  }
  if (color === "dimmed") {
    return {
      color,
      value: colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[7],
      shade: void 0,
      isThemeColor: false,
      isLight: isLightColor(
        colorScheme === "dark" ? theme.colors.dark[2] : theme.colors.gray[6],
        theme.luminanceThreshold
      ),
      variable: "--mantine-color-dimmed"
    };
  }
  if (color === "white" || color === "black") {
    return {
      color,
      value: color === "white" ? theme.white : theme.black,
      shade: void 0,
      isThemeColor: false,
      isLight: isLightColor(
        color === "white" ? theme.white : theme.black,
        theme.luminanceThreshold
      ),
      variable: `--mantine-color-${color}`
    };
  }
  const [_color, shade] = color.split(".");
  const colorShade = shade ? Number(shade) : void 0;
  const isThemeColor = _color in theme.colors;
  if (isThemeColor) {
    const colorValue = colorShade !== void 0 ? theme.colors[_color][colorShade] : theme.colors[_color][getPrimaryShade(theme, colorScheme || "light")];
    return {
      color: _color,
      value: colorValue,
      shade: colorShade,
      isThemeColor,
      isLight: isLightColor(colorValue, theme.luminanceThreshold),
      variable: shade ? `--mantine-color-${_color}-${colorShade}` : `--mantine-color-${_color}-filled`
    };
  }
  return {
    color,
    value: color,
    isThemeColor,
    isLight: isLightColor(color, theme.luminanceThreshold),
    shade: colorShade,
    variable: void 0
  };
}
function getThemeColor(color, theme) {
  const parsed = parseThemeColor({ color: color || theme.primaryColor, theme });
  return parsed.variable ? `var(${parsed.variable})` : color;
}
function getGradient(gradient, theme) {
  const merged = {
    from: gradient?.from || theme.defaultGradient.from,
    to: gradient?.to || theme.defaultGradient.to,
    deg: gradient?.deg ?? theme.defaultGradient.deg ?? 0
  };
  const fromColor = getThemeColor(merged.from, theme);
  const toColor = getThemeColor(merged.to, theme);
  return `linear-gradient(${merged.deg}deg, ${fromColor} 0%, ${toColor} 100%)`;
}
function rgba(color, alpha2) {
  if (typeof color !== "string" || alpha2 > 1 || alpha2 < 0) {
    return "rgba(0, 0, 0, 1)";
  }
  if (color.startsWith("var(")) {
    const mixPercentage = (1 - alpha2) * 100;
    return `color-mix(in srgb, ${color}, transparent ${mixPercentage}%)`;
  }
  if (color.startsWith("oklch")) {
    if (color.includes("/")) {
      return color.replace(/\/\s*[\d.]+\s*\)/, `/ ${alpha2})`);
    }
    return color.replace(")", ` / ${alpha2})`);
  }
  const { r, g, b } = toRgba(color);
  return `rgba(${r}, ${g}, ${b}, ${alpha2})`;
}
const alpha = rgba;
const defaultVariantColorsResolver = ({
  color,
  theme,
  variant,
  gradient,
  autoContrast
}) => {
  const parsed = parseThemeColor({ color, theme });
  const _autoContrast = typeof autoContrast === "boolean" ? autoContrast : theme.autoContrast;
  if (variant === "none") {
    return {
      background: "transparent",
      hover: "transparent",
      color: "inherit",
      border: "none"
    };
  }
  if (variant === "filled") {
    const textColor = _autoContrast ? parsed.isLight ? "var(--mantine-color-black)" : "var(--mantine-color-white)" : "var(--mantine-color-white)";
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: `var(--mantine-color-${color}-filled)`,
          hover: `var(--mantine-color-${color}-filled-hover)`,
          color: textColor,
          border: `${rem(1)} solid transparent`
        };
      }
      return {
        background: `var(--mantine-color-${parsed.color}-${parsed.shade})`,
        hover: `var(--mantine-color-${parsed.color}-${parsed.shade === 9 ? 8 : parsed.shade + 1})`,
        color: textColor,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: color,
      hover: darken(color, 0.1),
      color: textColor,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "light") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: `var(--mantine-color-${color}-light)`,
          hover: `var(--mantine-color-${color}-light-hover)`,
          color: `var(--mantine-color-${color}-light-color)`,
          border: `${rem(1)} solid transparent`
        };
      }
      const parsedColor = theme.colors[parsed.color][parsed.shade];
      return {
        background: rgba(parsedColor, 0.1),
        hover: rgba(parsedColor, 0.12),
        color: `var(--mantine-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: rgba(color, 0.1),
      hover: rgba(color, 0.12),
      color,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "outline") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: "transparent",
          hover: `var(--mantine-color-${color}-outline-hover)`,
          color: `var(--mantine-color-${color}-outline)`,
          border: `${rem(1)} solid var(--mantine-color-${color}-outline)`
        };
      }
      return {
        background: "transparent",
        hover: rgba(theme.colors[parsed.color][parsed.shade], 0.05),
        color: `var(--mantine-color-${parsed.color}-${parsed.shade})`,
        border: `${rem(1)} solid var(--mantine-color-${parsed.color}-${parsed.shade})`
      };
    }
    return {
      background: "transparent",
      hover: rgba(color, 0.05),
      color,
      border: `${rem(1)} solid ${color}`
    };
  }
  if (variant === "subtle") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: "transparent",
          hover: `var(--mantine-color-${color}-light-hover)`,
          color: `var(--mantine-color-${color}-light-color)`,
          border: `${rem(1)} solid transparent`
        };
      }
      const parsedColor = theme.colors[parsed.color][parsed.shade];
      return {
        background: "transparent",
        hover: rgba(parsedColor, 0.12),
        color: `var(--mantine-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: "transparent",
      hover: rgba(color, 0.12),
      color,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "transparent") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: "transparent",
          hover: "transparent",
          color: `var(--mantine-color-${color}-light-color)`,
          border: `${rem(1)} solid transparent`
        };
      }
      return {
        background: "transparent",
        hover: "transparent",
        color: `var(--mantine-color-${parsed.color}-${Math.min(parsed.shade, 6)})`,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: "transparent",
      hover: "transparent",
      color,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "white") {
    if (parsed.isThemeColor) {
      if (parsed.shade === void 0) {
        return {
          background: "var(--mantine-color-white)",
          hover: darken(theme.white, 0.01),
          color: `var(--mantine-color-${color}-filled)`,
          border: `${rem(1)} solid transparent`
        };
      }
      return {
        background: "var(--mantine-color-white)",
        hover: darken(theme.white, 0.01),
        color: `var(--mantine-color-${parsed.color}-${parsed.shade})`,
        border: `${rem(1)} solid transparent`
      };
    }
    return {
      background: "var(--mantine-color-white)",
      hover: darken(theme.white, 0.01),
      color,
      border: `${rem(1)} solid transparent`
    };
  }
  if (variant === "gradient") {
    return {
      background: getGradient(gradient, theme),
      hover: getGradient(gradient, theme),
      color: "var(--mantine-color-white)",
      border: "none"
    };
  }
  if (variant === "default") {
    return {
      background: "var(--mantine-color-default)",
      hover: "var(--mantine-color-default-hover)",
      color: "var(--mantine-color-default-color)",
      border: `${rem(1)} solid var(--mantine-color-default-border)`
    };
  }
  return {};
};
const DEFAULT_COLORS = {
  dark: [
    "#C9C9C9",
    "#b8b8b8",
    "#828282",
    "#696969",
    "#424242",
    "#3b3b3b",
    "#2e2e2e",
    "#242424",
    "#1f1f1f",
    "#141414"
  ],
  gray: [
    "#f8f9fa",
    "#f1f3f5",
    "#e9ecef",
    "#dee2e6",
    "#ced4da",
    "#adb5bd",
    "#868e96",
    "#495057",
    "#343a40",
    "#212529"
  ],
  red: [
    "#fff5f5",
    "#ffe3e3",
    "#ffc9c9",
    "#ffa8a8",
    "#ff8787",
    "#ff6b6b",
    "#fa5252",
    "#f03e3e",
    "#e03131",
    "#c92a2a"
  ],
  pink: [
    "#fff0f6",
    "#ffdeeb",
    "#fcc2d7",
    "#faa2c1",
    "#f783ac",
    "#f06595",
    "#e64980",
    "#d6336c",
    "#c2255c",
    "#a61e4d"
  ],
  grape: [
    "#f8f0fc",
    "#f3d9fa",
    "#eebefa",
    "#e599f7",
    "#da77f2",
    "#cc5de8",
    "#be4bdb",
    "#ae3ec9",
    "#9c36b5",
    "#862e9c"
  ],
  violet: [
    "#f3f0ff",
    "#e5dbff",
    "#d0bfff",
    "#b197fc",
    "#9775fa",
    "#845ef7",
    "#7950f2",
    "#7048e8",
    "#6741d9",
    "#5f3dc4"
  ],
  indigo: [
    "#edf2ff",
    "#dbe4ff",
    "#bac8ff",
    "#91a7ff",
    "#748ffc",
    "#5c7cfa",
    "#4c6ef5",
    "#4263eb",
    "#3b5bdb",
    "#364fc7"
  ],
  blue: [
    "#e7f5ff",
    "#d0ebff",
    "#a5d8ff",
    "#74c0fc",
    "#4dabf7",
    "#339af0",
    "#228be6",
    "#1c7ed6",
    "#1971c2",
    "#1864ab"
  ],
  cyan: [
    "#e3fafc",
    "#c5f6fa",
    "#99e9f2",
    "#66d9e8",
    "#3bc9db",
    "#22b8cf",
    "#15aabf",
    "#1098ad",
    "#0c8599",
    "#0b7285"
  ],
  teal: [
    "#e6fcf5",
    "#c3fae8",
    "#96f2d7",
    "#63e6be",
    "#38d9a9",
    "#20c997",
    "#12b886",
    "#0ca678",
    "#099268",
    "#087f5b"
  ],
  green: [
    "#ebfbee",
    "#d3f9d8",
    "#b2f2bb",
    "#8ce99a",
    "#69db7c",
    "#51cf66",
    "#40c057",
    "#37b24d",
    "#2f9e44",
    "#2b8a3e"
  ],
  lime: [
    "#f4fce3",
    "#e9fac8",
    "#d8f5a2",
    "#c0eb75",
    "#a9e34b",
    "#94d82d",
    "#82c91e",
    "#74b816",
    "#66a80f",
    "#5c940d"
  ],
  yellow: [
    "#fff9db",
    "#fff3bf",
    "#ffec99",
    "#ffe066",
    "#ffd43b",
    "#fcc419",
    "#fab005",
    "#f59f00",
    "#f08c00",
    "#e67700"
  ],
  orange: [
    "#fff4e6",
    "#ffe8cc",
    "#ffd8a8",
    "#ffc078",
    "#ffa94d",
    "#ff922b",
    "#fd7e14",
    "#f76707",
    "#e8590c",
    "#d9480f"
  ]
};
const DEFAULT_FONT_FAMILY = "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji";
const DEFAULT_THEME = {
  scale: 1,
  fontSmoothing: true,
  focusRing: "auto",
  white: "#fff",
  black: "#000",
  colors: DEFAULT_COLORS,
  primaryShade: { light: 6, dark: 8 },
  primaryColor: "blue",
  variantColorResolver: defaultVariantColorsResolver,
  autoContrast: false,
  luminanceThreshold: 0.3,
  fontFamily: DEFAULT_FONT_FAMILY,
  fontFamilyMonospace: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace",
  respectReducedMotion: false,
  cursorType: "default",
  defaultGradient: { from: "blue", to: "cyan", deg: 45 },
  defaultRadius: "sm",
  activeClassName: "mantine-active",
  focusClassName: "",
  headings: {
    fontFamily: DEFAULT_FONT_FAMILY,
    fontWeight: "700",
    textWrap: "wrap",
    sizes: {
      h1: { fontSize: rem(34), lineHeight: "1.3" },
      h2: { fontSize: rem(26), lineHeight: "1.35" },
      h3: { fontSize: rem(22), lineHeight: "1.4" },
      h4: { fontSize: rem(18), lineHeight: "1.45" },
      h5: { fontSize: rem(16), lineHeight: "1.5" },
      h6: { fontSize: rem(14), lineHeight: "1.5" }
    }
  },
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20)
  },
  lineHeights: {
    xs: "1.4",
    sm: "1.45",
    md: "1.55",
    lg: "1.6",
    xl: "1.65"
  },
  radius: {
    xs: rem(2),
    sm: rem(4),
    md: rem(8),
    lg: rem(16),
    xl: rem(32)
  },
  spacing: {
    xs: rem(10),
    sm: rem(12),
    md: rem(16),
    lg: rem(20),
    xl: rem(32)
  },
  breakpoints: {
    xs: "36em",
    sm: "48em",
    md: "62em",
    lg: "75em",
    xl: "88em"
  },
  shadows: {
    xs: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), 0 ${rem(1)} ${rem(2)} rgba(0, 0, 0, 0.1)`,
    sm: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(10)} ${rem(
      15
    )} ${rem(-5)}, rgba(0, 0, 0, 0.04) 0 ${rem(7)} ${rem(7)} ${rem(-5)}`,
    md: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(20)} ${rem(
      25
    )} ${rem(-5)}, rgba(0, 0, 0, 0.04) 0 ${rem(10)} ${rem(10)} ${rem(-5)}`,
    lg: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(28)} ${rem(
      23
    )} ${rem(-7)}, rgba(0, 0, 0, 0.04) 0 ${rem(12)} ${rem(12)} ${rem(-7)}`,
    xl: `0 ${rem(1)} ${rem(3)} rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05) 0 ${rem(36)} ${rem(
      28
    )} ${rem(-7)}, rgba(0, 0, 0, 0.04) 0 ${rem(17)} ${rem(17)} ${rem(-7)}`
  },
  other: {},
  components: {}
};
function isMantineColorScheme(value) {
  return value === "auto" || value === "dark" || value === "light";
}
function localStorageColorSchemeManager({
  key = "mantine-color-scheme-value"
} = {}) {
  let handleStorageEvent;
  return {
    get: (defaultValue) => {
      if (typeof window === "undefined") {
        return defaultValue;
      }
      try {
        const storedColorScheme = window.localStorage.getItem(key);
        return isMantineColorScheme(storedColorScheme) ? storedColorScheme : defaultValue;
      } catch {
        return defaultValue;
      }
    },
    set: (value) => {
      try {
        window.localStorage.setItem(key, value);
      } catch (error) {
        console.warn(
          "[@mantine/core] Local storage color scheme manager was unable to save color scheme.",
          error
        );
      }
    },
    subscribe: (onUpdate) => {
      handleStorageEvent = (event) => {
        if (event.storageArea === window.localStorage && event.key === key) {
          isMantineColorScheme(event.newValue) && onUpdate(event.newValue);
        }
      };
      window.addEventListener("storage", handleStorageEvent);
    },
    unsubscribe: () => {
      window.removeEventListener("storage", handleStorageEvent);
    },
    clear: () => {
      window.localStorage.removeItem(key);
    }
  };
}
const INVALID_PRIMARY_COLOR_ERROR = "[@mantine/core] MantineProvider: Invalid theme.primaryColor, it accepts only key of theme.colors, learn more – https://mantine.dev/theming/colors/#primary-color";
const INVALID_PRIMARY_SHADE_ERROR = "[@mantine/core] MantineProvider: Invalid theme.primaryShade, it accepts only 0-9 integers or an object { light: 0-9, dark: 0-9 }";
function isValidPrimaryShade(shade) {
  if (shade < 0 || shade > 9) {
    return false;
  }
  return parseInt(shade.toString(), 10) === shade;
}
function validateMantineTheme(theme) {
  if (!(theme.primaryColor in theme.colors)) {
    throw new Error(INVALID_PRIMARY_COLOR_ERROR);
  }
  if (typeof theme.primaryShade === "object") {
    if (!isValidPrimaryShade(theme.primaryShade.dark) || !isValidPrimaryShade(theme.primaryShade.light)) {
      throw new Error(INVALID_PRIMARY_SHADE_ERROR);
    }
  }
  if (typeof theme.primaryShade === "number" && !isValidPrimaryShade(theme.primaryShade)) {
    throw new Error(INVALID_PRIMARY_SHADE_ERROR);
  }
}
function mergeMantineTheme(currentTheme, themeOverride) {
  if (!themeOverride) {
    validateMantineTheme(currentTheme);
    return currentTheme;
  }
  const result = deepMerge(currentTheme, themeOverride);
  if (themeOverride.fontFamily && !themeOverride.headings?.fontFamily) {
    result.headings.fontFamily = themeOverride.fontFamily;
  }
  validateMantineTheme(result);
  return result;
}
const MantineThemeContext = reactExports.createContext(null);
const useSafeMantineTheme = () => reactExports.useContext(MantineThemeContext) || DEFAULT_THEME;
function useMantineTheme() {
  const ctx = reactExports.useContext(MantineThemeContext);
  if (!ctx) {
    throw new Error(
      "@mantine/core: MantineProvider was not found in component tree, make sure you have it in your app"
    );
  }
  return ctx;
}
function MantineThemeProvider({
  theme,
  children,
  inherit = true
}) {
  const parentTheme = useSafeMantineTheme();
  const mergedTheme = reactExports.useMemo(
    () => mergeMantineTheme(inherit ? parentTheme : DEFAULT_THEME, theme),
    [theme, parentTheme, inherit]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(MantineThemeContext.Provider, { value: mergedTheme, children });
}
MantineThemeProvider.displayName = "@mantine/core/MantineThemeProvider";
function MantineClasses() {
  const theme = useMantineTheme();
  const nonce = useMantineStyleNonce();
  const classes2 = keys(theme.breakpoints).reduce((acc, breakpoint) => {
    const isPxBreakpoint = theme.breakpoints[breakpoint].includes("px");
    const pxValue = px(theme.breakpoints[breakpoint]);
    const maxWidthBreakpoint = isPxBreakpoint ? `${pxValue - 0.1}px` : em(pxValue - 0.1);
    const minWidthBreakpoint = isPxBreakpoint ? `${pxValue}px` : em(pxValue);
    return `${acc}@media (max-width: ${maxWidthBreakpoint}) {.mantine-visible-from-${breakpoint} {display: none !important;}}@media (min-width: ${minWidthBreakpoint}) {.mantine-hidden-from-${breakpoint} {display: none !important;}}`;
  }, "");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "style",
    {
      "data-mantine-styles": "classes",
      nonce: nonce?.(),
      dangerouslySetInnerHTML: { __html: classes2 }
    }
  );
}
function cssVariablesObjectToString(variables) {
  return Object.entries(variables).map(([name, value]) => `${name}: ${value};`).join("");
}
function convertCssVariables(input, selectorOverride) {
  const selectors = selectorOverride ? [selectorOverride] : [":root", ":host"];
  const sharedVariables = cssVariablesObjectToString(input.variables);
  const shared = sharedVariables ? `${selectors.join(", ")}{${sharedVariables}}` : "";
  const dark = cssVariablesObjectToString(input.dark);
  const light = cssVariablesObjectToString(input.light);
  const selectorsWithScheme = (scheme) => selectors.map(
    (selector) => selector === ":host" ? `${selector}([data-mantine-color-scheme="${scheme}"])` : `${selector}[data-mantine-color-scheme="${scheme}"]`
  ).join(", ");
  const darkForced = dark ? `${selectorsWithScheme("dark")}{${dark}}` : "";
  const lightForced = light ? `${selectorsWithScheme("light")}{${light}}` : "";
  return `${shared}

${darkForced}

${lightForced}`;
}
function getContrastColor({ color, theme, autoContrast }) {
  const _autoContrast = typeof autoContrast === "boolean" ? autoContrast : theme.autoContrast;
  if (!_autoContrast) {
    return "var(--mantine-color-white)";
  }
  const parsed = parseThemeColor({ color: color || theme.primaryColor, theme });
  return parsed.isLight ? "var(--mantine-color-black)" : "var(--mantine-color-white)";
}
function getPrimaryContrastColor(theme, colorScheme) {
  return getContrastColor({
    color: theme.colors[theme.primaryColor][getPrimaryShade(theme, colorScheme)],
    theme,
    autoContrast: null
  });
}
function getCSSColorVariables({
  theme,
  color,
  colorScheme,
  name = color,
  withColorValues = true
}) {
  if (!theme.colors[color]) {
    return {};
  }
  if (colorScheme === "light") {
    const primaryShade2 = getPrimaryShade(theme, "light");
    const dynamicVariables2 = {
      [`--mantine-color-${name}-text`]: `var(--mantine-color-${name}-filled)`,
      [`--mantine-color-${name}-filled`]: `var(--mantine-color-${name}-${primaryShade2})`,
      [`--mantine-color-${name}-filled-hover`]: `var(--mantine-color-${name}-${primaryShade2 === 9 ? 8 : primaryShade2 + 1})`,
      [`--mantine-color-${name}-light`]: alpha(theme.colors[color][primaryShade2], 0.1),
      [`--mantine-color-${name}-light-hover`]: alpha(theme.colors[color][primaryShade2], 0.12),
      [`--mantine-color-${name}-light-color`]: `var(--mantine-color-${name}-${primaryShade2})`,
      [`--mantine-color-${name}-outline`]: `var(--mantine-color-${name}-${primaryShade2})`,
      [`--mantine-color-${name}-outline-hover`]: alpha(theme.colors[color][primaryShade2], 0.05)
    };
    if (!withColorValues) {
      return dynamicVariables2;
    }
    return {
      [`--mantine-color-${name}-0`]: theme.colors[color][0],
      [`--mantine-color-${name}-1`]: theme.colors[color][1],
      [`--mantine-color-${name}-2`]: theme.colors[color][2],
      [`--mantine-color-${name}-3`]: theme.colors[color][3],
      [`--mantine-color-${name}-4`]: theme.colors[color][4],
      [`--mantine-color-${name}-5`]: theme.colors[color][5],
      [`--mantine-color-${name}-6`]: theme.colors[color][6],
      [`--mantine-color-${name}-7`]: theme.colors[color][7],
      [`--mantine-color-${name}-8`]: theme.colors[color][8],
      [`--mantine-color-${name}-9`]: theme.colors[color][9],
      ...dynamicVariables2
    };
  }
  const primaryShade = getPrimaryShade(theme, "dark");
  const dynamicVariables = {
    [`--mantine-color-${name}-text`]: `var(--mantine-color-${name}-4)`,
    [`--mantine-color-${name}-filled`]: `var(--mantine-color-${name}-${primaryShade})`,
    [`--mantine-color-${name}-filled-hover`]: `var(--mantine-color-${name}-${primaryShade === 9 ? 8 : primaryShade + 1})`,
    [`--mantine-color-${name}-light`]: alpha(
      theme.colors[color][Math.max(0, primaryShade - 2)],
      0.15
    ),
    [`--mantine-color-${name}-light-hover`]: alpha(
      theme.colors[color][Math.max(0, primaryShade - 2)],
      0.2
    ),
    [`--mantine-color-${name}-light-color`]: `var(--mantine-color-${name}-${Math.max(primaryShade - 5, 0)})`,
    [`--mantine-color-${name}-outline`]: `var(--mantine-color-${name}-${Math.max(primaryShade - 4, 0)})`,
    [`--mantine-color-${name}-outline-hover`]: alpha(
      theme.colors[color][Math.max(primaryShade - 4, 0)],
      0.05
    )
  };
  if (!withColorValues) {
    return dynamicVariables;
  }
  return {
    [`--mantine-color-${name}-0`]: theme.colors[color][0],
    [`--mantine-color-${name}-1`]: theme.colors[color][1],
    [`--mantine-color-${name}-2`]: theme.colors[color][2],
    [`--mantine-color-${name}-3`]: theme.colors[color][3],
    [`--mantine-color-${name}-4`]: theme.colors[color][4],
    [`--mantine-color-${name}-5`]: theme.colors[color][5],
    [`--mantine-color-${name}-6`]: theme.colors[color][6],
    [`--mantine-color-${name}-7`]: theme.colors[color][7],
    [`--mantine-color-${name}-8`]: theme.colors[color][8],
    [`--mantine-color-${name}-9`]: theme.colors[color][9],
    ...dynamicVariables
  };
}
function isVirtualColor(value) {
  return !!value && typeof value === "object" && "mantine-virtual-color" in value;
}
function assignSizeVariables(variables, sizes2, name) {
  keys(sizes2).forEach(
    (size2) => Object.assign(variables, { [`--mantine-${name}-${size2}`]: sizes2[size2] })
  );
}
const defaultCssVariablesResolver = (theme) => {
  const lightPrimaryShade = getPrimaryShade(theme, "light");
  const defaultRadius = theme.defaultRadius in theme.radius ? theme.radius[theme.defaultRadius] : rem(theme.defaultRadius);
  const result = {
    variables: {
      "--mantine-z-index-app": "100",
      "--mantine-z-index-modal": "200",
      "--mantine-z-index-popover": "300",
      "--mantine-z-index-overlay": "400",
      "--mantine-z-index-max": "9999",
      "--mantine-scale": theme.scale.toString(),
      "--mantine-cursor-type": theme.cursorType,
      "--mantine-webkit-font-smoothing": theme.fontSmoothing ? "antialiased" : "unset",
      "--mantine-moz-font-smoothing": theme.fontSmoothing ? "grayscale" : "unset",
      "--mantine-color-white": theme.white,
      "--mantine-color-black": theme.black,
      "--mantine-line-height": theme.lineHeights.md,
      "--mantine-font-family": theme.fontFamily,
      "--mantine-font-family-monospace": theme.fontFamilyMonospace,
      "--mantine-font-family-headings": theme.headings.fontFamily,
      "--mantine-heading-font-weight": theme.headings.fontWeight,
      "--mantine-heading-text-wrap": theme.headings.textWrap,
      "--mantine-radius-default": defaultRadius,
      // Primary colors
      "--mantine-primary-color-filled": `var(--mantine-color-${theme.primaryColor}-filled)`,
      "--mantine-primary-color-filled-hover": `var(--mantine-color-${theme.primaryColor}-filled-hover)`,
      "--mantine-primary-color-light": `var(--mantine-color-${theme.primaryColor}-light)`,
      "--mantine-primary-color-light-hover": `var(--mantine-color-${theme.primaryColor}-light-hover)`,
      "--mantine-primary-color-light-color": `var(--mantine-color-${theme.primaryColor}-light-color)`
    },
    light: {
      "--mantine-color-scheme": "light",
      "--mantine-primary-color-contrast": getPrimaryContrastColor(theme, "light"),
      "--mantine-color-bright": "var(--mantine-color-black)",
      "--mantine-color-text": theme.black,
      "--mantine-color-body": theme.white,
      "--mantine-color-error": "var(--mantine-color-red-6)",
      "--mantine-color-placeholder": "var(--mantine-color-gray-5)",
      "--mantine-color-anchor": `var(--mantine-color-${theme.primaryColor}-${lightPrimaryShade})`,
      "--mantine-color-default": "var(--mantine-color-white)",
      "--mantine-color-default-hover": "var(--mantine-color-gray-0)",
      "--mantine-color-default-color": "var(--mantine-color-black)",
      "--mantine-color-default-border": "var(--mantine-color-gray-4)",
      "--mantine-color-dimmed": "var(--mantine-color-gray-6)",
      "--mantine-color-disabled": "var(--mantine-color-gray-2)",
      "--mantine-color-disabled-color": "var(--mantine-color-gray-5)",
      "--mantine-color-disabled-border": "var(--mantine-color-gray-3)"
    },
    dark: {
      "--mantine-color-scheme": "dark",
      "--mantine-primary-color-contrast": getPrimaryContrastColor(theme, "dark"),
      "--mantine-color-bright": "var(--mantine-color-white)",
      "--mantine-color-text": "var(--mantine-color-dark-0)",
      "--mantine-color-body": "var(--mantine-color-dark-7)",
      "--mantine-color-error": "var(--mantine-color-red-8)",
      "--mantine-color-placeholder": "var(--mantine-color-dark-3)",
      "--mantine-color-anchor": `var(--mantine-color-${theme.primaryColor}-4)`,
      "--mantine-color-default": "var(--mantine-color-dark-6)",
      "--mantine-color-default-hover": "var(--mantine-color-dark-5)",
      "--mantine-color-default-color": "var(--mantine-color-white)",
      "--mantine-color-default-border": "var(--mantine-color-dark-4)",
      "--mantine-color-dimmed": "var(--mantine-color-dark-2)",
      "--mantine-color-disabled": "var(--mantine-color-dark-6)",
      "--mantine-color-disabled-color": "var(--mantine-color-dark-3)",
      "--mantine-color-disabled-border": "var(--mantine-color-dark-4)"
    }
  };
  assignSizeVariables(result.variables, theme.breakpoints, "breakpoint");
  assignSizeVariables(result.variables, theme.spacing, "spacing");
  assignSizeVariables(result.variables, theme.fontSizes, "font-size");
  assignSizeVariables(result.variables, theme.lineHeights, "line-height");
  assignSizeVariables(result.variables, theme.shadows, "shadow");
  assignSizeVariables(result.variables, theme.radius, "radius");
  theme.colors[theme.primaryColor].forEach((_, index) => {
    result.variables[`--mantine-primary-color-${index}`] = `var(--mantine-color-${theme.primaryColor}-${index})`;
  });
  keys(theme.colors).forEach((color) => {
    const value = theme.colors[color];
    if (isVirtualColor(value)) {
      Object.assign(
        result.light,
        getCSSColorVariables({
          theme,
          name: value.name,
          color: value.light,
          colorScheme: "light",
          withColorValues: true
        })
      );
      Object.assign(
        result.dark,
        getCSSColorVariables({
          theme,
          name: value.name,
          color: value.dark,
          colorScheme: "dark",
          withColorValues: true
        })
      );
      return;
    }
    value.forEach((shade, index) => {
      result.variables[`--mantine-color-${color}-${index}`] = shade;
    });
    Object.assign(
      result.light,
      getCSSColorVariables({
        theme,
        color,
        colorScheme: "light",
        withColorValues: false
      })
    );
    Object.assign(
      result.dark,
      getCSSColorVariables({
        theme,
        color,
        colorScheme: "dark",
        withColorValues: false
      })
    );
  });
  const headings2 = theme.headings.sizes;
  keys(headings2).forEach((heading) => {
    result.variables[`--mantine-${heading}-font-size`] = headings2[heading].fontSize;
    result.variables[`--mantine-${heading}-line-height`] = headings2[heading].lineHeight;
    result.variables[`--mantine-${heading}-font-weight`] = headings2[heading].fontWeight || theme.headings.fontWeight;
  });
  return result;
};
function getMergedVariables({ theme, generator }) {
  const defaultResolver = defaultCssVariablesResolver(theme);
  const providerGenerator = generator?.(theme);
  return providerGenerator ? deepMerge(defaultResolver, providerGenerator) : defaultResolver;
}
const defaultCssVariables = defaultCssVariablesResolver(DEFAULT_THEME);
function removeDefaultVariables(input) {
  const cleaned = {
    variables: {},
    light: {},
    dark: {}
  };
  keys(input.variables).forEach((key) => {
    if (defaultCssVariables.variables[key] !== input.variables[key]) {
      cleaned.variables[key] = input.variables[key];
    }
  });
  keys(input.light).forEach((key) => {
    if (defaultCssVariables.light[key] !== input.light[key]) {
      cleaned.light[key] = input.light[key];
    }
  });
  keys(input.dark).forEach((key) => {
    if (defaultCssVariables.dark[key] !== input.dark[key]) {
      cleaned.dark[key] = input.dark[key];
    }
  });
  return cleaned;
}
function getColorSchemeCssVariables(selectorOverride) {
  return convertCssVariables(
    {
      variables: {},
      dark: { "--mantine-color-scheme": "dark" },
      light: { "--mantine-color-scheme": "light" }
    },
    selectorOverride
  );
}
function MantineCssVariables({
  cssVariablesSelector,
  deduplicateCssVariables
}) {
  const theme = useMantineTheme();
  const nonce = useMantineStyleNonce();
  const generator = useMantineCssVariablesResolver();
  const mergedVariables = getMergedVariables({ theme, generator });
  const shouldCleanVariables = (cssVariablesSelector === void 0 || cssVariablesSelector === ":root" || cssVariablesSelector === ":host") && deduplicateCssVariables;
  const cleanedVariables = shouldCleanVariables ? removeDefaultVariables(mergedVariables) : mergedVariables;
  const css = convertCssVariables(cleanedVariables, cssVariablesSelector);
  if (css) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "style",
      {
        "data-mantine-styles": true,
        nonce: nonce?.(),
        dangerouslySetInnerHTML: {
          __html: `${css}${shouldCleanVariables ? "" : getColorSchemeCssVariables(cssVariablesSelector)}`
        }
      }
    );
  }
  return null;
}
MantineCssVariables.displayName = "@mantine/CssVariables";
function setColorSchemeAttribute(colorScheme, getRootElement2) {
  const hasDarkColorScheme = typeof window !== "undefined" && "matchMedia" in window && window.matchMedia("(prefers-color-scheme: dark)")?.matches;
  const computedColorScheme = colorScheme !== "auto" ? colorScheme : hasDarkColorScheme ? "dark" : "light";
  getRootElement2()?.setAttribute("data-mantine-color-scheme", computedColorScheme);
}
function useProviderColorScheme({
  manager,
  defaultColorScheme,
  getRootElement: getRootElement2,
  forceColorScheme
}) {
  const media = reactExports.useRef(null);
  const [value, setValue] = reactExports.useState(() => manager.get(defaultColorScheme));
  const colorSchemeValue = forceColorScheme || value;
  const setColorScheme = reactExports.useCallback(
    (colorScheme) => {
      if (!forceColorScheme) {
        setColorSchemeAttribute(colorScheme, getRootElement2);
        setValue(colorScheme);
        manager.set(colorScheme);
      }
    },
    [manager.set, colorSchemeValue, forceColorScheme]
  );
  const clearColorScheme = reactExports.useCallback(() => {
    setValue(defaultColorScheme);
    setColorSchemeAttribute(defaultColorScheme, getRootElement2);
    manager.clear();
  }, [manager.clear, defaultColorScheme]);
  reactExports.useEffect(() => {
    manager.subscribe(setColorScheme);
    return manager.unsubscribe;
  }, [manager.subscribe, manager.unsubscribe]);
  useIsomorphicEffect(() => {
    setColorSchemeAttribute(manager.get(defaultColorScheme), getRootElement2);
  }, []);
  reactExports.useEffect(() => {
    if (forceColorScheme) {
      setColorSchemeAttribute(forceColorScheme, getRootElement2);
      return () => {
      };
    }
    if (forceColorScheme === void 0) {
      setColorSchemeAttribute(value, getRootElement2);
    }
    if (typeof window !== "undefined" && "matchMedia" in window) {
      media.current = window.matchMedia("(prefers-color-scheme: dark)");
    }
    const listener = (event) => {
      if (value === "auto") {
        setColorSchemeAttribute(event.matches ? "dark" : "light", getRootElement2);
      }
    };
    media.current?.addEventListener("change", listener);
    return () => media.current?.removeEventListener("change", listener);
  }, [value, forceColorScheme]);
  return { colorScheme: colorSchemeValue, setColorScheme, clearColorScheme };
}
function useRespectReduceMotion({
  respectReducedMotion,
  getRootElement: getRootElement2
}) {
  useIsomorphicEffect(() => {
    if (respectReducedMotion) {
      getRootElement2()?.setAttribute("data-respect-reduced-motion", "true");
    }
  }, [respectReducedMotion]);
}
function MantineProvider({
  theme,
  children,
  getStyleNonce,
  withStaticClasses = true,
  withGlobalClasses = true,
  deduplicateCssVariables = true,
  withCssVariables = true,
  cssVariablesSelector,
  classNamesPrefix = "mantine",
  colorSchemeManager = localStorageColorSchemeManager(),
  defaultColorScheme = "light",
  getRootElement: getRootElement2 = () => document.documentElement,
  cssVariablesResolver,
  forceColorScheme,
  stylesTransform,
  env
}) {
  const { colorScheme, setColorScheme, clearColorScheme } = useProviderColorScheme({
    defaultColorScheme,
    forceColorScheme,
    manager: colorSchemeManager,
    getRootElement: getRootElement2
  });
  useRespectReduceMotion({
    respectReducedMotion: theme?.respectReducedMotion || false,
    getRootElement: getRootElement2
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    MantineContext.Provider,
    {
      value: {
        colorScheme,
        setColorScheme,
        clearColorScheme,
        getRootElement: getRootElement2,
        classNamesPrefix,
        getStyleNonce,
        cssVariablesResolver,
        cssVariablesSelector: cssVariablesSelector ?? ":root",
        withStaticClasses,
        stylesTransform,
        env
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(MantineThemeProvider, { theme, children: [
        withCssVariables && /* @__PURE__ */ jsxRuntimeExports.jsx(
          MantineCssVariables,
          {
            cssVariablesSelector,
            deduplicateCssVariables
          }
        ),
        withGlobalClasses && /* @__PURE__ */ jsxRuntimeExports.jsx(MantineClasses, {}),
        children
      ] })
    }
  );
}
MantineProvider.displayName = "@mantine/core/MantineProvider";
function useResolvedStylesApi({
  classNames,
  styles,
  props,
  stylesCtx
}) {
  const theme = useMantineTheme();
  return {
    resolvedClassNames: resolveClassNames({
      theme,
      classNames,
      props,
      stylesCtx: stylesCtx || void 0
    }),
    resolvedStyles: resolveStyles({
      theme,
      styles,
      props,
      stylesCtx: stylesCtx || void 0
    })
  };
}
const FOCUS_CLASS_NAMES = {
  always: "mantine-focus-always",
  auto: "mantine-focus-auto",
  never: "mantine-focus-never"
};
function getGlobalClassNames({ theme, options, unstyled }) {
  return clsx(
    options?.focusable && !unstyled && (theme.focusClassName || FOCUS_CLASS_NAMES[theme.focusRing]),
    options?.active && !unstyled && theme.activeClassName
  );
}
function getOptionsClassNames({
  selector,
  stylesCtx,
  options,
  props,
  theme
}) {
  return resolveClassNames({
    theme,
    classNames: options?.classNames,
    props: options?.props || props,
    stylesCtx
  })[selector];
}
function getResolvedClassNames({
  selector,
  stylesCtx,
  theme,
  classNames,
  props
}) {
  return resolveClassNames({ theme, classNames, props, stylesCtx })[selector];
}
function getRootClassName({ rootSelector, selector, className }) {
  return rootSelector === selector ? className : void 0;
}
function getSelectorClassName({ selector, classes: classes2, unstyled }) {
  return unstyled ? void 0 : classes2[selector];
}
function getStaticClassNames({
  themeName,
  classNamesPrefix,
  selector,
  withStaticClass
}) {
  if (withStaticClass === false) {
    return [];
  }
  return themeName.map((n) => `${classNamesPrefix}-${n}-${selector}`);
}
function getThemeClassNames({
  themeName,
  theme,
  selector,
  props,
  stylesCtx
}) {
  return themeName.map(
    (n) => resolveClassNames({
      theme,
      classNames: theme.components[n]?.classNames,
      props,
      stylesCtx
    })?.[selector]
  );
}
function getVariantClassName({
  options,
  classes: classes2,
  selector,
  unstyled
}) {
  return options?.variant && !unstyled ? classes2[`${selector}--${options.variant}`] : void 0;
}
function getClassName({
  theme,
  options,
  themeName,
  selector,
  classNamesPrefix,
  classNames,
  classes: classes2,
  unstyled,
  className,
  rootSelector,
  props,
  stylesCtx,
  withStaticClasses,
  headless,
  transformedStyles
}) {
  return clsx(
    getGlobalClassNames({ theme, options, unstyled: unstyled || headless }),
    getThemeClassNames({ theme, themeName, selector, props, stylesCtx }),
    getVariantClassName({ options, classes: classes2, selector, unstyled }),
    getResolvedClassNames({ selector, stylesCtx, theme, classNames, props }),
    getResolvedClassNames({ selector, stylesCtx, theme, classNames: transformedStyles, props }),
    getOptionsClassNames({ selector, stylesCtx, options, props, theme }),
    getRootClassName({ rootSelector, selector, className }),
    getSelectorClassName({ selector, classes: classes2, unstyled: unstyled || headless }),
    withStaticClasses && !headless && getStaticClassNames({
      themeName,
      classNamesPrefix,
      selector,
      withStaticClass: options?.withStaticClass
    }),
    options?.className
  );
}
function getThemeStyles({
  theme,
  themeName,
  props,
  stylesCtx,
  selector
}) {
  return themeName.map(
    (n) => resolveStyles({
      theme,
      styles: theme.components[n]?.styles,
      props,
      stylesCtx
    })[selector]
  ).reduce((acc, val) => ({ ...acc, ...val }), {});
}
function resolveStyle({ style, theme }) {
  if (Array.isArray(style)) {
    return [...style].reduce(
      (acc, item) => ({ ...acc, ...resolveStyle({ style: item, theme }) }),
      {}
    );
  }
  if (typeof style === "function") {
    return style(theme);
  }
  if (style == null) {
    return {};
  }
  return style;
}
function mergeVars(vars) {
  return vars.reduce((acc, current) => {
    if (current) {
      Object.keys(current).forEach((key) => {
        acc[key] = { ...acc[key], ...filterProps(current[key]) };
      });
    }
    return acc;
  }, {});
}
function resolveVars({
  vars,
  varsResolver: varsResolver2,
  theme,
  props,
  stylesCtx,
  selector,
  themeName,
  headless
}) {
  return mergeVars([
    headless ? {} : varsResolver2?.(theme, props, stylesCtx),
    ...themeName.map((name) => theme.components?.[name]?.vars?.(theme, props, stylesCtx)),
    vars?.(theme, props, stylesCtx)
  ])?.[selector];
}
function getStyle({
  theme,
  themeName,
  selector,
  options,
  props,
  stylesCtx,
  rootSelector,
  styles,
  style,
  vars,
  varsResolver: varsResolver2,
  headless,
  withStylesTransform
}) {
  return {
    ...!withStylesTransform && getThemeStyles({ theme, themeName, props, stylesCtx, selector }),
    ...!withStylesTransform && resolveStyles({ theme, styles, props, stylesCtx })[selector],
    ...!withStylesTransform && resolveStyles({ theme, styles: options?.styles, props: options?.props || props, stylesCtx })[selector],
    ...resolveVars({ theme, props, stylesCtx, vars, varsResolver: varsResolver2, selector, themeName, headless }),
    ...rootSelector === selector ? resolveStyle({ style, theme }) : null,
    ...resolveStyle({ style: options?.style, theme })
  };
}
function useStylesTransform({ props, stylesCtx, themeName }) {
  const theme = useMantineTheme();
  const stylesTransform = useMantineStylesTransform()?.();
  const getTransformedStyles = (styles) => {
    if (!stylesTransform) {
      return [];
    }
    const transformedStyles = styles.map(
      (style) => stylesTransform(style, { props, theme, ctx: stylesCtx })
    );
    return [
      ...transformedStyles,
      ...themeName.map(
        (n) => stylesTransform(theme.components[n]?.styles, { props, theme, ctx: stylesCtx })
      )
    ].filter(Boolean);
  };
  return {
    getTransformedStyles,
    withStylesTransform: !!stylesTransform
  };
}
function useStyles({
  name,
  classes: classes2,
  props,
  stylesCtx,
  className,
  style,
  rootSelector = "root",
  unstyled,
  classNames,
  styles,
  vars,
  varsResolver: varsResolver2,
  attributes
}) {
  const theme = useMantineTheme();
  const classNamesPrefix = useMantineClassNamesPrefix();
  const withStaticClasses = useMantineWithStaticClasses();
  const headless = useMantineIsHeadless();
  const themeName = (Array.isArray(name) ? name : [name]).filter((n) => n);
  const { withStylesTransform, getTransformedStyles } = useStylesTransform({
    props,
    stylesCtx,
    themeName
  });
  return (selector, options) => ({
    className: getClassName({
      theme,
      options,
      themeName,
      selector,
      classNamesPrefix,
      classNames,
      classes: classes2,
      unstyled,
      className,
      rootSelector,
      props,
      stylesCtx,
      withStaticClasses,
      headless,
      transformedStyles: getTransformedStyles([options?.styles, styles])
    }),
    style: getStyle({
      theme,
      themeName,
      selector,
      options,
      props,
      stylesCtx,
      rootSelector,
      styles,
      style,
      vars,
      varsResolver: varsResolver2,
      headless,
      withStylesTransform
    }),
    ...attributes?.[selector]
  });
}
function getAutoContrastValue(autoContrast, theme) {
  return typeof autoContrast === "boolean" ? autoContrast : theme.autoContrast;
}
const getScript = ({
  defaultColorScheme,
  localStorageKey,
  forceColorScheme
}) => forceColorScheme ? `document.documentElement.setAttribute("data-mantine-color-scheme", '${forceColorScheme}');` : `try {
  var _colorScheme = window.localStorage.getItem("${localStorageKey}");
  var colorScheme = _colorScheme === "light" || _colorScheme === "dark" || _colorScheme === "auto" ? _colorScheme : "${defaultColorScheme}";
  var computedColorScheme = colorScheme !== "auto" ? colorScheme : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.setAttribute("data-mantine-color-scheme", computedColorScheme);
} catch (e) {}
`;
function ColorSchemeScript({
  defaultColorScheme = "light",
  localStorageKey = "mantine-color-scheme-value",
  forceColorScheme,
  ...others
}) {
  const _defaultColorScheme = ["light", "dark", "auto"].includes(defaultColorScheme) ? defaultColorScheme : "light";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "script",
    {
      ...others,
      "data-mantine-script": true,
      dangerouslySetInnerHTML: {
        __html: getScript({
          defaultColorScheme: _defaultColorScheme,
          localStorageKey,
          forceColorScheme
        })
      }
    }
  );
}
function useProps(component, defaultProps2, props) {
  const theme = useMantineTheme();
  const contextPropsPayload = theme.components[component]?.defaultProps;
  const contextProps = typeof contextPropsPayload === "function" ? contextPropsPayload(theme) : contextPropsPayload;
  return { ...defaultProps2, ...contextProps, ...filterProps(props) };
}
function createTheme(theme) {
  return theme;
}
const mantineHtmlProps = {
  suppressHydrationWarning: true,
  "data-mantine-color-scheme": "light"
};
function cssObjectToString(css) {
  return keys(css).reduce(
    (acc, rule) => css[rule] !== void 0 ? `${acc}${camelToKebabCase(rule)}:${css[rule]};` : acc,
    ""
  ).trim();
}
function stylesToString({ selector, styles, media, container }) {
  const baseStyles = styles ? cssObjectToString(styles) : "";
  const mediaQueryStyles = !Array.isArray(media) ? [] : media.map((item) => `@media${item.query}{${selector}{${cssObjectToString(item.styles)}}}`);
  const containerStyles = !Array.isArray(container) ? [] : container.map(
    (item) => `@container ${item.query}{${selector}{${cssObjectToString(item.styles)}}}`
  );
  return `${baseStyles ? `${selector}{${baseStyles}}` : ""}${mediaQueryStyles.join("")}${containerStyles.join("")}`.trim();
}
function InlineStyles(props) {
  const nonce = useMantineStyleNonce();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "style",
    {
      "data-mantine-styles": "inline",
      nonce: nonce?.(),
      dangerouslySetInnerHTML: { __html: stylesToString(props) }
    }
  );
}
function extractStyleProps(others) {
  const {
    m,
    mx,
    my,
    mt,
    mb,
    ml,
    mr,
    me,
    ms,
    p,
    px: px2,
    py,
    pt,
    pb,
    pl,
    pr,
    pe,
    ps,
    bd,
    bdrs,
    bg,
    c,
    opacity,
    ff,
    fz,
    fw,
    lts,
    ta,
    lh,
    fs,
    tt,
    td,
    w,
    miw,
    maw,
    h,
    mih,
    mah,
    bgsz,
    bgp,
    bgr,
    bga,
    pos,
    top,
    left,
    bottom,
    right,
    inset,
    display,
    flex,
    hiddenFrom,
    visibleFrom,
    lightHidden,
    darkHidden,
    sx,
    ...rest
  } = others;
  const styleProps = filterProps({
    m,
    mx,
    my,
    mt,
    mb,
    ml,
    mr,
    me,
    ms,
    p,
    px: px2,
    py,
    pt,
    pb,
    pl,
    pr,
    pe,
    ps,
    bd,
    bg,
    c,
    opacity,
    ff,
    fz,
    fw,
    lts,
    ta,
    lh,
    fs,
    tt,
    td,
    w,
    miw,
    maw,
    h,
    mih,
    mah,
    bgsz,
    bgp,
    bgr,
    bga,
    pos,
    top,
    left,
    bottom,
    right,
    inset,
    display,
    flex,
    bdrs,
    hiddenFrom,
    visibleFrom,
    lightHidden,
    darkHidden,
    sx
  });
  return { styleProps, rest };
}
const STYlE_PROPS_DATA = {
  m: { type: "spacing", property: "margin" },
  mt: { type: "spacing", property: "marginTop" },
  mb: { type: "spacing", property: "marginBottom" },
  ml: { type: "spacing", property: "marginLeft" },
  mr: { type: "spacing", property: "marginRight" },
  ms: { type: "spacing", property: "marginInlineStart" },
  me: { type: "spacing", property: "marginInlineEnd" },
  mx: { type: "spacing", property: "marginInline" },
  my: { type: "spacing", property: "marginBlock" },
  p: { type: "spacing", property: "padding" },
  pt: { type: "spacing", property: "paddingTop" },
  pb: { type: "spacing", property: "paddingBottom" },
  pl: { type: "spacing", property: "paddingLeft" },
  pr: { type: "spacing", property: "paddingRight" },
  ps: { type: "spacing", property: "paddingInlineStart" },
  pe: { type: "spacing", property: "paddingInlineEnd" },
  px: { type: "spacing", property: "paddingInline" },
  py: { type: "spacing", property: "paddingBlock" },
  bd: { type: "border", property: "border" },
  bdrs: { type: "radius", property: "borderRadius" },
  bg: { type: "color", property: "background" },
  c: { type: "textColor", property: "color" },
  opacity: { type: "identity", property: "opacity" },
  ff: { type: "fontFamily", property: "fontFamily" },
  fz: { type: "fontSize", property: "fontSize" },
  fw: { type: "identity", property: "fontWeight" },
  lts: { type: "size", property: "letterSpacing" },
  ta: { type: "identity", property: "textAlign" },
  lh: { type: "lineHeight", property: "lineHeight" },
  fs: { type: "identity", property: "fontStyle" },
  tt: { type: "identity", property: "textTransform" },
  td: { type: "identity", property: "textDecoration" },
  w: { type: "spacing", property: "width" },
  miw: { type: "spacing", property: "minWidth" },
  maw: { type: "spacing", property: "maxWidth" },
  h: { type: "spacing", property: "height" },
  mih: { type: "spacing", property: "minHeight" },
  mah: { type: "spacing", property: "maxHeight" },
  bgsz: { type: "size", property: "backgroundSize" },
  bgp: { type: "identity", property: "backgroundPosition" },
  bgr: { type: "identity", property: "backgroundRepeat" },
  bga: { type: "identity", property: "backgroundAttachment" },
  pos: { type: "identity", property: "position" },
  top: { type: "size", property: "top" },
  left: { type: "size", property: "left" },
  bottom: { type: "size", property: "bottom" },
  right: { type: "size", property: "right" },
  inset: { type: "size", property: "inset" },
  display: { type: "identity", property: "display" },
  flex: { type: "identity", property: "flex" }
};
function colorResolver(color, theme) {
  const parsedColor = parseThemeColor({ color, theme });
  if (parsedColor.color === "dimmed") {
    return "var(--mantine-color-dimmed)";
  }
  if (parsedColor.color === "bright") {
    return "var(--mantine-color-bright)";
  }
  return parsedColor.variable ? `var(${parsedColor.variable})` : parsedColor.color;
}
function textColorResolver(color, theme) {
  const parsedColor = parseThemeColor({ color, theme });
  if (parsedColor.isThemeColor && parsedColor.shade === void 0) {
    return `var(--mantine-color-${parsedColor.color}-text)`;
  }
  return colorResolver(color, theme);
}
function borderResolver(value, theme) {
  if (typeof value === "number") {
    return rem(value);
  }
  if (typeof value === "string") {
    const [size2, style, ...colorTuple] = value.split(" ").filter((val) => val.trim() !== "");
    let result = `${rem(size2)}`;
    style && (result += ` ${style}`);
    colorTuple.length > 0 && (result += ` ${colorResolver(colorTuple.join(" "), theme)}`);
    return result.trim();
  }
  return value;
}
const values = {
  text: "var(--mantine-font-family)",
  mono: "var(--mantine-font-family-monospace)",
  monospace: "var(--mantine-font-family-monospace)",
  heading: "var(--mantine-font-family-headings)",
  headings: "var(--mantine-font-family-headings)"
};
function fontFamilyResolver(fontFamily) {
  if (typeof fontFamily === "string" && fontFamily in values) {
    return values[fontFamily];
  }
  return fontFamily;
}
const headings$2 = ["h1", "h2", "h3", "h4", "h5", "h6"];
function fontSizeResolver(value, theme) {
  if (typeof value === "string" && value in theme.fontSizes) {
    return `var(--mantine-font-size-${value})`;
  }
  if (typeof value === "string" && headings$2.includes(value)) {
    return `var(--mantine-${value}-font-size)`;
  }
  if (typeof value === "number") {
    return rem(value);
  }
  if (typeof value === "string") {
    return rem(value);
  }
  return value;
}
function identityResolver(value) {
  return value;
}
const headings$1 = ["h1", "h2", "h3", "h4", "h5", "h6"];
function lineHeightResolver(value, theme) {
  if (typeof value === "string" && value in theme.lineHeights) {
    return `var(--mantine-line-height-${value})`;
  }
  if (typeof value === "string" && headings$1.includes(value)) {
    return `var(--mantine-${value}-line-height)`;
  }
  return value;
}
function radiusResolver(value, theme) {
  if (typeof value === "string" && value in theme.radius) {
    return `var(--mantine-radius-${value})`;
  }
  if (typeof value === "number") {
    return rem(value);
  }
  if (typeof value === "string") {
    return rem(value);
  }
  return value;
}
function sizeResolver(value) {
  if (typeof value === "number") {
    return rem(value);
  }
  return value;
}
function spacingResolver(value, theme) {
  if (typeof value === "number") {
    return rem(value);
  }
  if (typeof value === "string") {
    const mod = value.replace("-", "");
    if (!(mod in theme.spacing)) {
      return rem(value);
    }
    const variable = `--mantine-spacing-${mod}`;
    return value.startsWith("-") ? `calc(var(${variable}) * -1)` : `var(${variable})`;
  }
  return value;
}
const resolvers = {
  color: colorResolver,
  textColor: textColorResolver,
  fontSize: fontSizeResolver,
  spacing: spacingResolver,
  radius: radiusResolver,
  identity: identityResolver,
  size: sizeResolver,
  lineHeight: lineHeightResolver,
  fontFamily: fontFamilyResolver,
  border: borderResolver
};
function replaceMediaQuery(query) {
  return query.replace("(min-width: ", "").replace("em)", "");
}
function sortMediaQueries({
  media,
  ...props
}) {
  const breakpoints = Object.keys(media);
  const sortedMedia = breakpoints.sort((a, b) => Number(replaceMediaQuery(a)) - Number(replaceMediaQuery(b))).map((query) => ({ query, styles: media[query] }));
  return { ...props, media: sortedMedia };
}
function hasResponsiveStyles(styleProp) {
  if (typeof styleProp !== "object" || styleProp === null) {
    return false;
  }
  const breakpoints = Object.keys(styleProp);
  if (breakpoints.length === 1 && breakpoints[0] === "base") {
    return false;
  }
  return true;
}
function getBaseValue(value) {
  if (typeof value === "object" && value !== null) {
    if ("base" in value) {
      return value.base;
    }
    return void 0;
  }
  return value;
}
function getBreakpointKeys(value) {
  if (typeof value === "object" && value !== null) {
    return keys(value).filter((key) => key !== "base");
  }
  return [];
}
function getBreakpointValue(value, breakpoint) {
  if (typeof value === "object" && value !== null && breakpoint in value) {
    return value[breakpoint];
  }
  return value;
}
function parseStyleProps({
  styleProps,
  data,
  theme
}) {
  return sortMediaQueries(
    keys(styleProps).reduce(
      (acc, styleProp) => {
        if (styleProp === "hiddenFrom" || styleProp === "visibleFrom" || styleProp === "sx") {
          return acc;
        }
        const propertyData = data[styleProp];
        const properties = Array.isArray(propertyData.property) ? propertyData.property : [propertyData.property];
        const baseValue = getBaseValue(styleProps[styleProp]);
        if (!hasResponsiveStyles(styleProps[styleProp])) {
          properties.forEach((property) => {
            acc.inlineStyles[property] = resolvers[propertyData.type](baseValue, theme);
          });
          return acc;
        }
        acc.hasResponsiveStyles = true;
        const breakpoints = getBreakpointKeys(styleProps[styleProp]);
        properties.forEach((property) => {
          if (baseValue != null) {
            acc.styles[property] = resolvers[propertyData.type](baseValue, theme);
          }
          breakpoints.forEach((breakpoint) => {
            const bp = `(min-width: ${theme.breakpoints[breakpoint]})`;
            acc.media[bp] = {
              ...acc.media[bp],
              [property]: resolvers[propertyData.type](
                getBreakpointValue(styleProps[styleProp], breakpoint),
                theme
              )
            };
          });
        });
        return acc;
      },
      {
        hasResponsiveStyles: false,
        styles: {},
        inlineStyles: {},
        media: {}
      }
    )
  );
}
function useRandomClassName() {
  const id = reactExports.useId().replace(/[:«»]/g, "");
  return `__m__-${id}`;
}
function getStyleObject(style, theme) {
  if (Array.isArray(style)) {
    return [...style].reduce(
      (acc, item) => ({ ...acc, ...getStyleObject(item, theme) }),
      {}
    );
  }
  if (typeof style === "function") {
    return style(theme);
  }
  if (style == null) {
    return {};
  }
  return style;
}
function createPolymorphicComponent(component) {
  return component;
}
function transformModKey(key) {
  return key.startsWith("data-") ? key : `data-${key}`;
}
function getMod(props) {
  return Object.keys(props).reduce((acc, key) => {
    const value = props[key];
    if (value === void 0 || value === "" || value === false || value === null) {
      return acc;
    }
    acc[transformModKey(key)] = props[key];
    return acc;
  }, {});
}
function getBoxMod(mod) {
  if (!mod) {
    return null;
  }
  if (typeof mod === "string") {
    return { [transformModKey(mod)]: true };
  }
  if (Array.isArray(mod)) {
    return [...mod].reduce(
      (acc, value) => ({ ...acc, ...getBoxMod(value) }),
      {}
    );
  }
  return getMod(mod);
}
function mergeStyles(styles, theme) {
  if (Array.isArray(styles)) {
    return [...styles].reduce(
      (acc, item) => ({ ...acc, ...mergeStyles(item, theme) }),
      {}
    );
  }
  if (typeof styles === "function") {
    return styles(theme);
  }
  if (styles == null) {
    return {};
  }
  return styles;
}
function getBoxStyle({
  theme,
  style,
  vars,
  styleProps
}) {
  const _style = mergeStyles(style, theme);
  const _vars = mergeStyles(vars, theme);
  return { ..._style, ..._vars, ...styleProps };
}
const _Box = reactExports.forwardRef(
  ({
    component,
    style,
    __vars,
    className,
    variant,
    mod,
    size: size2,
    hiddenFrom,
    visibleFrom,
    lightHidden,
    darkHidden,
    renderRoot,
    __size,
    ...others
  }, ref) => {
    const theme = useMantineTheme();
    const Element = component || "div";
    const { styleProps, rest } = extractStyleProps(others);
    const useSxTransform = useMantineSxTransform();
    const transformedSx = useSxTransform?.()?.(styleProps.sx);
    const responsiveClassName = useRandomClassName();
    const parsedStyleProps = parseStyleProps({
      styleProps,
      theme,
      data: STYlE_PROPS_DATA
    });
    const props = {
      ref,
      style: getBoxStyle({
        theme,
        style,
        vars: __vars,
        styleProps: parsedStyleProps.inlineStyles
      }),
      className: clsx(className, transformedSx, {
        [responsiveClassName]: parsedStyleProps.hasResponsiveStyles,
        "mantine-light-hidden": lightHidden,
        "mantine-dark-hidden": darkHidden,
        [`mantine-hidden-from-${hiddenFrom}`]: hiddenFrom,
        [`mantine-visible-from-${visibleFrom}`]: visibleFrom
      }),
      "data-variant": variant,
      "data-size": isNumberLike(size2) ? void 0 : size2 || void 0,
      size: __size,
      ...getBoxMod(mod),
      ...rest
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      parsedStyleProps.hasResponsiveStyles && /* @__PURE__ */ jsxRuntimeExports.jsx(
        InlineStyles,
        {
          selector: `.${responsiveClassName}`,
          styles: parsedStyleProps.styles,
          media: parsedStyleProps.media
        }
      ),
      typeof renderRoot === "function" ? renderRoot(props) : /* @__PURE__ */ jsxRuntimeExports.jsx(Element, { ...props })
    ] });
  }
);
_Box.displayName = "@mantine/core/Box";
const Box = createPolymorphicComponent(_Box);
function identity(value) {
  return value;
}
function getWithProps(Component) {
  const _Component = Component;
  return (fixedProps) => {
    const Extended = reactExports.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(_Component, { ...fixedProps, ...props, ref }));
    Extended.extend = _Component.extend;
    Extended.displayName = `WithProps(${_Component.displayName})`;
    return Extended;
  };
}
function factory(ui) {
  const Component = reactExports.forwardRef(ui);
  Component.extend = identity;
  Component.withProps = (fixedProps) => {
    const Extended = reactExports.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Component, { ...fixedProps, ...props, ref }));
    Extended.extend = Component.extend;
    Extended.displayName = `WithProps(${Component.displayName})`;
    return Extended;
  };
  return Component;
}
function polymorphicFactory(ui) {
  const Component = reactExports.forwardRef(ui);
  Component.withProps = (fixedProps) => {
    const Extended = reactExports.forwardRef((props, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Component, { ...fixedProps, ...props, ref }));
    Extended.extend = Component.extend;
    Extended.displayName = `WithProps(${Component.displayName})`;
    return Extended;
  };
  Component.extend = identity;
  return Component;
}
const DirectionContext = reactExports.createContext({
  dir: "ltr",
  toggleDirection: () => {
  },
  setDirection: () => {
  }
});
function useDirection() {
  return reactExports.useContext(DirectionContext);
}
function getAutoHeightDuration(height) {
  if (!height || typeof height === "string") {
    return 0;
  }
  const constant = height / 36;
  return Math.round((4 + 15 * constant ** 0.25 + constant / 5) * 10);
}
function getElementHeight(el) {
  return el?.current ? el.current.scrollHeight : "auto";
}
const raf = typeof window !== "undefined" && window.requestAnimationFrame;
const collapsedHeight = 0;
const getCollapsedStyles = (keepMounted) => ({
  height: 0,
  overflow: "hidden",
  ...keepMounted ? {} : { display: "none" }
});
function useCollapse({
  transitionDuration,
  transitionTimingFunction = "ease",
  onTransitionEnd = () => {
  },
  opened,
  keepMounted = false
}) {
  const el = reactExports.useRef(null);
  const collapsedStyles = getCollapsedStyles(keepMounted);
  const [styles, setStylesRaw] = reactExports.useState(opened ? {} : collapsedStyles);
  const setStyles = (newStyles) => {
    reactDomExports.flushSync(() => setStylesRaw(newStyles));
  };
  const mergeStyles2 = (newStyles) => {
    setStyles((oldStyles) => ({ ...oldStyles, ...newStyles }));
  };
  function getTransitionStyles2(height) {
    const _duration = transitionDuration || getAutoHeightDuration(height);
    return {
      transition: `height ${_duration}ms ${transitionTimingFunction}, opacity ${_duration}ms ${transitionTimingFunction}`
    };
  }
  useDidUpdate(() => {
    if (typeof raf === "function") {
      if (opened) {
        raf(() => {
          mergeStyles2({ willChange: "height", display: "block", overflow: "hidden" });
          raf(() => {
            const height = getElementHeight(el);
            mergeStyles2({ ...getTransitionStyles2(height), height });
          });
        });
      } else {
        raf(() => {
          const height = getElementHeight(el);
          mergeStyles2({ ...getTransitionStyles2(height), willChange: "height", height });
          raf(() => mergeStyles2({ height: collapsedHeight, overflow: "hidden" }));
        });
      }
    }
  }, [opened]);
  const handleTransitionEnd = (e) => {
    if (e.target !== el.current || e.propertyName !== "height") {
      return;
    }
    if (opened) {
      const height = getElementHeight(el);
      if (height === styles.height) {
        setStyles({});
      } else {
        mergeStyles2({ height });
      }
      onTransitionEnd();
    } else if (styles.height === collapsedHeight) {
      setStyles(collapsedStyles);
      onTransitionEnd();
    }
  };
  function getCollapseProps({ style = {}, refKey = "ref", ...rest } = {}) {
    const theirRef = rest[refKey];
    const props = {
      "aria-hidden": !opened,
      ...rest,
      [refKey]: mergeRefs(el, theirRef),
      onTransitionEnd: handleTransitionEnd,
      style: { boxSizing: "border-box", ...style, ...styles }
    };
    if (React.version.startsWith("18")) {
      if (!opened) {
        props.inert = "";
      }
    } else {
      props.inert = !opened;
    }
    return props;
  }
  return getCollapseProps;
}
const defaultProps$1c = {
  transitionDuration: 200,
  transitionTimingFunction: "ease",
  animateOpacity: true
};
const Collapse = factory((props, ref) => {
  const {
    children,
    in: opened,
    transitionDuration,
    transitionTimingFunction,
    style,
    onTransitionEnd,
    animateOpacity,
    keepMounted,
    ...others
  } = useProps("Collapse", defaultProps$1c, props);
  const theme = useMantineTheme();
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = theme.respectReducedMotion ? shouldReduceMotion : false;
  const duration = reduceMotion ? 0 : transitionDuration;
  const getCollapseProps = useCollapse({
    opened,
    transitionDuration: duration,
    transitionTimingFunction,
    onTransitionEnd,
    keepMounted
  });
  if (duration === 0) {
    return opened ? /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ...others, children }) : null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ...getCollapseProps({
        style: {
          opacity: opened || !animateOpacity ? 1 : 0,
          transition: animateOpacity ? `opacity ${duration}ms ${transitionTimingFunction}` : "none",
          ...getStyleObject(style, theme)
        },
        ref,
        ...others
      }),
      children
    }
  );
});
Collapse.displayName = "@mantine/core/Collapse";
var classes$Y = { "root": "m_d57069b5", "content": "m_b1336c6", "viewport": "m_c0783ff9", "viewportInner": "m_f8f631dd", "scrollbar": "m_c44ba933", "thumb": "m_d8b5e363", "corner": "m_21657268" };
const [ScrollAreaProvider, useScrollAreaContext] = createSafeContext(
  "ScrollArea.Root component was not found in tree"
);
function useResizeObserver(element, onResize) {
  const handleResize = useCallbackRef(onResize);
  useIsomorphicEffect(() => {
    let rAF = 0;
    if (element) {
      const resizeObserver = new ResizeObserver(() => {
        cancelAnimationFrame(rAF);
        rAF = window.requestAnimationFrame(handleResize);
      });
      resizeObserver.observe(element);
      return () => {
        window.cancelAnimationFrame(rAF);
        resizeObserver.unobserve(element);
      };
    }
    return void 0;
  }, [element, handleResize]);
}
const Corner = reactExports.forwardRef((props, ref) => {
  const { style, ...others } = props;
  const ctx = useScrollAreaContext();
  const [width, setWidth] = reactExports.useState(0);
  const [height, setHeight] = reactExports.useState(0);
  const hasSize = Boolean(width && height);
  useResizeObserver(ctx.scrollbarX, () => {
    const h = ctx.scrollbarX?.offsetHeight || 0;
    ctx.onCornerHeightChange(h);
    setHeight(h);
  });
  useResizeObserver(ctx.scrollbarY, () => {
    const w = ctx.scrollbarY?.offsetWidth || 0;
    ctx.onCornerWidthChange(w);
    setWidth(w);
  });
  return hasSize ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...others, ref, style: { ...style, width, height } }) : null;
});
const ScrollAreaCorner = reactExports.forwardRef((props, ref) => {
  const ctx = useScrollAreaContext();
  const hasBothScrollbarsVisible = Boolean(ctx.scrollbarX && ctx.scrollbarY);
  const hasCorner = ctx.type !== "scroll" && hasBothScrollbarsVisible;
  return hasCorner ? /* @__PURE__ */ jsxRuntimeExports.jsx(Corner, { ...props, ref }) : null;
});
const defaultProps$1b = {
  scrollHideDelay: 1e3,
  type: "hover"
};
const ScrollAreaRoot = reactExports.forwardRef((_props, ref) => {
  const { type, scrollHideDelay, scrollbars, getStyles, ...others } = useProps(
    "ScrollAreaRoot",
    defaultProps$1b,
    _props
  );
  const [scrollArea, setScrollArea] = reactExports.useState(null);
  const [viewport, setViewport] = reactExports.useState(null);
  const [content, setContent] = reactExports.useState(null);
  const [scrollbarX, setScrollbarX] = reactExports.useState(null);
  const [scrollbarY, setScrollbarY] = reactExports.useState(null);
  const [cornerWidth, setCornerWidth] = reactExports.useState(0);
  const [cornerHeight, setCornerHeight] = reactExports.useState(0);
  const [scrollbarXEnabled, setScrollbarXEnabled] = reactExports.useState(false);
  const [scrollbarYEnabled, setScrollbarYEnabled] = reactExports.useState(false);
  const rootRef = useMergedRef(ref, (node) => setScrollArea(node));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollAreaProvider,
    {
      value: {
        type,
        scrollHideDelay,
        scrollArea,
        viewport,
        onViewportChange: setViewport,
        content,
        onContentChange: setContent,
        scrollbarX,
        onScrollbarXChange: setScrollbarX,
        scrollbarXEnabled,
        onScrollbarXEnabledChange: setScrollbarXEnabled,
        scrollbarY,
        onScrollbarYChange: setScrollbarY,
        scrollbarYEnabled,
        onScrollbarYEnabledChange: setScrollbarYEnabled,
        onCornerWidthChange: setCornerWidth,
        onCornerHeightChange: setCornerHeight,
        getStyles
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Box,
        {
          ...others,
          ref: rootRef,
          __vars: {
            "--sa-corner-width": scrollbars !== "xy" ? "0px" : `${cornerWidth}px`,
            "--sa-corner-height": scrollbars !== "xy" ? "0px" : `${cornerHeight}px`
          }
        }
      )
    }
  );
});
ScrollAreaRoot.displayName = "@mantine/core/ScrollAreaRoot";
function getThumbRatio(viewportSize, contentSize) {
  const ratio = viewportSize / contentSize;
  return Number.isNaN(ratio) ? 0 : ratio;
}
function getThumbSize(sizes2) {
  const ratio = getThumbRatio(sizes2.viewport, sizes2.content);
  const scrollbarPadding = sizes2.scrollbar.paddingStart + sizes2.scrollbar.paddingEnd;
  const thumbSize = (sizes2.scrollbar.size - scrollbarPadding) * ratio;
  return Math.max(thumbSize, 18);
}
function linearScale(input, output) {
  return (value) => {
    if (input[0] === input[1] || output[0] === output[1]) {
      return output[0];
    }
    const ratio = (output[1] - output[0]) / (input[1] - input[0]);
    return output[0] + ratio * (value - input[0]);
  };
}
function clamp(value, [min, max]) {
  return Math.min(max, Math.max(min, value));
}
function getThumbOffsetFromScroll(scrollPos, sizes2, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes2);
  const scrollbarPadding = sizes2.scrollbar.paddingStart + sizes2.scrollbar.paddingEnd;
  const scrollbar = sizes2.scrollbar.size - scrollbarPadding;
  const maxScrollPos = sizes2.content - sizes2.viewport;
  const maxThumbPos = scrollbar - thumbSizePx;
  const scrollClampRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const scrollWithoutMomentum = clamp(scrollPos, scrollClampRange);
  const interpolate = linearScale([0, maxScrollPos], [0, maxThumbPos]);
  return interpolate(scrollWithoutMomentum);
}
function getScrollPositionFromPointer(pointerPos, pointerOffset, sizes2, dir = "ltr") {
  const thumbSizePx = getThumbSize(sizes2);
  const thumbCenter = thumbSizePx / 2;
  const offset2 = pointerOffset || thumbCenter;
  const thumbOffsetFromEnd = thumbSizePx - offset2;
  const minPointerPos = sizes2.scrollbar.paddingStart + offset2;
  const maxPointerPos = sizes2.scrollbar.size - sizes2.scrollbar.paddingEnd - thumbOffsetFromEnd;
  const maxScrollPos = sizes2.content - sizes2.viewport;
  const scrollRange = dir === "ltr" ? [0, maxScrollPos] : [maxScrollPos * -1, 0];
  const interpolate = linearScale([minPointerPos, maxPointerPos], scrollRange);
  return interpolate(pointerPos);
}
function isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos) {
  return scrollPos > 0 && scrollPos < maxScrollPos;
}
function toInt(value) {
  return value ? parseInt(value, 10) : 0;
}
function composeEventHandlers(originalEventHandler, ourEventHandler, { checkForDefaultPrevented = true } = {}) {
  return (event) => {
    originalEventHandler?.(event);
    if (checkForDefaultPrevented === false || !event.defaultPrevented) {
      ourEventHandler?.(event);
    }
  };
}
const [ScrollbarProvider, useScrollbarContext] = createSafeContext(
  "ScrollAreaScrollbar was not found in tree"
);
const Scrollbar = reactExports.forwardRef((props, forwardedRef) => {
  const {
    sizes: sizes2,
    hasThumb,
    onThumbChange,
    onThumbPointerUp,
    onThumbPointerDown,
    onThumbPositionChange,
    onDragScroll,
    onWheelScroll,
    onResize,
    ...scrollbarProps
  } = props;
  const context = useScrollAreaContext();
  const [scrollbar, setScrollbar] = reactExports.useState(null);
  const composeRefs = useMergedRef(forwardedRef, (node) => setScrollbar(node));
  const rectRef = reactExports.useRef(null);
  const prevWebkitUserSelectRef = reactExports.useRef("");
  const { viewport } = context;
  const maxScrollPos = sizes2.content - sizes2.viewport;
  const handleWheelScroll = useCallbackRef(onWheelScroll);
  const handleThumbPositionChange = useCallbackRef(onThumbPositionChange);
  const handleResize = useDebouncedCallback(onResize, 10);
  const handleDragScroll = (event) => {
    if (rectRef.current) {
      const x = event.clientX - rectRef.current.left;
      const y = event.clientY - rectRef.current.top;
      onDragScroll({ x, y });
    }
  };
  reactExports.useEffect(() => {
    const handleWheel = (event) => {
      const element = event.target;
      const isScrollbarWheel = scrollbar?.contains(element);
      if (isScrollbarWheel) {
        handleWheelScroll(event, maxScrollPos);
      }
    };
    document.addEventListener("wheel", handleWheel, { passive: false });
    return () => document.removeEventListener("wheel", handleWheel, { passive: false });
  }, [viewport, scrollbar, maxScrollPos, handleWheelScroll]);
  reactExports.useEffect(handleThumbPositionChange, [sizes2, handleThumbPositionChange]);
  useResizeObserver(scrollbar, handleResize);
  useResizeObserver(context.content, handleResize);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollbarProvider,
    {
      value: {
        scrollbar,
        hasThumb,
        onThumbChange: useCallbackRef(onThumbChange),
        onThumbPointerUp: useCallbackRef(onThumbPointerUp),
        onThumbPositionChange: handleThumbPositionChange,
        onThumbPointerDown: useCallbackRef(onThumbPointerDown)
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ...scrollbarProps,
          ref: composeRefs,
          "data-mantine-scrollbar": true,
          style: { position: "absolute", ...scrollbarProps.style },
          onPointerDown: composeEventHandlers(props.onPointerDown, (event) => {
            event.preventDefault();
            const mainPointer = 0;
            if (event.button === mainPointer) {
              const element = event.target;
              element.setPointerCapture(event.pointerId);
              rectRef.current = scrollbar.getBoundingClientRect();
              prevWebkitUserSelectRef.current = document.body.style.webkitUserSelect;
              document.body.style.webkitUserSelect = "none";
              handleDragScroll(event);
            }
          }),
          onPointerMove: composeEventHandlers(props.onPointerMove, handleDragScroll),
          onPointerUp: composeEventHandlers(props.onPointerUp, (event) => {
            const element = event.target;
            if (element.hasPointerCapture(event.pointerId)) {
              event.preventDefault();
              element.releasePointerCapture(event.pointerId);
            }
          }),
          onLostPointerCapture: () => {
            document.body.style.webkitUserSelect = prevWebkitUserSelectRef.current;
            rectRef.current = null;
          }
        }
      )
    }
  );
});
const ScrollAreaScrollbarX = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { sizes: sizes2, onSizesChange, style, ...others } = props;
    const ctx = useScrollAreaContext();
    const [computedStyle, setComputedStyle] = reactExports.useState();
    const ref = reactExports.useRef(null);
    const composeRefs = useMergedRef(forwardedRef, ref, ctx.onScrollbarXChange);
    reactExports.useEffect(() => {
      if (ref.current) {
        setComputedStyle(getComputedStyle(ref.current));
      }
    }, [ref]);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Scrollbar,
      {
        "data-orientation": "horizontal",
        ...others,
        ref: composeRefs,
        sizes: sizes2,
        style: {
          ...style,
          ["--sa-thumb-width"]: `${getThumbSize(sizes2)}px`
        },
        onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.x),
        onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.x),
        onWheelScroll: (event, maxScrollPos) => {
          if (ctx.viewport) {
            const scrollPos = ctx.viewport.scrollLeft + event.deltaX;
            props.onWheelScroll(scrollPos);
            if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
              event.preventDefault();
            }
          }
        },
        onResize: () => {
          if (ref.current && ctx.viewport && computedStyle) {
            onSizesChange({
              content: ctx.viewport.scrollWidth,
              viewport: ctx.viewport.offsetWidth,
              scrollbar: {
                size: ref.current.clientWidth,
                paddingStart: toInt(computedStyle.paddingLeft),
                paddingEnd: toInt(computedStyle.paddingRight)
              }
            });
          }
        }
      }
    );
  }
);
ScrollAreaScrollbarX.displayName = "@mantine/core/ScrollAreaScrollbarX";
const ScrollAreaScrollbarY = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { sizes: sizes2, onSizesChange, style, ...others } = props;
    const context = useScrollAreaContext();
    const [computedStyle, setComputedStyle] = reactExports.useState();
    const ref = reactExports.useRef(null);
    const composeRefs = useMergedRef(forwardedRef, ref, context.onScrollbarYChange);
    reactExports.useEffect(() => {
      if (ref.current) {
        setComputedStyle(window.getComputedStyle(ref.current));
      }
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Scrollbar,
      {
        ...others,
        "data-orientation": "vertical",
        ref: composeRefs,
        sizes: sizes2,
        style: {
          ["--sa-thumb-height"]: `${getThumbSize(sizes2)}px`,
          ...style
        },
        onThumbPointerDown: (pointerPos) => props.onThumbPointerDown(pointerPos.y),
        onDragScroll: (pointerPos) => props.onDragScroll(pointerPos.y),
        onWheelScroll: (event, maxScrollPos) => {
          if (context.viewport) {
            const scrollPos = context.viewport.scrollTop + event.deltaY;
            props.onWheelScroll(scrollPos);
            if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos)) {
              event.preventDefault();
            }
          }
        },
        onResize: () => {
          if (ref.current && context.viewport && computedStyle) {
            onSizesChange({
              content: context.viewport.scrollHeight,
              viewport: context.viewport.offsetHeight,
              scrollbar: {
                size: ref.current.clientHeight,
                paddingStart: toInt(computedStyle.paddingTop),
                paddingEnd: toInt(computedStyle.paddingBottom)
              }
            });
          }
        }
      }
    );
  }
);
ScrollAreaScrollbarY.displayName = "@mantine/core/ScrollAreaScrollbarY";
const ScrollAreaScrollbarVisible = reactExports.forwardRef((props, forwardedRef) => {
  const { orientation = "vertical", ...scrollbarProps } = props;
  const { dir } = useDirection();
  const context = useScrollAreaContext();
  const thumbRef = reactExports.useRef(null);
  const pointerOffsetRef = reactExports.useRef(0);
  const [sizes2, setSizes] = reactExports.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  });
  const thumbRatio = getThumbRatio(sizes2.viewport, sizes2.content);
  const commonProps = {
    ...scrollbarProps,
    sizes: sizes2,
    onSizesChange: setSizes,
    hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
    onThumbChange: (thumb) => {
      thumbRef.current = thumb;
    },
    onThumbPointerUp: () => {
      pointerOffsetRef.current = 0;
    },
    onThumbPointerDown: (pointerPos) => {
      pointerOffsetRef.current = pointerPos;
    }
  };
  const getScrollPosition = (pointerPos, direction) => getScrollPositionFromPointer(pointerPos, pointerOffsetRef.current, sizes2, direction);
  if (orientation === "horizontal") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaScrollbarX,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollLeft;
            const offset2 = getThumbOffsetFromScroll(scrollPos, sizes2, dir);
            thumbRef.current.style.transform = `translate3d(${offset2}px, 0, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) {
            context.viewport.scrollLeft = scrollPos;
          }
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) {
            context.viewport.scrollLeft = getScrollPosition(pointerPos, dir);
          }
        }
      }
    );
  }
  if (orientation === "vertical") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollAreaScrollbarY,
      {
        ...commonProps,
        ref: forwardedRef,
        onThumbPositionChange: () => {
          if (context.viewport && thumbRef.current) {
            const scrollPos = context.viewport.scrollTop;
            const offset2 = getThumbOffsetFromScroll(scrollPos, sizes2);
            if (sizes2.scrollbar.size === 0) {
              thumbRef.current.style.setProperty("--thumb-opacity", "0");
            } else {
              thumbRef.current.style.setProperty("--thumb-opacity", "1");
            }
            thumbRef.current.style.transform = `translate3d(0, ${offset2}px, 0)`;
          }
        },
        onWheelScroll: (scrollPos) => {
          if (context.viewport) {
            context.viewport.scrollTop = scrollPos;
          }
        },
        onDragScroll: (pointerPos) => {
          if (context.viewport) {
            context.viewport.scrollTop = getScrollPosition(pointerPos);
          }
        }
      }
    );
  }
  return null;
});
ScrollAreaScrollbarVisible.displayName = "@mantine/core/ScrollAreaScrollbarVisible";
const ScrollAreaScrollbarAuto = reactExports.forwardRef(
  (props, ref) => {
    const context = useScrollAreaContext();
    const { forceMount, ...scrollbarProps } = props;
    const [visible, setVisible] = reactExports.useState(false);
    const isHorizontal = props.orientation === "horizontal";
    const handleResize = useDebouncedCallback(() => {
      if (context.viewport) {
        const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth;
        const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight;
        setVisible(isHorizontal ? isOverflowX : isOverflowY);
      }
    }, 10);
    useResizeObserver(context.viewport, handleResize);
    useResizeObserver(context.content, handleResize);
    if (forceMount || visible) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ScrollAreaScrollbarVisible,
        {
          "data-state": visible ? "visible" : "hidden",
          ...scrollbarProps,
          ref
        }
      );
    }
    return null;
  }
);
ScrollAreaScrollbarAuto.displayName = "@mantine/core/ScrollAreaScrollbarAuto";
const ScrollAreaScrollbarHover = reactExports.forwardRef(
  (props, ref) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext();
    const [visible, setVisible] = reactExports.useState(false);
    reactExports.useEffect(() => {
      const { scrollArea } = context;
      let hideTimer = 0;
      if (scrollArea) {
        const handlePointerEnter = () => {
          window.clearTimeout(hideTimer);
          setVisible(true);
        };
        const handlePointerLeave = () => {
          hideTimer = window.setTimeout(() => setVisible(false), context.scrollHideDelay);
        };
        scrollArea.addEventListener("pointerenter", handlePointerEnter);
        scrollArea.addEventListener("pointerleave", handlePointerLeave);
        return () => {
          window.clearTimeout(hideTimer);
          scrollArea.removeEventListener("pointerenter", handlePointerEnter);
          scrollArea.removeEventListener("pointerleave", handlePointerLeave);
        };
      }
      return void 0;
    }, [context.scrollArea, context.scrollHideDelay]);
    if (forceMount || visible) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ScrollAreaScrollbarAuto,
        {
          "data-state": visible ? "visible" : "hidden",
          ...scrollbarProps,
          ref
        }
      );
    }
    return null;
  }
);
ScrollAreaScrollbarHover.displayName = "@mantine/core/ScrollAreaScrollbarHover";
const ScrollAreaScrollbarScroll = reactExports.forwardRef(
  (props, red) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext();
    const isHorizontal = props.orientation === "horizontal";
    const [state, setState] = reactExports.useState("hidden");
    const debounceScrollEnd = useDebouncedCallback(() => setState("idle"), 100);
    reactExports.useEffect(() => {
      if (state === "idle") {
        const hideTimer = window.setTimeout(() => setState("hidden"), context.scrollHideDelay);
        return () => window.clearTimeout(hideTimer);
      }
      return void 0;
    }, [state, context.scrollHideDelay]);
    reactExports.useEffect(() => {
      const { viewport } = context;
      const scrollDirection = isHorizontal ? "scrollLeft" : "scrollTop";
      if (viewport) {
        let prevScrollPos = viewport[scrollDirection];
        const handleScroll = () => {
          const scrollPos = viewport[scrollDirection];
          const hasScrollInDirectionChanged = prevScrollPos !== scrollPos;
          if (hasScrollInDirectionChanged) {
            setState("scrolling");
            debounceScrollEnd();
          }
          prevScrollPos = scrollPos;
        };
        viewport.addEventListener("scroll", handleScroll);
        return () => viewport.removeEventListener("scroll", handleScroll);
      }
      return void 0;
    }, [context.viewport, isHorizontal, debounceScrollEnd]);
    if (forceMount || state !== "hidden") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        ScrollAreaScrollbarVisible,
        {
          "data-state": state === "hidden" ? "hidden" : "visible",
          ...scrollbarProps,
          ref: red,
          onPointerEnter: composeEventHandlers(props.onPointerEnter, () => setState("interacting")),
          onPointerLeave: composeEventHandlers(props.onPointerLeave, () => setState("idle"))
        }
      );
    }
    return null;
  }
);
const ScrollAreaScrollbar = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...scrollbarProps } = props;
    const context = useScrollAreaContext();
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context;
    const isHorizontal = props.orientation === "horizontal";
    reactExports.useEffect(() => {
      isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true);
      return () => {
        isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false);
      };
    }, [isHorizontal, onScrollbarXEnabledChange, onScrollbarYEnabledChange]);
    return context.type === "hover" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarHover, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "scroll" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarScroll, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "auto" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarAuto, { ...scrollbarProps, ref: forwardedRef, forceMount }) : context.type === "always" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaScrollbarVisible, { ...scrollbarProps, ref: forwardedRef }) : null;
  }
);
ScrollAreaScrollbar.displayName = "@mantine/core/ScrollAreaScrollbar";
function addUnlinkedScrollListener(node, handler = () => {
}) {
  let prevPosition = { left: node.scrollLeft, top: node.scrollTop };
  let rAF = 0;
  (function loop() {
    const position = { left: node.scrollLeft, top: node.scrollTop };
    const isHorizontalScroll = prevPosition.left !== position.left;
    const isVerticalScroll = prevPosition.top !== position.top;
    if (isHorizontalScroll || isVerticalScroll) {
      handler();
    }
    prevPosition = position;
    rAF = window.requestAnimationFrame(loop);
  })();
  return () => window.cancelAnimationFrame(rAF);
}
const Thumb = reactExports.forwardRef((props, forwardedRef) => {
  const { style, ...others } = props;
  const scrollAreaContext = useScrollAreaContext();
  const scrollbarContext = useScrollbarContext();
  const { onThumbPositionChange } = scrollbarContext;
  const composedRef = useMergedRef(forwardedRef, (node) => scrollbarContext.onThumbChange(node));
  const removeUnlinkedScrollListenerRef = reactExports.useRef(void 0);
  const debounceScrollEnd = useDebouncedCallback(() => {
    if (removeUnlinkedScrollListenerRef.current) {
      removeUnlinkedScrollListenerRef.current();
      removeUnlinkedScrollListenerRef.current = void 0;
    }
  }, 100);
  reactExports.useEffect(() => {
    const { viewport } = scrollAreaContext;
    if (viewport) {
      const handleScroll = () => {
        debounceScrollEnd();
        if (!removeUnlinkedScrollListenerRef.current) {
          const listener = addUnlinkedScrollListener(viewport, onThumbPositionChange);
          removeUnlinkedScrollListenerRef.current = listener;
          onThumbPositionChange();
        }
      };
      onThumbPositionChange();
      viewport.addEventListener("scroll", handleScroll);
      return () => viewport.removeEventListener("scroll", handleScroll);
    }
    return void 0;
  }, [scrollAreaContext.viewport, debounceScrollEnd, onThumbPositionChange]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-state": scrollbarContext.hasThumb ? "visible" : "hidden",
      ...others,
      ref: composedRef,
      style: {
        width: "var(--sa-thumb-width)",
        height: "var(--sa-thumb-height)",
        ...style
      },
      onPointerDownCapture: composeEventHandlers(props.onPointerDownCapture, (event) => {
        const thumb = event.target;
        const thumbRect = thumb.getBoundingClientRect();
        const x = event.clientX - thumbRect.left;
        const y = event.clientY - thumbRect.top;
        scrollbarContext.onThumbPointerDown({ x, y });
      }),
      onPointerUp: composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp)
    }
  );
});
Thumb.displayName = "@mantine/core/ScrollAreaThumb";
const ScrollAreaThumb = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { forceMount, ...thumbProps } = props;
    const scrollbarContext = useScrollbarContext();
    if (forceMount || scrollbarContext.hasThumb) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Thumb, { ref: forwardedRef, ...thumbProps });
    }
    return null;
  }
);
ScrollAreaThumb.displayName = "@mantine/core/ScrollAreaThumb";
const ScrollAreaViewport = reactExports.forwardRef(
  ({ children, style, onWheel, ...others }, ref) => {
    const ctx = useScrollAreaContext();
    const rootRef = useMergedRef(ref, ctx.onViewportChange);
    const handleWheel = (event) => {
      onWheel?.(event);
      if (ctx.scrollbarXEnabled && ctx.viewport && event.shiftKey) {
        const { scrollTop, scrollHeight, clientHeight, scrollWidth, clientWidth } = ctx.viewport;
        const isAtTop = scrollTop < 1;
        const isAtBottom = scrollTop >= scrollHeight - clientHeight - 1;
        const canScrollHorizontally = scrollWidth > clientWidth;
        if (canScrollHorizontally && (isAtTop || isAtBottom)) {
          event.stopPropagation();
        }
      }
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Box,
      {
        ...others,
        ref: rootRef,
        onWheel: handleWheel,
        style: {
          overflowX: ctx.scrollbarXEnabled ? "scroll" : "hidden",
          overflowY: ctx.scrollbarYEnabled ? "scroll" : "hidden",
          ...style
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...ctx.getStyles("content"), ref: ctx.onContentChange, children })
      }
    );
  }
);
ScrollAreaViewport.displayName = "@mantine/core/ScrollAreaViewport";
const defaultProps$1a = {
  scrollHideDelay: 1e3,
  type: "hover",
  scrollbars: "xy"
};
const varsResolver$$ = createVarsResolver(
  (_, { scrollbarSize, overscrollBehavior, scrollbars }) => {
    let overrideOverscrollBehavior = overscrollBehavior;
    if (overscrollBehavior && scrollbars) {
      if (scrollbars === "x") {
        overrideOverscrollBehavior = `${overscrollBehavior} auto`;
      } else if (scrollbars === "y") {
        overrideOverscrollBehavior = `auto ${overscrollBehavior}`;
      }
    }
    return {
      root: {
        "--scrollarea-scrollbar-size": rem(scrollbarSize),
        "--scrollarea-over-scroll-behavior": overrideOverscrollBehavior
      }
    };
  }
);
const ScrollArea = factory((_props, ref) => {
  const props = useProps("ScrollArea", defaultProps$1a, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    scrollbarSize,
    vars,
    type,
    scrollHideDelay,
    viewportProps,
    viewportRef,
    onScrollPositionChange,
    children,
    offsetScrollbars,
    scrollbars,
    onBottomReached,
    onTopReached,
    overscrollBehavior,
    attributes,
    ...others
  } = props;
  const [scrollbarHovered, setScrollbarHovered] = reactExports.useState(false);
  const [verticalThumbVisible, setVerticalThumbVisible] = reactExports.useState(false);
  const [horizontalThumbVisible, setHorizontalThumbVisible] = reactExports.useState(false);
  const getStyles = useStyles({
    name: "ScrollArea",
    props,
    classes: classes$Y,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$$
  });
  const localViewportRef = reactExports.useRef(null);
  const combinedViewportRef = useMergeRefs([viewportRef, localViewportRef]);
  reactExports.useEffect(() => {
    if (!localViewportRef.current) {
      return;
    }
    if (offsetScrollbars !== "present") {
      return;
    }
    const element = localViewportRef.current;
    const observer = new ResizeObserver(() => {
      const { scrollHeight, clientHeight, scrollWidth, clientWidth } = element;
      setVerticalThumbVisible(scrollHeight > clientHeight);
      setHorizontalThumbVisible(scrollWidth > clientWidth);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, [localViewportRef, offsetScrollbars]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ScrollAreaRoot,
    {
      getStyles,
      type: type === "never" ? "always" : type,
      scrollHideDelay,
      ref,
      scrollbars,
      ...getStyles("root"),
      ...others,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ScrollAreaViewport,
          {
            ...viewportProps,
            ...getStyles("viewport", { style: viewportProps?.style }),
            ref: combinedViewportRef,
            "data-offset-scrollbars": offsetScrollbars === true ? "xy" : offsetScrollbars || void 0,
            "data-scrollbars": scrollbars || void 0,
            "data-horizontal-hidden": offsetScrollbars === "present" && !horizontalThumbVisible ? "true" : void 0,
            "data-vertical-hidden": offsetScrollbars === "present" && !verticalThumbVisible ? "true" : void 0,
            onScroll: (e) => {
              viewportProps?.onScroll?.(e);
              onScrollPositionChange?.({ x: e.currentTarget.scrollLeft, y: e.currentTarget.scrollTop });
              const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
              if (scrollTop - (scrollHeight - clientHeight) >= -0.8) {
                onBottomReached?.();
              }
              if (scrollTop === 0) {
                onTopReached?.();
              }
            },
            children
          }
        ),
        (scrollbars === "xy" || scrollbars === "x") && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ScrollAreaScrollbar,
          {
            ...getStyles("scrollbar"),
            orientation: "horizontal",
            "data-hidden": type === "never" || offsetScrollbars === "present" && !horizontalThumbVisible ? true : void 0,
            forceMount: true,
            onMouseEnter: () => setScrollbarHovered(true),
            onMouseLeave: () => setScrollbarHovered(false),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaThumb, { ...getStyles("thumb") })
          }
        ),
        (scrollbars === "xy" || scrollbars === "y") && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ScrollAreaScrollbar,
          {
            ...getStyles("scrollbar"),
            orientation: "vertical",
            "data-hidden": type === "never" || offsetScrollbars === "present" && !verticalThumbVisible ? true : void 0,
            forceMount: true,
            onMouseEnter: () => setScrollbarHovered(true),
            onMouseLeave: () => setScrollbarHovered(false),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollAreaThumb, { ...getStyles("thumb") })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ScrollAreaCorner,
          {
            ...getStyles("corner"),
            "data-hovered": scrollbarHovered || void 0,
            "data-hidden": type === "never" || void 0
          }
        )
      ]
    }
  );
});
ScrollArea.displayName = "@mantine/core/ScrollArea";
const ScrollAreaAutosize = factory((props, ref) => {
  const {
    children,
    classNames,
    styles,
    scrollbarSize,
    scrollHideDelay,
    type,
    dir,
    offsetScrollbars,
    overscrollBehavior,
    viewportRef,
    onScrollPositionChange,
    unstyled,
    variant,
    viewportProps,
    scrollbars,
    style,
    vars,
    onBottomReached,
    onTopReached,
    onOverflowChange,
    ...others
  } = useProps("ScrollAreaAutosize", defaultProps$1a, props);
  const viewportObserverRef = reactExports.useRef(null);
  const combinedViewportRef = useMergeRefs([viewportRef, viewportObserverRef]);
  const [overflowing, setOverflowing] = reactExports.useState(false);
  const didMount = reactExports.useRef(false);
  reactExports.useEffect(() => {
    if (!onOverflowChange) {
      return;
    }
    const el = viewportObserverRef.current;
    if (!el) {
      return;
    }
    const update = () => {
      const isOverflowing = el.scrollHeight > el.clientHeight;
      if (isOverflowing !== overflowing) {
        if (didMount.current) {
          onOverflowChange?.(isOverflowing);
        } else {
          didMount.current = true;
          if (isOverflowing) {
            onOverflowChange?.(true);
          }
        }
        setOverflowing(isOverflowing);
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [onOverflowChange, overflowing]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ...others, ref, style: [{ display: "flex", overflow: "hidden" }, style], children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      style: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        overflow: "hidden",
        ...scrollbars === "y" && { minWidth: 0 },
        ...scrollbars === "x" && { minHeight: 0 },
        ...scrollbars === "xy" && { minWidth: 0, minHeight: 0 },
        ...scrollbars === false && { minWidth: 0, minHeight: 0 }
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ScrollArea,
        {
          classNames,
          styles,
          scrollHideDelay,
          scrollbarSize,
          type,
          dir,
          offsetScrollbars,
          overscrollBehavior,
          viewportRef: combinedViewportRef,
          onScrollPositionChange,
          unstyled,
          variant,
          viewportProps,
          vars,
          scrollbars,
          onBottomReached,
          onTopReached,
          "data-autosize": "true",
          children
        }
      )
    }
  ) });
});
ScrollArea.classes = classes$Y;
ScrollAreaAutosize.displayName = "@mantine/core/ScrollAreaAutosize";
ScrollAreaAutosize.classes = classes$Y;
ScrollArea.Autosize = ScrollAreaAutosize;
var classes$X = { "root": "m_87cf2631" };
const defaultProps$19 = {
  __staticSelector: "UnstyledButton"
};
const UnstyledButton = polymorphicFactory(
  (_props, ref) => {
    const props = useProps("UnstyledButton", defaultProps$19, _props);
    const {
      className,
      component = "button",
      __staticSelector,
      unstyled,
      classNames,
      styles,
      style,
      attributes,
      ...others
    } = props;
    const getStyles = useStyles({
      name: __staticSelector,
      props,
      classes: classes$X,
      className,
      style,
      classNames,
      styles,
      unstyled,
      attributes
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Box,
      {
        ...getStyles("root", { focusable: true }),
        component,
        ref,
        type: component === "button" ? "button" : void 0,
        ...others
      }
    );
  }
);
UnstyledButton.classes = classes$X;
UnstyledButton.displayName = "@mantine/core/UnstyledButton";
var classes$W = { "root": "m_515a97f8" };
const VisuallyHidden = factory((_props, ref) => {
  const props = useProps("VisuallyHidden", null, _props);
  const { classNames, className, style, styles, unstyled, vars, attributes, ...others } = props;
  const getStyles = useStyles({
    name: "VisuallyHidden",
    classes: classes$W,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "span", ref, ...getStyles("root"), ...others });
});
VisuallyHidden.classes = classes$W;
VisuallyHidden.displayName = "@mantine/core/VisuallyHidden";
var classes$V = { "root": "m_1b7284a3" };
const varsResolver$_ = createVarsResolver((_, { radius, shadow }) => ({
  root: {
    "--paper-radius": radius === void 0 ? void 0 : getRadius(radius),
    "--paper-shadow": getShadow(shadow)
  }
}));
const Paper = polymorphicFactory((_props, ref) => {
  const props = useProps("Paper", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    withBorder,
    vars,
    radius,
    shadow,
    variant,
    mod,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Paper",
    props,
    classes: classes$V,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$_
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ref,
      mod: [{ "data-with-border": withBorder }, mod],
      ...getStyles("root"),
      variant,
      ...others
    }
  );
});
Paper.classes = classes$V;
Paper.displayName = "@mantine/core/Paper";
function horizontalSide(placement, arrowY, arrowOffset, arrowPosition) {
  if (placement === "center" || arrowPosition === "center") {
    return { top: arrowY };
  }
  if (placement === "end") {
    return { bottom: arrowOffset };
  }
  if (placement === "start") {
    return { top: arrowOffset };
  }
  return {};
}
function verticalSide(placement, arrowX, arrowOffset, arrowPosition, dir) {
  if (placement === "center" || arrowPosition === "center") {
    return { left: arrowX };
  }
  if (placement === "end") {
    return { [dir === "ltr" ? "right" : "left"]: arrowOffset };
  }
  if (placement === "start") {
    return { [dir === "ltr" ? "left" : "right"]: arrowOffset };
  }
  return {};
}
const radiusByFloatingSide = {
  bottom: "borderTopLeftRadius",
  left: "borderTopRightRadius",
  right: "borderBottomLeftRadius",
  top: "borderBottomRightRadius"
};
function getArrowPositionStyles({
  position,
  arrowSize,
  arrowOffset,
  arrowRadius,
  arrowPosition,
  arrowX,
  arrowY,
  dir
}) {
  const [side, placement = "center"] = position.split("-");
  const baseStyles = {
    width: arrowSize,
    height: arrowSize,
    transform: "rotate(45deg)",
    position: "absolute",
    [radiusByFloatingSide[side]]: arrowRadius
  };
  const arrowPlacement = -arrowSize / 2;
  if (side === "left") {
    return {
      ...baseStyles,
      ...horizontalSide(placement, arrowY, arrowOffset, arrowPosition),
      right: arrowPlacement,
      borderLeftColor: "transparent",
      borderBottomColor: "transparent",
      clipPath: "polygon(100% 0, 0 0, 100% 100%)"
    };
  }
  if (side === "right") {
    return {
      ...baseStyles,
      ...horizontalSide(placement, arrowY, arrowOffset, arrowPosition),
      left: arrowPlacement,
      borderRightColor: "transparent",
      borderTopColor: "transparent",
      clipPath: "polygon(0 100%, 0 0, 100% 100%)"
    };
  }
  if (side === "top") {
    return {
      ...baseStyles,
      ...verticalSide(placement, arrowX, arrowOffset, arrowPosition, dir),
      bottom: arrowPlacement,
      borderTopColor: "transparent",
      borderLeftColor: "transparent",
      clipPath: "polygon(0 100%, 100% 100%, 100% 0)"
    };
  }
  if (side === "bottom") {
    return {
      ...baseStyles,
      ...verticalSide(placement, arrowX, arrowOffset, arrowPosition, dir),
      top: arrowPlacement,
      borderBottomColor: "transparent",
      borderRightColor: "transparent",
      clipPath: "polygon(0 100%, 0 0, 100% 0)"
    };
  }
  return {};
}
const FloatingArrow = reactExports.forwardRef(
  ({
    position,
    arrowSize,
    arrowOffset,
    arrowRadius,
    arrowPosition,
    visible,
    arrowX,
    arrowY,
    style,
    ...others
  }, ref) => {
    const { dir } = useDirection();
    if (!visible) {
      return null;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ...others,
        ref,
        style: {
          ...style,
          ...getArrowPositionStyles({
            position,
            arrowSize,
            arrowOffset,
            arrowRadius,
            arrowPosition,
            dir,
            arrowX,
            arrowY
          })
        }
      }
    );
  }
);
FloatingArrow.displayName = "@mantine/core/FloatingArrow";
function getFloatingPosition(dir, position) {
  if (dir === "rtl" && (position.includes("right") || position.includes("left"))) {
    const [side, placement] = position.split("-");
    const flippedPosition = side === "right" ? "left" : "right";
    return placement === void 0 ? flippedPosition : `${flippedPosition}-${placement}`;
  }
  return position;
}
var classes$U = { "root": "m_9814e45f" };
const defaultProps$18 = {
  zIndex: getDefaultZIndex("modal")
};
const varsResolver$Z = createVarsResolver(
  (_, { gradient, color, backgroundOpacity, blur, radius, zIndex }) => ({
    root: {
      "--overlay-bg": gradient || (color !== void 0 || backgroundOpacity !== void 0) && rgba(color || "#000", backgroundOpacity ?? 0.6) || void 0,
      "--overlay-filter": blur ? `blur(${rem(blur)})` : void 0,
      "--overlay-radius": radius === void 0 ? void 0 : getRadius(radius),
      "--overlay-z-index": zIndex?.toString()
    }
  })
);
const Overlay = polymorphicFactory((_props, ref) => {
  const props = useProps("Overlay", defaultProps$18, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    fixed,
    center,
    children,
    radius,
    zIndex,
    gradient,
    blur,
    color,
    backgroundOpacity,
    mod,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Overlay",
    props,
    classes: classes$U,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$Z
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ref, ...getStyles("root"), mod: [{ center, fixed }, mod], ...others, children });
});
Overlay.classes = classes$U;
Overlay.displayName = "@mantine/core/Overlay";
function createPortalNode(props) {
  const node = document.createElement("div");
  node.setAttribute("data-portal", "true");
  typeof props.className === "string" && node.classList.add(...props.className.split(" ").filter(Boolean));
  typeof props.style === "object" && Object.assign(node.style, props.style);
  typeof props.id === "string" && node.setAttribute("id", props.id);
  return node;
}
function getTargetNode({ target, reuseTargetNode, ...others }) {
  if (target) {
    if (typeof target === "string") {
      return document.querySelector(target) || createPortalNode(others);
    }
    return target;
  }
  if (reuseTargetNode) {
    const existingNode = document.querySelector("[data-mantine-shared-portal-node]");
    if (existingNode) {
      return existingNode;
    }
    const node = createPortalNode(others);
    node.setAttribute("data-mantine-shared-portal-node", "true");
    document.body.appendChild(node);
    return node;
  }
  return createPortalNode(others);
}
const defaultProps$17 = {
  reuseTargetNode: true
};
const Portal = factory((props, ref) => {
  const { children, target, reuseTargetNode, ...others } = useProps("Portal", defaultProps$17, props);
  const [mounted, setMounted] = reactExports.useState(false);
  const nodeRef = reactExports.useRef(null);
  useIsomorphicEffect(() => {
    setMounted(true);
    nodeRef.current = getTargetNode({ target, reuseTargetNode, ...others });
    assignRef(ref, nodeRef.current);
    if (!target && !reuseTargetNode && nodeRef.current) {
      document.body.appendChild(nodeRef.current);
    }
    return () => {
      if (!target && !reuseTargetNode && nodeRef.current) {
        document.body.removeChild(nodeRef.current);
      }
    };
  }, [target]);
  if (!mounted || !nodeRef.current) {
    return null;
  }
  return reactDomExports.createPortal(/* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children }), nodeRef.current);
});
Portal.displayName = "@mantine/core/Portal";
const OptionalPortal = factory(
  ({ withinPortal = true, children, ...others }, ref) => {
    const env = useMantineEnv();
    if (env === "test" || !withinPortal) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { ref, ...others, children });
  }
);
OptionalPortal.displayName = "@mantine/core/OptionalPortal";
const popIn = (from) => ({
  in: { opacity: 1, transform: "scale(1)" },
  out: { opacity: 0, transform: `scale(.9) translateY(${from === "bottom" ? 10 : -10}px)` },
  transitionProperty: "transform, opacity"
});
const transitions$1 = {
  fade: {
    in: { opacity: 1 },
    out: { opacity: 0 },
    transitionProperty: "opacity"
  },
  "fade-up": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(30px)" },
    transitionProperty: "opacity, transform"
  },
  "fade-down": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(-30px)" },
    transitionProperty: "opacity, transform"
  },
  "fade-left": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(30px)" },
    transitionProperty: "opacity, transform"
  },
  "fade-right": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(-30px)" },
    transitionProperty: "opacity, transform"
  },
  scale: {
    in: { opacity: 1, transform: "scale(1)" },
    out: { opacity: 0, transform: "scale(0)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "scale-y": {
    in: { opacity: 1, transform: "scaleY(1)" },
    out: { opacity: 0, transform: "scaleY(0)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "scale-x": {
    in: { opacity: 1, transform: "scaleX(1)" },
    out: { opacity: 0, transform: "scaleX(0)" },
    common: { transformOrigin: "left" },
    transitionProperty: "transform, opacity"
  },
  "skew-up": {
    in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
    out: { opacity: 0, transform: "translateY(-20px) skew(-10deg, -5deg)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "skew-down": {
    in: { opacity: 1, transform: "translateY(0) skew(0deg, 0deg)" },
    out: { opacity: 0, transform: "translateY(20px) skew(-10deg, -5deg)" },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity"
  },
  "rotate-left": {
    in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
    out: { opacity: 0, transform: "translateY(20px) rotate(-5deg)" },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity"
  },
  "rotate-right": {
    in: { opacity: 1, transform: "translateY(0) rotate(0deg)" },
    out: { opacity: 0, transform: "translateY(20px) rotate(5deg)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "slide-down": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(-100%)" },
    common: { transformOrigin: "top" },
    transitionProperty: "transform, opacity"
  },
  "slide-up": {
    in: { opacity: 1, transform: "translateY(0)" },
    out: { opacity: 0, transform: "translateY(100%)" },
    common: { transformOrigin: "bottom" },
    transitionProperty: "transform, opacity"
  },
  "slide-left": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(100%)" },
    common: { transformOrigin: "left" },
    transitionProperty: "transform, opacity"
  },
  "slide-right": {
    in: { opacity: 1, transform: "translateX(0)" },
    out: { opacity: 0, transform: "translateX(-100%)" },
    common: { transformOrigin: "right" },
    transitionProperty: "transform, opacity"
  },
  pop: {
    ...popIn("bottom"),
    common: { transformOrigin: "center center" }
  },
  "pop-bottom-left": {
    ...popIn("bottom"),
    common: { transformOrigin: "bottom left" }
  },
  "pop-bottom-right": {
    ...popIn("bottom"),
    common: { transformOrigin: "bottom right" }
  },
  "pop-top-left": {
    ...popIn("top"),
    common: { transformOrigin: "top left" }
  },
  "pop-top-right": {
    ...popIn("top"),
    common: { transformOrigin: "top right" }
  }
};
const transitionStatuses = {
  entering: "in",
  entered: "in",
  exiting: "out",
  exited: "out",
  "pre-exiting": "out",
  "pre-entering": "out"
};
function getTransitionStyles({
  transition,
  state,
  duration,
  timingFunction
}) {
  const shared = {
    WebkitBackfaceVisibility: "hidden",
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: timingFunction
  };
  if (typeof transition === "string") {
    if (!(transition in transitions$1)) {
      return {};
    }
    return {
      transitionProperty: transitions$1[transition].transitionProperty,
      ...shared,
      ...transitions$1[transition].common,
      ...transitions$1[transition][transitionStatuses[state]]
    };
  }
  return {
    transitionProperty: transition.transitionProperty,
    ...shared,
    ...transition.common,
    ...transition[transitionStatuses[state]]
  };
}
function useTransition({
  duration,
  exitDuration,
  timingFunction,
  mounted,
  onEnter,
  onExit,
  onEntered,
  onExited,
  enterDelay,
  exitDelay
}) {
  const theme = useMantineTheme();
  const shouldReduceMotion = useReducedMotion();
  const reduceMotion = theme.respectReducedMotion ? shouldReduceMotion : false;
  const [transitionDuration, setTransitionDuration] = reactExports.useState(reduceMotion ? 0 : duration);
  const [transitionStatus, setStatus] = reactExports.useState(mounted ? "entered" : "exited");
  const transitionTimeoutRef = reactExports.useRef(-1);
  const delayTimeoutRef = reactExports.useRef(-1);
  const rafRef = reactExports.useRef(-1);
  function clearAllTimeouts() {
    window.clearTimeout(transitionTimeoutRef.current);
    window.clearTimeout(delayTimeoutRef.current);
    cancelAnimationFrame(rafRef.current);
  }
  const handleStateChange = (shouldMount) => {
    clearAllTimeouts();
    const preHandler = shouldMount ? onEnter : onExit;
    const handler = shouldMount ? onEntered : onExited;
    const newTransitionDuration = reduceMotion ? 0 : shouldMount ? duration : exitDuration;
    setTransitionDuration(newTransitionDuration);
    if (newTransitionDuration === 0) {
      typeof preHandler === "function" && preHandler();
      typeof handler === "function" && handler();
      setStatus(shouldMount ? "entered" : "exited");
    } else {
      rafRef.current = requestAnimationFrame(() => {
        ReactDOM.flushSync(() => {
          setStatus(shouldMount ? "pre-entering" : "pre-exiting");
        });
        rafRef.current = requestAnimationFrame(() => {
          typeof preHandler === "function" && preHandler();
          setStatus(shouldMount ? "entering" : "exiting");
          transitionTimeoutRef.current = window.setTimeout(() => {
            typeof handler === "function" && handler();
            setStatus(shouldMount ? "entered" : "exited");
          }, newTransitionDuration);
        });
      });
    }
  };
  const handleTransitionWithDelay = (shouldMount) => {
    clearAllTimeouts();
    const delay = shouldMount ? enterDelay : exitDelay;
    if (typeof delay !== "number") {
      handleStateChange(shouldMount);
      return;
    }
    delayTimeoutRef.current = window.setTimeout(
      () => {
        handleStateChange(shouldMount);
      },
      shouldMount ? enterDelay : exitDelay
    );
  };
  useDidUpdate(() => {
    handleTransitionWithDelay(mounted);
  }, [mounted]);
  reactExports.useEffect(
    () => () => {
      clearAllTimeouts();
    },
    []
  );
  return {
    transitionDuration,
    transitionStatus,
    transitionTimingFunction: timingFunction || "ease"
  };
}
function Transition({
  keepMounted,
  transition = "fade",
  duration = 250,
  exitDuration = duration,
  mounted,
  children,
  timingFunction = "ease",
  onExit,
  onEntered,
  onEnter,
  onExited,
  enterDelay,
  exitDelay
}) {
  const env = useMantineEnv();
  const { transitionDuration, transitionStatus, transitionTimingFunction } = useTransition({
    mounted,
    exitDuration,
    duration,
    timingFunction,
    onExit,
    onEntered,
    onEnter,
    onExited,
    enterDelay,
    exitDelay
  });
  if (transitionDuration === 0 || env === "test") {
    return mounted ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: children({}) }) : keepMounted ? children({ display: "none" }) : null;
  }
  return transitionStatus === "exited" ? keepMounted ? children({ display: "none" }) : null : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: children(
    getTransitionStyles({
      transition,
      duration: transitionDuration,
      state: transitionStatus,
      timingFunction: transitionTimingFunction
    })
  ) });
}
Transition.displayName = "@mantine/core/Transition";
const [PopoverContextProvider, usePopoverContext] = createSafeContext(
  "Popover component was not found in the tree"
);
var classes$T = { "dropdown": "m_38a85659", "arrow": "m_a31dc6c1", "overlay": "m_3d7bc908" };
function FocusTrap({
  children,
  active = true,
  refProp = "ref",
  innerRef
}) {
  const focusTrapRef = useFocusTrap(active);
  const ref = useMergedRef(focusTrapRef, innerRef);
  const child = getSingleElementChild(children);
  if (!child) {
    return children;
  }
  return reactExports.cloneElement(child, { [refProp]: ref });
}
function FocusTrapInitialFocus(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(VisuallyHidden, { tabIndex: -1, "data-autofocus": true, ...props });
}
FocusTrap.displayName = "@mantine/core/FocusTrap";
FocusTrapInitialFocus.displayName = "@mantine/core/FocusTrapInitialFocus";
FocusTrap.InitialFocus = FocusTrapInitialFocus;
const PopoverDropdown = factory((_props, ref) => {
  const props = useProps("PopoverDropdown", null, _props);
  const {
    className,
    style,
    vars,
    children,
    onKeyDownCapture,
    variant,
    classNames,
    styles,
    ...others
  } = props;
  const ctx = usePopoverContext();
  const returnFocus = useFocusReturn({
    opened: ctx.opened,
    shouldReturnFocus: ctx.returnFocus
  });
  const accessibleProps = ctx.withRoles ? {
    "aria-labelledby": ctx.getTargetId(),
    id: ctx.getDropdownId(),
    role: "dialog",
    tabIndex: -1
  } : {};
  const mergedRef = useMergedRef(ref, ctx.floating);
  if (ctx.disabled) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(OptionalPortal, { ...ctx.portalProps, withinPortal: ctx.withinPortal, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Transition,
    {
      mounted: ctx.opened,
      ...ctx.transitionProps,
      transition: ctx.transitionProps?.transition || "fade",
      duration: ctx.transitionProps?.duration ?? 150,
      keepMounted: ctx.keepMounted,
      exitDuration: typeof ctx.transitionProps?.exitDuration === "number" ? ctx.transitionProps.exitDuration : ctx.transitionProps?.duration,
      children: (transitionStyles) => /* @__PURE__ */ jsxRuntimeExports.jsx(FocusTrap, { active: ctx.trapFocus && ctx.opened, innerRef: mergedRef, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Box,
        {
          ...accessibleProps,
          ...others,
          variant,
          onKeyDownCapture: closeOnEscape(
            () => {
              ctx.onClose?.();
              ctx.onDismiss?.();
            },
            {
              active: ctx.closeOnEscape,
              onTrigger: returnFocus,
              onKeyDown: onKeyDownCapture
            }
          ),
          "data-position": ctx.placement,
          "data-fixed": ctx.floatingStrategy === "fixed" || void 0,
          ...ctx.getStyles("dropdown", {
            className,
            props,
            classNames,
            styles,
            style: [
              {
                ...transitionStyles,
                zIndex: ctx.zIndex,
                top: ctx.y ?? 0,
                left: ctx.x ?? 0,
                width: ctx.width === "target" ? void 0 : rem(ctx.width),
                ...ctx.referenceHidden ? { display: "none" } : null
              },
              ctx.resolvedStyles.dropdown,
              styles?.dropdown,
              style
            ]
          }),
          children: [
            children,
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              FloatingArrow,
              {
                ref: ctx.arrowRef,
                arrowX: ctx.arrowX,
                arrowY: ctx.arrowY,
                visible: ctx.withArrow,
                position: ctx.placement,
                arrowSize: ctx.arrowSize,
                arrowRadius: ctx.arrowRadius,
                arrowOffset: ctx.arrowOffset,
                arrowPosition: ctx.arrowPosition,
                ...ctx.getStyles("arrow", {
                  props,
                  classNames,
                  styles
                })
              }
            )
          ]
        }
      ) })
    }
  ) });
});
PopoverDropdown.classes = classes$T;
PopoverDropdown.displayName = "@mantine/core/PopoverDropdown";
const defaultProps$16 = {
  refProp: "ref",
  popupType: "dialog"
};
const PopoverTarget = factory((props, ref) => {
  const { children, refProp, popupType, ...others } = useProps(
    "PopoverTarget",
    defaultProps$16,
    props
  );
  const child = getSingleElementChild(children);
  if (!child) {
    throw new Error(
      "Popover.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  }
  const forwardedProps = others;
  const ctx = usePopoverContext();
  const targetRef = useMergedRef(ctx.reference, getRefProp(child), ref);
  const accessibleProps = ctx.withRoles ? {
    "aria-haspopup": popupType,
    "aria-expanded": ctx.opened,
    "aria-controls": ctx.opened ? ctx.getDropdownId() : void 0,
    id: ctx.getTargetId()
  } : {};
  const childProps = child.props;
  return reactExports.cloneElement(child, {
    ...forwardedProps,
    ...accessibleProps,
    ...ctx.targetProps,
    className: clsx(ctx.targetProps.className, forwardedProps.className, childProps.className),
    [refProp]: targetRef,
    ...!ctx.controlled ? {
      onClick: () => {
        ctx.onToggle();
        childProps.onClick?.();
      }
    } : null
  });
});
PopoverTarget.displayName = "@mantine/core/PopoverTarget";
function getDefaultMiddlewares$1(middlewares) {
  if (middlewares === void 0) {
    return { shift: true, flip: true };
  }
  const result = { ...middlewares };
  if (middlewares.shift === void 0) {
    result.shift = true;
  }
  if (middlewares.flip === void 0) {
    result.flip = true;
  }
  return result;
}
function getPopoverMiddlewares(options, getFloating, env) {
  const middlewaresOptions = getDefaultMiddlewares$1(options.middlewares);
  const middlewares = [offset(options.offset), hide()];
  if (options.dropdownVisible && env !== "test" && options.preventPositionChangeWhenVisible) {
    middlewaresOptions.flip = false;
  }
  if (middlewaresOptions.flip) {
    middlewares.push(
      typeof middlewaresOptions.flip === "boolean" ? flip() : flip(middlewaresOptions.flip)
    );
  }
  if (middlewaresOptions.shift) {
    middlewares.push(
      shift(
        typeof middlewaresOptions.shift === "boolean" ? { limiter: limitShift(), padding: 5 } : { limiter: limitShift(), padding: 5, ...middlewaresOptions.shift }
      )
    );
  }
  if (middlewaresOptions.inline) {
    middlewares.push(
      typeof middlewaresOptions.inline === "boolean" ? inline() : inline(middlewaresOptions.inline)
    );
  }
  middlewares.push(arrow({ element: options.arrowRef, padding: options.arrowOffset }));
  if (middlewaresOptions.size || options.width === "target") {
    middlewares.push(
      size({
        ...typeof middlewaresOptions.size === "boolean" ? {} : middlewaresOptions.size,
        apply({ rects, availableWidth, availableHeight, ...rest }) {
          const floating = getFloating();
          const styles = floating.refs.floating.current?.style ?? {};
          if (middlewaresOptions.size) {
            if (typeof middlewaresOptions.size === "object" && !!middlewaresOptions.size.apply) {
              middlewaresOptions.size.apply({ rects, availableWidth, availableHeight, ...rest });
            } else {
              Object.assign(styles, {
                maxWidth: `${availableWidth}px`,
                maxHeight: `${availableHeight}px`
              });
            }
          }
          if (options.width === "target") {
            Object.assign(styles, {
              width: `${rects.reference.width}px`
            });
          }
        }
      })
    );
  }
  return middlewares;
}
function usePopover(options) {
  const env = useMantineEnv();
  const [_opened, setOpened] = useUncontrolled({
    value: options.opened,
    defaultValue: options.defaultOpened,
    finalValue: false,
    onChange: options.onChange
  });
  const previouslyOpened = reactExports.useRef(_opened);
  const onClose = () => {
    if (_opened && !options.disabled) {
      setOpened(false);
    }
  };
  const onToggle = () => {
    if (!options.disabled) {
      setOpened(!_opened);
    }
  };
  const floating = useFloating({
    strategy: options.strategy,
    placement: options.preventPositionChangeWhenVisible ? options.positionRef.current : options.position,
    middleware: getPopoverMiddlewares(options, () => floating, env),
    whileElementsMounted: !options.keepMounted ? autoUpdate : void 0
  });
  reactExports.useEffect(() => {
    if (!floating.refs.reference.current || !floating.refs.floating.current) {
      return;
    }
    if (_opened) {
      return autoUpdate(
        floating.refs.reference.current,
        floating.refs.floating.current,
        floating.update
      );
    }
  }, [_opened, floating.update]);
  useDidUpdate(() => {
    options.onPositionChange?.(floating.placement);
    options.positionRef.current = floating.placement;
  }, [floating.placement, options.preventPositionChangeWhenVisible]);
  useDidUpdate(() => {
    if (_opened !== previouslyOpened.current) {
      if (!_opened) {
        options.onClose?.();
      } else {
        options.onOpen?.();
      }
    }
    previouslyOpened.current = _opened;
  }, [_opened, options.onClose, options.onOpen]);
  useIsomorphicEffect(() => {
    let timeout = -1;
    if (_opened) {
      timeout = window.setTimeout(() => options.setDropdownVisible(true), 4);
    }
    return () => {
      window.clearTimeout(timeout);
    };
  }, [_opened, options.position]);
  return {
    floating,
    controlled: typeof options.opened === "boolean",
    opened: _opened,
    onClose,
    onToggle
  };
}
const defaultProps$15 = {
  position: "bottom",
  offset: 8,
  positionDependencies: [],
  transitionProps: { transition: "fade", duration: 150 },
  middlewares: { flip: true, shift: true, inline: false },
  arrowSize: 7,
  arrowOffset: 5,
  arrowRadius: 0,
  arrowPosition: "side",
  closeOnClickOutside: true,
  withinPortal: true,
  closeOnEscape: true,
  trapFocus: false,
  withRoles: true,
  returnFocus: false,
  withOverlay: false,
  hideDetached: true,
  clickOutsideEvents: ["mousedown", "touchstart"],
  zIndex: getDefaultZIndex("popover"),
  __staticSelector: "Popover",
  width: "max-content"
};
const varsResolver$Y = createVarsResolver((_, { radius, shadow }) => ({
  dropdown: {
    "--popover-radius": radius === void 0 ? void 0 : getRadius(radius),
    "--popover-shadow": getShadow(shadow)
  }
}));
function Popover(_props) {
  const props = useProps("Popover", defaultProps$15, _props);
  const {
    children,
    position,
    offset: offset2,
    onPositionChange,
    // Scheduled for removal in 9.0
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    positionDependencies,
    opened,
    transitionProps,
    onExitTransitionEnd,
    onEnterTransitionEnd,
    width,
    middlewares,
    withArrow,
    arrowSize,
    arrowOffset,
    arrowRadius,
    arrowPosition,
    unstyled,
    classNames,
    styles,
    closeOnClickOutside,
    withinPortal,
    portalProps,
    closeOnEscape: closeOnEscape2,
    clickOutsideEvents,
    trapFocus,
    onClose,
    onDismiss,
    onOpen,
    onChange,
    zIndex,
    radius,
    shadow,
    id,
    defaultOpened,
    __staticSelector,
    withRoles,
    disabled,
    returnFocus,
    variant,
    keepMounted,
    vars,
    floatingStrategy,
    withOverlay,
    overlayProps,
    hideDetached,
    attributes,
    preventPositionChangeWhenVisible,
    ...others
  } = props;
  const getStyles = useStyles({
    name: __staticSelector,
    props,
    classes: classes$T,
    classNames,
    styles,
    unstyled,
    attributes,
    rootSelector: "dropdown",
    vars,
    varsResolver: varsResolver$Y
  });
  const { resolvedStyles } = useResolvedStylesApi({ classNames, styles, props });
  const [dropdownVisible, setDropdownVisible] = reactExports.useState(opened ?? defaultOpened ?? false);
  const positionRef = reactExports.useRef(position);
  const arrowRef = reactExports.useRef(null);
  const [targetNode, setTargetNode] = reactExports.useState(null);
  const [dropdownNode, setDropdownNode] = reactExports.useState(null);
  const { dir } = useDirection();
  const env = useMantineEnv();
  const uid = useId(id);
  const popover = usePopover({
    middlewares,
    width,
    position: getFloatingPosition(dir, position),
    offset: typeof offset2 === "number" ? offset2 + (withArrow ? arrowSize / 2 : 0) : offset2,
    arrowRef,
    arrowOffset,
    onPositionChange,
    positionDependencies,
    opened,
    defaultOpened,
    onChange,
    onOpen,
    onClose,
    onDismiss,
    strategy: floatingStrategy,
    dropdownVisible,
    setDropdownVisible,
    positionRef,
    disabled,
    preventPositionChangeWhenVisible,
    keepMounted
  });
  useClickOutside(
    () => {
      if (closeOnClickOutside) {
        popover.onClose();
        onDismiss?.();
      }
    },
    clickOutsideEvents,
    [targetNode, dropdownNode]
  );
  const reference = reactExports.useCallback(
    (node) => {
      setTargetNode(node);
      popover.floating.refs.setReference(node);
    },
    [popover.floating.refs.setReference]
  );
  const floating = reactExports.useCallback(
    (node) => {
      setDropdownNode(node);
      popover.floating.refs.setFloating(node);
    },
    [popover.floating.refs.setFloating]
  );
  const onExited = reactExports.useCallback(() => {
    transitionProps?.onExited?.();
    onExitTransitionEnd?.();
    setDropdownVisible(false);
    if (!preventPositionChangeWhenVisible) {
      positionRef.current = position;
    }
  }, [transitionProps?.onExited, onExitTransitionEnd, preventPositionChangeWhenVisible, position]);
  const onEntered = reactExports.useCallback(() => {
    transitionProps?.onEntered?.();
    onEnterTransitionEnd?.();
  }, [transitionProps?.onEntered, onEnterTransitionEnd]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    PopoverContextProvider,
    {
      value: {
        returnFocus,
        disabled,
        controlled: popover.controlled,
        reference,
        floating,
        x: popover.floating.x,
        y: popover.floating.y,
        arrowX: popover.floating?.middlewareData?.arrow?.x,
        arrowY: popover.floating?.middlewareData?.arrow?.y,
        opened: popover.opened,
        arrowRef,
        transitionProps: { ...transitionProps, onExited, onEntered },
        width,
        withArrow,
        arrowSize,
        arrowOffset,
        arrowRadius,
        arrowPosition,
        placement: popover.floating.placement,
        trapFocus,
        withinPortal,
        portalProps,
        zIndex,
        radius,
        shadow,
        closeOnEscape: closeOnEscape2,
        onDismiss,
        onClose: popover.onClose,
        onToggle: popover.onToggle,
        getTargetId: () => `${uid}-target`,
        getDropdownId: () => `${uid}-dropdown`,
        withRoles,
        targetProps: others,
        __staticSelector,
        classNames,
        styles,
        unstyled,
        variant,
        keepMounted,
        getStyles,
        resolvedStyles,
        floatingStrategy,
        referenceHidden: hideDetached && env !== "test" ? popover.floating.middlewareData.hide?.referenceHidden : false
      },
      children: [
        children,
        withOverlay && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Transition,
          {
            transition: "fade",
            mounted: popover.opened,
            duration: transitionProps?.duration || 250,
            exitDuration: transitionProps?.exitDuration || 250,
            children: (transitionStyles) => /* @__PURE__ */ jsxRuntimeExports.jsx(OptionalPortal, { withinPortal, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Overlay,
              {
                ...overlayProps,
                ...getStyles("overlay", {
                  className: overlayProps?.className,
                  style: [transitionStyles, overlayProps?.style]
                })
              }
            ) })
          }
        )
      ]
    }
  );
}
Popover.Target = PopoverTarget;
Popover.Dropdown = PopoverDropdown;
Popover.displayName = "@mantine/core/Popover";
Popover.extend = (input) => input;
var classes$S = { "root": "m_5ae2e3c", "barsLoader": "m_7a2bd4cd", "bar": "m_870bb79", "bars-loader-animation": "m_5d2b3b9d", "dotsLoader": "m_4e3f22d7", "dot": "m_870c4af", "loader-dots-animation": "m_aac34a1", "ovalLoader": "m_b34414df", "oval-loader-animation": "m_f8e89c4b" };
const Bars = reactExports.forwardRef(({ className, ...others }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { component: "span", className: clsx(classes$S.barsLoader, className), ...others, ref, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: classes$S.bar }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: classes$S.bar }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: classes$S.bar })
] }));
Bars.displayName = "@mantine/core/Bars";
const Dots = reactExports.forwardRef(({ className, ...others }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { component: "span", className: clsx(classes$S.dotsLoader, className), ...others, ref, children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: classes$S.dot }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: classes$S.dot }),
  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: classes$S.dot })
] }));
Dots.displayName = "@mantine/core/Dots";
const Oval = reactExports.forwardRef(({ className, ...others }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "span", className: clsx(classes$S.ovalLoader, className), ...others, ref }));
Oval.displayName = "@mantine/core/Oval";
const defaultLoaders = {
  bars: Bars,
  oval: Oval,
  dots: Dots
};
const defaultProps$14 = {
  loaders: defaultLoaders,
  type: "oval"
};
const varsResolver$X = createVarsResolver((theme, { size: size2, color }) => ({
  root: {
    "--loader-size": getSize(size2, "loader-size"),
    "--loader-color": color ? getThemeColor(color, theme) : void 0
  }
}));
const Loader = factory((_props, ref) => {
  const props = useProps("Loader", defaultProps$14, _props);
  const {
    size: size2,
    color,
    type,
    vars,
    className,
    style,
    classNames,
    styles,
    unstyled,
    loaders,
    variant,
    children,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Loader",
    props,
    classes: classes$S,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$X
  });
  if (children) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ...getStyles("root"), ref, ...others, children });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ...getStyles("root"),
      ref,
      component: loaders[type],
      variant,
      size: size2,
      ...others
    }
  );
});
Loader.defaultLoaders = defaultLoaders;
Loader.classes = classes$S;
Loader.displayName = "@mantine/core/Loader";
var classes$R = { "root": "m_8d3f4000", "icon": "m_8d3afb97", "loader": "m_302b9fb1", "group": "m_1a0f1b21", "groupSection": "m_437b6484" };
const defaultProps$13 = {
  orientation: "horizontal"
};
const varsResolver$W = createVarsResolver((_, { borderWidth }) => ({
  group: { "--ai-border-width": rem(borderWidth) }
}));
const ActionIconGroup = factory((_props, ref) => {
  const props = useProps("ActionIconGroup", defaultProps$13, _props);
  const {
    className,
    style,
    classNames,
    styles,
    unstyled,
    orientation,
    vars,
    borderWidth,
    variant,
    mod,
    attributes,
    ...others
  } = useProps("ActionIconGroup", defaultProps$13, _props);
  const getStyles = useStyles({
    name: "ActionIconGroup",
    props,
    classes: classes$R,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$W,
    rootSelector: "group"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ...getStyles("group"),
      ref,
      variant,
      mod: [{ "data-orientation": orientation }, mod],
      role: "group",
      ...others
    }
  );
});
ActionIconGroup.classes = classes$R;
ActionIconGroup.displayName = "@mantine/core/ActionIconGroup";
const varsResolver$V = createVarsResolver(
  (theme, { radius, color, gradient, variant, autoContrast, size: size2 }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || "filled",
      autoContrast
    });
    return {
      groupSection: {
        "--section-height": getSize(size2, "section-height"),
        "--section-padding-x": getSize(size2, "section-padding-x"),
        "--section-fz": getFontSize(size2),
        "--section-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--section-bg": color || variant ? colors.background : void 0,
        "--section-color": colors.color,
        "--section-bd": color || variant ? colors.border : void 0
      }
    };
  }
);
const ActionIconGroupSection = factory((_props, ref) => {
  const props = useProps("ActionIconGroupSection", null, _props);
  const {
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    variant,
    gradient,
    radius,
    autoContrast,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "ActionIconGroupSection",
    props,
    classes: classes$R,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$V,
    rootSelector: "groupSection"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ...getStyles("groupSection"), ref, variant, ...others });
});
ActionIconGroupSection.classes = classes$R;
ActionIconGroupSection.displayName = "@mantine/core/ActionIconGroupSection";
const varsResolver$U = createVarsResolver(
  (theme, { size: size2, radius, variant, gradient, color, autoContrast }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || "filled",
      autoContrast
    });
    return {
      root: {
        "--ai-size": getSize(size2, "ai-size"),
        "--ai-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--ai-bg": color || variant ? colors.background : void 0,
        "--ai-hover": color || variant ? colors.hover : void 0,
        "--ai-hover-color": color || variant ? colors.hoverColor : void 0,
        "--ai-color": colors.color,
        "--ai-bd": color || variant ? colors.border : void 0
      }
    };
  }
);
const ActionIcon = polymorphicFactory((_props, ref) => {
  const props = useProps("ActionIcon", null, _props);
  const {
    className,
    unstyled,
    variant,
    classNames,
    styles,
    style,
    loading,
    loaderProps,
    size: size2,
    color,
    radius,
    __staticSelector,
    gradient,
    vars,
    children,
    disabled,
    "data-disabled": dataDisabled,
    autoContrast,
    mod,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: ["ActionIcon", __staticSelector],
    props,
    className,
    style,
    classes: classes$R,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$U
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    UnstyledButton,
    {
      ...getStyles("root", { active: !disabled && !loading && !dataDisabled }),
      ...others,
      unstyled,
      variant,
      size: size2,
      disabled: disabled || loading,
      ref,
      mod: [{ loading, disabled: disabled || dataDisabled }, mod],
      children: [
        typeof loading === "boolean" && /* @__PURE__ */ jsxRuntimeExports.jsx(Transition, { mounted: loading, transition: "slide-down", duration: 150, children: (transitionStyles) => /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "span", ...getStyles("loader", { style: transitionStyles }), "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { color: "var(--ai-color)", size: "calc(var(--ai-size) * 0.55)", ...loaderProps }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "span", mod: { loading }, ...getStyles("icon"), children })
      ]
    }
  );
});
ActionIcon.classes = classes$R;
ActionIcon.displayName = "@mantine/core/ActionIcon";
ActionIcon.Group = ActionIconGroup;
ActionIcon.GroupSection = ActionIconGroupSection;
const CloseIcon = reactExports.forwardRef(
  ({ size: size2 = "var(--cb-icon-size, 70%)", style, ...others }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: { ...style, width: size2, height: size2 },
      ref,
      ...others,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: "M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z",
          fill: "currentColor",
          fillRule: "evenodd",
          clipRule: "evenodd"
        }
      )
    }
  )
);
CloseIcon.displayName = "@mantine/core/CloseIcon";
var classes$Q = { "root": "m_86a44da5", "root--subtle": "m_220c80f2" };
const defaultProps$12 = {
  variant: "subtle"
};
const varsResolver$T = createVarsResolver((_, { size: size2, radius, iconSize }) => ({
  root: {
    "--cb-size": getSize(size2, "cb-size"),
    "--cb-radius": radius === void 0 ? void 0 : getRadius(radius),
    "--cb-icon-size": rem(iconSize)
  }
}));
const CloseButton = polymorphicFactory((_props, ref) => {
  const props = useProps("CloseButton", defaultProps$12, _props);
  const {
    iconSize,
    children,
    vars,
    radius,
    className,
    classNames,
    style,
    styles,
    unstyled,
    "data-disabled": dataDisabled,
    disabled,
    variant,
    icon,
    mod,
    attributes,
    __staticSelector,
    ...others
  } = props;
  const getStyles = useStyles({
    name: __staticSelector || "CloseButton",
    props,
    className,
    style,
    classes: classes$Q,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$T
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    UnstyledButton,
    {
      ref,
      ...others,
      unstyled,
      variant,
      disabled,
      mod: [{ disabled: disabled || dataDisabled }, mod],
      ...getStyles("root", { variant, active: !disabled && !dataDisabled }),
      children: [
        icon || /* @__PURE__ */ jsxRuntimeExports.jsx(CloseIcon, {}),
        children
      ]
    }
  );
});
CloseButton.classes = classes$Q;
CloseButton.displayName = "@mantine/core/CloseButton";
function filterFalsyChildren(children) {
  return reactExports.Children.toArray(children).filter(Boolean);
}
var classes$P = { "root": "m_4081bf90" };
const defaultProps$11 = {
  preventGrowOverflow: true,
  gap: "md",
  align: "center",
  justify: "flex-start",
  wrap: "wrap"
};
const varsResolver$S = createVarsResolver(
  (_, { grow, preventGrowOverflow, gap, align, justify, wrap }, { childWidth }) => ({
    root: {
      "--group-child-width": grow && preventGrowOverflow ? childWidth : void 0,
      "--group-gap": getSpacing(gap),
      "--group-align": align,
      "--group-justify": justify,
      "--group-wrap": wrap
    }
  })
);
const Group = factory((_props, ref) => {
  const props = useProps("Group", defaultProps$11, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    children,
    gap,
    align,
    justify,
    wrap,
    grow,
    preventGrowOverflow,
    vars,
    variant,
    __size,
    mod,
    attributes,
    ...others
  } = props;
  const filteredChildren = filterFalsyChildren(children);
  const childrenCount = filteredChildren.length;
  const resolvedGap = getSpacing(gap ?? "md");
  const childWidth = `calc(${100 / childrenCount}% - (${resolvedGap} - ${resolvedGap} / ${childrenCount}))`;
  const stylesCtx = { childWidth };
  const getStyles = useStyles({
    name: "Group",
    props,
    stylesCtx,
    className,
    style,
    classes: classes$P,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$S
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ...getStyles("root"),
      ref,
      variant,
      mod: [{ grow }, mod],
      size: __size,
      ...others,
      children: filteredChildren
    }
  );
});
Group.classes = classes$P;
Group.displayName = "@mantine/core/Group";
const [ModalBaseProvider, useModalBaseContext] = createSafeContext(
  "ModalBase component was not found in tree"
);
function useLockScroll({ opened, transitionDuration }) {
  const [shouldLockScroll, setShouldLockScroll] = reactExports.useState(opened);
  const timeout = reactExports.useRef(-1);
  const reduceMotion = useReducedMotion();
  const _transitionDuration = reduceMotion ? 0 : transitionDuration;
  reactExports.useEffect(() => {
    if (opened) {
      setShouldLockScroll(true);
      window.clearTimeout(timeout.current);
    } else if (_transitionDuration === 0) {
      setShouldLockScroll(false);
    } else {
      timeout.current = window.setTimeout(() => setShouldLockScroll(false), _transitionDuration);
    }
    return () => window.clearTimeout(timeout.current);
  }, [opened, _transitionDuration]);
  return shouldLockScroll;
}
function useModal({
  id,
  transitionProps,
  opened,
  trapFocus,
  closeOnEscape: closeOnEscape2,
  onClose,
  returnFocus
}) {
  const _id = useId(id);
  const [titleMounted, setTitleMounted] = reactExports.useState(false);
  const [bodyMounted, setBodyMounted] = reactExports.useState(false);
  const transitionDuration = typeof transitionProps?.duration === "number" ? transitionProps?.duration : 200;
  const shouldLockScroll = useLockScroll({ opened, transitionDuration });
  useWindowEvent(
    "keydown",
    (event) => {
      if (event.key === "Escape" && closeOnEscape2 && !event.isComposing && opened) {
        const shouldTrigger = event.target?.getAttribute("data-mantine-stop-propagation") !== "true";
        shouldTrigger && onClose();
      }
    },
    { capture: true }
  );
  useFocusReturn({ opened, shouldReturnFocus: trapFocus && returnFocus });
  return {
    _id,
    titleMounted,
    bodyMounted,
    shouldLockScroll,
    setTitleMounted,
    setBodyMounted
  };
}
const ModalBase = reactExports.forwardRef(
  ({
    keepMounted,
    opened,
    onClose,
    id,
    transitionProps,
    onExitTransitionEnd,
    onEnterTransitionEnd,
    trapFocus,
    closeOnEscape: closeOnEscape2,
    returnFocus,
    closeOnClickOutside,
    withinPortal,
    portalProps,
    lockScroll,
    children,
    zIndex,
    shadow,
    padding,
    __vars,
    unstyled,
    removeScrollProps,
    ...others
  }, ref) => {
    const { _id, titleMounted, bodyMounted, shouldLockScroll, setTitleMounted, setBodyMounted } = useModal({ id, transitionProps, opened, trapFocus, closeOnEscape: closeOnEscape2, onClose, returnFocus });
    const { key: removeScrollKey, ...otherRemoveScrollProps } = removeScrollProps || {};
    return /* @__PURE__ */ jsxRuntimeExports.jsx(OptionalPortal, { ...portalProps, withinPortal, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      ModalBaseProvider,
      {
        value: {
          opened,
          onClose,
          closeOnClickOutside,
          onExitTransitionEnd,
          onEnterTransitionEnd,
          transitionProps: { ...transitionProps, keepMounted },
          getTitleId: () => `${_id}-title`,
          getBodyId: () => `${_id}-body`,
          titleMounted,
          bodyMounted,
          setTitleMounted,
          setBodyMounted,
          trapFocus,
          closeOnEscape: closeOnEscape2,
          zIndex,
          unstyled
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          ReactRemoveScroll,
          {
            enabled: shouldLockScroll && lockScroll,
            ...otherRemoveScrollProps,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Box,
              {
                ref,
                ...others,
                __vars: {
                  ...__vars,
                  "--mb-z-index": (zIndex || getDefaultZIndex("modal")).toString(),
                  "--mb-shadow": getShadow(shadow),
                  "--mb-padding": getSpacing(padding)
                },
                children
              }
            )
          },
          removeScrollKey
        )
      }
    ) });
  }
);
ModalBase.displayName = "@mantine/core/ModalBase";
var classes$O = { "title": "m_615af6c9", "header": "m_b5489c3c", "inner": "m_60c222c7", "content": "m_fd1ab0aa", "close": "m_606cb269", "body": "m_5df29311" };
function useModalBodyId() {
  const ctx = useModalBaseContext();
  reactExports.useEffect(() => {
    ctx.setBodyMounted(true);
    return () => ctx.setBodyMounted(false);
  }, []);
  return ctx.getBodyId();
}
const ModalBaseBody = reactExports.forwardRef(
  ({ className, ...others }, ref) => {
    const bodyId = useModalBodyId();
    const ctx = useModalBaseContext();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Box,
      {
        ref,
        ...others,
        id: bodyId,
        className: clsx({ [classes$O.body]: !ctx.unstyled }, className)
      }
    );
  }
);
ModalBaseBody.displayName = "@mantine/core/ModalBaseBody";
const ModalBaseCloseButton = reactExports.forwardRef(
  ({ className, onClick, ...others }, ref) => {
    const ctx = useModalBaseContext();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      CloseButton,
      {
        ref,
        ...others,
        onClick: (event) => {
          ctx.onClose();
          onClick?.(event);
        },
        className: clsx({ [classes$O.close]: !ctx.unstyled }, className),
        unstyled: ctx.unstyled
      }
    );
  }
);
ModalBaseCloseButton.displayName = "@mantine/core/ModalBaseCloseButton";
const ModalBaseContent = reactExports.forwardRef(
  ({ transitionProps, className, innerProps, onKeyDown, style, ...others }, ref) => {
    const ctx = useModalBaseContext();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Transition,
      {
        mounted: ctx.opened,
        transition: "pop",
        ...ctx.transitionProps,
        onExited: () => {
          ctx.onExitTransitionEnd?.();
          ctx.transitionProps?.onExited?.();
        },
        onEntered: () => {
          ctx.onEnterTransitionEnd?.();
          ctx.transitionProps?.onEntered?.();
        },
        ...transitionProps,
        children: (transitionStyles) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ...innerProps,
            className: clsx({ [classes$O.inner]: !ctx.unstyled }, innerProps.className),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FocusTrap, { active: ctx.opened && ctx.trapFocus, innerRef: ref, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Paper,
              {
                ...others,
                component: "section",
                role: "dialog",
                tabIndex: -1,
                "aria-modal": true,
                "aria-describedby": ctx.bodyMounted ? ctx.getBodyId() : void 0,
                "aria-labelledby": ctx.titleMounted ? ctx.getTitleId() : void 0,
                style: [style, transitionStyles],
                className: clsx({ [classes$O.content]: !ctx.unstyled }, className),
                unstyled: ctx.unstyled,
                children: others.children
              }
            ) })
          }
        )
      }
    );
  }
);
ModalBaseContent.displayName = "@mantine/core/ModalBaseContent";
const ModalBaseHeader = reactExports.forwardRef(
  ({ className, ...others }, ref) => {
    const ctx = useModalBaseContext();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Box,
      {
        component: "header",
        ref,
        className: clsx({ [classes$O.header]: !ctx.unstyled }, className),
        ...others
      }
    );
  }
);
ModalBaseHeader.displayName = "@mantine/core/ModalBaseHeader";
const DEFAULT_TRANSITION = {
  duration: 200,
  timingFunction: "ease",
  transition: "fade"
};
function useModalTransition(transitionOverride) {
  const ctx = useModalBaseContext();
  return { ...DEFAULT_TRANSITION, ...ctx.transitionProps, ...transitionOverride };
}
const ModalBaseOverlay = reactExports.forwardRef(
  ({ onClick, transitionProps, style, visible, ...others }, ref) => {
    const ctx = useModalBaseContext();
    const transition = useModalTransition(transitionProps);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Transition,
      {
        mounted: visible !== void 0 ? visible : ctx.opened,
        ...transition,
        transition: "fade",
        children: (transitionStyles) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Overlay,
          {
            ref,
            fixed: true,
            style: [style, transitionStyles],
            zIndex: ctx.zIndex,
            unstyled: ctx.unstyled,
            onClick: (event) => {
              onClick?.(event);
              ctx.closeOnClickOutside && ctx.onClose();
            },
            ...others
          }
        )
      }
    );
  }
);
ModalBaseOverlay.displayName = "@mantine/core/ModalBaseOverlay";
function useModalTitle() {
  const ctx = useModalBaseContext();
  reactExports.useEffect(() => {
    ctx.setTitleMounted(true);
    return () => ctx.setTitleMounted(false);
  }, []);
  return ctx.getTitleId();
}
const ModalBaseTitle = reactExports.forwardRef(
  ({ className, ...others }, ref) => {
    const id = useModalTitle();
    const ctx = useModalBaseContext();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Box,
      {
        component: "h2",
        ref,
        className: clsx({ [classes$O.title]: !ctx.unstyled }, className),
        ...others,
        id
      }
    );
  }
);
ModalBaseTitle.displayName = "@mantine/core/ModalBaseTitle";
function NativeScrollArea({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
}
const [InputContext, useInputContext] = createOptionalContext({
  size: "sm"
});
var classes$N = { "wrapper": "m_6c018570", "input": "m_8fb7ebe7", "section": "m_82577fc2", "placeholder": "m_88bacfd0", "root": "m_46b77525", "label": "m_8fdc1311", "required": "m_78a94662", "error": "m_8f816625", "description": "m_fe47ce59" };
const InputClearButton = factory((_props, ref) => {
  const props = useProps("InputClearButton", null, _props);
  const { size: size2, variant, vars, classNames, styles, ...others } = props;
  const ctx = useInputContext();
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    classNames,
    styles,
    props
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CloseButton,
    {
      variant: variant || "transparent",
      ref,
      size: size2 || ctx?.size || "sm",
      classNames: resolvedClassNames,
      styles: resolvedStyles,
      __staticSelector: "InputClearButton",
      style: { pointerEvents: "all", background: "var(--input-bg)", ...others.style },
      ...others
    }
  );
});
InputClearButton.displayName = "@mantine/core/InputClearButton";
const clearSectionOffset = {
  xs: 7,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 15
};
function InputClearSection({
  __clearable,
  __clearSection,
  rightSection,
  __defaultRightSection,
  size: size2 = "sm"
}) {
  const clearSection = __clearable && __clearSection;
  if (clearSection && (rightSection || __defaultRightSection)) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-combined-clear-section": true,
        style: {
          display: "flex",
          gap: 2,
          alignItems: "center",
          paddingInlineEnd: clearSectionOffset[size2]
        },
        children: [
          clearSection,
          rightSection || __defaultRightSection
        ]
      }
    );
  }
  return rightSection === null ? null : rightSection || clearSection || __defaultRightSection;
}
const [InputWrapperProvider, useInputWrapperContext] = createOptionalContext({
  offsetBottom: false,
  offsetTop: false,
  describedBy: void 0,
  getStyles: null,
  inputId: void 0,
  labelId: void 0
});
const varsResolver$R = createVarsResolver((_, { size: size2 }) => ({
  description: {
    "--input-description-size": size2 === void 0 ? void 0 : `calc(${getFontSize(size2)} - ${rem(2)})`
  }
}));
const InputDescription = factory((_props, ref) => {
  const props = useProps("InputDescription", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    size: size2,
    __staticSelector,
    __inheritStyles = true,
    attributes,
    variant,
    ...others
  } = useProps("InputDescription", null, props);
  const ctx = useInputWrapperContext();
  const _getStyles = useStyles({
    name: ["InputWrapper", __staticSelector],
    props,
    classes: classes$N,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    rootSelector: "description",
    vars,
    varsResolver: varsResolver$R
  });
  const getStyles = __inheritStyles && ctx?.getStyles || _getStyles;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      component: "p",
      ref,
      variant,
      size: size2,
      ...getStyles("description", ctx?.getStyles ? { className, style } : void 0),
      ...others
    }
  );
});
InputDescription.classes = classes$N;
InputDescription.displayName = "@mantine/core/InputDescription";
const varsResolver$Q = createVarsResolver((_, { size: size2 }) => ({
  error: {
    "--input-error-size": size2 === void 0 ? void 0 : `calc(${getFontSize(size2)} - ${rem(2)})`
  }
}));
const InputError = factory((_props, ref) => {
  const props = useProps("InputError", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    size: size2,
    attributes,
    __staticSelector,
    __inheritStyles = true,
    variant,
    ...others
  } = props;
  const _getStyles = useStyles({
    name: ["InputWrapper", __staticSelector],
    props,
    classes: classes$N,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    rootSelector: "error",
    vars,
    varsResolver: varsResolver$Q
  });
  const ctx = useInputWrapperContext();
  const getStyles = __inheritStyles && ctx?.getStyles || _getStyles;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      component: "p",
      ref,
      variant,
      size: size2,
      ...getStyles("error", ctx?.getStyles ? { className, style } : void 0),
      ...others
    }
  );
});
InputError.classes = classes$N;
InputError.displayName = "@mantine/core/InputError";
const defaultProps$10 = {
  labelElement: "label"
};
const varsResolver$P = createVarsResolver((_, { size: size2 }) => ({
  label: {
    "--input-label-size": getFontSize(size2),
    "--input-asterisk-color": void 0
  }
}));
const InputLabel = factory((_props, ref) => {
  const props = useProps("InputLabel", defaultProps$10, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    labelElement,
    size: size2,
    required,
    htmlFor,
    onMouseDown,
    children,
    __staticSelector,
    variant,
    mod,
    attributes,
    ...others
  } = useProps("InputLabel", defaultProps$10, props);
  const _getStyles = useStyles({
    name: ["InputWrapper", __staticSelector],
    props,
    classes: classes$N,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    rootSelector: "label",
    vars,
    varsResolver: varsResolver$P
  });
  const ctx = useInputWrapperContext();
  const getStyles = ctx?.getStyles || _getStyles;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Box,
    {
      ...getStyles("label", ctx?.getStyles ? { className, style } : void 0),
      component: labelElement,
      variant,
      size: size2,
      ref,
      htmlFor: labelElement === "label" ? htmlFor : void 0,
      mod: [{ required }, mod],
      onMouseDown: (event) => {
        onMouseDown?.(event);
        if (!event.defaultPrevented && event.detail > 1) {
          event.preventDefault();
        }
      },
      ...others,
      children: [
        children,
        required && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...getStyles("required"), "aria-hidden": true, children: " *" })
      ]
    }
  );
});
InputLabel.classes = classes$N;
InputLabel.displayName = "@mantine/core/InputLabel";
const InputPlaceholder = factory((_props, ref) => {
  const props = useProps("InputPlaceholder", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    __staticSelector,
    variant,
    error,
    mod,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: ["InputPlaceholder", __staticSelector],
    props,
    classes: classes$N,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    rootSelector: "placeholder"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ...getStyles("placeholder"),
      mod: [{ error: !!error }, mod],
      component: "span",
      variant,
      ref,
      ...others
    }
  );
});
InputPlaceholder.classes = classes$N;
InputPlaceholder.displayName = "@mantine/core/InputPlaceholder";
function getInputOffsets(inputWrapperOrder, { hasDescription, hasError }) {
  const inputIndex = inputWrapperOrder.findIndex((part) => part === "input");
  const aboveInput = inputWrapperOrder.slice(0, inputIndex);
  const belowInput = inputWrapperOrder.slice(inputIndex + 1);
  const offsetTop = hasDescription && aboveInput.includes("description") || hasError && aboveInput.includes("error");
  const offsetBottom = hasDescription && belowInput.includes("description") || hasError && belowInput.includes("error");
  return { offsetBottom, offsetTop };
}
const defaultProps$$ = {
  labelElement: "label",
  inputContainer: (children) => children,
  inputWrapperOrder: ["label", "description", "input", "error"]
};
const varsResolver$O = createVarsResolver((_, { size: size2 }) => ({
  label: {
    "--input-label-size": getFontSize(size2),
    "--input-asterisk-color": void 0
  },
  error: {
    "--input-error-size": size2 === void 0 ? void 0 : `calc(${getFontSize(size2)} - ${rem(2)})`
  },
  description: {
    "--input-description-size": size2 === void 0 ? void 0 : `calc(${getFontSize(size2)} - ${rem(2)})`
  }
}));
const InputWrapper = factory((_props, ref) => {
  const props = useProps("InputWrapper", defaultProps$$, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    size: size2,
    variant,
    __staticSelector,
    inputContainer,
    inputWrapperOrder,
    label,
    error,
    description,
    labelProps,
    descriptionProps,
    errorProps,
    labelElement,
    children,
    withAsterisk,
    id,
    required,
    __stylesApiProps,
    mod,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: ["InputWrapper", __staticSelector],
    props: __stylesApiProps || props,
    classes: classes$N,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$O
  });
  const sharedProps = {
    size: size2,
    variant,
    __staticSelector
  };
  const idBase = useId(id);
  const isRequired = typeof withAsterisk === "boolean" ? withAsterisk : required;
  const errorId = errorProps?.id || `${idBase}-error`;
  const descriptionId = descriptionProps?.id || `${idBase}-description`;
  const inputId = idBase;
  const hasError = !!error && typeof error !== "boolean";
  const hasDescription = !!description;
  const _describedBy = `${hasError ? errorId : ""} ${hasDescription ? descriptionId : ""}`;
  const describedBy = _describedBy.trim().length > 0 ? _describedBy.trim() : void 0;
  const labelId = labelProps?.id || `${idBase}-label`;
  const _label = label && /* @__PURE__ */ jsxRuntimeExports.jsx(
    InputLabel,
    {
      labelElement,
      id: labelId,
      htmlFor: inputId,
      required: isRequired,
      ...sharedProps,
      ...labelProps,
      children: label
    },
    "label"
  );
  const _description = hasDescription && /* @__PURE__ */ jsxRuntimeExports.jsx(
    InputDescription,
    {
      ...descriptionProps,
      ...sharedProps,
      size: descriptionProps?.size || sharedProps.size,
      id: descriptionProps?.id || descriptionId,
      children: description
    },
    "description"
  );
  const _input = /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Fragment, { children: inputContainer(children) }, "input");
  const _error = hasError && /* @__PURE__ */ reactExports.createElement(
    InputError,
    {
      ...errorProps,
      ...sharedProps,
      size: errorProps?.size || sharedProps.size,
      key: "error",
      id: errorProps?.id || errorId
    },
    error
  );
  const content = inputWrapperOrder.map((part) => {
    switch (part) {
      case "label":
        return _label;
      case "input":
        return _input;
      case "description":
        return _description;
      case "error":
        return _error;
      default:
        return null;
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    InputWrapperProvider,
    {
      value: {
        getStyles,
        describedBy,
        inputId,
        labelId,
        ...getInputOffsets(inputWrapperOrder, { hasDescription, hasError })
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Box,
        {
          ref,
          variant,
          size: size2,
          mod: [{ error: !!error }, mod],
          ...getStyles("root"),
          ...others,
          children: content
        }
      )
    }
  );
});
InputWrapper.classes = classes$N;
InputWrapper.displayName = "@mantine/core/InputWrapper";
const defaultProps$_ = {
  variant: "default",
  leftSectionPointerEvents: "none",
  rightSectionPointerEvents: "none",
  withAria: true,
  withErrorStyles: true,
  size: "sm"
};
const varsResolver$N = createVarsResolver((_, props, ctx) => ({
  wrapper: {
    "--input-margin-top": ctx.offsetTop ? "calc(var(--mantine-spacing-xs) / 2)" : void 0,
    "--input-margin-bottom": ctx.offsetBottom ? "calc(var(--mantine-spacing-xs) / 2)" : void 0,
    "--input-height": getSize(props.size, "input-height"),
    "--input-fz": getFontSize(props.size),
    "--input-radius": props.radius === void 0 ? void 0 : getRadius(props.radius),
    "--input-left-section-width": props.leftSectionWidth !== void 0 ? rem(props.leftSectionWidth) : void 0,
    "--input-right-section-width": props.rightSectionWidth !== void 0 ? rem(props.rightSectionWidth) : void 0,
    "--input-padding-y": props.multiline ? getSize(props.size, "input-padding-y") : void 0,
    "--input-left-section-pointer-events": props.leftSectionPointerEvents,
    "--input-right-section-pointer-events": props.rightSectionPointerEvents
  }
}));
const Input = polymorphicFactory((_props, ref) => {
  const props = useProps("Input", defaultProps$_, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    required,
    __staticSelector,
    __stylesApiProps,
    size: size2,
    wrapperProps,
    error,
    disabled,
    leftSection,
    leftSectionProps,
    leftSectionWidth,
    rightSection,
    rightSectionProps,
    rightSectionWidth,
    rightSectionPointerEvents,
    leftSectionPointerEvents,
    variant,
    vars,
    pointer,
    multiline,
    radius,
    id,
    withAria,
    withErrorStyles,
    mod,
    inputSize,
    attributes,
    __clearSection,
    __clearable,
    __defaultRightSection,
    ...others
  } = props;
  const { styleProps, rest } = extractStyleProps(others);
  const ctx = useInputWrapperContext();
  const stylesCtx = { offsetBottom: ctx?.offsetBottom, offsetTop: ctx?.offsetTop };
  const getStyles = useStyles({
    name: ["Input", __staticSelector],
    props: __stylesApiProps || props,
    classes: classes$N,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    stylesCtx,
    rootSelector: "wrapper",
    vars,
    varsResolver: varsResolver$N
  });
  const ariaAttributes = withAria ? {
    required,
    disabled,
    "aria-invalid": !!error,
    "aria-describedby": ctx?.describedBy,
    id: ctx?.inputId || id
  } : {};
  const _rightSection = InputClearSection({
    __clearable,
    __clearSection,
    rightSection,
    __defaultRightSection,
    size: size2
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(InputContext, { value: { size: size2 || "sm" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Box,
    {
      ...getStyles("wrapper"),
      ...styleProps,
      ...wrapperProps,
      mod: [
        {
          error: !!error && withErrorStyles,
          pointer,
          disabled,
          multiline,
          "data-with-right-section": !!_rightSection,
          "data-with-left-section": !!leftSection
        },
        mod
      ],
      variant,
      size: size2,
      children: [
        leftSection && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ...leftSectionProps,
            "data-position": "left",
            ...getStyles("section", {
              className: leftSectionProps?.className,
              style: leftSectionProps?.style
            }),
            children: leftSection
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Box,
          {
            component: "input",
            ...rest,
            ...ariaAttributes,
            ref,
            required,
            mod: { disabled, error: !!error && withErrorStyles },
            variant,
            __size: inputSize,
            ...getStyles("input")
          }
        ),
        _rightSection && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            ...rightSectionProps,
            "data-position": "right",
            ...getStyles("section", {
              className: rightSectionProps?.className,
              style: rightSectionProps?.style
            }),
            children: _rightSection
          }
        )
      ]
    }
  ) });
});
Input.classes = classes$N;
Input.Wrapper = InputWrapper;
Input.Label = InputLabel;
Input.Error = InputError;
Input.Description = InputDescription;
Input.Placeholder = InputPlaceholder;
Input.ClearButton = InputClearButton;
Input.displayName = "@mantine/core/Input";
function useInputProps(component, defaultProps2, _props) {
  const props = useProps(component, defaultProps2, _props);
  const {
    label,
    description,
    error,
    required,
    classNames,
    styles,
    className,
    unstyled,
    __staticSelector,
    __stylesApiProps,
    errorProps,
    labelProps,
    descriptionProps,
    wrapperProps: _wrapperProps,
    id,
    size: size2,
    style,
    inputContainer,
    inputWrapperOrder,
    withAsterisk,
    variant,
    vars,
    mod,
    attributes,
    ...others
  } = props;
  const { styleProps, rest } = extractStyleProps(others);
  const wrapperProps = {
    label,
    description,
    error,
    required,
    classNames,
    className,
    __staticSelector,
    __stylesApiProps: __stylesApiProps || props,
    errorProps,
    labelProps,
    descriptionProps,
    unstyled,
    styles,
    size: size2,
    style,
    inputContainer,
    inputWrapperOrder,
    withAsterisk,
    variant,
    id,
    mod,
    attributes,
    ..._wrapperProps
  };
  return {
    ...rest,
    classNames,
    styles,
    unstyled,
    wrapperProps: { ...wrapperProps, ...styleProps },
    inputProps: {
      required,
      classNames,
      styles,
      unstyled,
      size: size2,
      __staticSelector,
      __stylesApiProps: __stylesApiProps || props,
      error,
      variant,
      id,
      attributes
    }
  };
}
const defaultProps$Z = {
  __staticSelector: "InputBase",
  withAria: true,
  size: "sm"
};
const InputBase = polymorphicFactory((props, ref) => {
  const { inputProps, wrapperProps, ...others } = useInputProps("InputBase", defaultProps$Z, props);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Input.Wrapper, { ...wrapperProps, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { ...inputProps, ...others, ref }) });
});
InputBase.classes = { ...Input.classes, ...Input.Wrapper.classes };
InputBase.displayName = "@mantine/core/InputBase";
const FLEX_STYLE_PROPS_DATA = {
  gap: { type: "spacing", property: "gap" },
  rowGap: { type: "spacing", property: "rowGap" },
  columnGap: { type: "spacing", property: "columnGap" },
  align: { type: "identity", property: "alignItems" },
  justify: { type: "identity", property: "justifyContent" },
  wrap: { type: "identity", property: "flexWrap" },
  direction: { type: "identity", property: "flexDirection" }
};
var classes$M = { "root": "m_8bffd616" };
const Flex = polymorphicFactory((_props, ref) => {
  const props = useProps("Flex", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    gap,
    rowGap,
    columnGap,
    align,
    justify,
    wrap,
    direction,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Flex",
    classes: classes$M,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars
  });
  const theme = useMantineTheme();
  const responsiveClassName = useRandomClassName();
  const parsedStyleProps = parseStyleProps({
    styleProps: { gap, rowGap, columnGap, align, justify, wrap, direction },
    theme,
    data: FLEX_STYLE_PROPS_DATA
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    parsedStyleProps.hasResponsiveStyles && /* @__PURE__ */ jsxRuntimeExports.jsx(
      InlineStyles,
      {
        selector: `.${responsiveClassName}`,
        styles: parsedStyleProps.styles,
        media: parsedStyleProps.media
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Box,
      {
        ref,
        ...getStyles("root", {
          className: responsiveClassName,
          style: filterProps(parsedStyleProps.inlineStyles)
        }),
        ...others
      }
    )
  ] });
});
Flex.classes = classes$M;
Flex.displayName = "@mantine/core/Flex";
function useDelayedHover({ open, close, openDelay, closeDelay }) {
  const openTimeout = reactExports.useRef(-1);
  const closeTimeout = reactExports.useRef(-1);
  const clearTimeouts = () => {
    window.clearTimeout(openTimeout.current);
    window.clearTimeout(closeTimeout.current);
  };
  const openDropdown = () => {
    clearTimeouts();
    if (openDelay === 0 || openDelay === void 0) {
      open();
    } else {
      openTimeout.current = window.setTimeout(open, openDelay);
    }
  };
  const closeDropdown = () => {
    clearTimeouts();
    if (closeDelay === 0 || closeDelay === void 0) {
      close();
    } else {
      closeTimeout.current = window.setTimeout(close, closeDelay);
    }
  };
  reactExports.useEffect(() => clearTimeouts, []);
  return { openDropdown, closeDropdown };
}
function AccordionChevron({ style, size: size2 = 16, ...others }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: { ...style, width: rem(size2), height: rem(size2), display: "block" },
      ...others,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: "M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",
          fill: "currentColor",
          fillRule: "evenodd",
          clipRule: "evenodd"
        }
      )
    }
  );
}
AccordionChevron.displayName = "@mantine/core/AccordionChevron";
var classes$L = { "root": "m_66836ed3", "wrapper": "m_a5d60502", "body": "m_667c2793", "title": "m_6a03f287", "label": "m_698f4f23", "icon": "m_667f2a6a", "message": "m_7fa78076", "closeButton": "m_87f54839" };
const varsResolver$M = createVarsResolver(
  (theme, { radius, color, variant, autoContrast }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      variant: variant || "light",
      autoContrast
    });
    return {
      root: {
        "--alert-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--alert-bg": color || variant ? colors.background : void 0,
        "--alert-color": colors.color,
        "--alert-bd": color || variant ? colors.border : void 0
      }
    };
  }
);
const Alert = factory((_props, ref) => {
  const props = useProps("Alert", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    radius,
    color,
    title,
    children,
    id,
    icon,
    withCloseButton,
    onClose,
    closeButtonLabel,
    variant,
    autoContrast,
    role,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Alert",
    classes: classes$L,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$M
  });
  const rootId = useId(id);
  const titleId = title && `${rootId}-title` || void 0;
  const bodyId = `${rootId}-body`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      id: rootId,
      ...getStyles("root", { variant }),
      variant,
      ref,
      role: role || "alert",
      ...others,
      "aria-describedby": children ? bodyId : void 0,
      "aria-labelledby": title ? titleId : void 0,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ...getStyles("wrapper"), children: [
        icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...getStyles("icon"), children: icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ...getStyles("body"), children: [
          title && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...getStyles("title"), "data-with-close-button": withCloseButton || void 0, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { id: titleId, ...getStyles("label"), children: title }) }),
          children && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: bodyId, ...getStyles("message"), "data-variant": variant, children })
        ] }),
        withCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsx(
          CloseButton,
          {
            ...getStyles("closeButton"),
            onClick: onClose,
            variant: "transparent",
            size: 16,
            iconSize: 16,
            "aria-label": closeButtonLabel,
            unstyled
          }
        )
      ] })
    }
  );
});
Alert.classes = classes$L;
Alert.displayName = "@mantine/core/Alert";
var classes$K = { "root": "m_b6d8b162" };
function getTextTruncate(truncate) {
  if (truncate === "start") {
    return "start";
  }
  if (truncate === "end" || truncate) {
    return "end";
  }
  return void 0;
}
const defaultProps$Y = {
  inherit: false
};
const varsResolver$L = createVarsResolver(
  // Will be removed in 9.0
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  (theme, { variant, lineClamp, gradient, size: size2, color }) => ({
    root: {
      "--text-fz": getFontSize(size2),
      "--text-lh": getLineHeight(size2),
      "--text-gradient": variant === "gradient" ? getGradient(gradient, theme) : void 0,
      "--text-line-clamp": typeof lineClamp === "number" ? lineClamp.toString() : void 0,
      "--text-color": color ? getThemeColor(color, theme) : void 0
    }
  })
);
const Text = polymorphicFactory((_props, ref) => {
  const props = useProps("Text", defaultProps$Y, _props);
  const {
    lineClamp,
    truncate,
    inline: inline2,
    inherit,
    gradient,
    span,
    __staticSelector,
    vars,
    className,
    style,
    classNames,
    styles,
    unstyled,
    variant,
    mod,
    size: size2,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: ["Text", __staticSelector],
    props,
    classes: classes$K,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$L
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ...getStyles("root", { focusable: true }),
      ref,
      component: span ? "span" : "p",
      variant,
      mod: [
        {
          "data-truncate": getTextTruncate(truncate),
          "data-line-clamp": typeof lineClamp === "number",
          "data-inline": inline2,
          "data-inherit": inherit
        },
        mod
      ],
      size: size2,
      ...others
    }
  );
});
Text.classes = classes$K;
Text.displayName = "@mantine/core/Text";
var classes$J = { "root": "m_849cf0da" };
const defaultProps$X = {
  underline: "hover"
};
const Anchor = polymorphicFactory((props, ref) => {
  const { underline, className, unstyled, mod, ...others } = useProps(
    "Anchor",
    defaultProps$X,
    props
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Text,
    {
      component: "a",
      ref,
      className: clsx({ [classes$J.root]: !unstyled }, className),
      ...others,
      mod: [{ underline }, mod],
      __staticSelector: "Anchor",
      unstyled
    }
  );
});
Anchor.classes = classes$J;
Anchor.displayName = "@mantine/core/Anchor";
const [AppShellProvider, useAppShellContext] = createSafeContext(
  "AppShell was not found in tree"
);
var classes$I = { "root": "m_89ab340", "navbar": "m_45252eee", "aside": "m_9cdde9a", "header": "m_3b16f56b", "main": "m_8983817", "footer": "m_3840c879", "section": "m_6dcfc7c7" };
const AppShellAside = factory((_props, ref) => {
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    withBorder,
    zIndex,
    mod,
    ...others
  } = useProps("AppShellAside", null, _props);
  const ctx = useAppShellContext();
  if (ctx.disabled) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      component: "aside",
      ref,
      mod: [{ "with-border": withBorder ?? ctx.withBorder }, mod],
      ...ctx.getStyles("aside", {
        className: clsx({ [ReactRemoveScroll.classNames.zeroRight]: ctx.offsetScrollbars }, className),
        classNames,
        styles,
        style
      }),
      ...others,
      __vars: { "--app-shell-aside-z-index": `calc(${zIndex ?? ctx.zIndex} + 1)` }
    }
  );
});
AppShellAside.classes = classes$I;
AppShellAside.displayName = "@mantine/core/AppShellAside";
const AppShellFooter = factory((_props, ref) => {
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    withBorder,
    zIndex,
    mod,
    ...others
  } = useProps("AppShellFooter", null, _props);
  const ctx = useAppShellContext();
  if (ctx.disabled) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      component: "footer",
      ref,
      mod: [{ "with-border": withBorder ?? ctx.withBorder }, mod],
      ...ctx.getStyles("footer", {
        className: clsx({ [ReactRemoveScroll.classNames.zeroRight]: ctx.offsetScrollbars }, className),
        classNames,
        styles,
        style
      }),
      ...others,
      __vars: { "--app-shell-footer-z-index": (zIndex ?? ctx.zIndex)?.toString() }
    }
  );
});
AppShellFooter.classes = classes$I;
AppShellFooter.displayName = "@mantine/core/AppShellFooter";
const AppShellHeader = factory((_props, ref) => {
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    withBorder,
    zIndex,
    mod,
    ...others
  } = useProps("AppShellHeader", null, _props);
  const ctx = useAppShellContext();
  if (ctx.disabled) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      component: "header",
      ref,
      mod: [{ "with-border": withBorder ?? ctx.withBorder }, mod],
      ...ctx.getStyles("header", {
        className: clsx({ [ReactRemoveScroll.classNames.zeroRight]: ctx.offsetScrollbars }, className),
        classNames,
        styles,
        style
      }),
      ...others,
      __vars: { "--app-shell-header-z-index": (zIndex ?? ctx.zIndex)?.toString() }
    }
  );
});
AppShellHeader.classes = classes$I;
AppShellHeader.displayName = "@mantine/core/AppShellHeader";
const AppShellMain = factory((_props, ref) => {
  const { classNames, className, style, styles, vars, ...others } = useProps(
    "AppShellMain",
    null,
    _props
  );
  const ctx = useAppShellContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      component: "main",
      ref,
      ...ctx.getStyles("main", { className, style, classNames, styles }),
      ...others
    }
  );
});
AppShellMain.classes = classes$I;
AppShellMain.displayName = "@mantine/core/AppShellMain";
function getBaseSize(size2) {
  if (typeof size2 === "object") {
    return size2.base;
  }
  return size2;
}
function isPrimitiveSize(size2) {
  const isBaseSize = typeof size2 === "object" && size2 !== null && typeof size2.base !== "undefined" && Object.keys(size2).length === 1;
  return typeof size2 === "number" || typeof size2 === "string" || isBaseSize;
}
function isResponsiveSize(size2) {
  if (typeof size2 !== "object" || size2 === null) {
    return false;
  }
  if (Object.keys(size2).length === 1 && "base" in size2) {
    return false;
  }
  return true;
}
function assignAsideVariables({
  baseStyles,
  minMediaStyles,
  maxMediaStyles,
  aside,
  theme,
  mode
}) {
  const asideWidth = aside?.width;
  const collapsedAsideTransform = "translateX(var(--app-shell-aside-width))";
  const collapsedAsideTransformRtl = "translateX(calc(var(--app-shell-aside-width) * -1))";
  if (aside?.breakpoint && !aside?.collapsed?.mobile) {
    maxMediaStyles[aside?.breakpoint] = maxMediaStyles[aside?.breakpoint] || {};
    if (mode === "fixed") {
      maxMediaStyles[aside?.breakpoint]["--app-shell-aside-width"] = "100%";
      maxMediaStyles[aside?.breakpoint]["--app-shell-aside-offset"] = "0px";
    } else {
      maxMediaStyles[aside?.breakpoint]["--app-shell-aside-width"] = "0px";
      maxMediaStyles[aside?.breakpoint]["--app-shell-aside-offset"] = "0px";
    }
  }
  if (isPrimitiveSize(asideWidth)) {
    const baseSize = rem(getBaseSize(asideWidth));
    baseStyles["--app-shell-aside-width"] = baseSize;
    baseStyles["--app-shell-aside-offset"] = baseSize;
  }
  if (isResponsiveSize(asideWidth)) {
    if (typeof asideWidth.base !== "undefined") {
      baseStyles["--app-shell-aside-width"] = rem(asideWidth.base);
      baseStyles["--app-shell-aside-offset"] = rem(asideWidth.base);
    }
    keys(asideWidth).forEach((key) => {
      if (key !== "base") {
        minMediaStyles[key] = minMediaStyles[key] || {};
        minMediaStyles[key]["--app-shell-aside-width"] = rem(asideWidth[key]);
        minMediaStyles[key]["--app-shell-aside-offset"] = rem(asideWidth[key]);
      }
    });
  }
  if (aside?.breakpoint && mode === "static") {
    minMediaStyles[aside.breakpoint] = minMediaStyles[aside.breakpoint] || {};
    minMediaStyles[aside.breakpoint]["--app-shell-aside-position"] = "sticky";
    minMediaStyles[aside.breakpoint]["--app-shell-aside-grid-row"] = "2";
    minMediaStyles[aside.breakpoint]["--app-shell-aside-grid-column"] = "3";
    minMediaStyles[aside.breakpoint]["--app-shell-main-column-end"] = "3";
  }
  if (aside?.collapsed?.desktop) {
    const breakpointValue = aside.breakpoint;
    minMediaStyles[breakpointValue] = minMediaStyles[breakpointValue] || {};
    minMediaStyles[breakpointValue]["--app-shell-aside-transform"] = collapsedAsideTransform;
    minMediaStyles[breakpointValue]["--app-shell-aside-transform-rtl"] = collapsedAsideTransformRtl;
    if (mode === "fixed") {
      minMediaStyles[breakpointValue]["--app-shell-aside-offset"] = "0px !important";
    } else {
      minMediaStyles[breakpointValue]["--app-shell-aside-width"] = "0px";
      minMediaStyles[breakpointValue]["--app-shell-aside-display"] = "none";
      minMediaStyles[breakpointValue]["--app-shell-main-column-end"] = "-1";
    }
    minMediaStyles[breakpointValue]["--app-shell-aside-scroll-locked-visibility"] = "hidden";
  }
  if (aside?.collapsed?.mobile) {
    const breakpointValue = getBreakpointValue$1(aside.breakpoint, theme.breakpoints) - 0.1;
    maxMediaStyles[breakpointValue] = maxMediaStyles[breakpointValue] || {};
    if (mode === "fixed") {
      maxMediaStyles[breakpointValue]["--app-shell-aside-width"] = "100%";
      maxMediaStyles[breakpointValue]["--app-shell-aside-offset"] = "0px";
    } else {
      maxMediaStyles[breakpointValue]["--app-shell-aside-width"] = "0px";
    }
    maxMediaStyles[breakpointValue]["--app-shell-aside-transform"] = collapsedAsideTransform;
    maxMediaStyles[breakpointValue]["--app-shell-aside-transform-rtl"] = collapsedAsideTransformRtl;
    maxMediaStyles[breakpointValue]["--app-shell-aside-scroll-locked-visibility"] = "hidden";
  }
}
function assignFooterVariables({
  baseStyles,
  minMediaStyles,
  footer,
  mode
}) {
  const footerHeight = footer?.height;
  const collapsedFooterTransform = "translateY(var(--app-shell-footer-height))";
  const shouldOffset = mode === "static" ? true : footer?.offset ?? true;
  if (mode === "static" && footer) {
    baseStyles["--app-shell-footer-position"] = "sticky";
    baseStyles["--app-shell-footer-grid-column"] = "1 / -1";
    baseStyles["--app-shell-footer-grid-row"] = "3";
  }
  if (isPrimitiveSize(footerHeight)) {
    const baseSize = rem(getBaseSize(footerHeight));
    baseStyles["--app-shell-footer-height"] = baseSize;
    if (shouldOffset) {
      baseStyles["--app-shell-footer-offset"] = baseSize;
    }
  }
  if (isResponsiveSize(footerHeight)) {
    if (typeof footerHeight.base !== "undefined") {
      baseStyles["--app-shell-footer-height"] = rem(footerHeight.base);
      if (shouldOffset) {
        baseStyles["--app-shell-footer-offset"] = rem(footerHeight.base);
      }
    }
    keys(footerHeight).forEach((key) => {
      if (key !== "base") {
        minMediaStyles[key] = minMediaStyles[key] || {};
        minMediaStyles[key]["--app-shell-footer-height"] = rem(footerHeight[key]);
        if (shouldOffset) {
          minMediaStyles[key]["--app-shell-footer-offset"] = rem(footerHeight[key]);
        }
      }
    });
  }
  if (footer?.collapsed) {
    baseStyles["--app-shell-footer-transform"] = collapsedFooterTransform;
    if (mode === "fixed") {
      baseStyles["--app-shell-footer-offset"] = "0px !important";
    }
  }
}
function assignHeaderVariables({
  baseStyles,
  minMediaStyles,
  header,
  mode
}) {
  const headerHeight = header?.height;
  const collapsedHeaderTransform = "translateY(calc(var(--app-shell-header-height) * -1))";
  const shouldOffset = mode === "static" ? true : header?.offset ?? true;
  if (mode === "static" && header) {
    baseStyles["--app-shell-header-position"] = "sticky";
    baseStyles["--app-shell-header-grid-column"] = "1 / -1";
    baseStyles["--app-shell-header-grid-row"] = "1";
  }
  if (isPrimitiveSize(headerHeight)) {
    const baseSize = rem(getBaseSize(headerHeight));
    baseStyles["--app-shell-header-height"] = baseSize;
    if (shouldOffset) {
      baseStyles["--app-shell-header-offset"] = baseSize;
    }
  }
  if (isResponsiveSize(headerHeight)) {
    if (typeof headerHeight.base !== "undefined") {
      baseStyles["--app-shell-header-height"] = rem(headerHeight.base);
      if (shouldOffset) {
        baseStyles["--app-shell-header-offset"] = rem(headerHeight.base);
      }
    }
    keys(headerHeight).forEach((key) => {
      if (key !== "base") {
        minMediaStyles[key] = minMediaStyles[key] || {};
        minMediaStyles[key]["--app-shell-header-height"] = rem(headerHeight[key]);
        if (shouldOffset) {
          minMediaStyles[key]["--app-shell-header-offset"] = rem(headerHeight[key]);
        }
      }
    });
  }
  if (header?.collapsed) {
    baseStyles["--app-shell-header-transform"] = collapsedHeaderTransform;
    if (mode === "fixed") {
      baseStyles["--app-shell-header-offset"] = "0px !important";
    }
  }
}
function assignNavbarVariables({
  baseStyles,
  minMediaStyles,
  maxMediaStyles,
  navbar,
  theme,
  mode
}) {
  const navbarWidth = navbar?.width;
  const collapsedNavbarTransform = "translateX(calc(var(--app-shell-navbar-width) * -1))";
  const collapsedNavbarTransformRtl = "translateX(var(--app-shell-navbar-width))";
  if (navbar?.breakpoint && !navbar?.collapsed?.mobile) {
    maxMediaStyles[navbar?.breakpoint] = maxMediaStyles[navbar?.breakpoint] || {};
    maxMediaStyles[navbar?.breakpoint]["--app-shell-navbar-offset"] = "0px";
    maxMediaStyles[navbar?.breakpoint]["--app-shell-navbar-width"] = "100%";
    if (mode === "static") {
      maxMediaStyles[navbar?.breakpoint]["--app-shell-navbar-grid-width"] = "0px";
    }
  }
  if (isPrimitiveSize(navbarWidth)) {
    const baseSize = rem(getBaseSize(navbarWidth));
    baseStyles["--app-shell-navbar-width"] = baseSize;
    baseStyles["--app-shell-navbar-offset"] = baseSize;
    if (mode === "static") {
      baseStyles["--app-shell-navbar-grid-width"] = baseSize;
    }
  }
  if (isResponsiveSize(navbarWidth)) {
    if (typeof navbarWidth.base !== "undefined") {
      baseStyles["--app-shell-navbar-width"] = rem(navbarWidth.base);
      baseStyles["--app-shell-navbar-offset"] = rem(navbarWidth.base);
      if (mode === "static") {
        baseStyles["--app-shell-navbar-grid-width"] = rem(navbarWidth.base);
      }
    }
    keys(navbarWidth).forEach((key) => {
      if (key !== "base") {
        minMediaStyles[key] = minMediaStyles[key] || {};
        minMediaStyles[key]["--app-shell-navbar-width"] = rem(navbarWidth[key]);
        minMediaStyles[key]["--app-shell-navbar-offset"] = rem(navbarWidth[key]);
        if (mode === "static") {
          minMediaStyles[key]["--app-shell-navbar-grid-width"] = rem(navbarWidth[key]);
        }
      }
    });
  }
  if (navbar?.breakpoint && mode === "static") {
    minMediaStyles[navbar.breakpoint] = minMediaStyles[navbar.breakpoint] || {};
    minMediaStyles[navbar.breakpoint]["--app-shell-navbar-position"] = "sticky";
    minMediaStyles[navbar.breakpoint]["--app-shell-navbar-grid-row"] = "2";
    minMediaStyles[navbar.breakpoint]["--app-shell-navbar-grid-column"] = "1";
    minMediaStyles[navbar.breakpoint]["--app-shell-main-column-start"] = "2";
  }
  if (navbar?.collapsed?.desktop) {
    const breakpointValue = navbar.breakpoint;
    minMediaStyles[breakpointValue] = minMediaStyles[breakpointValue] || {};
    minMediaStyles[breakpointValue]["--app-shell-navbar-transform"] = collapsedNavbarTransform;
    minMediaStyles[breakpointValue]["--app-shell-navbar-transform-rtl"] = collapsedNavbarTransformRtl;
    if (mode === "fixed") {
      minMediaStyles[breakpointValue]["--app-shell-navbar-offset"] = "0px !important";
    } else {
      minMediaStyles[breakpointValue]["--app-shell-navbar-width"] = "0px";
      minMediaStyles[breakpointValue]["--app-shell-navbar-display"] = "none";
      minMediaStyles[breakpointValue]["--app-shell-main-column-start"] = "1";
    }
  }
  if (navbar?.collapsed?.mobile) {
    const breakpointValue = getBreakpointValue$1(navbar.breakpoint, theme.breakpoints) - 0.1;
    maxMediaStyles[breakpointValue] = maxMediaStyles[breakpointValue] || {};
    maxMediaStyles[breakpointValue]["--app-shell-navbar-width"] = "100%";
    maxMediaStyles[breakpointValue]["--app-shell-navbar-offset"] = "0px";
    if (mode === "static") {
      maxMediaStyles[breakpointValue]["--app-shell-navbar-grid-width"] = "0px";
    }
    maxMediaStyles[breakpointValue]["--app-shell-navbar-transform"] = collapsedNavbarTransform;
    maxMediaStyles[breakpointValue]["--app-shell-navbar-transform-rtl"] = collapsedNavbarTransformRtl;
  }
}
function getPaddingValue(padding) {
  return Number(padding) === 0 ? "0px" : getSpacing(padding);
}
function assignPaddingVariables({
  padding,
  baseStyles,
  minMediaStyles
}) {
  if (isPrimitiveSize(padding)) {
    baseStyles["--app-shell-padding"] = getPaddingValue(getBaseSize(padding));
  }
  if (isResponsiveSize(padding)) {
    if (padding.base) {
      baseStyles["--app-shell-padding"] = getPaddingValue(padding.base);
    }
    keys(padding).forEach((key) => {
      if (key !== "base") {
        minMediaStyles[key] = minMediaStyles[key] || {};
        minMediaStyles[key]["--app-shell-padding"] = getPaddingValue(padding[key]);
      }
    });
  }
}
function getVariables({
  navbar,
  header,
  footer,
  aside,
  padding,
  theme,
  mode
}) {
  const minMediaStyles = {};
  const maxMediaStyles = {};
  const baseStyles = {};
  if (mode === "static") {
    baseStyles["--app-shell-main-grid-column"] = "1 / -1";
    baseStyles["--app-shell-main-grid-row"] = "2";
  }
  assignNavbarVariables({
    baseStyles,
    minMediaStyles,
    maxMediaStyles,
    navbar,
    theme,
    mode
  });
  assignAsideVariables({
    baseStyles,
    minMediaStyles,
    maxMediaStyles,
    aside,
    theme,
    mode
  });
  assignHeaderVariables({ baseStyles, minMediaStyles, header, mode });
  assignFooterVariables({ baseStyles, minMediaStyles, footer, mode });
  assignPaddingVariables({ baseStyles, minMediaStyles, padding });
  const minMedia = getSortedBreakpoints(keys(minMediaStyles), theme.breakpoints).map(
    (breakpoint) => ({
      query: `(min-width: ${em(breakpoint.px)})`,
      styles: minMediaStyles[breakpoint.value]
    })
  );
  const maxMedia = getSortedBreakpoints(keys(maxMediaStyles), theme.breakpoints).map(
    (breakpoint) => ({
      query: `(max-width: ${em(breakpoint.px)})`,
      styles: maxMediaStyles[breakpoint.value]
    })
  );
  const media = [...minMedia, ...maxMedia];
  return { baseStyles, media };
}
function AppShellMediaStyles({
  navbar,
  header,
  aside,
  footer,
  padding,
  mode,
  selector
}) {
  const theme = useMantineTheme();
  const ctx = useMantineContext();
  const { media, baseStyles } = getVariables({
    navbar,
    header,
    footer,
    aside,
    padding,
    theme,
    mode
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    InlineStyles,
    {
      media,
      styles: baseStyles,
      selector: selector || ctx.cssVariablesSelector
    }
  );
}
const AppShellNavbar = factory((_props, ref) => {
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    withBorder,
    zIndex,
    mod,
    ...others
  } = useProps("AppShellNavbar", null, _props);
  const ctx = useAppShellContext();
  if (ctx.disabled) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      component: "nav",
      ref,
      mod: [{ "with-border": withBorder ?? ctx.withBorder }, mod],
      ...ctx.getStyles("navbar", { className, classNames, styles, style }),
      ...others,
      __vars: { "--app-shell-navbar-z-index": `calc(${zIndex ?? ctx.zIndex} + 1)` }
    }
  );
});
AppShellNavbar.classes = classes$I;
AppShellNavbar.displayName = "@mantine/core/AppShellNavbar";
const AppShellSection = polymorphicFactory((_props, ref) => {
  const { classNames, className, style, styles, vars, grow, mod, ...others } = useProps(
    "AppShellSection",
    null,
    _props
  );
  const ctx = useAppShellContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ref,
      mod: [{ grow }, mod],
      ...ctx.getStyles("section", { className, style, classNames, styles }),
      ...others
    }
  );
});
AppShellSection.classes = classes$I;
AppShellSection.displayName = "@mantine/core/AppShellSection";
function useResizing({ transitionDuration, disabled }) {
  const [resizing, setResizing] = reactExports.useState(true);
  const resizingTimeout = reactExports.useRef(-1);
  const disabledTimeout = reactExports.useRef(-1);
  useWindowEvent("resize", () => {
    setResizing(true);
    clearTimeout(resizingTimeout.current);
    resizingTimeout.current = window.setTimeout(
      () => reactExports.startTransition(() => {
        setResizing(false);
      }),
      200
    );
  });
  useIsomorphicEffect(() => {
    setResizing(true);
    clearTimeout(disabledTimeout.current);
    disabledTimeout.current = window.setTimeout(
      () => reactExports.startTransition(() => {
        setResizing(false);
      }),
      transitionDuration || 0
    );
  }, [disabled, transitionDuration]);
  return resizing;
}
const defaultProps$W = {
  withBorder: true,
  padding: 0,
  transitionDuration: 200,
  transitionTimingFunction: "ease",
  zIndex: getDefaultZIndex("app"),
  mode: "fixed"
};
const varsResolver$K = createVarsResolver(
  (_, { transitionDuration, transitionTimingFunction }) => ({
    root: {
      "--app-shell-transition-duration": `${transitionDuration}ms`,
      "--app-shell-transition-timing-function": transitionTimingFunction
    }
  })
);
const AppShell = factory((_props, ref) => {
  const props = useProps("AppShell", defaultProps$W, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    navbar,
    withBorder,
    padding,
    transitionDuration,
    transitionTimingFunction,
    header,
    zIndex,
    layout,
    disabled,
    aside,
    footer,
    offsetScrollbars = true,
    mode,
    mod,
    attributes,
    id,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "AppShell",
    classes: classes$I,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$K
  });
  const resizing = useResizing({ disabled, transitionDuration });
  const _id = useId(id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(AppShellProvider, { value: { getStyles, withBorder, zIndex, disabled, offsetScrollbars, mode }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      AppShellMediaStyles,
      {
        navbar,
        header,
        aside,
        footer,
        padding,
        mode,
        selector: mode === "static" ? `#${_id}` : void 0
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Box,
      {
        ref,
        ...getStyles("root"),
        mod: [{ resizing, layout, disabled, mode }, mod],
        id: _id,
        ...others
      }
    )
  ] });
});
AppShell.classes = classes$I;
AppShell.displayName = "@mantine/core/AppShell";
AppShell.Navbar = AppShellNavbar;
AppShell.Header = AppShellHeader;
AppShell.Main = AppShellMain;
AppShell.Aside = AppShellAside;
AppShell.Footer = AppShellFooter;
AppShell.Section = AppShellSection;
function parseItem(item) {
  if (typeof item === "string") {
    return { value: item, label: item };
  }
  if ("value" in item && !("label" in item)) {
    return { value: item.value, label: item.value, disabled: item.disabled };
  }
  if (typeof item === "number") {
    return { value: item.toString(), label: item.toString() };
  }
  if ("group" in item) {
    return {
      group: item.group,
      items: item.items.map((i) => parseItem(i))
    };
  }
  return item;
}
function getParsedComboboxData(data) {
  if (!data) {
    return [];
  }
  return data.map((item) => parseItem(item));
}
function getOptionsLockup(options) {
  return options.reduce((acc, item) => {
    if ("group" in item) {
      return { ...acc, ...getOptionsLockup(item.items) };
    }
    acc[item.value] = item;
    return acc;
  }, {});
}
var classes$H = { "dropdown": "m_88b62a41", "search": "m_985517d8", "options": "m_b2821a6e", "option": "m_92253aa5", "empty": "m_2530cd1d", "header": "m_858f94bd", "footer": "m_82b967cb", "group": "m_254f3e4f", "groupLabel": "m_2bb2e9e5", "chevron": "m_2943220b", "optionsDropdownOption": "m_390b5f4", "optionsDropdownCheckIcon": "m_8ee53fc2", "optionsDropdownCheckPlaceholder": "m_a530ee0a" };
const defaultProps$V = {
  error: null
};
const varsResolver$J = createVarsResolver((theme, { size: size2, color }) => ({
  chevron: {
    "--combobox-chevron-size": getSize(size2, "combobox-chevron-size"),
    "--combobox-chevron-color": color ? getThemeColor(color, theme) : void 0
  }
}));
const ComboboxChevron = factory((_props, ref) => {
  const props = useProps("ComboboxChevron", defaultProps$V, _props);
  const { size: size2, error, style, className, classNames, styles, unstyled, vars, mod, ...others } = props;
  const getStyles = useStyles({
    name: "ComboboxChevron",
    classes: classes$H,
    props,
    style,
    className,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver: varsResolver$J,
    rootSelector: "chevron"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      component: "svg",
      ...others,
      ...getStyles("chevron"),
      size: size2,
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      mod: ["combobox-chevron", { error }, mod],
      ref,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: "M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z",
          fill: "currentColor",
          fillRule: "evenodd",
          clipRule: "evenodd"
        }
      )
    }
  );
});
ComboboxChevron.classes = classes$H;
ComboboxChevron.displayName = "@mantine/core/ComboboxChevron";
const [ComboboxProvider, useComboboxContext] = createSafeContext(
  "Combobox component was not found in tree"
);
const ComboboxClearButton = reactExports.forwardRef(
  ({ size: size2, onMouseDown, onClick, onClear, ...others }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Input.ClearButton,
    {
      ref,
      tabIndex: -1,
      "aria-hidden": true,
      ...others,
      onMouseDown: (event) => {
        event.preventDefault();
        onMouseDown?.(event);
      },
      onClick: (event) => {
        onClear();
        onClick?.(event);
      }
    }
  )
);
ComboboxClearButton.displayName = "@mantine/core/ComboboxClearButton";
const ComboboxDropdown = factory((props, ref) => {
  const { classNames, styles, className, style, hidden, ...others } = useProps(
    "ComboboxDropdown",
    null,
    props
  );
  const ctx = useComboboxContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Popover.Dropdown,
    {
      ...others,
      ref,
      role: "presentation",
      "data-hidden": hidden || void 0,
      ...ctx.getStyles("dropdown", { className, style, classNames, styles })
    }
  );
});
ComboboxDropdown.classes = classes$H;
ComboboxDropdown.displayName = "@mantine/core/ComboboxDropdown";
const defaultProps$U = {
  refProp: "ref"
};
const ComboboxDropdownTarget = factory((props, ref) => {
  const { children, refProp } = useProps("ComboboxDropdownTarget", defaultProps$U, props);
  useComboboxContext();
  if (!isElement(children)) {
    throw new Error(
      "Combobox.DropdownTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Popover.Target, { ref, refProp, children });
});
ComboboxDropdownTarget.displayName = "@mantine/core/ComboboxDropdownTarget";
const ComboboxEmpty = factory((props, ref) => {
  const { classNames, className, style, styles, vars, ...others } = useProps(
    "ComboboxEmpty",
    null,
    props
  );
  const ctx = useComboboxContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ref,
      ...ctx.getStyles("empty", { className, classNames, styles, style }),
      ...others
    }
  );
});
ComboboxEmpty.classes = classes$H;
ComboboxEmpty.displayName = "@mantine/core/ComboboxEmpty";
function useComboboxTargetProps({
  onKeyDown,
  withKeyboardNavigation,
  withAriaAttributes,
  withExpandedAttribute,
  targetType,
  autoComplete
}) {
  const ctx = useComboboxContext();
  const [selectedOptionId, setSelectedOptionId] = reactExports.useState(null);
  const handleKeyDown = (event) => {
    onKeyDown?.(event);
    if (ctx.readOnly) {
      return;
    }
    if (withKeyboardNavigation) {
      if (event.nativeEvent.isComposing) {
        return;
      }
      if (event.nativeEvent.code === "ArrowDown") {
        event.preventDefault();
        if (!ctx.store.dropdownOpened) {
          ctx.store.openDropdown("keyboard");
          setSelectedOptionId(ctx.store.selectActiveOption());
          ctx.store.updateSelectedOptionIndex("selected", { scrollIntoView: true });
        } else {
          setSelectedOptionId(ctx.store.selectNextOption());
        }
      }
      if (event.nativeEvent.code === "ArrowUp") {
        event.preventDefault();
        if (!ctx.store.dropdownOpened) {
          ctx.store.openDropdown("keyboard");
          setSelectedOptionId(ctx.store.selectActiveOption());
          ctx.store.updateSelectedOptionIndex("selected", { scrollIntoView: true });
        } else {
          setSelectedOptionId(ctx.store.selectPreviousOption());
        }
      }
      if (event.nativeEvent.code === "Enter" || event.nativeEvent.code === "NumpadEnter") {
        if (event.nativeEvent.keyCode === 229) {
          return;
        }
        const selectedOptionIndex = ctx.store.getSelectedOptionIndex();
        if (ctx.store.dropdownOpened && selectedOptionIndex !== -1) {
          event.preventDefault();
          ctx.store.clickSelectedOption();
        } else if (targetType === "button") {
          event.preventDefault();
          ctx.store.openDropdown("keyboard");
        }
      }
      if (event.key === "Escape") {
        ctx.store.closeDropdown("keyboard");
      }
      if (event.nativeEvent.code === "Space") {
        if (targetType === "button") {
          event.preventDefault();
          ctx.store.toggleDropdown("keyboard");
        }
      }
    }
  };
  const ariaAttributes = withAriaAttributes ? {
    "aria-haspopup": "listbox",
    "aria-expanded": withExpandedAttribute ? !!(ctx.store.listId && ctx.store.dropdownOpened) : void 0,
    "aria-controls": ctx.store.dropdownOpened && ctx.store.listId ? ctx.store.listId : void 0,
    "aria-activedescendant": ctx.store.dropdownOpened ? selectedOptionId || void 0 : void 0,
    autoComplete,
    "data-expanded": ctx.store.dropdownOpened || void 0,
    "data-mantine-stop-propagation": ctx.store.dropdownOpened || void 0
  } : {};
  return {
    ...ariaAttributes,
    onKeyDown: handleKeyDown
  };
}
const defaultProps$T = {
  refProp: "ref",
  targetType: "input",
  withKeyboardNavigation: true,
  withAriaAttributes: true,
  withExpandedAttribute: false,
  autoComplete: "off"
};
const ComboboxEventsTarget = factory((props, ref) => {
  const {
    children,
    refProp,
    withKeyboardNavigation,
    withAriaAttributes,
    withExpandedAttribute,
    targetType,
    autoComplete,
    ...others
  } = useProps("ComboboxEventsTarget", defaultProps$T, props);
  const child = getSingleElementChild(children);
  if (!child) {
    throw new Error(
      "Combobox.EventsTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  }
  const ctx = useComboboxContext();
  const targetProps = useComboboxTargetProps({
    targetType,
    withAriaAttributes,
    withKeyboardNavigation,
    withExpandedAttribute,
    onKeyDown: child.props.onKeyDown,
    autoComplete
  });
  return reactExports.cloneElement(child, {
    ...targetProps,
    ...others,
    [refProp]: useMergedRef(ref, ctx.store.targetRef, getRefProp(child))
  });
});
ComboboxEventsTarget.displayName = "@mantine/core/ComboboxEventsTarget";
const ComboboxFooter = factory((props, ref) => {
  const { classNames, className, style, styles, vars, ...others } = useProps(
    "ComboboxFooter",
    null,
    props
  );
  const ctx = useComboboxContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ref,
      ...ctx.getStyles("footer", { className, classNames, style, styles }),
      ...others,
      onMouseDown: (event) => {
        event.preventDefault();
      }
    }
  );
});
ComboboxFooter.classes = classes$H;
ComboboxFooter.displayName = "@mantine/core/ComboboxFooter";
const ComboboxGroup = factory((props, ref) => {
  const { classNames, className, style, styles, vars, children, label, id, ...others } = useProps(
    "ComboboxGroup",
    null,
    props
  );
  const ctx = useComboboxContext();
  const _id = useId(id);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Box,
    {
      ref,
      role: "group",
      "aria-labelledby": label ? _id : void 0,
      ...ctx.getStyles("group", { className, classNames, style, styles }),
      ...others,
      children: [
        label && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { id: _id, ...ctx.getStyles("groupLabel", { classNames, styles }), children: label }),
        children
      ]
    }
  );
});
ComboboxGroup.classes = classes$H;
ComboboxGroup.displayName = "@mantine/core/ComboboxGroup";
const ComboboxHeader = factory((props, ref) => {
  const { classNames, className, style, styles, vars, ...others } = useProps(
    "ComboboxHeader",
    null,
    props
  );
  const ctx = useComboboxContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ref,
      ...ctx.getStyles("header", { className, classNames, style, styles }),
      ...others,
      onMouseDown: (event) => {
        event.preventDefault();
      }
    }
  );
});
ComboboxHeader.classes = classes$H;
ComboboxHeader.displayName = "@mantine/core/ComboboxHeader";
function ComboboxHiddenInput({
  value,
  valuesDivider = ",",
  ...others
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type: "hidden",
      value: Array.isArray(value) ? value.join(valuesDivider) : value || "",
      ...others
    }
  );
}
ComboboxHiddenInput.displayName = "@mantine/core/ComboboxHiddenInput";
const ComboboxOption = factory((_props, ref) => {
  const props = useProps("ComboboxOption", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    vars,
    onClick,
    id,
    active,
    onMouseDown,
    onMouseOver,
    disabled,
    selected,
    mod,
    ...others
  } = props;
  const ctx = useComboboxContext();
  const uuid = reactExports.useId();
  const _id = id || uuid;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ...ctx.getStyles("option", { className, classNames, styles, style }),
      ...others,
      ref,
      id: _id,
      mod: [
        "combobox-option",
        { "combobox-active": active, "combobox-disabled": disabled, "combobox-selected": selected },
        mod
      ],
      role: "option",
      onClick: (event) => {
        if (!disabled) {
          ctx.onOptionSubmit?.(props.value, props);
          onClick?.(event);
        } else {
          event.preventDefault();
        }
      },
      onMouseDown: (event) => {
        event.preventDefault();
        onMouseDown?.(event);
      },
      onMouseOver: (event) => {
        if (ctx.resetSelectionOnOptionHover) {
          ctx.store.resetSelectedOption();
        }
        onMouseOver?.(event);
      }
    }
  );
});
ComboboxOption.classes = classes$H;
ComboboxOption.displayName = "@mantine/core/ComboboxOption";
const ComboboxOptions = factory((_props, ref) => {
  const props = useProps("ComboboxOptions", null, _props);
  const { classNames, className, style, styles, id, onMouseDown, labelledBy, ...others } = props;
  const ctx = useComboboxContext();
  const _id = useId(id);
  reactExports.useEffect(() => {
    ctx.store.setListId(_id);
  }, [_id]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ref,
      ...ctx.getStyles("options", { className, style, classNames, styles }),
      ...others,
      id: _id,
      role: "listbox",
      "aria-labelledby": labelledBy,
      onMouseDown: (event) => {
        event.preventDefault();
        onMouseDown?.(event);
      }
    }
  );
});
ComboboxOptions.classes = classes$H;
ComboboxOptions.displayName = "@mantine/core/ComboboxOptions";
const defaultProps$S = {
  withAriaAttributes: true,
  withKeyboardNavigation: true
};
const ComboboxSearch = factory((_props, ref) => {
  const props = useProps("ComboboxSearch", defaultProps$S, _props);
  const {
    classNames,
    styles,
    unstyled,
    vars,
    withAriaAttributes,
    onKeyDown,
    withKeyboardNavigation,
    size: size2,
    ...others
  } = props;
  const ctx = useComboboxContext();
  const _styles = ctx.getStyles("search");
  const targetProps = useComboboxTargetProps({
    targetType: "input",
    withAriaAttributes,
    withKeyboardNavigation,
    withExpandedAttribute: false,
    onKeyDown,
    autoComplete: "off"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Input,
    {
      ref: useMergedRef(ref, ctx.store.searchRef),
      classNames: [{ input: _styles.className }, classNames],
      styles: [{ input: _styles.style }, styles],
      size: size2 || ctx.size,
      ...targetProps,
      ...others,
      __staticSelector: "Combobox"
    }
  );
});
ComboboxSearch.classes = classes$H;
ComboboxSearch.displayName = "@mantine/core/ComboboxSearch";
const defaultProps$R = {
  refProp: "ref",
  targetType: "input",
  withKeyboardNavigation: true,
  withAriaAttributes: true,
  withExpandedAttribute: false,
  autoComplete: "off"
};
const ComboboxTarget = factory((props, ref) => {
  const {
    children,
    refProp,
    withKeyboardNavigation,
    withAriaAttributes,
    withExpandedAttribute,
    targetType,
    autoComplete,
    ...others
  } = useProps("ComboboxTarget", defaultProps$R, props);
  const child = getSingleElementChild(children);
  if (!child) {
    throw new Error(
      "Combobox.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  }
  const ctx = useComboboxContext();
  const targetProps = useComboboxTargetProps({
    targetType,
    withAriaAttributes,
    withKeyboardNavigation,
    withExpandedAttribute,
    onKeyDown: child.props.onKeyDown,
    autoComplete
  });
  const clonedElement = reactExports.cloneElement(child, {
    ...targetProps,
    ...others
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Popover.Target, { ref: useMergedRef(ref, ctx.store.targetRef), children: clonedElement });
});
ComboboxTarget.displayName = "@mantine/core/ComboboxTarget";
function getPreviousIndex(currentIndex, elements, loop) {
  for (let i = currentIndex - 1; i >= 0; i -= 1) {
    if (!elements[i].hasAttribute("data-combobox-disabled")) {
      return i;
    }
  }
  if (loop) {
    for (let i = elements.length - 1; i > -1; i -= 1) {
      if (!elements[i].hasAttribute("data-combobox-disabled")) {
        return i;
      }
    }
  }
  return currentIndex;
}
function getNextIndex(currentIndex, elements, loop) {
  for (let i = currentIndex + 1; i < elements.length; i += 1) {
    if (!elements[i].hasAttribute("data-combobox-disabled")) {
      return i;
    }
  }
  if (loop) {
    for (let i = 0; i < elements.length; i += 1) {
      if (!elements[i].hasAttribute("data-combobox-disabled")) {
        return i;
      }
    }
  }
  return currentIndex;
}
function getFirstIndex(elements) {
  for (let i = 0; i < elements.length; i += 1) {
    if (!elements[i].hasAttribute("data-combobox-disabled")) {
      return i;
    }
  }
  return -1;
}
function useCombobox({
  defaultOpened,
  opened,
  onOpenedChange,
  onDropdownClose,
  onDropdownOpen,
  loop = true,
  scrollBehavior = "instant"
} = {}) {
  const [dropdownOpened, setDropdownOpened] = useUncontrolled({
    value: opened,
    defaultValue: defaultOpened,
    finalValue: false,
    onChange: onOpenedChange
  });
  const listId = reactExports.useRef(null);
  const selectedOptionIndex = reactExports.useRef(-1);
  const searchRef = reactExports.useRef(null);
  const targetRef = reactExports.useRef(null);
  const focusSearchTimeout = reactExports.useRef(-1);
  const focusTargetTimeout = reactExports.useRef(-1);
  const selectedIndexUpdateTimeout = reactExports.useRef(-1);
  const openDropdown = reactExports.useCallback(
    (eventSource = "unknown") => {
      if (!dropdownOpened) {
        setDropdownOpened(true);
        onDropdownOpen?.(eventSource);
      }
    },
    [setDropdownOpened, onDropdownOpen, dropdownOpened]
  );
  const closeDropdown = reactExports.useCallback(
    (eventSource = "unknown") => {
      if (dropdownOpened) {
        setDropdownOpened(false);
        onDropdownClose?.(eventSource);
      }
    },
    [setDropdownOpened, onDropdownClose, dropdownOpened]
  );
  const toggleDropdown = reactExports.useCallback(
    (eventSource = "unknown") => {
      if (dropdownOpened) {
        closeDropdown(eventSource);
      } else {
        openDropdown(eventSource);
      }
    },
    [closeDropdown, openDropdown, dropdownOpened]
  );
  const clearSelectedItem = reactExports.useCallback(() => {
    const root = getRootElement(targetRef.current);
    const selected = findElementBySelector(`#${listId.current} [data-combobox-selected]`, root);
    selected?.removeAttribute("data-combobox-selected");
    selected?.removeAttribute("aria-selected");
  }, []);
  const selectOption = reactExports.useCallback(
    (index) => {
      const root = getRootElement(targetRef.current);
      const list = findElementBySelector(`#${listId.current}`, root);
      const items = list ? findElementsBySelector("[data-combobox-option]", list) : null;
      if (!items) {
        return null;
      }
      const nextIndex = index >= items.length ? 0 : index < 0 ? items.length - 1 : index;
      selectedOptionIndex.current = nextIndex;
      if (items?.[nextIndex] && !items[nextIndex].hasAttribute("data-combobox-disabled")) {
        clearSelectedItem();
        items[nextIndex].setAttribute("data-combobox-selected", "true");
        items[nextIndex].setAttribute("aria-selected", "true");
        items[nextIndex].scrollIntoView({ block: "nearest", behavior: scrollBehavior });
        return items[nextIndex].id;
      }
      return null;
    },
    [scrollBehavior, clearSelectedItem]
  );
  const selectActiveOption = reactExports.useCallback(() => {
    const root = getRootElement(targetRef.current);
    const activeOption = findElementBySelector(
      `#${listId.current} [data-combobox-active]`,
      root
    );
    if (activeOption) {
      const items = findElementsBySelector(
        `#${listId.current} [data-combobox-option]`,
        root
      );
      const index = items.findIndex((option) => option === activeOption);
      return selectOption(index);
    }
    return selectOption(0);
  }, [selectOption]);
  const selectNextOption = reactExports.useCallback(() => {
    const root = getRootElement(targetRef.current);
    const items = findElementsBySelector(
      `#${listId.current} [data-combobox-option]`,
      root
    );
    return selectOption(getNextIndex(selectedOptionIndex.current, items, loop));
  }, [selectOption, loop]);
  const selectPreviousOption = reactExports.useCallback(() => {
    const root = getRootElement(targetRef.current);
    const items = findElementsBySelector(
      `#${listId.current} [data-combobox-option]`,
      root
    );
    return selectOption(getPreviousIndex(selectedOptionIndex.current, items, loop));
  }, [selectOption, loop]);
  const selectFirstOption = reactExports.useCallback(() => {
    const root = getRootElement(targetRef.current);
    const items = findElementsBySelector(
      `#${listId.current} [data-combobox-option]`,
      root
    );
    return selectOption(getFirstIndex(items));
  }, [selectOption]);
  const updateSelectedOptionIndex = reactExports.useCallback(
    (target = "selected", options) => {
      selectedIndexUpdateTimeout.current = window.setTimeout(() => {
        const root = getRootElement(targetRef.current);
        const items = findElementsBySelector(
          `#${listId.current} [data-combobox-option]`,
          root
        );
        const index = items.findIndex((option) => option.hasAttribute(`data-combobox-${target}`));
        selectedOptionIndex.current = index;
        if (options?.scrollIntoView) {
          items[index]?.scrollIntoView({ block: "nearest", behavior: scrollBehavior });
        }
      }, 0);
    },
    []
  );
  const resetSelectedOption = reactExports.useCallback(() => {
    selectedOptionIndex.current = -1;
    clearSelectedItem();
  }, [clearSelectedItem]);
  const clickSelectedOption = reactExports.useCallback(() => {
    const root = getRootElement(targetRef.current);
    const items = findElementsBySelector(
      `#${listId.current} [data-combobox-option]`,
      root
    );
    const item = items?.[selectedOptionIndex.current];
    item?.click();
  }, []);
  const setListId = reactExports.useCallback((id) => {
    listId.current = id;
  }, []);
  const focusSearchInput = reactExports.useCallback(() => {
    focusSearchTimeout.current = window.setTimeout(() => searchRef.current?.focus(), 0);
  }, []);
  const focusTarget = reactExports.useCallback(() => {
    focusTargetTimeout.current = window.setTimeout(() => targetRef.current?.focus(), 0);
  }, []);
  const getSelectedOptionIndex = reactExports.useCallback(() => selectedOptionIndex.current, []);
  reactExports.useEffect(
    () => () => {
      window.clearTimeout(focusSearchTimeout.current);
      window.clearTimeout(focusTargetTimeout.current);
      window.clearTimeout(selectedIndexUpdateTimeout.current);
    },
    []
  );
  return {
    dropdownOpened,
    openDropdown,
    closeDropdown,
    toggleDropdown,
    selectedOptionIndex: selectedOptionIndex.current,
    getSelectedOptionIndex,
    selectOption,
    selectFirstOption,
    selectActiveOption,
    selectNextOption,
    selectPreviousOption,
    resetSelectedOption,
    updateSelectedOptionIndex,
    listId: listId.current,
    setListId,
    clickSelectedOption,
    searchRef,
    focusSearchInput,
    targetRef,
    focusTarget
  };
}
const defaultProps$Q = {
  keepMounted: true,
  withinPortal: true,
  resetSelectionOnOptionHover: false,
  width: "target",
  transitionProps: { transition: "fade", duration: 0 },
  size: "sm"
};
const varsResolver$I = createVarsResolver((_, { size: size2, dropdownPadding }) => ({
  options: {
    "--combobox-option-fz": getFontSize(size2),
    "--combobox-option-padding": getSize(size2, "combobox-option-padding")
  },
  dropdown: {
    "--combobox-padding": dropdownPadding === void 0 ? void 0 : rem(dropdownPadding),
    "--combobox-option-fz": getFontSize(size2),
    "--combobox-option-padding": getSize(size2, "combobox-option-padding")
  }
}));
function Combobox(_props) {
  const props = useProps("Combobox", defaultProps$Q, _props);
  const {
    classNames,
    styles,
    unstyled,
    children,
    store: controlledStore,
    vars,
    onOptionSubmit,
    onClose,
    size: size2,
    dropdownPadding,
    resetSelectionOnOptionHover,
    __staticSelector,
    readOnly,
    attributes,
    ...others
  } = props;
  const uncontrolledStore = useCombobox();
  const store = controlledStore || uncontrolledStore;
  const getStyles = useStyles({
    name: __staticSelector || "Combobox",
    classes: classes$H,
    props,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$I
  });
  const onDropdownClose = () => {
    onClose?.();
    store.closeDropdown();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ComboboxProvider,
    {
      value: {
        getStyles,
        store,
        onOptionSubmit,
        size: size2,
        resetSelectionOnOptionHover,
        readOnly
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Popover,
        {
          opened: store.dropdownOpened,
          preventPositionChangeWhenVisible: false,
          ...others,
          onChange: (_opened) => !_opened && onDropdownClose(),
          withRoles: false,
          unstyled,
          children
        }
      )
    }
  );
}
const extendCombobox = (c) => c;
Combobox.extend = extendCombobox;
Combobox.classes = classes$H;
Combobox.displayName = "@mantine/core/Combobox";
Combobox.Target = ComboboxTarget;
Combobox.Dropdown = ComboboxDropdown;
Combobox.Options = ComboboxOptions;
Combobox.Option = ComboboxOption;
Combobox.Search = ComboboxSearch;
Combobox.Empty = ComboboxEmpty;
Combobox.Chevron = ComboboxChevron;
Combobox.Footer = ComboboxFooter;
Combobox.Header = ComboboxHeader;
Combobox.EventsTarget = ComboboxEventsTarget;
Combobox.DropdownTarget = ComboboxDropdownTarget;
Combobox.Group = ComboboxGroup;
Combobox.ClearButton = ComboboxClearButton;
Combobox.HiddenInput = ComboboxHiddenInput;
var classes$G = { "root": "m_5f75b09e", "body": "m_5f6e695e", "labelWrapper": "m_d3ea56bb", "label": "m_8ee546b8", "description": "m_328f68c0", "error": "m_8e8a99cc" };
const InlineInputClasses = classes$G;
const InlineInput = reactExports.forwardRef(
  ({
    __staticSelector,
    __stylesApiProps,
    className,
    classNames,
    styles,
    unstyled,
    children,
    label,
    description,
    id,
    disabled,
    error,
    size: size2,
    labelPosition = "left",
    bodyElement = "div",
    labelElement = "label",
    variant,
    style,
    vars,
    mod,
    attributes,
    ...others
  }, ref) => {
    const getStyles = useStyles({
      name: __staticSelector,
      props: __stylesApiProps,
      className,
      style,
      classes: classes$G,
      classNames,
      styles,
      unstyled,
      attributes
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Box,
      {
        ...getStyles("root"),
        ref,
        __vars: {
          "--label-fz": getFontSize(size2),
          "--label-lh": getSize(size2, "label-lh")
        },
        mod: [{ "label-position": labelPosition }, mod],
        variant,
        size: size2,
        ...others,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Box,
          {
            component: bodyElement,
            htmlFor: bodyElement === "label" ? id : void 0,
            ...getStyles("body"),
            children: [
              children,
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ...getStyles("labelWrapper"), "data-disabled": disabled || void 0, children: [
                label && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Box,
                  {
                    component: labelElement,
                    htmlFor: labelElement === "label" ? id : void 0,
                    ...getStyles("label"),
                    "data-disabled": disabled || void 0,
                    children: label
                  }
                ),
                description && /* @__PURE__ */ jsxRuntimeExports.jsx(Input.Description, { size: size2, __inheritStyles: false, ...getStyles("description"), children: description }),
                error && typeof error !== "boolean" && /* @__PURE__ */ jsxRuntimeExports.jsx(Input.Error, { size: size2, __inheritStyles: false, ...getStyles("error"), children: error })
              ] })
            ]
          }
        )
      }
    );
  }
);
InlineInput.displayName = "@mantine/core/InlineInput";
var classes$F = { "root": "m_bf2d988c", "inner": "m_26062bec", "input": "m_26063560", "icon": "m_bf295423", "input--outline": "m_215c4542" };
const CheckboxGroupContext = reactExports.createContext(null);
const CheckboxGroupProvider = CheckboxGroupContext.Provider;
const useCheckboxGroupContext = () => reactExports.useContext(CheckboxGroupContext);
const [CheckboxCardProvider, useCheckboxCardContext] = createOptionalContext();
var classes$E = { "card": "m_26775b0a" };
const defaultProps$P = {
  withBorder: true
};
const varsResolver$H = createVarsResolver((_, { radius }) => ({
  card: {
    "--card-radius": getRadius(radius)
  }
}));
const CheckboxCard = factory((_props, ref) => {
  const props = useProps("CheckboxCard", defaultProps$P, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    checked,
    mod,
    withBorder,
    value,
    onClick,
    defaultChecked,
    onChange,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "CheckboxCard",
    classes: classes$E,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$H,
    rootSelector: "card"
  });
  const ctx = useCheckboxGroupContext();
  const _checked = typeof checked === "boolean" ? checked : ctx ? ctx.value.includes(value || "") : void 0;
  const [_value, setValue] = useUncontrolled({
    value: _checked,
    defaultValue: defaultChecked,
    finalValue: false,
    onChange
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxCardProvider, { value: { checked: _value }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    UnstyledButton,
    {
      ref,
      mod: [{ "with-border": withBorder, checked: _value }, mod],
      ...getStyles("card"),
      ...others,
      role: "checkbox",
      "aria-checked": _value,
      onClick: (event) => {
        onClick?.(event);
        ctx?.onChange(value || "");
        setValue(!_value);
      }
    }
  ) });
});
CheckboxCard.displayName = "@mantine/core/CheckboxCard";
CheckboxCard.classes = classes$E;
function InputsGroupFieldset({ children, role }) {
  const ctx = useInputWrapperContext();
  if (!ctx) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { role, "aria-labelledby": ctx.labelId, "aria-describedby": ctx.describedBy, children });
}
const CheckboxGroup = factory((props, ref) => {
  const {
    value,
    defaultValue,
    onChange,
    size: size2,
    wrapperProps,
    children,
    readOnly,
    disabled,
    ...others
  } = useProps("CheckboxGroup", null, props);
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: [],
    onChange
  });
  const handleChange = (event) => {
    const itemValue = typeof event === "string" ? event : event.currentTarget.value;
    !readOnly && setValue(
      _value.includes(itemValue) ? _value.filter((item) => item !== itemValue) : [..._value, itemValue]
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CheckboxGroupProvider, { value: { value: _value, onChange: handleChange, size: size2, disabled }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Input.Wrapper,
    {
      size: size2,
      ref,
      ...wrapperProps,
      ...others,
      labelElement: "div",
      __staticSelector: "CheckboxGroup",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputsGroupFieldset, { role: "group", children })
    }
  ) });
});
CheckboxGroup.classes = Input.Wrapper.classes;
CheckboxGroup.displayName = "@mantine/core/CheckboxGroup";
function CheckIcon({ size: size2, style, ...others }) {
  const _style = size2 !== void 0 ? { width: rem(size2), height: rem(size2), ...style } : style;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      viewBox: "0 0 10 7",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: _style,
      "aria-hidden": true,
      ...others,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: "M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z",
          fill: "currentColor",
          fillRule: "evenodd",
          clipRule: "evenodd"
        }
      )
    }
  );
}
function CheckboxIcon({ indeterminate, ...others }) {
  if (indeterminate) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 32 6",
        "aria-hidden": true,
        ...others,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "32", height: "6", fill: "currentColor", rx: "3" })
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { ...others });
}
var classes$D = { "indicator": "m_5e5256ee", "icon": "m_1b1c543a", "indicator--outline": "m_76e20374" };
const defaultProps$O = {
  icon: CheckboxIcon,
  variant: "filled"
};
const varsResolver$G = createVarsResolver(
  (theme, { radius, color, size: size2, iconColor, variant, autoContrast }) => {
    const parsedColor = parseThemeColor({ color: color || theme.primaryColor, theme });
    const outlineColor = parsedColor.isThemeColor && parsedColor.shade === void 0 ? `var(--mantine-color-${parsedColor.color}-outline)` : parsedColor.color;
    return {
      indicator: {
        "--checkbox-size": getSize(size2, "checkbox-size"),
        "--checkbox-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--checkbox-color": variant === "outline" ? outlineColor : getThemeColor(color, theme),
        "--checkbox-icon-color": iconColor ? getThemeColor(iconColor, theme) : getAutoContrastValue(autoContrast, theme) ? getContrastColor({ color, theme, autoContrast }) : void 0
      }
    };
  }
);
const CheckboxIndicator = factory((_props, ref) => {
  const props = useProps("CheckboxIndicator", defaultProps$O, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    icon: Icon,
    indeterminate,
    radius,
    color,
    iconColor,
    autoContrast,
    checked,
    mod,
    variant,
    disabled,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "CheckboxIndicator",
    classes: classes$D,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$G,
    rootSelector: "indicator"
  });
  const ctx = useCheckboxCardContext();
  const _checked = typeof checked === "boolean" || typeof indeterminate === "boolean" ? checked || indeterminate : ctx?.checked || false;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ref,
      ...getStyles("indicator", { variant }),
      variant,
      mod: [{ checked: _checked, disabled }, mod],
      ...others,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { indeterminate, ...getStyles("icon") })
    }
  );
});
CheckboxIndicator.displayName = "@mantine/core/CheckboxIndicator";
CheckboxIndicator.classes = classes$D;
const defaultProps$N = {
  labelPosition: "right",
  icon: CheckboxIcon,
  variant: "filled"
};
const varsResolver$F = createVarsResolver(
  (theme, { radius, color, size: size2, iconColor, variant, autoContrast }) => {
    const parsedColor = parseThemeColor({ color: color || theme.primaryColor, theme });
    const outlineColor = parsedColor.isThemeColor && parsedColor.shade === void 0 ? `var(--mantine-color-${parsedColor.color}-outline)` : parsedColor.color;
    return {
      root: {
        "--checkbox-size": getSize(size2, "checkbox-size"),
        "--checkbox-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--checkbox-color": variant === "outline" ? outlineColor : getThemeColor(color, theme),
        "--checkbox-icon-color": iconColor ? getThemeColor(iconColor, theme) : getAutoContrastValue(autoContrast, theme) ? getContrastColor({ color, theme, autoContrast }) : void 0
      }
    };
  }
);
const Checkbox = factory((_props, forwardedRef) => {
  const props = useProps("Checkbox", defaultProps$N, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    color,
    label,
    id,
    size: size2,
    radius,
    wrapperProps,
    checked,
    labelPosition,
    description,
    error,
    disabled,
    variant,
    indeterminate,
    icon: Icon,
    rootRef,
    iconColor,
    onChange,
    autoContrast,
    mod,
    attributes,
    ...others
  } = props;
  const ctx = useCheckboxGroupContext();
  const _size = size2 || ctx?.size;
  const getStyles = useStyles({
    name: "Checkbox",
    props,
    classes: classes$F,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$F
  });
  const { styleProps, rest } = extractStyleProps(others);
  const uuid = useId(id);
  const withContextProps = {
    checked: ctx?.value.includes(rest.value) ?? checked,
    onChange: (event) => {
      ctx?.onChange(event);
      onChange?.(event);
    },
    disabled: ctx?.disabled ?? disabled
  };
  const fallbackRef = reactExports.useRef(null);
  const ref = forwardedRef || fallbackRef;
  reactExports.useEffect(() => {
    if (ref && "current" in ref && ref.current) {
      ref.current.indeterminate = indeterminate || false;
      if (indeterminate) {
        ref.current.setAttribute("data-indeterminate", "true");
      } else {
        ref.current.removeAttribute("data-indeterminate");
      }
    }
  }, [indeterminate, ref]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    InlineInput,
    {
      ...getStyles("root"),
      __staticSelector: "Checkbox",
      __stylesApiProps: props,
      id: uuid,
      size: _size,
      labelPosition,
      label,
      description,
      error,
      disabled: withContextProps.disabled,
      classNames,
      styles,
      unstyled,
      "data-checked": withContextProps.checked || checked || void 0,
      variant,
      ref: rootRef,
      mod,
      inert: rest.inert,
      ...styleProps,
      ...wrapperProps,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { ...getStyles("inner"), mod: { "data-label-position": labelPosition }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Box,
          {
            component: "input",
            id: uuid,
            ref,
            mod: { error: !!error },
            ...getStyles("input", { focusable: true, variant }),
            ...rest,
            ...withContextProps,
            inert: rest.inert,
            type: "checkbox"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { indeterminate, ...getStyles("icon") })
      ] })
    }
  );
});
Checkbox.classes = { ...classes$F, ...InlineInputClasses };
Checkbox.displayName = "@mantine/core/Checkbox";
Checkbox.Group = CheckboxGroup;
Checkbox.Indicator = CheckboxIndicator;
Checkbox.Card = CheckboxCard;
function isOptionsGroup(item) {
  return "group" in item;
}
function defaultOptionsFilter({
  options,
  search,
  limit
}) {
  const parsedSearch = search.trim().toLowerCase();
  const result = [];
  for (let i = 0; i < options.length; i += 1) {
    const item = options[i];
    if (result.length === limit) {
      return result;
    }
    if (isOptionsGroup(item)) {
      result.push({
        group: item.group,
        items: defaultOptionsFilter({
          options: item.items,
          search,
          limit: limit - result.length
        })
      });
    }
    if (!isOptionsGroup(item)) {
      if (item.label.toLowerCase().includes(parsedSearch)) {
        result.push(item);
      }
    }
  }
  return result;
}
function isEmptyComboboxData(data) {
  if (data.length === 0) {
    return true;
  }
  for (const item of data) {
    if (!("group" in item)) {
      return false;
    }
    if (item.items.length > 0) {
      return false;
    }
  }
  return true;
}
function validateOptions(options, valuesSet = /* @__PURE__ */ new Set()) {
  if (!Array.isArray(options)) {
    return;
  }
  for (const option of options) {
    if (isOptionsGroup(option)) {
      validateOptions(option.items, valuesSet);
    } else {
      if (typeof option.value === "undefined") {
        throw new Error("[@mantine/core] Each option must have value property");
      }
      if (typeof option.value !== "string") {
        throw new Error(
          `[@mantine/core] Option value must be a string, other data formats are not supported, got ${typeof option.value}`
        );
      }
      if (valuesSet.has(option.value)) {
        throw new Error(
          `[@mantine/core] Duplicate options are not supported. Option with value "${option.value}" was provided more than once`
        );
      }
      valuesSet.add(option.value);
    }
  }
}
function isValueChecked(value, optionValue) {
  return Array.isArray(value) ? value.includes(optionValue) : value === optionValue;
}
function Option({
  data,
  withCheckIcon,
  withAlignedLabels,
  value,
  checkIconPosition,
  unstyled,
  renderOption
}) {
  if (!isOptionsGroup(data)) {
    const checked = isValueChecked(value, data.value);
    const check = withCheckIcon && (checked ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { className: classes$H.optionsDropdownCheckIcon }) : withAlignedLabels ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: classes$H.optionsDropdownCheckPlaceholder }) : null);
    const defaultContent = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      checkIconPosition === "left" && check,
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: data.label }),
      checkIconPosition === "right" && check
    ] });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Combobox.Option,
      {
        value: data.value,
        disabled: data.disabled,
        className: clsx({ [classes$H.optionsDropdownOption]: !unstyled }),
        "data-reverse": checkIconPosition === "right" || void 0,
        "data-checked": checked || void 0,
        "aria-selected": checked,
        active: checked,
        children: typeof renderOption === "function" ? renderOption({ option: data, checked }) : defaultContent
      }
    );
  }
  const options = data.items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Option,
    {
      data: item,
      value,
      unstyled,
      withCheckIcon,
      withAlignedLabels,
      checkIconPosition,
      renderOption
    },
    item.value
  ));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Combobox.Group, { label: data.group, children: options });
}
function OptionsDropdown({
  data,
  hidden,
  hiddenWhenEmpty,
  filter,
  search,
  limit,
  maxDropdownHeight,
  withScrollArea = true,
  filterOptions = true,
  withCheckIcon = false,
  withAlignedLabels = false,
  value,
  checkIconPosition,
  nothingFoundMessage,
  unstyled,
  labelId,
  renderOption,
  scrollAreaProps,
  "aria-label": ariaLabel
}) {
  validateOptions(data);
  const shouldFilter = typeof search === "string";
  const filteredData = shouldFilter ? (filter || defaultOptionsFilter)({
    options: data,
    search: filterOptions ? search : "",
    limit: limit ?? Infinity
  }) : data;
  const isEmpty = isEmptyComboboxData(filteredData);
  const options = filteredData.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Option,
    {
      data: item,
      withCheckIcon,
      withAlignedLabels,
      value,
      checkIconPosition,
      unstyled,
      renderOption
    },
    isOptionsGroup(item) ? item.group : item.value
  ));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Combobox.Dropdown, { hidden: hidden || hiddenWhenEmpty && isEmpty, "data-composed": true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Combobox.Options, { labelledBy: labelId, "aria-label": ariaLabel, children: [
    withScrollArea ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollArea.Autosize,
      {
        mah: maxDropdownHeight ?? 220,
        type: "scroll",
        scrollbarSize: "var(--combobox-padding)",
        offsetScrollbars: "y",
        ...scrollAreaProps,
        children: options
      }
    ) : options,
    isEmpty && nothingFoundMessage && /* @__PURE__ */ jsxRuntimeExports.jsx(Combobox.Empty, { children: nothingFoundMessage })
  ] }) });
}
const Autocomplete = factory((_props, ref) => {
  const props = useProps("Autocomplete", null, _props);
  const {
    classNames,
    styles,
    unstyled,
    vars,
    dropdownOpened,
    defaultDropdownOpened,
    onDropdownClose,
    onDropdownOpen,
    onFocus,
    onBlur,
    onClick,
    onChange,
    data,
    value,
    defaultValue,
    selectFirstOptionOnChange,
    selectFirstOptionOnDropdownOpen,
    onOptionSubmit,
    comboboxProps,
    readOnly,
    disabled,
    filter,
    limit,
    withScrollArea,
    maxDropdownHeight,
    size: size2,
    id,
    renderOption,
    autoComplete,
    scrollAreaProps,
    onClear,
    clearButtonProps,
    error,
    clearable,
    rightSection,
    autoSelectOnBlur,
    openOnFocus = true,
    attributes,
    ...others
  } = props;
  const _id = useId(id);
  const parsedData = getParsedComboboxData(data);
  const optionsLockup = getOptionsLockup(parsedData);
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: "",
    onChange
  });
  const combobox = useCombobox({
    opened: dropdownOpened,
    defaultOpened: defaultDropdownOpened,
    onDropdownOpen: () => {
      onDropdownOpen?.();
      if (selectFirstOptionOnDropdownOpen) {
        combobox.selectFirstOption();
      }
    },
    onDropdownClose: () => {
      onDropdownClose?.();
      setTimeout(combobox.resetSelectedOption, 0);
    }
  });
  const handleValueChange = (value2) => {
    setValue(value2);
    combobox.resetSelectedOption();
  };
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    props,
    styles,
    classNames
  });
  reactExports.useEffect(() => {
    if (selectFirstOptionOnChange) {
      combobox.selectFirstOption();
    }
  }, [selectFirstOptionOnChange, _value]);
  const clearButton = /* @__PURE__ */ jsxRuntimeExports.jsx(
    Combobox.ClearButton,
    {
      ...clearButtonProps,
      onClear: () => {
        handleValueChange("");
        onClear?.();
      }
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Combobox,
    {
      store: combobox,
      __staticSelector: "Autocomplete",
      classNames: resolvedClassNames,
      styles: resolvedStyles,
      unstyled,
      readOnly,
      size: size2,
      attributes,
      keepMounted: autoSelectOnBlur,
      onOptionSubmit: (val) => {
        onOptionSubmit?.(val);
        handleValueChange(optionsLockup[val].label);
        combobox.closeDropdown();
      },
      ...comboboxProps,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Combobox.Target, { autoComplete, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          InputBase,
          {
            ref,
            ...others,
            size: size2,
            __staticSelector: "Autocomplete",
            __clearSection: clearButton,
            __clearable: clearable && !!_value && !disabled && !readOnly,
            rightSection,
            disabled,
            readOnly,
            value: _value,
            error,
            onChange: (event) => {
              handleValueChange(event.currentTarget.value);
              combobox.openDropdown();
              selectFirstOptionOnChange && combobox.selectFirstOption();
            },
            onFocus: (event) => {
              openOnFocus && combobox.openDropdown();
              onFocus?.(event);
            },
            onBlur: (event) => {
              if (autoSelectOnBlur) {
                combobox.clickSelectedOption();
              }
              combobox.closeDropdown();
              onBlur?.(event);
            },
            onClick: (event) => {
              combobox.openDropdown();
              onClick?.(event);
            },
            classNames: resolvedClassNames,
            styles: resolvedStyles,
            unstyled,
            attributes,
            id: _id
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          OptionsDropdown,
          {
            data: parsedData,
            hidden: readOnly || disabled,
            filter,
            search: _value,
            limit,
            hiddenWhenEmpty: true,
            withScrollArea,
            maxDropdownHeight,
            unstyled,
            labelId: others.label ? `${_id}-label` : void 0,
            "aria-label": others.label ? void 0 : others["aria-label"],
            renderOption,
            scrollAreaProps
          }
        )
      ]
    }
  );
});
Autocomplete.classes = { ...InputBase.classes, ...Combobox.classes };
Autocomplete.displayName = "@mantine/core/Autocomplete";
var classes$C = { "group": "m_11def92b", "root": "m_f85678b6", "image": "m_11f8ac07", "placeholder": "m_104cd71f" };
const AvatarGroupContext = reactExports.createContext(null);
const AvatarGroupProvider = AvatarGroupContext.Provider;
function useAvatarGroupContext() {
  const ctx = reactExports.useContext(AvatarGroupContext);
  return { withinGroup: !!ctx };
}
const varsResolver$E = createVarsResolver((_, { spacing }) => ({
  group: {
    "--ag-spacing": getSpacing(spacing)
  }
}));
const AvatarGroup = factory((_props, ref) => {
  const props = useProps("AvatarGroup", null, _props);
  const { classNames, className, style, styles, unstyled, vars, spacing, attributes, ...others } = props;
  const getStyles = useStyles({
    name: "AvatarGroup",
    classes: classes$C,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$E,
    rootSelector: "group"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarGroupProvider, { value: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ref, ...getStyles("group"), ...others }) });
});
AvatarGroup.classes = classes$C;
AvatarGroup.displayName = "@mantine/core/AvatarGroup";
function AvatarPlaceholderIcon(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      ...props,
      "data-avatar-placeholder-icon": true,
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: "M0.877014 7.49988C0.877014 3.84219 3.84216 0.877045 7.49985 0.877045C11.1575 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1575 14.1227 7.49985 14.1227C3.84216 14.1227 0.877014 11.1575 0.877014 7.49988ZM7.49985 1.82704C4.36683 1.82704 1.82701 4.36686 1.82701 7.49988C1.82701 8.97196 2.38774 10.3131 3.30727 11.3213C4.19074 9.94119 5.73818 9.02499 7.50023 9.02499C9.26206 9.02499 10.8093 9.94097 11.6929 11.3208C12.6121 10.3127 13.1727 8.97172 13.1727 7.49988C13.1727 4.36686 10.6328 1.82704 7.49985 1.82704ZM10.9818 11.9787C10.2839 10.7795 8.9857 9.97499 7.50023 9.97499C6.01458 9.97499 4.71624 10.7797 4.01845 11.9791C4.97952 12.7272 6.18765 13.1727 7.49985 13.1727C8.81227 13.1727 10.0206 12.727 10.9818 11.9787ZM5.14999 6.50487C5.14999 5.207 6.20212 4.15487 7.49999 4.15487C8.79786 4.15487 9.84999 5.207 9.84999 6.50487C9.84999 7.80274 8.79786 8.85487 7.49999 8.85487C6.20212 8.85487 5.14999 7.80274 5.14999 6.50487ZM7.49999 5.10487C6.72679 5.10487 6.09999 5.73167 6.09999 6.50487C6.09999 7.27807 6.72679 7.90487 7.49999 7.90487C8.27319 7.90487 8.89999 7.27807 8.89999 6.50487C8.89999 5.73167 8.27319 5.10487 7.49999 5.10487Z",
          fill: "currentColor",
          fillRule: "evenodd",
          clipRule: "evenodd"
        }
      )
    }
  );
}
function hashCode(input) {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
}
const defaultColors = [
  "blue",
  "cyan",
  "grape",
  "green",
  "indigo",
  "lime",
  "orange",
  "pink",
  "red",
  "teal",
  "violet"
];
function getInitialsColor(name, colors = defaultColors) {
  const hash = hashCode(name);
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}
function getInitials(name, limit = 2) {
  const splitted = name.split(" ");
  if (splitted.length === 1) {
    return name.slice(0, limit).toUpperCase();
  }
  return splitted.map((word) => word[0]).slice(0, limit).join("").toUpperCase();
}
const varsResolver$D = createVarsResolver(
  (theme, { size: size2, radius, variant, gradient, color, autoContrast, name, allowedInitialsColors }) => {
    const _color = color === "initials" && typeof name === "string" ? getInitialsColor(name, allowedInitialsColors) : color;
    const colors = theme.variantColorResolver({
      color: _color || "gray",
      theme,
      gradient,
      variant: variant || "light",
      autoContrast
    });
    return {
      root: {
        "--avatar-size": getSize(size2, "avatar-size"),
        "--avatar-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--avatar-bg": _color || variant ? colors.background : void 0,
        "--avatar-color": _color || variant ? colors.color : void 0,
        "--avatar-bd": _color || variant ? colors.border : void 0
      }
    };
  }
);
const Avatar = polymorphicFactory((_props, ref) => {
  const props = useProps("Avatar", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    src,
    alt,
    radius,
    color,
    gradient,
    imageProps,
    children,
    autoContrast,
    mod,
    name,
    allowedInitialsColors,
    attributes,
    ...others
  } = props;
  const ctx = useAvatarGroupContext();
  const [error, setError] = reactExports.useState(!src);
  const getStyles = useStyles({
    name: "Avatar",
    props,
    classes: classes$C,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$D
  });
  reactExports.useEffect(() => setError(!src), [src]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ...getStyles("root"),
      mod: [{ "within-group": ctx.withinGroup }, mod],
      ref,
      ...others,
      children: error || !src ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...getStyles("placeholder"), title: alt, children: children || typeof name === "string" && getInitials(name) || /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarPlaceholderIcon, {}) }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
        "img",
        {
          ...imageProps,
          ...getStyles("image"),
          src,
          alt,
          onError: (event) => {
            setError(true);
            imageProps?.onError?.(event);
          }
        }
      )
    }
  );
});
Avatar.classes = classes$C;
Avatar.displayName = "@mantine/core/Avatar";
Avatar.Group = AvatarGroup;
var classes$B = { "root": "m_347db0ec", "root--dot": "m_fbd81e3d", "label": "m_5add502a", "section": "m_91fdda9b" };
const varsResolver$C = createVarsResolver(
  (theme, { radius, color, gradient, variant, size: size2, autoContrast, circle }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || "filled",
      autoContrast
    });
    return {
      root: {
        "--badge-height": getSize(size2, "badge-height"),
        "--badge-padding-x": getSize(size2, "badge-padding-x"),
        "--badge-fz": getSize(size2, "badge-fz"),
        "--badge-radius": circle || radius === void 0 ? void 0 : getRadius(radius),
        "--badge-bg": color || variant ? colors.background : void 0,
        "--badge-color": color || variant ? colors.color : void 0,
        "--badge-bd": color || variant ? colors.border : void 0,
        "--badge-dot-color": variant === "dot" ? getThemeColor(color, theme) : void 0
      }
    };
  }
);
const Badge = polymorphicFactory((_props, ref) => {
  const props = useProps("Badge", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    radius,
    color,
    gradient,
    leftSection,
    rightSection,
    children,
    variant,
    fullWidth,
    autoContrast,
    circle,
    mod,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Badge",
    props,
    classes: classes$B,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$C
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Box,
    {
      variant,
      mod: [
        {
          block: fullWidth,
          circle,
          "with-right-section": !!rightSection,
          "with-left-section": !!leftSection
        },
        mod
      ],
      ...getStyles("root", { variant }),
      ref,
      ...others,
      children: [
        leftSection && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...getStyles("section"), "data-position": "left", children: leftSection }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...getStyles("label"), children }),
        rightSection && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...getStyles("section"), "data-position": "right", children: rightSection })
      ]
    }
  );
});
Badge.classes = classes$B;
Badge.displayName = "@mantine/core/Badge";
var classes$A = { "root": "m_8b3717df", "breadcrumb": "m_f678d540", "separator": "m_3b8f2208" };
const defaultProps$M = {
  separator: "/"
};
const varsResolver$B = createVarsResolver((_, { separatorMargin }) => ({
  root: {
    "--bc-separator-margin": getSpacing(separatorMargin)
  }
}));
const Breadcrumbs = factory((_props, ref) => {
  const props = useProps("Breadcrumbs", defaultProps$M, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    children,
    separator,
    separatorMargin,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Breadcrumbs",
    classes: classes$A,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$B
  });
  const items = reactExports.Children.toArray(children).reduce((acc, child, index, array) => {
    const item = isElement(child) ? reactExports.cloneElement(child, {
      ...getStyles("breadcrumb", { className: child.props?.className }),
      key: index
    }) : /* @__PURE__ */ reactExports.createElement("div", { ...getStyles("breadcrumb"), key: index }, child);
    acc.push(item);
    if (index !== array.length - 1) {
      acc.push(
        /* @__PURE__ */ reactExports.createElement(Box, { ...getStyles("separator"), key: `separator-${index}` }, separator)
      );
    }
    return acc;
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ref, ...getStyles("root"), ...others, children: items });
});
Breadcrumbs.classes = classes$A;
Breadcrumbs.displayName = "@mantine/core/Breadcrumbs";
var classes$z = { "root": "m_fea6bf1a", "burger": "m_d4fb9cad" };
const varsResolver$A = createVarsResolver(
  (theme, { color, size: size2, lineSize, transitionDuration, transitionTimingFunction }) => ({
    root: {
      "--burger-color": color ? getThemeColor(color, theme) : void 0,
      "--burger-size": getSize(size2, "burger-size"),
      "--burger-line-size": lineSize ? rem(lineSize) : void 0,
      "--burger-transition-duration": transitionDuration === void 0 ? void 0 : `${transitionDuration}ms`,
      "--burger-transition-timing-function": transitionTimingFunction
    }
  })
);
const Burger = factory((_props, ref) => {
  const props = useProps("Burger", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    opened,
    children,
    transitionDuration,
    transitionTimingFunction,
    lineSize,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Burger",
    classes: classes$z,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$A
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(UnstyledButton, { ...getStyles("root"), ref, ...others, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { mod: ["reduce-motion", { opened }], ...getStyles("burger") }),
    children
  ] });
});
Burger.classes = classes$z;
Burger.displayName = "@mantine/core/Burger";
var classes$y = { "root": "m_77c9d27d", "inner": "m_80f1301b", "label": "m_811560b9", "section": "m_a74036a", "loader": "m_a25b86ee", "group": "m_80d6d844", "groupSection": "m_70be2a01" };
const defaultProps$L = {
  orientation: "horizontal"
};
const varsResolver$z = createVarsResolver((_, { borderWidth }) => ({
  group: { "--button-border-width": rem(borderWidth) }
}));
const ButtonGroup = factory((_props, ref) => {
  const props = useProps("ButtonGroup", defaultProps$L, _props);
  const {
    className,
    style,
    classNames,
    styles,
    unstyled,
    orientation,
    vars,
    borderWidth,
    variant,
    mod,
    attributes,
    ...others
  } = useProps("ButtonGroup", defaultProps$L, _props);
  const getStyles = useStyles({
    name: "ButtonGroup",
    props,
    classes: classes$y,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$z,
    rootSelector: "group"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ...getStyles("group"),
      ref,
      variant,
      mod: [{ "data-orientation": orientation }, mod],
      role: "group",
      ...others
    }
  );
});
ButtonGroup.classes = classes$y;
ButtonGroup.displayName = "@mantine/core/ButtonGroup";
const varsResolver$y = createVarsResolver(
  (theme, { radius, color, gradient, variant, autoContrast, size: size2 }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || "filled",
      autoContrast
    });
    return {
      groupSection: {
        "--section-height": getSize(size2, "section-height"),
        "--section-padding-x": getSize(size2, "section-padding-x"),
        "--section-fz": size2?.includes("compact") ? getFontSize(size2.replace("compact-", "")) : getFontSize(size2),
        "--section-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--section-bg": color || variant ? colors.background : void 0,
        "--section-color": colors.color,
        "--section-bd": color || variant ? colors.border : void 0
      }
    };
  }
);
const ButtonGroupSection = factory((_props, ref) => {
  const props = useProps("ButtonGroupSection", null, _props);
  const {
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    variant,
    gradient,
    radius,
    autoContrast,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "ButtonGroupSection",
    props,
    classes: classes$y,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$y,
    rootSelector: "groupSection"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ...getStyles("groupSection"), ref, variant, ...others });
});
ButtonGroupSection.classes = classes$y;
ButtonGroupSection.displayName = "@mantine/core/ButtonGroupSection";
const loaderTransition = {
  in: { opacity: 1, transform: `translate(-50%, calc(-50% + ${rem(1)}))` },
  out: { opacity: 0, transform: "translate(-50%, -200%)" },
  common: { transformOrigin: "center" },
  transitionProperty: "transform, opacity"
};
const varsResolver$x = createVarsResolver(
  (theme, { radius, color, gradient, variant, size: size2, justify, autoContrast }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || "filled",
      autoContrast
    });
    return {
      root: {
        "--button-justify": justify,
        "--button-height": getSize(size2, "button-height"),
        "--button-padding-x": getSize(size2, "button-padding-x"),
        "--button-fz": size2?.includes("compact") ? getFontSize(size2.replace("compact-", "")) : getFontSize(size2),
        "--button-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--button-bg": color || variant ? colors.background : void 0,
        "--button-hover": color || variant ? colors.hover : void 0,
        "--button-color": colors.color,
        "--button-bd": color || variant ? colors.border : void 0,
        "--button-hover-color": color || variant ? colors.hoverColor : void 0
      }
    };
  }
);
const Button = polymorphicFactory((_props, ref) => {
  const props = useProps("Button", null, _props);
  const {
    style,
    vars,
    className,
    color,
    disabled,
    children,
    leftSection,
    rightSection,
    fullWidth,
    variant,
    radius,
    loading,
    loaderProps,
    gradient,
    classNames,
    styles,
    unstyled,
    "data-disabled": dataDisabled,
    autoContrast,
    mod,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Button",
    props,
    classes: classes$y,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$x
  });
  const hasLeftSection = !!leftSection;
  const hasRightSection = !!rightSection;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    UnstyledButton,
    {
      ref,
      ...getStyles("root", { active: !disabled && !loading && !dataDisabled }),
      unstyled,
      variant,
      disabled: disabled || loading,
      mod: [
        {
          disabled: disabled || dataDisabled,
          loading,
          block: fullWidth,
          "with-left-section": hasLeftSection,
          "with-right-section": hasRightSection
        },
        mod
      ],
      ...others,
      children: [
        typeof loading === "boolean" && /* @__PURE__ */ jsxRuntimeExports.jsx(Transition, { mounted: loading, transition: loaderTransition, duration: 150, children: (transitionStyles) => /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "span", ...getStyles("loader", { style: transitionStyles }), "aria-hidden": true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Loader,
          {
            color: "var(--button-color)",
            size: "calc(var(--button-height) / 1.8)",
            ...loaderProps
          }
        ) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { ...getStyles("inner"), children: [
          leftSection && /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "span", ...getStyles("section"), mod: { position: "left" }, children: leftSection }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "span", mod: { loading }, ...getStyles("label"), children }),
          rightSection && /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "span", ...getStyles("section"), mod: { position: "right" }, children: rightSection })
        ] })
      ]
    }
  );
});
Button.classes = classes$y;
Button.displayName = "@mantine/core/Button";
Button.Group = ButtonGroup;
Button.GroupSection = ButtonGroupSection;
const [CardProvider, useCardContext] = createSafeContext(
  "Card component was not found in tree"
);
var classes$x = { "root": "m_e615b15f", "section": "m_599a2148" };
const CardSection = polymorphicFactory((_props, ref) => {
  const props = useProps("CardSection", null, _props);
  const { classNames, className, style, styles, vars, withBorder, inheritPadding, mod, ...others } = props;
  const ctx = useCardContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ref,
      mod: [{ "with-border": withBorder, "inherit-padding": inheritPadding }, mod],
      ...ctx.getStyles("section", { className, style, styles, classNames }),
      ...others
    }
  );
});
CardSection.classes = classes$x;
CardSection.displayName = "@mantine/core/CardSection";
const varsResolver$w = createVarsResolver((_, { padding }) => ({
  root: {
    "--card-padding": getSpacing(padding)
  }
}));
const Card = polymorphicFactory((_props, ref) => {
  const props = useProps("Card", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    children,
    padding,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Card",
    props,
    classes: classes$x,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$w
  });
  const _children = reactExports.Children.toArray(children);
  const content = _children.map((child, index) => {
    if (typeof child === "object" && child && "type" in child && child.type === CardSection) {
      return reactExports.cloneElement(child, {
        "data-first-section": index === 0 || void 0,
        "data-last-section": index === _children.length - 1 || void 0
      });
    }
    return child;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CardProvider, { value: { getStyles }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paper, { ref, unstyled, ...getStyles("root"), ...others, children: content }) });
});
Card.classes = classes$x;
Card.displayName = "@mantine/core/Card";
Card.Section = CardSection;
var classes$w = { "root": "m_4451eb3a" };
const Center = polymorphicFactory((_props, ref) => {
  const props = useProps("Center", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    inline: inline2,
    mod,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Center",
    props,
    classes: classes$w,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ref, mod: [{ inline: inline2 }, mod], ...getStyles("root"), ...others });
});
Center.classes = classes$w;
Center.displayName = "@mantine/core/Center";
var classes$v = { "root": "m_7485cace" };
const varsResolver$v = createVarsResolver((_, { size: size2, fluid }) => ({
  root: {
    "--container-size": fluid ? void 0 : getSize(size2, "container-size")
  }
}));
const Container = factory((_props, ref) => {
  const props = useProps("Container", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    fluid,
    mod,
    attributes,
    strategy,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Container",
    classes: classes$v,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$v
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ref,
      mod: [{ fluid, strategy: strategy || "block" }, mod],
      ...getStyles("root"),
      ...others
    }
  );
});
Container.classes = classes$v;
Container.displayName = "@mantine/core/Container";
const defaultProps$K = {
  timeout: 1e3
};
function CopyButton(props) {
  const { children, timeout, value, ...others } = useProps("CopyButton", defaultProps$K, props);
  const clipboard = useClipboard({ timeout });
  const copy = () => clipboard.copy(value);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: children({ copy, copied: clipboard.copied, ...others }) });
}
CopyButton.displayName = "@mantine/core/CopyButton";
var classes$u = { "root": "m_3eebeb36", "label": "m_9e365f20" };
const defaultProps$J = {
  orientation: "horizontal"
};
const varsResolver$u = createVarsResolver((theme, { color, variant, size: size2 }) => ({
  root: {
    "--divider-color": color ? getThemeColor(color, theme) : void 0,
    "--divider-border-style": variant,
    "--divider-size": getSize(size2, "divider-size")
  }
}));
const Divider = factory((_props, ref) => {
  const props = useProps("Divider", defaultProps$J, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    color,
    orientation,
    label,
    labelPosition,
    mod,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Divider",
    classes: classes$u,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$u
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ref,
      mod: [{ orientation, "with-label": !!label }, mod],
      ...getStyles("root"),
      ...others,
      role: "separator",
      children: label && /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "span", mod: { position: labelPosition }, ...getStyles("label"), children: label })
    }
  );
});
Divider.classes = classes$u;
Divider.displayName = "@mantine/core/Divider";
var classes$t = { "root": "m_f11b401e", "header": "m_5a7c2c9", "content": "m_b8a05bbd", "inner": "m_31cd769a" };
const [DrawerProvider, useDrawerContext] = createSafeContext(
  "Drawer component was not found in tree"
);
const DrawerBody = factory((_props, ref) => {
  const props = useProps("DrawerBody", null, _props);
  const { classNames, className, style, styles, vars, ...others } = props;
  const ctx = useDrawerContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ModalBaseBody,
    {
      ref,
      ...ctx.getStyles("body", { classNames, style, styles, className }),
      ...others
    }
  );
});
DrawerBody.classes = classes$t;
DrawerBody.displayName = "@mantine/core/DrawerBody";
const DrawerCloseButton = factory((_props, ref) => {
  const props = useProps("DrawerCloseButton", null, _props);
  const { classNames, className, style, styles, vars, ...others } = props;
  const ctx = useDrawerContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ModalBaseCloseButton,
    {
      ref,
      ...ctx.getStyles("close", { classNames, style, styles, className }),
      ...others
    }
  );
});
DrawerCloseButton.classes = classes$t;
DrawerCloseButton.displayName = "@mantine/core/DrawerCloseButton";
const DrawerContent = factory((_props, ref) => {
  const props = useProps("DrawerContent", null, _props);
  const { classNames, className, style, styles, vars, children, radius, __hidden, ...others } = props;
  const ctx = useDrawerContext();
  const Scroll = ctx.scrollAreaComponent || NativeScrollArea;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ModalBaseContent,
    {
      ...ctx.getStyles("content", { className, style, styles, classNames }),
      innerProps: ctx.getStyles("inner", { className, style, styles, classNames }),
      ref,
      ...others,
      radius: radius || ctx.radius || 0,
      "data-hidden": __hidden || void 0,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Scroll, { style: { height: "calc(100vh - var(--drawer-offset) * 2)" }, children })
    }
  );
});
DrawerContent.classes = classes$t;
DrawerContent.displayName = "@mantine/core/DrawerContent";
const DrawerHeader = factory((_props, ref) => {
  const props = useProps("DrawerHeader", null, _props);
  const { classNames, className, style, styles, vars, ...others } = props;
  const ctx = useDrawerContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ModalBaseHeader,
    {
      ref,
      ...ctx.getStyles("header", { classNames, style, styles, className }),
      ...others
    }
  );
});
DrawerHeader.classes = classes$t;
DrawerHeader.displayName = "@mantine/core/DrawerHeader";
const DrawerOverlay = factory((_props, ref) => {
  const props = useProps("DrawerOverlay", null, _props);
  const { classNames, className, style, styles, vars, ...others } = props;
  const ctx = useDrawerContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ModalBaseOverlay,
    {
      ref,
      ...ctx.getStyles("overlay", { classNames, style, styles, className }),
      ...others
    }
  );
});
DrawerOverlay.classes = classes$t;
DrawerOverlay.displayName = "@mantine/core/DrawerOverlay";
function getDrawerAlign(position) {
  switch (position) {
    case "top":
      return "flex-start";
    case "bottom":
      return "flex-end";
    default:
      return void 0;
  }
}
function getDrawerFlex(position) {
  if (position === "top" || position === "bottom") {
    return "0 0 calc(100% - var(--drawer-offset, 0rem) * 2)";
  }
  return void 0;
}
const transitions = {
  top: "slide-down",
  bottom: "slide-up",
  left: "slide-right",
  right: "slide-left"
};
const rtlTransitions = {
  top: "slide-down",
  bottom: "slide-up",
  right: "slide-right",
  left: "slide-left"
};
const defaultProps$I = {
  closeOnClickOutside: true,
  withinPortal: true,
  lockScroll: true,
  trapFocus: true,
  returnFocus: true,
  closeOnEscape: true,
  keepMounted: false,
  zIndex: getDefaultZIndex("modal"),
  position: "left"
};
const varsResolver$t = createVarsResolver((_, { position, size: size2, offset: offset2 }) => ({
  root: {
    "--drawer-size": getSize(size2, "drawer-size"),
    "--drawer-flex": getDrawerFlex(position),
    "--drawer-height": position === "left" || position === "right" ? void 0 : "var(--drawer-size)",
    "--drawer-align": getDrawerAlign(position),
    "--drawer-justify": position === "right" ? "flex-end" : void 0,
    "--drawer-offset": rem(offset2)
  }
}));
const DrawerRoot = factory((_props, ref) => {
  const props = useProps("DrawerRoot", defaultProps$I, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    scrollAreaComponent,
    position,
    transitionProps,
    radius,
    attributes,
    ...others
  } = props;
  const { dir } = useDirection();
  const getStyles = useStyles({
    name: "Drawer",
    classes: classes$t,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$t
  });
  const drawerTransition = (dir === "rtl" ? rtlTransitions : transitions)[position];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerProvider, { value: { scrollAreaComponent, getStyles, radius }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ModalBase,
    {
      ref,
      ...getStyles("root"),
      transitionProps: { transition: drawerTransition, ...transitionProps },
      "data-offset-scrollbars": scrollAreaComponent === ScrollArea.Autosize || void 0,
      unstyled,
      ...others
    }
  ) });
});
DrawerRoot.classes = classes$t;
DrawerRoot.displayName = "@mantine/core/DrawerRoot";
const [DrawerStackProvider, useDrawerStackContext] = createOptionalContext();
function DrawerStack({ children }) {
  const [stack, setStack] = reactExports.useState([]);
  const [maxZIndex, setMaxZIndex] = reactExports.useState(getDefaultZIndex("modal"));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DrawerStackProvider,
    {
      value: {
        stack,
        addModal: (id, zIndex) => {
          setStack((current) => [.../* @__PURE__ */ new Set([...current, id])]);
          setMaxZIndex(
            (current) => typeof zIndex === "number" && typeof current === "number" ? Math.max(current, zIndex) : current
          );
        },
        removeModal: (id) => setStack((current) => current.filter((currentId) => currentId !== id)),
        getZIndex: (id) => `calc(${maxZIndex} + ${stack.indexOf(id)} + 1)`,
        currentId: stack[stack.length - 1],
        maxZIndex
      },
      children
    }
  );
}
DrawerStack.displayName = "@mantine/core/DrawerStack";
const DrawerTitle = factory((_props, ref) => {
  const props = useProps("DrawerTitle", null, _props);
  const { classNames, className, style, styles, vars, ...others } = props;
  const ctx = useDrawerContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ModalBaseTitle,
    {
      ref,
      ...ctx.getStyles("title", { classNames, style, styles, className }),
      ...others
    }
  );
});
DrawerTitle.classes = classes$t;
DrawerTitle.displayName = "@mantine/core/DrawerTitle";
const defaultProps$H = {
  closeOnClickOutside: true,
  withinPortal: true,
  lockScroll: true,
  trapFocus: true,
  returnFocus: true,
  closeOnEscape: true,
  keepMounted: false,
  zIndex: getDefaultZIndex("modal"),
  withOverlay: true,
  withCloseButton: true
};
const Drawer = factory((_props, ref) => {
  const {
    title,
    withOverlay,
    overlayProps,
    withCloseButton,
    closeButtonProps,
    children,
    opened,
    stackId,
    zIndex,
    ...others
  } = useProps("Drawer", defaultProps$H, _props);
  const ctx = useDrawerStackContext();
  const hasHeader = !!title || withCloseButton;
  const stackProps = ctx && stackId ? {
    closeOnEscape: ctx.currentId === stackId,
    trapFocus: ctx.currentId === stackId,
    zIndex: ctx.getZIndex(stackId)
  } : {};
  const overlayVisible = withOverlay === false ? false : stackId && ctx ? ctx.currentId === stackId : opened;
  reactExports.useEffect(() => {
    if (ctx && stackId) {
      opened ? ctx.addModal(stackId, zIndex || getDefaultZIndex("modal")) : ctx.removeModal(stackId);
    }
  }, [opened, stackId, zIndex]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    DrawerRoot,
    {
      ref,
      opened,
      zIndex: ctx && stackId ? ctx.getZIndex(stackId) : zIndex,
      ...others,
      ...stackProps,
      children: [
        withOverlay && /* @__PURE__ */ jsxRuntimeExports.jsx(
          DrawerOverlay,
          {
            visible: overlayVisible,
            transitionProps: ctx && stackId ? { duration: 0 } : void 0,
            ...overlayProps
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerContent, { __hidden: ctx && stackId && opened ? stackId !== ctx.currentId : false, children: [
          hasHeader && /* @__PURE__ */ jsxRuntimeExports.jsxs(DrawerHeader, { children: [
            title && /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerTitle, { children: title }),
            withCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerCloseButton, { ...closeButtonProps })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(DrawerBody, { children })
        ] })
      ]
    }
  );
});
Drawer.classes = classes$t;
Drawer.displayName = "@mantine/core/Drawer";
Drawer.Root = DrawerRoot;
Drawer.Overlay = DrawerOverlay;
Drawer.Content = DrawerContent;
Drawer.Body = DrawerBody;
Drawer.Header = DrawerHeader;
Drawer.Title = DrawerTitle;
Drawer.CloseButton = DrawerCloseButton;
Drawer.Stack = DrawerStack;
var classes$s = { "root": "m_e9408a47", "root--default": "m_84c9523a", "root--filled": "m_ef274e49", "root--unstyled": "m_eda993d3", "legend": "m_90794832", "legend--unstyled": "m_74ca27fe" };
const defaultProps$G = {
  variant: "default"
};
const varsResolver$s = createVarsResolver((_, { radius }) => ({
  root: {
    "--fieldset-radius": radius === void 0 ? void 0 : getRadius(radius)
  }
}));
const Fieldset = factory((_props, ref) => {
  const props = useProps("Fieldset", defaultProps$G, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    legend,
    variant,
    children,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Fieldset",
    classes: classes$s,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$s
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Box,
    {
      component: "fieldset",
      ref,
      variant,
      ...getStyles("root", { variant }),
      ...others,
      children: [
        legend && /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { ...getStyles("legend", { variant }), children: legend }),
        children
      ]
    }
  );
});
Fieldset.classes = classes$s;
Fieldset.displayName = "@mantine/core/Fieldset";
const defaultProps$F = {
  multiple: false
};
const FileButton = reactExports.forwardRef(
  (props, ref) => {
    const {
      onChange,
      children,
      multiple,
      accept,
      name,
      form,
      resetRef,
      disabled,
      capture,
      inputProps,
      ...others
    } = useProps("FileButton", defaultProps$F, props);
    const inputRef = reactExports.useRef(null);
    const onClick = () => {
      !disabled && inputRef.current?.click();
    };
    const handleChange = (event) => {
      if (event.currentTarget.files === null) {
        return onChange(multiple ? [] : null);
      }
      if (multiple) {
        onChange(Array.from(event.currentTarget.files));
      } else {
        onChange(event.currentTarget.files[0] || null);
      }
    };
    const reset = () => {
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };
    assignRef(resetRef, reset);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          style: { display: "none" },
          type: "file",
          accept,
          multiple,
          onChange: handleChange,
          ref: useMergedRef(ref, inputRef),
          name,
          form,
          capture,
          ...inputProps
        }
      ),
      children({ onClick, ...others })
    ] });
  }
);
FileButton.displayName = "@mantine/core/FileButton";
const DefaultValue = ({ value }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }, children: Array.isArray(value) ? value.map((file) => file.name).join(", ") : value?.name });
const defaultProps$E = {
  valueComponent: DefaultValue,
  size: "sm"
};
const _FileInput = factory((_props, ref) => {
  const props = useProps("FileInput", defaultProps$E, _props);
  const {
    unstyled,
    vars,
    onChange,
    value,
    defaultValue,
    multiple,
    accept,
    name,
    form,
    valueComponent: ValueComponent,
    clearable,
    clearButtonProps,
    readOnly,
    capture,
    fileInputProps,
    rightSection,
    size: size2,
    placeholder,
    component,
    resetRef: resetRefProp,
    classNames,
    styles,
    attributes,
    ...others
  } = props;
  const resetRef = reactExports.useRef(null);
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    classNames,
    styles,
    props
  });
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    onChange,
    finalValue: multiple ? [] : null
  });
  const hasValue = Array.isArray(_value) ? _value.length !== 0 : _value !== null;
  const _rightSection = rightSection || (clearable && hasValue && !readOnly ? /* @__PURE__ */ jsxRuntimeExports.jsx(
    CloseButton,
    {
      ...clearButtonProps,
      variant: "subtle",
      onClick: () => setValue(multiple ? [] : null),
      size: size2,
      unstyled
    }
  ) : null);
  reactExports.useEffect(() => {
    if (Array.isArray(_value) && _value.length === 0 || _value === null) {
      resetRef.current?.();
    }
  }, [_value]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    FileButton,
    {
      onChange: setValue,
      multiple,
      accept,
      name,
      form,
      resetRef: useMergedRef(resetRef, resetRefProp),
      disabled: readOnly,
      capture,
      inputProps: fileInputProps,
      children: (fileButtonProps) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        InputBase,
        {
          component: component || "button",
          ref,
          rightSection: _rightSection,
          ...fileButtonProps,
          ...others,
          __staticSelector: "FileInput",
          multiline: true,
          type: "button",
          pointer: true,
          __stylesApiProps: props,
          unstyled,
          size: size2,
          classNames,
          styles,
          attributes,
          children: !hasValue ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input.Placeholder,
            {
              __staticSelector: "FileInput",
              classNames: resolvedClassNames,
              styles: resolvedStyles,
              attributes,
              children: placeholder
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(ValueComponent, { value: _value })
        }
      )
    }
  );
});
_FileInput.classes = InputBase.classes;
_FileInput.displayName = "@mantine/core/FileInput";
const FileInput = _FileInput;
const [GridProvider, useGridContext] = createSafeContext(
  "Grid component was not found in tree"
);
var classes$r = { "container": "m_8478a6da", "root": "m_410352e9", "inner": "m_dee7bd2f", "col": "m_96bdd299" };
const getColumnFlexBasis = (colSpan, columns) => {
  if (colSpan === "content") {
    return "auto";
  }
  if (colSpan === "auto") {
    return "0rem";
  }
  return colSpan ? `${100 / (columns / colSpan)}%` : void 0;
};
const getColumnMaxWidth = (colSpan, columns, grow) => {
  if (grow || colSpan === "auto") {
    return "100%";
  }
  if (colSpan === "content") {
    return "unset";
  }
  return getColumnFlexBasis(colSpan, columns);
};
const getColumnFlexGrow = (colSpan, grow) => {
  if (!colSpan) {
    return void 0;
  }
  return colSpan === "auto" || grow ? "1" : "auto";
};
const getColumnOffset = (offset2, columns) => offset2 === 0 ? "0" : offset2 ? `${100 / (columns / offset2)}%` : void 0;
function GridColVariables({ span, order, offset: offset2, selector }) {
  const theme = useMantineTheme();
  const ctx = useGridContext();
  const _breakpoints = ctx.breakpoints || theme.breakpoints;
  const baseValue = getBaseValue$1(span);
  const baseSpan = baseValue === void 0 ? 12 : getBaseValue$1(span);
  const baseStyles = filterProps({
    "--col-order": getBaseValue$1(order)?.toString(),
    "--col-flex-grow": getColumnFlexGrow(baseSpan, ctx.grow),
    "--col-flex-basis": getColumnFlexBasis(baseSpan, ctx.columns),
    "--col-width": baseSpan === "content" ? "auto" : void 0,
    "--col-max-width": getColumnMaxWidth(baseSpan, ctx.columns, ctx.grow),
    "--col-offset": getColumnOffset(getBaseValue$1(offset2), ctx.columns)
  });
  const queries = keys(_breakpoints).reduce(
    (acc, breakpoint) => {
      if (!acc[breakpoint]) {
        acc[breakpoint] = {};
      }
      if (typeof order === "object" && order[breakpoint] !== void 0) {
        acc[breakpoint]["--col-order"] = order[breakpoint]?.toString();
      }
      if (typeof span === "object" && span[breakpoint] !== void 0) {
        acc[breakpoint]["--col-flex-grow"] = getColumnFlexGrow(span[breakpoint], ctx.grow);
        acc[breakpoint]["--col-flex-basis"] = getColumnFlexBasis(span[breakpoint], ctx.columns);
        acc[breakpoint]["--col-width"] = span[breakpoint] === "content" ? "auto" : void 0;
        acc[breakpoint]["--col-max-width"] = getColumnMaxWidth(
          span[breakpoint],
          ctx.columns,
          ctx.grow
        );
      }
      if (typeof offset2 === "object" && offset2[breakpoint] !== void 0) {
        acc[breakpoint]["--col-offset"] = getColumnOffset(offset2[breakpoint], ctx.columns);
      }
      return acc;
    },
    {}
  );
  const sortedBreakpoints = getSortedBreakpoints(keys(queries), _breakpoints).filter(
    (breakpoint) => keys(queries[breakpoint.value]).length > 0
  );
  const values2 = sortedBreakpoints.map((breakpoint) => ({
    query: ctx.type === "container" ? `mantine-grid (min-width: ${_breakpoints[breakpoint.value]})` : `(min-width: ${_breakpoints[breakpoint.value]})`,
    styles: queries[breakpoint.value]
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    InlineStyles,
    {
      styles: baseStyles,
      media: ctx.type === "container" ? void 0 : values2,
      container: ctx.type === "container" ? values2 : void 0,
      selector
    }
  );
}
const defaultProps$D = {
  span: 12
};
const GridCol = factory((_props, ref) => {
  const props = useProps("GridCol", defaultProps$D, _props);
  const { classNames, className, style, styles, vars, span, order, offset: offset2, ...others } = props;
  const ctx = useGridContext();
  const responsiveClassName = useRandomClassName();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      GridColVariables,
      {
        selector: `.${responsiveClassName}`,
        span,
        order,
        offset: offset2
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Box,
      {
        ref,
        ...ctx.getStyles("col", {
          className: clsx(className, responsiveClassName),
          style,
          classNames,
          styles
        }),
        ...others
      }
    )
  ] });
});
GridCol.classes = classes$r;
GridCol.displayName = "@mantine/core/GridCol";
function GridVariables({ gutter, selector, breakpoints, type }) {
  const theme = useMantineTheme();
  const _breakpoints = breakpoints || theme.breakpoints;
  const baseStyles = filterProps({
    "--grid-gutter": getSpacing(getBaseValue$1(gutter))
  });
  const queries = keys(_breakpoints).reduce(
    (acc, breakpoint) => {
      if (!acc[breakpoint]) {
        acc[breakpoint] = {};
      }
      if (typeof gutter === "object" && gutter[breakpoint] !== void 0) {
        acc[breakpoint]["--grid-gutter"] = getSpacing(gutter[breakpoint]);
      }
      return acc;
    },
    {}
  );
  const sortedBreakpoints = getSortedBreakpoints(keys(queries), _breakpoints).filter(
    (breakpoint) => keys(queries[breakpoint.value]).length > 0
  );
  const values2 = sortedBreakpoints.map((breakpoint) => ({
    query: type === "container" ? `mantine-grid (min-width: ${_breakpoints[breakpoint.value]})` : `(min-width: ${_breakpoints[breakpoint.value]})`,
    styles: queries[breakpoint.value]
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    InlineStyles,
    {
      styles: baseStyles,
      media: type === "container" ? void 0 : values2,
      container: type === "container" ? values2 : void 0,
      selector
    }
  );
}
const defaultProps$C = {
  gutter: "md",
  grow: false,
  columns: 12
};
const varsResolver$r = createVarsResolver((_, { justify, align, overflow }) => ({
  root: {
    "--grid-justify": justify,
    "--grid-align": align,
    "--grid-overflow": overflow
  }
}));
const Grid = factory((_props, ref) => {
  const props = useProps("Grid", defaultProps$C, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    grow,
    gutter,
    columns,
    align,
    justify,
    children,
    breakpoints,
    type,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Grid",
    classes: classes$r,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$r
  });
  const responsiveClassName = useRandomClassName();
  if (type === "container" && breakpoints) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(GridProvider, { value: { getStyles, grow, columns, breakpoints, type }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GridVariables, { selector: `.${responsiveClassName}`, ...props }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...getStyles("container"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ref, ...getStyles("root", { className: responsiveClassName }), ...others, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...getStyles("inner"), children }) }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GridProvider, { value: { getStyles, grow, columns, breakpoints, type }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(GridVariables, { selector: `.${responsiveClassName}`, ...props }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ref, ...getStyles("root", { className: responsiveClassName }), ...others, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...getStyles("inner"), children }) })
  ] });
});
Grid.classes = classes$r;
Grid.displayName = "@mantine/core/Grid";
Grid.Col = GridCol;
const defaultProps$B = {
  size: "sm"
};
const Textarea = factory((props, ref) => {
  const { autosize, maxRows, minRows, __staticSelector, resize, ...others } = useProps(
    "Textarea",
    defaultProps$B,
    props
  );
  const shouldAutosize = autosize && getEnv() !== "test";
  const autosizeProps = shouldAutosize ? { maxRows, minRows } : {};
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    InputBase,
    {
      component: shouldAutosize ? reactTextareaAutosize_cjs_defaultExports._default : "textarea",
      ref,
      ...others,
      __staticSelector: __staticSelector || "Textarea",
      multiline: true,
      "data-no-overflow": autosize && maxRows === void 0 || void 0,
      __vars: { "--input-resize": resize },
      ...autosizeProps
    }
  );
});
Textarea.classes = InputBase.classes;
Textarea.displayName = "@mantine/core/Textarea";
const [ListProvider, useListContext] = createSafeContext(
  "List component was not found in tree"
);
var classes$q = { "root": "m_abbac491", "item": "m_abb6bec2", "itemWrapper": "m_75cd9f71", "itemIcon": "m_60f83e5b" };
const ListItem = factory((_props, ref) => {
  const props = useProps("ListItem", null, _props);
  const { classNames, className, style, styles, vars, icon, children, mod, ...others } = props;
  const ctx = useListContext();
  const _icon = icon || ctx.icon;
  const stylesApiProps = { classNames, styles };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ...ctx.getStyles("item", { ...stylesApiProps, className, style }),
      component: "li",
      mod: [{ "with-icon": !!_icon, centered: ctx.center }, mod],
      ref,
      ...others,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ...ctx.getStyles("itemWrapper", stylesApiProps), children: [
        _icon && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...ctx.getStyles("itemIcon", stylesApiProps), children: _icon }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...ctx.getStyles("itemLabel", stylesApiProps), children })
      ] })
    }
  );
});
ListItem.classes = classes$q;
ListItem.displayName = "@mantine/core/ListItem";
const defaultProps$A = {
  type: "unordered"
};
const varsResolver$q = createVarsResolver((_, { size: size2, spacing }) => ({
  root: {
    "--list-fz": getFontSize(size2),
    "--list-lh": getLineHeight(size2),
    "--list-spacing": getSpacing(spacing)
  }
}));
const List = factory((_props, ref) => {
  const props = useProps("List", defaultProps$A, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    children,
    type,
    withPadding,
    icon,
    spacing,
    center,
    listStyleType,
    mod,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "List",
    classes: classes$q,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$q
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ListProvider, { value: { center, icon, getStyles }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ...getStyles("root", { style: { listStyleType } }),
      component: type === "unordered" ? "ul" : "ol",
      mod: [{ "with-padding": withPadding, type: icon ? "none" : listStyleType }, mod],
      ref,
      ...others,
      children
    }
  ) });
});
List.classes = classes$q;
List.displayName = "@mantine/core/List";
List.Item = ListItem;
var classes$p = { "root": "m_6e45937b", "loader": "m_e8eb006c", "overlay": "m_df587f17" };
const defaultProps$z = {
  transitionProps: { transition: "fade", duration: 0 },
  overlayProps: { backgroundOpacity: 0.75 },
  zIndex: getDefaultZIndex("overlay")
};
const varsResolver$p = createVarsResolver((_, { zIndex }) => ({
  root: {
    "--lo-z-index": zIndex?.toString()
  }
}));
const LoadingOverlay = factory((_props, ref) => {
  const props = useProps("LoadingOverlay", defaultProps$z, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    transitionProps,
    loaderProps,
    overlayProps,
    visible,
    zIndex,
    attributes,
    ...others
  } = props;
  const theme = useMantineTheme();
  const getStyles = useStyles({
    name: "LoadingOverlay",
    classes: classes$p,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$p
  });
  const _overlayProps = { ...defaultProps$z.overlayProps, ...overlayProps };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Transition, { transition: "fade", ...transitionProps, mounted: !!visible, children: (transitionStyles) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { ...getStyles("root", { style: transitionStyles }), ref, ...others, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { ...getStyles("loader"), unstyled, ...loaderProps }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Overlay,
      {
        ..._overlayProps,
        ...getStyles("overlay"),
        darkHidden: true,
        unstyled,
        color: overlayProps?.color || theme.white
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Overlay,
      {
        ..._overlayProps,
        ...getStyles("overlay"),
        lightHidden: true,
        unstyled,
        color: overlayProps?.color || theme.colors.dark[5]
      }
    )
  ] }) });
});
LoadingOverlay.classes = classes$p;
LoadingOverlay.displayName = "@mantine/core/LoadingOverlay";
const [MenuContextProvider, useMenuContext] = createSafeContext(
  "Menu component was not found in the tree"
);
var classes$o = { "dropdown": "m_dc9b7c9f", "label": "m_9bfac126", "divider": "m_efdf90cb", "item": "m_99ac2aa1", "itemLabel": "m_5476e0d3", "itemSection": "m_8b75e504", "chevron": "m_b85b0bed" };
const MenuDivider = factory((props, ref) => {
  const { classNames, className, style, styles, vars, ...others } = useProps(
    "MenuDivider",
    null,
    props
  );
  const ctx = useMenuContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ref,
      ...ctx.getStyles("divider", { className, style, styles, classNames }),
      ...others
    }
  );
});
MenuDivider.classes = classes$o;
MenuDivider.displayName = "@mantine/core/MenuDivider";
const MenuDropdown = factory((props, ref) => {
  const {
    classNames,
    className,
    style,
    styles,
    vars,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    children,
    ...others
  } = useProps("MenuDropdown", null, props);
  const wrapperRef = reactExports.useRef(null);
  const ctx = useMenuContext();
  const handleKeyDown = createEventHandler(onKeyDown, (event) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault();
      wrapperRef.current?.querySelectorAll("[data-menu-item]:not(:disabled)")[0]?.focus();
    }
  });
  const handleMouseEnter = createEventHandler(
    onMouseEnter,
    () => (ctx.trigger === "hover" || ctx.trigger === "click-hover") && ctx.openDropdown()
  );
  const handleMouseLeave = createEventHandler(
    onMouseLeave,
    () => (ctx.trigger === "hover" || ctx.trigger === "click-hover") && ctx.closeDropdown()
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Popover.Dropdown,
    {
      ...others,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      role: "menu",
      "aria-orientation": "vertical",
      ref: useMergedRef(ref, wrapperRef),
      ...ctx.getStyles("dropdown", {
        className,
        style,
        styles,
        classNames,
        withStaticClass: false
      }),
      tabIndex: -1,
      "data-menu-dropdown": true,
      onKeyDown: handleKeyDown,
      children: [
        ctx.withInitialFocusPlaceholder && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { tabIndex: -1, "data-autofocus": true, "data-mantine-stop-propagation": true, style: { outline: 0 } }),
        children
      ]
    }
  );
});
MenuDropdown.classes = classes$o;
MenuDropdown.displayName = "@mantine/core/MenuDropdown";
const [SubMenuProvider, useSubMenuContext] = createOptionalContext();
const MenuItem = polymorphicFactory((props, ref) => {
  const {
    classNames,
    className,
    style,
    styles,
    vars,
    color,
    closeMenuOnClick,
    leftSection,
    rightSection,
    children,
    disabled,
    "data-disabled": dataDisabled,
    ...others
  } = useProps("MenuItem", null, props);
  const ctx = useMenuContext();
  const subCtx = useSubMenuContext();
  const theme = useMantineTheme();
  const { dir } = useDirection();
  const itemRef = reactExports.useRef(null);
  const _others = others;
  const handleClick = createEventHandler(_others.onClick, () => {
    if (dataDisabled) {
      return;
    }
    if (typeof closeMenuOnClick === "boolean") {
      closeMenuOnClick && ctx.closeDropdownImmediately();
    } else {
      ctx.closeOnItemClick && ctx.closeDropdownImmediately();
    }
  });
  const colors = color ? theme.variantColorResolver({ color, theme, variant: "light" }) : void 0;
  const parsedThemeColor = color ? parseThemeColor({ color, theme }) : null;
  const handleKeydown = createEventHandler(_others.onKeyDown, (event) => {
    if (event.key === "ArrowLeft" && subCtx) {
      subCtx.close();
      subCtx.focusParentItem();
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    UnstyledButton,
    {
      onMouseDown: (event) => event.preventDefault(),
      ...others,
      unstyled: ctx.unstyled,
      tabIndex: ctx.menuItemTabIndex,
      ...ctx.getStyles("item", { className, style, styles, classNames }),
      ref: useMergedRef(itemRef, ref),
      role: "menuitem",
      disabled,
      "data-menu-item": true,
      "data-disabled": disabled || dataDisabled || void 0,
      "data-mantine-stop-propagation": true,
      onClick: handleClick,
      onKeyDown: createScopedKeydownHandler({
        siblingSelector: "[data-menu-item]:not([data-disabled])",
        parentSelector: "[data-menu-dropdown]",
        activateOnFocus: false,
        loop: ctx.loop,
        dir,
        orientation: "vertical",
        onKeyDown: handleKeydown
      }),
      __vars: {
        "--menu-item-color": parsedThemeColor?.isThemeColor && parsedThemeColor?.shade === void 0 ? `var(--mantine-color-${parsedThemeColor.color}-6)` : colors?.color,
        "--menu-item-hover": colors?.hover
      },
      children: [
        leftSection && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...ctx.getStyles("itemSection", { styles, classNames }), "data-position": "left", children: leftSection }),
        children && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...ctx.getStyles("itemLabel", { styles, classNames }), children }),
        rightSection && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...ctx.getStyles("itemSection", { styles, classNames }), "data-position": "right", children: rightSection })
      ]
    }
  );
});
MenuItem.classes = classes$o;
MenuItem.displayName = "@mantine/core/MenuItem";
const MenuLabel = factory((props, ref) => {
  const { classNames, className, style, styles, vars, ...others } = useProps(
    "MenuLabel",
    null,
    props
  );
  const ctx = useMenuContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ref,
      ...ctx.getStyles("label", { className, style, styles, classNames }),
      ...others
    }
  );
});
MenuLabel.classes = classes$o;
MenuLabel.displayName = "@mantine/core/MenuLabel";
const MenuSubDropdown = factory((props, ref) => {
  const {
    classNames,
    className,
    style,
    styles,
    vars,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    children,
    ...others
  } = useProps("MenuSubDropdown", null, props);
  const wrapperRef = reactExports.useRef(null);
  const ctx = useMenuContext();
  const subCtx = useSubMenuContext();
  const handleMouseEnter = createEventHandler(onMouseEnter, subCtx?.open);
  const handleMouseLeave = createEventHandler(onMouseLeave, subCtx?.close);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Popover.Dropdown,
    {
      ...others,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      role: "menu",
      "aria-orientation": "vertical",
      ref: useMergedRef(ref, wrapperRef),
      ...ctx.getStyles("dropdown", {
        className,
        style,
        styles,
        classNames,
        withStaticClass: false
      }),
      tabIndex: -1,
      "data-menu-dropdown": true,
      children
    }
  );
});
MenuSubDropdown.classes = classes$o;
MenuSubDropdown.displayName = "@mantine/core/MenuSubDropdown";
const MenuSubItem = polymorphicFactory((props, ref) => {
  const {
    classNames,
    className,
    style,
    styles,
    vars,
    color,
    leftSection,
    rightSection,
    children,
    disabled,
    "data-disabled": dataDisabled,
    closeMenuOnClick,
    ...others
  } = useProps("MenuSubItem", null, props);
  const ctx = useMenuContext();
  const subCtx = useSubMenuContext();
  const theme = useMantineTheme();
  const { dir } = useDirection();
  const itemRef = reactExports.useRef(null);
  const _others = others;
  const colors = color ? theme.variantColorResolver({ color, theme, variant: "light" }) : void 0;
  const parsedThemeColor = color ? parseThemeColor({ color, theme }) : null;
  const handleKeydown = createEventHandler(_others.onKeyDown, (event) => {
    if (event.key === "ArrowRight") {
      subCtx?.open();
      subCtx?.focusFirstItem();
    }
    if (event.key === "ArrowLeft" && subCtx?.parentContext) {
      subCtx.parentContext.close();
      subCtx.parentContext.focusParentItem();
    }
  });
  const handleClick = createEventHandler(_others.onClick, () => {
    if (!dataDisabled && closeMenuOnClick) {
      ctx.closeDropdownImmediately();
    }
  });
  const handleMouseEnter = createEventHandler(_others.onMouseEnter, subCtx?.open);
  const handleMouseLeave = createEventHandler(_others.onMouseLeave, subCtx?.close);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    UnstyledButton,
    {
      onMouseDown: (event) => event.preventDefault(),
      ...others,
      unstyled: ctx.unstyled,
      tabIndex: ctx.menuItemTabIndex,
      ...ctx.getStyles("item", { className, style, styles, classNames }),
      ref: useMergedRef(itemRef, ref),
      role: "menuitem",
      disabled,
      "data-menu-item": true,
      "data-sub-menu-item": true,
      "data-disabled": disabled || dataDisabled || void 0,
      "data-mantine-stop-propagation": true,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onClick: handleClick,
      onKeyDown: createScopedKeydownHandler({
        siblingSelector: "[data-menu-item]:not([data-disabled])",
        parentSelector: "[data-menu-dropdown]",
        activateOnFocus: false,
        loop: ctx.loop,
        dir,
        orientation: "vertical",
        onKeyDown: handleKeydown
      }),
      __vars: {
        "--menu-item-color": parsedThemeColor?.isThemeColor && parsedThemeColor?.shade === void 0 ? `var(--mantine-color-${parsedThemeColor.color}-6)` : colors?.color,
        "--menu-item-hover": colors?.hover
      },
      children: [
        leftSection && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...ctx.getStyles("itemSection", { styles, classNames }), "data-position": "left", children: leftSection }),
        children && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...ctx.getStyles("itemLabel", { styles, classNames }), children }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...ctx.getStyles("itemSection", { styles, classNames }), "data-position": "right", children: rightSection || /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionChevron, { ...ctx.getStyles("chevron"), size: 14 }) })
      ]
    }
  );
});
MenuSubItem.classes = classes$o;
MenuSubItem.displayName = "@mantine/core/MenuSubItem";
function MenuSubTarget({ children, refProp }) {
  if (!isElement(children)) {
    throw new Error(
      "Menu.Sub.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  }
  useMenuContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Popover.Target, { refProp, popupType: "menu", children });
}
MenuSubTarget.displayName = "@mantine/core/MenuSubTarget";
const defaultProps$y = {
  offset: 0,
  position: "right-start",
  transitionProps: { duration: 0 },
  openDelay: 0,
  middlewares: {
    shift: {
      // Enable crossAxis shift to keep submenu dropdown within viewport bounds when positioned horizontally
      crossAxis: true
    }
  }
};
function MenuSub(_props) {
  const { children, closeDelay, openDelay, ...others } = useProps("MenuSub", defaultProps$y, _props);
  const id = useId();
  const [opened, { open, close }] = useDisclosure(false);
  const ctx = useSubMenuContext();
  const { openDropdown, closeDropdown } = useDelayedHover({
    open,
    close,
    closeDelay,
    openDelay
  });
  const focusFirstItem = () => window.setTimeout(() => {
    document.getElementById(`${id}-dropdown`)?.querySelectorAll("[data-menu-item]:not([data-disabled])")[0]?.focus();
  }, 16);
  const focusParentItem = () => window.setTimeout(() => {
    document.getElementById(`${id}-target`)?.focus();
  }, 16);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    SubMenuProvider,
    {
      value: {
        opened,
        close: closeDropdown,
        open: openDropdown,
        focusFirstItem,
        focusParentItem,
        parentContext: ctx
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Popover, { opened, withinPortal: false, withArrow: false, id, ...others, children })
    }
  );
}
MenuSub.extend = (input) => input;
MenuSub.displayName = "@mantine/core/MenuSub";
MenuSub.Target = MenuSubTarget;
MenuSub.Dropdown = MenuSubDropdown;
MenuSub.Item = MenuSubItem;
const defaultProps$x = {
  refProp: "ref"
};
const MenuTarget = reactExports.forwardRef((props, ref) => {
  const { children, refProp, ...others } = useProps("MenuTarget", defaultProps$x, props);
  const child = getSingleElementChild(children);
  if (!child) {
    throw new Error(
      "Menu.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported"
    );
  }
  const ctx = useMenuContext();
  const _childProps = child.props;
  const onClick = createEventHandler(_childProps.onClick, () => {
    if (ctx.trigger === "click") {
      ctx.toggleDropdown();
    } else if (ctx.trigger === "click-hover") {
      ctx.setOpenedViaClick(true);
      if (!ctx.opened) {
        ctx.openDropdown();
      }
    }
  });
  const onMouseEnter = createEventHandler(
    _childProps.onMouseEnter,
    () => (ctx.trigger === "hover" || ctx.trigger === "click-hover") && ctx.openDropdown()
  );
  const onMouseLeave = createEventHandler(_childProps.onMouseLeave, () => {
    if (ctx.trigger === "hover") {
      ctx.closeDropdown();
    } else if (ctx.trigger === "click-hover" && !ctx.openedViaClick) {
      ctx.closeDropdown();
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Popover.Target, { refProp, popupType: "menu", ref, ...others, children: reactExports.cloneElement(child, {
    onClick,
    onMouseEnter,
    onMouseLeave,
    "data-expanded": ctx.opened ? true : void 0
  }) });
});
MenuTarget.displayName = "@mantine/core/MenuTarget";
const defaultProps$w = {
  trapFocus: true,
  closeOnItemClick: true,
  withInitialFocusPlaceholder: true,
  clickOutsideEvents: ["mousedown", "touchstart", "keydown"],
  loop: true,
  trigger: "click",
  openDelay: 0,
  closeDelay: 100,
  menuItemTabIndex: -1
};
function Menu(_props) {
  const props = useProps("Menu", defaultProps$w, _props);
  const {
    children,
    onOpen,
    onClose,
    opened,
    defaultOpened,
    trapFocus,
    onChange,
    closeOnItemClick,
    loop,
    closeOnEscape: closeOnEscape2,
    trigger,
    openDelay,
    closeDelay,
    classNames,
    styles,
    unstyled,
    variant,
    vars,
    menuItemTabIndex,
    keepMounted,
    withInitialFocusPlaceholder,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Menu",
    classes: classes$o,
    props,
    classNames,
    styles,
    unstyled,
    attributes
  });
  const [_opened, setOpened] = useUncontrolled({
    value: opened,
    defaultValue: defaultOpened,
    finalValue: false,
    onChange
  });
  const [openedViaClick, setOpenedViaClick] = reactExports.useState(false);
  const close = () => {
    setOpened(false);
    setOpenedViaClick(false);
    _opened && onClose?.();
  };
  const open = () => {
    setOpened(true);
    !_opened && onOpen?.();
  };
  const toggleDropdown = () => {
    _opened ? close() : open();
  };
  const { openDropdown, closeDropdown } = useDelayedHover({ open, close, closeDelay, openDelay });
  const getItemIndex = (node) => getContextItemIndex("[data-menu-item]", "[data-menu-dropdown]", node);
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    classNames,
    styles,
    props
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    MenuContextProvider,
    {
      value: {
        getStyles,
        opened: _opened,
        toggleDropdown,
        getItemIndex,
        openedViaClick,
        setOpenedViaClick,
        closeOnItemClick,
        closeDropdown: trigger === "click" ? close : closeDropdown,
        openDropdown: trigger === "click" ? open : openDropdown,
        closeDropdownImmediately: close,
        loop,
        trigger,
        unstyled,
        menuItemTabIndex,
        withInitialFocusPlaceholder
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Popover,
        {
          returnFocus: true,
          ...others,
          opened: _opened,
          onChange: toggleDropdown,
          defaultOpened,
          trapFocus: keepMounted ? false : trapFocus,
          closeOnEscape: closeOnEscape2,
          __staticSelector: "Menu",
          classNames: resolvedClassNames,
          styles: resolvedStyles,
          unstyled,
          variant,
          keepMounted,
          children
        }
      )
    }
  );
}
Menu.extend = (input) => input;
Menu.withProps = getWithProps(Menu);
Menu.classes = classes$o;
Menu.displayName = "@mantine/core/Menu";
Menu.Item = MenuItem;
Menu.Label = MenuLabel;
Menu.Dropdown = MenuDropdown;
Menu.Target = MenuTarget;
Menu.Divider = MenuDivider;
Menu.Sub = MenuSub;
var classes$n = { "root": "m_9df02822", "content": "m_54c44539", "inner": "m_1f958f16", "header": "m_d0e2b9cd" };
const [ModalProvider, useModalContext] = createSafeContext(
  "Modal component was not found in tree"
);
const ModalBody = factory((_props, ref) => {
  const props = useProps("ModalBody", null, _props);
  const { classNames, className, style, styles, vars, ...others } = props;
  const ctx = useModalContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ModalBaseBody,
    {
      ref,
      ...ctx.getStyles("body", { classNames, style, styles, className }),
      ...others
    }
  );
});
ModalBody.classes = classes$n;
ModalBody.displayName = "@mantine/core/ModalBody";
const ModalCloseButton = factory((_props, ref) => {
  const props = useProps("ModalCloseButton", null, _props);
  const { classNames, className, style, styles, vars, ...others } = props;
  const ctx = useModalContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ModalBaseCloseButton,
    {
      ref,
      ...ctx.getStyles("close", { classNames, style, styles, className }),
      ...others
    }
  );
});
ModalCloseButton.classes = classes$n;
ModalCloseButton.displayName = "@mantine/core/ModalCloseButton";
const ModalContent = factory((_props, ref) => {
  const props = useProps("ModalContent", null, _props);
  const { classNames, className, style, styles, vars, children, __hidden, ...others } = props;
  const ctx = useModalContext();
  const Scroll = ctx.scrollAreaComponent || NativeScrollArea;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ModalBaseContent,
    {
      ...ctx.getStyles("content", { className, style, styles, classNames }),
      innerProps: ctx.getStyles("inner", { className, style, styles, classNames }),
      "data-full-screen": ctx.fullScreen || void 0,
      "data-modal-content": true,
      "data-hidden": __hidden || void 0,
      ref,
      ...others,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Scroll,
        {
          style: {
            maxHeight: ctx.fullScreen ? "100dvh" : `calc(100dvh - (${rem(ctx.yOffset)} * 2))`
          },
          children
        }
      )
    }
  );
});
ModalContent.classes = classes$n;
ModalContent.displayName = "@mantine/core/ModalContent";
const ModalHeader = factory((_props, ref) => {
  const props = useProps("ModalHeader", null, _props);
  const { classNames, className, style, styles, vars, ...others } = props;
  const ctx = useModalContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ModalBaseHeader,
    {
      ref,
      ...ctx.getStyles("header", { classNames, style, styles, className }),
      ...others
    }
  );
});
ModalHeader.classes = classes$n;
ModalHeader.displayName = "@mantine/core/ModalHeader";
const ModalOverlay = factory((_props, ref) => {
  const props = useProps("ModalOverlay", null, _props);
  const { classNames, className, style, styles, vars, ...others } = props;
  const ctx = useModalContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ModalBaseOverlay,
    {
      ref,
      ...ctx.getStyles("overlay", { classNames, style, styles, className }),
      ...others
    }
  );
});
ModalOverlay.classes = classes$n;
ModalOverlay.displayName = "@mantine/core/ModalOverlay";
const defaultProps$v = {
  __staticSelector: "Modal",
  closeOnClickOutside: true,
  withinPortal: true,
  lockScroll: true,
  trapFocus: true,
  returnFocus: true,
  closeOnEscape: true,
  keepMounted: false,
  zIndex: getDefaultZIndex("modal"),
  transitionProps: { duration: 200, transition: "fade-down" },
  yOffset: "5dvh"
};
const varsResolver$o = createVarsResolver(
  (_, { radius, size: size2, yOffset, xOffset }) => ({
    root: {
      "--modal-radius": radius === void 0 ? void 0 : getRadius(radius),
      "--modal-size": getSize(size2, "modal-size"),
      "--modal-y-offset": rem(yOffset),
      "--modal-x-offset": rem(xOffset)
    }
  })
);
const ModalRoot = factory((_props, ref) => {
  const props = useProps("ModalRoot", defaultProps$v, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    yOffset,
    scrollAreaComponent,
    radius,
    fullScreen,
    centered,
    xOffset,
    __staticSelector,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: __staticSelector,
    classes: classes$n,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$o
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ModalProvider, { value: { yOffset, scrollAreaComponent, getStyles, fullScreen }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    ModalBase,
    {
      ref,
      ...getStyles("root"),
      "data-full-screen": fullScreen || void 0,
      "data-centered": centered || void 0,
      "data-offset-scrollbars": scrollAreaComponent === ScrollArea.Autosize || void 0,
      unstyled,
      ...others
    }
  ) });
});
ModalRoot.classes = classes$n;
ModalRoot.displayName = "@mantine/core/ModalRoot";
const [ModalStackProvider, useModalStackContext] = createOptionalContext();
function ModalStack({ children }) {
  const [stack, setStack] = reactExports.useState([]);
  const [maxZIndex, setMaxZIndex] = reactExports.useState(getDefaultZIndex("modal"));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ModalStackProvider,
    {
      value: {
        stack,
        addModal: (id, zIndex) => {
          setStack((current) => [.../* @__PURE__ */ new Set([...current, id])]);
          setMaxZIndex(
            (current) => typeof zIndex === "number" && typeof current === "number" ? Math.max(current, zIndex) : current
          );
        },
        removeModal: (id) => setStack((current) => current.filter((currentId) => currentId !== id)),
        getZIndex: (id) => `calc(${maxZIndex} + ${stack.indexOf(id)} + 1)`,
        currentId: stack[stack.length - 1],
        maxZIndex
      },
      children
    }
  );
}
ModalStack.displayName = "@mantine/core/ModalStack";
const ModalTitle = factory((_props, ref) => {
  const props = useProps("ModalTitle", null, _props);
  const { classNames, className, style, styles, vars, ...others } = props;
  const ctx = useModalContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ModalBaseTitle,
    {
      ref,
      ...ctx.getStyles("title", { classNames, style, styles, className }),
      ...others
    }
  );
});
ModalTitle.classes = classes$n;
ModalTitle.displayName = "@mantine/core/ModalTitle";
const defaultProps$u = {
  closeOnClickOutside: true,
  withinPortal: true,
  lockScroll: true,
  trapFocus: true,
  returnFocus: true,
  closeOnEscape: true,
  keepMounted: false,
  zIndex: getDefaultZIndex("modal"),
  transitionProps: { duration: 200, transition: "fade-down" },
  withOverlay: true,
  withCloseButton: true
};
const Modal = factory((_props, ref) => {
  const {
    title,
    withOverlay,
    overlayProps,
    withCloseButton,
    closeButtonProps,
    children,
    radius,
    opened,
    stackId,
    zIndex,
    ...others
  } = useProps("Modal", defaultProps$u, _props);
  const ctx = useModalStackContext();
  const hasHeader = !!title || withCloseButton;
  const stackProps = ctx && stackId ? {
    closeOnEscape: ctx.currentId === stackId,
    trapFocus: ctx.currentId === stackId,
    zIndex: ctx.getZIndex(stackId)
  } : {};
  const overlayVisible = withOverlay === false ? false : stackId && ctx ? ctx.currentId === stackId : opened;
  reactExports.useEffect(() => {
    if (ctx && stackId) {
      opened ? ctx.addModal(stackId, zIndex || getDefaultZIndex("modal")) : ctx.removeModal(stackId);
    }
  }, [opened, stackId, zIndex]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    ModalRoot,
    {
      ref,
      radius,
      opened,
      zIndex: ctx && stackId ? ctx.getZIndex(stackId) : zIndex,
      ...others,
      ...stackProps,
      children: [
        withOverlay && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ModalOverlay,
          {
            visible: overlayVisible,
            transitionProps: ctx && stackId ? { duration: 0 } : void 0,
            ...overlayProps
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          ModalContent,
          {
            radius,
            __hidden: ctx && stackId && opened ? stackId !== ctx.currentId : false,
            children: [
              hasHeader && /* @__PURE__ */ jsxRuntimeExports.jsxs(ModalHeader, { children: [
                title && /* @__PURE__ */ jsxRuntimeExports.jsx(ModalTitle, { children: title }),
                withCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsx(ModalCloseButton, { ...closeButtonProps })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ModalBody, { children })
            ]
          }
        )
      ]
    }
  );
});
Modal.classes = classes$n;
Modal.displayName = "@mantine/core/Modal";
Modal.Root = ModalRoot;
Modal.Overlay = ModalOverlay;
Modal.Content = ModalContent;
Modal.Body = ModalBody;
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.CloseButton = ModalCloseButton;
Modal.Stack = ModalStack;
const [PillsInputProvider, usePillsInputContext] = createOptionalContext();
var classes$m = { "root": "m_7cda1cd6", "root--default": "m_44da308b", "root--contrast": "m_e3a01f8", "label": "m_1e0e6180", "remove": "m_ae386778", "group": "m_1dcfd90b" };
const [PillGroupProvider, usePillGroupContext] = createOptionalContext();
const varsResolver$n = createVarsResolver((_, { gap }, { size: size2 }) => ({
  group: {
    "--pg-gap": gap !== void 0 ? getSize(gap) : getSize(size2, "pg-gap")
  }
}));
const PillGroup = factory((_props, ref) => {
  const props = useProps("PillGroup", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    size: size2,
    disabled,
    attributes,
    ...others
  } = props;
  const pillsInputCtx = usePillsInputContext();
  const _size = pillsInputCtx?.size || size2 || void 0;
  const getStyles = useStyles({
    name: "PillGroup",
    classes: classes$m,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$n,
    stylesCtx: { size: _size },
    rootSelector: "group"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PillGroupProvider, { value: { size: _size, disabled }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ref, size: _size, ...getStyles("group"), ...others }) });
});
PillGroup.classes = classes$m;
PillGroup.displayName = "@mantine/core/PillGroup";
const defaultProps$t = {
  variant: "default"
};
const varsResolver$m = createVarsResolver((_, { radius }, { size: size2 }) => ({
  root: {
    "--pill-fz": getSize(size2, "pill-fz"),
    "--pill-height": getSize(size2, "pill-height"),
    "--pill-radius": radius === void 0 ? void 0 : getRadius(radius)
  }
}));
const Pill = factory((_props, ref) => {
  const props = useProps("Pill", defaultProps$t, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    variant,
    children,
    withRemoveButton,
    onRemove,
    removeButtonProps,
    radius,
    size: size2,
    disabled,
    mod,
    attributes,
    ...others
  } = props;
  const ctx = usePillGroupContext();
  const pillsInputCtx = usePillsInputContext();
  const _size = size2 || ctx?.size || void 0;
  const _variant = pillsInputCtx?.variant === "filled" ? "contrast" : variant || "default";
  const getStyles = useStyles({
    name: "Pill",
    classes: classes$m,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$m,
    stylesCtx: { size: _size }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Box,
    {
      component: "span",
      ref,
      variant: _variant,
      size: _size,
      ...getStyles("root", { variant: _variant }),
      mod: [
        { "with-remove": withRemoveButton && !disabled, disabled: disabled || ctx?.disabled },
        mod
      ],
      ...others,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...getStyles("label"), children }),
        withRemoveButton && /* @__PURE__ */ jsxRuntimeExports.jsx(
          CloseButton,
          {
            variant: "transparent",
            radius,
            tabIndex: -1,
            "aria-hidden": true,
            unstyled,
            ...removeButtonProps,
            ...getStyles("remove", {
              className: removeButtonProps?.className,
              style: removeButtonProps?.style
            }),
            onMouseDown: (event) => {
              event.preventDefault();
              event.stopPropagation();
              removeButtonProps?.onMouseDown?.(event);
            },
            onClick: (event) => {
              event.stopPropagation();
              onRemove?.();
              removeButtonProps?.onClick?.(event);
            }
          }
        )
      ]
    }
  );
});
Pill.classes = classes$m;
Pill.displayName = "@mantine/core/Pill";
Pill.Group = PillGroup;
var classes$l = { "field": "m_45c4369d" };
const defaultProps$s = {
  type: "visible"
};
const PillsInputField = factory((_props, ref) => {
  const props = useProps("PillsInputField", defaultProps$s, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    type,
    disabled,
    id,
    pointer,
    mod,
    attributes,
    ...others
  } = props;
  const ctx = usePillsInputContext();
  const inputWrapperCtx = useInputWrapperContext();
  const getStyles = useStyles({
    name: "PillsInputField",
    classes: classes$l,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    rootSelector: "field"
  });
  const _disabled = disabled || ctx?.disabled;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      component: "input",
      ref: useMergedRef(ref, ctx?.fieldRef),
      "data-type": type,
      disabled: _disabled,
      mod: [{ disabled: _disabled, pointer }, mod],
      ...getStyles("field"),
      ...others,
      id: inputWrapperCtx?.inputId || id,
      "aria-invalid": ctx?.hasError,
      "aria-describedby": inputWrapperCtx?.describedBy,
      type: "text",
      onMouseDown: (event) => !pointer && event.stopPropagation()
    }
  );
});
PillsInputField.classes = classes$l;
PillsInputField.displayName = "@mantine/core/PillsInputField";
const defaultProps$r = {
  size: "sm"
};
const PillsInput = factory((_props, ref) => {
  const props = useProps("PillsInput", defaultProps$r, _props);
  const {
    children,
    onMouseDown,
    onClick,
    size: size2,
    disabled,
    __staticSelector,
    error,
    variant,
    ...others
  } = props;
  const fieldRef = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PillsInputProvider, { value: { fieldRef, size: size2, disabled, hasError: !!error, variant }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    InputBase,
    {
      size: size2,
      error,
      variant,
      component: "div",
      ref,
      "data-no-overflow": true,
      onMouseDown: (event) => {
        event.preventDefault();
        onMouseDown?.(event);
        fieldRef.current?.focus();
      },
      onClick: (event) => {
        event.preventDefault();
        const fieldset = event.currentTarget.closest("fieldset");
        if (!fieldset?.disabled) {
          fieldRef.current?.focus();
          onClick?.(event);
        }
      },
      ...others,
      multiline: true,
      disabled,
      __staticSelector: __staticSelector || "PillsInput",
      withAria: false,
      children
    }
  ) });
});
PillsInput.displayName = "@mantine/core/PillsInput";
PillsInput.Field = PillsInputField;
var classes$k = { "root": "m_f0824112", "description": "m_57492dcc", "section": "m_690090b5", "label": "m_1f6ac4c4", "body": "m_f07af9d2", "children": "m_e17b862f", "chevron": "m_1fd8a00b" };
const varsResolver$l = createVarsResolver(
  (theme, { variant, color, childrenOffset, autoContrast }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      variant: variant || "light",
      autoContrast
    });
    return {
      root: {
        "--nl-bg": color || variant ? colors.background : void 0,
        "--nl-hover": color || variant ? colors.hover : void 0,
        "--nl-color": color || variant ? colors.color : void 0
      },
      children: {
        "--nl-offset": getSpacing(childrenOffset)
      }
    };
  }
);
const NavLink = polymorphicFactory((_props, ref) => {
  const props = useProps("NavLink", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    opened,
    defaultOpened,
    onChange,
    children,
    active,
    disabled,
    leftSection,
    rightSection,
    label,
    description,
    disableRightSectionRotation,
    noWrap,
    childrenOffset,
    autoContrast,
    mod,
    attributes,
    onClick,
    onKeyDown,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "NavLink",
    props,
    classes: classes$k,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$l
  });
  const [_opened, setOpened] = useUncontrolled({
    value: opened,
    defaultValue: defaultOpened,
    finalValue: false,
    onChange
  });
  const withChildren = !!children;
  const handleClick = (event) => {
    onClick?.(event);
    if (withChildren) {
      event.preventDefault();
      setOpened(!_opened);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      UnstyledButton,
      {
        ...getStyles("root"),
        component: "a",
        ref,
        onClick: handleClick,
        onKeyDown: (event) => {
          onKeyDown?.(event);
          if (event.nativeEvent.code === "Space" && withChildren) {
            event.preventDefault();
            setOpened(!_opened);
          }
        },
        unstyled,
        mod: [{ disabled, active, expanded: _opened }, mod],
        ...others,
        children: [
          leftSection && /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "span", ...getStyles("section"), mod: { position: "left" }, children: leftSection }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { ...getStyles("body"), mod: { "no-wrap": noWrap }, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "span", ...getStyles("label"), children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "span", mod: { active }, ...getStyles("description"), children: description })
          ] }),
          (withChildren || rightSection !== void 0) && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Box,
            {
              ...getStyles("section"),
              component: "span",
              mod: { rotate: _opened && !disableRightSectionRotation, position: "right" },
              children: withChildren ? rightSection !== void 0 ? rightSection : /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionChevron, { ...getStyles("chevron") }) : rightSection
            }
          )
        ]
      }
    ),
    withChildren && /* @__PURE__ */ jsxRuntimeExports.jsx(Collapse, { in: _opened, ...getStyles("collapse"), children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...getStyles("children"), children }) })
  ] });
});
NavLink.classes = classes$k;
NavLink.displayName = "@mantine/core/NavLink";
var classes$j = { "root": "m_a513464", "icon": "m_a4ceffb", "loader": "m_b0920b15", "body": "m_a49ed24", "title": "m_3feedf16", "description": "m_3d733a3a", "closeButton": "m_919a4d88" };
const defaultProps$q = {
  withCloseButton: true
};
const varsResolver$k = createVarsResolver((theme, { radius, color }) => ({
  root: {
    "--notification-radius": radius === void 0 ? void 0 : getRadius(radius),
    "--notification-color": color ? getThemeColor(color, theme) : void 0
  }
}));
const Notification = factory((_props, ref) => {
  const props = useProps("Notification", defaultProps$q, _props);
  const {
    className,
    color,
    radius,
    loading,
    withCloseButton,
    withBorder,
    title,
    icon,
    children,
    onClose,
    closeButtonProps,
    classNames,
    style,
    styles,
    unstyled,
    vars,
    mod,
    loaderProps,
    role,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Notification",
    classes: classes$j,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$k
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Box,
    {
      ...getStyles("root"),
      mod: [{ "data-with-icon": !!icon || loading, "data-with-border": withBorder }, mod],
      ref,
      role: role || "alert",
      ...others,
      children: [
        icon && !loading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...getStyles("icon"), children: icon }),
        loading && /* @__PURE__ */ jsxRuntimeExports.jsx(Loader, { size: 28, color, ...loaderProps, ...getStyles("loader") }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ...getStyles("body"), children: [
          title && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...getStyles("title"), children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ...getStyles("description"), mod: { "data-with-title": !!title }, children })
        ] }),
        withCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsx(
          CloseButton,
          {
            iconSize: 16,
            color: "gray",
            ...closeButtonProps,
            unstyled,
            onClick: onClose,
            ...getStyles("closeButton")
          }
        )
      ]
    }
  );
});
Notification.classes = classes$j;
Notification.displayName = "@mantine/core/Notification";
var classes$i = { "root": "m_e2f5cd4e", "controls": "m_95e17d22", "control": "m_80b4b171" };
function NumberInputChevron({ direction, style, ...others }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      style: {
        width: "var(--ni-chevron-size)",
        height: "var(--ni-chevron-size)",
        transform: direction === "up" ? "rotate(180deg)" : void 0,
        ...style
      },
      viewBox: "0 0 15 15",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      ...others,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "path",
        {
          d: "M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z",
          fill: "currentColor",
          fillRule: "evenodd",
          clipRule: "evenodd"
        }
      )
    }
  );
}
const leadingDecimalZeroPattern = /^(0\.0*|-0(\.0*)?)$/;
const leadingZerosPattern = /^-?0\d+(\.\d+)?\.?$/;
const trailingZerosPattern = /\.\d*0$/;
const trailingDecimalSeparatorPattern = /^-?\d+\.$/;
function isNumberString(value) {
  return typeof value === "string" && value !== "" && !Number.isNaN(Number(value));
}
function canIncrement(value) {
  if (typeof value === "number") {
    return value < Number.MAX_SAFE_INTEGER;
  }
  return value === "" || isNumberString(value) && Number(value) < Number.MAX_SAFE_INTEGER;
}
function getDecimalPlaces(inputValue) {
  return inputValue.toString().replace(".", "").length;
}
function isValidNumber(floatValue, value) {
  return (typeof floatValue === "number" ? floatValue < Number.MAX_SAFE_INTEGER : !Number.isNaN(Number(floatValue))) && !Number.isNaN(floatValue) && getDecimalPlaces(value) < 14 && value !== "";
}
function isInRange(value, min, max) {
  if (value === void 0) {
    return true;
  }
  const minValid = min === void 0 || value >= min;
  const maxValid = max === void 0 || value <= max;
  return minValid && maxValid;
}
const defaultProps$p = {
  step: 1,
  clampBehavior: "blur",
  allowDecimal: true,
  allowNegative: true,
  withKeyboardEvents: true,
  allowLeadingZeros: true,
  trimLeadingZeroesOnBlur: true,
  startValue: 0,
  allowedDecimalSeparators: [".", ","]
};
const varsResolver$j = createVarsResolver((_, { size: size2 }) => ({
  controls: {
    "--ni-chevron-size": getSize(size2, "ni-chevron-size")
  }
}));
function clampAndSanitizeInput(sanitizedValue, max, min) {
  const stringValue = sanitizedValue.toString();
  const hasTrailingDecimalSeparator = trailingDecimalSeparatorPattern.test(stringValue);
  const replaced = stringValue.replace(/^0+(?=\d)/, "");
  const parsedValue = parseFloat(replaced);
  if (Number.isNaN(parsedValue)) {
    return replaced;
  }
  if (parsedValue > Number.MAX_SAFE_INTEGER) {
    return max !== void 0 ? max : replaced;
  }
  const clamped = clamp$1(parsedValue, min, max);
  if (hasTrailingDecimalSeparator) {
    const clampedString = clamped.toString().replace(/^0+(?=\d)/, "");
    return `${clampedString}.`;
  }
  return clamped;
}
const NumberInput = factory((_props, ref) => {
  const props = useProps("NumberInput", defaultProps$p, _props);
  const {
    className,
    classNames,
    styles,
    unstyled,
    vars,
    onChange,
    onValueChange,
    value,
    defaultValue,
    max,
    min,
    step,
    hideControls,
    rightSection,
    isAllowed,
    clampBehavior,
    onBlur,
    allowDecimal,
    decimalScale,
    onKeyDown,
    onKeyDownCapture,
    handlersRef,
    startValue,
    disabled,
    rightSectionPointerEvents,
    allowNegative,
    readOnly,
    size: size2,
    rightSectionWidth,
    stepHoldInterval,
    stepHoldDelay,
    allowLeadingZeros,
    withKeyboardEvents,
    trimLeadingZeroesOnBlur,
    allowedDecimalSeparators,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "NumberInput",
    classes: classes$i,
    props,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$j
  });
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    classNames,
    styles,
    props
  });
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: "",
    onChange
  });
  const shouldUseStepInterval = stepHoldDelay !== void 0 && stepHoldInterval !== void 0;
  const inputRef = reactExports.useRef(null);
  const onStepTimeoutRef = reactExports.useRef(null);
  const stepCountRef = reactExports.useRef(0);
  const handleValueChange = (payload, event) => {
    if (event.source === "event") {
      setValue(
        isValidNumber(payload.floatValue, payload.value) && !leadingDecimalZeroPattern.test(payload.value) && !(allowLeadingZeros ? leadingZerosPattern.test(payload.value) : false) && !trailingZerosPattern.test(payload.value) && !trailingDecimalSeparatorPattern.test(payload.value) ? payload.floatValue : payload.value
      );
    }
    onValueChange?.(payload, event);
  };
  const getDecimalPlaces2 = (inputValue) => {
    const match = String(inputValue).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) {
      return 0;
    }
    return Math.max(0, (match[1] ? match[1].length : 0) - (match[2] ? +match[2] : 0));
  };
  const adjustCursor = (position) => {
    if (inputRef.current && typeof position !== "undefined") {
      inputRef.current.setSelectionRange(position, position);
    }
  };
  const incrementRef = reactExports.useRef(noop);
  incrementRef.current = () => {
    if (!canIncrement(_value)) {
      return;
    }
    let val;
    const currentValuePrecision = getDecimalPlaces2(_value);
    const stepPrecision = getDecimalPlaces2(step);
    const maxPrecision = Math.max(currentValuePrecision, stepPrecision);
    const factor = 10 ** maxPrecision;
    if (!isNumberString(_value) && (typeof _value !== "number" || Number.isNaN(_value))) {
      val = clamp$1(startValue, min, max);
    } else if (max !== void 0) {
      const incrementedValue = (Math.round(Number(_value) * factor) + Math.round(step * factor)) / factor;
      val = incrementedValue <= max ? incrementedValue : max;
    } else {
      val = (Math.round(Number(_value) * factor) + Math.round(step * factor)) / factor;
    }
    const formattedValue = val.toFixed(maxPrecision);
    setValue(parseFloat(formattedValue));
    onValueChange?.(
      { floatValue: parseFloat(formattedValue), formattedValue, value: formattedValue },
      { source: "increment" }
    );
    setTimeout(() => adjustCursor(inputRef.current?.value.length), 0);
  };
  const decrementRef = reactExports.useRef(noop);
  decrementRef.current = () => {
    if (!canIncrement(_value)) {
      return;
    }
    let val;
    const minValue = min !== void 0 ? min : !allowNegative ? 0 : Number.MIN_SAFE_INTEGER;
    const currentValuePrecision = getDecimalPlaces2(_value);
    const stepPrecision = getDecimalPlaces2(step);
    const maxPrecision = Math.max(currentValuePrecision, stepPrecision);
    const factor = 10 ** maxPrecision;
    if (!isNumberString(_value) && typeof _value !== "number" || Number.isNaN(_value)) {
      val = clamp$1(startValue, minValue, max);
    } else {
      const decrementedValue = (Math.round(Number(_value) * factor) - Math.round(step * factor)) / factor;
      val = minValue !== void 0 && decrementedValue < minValue ? minValue : decrementedValue;
    }
    const formattedValue = val.toFixed(maxPrecision);
    setValue(parseFloat(formattedValue));
    onValueChange?.(
      { floatValue: parseFloat(formattedValue), formattedValue, value: formattedValue },
      { source: "decrement" }
    );
    setTimeout(() => adjustCursor(inputRef.current?.value.length), 0);
  };
  const handlePaste = (event) => {
    const pastedText = event.clipboardData.getData("text");
    const _decimalSeparator = others.decimalSeparator || ".";
    const separatorsToReplace = (allowedDecimalSeparators || [".", ","]).filter(
      (s) => s !== _decimalSeparator
    );
    if (separatorsToReplace.some((s) => pastedText.includes(s))) {
      event.preventDefault();
      let modifiedText = pastedText;
      separatorsToReplace.forEach((s) => {
        modifiedText = modifiedText.split(s).join(_decimalSeparator);
      });
      const input = inputRef.current;
      if (input) {
        const start = input.selectionStart ?? 0;
        const end = input.selectionEnd ?? 0;
        const currentValue = input.value;
        const newValue = currentValue.substring(0, start) + modifiedText + currentValue.substring(end);
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value"
        )?.set;
        nativeInputValueSetter?.call(input, newValue);
        input.dispatchEvent(new Event("change", { bubbles: true }));
        const cursorPos = start + modifiedText.length;
        setTimeout(() => adjustCursor(cursorPos), 0);
      }
    }
    others.onPaste?.(event);
  };
  const handleKeyDown = (event) => {
    onKeyDown?.(event);
    if (readOnly || !withKeyboardEvents) {
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      incrementRef.current?.();
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      decrementRef.current?.();
    }
  };
  const handleKeyDownCapture = (event) => {
    onKeyDownCapture?.(event);
    if (event.key === "Backspace") {
      const input = inputRef.current;
      if (input && input.selectionStart === 0 && input.selectionStart === input.selectionEnd) {
        event.preventDefault();
        window.setTimeout(() => adjustCursor(0), 0);
      }
    }
  };
  const handleBlur = (event) => {
    let sanitizedValue = _value;
    if (clampBehavior === "blur" && typeof sanitizedValue === "number") {
      sanitizedValue = clamp$1(sanitizedValue, min, max);
    }
    if (trimLeadingZeroesOnBlur && typeof sanitizedValue === "string" && getDecimalPlaces2(sanitizedValue) < 15) {
      sanitizedValue = clampAndSanitizeInput(sanitizedValue, max, min);
    }
    if (_value !== sanitizedValue) {
      setValue(sanitizedValue);
    }
    onBlur?.(event);
  };
  assignRef(handlersRef, { increment: incrementRef.current, decrement: decrementRef.current });
  const onStepHandleChange = (isIncrement) => {
    if (isIncrement) {
      incrementRef.current?.();
    } else {
      decrementRef.current?.();
    }
    stepCountRef.current += 1;
  };
  const onStepLoop = (isIncrement) => {
    onStepHandleChange(isIncrement);
    if (shouldUseStepInterval) {
      const interval = typeof stepHoldInterval === "number" ? stepHoldInterval : stepHoldInterval(stepCountRef.current);
      onStepTimeoutRef.current = window.setTimeout(() => onStepLoop(isIncrement), interval);
    }
  };
  const onStep = (event, isIncrement) => {
    event.preventDefault();
    inputRef.current?.focus();
    onStepHandleChange(isIncrement);
    if (shouldUseStepInterval) {
      onStepTimeoutRef.current = window.setTimeout(() => onStepLoop(isIncrement), stepHoldDelay);
    }
  };
  const onStepDone = () => {
    if (onStepTimeoutRef.current) {
      window.clearTimeout(onStepTimeoutRef.current);
    }
    onStepTimeoutRef.current = null;
    stepCountRef.current = 0;
  };
  const controls = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ...getStyles("controls"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      UnstyledButton,
      {
        ...getStyles("control"),
        tabIndex: -1,
        "aria-hidden": true,
        disabled: disabled || typeof _value === "number" && max !== void 0 && _value >= max,
        mod: { direction: "up" },
        onMouseDown: (event) => event.preventDefault(),
        onPointerDown: (event) => {
          onStep(event, true);
        },
        onPointerUp: onStepDone,
        onPointerLeave: onStepDone,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(NumberInputChevron, { direction: "up" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      UnstyledButton,
      {
        ...getStyles("control"),
        tabIndex: -1,
        "aria-hidden": true,
        disabled: disabled || typeof _value === "number" && min !== void 0 && _value <= min,
        mod: { direction: "down" },
        onMouseDown: (event) => event.preventDefault(),
        onPointerDown: (event) => {
          onStep(event, false);
        },
        onPointerUp: onStepDone,
        onPointerLeave: onStepDone,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(NumberInputChevron, { direction: "down" })
      }
    )
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    InputBase,
    {
      component: NumericFormat,
      allowNegative,
      className: clsx(classes$i.root, className),
      size: size2,
      inputMode: "decimal",
      ...others,
      readOnly,
      disabled,
      value: _value,
      getInputRef: useMergedRef(ref, inputRef),
      onValueChange: handleValueChange,
      rightSection: hideControls || readOnly || !canIncrement(_value) ? rightSection : rightSection || controls,
      classNames: resolvedClassNames,
      styles: resolvedStyles,
      unstyled,
      __staticSelector: "NumberInput",
      decimalScale: allowDecimal ? decimalScale : 0,
      onPaste: handlePaste,
      onKeyDown: handleKeyDown,
      onKeyDownCapture: handleKeyDownCapture,
      rightSectionPointerEvents: rightSectionPointerEvents ?? (disabled ? "none" : void 0),
      rightSectionWidth: rightSectionWidth ?? `var(--ni-right-section-width-${size2 || "sm"})`,
      allowLeadingZeros,
      allowedDecimalSeparators,
      onBlur: handleBlur,
      attributes,
      isAllowed: (val) => {
        if (clampBehavior === "strict") {
          if (isAllowed) {
            return isAllowed(val) && isInRange(val.floatValue, min, max);
          }
          return isInRange(val.floatValue, min, max);
        }
        return isAllowed ? isAllowed(val) : true;
      }
    }
  );
});
NumberInput.classes = { ...InputBase.classes, ...classes$i };
NumberInput.displayName = "@mantine/core/NumberInput";
var classes$h = { "root": "m_4addd315", "control": "m_326d024a", "dots": "m_4ad7767d" };
const [PaginationProvider, usePaginationContext] = createSafeContext(
  "Pagination.Root component was not found in tree"
);
const defaultProps$o = {
  withPadding: true
};
const PaginationControl = factory((_props, ref) => {
  const props = useProps("PaginationControl", defaultProps$o, _props);
  const {
    classNames,
    className,
    style,
    styles,
    vars,
    active,
    disabled,
    withPadding,
    mod,
    ...others
  } = props;
  const ctx = usePaginationContext();
  const _disabled = disabled || ctx.disabled;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    UnstyledButton,
    {
      ref,
      disabled: _disabled,
      mod: [{ active, disabled: _disabled, "with-padding": withPadding }, mod],
      ...ctx.getStyles("control", { className, style, classNames, styles, active: !_disabled }),
      ...others
    }
  );
});
PaginationControl.classes = classes$h;
PaginationControl.displayName = "@mantine/core/PaginationControl";
function PaginationIcon({ style, children, path, ...others }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      viewBox: "0 0 16 16",
      xmlns: "http://www.w3.org/2000/svg",
      style: {
        width: "calc(var(--pagination-control-size) / 1.8)",
        height: "calc(var(--pagination-control-size) / 1.8)",
        ...style
      },
      ...others,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: path, fill: "currentColor" })
    }
  );
}
const PaginationNextIcon = (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  PaginationIcon,
  {
    ...props,
    path: "M8.781 8l-3.3-3.3.943-.943L10.667 8l-4.243 4.243-.943-.943 3.3-3.3z"
  }
);
const PaginationPreviousIcon = (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  PaginationIcon,
  {
    ...props,
    path: "M7.219 8l3.3 3.3-.943.943L5.333 8l4.243-4.243.943.943-3.3 3.3z"
  }
);
const PaginationFirstIcon = (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  PaginationIcon,
  {
    ...props,
    path: "M6.85355 3.85355C7.04882 3.65829 7.04882 3.34171 6.85355 3.14645C6.65829 2.95118 6.34171 2.95118 6.14645 3.14645L2.14645 7.14645C1.95118 7.34171 1.95118 7.65829 2.14645 7.85355L6.14645 11.8536C6.34171 12.0488 6.65829 12.0488 6.85355 11.8536C7.04882 11.6583 7.04882 11.3417 6.85355 11.1464L3.20711 7.5L6.85355 3.85355ZM12.8536 3.85355C13.0488 3.65829 13.0488 3.34171 12.8536 3.14645C12.6583 2.95118 12.3417 2.95118 12.1464 3.14645L8.14645 7.14645C7.95118 7.34171 7.95118 7.65829 8.14645 7.85355L12.1464 11.8536C12.3417 12.0488 12.6583 12.0488 12.8536 11.8536C13.0488 11.6583 13.0488 11.3417 12.8536 11.1464L9.20711 7.5L12.8536 3.85355Z"
  }
);
const PaginationLastIcon = (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  PaginationIcon,
  {
    ...props,
    path: "M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z"
  }
);
const PaginationDotsIcon = (props) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  PaginationIcon,
  {
    ...props,
    path: "M2 8c0-.733.6-1.333 1.333-1.333.734 0 1.334.6 1.334 1.333s-.6 1.333-1.334 1.333C2.6 9.333 2 8.733 2 8zm9.333 0c0-.733.6-1.333 1.334-1.333C13.4 6.667 14 7.267 14 8s-.6 1.333-1.333 1.333c-.734 0-1.334-.6-1.334-1.333zM6.667 8c0-.733.6-1.333 1.333-1.333s1.333.6 1.333 1.333S8.733 9.333 8 9.333 6.667 8.733 6.667 8z"
  }
);
const defaultProps$n = {
  icon: PaginationDotsIcon
};
const PaginationDots = factory((_props, ref) => {
  const props = useProps("PaginationDots", defaultProps$n, _props);
  const { classNames, className, style, styles, vars, icon: Icon, ...others } = props;
  const ctx = usePaginationContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ref, ...ctx.getStyles("dots", { className, style, styles, classNames }), ...others, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Icon,
    {
      style: {
        width: "calc(var(--pagination-control-size) / 1.8)",
        height: "calc(var(--pagination-control-size) / 1.8)"
      }
    }
  ) });
});
PaginationDots.classes = classes$h;
PaginationDots.displayName = "@mantine/core/PaginationDots";
function createEdgeComponent({ icon, name, action, type }) {
  const defaultProps2 = { icon };
  const Component = reactExports.forwardRef((props, ref) => {
    const { icon: Icon, ...others } = useProps(name, defaultProps2, props);
    const ctx = usePaginationContext();
    const disabled = type === "next" ? ctx.active === ctx.total : ctx.active === 1;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PaginationControl,
      {
        disabled: ctx.disabled || disabled,
        ref,
        onClick: ctx[action],
        withPadding: false,
        ...others,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Icon,
          {
            className: "mantine-rotate-rtl",
            style: {
              width: "calc(var(--pagination-control-size) / 1.8)",
              height: "calc(var(--pagination-control-size) / 1.8)"
            }
          }
        )
      }
    );
  });
  Component.displayName = `@mantine/core/${name}`;
  return createPolymorphicComponent(Component);
}
const PaginationNext = createEdgeComponent({
  icon: PaginationNextIcon,
  name: "PaginationNext",
  action: "onNext",
  type: "next"
});
const PaginationPrevious = createEdgeComponent({
  icon: PaginationPreviousIcon,
  name: "PaginationPrevious",
  action: "onPrevious",
  type: "previous"
});
const PaginationFirst = createEdgeComponent({
  icon: PaginationFirstIcon,
  name: "PaginationFirst",
  action: "onFirst",
  type: "previous"
});
const PaginationLast = createEdgeComponent({
  icon: PaginationLastIcon,
  name: "PaginationLast",
  action: "onLast",
  type: "next"
});
function PaginationItems({ dotsIcon }) {
  const ctx = usePaginationContext();
  const items = ctx.range.map((page, index) => {
    if (page === "dots") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationDots, { icon: dotsIcon }, index);
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PaginationControl,
      {
        active: page === ctx.active,
        "aria-current": page === ctx.active ? "page" : void 0,
        onClick: () => ctx.onChange(page),
        disabled: ctx.disabled,
        ...ctx.getItemProps?.(page),
        children: ctx.getItemProps?.(page)?.children ?? page
      },
      index
    );
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: items });
}
PaginationItems.displayName = "@mantine/core/PaginationItems";
const defaultProps$m = {
  siblings: 1,
  boundaries: 1
};
const varsResolver$i = createVarsResolver(
  (theme, { size: size2, radius, color, autoContrast }) => ({
    root: {
      "--pagination-control-radius": radius === void 0 ? void 0 : getRadius(radius),
      "--pagination-control-size": getSize(size2, "pagination-control-size"),
      "--pagination-control-fz": getFontSize(size2),
      "--pagination-active-bg": color ? getThemeColor(color, theme) : void 0,
      "--pagination-active-color": getAutoContrastValue(autoContrast, theme) ? getContrastColor({ color, theme, autoContrast }) : void 0
    }
  })
);
const PaginationRoot = factory((_props, ref) => {
  const props = useProps("PaginationRoot", defaultProps$m, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    total,
    value,
    defaultValue,
    onChange,
    disabled,
    siblings,
    boundaries,
    color,
    radius,
    onNextPage,
    onPreviousPage,
    onFirstPage,
    onLastPage,
    getItemProps,
    autoContrast,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Pagination",
    classes: classes$h,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$i
  });
  const { range, setPage, next, previous, active, first, last } = usePagination({
    page: value,
    initialPage: defaultValue,
    onChange,
    total,
    siblings,
    boundaries
  });
  const handleNextPage = createEventHandler(onNextPage, next);
  const handlePreviousPage = createEventHandler(onPreviousPage, previous);
  const handleFirstPage = createEventHandler(onFirstPage, first);
  const handleLastPage = createEventHandler(onLastPage, last);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    PaginationProvider,
    {
      value: {
        total,
        range,
        active,
        disabled,
        getItemProps,
        onChange: setPage,
        onNext: handleNextPage,
        onPrevious: handlePreviousPage,
        onFirst: handleFirstPage,
        onLast: handleLastPage,
        getStyles
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ref, ...getStyles("root"), ...others })
    }
  );
});
PaginationRoot.classes = classes$h;
PaginationRoot.displayName = "@mantine/core/PaginationRoot";
const defaultProps$l = {
  withControls: true,
  withPages: true,
  siblings: 1,
  boundaries: 1,
  gap: 8
};
const Pagination = factory((_props, ref) => {
  const props = useProps("Pagination", defaultProps$l, _props);
  const {
    withEdges,
    withControls,
    getControlProps,
    nextIcon,
    previousIcon,
    lastIcon,
    firstIcon,
    dotsIcon,
    total,
    gap,
    hideWithOnePage,
    withPages,
    ...others
  } = props;
  if (total <= 0 || hideWithOnePage && total === 1) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationRoot, { ref, total, ...others, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap, children: [
    withEdges && /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationFirst, { icon: firstIcon, ...getControlProps?.("first") }),
    withControls && /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationPrevious, { icon: previousIcon, ...getControlProps?.("previous") }),
    withPages && /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItems, { dotsIcon }),
    withControls && /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationNext, { icon: nextIcon, ...getControlProps?.("next") }),
    withEdges && /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationLast, { icon: lastIcon, ...getControlProps?.("last") })
  ] }) });
});
Pagination.classes = classes$h;
Pagination.displayName = "@mantine/core/Pagination";
Pagination.Root = PaginationRoot;
Pagination.Control = PaginationControl;
Pagination.Dots = PaginationDots;
Pagination.First = PaginationFirst;
Pagination.Last = PaginationLast;
Pagination.Next = PaginationNext;
Pagination.Previous = PaginationPrevious;
Pagination.Items = PaginationItems;
var classes$g = { "root": "m_f61ca620", "input": "m_ccf8da4c", "innerInput": "m_f2d85dd2", "visibilityToggle": "m_b1072d44" };
const PasswordToggleIcon = ({
  reveal
}) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "svg",
  {
    viewBox: "0 0 15 15",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    style: { width: "var(--psi-icon-size)", height: "var(--psi-icon-size)" },
    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "path",
      {
        d: reveal ? "M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L10.6828 3.61012C9.70652 3.21671 8.63759 3 7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C0.902945 9.08812 2.02314 10.1861 3.36061 10.9323L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L4.31723 11.3899C5.29348 11.7833 6.36241 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C14.0971 5.9119 12.9769 4.81391 11.6394 4.06771L13.3536 2.35355ZM9.90428 4.38861C9.15332 4.1361 8.34759 4 7.5 4C4.80285 4 2.52952 5.37816 1.09622 7.50001C1.87284 8.6497 2.89609 9.58106 4.09974 10.1931L9.90428 4.38861ZM5.09572 10.6114L10.9003 4.80685C12.1039 5.41894 13.1272 6.35031 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11C6.65241 11 5.84668 10.8639 5.09572 10.6114Z" : "M7.5 11C4.80285 11 2.52952 9.62184 1.09622 7.50001C2.52952 5.37816 4.80285 4 7.5 4C10.1971 4 12.4705 5.37816 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11ZM7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C1.65639 10.2936 4.30786 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C13.3436 4.70638 10.6921 3 7.5 3ZM7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5Z",
        fill: "currentColor",
        fillRule: "evenodd",
        clipRule: "evenodd"
      }
    )
  }
);
const defaultProps$k = {
  visibilityToggleIcon: PasswordToggleIcon
};
const varsResolver$h = createVarsResolver((_, { size: size2 }) => ({
  root: {
    "--psi-icon-size": getSize(size2, "psi-icon-size"),
    "--psi-button-size": getSize(size2, "psi-button-size")
  }
}));
const PasswordInput = factory((_props, ref) => {
  const props = useProps("PasswordInput", defaultProps$k, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    required,
    error,
    leftSection,
    disabled,
    id,
    variant,
    inputContainer,
    description,
    label,
    size: size2,
    errorProps,
    descriptionProps,
    labelProps,
    withAsterisk,
    inputWrapperOrder,
    wrapperProps,
    radius,
    rightSection,
    rightSectionWidth,
    rightSectionPointerEvents,
    leftSectionWidth,
    visible,
    defaultVisible,
    onVisibilityChange,
    visibilityToggleIcon: VisibilityToggleIcon,
    visibilityToggleButtonProps,
    rightSectionProps,
    leftSectionProps,
    leftSectionPointerEvents,
    withErrorStyles,
    mod,
    attributes,
    ...others
  } = props;
  const uuid = useId(id);
  const [_visible, setVisibility] = useUncontrolled({
    value: visible,
    defaultValue: defaultVisible,
    finalValue: false,
    onChange: onVisibilityChange
  });
  const toggleVisibility = () => setVisibility(!_visible);
  const getStyles = useStyles({
    name: "PasswordInput",
    classes: classes$g,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$h
  });
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    classNames,
    styles,
    props
  });
  const { styleProps, rest } = extractStyleProps(others);
  const errorId = errorProps?.id || `${uuid}-error`;
  const descriptionId = descriptionProps?.id || `${uuid}-description`;
  const hasError = !!error && typeof error !== "boolean";
  const hasDescription = !!description;
  const _describedBy = `${hasError ? errorId : ""} ${hasDescription ? descriptionId : ""}`;
  const describedBy = _describedBy.trim().length > 0 ? _describedBy.trim() : void 0;
  const visibilityToggleButton = /* @__PURE__ */ jsxRuntimeExports.jsx(
    ActionIcon,
    {
      ...getStyles("visibilityToggle"),
      disabled,
      radius,
      "aria-hidden": !visibilityToggleButtonProps,
      "aria-pressed": _visible,
      tabIndex: -1,
      ...visibilityToggleButtonProps,
      variant: visibilityToggleButtonProps?.variant ?? "subtle",
      color: "gray",
      unstyled,
      onTouchEnd: (event) => {
        event.preventDefault();
        visibilityToggleButtonProps?.onTouchEnd?.(event);
        toggleVisibility();
      },
      onMouseDown: (event) => {
        event.preventDefault();
        visibilityToggleButtonProps?.onMouseDown?.(event);
        toggleVisibility();
      },
      onKeyDown: (event) => {
        visibilityToggleButtonProps?.onKeyDown?.(event);
        if (event.key === " ") {
          event.preventDefault();
          toggleVisibility();
        }
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(VisibilityToggleIcon, { reveal: _visible })
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Input.Wrapper,
    {
      required,
      id: uuid,
      label,
      error,
      description,
      size: size2,
      classNames: resolvedClassNames,
      styles: resolvedStyles,
      __staticSelector: "PasswordInput",
      __stylesApiProps: props,
      unstyled,
      withAsterisk,
      inputWrapperOrder,
      inputContainer,
      variant,
      labelProps: { ...labelProps, htmlFor: uuid },
      descriptionProps: { ...descriptionProps, id: descriptionId },
      errorProps: { ...errorProps, id: errorId },
      mod,
      attributes,
      ...getStyles("root"),
      ...styleProps,
      ...wrapperProps,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          component: "div",
          error,
          leftSection,
          size: size2,
          classNames: { ...resolvedClassNames, input: clsx(classes$g.input, resolvedClassNames.input) },
          styles: resolvedStyles,
          radius,
          disabled,
          __staticSelector: "PasswordInput",
          __stylesApiProps: props,
          rightSectionWidth,
          rightSection: rightSection ?? visibilityToggleButton,
          variant,
          unstyled,
          leftSectionWidth,
          rightSectionPointerEvents: rightSectionPointerEvents || "all",
          rightSectionProps,
          leftSectionProps,
          leftSectionPointerEvents,
          withAria: false,
          withErrorStyles,
          attributes,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              required,
              "data-invalid": !!error || void 0,
              "data-with-left-section": !!leftSection || void 0,
              ...getStyles("innerInput"),
              disabled,
              id: uuid,
              ref,
              ...rest,
              "aria-describedby": describedBy,
              autoComplete: rest.autoComplete || "off",
              type: _visible ? "text" : "password"
            }
          )
        }
      )
    }
  );
});
PasswordInput.classes = { ...InputBase.classes, ...classes$g };
PasswordInput.displayName = "@mantine/core/PasswordInput";
var classes$f = { "root": "m_db6d6462", "section": "m_2242eb65", "stripes-animation": "m_81a374bd", "stripes-animation-vertical": "m_e0fb7a86", "label": "m_91e40b74" };
const [ProgressProvider, useProgressContext] = createSafeContext(
  "Progress.Root component was not found in tree"
);
const ProgressLabel = factory((props, ref) => {
  const { classNames, className, style, styles, vars, ...others } = useProps(
    "ProgressLabel",
    null,
    props
  );
  const ctx = useProgressContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ref,
      ...ctx.getStyles("label", { className, style, classNames, styles }),
      ...others
    }
  );
});
ProgressLabel.classes = classes$f;
ProgressLabel.displayName = "@mantine/core/ProgressLabel";
const varsResolver$g = createVarsResolver(
  (_, { size: size2, radius, transitionDuration }) => ({
    root: {
      "--progress-size": getSize(size2, "progress-size"),
      "--progress-radius": radius === void 0 ? void 0 : getRadius(radius),
      "--progress-transition-duration": typeof transitionDuration === "number" ? `${transitionDuration}ms` : void 0
    }
  })
);
const ProgressRoot = factory((_props, ref) => {
  const props = useProps("ProgressRoot", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    autoContrast,
    transitionDuration,
    orientation,
    attributes,
    mod,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Progress",
    classes: classes$f,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$g
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { value: { getStyles, autoContrast }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ref, mod: [{ orientation }, mod], ...getStyles("root"), ...others }) });
});
ProgressRoot.classes = classes$f;
ProgressRoot.displayName = "@mantine/core/ProgressRoot";
const defaultProps$j = {
  withAria: true
};
const ProgressSection = factory((props, ref) => {
  const {
    classNames,
    className,
    style,
    styles,
    vars,
    value,
    withAria,
    color,
    striped,
    animated,
    mod,
    ...others
  } = useProps("ProgressSection", defaultProps$j, props);
  const ctx = useProgressContext();
  const theme = useMantineTheme();
  const ariaAttributes = withAria ? {
    role: "progressbar",
    "aria-valuemax": 100,
    "aria-valuemin": 0,
    "aria-valuenow": value,
    "aria-valuetext": `${value}%`
  } : {};
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ref,
      ...ctx.getStyles("section", { className, classNames, styles, style }),
      ...others,
      ...ariaAttributes,
      mod: [{ striped: striped || animated, animated }, mod],
      __vars: {
        "--progress-section-size": `${value}%`,
        "--progress-section-color": getThemeColor(color, theme),
        "--progress-label-color": getAutoContrastValue(ctx.autoContrast, theme) ? getContrastColor({ color, theme, autoContrast: ctx.autoContrast }) : void 0
      }
    }
  );
});
ProgressSection.classes = classes$f;
ProgressSection.displayName = "@mantine/core/ProgressSection";
const Progress = factory((_props, ref) => {
  const props = useProps("Progress", null, _props);
  const {
    value,
    classNames,
    styles,
    vars,
    color,
    striped,
    animated,
    "aria-label": label,
    ...others
  } = props;
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    classNames,
    styles,
    props
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ProgressRoot,
    {
      ref,
      classNames: resolvedClassNames,
      styles: resolvedStyles,
      vars,
      ...others,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        ProgressSection,
        {
          value,
          color,
          striped,
          animated,
          "aria-label": label
        }
      )
    }
  );
});
Progress.classes = classes$f;
Progress.displayName = "@mantine/core/Progress";
Progress.Section = ProgressSection;
Progress.Root = ProgressRoot;
Progress.Label = ProgressLabel;
var classes$e = { "root": "m_f3f1af94", "inner": "m_89c4f5e4", "icon": "m_f3ed6b2b", "radio": "m_8a3dbb89", "radio--outline": "m_1bfe9d39" };
const [RadioGroupProvider, useRadioGroupContext] = createOptionalContext();
const [RadioCardProvider, useRadioCardContext] = createOptionalContext();
var classes$d = { "card": "m_9dc8ae12" };
const defaultProps$i = {
  withBorder: true
};
const varsResolver$f = createVarsResolver((_, { radius }) => ({
  card: {
    "--card-radius": getRadius(radius)
  }
}));
const RadioCard = factory((_props, ref) => {
  const props = useProps("RadioCard", defaultProps$i, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    checked,
    mod,
    withBorder,
    value,
    onClick,
    name,
    onKeyDown,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "RadioCard",
    classes: classes$d,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$f,
    rootSelector: "card"
  });
  const { dir } = useDirection();
  const ctx = useRadioGroupContext();
  const _checked = typeof checked === "boolean" ? checked : ctx?.value === value || false;
  const _name = name || ctx?.name;
  const handleKeyDown = (event) => {
    onKeyDown?.(event);
    if (["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(event.nativeEvent.code)) {
      event.preventDefault();
      const siblings = Array.from(
        document.querySelectorAll(
          `[role="radio"][name="${_name || "__mantine"}"]`
        )
      );
      const currentIndex = siblings.findIndex((element) => element === event.target);
      const nextIndex = currentIndex + 1 >= siblings.length ? 0 : currentIndex + 1;
      const prevIndex = currentIndex - 1 < 0 ? siblings.length - 1 : currentIndex - 1;
      if (event.nativeEvent.code === "ArrowDown") {
        siblings[nextIndex].focus();
        siblings[nextIndex].click();
      }
      if (event.nativeEvent.code === "ArrowUp") {
        siblings[prevIndex].focus();
        siblings[prevIndex].click();
      }
      if (event.nativeEvent.code === "ArrowLeft") {
        siblings[dir === "ltr" ? prevIndex : nextIndex].focus();
        siblings[dir === "ltr" ? prevIndex : nextIndex].click();
      }
      if (event.nativeEvent.code === "ArrowRight") {
        siblings[dir === "ltr" ? nextIndex : prevIndex].focus();
        siblings[dir === "ltr" ? nextIndex : prevIndex].click();
      }
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RadioCardProvider, { value: { checked: _checked }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    UnstyledButton,
    {
      ref,
      mod: [{ "with-border": withBorder, checked: _checked }, mod],
      ...getStyles("card"),
      ...others,
      role: "radio",
      "aria-checked": _checked,
      name: _name,
      onClick: (event) => {
        onClick?.(event);
        ctx?.onChange(value || "");
      },
      onKeyDown: handleKeyDown
    }
  ) });
});
RadioCard.displayName = "@mantine/core/RadioCard";
RadioCard.classes = classes$d;
const RadioGroup = factory((props, ref) => {
  const {
    value,
    defaultValue,
    onChange,
    size: size2,
    wrapperProps,
    children,
    name,
    readOnly,
    disabled,
    ...others
  } = useProps("RadioGroup", null, props);
  const _name = useId(name);
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: "",
    onChange
  });
  const handleChange = (event) => !readOnly && setValue(typeof event === "string" ? event : event.currentTarget.value);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    RadioGroupProvider,
    {
      value: { value: _value, onChange: handleChange, size: size2, name: _name, disabled },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input.Wrapper,
        {
          size: size2,
          ref,
          ...wrapperProps,
          ...others,
          labelElement: "div",
          __staticSelector: "RadioGroup",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputsGroupFieldset, { role: "radiogroup", children })
        }
      )
    }
  );
});
RadioGroup.classes = Input.Wrapper.classes;
RadioGroup.displayName = "@mantine/core/RadioGroup";
function RadioIcon({ size: size2, style, ...others }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 5 5",
      style: { width: rem(size2), height: rem(size2), ...style },
      "aria-hidden": true,
      ...others,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "2.5", cy: "2.5", r: "2.5", fill: "currentColor" })
    }
  );
}
var classes$c = { "indicator": "m_717d7ff6", "icon": "m_3e4da632", "indicator--outline": "m_2980836c" };
const defaultProps$h = {
  icon: RadioIcon
};
const varsResolver$e = createVarsResolver(
  (theme, { radius, color, size: size2, iconColor, variant, autoContrast }) => {
    const parsedColor = parseThemeColor({ color: color || theme.primaryColor, theme });
    const outlineColor = parsedColor.isThemeColor && parsedColor.shade === void 0 ? `var(--mantine-color-${parsedColor.color}-outline)` : parsedColor.color;
    return {
      indicator: {
        "--radio-size": getSize(size2, "radio-size"),
        "--radio-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--radio-color": variant === "outline" ? outlineColor : getThemeColor(color, theme),
        "--radio-icon-size": getSize(size2, "radio-icon-size"),
        "--radio-icon-color": iconColor ? getThemeColor(iconColor, theme) : getAutoContrastValue(autoContrast, theme) ? getContrastColor({ color, theme, autoContrast }) : void 0
      }
    };
  }
);
const RadioIndicator = factory((_props, ref) => {
  const props = useProps("RadioIndicator", defaultProps$h, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    icon: Icon,
    radius,
    color,
    iconColor,
    autoContrast,
    checked,
    mod,
    variant,
    disabled,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "RadioIndicator",
    classes: classes$c,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$e,
    rootSelector: "indicator"
  });
  const ctx = useRadioCardContext();
  const _checked = typeof checked === "boolean" ? checked : ctx?.checked || false;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ref,
      ...getStyles("indicator", { variant }),
      variant,
      mod: [{ checked: _checked, disabled }, mod],
      ...others,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { ...getStyles("icon") })
    }
  );
});
RadioIndicator.displayName = "@mantine/core/RadioIndicator";
RadioIndicator.classes = classes$c;
const defaultProps$g = {
  labelPosition: "right"
};
const varsResolver$d = createVarsResolver(
  (theme, { size: size2, radius, color, iconColor, variant, autoContrast }) => {
    const parsedColor = parseThemeColor({ color: color || theme.primaryColor, theme });
    const outlineColor = parsedColor.isThemeColor && parsedColor.shade === void 0 ? `var(--mantine-color-${parsedColor.color}-outline)` : parsedColor.color;
    return {
      root: {
        "--radio-size": getSize(size2, "radio-size"),
        "--radio-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--radio-color": variant === "outline" ? outlineColor : getThemeColor(color, theme),
        "--radio-icon-color": iconColor ? getThemeColor(iconColor, theme) : getAutoContrastValue(autoContrast, theme) ? getContrastColor({ color, theme, autoContrast }) : void 0,
        "--radio-icon-size": getSize(size2, "radio-icon-size")
      }
    };
  }
);
const Radio = factory((_props, ref) => {
  const props = useProps("Radio", defaultProps$g, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    id,
    size: size2,
    label,
    labelPosition,
    description,
    error,
    radius,
    color,
    variant,
    disabled,
    wrapperProps,
    icon: Icon = RadioIcon,
    rootRef,
    iconColor,
    onChange,
    mod,
    attributes,
    checked,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Radio",
    classes: classes$e,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$d
  });
  const ctx = useRadioGroupContext();
  const contextSize = ctx?.size ?? size2;
  const componentSize = props.size ? size2 : contextSize;
  const { styleProps, rest } = extractStyleProps(others);
  const uuid = useId(id);
  const contextChecked = ctx ? ctx.value === rest.value : void 0;
  const withContextProps = {
    checked: contextChecked ?? checked,
    name: ctx?.name ?? rest.name,
    onChange: (event) => {
      ctx?.onChange(event);
      onChange?.(event);
    },
    disabled: ctx?.disabled ?? disabled
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    InlineInput,
    {
      ...getStyles("root"),
      __staticSelector: "Radio",
      __stylesApiProps: props,
      id: uuid,
      size: componentSize,
      labelPosition,
      label,
      description,
      error,
      disabled: withContextProps.disabled,
      classNames,
      styles,
      unstyled,
      "data-checked": (contextChecked ?? checked) || void 0,
      variant,
      ref: rootRef,
      mod,
      ...styleProps,
      ...wrapperProps,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { ...getStyles("inner"), mod: { "label-position": labelPosition }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Box,
          {
            ...getStyles("radio", { focusable: true, variant }),
            ...rest,
            ...withContextProps,
            component: "input",
            mod: { error: !!error },
            ref,
            id: uuid,
            type: "radio"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { ...getStyles("icon"), "aria-hidden": true })
      ] })
    }
  );
});
Radio.classes = classes$e;
Radio.displayName = "@mantine/core/Radio";
Radio.Group = RadioGroup;
Radio.Card = RadioCard;
Radio.Indicator = RadioIndicator;
const [RatingProvider, useRatingContext] = createSafeContext(
  "Rating was not found in tree"
);
var classes$b = { "root": "m_f8d312f2", "symbolGroup": "m_61734bb7", "starSymbol": "m_5662a89a", "input": "m_211007ba", "label": "m_21342ee4", "symbolBody": "m_fae05d6a" };
function StarIcon(props) {
  const { width, height, style, ...others } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "svg",
    {
      viewBox: "0 0 24 24",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      style: { width, height, ...style },
      ...others,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" })
    }
  );
}
StarIcon.displayName = "@mantine/core/StarIcon";
function StarSymbol({ type }) {
  const ctx = useRatingContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(StarIcon, { ...ctx.getStyles("starSymbol"), "data-filled": type === "full" || void 0 });
}
StarSymbol.displayName = "@mantine/core/StarSymbol";
function RatingItem({
  getSymbolLabel,
  emptyIcon,
  fullIcon,
  full,
  active,
  value,
  readOnly,
  fractionValue,
  color,
  id,
  onBlur,
  onChange,
  onInputChange,
  style,
  ...others
}) {
  const ctx = useRatingContext();
  const _fullIcon = typeof fullIcon === "function" ? fullIcon(value) : fullIcon;
  const _emptyIcon = typeof emptyIcon === "function" ? emptyIcon(value) : emptyIcon;
  const { dir } = useDirection();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    !readOnly && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ...ctx.getStyles("input"),
        onKeyDown: (event) => event.key === " " && onChange(value),
        id,
        type: "radio",
        "data-active": active || void 0,
        "aria-label": getSymbolLabel?.(value),
        value,
        onBlur,
        onChange: onInputChange,
        ...others
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Box,
      {
        component: readOnly ? "div" : "label",
        ...ctx.getStyles("label"),
        "data-read-only": readOnly || void 0,
        htmlFor: id,
        onClick: () => onChange(value),
        __vars: {
          "--rating-item-z-index": (fractionValue === 1 ? void 0 : active ? 2 : 0)?.toString()
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Box,
          {
            ...ctx.getStyles("symbolBody"),
            __vars: {
              "--rating-symbol-clip-path": fractionValue === 1 ? void 0 : dir === "ltr" ? `inset(0 ${active ? 100 - fractionValue * 100 : 100}% 0 0)` : `inset(0 0 0 ${active ? 100 - fractionValue * 100 : 100}% )`
            },
            children: full ? _fullIcon || /* @__PURE__ */ jsxRuntimeExports.jsx(StarSymbol, { type: "full" }) : _emptyIcon || /* @__PURE__ */ jsxRuntimeExports.jsx(StarSymbol, { type: "empty" })
          }
        )
      }
    )
  ] });
}
RatingItem.displayName = "@mantine/core/RatingItem";
function roundValueTo(value, to) {
  const rounded = Math.round(value / to) * to;
  const precision = `${to}`.split(".")[1]?.length || 0;
  return Number(rounded.toFixed(precision));
}
const defaultProps$f = {
  size: "sm",
  getSymbolLabel: (value) => `${value}`,
  count: 5,
  fractions: 1,
  color: "yellow"
};
const varsResolver$c = createVarsResolver((theme, { size: size2, color }) => ({
  root: {
    "--rating-size": getSize(size2, "rating-size"),
    "--rating-color": getThemeColor(color, theme)
  }
}));
const Rating = factory((_props, ref) => {
  const props = useProps("Rating", defaultProps$f, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    name,
    id,
    value,
    defaultValue,
    onChange,
    fractions,
    count,
    onMouseEnter,
    readOnly,
    onMouseMove,
    onHover,
    onMouseLeave,
    onTouchStart,
    onTouchEnd,
    size: size2,
    variant,
    getSymbolLabel,
    color,
    emptySymbol,
    fullSymbol,
    highlightSelectedOnly,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Rating",
    classes: classes$b,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$c
  });
  const { dir } = useDirection();
  const _name = useId(name);
  const _id = useId(id);
  const rootRef = reactExports.useRef(null);
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: 0,
    onChange
  });
  const [hovered, setHovered] = reactExports.useState(-1);
  const [isOutside, setOutside] = reactExports.useState(true);
  const _fractions = Math.floor(fractions);
  const _count = Math.floor(count);
  const decimalUnit = 1 / _fractions;
  const stableValueRounded = roundValueTo(_value, decimalUnit);
  const finalValue = hovered !== -1 ? hovered : stableValueRounded;
  const getRatingFromCoordinates = (x) => {
    if (!rootRef.current) {
      return 0;
    }
    const { left, right, width } = rootRef.current.getBoundingClientRect();
    const symbolWidth = width / _count;
    const hoverPosition = dir === "rtl" ? right - x : x - left;
    const hoverValue = hoverPosition / symbolWidth;
    return clamp$1(roundValueTo(hoverValue + decimalUnit / 2, decimalUnit), decimalUnit, _count);
  };
  const handleMouseEnter = (event) => {
    onMouseEnter?.(event);
    !readOnly && setOutside(false);
  };
  const handleMouseMove = (event) => {
    onMouseMove?.(event);
    if (readOnly) {
      return;
    }
    const rounded = getRatingFromCoordinates(event.clientX);
    setHovered(rounded);
    rounded !== hovered && onHover?.(rounded);
  };
  const handleMouseLeave = (event) => {
    onMouseLeave?.(event);
    if (readOnly) {
      return;
    }
    setHovered(-1);
    setOutside(true);
    hovered !== -1 && onHover?.(-1);
  };
  const handleTouchStart = (event) => {
    const { touches } = event;
    if (touches.length !== 1) {
      return;
    }
    if (!readOnly) {
      const touch = touches[0];
      setValue(getRatingFromCoordinates(touch.clientX));
    }
    onTouchStart?.(event);
  };
  const handleTouchEnd = (event) => {
    event.preventDefault();
    onTouchEnd?.(event);
  };
  const handleItemBlur = () => isOutside && setHovered(-1);
  const handleInputChange = (event) => {
    if (!readOnly) {
      if (typeof event === "number") {
        setHovered(event);
      } else {
        setHovered(parseFloat(event.target.value));
      }
    }
  };
  const handleChange = (event) => {
    if (!readOnly) {
      if (typeof event === "number") {
        setValue(event);
      } else {
        setValue(parseFloat(event.target.value));
      }
    }
  };
  const items = Array(_count).fill(0).map((_, index) => {
    const integerValue = index + 1;
    const fractionItems = Array.from(new Array(index === 0 ? _fractions + 1 : _fractions));
    const isGroupActive = !readOnly && Math.ceil(hovered) === integerValue;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        "data-active": isGroupActive || void 0,
        ...getStyles("symbolGroup"),
        children: fractionItems.map((__, fractionIndex) => {
          const fractionValue = decimalUnit * (index === 0 ? fractionIndex : fractionIndex + 1);
          const symbolValue = roundValueTo(integerValue - 1 + fractionValue, decimalUnit);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            RatingItem,
            {
              getSymbolLabel,
              emptyIcon: emptySymbol,
              fullIcon: fullSymbol,
              full: highlightSelectedOnly ? symbolValue === finalValue : symbolValue <= finalValue,
              active: symbolValue === finalValue,
              checked: symbolValue === stableValueRounded,
              readOnly,
              fractionValue,
              value: symbolValue,
              name: _name,
              onChange: handleChange,
              onBlur: handleItemBlur,
              onInputChange: handleInputChange,
              id: `${_id}-${index}-${fractionIndex}`
            },
            `${integerValue}-${symbolValue}`
          );
        })
      },
      integerValue
    );
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RatingProvider, { value: { getStyles }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ref: useMergedRef(rootRef, ref),
      ...getStyles("root"),
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
      variant,
      size: size2,
      id: _id,
      ...others,
      children: items
    }
  ) });
});
Rating.classes = classes$b;
Rating.displayName = "@mantine/core/Rating";
const defaultTransition = {
  duration: 100,
  transition: "fade"
};
function getTransitionProps(transitionProps, componentTransition) {
  return { ...defaultTransition, ...componentTransition, ...transitionProps };
}
var classes$a = { "tooltip": "m_1b3c8819", "arrow": "m_f898399f" };
function useFloatingTooltip({
  offset: offset2,
  position,
  defaultOpened
}) {
  const [opened, setOpened] = reactExports.useState(defaultOpened);
  const boundaryRef = reactExports.useRef(null);
  const { x, y, elements, refs, update, placement } = useFloating({
    placement: position,
    middleware: [
      shift({
        crossAxis: true,
        padding: 5,
        rootBoundary: "document"
      })
    ]
  });
  const horizontalOffset = placement.includes("right") ? offset2 : position.includes("left") ? offset2 * -1 : 0;
  const verticalOffset = placement.includes("bottom") ? offset2 : position.includes("top") ? offset2 * -1 : 0;
  const handleMouseMove = reactExports.useCallback(
    ({ clientX, clientY }) => {
      refs.setPositionReference({
        getBoundingClientRect() {
          return {
            width: 0,
            height: 0,
            x: clientX,
            y: clientY,
            left: clientX + horizontalOffset,
            top: clientY + verticalOffset,
            right: clientX,
            bottom: clientY
          };
        }
      });
    },
    [elements.reference]
  );
  reactExports.useEffect(() => {
    if (refs.floating.current) {
      const boundary = boundaryRef.current;
      boundary.addEventListener("mousemove", handleMouseMove);
      const parents = getOverflowAncestors(refs.floating.current);
      parents.forEach((parent) => {
        parent.addEventListener("scroll", update);
      });
      return () => {
        boundary.removeEventListener("mousemove", handleMouseMove);
        parents.forEach((parent) => {
          parent.removeEventListener("scroll", update);
        });
      };
    }
    return void 0;
  }, [elements.reference, refs.floating.current, update, handleMouseMove, opened]);
  return { handleMouseMove, x, y, opened, setOpened, boundaryRef, floating: refs.setFloating };
}
const defaultProps$e = {
  refProp: "ref",
  withinPortal: true,
  offset: 10,
  position: "right",
  zIndex: getDefaultZIndex("popover")
};
const varsResolver$b = createVarsResolver((theme, { radius, color }) => ({
  tooltip: {
    "--tooltip-radius": radius === void 0 ? void 0 : getRadius(radius),
    "--tooltip-bg": color ? getThemeColor(color, theme) : void 0,
    "--tooltip-color": color ? "var(--mantine-color-white)" : void 0
  }
}));
const TooltipFloating = factory((_props, ref) => {
  const props = useProps("TooltipFloating", defaultProps$e, _props);
  const {
    children,
    refProp,
    withinPortal,
    style,
    className,
    classNames,
    styles,
    unstyled,
    radius,
    color,
    label,
    offset: offset2,
    position,
    multiline,
    zIndex,
    disabled,
    defaultOpened,
    variant,
    vars,
    portalProps,
    attributes,
    ...others
  } = props;
  const theme = useMantineTheme();
  const getStyles = useStyles({
    name: "TooltipFloating",
    props,
    classes: classes$a,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    rootSelector: "tooltip",
    vars,
    varsResolver: varsResolver$b
  });
  const { handleMouseMove, x, y, opened, boundaryRef, floating, setOpened } = useFloatingTooltip({
    offset: offset2,
    position,
    defaultOpened
  });
  const child = getSingleElementChild(children);
  if (!child) {
    throw new Error(
      "[@mantine/core] Tooltip.Floating component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported"
    );
  }
  const targetRef = useMergedRef(boundaryRef, getRefProp(child), ref);
  const childProps = child.props;
  const onMouseEnter = (event) => {
    childProps.onMouseEnter?.(event);
    handleMouseMove(event);
    setOpened(true);
  };
  const onMouseLeave = (event) => {
    childProps.onMouseLeave?.(event);
    setOpened(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(OptionalPortal, { ...portalProps, withinPortal, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Box,
      {
        ...others,
        ...getStyles("tooltip", {
          style: {
            ...getStyleObject(style, theme),
            zIndex,
            display: !disabled && opened ? "block" : "none",
            top: (y && Math.round(y)) ?? "",
            left: (x && Math.round(x)) ?? ""
          }
        }),
        variant,
        ref: floating,
        mod: { multiline },
        children: label
      }
    ) }),
    reactExports.cloneElement(child, {
      ...childProps,
      [refProp]: targetRef,
      onMouseEnter,
      onMouseLeave
    })
  ] });
});
TooltipFloating.classes = classes$a;
TooltipFloating.displayName = "@mantine/core/TooltipFloating";
const TooltipGroupContext = reactExports.createContext(false);
const TooltipGroupProvider = TooltipGroupContext.Provider;
const useTooltipGroupContext = () => reactExports.useContext(TooltipGroupContext);
const defaultProps$d = {
  openDelay: 0,
  closeDelay: 0
};
function TooltipGroup(props) {
  const { openDelay, closeDelay, children } = useProps("TooltipGroup", defaultProps$d, props);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipGroupProvider, { value: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingDelayGroup, { delay: { open: openDelay, close: closeDelay }, children }) });
}
TooltipGroup.displayName = "@mantine/core/TooltipGroup";
TooltipGroup.extend = (c) => c;
function getDefaultMiddlewares(middlewares) {
  if (middlewares === void 0) {
    return { shift: true, flip: true };
  }
  const result = { ...middlewares };
  if (middlewares.shift === void 0) {
    result.shift = true;
  }
  if (middlewares.flip === void 0) {
    result.flip = true;
  }
  return result;
}
function getTooltipMiddlewares(settings) {
  const middlewaresOptions = getDefaultMiddlewares(settings.middlewares);
  const middlewares = [offset(settings.offset)];
  if (middlewaresOptions.shift) {
    middlewares.push(
      shift(
        typeof middlewaresOptions.shift === "boolean" ? { padding: 8 } : { padding: 8, ...middlewaresOptions.shift }
      )
    );
  }
  if (middlewaresOptions.flip) {
    middlewares.push(
      typeof middlewaresOptions.flip === "boolean" ? flip() : flip(middlewaresOptions.flip)
    );
  }
  middlewares.push(arrow({ element: settings.arrowRef, padding: settings.arrowOffset }));
  if (middlewaresOptions.inline) {
    middlewares.push(
      typeof middlewaresOptions.inline === "boolean" ? inline() : inline(middlewaresOptions.inline)
    );
  } else if (settings.inline) {
    middlewares.push(inline());
  }
  return middlewares;
}
function useTooltip(settings) {
  const [uncontrolledOpened, setUncontrolledOpened] = reactExports.useState(settings.defaultOpened);
  const controlled = typeof settings.opened === "boolean";
  const opened = controlled ? settings.opened : uncontrolledOpened;
  const withinGroup = useTooltipGroupContext();
  const uid = useId();
  const onChange = reactExports.useCallback(
    (_opened) => {
      setUncontrolledOpened(_opened);
      if (_opened) {
        setCurrentId(uid);
      }
    },
    [uid]
  );
  const {
    x,
    y,
    context,
    refs,
    placement,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} }
  } = useFloating({
    strategy: settings.strategy,
    placement: settings.position,
    open: opened,
    onOpenChange: onChange,
    middleware: getTooltipMiddlewares(settings),
    whileElementsMounted: autoUpdate
  });
  const { delay: groupDelay, currentId, setCurrentId } = useDelayGroup(context, { id: uid });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context, {
      enabled: settings.events?.hover,
      delay: withinGroup ? groupDelay : { open: settings.openDelay, close: settings.closeDelay },
      mouseOnly: !settings.events?.touch
    }),
    useFocus(context, { enabled: settings.events?.focus, visibleOnly: true }),
    useRole(context, { role: "tooltip" }),
    // Cannot be used with controlled tooltip, page jumps
    useDismiss(context, { enabled: typeof settings.opened === "undefined" })
  ]);
  useDidUpdate(() => {
    settings.onPositionChange?.(placement);
  }, [placement]);
  const isGroupPhase = opened && currentId && currentId !== uid;
  return {
    x,
    y,
    arrowX,
    arrowY,
    reference: refs.setReference,
    floating: refs.setFloating,
    getFloatingProps,
    getReferenceProps,
    isGroupPhase,
    opened,
    placement
  };
}
const defaultProps$c = {
  position: "top",
  refProp: "ref",
  withinPortal: true,
  arrowSize: 4,
  arrowOffset: 5,
  arrowRadius: 0,
  arrowPosition: "side",
  offset: 5,
  transitionProps: { duration: 100, transition: "fade" },
  events: { hover: true, focus: false, touch: false },
  zIndex: getDefaultZIndex("popover"),
  positionDependencies: [],
  middlewares: { flip: true, shift: true, inline: false }
};
const varsResolver$a = createVarsResolver(
  (theme, { radius, color, variant, autoContrast }) => {
    const colors = theme.variantColorResolver({
      theme,
      color: color || theme.primaryColor,
      autoContrast,
      variant: variant || "filled"
    });
    return {
      tooltip: {
        "--tooltip-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--tooltip-bg": color ? colors.background : void 0,
        "--tooltip-color": color ? colors.color : void 0
      }
    };
  }
);
const Tooltip = factory((_props, ref) => {
  const props = useProps("Tooltip", defaultProps$c, _props);
  const {
    children,
    position,
    refProp,
    label,
    openDelay,
    closeDelay,
    onPositionChange,
    opened,
    defaultOpened,
    withinPortal,
    radius,
    color,
    classNames,
    styles,
    unstyled,
    style,
    className,
    withArrow,
    arrowSize,
    arrowOffset,
    arrowRadius,
    arrowPosition,
    offset: offset2,
    transitionProps,
    multiline,
    events,
    zIndex,
    disabled,
    // Scheduled for removal in 9.0
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    positionDependencies,
    onClick,
    onMouseEnter,
    onMouseLeave,
    inline: inline2,
    variant,
    keepMounted,
    vars,
    portalProps,
    mod,
    floatingStrategy,
    middlewares,
    autoContrast,
    attributes,
    target,
    ...others
  } = useProps("Tooltip", defaultProps$c, props);
  const { dir } = useDirection();
  const arrowRef = reactExports.useRef(null);
  const tooltip = useTooltip({
    position: getFloatingPosition(dir, position),
    closeDelay,
    openDelay,
    onPositionChange,
    opened,
    defaultOpened,
    events,
    arrowRef,
    arrowOffset,
    offset: typeof offset2 === "number" ? offset2 + (withArrow ? arrowSize / 2 : 0) : offset2,
    positionDependencies: [...positionDependencies, target ?? children],
    inline: inline2,
    strategy: floatingStrategy,
    middlewares
  });
  reactExports.useEffect(() => {
    const targetNode = target instanceof HTMLElement ? target : typeof target === "string" ? document.querySelector(target) : target?.current || null;
    if (targetNode) {
      tooltip.reference(targetNode);
    }
  }, [target, tooltip]);
  const getStyles = useStyles({
    name: "Tooltip",
    props,
    classes: classes$a,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    rootSelector: "tooltip",
    vars,
    varsResolver: varsResolver$a
  });
  const child = getSingleElementChild(children);
  if (!target && !child) {
    throw new Error(
      "[@mantine/core] Tooltip component children should be an element or a component that accepts ref, fragments, strings, numbers and other primitive values are not supported"
    );
  }
  if (target) {
    const transition2 = getTransitionProps(transitionProps, { duration: 100, transition: "fade" });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(OptionalPortal, { ...portalProps, withinPortal, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Transition,
      {
        ...transition2,
        keepMounted,
        mounted: !disabled && !!tooltip.opened,
        duration: tooltip.isGroupPhase ? 10 : transition2.duration,
        children: (transitionStyles) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Box,
          {
            ...others,
            "data-fixed": floatingStrategy === "fixed" || void 0,
            variant,
            mod: [{ multiline }, mod],
            ...tooltip.getFloatingProps({
              ref: tooltip.floating,
              className: getStyles("tooltip").className,
              style: {
                ...getStyles("tooltip").style,
                ...transitionStyles,
                zIndex,
                top: tooltip.y ?? 0,
                left: tooltip.x ?? 0
              }
            }),
            children: [
              label,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FloatingArrow,
                {
                  ref: arrowRef,
                  arrowX: tooltip.arrowX,
                  arrowY: tooltip.arrowY,
                  visible: withArrow,
                  position: tooltip.placement,
                  arrowSize,
                  arrowOffset,
                  arrowRadius,
                  arrowPosition,
                  ...getStyles("arrow")
                }
              )
            ]
          }
        )
      }
    ) }) });
  }
  const childProps = child.props;
  const targetRef = useMergedRef(tooltip.reference, getRefProp(child), ref);
  const transition = getTransitionProps(transitionProps, { duration: 100, transition: "fade" });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(OptionalPortal, { ...portalProps, withinPortal, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Transition,
      {
        ...transition,
        keepMounted,
        mounted: !disabled && !!tooltip.opened,
        duration: tooltip.isGroupPhase ? 10 : transition.duration,
        children: (transitionStyles) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Box,
          {
            ...others,
            "data-fixed": floatingStrategy === "fixed" || void 0,
            variant,
            mod: [{ multiline }, mod],
            ...tooltip.getFloatingProps({
              ref: tooltip.floating,
              className: getStyles("tooltip").className,
              style: {
                ...getStyles("tooltip").style,
                ...transitionStyles,
                zIndex,
                top: tooltip.y ?? 0,
                left: tooltip.x ?? 0
              }
            }),
            children: [
              label,
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                FloatingArrow,
                {
                  ref: arrowRef,
                  arrowX: tooltip.arrowX,
                  arrowY: tooltip.arrowY,
                  visible: withArrow,
                  position: tooltip.placement,
                  arrowSize,
                  arrowOffset,
                  arrowRadius,
                  arrowPosition,
                  ...getStyles("arrow")
                }
              )
            ]
          }
        )
      }
    ) }),
    reactExports.cloneElement(
      child,
      tooltip.getReferenceProps({
        onClick,
        onMouseEnter,
        onMouseLeave,
        onMouseMove: props.onMouseMove,
        onPointerDown: props.onPointerDown,
        onPointerEnter: props.onPointerEnter,
        ...childProps,
        className: clsx(className, childProps.className),
        [refProp]: targetRef
      })
    )
  ] });
});
Tooltip.classes = classes$a;
Tooltip.displayName = "@mantine/core/Tooltip";
Tooltip.Floating = TooltipFloating;
Tooltip.Group = TooltipGroup;
function getCurveProps({ size: size2, thickness, sum, value, root, offset: offset2 }) {
  const radius = (size2 * 0.9 - thickness * 2) / 2;
  const deg = Math.PI * radius * 2 / 100;
  const strokeDasharray = root || value === void 0 ? `${(100 - sum) * deg}, ${sum * deg}` : `${value * deg}, ${(100 - value) * deg}`;
  return {
    strokeWidth: Number.isNaN(thickness) ? 12 : thickness,
    cx: size2 / 2 || 0,
    cy: size2 / 2 || 0,
    r: radius || 0,
    transform: root ? `scale(1, -1) translate(0, -${size2})` : void 0,
    strokeDasharray,
    strokeDashoffset: root ? 0 : offset2 || 0
  };
}
function Curve({
  size: size2,
  value,
  offset: offset2,
  sum,
  thickness,
  root,
  color,
  lineRoundCaps,
  tooltip,
  getStyles,
  display,
  ...others
}) {
  const theme = useMantineTheme();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip.Floating, { disabled: !tooltip, label: tooltip, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      component: "circle",
      ...others,
      ...getStyles("curve"),
      __vars: { "--curve-color": color ? getThemeColor(color, theme) : void 0 },
      fill: "none",
      strokeLinecap: lineRoundCaps ? "round" : "butt",
      ...getCurveProps({ sum, size: size2, thickness, value, offset: offset2, root })
    }
  ) });
}
Curve.displayName = "@mantine/core/Curve";
function getCurves({
  size: size2,
  thickness,
  sections,
  renderRoundedLineCaps,
  rootColor
}) {
  const sum = sections.reduce((acc, current) => acc + current.value, 0);
  const accumulated = Math.PI * ((size2 * 0.9 - thickness * 2) / 2) * 2;
  let offset2 = accumulated;
  const curves = [];
  const curvesInOrder = [];
  for (let i = 0; i < sections.length; i += 1) {
    curves.push({ sum, offset: offset2, data: sections[i], root: false });
    offset2 -= sections[i].value / 100 * accumulated;
  }
  curves.push({ sum, offset: offset2, data: { color: rootColor }, root: true });
  curvesInOrder.push({ ...curves[curves.length - 1], lineRoundCaps: false });
  if (curves.length > 2) {
    curvesInOrder.push({ ...curves[0], lineRoundCaps: renderRoundedLineCaps });
    curvesInOrder.push({ ...curves[curves.length - 2], lineRoundCaps: renderRoundedLineCaps });
    for (let i = 1; i <= curves.length - 3; i += 1) {
      curvesInOrder.push({ ...curves[i], lineRoundCaps: false });
    }
  } else {
    curvesInOrder.push({ ...curves[0], lineRoundCaps: renderRoundedLineCaps });
  }
  return curvesInOrder;
}
var classes$9 = { "root": "m_b32e4812", "svg": "m_d43b5134", "curve": "m_b1ca1fbf", "label": "m_b23f9dc4" };
function getClampedThickness(thickness, size2) {
  return Math.min(thickness || 12, (size2 || 120) / 4);
}
const defaultProps$b = {
  size: 120,
  thickness: 12
};
const varsResolver$9 = createVarsResolver(
  (_, { size: size2, thickness, transitionDuration }) => ({
    root: {
      "--rp-size": rem(size2),
      "--rp-label-offset": rem(thickness * 2),
      "--rp-transition-duration": transitionDuration ? `${transitionDuration}ms` : void 0
    }
  })
);
const RingProgress = factory((_props, ref) => {
  const props = useProps("RingProgress", defaultProps$b, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    label,
    sections,
    size: size2,
    thickness,
    roundCaps,
    rootColor,
    transitionDuration,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "RingProgress",
    classes: classes$9,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$9
  });
  const clampedThickness = getClampedThickness(thickness, size2);
  const curves = getCurves({
    size: size2,
    thickness: clampedThickness,
    sections,
    renderRoundedLineCaps: roundCaps,
    rootColor
  }).map(({ data, sum, root, lineRoundCaps, offset: offset2 }, index) => /* @__PURE__ */ reactExports.createElement(
    Curve,
    {
      ...data,
      key: index,
      size: size2,
      thickness: clampedThickness,
      sum,
      offset: offset2,
      color: data?.color,
      root,
      lineRoundCaps,
      getStyles
    }
  ));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { ...getStyles("root"), size: size2, ref, ...others, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { ...getStyles("svg"), children: curves }),
    label && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...getStyles("label"), children: label })
  ] });
});
RingProgress.classes = classes$9;
RingProgress.displayName = "@mantine/core/RingProgress";
const defaultProps$a = {
  withCheckIcon: true,
  allowDeselect: true,
  checkIconPosition: "left",
  openOnFocus: true
};
const Select = factory((_props, ref) => {
  const props = useProps("Select", defaultProps$a, _props);
  const {
    classNames,
    styles,
    unstyled,
    vars,
    dropdownOpened,
    defaultDropdownOpened,
    onDropdownClose,
    onDropdownOpen,
    onFocus,
    onBlur,
    onClick,
    onChange,
    data,
    value,
    defaultValue,
    selectFirstOptionOnChange,
    selectFirstOptionOnDropdownOpen,
    onOptionSubmit,
    comboboxProps,
    readOnly,
    disabled,
    filter,
    limit,
    withScrollArea,
    maxDropdownHeight,
    size: size2,
    searchable,
    rightSection,
    checkIconPosition,
    withCheckIcon,
    withAlignedLabels,
    nothingFoundMessage,
    name,
    form,
    searchValue,
    defaultSearchValue,
    onSearchChange,
    allowDeselect,
    error,
    rightSectionPointerEvents,
    id,
    clearable,
    clearButtonProps,
    hiddenInputProps,
    renderOption,
    onClear,
    autoComplete,
    scrollAreaProps,
    __defaultRightSection,
    __clearSection,
    __clearable,
    chevronColor,
    autoSelectOnBlur,
    openOnFocus,
    attributes,
    ...others
  } = props;
  const parsedData = reactExports.useMemo(() => getParsedComboboxData(data), [data]);
  const retainedSelectedOptions = reactExports.useRef({});
  const optionsLockup = reactExports.useMemo(() => getOptionsLockup(parsedData), [parsedData]);
  const _id = useId(id);
  const [_value, setValue, controlled] = useUncontrolled({
    value,
    defaultValue,
    finalValue: null,
    onChange
  });
  const selectedOption = typeof _value === "string" ? _value in optionsLockup ? optionsLockup[_value] : retainedSelectedOptions.current[_value] : void 0;
  const previousSelectedOption = usePrevious(selectedOption);
  const [search, setSearch, searchControlled] = useUncontrolled({
    value: searchValue,
    defaultValue: defaultSearchValue,
    finalValue: selectedOption ? selectedOption.label : "",
    onChange: onSearchChange
  });
  const combobox = useCombobox({
    opened: dropdownOpened,
    defaultOpened: defaultDropdownOpened,
    onDropdownOpen: () => {
      onDropdownOpen?.();
      if (selectFirstOptionOnDropdownOpen) {
        combobox.selectFirstOption();
      } else {
        combobox.updateSelectedOptionIndex("active", { scrollIntoView: true });
      }
    },
    onDropdownClose: () => {
      onDropdownClose?.();
      setTimeout(combobox.resetSelectedOption, 0);
    }
  });
  const handleSearchChange = (value2) => {
    setSearch(value2);
    combobox.resetSelectedOption();
  };
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    props,
    styles,
    classNames
  });
  reactExports.useEffect(() => {
    if (selectFirstOptionOnChange) {
      combobox.selectFirstOption();
    }
  }, [selectFirstOptionOnChange, search]);
  reactExports.useEffect(() => {
    if (value === null) {
      handleSearchChange("");
    }
    if (typeof value === "string" && selectedOption && (previousSelectedOption?.value !== selectedOption.value || previousSelectedOption?.label !== selectedOption.label)) {
      handleSearchChange(selectedOption.label);
    }
  }, [value, selectedOption]);
  reactExports.useEffect(() => {
    if (!controlled && !searchControlled) {
      handleSearchChange(
        typeof _value === "string" ? _value in optionsLockup ? optionsLockup[_value]?.label : retainedSelectedOptions.current[_value]?.label || "" : ""
      );
    }
  }, [optionsLockup, _value]);
  reactExports.useEffect(() => {
    if (_value) {
      if (_value in optionsLockup) {
        retainedSelectedOptions.current[_value] = optionsLockup[_value];
      }
    }
  }, [optionsLockup, _value]);
  const clearButton = /* @__PURE__ */ jsxRuntimeExports.jsx(
    Combobox.ClearButton,
    {
      ...clearButtonProps,
      onClear: () => {
        setValue(null, null);
        handleSearchChange("");
        onClear?.();
      }
    }
  );
  const _clearable = clearable && !!_value && !disabled && !readOnly;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Combobox,
      {
        store: combobox,
        __staticSelector: "Select",
        classNames: resolvedClassNames,
        styles: resolvedStyles,
        unstyled,
        readOnly,
        size: size2,
        attributes,
        keepMounted: autoSelectOnBlur,
        onOptionSubmit: (val) => {
          onOptionSubmit?.(val);
          const optionLockup = allowDeselect ? optionsLockup[val].value === _value ? null : optionsLockup[val] : optionsLockup[val];
          const nextValue = optionLockup ? optionLockup.value : null;
          nextValue !== _value && setValue(nextValue, optionLockup);
          !controlled && handleSearchChange(typeof nextValue === "string" ? optionLockup?.label || "" : "");
          combobox.closeDropdown();
        },
        ...comboboxProps,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Combobox.Target, { targetType: searchable ? "input" : "button", autoComplete, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            InputBase,
            {
              id: _id,
              ref,
              __defaultRightSection: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Combobox.Chevron,
                {
                  size: size2,
                  error,
                  unstyled,
                  color: chevronColor
                }
              ),
              __clearSection: clearButton,
              __clearable: _clearable,
              rightSection,
              rightSectionPointerEvents: rightSectionPointerEvents || "none",
              ...others,
              size: size2,
              __staticSelector: "Select",
              disabled,
              readOnly: readOnly || !searchable,
              value: search,
              onChange: (event) => {
                handleSearchChange(event.currentTarget.value);
                combobox.openDropdown();
                selectFirstOptionOnChange && combobox.selectFirstOption();
              },
              onFocus: (event) => {
                openOnFocus && !!searchable && combobox.openDropdown();
                onFocus?.(event);
              },
              onBlur: (event) => {
                if (autoSelectOnBlur) {
                  combobox.clickSelectedOption();
                }
                !!searchable && combobox.closeDropdown();
                const optionLockup = typeof _value === "string" && (_value in optionsLockup ? optionsLockup[_value] : retainedSelectedOptions.current[_value]);
                handleSearchChange(optionLockup ? optionLockup.label || "" : "");
                onBlur?.(event);
              },
              onClick: (event) => {
                searchable ? combobox.openDropdown() : combobox.toggleDropdown();
                onClick?.(event);
              },
              classNames: resolvedClassNames,
              styles: resolvedStyles,
              unstyled,
              pointer: !searchable,
              error,
              attributes
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            OptionsDropdown,
            {
              data: parsedData,
              hidden: readOnly || disabled,
              filter,
              search,
              limit,
              hiddenWhenEmpty: !nothingFoundMessage,
              withScrollArea,
              maxDropdownHeight,
              filterOptions: !!searchable && selectedOption?.label !== search,
              value: _value,
              checkIconPosition,
              withCheckIcon,
              withAlignedLabels,
              nothingFoundMessage,
              unstyled,
              labelId: others.label ? `${_id}-label` : void 0,
              "aria-label": others.label ? void 0 : others["aria-label"],
              renderOption,
              scrollAreaProps
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Combobox.HiddenInput,
      {
        value: _value,
        name,
        form,
        disabled,
        ...hiddenInputProps
      }
    )
  ] });
});
Select.classes = { ...InputBase.classes, ...Combobox.classes };
Select.displayName = "@mantine/core/Select";
var classes$8 = { "container": "m_925c2d2c", "root": "m_2415a157" };
function SimpleGridMediaVariables({
  spacing,
  verticalSpacing,
  cols,
  selector
}) {
  const theme = useMantineTheme();
  const _verticalSpacing = verticalSpacing === void 0 ? spacing : verticalSpacing;
  const baseStyles = filterProps({
    "--sg-spacing-x": getSpacing(getBaseValue$1(spacing)),
    "--sg-spacing-y": getSpacing(getBaseValue$1(_verticalSpacing)),
    "--sg-cols": getBaseValue$1(cols)?.toString()
  });
  const queries = keys(theme.breakpoints).reduce(
    (acc, breakpoint) => {
      if (!acc[breakpoint]) {
        acc[breakpoint] = {};
      }
      if (typeof spacing === "object" && spacing[breakpoint] !== void 0) {
        acc[breakpoint]["--sg-spacing-x"] = getSpacing(spacing[breakpoint]);
      }
      if (typeof _verticalSpacing === "object" && _verticalSpacing[breakpoint] !== void 0) {
        acc[breakpoint]["--sg-spacing-y"] = getSpacing(_verticalSpacing[breakpoint]);
      }
      if (typeof cols === "object" && cols[breakpoint] !== void 0) {
        acc[breakpoint]["--sg-cols"] = cols[breakpoint];
      }
      return acc;
    },
    {}
  );
  const sortedBreakpoints = getSortedBreakpoints(keys(queries), theme.breakpoints).filter(
    (breakpoint) => keys(queries[breakpoint.value]).length > 0
  );
  const media = sortedBreakpoints.map((breakpoint) => ({
    query: `(min-width: ${theme.breakpoints[breakpoint.value]})`,
    styles: queries[breakpoint.value]
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(InlineStyles, { styles: baseStyles, media, selector });
}
function getBreakpoints(values2) {
  if (typeof values2 === "object" && values2 !== null) {
    return keys(values2);
  }
  return [];
}
function sortBreakpoints(breakpoints) {
  return breakpoints.sort((a, b) => px(a) - px(b));
}
function getUniqueBreakpoints({
  spacing,
  verticalSpacing,
  cols
}) {
  const breakpoints = Array.from(
    /* @__PURE__ */ new Set([
      ...getBreakpoints(spacing),
      ...getBreakpoints(verticalSpacing),
      ...getBreakpoints(cols)
    ])
  );
  return sortBreakpoints(breakpoints);
}
function SimpleGridContainerVariables({
  spacing,
  verticalSpacing,
  cols,
  selector
}) {
  const _verticalSpacing = verticalSpacing === void 0 ? spacing : verticalSpacing;
  const baseStyles = filterProps({
    "--sg-spacing-x": getSpacing(getBaseValue$1(spacing)),
    "--sg-spacing-y": getSpacing(getBaseValue$1(_verticalSpacing)),
    "--sg-cols": getBaseValue$1(cols)?.toString()
  });
  const uniqueBreakpoints = getUniqueBreakpoints({ spacing, verticalSpacing, cols });
  const queries = uniqueBreakpoints.reduce(
    (acc, breakpoint) => {
      if (!acc[breakpoint]) {
        acc[breakpoint] = {};
      }
      if (typeof spacing === "object" && spacing[breakpoint] !== void 0) {
        acc[breakpoint]["--sg-spacing-x"] = getSpacing(spacing[breakpoint]);
      }
      if (typeof _verticalSpacing === "object" && _verticalSpacing[breakpoint] !== void 0) {
        acc[breakpoint]["--sg-spacing-y"] = getSpacing(_verticalSpacing[breakpoint]);
      }
      if (typeof cols === "object" && cols[breakpoint] !== void 0) {
        acc[breakpoint]["--sg-cols"] = cols[breakpoint];
      }
      return acc;
    },
    {}
  );
  const media = uniqueBreakpoints.map((breakpoint) => ({
    query: `simple-grid (min-width: ${breakpoint})`,
    styles: queries[breakpoint]
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(InlineStyles, { styles: baseStyles, container: media, selector });
}
const defaultProps$9 = {
  cols: 1,
  spacing: "md",
  type: "media"
};
const SimpleGrid = factory((_props, ref) => {
  const props = useProps("SimpleGrid", defaultProps$9, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    cols,
    verticalSpacing,
    spacing,
    type,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "SimpleGrid",
    classes: classes$8,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars
  });
  const responsiveClassName = useRandomClassName();
  if (type === "container") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleGridContainerVariables, { ...props, selector: `.${responsiveClassName}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...getStyles("container"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ref, ...getStyles("root", { className: responsiveClassName }), ...others }) })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleGridMediaVariables, { ...props, selector: `.${responsiveClassName}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ref, ...getStyles("root", { className: responsiveClassName }), ...others })
  ] });
});
SimpleGrid.classes = classes$8;
SimpleGrid.displayName = "@mantine/core/SimpleGrid";
var classes$7 = { "root": "m_18320242", "skeleton-fade": "m_299c329c" };
const defaultProps$8 = {
  visible: true,
  animate: true
};
const varsResolver$8 = createVarsResolver(
  (_, { width, height, radius, circle }) => ({
    root: {
      "--skeleton-height": rem(height),
      "--skeleton-width": circle ? rem(height) : rem(width),
      "--skeleton-radius": circle ? "1000px" : radius === void 0 ? void 0 : getRadius(radius)
    }
  })
);
const Skeleton = factory((_props, ref) => {
  const props = useProps("Skeleton", defaultProps$8, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    width,
    height,
    circle,
    visible,
    radius,
    animate,
    mod,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Skeleton",
    classes: classes$7,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$8
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ref, ...getStyles("root"), mod: [{ visible, animate }, mod], ...others });
});
Skeleton.classes = classes$7;
Skeleton.displayName = "@mantine/core/Skeleton";
var classes$6 = { "root": "m_6d731127" };
const defaultProps$7 = {
  gap: "md",
  align: "stretch",
  justify: "flex-start"
};
const varsResolver$7 = createVarsResolver((_, { gap, align, justify }) => ({
  root: {
    "--stack-gap": getSpacing(gap),
    "--stack-align": align,
    "--stack-justify": justify
  }
}));
const Stack = factory((_props, ref) => {
  const props = useProps("Stack", defaultProps$7, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    align,
    justify,
    gap,
    variant,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Stack",
    props,
    classes: classes$6,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$7
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ref, ...getStyles("root"), variant, ...others });
});
Stack.classes = classes$6;
Stack.displayName = "@mantine/core/Stack";
var classes$5 = { "root": "m_5f93f3bb", "input": "m_926b4011", "track": "m_9307d992", "thumb": "m_93039a1d", "trackLabel": "m_8277e082" };
const SwitchGroupContext = reactExports.createContext(null);
const SwitchGroupProvider = SwitchGroupContext.Provider;
const useSwitchGroupContext = () => reactExports.useContext(SwitchGroupContext);
const SwitchGroup = factory((props, ref) => {
  const {
    value,
    defaultValue,
    onChange,
    size: size2,
    wrapperProps,
    children,
    readOnly,
    disabled,
    ...others
  } = useProps("SwitchGroup", null, props);
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: [],
    onChange
  });
  const handleChange = (event) => {
    const itemValue = event.currentTarget.value;
    !readOnly && setValue(
      _value.includes(itemValue) ? _value.filter((item) => item !== itemValue) : [..._value, itemValue]
    );
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SwitchGroupProvider, { value: { value: _value, onChange: handleChange, size: size2, disabled }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Input.Wrapper,
    {
      size: size2,
      ref,
      ...wrapperProps,
      ...others,
      labelElement: "div",
      __staticSelector: "SwitchGroup",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputsGroupFieldset, { role: "group", children })
    }
  ) });
});
SwitchGroup.classes = Input.Wrapper.classes;
SwitchGroup.displayName = "@mantine/core/SwitchGroup";
const defaultProps$6 = {
  labelPosition: "right",
  withThumbIndicator: true
};
const varsResolver$6 = createVarsResolver((theme, { radius, color, size: size2 }) => ({
  root: {
    "--switch-radius": radius === void 0 ? void 0 : getRadius(radius),
    "--switch-height": getSize(size2, "switch-height"),
    "--switch-width": getSize(size2, "switch-width"),
    "--switch-thumb-size": getSize(size2, "switch-thumb-size"),
    "--switch-label-font-size": getSize(size2, "switch-label-font-size"),
    "--switch-track-label-padding": getSize(size2, "switch-track-label-padding"),
    "--switch-color": color ? getThemeColor(color, theme) : void 0
  }
}));
const Switch = factory((_props, ref) => {
  const props = useProps("Switch", defaultProps$6, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    color,
    label,
    offLabel,
    onLabel,
    id,
    size: size2,
    radius,
    wrapperProps,
    thumbIcon,
    checked,
    defaultChecked,
    onChange,
    labelPosition,
    description,
    error,
    disabled,
    variant,
    rootRef,
    mod,
    withThumbIndicator,
    attributes,
    ...others
  } = props;
  const ctx = useSwitchGroupContext();
  const _size = size2 || ctx?.size;
  const getStyles = useStyles({
    name: "Switch",
    props,
    classes: classes$5,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$6
  });
  const { styleProps, rest } = extractStyleProps(others);
  const uuid = useId(id);
  const withContextProps = {
    checked: ctx?.value.includes(rest.value) ?? checked,
    onChange: (event) => {
      ctx?.onChange(event);
      onChange?.(event);
    },
    disabled: ctx?.disabled ?? disabled
  };
  const [_checked, handleChange] = useUncontrolled({
    value: withContextProps.checked ?? checked,
    defaultValue: defaultChecked,
    finalValue: false
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    InlineInput,
    {
      ...getStyles("root"),
      __staticSelector: "Switch",
      __stylesApiProps: props,
      id: uuid,
      size: _size,
      labelPosition,
      label,
      description,
      error,
      disabled: withContextProps.disabled,
      bodyElement: "label",
      labelElement: "span",
      classNames,
      styles,
      unstyled,
      "data-checked": withContextProps.checked,
      variant,
      ref: rootRef,
      mod,
      inert: rest.inert,
      ...styleProps,
      ...wrapperProps,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            ...rest,
            ...withContextProps,
            checked: _checked,
            "data-checked": withContextProps.checked,
            onChange: (event) => {
              withContextProps.onChange?.(event);
              handleChange(event.currentTarget.checked);
            },
            id: uuid,
            ref,
            type: "checkbox",
            role: "switch",
            inert: rest.inert,
            ...getStyles("input")
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Box,
          {
            "aria-hidden": "true",
            component: "span",
            mod: { error, "label-position": labelPosition, "without-labels": !onLabel && !offLabel },
            ...getStyles("track"),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Box,
                {
                  component: "span",
                  mod: { "reduce-motion": true, "with-thumb-indicator": withThumbIndicator && !thumbIcon },
                  ...getStyles("thumb"),
                  children: thumbIcon
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...getStyles("trackLabel"), children: _checked ? onLabel : offLabel })
            ]
          }
        )
      ]
    }
  );
});
Switch.classes = { ...classes$5, ...InlineInputClasses };
Switch.displayName = "@mantine/core/Switch";
Switch.Group = SwitchGroup;
const [TableProvider, useTableContext] = createSafeContext(
  "Table component was not found in the tree"
);
var classes$4 = { "table": "m_b23fa0ef", "th": "m_4e7aa4f3", "tr": "m_4e7aa4fd", "td": "m_4e7aa4ef", "tbody": "m_b2404537", "thead": "m_b242d975", "caption": "m_9e5a3ac7", "scrollContainer": "m_a100c15", "scrollContainerInner": "m_62259741" };
function getDataAttributes(ctx, options) {
  if (!options) {
    return void 0;
  }
  const data = {};
  if (options.columnBorder && ctx.withColumnBorders) {
    data["data-with-column-border"] = true;
  }
  if (options.rowBorder && ctx.withRowBorders) {
    data["data-with-row-border"] = true;
  }
  if (options.striped && ctx.striped) {
    data["data-striped"] = ctx.striped;
  }
  if (options.highlightOnHover && ctx.highlightOnHover) {
    data["data-hover"] = true;
  }
  if (options.captionSide && ctx.captionSide) {
    data["data-side"] = ctx.captionSide;
  }
  if (options.stickyHeader && ctx.stickyHeader) {
    data["data-sticky"] = true;
  }
  return data;
}
function tableElement(element, options) {
  const name = `Table${element.charAt(0).toUpperCase()}${element.slice(1)}`;
  const Component = factory((_props, ref) => {
    const props = useProps(name, {}, _props);
    const { classNames, className, style, styles, ...others } = props;
    const ctx = useTableContext();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Box,
      {
        component: element,
        ref,
        ...getDataAttributes(ctx, options),
        ...ctx.getStyles(element, { className, classNames, style, styles, props }),
        ...others
      }
    );
  });
  Component.displayName = `@mantine/core/${name}`;
  Component.classes = classes$4;
  return Component;
}
const TableTh = tableElement("th", { columnBorder: true });
const TableTd = tableElement("td", { columnBorder: true });
const TableTr = tableElement("tr", {
  rowBorder: true,
  striped: true,
  highlightOnHover: true
});
const TableThead = tableElement("thead", { stickyHeader: true });
const TableTbody = tableElement("tbody");
const TableTfoot = tableElement("tfoot");
const TableCaption = tableElement("caption", { captionSide: true });
function TableDataRenderer({ data }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    data.caption && /* @__PURE__ */ jsxRuntimeExports.jsx(TableCaption, { children: data.caption }),
    data.head && /* @__PURE__ */ jsxRuntimeExports.jsx(TableThead, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableTr, { children: data.head.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableTh, { children: item }, index)) }) }),
    data.body && /* @__PURE__ */ jsxRuntimeExports.jsx(TableTbody, { children: data.body.map((row, rowIndex) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableTr, { children: row.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableTd, { children: item }, index)) }, rowIndex)) }),
    data.foot && /* @__PURE__ */ jsxRuntimeExports.jsx(TableTfoot, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableTr, { children: data.foot.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(TableTh, { children: item }, index)) }) })
  ] });
}
TableDataRenderer.displayName = "@mantine/core/TableDataRenderer";
const defaultProps$5 = {
  type: "scrollarea"
};
const varsResolver$5 = createVarsResolver(
  (_, { minWidth, maxHeight, type }) => ({
    scrollContainer: {
      "--table-min-width": rem(minWidth),
      "--table-max-height": rem(maxHeight),
      "--table-overflow": type === "native" ? "auto" : void 0
    }
  })
);
const TableScrollContainer = factory((_props, ref) => {
  const props = useProps("TableScrollContainer", defaultProps$5, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    children,
    minWidth,
    maxHeight,
    type,
    scrollAreaProps,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "TableScrollContainer",
    classes: classes$4,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$5,
    rootSelector: "scrollContainer"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      component: type === "scrollarea" ? ScrollArea : "div",
      ...type === "scrollarea" ? maxHeight ? { offsetScrollbars: "xy", ...scrollAreaProps } : { offsetScrollbars: "x", ...scrollAreaProps } : {},
      ref,
      ...getStyles("scrollContainer"),
      ...others,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...getStyles("scrollContainerInner"), children })
    }
  );
});
TableScrollContainer.classes = classes$4;
TableScrollContainer.displayName = "@mantine/core/TableScrollContainer";
const defaultProps$4 = {
  withRowBorders: true,
  verticalSpacing: 7
};
const varsResolver$4 = createVarsResolver(
  (theme, {
    layout,
    captionSide,
    horizontalSpacing,
    verticalSpacing,
    borderColor,
    stripedColor,
    highlightOnHoverColor,
    striped,
    highlightOnHover,
    stickyHeaderOffset,
    stickyHeader
  }) => ({
    table: {
      "--table-layout": layout,
      "--table-caption-side": captionSide,
      "--table-horizontal-spacing": getSpacing(horizontalSpacing),
      "--table-vertical-spacing": getSpacing(verticalSpacing),
      "--table-border-color": borderColor ? getThemeColor(borderColor, theme) : void 0,
      "--table-striped-color": striped && stripedColor ? getThemeColor(stripedColor, theme) : void 0,
      "--table-highlight-on-hover-color": highlightOnHover && highlightOnHoverColor ? getThemeColor(highlightOnHoverColor, theme) : void 0,
      "--table-sticky-header-offset": stickyHeader ? rem(stickyHeaderOffset) : void 0
    }
  })
);
const Table = factory((_props, ref) => {
  const props = useProps("Table", defaultProps$4, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    horizontalSpacing,
    verticalSpacing,
    captionSide,
    stripedColor,
    highlightOnHoverColor,
    striped,
    highlightOnHover,
    withColumnBorders,
    withRowBorders,
    withTableBorder,
    borderColor,
    layout,
    variant,
    data,
    children,
    stickyHeader,
    stickyHeaderOffset,
    mod,
    tabularNums,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Table",
    props,
    className,
    style,
    classes: classes$4,
    classNames,
    styles,
    unstyled,
    attributes,
    rootSelector: "table",
    vars,
    varsResolver: varsResolver$4
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    TableProvider,
    {
      value: {
        getStyles,
        stickyHeader,
        striped: striped === true ? "odd" : striped || void 0,
        highlightOnHover,
        withColumnBorders,
        withRowBorders,
        captionSide: captionSide || "bottom"
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Box,
        {
          component: "table",
          variant,
          ref,
          mod: [{ "data-with-table-border": withTableBorder, "data-tabular-nums": tabularNums }, mod],
          ...getStyles("table"),
          ...others,
          children: children || !!data && /* @__PURE__ */ jsxRuntimeExports.jsx(TableDataRenderer, { data })
        }
      )
    }
  );
});
Table.classes = classes$4;
Table.displayName = "@mantine/core/Table";
Table.Td = TableTd;
Table.Th = TableTh;
Table.Tr = TableTr;
Table.Thead = TableThead;
Table.Tbody = TableTbody;
Table.Tfoot = TableTfoot;
Table.Caption = TableCaption;
Table.ScrollContainer = TableScrollContainer;
Table.DataRenderer = TableDataRenderer;
const [TabsProvider, useTabsContext] = createSafeContext(
  "Tabs component was not found in the tree"
);
var classes$3 = { "root": "m_89d60db1", "list--default": "m_576c9d4", "list": "m_89d33d6d", "tab": "m_4ec4dce6", "panel": "m_b0c91715", "tabSection": "m_fc420b1f", "tabLabel": "m_42bbd1ae", "tab--default": "m_539e827b", "list--outline": "m_6772fbd5", "tab--outline": "m_b59ab47c", "tab--pills": "m_c3381914" };
const TabsList = factory((_props, ref) => {
  const props = useProps("TabsList", null, _props);
  const { children, className, grow, justify, classNames, styles, style, mod, ...others } = props;
  const ctx = useTabsContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ...others,
      ...ctx.getStyles("list", {
        className,
        style,
        classNames,
        styles,
        props,
        variant: ctx.variant
      }),
      ref,
      role: "tablist",
      variant: ctx.variant,
      mod: [
        {
          grow,
          orientation: ctx.orientation,
          placement: ctx.orientation === "vertical" && ctx.placement,
          inverted: ctx.inverted
        },
        mod
      ],
      "aria-orientation": ctx.orientation,
      __vars: { "--tabs-justify": justify },
      children
    }
  );
});
TabsList.classes = classes$3;
TabsList.displayName = "@mantine/core/TabsList";
const TabsPanel = factory((_props, ref) => {
  const props = useProps("TabsPanel", null, _props);
  const { children, className, value, classNames, styles, style, mod, keepMounted, ...others } = props;
  const ctx = useTabsContext();
  const active = ctx.value === value;
  const content = ctx.keepMounted || keepMounted ? children : active ? children : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ...ctx.getStyles("panel", {
        className,
        classNames,
        styles,
        style: [style, !active ? { display: "none" } : void 0],
        props
      }),
      ref,
      mod: [{ orientation: ctx.orientation }, mod],
      role: "tabpanel",
      id: ctx.getPanelId(value),
      "aria-labelledby": ctx.getTabId(value),
      ...others,
      children: content
    }
  );
});
TabsPanel.classes = classes$3;
TabsPanel.displayName = "@mantine/core/TabsPanel";
const TabsTab = factory((_props, ref) => {
  const props = useProps("TabsTab", null, _props);
  const {
    className,
    children,
    rightSection,
    leftSection,
    value,
    onClick,
    onKeyDown,
    disabled,
    color,
    style,
    classNames,
    styles,
    vars,
    mod,
    tabIndex,
    ...others
  } = props;
  const theme = useMantineTheme();
  const { dir } = useDirection();
  const ctx = useTabsContext();
  const active = value === ctx.value;
  const activateTab = (event) => {
    ctx.onChange(ctx.allowTabDeactivation ? value === ctx.value ? null : value : value);
    onClick?.(event);
  };
  const stylesApiProps = { classNames, styles, props };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    UnstyledButton,
    {
      ...ctx.getStyles("tab", { className, style, variant: ctx.variant, ...stylesApiProps }),
      disabled,
      unstyled: ctx.unstyled,
      variant: ctx.variant,
      mod: [
        {
          active,
          disabled,
          orientation: ctx.orientation,
          inverted: ctx.inverted,
          placement: ctx.orientation === "vertical" && ctx.placement
        },
        mod
      ],
      ref,
      role: "tab",
      id: ctx.getTabId(value),
      "aria-selected": active,
      tabIndex: tabIndex !== void 0 ? tabIndex : active || ctx.value === null ? 0 : -1,
      "aria-controls": ctx.getPanelId(value),
      onClick: activateTab,
      __vars: { "--tabs-color": color ? getThemeColor(color, theme) : void 0 },
      onKeyDown: createScopedKeydownHandler({
        siblingSelector: '[role="tab"]',
        parentSelector: '[role="tablist"]',
        activateOnFocus: ctx.activateTabWithKeyboard,
        loop: ctx.loop,
        orientation: ctx.orientation || "horizontal",
        dir,
        onKeyDown
      }),
      ...others,
      children: [
        leftSection && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...ctx.getStyles("tabSection", stylesApiProps), "data-position": "left", children: leftSection }),
        children && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...ctx.getStyles("tabLabel", stylesApiProps), children }),
        rightSection && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { ...ctx.getStyles("tabSection", stylesApiProps), "data-position": "right", children: rightSection })
      ]
    }
  );
});
TabsTab.classes = classes$3;
TabsTab.displayName = "@mantine/core/TabsTab";
const VALUE_ERROR = "Tabs.Tab or Tabs.Panel component was rendered with invalid value or without value";
const defaultProps$3 = {
  keepMounted: true,
  orientation: "horizontal",
  loop: true,
  activateTabWithKeyboard: true,
  variant: "default",
  placement: "left"
};
const varsResolver$3 = createVarsResolver((theme, { radius, color, autoContrast }) => ({
  root: {
    "--tabs-radius": getRadius(radius),
    "--tabs-color": getThemeColor(color, theme),
    "--tabs-text-color": getAutoContrastValue(autoContrast, theme) ? getContrastColor({ color, theme, autoContrast }) : void 0
  }
}));
const Tabs = factory((_props, ref) => {
  const props = useProps("Tabs", defaultProps$3, _props);
  const {
    defaultValue,
    value,
    onChange,
    orientation,
    children,
    loop,
    id,
    activateTabWithKeyboard,
    allowTabDeactivation,
    variant,
    color,
    radius,
    inverted,
    placement,
    keepMounted,
    classNames,
    styles,
    unstyled,
    className,
    style,
    vars,
    autoContrast,
    mod,
    attributes,
    ...others
  } = props;
  const uid = useId(id);
  const [currentTab, setCurrentTab] = useUncontrolled({
    value,
    defaultValue,
    finalValue: null,
    onChange
  });
  const getStyles = useStyles({
    name: "Tabs",
    props,
    classes: classes$3,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$3
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    TabsProvider,
    {
      value: {
        placement,
        value: currentTab,
        orientation,
        id: uid,
        loop,
        activateTabWithKeyboard,
        getTabId: getSafeId(`${uid}-tab`, VALUE_ERROR),
        getPanelId: getSafeId(`${uid}-panel`, VALUE_ERROR),
        onChange: setCurrentTab,
        allowTabDeactivation,
        variant,
        color,
        radius,
        inverted,
        keepMounted,
        unstyled,
        getStyles
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Box,
        {
          ref,
          id: uid,
          variant,
          mod: [
            {
              orientation,
              inverted: orientation === "horizontal" && inverted,
              placement: orientation === "vertical" && placement
            },
            mod
          ],
          ...getStyles("root"),
          ...others,
          children
        }
      )
    }
  );
});
Tabs.classes = classes$3;
Tabs.displayName = "@mantine/core/Tabs";
Tabs.Tab = TabsTab;
Tabs.Panel = TabsPanel;
Tabs.List = TabsList;
function filterPickedTags({ data, value }) {
  const normalizedValue = value.map((item) => item.trim().toLowerCase());
  const filtered = data.reduce((acc, item) => {
    if (isOptionsGroup(item)) {
      acc.push({
        group: item.group,
        items: item.items.filter(
          (option) => normalizedValue.indexOf(option.label.toLowerCase().trim()) === -1
        )
      });
    } else if (normalizedValue.indexOf(item.label.toLowerCase().trim()) === -1) {
      acc.push(item);
    }
    return acc;
  }, []);
  return filtered;
}
function splitTags(splitChars, value) {
  if (!splitChars) {
    return [value];
  }
  return value.split(new RegExp(`[${splitChars.join("")}]`)).map((tag) => tag.trim()).filter((tag) => tag !== "");
}
function getSplittedTags({
  splitChars,
  allowDuplicates,
  maxTags,
  value,
  currentTags,
  isDuplicate,
  onDuplicate
}) {
  const splitted = splitTags(splitChars, value);
  const merged = [];
  if (allowDuplicates) {
    merged.push(...currentTags, ...splitted);
  } else {
    merged.push(...currentTags);
    for (const tag of splitted) {
      const checkDuplicate = isDuplicate ? (val) => isDuplicate(val, merged) : (val) => merged.some((t) => t.toLowerCase() === val.toLowerCase());
      if (checkDuplicate(tag)) {
        onDuplicate?.(tag);
      } else {
        merged.push(tag);
      }
    }
  }
  return maxTags ? merged.slice(0, maxTags) : merged;
}
const defaultProps$2 = {
  maxTags: Infinity,
  acceptValueOnBlur: true,
  splitChars: [","],
  hiddenInputValuesDivider: ",",
  openOnFocus: true,
  size: "sm"
};
const TagsInput = factory((_props, ref) => {
  const props = useProps("TagsInput", defaultProps$2, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    size: size2,
    value,
    defaultValue,
    onChange,
    onKeyDown,
    maxTags,
    allowDuplicates,
    onDuplicate,
    variant,
    data,
    dropdownOpened,
    defaultDropdownOpened,
    onDropdownOpen,
    onDropdownClose,
    selectFirstOptionOnChange,
    selectFirstOptionOnDropdownOpen,
    onOptionSubmit,
    comboboxProps,
    filter,
    limit,
    withScrollArea,
    maxDropdownHeight,
    searchValue,
    defaultSearchValue,
    onSearchChange,
    readOnly,
    disabled,
    splitChars,
    onFocus,
    onBlur,
    onPaste,
    radius,
    rightSection,
    rightSectionWidth,
    rightSectionPointerEvents,
    rightSectionProps,
    leftSection,
    leftSectionWidth,
    leftSectionPointerEvents,
    leftSectionProps,
    inputContainer,
    inputWrapperOrder,
    withAsterisk,
    required,
    labelProps,
    descriptionProps,
    errorProps,
    wrapperProps,
    description,
    label,
    error,
    withErrorStyles,
    name,
    form,
    id,
    clearable,
    clearButtonProps,
    hiddenInputProps,
    hiddenInputValuesDivider,
    mod,
    renderOption,
    onRemove,
    onClear,
    scrollAreaProps,
    acceptValueOnBlur,
    isDuplicate,
    openOnFocus,
    attributes,
    ...others
  } = props;
  const _id = useId(id);
  const parsedData = getParsedComboboxData(data);
  const optionsLockup = getOptionsLockup(parsedData);
  const inputRef = reactExports.useRef(null);
  const _ref = useMergedRef(inputRef, ref);
  const combobox = useCombobox({
    opened: dropdownOpened,
    defaultOpened: defaultDropdownOpened,
    onDropdownOpen: () => {
      onDropdownOpen?.();
      if (selectFirstOptionOnDropdownOpen) {
        combobox.selectFirstOption();
      }
    },
    onDropdownClose: () => {
      onDropdownClose?.();
      combobox.resetSelectedOption();
    }
  });
  const {
    styleProps,
    rest: { type, autoComplete, ...rest }
  } = extractStyleProps(others);
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: [],
    onChange
  });
  const [_searchValue, setSearchValue] = useUncontrolled({
    value: searchValue,
    defaultValue: defaultSearchValue,
    finalValue: "",
    onChange: onSearchChange
  });
  const handleSearchChange = (value2) => {
    setSearchValue(value2);
    combobox.resetSelectedOption();
  };
  const getStyles = useStyles({
    name: "TagsInput",
    classes: {},
    props,
    classNames,
    styles,
    unstyled
  });
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    props,
    styles,
    classNames
  });
  const handleValueSelect = (val) => {
    const isDuplicated = isDuplicate ? isDuplicate(val, _value) : _value.some((tag) => tag.toLowerCase() === val.toLowerCase());
    if (isDuplicated) {
      onDuplicate?.(val);
      if (!allowDuplicates) {
        handleSearchChange("");
        return;
      }
    }
    if (_value.length < maxTags) {
      onOptionSubmit?.(val);
      handleSearchChange("");
      if (val.length > 0) {
        setValue([..._value, val]);
      }
    }
  };
  const handleInputKeydown = (event) => {
    onKeyDown?.(event);
    if (event.isPropagationStopped()) {
      return;
    }
    const inputValue = _searchValue.trim();
    const { length } = inputValue;
    if (splitChars.includes(event.key) && length > 0) {
      setValue(
        getSplittedTags({
          splitChars,
          allowDuplicates,
          maxTags,
          value: _searchValue,
          currentTags: _value,
          isDuplicate,
          onDuplicate
        })
      );
      handleSearchChange("");
      event.preventDefault();
    }
    if (event.key === "Enter" && length > 0 && !event.nativeEvent.isComposing) {
      event.preventDefault();
      const hasActiveSelection = !!document.querySelector(
        `#${combobox.listId} [data-combobox-option][data-combobox-selected]`
      );
      if (hasActiveSelection) {
        return;
      }
      handleValueSelect(inputValue);
    }
    if (event.key === "Backspace" && length === 0 && _value.length > 0 && !event.nativeEvent.isComposing && !readOnly) {
      onRemove?.(_value[_value.length - 1]);
      setValue(_value.slice(0, _value.length - 1));
    }
  };
  const handlePaste = (event) => {
    onPaste?.(event);
    event.preventDefault();
    if (event.clipboardData) {
      const pastedText = event.clipboardData.getData("text/plain");
      setValue(
        getSplittedTags({
          splitChars,
          allowDuplicates,
          maxTags,
          value: `${_searchValue}${pastedText}`,
          currentTags: _value,
          isDuplicate,
          onDuplicate
        })
      );
      handleSearchChange("");
    }
  };
  const values2 = _value.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Pill,
    {
      withRemoveButton: !readOnly,
      onRemove: () => {
        const next_value = _value.slice();
        next_value.splice(index, 1);
        setValue(next_value);
        onRemove?.(item);
      },
      unstyled,
      disabled,
      attributes,
      ...getStyles("pill"),
      children: item
    },
    `${item}-${index}`
  ));
  reactExports.useEffect(() => {
    if (selectFirstOptionOnChange) {
      combobox.selectFirstOption();
    }
  }, [selectFirstOptionOnChange, _value, _searchValue]);
  const clearButton = /* @__PURE__ */ jsxRuntimeExports.jsx(
    Combobox.ClearButton,
    {
      ...clearButtonProps,
      onClear: () => {
        setValue([]);
        handleSearchChange("");
        inputRef.current?.focus();
        combobox.openDropdown();
        onClear?.();
      }
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Combobox,
      {
        store: combobox,
        classNames: resolvedClassNames,
        styles: resolvedStyles,
        unstyled,
        size: size2,
        readOnly,
        __staticSelector: "TagsInput",
        attributes,
        onOptionSubmit: (val) => {
          onOptionSubmit?.(val);
          handleSearchChange("");
          _value.length < maxTags && setValue([..._value, optionsLockup[val].label]);
          combobox.resetSelectedOption();
        },
        ...comboboxProps,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Combobox.DropdownTarget, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            PillsInput,
            {
              ...styleProps,
              __staticSelector: "TagsInput",
              classNames: resolvedClassNames,
              styles: resolvedStyles,
              unstyled,
              size: size2,
              className,
              style,
              variant,
              disabled,
              radius,
              rightSection,
              __clearSection: clearButton,
              __clearable: clearable && _value.length > 0 && !disabled && !readOnly,
              rightSectionWidth,
              rightSectionPointerEvents,
              rightSectionProps,
              leftSection,
              leftSectionWidth,
              leftSectionPointerEvents,
              leftSectionProps,
              inputContainer,
              inputWrapperOrder,
              withAsterisk,
              required,
              labelProps,
              descriptionProps,
              errorProps,
              wrapperProps,
              description,
              label,
              error,
              withErrorStyles,
              __stylesApiProps: { ...props, multiline: true },
              id: _id,
              mod,
              attributes,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Pill.Group, { disabled, unstyled, ...getStyles("pillsList"), children: [
                values2,
                /* @__PURE__ */ jsxRuntimeExports.jsx(Combobox.EventsTarget, { autoComplete, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  PillsInput.Field,
                  {
                    ...rest,
                    ref: _ref,
                    ...getStyles("inputField"),
                    unstyled,
                    onKeyDown: handleInputKeydown,
                    onFocus: (event) => {
                      onFocus?.(event);
                      openOnFocus && combobox.openDropdown();
                    },
                    onBlur: (event) => {
                      onBlur?.(event);
                      acceptValueOnBlur && handleValueSelect(_searchValue);
                      combobox.closeDropdown();
                    },
                    onPaste: handlePaste,
                    value: _searchValue,
                    onChange: (event) => handleSearchChange(event.currentTarget.value),
                    required: required && _value.length === 0,
                    disabled,
                    readOnly,
                    id: _id
                  }
                ) })
              ] })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            OptionsDropdown,
            {
              data: filterPickedTags({ data: parsedData, value: _value }),
              hidden: readOnly || disabled,
              filter,
              search: _searchValue,
              limit,
              hiddenWhenEmpty: true,
              withScrollArea,
              maxDropdownHeight,
              unstyled,
              labelId: label ? `${_id}-label` : void 0,
              "aria-label": label ? void 0 : others["aria-label"],
              renderOption,
              scrollAreaProps
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Combobox.HiddenInput,
      {
        name,
        form,
        value: _value,
        valuesDivider: hiddenInputValuesDivider,
        disabled,
        ...hiddenInputProps
      }
    )
  ] });
});
TagsInput.classes = { ...InputBase.classes, ...Combobox.classes };
TagsInput.displayName = "@mantine/core/TagsInput";
const TextInput = factory((props, ref) => {
  const _props = useProps("TextInput", null, props);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(InputBase, { component: "input", ref, ..._props, __staticSelector: "TextInput" });
});
TextInput.classes = InputBase.classes;
TextInput.displayName = "@mantine/core/TextInput";
var classes$2 = { "root": "m_7341320d" };
const varsResolver$2 = createVarsResolver(
  (theme, { size: size2, radius, variant, gradient, color, autoContrast }) => {
    const colors = theme.variantColorResolver({
      color: color || theme.primaryColor,
      theme,
      gradient,
      variant: variant || "filled",
      autoContrast
    });
    return {
      root: {
        "--ti-size": getSize(size2, "ti-size"),
        "--ti-radius": radius === void 0 ? void 0 : getRadius(radius),
        "--ti-bg": color || variant ? colors.background : void 0,
        "--ti-color": color || variant ? colors.color : void 0,
        "--ti-bd": color || variant ? colors.border : void 0
      }
    };
  }
);
const ThemeIcon = factory((_props, ref) => {
  const props = useProps("ThemeIcon", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    autoContrast,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "ThemeIcon",
    classes: classes$2,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$2
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ref, ...getStyles("root"), ...others });
});
ThemeIcon.classes = classes$2;
ThemeIcon.displayName = "@mantine/core/ThemeIcon";
const [TimelineProvider, useTimelineContext] = createSafeContext(
  "Timeline component was not found in tree"
);
var classes$1 = { "root": "m_43657ece", "itemTitle": "m_2ebe8099", "item": "m_436178ff", "itemBullet": "m_8affcee1", "itemBody": "m_540e8f41" };
const TimelineItem = factory((_props, ref) => {
  const props = useProps("TimelineItem", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    vars,
    __active,
    __align,
    __lineActive,
    __vars,
    bullet,
    radius,
    color,
    lineVariant,
    children,
    title,
    mod,
    ...others
  } = props;
  const ctx = useTimelineContext();
  const theme = useMantineTheme();
  const stylesApiProps = { classNames, styles };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Box,
    {
      ...ctx.getStyles("item", { ...stylesApiProps, className, style }),
      mod: [{ "line-active": __lineActive, active: __active }, mod],
      ref,
      __vars: {
        "--tli-radius": radius ? getRadius(radius) : void 0,
        "--tli-color": color ? getThemeColor(color, theme) : void 0,
        "--tli-border-style": lineVariant || void 0
      },
      ...others,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Box,
          {
            ...ctx.getStyles("itemBullet", stylesApiProps),
            mod: { "with-child": !!bullet, align: __align, active: __active },
            children: bullet
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ...ctx.getStyles("itemBody", stylesApiProps), children: [
          title && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...ctx.getStyles("itemTitle", stylesApiProps), children: title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...ctx.getStyles("itemContent", stylesApiProps), children })
        ] })
      ]
    }
  );
});
TimelineItem.classes = classes$1;
TimelineItem.displayName = "@mantine/core/TimelineItem";
const defaultProps$1 = {
  active: -1,
  align: "left"
};
const varsResolver$1 = createVarsResolver(
  (theme, { bulletSize, lineWidth, radius, color, autoContrast }) => ({
    root: {
      "--tl-bullet-size": rem(bulletSize),
      "--tl-line-width": rem(lineWidth),
      "--tl-radius": radius === void 0 ? void 0 : getRadius(radius),
      "--tl-color": color ? getThemeColor(color, theme) : void 0,
      "--tl-icon-color": getAutoContrastValue(autoContrast, theme) ? getContrastColor({ color, theme, autoContrast }) : void 0
    }
  })
);
const Timeline = factory((_props, ref) => {
  const props = useProps("Timeline", defaultProps$1, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    children,
    active,
    color,
    radius,
    bulletSize,
    align,
    lineWidth,
    reverseActive,
    mod,
    autoContrast,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Timeline",
    classes: classes$1,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$1
  });
  const _children = reactExports.Children.toArray(children);
  const items = _children.map(
    (item, index) => reactExports.cloneElement(item, {
      unstyled,
      __align: align,
      __active: item.props?.active || (reverseActive ? active >= _children.length - index - 1 : active >= index),
      __lineActive: item.props?.lineActive || (reverseActive ? active >= _children.length - index - 1 : active - 1 >= index)
    })
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineProvider, { value: { getStyles }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ...getStyles("root"), mod: [{ align }, mod], ref, ...others, children: items }) });
});
Timeline.classes = classes$1;
Timeline.displayName = "@mantine/core/Timeline";
Timeline.Item = TimelineItem;
const headings = ["h1", "h2", "h3", "h4", "h5", "h6"];
const sizes = ["xs", "sm", "md", "lg", "xl"];
function getTitleSize(order, size2) {
  const titleSize = size2 !== void 0 ? size2 : `h${order}`;
  if (headings.includes(titleSize)) {
    return {
      fontSize: `var(--mantine-${titleSize}-font-size)`,
      fontWeight: `var(--mantine-${titleSize}-font-weight)`,
      lineHeight: `var(--mantine-${titleSize}-line-height)`
    };
  } else if (sizes.includes(titleSize)) {
    return {
      fontSize: `var(--mantine-font-size-${titleSize})`,
      fontWeight: `var(--mantine-h${order}-font-weight)`,
      lineHeight: `var(--mantine-h${order}-line-height)`
    };
  }
  return {
    fontSize: rem(titleSize),
    fontWeight: `var(--mantine-h${order}-font-weight)`,
    lineHeight: `var(--mantine-h${order}-line-height)`
  };
}
var classes = { "root": "m_8a5d1357" };
const defaultProps = {
  order: 1
};
const varsResolver = createVarsResolver((_, { order, size: size2, lineClamp, textWrap }) => {
  const sizeVariables = getTitleSize(order || 1, size2);
  return {
    root: {
      "--title-fw": sizeVariables.fontWeight,
      "--title-lh": sizeVariables.lineHeight,
      "--title-fz": sizeVariables.fontSize,
      "--title-line-clamp": typeof lineClamp === "number" ? lineClamp.toString() : void 0,
      "--title-text-wrap": textWrap
    }
  };
});
const Title = factory((_props, ref) => {
  const props = useProps("Title", defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    order,
    vars,
    size: size2,
    variant,
    lineClamp,
    textWrap,
    mod,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: "Title",
    props,
    classes,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver
  });
  if (![1, 2, 3, 4, 5, 6].includes(order)) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Box,
    {
      ...getStyles("root"),
      component: `h${order}`,
      variant,
      ref,
      mod: [{ order, "data-line-clamp": typeof lineClamp === "number" }, mod],
      size: size2,
      ...others
    }
  );
});
Title.classes = classes;
Title.displayName = "@mantine/core/Title";
export {
  Alert as $,
  AccordionChevron as A,
  Box as B,
  CloseButton as C,
  Container as D,
  Title as E,
  Card as F,
  Group as G,
  Grid as H,
  InputBase as I,
  TextInput as J,
  Select as K,
  LoadingOverlay as L,
  Modal as M,
  Notification as N,
  OptionalPortal as O,
  Popover as P,
  Badge as Q,
  Progress as R,
  ScrollArea as S,
  Text as T,
  UnstyledButton as U,
  Menu as V,
  Checkbox as W,
  Table as X,
  Tooltip as Y,
  Pagination as Z,
  Skeleton as _,
  Button as a,
  Rating as a0,
  List as a1,
  ThemeIcon as a2,
  Avatar as a3,
  RingProgress as a4,
  Tabs as a5,
  Timeline as a6,
  Textarea as a7,
  PasswordInput as a8,
  Anchor as a9,
  Paper as aa,
  Switch as ab,
  CopyButton as ac,
  AppShell as ad,
  Burger as ae,
  NavLink as af,
  Divider as ag,
  Drawer as ah,
  FileButton as ai,
  Radio as aj,
  NumberInput as ak,
  Autocomplete as al,
  Fieldset as am,
  Breadcrumbs as an,
  Collapse as ao,
  Flex as ap,
  TagsInput as aq,
  FileInput as ar,
  useMantineTheme as b,
  createUseExternalEvents as c,
  useStyles as d,
  createVarsResolver as e,
  factory as f,
  getDefaultZIndex as g,
  createSafeContext as h,
  SimpleGrid as i,
  useResolvedStylesApi as j,
  getFontSize as k,
  getSize as l,
  getSpacing as m,
  useInputProps as n,
  Input as o,
  ActionIcon as p,
  CheckIcon as q,
  rem as r,
  mantineHtmlProps as s,
  ColorSchemeScript as t,
  useProps as u,
  MantineProvider as v,
  createTheme as w,
  Center as x,
  Stack as y,
  Loader as z
};
