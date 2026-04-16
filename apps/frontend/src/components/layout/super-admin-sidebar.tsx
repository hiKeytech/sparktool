import { Anchor, Button, Text } from "@mantine/core";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useResolvedAuthState } from "@/providers/auth-provider";
import { useSignOut } from "@/services/hooks";
import {
  BarChart3,
  Building2,
  History,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Overview", path: "/super-admin" },
  {
    icon: Users,
    label: "Administrators",
    path: "/super-admin/identities",
  },
  { icon: Building2, label: "Tenants", path: "/super-admin/tenants" },
  {
    icon: History,
    label: "Invitations",
    path: "/super-admin/invitations",
  },
  {
    icon: BarChart3,
    label: "Operational Signals",
    path: "/super-admin/telemetry",
  },
  { icon: Settings, label: "Platform Policy", path: "/super-admin/settings" },
];

export function SuperAdminSidebar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user } = useResolvedAuthState();
  const { mutateAsync: signOut } = useSignOut();
  const displayName = user?.displayName?.trim() || "Platform Administrator";
  const initials =
    displayName
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase() ?? "")
      .join("") || "PA";

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col justify-between border-r border-stone-800 bg-stone-950 text-white">
      <div>
        <div className="flex h-20 items-center border-b border-stone-800 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10">
              <ShieldCheck size={20} className="text-emerald-300" />
            </div>
            <div>
              <h1 className="font-bold tracking-tight text-white">SparkTool</h1>
              <Text className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-300">
                Platform Control
              </Text>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          <Text className="mb-3 px-3 text-[10px] font-bold uppercase tracking-wider text-stone-500">
            Navigation
          </Text>
          {navItems.map((item) => {
            const isActive =
              pathname === item.path ||
              (item.path !== "/super-admin" && pathname.startsWith(item.path));
            return (
              <Anchor
                key={item.path}
                component={Link}
                to={item.path}
                underline="never"
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md font-medium text-sm transition-all ${
                  isActive
                    ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-200 shadow-sm"
                    : "text-stone-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                <item.icon size={18} />
                {item.label}
              </Anchor>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-stone-800 bg-stone-900 p-4">
        <div className="mb-4 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold tracking-wide text-stone-950 shadow-sm">
            {initials}
          </div>
          <div>
            <Text className="text-sm font-bold text-white">{displayName}</Text>
            <Text className="w-32 truncate text-xs text-stone-400">
              {user?.email || "platform@sparktool.local"}
            </Text>
          </div>
        </div>

        <Button
          fullWidth
          variant="subtle"
          color="red"
          onClick={async () => {
            await signOut({});
            navigate({ replace: true, to: "/login" });
          }}
          leftSection={<LogOut size={16} />}
          className="h-10 rounded-md text-sm font-medium text-red-300 hover:bg-red-500/10"
        >
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
