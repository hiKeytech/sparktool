import type { ReactNode } from "react";

import { Center, Loader, LoadingOverlay, Stack, Text } from "@mantine/core";

interface LoadingOverlayProps {
  instruction?: ReactNode;
  reason?: ReactNode;
  visible: boolean;
}

export function PendingOverlay({
  instruction,
  reason,
  visible,
}: LoadingOverlayProps) {
  return (
    <LoadingOverlay
      color="brand"
      loaderProps={{
        children: (
          <Center>
            <Stack align="center" gap="md">
              <Loader color="brand" size="lg" />

              {reason && (
                <Text fw={500} size="lg">
                  {reason}
                </Text>
              )}

              {instruction && (
                <Text c="dimmed" size="sm" ta="center">
                  {instruction}
                </Text>
              )}
            </Stack>
          </Center>
        ),
      }}
      visible={visible}
    />
  );
}
