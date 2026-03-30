import { LoadingOverlay } from "@mantine/core";
import { Navigate } from "@tanstack/react-router";

import { useAuthContext } from "@/providers/auth-provider";

interface SuperAdminRouteGuardProps {
  children: React.ReactNode;
}

export function SuperAdminRouteGuard({ children }: SuperAdminRouteGuardProps) {
  const { loading, user } = useAuthContext();

  if (loading) return <LoadingOverlay visible />;
  if (!user) return <Navigate replace to="/login" />;

  if (user.role !== "super-admin") {
    // Redirect to appropriate dashboard based on role
    const redirectPath = user.role === "admin" ? "/admin" : "/student";
    return <Navigate replace to={redirectPath} />;
  }

  return <>{children}</>;
}
