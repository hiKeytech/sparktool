import type { User } from "@/types";

import { createContext, use, useEffect, useState } from "react";

import { type Tenant } from "@/schemas/tenant";
import {
    useCreateActivityLog,
    useCurrentUser,
    useSessionData,
} from "@/services/hooks";

interface AuthContextType {
  isAuthenticated: boolean;
  loading: boolean;
  sessionStartTime?: number;
  tenant?: Tenant;
  user: null | User;
}

const AuthContext = createContext<AuthContextType>(null!);

interface AuthProviderProps {
  children: React.ReactNode;
  tenant?: Tenant;
}

export function AuthProvider({ children, tenant }: AuthProviderProps) {
  // Pre-fetch the securely authenticated user context from the HTTP session cookie
  const { data: sessionData, isLoading: sessionLoading } = useSessionData();

  const [sessionStartTime, setSessionStartTime] = useState<number>();

  const currentUid = sessionData?.uid || "";

  // The actual user profile document from Mongo-backed current-user lookup
  const { data: user, isLoading: userDataLoading } = useCurrentUser(currentUid);

  const createActivityLog = useCreateActivityLog();

  useEffect(() => {
    if (!sessionData?.uid) {
      return;
    }

    setSessionStartTime(Date.now());

    void (async () => {
      try {
        await createActivityLog.mutateAsync({
          action: "login",
          method: "session_restore",
          userId: sessionData.uid,
        });
      } catch (error) {
        console.error("Failed to log activity", error);
      }
    })();
  }, [createActivityLog, sessionData?.uid, tenant]);

  const isAuthenticated = !!sessionData?.uid && !!user;
  const contextLoading = sessionLoading || (!!sessionData?.uid && userDataLoading);

  return (
    <AuthContext
      value={{
        isAuthenticated,
        loading: contextLoading,
        sessionStartTime,
        tenant,
        user: user || null,
      }}
    >
      {children}
    </AuthContext>
  );
}

export function useAuthContext() {
  const context = use(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}
