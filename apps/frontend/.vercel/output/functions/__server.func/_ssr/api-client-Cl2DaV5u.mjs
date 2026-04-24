import { T as TSS_SERVER_FUNCTION, g as getRequest } from "./index.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
function getBackendUrl() {
  return process.env.BACKEND_URL ?? "http://localhost:4000";
}
async function backendFetch(path, init) {
  const request = getRequest();
  const cookie = request.headers.get("cookie") ?? "";
  const res = await fetch(`${getBackendUrl()}${path}`, {
    ...init,
    headers: {
      "content-type": "application/json",
      cookie,
      ...init?.headers
    }
  });
  if (!res.ok) {
    const payload = await res.json().catch(() => null);
    throw new Error(
      payload?.error ?? `Backend error ${res.status}: ${res.statusText}`
    );
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}
const api = {
  get: (path) => backendFetch(path),
  post: (path, body) => backendFetch(path, {
    method: "POST",
    body: body !== void 0 ? JSON.stringify(body) : void 0
  }),
  patch: (path, body) => backendFetch(path, {
    method: "PATCH",
    body: body !== void 0 ? JSON.stringify(body) : void 0
  }),
  delete: (path) => backendFetch(path, { method: "DELETE" })
};
export {
  api as a,
  createServerRpc as c
};
