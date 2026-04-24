import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useFindCertificate, f as formatDate } from "./router-D664CQ4V.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { D as Container, y as Stack, G as Group, E as Title, T as Text, F as Card, J as TextInput, a as Button, L as LoadingOverlay, $ as Alert } from "../_libs/mantine__core.mjs";
import { M as IconShield, q as IconCertificate, c as IconSearch, b as IconAlertCircle, I as IconCheck } from "../_libs/tabler__icons-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
function CertificateVerification(_props) {
  const [certificateId, setCertificateId] = reactExports.useState("");
  const [searchTriggered, setSearchTriggered] = reactExports.useState(false);
  const {
    data: certificate,
    isLoading,
    error
  } = useFindCertificate(searchTriggered ? certificateId : "");
  const showMissingCertificate = searchTriggered && !isLoading && !certificate;
  const handleSearch = () => {
    if (certificateId.trim()) {
      setSearchTriggered(true);
    }
  };
  const handleReset = () => {
    setCertificateId("");
    setSearchTriggered(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { justify: "center", mb: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-12 h-12 rounded-full bg-fun-green-100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconShield, { size: 24, className: "text-fun-green-600" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 1, className: "mb-2 text-gray-800", children: "Certificate Verification" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "lg", className: "text-gray-600", children: "Verify the authenticity of certificates issued by the Nigerian Correctional Service TechForward Program" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-delay": "100", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Certificate ID", placeholder: "Enter certificate ID (e.g., NCS-REACT-2024-001)", value: certificateId, onChange: (e) => {
        setCertificateId(e.target.value);
        setSearchTriggered(false);
      }, leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCertificate, { size: 16 }), size: "lg" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSearch, disabled: !certificateId.trim() || isLoading, leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSearch, { size: 16 }), className: "bg-fun-green-800 hover:bg-fun-green-700", size: "lg", children: "Verify Certificate" }),
        searchTriggered && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "light", onClick: handleReset, children: "Clear" })
      ] })
    ] }) }) }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: {
      position: "relative",
      minHeight: 100
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingOverlay, { visible: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-center text-gray-600", children: "Verifying certificate authenticity..." })
    ] }) }),
    showMissingCertificate && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 24 }), title: "Certificate Not Found", color: "red", radius: "lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: error?.message || "The certificate ID you entered could not be found in our records. Please check the ID and try again." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", mt: "sm", c: "dimmed", children: "If you believe this is an error, please contact the Nigerian Correctional Service TechForward Program administration." })
    ] }) }),
    certificate && searchTriggered && !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, className: "border-green-200 bg-green-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { align: "flex-start", gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-12 h-12 bg-green-100 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { size: 24, className: "text-green-600" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "sm", style: {
        flex: 1
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, className: "text-green-800", children: "Certificate Verified ✓" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", className: "text-green-600", fw: 500, children: "AUTHENTIC" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, className: "text-gray-700", children: "Student Name:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-800", children: certificate.studentName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, className: "text-gray-700", children: "Course:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-800", children: certificate.courseName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, className: "text-gray-700", children: "Completion Date:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-800", children: formatDate(certificate.completionDate) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, className: "text-gray-700", children: "Issue Date:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-gray-800", children: formatDate(certificate.issued?.at) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, className: "text-gray-700", children: "Credential ID:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-mono text-gray-800", children: certificate.id })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconShield, { size: 16 }), color: "green", mt: "md", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: "This certificate has been verified as authentic and was issued by the Nigerian Correctional Service TechForward Program." }) })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-delay": "200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", className: "border-blue-200 bg-blue-50", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(IconShield, { size: 20, className: "text-blue-600" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 4, className: "text-blue-800", children: "About Certificate Verification" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", className: "text-blue-700", children: "All certificates issued by the Nigerian Correctional Service TechForward Program are digitally secured and can be verified through this official verification system. Each certificate contains a unique credential ID that can be used to confirm its authenticity." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { size: "sm", className: "text-blue-700", children: [
        "For additional verification assistance, contact the program administration at",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { component: "span", fw: 500, children: "techforward@corrections.gov.ng" })
      ] })
    ] }) }) })
  ] }) }) });
}
export {
  CertificateVerification as component
};
