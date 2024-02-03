import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { blockDomain, removeBlock } from "./services";
import useSWRImmutable from "swr/immutable";
import { getAuthInfo } from "./helpers/auth";

export const useAppConfig = () => {
  const { data, mutate } = useSWRImmutable("app-config", () => getAuthInfo());

  return { config: data, refreshConfig: () => mutate() };
};

export const useDomainBlocks = () => useSWR<string[]>("/api/v1/domain_blocks");

export const useNewBlockMutation = () =>
  useSWRMutation("/api/v1/domain_blocks", blockDomain);

export const useRemoveBlockMutation = () => {
  const { trigger } = useSWRMutation("/api/v1/domain_blocks", removeBlock, {
    rollbackOnError: true,
  });

  return { trigger };
};
