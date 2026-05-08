import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  LoadingOverlay,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from "zod";
import type { AdminInvitationPreview } from "@/schemas/invitation";
import {
  useRedeemAdminInvitation,
  useSignInWithEmailAndPassword,
} from "@/services/hooks";
import { IconAlertCircle } from "@tabler/icons-react";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { formatDateTime } from "@/utils/date-utils";

interface EmailPasswordStrategyProps {
  allowSignup?: boolean;
  config: Record<string, unknown>;
  invitationError?: string | null;
  invitationPreview?: null | AdminInvitationPreview;
  invitationToken?: string;
  label?: string;
  restrictedDomains?: string[];
}

interface EmailPasswordFormValues extends Record<string, string> {
  confirmPassword: string;
  displayName: string;
  email: string;
  password: string;
}

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters");

const signInSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: passwordSchema,
});

const accountSetupSchema = z
  .object({
    confirmPassword: z.string(),
    displayName: z
      .string()
      .trim()
      .min(2, "Display name must be at least 2 characters"),
    password: passwordSchema,
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const signUpSchema = accountSetupSchema.and(
  z.object({
    email: z.email("Enter a valid email address"),
  }),
);

export function EmailPasswordStrategy({
  allowSignup = false,
  config,
  invitationError,
  invitationPreview,
  invitationToken,
  label,
  restrictedDomains,
}: EmailPasswordStrategyProps) {
  void config;
  const isInvitationMode = Boolean(invitationToken);
  const hasInvitationPreview = Boolean(invitationPreview);
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const {
    mutate: signIn,
    isPending,
    error,
    isError,
  } = useSignInWithEmailAndPassword();
  const {
    mutate: redeemInvitation,
    isPending: isRedeemingInvitation,
    error: redeemError,
    isError: isRedeemError,
  } = useRedeemAdminInvitation();

  const validationSchema = isInvitationMode
    ? accountSetupSchema
    : mode === "sign-up"
      ? signUpSchema
      : signInSchema;

  const form = useForm<EmailPasswordFormValues>({
    initialValues: {
      confirmPassword: "",
      displayName:
        invitationPreview?.displayName ??
        invitationPreview?.email.split("@")[0] ??
        "",
      email: invitationPreview?.email ?? "",
      password: "",
    },
    validate: zod4Resolver(validationSchema),
  });

  useEffect(() => {
    if (!invitationPreview) {
      return;
    }

    if (!form.values.displayName?.trim()) {
      form.setFieldValue(
        "displayName",
        invitationPreview.displayName ||
          invitationPreview.email.split("@")[0] ||
          "",
      );
    }

    if (form.values.email !== invitationPreview.email) {
      form.setFieldValue("email", invitationPreview.email);
    }
  }, [form, invitationPreview]);

  const isBusy = isPending || isRedeemingInvitation;

  const handleSubmit = (values: EmailPasswordFormValues) => {
    const displayName = values.displayName?.trim() || undefined;

    if (isInvitationMode) {
      if (!invitationToken || !invitationPreview) {
        return;
      }

      redeemInvitation({
        department: null,
        displayName:
          displayName || invitationPreview.email.split("@")[0] || "Admin",
        location: null,
        password: values.password,
        tenantId: invitationPreview.tenantId,
        token: invitationToken,
      });
      return;
    }

    signIn({
      allowSignup,
      displayName,
      email: values.email,
      mode,
      password: values.password,
      restrictedDomains,
    });
  };

  return (
    <div className="relative">
      <LoadingOverlay visible={isBusy} />

      {(isError || isRedeemError || invitationError) && (
        <Alert
          color="red"
          icon={<IconAlertCircle size={16} />}
          mb="md"
          variant="light"
        >
          {invitationError ||
            redeemError?.message ||
            error?.message ||
            "An error occurred during authentication."}
        </Alert>
      )}

      {isInvitationMode && !invitationPreview && !invitationError ? (
        <Alert color="blue" mb="md" variant="light">
          Loading invitation details...
        </Alert>
      ) : null}

      {isInvitationMode && invitationPreview ? (
        <Alert color="green" mb="md" variant="light">
          <Text fw={600} size="sm">
            Administrator invitation for {invitationPreview.email}
          </Text>
          <Text c="dimmed" size="sm">
            Complete account setup before{" "}
            {formatDateTime(invitationPreview.expiresAt)}.
          </Text>
        </Alert>
      ) : null}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="space-y-4">
          {(mode === "sign-up" || isInvitationMode) && (
            <TextInput
              classNames={{
                input: "border-stone-300 focus:border-fun-green-700",
                label: "mb-1 font-sans font-medium text-stone-900",
              }}
              label="Display name"
              placeholder="Jane Doe"
              size="md"
              {...form.getInputProps("displayName")}
            />
          )}
          <TextInput
            classNames={{
              input: "border-stone-300 focus:border-fun-green-700",
              label: "mb-1 font-sans font-medium text-stone-900",
            }}
            disabled={isInvitationMode && !hasInvitationPreview}
            label="Email"
            placeholder="your@email.com"
            readOnly={isInvitationMode && hasInvitationPreview}
            size="md"
            {...form.getInputProps("email")}
          />
          <PasswordInput
            classNames={{
              input: "border-stone-300 focus:border-fun-green-700",
              label: "mb-1 font-sans font-medium text-stone-900",
            }}
            label="Password"
            placeholder="Your password"
            size="md"
            {...form.getInputProps("password")}
          />
          {(mode === "sign-up" || isInvitationMode) && (
            <PasswordInput
              classNames={{
                input: "border-stone-300 focus:border-fun-green-700",
                label: "mb-1 font-sans font-medium text-stone-900",
              }}
              label="Confirm password"
              placeholder="Repeat your password"
              size="md"
              {...form.getInputProps("confirmPassword")}
            />
          )}
          <Button
            className="mt-2 text-white transition-colors duration-300 shadow-sm bg-fun-green-800 hover:bg-fun-green-700"
            disabled={isInvitationMode && !hasInvitationPreview}
            fullWidth
            loading={isBusy}
            size="lg"
            type="submit"
          >
            <span className="font-sans font-medium tracking-wide">
              {isInvitationMode
                ? hasInvitationPreview
                  ? label || "Accept invitation"
                  : "Loading invitation"
                : mode === "sign-up"
                  ? label || "Create account"
                  : label || "Sign in"}
            </span>
          </Button>
          {allowSignup && !isInvitationMode && (
            <Button
              className="font-sans text-fun-green-800 hover:bg-fun-green-50"
              onClick={() => {
                setMode((currentMode) =>
                  currentMode === "sign-in" ? "sign-up" : "sign-in",
                );
                form.setFieldValue("confirmPassword", "");
              }}
              size="sm"
              type="button"
              variant="subtle"
            >
              {mode === "sign-in"
                ? "Need an account? Create one"
                : "Already have an account? Sign in"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
