import { Container, Group, Text, Title } from "@mantine/core";

import { BrandLogo } from "@/components/shared/brand-logo";

interface LoginHeaderProps {
  branding: {
    logoUrl?: string;
    portalName?: string;
    subheading?: string;
  };
}

export function LoginHeader({ branding }: LoginHeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 bg-brand-800 p-4 text-white">
      <Container size="xl">
        <Group justify="space-between">
          <Group>
            <BrandLogo
              alt="Logo"
              size={40}
              src={branding?.logoUrl || "/logo.png"}
            />
            <div>
              <Title className="font-semibold text-white" order={3}>
                {branding?.portalName || "SparkTool"}
              </Title>
              <Text className="text-xs text-white/80">
                {branding?.subheading || "Technology Education Platform"}
              </Text>
            </div>
          </Group>
        </Group>
      </Container>
    </div>
  );
}
