import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as Route$B, t as useUpdatePlatformConfig } from "./router-D664CQ4V.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { D as Container, $ as Alert, y as Stack, Q as Badge, E as Title, T as Text, i as SimpleGrid, aa as Paper, G as Group, J as TextInput, ab as Switch, a as Button } from "../_libs/mantine__core.mjs";
import { k as Server, S as ShieldCheck, E as Earth } from "../_libs/lucide-react.mjs";
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
import "../_libs/tabler__icons-react.mjs";
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
function SettingsOverview() {
  const {
    platform
  } = Route$B.useRouteContext();
  const [draft, setDraft] = reactExports.useState(platform);
  const updatePlatformMutation = useUpdatePlatformConfig();
  reactExports.useEffect(() => {
    setDraft(platform);
  }, [platform]);
  if (!platform || !draft) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "red", title: "Platform configuration unavailable", children: "SparkTool platform configuration could not be loaded from the backend." }) });
  }
  const restrictedDomains = draft.auth.restrictedDomains.length > 0 ? draft.auth.restrictedDomains : draft.auth.domains;
  const updateRestrictedDomains = (value) => {
    const domains = value.split(",").map((entry) => entry.trim()).filter(Boolean);
    setDraft({
      ...draft,
      auth: {
        ...draft.auth,
        domains,
        restrictedDomains: domains
      }
    });
  };
  const updateHighlight = (index, key, value) => {
    setDraft({
      ...draft,
      marketing: {
        ...draft.marketing,
        highlights: draft.marketing.highlights.map((highlight, currentIndex) => currentIndex === index ? {
          ...highlight,
          [key]: value
        } : highlight)
      }
    });
  };
  const saveChanges = async () => {
    const updated = await updatePlatformMutation.mutateAsync(draft);
    setDraft(updated);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { color: "green", variant: "light", children: "Platform policy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { mt: "sm", order: 1, children: "Platform Settings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", maw: 760, mt: "sm", children: "SparkTool platform configuration now edits the backend source of truth directly. These changes affect the platform login experience and global operator messaging." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { color: "blue", title: "Platform-wide impact", children: "Changes here affect SparkTool platform operators globally. They do not overwrite tenant-specific branding or tenant login experiences." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SimpleGrid, { cols: {
      base: 1,
      xl: 3
    }, spacing: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", mb: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { size: 18, className: "text-stone-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Platform Identity" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Portal name", value: draft.branding.portalName, onChange: (event) => setDraft({
            ...draft,
            branding: {
              ...draft.branding,
              portalName: event.currentTarget.value
            }
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Primary color", value: draft.branding.primaryColor, onChange: (event) => setDraft({
            ...draft,
            branding: {
              ...draft.branding,
              primaryColor: event.currentTarget.value
            }
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Secondary color", value: draft.branding.secondaryColor, onChange: (event) => setDraft({
            ...draft,
            branding: {
              ...draft.branding,
              secondaryColor: event.currentTarget.value
            }
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Font family", value: draft.branding.fontFamily, onChange: (event) => setDraft({
            ...draft,
            branding: {
              ...draft.branding,
              fontFamily: event.currentTarget.value
            }
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Logo asset", value: draft.branding.logoUrl, onChange: (event) => setDraft({
            ...draft,
            branding: {
              ...draft.branding,
              logoUrl: event.currentTarget.value
            }
          }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", mb: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 18, className: "text-[#006838]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Authentication Policy" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: draft.auth.allowSignup, label: "Allow platform self-service sign-up", onChange: (event) => setDraft({
            ...draft,
            auth: {
              ...draft.auth,
              allowSignup: event.currentTarget.checked
            }
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Strategy label", value: draft.auth.strategies[0]?.label || "", onChange: (event) => setDraft({
            ...draft,
            auth: {
              ...draft.auth,
              strategies: draft.auth.strategies.map((item, index) => index === 0 ? {
                ...item,
                label: event.currentTarget.value
              } : item)
            }
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { disabled: true, label: "Auth strategies", value: draft.auth.strategies.map((item) => item.type).join(", ") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Domain policy", value: restrictedDomains.join(", "), onChange: (event) => updateRestrictedDomains(event.currentTarget.value) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "lg", radius: "lg", withBorder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", mb: "md", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Earth, { size: 18, className: "text-blue-500" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 3, children: "Platform Messaging" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Hero title", value: draft.marketing.heroTitle, onChange: (event) => setDraft({
            ...draft,
            marketing: {
              ...draft.marketing,
              heroTitle: event.currentTarget.value
            }
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Hero eyebrow", value: draft.marketing.eyebrow, onChange: (event) => setDraft({
            ...draft,
            marketing: {
              ...draft.marketing,
              eyebrow: event.currentTarget.value
            }
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Primary CTA", value: draft.marketing.primaryCtaLabel, onChange: (event) => setDraft({
            ...draft,
            marketing: {
              ...draft.marketing,
              primaryCtaLabel: event.currentTarget.value
            }
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Secondary CTA", value: draft.marketing.secondaryCtaLabel, onChange: (event) => setDraft({
            ...draft,
            marketing: {
              ...draft.marketing,
              secondaryCtaLabel: event.currentTarget.value
            }
          }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "lg", radius: "lg", withBorder: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { mb: "md", order: 3, children: "Login Surface Copy" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Heading", value: draft.branding.loginPage.heading, onChange: (event) => setDraft({
          ...draft,
          branding: {
            ...draft.branding,
            loginPage: {
              ...draft.branding.loginPage,
              heading: event.currentTarget.value
            }
          }
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Subheading", value: draft.branding.loginPage.subheading, onChange: (event) => setDraft({
          ...draft,
          branding: {
            ...draft.branding,
            loginPage: {
              ...draft.branding.loginPage,
              subheading: event.currentTarget.value
            }
          }
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Form title", value: draft.branding.loginPage.formTitle, onChange: (event) => setDraft({
          ...draft,
          branding: {
            ...draft.branding,
            loginPage: {
              ...draft.branding.loginPage,
              formTitle: event.currentTarget.value
            }
          }
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Form description", value: draft.branding.loginPage.formDescription, onChange: (event) => setDraft({
          ...draft,
          branding: {
            ...draft.branding,
            loginPage: {
              ...draft.branding.loginPage,
              formDescription: event.currentTarget.value
            }
          }
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Footnote", value: draft.branding.loginPage.footnote, onChange: (event) => setDraft({
          ...draft,
          branding: {
            ...draft.branding,
            loginPage: {
              ...draft.branding.loginPage,
              footnote: event.currentTarget.value
            }
          }
        }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Paper, { p: "lg", radius: "lg", withBorder: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { mb: "md", order: 3, children: "Platform Highlights" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Stack, { gap: "md", children: draft.marketing.highlights.map((highlight, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SimpleGrid, { cols: {
        base: 1,
        md: 2
      }, spacing: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: `Highlight ${index + 1} title`, value: highlight.title, onChange: (event) => updateHighlight(index, "title", event.currentTarget.value) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: `Highlight ${index + 1} description`, value: highlight.description, onChange: (event) => updateHighlight(index, "description", event.currentTarget.value) })
      ] }, `${highlight.icon}-${index}`)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Group, { justify: "flex-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { loading: updatePlatformMutation.isPending, onClick: saveChanges, children: "Save Platform Settings" }) })
  ] }) });
}
export {
  SettingsOverview as component
};
