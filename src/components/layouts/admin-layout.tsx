import {
    ActionIcon,
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
    Tooltip,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconBook,
    IconCertificate,
    IconChartBar,
    IconDashboard,
    IconFileText,
    IconLogout,
    IconPlus,
    IconSearch,
    IconSettings,
    IconShield,
    IconUserCheck,
    IconUsers,
    IconVideo,
} from "@tabler/icons-react";
import { Outlet, useLocation, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { NotificationBell } from "@/components/notifications";
import { NCSLogo } from "@/components/shared/ncs-logo";
import { useAuthContext } from "@/providers/auth-provider";
import { useSignOut } from "@/services/hooks";

export function AdminLayout() {
  const { user } = useAuthContext();
  const { mutateAsync } = useSignOut();

  const [opened, { close, toggle }] = useDisclosure();

  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await mutateAsync({ userId: user?.uid });
      navigate({ to: "/login" });
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const navigationItems = [
    {
      description: "Overview and metrics",
      icon: IconDashboard,
      label: "Dashboard",
      path: "/admin",
    },
    {
      description: "Manage students and staff",
      icon: IconUsers,
      label: "User Management",
      path: "/admin/users",
    },
    {
      description: "Manage courses and content",
      icon: IconBook,
      label: "Course Management",
      path: "/admin/courses",
    },
    {
      description: "Manage live teaching sessions",
      icon: IconVideo,
      label: "Live Sessions",
      path: "/admin/live-sessions",
    },
    {
      description: "Performance insights",
      icon: IconChartBar,
      label: "Analytics & Reports",
      path: "/admin/analytics",
    },
    {
      description: "Manage certificates",
      icon: IconCertificate,
      label: "Certificates",
      path: "/admin/certificates",
    },
    {
      description: "Platform configuration",
      icon: IconSettings,
      label: "System Settings",
      path: "/admin/settings",
    },
  ];

  const quickActions = [
    {
      action: () => navigate({ to: "/admin/courses" }),
      color: "fun-green",
      icon: IconPlus,
      label: "Add Course",
    },
    {
      action: () => navigate({ to: "/admin/users" }),
      color: "blue",
      icon: IconUserCheck,
      label: "Add User",
    },
    {
      action: () => navigate({ to: "/admin/analytics" }),
      color: "orange",
      icon: IconFileText,
      label: "Generate Report",
    },
  ];

  const isActivePath = (path: string) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <AppShell
      className="bg-gray-50"
      header={{ height: 70 }}
      navbar={{
        breakpoint: "md",
        collapsed: { mobile: !opened },
        width: 280,
      }}
      padding="md"
    >
      {/* Header */}
      <AppShell.Header className="border-b-2 bg-fun-green-800 border-fun-green-600">
        <Container h="100%" size="xl">
          <Group h="100%" justify="space-between" px="md">
            {/* Left side - Logo and burger */}
            <Group>
              <Burger
                color="white"
                hiddenFrom="md"
                onClick={toggle}
                opened={opened}
                size="sm"
              />
              <Group gap="sm">
                <NCSLogo size={44} />
                <div>
                  <Text
                    className="hidden text-white sm:block"
                    fw={700}
                    size="lg"
                  >
                    Nigerian Correctional Service
                  </Text>
                  <Badge
                    className="hidden sm:block"
                    color="fun-green"
                    size="xs"
                    variant="light"
                  >
                    Admin Portal
                  </Badge>
                </div>
              </Group>
            </Group>

            {/* Right side - Actions and user menu */}
            <Group gap="sm">
              {/* Quick Actions */}
              <Group className="hidden lg:flex" gap="xs">
                {quickActions.map((action) => (
                  <Tooltip key={action.label} label={action.label}>
                    <ActionIcon
                      className="text-white hover:bg-fun-green-700"
                      onClick={action.action}
                      size="lg"
                      variant="light"
                    >
                      <action.icon size={18} />
                    </ActionIcon>
                  </Tooltip>
                ))}
              </Group>

              {/* Search */}
              <Tooltip label="Global Search">
                <ActionIcon
                  className="text-white hover:bg-fun-green-700"
                  size="lg"
                  variant="light"
                >
                  <IconSearch size={18} />
                </ActionIcon>
              </Tooltip>

              {/* Notifications */}
              {user?.uid && <NotificationBell userId={user.uid} />}

              {/* User Menu */}
              <Menu shadow="md" width={250}>
                <Menu.Target>
                  <Group className="px-3 py-2 transition-colors rounded-lg cursor-pointer hover:bg-fun-green-700">
                    <Avatar
                      alt={user?.displayName || "Admin"}
                      color="fun-green"
                      size="sm"
                      src={user?.photoURL}
                    >
                      {user?.displayName?.[0] || "A"}
                    </Avatar>
                    <div className="hidden sm:block">
                      <Text className="text-white" fw={500} size="sm">
                        {user?.displayName || "Administrator"}
                      </Text>
                      <Text className="text-fun-green-200" size="xs">
                        {user?.email}
                      </Text>
                    </div>
                  </Group>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>
                    <Group gap="xs">
                      <IconShield size={14} />
                      Administrator Account
                    </Group>
                  </Menu.Label>

                  <Menu.Item
                    leftSection={<IconSettings size={14} />}
                    onClick={() => navigate({ to: "/admin/profile" })}
                  >
                    Profile Settings
                  </Menu.Item>

                  <Menu.Item
                    leftSection={<IconShield size={14} />}
                    onClick={() => navigate({ to: "/admin/security" })}
                  >
                    Security Settings
                  </Menu.Item>

                  <Menu.Divider />

                  <Menu.Item
                    color="red"
                    leftSection={<IconLogout size={14} />}
                    onClick={handleLogout}
                  >
                    Sign Out
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
            Administration
          </Text>

          {navigationItems.map((item) => (
            <NavLink
              active={isActivePath(item.path)}
              className={`rounded-lg transition-all duration-200 ${
                isActivePath(item.path)
                  ? "bg-fun-green-50 text-fun-green-700 border-fun-green-200"
                  : "hover:bg-gray-50"
              }`}
              description={item.description}
              key={item.path}
              label={item.label}
              leftSection={<item.icon size={20} />}
              onClick={() => {
                navigate({ to: item.path as never }); // Fallback constrained type until route definitions are resolved
                close(); // Close mobile nav
              }}
            />
          ))}

          <Divider my="md" />

          {/* Quick Actions for Mobile */}
          <Text
            c="dimmed"
            className="lg:hidden"
            fw={600}
            mb="xs"
            size="xs"
            tt="uppercase"
          >
            Quick Actions
          </Text>

          <div className="lg:hidden">
            <Stack gap="xs">
              {quickActions.map((action) => (
                <Button
                  color={action.color}
                  fullWidth
                  key={action.label}
                  leftSection={<action.icon size={16} />}
                  onClick={action.action}
                  size="sm"
                  variant="light"
                >
                  {action.label}
                </Button>
              ))}
            </Stack>
          </div>

          <Divider className="lg:hidden" my="md" />

          {/* System Status */}
          <div className="mt-auto">
            <Text c="dimmed" fw={600} mb="xs" size="xs" tt="uppercase">
              System Status
            </Text>
            <Group gap="xs">
              <Badge color="fun-green" size="sm" variant="dot">
                Online
              </Badge>
              <Text c="dimmed" size="xs">
                All systems operational
              </Text>
            </Group>
          </div>
        </Stack>
      </AppShell.Navbar>

      {/* Main Content */}
      <AppShell.Main className="bg-gray-50">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="min-h-full"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Outlet />
        </motion.div>
      </AppShell.Main>
    </AppShell>
  );
}
