import { ActionIcon, Badge, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBell } from "@tabler/icons-react";

import { useUnreadNotificationsCount } from "@/services/hooks";

import { NotificationsDrawer } from "./notifications-drawer";

interface NotificationBellProps {
  userId: string;
}

export function NotificationBell({ userId }: NotificationBellProps) {
  const [opened, { close, open }] = useDisclosure(false);
  const { data: unreadCount = 0 } = useUnreadNotificationsCount(userId);

  return (
    <>
      <Group className="relative">
        <ActionIcon
          className="text-white hover:bg-fun-green-700"
          onClick={open}
          size="lg"
          variant="light"
        >
          <IconBell size={20} />
          {unreadCount > 0 && (
            <Badge
              className="absolute h-5 text-xs -top-1 -right-1 min-w-5"
              color="red"
              size="xs"
              variant="filled"
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </ActionIcon>
      </Group>

      <NotificationsDrawer onClose={close} opened={opened} userId={userId} />
    </>
  );
}
