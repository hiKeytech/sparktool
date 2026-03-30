import type { PropsWithChildren } from "react";

import { LoadingOverlay } from "@mantine/core";
import { Navigate } from "@tanstack/react-router";

import { useAuthContext } from "@/providers/auth-provider";

export function AdminRouteGuard({ children }: PropsWithChildren) {
  const { loading, user } = useAuthContext();

  if (loading) return <LoadingOverlay visible />;

  if (!user) return <Navigate replace to="/login" />;

  if (user.role !== "admin" && user.role !== "super-admin") {
    // Redirect students to their dashboard
    return <Navigate replace to="/student" />;
  }

  return <>{children}</>;
}
