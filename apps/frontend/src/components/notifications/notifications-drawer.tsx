import type { Notification } from "@/types";

import {
    ActionIcon,
    Alert,
    Avatar,
    Badge,
    Button,
    Card,
    Center,
    Drawer,
    Group,
    Loader,
    ScrollArea,
    Stack,
    Text,
} from "@mantine/core";
import {
    IconBell,
    IconCheck,
    IconChecks,
    IconExclamationCircle,
    IconTrophy,
} from "@tabler/icons-react";
import { formatDistanceToNow } from "date-fns";

import {
    useMarkAllNotificationsAsRead,
    useMarkNotificationAsRead,
    useNotifications,
} from "@/services/hooks";

interface NotificationItemProps {
  notification: Notification;
}

interface NotificationsDrawerProps {
  onClose: () => void;
  opened: boolean;
  userId: string;
}

export function NotificationsDrawer({
  onClose,
  opened,
  userId,
}: NotificationsDrawerProps) {
  const { data: notifications, error, isLoading } = useNotifications(userId);
  const markAllAsRead = useMarkAllNotificationsAsRead();

  const handleMarkAllAsRead = () => {
    markAllAsRead.mutate(userId);
  };

  const unreadCount = notifications?.filter((n) => !n.isRead).length || 0;

  return (
    <Drawer
      onClose={onClose}
      opened={opened}
      overlayProps={{ backgroundOpacity: 0.3 }}
      position="right"
      size="md"
      title={
        <Group className="w-full" justify="space-between">
          <Group gap="xs">
            <IconBell size={20} />
            <Text fw={600} size="lg">
              Notifications
            </Text>
            {unreadCount > 0 && (
              <Badge color="red" size="sm" variant="filled">
                {unreadCount}
              </Badge>
            )}
          </Group>
          <Group gap="xs">
            {unreadCount > 0 && (
              <Button
                leftSection={<IconChecks size={14} />}
                loading={markAllAsRead.isPending}
                onClick={handleMarkAllAsRead}
                size="xs"
                variant="subtle"
              >
                Mark all read
              </Button>
            )}
          </Group>
        </Group>
      }
    >
      <ScrollArea className="h-full">
        {isLoading ? (
          <Center className="py-8">
            <Loader size="md" />
          </Center>
        ) : error ? (
          <Alert
            color="red"
            icon={<IconExclamationCircle size={16} />}
            title="Error"
          >
            Failed to load notifications. Please try again.
          </Alert>
        ) : notifications && notifications.length > 0 ? (
          <Stack gap="sm">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </Stack>
        ) : (
          <Center className="py-8">
            <Stack align="center" gap="md">
              <IconBell className="text-gray-300" size={48} />
              <Text className="text-gray-500" size="sm">
                No notifications yet
              </Text>
            </Stack>
          </Center>
        )}
      </ScrollArea>
    </Drawer>
  );
}

function NotificationItem({ notification }: NotificationItemProps) {
  const markAsRead = useMarkNotificationAsRead();

  const handleMarkAsRead = () => {
    if (!notification.isRead) {
      markAsRead.mutate(notification.id);
    }
  };

  const getNotificationIcon = () => {
    switch (notification.category) {
      case "achievement":
        return <IconTrophy className="text-yellow-500" size={20} />;
      case "message":
        return <IconBell className="text-blue-500" size={20} />;
      case "system":
        return <IconExclamationCircle className="text-gray-500" size={20} />;
      default:
        return <IconBell className="text-blue-500" size={20} />;
    }
  };

  return (
    <Card
      className={`border-l-4 ${
        notification.isRead
          ? "border-l-gray-200 bg-white"
          : "border-l-fun-green-500 bg-fun-green-50"
      }`}
      padding="md"
      radius="sm"
    >
      <Group align="flex-start" gap="md">
        <Avatar className="bg-gray-100" radius="xl" size="sm">
          {getNotificationIcon()}
        </Avatar>
        <div className="flex-1 min-w-0">
          <Group align="flex-start" justify="space-between">
            <div className="flex-1 min-w-0">
              <Text
                className="text-gray-900"
                fw={notification.isRead ? 400 : 600}
                size="sm"
              >
                {notification.title}
              </Text>
              {notification.fromUserName && (
                <Text className="text-gray-500" size="xs">
                  From: {notification.fromUserName}
                </Text>
              )}
            </div>
            {!notification.isRead && (
              <ActionIcon
                loading={markAsRead.isPending}
                onClick={handleMarkAsRead}
                size="sm"
                variant="subtle"
              >
                <IconCheck size={14} />
              </ActionIcon>
            )}
          </Group>
          <Text className="mt-1 text-gray-700" size="sm">
            {notification.message}
          </Text>
          <Text className="mt-2 text-gray-400" size="xs">
            {formatDistanceToNow(new Date(notification.createdAt), {
              addSuffix: true,
            })}
          </Text>
        </div>
      </Group>
    </Card>
  );
}
