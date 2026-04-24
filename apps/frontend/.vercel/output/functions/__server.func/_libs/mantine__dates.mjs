import { d as dayjs, i as isoWeek } from "./dayjs.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "./react.mjs";
import { p as clamp, a as useDidUpdate, d as useMergedRef, j as useId, i as useUncontrolled, o as useDisclosure } from "./mantine__hooks.mjs";
import { h as createSafeContext, U as UnstyledButton, S as ScrollArea, i as SimpleGrid, f as factory, u as useProps, j as useResolvedStylesApi, d as useStyles, P as Popover, I as InputBase, C as CloseButton, e as createVarsResolver, k as getFontSize, l as getSize, B as Box, m as getSpacing, A as AccordionChevron, n as useInputProps, o as Input, M as Modal, p as ActionIcon, q as CheckIcon } from "./mantine__core.mjs";
import { c as clsx } from "./clsx.mjs";
function getNextIndex({ direction, levelIndex, rowIndex, cellIndex, size }) {
  switch (direction) {
    case "up":
      if (levelIndex === 0 && rowIndex === 0) {
        return null;
      }
      if (rowIndex === 0) {
        return {
          levelIndex: levelIndex - 1,
          rowIndex: cellIndex <= size[levelIndex - 1][size[levelIndex - 1].length - 1] - 1 ? size[levelIndex - 1].length - 1 : size[levelIndex - 1].length - 2,
          cellIndex
        };
      }
      return {
        levelIndex,
        rowIndex: rowIndex - 1,
        cellIndex
      };
    case "down":
      if (rowIndex === size[levelIndex].length - 1) {
        return {
          levelIndex: levelIndex + 1,
          rowIndex: 0,
          cellIndex
        };
      }
      if (rowIndex === size[levelIndex].length - 2 && cellIndex >= size[levelIndex][size[levelIndex].length - 1]) {
        return {
          levelIndex: levelIndex + 1,
          rowIndex: 0,
          cellIndex
        };
      }
      return {
        levelIndex,
        rowIndex: rowIndex + 1,
        cellIndex
      };
    case "left":
      if (levelIndex === 0 && rowIndex === 0 && cellIndex === 0) {
        return null;
      }
      if (rowIndex === 0 && cellIndex === 0) {
        return {
          levelIndex: levelIndex - 1,
          rowIndex: size[levelIndex - 1].length - 1,
          cellIndex: size[levelIndex - 1][size[levelIndex - 1].length - 1] - 1
        };
      }
      if (cellIndex === 0) {
        return {
          levelIndex,
          rowIndex: rowIndex - 1,
          cellIndex: size[levelIndex][rowIndex - 1] - 1
        };
      }
      return {
        levelIndex,
        rowIndex,
        cellIndex: cellIndex - 1
      };
    case "right":
      if (rowIndex === size[levelIndex].length - 1 && cellIndex === size[levelIndex][rowIndex] - 1) {
        return {
          levelIndex: levelIndex + 1,
          rowIndex: 0,
          cellIndex: 0
        };
      }
      if (cellIndex === size[levelIndex][rowIndex] - 1) {
        return {
          levelIndex,
          rowIndex: rowIndex + 1,
          cellIndex: 0
        };
      }
      return {
        levelIndex,
        rowIndex,
        cellIndex: cellIndex + 1
      };
    default:
      return { levelIndex, rowIndex, cellIndex };
  }
}
function focusOnNextFocusableControl({
  controlsRef,
  direction,
  levelIndex,
  rowIndex,
  cellIndex,
  size
}) {
  const nextIndex = getNextIndex({ direction, size, rowIndex, cellIndex, levelIndex });
  if (!nextIndex) {
    return;
  }
  const controlToFocus = controlsRef.current?.[nextIndex.levelIndex]?.[nextIndex.rowIndex]?.[nextIndex.cellIndex];
  if (!controlToFocus) {
    return;
  }
  if (controlToFocus.disabled || controlToFocus.getAttribute("data-hidden") || controlToFocus.getAttribute("data-outside")) {
    focusOnNextFocusableControl({
      controlsRef,
      direction,
      levelIndex: nextIndex.levelIndex,
      cellIndex: nextIndex.cellIndex,
      rowIndex: nextIndex.rowIndex,
      size
    });
  } else {
    controlToFocus.focus();
  }
}
function getDirection(key) {
  switch (key) {
    case "ArrowDown":
      return "down";
    case "ArrowUp":
      return "up";
    case "ArrowRight":
      return "right";
    case "ArrowLeft":
      return "left";
    default:
      return null;
  }
}
function getControlsSize(controlsRef) {
  return controlsRef.current?.map((column) => column.map((row) => row.length));
}
function handleControlKeyDown({
  controlsRef,
  levelIndex,
  rowIndex,
  cellIndex,
  event
}) {
  const direction = getDirection(event.key);
  if (direction) {
    event.preventDefault();
    const size = getControlsSize(controlsRef);
    focusOnNextFocusableControl({
      controlsRef,
      direction,
      levelIndex,
      rowIndex,
      cellIndex,
      size
    });
  }
}
function assignTime(dateValue, timeString) {
  let date = dateValue ? dayjs(dateValue) : dayjs();
  if (timeString === "") {
    return date.format("YYYY-MM-DD HH:mm:ss");
  }
  const [hours, minutes, seconds = 0] = timeString.split(":").map(Number);
  date = date.set("hour", hours);
  date = date.set("minute", minutes);
  date = date.set("second", seconds);
  date = date.set("millisecond", 0);
  return date.format("YYYY-MM-DD HH:mm:ss");
}
function toDateString(value) {
  return value == null || value === "" ? value : dayjs(value).format("YYYY-MM-DD");
}
function toDateTimeString(value) {
  return value == null || value === "" ? value : dayjs(value).format("YYYY-MM-DD HH:mm:ss");
}
function getDefaultClampedDate({
  minDate,
  maxDate
}) {
  const today = dayjs();
  if (!minDate && !maxDate) {
    return toDateString(today);
  }
  if (minDate && dayjs(today).isBefore(minDate)) {
    return toDateString(minDate);
  }
  if (maxDate && dayjs(today).isAfter(maxDate)) {
    return toDateString(maxDate);
  }
  return toDateString(today);
}
function clampDate(minDate, maxDate, date) {
  if (!minDate && !maxDate) {
    return toDateTimeString(date);
  }
  if (minDate && dayjs(date).isBefore(minDate)) {
    return toDateTimeString(minDate);
  }
  if (maxDate && dayjs(date).isAfter(maxDate)) {
    return toDateTimeString(maxDate);
  }
  return toDateTimeString(date);
}
const DATES_PROVIDER_DEFAULT_SETTINGS = {
  locale: "en",
  firstDayOfWeek: 1,
  weekendDays: [0, 6],
  labelSeparator: "–",
  consistentWeeks: false
};
const DatesProviderContext = reactExports.createContext(DATES_PROVIDER_DEFAULT_SETTINGS);
function useDatesContext() {
  const ctx = reactExports.useContext(DatesProviderContext);
  const getLocale = reactExports.useCallback((input) => input || ctx.locale, [ctx.locale]);
  const getFirstDayOfWeek = reactExports.useCallback(
    (input) => typeof input === "number" ? input : ctx.firstDayOfWeek,
    [ctx.firstDayOfWeek]
  );
  const getWeekendDays = reactExports.useCallback(
    (input) => Array.isArray(input) ? input : ctx.weekendDays,
    [ctx.weekendDays]
  );
  const getLabelSeparator = reactExports.useCallback(
    (input) => typeof input === "string" ? input : ctx.labelSeparator,
    [ctx.labelSeparator]
  );
  return {
    ...ctx,
    getLocale,
    getFirstDayOfWeek,
    getWeekendDays,
    getLabelSeparator
  };
}
function formatValue({ value, type, withTime }) {
  const formatter = withTime ? toDateTimeString : toDateString;
  if (type === "range" && Array.isArray(value)) {
    const startDate = formatter(value[0]);
    const endDate = formatter(value[1]);
    if (!startDate) {
      return "";
    }
    if (!endDate) {
      return `${startDate} –`;
    }
    return `${startDate} – ${endDate}`;
  }
  if (type === "multiple" && Array.isArray(value)) {
    return value.filter(Boolean).join(", ");
  }
  if (!Array.isArray(value) && value) {
    return formatter(value);
  }
  return "";
}
function HiddenDatesInput({
  value,
  type,
  name,
  form,
  withTime = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "hidden", value: formatValue({ value, type, withTime }), name, form });
}
HiddenDatesInput.displayName = "@mantine/dates/HiddenDatesInput";
function padTime(value) {
  return value < 10 ? `0${value}` : `${value}`;
}
const getMaxDigit = (max) => Number(max.toFixed(0)[0]);
const SpinInput = reactExports.forwardRef(
  ({
    value,
    min,
    max,
    onChange,
    focusable,
    step,
    onNextInput,
    onPreviousInput,
    onFocus,
    readOnly,
    allowTemporaryZero = false,
    placeholder = "--",
    ...others
  }, ref) => {
    const maxDigit = getMaxDigit(max);
    const arrowsMax = max + 1 - step;
    const handleChange = (value2) => {
      if (readOnly) {
        return;
      }
      const clearValue = value2.replace(/\D/g, "");
      if (clearValue !== "") {
        const parsedValue = parseInt(clearValue, 10);
        const clampedValue = allowTemporaryZero && parsedValue === 0 && min > 0 ? 0 : clamp(parsedValue, min, max);
        onChange(clampedValue);
        if (clampedValue > maxDigit || value2.startsWith("00")) {
          onNextInput?.();
        }
      }
    };
    const handleKeyDown = (event) => {
      if (readOnly) {
        return;
      }
      if (event.key === "0" || event.key === "Num0") {
        if (value === 0) {
          event.preventDefault();
          onNextInput?.();
        }
      }
      if (event.key === "Home") {
        event.preventDefault();
        onChange(min);
      }
      if (event.key === "End") {
        event.preventDefault();
        onChange(max);
      }
      if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault();
        if (value !== null) {
          onChange(null);
        } else {
          onPreviousInput?.();
        }
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNextInput?.();
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPreviousInput?.();
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        const newValue = value === null ? min : clamp(value + step, min, arrowsMax);
        onChange(newValue);
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        const newValue = value === null ? arrowsMax : clamp(value - step, min, arrowsMax);
        onChange(newValue);
      }
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref,
        type: "text",
        role: "spinbutton",
        "aria-valuemin": min,
        "aria-valuemax": max,
        "aria-valuenow": value === null ? 0 : value,
        "data-empty": value === null || void 0,
        inputMode: "numeric",
        placeholder,
        value: value === null ? "" : padTime(value),
        onChange: (event) => handleChange(event.currentTarget.value),
        onKeyDown: handleKeyDown,
        onFocus: (event) => {
          event.currentTarget.select();
          onFocus?.(event);
        },
        onClick: (event) => {
          event.stopPropagation();
          event.currentTarget.select();
        },
        onMouseDown: (event) => event.stopPropagation(),
        ...others
      }
    );
  }
);
SpinInput.displayName = "@mantine/dates/SpinInput";
const [TimePickerProvider, useTimePickerContext] = createSafeContext(
  "TimeInput component was not found in the component tree"
);
const AmPmInput = reactExports.forwardRef(
  ({
    labels,
    value,
    onChange,
    className,
    style,
    onPreviousInput,
    readOnly,
    onMouseDown,
    onTouchStart,
    inputType,
    ...others
  }, ref) => {
    const ctx = useTimePickerContext();
    const handleKeyDown = (event) => {
      if (readOnly) {
        return;
      }
      if (event.key === "Home") {
        event.preventDefault();
        onChange(labels.am);
      }
      if (event.key === "End") {
        event.preventDefault();
        onChange(labels.pm);
      }
      if (event.key === "Backspace" || event.key === "Delete") {
        event.preventDefault();
        if (value === null) {
          onPreviousInput?.();
        } else {
          onChange(null);
        }
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPreviousInput?.();
      }
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        onChange(value === labels.am ? labels.pm : labels.am);
      }
      if (event.code === "KeyA") {
        event.preventDefault();
        onChange(labels.am);
      }
      if (event.code === "KeyP") {
        event.preventDefault();
        onChange(labels.pm);
      }
    };
    if (inputType === "input") {
      const displayValue = value || "--";
      const inputSize = displayValue.length + 1;
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ...ctx.getStyles("field", { className, style }),
          ref,
          value: displayValue,
          size: inputSize,
          readOnly: true,
          onChange: () => {
          },
          onClick: ((event) => event.stopPropagation()),
          onKeyDown: handleKeyDown,
          onMouseDown: (event) => {
            event.stopPropagation();
            onMouseDown?.(event);
          },
          "data-am-pm": true,
          ...others
        }
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "select",
      {
        ...ctx.getStyles("field", { className, style }),
        ref,
        value: value || "",
        onChange: (event) => !readOnly && onChange(event.target.value || null),
        onClick: (event) => event.stopPropagation(),
        onKeyDown: handleKeyDown,
        onMouseDown: (event) => {
          event.stopPropagation();
          onMouseDown?.(event);
        },
        "data-am-pm": true,
        ...others,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "--" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: labels.am, children: labels.am }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: labels.pm, children: labels.pm })
        ]
      }
    );
  }
);
AmPmInput.displayName = "@mantine/dates/AmPmInput";
function TimeControl({ value, active, onSelect }) {
  const ctx = useTimePickerContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    UnstyledButton,
    {
      mod: { active },
      onClick: () => onSelect(value),
      onMouseDown: (event) => event.preventDefault(),
      "data-value": value,
      tabIndex: -1,
      ...ctx.getStyles("control"),
      children: typeof value === "number" ? padTime(value) : value
    }
  );
}
TimeControl.displayName = "@mantine/dates/TimeControl";
function AmPmControlsList({ labels, value, onSelect }) {
  const ctx = useTimePickerContext();
  const controls = [labels.am, labels.pm].map((control) => /* @__PURE__ */ jsxRuntimeExports.jsx(TimeControl, { value: control, active: value === control, onSelect }, control));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...ctx.getStyles("controlsList"), children: controls });
}
AmPmControlsList.displayName = "@mantine/dates/AmPmControlsList";
function isElementVisibleInScrollContainer(element, container) {
  if (!element || !container) {
    return false;
  }
  const elementRect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const isVisible = elementRect.top >= containerRect.top && elementRect.bottom <= containerRect.bottom && elementRect.left >= containerRect.left && elementRect.right <= containerRect.right;
  return isVisible;
}
function getValuesRange(min, max, step) {
  const range = [];
  for (let i = min; i <= max; i += step) {
    range.push(i);
  }
  return range;
}
function TimeControlsList({
  min,
  max,
  step,
  value,
  onSelect,
  reversed
}) {
  const ctx = useTimePickerContext();
  const ref = reactExports.useRef(null);
  const range = getValuesRange(min, max, step);
  const controls = (reversed ? range.reverse() : range).map((control) => /* @__PURE__ */ jsxRuntimeExports.jsx(TimeControl, { value: control, active: value === control, onSelect }, control));
  reactExports.useEffect(() => {
    if (value !== null) {
      const scrollToValue = () => {
        const target = ref.current?.querySelector(`[data-value="${value}"]`);
        if (!isElementVisibleInScrollContainer(target, ref.current)) {
          target?.scrollIntoView({ block: "nearest" });
        }
      };
      requestAnimationFrame(scrollToValue);
    }
  }, [value]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollArea,
    {
      h: ctx.maxDropdownContentHeight,
      type: "never",
      viewportRef: ref,
      ...ctx.getStyles("scrollarea"),
      ...ctx.scrollAreaProps,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...ctx.getStyles("controlsList"), children: controls })
    }
  );
}
TimeControlsList.displayName = "@mantine/dates/TimeControlsList";
var classes$b = { "fieldsRoot": "m_7a8f1e6d", "fieldsGroup": "m_d6bb0a54", "controlsList": "m_b97ecb26", "controlsListGroup": "m_31fe42f9", "dropdown": "m_9c4817c3", "control": "m_154c536b", "presetControl": "m_7be09d0c", "presetsGroup": "m_7d00001d", "presetsGroupLabel": "m_d8d918d7", "field": "m_6b43ba88" };
function splitTimeString(timeString) {
  const [hours = null, minutes = null, seconds = null] = timeString.split(":").map(Number);
  return { hours, minutes, seconds };
}
function isSameTime({ time, compare, withSeconds }) {
  const timeParts = splitTimeString(time);
  const compareParts = splitTimeString(compare);
  if (withSeconds) {
    return timeParts.hours === compareParts.hours && timeParts.minutes === compareParts.minutes && timeParts.seconds === compareParts.seconds;
  }
  return timeParts.hours === compareParts.hours && timeParts.minutes === compareParts.minutes;
}
function getTimeFromDate(date, withSeconds) {
  return `${date.getHours()}:${date.getMinutes()}${withSeconds ? `:${date.getSeconds()}` : ""}`;
}
function getFormattedTime({
  value,
  format,
  amPmLabels,
  withSeconds
}) {
  const splitted = splitTimeString(
    typeof value === "string" ? value : getTimeFromDate(value, withSeconds)
  );
  if (splitted.hours === null || splitted.minutes === null) {
    return null;
  }
  if (format === "24h") {
    return `${padTime(splitted.hours)}:${padTime(splitted.minutes)}${withSeconds ? `:${padTime(splitted.seconds || 0)}` : ""}`;
  }
  const isPm = splitted.hours >= 12;
  const hours = splitted.hours % 12 === 0 ? 12 : splitted.hours % 12;
  return `${hours}:${padTime(splitted.minutes)}${withSeconds ? `:${padTime(splitted.seconds || 0)}` : ""} ${isPm ? amPmLabels.pm : amPmLabels.am}`;
}
function TimeValue({
  value,
  format = "24h",
  amPmLabels = { am: "AM", pm: "PM" },
  withSeconds = false
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: getFormattedTime({ value, format, amPmLabels, withSeconds }) });
}
TimeValue.displayName = "@mantine/dates/TimeValue";
function TimePresetControl({
  value,
  active,
  onChange,
  format,
  amPmLabels,
  withSeconds
}) {
  const ctx = useTimePickerContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    UnstyledButton,
    {
      mod: { active },
      onClick: () => onChange(value),
      ...ctx.getStyles("presetControl"),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(TimeValue, { withSeconds, value, format, amPmLabels })
    }
  );
}
TimePresetControl.displayName = "@mantine/dates/TimePresetControl";
function TimePresetGroup({
  value,
  data,
  onChange,
  format,
  amPmLabels,
  withSeconds
}) {
  const ctx = useTimePickerContext();
  const items = data.values.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    TimePresetControl,
    {
      value: item,
      format,
      amPmLabels,
      withSeconds,
      active: isSameTime({ time: item, compare: value, withSeconds }),
      onChange
    },
    item
  ));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ...ctx.getStyles("presetsGroup"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...ctx.getStyles("presetsGroupLabel"), children: data.label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleGrid, { cols: withSeconds ? 2 : 3, spacing: 4, children: items })
  ] });
}
TimePresetGroup.displayName = "@mantine/dates/TimePresetGroup";
function TimePresets({
  presets,
  format,
  amPmLabels,
  withSeconds,
  value,
  onChange
}) {
  const ctx = useTimePickerContext();
  if (presets.length === 0) {
    return null;
  }
  if (typeof presets[0] === "string") {
    const items = presets.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      TimePresetControl,
      {
        value: item,
        format,
        amPmLabels,
        withSeconds,
        active: isSameTime({ time: item, compare: value, withSeconds }),
        onChange
      },
      item
    ));
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      ScrollArea.Autosize,
      {
        mah: ctx.maxDropdownContentHeight,
        type: "never",
        ...ctx.getStyles("scrollarea"),
        ...ctx.scrollAreaProps,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...ctx.getStyles("presetsRoot"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(SimpleGrid, { cols: withSeconds ? 2 : 3, spacing: 4, children: items }) })
      }
    );
  }
  const groups = presets.map((group, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    TimePresetGroup,
    {
      data: group,
      value,
      format,
      amPmLabels,
      withSeconds,
      onChange
    },
    index
  ));
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    ScrollArea.Autosize,
    {
      mah: ctx.maxDropdownContentHeight,
      type: "never",
      ...ctx.getStyles("scrollarea"),
      ...ctx.scrollAreaProps,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...ctx.getStyles("presetsRoot"), children: groups })
    }
  );
}
TimePresets.displayName = "@mantine/dates/TimePresets";
function timeToSeconds(timeStr) {
  const [hours = 0, minutes = 0, seconds = 0] = timeStr.split(":").map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}
function secondsToTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds % 3600 / 60);
  const secs = seconds % 60;
  return {
    timeString: `${padTime(hours)}:${padTime(minutes)}:${padTime(secs)}`,
    hours,
    minutes,
    seconds: secs
  };
}
function clampTime(time, min, max) {
  const timeInSeconds = timeToSeconds(time);
  const minInSeconds = min ? timeToSeconds(min) : -Infinity;
  const maxInSeconds = max ? timeToSeconds(max) : Infinity;
  const clampedSeconds = Math.max(minInSeconds, Math.min(timeInSeconds, maxInSeconds));
  return secondsToTime(clampedSeconds);
}
function convertTimeTo12HourFormat({
  hours,
  minutes,
  seconds,
  amPmLabels
}) {
  if (hours === null) {
    return { hours: null, minutes: null, seconds: null, amPm: null };
  }
  const amPm = hours >= 12 ? amPmLabels.pm : amPmLabels.am;
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return {
    hours: hour12,
    minutes: typeof minutes === "number" ? minutes : null,
    seconds: typeof seconds === "number" ? seconds : null,
    amPm
  };
}
function getParsedTime({ time, format, amPmLabels }) {
  if (time === "") {
    return { hours: null, minutes: null, seconds: null, amPm: null };
  }
  const { hours, minutes, seconds } = splitTimeString(time);
  const parsed = { hours, minutes, seconds };
  if (format === "12h") {
    return convertTimeTo12HourFormat({ ...parsed, amPmLabels });
  }
  return { ...parsed, amPm: null };
}
function convertTo24HourFormat({
  hours,
  minutes,
  seconds,
  amPm,
  amPmLabels,
  withSeconds
}) {
  let _hours = hours;
  if (amPm === amPmLabels.pm && hours !== 12) {
    _hours += 12;
  } else if (amPm === amPmLabels.am && hours === 12) {
    _hours = 0;
  }
  return `${padTime(_hours)}:${padTime(minutes)}${withSeconds ? `:${padTime(seconds || 0)}` : ""}`;
}
function getTimeString({
  hours,
  minutes,
  seconds,
  format,
  withSeconds,
  amPm,
  amPmLabels
}) {
  if (hours === null || minutes === null) {
    return { valid: false, value: "" };
  }
  if (withSeconds && seconds === null) {
    return { valid: false, value: "" };
  }
  if (format === "24h") {
    const value = `${padTime(hours)}:${padTime(minutes)}${withSeconds ? `:${padTime(seconds)}` : ""}`;
    return { valid: true, value };
  }
  if (amPm === null) {
    return { valid: false, value: "" };
  }
  return {
    valid: true,
    value: convertTo24HourFormat({ hours, minutes, seconds, amPm, amPmLabels, withSeconds })
  };
}
function useTimePicker({
  value,
  defaultValue,
  onChange,
  format,
  amPmLabels,
  withSeconds = false,
  min,
  max,
  clearable,
  readOnly,
  disabled,
  pasteSplit
}) {
  const parsedTime = getParsedTime({
    time: value || defaultValue || "",
    amPmLabels,
    format
  });
  const initialTimeString = getTimeString({
    hours: parsedTime.hours,
    minutes: parsedTime.minutes,
    seconds: parsedTime.seconds,
    format,
    withSeconds,
    amPm: parsedTime.amPm,
    amPmLabels
  });
  const acceptChange = reactExports.useRef(true);
  const wasInvalidBefore = reactExports.useRef(!initialTimeString.valid);
  const [hours, setHours] = reactExports.useState(parsedTime.hours);
  const [minutes, setMinutes] = reactExports.useState(parsedTime.minutes);
  const [seconds, setSeconds] = reactExports.useState(parsedTime.seconds);
  const [amPm, setAmPm] = reactExports.useState(parsedTime.amPm);
  const isClearable = clearable && !readOnly && !disabled && (hours !== null || minutes !== null || seconds !== null || amPm !== null);
  const hoursRef = reactExports.useRef(null);
  const minutesRef = reactExports.useRef(null);
  const secondsRef = reactExports.useRef(null);
  const amPmRef = reactExports.useRef(null);
  const focus = (field) => {
    if (field === "hours") {
      hoursRef.current?.focus();
    }
    if (field === "minutes") {
      minutesRef.current?.focus();
    }
    if (field === "seconds") {
      secondsRef.current?.focus();
    }
    if (field === "amPm") {
      amPmRef.current?.focus();
    }
  };
  const handleTimeChange = (field, val) => {
    const computedValue = { hours, minutes, seconds, amPm, [field]: val };
    const timeString = getTimeString({ ...computedValue, format, withSeconds, amPmLabels });
    if (timeString.valid) {
      acceptChange.current = false;
      wasInvalidBefore.current = false;
      if (field === "hours") {
        setHours(val);
      }
      if (field === "minutes") {
        setMinutes(val);
      }
      if (field === "seconds") {
        setSeconds(val);
      }
      if (field === "amPm") {
        setAmPm(val);
      }
      onChange?.(timeString.value);
    } else {
      acceptChange.current = false;
      if (!wasInvalidBefore.current) {
        onChange?.("");
        wasInvalidBefore.current = true;
      }
    }
  };
  const setTimeString = (timeString) => {
    acceptChange.current = false;
    const parsedTime2 = getParsedTime({ time: timeString, amPmLabels, format });
    setHours(parsedTime2.hours);
    setMinutes(parsedTime2.minutes);
    setSeconds(parsedTime2.seconds);
    setAmPm(parsedTime2.amPm);
    const next = getTimeString({ ...parsedTime2, format, withSeconds, amPmLabels });
    wasInvalidBefore.current = !next.valid;
    onChange?.(timeString);
  };
  const onHoursChange = (value2) => {
    let adjustedValue = value2;
    if (format === "12h" && typeof value2 === "number" && value2 > 12) {
      adjustedValue = (value2 - 1) % 12 + 1;
    }
    setHours(adjustedValue);
    handleTimeChange("hours", adjustedValue);
    focus("hours");
  };
  const onMinutesChange = (value2) => {
    setMinutes(value2);
    handleTimeChange("minutes", value2);
    focus("minutes");
  };
  const onSecondsChange = (value2) => {
    setSeconds(value2);
    handleTimeChange("seconds", value2);
    focus("seconds");
  };
  const onAmPmChange = (value2) => {
    setAmPm(value2);
    handleTimeChange("amPm", value2);
    focus("amPm");
  };
  const clear = () => {
    acceptChange.current = false;
    setHours(null);
    setMinutes(null);
    setSeconds(null);
    setAmPm(null);
    onChange?.("");
    wasInvalidBefore.current = true;
    focus("hours");
  };
  const onPaste = (event) => {
    event.preventDefault();
    const pastedValue = event.clipboardData.getData("text");
    const parsedTime2 = (pasteSplit || getParsedTime)({ time: pastedValue, format, amPmLabels });
    const timeString = getTimeString({ ...parsedTime2, format, withSeconds, amPmLabels });
    if (timeString.valid) {
      acceptChange.current = false;
      const clamped = clampTime(timeString.value, min || "00:00:00", max || "23:59:59");
      onChange?.(clamped.timeString);
      setHours(parsedTime2.hours);
      setMinutes(parsedTime2.minutes);
      setSeconds(parsedTime2.seconds);
      setAmPm(parsedTime2.amPm);
    }
  };
  const hiddenInputValue = getTimeString({
    hours,
    minutes,
    seconds,
    format,
    withSeconds,
    amPm,
    amPmLabels
  });
  useDidUpdate(() => {
    if (value === "") {
      acceptChange.current = false;
      setHours(null);
      setMinutes(null);
      setSeconds(null);
      setAmPm(null);
      acceptChange.current = true;
      return;
    }
    if (acceptChange.current && typeof value === "string") {
      const parsedTime2 = getParsedTime({ time: value || "", amPmLabels, format });
      setHours(parsedTime2.hours);
      setMinutes(parsedTime2.minutes);
      setSeconds(parsedTime2.seconds);
      setAmPm(parsedTime2.amPm);
    }
    acceptChange.current = true;
  }, [value]);
  return {
    refs: { hours: hoursRef, minutes: minutesRef, seconds: secondsRef, amPm: amPmRef },
    values: { hours, minutes, seconds, amPm },
    setHours: onHoursChange,
    setMinutes: onMinutesChange,
    setSeconds: onSecondsChange,
    setAmPm: onAmPmChange,
    focus,
    clear,
    onPaste,
    setTimeString,
    isClearable,
    hiddenInputValue: hiddenInputValue.value
  };
}
const defaultProps$d = {
  hoursStep: 1,
  minutesStep: 1,
  secondsStep: 1,
  format: "24h",
  amPmLabels: { am: "AM", pm: "PM" },
  pasteSplit: getParsedTime,
  maxDropdownContentHeight: 200,
  hoursPlaceholder: "--",
  minutesPlaceholder: "--",
  secondsPlaceholder: "--"
};
const varsResolver$6 = createVarsResolver((_theme, { size }) => ({
  dropdown: {
    "--control-font-size": getFontSize(size)
  }
}));
const TimePicker = factory((_props, ref) => {
  const props = useProps("TimePicker", defaultProps$d, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    onClick,
    format,
    value,
    defaultValue,
    onChange,
    hoursStep,
    minutesStep,
    secondsStep,
    withSeconds,
    hoursInputLabel,
    minutesInputLabel,
    secondsInputLabel,
    amPmInputLabel,
    amPmLabels,
    clearable,
    onMouseDown,
    onFocusCapture,
    onBlurCapture,
    min,
    max,
    popoverProps,
    withDropdown,
    rightSection,
    onFocus,
    onBlur,
    clearButtonProps,
    hoursInputProps,
    minutesInputProps,
    secondsInputProps,
    amPmSelectProps,
    readOnly,
    disabled,
    size,
    name,
    form,
    hiddenInputProps,
    labelProps,
    pasteSplit,
    hoursRef,
    minutesRef,
    secondsRef,
    amPmRef,
    presets,
    maxDropdownContentHeight,
    scrollAreaProps,
    attributes,
    reverseTimeControlsList,
    hoursPlaceholder,
    minutesPlaceholder,
    secondsPlaceholder,
    ...others
  } = props;
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    classNames,
    styles,
    props
  });
  const getStyles = useStyles({
    name: "TimePicker",
    classes: classes$b,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$6
  });
  const controller = useTimePicker({
    value,
    defaultValue,
    onChange,
    format,
    amPmLabels,
    withSeconds,
    min,
    max,
    clearable,
    disabled,
    readOnly,
    pasteSplit
  });
  const _hoursRef = useMergedRef(controller.refs.hours, hoursRef);
  const _minutesRef = useMergedRef(controller.refs.minutes, minutesRef);
  const _secondsRef = useMergedRef(controller.refs.seconds, secondsRef);
  const _amPmRef = useMergedRef(controller.refs.amPm, amPmRef);
  const hoursInputId = useId();
  const hasFocusRef = reactExports.useRef(false);
  const [dropdownOpened, setDropdownOpened] = reactExports.useState(false);
  const handleFocus = (event) => {
    if (!hasFocusRef.current) {
      hasFocusRef.current = true;
      onFocus?.(event);
    }
  };
  const handleBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      const computedValue = controller.values;
      const timeString = getTimeString({
        ...computedValue,
        format,
        amPmLabels,
        withSeconds: !!withSeconds
      });
      if (timeString.valid && (min || max)) {
        const clamped = clampTime(timeString.value, min, max);
        if (clamped.timeString !== timeString.value) {
          controller.setTimeString(clamped.timeString);
        }
      }
      hasFocusRef.current = false;
      onBlur?.(event);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TimePickerProvider, { value: { getStyles, scrollAreaProps, maxDropdownContentHeight }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Popover,
    {
      opened: dropdownOpened,
      transitionProps: { duration: 0 },
      position: "bottom-start",
      withRoles: false,
      disabled: disabled || readOnly || !withDropdown,
      ...popoverProps,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Popover.Target, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          InputBase,
          {
            component: "div",
            size,
            disabled,
            ref,
            onClick: (event) => {
              onClick?.(event);
              controller.focus("hours");
            },
            onMouseDown: (event) => {
              event.preventDefault();
              onMouseDown?.(event);
            },
            onFocusCapture: (event) => {
              setDropdownOpened(true);
              onFocusCapture?.(event);
            },
            onBlurCapture: (event) => {
              setDropdownOpened(false);
              onBlurCapture?.(event);
            },
            rightSection: rightSection || controller.isClearable && /* @__PURE__ */ jsxRuntimeExports.jsx(
              CloseButton,
              {
                ...clearButtonProps,
                size,
                onClick: (event) => {
                  controller.clear();
                  clearButtonProps?.onClick?.(event);
                },
                onMouseDown: (event) => {
                  event.preventDefault();
                  clearButtonProps?.onMouseDown?.(event);
                }
              }
            ),
            labelProps: { htmlFor: hoursInputId, ...labelProps },
            style,
            className,
            classNames: resolvedClassNames,
            styles: resolvedStyles,
            __staticSelector: "TimePicker",
            ...others,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...getStyles("fieldsRoot"), dir: "ltr", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ...getStyles("fieldsGroup"), onBlur: handleBlur, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SpinInput,
                  {
                    id: hoursInputId,
                    ...hoursInputProps,
                    ...getStyles("field", {
                      className: hoursInputProps?.className,
                      style: hoursInputProps?.style
                    }),
                    value: controller.values.hours,
                    onChange: controller.setHours,
                    onNextInput: () => controller.focus("minutes"),
                    min: format === "12h" ? 1 : 0,
                    max: format === "12h" ? 12 : 23,
                    allowTemporaryZero: format === "12h",
                    focusable: true,
                    step: hoursStep,
                    ref: _hoursRef,
                    "aria-label": hoursInputLabel,
                    readOnly,
                    disabled,
                    onPaste: controller.onPaste,
                    onFocus: (event) => {
                      handleFocus(event);
                      hoursInputProps?.onFocus?.(event);
                    },
                    onBlur: (event) => {
                      const actualInputValue = event.currentTarget.value;
                      const numericValue = actualInputValue ? parseInt(actualInputValue, 10) : null;
                      if (format === "12h" && numericValue === 0) {
                        controller.setHours(12);
                      }
                      hoursInputProps?.onBlur?.(event);
                    },
                    placeholder: hoursPlaceholder
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ":" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  SpinInput,
                  {
                    ...minutesInputProps,
                    ...getStyles("field", {
                      className: minutesInputProps?.className,
                      style: minutesInputProps?.style
                    }),
                    value: controller.values.minutes,
                    onChange: controller.setMinutes,
                    min: 0,
                    max: 59,
                    focusable: true,
                    step: minutesStep,
                    ref: _minutesRef,
                    onPreviousInput: () => controller.focus("hours"),
                    onNextInput: () => withSeconds ? controller.focus("seconds") : controller.focus("amPm"),
                    "aria-label": minutesInputLabel,
                    tabIndex: -1,
                    readOnly,
                    disabled,
                    onPaste: controller.onPaste,
                    onFocus: (event) => {
                      handleFocus(event);
                      minutesInputProps?.onFocus?.(event);
                    },
                    placeholder: minutesPlaceholder
                  }
                ),
                withSeconds && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: ":" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    SpinInput,
                    {
                      ...secondsInputProps,
                      ...getStyles("field", {
                        className: secondsInputProps?.className,
                        style: secondsInputProps?.style
                      }),
                      value: controller.values.seconds,
                      onChange: controller.setSeconds,
                      min: 0,
                      max: 59,
                      focusable: true,
                      step: secondsStep,
                      ref: _secondsRef,
                      onPreviousInput: () => controller.focus("minutes"),
                      onNextInput: () => controller.focus("amPm"),
                      "aria-label": secondsInputLabel,
                      tabIndex: -1,
                      readOnly,
                      disabled,
                      onPaste: controller.onPaste,
                      onFocus: (event) => {
                        handleFocus(event);
                        secondsInputProps?.onFocus?.(event);
                      },
                      placeholder: secondsPlaceholder
                    }
                  )
                ] }),
                format === "12h" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  AmPmInput,
                  {
                    ...amPmSelectProps,
                    inputType: withDropdown ? "input" : "select",
                    labels: amPmLabels,
                    value: controller.values.amPm,
                    onChange: controller.setAmPm,
                    ref: _amPmRef,
                    "aria-label": amPmInputLabel,
                    onPreviousInput: () => withSeconds ? controller.focus("seconds") : controller.focus("minutes"),
                    readOnly,
                    disabled,
                    tabIndex: -1,
                    onPaste: controller.onPaste,
                    onFocus: (event) => {
                      handleFocus(event);
                      amPmSelectProps?.onFocus?.(event);
                    }
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  type: "hidden",
                  name,
                  form,
                  value: controller.hiddenInputValue,
                  ...hiddenInputProps
                }
              )
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Popover.Dropdown,
          {
            ...getStyles("dropdown"),
            onMouseDown: (event) => event.preventDefault(),
            children: presets ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              TimePresets,
              {
                value: controller.hiddenInputValue,
                onChange: controller.setTimeString,
                format,
                presets,
                amPmLabels,
                withSeconds: withSeconds || false
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ...getStyles("controlsListGroup"), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TimeControlsList,
                {
                  min: format === "12h" ? 1 : 0,
                  max: format === "12h" ? 12 : 23,
                  step: hoursStep,
                  value: controller.values.hours,
                  onSelect: controller.setHours,
                  reversed: reverseTimeControlsList
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                TimeControlsList,
                {
                  min: 0,
                  max: 59,
                  step: minutesStep,
                  value: controller.values.minutes,
                  onSelect: controller.setMinutes,
                  reversed: reverseTimeControlsList
                }
              ),
              withSeconds && /* @__PURE__ */ jsxRuntimeExports.jsx(
                TimeControlsList,
                {
                  min: 0,
                  max: 59,
                  step: secondsStep,
                  value: controller.values.seconds,
                  onSelect: controller.setSeconds,
                  reversed: reverseTimeControlsList
                }
              ),
              format === "12h" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                AmPmControlsList,
                {
                  labels: amPmLabels,
                  value: controller.values.amPm,
                  onSelect: controller.setAmPm
                }
              )
            ] })
          }
        )
      ]
    }
  ) });
});
TimePicker.displayName = "@mantine/dates/TimePicker";
TimePicker.classes = classes$b;
var classes$a = { "day": "m_396ce5cb" };
const varsResolver$5 = createVarsResolver((_, { size }) => ({
  day: {
    "--day-size": getSize(size, "day-size")
  }
}));
const Day = factory((_props, ref) => {
  const props = useProps("Day", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    date,
    disabled,
    __staticSelector,
    weekend,
    outside,
    selected,
    renderDay,
    inRange,
    firstInRange,
    lastInRange,
    hidden,
    static: isStatic,
    highlightToday,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: __staticSelector || "Day",
    classes: classes$a,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$5,
    rootSelector: "day"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    UnstyledButton,
    {
      ...getStyles("day", { style: hidden ? { display: "none" } : void 0 }),
      component: isStatic ? "div" : "button",
      ref,
      disabled,
      "data-today": dayjs(date).isSame(/* @__PURE__ */ new Date(), "day") || void 0,
      "data-hidden": hidden || void 0,
      "data-highlight-today": highlightToday || void 0,
      "data-disabled": disabled || void 0,
      "data-weekend": !disabled && !outside && weekend || void 0,
      "data-outside": !disabled && outside || void 0,
      "data-selected": !disabled && selected || void 0,
      "data-in-range": inRange && !disabled || void 0,
      "data-first-in-range": firstInRange && !disabled || void 0,
      "data-last-in-range": lastInRange && !disabled || void 0,
      "data-static": isStatic || void 0,
      unstyled,
      ...others,
      children: renderDay?.(date) || dayjs(date).date()
    }
  );
});
Day.classes = classes$a;
Day.displayName = "@mantine/dates/Day";
function getWeekdayNames({
  locale,
  format = "dd",
  firstDayOfWeek = 1
}) {
  const baseDate = dayjs().day(firstDayOfWeek);
  const labels = [];
  for (let i = 0; i < 7; i += 1) {
    if (typeof format === "string") {
      labels.push(dayjs(baseDate).add(i, "days").locale(locale).format(format));
    } else {
      labels.push(format(dayjs(baseDate).add(i, "days").format("YYYY-MM-DD")));
    }
  }
  return labels;
}
var classes$9 = { "weekday": "m_18a3eca" };
const varsResolver$4 = createVarsResolver((_, { size }) => ({
  weekdaysRow: {
    "--wr-fz": getFontSize(size),
    "--wr-spacing": getSpacing(size)
  }
}));
const WeekdaysRow = factory((_props, ref) => {
  const props = useProps("WeekdaysRow", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    locale,
    firstDayOfWeek,
    weekdayFormat,
    cellComponent: CellComponent = "th",
    __staticSelector,
    withWeekNumbers,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: __staticSelector || "WeekdaysRow",
    classes: classes$9,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$4,
    rootSelector: "weekdaysRow"
  });
  const ctx = useDatesContext();
  const weekdays = getWeekdayNames({
    locale: ctx.getLocale(locale),
    format: weekdayFormat,
    firstDayOfWeek: ctx.getFirstDayOfWeek(firstDayOfWeek)
  }).map((weekday, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(CellComponent, { ...getStyles("weekday"), children: weekday }, index));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { component: "tr", ref, ...getStyles("weekdaysRow"), ...others, children: [
    withWeekNumbers && /* @__PURE__ */ jsxRuntimeExports.jsx(CellComponent, { ...getStyles("weekday"), children: "#" }),
    weekdays
  ] });
});
WeekdaysRow.classes = classes$9;
WeekdaysRow.displayName = "@mantine/dates/WeekdaysRow";
function getEndOfWeek(date, firstDayOfWeek = 1) {
  let value = dayjs(date);
  if (!value.isValid()) {
    return value;
  }
  const lastDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  while (value.day() !== lastDayOfWeek) {
    value = value.add(1, "day");
  }
  return value.format("YYYY-MM-DD");
}
function getStartOfWeek(date, firstDayOfWeek = 1) {
  let value = dayjs(date);
  while (value.day() !== firstDayOfWeek) {
    value = value.subtract(1, "day");
  }
  return value.format("YYYY-MM-DD");
}
function getMonthDays({
  month,
  firstDayOfWeek = 1,
  consistentWeeks
}) {
  const day = dayjs(month).subtract(dayjs(month).date() - 1, "day");
  const start = dayjs(day.format("YYYY-M-D"));
  const startOfMonth = start.format("YYYY-MM-DD");
  const endOfMonth = start.add(+start.daysInMonth() - 1, "day").format("YYYY-MM-DD");
  const endDate = getEndOfWeek(endOfMonth, firstDayOfWeek);
  const weeks = [];
  let date = dayjs(getStartOfWeek(startOfMonth, firstDayOfWeek));
  while (dayjs(date).isBefore(endDate, "day")) {
    const days = [];
    for (let i = 0; i < 7; i += 1) {
      days.push(date.format("YYYY-MM-DD"));
      date = date.add(1, "day");
    }
    weeks.push(days);
  }
  if (consistentWeeks && weeks.length < 6) {
    const lastWeek = weeks[weeks.length - 1];
    const lastDay = lastWeek[lastWeek.length - 1];
    let nextDay = dayjs(lastDay).add(1, "day");
    while (weeks.length < 6) {
      const days = [];
      for (let i = 0; i < 7; i += 1) {
        days.push(nextDay.format("YYYY-MM-DD"));
        nextDay = nextDay.add(1, "day");
      }
      weeks.push(days);
    }
  }
  return weeks;
}
function isSameMonth(date, comparison) {
  return dayjs(date).format("YYYY-MM") === dayjs(comparison).format("YYYY-MM");
}
function isAfterMinDate(date, minDate) {
  return minDate ? dayjs(date).isAfter(dayjs(minDate).subtract(1, "day"), "day") : true;
}
function isBeforeMaxDate(date, maxDate) {
  return maxDate ? dayjs(date).isBefore(dayjs(maxDate).add(1, "day"), "day") : true;
}
function getDateInTabOrder({
  dates,
  minDate,
  maxDate,
  getDayProps,
  excludeDate,
  hideOutsideDates,
  month
}) {
  const enabledDates = dates.flat().filter(
    (date) => isBeforeMaxDate(date, maxDate) && isAfterMinDate(date, minDate) && !excludeDate?.(date) && !getDayProps?.(date)?.disabled && (!hideOutsideDates || isSameMonth(date, month))
  );
  const selectedDate = enabledDates.find((date) => getDayProps?.(date)?.selected);
  if (selectedDate) {
    return selectedDate;
  }
  const currentDate = enabledDates.find((date) => dayjs().isSame(date, "date"));
  if (currentDate) {
    return currentDate;
  }
  return enabledDates[0];
}
dayjs.extend(isoWeek);
function getWeekNumber(week) {
  const monday = week.find((date) => dayjs(date).day() === 1);
  return dayjs(monday).isoWeek();
}
var classes$8 = { "month": "m_cc9820d3", "monthCell": "m_8f457cd5", "weekNumber": "m_6cff9dea" };
const defaultProps$c = {
  withCellSpacing: true
};
const varsResolver$3 = createVarsResolver((_, { size }) => ({
  weekNumber: {
    "--wn-fz": getFontSize(size),
    "--wn-size": getSize(size, "wn-size")
  }
}));
const Month = factory((_props, ref) => {
  const props = useProps("Month", defaultProps$c, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    __staticSelector,
    locale,
    firstDayOfWeek,
    weekdayFormat,
    month,
    weekendDays,
    getDayProps,
    excludeDate,
    minDate,
    maxDate,
    renderDay,
    hideOutsideDates,
    hideWeekdays,
    getDayAriaLabel,
    static: isStatic,
    __getDayRef,
    __onDayKeyDown,
    __onDayClick,
    __onDayMouseEnter,
    __preventFocus,
    __stopPropagation,
    withCellSpacing,
    size,
    highlightToday,
    withWeekNumbers,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: __staticSelector || "Month",
    classes: classes$8,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$3,
    rootSelector: "month"
  });
  const ctx = useDatesContext();
  const dates = getMonthDays({
    month,
    firstDayOfWeek: ctx.getFirstDayOfWeek(firstDayOfWeek),
    consistentWeeks: ctx.consistentWeeks
  });
  const dateInTabOrder = getDateInTabOrder({
    dates,
    minDate: toDateString(minDate),
    maxDate: toDateString(maxDate),
    getDayProps,
    excludeDate,
    hideOutsideDates,
    month
  });
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    classNames,
    styles,
    props
  });
  const rows = dates.map((row, rowIndex) => {
    const cells = row.map((date, cellIndex) => {
      const outside = !isSameMonth(date, month);
      const ariaLabel = getDayAriaLabel?.(date) || dayjs(date).locale(locale || ctx.locale).format("D MMMM YYYY");
      const dayProps = getDayProps?.(date);
      const isDateInTabOrder = dayjs(date).isSame(dateInTabOrder, "date");
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          ...getStyles("monthCell"),
          "data-with-spacing": withCellSpacing || void 0,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Day,
            {
              __staticSelector: __staticSelector || "Month",
              classNames: resolvedClassNames,
              styles: resolvedStyles,
              unstyled,
              "data-mantine-stop-propagation": __stopPropagation || void 0,
              highlightToday,
              renderDay,
              date,
              size,
              weekend: ctx.getWeekendDays(weekendDays).includes(dayjs(date).get("day")),
              outside,
              hidden: hideOutsideDates ? outside : false,
              "aria-label": ariaLabel,
              static: isStatic,
              disabled: excludeDate?.(date) || !isBeforeMaxDate(date, toDateString(maxDate)) || !isAfterMinDate(date, toDateString(minDate)),
              ref: (node) => {
                if (node) {
                  __getDayRef?.(rowIndex, cellIndex, node);
                }
              },
              ...dayProps,
              onKeyDown: (event) => {
                dayProps?.onKeyDown?.(event);
                __onDayKeyDown?.(event, { rowIndex, cellIndex, date });
              },
              onMouseEnter: (event) => {
                dayProps?.onMouseEnter?.(event);
                __onDayMouseEnter?.(event, date);
              },
              onClick: (event) => {
                dayProps?.onClick?.(event);
                __onDayClick?.(event, date);
              },
              onMouseDown: (event) => {
                dayProps?.onMouseDown?.(event);
                __preventFocus && event.preventDefault();
              },
              tabIndex: __preventFocus || !isDateInTabOrder ? -1 : 0
            }
          )
        },
        date.toString()
      );
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { ...getStyles("monthRow"), children: [
      withWeekNumbers && /* @__PURE__ */ jsxRuntimeExports.jsx("td", { ...getStyles("weekNumber"), children: getWeekNumber(row) }),
      cells
    ] }, rowIndex);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { component: "table", ...getStyles("month"), size, ref, ...others, children: [
    !hideWeekdays && /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { ...getStyles("monthThead"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      WeekdaysRow,
      {
        __staticSelector: __staticSelector || "Month",
        locale,
        firstDayOfWeek,
        weekdayFormat,
        size,
        classNames: resolvedClassNames,
        styles: resolvedStyles,
        unstyled,
        withWeekNumbers
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { ...getStyles("monthTbody"), children: rows })
  ] });
});
Month.classes = classes$8;
Month.displayName = "@mantine/dates/Month";
var classes$7 = { "pickerControl": "m_dc6a3c71" };
const varsResolver$2 = createVarsResolver((_, { size }) => ({
  pickerControl: {
    "--dpc-fz": getFontSize(size),
    "--dpc-size": getSize(size, "dpc-size")
  }
}));
const PickerControl = factory((_props, ref) => {
  const props = useProps("PickerControl", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    firstInRange,
    lastInRange,
    inRange,
    __staticSelector,
    selected,
    disabled,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: __staticSelector || "PickerControl",
    classes: classes$7,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$2,
    rootSelector: "pickerControl"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    UnstyledButton,
    {
      ...getStyles("pickerControl"),
      ref,
      unstyled,
      "data-picker-control": true,
      "data-selected": selected && !disabled || void 0,
      "data-disabled": disabled || void 0,
      "data-in-range": inRange && !disabled && !selected || void 0,
      "data-first-in-range": firstInRange && !disabled || void 0,
      "data-last-in-range": lastInRange && !disabled || void 0,
      disabled,
      ...others
    }
  );
});
PickerControl.classes = classes$7;
PickerControl.displayName = "@mantine/dates/PickerControl";
function isYearDisabled({ year, minDate, maxDate }) {
  if (!minDate && !maxDate) {
    return false;
  }
  if (minDate && dayjs(year).isBefore(minDate, "year")) {
    return true;
  }
  if (maxDate && dayjs(year).isAfter(maxDate, "year")) {
    return true;
  }
  return false;
}
function getYearInTabOrder({
  years,
  minDate,
  maxDate,
  getYearControlProps
}) {
  const enabledYears = years.flat().filter(
    (year) => !isYearDisabled({ year, minDate, maxDate }) && !getYearControlProps?.(year)?.disabled
  );
  const selectedYear = enabledYears.find((year) => getYearControlProps?.(year)?.selected);
  if (selectedYear) {
    return selectedYear;
  }
  const currentYear = enabledYears.find((year) => dayjs().isSame(year, "year"));
  if (currentYear) {
    return currentYear;
  }
  return enabledYears[0];
}
function getYearsData(decade) {
  const year = dayjs(decade).year();
  const rounded = year - year % 10;
  let currentYearIndex = 0;
  const results = [[], [], [], []];
  for (let i = 0; i < 4; i += 1) {
    const max = i === 3 ? 1 : 3;
    for (let j = 0; j < max; j += 1) {
      results[i].push(dayjs(new Date(rounded + currentYearIndex, 0)).format("YYYY-MM-DD"));
      currentYearIndex += 1;
    }
  }
  return results;
}
var classes$6 = { "yearsList": "m_9206547b", "yearsListCell": "m_c5a19c7d" };
const defaultProps$b = {
  yearsListFormat: "YYYY",
  withCellSpacing: true
};
const YearsList = factory((_props, ref) => {
  const props = useProps("YearsList", defaultProps$b, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    decade,
    yearsListFormat,
    locale,
    minDate,
    maxDate,
    getYearControlProps,
    __staticSelector,
    __getControlRef,
    __onControlKeyDown,
    __onControlClick,
    __onControlMouseEnter,
    __preventFocus,
    __stopPropagation,
    withCellSpacing,
    size,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: __staticSelector || "YearsList",
    classes: classes$6,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    rootSelector: "yearsList"
  });
  const ctx = useDatesContext();
  const years = getYearsData(decade);
  const yearInTabOrder = getYearInTabOrder({
    years,
    minDate,
    maxDate,
    getYearControlProps
  });
  const rows = years.map((yearsRow, rowIndex) => {
    const cells = yearsRow.map((year, cellIndex) => {
      const controlProps = getYearControlProps?.(year);
      const isYearInTabOrder = dayjs(year).isSame(yearInTabOrder, "year");
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          ...getStyles("yearsListCell"),
          "data-with-spacing": withCellSpacing || void 0,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            PickerControl,
            {
              ...getStyles("yearsListControl"),
              size,
              unstyled,
              "data-mantine-stop-propagation": __stopPropagation || void 0,
              disabled: isYearDisabled({ year, minDate, maxDate }),
              ref: (node) => {
                if (node) {
                  __getControlRef?.(rowIndex, cellIndex, node);
                }
              },
              ...controlProps,
              onKeyDown: (event) => {
                controlProps?.onKeyDown?.(event);
                __onControlKeyDown?.(event, { rowIndex, cellIndex, date: year });
              },
              onClick: (event) => {
                controlProps?.onClick?.(event);
                __onControlClick?.(event, year);
              },
              onMouseEnter: (event) => {
                controlProps?.onMouseEnter?.(event);
                __onControlMouseEnter?.(event, year);
              },
              onMouseDown: (event) => {
                controlProps?.onMouseDown?.(event);
                __preventFocus && event.preventDefault();
              },
              tabIndex: __preventFocus || !isYearInTabOrder ? -1 : 0,
              children: controlProps?.children ?? dayjs(year).locale(ctx.getLocale(locale)).format(yearsListFormat)
            }
          )
        },
        cellIndex
      );
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { ...getStyles("yearsListRow"), children: cells }, rowIndex);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "table", ref, size, ...getStyles("yearsList"), ...others, children: /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows }) });
});
YearsList.classes = classes$6;
YearsList.displayName = "@mantine/dates/YearsList";
function isMonthDisabled({ month, minDate, maxDate }) {
  if (!minDate && !maxDate) {
    return false;
  }
  if (minDate && dayjs(month).isBefore(minDate, "month")) {
    return true;
  }
  if (maxDate && dayjs(month).isAfter(maxDate, "month")) {
    return true;
  }
  return false;
}
function getMonthInTabOrder({
  months,
  minDate,
  maxDate,
  getMonthControlProps
}) {
  const enabledMonths = months.flat().filter(
    (month) => !isMonthDisabled({ month, minDate, maxDate }) && !getMonthControlProps?.(month)?.disabled
  );
  const selectedMonth = enabledMonths.find((month) => getMonthControlProps?.(month)?.selected);
  if (selectedMonth) {
    return selectedMonth;
  }
  const currentMonth = enabledMonths.find((month) => dayjs().isSame(month, "month"));
  if (currentMonth) {
    return currentMonth;
  }
  return enabledMonths[0];
}
function getMonthsData(year) {
  const startOfYear = dayjs(year).startOf("year").toDate();
  const results = [[], [], [], []];
  let currentMonthIndex = 0;
  for (let i = 0; i < 4; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      results[i].push(dayjs(startOfYear).add(currentMonthIndex, "months").format("YYYY-MM-DD"));
      currentMonthIndex += 1;
    }
  }
  return results;
}
var classes$5 = { "monthsList": "m_2a6c32d", "monthsListCell": "m_fe27622f" };
const defaultProps$a = {
  monthsListFormat: "MMM",
  withCellSpacing: true
};
const MonthsList = factory((_props, ref) => {
  const props = useProps("MonthsList", defaultProps$a, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    __staticSelector,
    year,
    monthsListFormat,
    locale,
    minDate,
    maxDate,
    getMonthControlProps,
    __getControlRef,
    __onControlKeyDown,
    __onControlClick,
    __onControlMouseEnter,
    __preventFocus,
    __stopPropagation,
    withCellSpacing,
    size,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: __staticSelector || "MonthsList",
    classes: classes$5,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    rootSelector: "monthsList"
  });
  const ctx = useDatesContext();
  const months = getMonthsData(year);
  const monthInTabOrder = getMonthInTabOrder({
    months,
    minDate: toDateString(minDate),
    maxDate: toDateString(maxDate),
    getMonthControlProps
  });
  const rows = months.map((monthsRow, rowIndex) => {
    const cells = monthsRow.map((month, cellIndex) => {
      const controlProps = getMonthControlProps?.(month);
      const isMonthInTabOrder = dayjs(month).isSame(monthInTabOrder, "month");
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "td",
        {
          ...getStyles("monthsListCell"),
          "data-with-spacing": withCellSpacing || void 0,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            PickerControl,
            {
              ...getStyles("monthsListControl"),
              size,
              unstyled,
              __staticSelector: __staticSelector || "MonthsList",
              "data-mantine-stop-propagation": __stopPropagation || void 0,
              disabled: isMonthDisabled({
                month,
                minDate: toDateString(minDate),
                maxDate: toDateString(maxDate)
              }),
              ref: (node) => {
                if (node) {
                  __getControlRef?.(rowIndex, cellIndex, node);
                }
              },
              ...controlProps,
              onKeyDown: (event) => {
                controlProps?.onKeyDown?.(event);
                __onControlKeyDown?.(event, { rowIndex, cellIndex, date: month });
              },
              onClick: (event) => {
                controlProps?.onClick?.(event);
                __onControlClick?.(event, month);
              },
              onMouseEnter: (event) => {
                controlProps?.onMouseEnter?.(event);
                __onControlMouseEnter?.(event, month);
              },
              onMouseDown: (event) => {
                controlProps?.onMouseDown?.(event);
                __preventFocus && event.preventDefault();
              },
              tabIndex: __preventFocus || !isMonthInTabOrder ? -1 : 0,
              children: controlProps?.children ?? dayjs(month).locale(ctx.getLocale(locale)).format(monthsListFormat)
            }
          )
        },
        cellIndex
      );
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { ...getStyles("monthsListRow"), children: cells }, rowIndex);
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { component: "table", ref, size, ...getStyles("monthsList"), ...others, children: /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows }) });
});
MonthsList.classes = classes$5;
MonthsList.displayName = "@mantine/dates/MonthsList";
var classes$4 = { "calendarHeader": "m_730a79ed", "calendarHeaderLevel": "m_f6645d97", "calendarHeaderControl": "m_2351eeb0", "calendarHeaderControlIcon": "m_367dc749" };
const defaultProps$9 = {
  hasNextLevel: true,
  withNext: true,
  withPrevious: true,
  headerControlsOrder: ["previous", "level", "next"]
};
const varsResolver$1 = createVarsResolver((_, { size }) => ({
  calendarHeader: {
    "--dch-control-size": getSize(size, "dch-control-size"),
    "--dch-fz": getFontSize(size)
  }
}));
const CalendarHeader = factory((_props, ref) => {
  const props = useProps("CalendarHeader", defaultProps$9, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    nextIcon,
    previousIcon,
    nextLabel,
    previousLabel,
    onNext,
    onPrevious,
    onLevelClick,
    label,
    nextDisabled,
    previousDisabled,
    hasNextLevel,
    levelControlAriaLabel,
    withNext,
    withPrevious,
    headerControlsOrder,
    __staticSelector,
    __preventFocus,
    __stopPropagation,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: __staticSelector || "CalendarHeader",
    classes: classes$4,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    varsResolver: varsResolver$1,
    rootSelector: "calendarHeader"
  });
  const preventFocus = __preventFocus ? (event) => event.preventDefault() : void 0;
  const previousControl = withPrevious && /* @__PURE__ */ reactExports.createElement(
    UnstyledButton,
    {
      ...getStyles("calendarHeaderControl"),
      key: "previous",
      "data-direction": "previous",
      "aria-label": previousLabel,
      onClick: onPrevious,
      unstyled,
      onMouseDown: preventFocus,
      disabled: previousDisabled,
      "data-disabled": previousDisabled || void 0,
      tabIndex: __preventFocus || previousDisabled ? -1 : 0,
      "data-mantine-stop-propagation": __stopPropagation || void 0
    },
    previousIcon || /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccordionChevron,
      {
        ...getStyles("calendarHeaderControlIcon"),
        "data-direction": "previous",
        size: "45%"
      }
    )
  );
  const levelControl = /* @__PURE__ */ reactExports.createElement(
    UnstyledButton,
    {
      component: hasNextLevel ? "button" : "div",
      ...getStyles("calendarHeaderLevel"),
      key: "level",
      onClick: hasNextLevel ? onLevelClick : void 0,
      unstyled,
      onMouseDown: hasNextLevel ? preventFocus : void 0,
      disabled: !hasNextLevel,
      "data-static": !hasNextLevel || void 0,
      "aria-label": levelControlAriaLabel,
      tabIndex: __preventFocus || !hasNextLevel ? -1 : 0,
      "data-mantine-stop-propagation": __stopPropagation || void 0
    },
    label
  );
  const nextControl = withNext && /* @__PURE__ */ reactExports.createElement(
    UnstyledButton,
    {
      ...getStyles("calendarHeaderControl"),
      key: "next",
      "data-direction": "next",
      "aria-label": nextLabel,
      onClick: onNext,
      unstyled,
      onMouseDown: preventFocus,
      disabled: nextDisabled,
      "data-disabled": nextDisabled || void 0,
      tabIndex: __preventFocus || nextDisabled ? -1 : 0,
      "data-mantine-stop-propagation": __stopPropagation || void 0
    },
    nextIcon || /* @__PURE__ */ jsxRuntimeExports.jsx(
      AccordionChevron,
      {
        ...getStyles("calendarHeaderControlIcon"),
        "data-direction": "next",
        size: "45%"
      }
    )
  );
  const controls = headerControlsOrder.map((control) => {
    if (control === "previous") {
      return previousControl;
    }
    if (control === "level") {
      return levelControl;
    }
    if (control === "next") {
      return nextControl;
    }
    return null;
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ...getStyles("calendarHeader"), ref, ...others, children: controls });
});
CalendarHeader.classes = classes$4;
CalendarHeader.displayName = "@mantine/dates/CalendarHeader";
function getDecadeRange(decade) {
  const years = getYearsData(decade);
  return [years[0][0], years[3][0]];
}
const defaultProps$8 = {
  decadeLabelFormat: "YYYY"
};
const DecadeLevel = factory((_props, ref) => {
  const props = useProps("DecadeLevel", defaultProps$8, _props);
  const {
    // YearsList settings
    decade,
    locale,
    minDate,
    maxDate,
    yearsListFormat,
    getYearControlProps,
    __getControlRef,
    __onControlKeyDown,
    __onControlClick,
    __onControlMouseEnter,
    withCellSpacing,
    // CalendarHeader settings
    __preventFocus,
    nextIcon,
    previousIcon,
    nextLabel,
    previousLabel,
    onNext,
    onPrevious,
    nextDisabled,
    previousDisabled,
    levelControlAriaLabel,
    withNext,
    withPrevious,
    headerControlsOrder,
    // Other props
    decadeLabelFormat,
    classNames,
    styles,
    unstyled,
    __staticSelector,
    __stopPropagation,
    size,
    attributes,
    ...others
  } = props;
  const ctx = useDatesContext();
  const [startOfDecade, endOfDecade] = getDecadeRange(decade);
  const stylesApiProps = {
    __staticSelector: __staticSelector || "DecadeLevel",
    classNames,
    styles,
    unstyled,
    size,
    attributes
  };
  const _nextDisabled = typeof nextDisabled === "boolean" ? nextDisabled : maxDate ? !dayjs(endOfDecade).endOf("year").isBefore(maxDate) : false;
  const _previousDisabled = typeof previousDisabled === "boolean" ? previousDisabled : minDate ? !dayjs(startOfDecade).startOf("year").isAfter(minDate) : false;
  const formatDecade = (date, format) => dayjs(date).locale(locale || ctx.locale).format(format);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { "data-decade-level": true, size, ref, ...others, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CalendarHeader,
      {
        label: typeof decadeLabelFormat === "function" ? decadeLabelFormat(startOfDecade, endOfDecade) : `${formatDecade(startOfDecade, decadeLabelFormat)} – ${formatDecade(
          endOfDecade,
          decadeLabelFormat
        )}`,
        __preventFocus,
        __stopPropagation,
        nextIcon,
        previousIcon,
        nextLabel,
        previousLabel,
        onNext,
        onPrevious,
        nextDisabled: _nextDisabled,
        previousDisabled: _previousDisabled,
        hasNextLevel: false,
        levelControlAriaLabel,
        withNext,
        withPrevious,
        headerControlsOrder,
        ...stylesApiProps
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      YearsList,
      {
        decade,
        locale,
        minDate,
        maxDate,
        yearsListFormat,
        getYearControlProps,
        __getControlRef,
        __onControlKeyDown,
        __onControlClick,
        __onControlMouseEnter,
        __preventFocus,
        __stopPropagation,
        withCellSpacing,
        ...stylesApiProps
      }
    )
  ] });
});
DecadeLevel.classes = { ...YearsList.classes, ...CalendarHeader.classes };
DecadeLevel.displayName = "@mantine/dates/DecadeLevel";
const defaultProps$7 = {
  yearLabelFormat: "YYYY"
};
const YearLevel = factory((_props, ref) => {
  const props = useProps("YearLevel", defaultProps$7, _props);
  const {
    // MonthsList settings
    year,
    locale,
    minDate,
    maxDate,
    monthsListFormat,
    getMonthControlProps,
    __getControlRef,
    __onControlKeyDown,
    __onControlClick,
    __onControlMouseEnter,
    withCellSpacing,
    // CalendarHeader settings
    __preventFocus,
    nextIcon,
    previousIcon,
    nextLabel,
    previousLabel,
    onNext,
    onPrevious,
    onLevelClick,
    nextDisabled,
    previousDisabled,
    hasNextLevel,
    levelControlAriaLabel,
    withNext,
    withPrevious,
    headerControlsOrder,
    // Other props
    yearLabelFormat,
    __staticSelector,
    __stopPropagation,
    size,
    classNames,
    styles,
    unstyled,
    attributes,
    ...others
  } = props;
  const ctx = useDatesContext();
  const stylesApiProps = {
    __staticSelector: __staticSelector || "YearLevel",
    classNames,
    styles,
    unstyled,
    size,
    attributes
  };
  const _nextDisabled = typeof nextDisabled === "boolean" ? nextDisabled : maxDate ? !dayjs(year).endOf("year").isBefore(maxDate) : false;
  const _previousDisabled = typeof previousDisabled === "boolean" ? previousDisabled : minDate ? !dayjs(year).startOf("year").isAfter(minDate) : false;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { "data-year-level": true, size, ref, ...others, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CalendarHeader,
      {
        label: typeof yearLabelFormat === "function" ? yearLabelFormat(year) : dayjs(year).locale(locale || ctx.locale).format(yearLabelFormat),
        __preventFocus,
        __stopPropagation,
        nextIcon,
        previousIcon,
        nextLabel,
        previousLabel,
        onNext,
        onPrevious,
        onLevelClick,
        nextDisabled: _nextDisabled,
        previousDisabled: _previousDisabled,
        hasNextLevel,
        levelControlAriaLabel,
        withNext,
        withPrevious,
        headerControlsOrder,
        ...stylesApiProps
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      MonthsList,
      {
        year,
        locale,
        minDate,
        maxDate,
        monthsListFormat,
        getMonthControlProps,
        __getControlRef,
        __onControlKeyDown,
        __onControlClick,
        __onControlMouseEnter,
        __preventFocus,
        __stopPropagation,
        withCellSpacing,
        ...stylesApiProps
      }
    )
  ] });
});
YearLevel.classes = { ...CalendarHeader.classes, ...MonthsList.classes };
YearLevel.displayName = "@mantine/dates/YearLevel";
const defaultProps$6 = {
  monthLabelFormat: "MMMM YYYY"
};
const MonthLevel = factory((_props, ref) => {
  const props = useProps("MonthLevel", defaultProps$6, _props);
  const {
    // Month settings
    month,
    locale,
    firstDayOfWeek,
    weekdayFormat,
    weekendDays,
    getDayProps,
    excludeDate,
    minDate,
    maxDate,
    renderDay,
    hideOutsideDates,
    hideWeekdays,
    getDayAriaLabel,
    __getDayRef,
    __onDayKeyDown,
    __onDayClick,
    __onDayMouseEnter,
    withCellSpacing,
    highlightToday,
    withWeekNumbers,
    // CalendarHeader settings
    __preventFocus,
    __stopPropagation,
    nextIcon,
    previousIcon,
    nextLabel,
    previousLabel,
    onNext,
    onPrevious,
    onLevelClick,
    nextDisabled,
    previousDisabled,
    hasNextLevel,
    levelControlAriaLabel,
    withNext,
    withPrevious,
    headerControlsOrder,
    // Other props
    monthLabelFormat,
    classNames,
    styles,
    unstyled,
    __staticSelector,
    size,
    static: isStatic,
    attributes,
    ...others
  } = props;
  const ctx = useDatesContext();
  const stylesApiProps = {
    __staticSelector: __staticSelector || "MonthLevel",
    classNames,
    styles,
    unstyled,
    size,
    attributes
  };
  const _nextDisabled = typeof nextDisabled === "boolean" ? nextDisabled : maxDate ? !dayjs(month).endOf("month").isBefore(maxDate) : false;
  const _previousDisabled = typeof previousDisabled === "boolean" ? previousDisabled : minDate ? !dayjs(month).startOf("month").isAfter(minDate) : false;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { "data-month-level": true, size, ref, ...others, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      CalendarHeader,
      {
        label: typeof monthLabelFormat === "function" ? monthLabelFormat(month) : dayjs(month).locale(locale || ctx.locale).format(monthLabelFormat),
        __preventFocus,
        __stopPropagation,
        nextIcon,
        previousIcon,
        nextLabel,
        previousLabel,
        onNext,
        onPrevious,
        onLevelClick,
        nextDisabled: _nextDisabled,
        previousDisabled: _previousDisabled,
        hasNextLevel,
        levelControlAriaLabel,
        withNext,
        withPrevious,
        headerControlsOrder,
        ...stylesApiProps
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Month,
      {
        month,
        locale,
        firstDayOfWeek,
        weekdayFormat,
        weekendDays,
        getDayProps,
        excludeDate,
        minDate,
        maxDate,
        renderDay,
        hideOutsideDates,
        hideWeekdays,
        getDayAriaLabel,
        __getDayRef,
        __onDayKeyDown,
        __onDayClick,
        __onDayMouseEnter,
        __preventFocus,
        __stopPropagation,
        static: isStatic,
        withCellSpacing,
        highlightToday,
        withWeekNumbers,
        ...stylesApiProps
      }
    )
  ] });
});
MonthLevel.classes = { ...Month.classes, ...CalendarHeader.classes };
MonthLevel.displayName = "@mantine/dates/MonthLevel";
var classes$3 = { "levelsGroup": "m_30b26e33" };
const LevelsGroup = factory((_props, ref) => {
  const props = useProps("LevelsGroup", null, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    __staticSelector,
    attributes,
    ...others
  } = props;
  const getStyles = useStyles({
    name: __staticSelector || "LevelsGroup",
    classes: classes$3,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    vars,
    rootSelector: "levelsGroup"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { ref, ...getStyles("levelsGroup"), ...others });
});
LevelsGroup.classes = classes$3;
LevelsGroup.displayName = "@mantine/dates/LevelsGroup";
const defaultProps$5 = {
  numberOfColumns: 1
};
const DecadeLevelGroup = factory((_props, ref) => {
  const props = useProps("DecadeLevelGroup", defaultProps$5, _props);
  const {
    // DecadeLevel settings
    decade,
    locale,
    minDate,
    maxDate,
    yearsListFormat,
    getYearControlProps,
    __onControlClick,
    __onControlMouseEnter,
    withCellSpacing,
    // CalendarHeader settings
    __preventFocus,
    nextIcon,
    previousIcon,
    nextLabel,
    previousLabel,
    onNext,
    onPrevious,
    nextDisabled,
    previousDisabled,
    headerControlsOrder,
    // Other settings
    classNames,
    styles,
    unstyled,
    __staticSelector,
    __stopPropagation,
    numberOfColumns,
    levelControlAriaLabel,
    decadeLabelFormat,
    size,
    vars,
    attributes,
    ...others
  } = props;
  const controlsRef = reactExports.useRef([]);
  const decades = Array(numberOfColumns).fill(0).map((_, decadeIndex) => {
    const currentDecade = dayjs(decade).add(decadeIndex * 10, "years").format("YYYY-MM-DD");
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      DecadeLevel,
      {
        size,
        yearsListFormat,
        decade: currentDecade,
        withNext: decadeIndex === numberOfColumns - 1,
        withPrevious: decadeIndex === 0,
        decadeLabelFormat,
        __onControlClick,
        __onControlMouseEnter,
        __onControlKeyDown: (event, payload) => handleControlKeyDown({
          levelIndex: decadeIndex,
          rowIndex: payload.rowIndex,
          cellIndex: payload.cellIndex,
          event,
          controlsRef
        }),
        __getControlRef: (rowIndex, cellIndex, node) => {
          if (!Array.isArray(controlsRef.current[decadeIndex])) {
            controlsRef.current[decadeIndex] = [];
          }
          if (!Array.isArray(controlsRef.current[decadeIndex][rowIndex])) {
            controlsRef.current[decadeIndex][rowIndex] = [];
          }
          controlsRef.current[decadeIndex][rowIndex][cellIndex] = node;
        },
        levelControlAriaLabel: typeof levelControlAriaLabel === "function" ? levelControlAriaLabel(currentDecade) : levelControlAriaLabel,
        locale,
        minDate,
        maxDate,
        __preventFocus,
        __stopPropagation,
        nextIcon,
        previousIcon,
        nextLabel,
        previousLabel,
        onNext,
        onPrevious,
        nextDisabled,
        previousDisabled,
        getYearControlProps,
        __staticSelector: __staticSelector || "DecadeLevelGroup",
        classNames,
        styles,
        unstyled,
        withCellSpacing,
        headerControlsOrder,
        attributes
      },
      decadeIndex
    );
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    LevelsGroup,
    {
      classNames,
      styles,
      __staticSelector: __staticSelector || "DecadeLevelGroup",
      ref,
      size,
      unstyled,
      attributes,
      ...others,
      children: decades
    }
  );
});
DecadeLevelGroup.classes = { ...LevelsGroup.classes, ...DecadeLevel.classes };
DecadeLevelGroup.displayName = "@mantine/dates/DecadeLevelGroup";
const defaultProps$4 = {
  numberOfColumns: 1
};
const YearLevelGroup = factory((_props, ref) => {
  const props = useProps("YearLevelGroup", defaultProps$4, _props);
  const {
    // YearLevel settings
    year,
    locale,
    minDate,
    maxDate,
    monthsListFormat,
    getMonthControlProps,
    __onControlClick,
    __onControlMouseEnter,
    withCellSpacing,
    // CalendarHeader settings
    __preventFocus,
    nextIcon,
    previousIcon,
    nextLabel,
    previousLabel,
    onNext,
    onPrevious,
    onLevelClick,
    nextDisabled,
    previousDisabled,
    hasNextLevel,
    headerControlsOrder,
    // Other settings
    classNames,
    styles,
    unstyled,
    __staticSelector,
    __stopPropagation,
    numberOfColumns,
    levelControlAriaLabel,
    yearLabelFormat,
    size,
    vars,
    attributes,
    ...others
  } = props;
  const controlsRef = reactExports.useRef([]);
  const years = Array(numberOfColumns).fill(0).map((_, yearIndex) => {
    const currentYear = dayjs(year).add(yearIndex, "years").format("YYYY-MM-DD");
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      YearLevel,
      {
        size,
        monthsListFormat,
        year: currentYear,
        withNext: yearIndex === numberOfColumns - 1,
        withPrevious: yearIndex === 0,
        yearLabelFormat,
        __stopPropagation,
        __onControlClick,
        __onControlMouseEnter,
        __onControlKeyDown: (event, payload) => handleControlKeyDown({
          levelIndex: yearIndex,
          rowIndex: payload.rowIndex,
          cellIndex: payload.cellIndex,
          event,
          controlsRef
        }),
        __getControlRef: (rowIndex, cellIndex, node) => {
          if (!Array.isArray(controlsRef.current[yearIndex])) {
            controlsRef.current[yearIndex] = [];
          }
          if (!Array.isArray(controlsRef.current[yearIndex][rowIndex])) {
            controlsRef.current[yearIndex][rowIndex] = [];
          }
          controlsRef.current[yearIndex][rowIndex][cellIndex] = node;
        },
        levelControlAriaLabel: typeof levelControlAriaLabel === "function" ? levelControlAriaLabel(currentYear) : levelControlAriaLabel,
        locale,
        minDate,
        maxDate,
        __preventFocus,
        nextIcon,
        previousIcon,
        nextLabel,
        previousLabel,
        onNext,
        onPrevious,
        onLevelClick,
        nextDisabled,
        previousDisabled,
        hasNextLevel,
        getMonthControlProps,
        classNames,
        styles,
        unstyled,
        __staticSelector: __staticSelector || "YearLevelGroup",
        withCellSpacing,
        headerControlsOrder,
        attributes
      },
      yearIndex
    );
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    LevelsGroup,
    {
      classNames,
      styles,
      __staticSelector: __staticSelector || "YearLevelGroup",
      ref,
      size,
      unstyled,
      attributes,
      ...others,
      children: years
    }
  );
});
YearLevelGroup.classes = { ...YearLevel.classes, ...LevelsGroup.classes };
YearLevelGroup.displayName = "@mantine/dates/YearLevelGroup";
const defaultProps$3 = {
  numberOfColumns: 1
};
const MonthLevelGroup = factory((_props, ref) => {
  const props = useProps("MonthLevelGroup", defaultProps$3, _props);
  const {
    // Month settings
    month,
    locale,
    firstDayOfWeek,
    weekdayFormat,
    weekendDays,
    getDayProps,
    excludeDate,
    minDate,
    maxDate,
    renderDay,
    hideOutsideDates,
    hideWeekdays,
    getDayAriaLabel,
    __onDayClick,
    __onDayMouseEnter,
    withCellSpacing,
    highlightToday,
    withWeekNumbers,
    // CalendarHeader settings
    __preventFocus,
    nextIcon,
    previousIcon,
    nextLabel,
    previousLabel,
    onNext,
    onPrevious,
    onLevelClick,
    nextDisabled,
    previousDisabled,
    hasNextLevel,
    headerControlsOrder,
    // Other settings
    classNames,
    styles,
    unstyled,
    numberOfColumns,
    levelControlAriaLabel,
    monthLabelFormat,
    __staticSelector,
    __stopPropagation,
    size,
    static: isStatic,
    vars,
    attributes,
    ...others
  } = props;
  const daysRefs = reactExports.useRef([]);
  const months = Array(numberOfColumns).fill(0).map((_, monthIndex) => {
    const currentMonth = dayjs(month).add(monthIndex, "months").format("YYYY-MM-DD");
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      MonthLevel,
      {
        month: currentMonth,
        withNext: monthIndex === numberOfColumns - 1,
        withPrevious: monthIndex === 0,
        monthLabelFormat,
        __stopPropagation,
        __onDayClick,
        __onDayMouseEnter,
        __onDayKeyDown: (event, payload) => handleControlKeyDown({
          levelIndex: monthIndex,
          rowIndex: payload.rowIndex,
          cellIndex: payload.cellIndex,
          event,
          controlsRef: daysRefs
        }),
        __getDayRef: (rowIndex, cellIndex, node) => {
          if (!Array.isArray(daysRefs.current[monthIndex])) {
            daysRefs.current[monthIndex] = [];
          }
          if (!Array.isArray(daysRefs.current[monthIndex][rowIndex])) {
            daysRefs.current[monthIndex][rowIndex] = [];
          }
          daysRefs.current[monthIndex][rowIndex][cellIndex] = node;
        },
        levelControlAriaLabel: typeof levelControlAriaLabel === "function" ? levelControlAriaLabel(currentMonth) : levelControlAriaLabel,
        locale,
        firstDayOfWeek,
        weekdayFormat,
        weekendDays,
        getDayProps,
        excludeDate,
        minDate,
        maxDate,
        renderDay,
        hideOutsideDates,
        hideWeekdays,
        getDayAriaLabel,
        __preventFocus,
        nextIcon,
        previousIcon,
        nextLabel,
        previousLabel,
        onNext,
        onPrevious,
        onLevelClick,
        nextDisabled,
        previousDisabled,
        hasNextLevel,
        classNames,
        styles,
        unstyled,
        __staticSelector: __staticSelector || "MonthLevelGroup",
        size,
        static: isStatic,
        withCellSpacing,
        highlightToday,
        withWeekNumbers,
        headerControlsOrder,
        attributes
      },
      monthIndex
    );
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    LevelsGroup,
    {
      classNames,
      styles,
      __staticSelector: __staticSelector || "MonthLevelGroup",
      ref,
      size,
      attributes,
      ...others,
      children: months
    }
  );
});
MonthLevelGroup.classes = { ...LevelsGroup.classes, ...MonthLevel.classes };
MonthLevelGroup.displayName = "@mantine/dates/MonthLevelGroup";
var classes$2 = { "input": "m_6fa5e2aa" };
const PickerInputBase = factory((_props, ref) => {
  const {
    inputProps,
    wrapperProps,
    placeholder,
    classNames,
    styles,
    unstyled,
    popoverProps,
    modalProps,
    dropdownType,
    children,
    formattedValue,
    dropdownHandlers,
    dropdownOpened,
    onClick,
    clearable,
    onClear,
    clearButtonProps,
    rightSection,
    shouldClear,
    readOnly,
    disabled,
    value,
    name,
    form,
    type,
    onDropdownClose,
    withTime,
    ...others
  } = useInputProps("PickerInputBase", { size: "sm" }, _props);
  const clearButton = /* @__PURE__ */ jsxRuntimeExports.jsx(Input.ClearButton, { onClick: onClear, unstyled, ...clearButtonProps });
  const handleClose = () => {
    const isInvalidRangeValue = type === "range" && Array.isArray(value) && value[0] && !value[1];
    if (isInvalidRangeValue) {
      onClear();
    }
    dropdownHandlers.close();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    dropdownType === "modal" && !readOnly && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        opened: dropdownOpened,
        onClose: handleClose,
        withCloseButton: false,
        size: "auto",
        "data-dates-modal": true,
        unstyled,
        ...modalProps,
        children
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input.Wrapper, { ...wrapperProps, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Popover,
      {
        position: "bottom-start",
        opened: dropdownOpened,
        trapFocus: true,
        returnFocus: false,
        unstyled,
        onClose: onDropdownClose,
        ...popoverProps,
        disabled: popoverProps?.disabled || dropdownType === "modal" || readOnly,
        onChange: (_opened) => {
          if (!_opened) {
            popoverProps?.onClose?.();
            handleClose();
          }
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Popover.Target, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              "data-dates-input": true,
              "data-read-only": readOnly || void 0,
              disabled,
              component: "button",
              type: "button",
              multiline: true,
              onClick: (event) => {
                onClick?.(event);
                dropdownHandlers.toggle();
              },
              __clearSection: clearButton,
              __clearable: clearable && shouldClear && !readOnly && !disabled,
              rightSection,
              ...inputProps,
              ref,
              classNames: { ...classNames, input: clsx(classes$2.input, classNames?.input) },
              ...others,
              children: formattedValue || /* @__PURE__ */ jsxRuntimeExports.jsx(
                Input.Placeholder,
                {
                  error: inputProps.error,
                  unstyled,
                  classNames,
                  styles,
                  __staticSelector: inputProps.__staticSelector,
                  children: placeholder
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Popover.Dropdown, { "data-dates-dropdown": true, children })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(HiddenDatesInput, { value, name, form, type, withTime })
  ] });
});
PickerInputBase.classes = classes$2;
PickerInputBase.displayName = "@mantine/dates/PickerInputBase";
const getEmptyValue = (type) => type === "range" ? [null, null] : type === "multiple" ? [] : null;
const convertDatesValue = (value, withTime) => {
  const converter = withTime ? toDateTimeString : toDateString;
  return Array.isArray(value) ? value.map(converter) : converter(value);
};
function useUncontrolledDates({
  type,
  value,
  defaultValue,
  onChange,
  withTime = false
}) {
  const storedType = reactExports.useRef(type);
  const [_value, _setValue, controlled] = useUncontrolled({
    value: convertDatesValue(value, withTime),
    defaultValue: convertDatesValue(defaultValue, withTime),
    finalValue: getEmptyValue(type),
    onChange
  });
  let _finalValue = _value;
  if (storedType.current !== type) {
    storedType.current = type;
    if (value === void 0) {
      _finalValue = defaultValue !== void 0 ? defaultValue : getEmptyValue(type);
      _setValue(_finalValue);
    }
  }
  return [_finalValue, _setValue, controlled];
}
function levelToNumber(level, fallback) {
  if (!level) {
    return fallback || 0;
  }
  return level === "month" ? 0 : level === "year" ? 1 : 2;
}
function levelNumberToLevel(levelNumber) {
  return levelNumber === 0 ? "month" : levelNumber === 1 ? "year" : "decade";
}
function clampLevel(level, minLevel, maxLevel) {
  return levelNumberToLevel(
    clamp(
      levelToNumber(level, 0),
      levelToNumber(minLevel, 0),
      levelToNumber(maxLevel, 2)
    )
  );
}
const defaultProps$2 = {
  maxLevel: "decade",
  minLevel: "month",
  __updateDateOnYearSelect: true,
  __updateDateOnMonthSelect: true,
  enableKeyboardNavigation: true
};
const Calendar = factory((_props, ref) => {
  const props = useProps("Calendar", defaultProps$2, _props);
  const {
    // CalendarLevel props
    vars,
    maxLevel,
    minLevel,
    defaultLevel,
    level,
    onLevelChange,
    date,
    defaultDate,
    onDateChange,
    numberOfColumns,
    columnsToScroll,
    ariaLabels,
    nextLabel,
    previousLabel,
    onYearSelect,
    onMonthSelect,
    onYearMouseEnter,
    onMonthMouseEnter,
    headerControlsOrder,
    __updateDateOnYearSelect,
    __updateDateOnMonthSelect,
    __setDateRef,
    __setLevelRef,
    // MonthLevelGroup props
    firstDayOfWeek,
    weekdayFormat,
    weekendDays,
    getDayProps,
    excludeDate,
    renderDay,
    hideOutsideDates,
    hideWeekdays,
    getDayAriaLabel,
    monthLabelFormat,
    nextIcon,
    previousIcon,
    __onDayClick,
    __onDayMouseEnter,
    withCellSpacing,
    highlightToday,
    withWeekNumbers,
    // YearLevelGroup props
    monthsListFormat,
    getMonthControlProps,
    yearLabelFormat,
    // DecadeLevelGroup props
    yearsListFormat,
    getYearControlProps,
    decadeLabelFormat,
    // Other props
    classNames,
    styles,
    unstyled,
    minDate,
    maxDate,
    locale,
    __staticSelector,
    size,
    __preventFocus,
    __stopPropagation,
    onNextDecade,
    onPreviousDecade,
    onNextYear,
    onPreviousYear,
    onNextMonth,
    onPreviousMonth,
    static: isStatic,
    enableKeyboardNavigation,
    attributes,
    ...others
  } = props;
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    classNames,
    styles,
    props
  });
  const [_level, setLevel] = useUncontrolled({
    value: level ? clampLevel(level, minLevel, maxLevel) : void 0,
    defaultValue: defaultLevel ? clampLevel(defaultLevel, minLevel, maxLevel) : void 0,
    finalValue: clampLevel(void 0, minLevel, maxLevel),
    onChange: onLevelChange
  });
  const [_date, setDate] = useUncontrolledDates({
    type: "default",
    value: toDateString(date),
    defaultValue: toDateString(defaultDate),
    onChange: onDateChange
  });
  reactExports.useImperativeHandle(__setDateRef, () => (date2) => {
    setDate(date2);
  });
  reactExports.useImperativeHandle(__setLevelRef, () => (level2) => {
    setLevel(level2);
  });
  const stylesApiProps = {
    __staticSelector: __staticSelector || "Calendar",
    styles: resolvedStyles,
    classNames: resolvedClassNames,
    unstyled,
    size,
    attributes
  };
  const _columnsToScroll = columnsToScroll || numberOfColumns || 1;
  const now = /* @__PURE__ */ new Date();
  const fallbackDate = minDate && dayjs(now).isAfter(minDate) ? minDate : dayjs(now).format("YYYY-MM-DD");
  const currentDate = _date || fallbackDate;
  const handleNextMonth = () => {
    const nextDate = dayjs(currentDate).add(_columnsToScroll, "month").format("YYYY-MM-DD");
    onNextMonth?.(nextDate);
    setDate(nextDate);
  };
  const handlePreviousMonth = () => {
    const nextDate = dayjs(currentDate).subtract(_columnsToScroll, "month").format("YYYY-MM-DD");
    onPreviousMonth?.(nextDate);
    setDate(nextDate);
  };
  const handleNextYear = () => {
    const nextDate = dayjs(currentDate).add(_columnsToScroll, "year").format("YYYY-MM-DD");
    onNextYear?.(nextDate);
    setDate(nextDate);
  };
  const handlePreviousYear = () => {
    const nextDate = dayjs(currentDate).subtract(_columnsToScroll, "year").format("YYYY-MM-DD");
    onPreviousYear?.(nextDate);
    setDate(nextDate);
  };
  const handleNextDecade = () => {
    const nextDate = dayjs(currentDate).add(10 * _columnsToScroll, "year").format("YYYY-MM-DD");
    onNextDecade?.(nextDate);
    setDate(nextDate);
  };
  const handlePreviousDecade = () => {
    const nextDate = dayjs(currentDate).subtract(10 * _columnsToScroll, "year").format("YYYY-MM-DD");
    onPreviousDecade?.(nextDate);
    setDate(nextDate);
  };
  const calendarRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!enableKeyboardNavigation || isStatic) {
      return;
    }
    const handleKeyDown = (event) => {
      if (!calendarRef.current?.contains(document.activeElement)) {
        return;
      }
      const isCtrlOrCmd = event.ctrlKey || event.metaKey;
      const isShift = event.shiftKey;
      switch (event.key) {
        case "ArrowUp":
          if (isCtrlOrCmd && isShift) {
            event.preventDefault();
            handlePreviousDecade();
          } else if (isCtrlOrCmd) {
            event.preventDefault();
            handlePreviousYear();
          }
          break;
        case "ArrowDown":
          if (isCtrlOrCmd && isShift) {
            event.preventDefault();
            handleNextDecade();
          } else if (isCtrlOrCmd) {
            event.preventDefault();
            handleNextYear();
          }
          break;
        case "y":
        case "Y":
          if (_level === "month") {
            event.preventDefault();
            setLevel("year");
          }
          break;
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    enableKeyboardNavigation,
    isStatic,
    _level,
    handleNextYear,
    handlePreviousYear,
    handleNextDecade,
    handlePreviousDecade
  ]);
  const mergedRef = (node) => {
    calendarRef.current = node;
    if (typeof ref === "function") {
      ref(node);
    } else if (ref) {
      ref.current = node;
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { ref: mergedRef, size, "data-calendar": true, ...others, children: [
    _level === "month" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      MonthLevelGroup,
      {
        month: currentDate,
        minDate,
        maxDate,
        firstDayOfWeek,
        weekdayFormat,
        weekendDays,
        getDayProps,
        excludeDate,
        renderDay,
        hideOutsideDates,
        hideWeekdays,
        getDayAriaLabel,
        onNext: handleNextMonth,
        onPrevious: handlePreviousMonth,
        hasNextLevel: maxLevel !== "month",
        onLevelClick: () => setLevel("year"),
        numberOfColumns,
        locale,
        levelControlAriaLabel: ariaLabels?.monthLevelControl,
        nextLabel: ariaLabels?.nextMonth ?? nextLabel,
        nextIcon,
        previousLabel: ariaLabels?.previousMonth ?? previousLabel,
        previousIcon,
        monthLabelFormat,
        __onDayClick,
        __onDayMouseEnter,
        __preventFocus,
        __stopPropagation,
        static: isStatic,
        withCellSpacing,
        highlightToday,
        withWeekNumbers,
        headerControlsOrder,
        ...stylesApiProps
      }
    ),
    _level === "year" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      YearLevelGroup,
      {
        year: currentDate,
        numberOfColumns,
        minDate,
        maxDate,
        monthsListFormat,
        getMonthControlProps,
        locale,
        onNext: handleNextYear,
        onPrevious: handlePreviousYear,
        hasNextLevel: maxLevel !== "month" && maxLevel !== "year",
        onLevelClick: () => setLevel("decade"),
        levelControlAriaLabel: ariaLabels?.yearLevelControl,
        nextLabel: ariaLabels?.nextYear ?? nextLabel,
        nextIcon,
        previousLabel: ariaLabels?.previousYear ?? previousLabel,
        previousIcon,
        yearLabelFormat,
        __onControlMouseEnter: onMonthMouseEnter,
        __onControlClick: (_event, payload) => {
          __updateDateOnMonthSelect && setDate(payload);
          setLevel(clampLevel("month", minLevel, maxLevel));
          onMonthSelect?.(payload);
        },
        __preventFocus,
        __stopPropagation,
        withCellSpacing,
        headerControlsOrder,
        ...stylesApiProps
      }
    ),
    _level === "decade" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      DecadeLevelGroup,
      {
        decade: currentDate,
        minDate,
        maxDate,
        yearsListFormat,
        getYearControlProps,
        locale,
        onNext: handleNextDecade,
        onPrevious: handlePreviousDecade,
        numberOfColumns,
        nextLabel: ariaLabels?.nextDecade ?? nextLabel,
        nextIcon,
        previousLabel: ariaLabels?.previousDecade ?? previousLabel,
        previousIcon,
        decadeLabelFormat,
        __onControlMouseEnter: onYearMouseEnter,
        __onControlClick: (_event, payload) => {
          __updateDateOnYearSelect && setDate(payload);
          setLevel(clampLevel("year", minLevel, maxLevel));
          onYearSelect?.(payload);
        },
        __preventFocus,
        __stopPropagation,
        withCellSpacing,
        headerControlsOrder,
        ...stylesApiProps
      }
    )
  ] });
});
Calendar.classes = {
  ...DecadeLevelGroup.classes,
  ...YearLevelGroup.classes,
  ...MonthLevelGroup.classes
};
Calendar.displayName = "@mantine/dates/Calendar";
function pickCalendarProps(props) {
  const {
    maxLevel,
    minLevel,
    defaultLevel,
    level,
    onLevelChange,
    nextIcon,
    previousIcon,
    date,
    defaultDate,
    onDateChange,
    numberOfColumns,
    columnsToScroll,
    ariaLabels,
    nextLabel,
    previousLabel,
    onYearSelect,
    onMonthSelect,
    onYearMouseEnter,
    onMonthMouseEnter,
    onNextMonth,
    onPreviousMonth,
    onNextYear,
    onPreviousYear,
    onNextDecade,
    onPreviousDecade,
    withCellSpacing,
    highlightToday,
    __updateDateOnYearSelect,
    __updateDateOnMonthSelect,
    __setDateRef,
    __setLevelRef,
    withWeekNumbers,
    headerControlsOrder,
    // MonthLevelGroup props
    firstDayOfWeek,
    weekdayFormat,
    weekendDays,
    getDayProps,
    excludeDate,
    renderDay,
    hideOutsideDates,
    hideWeekdays,
    getDayAriaLabel,
    monthLabelFormat,
    // YearLevelGroup props
    monthsListFormat,
    getMonthControlProps,
    yearLabelFormat,
    // DecadeLevelGroup props
    yearsListFormat,
    getYearControlProps,
    decadeLabelFormat,
    // External picker props
    allowSingleDateInRange,
    allowDeselect,
    // Other props
    minDate,
    maxDate,
    locale,
    ...others
  } = props;
  return {
    calendarProps: {
      maxLevel,
      minLevel,
      defaultLevel,
      level,
      onLevelChange,
      nextIcon,
      previousIcon,
      date,
      defaultDate,
      onDateChange,
      numberOfColumns,
      columnsToScroll,
      ariaLabels,
      nextLabel,
      previousLabel,
      onYearSelect,
      onMonthSelect,
      onYearMouseEnter,
      onMonthMouseEnter,
      onNextMonth,
      onPreviousMonth,
      onNextYear,
      onPreviousYear,
      onNextDecade,
      onPreviousDecade,
      withCellSpacing,
      highlightToday,
      __updateDateOnYearSelect,
      __updateDateOnMonthSelect,
      __setDateRef,
      withWeekNumbers,
      headerControlsOrder,
      // MonthLevelGroup props
      firstDayOfWeek,
      weekdayFormat,
      weekendDays,
      getDayProps,
      excludeDate,
      renderDay,
      hideOutsideDates,
      hideWeekdays,
      getDayAriaLabel,
      monthLabelFormat,
      // YearLevelGroup props
      monthsListFormat,
      getMonthControlProps,
      yearLabelFormat,
      // DecadeLevelGroup props
      yearsListFormat,
      getYearControlProps,
      decadeLabelFormat,
      // External picker props
      allowSingleDateInRange,
      allowDeselect,
      // Other props
      minDate,
      maxDate,
      locale
    },
    others
  };
}
function isInRange(date, range) {
  const _range = [...range].sort((a, b) => dayjs(a).isAfter(dayjs(b)) ? 1 : -1);
  return dayjs(_range[0]).startOf("day").subtract(1, "ms").isBefore(date) && dayjs(_range[1]).endOf("day").add(1, "ms").isAfter(date);
}
function useDatesState({
  type,
  level,
  value,
  defaultValue,
  onChange,
  allowSingleDateInRange,
  allowDeselect,
  onMouseLeave
}) {
  const [_value, setValue] = useUncontrolledDates({
    type,
    value,
    defaultValue,
    onChange
  });
  const [pickedDate, setPickedDate] = reactExports.useState(
    type === "range" ? _value[0] && !_value[1] ? _value[0] : null : null
  );
  const [hoveredDate, setHoveredDate] = reactExports.useState(null);
  const onDateChange = (date) => {
    if (type === "range") {
      if (pickedDate && !_value[1]) {
        if (dayjs(date).isSame(pickedDate, level) && !allowSingleDateInRange) {
          setPickedDate(null);
          setHoveredDate(null);
          setValue([null, null]);
          return;
        }
        const result = [date, pickedDate];
        result.sort((a, b) => dayjs(a).isAfter(dayjs(b)) ? 1 : -1);
        setValue(result);
        setHoveredDate(null);
        setPickedDate(null);
        return;
      }
      if (_value[0] && !_value[1] && dayjs(date).isSame(_value[0], level) && !allowSingleDateInRange) {
        setPickedDate(null);
        setHoveredDate(null);
        setValue([null, null]);
        return;
      }
      setValue([date, null]);
      setHoveredDate(null);
      setPickedDate(date);
      return;
    }
    if (type === "multiple") {
      if (_value.some((selected) => dayjs(selected).isSame(date, level))) {
        setValue(_value.filter((selected) => !dayjs(selected).isSame(date, level)));
      } else {
        setValue([..._value, date]);
      }
      return;
    }
    if (_value && allowDeselect && dayjs(date).isSame(_value, level)) {
      setValue(null);
    } else {
      setValue(date);
    }
  };
  const isDateInRange = (date) => {
    if (pickedDate && hoveredDate) {
      return isInRange(date, [hoveredDate, pickedDate]);
    }
    if (_value[0] && _value[1]) {
      return isInRange(date, _value);
    }
    return false;
  };
  const onRootMouseLeave = type === "range" ? (event) => {
    onMouseLeave?.(event);
    setHoveredDate(null);
  } : onMouseLeave;
  const isFirstInRange = (date) => {
    if (!_value[0]) {
      return false;
    }
    if (dayjs(date).isSame(_value[0], level)) {
      return !(hoveredDate && dayjs(hoveredDate).isBefore(_value[0]));
    }
    return false;
  };
  const isLastInRange = (date) => {
    if (_value[1]) {
      return dayjs(date).isSame(_value[1], level);
    }
    if (!_value[0] || !hoveredDate) {
      return false;
    }
    return dayjs(hoveredDate).isBefore(_value[0]) && dayjs(date).isSame(_value[0], level);
  };
  const getControlProps = (date) => {
    if (type === "range") {
      return {
        selected: _value.some(
          (selection) => selection && dayjs(selection).isSame(date, level)
        ),
        inRange: isDateInRange(date),
        firstInRange: isFirstInRange(date),
        lastInRange: isLastInRange(date),
        "data-autofocus": !!_value[0] && dayjs(_value[0]).isSame(date, level) || void 0
      };
    }
    if (type === "multiple") {
      return {
        selected: _value.some(
          (selection) => selection && dayjs(selection).isSame(date, level)
        ),
        "data-autofocus": !!_value[0] && dayjs(_value[0]).isSame(date, level) || void 0
      };
    }
    const selected = dayjs(_value).isSame(date, level);
    return { selected, "data-autofocus": selected || void 0 };
  };
  const onHoveredDateChange = type === "range" && pickedDate ? setHoveredDate : () => {
  };
  reactExports.useEffect(() => {
    if (type !== "range") {
      return;
    }
    if (_value[0] && !_value[1]) {
      setPickedDate(_value[0]);
    } else {
      const isNeitherSelected = _value[0] == null && _value[1] == null;
      const isBothSelected = _value[0] != null && _value[1] != null;
      if (isNeitherSelected || isBothSelected) {
        setPickedDate(null);
        setHoveredDate(null);
      }
    }
  }, [_value]);
  return {
    onDateChange,
    onRootMouseLeave,
    onHoveredDateChange,
    getControlProps,
    _value,
    setValue
  };
}
var classes$1 = { "datePickerRoot": "m_765a40cf", "presetsList": "m_d6a681e1", "presetButton": "m_acd30b22" };
const varsResolver = createVarsResolver((_, { size }) => ({
  datePickerRoot: {
    "--preset-font-size": getFontSize(size)
  }
}));
const defaultProps$1 = {
  type: "default",
  defaultLevel: "month",
  numberOfColumns: 1,
  size: "sm"
};
const DatePicker = factory((_props, ref) => {
  const props = useProps("DatePicker", defaultProps$1, _props);
  const {
    allowDeselect,
    allowSingleDateInRange,
    value,
    defaultValue,
    onChange,
    onMouseLeave,
    classNames,
    styles,
    __staticSelector,
    __onDayClick,
    __onDayMouseEnter,
    __onPresetSelect,
    __stopPropagation,
    presets,
    className,
    style,
    unstyled,
    size,
    vars,
    attributes,
    ...rest
  } = props;
  const { calendarProps, others } = pickCalendarProps(rest);
  const setDateRef = reactExports.useRef(null);
  const setLevelRef = reactExports.useRef(null);
  const getStyles = useStyles({
    name: __staticSelector || "DatePicker",
    classes: classes$1,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    attributes,
    rootSelector: presets ? "datePickerRoot" : void 0,
    varsResolver,
    vars
  });
  const { onDateChange, onRootMouseLeave, onHoveredDateChange, getControlProps, _value, setValue } = useDatesState({
    type: others.type,
    level: "day",
    allowDeselect,
    allowSingleDateInRange,
    value,
    defaultValue,
    onChange,
    onMouseLeave
  });
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    classNames,
    styles,
    props
  });
  const calendar = /* @__PURE__ */ jsxRuntimeExports.jsx(
    Calendar,
    {
      ref,
      classNames: resolvedClassNames,
      styles: resolvedStyles,
      __staticSelector: __staticSelector || "DatePicker",
      onMouseLeave: onRootMouseLeave,
      size,
      ...calendarProps,
      ...!presets ? others : {},
      __stopPropagation,
      __setDateRef: setDateRef,
      __setLevelRef: setLevelRef,
      minLevel: calendarProps.minLevel || "month",
      __onDayMouseEnter: (_event, date) => {
        onHoveredDateChange(date);
        __onDayMouseEnter?.(_event, date);
      },
      __onDayClick: (_event, date) => {
        onDateChange(date);
        __onDayClick?.(_event, date);
      },
      getDayProps: (date) => ({
        ...getControlProps(date),
        ...calendarProps.getDayProps?.(date)
      }),
      getMonthControlProps: (date) => ({
        selected: typeof _value === "string" ? isSameMonth(date, _value) : false,
        ...calendarProps.getMonthControlProps?.(date)
      }),
      getYearControlProps: (date) => ({
        selected: typeof _value === "string" ? dayjs(date).isSame(_value, "year") : false,
        ...calendarProps.getYearControlProps?.(date)
      }),
      hideOutsideDates: calendarProps.hideOutsideDates ?? calendarProps.numberOfColumns !== 1,
      ...!presets ? { className, style, attributes } : {}
    }
  );
  if (!presets) {
    return calendar;
  }
  const handlePresetSelect = (val) => {
    const _val = Array.isArray(val) ? val[0] : val;
    if (_val !== void 0) {
      setDateRef.current?.(_val);
      setLevelRef.current?.("month");
      __onPresetSelect ? __onPresetSelect(_val) : setValue(val);
    }
  };
  const presetButtons = presets.map((preset, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    UnstyledButton,
    {
      ...getStyles("presetButton"),
      onClick: () => handlePresetSelect(preset.value),
      onMouseDown: (event) => event.preventDefault(),
      "data-mantine-stop-propagation": __stopPropagation || void 0,
      children: preset.label
    },
    index
  ));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Box, { ...getStyles("datePickerRoot"), size, ...others, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ...getStyles("presetsList"), children: presetButtons }),
    calendar
  ] });
});
DatePicker.classes = Calendar.classes;
DatePicker.displayName = "@mantine/dates/DatePicker";
var classes = { "timeWrapper": "m_208d2562", "timeInput": "m_62ee059" };
function getMinTime({ minDate, value }) {
  const minTime = minDate ? dayjs(minDate).format("HH:mm:ss") : null;
  return value && minDate && value === minDate ? minTime != null ? minTime : void 0 : void 0;
}
function getMaxTime({ maxDate, value }) {
  const maxTime = maxDate ? dayjs(maxDate).format("HH:mm:ss") : null;
  return value && maxDate && value === maxDate ? maxTime != null ? maxTime : void 0 : void 0;
}
const defaultProps = {
  dropdownType: "popover",
  size: "sm"
};
const DateTimePicker = factory((_props, ref) => {
  const props = useProps("DateTimePicker", defaultProps, _props);
  const {
    value,
    defaultValue,
    onChange,
    valueFormat,
    locale,
    classNames,
    styles,
    unstyled,
    timePickerProps,
    submitButtonProps,
    withSeconds,
    level,
    defaultLevel,
    size,
    variant,
    dropdownType,
    vars,
    minDate,
    maxDate,
    defaultDate,
    defaultTimeValue,
    presets,
    attributes,
    onDropdownClose,
    ...rest
  } = props;
  const getStyles = useStyles({
    name: "DateTimePicker",
    classes,
    props,
    classNames,
    styles,
    unstyled,
    attributes,
    vars
  });
  const { resolvedClassNames, resolvedStyles } = useResolvedStylesApi({
    classNames,
    styles,
    props
  });
  const _valueFormat = valueFormat || (withSeconds ? "DD/MM/YYYY HH:mm:ss" : "DD/MM/YYYY HH:mm");
  const timePickerRef = reactExports.useRef(null);
  const timePickerRefMerged = useMergedRef(timePickerRef, timePickerProps?.hoursRef);
  const {
    calendarProps: { allowSingleDateInRange, ...calendarProps },
    others
  } = pickCalendarProps(rest);
  const ctx = useDatesContext();
  const [_value, setValue] = useUncontrolledDates({
    type: "default",
    value,
    defaultValue,
    onChange,
    withTime: true
  });
  const _defaultDate = defaultDate || _value;
  const formatTime = (dateValue) => dateValue ? dayjs(dateValue).format(withSeconds ? "HH:mm:ss" : "HH:mm") : "";
  const [timeValue, setTimeValue] = reactExports.useState(defaultTimeValue || formatTime(_value));
  const [currentLevel, setCurrentLevel] = reactExports.useState(level || defaultLevel || "month");
  const [dropdownOpened, dropdownHandlers] = useDisclosure(false);
  const formattedValue = _value ? dayjs(_value).locale(ctx.getLocale(locale)).format(_valueFormat) : "";
  const handleTimeChange = (timeString) => {
    timePickerProps?.onChange?.(timeString);
    setTimeValue(timeString);
    if (timeString) {
      setValue(assignTime(_value, timeString));
    }
  };
  const handleDateChange = (date) => {
    if (date) {
      setValue(assignTime(clampDate(minDate, maxDate, date), timeValue || defaultTimeValue || ""));
    }
    timePickerRef.current?.focus();
  };
  const handleTimeInputKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dropdownHandlers.close();
    }
  };
  useDidUpdate(() => {
    if (!dropdownOpened) {
      setTimeValue(formatTime(_value));
    }
  }, [_value, dropdownOpened]);
  useDidUpdate(() => {
    if (dropdownOpened) {
      setCurrentLevel("month");
    }
  }, [dropdownOpened]);
  const __stopPropagation = dropdownType === "popover";
  const handleDropdownClose = () => {
    const clamped = clampDate(minDate, maxDate, _value);
    if (_value && _value !== clamped) {
      setValue(clampDate(minDate, maxDate, _value));
    }
    onDropdownClose?.();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    PickerInputBase,
    {
      formattedValue,
      dropdownOpened: !rest.disabled ? dropdownOpened : false,
      dropdownHandlers,
      classNames: resolvedClassNames,
      styles: resolvedStyles,
      unstyled,
      ref,
      onClear: () => setValue(null),
      shouldClear: !!_value,
      value: _value,
      size,
      variant,
      dropdownType,
      ...others,
      type: "default",
      __staticSelector: "DateTimePicker",
      onDropdownClose: handleDropdownClose,
      withTime: true,
      attributes,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          DatePicker,
          {
            ...calendarProps,
            maxDate,
            minDate,
            size,
            variant,
            type: "default",
            value: _value,
            defaultDate: _defaultDate || getDefaultClampedDate({ maxDate, minDate }),
            onChange: handleDateChange,
            locale,
            classNames: resolvedClassNames,
            styles: resolvedStyles,
            unstyled,
            __staticSelector: "DateTimePicker",
            __stopPropagation,
            level,
            defaultLevel,
            onLevelChange: (_level) => {
              setCurrentLevel(_level);
              calendarProps.onLevelChange?.(_level);
            },
            presets,
            __onPresetSelect: (val) => {
              setValue(val);
              val && setTimeValue(formatTime(val));
            },
            attributes
          }
        ),
        currentLevel === "month" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ...getStyles("timeWrapper"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            TimePicker,
            {
              value: timeValue,
              withSeconds,
              unstyled,
              min: getMinTime({ minDate, value: _value }),
              max: getMaxTime({ maxDate, value: _value }),
              ...timePickerProps,
              ...getStyles("timeInput", {
                className: timePickerProps?.className,
                style: timePickerProps?.style
              }),
              onChange: handleTimeChange,
              onKeyDown: handleTimeInputKeyDown,
              size,
              "data-mantine-stop-propagation": __stopPropagation || void 0,
              hoursRef: timePickerRefMerged,
              attributes
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActionIcon,
            {
              variant: "default",
              size: `input-${size || "sm"}`,
              ...getStyles("submitButton", {
                className: submitButtonProps?.className,
                style: submitButtonProps?.style
              }),
              unstyled,
              "data-mantine-stop-propagation": __stopPropagation || void 0,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(CheckIcon, { size: "30%" }),
              ...submitButtonProps,
              onClick: (event) => {
                submitButtonProps?.onClick?.(event);
                dropdownHandlers.close();
                handleDropdownClose();
              }
            }
          )
        ] })
      ]
    }
  );
});
DateTimePicker.classes = { ...classes, ...PickerInputBase.classes, ...DatePicker.classes };
DateTimePicker.displayName = "@mantine/dates/DateTimePicker";
export {
  DateTimePicker as D
};
