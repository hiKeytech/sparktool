import type { LessonResource } from "@/types";

import { Alert, Button, Card, Group, Stack, Text } from "@mantine/core";
import {
  IconDownload,
  IconExternalLink,
  IconFileText,
  IconLink,
} from "@tabler/icons-react";

interface ResourceDisplayProps {
  compact?: boolean;
  resources: LessonResource[];
  title?: string;
}

export function ResourceDisplay({
  compact = false,
  resources,
  title = "Resources",
}: ResourceDisplayProps) {
  const getResourceIcon = (type: LessonResource["type"]) => {
    switch (type) {
      case "download":
        return <IconDownload className="text-green-500" size={16} />;
      case "link":
        return <IconLink className="text-blue-500" size={16} />;
      case "pdf":
        return <IconFileText className="text-red-500" size={16} />;
      default:
        return <IconFileText className="text-gray-500" size={16} />;
    }
  };

  const getResourceLabel = (type: LessonResource["type"]) => {
    switch (type) {
      case "download":
        return "Download";
      case "link":
        return "Open Link";
      case "pdf":
        return "View PDF";
      default:
        return "Open";
    }
  };

  if (resources.length === 0) {
    return compact ? null : (
      <Alert color="gray" variant="light">
        No resources available for this lesson.
      </Alert>
    );
  }

  const content = (
    <Stack gap={compact ? "xs" : "sm"}>
      {resources.map((resource) => (
        <Group
          className={`p-3 border rounded-lg ${compact ? "bg-gray-50" : "bg-white border-gray-200"}`}
          gap="sm"
          justify="space-between"
          key={resource.id}
        >
          <Group className="flex-1" gap="sm">
            {getResourceIcon(resource.type)}
            <div className="flex-1">
              <Text
                className="font-medium text-gray-800"
                size={compact ? "sm" : "md"}
              >
                {resource.title}
              </Text>
              {resource.description && !compact && (
                <Text className="text-gray-600" mt={2} size="xs">
                  {resource.description}
                </Text>
              )}
              <Text className="text-gray-500" mt={compact ? 0 : 2} size="xs">
                {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
              </Text>
            </div>
          </Group>

          <Button
            component="a"
            href={resource.url}
            rel="noopener noreferrer"
            rightSection={<IconExternalLink size={12} />}
            size={compact ? "xs" : "sm"}
            target="_blank"
            variant="subtle"
          >
            {getResourceLabel(resource.type)}
          </Button>
        </Group>
      ))}
    </Stack>
  );

  if (compact) {
    return content;
  }

  return (
    <Card p="lg" withBorder>
      <Text className="mb-4 font-medium text-gray-800" size="lg">
        {title}
      </Text>
      {content}
    </Card>
  );
}
