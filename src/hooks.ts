import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { blockDomain, removeBlock } from "./services";

export const useDomainBlocks = () =>
  useSWR<string[]>("/api/v1/domain_blocks", {
    fallbackData: [],
  });
export const useNewBlockMutation = () =>
  useSWRMutation("/api/v1/domain_blocks", blockDomain);

export const useRemoveBlockMutation = () => {
  const { trigger } = useSWRMutation("/api/v1/domain_blocks", removeBlock, {
    rollbackOnError: true,
  });

  return { trigger };
};
