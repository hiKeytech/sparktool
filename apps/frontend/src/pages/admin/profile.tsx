import {
  Avatar,
  Button,
  Container,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import type { UserPageProps } from "@/types/route-page-props";

export function AdminProfile({ user }: UserPageProps) {
  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={2}>Profile Settings</Title>
          <Text c="dimmed">
            Manage your personal information and account details
          </Text>
        </div>

        <Grid>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Paper p="xl" radius="md" withBorder className="text-center">
              <Stack align="center">
                <Avatar
                  src={user?.photoURL}
                  size={120}
                  radius={120}
                  color="fun-green"
                  className="text-4xl"
                >
                  {user?.displayName?.[0] || "A"}
                </Avatar>
                <div>
                  <Text fw={600} size="lg">
                    {user?.displayName || "Administrator"}
                  </Text>
                  <Text c="dimmed" size="sm" mt={4}>
                    {user?.email}
                  </Text>
                </div>
                <Button fullWidth variant="light" mt="md">
                  Change Avatar
                </Button>
              </Stack>
            </Paper>
          </Grid.Col>

          <Grid.Col span={{ base: 12, md: 8 }}>
            <Paper p="xl" radius="md" withBorder>
              <Stack gap="md">
                <Title order={4}>Personal Information</Title>
                <Grid>
                  <Grid.Col span={6}>
                    <TextInput
                      label="First Name"
                      placeholder="Your first name"
                      defaultValue={user?.displayName?.split(" ")[0]}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      label="Last Name"
                      placeholder="Your last name"
                      defaultValue={user?.displayName?.split(" ")[1]}
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <TextInput
                      label="Email Address"
                      placeholder="your@email.com"
                      defaultValue={user?.email || ""}
                      disabled
                    />
                  </Grid.Col>
                  <Grid.Col span={12}>
                    <TextInput
                      label="Role"
                      defaultValue="Administrator"
                      disabled
                    />
                  </Grid.Col>
                </Grid>
                <Group justify="flex-end" mt="md">
                  <Button>Save Changes</Button>
                </Group>
              </Stack>
            </Paper>
          </Grid.Col>
        </Grid>
      </Stack>
    </Container>
  );
}
