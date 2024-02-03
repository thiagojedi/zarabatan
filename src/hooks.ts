import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { blockDomain } from "./services";

export const useDomainBlocks = () =>
  useSWR<string[]>("/api/v1/domain_blocks", {
    fallbackData: [],
  });
export const useNewBlockMutation = () =>
  useSWRMutation("/api/v1/domain_blocks", blockDomain);
