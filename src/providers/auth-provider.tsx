import type { User } from "@/types";

import {
  createContext,
  use,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { type Tenant } from "@/schemas/tenant-contract";
import type { SessionData } from "@/server/session";
import { createActivityLogFn } from "@/server/activity-logs";
import { useCurrentUser, useSessionData } from "@/services/hooks";

interface AuthBootstrapContextType {
  loading: boolean;
  session: null | SessionData;
  sessionStartTime?: number;
  user: null | User;
}

interface AuthContextType extends AuthBootstrapContextType {
  hasTenantAccess: boolean;
  isAuthenticated: boolean;
  tenant?: Tenant;
}

export type ResolvedAuthState = AuthContextType;

const AuthContext = createContext<null | AuthContextType>(null);

interface AuthScopeProps {
  children: React.ReactNode;
  value: AuthContextType;
}

function useBootstrappedAuthState(): AuthBootstrapContextType {
  const { data: sessionData, isLoading: sessionLoading } = useSessionData();
  const [sessionStartTime, setSessionStartTime] = useState<number>();
  const loggedSessionUidRef = useRef<null | string>(null);

  const session = sessionData ?? null;
  const sessionUid = session?.uid ?? null;
  const { data: user, isLoading: userDataLoading } = useCurrentUser(sessionUid);

  useEffect(() => {
    if (!sessionUid) {
      loggedSessionUidRef.current = null;
      setSessionStartTime(undefined);
      return;
    }

    if (loggedSessionUidRef.current === sessionUid) {
      return;
    }

    loggedSessionUidRef.current = sessionUid;
    setSessionStartTime(Date.now());

    void createActivityLogFn({
      data: {
        action: "login",
        method: "session_restore",
        userId: sessionUid,
      },
    }).catch((error) => {
      console.error("Failed to log activity", error);
      loggedSessionUidRef.current = null;
    });
  }, [sessionUid]);

  return useMemo(
    () => ({
      loading: sessionLoading || (!!sessionUid && userDataLoading),
      session,
      sessionStartTime,
      user: user || null,
    }),
    [
      session,
      sessionLoading,
      sessionStartTime,
      sessionUid,
      user,
      userDataLoading,
    ],
  );
}

export function useResolvedAuthState(tenant?: Tenant): AuthContextType {
  const bootstrapState = useBootstrappedAuthState();
  const tenantId = tenant?.id;
  const memberTenantIds =
    bootstrapState.user?.tenantIds ?? bootstrapState.session?.tenantIds ?? [];
  const hasTenantAccess =
    !tenantId ||
    bootstrapState.user?.role === "super-admin" ||
    memberTenantIds.includes(tenantId);

  return useMemo(
    () => ({
      ...bootstrapState,
      hasTenantAccess,
      isAuthenticated: Boolean(
        bootstrapState.session?.uid && bootstrapState.user,
      ),
      tenant,
    }),
    [bootstrapState, hasTenantAccess, tenant],
  );
}

export function AuthScope({ children, value }: AuthScopeProps) {
  return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuthContext() {
  const context = use(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}
