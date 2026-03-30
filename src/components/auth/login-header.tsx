import { Container, Group, Text, Title } from "@mantine/core";

interface LoginHeaderProps {
  branding: {
    logoUrl?: string;
    portalName?: string;
    subheading?: string;
  };
}

export function LoginHeader({ branding }: LoginHeaderProps) {
  return (
    <div className="fixed top-0 left-0 right-0 z-10 p-4 text-white bg-primary">
      <Container size="xl">
        <Group justify="space-between">
          <Group>
            <img
              alt="Logo"
              className="w-10 h-10"
              src={branding?.logoUrl || "/logo.png"}
            />
            <div>
              <Title className="font-semibold text-white" order={3}>
                {branding?.portalName || "Sparktool"}
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
