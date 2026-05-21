import {
  Container,
  Grid,
  Group,
  Stack,
  Text,
  UnstyledButton,
} from "@mantine/core";
import {
  IconAddressBook,
  IconMail,
  IconMapPin,
  IconPhone,
} from "@tabler/icons-react";

import { BrandLogo } from "@/components/shared/brand-logo";

const platformName = "SparkTool";
const platformTagline = "Flexible digital learning for every organization";

export function PublicFooter() {
  function handlePublicNavigation(path: string) {
    window.location.assign(path);
  }

  const quickLinks = [
    { href: "/about", label: "About SparkTool" },
    { href: "/courses", label: "Course Catalog" },
    { href: "/guidelines", label: "Guidelines" },
    { href: "/contact", label: "Contact" },
  ] as const;

  const supportLinks = [
    { href: "/help", label: "Help Center" },
    { href: "/support", label: "Technical Support" },
    { href: "/certificate-verification", label: "Certificate Verification" },
    { href: "/privacy", label: "Privacy Policy" },
  ] as const;

  return (
    <footer className="text-white bg-gray-900">
      <Container py="xl" size="xl">
        <Grid>
          {/* Brand Section */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Group gap="sm">
                <BrandLogo alt={platformName} size={44} />
                <div>
                  <Text className="text-white" fw={700} size="lg">
                    {platformName}
                  </Text>
                  <Text className="text-gray-400" size="sm">
                    {platformTagline}
                  </Text>
                </div>
              </Group>
              <Text className="max-w-sm text-gray-300" size="sm">
                Build branded learning workspaces with role-based access,
                structured progress tracking, and certificate-ready programs.
              </Text>
            </Stack>
          </Grid.Col>

          {/* Quick Links */}
          <Grid.Col span={{ base: 12, md: 2, sm: 6 }}>
            <Stack gap="md">
              <Text className="text-white" fw={600}>
                Quick Links
              </Text>
              <Stack gap="xs">
                {quickLinks.map((link) => (
                  <UnstyledButton
                    className="text-sm text-gray-400 transition-colors hover:text-brand-400 w-fit"
                    key={link.label}
                    onClick={() => handlePublicNavigation(link.href)}
                  >
                    {link.label}
                  </UnstyledButton>
                ))}
              </Stack>
            </Stack>
          </Grid.Col>

          {/* Support */}
          <Grid.Col span={{ base: 12, md: 2, sm: 6 }}>
            <Stack gap="md">
              <Text className="text-white" fw={600}>
                Support
              </Text>
              <Stack gap="xs">
                {supportLinks.map((link) => (
                  <UnstyledButton
                    className="text-sm text-gray-400 transition-colors hover:text-brand-400 w-fit"
                    key={link.label}
                    onClick={() => handlePublicNavigation(link.href)}
                  >
                    {link.label}
                  </UnstyledButton>
                ))}
              </Stack>
            </Stack>
          </Grid.Col>

          {/* Contact Info */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Text className="text-white" fw={600}>
                Contact Information
              </Text>
              <Stack gap="sm">
                <Group gap="sm">
                  <IconMapPin className="text-brand-400" size={16} />
                  <Text className="text-gray-300" size="sm">
                    SparkTool Platform
                  </Text>
                </Group>

                <Group gap="sm">
                  <IconAddressBook className="text-brand-400" size={16} />
                  <Text className="text-gray-300" size="sm">
                    Organization-managed deployment
                  </Text>
                </Group>

                <Group gap="sm">
                  <IconPhone className="text-brand-400" size={16} />
                  <Text className="text-gray-300" size="sm">
                    Available through your workspace administrator
                  </Text>
                </Group>

                <Group gap="sm">
                  <IconMail className="text-brand-400" size={16} />
                  <Text className="text-gray-300" size="sm">
                    support@sparktool.io
                  </Text>
                </Group>
              </Stack>
            </Stack>
          </Grid.Col>
        </Grid>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <Container py="md" size="xl">
          <Group justify="space-between">
            <Text className="text-gray-400" size="sm">
              © 2026 SparkTool. All rights reserved.
            </Text>
            <Text className="text-gray-400" size="sm">
              Built with security and accessibility in mind
            </Text>
          </Group>
        </Container>
      </div>
    </footer>
  );
}
