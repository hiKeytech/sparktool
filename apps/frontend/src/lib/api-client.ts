import { getRequest } from "@tanstack/react-start/server";

export type ApiCountResponse = { count: number };
export type ApiIdResponse = { id: string };
export type ApiSuccessResponse = { success: true };

function getBackendUrl(): string {
  return process.env.BACKEND_URL ?? "http://localhost:4000";
}

export async function backendFetch<T = unknown>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const request = getRequest();
  const cookie = request.headers.get("cookie") ?? "";

  const res = await fetch(`${getBackendUrl()}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      cookie,
      ...(init?.headers as Record<string, string> | undefined),
    },
  });

  if (!res.ok) {
    const payload = await res.json().catch(() => null);
    throw new Error(
      payload?.error ?? `Backend error ${res.status}: ${res.statusText}`,
    );
  }

  const text = await res.text();
  return text ? (JSON.parse(text) as T) : (null as T);
}

export const api = {
  get: <T = unknown>(path: string) => backendFetch<T>(path),
  post: <T = unknown>(path: string, body?: unknown) =>
    backendFetch<T>(path, {
      method: "POST",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),
  patch: <T = unknown>(path: string, body?: unknown) =>
    backendFetch<T>(path, {
      method: "PATCH",
      body: body !== undefined ? JSON.stringify(body) : undefined,
    }),
  delete: <T = unknown>(path: string) =>
    backendFetch<T>(path, { method: "DELETE" }),
};
