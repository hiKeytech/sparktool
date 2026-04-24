import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { z as zod4Resolver } from "../_libs/mantine-form-zod-resolver.mjs";
import { aE as Route$a, v as useCreateUser, aF as createUserSchema } from "./router-D664CQ4V.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { u as useForm } from "../_libs/mantine__form.mjs";
import { D as Container, y as Stack, E as Title, T as Text, aa as Paper, G as Group, J as TextInput, K as Select, a8 as PasswordInput, a as Button } from "../_libs/mantine__core.mjs";
import { n as notifications } from "../_libs/mantine__notifications.mjs";
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
import "../_libs/zod.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/@tanstack/react-router-ssr-query+[...].mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/@tanstack/router-ssr-query-core+[...].mjs";
import "../_libs/ibnlanre__builder.mjs";
import "../_libs/tanstack__react-query-devtools.mjs";
import "../_libs/@tanstack/react-router-devtools+[...].mjs";
import "../_libs/tanstack__react-table.mjs";
import "../_libs/tanstack__table-core.mjs";
import "../_libs/date-fns.mjs";
import "../_libs/mantine__modals.mjs";
import "../_libs/mantine__hooks.mjs";
import "../_libs/tabler__icons-react.mjs";
import "node:async_hooks";
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
import "../_libs/mantine__store.mjs";
import "../_libs/react-transition-group.mjs";
import "../_libs/klona.mjs";
import "../_libs/fast-deep-equal.mjs";
function CreateUser() {
  const {
    tenant
  } = Route$a.useRouteContext();
  const navigate = useNavigate();
  const createUser = useCreateUser();
  const form = useForm({
    initialValues: {
      department: "",
      email: "",
      fullName: "",
      location: "",
      role: "student",
      studentId: "",
      temporaryPassword: ""
    },
    validate: zod4Resolver(createUserSchema)
  });
  const handleSubmit = async (values) => {
    const createdUser = await createUser.mutateAsync({
      department: values.department || null,
      displayName: values.fullName,
      email: values.email,
      location: values.location || null,
      password: values.temporaryPassword,
      role: values.role,
      studentId: values.studentId || null,
      tenantId: tenant.id || null
    });
    notifications.show({
      title: "User Created",
      message: `${createdUser.displayName} can now sign in with the credentials you created.`,
      color: "green"
    });
    if (tenant.id) {
      navigate({
        params: {
          tenant: tenant.id
        },
        to: "/$tenant/admin/users"
      });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { size: "sm", py: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { order: 2, children: "Create New User" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", children: "Create a password-based account for a student or administrator" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Paper, { p: "xl", radius: "md", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { grow: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Full Name", placeholder: "John Doe", required: true, ...form.getInputProps("fullName") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Student ID", placeholder: "Optional student number", ...form.getInputProps("studentId") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Email Address", placeholder: "john.doe@example.com", required: true, ...form.getInputProps("email") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { grow: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Department", placeholder: "Optional department", ...form.getInputProps("department") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { label: "Location", placeholder: "Optional location", ...form.getInputProps("location") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Role", placeholder: "Select role", data: [{
        value: "student",
        label: "Student"
      }, {
        value: "admin",
        label: "Administrator"
      }], required: true, ...form.getInputProps("role") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordInput, { label: "Temporary Password", placeholder: "Create an initial password", required: true, ...form.getInputProps("temporaryPassword") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "flex-end", mt: "md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
          if (tenant.id) {
            navigate({
              params: {
                tenant: tenant.id
              },
              to: "/$tenant/admin/users"
            });
          }
        }, variant: "default", children: "Cancel" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { loading: createUser.isPending, type: "submit", children: "Create Account" })
      ] })
    ] }) }) })
  ] }) });
}
export {
  CreateUser as component
};
