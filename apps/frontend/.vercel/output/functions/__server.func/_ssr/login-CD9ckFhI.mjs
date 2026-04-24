import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { N as Navigate } from "../_libs/tanstack__react-router.mjs";
import { S as ServiceUnavailable } from "./service-unavailable-CvUKZURI.mjs";
import { R as Route$I, a as useResolvedAuthState } from "./router-D664CQ4V.mjs";
import { a as applyBrandingTheme } from "./branding-theme-Brsp41KT.mjs";
import { r as resolveRoleHomeTarget } from "./session-DEslDYHo.mjs";
import { L as LoginShell } from "./login-shell-BSQwTiVO.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
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
import "../_libs/lucide-react.mjs";
import "../_libs/mantine__core.mjs";
import "../_libs/mantine__hooks.mjs";
import "../_libs/clsx.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/react-textarea-autosize.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/use-latest.mjs";
import "../_libs/use-isomorphic-layout-effect.mjs";
import "../_libs/use-composed-ref.mjs";
import "../_libs/react-number-format.mjs";
import "../_libs/floating-ui__react.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
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
import "../_libs/mantine__store.mjs";
import "../_libs/react-transition-group.mjs";
import "../_libs/mantine__modals.mjs";
import "../_libs/tabler__icons-react.mjs";
import "../_libs/mantine__form.mjs";
import "../_libs/klona.mjs";
import "../_libs/fast-deep-equal.mjs";
import "node:async_hooks";
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function PlatformLoginRoute() {
  const {
    platform
  } = Route$I.useRouteContext();
  const {
    loading,
    session,
    user
  } = useResolvedAuthState();
  reactExports.useLayoutEffect(() => {
    if (!platform) return;
    applyBrandingTheme({
      ...platform.branding,
      description: platform.branding.loginPage.subheading
    });
  }, [platform]);
  if (!platform) return /* @__PURE__ */ jsxRuntimeExports.jsx(ServiceUnavailable, {});
  if (!loading && user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { replace: true, ...resolveRoleHomeTarget(user.role, session?.tenantIds?.[0]) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PlatformLoginPage, { platform });
}
function PlatformLoginPage({
  platform
}) {
  const branding = platform.branding;
  const loginPage = branding.loginPage;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LoginShell, { auth: platform.auth, features: loginPage.features, footnote: loginPage.footnote, formDescription: loginPage.formDescription, formTitle: loginPage.formTitle, heroHeading: loginPage.heading, heroSubheading: loginPage.subheading, logoUrl: branding.logoUrl, portalName: branding.portalName });
}
export {
  PlatformLoginRoute as component
};
