import {
  AppShell,
  Avatar,
  Badge,
  Burger,
  Button,
  Container,
  Divider,
  Group,
  Menu,
  NavLink,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconSparkles,
  IconBooks,
  IconDashboard,
  IconLogout,
  IconProgress,
  IconUser,
  IconUserCircle,
  IconVideo,
} from "@tabler/icons-react";
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "@tanstack/react-router";

import { NotificationBell } from "@/components/notifications";
import { BrandLogo } from "@/components/shared/brand-logo";
import { AuthScope, type ResolvedAuthState } from "@/providers/auth-provider";
import { useSignOut } from "@/services/hooks";
import { buildTenantPath } from "@/utils/tenant-paths";

interface StudentLayoutProps {
  auth: ResolvedAuthState;
}

export function StudentLayout({ auth }: StudentLayoutProps) {
  const [opened, { toggle }] = useDisclosure();

  const { tenant: tenantParam } = useParams({ strict: false });
  const tenantSlug = tenantParam!;

  const { user } = auth;
  const branding = auth.tenant?.config.branding;
  const portalName = branding?.portalName ?? auth.tenant?.name ?? "SparkTool";
  const logoAlt = `${portalName} logo`;
  const logoUrl = branding?.logoUrl;
  const { mutate } = useSignOut();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    mutate(
      { userId: user?.uid },
      {
        onSuccess: () => {
          navigate({
            params: { tenant: tenantSlug },
            replace: true,
            to: "/$tenant/login",
          });
        },
      },
    );
  };

  const studentRootPath = buildTenantPath(tenantSlug, "/student");

  const navigateToProfile = () => {
    navigate({
      params: { tenant: tenantSlug },
      to: "/$tenant/student/profile",
    });
  };

  const navigateToItem = (path: string) => {
    switch (path) {
      case studentRootPath:
        navigate({ params: { tenant: tenantSlug }, to: "/$tenant/student" });
        break;
      case buildTenantPath(tenantSlug, "/student/courses"):
        navigate({
          params: { tenant: tenantSlug },
          to: "/$tenant/student/courses",
        });
        break;
      case buildTenantPath(tenantSlug, "/student/live-sessions"):
        navigate({
          params: { tenant: tenantSlug },
          to: "/$tenant/student/live-sessions",
        });
        break;
      case buildTenantPath(tenantSlug, "/student/progress"):
        navigate({
          params: { tenant: tenantSlug },
          to: "/$tenant/student/progress",
        });
        break;
      case buildTenantPath(tenantSlug, "/student/ai"):
        navigate({
          params: { tenant: tenantSlug },
          search: { courseId: undefined },
          to: "/$tenant/student/ai",
        });
        break;
      case buildTenantPath(tenantSlug, "/student/profile"):
        navigateToProfile();
        break;
      default:
        break;
    }
  };

  const navigationItems: {
    icon: any;
    label: string;
    path: string;
  }[] = [
    {
      icon: IconDashboard,
      label: "Dashboard",
      path: studentRootPath,
    },
    {
      icon: IconBooks,
      label: "Course Catalog",
      path: buildTenantPath(tenantSlug, "/student/courses"),
    },
    {
      icon: IconVideo,
      label: "Live Sessions",
      path: buildTenantPath(tenantSlug, "/student/live-sessions"),
    },
    {
      icon: IconSparkles,
      label: "AI Assistant",
      path: buildTenantPath(tenantSlug, "/student/ai"),
    },
    {
      icon: IconProgress,
      label: "My Progress",
      path: buildTenantPath(tenantSlug, "/student/progress"),
    },
    {
      icon: IconUserCircle,
      label: "Profile",
      path: buildTenantPath(tenantSlug, "/student/profile"),
    },
  ];

  const isActivePath = (path: string) => {
    if (path === studentRootPath) {
      return location.pathname === studentRootPath;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <AuthScope value={auth}>
      <AppShell
        className="bg-(--app-bg)"
        header={{ height: 70 }}
        navbar={{
          breakpoint: "sm",
          collapsed: { mobile: !opened },
          width: 280,
        }}
        padding="md"
      >
        {/* Header */}
        <AppShell.Header className="border-b-2 bg-brand-800 border-brand-600">
          <Container h="100%" size="xl">
            <Group h="100%" justify="space-between" px="md">
              {/* Left side - Logo and navigation */}
              <Group>
                <Burger
                  color="white"
                  hiddenFrom="sm"
                  onClick={toggle}
                  opened={opened}
                  size="sm"
                />
                <Group gap="sm">
                  <BrandLogo alt={logoAlt} size={44} src={logoUrl} />
                  <Text
                    className="hidden text-white sm:block"
                    fw={700}
                    size="xl"
                  >
                    {portalName}
                  </Text>
                </Group>
              </Group>

              {/* Right side - User menu */}
              <Group>
                {user?.uid && <NotificationBell userId={user.uid} />}

                <Button
                  className="hidden text-white sm:flex bg-brand-700 hover:bg-brand-600"
                  color="brand"
                  leftSection={<IconUser size={16} />}
                  onClick={navigateToProfile}
                  size="sm"
                  variant="light"
                >
                  Profile
                </Button>

                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Group className="px-3 py-2 transition-colors rounded-lg cursor-pointer hover:bg-brand-700">
                      <Avatar
                        alt={user?.displayName}
                        color="brand"
                        size="sm"
                        src={user?.photoURL}
                      />

                      <div className="hidden sm:block">
                        <Text className="text-white" fw={500} size="sm">
                          {user?.displayName}
                        </Text>
                        <Text className="text-brand-200" size="xs">
                          {user?.email}
                        </Text>
                      </div>
                    </Group>
                  </Menu.Target>

                  <Menu.Dropdown>
                    <Menu.Label>Account</Menu.Label>
                    <Menu.Item
                      leftSection={<IconUser size={14} />}
                      onClick={navigateToProfile}
                    >
                      Profile & Settings
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                      color="red"
                      leftSection={<IconLogout size={14} />}
                      onClick={handleLogout}
                    >
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
            </Group>
          </Container>
        </AppShell.Header>

        {/* Sidebar Navigation */}
        <AppShell.Navbar
          className="border-r bg-(--app-surface) border-(--app-border)"
          p="md"
        >
          <Stack gap="xs">
            <Text c="dimmed" fw={600} mb="xs" size="xs" tt="uppercase">
              Learning Portal
            </Text>

            {navigationItems.map((item) => (
              <NavLink
                active={isActivePath(item.path)}
                className={`rounded-lg transition-all duration-200 ${
                  isActivePath(item.path)
                    ? "bg-brand-50 text-brand-700 border-brand-200"
                    : "hover:bg-(--app-surface-soft)"
                }`}
                key={item.path}
                label={item.label}
                leftSection={<item.icon size={20} />}
                onClick={() => {
                  navigateToItem(item.path);
                  toggle(); // Close mobile nav
                }}
              />
            ))}

            <Divider my="md" />

            {/* User Info */}
            <div className="mt-auto">
              <Text c="dimmed" fw={600} mb="xs" size="xs" tt="uppercase">
                Account
              </Text>
              <Group gap="xs">
                <Avatar
                  alt={user?.displayName}
                  color="brand"
                  size="sm"
                  src={user?.photoURL}
                >
                  {user?.displayName?.[0] || "S"}
                </Avatar>
                <div>
                  <Text fw={500} size="sm">
                    {user?.displayName}
                  </Text>
                  <Badge color="brand" size="xs" variant="light">
                    Student
                  </Badge>
                </div>
              </Group>
            </div>
          </Stack>
        </AppShell.Navbar>

        {/* Main Content */}
        <AppShell.Main>
          <div
            className="min-h-full"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            <Outlet />
          </div>
        </AppShell.Main>
      </AppShell>
    </AuthScope>
  );
}
