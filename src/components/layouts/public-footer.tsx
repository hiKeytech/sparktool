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
import { useNavigate } from "@tanstack/react-router";

import { NCSLogo } from "@/components/shared/ncs-logo";

export function PublicFooter() {
  const navigate = useNavigate();

  const quickLinks = [
    { href: "/about", label: "About NCS" },
    { href: "/courses", label: "Course Catalog" },
    { href: "/guidelines", label: "Guidelines" },
    { href: "/contact", label: "Contact" },
  ];

  const supportLinks = [
    { href: "/help", label: "Help Center" },
    { href: "/support", label: "Technical Support" },
    { href: "/certificate-verification", label: "Certificate Verification" },
    { href: "/privacy", label: "Privacy Policy" },
  ];

  return (
    <footer className="text-white bg-gray-900">
      <Container py="xl" size="xl">
        <Grid>
          {/* Brand Section */}
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Stack gap="md">
              <Group gap="sm">
                <NCSLogo size={44} />
                <div>
                  <Text className="text-white" fw={700} size="lg">
                    Nigerian Correctional Service
                  </Text>
                  <Text className="text-gray-400" size="sm">
                    Nigerian Correctional Service
                  </Text>
                </div>
              </Group>
              <Text className="max-w-sm text-gray-300" size="sm">
                Empowering correctional service professionals with cutting-edge
                technology skills through comprehensive e-learning programs.
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
                    className="text-sm text-gray-400 transition-colors hover:text-fun-green-400 w-fit"
                    key={link.label}
                    onClick={() => navigate({ to: link.href })}
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
                    className="text-sm text-gray-400 transition-colors hover:text-fun-green-400 w-fit"
                    key={link.label}
                    onClick={() => navigate({ to: link.href })}
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
                  <IconMapPin className="text-fun-green-400" size={16} />
                  <Text className="text-gray-300" size="sm">
                    Nigerian Correctional Service
                  </Text>
                </Group>

                <Group gap="sm">
                  <IconAddressBook className="text-fun-green-400" size={16} />
                  <Text className="text-gray-300" size="sm">
                    Bill Clinton Drive, Airport Road, Abuja
                  </Text>
                </Group>

                <Group gap="sm">
                  <IconPhone className="text-fun-green-400" size={16} />
                  <Text className="text-gray-300" size="sm">
                    +234 708 7086 005
                  </Text>
                </Group>

                <Group gap="sm">
                  <IconMail className="text-fun-green-400" size={16} />
                  <Text className="text-gray-300" size="sm">
                    techforward@corrections.gov.ng
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
              © 2024 Nigerian Correctional Service. All rights reserved.
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
