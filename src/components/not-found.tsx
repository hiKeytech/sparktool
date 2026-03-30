import { Navigate } from "@tanstack/react-router";

import { useAuthContext } from "@/providers/auth-provider";

export function NotFound() {
  const { loading, user } = useAuthContext();

  if (loading) return null;

  if (!user) return <Navigate replace to="/login" />;

  switch (user.role) {
    case "admin":
      return <Navigate replace to="/admin" />;
    case "student":
      return <Navigate replace to="/student" />;
    case "super-admin":
      return <Navigate replace to="/super-admin" />;
    default:
      return <Navigate replace to="/login" />;
  }
}
