import { r as reactExports } from "./react.mjs";
var defaultAttributes = {
  outline: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  },
  filled: {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "currentColor",
    stroke: "none"
  }
};
const createReactComponent = (type, iconName, iconNamePascal, iconNode) => {
  const Component = reactExports.forwardRef(
    ({ color = "currentColor", size = 24, stroke = 2, title, className, children, ...rest }, ref) => reactExports.createElement(
      "svg",
      {
        ref,
        ...defaultAttributes[type],
        width: size,
        height: size,
        className: [`tabler-icon`, `tabler-icon-${iconName}`, className].join(" "),
        ...{
          strokeWidth: stroke,
          stroke: color
        },
        ...rest
      },
      [
        title && reactExports.createElement("title", { key: "svg-title" }, title),
        ...iconNode.map(([tag, attrs]) => reactExports.createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    )
  );
  Component.displayName = `${iconNamePascal}`;
  return Component;
};
const __iconNode$1v = [["path", { "d": "M3 12h4l3 8l4 -16l3 8h4", "key": "svg-0" }]];
const IconActivity = createReactComponent("outline", "activity", "Activity", __iconNode$1v);
const __iconNode$1u = [["path", { "d": "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0", "key": "svg-0" }], ["path", { "d": "M12 8v4", "key": "svg-1" }], ["path", { "d": "M12 16h.01", "key": "svg-2" }]];
const IconAlertCircle = createReactComponent("outline", "alert-circle", "AlertCircle", __iconNode$1u);
const __iconNode$1t = [["path", { "d": "M12 9v4", "key": "svg-0" }], ["path", { "d": "M10.363 3.591l-8.106 13.534a1.914 1.914 0 0 0 1.636 2.871h16.214a1.914 1.914 0 0 0 1.636 -2.87l-8.106 -13.536a1.914 1.914 0 0 0 -3.274 0", "key": "svg-1" }], ["path", { "d": "M12 16h.01", "key": "svg-2" }]];
const IconAlertTriangle = createReactComponent("outline", "alert-triangle", "AlertTriangle", __iconNode$1t);
const __iconNode$1s = [["path", { "d": "M3 6a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2", "key": "svg-0" }], ["path", { "d": "M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10", "key": "svg-1" }], ["path", { "d": "M10 12l4 0", "key": "svg-2" }]];
const IconArchive = createReactComponent("outline", "archive", "Archive", __iconNode$1s);
const __iconNode$1r = [["path", { "d": "M5 12l14 0", "key": "svg-0" }], ["path", { "d": "M5 12l6 6", "key": "svg-1" }], ["path", { "d": "M5 12l6 -6", "key": "svg-2" }]];
const IconArrowLeft = createReactComponent("outline", "arrow-left", "ArrowLeft", __iconNode$1r);
const __iconNode$1q = [["path", { "d": "M5 12l14 0", "key": "svg-0" }], ["path", { "d": "M13 18l6 -6", "key": "svg-1" }], ["path", { "d": "M13 6l6 6", "key": "svg-2" }]];
const IconArrowRight = createReactComponent("outline", "arrow-right", "ArrowRight", __iconNode$1q);
const __iconNode$1p = [["path", { "d": "M6 9a6 6 0 1 0 12 0a6 6 0 1 0 -12 0", "key": "svg-0" }], ["path", { "d": "M12 15l3.4 5.89l1.598 -3.233l3.598 .232l-3.4 -5.889", "key": "svg-1" }], ["path", { "d": "M6.802 12l-3.4 5.89l3.598 -.233l1.598 3.232l3.4 -5.889", "key": "svg-2" }]];
const IconAward = createReactComponent("outline", "award", "Award", __iconNode$1p);
const __iconNode$1o = [["path", { "d": "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "key": "svg-0" }], ["path", { "d": "M5.7 5.7l12.6 12.6", "key": "svg-1" }]];
const IconBan = createReactComponent("outline", "ban", "Ban", __iconNode$1o);
const __iconNode$1n = [["path", { "d": "M10 5a2 2 0 1 1 4 0a7 7 0 0 1 4 6v3a4 4 0 0 0 2 3h-16a4 4 0 0 0 2 -3v-3a7 7 0 0 1 4 -6", "key": "svg-0" }], ["path", { "d": "M9 17v1a3 3 0 0 0 6 0v-1", "key": "svg-1" }]];
const IconBell = createReactComponent("outline", "bell", "Bell", __iconNode$1n);
const __iconNode$1m = [["path", { "d": "M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0", "key": "svg-0" }], ["path", { "d": "M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0", "key": "svg-1" }], ["path", { "d": "M3 6l0 13", "key": "svg-2" }], ["path", { "d": "M12 6l0 13", "key": "svg-3" }], ["path", { "d": "M21 6l0 13", "key": "svg-4" }]];
const IconBook = createReactComponent("outline", "book", "Book", __iconNode$1m);
const __iconNode$1l = [["path", { "d": "M5 5a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -14", "key": "svg-0" }], ["path", { "d": "M9 5a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -14", "key": "svg-1" }], ["path", { "d": "M5 8h4", "key": "svg-2" }], ["path", { "d": "M9 16h4", "key": "svg-3" }], ["path", { "d": "M13.803 4.56l2.184 -.53c.562 -.135 1.133 .19 1.282 .732l3.695 13.418a1.02 1.02 0 0 1 -.634 1.219l-.133 .041l-2.184 .53c-.562 .135 -1.133 -.19 -1.282 -.732l-3.695 -13.418a1.02 1.02 0 0 1 .634 -1.219l.133 -.041", "key": "svg-4" }], ["path", { "d": "M14 9l4 -1", "key": "svg-5" }], ["path", { "d": "M16 16l3.923 -.98", "key": "svg-6" }]];
const IconBooks = createReactComponent("outline", "books", "Books", __iconNode$1l);
const __iconNode$1k = [["path", { "d": "M15.5 13a3.5 3.5 0 0 0 -3.5 3.5v1a3.5 3.5 0 0 0 7 0v-1.8", "key": "svg-0" }], ["path", { "d": "M8.5 13a3.5 3.5 0 0 1 3.5 3.5v1a3.5 3.5 0 0 1 -7 0v-1.8", "key": "svg-1" }], ["path", { "d": "M17.5 16a3.5 3.5 0 0 0 0 -7h-.5", "key": "svg-2" }], ["path", { "d": "M19 9.3v-2.8a3.5 3.5 0 0 0 -7 0", "key": "svg-3" }], ["path", { "d": "M6.5 16a3.5 3.5 0 0 1 0 -7h.5", "key": "svg-4" }], ["path", { "d": "M5 9.3v-2.8a3.5 3.5 0 0 1 7 0v10", "key": "svg-5" }]];
const IconBrain = createReactComponent("outline", "brain", "Brain", __iconNode$1k);
const __iconNode$1j = [["path", { "d": "M4 7a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12", "key": "svg-0" }], ["path", { "d": "M16 3v4", "key": "svg-1" }], ["path", { "d": "M8 3v4", "key": "svg-2" }], ["path", { "d": "M4 11h16", "key": "svg-3" }], ["path", { "d": "M11 15h1", "key": "svg-4" }], ["path", { "d": "M12 15v3", "key": "svg-5" }]];
const IconCalendar = createReactComponent("outline", "calendar", "Calendar", __iconNode$1j);
const __iconNode$1i = [["path", { "d": "M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2", "key": "svg-0" }], ["path", { "d": "M9 13a3 3 0 1 0 6 0a3 3 0 0 0 -6 0", "key": "svg-1" }]];
const IconCamera = createReactComponent("outline", "camera", "Camera", __iconNode$1i);
const __iconNode$1h = [["path", { "d": "M12 15a3 3 0 1 0 6 0a3 3 0 1 0 -6 0", "key": "svg-0" }], ["path", { "d": "M13 17.5v4.5l2 -1.5l2 1.5v-4.5", "key": "svg-1" }], ["path", { "d": "M10 19h-5a2 2 0 0 1 -2 -2v-10c0 -1.1 .9 -2 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -1 1.73", "key": "svg-2" }], ["path", { "d": "M6 9l12 0", "key": "svg-3" }], ["path", { "d": "M6 12l3 0", "key": "svg-4" }], ["path", { "d": "M6 15l2 0", "key": "svg-5" }]];
const IconCertificate = createReactComponent("outline", "certificate", "Certificate", __iconNode$1h);
const __iconNode$1g = [["path", { "d": "M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -6", "key": "svg-0" }], ["path", { "d": "M15 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -10", "key": "svg-1" }], ["path", { "d": "M9 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1l0 -14", "key": "svg-2" }], ["path", { "d": "M4 20h14", "key": "svg-3" }]];
const IconChartBar = createReactComponent("outline", "chart-bar", "ChartBar", __iconNode$1g);
const __iconNode$1f = [["path", { "d": "M5 12l5 5l10 -10", "key": "svg-0" }]];
const IconCheck = createReactComponent("outline", "check", "Check", __iconNode$1f);
const __iconNode$1e = [["path", { "d": "M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8", "key": "svg-0" }], ["path", { "d": "M14 19l2 2l4 -4", "key": "svg-1" }], ["path", { "d": "M9 8h4", "key": "svg-2" }], ["path", { "d": "M9 12h2", "key": "svg-3" }]];
const IconChecklist = createReactComponent("outline", "checklist", "Checklist", __iconNode$1e);
const __iconNode$1d = [["path", { "d": "M7 12l5 5l10 -10", "key": "svg-0" }], ["path", { "d": "M2 12l5 5m5 -5l5 -5", "key": "svg-1" }]];
const IconChecks = createReactComponent("outline", "checks", "Checks", __iconNode$1d);
const __iconNode$1c = [["path", { "d": "M6 9l6 6l6 -6", "key": "svg-0" }]];
const IconChevronDown = createReactComponent("outline", "chevron-down", "ChevronDown", __iconNode$1c);
const __iconNode$1b = [["path", { "d": "M15 6l-6 6l6 6", "key": "svg-0" }]];
const IconChevronLeft = createReactComponent("outline", "chevron-left", "ChevronLeft", __iconNode$1b);
const __iconNode$1a = [["path", { "d": "M9 6l6 6l-6 6", "key": "svg-0" }]];
const IconChevronRight = createReactComponent("outline", "chevron-right", "ChevronRight", __iconNode$1a);
const __iconNode$19 = [["path", { "d": "M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2", "key": "svg-0" }], ["path", { "d": "M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2", "key": "svg-1" }], ["path", { "d": "M9 14l2 2l4 -4", "key": "svg-2" }]];
const IconClipboardCheck = createReactComponent("outline", "clipboard-check", "ClipboardCheck", __iconNode$19);
const __iconNode$18 = [["path", { "d": "M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2", "key": "svg-0" }], ["path", { "d": "M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2", "key": "svg-1" }], ["path", { "d": "M9 12l.01 0", "key": "svg-2" }], ["path", { "d": "M13 12l2 0", "key": "svg-3" }], ["path", { "d": "M9 16l.01 0", "key": "svg-4" }], ["path", { "d": "M13 16l2 0", "key": "svg-5" }]];
const IconClipboardList = createReactComponent("outline", "clipboard-list", "ClipboardList", __iconNode$18);
const __iconNode$17 = [["path", { "d": "M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2", "key": "svg-0" }], ["path", { "d": "M9 5a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2", "key": "svg-1" }]];
const IconClipboard = createReactComponent("outline", "clipboard", "Clipboard", __iconNode$17);
const __iconNode$16 = [["path", { "d": "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0", "key": "svg-0" }], ["path", { "d": "M12 7v5l3 3", "key": "svg-1" }]];
const IconClock = createReactComponent("outline", "clock", "Clock", __iconNode$16);
const __iconNode$15 = [["path", { "d": "M4 6l5.5 0", "key": "svg-0" }], ["path", { "d": "M4 10l5.5 0", "key": "svg-1" }], ["path", { "d": "M4 14l5.5 0", "key": "svg-2" }], ["path", { "d": "M4 18l5.5 0", "key": "svg-3" }], ["path", { "d": "M14.5 6l5.5 0", "key": "svg-4" }], ["path", { "d": "M14.5 10l5.5 0", "key": "svg-5" }], ["path", { "d": "M14.5 14l5.5 0", "key": "svg-6" }], ["path", { "d": "M14.5 18l5.5 0", "key": "svg-7" }]];
const IconColumns = createReactComponent("outline", "columns", "Columns", __iconNode$15);
const __iconNode$14 = [["path", { "d": "M7 9.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667l0 -8.666", "key": "svg-0" }], ["path", { "d": "M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1", "key": "svg-1" }]];
const IconCopy = createReactComponent("outline", "copy", "Copy", __iconNode$14);
const __iconNode$13 = [["path", { "d": "M10 13a2 2 0 1 0 4 0a2 2 0 1 0 -4 0", "key": "svg-0" }], ["path", { "d": "M13.45 11.55l2.05 -2.05", "key": "svg-1" }], ["path", { "d": "M6.4 20a9 9 0 1 1 11.2 0l-11.2 0", "key": "svg-2" }]];
const IconDashboard = createReactComponent("outline", "dashboard", "Dashboard", __iconNode$13);
const __iconNode$12 = [["path", { "d": "M3 5a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-16a1 1 0 0 1 -1 -1v-10", "key": "svg-0" }], ["path", { "d": "M7 20h10", "key": "svg-1" }], ["path", { "d": "M9 16v4", "key": "svg-2" }], ["path", { "d": "M15 16v4", "key": "svg-3" }]];
const IconDeviceDesktop = createReactComponent("outline", "device-desktop", "DeviceDesktop", __iconNode$12);
const __iconNode$11 = [["path", { "d": "M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2", "key": "svg-0" }], ["path", { "d": "M10 14a2 2 0 1 0 4 0a2 2 0 1 0 -4 0", "key": "svg-1" }], ["path", { "d": "M14 4l0 4l-6 0l0 -4", "key": "svg-2" }]];
const IconDeviceFloppy = createReactComponent("outline", "device-floppy", "DeviceFloppy", __iconNode$11);
const __iconNode$10 = [["path", { "d": "M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-0" }], ["path", { "d": "M11 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-1" }], ["path", { "d": "M11 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-2" }]];
const IconDotsVertical = createReactComponent("outline", "dots-vertical", "DotsVertical", __iconNode$10);
const __iconNode$$ = [["path", { "d": "M4 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-0" }], ["path", { "d": "M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-1" }], ["path", { "d": "M18 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-2" }]];
const IconDots = createReactComponent("outline", "dots", "Dots", __iconNode$$);
const __iconNode$_ = [["path", { "d": "M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2", "key": "svg-0" }], ["path", { "d": "M7 11l5 5l5 -5", "key": "svg-1" }], ["path", { "d": "M12 4l0 12", "key": "svg-2" }]];
const IconDownload = createReactComponent("outline", "download", "Download", __iconNode$_);
const __iconNode$Z = [["path", { "d": "M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1", "key": "svg-0" }], ["path", { "d": "M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415", "key": "svg-1" }], ["path", { "d": "M16 5l3 3", "key": "svg-2" }]];
const IconEdit = createReactComponent("outline", "edit", "Edit", __iconNode$Z);
const __iconNode$Y = [["path", { "d": "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "key": "svg-0" }], ["path", { "d": "M12 9v4", "key": "svg-1" }], ["path", { "d": "M12 16v.01", "key": "svg-2" }]];
const IconExclamationCircle = createReactComponent("outline", "exclamation-circle", "ExclamationCircle", __iconNode$Y);
const __iconNode$X = [["path", { "d": "M12 19v.01", "key": "svg-0" }], ["path", { "d": "M12 15v-10", "key": "svg-1" }]];
const IconExclamationMark = createReactComponent("outline", "exclamation-mark", "ExclamationMark", __iconNode$X);
const __iconNode$W = [["path", { "d": "M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6", "key": "svg-0" }], ["path", { "d": "M11 13l9 -9", "key": "svg-1" }], ["path", { "d": "M15 4h5v5", "key": "svg-2" }]];
const IconExternalLink = createReactComponent("outline", "external-link", "ExternalLink", __iconNode$W);
const __iconNode$V = [["path", { "d": "M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0", "key": "svg-0" }], ["path", { "d": "M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6", "key": "svg-1" }]];
const IconEye = createReactComponent("outline", "eye", "Eye", __iconNode$V);
const __iconNode$U = [["path", { "d": "M14 3v4a1 1 0 0 0 1 1h4", "key": "svg-0" }], ["path", { "d": "M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2", "key": "svg-1" }], ["path", { "d": "M9 9l1 0", "key": "svg-2" }], ["path", { "d": "M9 13l6 0", "key": "svg-3" }], ["path", { "d": "M9 17l6 0", "key": "svg-4" }]];
const IconFileText = createReactComponent("outline", "file-text", "FileText", __iconNode$U);
const __iconNode$T = [["path", { "d": "M15 3v4a1 1 0 0 0 1 1h4", "key": "svg-0" }], ["path", { "d": "M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2", "key": "svg-1" }], ["path", { "d": "M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2", "key": "svg-2" }]];
const IconFiles = createReactComponent("outline", "files", "Files", __iconNode$T);
const __iconNode$S = [["path", { "d": "M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227", "key": "svg-0" }]];
const IconFilter = createReactComponent("outline", "filter", "Filter", __iconNode$S);
const __iconNode$R = [["path", { "d": "M5 5a5 5 0 0 1 7 0a5 5 0 0 0 7 0v9a5 5 0 0 1 -7 0a5 5 0 0 0 -7 0v-9", "key": "svg-0" }], ["path", { "d": "M5 21v-7", "key": "svg-1" }]];
const IconFlag = createReactComponent("outline", "flag", "Flag", __iconNode$R);
const __iconNode$Q = [["path", { "d": "M7 9a4 4 0 1 0 8 0a4 4 0 0 0 -8 0", "key": "svg-0" }], ["path", { "d": "M5.75 15a8.015 8.015 0 1 0 9.25 -13", "key": "svg-1" }], ["path", { "d": "M11 17v4", "key": "svg-2" }], ["path", { "d": "M7 21h8", "key": "svg-3" }]];
const IconGlobe = createReactComponent("outline", "globe", "Globe", __iconNode$Q);
const __iconNode$P = [["path", { "d": "M8 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-0" }], ["path", { "d": "M8 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-1" }], ["path", { "d": "M8 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-2" }], ["path", { "d": "M14 5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-3" }], ["path", { "d": "M14 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-4" }], ["path", { "d": "M14 19a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-5" }]];
const IconGripVertical = createReactComponent("outline", "grip-vertical", "GripVertical", __iconNode$P);
const __iconNode$O = [["path", { "d": "M10 5a2 2 0 1 0 4 0a2 2 0 1 0 -4 0", "key": "svg-0" }], ["path", { "d": "M3 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0", "key": "svg-1" }], ["path", { "d": "M17 19a2 2 0 1 0 4 0a2 2 0 1 0 -4 0", "key": "svg-2" }], ["path", { "d": "M6.5 17.5l5.5 -4.5l5.5 4.5", "key": "svg-3" }], ["path", { "d": "M12 7l0 6", "key": "svg-4" }]];
const IconHierarchy = createReactComponent("outline", "hierarchy", "Hierarchy", __iconNode$O);
const __iconNode$N = [["path", { "d": "M5 12l-2 0l9 -9l9 9l-2 0", "key": "svg-0" }], ["path", { "d": "M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7", "key": "svg-1" }], ["path", { "d": "M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6", "key": "svg-2" }]];
const IconHome = createReactComponent("outline", "home", "Home", __iconNode$N);
const __iconNode$M = [["path", { "d": "M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0", "key": "svg-0" }], ["path", { "d": "M12 9h.01", "key": "svg-1" }], ["path", { "d": "M11 12h1v4h1", "key": "svg-2" }]];
const IconInfoCircle = createReactComponent("outline", "info-circle", "InfoCircle", __iconNode$M);
const __iconNode$L = [["path", { "d": "M16.555 3.843l3.602 3.602a2.877 2.877 0 0 1 0 4.069l-2.643 2.643a2.877 2.877 0 0 1 -4.069 0l-.301 -.301l-6.558 6.558a2 2 0 0 1 -1.239 .578l-.175 .008h-1.172a1 1 0 0 1 -.993 -.883l-.007 -.117v-1.172a2 2 0 0 1 .467 -1.284l.119 -.13l.414 -.414h2v-2h2v-2l2.144 -2.144l-.301 -.301a2.877 2.877 0 0 1 0 -4.069l2.643 -2.643a2.877 2.877 0 0 1 4.069 0", "key": "svg-0" }], ["path", { "d": "M15 9h.01", "key": "svg-1" }]];
const IconKey = createReactComponent("outline", "key", "Key", __iconNode$L);
const __iconNode$K = [["path", { "d": "M9 6.371c0 4.418 -2.239 6.629 -5 6.629", "key": "svg-0" }], ["path", { "d": "M4 6.371h7", "key": "svg-1" }], ["path", { "d": "M5 9c0 2.144 2.252 3.908 6 4", "key": "svg-2" }], ["path", { "d": "M12 20l4 -9l4 9", "key": "svg-3" }], ["path", { "d": "M19.1 18h-6.2", "key": "svg-4" }], ["path", { "d": "M6.694 3l.793 .582", "key": "svg-5" }]];
const IconLanguage = createReactComponent("outline", "language", "Language", __iconNode$K);
const __iconNode$J = [["path", { "d": "M9 15l6 -6", "key": "svg-0" }], ["path", { "d": "M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464", "key": "svg-1" }], ["path", { "d": "M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463", "key": "svg-2" }]];
const IconLink = createReactComponent("outline", "link", "Link", __iconNode$J);
const __iconNode$I = [["path", { "d": "M3.5 5.5l1.5 1.5l2.5 -2.5", "key": "svg-0" }], ["path", { "d": "M3.5 11.5l1.5 1.5l2.5 -2.5", "key": "svg-1" }], ["path", { "d": "M3.5 17.5l1.5 1.5l2.5 -2.5", "key": "svg-2" }], ["path", { "d": "M11 6l9 0", "key": "svg-3" }], ["path", { "d": "M11 12l9 0", "key": "svg-4" }], ["path", { "d": "M11 18l9 0", "key": "svg-5" }]];
const IconListCheck = createReactComponent("outline", "list-check", "ListCheck", __iconNode$I);
const __iconNode$H = [["path", { "d": "M9 6l11 0", "key": "svg-0" }], ["path", { "d": "M9 12l11 0", "key": "svg-1" }], ["path", { "d": "M9 18l11 0", "key": "svg-2" }], ["path", { "d": "M5 6l0 .01", "key": "svg-3" }], ["path", { "d": "M5 12l0 .01", "key": "svg-4" }], ["path", { "d": "M5 18l0 .01", "key": "svg-5" }]];
const IconList = createReactComponent("outline", "list", "List", __iconNode$H);
const __iconNode$G = [["path", { "d": "M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6", "key": "svg-0" }], ["path", { "d": "M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0", "key": "svg-1" }], ["path", { "d": "M8 11v-4a4 4 0 1 1 8 0v4", "key": "svg-2" }]];
const IconLock = createReactComponent("outline", "lock", "Lock", __iconNode$G);
const __iconNode$F = [["path", { "d": "M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2", "key": "svg-0" }], ["path", { "d": "M9 12h12l-3 -3", "key": "svg-1" }], ["path", { "d": "M18 15l3 -3", "key": "svg-2" }]];
const IconLogout = createReactComponent("outline", "logout", "Logout", __iconNode$F);
const __iconNode$E = [["path", { "d": "M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10", "key": "svg-0" }], ["path", { "d": "M3 7l9 6l9 -6", "key": "svg-1" }]];
const IconMail = createReactComponent("outline", "mail", "Mail", __iconNode$E);
const __iconNode$D = [["path", { "d": "M4 8v-2a2 2 0 0 1 2 -2h2", "key": "svg-0" }], ["path", { "d": "M4 16v2a2 2 0 0 0 2 2h2", "key": "svg-1" }], ["path", { "d": "M16 4h2a2 2 0 0 1 2 2v2", "key": "svg-2" }], ["path", { "d": "M16 20h2a2 2 0 0 0 2 -2v-2", "key": "svg-3" }]];
const IconMaximize = createReactComponent("outline", "maximize", "Maximize", __iconNode$D);
const __iconNode$C = [["path", { "d": "M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1", "key": "svg-0" }]];
const IconMessageCircle = createReactComponent("outline", "message-circle", "MessageCircle", __iconNode$C);
const __iconNode$B = [["path", { "d": "M8 9h8", "key": "svg-0" }], ["path", { "d": "M8 13h6", "key": "svg-1" }], ["path", { "d": "M18 4a3 3 0 0 1 3 3v8a3 3 0 0 1 -3 3h-5l-5 3v-3h-2a3 3 0 0 1 -3 -3v-8a3 3 0 0 1 3 -3h12", "key": "svg-2" }]];
const IconMessage = createReactComponent("outline", "message", "Message", __iconNode$B);
const __iconNode$A = [["path", { "d": "M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454l0 .008", "key": "svg-0" }]];
const IconMoon = createReactComponent("outline", "moon", "Moon", __iconNode$A);
const __iconNode$z = [["path", { "d": "M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25", "key": "svg-0" }], ["path", { "d": "M7.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-1" }], ["path", { "d": "M11.5 7.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-2" }], ["path", { "d": "M15.5 10.5a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-3" }]];
const IconPalette = createReactComponent("outline", "palette", "Palette", __iconNode$z);
const __iconNode$y = [["path", { "d": "M6 6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -12", "key": "svg-0" }], ["path", { "d": "M14 6a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1l0 -12", "key": "svg-1" }]];
const IconPlayerPause = createReactComponent("outline", "player-pause", "PlayerPause", __iconNode$y);
const __iconNode$x = [["path", { "d": "M7 4v16l13 -8l-13 -8", "key": "svg-0" }]];
const IconPlayerPlay = createReactComponent("outline", "player-play", "PlayerPlay", __iconNode$x);
const __iconNode$w = [["path", { "d": "M20 5v14l-12 -7l12 -7", "key": "svg-0" }], ["path", { "d": "M4 5l0 14", "key": "svg-1" }]];
const IconPlayerSkipBack = createReactComponent("outline", "player-skip-back", "PlayerSkipBack", __iconNode$w);
const __iconNode$v = [["path", { "d": "M4 5v14l12 -7l-12 -7", "key": "svg-0" }], ["path", { "d": "M20 5l0 14", "key": "svg-1" }]];
const IconPlayerSkipForward = createReactComponent("outline", "player-skip-forward", "PlayerSkipForward", __iconNode$v);
const __iconNode$u = [["path", { "d": "M12 5l0 14", "key": "svg-0" }], ["path", { "d": "M5 12l14 0", "key": "svg-1" }]];
const IconPlus = createReactComponent("outline", "plus", "Plus", __iconNode$u);
const __iconNode$t = [["path", { "d": "M3 4l18 0", "key": "svg-0" }], ["path", { "d": "M4 4v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-10", "key": "svg-1" }], ["path", { "d": "M12 16l0 4", "key": "svg-2" }], ["path", { "d": "M9 20l6 0", "key": "svg-3" }], ["path", { "d": "M8 12l3 -3l2 2l3 -3", "key": "svg-4" }]];
const IconPresentation = createReactComponent("outline", "presentation", "Presentation", __iconNode$t);
const __iconNode$s = [["path", { "d": "M10 20.777a8.942 8.942 0 0 1 -2.48 -.969", "key": "svg-0" }], ["path", { "d": "M14 3.223a9.003 9.003 0 0 1 0 17.554", "key": "svg-1" }], ["path", { "d": "M4.579 17.093a8.961 8.961 0 0 1 -1.227 -2.592", "key": "svg-2" }], ["path", { "d": "M3.124 10.5c.16 -.95 .468 -1.85 .9 -2.675l.169 -.305", "key": "svg-3" }], ["path", { "d": "M6.907 4.579a8.954 8.954 0 0 1 3.093 -1.356", "key": "svg-4" }]];
const IconProgress = createReactComponent("outline", "progress", "Progress", __iconNode$s);
const __iconNode$r = [["path", { "d": "M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4", "key": "svg-0" }], ["path", { "d": "M12 19l0 .01", "key": "svg-1" }]];
const IconQuestionMark = createReactComponent("outline", "question-mark", "QuestionMark", __iconNode$r);
const __iconNode$q = [["path", { "d": "M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4", "key": "svg-0" }], ["path", { "d": "M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4", "key": "svg-1" }]];
const IconRefresh = createReactComponent("outline", "refresh", "Refresh", __iconNode$q);
const __iconNode$p = [["path", { "d": "M3 10a7 7 0 1 0 14 0a7 7 0 1 0 -14 0", "key": "svg-0" }], ["path", { "d": "M21 21l-6 -6", "key": "svg-1" }]];
const IconSearch = createReactComponent("outline", "search", "Search", __iconNode$p);
const __iconNode$o = [["path", { "d": "M10 14l11 -11", "key": "svg-0" }], ["path", { "d": "M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5", "key": "svg-1" }]];
const IconSend = createReactComponent("outline", "send", "Send", __iconNode$o);
const __iconNode$n = [["path", { "d": "M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065", "key": "svg-0" }], ["path", { "d": "M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0", "key": "svg-1" }]];
const IconSettings = createReactComponent("outline", "settings", "Settings", __iconNode$n);
const __iconNode$m = [["path", { "d": "M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06", "key": "svg-0" }], ["path", { "d": "M15 19l2 2l4 -4", "key": "svg-1" }]];
const IconShieldCheck = createReactComponent("outline", "shield-check", "ShieldCheck", __iconNode$m);
const __iconNode$l = [["path", { "d": "M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3", "key": "svg-0" }]];
const IconShield = createReactComponent("outline", "shield", "Shield", __iconNode$l);
const __iconNode$k = [["path", { "d": "M4 6l7 0", "key": "svg-0" }], ["path", { "d": "M4 12l7 0", "key": "svg-1" }], ["path", { "d": "M4 18l9 0", "key": "svg-2" }], ["path", { "d": "M15 9l3 -3l3 3", "key": "svg-3" }], ["path", { "d": "M18 6l0 12", "key": "svg-4" }]];
const IconSortAscending = createReactComponent("outline", "sort-ascending", "SortAscending", __iconNode$k);
const __iconNode$j = [["path", { "d": "M4 6l9 0", "key": "svg-0" }], ["path", { "d": "M4 12l7 0", "key": "svg-1" }], ["path", { "d": "M4 18l7 0", "key": "svg-2" }], ["path", { "d": "M15 15l3 3l3 -3", "key": "svg-3" }], ["path", { "d": "M18 6l0 12", "key": "svg-4" }]];
const IconSortDescending = createReactComponent("outline", "sort-descending", "SortDescending", __iconNode$j);
const __iconNode$i = [["path", { "d": "M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2m-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6", "key": "svg-0" }]];
const IconSparkles = createReactComponent("outline", "sparkles", "Sparkles", __iconNode$i);
const __iconNode$h = [["path", { "d": "M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873l-6.158 -3.245", "key": "svg-0" }]];
const IconStar = createReactComponent("outline", "star", "Star", __iconNode$h);
const __iconNode$g = [["path", { "d": "M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-0" }], ["path", { "d": "M12 7a5 5 0 1 0 5 5", "key": "svg-1" }], ["path", { "d": "M13 3.055a9 9 0 1 0 7.941 7.945", "key": "svg-2" }], ["path", { "d": "M15 6v3h3l3 -3h-3v-3l-3 3", "key": "svg-3" }], ["path", { "d": "M15 9l-3 3", "key": "svg-4" }]];
const IconTargetArrow = createReactComponent("outline", "target-arrow", "TargetArrow", __iconNode$g);
const __iconNode$f = [["path", { "d": "M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0", "key": "svg-0" }], ["path", { "d": "M7 12a5 5 0 1 0 10 0a5 5 0 1 0 -10 0", "key": "svg-1" }], ["path", { "d": "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "key": "svg-2" }]];
const IconTarget = createReactComponent("outline", "target", "Target", __iconNode$f);
const __iconNode$e = [["path", { "d": "M4 7l16 0", "key": "svg-0" }], ["path", { "d": "M10 11l0 6", "key": "svg-1" }], ["path", { "d": "M14 11l0 6", "key": "svg-2" }], ["path", { "d": "M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12", "key": "svg-3" }], ["path", { "d": "M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3", "key": "svg-4" }]];
const IconTrash = createReactComponent("outline", "trash", "Trash", __iconNode$e);
const __iconNode$d = [["path", { "d": "M3 7l6 6l4 -4l8 8", "key": "svg-0" }], ["path", { "d": "M21 10l0 7l-7 0", "key": "svg-1" }]];
const IconTrendingDown = createReactComponent("outline", "trending-down", "TrendingDown", __iconNode$d);
const __iconNode$c = [["path", { "d": "M3 17l6 -6l4 4l8 -8", "key": "svg-0" }], ["path", { "d": "M14 7l7 0l0 7", "key": "svg-1" }]];
const IconTrendingUp = createReactComponent("outline", "trending-up", "TrendingUp", __iconNode$c);
const __iconNode$b = [["path", { "d": "M8 21l8 0", "key": "svg-0" }], ["path", { "d": "M12 17l0 4", "key": "svg-1" }], ["path", { "d": "M7 4l10 0", "key": "svg-2" }], ["path", { "d": "M17 4v8a5 5 0 0 1 -10 0v-8", "key": "svg-3" }], ["path", { "d": "M3 9a2 2 0 1 0 4 0a2 2 0 1 0 -4 0", "key": "svg-4" }], ["path", { "d": "M17 9a2 2 0 1 0 4 0a2 2 0 1 0 -4 0", "key": "svg-5" }]];
const IconTrophy = createReactComponent("outline", "trophy", "Trophy", __iconNode$b);
const __iconNode$a = [["path", { "d": "M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2", "key": "svg-0" }], ["path", { "d": "M7 9l5 -5l5 5", "key": "svg-1" }], ["path", { "d": "M12 4l0 12", "key": "svg-2" }]];
const IconUpload = createReactComponent("outline", "upload", "Upload", __iconNode$a);
const __iconNode$9 = [["path", { "d": "M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0", "key": "svg-0" }], ["path", { "d": "M6 21v-2a4 4 0 0 1 4 -4h4", "key": "svg-1" }], ["path", { "d": "M15 19l2 2l4 -4", "key": "svg-2" }]];
const IconUserCheck = createReactComponent("outline", "user-check", "UserCheck", __iconNode$9);
const __iconNode$8 = [["path", { "d": "M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0", "key": "svg-0" }], ["path", { "d": "M9 10a3 3 0 1 0 6 0a3 3 0 1 0 -6 0", "key": "svg-1" }], ["path", { "d": "M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855", "key": "svg-2" }]];
const IconUserCircle = createReactComponent("outline", "user-circle", "UserCircle", __iconNode$8);
const __iconNode$7 = [["path", { "d": "M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0", "key": "svg-0" }], ["path", { "d": "M6 21v-2a4 4 0 0 1 4 -4h3.5", "key": "svg-1" }], ["path", { "d": "M22 22l-5 -5", "key": "svg-2" }], ["path", { "d": "M17 22l5 -5", "key": "svg-3" }]];
const IconUserX = createReactComponent("outline", "user-x", "UserX", __iconNode$7);
const __iconNode$6 = [["path", { "d": "M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0", "key": "svg-0" }], ["path", { "d": "M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2", "key": "svg-1" }]];
const IconUser = createReactComponent("outline", "user", "User", __iconNode$6);
const __iconNode$5 = [["path", { "d": "M5 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0", "key": "svg-0" }], ["path", { "d": "M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2", "key": "svg-1" }], ["path", { "d": "M16 3.13a4 4 0 0 1 0 7.75", "key": "svg-2" }], ["path", { "d": "M21 21v-2a4 4 0 0 0 -3 -3.85", "key": "svg-3" }]];
const IconUsers = createReactComponent("outline", "users", "Users", __iconNode$5);
const __iconNode$4 = [["path", { "d": "M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4", "key": "svg-0" }], ["path", { "d": "M3 8a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2l0 -8", "key": "svg-1" }]];
const IconVideo = createReactComponent("outline", "video", "Video", __iconNode$4);
const __iconNode$3 = [["path", { "d": "M15 8a5 5 0 0 1 1.912 4.934m-1.377 2.602a5 5 0 0 1 -.535 .464", "key": "svg-0" }], ["path", { "d": "M17.7 5a9 9 0 0 1 2.362 11.086m-1.676 2.299a9 9 0 0 1 -.686 .615", "key": "svg-1" }], ["path", { "d": "M9.069 5.054l.431 -.554a.8 .8 0 0 1 1.5 .5v2m0 4v8a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l1.294 -1.664", "key": "svg-2" }], ["path", { "d": "M3 3l18 18", "key": "svg-3" }]];
const IconVolumeOff = createReactComponent("outline", "volume-off", "VolumeOff", __iconNode$3);
const __iconNode$2 = [["path", { "d": "M15 8a5 5 0 0 1 0 8", "key": "svg-0" }], ["path", { "d": "M17.7 5a9 9 0 0 1 0 14", "key": "svg-1" }], ["path", { "d": "M6 15h-2a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h2l3.5 -4.5a.8 .8 0 0 1 1.5 .5v14a.8 .8 0 0 1 -1.5 .5l-3.5 -4.5", "key": "svg-2" }]];
const IconVolume = createReactComponent("outline", "volume", "Volume", __iconNode$2);
const __iconNode$1 = [["path", { "d": "M19.5 7a9 9 0 0 0 -7.5 -4a8.991 8.991 0 0 0 -7.484 4", "key": "svg-0" }], ["path", { "d": "M11.5 3a16.989 16.989 0 0 0 -1.826 4", "key": "svg-1" }], ["path", { "d": "M12.5 3a16.989 16.989 0 0 1 1.828 4", "key": "svg-2" }], ["path", { "d": "M19.5 17a9 9 0 0 1 -7.5 4a8.991 8.991 0 0 1 -7.484 -4", "key": "svg-3" }], ["path", { "d": "M11.5 21a16.989 16.989 0 0 1 -1.826 -4", "key": "svg-4" }], ["path", { "d": "M12.5 21a16.989 16.989 0 0 0 1.828 -4", "key": "svg-5" }], ["path", { "d": "M2 10l1 4l1.5 -4l1.5 4l1 -4", "key": "svg-6" }], ["path", { "d": "M17 10l1 4l1.5 -4l1.5 4l1 -4", "key": "svg-7" }], ["path", { "d": "M9.5 10l1 4l1.5 -4l1.5 4l1 -4", "key": "svg-8" }]];
const IconWorldWww = createReactComponent("outline", "world-www", "WorldWww", __iconNode$1);
const __iconNode = [["path", { "d": "M18 6l-12 12", "key": "svg-0" }], ["path", { "d": "M6 6l12 12", "key": "svg-1" }]];
const IconX = createReactComponent("outline", "x", "X", __iconNode);
export {
  IconTrash as $,
  IconDownload as A,
  IconChecklist as B,
  IconTarget as C,
  IconPlayerSkipBack as D,
  IconPlayerPause as E,
  IconPlayerSkipForward as F,
  IconVolumeOff as G,
  IconVolume as H,
  IconCheck as I,
  IconSettings as J,
  IconMaximize as K,
  IconActivity as L,
  IconShield as M,
  IconDashboard as N,
  IconVideo as O,
  IconProgress as P,
  IconUserCircle as Q,
  IconLogout as R,
  IconBell as S,
  IconExclamationCircle as T,
  IconChecks as U,
  IconClipboardList as V,
  IconChartBar as W,
  IconPlus as X,
  IconUserCheck as Y,
  IconFileText as Z,
  IconMessage as _,
  IconInfoCircle as a,
  IconCamera as a0,
  IconPalette as a1,
  IconLanguage as a2,
  IconTargetArrow as a3,
  IconBrain as a4,
  IconSend as a5,
  IconRefresh as a6,
  IconArrowRight as a7,
  IconGlobe as a8,
  IconMoon as a9,
  IconDotsVertical as aA,
  IconExternalLink as aB,
  IconPresentation as aC,
  IconClipboardCheck as aD,
  IconLink as aE,
  IconFlag as aF,
  IconLock as aa,
  IconShieldCheck as ab,
  IconDeviceDesktop as ac,
  IconDots as ad,
  IconEye as ae,
  IconTrendingDown as af,
  IconAward as ag,
  IconUserX as ah,
  IconKey as ai,
  IconBan as aj,
  IconX as ak,
  IconClipboard as al,
  IconUpload as am,
  IconHierarchy as an,
  IconCopy as ao,
  IconArchive as ap,
  IconAlertTriangle as aq,
  IconHome as ar,
  IconList as as,
  IconChevronLeft as at,
  IconChevronRight as au,
  IconChevronDown as av,
  IconDeviceFloppy as aw,
  IconGripVertical as ax,
  IconQuestionMark as ay,
  IconFiles as az,
  IconAlertCircle as b,
  IconSearch as c,
  IconPlayerPlay as d,
  IconBooks as e,
  IconListCheck as f,
  IconClock as g,
  IconFilter as h,
  IconColumns as i,
  IconSortDescending as j,
  IconSortAscending as k,
  IconUsers as l,
  IconUser as m,
  IconSparkles as n,
  IconBook as o,
  IconTrendingUp as p,
  IconCertificate as q,
  IconWorldWww as r,
  IconStar as s,
  IconExclamationMark as t,
  IconArrowLeft as u,
  IconMessageCircle as v,
  IconEdit as w,
  IconMail as x,
  IconCalendar as y,
  IconTrophy as z
};
