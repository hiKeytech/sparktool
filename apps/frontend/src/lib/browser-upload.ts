import axios from "axios";

function getBrowserBackendUrl() {
  const configuredUrl = import.meta.env.VITE_BACKEND_URL;

  if (typeof configuredUrl === "string" && configuredUrl.trim()) {
    return configuredUrl.replace(/\/$/, "");
  }

  return "";
}

export async function uploadBrowserFormData<T>(input: {
  body: FormData;
  method?: "PATCH" | "POST";
  path: string;
}): Promise<T> {
  try {
    const response = await axios.request<T>({
      baseURL: getBrowserBackendUrl(),
      data: input.body,
      method: input.method ?? "POST",
      url: input.path,
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const payload = error.response?.data as
        | { error?: string; message?: string }
        | undefined;

      throw new Error(
        payload?.message ?? payload?.error ?? error.message ?? "Upload failed.",
      );
    }

    throw error instanceof Error ? error : new Error("Upload failed.");
  }
}
