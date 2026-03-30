import type { LessonResource } from "@/types";

type SerializedLessonResourceFile = {
  dataUrl: string;
  name: string;
  size: number;
  type: string;
};

async function serializeLessonResourceFile(
  file?: File,
): Promise<SerializedLessonResourceFile | undefined> {
  if (!file) {
    return undefined;
  }

  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => {
      reject(reader.error ?? new Error("Failed to read resource file."));
    };

    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new Error("Failed to read resource file."));
        return;
      }

      resolve(reader.result);
    };

    reader.readAsDataURL(file);
  });

  return {
    dataUrl,
    name: file.name,
    size: file.size,
    type: file.type,
  };
}

export const lessonResource = {
  create: async (variables: {
    file?: File;
    resourceData: Omit<LessonResource, "createdAt" | "id" | "updatedAt"> &
      Record<string, unknown>;
  }) => {
    const { createLessonResourceFn } =
      await import("@/server/lesson-resources");
    return createLessonResourceFn({
      data: {
        file: await serializeLessonResourceFile(variables.file),
        resourceData: variables.resourceData,
      },
    });
  },

  delete: async (variables: { resourceId: string }) => {
    const { deleteLessonResourceFn } =
      await import("@/server/lesson-resources");
    return deleteLessonResourceFn({ data: variables });
  },

  get: async (resourceId: string) => {
    const { getLessonResourceFn } = await import("@/server/lesson-resources");
    return getLessonResourceFn({ data: resourceId });
  },

  list: async (lessonId: string) => {
    const { listLessonResourcesFn } = await import("@/server/lesson-resources");
    return listLessonResourcesFn({ data: lessonId });
  },

  update: async (variables: {
    file?: File;
    resourceData: Partial<LessonResource>;
    resourceId: string;
  }) => {
    const { updateLessonResourceFn } =
      await import("@/server/lesson-resources");
    return updateLessonResourceFn({
      data: {
        file: await serializeLessonResourceFile(variables.file),
        resourceData: variables.resourceData,
        resourceId: variables.resourceId,
      },
    });
  },
};
