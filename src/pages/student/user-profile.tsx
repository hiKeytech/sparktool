import type {
  ChangePasswordFormData,
  UpdateProfileFormData,
  UserPreferencesFormData,
} from "@/schemas";

import {
  ActionIcon,
  Alert,
  Avatar,
  Badge,
  Button,
  Card,
  Container,
  Divider,
  FileButton,
  Grid,
  Group,
  Paper,
  PasswordInput,
  Progress,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Tabs,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { modals } from "@mantine/modals";
import { notifications } from "@mantine/notifications";
import {
  IconAlertCircle,
  IconBook,
  IconCamera,
  IconCheck,
  IconCertificate,
  IconClock,
  IconLanguage,
  IconPalette,
  IconSettings,
  IconShield,
  IconTrophy,
  IconUser,
} from "@tabler/icons-react";
import { zod4Resolver } from "mantine-form-zod-resolver";
import { useRef, useState } from "react";

import {
  changePasswordSchema,
  updateProfileSchema,
  userPreferencesSchema,
} from "@/schemas";
import {
  useChangePassword,
  useUpdateUser,
  useUserProgress,
} from "@/services/hooks";
import type { TenantUserPageProps } from "@/types/route-page-props";
import { formatDate } from "@/utils/date-utils";

export function UserProfile({ tenant, user }: TenantUserPageProps) {
  const [activeTab, setActiveTab] = useState<null | string>("profile");
  const resetRef = useRef<() => void>(null);

  const changePasswordMutation = useChangePassword();
  const updateUserMutation = useUpdateUser();
  const { data: userProgress = [] } = useUserProgress(
    user?.uid || "",
    tenant?.id,
    {
      enabled: !!user?.uid,
    },
  );

  const profileForm = useForm<UpdateProfileFormData>({
    initialValues: {
      department: user?.department || "",
      displayName: user?.displayName || "",
      location: user?.location || "",
    },
    validate: zod4Resolver(updateProfileSchema),
  });

  const passwordForm = useForm<ChangePasswordFormData>({
    initialValues: {
      confirmPassword: "",
      currentPassword: "",
      newPassword: "",
    },
    validate: zod4Resolver(changePasswordSchema),
  });

  const preferencesForm = useForm<UserPreferencesFormData>({
    initialValues: {
      language: (user?.preferences?.language as "en" | "fr") || "en",
      notifications: user?.preferences?.notifications ?? true,
      theme: (user?.preferences?.theme as "dark" | "light") || "light",
    },
    validate: zod4Resolver(userPreferencesSchema),
  });

  const handleProfileUpdate = async (values: UpdateProfileFormData) => {
    if (!user) return;

    await updateUserMutation.mutateAsync({
      userData: {
        department: values.department,
        displayName: values.displayName,
        location: values.location,
      },
      userId: user.uid || "",
    });
  };

  const handlePasswordChange = async (values: ChangePasswordFormData) => {
    await changePasswordMutation.mutateAsync(values, {
      onError: (error) => {
        notifications.show({
          color: "red",
          icon: <IconAlertCircle size={16} />,
          message: error.message || "Failed to update password.",
          title: "Password Update Failed",
        });
      },
      onSuccess: () => {
        notifications.show({
          color: "green",
          icon: <IconCheck size={16} />,
          message: "Your password has been updated successfully.",
          title: "Password Updated",
        });
      },
    });

    passwordForm.reset();
    modals.close("change-password-modal");
  };

  const handlePreferencesUpdate = async (values: UserPreferencesFormData) => {
    if (!user) return;

    await updateUserMutation.mutateAsync({
      userData: {
        preferences: {
          language: values.language,
          notifications: values.notifications,
          theme: values.theme,
        },
      },
      userId: user.uid || "",
    });
  };

  const handleAvatarUpload = (file: File | null) => {
    if (!file) return;

    console.log("Avatar upload:", file);
  };

  const openPasswordModal = () => {
    modals.open({
      children: (
        <form onSubmit={passwordForm.onSubmit(handlePasswordChange)}>
          <Stack gap="md">
            <PasswordInput
              key={passwordForm.key("currentPassword")}
              label="Current Password"
              placeholder="Enter current password"
              {...passwordForm.getInputProps("currentPassword")}
            />
            <PasswordInput
              key={passwordForm.key("newPassword")}
              label="New Password"
              placeholder="Enter new password"
              {...passwordForm.getInputProps("newPassword")}
            />
            <PasswordInput
              key={passwordForm.key("confirmPassword")}
              label="Confirm New Password"
              placeholder="Confirm new password"
              {...passwordForm.getInputProps("confirmPassword")}
            />
          </Stack>

          <Group justify="flex-end" mt="xl">
            <Button
              onClick={() => modals.close("change-password-modal")}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              color="fun-green"
              loading={changePasswordMutation.isPending}
              type="submit"
            >
              Update Password
            </Button>
          </Group>
        </form>
      ),
      modalId: "change-password-modal",
      title: "Change Password",
    });
  };

  const completedCourses = userProgress.filter(
    (p) => p.status === "completed",
  ).length;
  const inProgressCourses = userProgress.filter(
    (p) => p.status === "in-progress",
  ).length;
  const totalWatchTime = userProgress.reduce(
    (sum, p) => sum + (p.timeSpentMinutes || 0),
    0,
  );
  const averageProgress =
    userProgress.length > 0
      ? userProgress.reduce(
          (sum, p) => sum + (p.completionPercentage || 0),
          0,
        ) / userProgress.length
      : 0;

  if (!user) {
    return (
      <Container py="xl" size="md">
        <Alert color="red" icon={<IconAlertCircle size={16} />}>
          You must be logged in to view your profile.
        </Alert>
      </Container>
    );
  }

  return (
    <Container py="xl" size="lg">
      <div data-aos="fade-up" data-aos-duration="600">
        {/* Header */}
        <Card
          data-aos="fade-up"
          data-aos-delay="100"
          mb="xl"
          p="xl"
          radius="lg"
          shadow="md"
        >
          <Group justify="space-between">
            <Group gap="lg">
              <div className="relative">
                <Avatar
                  className="border-4 border-fun-green-200"
                  radius="xl"
                  size={80}
                  src={user.photoURL}
                />

                <FileButton
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  resetRef={resetRef}
                >
                  {(props) => (
                    <ActionIcon
                      {...props}
                      className="absolute border-2 border-white -bottom-1 -right-1"
                      color="fun-green"
                      radius="xl"
                      size="sm"
                    >
                      <IconCamera size={16} />
                    </ActionIcon>
                  )}
                </FileButton>
              </div>

              <div>
                <Title className="text-fun-green-800" order={2}>
                  {user.displayName}
                </Title>
                <Text c="dimmed" size="lg">
                  {user.department}
                </Text>
                <Group gap="xs" mt="xs">
                  <Badge color="fun-green" variant="light">
                    {user.role === "student" ? "Student" : "Administrator"}
                  </Badge>
                  {user.studentId && (
                    <Badge color="gray" variant="outline">
                      ID: {user.studentId}
                    </Badge>
                  )}
                </Group>
              </div>
            </Group>

            {/* Quick Stats */}
            <SimpleGrid className="text-center" cols={3} spacing="lg">
              <Paper bg="fun-green.0" p="md" radius="md">
                <Text c="fun-green" fw={700} size="xl">
                  {completedCourses}
                </Text>
                <Text c="dimmed" size="sm">
                  Completed
                </Text>
              </Paper>
              <Paper bg="blue.0" p="md" radius="md">
                <Text c="blue" fw={700} size="xl">
                  {inProgressCourses}
                </Text>
                <Text c="dimmed" size="sm">
                  In Progress
                </Text>
              </Paper>
              <Paper bg="orange.0" p="md" radius="md">
                <Text c="orange" fw={700} size="xl">
                  {Math.round(averageProgress)}%
                </Text>
                <Text c="dimmed" size="sm">
                  Avg Progress
                </Text>
              </Paper>
            </SimpleGrid>
          </Group>
        </Card>

        {/* Tabs Content */}
        <Tabs
          data-aos="fade-up"
          data-aos-delay="200"
          onChange={setActiveTab}
          value={activeTab}
        >
          <Tabs.List>
            <Tabs.Tab leftSection={<IconUser size={16} />} value="profile">
              Profile
            </Tabs.Tab>
            <Tabs.Tab
              leftSection={<IconSettings size={16} />}
              value="preferences"
            >
              Preferences
            </Tabs.Tab>
            <Tabs.Tab leftSection={<IconShield size={16} />} value="security">
              Security
            </Tabs.Tab>
            <Tabs.Tab
              leftSection={<IconTrophy size={16} />}
              value="achievements"
            >
              Achievements
            </Tabs.Tab>
          </Tabs.List>

          {/* Profile Tab */}
          <Tabs.Panel pt="xl" value="profile">
            <Card
              data-aos="fade-up"
              data-aos-delay="100"
              p="xl"
              radius="lg"
              shadow="md"
            >
              <Title mb="lg" order={3}>
                Personal Information
              </Title>

              <form onSubmit={profileForm.onSubmit(handleProfileUpdate)}>
                <Grid>
                  <Grid.Col span={6}>
                    <TextInput
                      key={profileForm.key("displayName")}
                      label="Full Name"
                      placeholder="Enter your full name"
                      {...profileForm.getInputProps("displayName")}
                      leftSection={<IconUser size={16} />}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      disabled
                      label="Email Address"
                      leftSection={<IconUser size={16} />}
                      value={user.email || ""}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      key={profileForm.key("department")}
                      label="Department"
                      placeholder="Your department"
                      {...profileForm.getInputProps("department")}
                      leftSection={<IconBook size={16} />}
                    />
                  </Grid.Col>
                  <Grid.Col span={6}>
                    <TextInput
                      key={profileForm.key("location")}
                      label="Location"
                      placeholder="Your location"
                      {...profileForm.getInputProps("location")}
                      leftSection={<IconUser size={16} />}
                    />
                  </Grid.Col>
                  {user.studentId && (
                    <Grid.Col span={6}>
                      <TextInput
                        disabled
                        label="Student ID"
                        leftSection={<IconCertificate size={16} />}
                        value={user.studentId}
                      />
                    </Grid.Col>
                  )}
                </Grid>

                <Group justify="flex-end" mt="xl">
                  <Button
                    color="fun-green"
                    loading={updateUserMutation.isPending}
                    type="submit"
                  >
                    Update Profile
                  </Button>
                </Group>
              </form>
            </Card>
          </Tabs.Panel>

          {/* Preferences Tab */}
          <Tabs.Panel pt="xl" value="preferences">
            <Card
              data-aos="fade-up"
              data-aos-delay="100"
              p="xl"
              radius="lg"
              shadow="md"
            >
              <Title mb="lg" order={3}>
                App Preferences
              </Title>

              <form
                onSubmit={preferencesForm.onSubmit(handlePreferencesUpdate)}
              >
                <Stack gap="lg">
                  <Select
                    data={[
                      { label: "Light Theme", value: "light" },
                      { label: "Dark Theme", value: "dark" },
                    ]}
                    description="Choose your preferred theme"
                    key={preferencesForm.key("theme")}
                    label="Theme"
                    leftSection={<IconPalette size={16} />}
                    placeholder="Select theme"
                    {...preferencesForm.getInputProps("theme")}
                  />

                  <Select
                    data={[
                      { label: "English", value: "en" },
                      { label: "French", value: "fr" },
                    ]}
                    description="Choose your preferred language"
                    key={preferencesForm.key("language")}
                    label="Language"
                    leftSection={<IconLanguage size={16} />}
                    placeholder="Select language"
                    {...preferencesForm.getInputProps("language")}
                  />

                  <Divider />

                  <div>
                    <Text fw={500} mb="xs">
                      Notifications
                    </Text>
                    <Stack gap="md">
                      <Switch
                        description="Receive notifications about course updates and announcements"
                        key={preferencesForm.key("notifications")}
                        label="Email Notifications"
                        {...preferencesForm.getInputProps("notifications", {
                          type: "checkbox",
                        })}
                      />
                      <Switch
                        defaultChecked
                        description="Get reminders about incomplete courses"
                        label="Course Reminders"
                      />
                      <Switch
                        defaultChecked
                        description="Receive notifications about quiz results"
                        label="Quiz Notifications"
                      />
                    </Stack>
                  </div>
                </Stack>

                <Group justify="flex-end" mt="xl">
                  <Button
                    color="fun-green"
                    loading={updateUserMutation.isPending}
                    type="submit"
                  >
                    Save Preferences
                  </Button>
                </Group>
              </form>
            </Card>
          </Tabs.Panel>

          {/* Security Tab */}
          <Tabs.Panel pt="xl" value="security">
            <Card
              data-aos="fade-up"
              data-aos-delay="100"
              p="xl"
              radius="lg"
              shadow="md"
            >
              <Title mb="lg" order={3}>
                Security Settings
              </Title>

              <Stack gap="lg">
                <Alert color="blue" icon={<IconShield size={16} />}>
                  Keep your account secure by using a strong password and
                  enabling security features.
                </Alert>

                <div>
                  <Group justify="space-between" mb="md">
                    <div>
                      <Text fw={500}>Password</Text>
                      <Text c="dimmed" size="sm">
                        Last changed: Never
                      </Text>
                    </div>
                    <Button
                      color="fun-green"
                      onClick={openPasswordModal}
                      variant="outline"
                    >
                      Change Password
                    </Button>
                  </Group>
                </div>

                <Divider />

                <div>
                  <Group justify="space-between" mb="md">
                    <div>
                      <Text fw={500}>Two-Factor Authentication</Text>
                      <Text c="dimmed" size="sm">
                        Add an extra layer of security to your account
                      </Text>
                    </div>
                    <Button color="gray" disabled variant="outline">
                      Enable 2FA
                    </Button>
                  </Group>
                </div>

                <Divider />

                <div>
                  <Text fw={500} mb="md">
                    Account Activity
                  </Text>
                  <Stack gap="xs">
                    <Group justify="space-between">
                      <Text size="sm">Last login</Text>
                      <Text c="dimmed" size="sm">
                        {user.lastLoginAt
                          ? formatDate(user.lastLoginAt, "MMM DD, YYYY")
                          : "Never"}
                      </Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm">Account created</Text>
                      <Text c="dimmed" size="sm">
                        {formatDate(user.createdAt, "MMM DD, YYYY")}
                      </Text>
                    </Group>
                  </Stack>
                </div>
              </Stack>
            </Card>
          </Tabs.Panel>

          {/* Achievements Tab */}
          <Tabs.Panel pt="xl" value="achievements">
            <Card
              data-aos="fade-up"
              data-aos-delay="100"
              p="xl"
              radius="lg"
              shadow="md"
            >
              <Title mb="lg" order={3}>
                Your Achievements
              </Title>

              <SimpleGrid cols={2} spacing="lg">
                {/* Learning Progress */}
                <Paper
                  bg="fun-green.0"
                  data-aos="fade-up"
                  data-aos-delay="150"
                  p="lg"
                  radius="md"
                >
                  <Group justify="space-between" mb="md">
                    <IconBook className="text-fun-green-600" size={32} />
                    <Badge color="fun-green">Learning</Badge>
                  </Group>
                  <Text fw={600} size="lg">
                    {completedCourses} Courses Completed
                  </Text>
                  <Progress
                    color="fun-green"
                    mt="xs"
                    value={
                      (completedCourses / Math.max(userProgress.length, 1)) *
                      100
                    }
                  />
                </Paper>

                {/* Study Time */}
                <Paper
                  bg="blue.0"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  p="lg"
                  radius="md"
                >
                  <Group justify="space-between" mb="md">
                    <IconClock className="text-blue-600" size={32} />
                    <Badge color="blue">Time</Badge>
                  </Group>
                  <Text fw={600} size="lg">
                    {Math.round(totalWatchTime / 60)} Hours Studied
                  </Text>
                  <Text c="dimmed" mt="xs" size="sm">
                    Keep up the great work!
                  </Text>
                </Paper>

                {/* Certificates */}
                <Paper
                  bg="orange.0"
                  data-aos="fade-up"
                  data-aos-delay="250"
                  p="lg"
                  radius="md"
                >
                  <Group justify="space-between" mb="md">
                    <IconCertificate className="text-orange-600" size={32} />
                    <Badge color="orange">Certified</Badge>
                  </Group>
                  <Text fw={600} size="lg">
                    {user.certificatesEarned || 0} Certificates
                  </Text>
                  <Text c="dimmed" mt="xs" size="sm">
                    Professional credentials earned
                  </Text>
                </Paper>

                {/* Overall Progress */}
                <Paper
                  bg="fun-green.0"
                  data-aos="fade-up"
                  data-aos-delay="300"
                  p="lg"
                  radius="md"
                >
                  <Group justify="space-between" mb="md">
                    <IconTrophy className="text-fun-green-600" size={32} />
                    <Badge color="fun-green">Achievement</Badge>
                  </Group>
                  <Text fw={600} size="lg">
                    {Math.round(averageProgress)}% Average
                  </Text>
                  <Progress color="fun-green" mt="xs" value={averageProgress} />
                </Paper>
              </SimpleGrid>

              {/* Badges/Achievements */}
              <div className="mt-8">
                <Text fw={500} mb="md">
                  Earned Badges
                </Text>
                <Group>
                  {completedCourses > 0 && (
                    <Badge color="fun-green" size="lg" variant="light">
                      First Course Complete
                    </Badge>
                  )}
                  {completedCourses >= 5 && (
                    <Badge color="blue" size="lg" variant="light">
                      Course Champion
                    </Badge>
                  )}
                  {totalWatchTime > 600 && (
                    <Badge color="orange" size="lg" variant="light">
                      Study Warrior
                    </Badge>
                  )}
                  {averageProgress >= 80 && (
                    <Badge color="purple" size="lg" variant="light">
                      High Achiever
                    </Badge>
                  )}
                </Group>
              </div>
            </Card>
          </Tabs.Panel>
        </Tabs>
      </div>
    </Container>
  );
}
