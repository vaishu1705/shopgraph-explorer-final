/**
 * Thin API layer. Today every service resolves mock data.
 * When the FastAPI backend is ready, set VITE_API_BASE_URL and replace the
 * `mock()` calls inside each service with `request<T>(path)`.
 */
export const API_BASE_URL = import.meta.env["VITE_API_BASE_URL"] ?? "";

const LATENCY_MS = 320;

export class ApiError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

/** Resolves mock data with a small delay so loading states are real. */
export function mock<T>(data: T, delay = LATENCY_MS): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(data), delay));
}

/** Reserved for the real backend: GET /api/... */
export async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new ApiError(`Request failed: ${path}`, res.status);
  return (await res.json()) as T;
}
