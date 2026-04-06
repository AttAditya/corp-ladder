import { siteConfig } from "@/registry/site";

interface RequestJsonInit extends RequestInit {
  json?: unknown;
  token?: string | null;
}

export class ApiError extends Error {
  data: unknown;
  status: number;

  constructor(message: string, status: number, data: unknown) {
    super(message);
    this.name = "ApiError";
    this.data = data;
    this.status = status;
  }
}

function getErrorMessage(status: number, data: unknown): string {
  if (typeof data === "object" && data !== null) {
    const detail = "detail" in data ? data.detail : undefined;
    const message = "message" in data ? data.message : undefined;

    if (typeof detail === "string") {
      return detail;
    }

    if (typeof message === "string") {
      return message;
    }
  }

  return `Request failed with status ${status}.`;
}

export async function requestJson<T>(resourcePath: string, init?: RequestJsonInit): Promise<T> {
  const normalizedPath = resourcePath.startsWith("/") ? resourcePath : `/${resourcePath}`;
  const headers = new Headers(init?.headers);
  headers.set("Accept", "application/json");

  if (init?.json !== undefined) {
    headers.set("Content-Type", "application/json");
  }

  if (init?.token) {
    headers.set("Authorization", `Bearer ${init.token}`);
  }

  const url = `${siteConfig.apiBasePath}${normalizedPath}`;
  const requestBody = init?.json === undefined ? init?.body : JSON.stringify(init.json);

  console.debug(`[API] ${init?.method || "GET"} ${url}`, {
    hasBody: !!requestBody,
    headers: Object.fromEntries(headers.entries())
  });

  const response = await fetch(url, {
    ...init,
    body: requestBody,
    headers: {
      ...Object.fromEntries(headers.entries())
    }
  });

  const contentType = response.headers.get("content-type") ?? "";
  const responseData = contentType.includes("application/json") ? await response.json() : await response.text();

  console.debug(`[API] Response ${response.status}:`, {
    ok: response.ok,
    contentType,
    dataType: typeof responseData
  });

  if (!response.ok) {
    console.error(`[API] Request failed:`, responseData);
    throw new ApiError(getErrorMessage(response.status, responseData), response.status, responseData);
  }

  return responseData as T;
}
