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
  IconBooks,
  IconDashboard,
  IconLogout,
  IconProgress,
  IconUser,
  IconUserCircle,
  IconVideo,
} from "@tabler/icons-react";
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";

import { NotificationBell } from "@/components/notifications";
import { NCSLogo } from "@/components/shared/ncs-logo";
import { AuthScope, type ResolvedAuthState } from "@/providers/auth-provider";
import { useSignOut } from "@/services/hooks";
import { buildTenantPath } from "@/utils/tenant-paths";

interface StudentLayoutProps {
  auth: ResolvedAuthState;
}

export function StudentLayout({ auth }: StudentLayoutProps) {
  const [opened, { toggle }] = useDisclosure();

  const { tenant, user } = auth;
  const { mutate } = useSignOut();

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    mutate({ userId: user?.uid });
  };

  const navigateToProfile = () => {
    if (tenant?.id) {
      navigate({
        params: { tenant: tenant.id },
        to: "/$tenant/student/profile",
      });
      return;
    }

    navigate({ to: "/login" });
  };

  const navigateToItem = (path: string) => {
    switch (path) {
      case studentRootPath:
        navigate({ to: tenant?.id ? "/$tenant/student" : "/login" });
        break;
      case buildTenantPath(tenant?.id, "/student/courses"):
        navigate({ to: tenant?.id ? "/$tenant/student/courses" : "/login" });
        break;
      case buildTenantPath(tenant?.id, "/student/live-sessions"):
        navigate({
          to: tenant?.id ? "/$tenant/student/live-sessions" : "/login",
        });
        break;
      case buildTenantPath(tenant?.id, "/student/progress"):
        navigate({ to: tenant?.id ? "/$tenant/student/progress" : "/login" });
        break;
      case buildTenantPath(tenant?.id, "/student/profile"):
        navigateToProfile();
        break;
      default:
        break;
    }
  };

  const studentRootPath = buildTenantPath(tenant?.id, "/student");
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
      path: buildTenantPath(tenant?.id, "/student/courses"),
    },
    {
      icon: IconVideo,
      label: "Live Sessions",
      path: buildTenantPath(tenant?.id, "/student/live-sessions"),
    },
    {
      icon: IconProgress,
      label: "My Progress",
      path: buildTenantPath(tenant?.id, "/student/progress"),
    },
    {
      icon: IconUserCircle,
      label: "Profile",
      path: buildTenantPath(tenant?.id, "/student/profile"),
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
        className="bg-gray-50"
        header={{ height: 70 }}
        navbar={{
          breakpoint: "sm",
          collapsed: { mobile: !opened },
          width: 280,
        }}
        padding="md"
      >
        {/* Header */}
        <AppShell.Header className="border-b-2 bg-fun-green-800 border-fun-green-600">
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
                  <NCSLogo size={44} />
                  <Text
                    className="hidden text-white sm:block"
                    fw={700}
                    size="xl"
                  >
                    Nigerian Correctional Service
                  </Text>
                </Group>
              </Group>

              {/* Right side - User menu */}
              <Group>
                {user?.uid && <NotificationBell userId={user.uid} />}

                <Button
                  className="hidden text-white sm:flex bg-fun-green-700 hover:bg-fun-green-600"
                  color="fun-green"
                  leftSection={<IconUser size={16} />}
                  onClick={navigateToProfile}
                  size="sm"
                  variant="light"
                >
                  Profile
                </Button>

                <Menu shadow="md" width={200}>
                  <Menu.Target>
                    <Group className="px-3 py-2 transition-colors rounded-lg cursor-pointer hover:bg-fun-green-700">
                      <Avatar
                        alt={user?.displayName}
                        color="fun-green"
                        size="sm"
                        src={user?.photoURL}
                      />

                      <div className="hidden sm:block">
                        <Text className="text-white" fw={500} size="sm">
                          {user?.displayName}
                        </Text>
                        <Text className="text-fun-green-200" size="xs">
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
        <AppShell.Navbar className="bg-white border-r border-gray-200" p="md">
          <Stack gap="xs">
            <Text c="dimmed" fw={600} mb="xs" size="xs" tt="uppercase">
              Learning Portal
            </Text>

            {navigationItems.map((item) => (
              <NavLink
                active={isActivePath(item.path)}
                className={`rounded-lg transition-all duration-200 ${
                  isActivePath(item.path)
                    ? "bg-fun-green-50 text-fun-green-700 border-fun-green-200"
                    : "hover:bg-gray-50"
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
                  color="fun-green"
                  size="sm"
                  src={user?.photoURL}
                >
                  {user?.displayName?.[0] || "S"}
                </Avatar>
                <div>
                  <Text fw={500} size="sm">
                    {user?.displayName}
                  </Text>
                  <Badge color="fun-green" size="xs" variant="light">
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
