import type { LessonResource } from "@/types";

import {
  ActionIcon,
  Alert,
  Button,
  Card,
  FileInput,
  Group,
  Modal,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import {
  IconDownload,
  IconEdit,
  IconExternalLink,
  IconFileText,
  IconLink,
  IconPlus,
  IconTrash,
  IconUpload,
} from "@tabler/icons-react";
import { useState } from "react";

import {
  useCreateLessonResource,
  useDeleteLessonResource,
  useUpdateLessonResource,
} from "@/services/hooks";

interface ResourceFormData {
  description: string;
  file?: File;
  title: string;
  type: LessonResource["type"];
  url: string;
}

interface ResourceManagerProps {
  courseId: string;
  lessonId: string;
  readonly?: boolean;
  resources?: LessonResource[];
  sectionId: string;
}

export function ResourceManager({
  courseId,
  lessonId,
  readonly = false,
  resources,
  sectionId,
}: ResourceManagerProps) {
  const [opened, { close, open }] = useDisclosure(false);
  const [editingResource, setEditingResource] = useState<LessonResource | null>(
    null
  );
  const [formData, setFormData] = useState<ResourceFormData>({
    description: "",
    file: undefined,
    title: "",
    type: "pdf",
    url: "",
  });

  const createResourceMutation = useCreateLessonResource();
  const updateResourceMutation = useUpdateLessonResource();
  const deleteResourceMutation = useDeleteLessonResource();

  const handleOpenModal = (resource?: LessonResource) => {
    if (resource) {
      setEditingResource(resource);
      setFormData({
        description: resource.description || "",
        file: undefined,
        title: resource.title,
        type: resource.type,
        url: resource.url,
      });
    } else {
      setEditingResource(null);
      setFormData({
        description: "",
        file: undefined,
        title: "",
        type: "pdf",
        url: "",
      });
    }
    open();
  };

  const handleCloseModal = () => {
    setEditingResource(null);
    setFormData({
      description: "",
      file: undefined,
      title: "",
      type: "pdf",
      url: "",
    });
    close();
  };

  const handleSubmit = async () => {
    if (!formData.title.trim()) {
      notifications.show({
        color: "red",
        message: "Please enter a resource title",
        title: "Validation Error",
      });
      return;
    }

    if (formData.type !== "link" && !formData.file && !editingResource) {
      notifications.show({
        color: "red",
        message: "Please select a file to upload",
        title: "Validation Error",
      });
      return;
    }

    if (formData.type === "link" && !formData.url.trim()) {
      notifications.show({
        color: "red",
        message: "Please enter a valid URL",
        title: "Validation Error",
      });
      return;
    }

    try {
      const resourceData = {
        courseId,
        description: formData.description,
        isRequired: false,
        lessonId,
        order: (resources?.length || 0) + 1,
        sectionId,
        title: formData.title,
        type: formData.type,
        url: formData.url,
      };

      if (editingResource) {
        await updateResourceMutation.mutateAsync({
          file: formData.file,
          resourceData: {
            ...resourceData,
            url: formData.file ? "" : editingResource.url, // Keep existing URL if no new file
          },
          resourceId: editingResource.id,
        });
        notifications.show({
          color: "green",
          message: "Resource updated successfully",
          title: "Success",
        });
      } else {
        await createResourceMutation.mutateAsync({
          file: formData.file,
          resourceData,
        });
        notifications.show({
          color: "green",
          message: "Resource created successfully",
          title: "Success",
        });
      }

      handleCloseModal();
    } catch (error) {
      notifications.show({
        color: "red",
        message: `Failed to ${editingResource ? "update" : "create"} resource`,
        title: "Error",
      });
    }
  };

  const handleDelete = async (resourceId: string) => {
    try {
      await deleteResourceMutation.mutateAsync({ resourceId });
      notifications.show({
        color: "green",
        message: "Resource deleted successfully",
        title: "Success",
      });
    } catch (error) {
      notifications.show({
        color: "red",
        message: "Failed to delete resource",
        title: "Error",
      });
    }
  };

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

  return (
    <>
      <Card p="lg" withBorder>
        <Group justify="space-between" mb="md">
          <Text className="font-medium text-gray-800" size="lg">
            Lesson Resources
          </Text>
          {!readonly && (
            <Button
              color="fun-green"
              leftSection={<IconPlus size={16} />}
              onClick={() => handleOpenModal()}
              size="sm"
              variant="light"
            >
              Add Resource
            </Button>
          )}
        </Group>

        {(resources?.length || 0) > 0 ? (
          <Stack gap="md">
            {resources?.map((resource) => (
              <Card className="bg-gray-50" key={resource.id} p="md" withBorder>
                <Group align="flex-start" justify="space-between">
                  <Group align="flex-start" gap="sm">
                    {getResourceIcon(resource.type)}
                    <div className="flex-1">
                      <Text className="font-medium text-gray-800" size="sm">
                        {resource.title}
                      </Text>
                      {resource.description && (
                        <Text className="text-gray-600" mt={2} size="xs">
                          {resource.description}
                        </Text>
                      )}
                      <Text className="text-gray-500" mt={2} size="xs">
                        {resource.type.charAt(0).toUpperCase() +
                          resource.type.slice(1)}
                      </Text>
                    </div>
                  </Group>

                  <Group gap="xs">
                    <Button
                      component="a"
                      href={resource.url}
                      rel="noopener noreferrer"
                      rightSection={<IconExternalLink size={12} />}
                      size="xs"
                      target="_blank"
                      variant="subtle"
                    >
                      Open
                    </Button>
                    {!readonly && (
                      <>
                        <ActionIcon
                          color="blue"
                          onClick={() => handleOpenModal(resource)}
                          size="sm"
                          variant="subtle"
                        >
                          <IconEdit size={14} />
                        </ActionIcon>
                        <ActionIcon
                          color="red"
                          onClick={() => handleDelete(resource.id)}
                          size="sm"
                          variant="subtle"
                        >
                          <IconTrash size={14} />
                        </ActionIcon>
                      </>
                    )}
                  </Group>
                </Group>
              </Card>
            ))}
          </Stack>
        ) : (
          <Alert color="gray" variant="light">
            No resources available for this lesson.
            {!readonly && " Click 'Add Resource' to get started."}
          </Alert>
        )}
      </Card>

      {/* Add/Edit Resource Modal */}
      <Modal
        onClose={handleCloseModal}
        opened={opened}
        size="md"
        title={editingResource ? "Edit Resource" : "Add Resource"}
      >
        <Stack gap="md">
          <TextInput
            label="Title"
            onChange={(event) =>
              setFormData({ ...formData, title: event.currentTarget.value })}
            placeholder="Enter resource title"
            required
            value={formData.title}
          />

          <TextInput
            label="Description"
            onChange={(event) =>
              setFormData({
                ...formData,
                description: event.currentTarget.value,
              })}
            placeholder="Brief description (optional)"
            value={formData.description}
          />

          <Select
            data={[
              { label: "PDF Document", value: "pdf" },
              { label: "External Link", value: "link" },
              { label: "Download File", value: "download" },
            ]}
            label="Type"
            onChange={(value) =>
              setFormData({
                ...formData,
                type: value as LessonResource["type"],
              })}
            required
            value={formData.type}
          />

          {formData.type === "link" ? (
            <TextInput
              label="URL"
              onChange={(event) =>
                setFormData({ ...formData, url: event.currentTarget.value })}
              placeholder="https://example.com"
              required
              value={formData.url}
            />
          ) : (
            <FileInput
              accept={formData.type === "pdf" ? ".pdf" : undefined}
              label="File"
              leftSection={<IconUpload size={16} />}
              onChange={(file) =>
                setFormData({ ...formData, file: file || undefined })}
              placeholder="Choose file to upload"
              required={!editingResource}
              value={formData.file}
            />
          )}

          <Group gap="sm" justify="flex-end" mt="md">
            <Button onClick={handleCloseModal} variant="subtle">
              Cancel
            </Button>
            <Button
              color="fun-green"
              loading={
                createResourceMutation.isPending ||
                updateResourceMutation.isPending
              }
              onClick={handleSubmit}
            >
              {editingResource ? "Update" : "Create"}
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
