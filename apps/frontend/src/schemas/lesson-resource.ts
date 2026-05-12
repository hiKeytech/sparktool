import type { LessonResource } from "@/types";
import { uploadBrowserFormData } from "@/lib/browser-upload";

export const lessonResource = {
  create: async (variables: {
    file?: File;
    resourceData: Omit<LessonResource, "createdAt" | "id" | "updatedAt"> &
      Record<string, unknown>;
  }) => {
    const formData = new FormData();
    formData.set("resourceData", JSON.stringify(variables.resourceData));

    if (variables.file) {
      formData.set("file", variables.file);
    }

    return uploadBrowserFormData<string>({
      body: formData,
      path: "/api/lesson-resources",
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
    const formData = new FormData();
    formData.set("resourceData", JSON.stringify(variables.resourceData));

    if (variables.file) {
      formData.set("file", variables.file);
    }

    return uploadBrowserFormData<string>({
      body: formData,
      method: "PATCH",
      path: `/api/lesson-resources/${variables.resourceId}`,
    });
  },
};
