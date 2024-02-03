import { getAuthInfo } from "./auth";

export class RequestError extends Error {
  public status: number;
  info: object;

  constructor(status: number, info: object) {
    super("Request Error");

    this.status = status;
    this.info = info;
  }
}

export const getFetcher = ({ server, token } = getAuthInfo()) => {
  console.log(server);
  if (!server) {
    return undefined;
  }

  async function fetcher<T = unknown>(
    key: string,
    method: "POST",
    data?: Record<string, string> | FormData,
  ): Promise<T>;
  async function fetcher<T = unknown>(
    key: string,
    method: "GET",
    data: undefined,
  ): Promise<T>;
  async function fetcher<T = unknown>(
    key: string,
    method: "GET" | "POST" = "GET",
    data?: Record<string, string> | FormData,
  ): Promise<T> {
    const response = await fetch(`https://${server}${key}`, {
      method,
      headers: {
        Authorization: token && `Bearer ${token}`,
        Accept: "application/json, text/plain, */*",
      },
      body: data && new URLSearchParams(data as Record<string, string>),
    });

    if (response.ok) {
      return response.json();
    }

    throw new RequestError(response.status, await response.json());
  }

  return fetcher;
};
