import { getFetcher } from "./helpers/request";

const fetcher = getFetcher();

export const blockDomain = (url: string, { arg }: { arg: FormData }) =>
  fetcher(url, "POST", arg);

export const removeBlock = (url: string, { arg: domain }: { arg: string }) =>
  fetcher(url, "DELETE", { domain });
