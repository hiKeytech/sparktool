import {
  AppShell,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogin } from "@tabler/icons-react";
import { Outlet, useNavigate } from "@tanstack/react-router";

import { NCSLogo } from "@/components/shared/ncs-logo";

import { PublicFooter } from "./public-footer";

export function PublicLayout() {
  const [drawerOpened, { close: closeDrawer, toggle: toggleDrawer }] =
    useDisclosure(false);
  const navigate = useNavigate();

  const navigationItems = [
    { href: "/guidelines", label: "Guidelines" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/verify-certificate", label: "Verify Certificate" },
  ] as const;

  function handleLogin() {
    navigate({ to: "/login" });
  }

  function handleHome() {
    navigate({ to: "/" });
  }

  function handlePublicNavigation(path: string) {
    window.location.assign(path);
  }

  return (
    <AppShell header={{ height: 70 }} padding={0}>
      <AppShell.Header className="border-b border-gray-200 bg-white/95 backdrop-blur">
        <Container size="xl">
          <Group h={70} justify="space-between">
            {/* Logo */}
            <UnstyledButton
              className="flex items-center gap-3 transition-opacity hover:opacity-80"
              onClick={handleHome}
            >
              <NCSLogo size={44} />
              <div>
                <Text
                  className="leading-tight text-gray-800"
                  fw={700}
                  size="lg"
                >
                  Nigerian Correctional Service
                </Text>
                <Text className="leading-tight text-gray-600" size="xs">
                  Nigerian Correctional Service
                </Text>
              </div>
            </UnstyledButton>

            {/* Desktop Navigation */}
            <Group gap="xl" visibleFrom="md">
              {navigationItems.map((item) => (
                <UnstyledButton
                  className="font-medium text-gray-700 transition-colors hover:text-fun-green-600"
                  key={item.label}
                  onClick={() => handlePublicNavigation(item.href)}
                >
                  {item.label}
                </UnstyledButton>
              ))}
            </Group>

            {/* Desktop Auth Buttons */}
            <Button
              className="bg-fun-green-600 hover:bg-fun-green-700"
              leftSection={<IconLogin size={16} />}
              onClick={handleLogin}
            >
              Login
            </Button>

            {/* Mobile Menu Button */}
            <Burger
              hiddenFrom="md"
              onClick={toggleDrawer}
              opened={drawerOpened}
              size="sm"
            />
          </Group>
        </Container>
      </AppShell.Header>

      {/* Mobile Drawer */}
      <Drawer
        onClose={closeDrawer}
        opened={drawerOpened}
        padding="lg"
        position="right"
        size="sm"
        title={
          <Group gap="sm">
            <NCSLogo size={44} />
            <div>
              <Text className="text-gray-800" fw={600} size="sm">
                Nigerian Correctional Service
              </Text>
            </div>
          </Group>
        }
      >
        <Stack gap="lg">
          {navigationItems.map((item) => (
            <UnstyledButton
              className="py-2 font-medium text-gray-700 hover:text-fun-green-600"
              key={item.label}
              onClick={() => {
                handlePublicNavigation(item.href);
                closeDrawer();
              }}
            >
              {item.label}
            </UnstyledButton>
          ))}

          <div className="pt-4 mt-4 border-t border-gray-200">
            <Button
              className="bg-fun-green-600 hover:bg-fun-green-700"
              fullWidth
              leftSection={<IconLogin size={16} />}
              onClick={() => {
                handleLogin();
                closeDrawer();
              }}
            >
              Login
            </Button>
          </div>
        </Stack>
      </Drawer>

      <AppShell.Main>
        <Outlet />
        <PublicFooter />
      </AppShell.Main>
    </AppShell>
  );
}
