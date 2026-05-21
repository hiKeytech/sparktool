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

import { BrandLogo } from "@/components/shared/brand-logo";

import { PublicFooter } from "./public-footer";

const platformName = "SparkTool";
const platformTagline = "Learning platform for modern organizations";

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
      <AppShell.Header className="border-b backdrop-blur border-(--app-border) bg-(--app-surface-elevated)">
        <Container size="xl">
          <Group h={70} justify="space-between">
            {/* Logo */}
            <UnstyledButton
              className="flex items-center gap-3 transition-opacity hover:opacity-80"
              onClick={handleHome}
            >
              <BrandLogo alt={platformName} size={44} />
              <div>
                <Text
                  className="leading-tight text-(--app-text)"
                  fw={700}
                  size="lg"
                >
                  {platformName}
                </Text>
                <Text
                  className="leading-tight text-(--app-text-muted)"
                  size="xs"
                >
                  {platformTagline}
                </Text>
              </div>
            </UnstyledButton>

            {/* Desktop Navigation */}
            <Group gap="xl" visibleFrom="md">
              {navigationItems.map((item) => (
                <UnstyledButton
                  className="font-medium transition-colors text-(--app-text-muted) hover:text-brand-600"
                  key={item.label}
                  onClick={() => handlePublicNavigation(item.href)}
                >
                  {item.label}
                </UnstyledButton>
              ))}
            </Group>

            {/* Desktop Auth Buttons */}
            <Button
              className="bg-brand-600 hover:bg-brand-700"
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
            <BrandLogo alt={platformName} size={44} />
            <div>
              <Text className="text-(--app-text)" fw={600} size="sm">
                {platformName}
              </Text>
            </div>
          </Group>
        }
      >
        <Stack gap="lg">
          {navigationItems.map((item) => (
            <UnstyledButton
              className="py-2 font-medium text-(--app-text-muted) hover:text-brand-600"
              key={item.label}
              onClick={() => {
                handlePublicNavigation(item.href);
                closeDrawer();
              }}
            >
              {item.label}
            </UnstyledButton>
          ))}

          <div className="pt-4 mt-4 border-t border-(--app-border)">
            <Button
              className="bg-brand-600 hover:bg-brand-700"
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
