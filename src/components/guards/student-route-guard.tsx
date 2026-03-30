import type { PropsWithChildren } from "react";

import { LoadingOverlay } from "@mantine/core";
import { Navigate } from "@tanstack/react-router";

import { useAuthContext } from "@/providers/auth-provider";

export function StudentRouteGuard({ children }: PropsWithChildren) {
  const { loading, user } = useAuthContext();

  if (loading) return <LoadingOverlay visible />;

  if (!user) return <Navigate replace to="/login" />;
  if (user.role !== "student") {
    const redirectPath =
      user.role === "super-admin" ? "/super-admin" : "/admin";
    return <Navigate replace to={redirectPath} />;
  }

  return <>{children}</>;
}
