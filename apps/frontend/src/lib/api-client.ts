import axios from "axios";
import { getRequest } from "@tanstack/react-start/server";

export type ApiCountResponse = { count: number };
export type ApiIdResponse = { id: string };
export type ApiSuccessResponse = { success: true };

function getBackendUrl(request: Request): string {
  const configuredUrl = process.env.BACKEND_URL?.trim();

  if (configuredUrl) {
    return configuredUrl.replace(/\/$/, "");
  }

  return new URL(request.url).origin;
}

type BackendRequestInit = {
  data?: unknown;
  headers?: Record<string, string>;
  method?: "DELETE" | "GET" | "PATCH" | "POST";
};

export async function backendFetch<T = unknown>(
  path: string,
  init?: BackendRequestInit,
): Promise<T> {
  const request = getRequest();
  const cookie = request.headers.get("cookie") ?? "";

  try {
    const response = await axios.request<T>({
      baseURL: getBackendUrl(request),
      data: init?.data,
      headers: {
        cookie,
        ...(init?.headers ?? {}),
      },
      method: init?.method ?? "GET",
      url: path,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const payload = error.response?.data as
        | { error?: string; message?: string }
        | undefined;

      throw new Error(
        payload?.error ??
          payload?.message ??
          error.message ??
          "Backend request failed.",
      );
    }

    throw error instanceof Error ? error : new Error("Backend request failed.");
  }
}

export const api = {
  get: <T = unknown>(path: string) => backendFetch<T>(path),
  post: <T = unknown>(path: string, body?: unknown) =>
    backendFetch<T>(path, {
      data: body,
      method: "POST",
    }),
  patch: <T = unknown>(path: string, body?: unknown) =>
    backendFetch<T>(path, {
      data: body,
      method: "PATCH",
    }),
  delete: <T = unknown>(path: string) =>
    backendFetch<T>(path, { method: "DELETE" }),
};
