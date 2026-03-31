import { useState } from "react";
import {
  Alert,
  Button,
  LoadingOverlay,
  PasswordInput,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { z } from "zod";
import { useSignInWithEmailAndPassword } from "@/services/hooks";
import { IconAlertCircle } from "@tabler/icons-react";
import { zod4Resolver } from "mantine-form-zod-resolver";

interface EmailPasswordStrategyProps {
  allowSignup?: boolean;
  config: any;
  label?: string;
  restrictedDomains?: string[];
}

const baseSchema = z.object({
  displayName: z
    .string()
    .trim()
    .min(2, "Display name must be at least 2 characters")
    .optional(),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().optional(),
});

export function EmailPasswordStrategy({
  allowSignup = false,
  config: _config,
  label,
  restrictedDomains,
}: EmailPasswordStrategyProps) {
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const {
    mutate: signIn,
    isPending,
    error,
    isError,
  } = useSignInWithEmailAndPassword();

  const schema = baseSchema.superRefine((values, context) => {
    if (mode === "sign-up") {
      if (!values.displayName) {
        context.addIssue({
          code: "custom",
          message: "Display name is required",
          path: ["displayName"],
        });
      }

      if (values.password !== values.confirmPassword) {
        context.addIssue({
          code: "custom",
          message: "Passwords do not match",
          path: ["confirmPassword"],
        });
      }
    }
  });

  const form = useForm({
    initialValues: {
      confirmPassword: "",
      displayName: "",
      email: "",
      password: "",
    },
    validate: zod4Resolver(schema),
  });

  const handleSubmit = (values) => {
    signIn({
      allowSignup,
      displayName: values.displayName,
      email: values.email,
      mode,
      password: values.password,
      restrictedDomains,
    });
  };

  return (
    <div className="relative">
      <LoadingOverlay visible={isPending} />

      {isError && (
        <Alert
          color="red"
          icon={<IconAlertCircle size={16} />}
          mb="md"
          variant="light"
        >
          {error?.message || "An error occurred during authentication."}
        </Alert>
      )}

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <div className="space-y-4">
          {mode === "sign-up" && (
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
            label="Email"
            placeholder="your@email.com"
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
          {mode === "sign-up" && (
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
            className="mt-2 bg-fun-green-800 text-white shadow-sm transition-colors duration-300 hover:bg-fun-green-700"
            fullWidth
            loading={isPending}
            size="lg"
            type="submit"
          >
            <span className="font-sans font-medium tracking-wide">
              {mode === "sign-up"
                ? label || "Create account"
                : label || "Sign in"}
            </span>
          </Button>
          {allowSignup && (
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
