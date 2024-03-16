import { useSWRConfig } from "swr";

const useMatchMutate = () => {
  const { cache, mutate } = useSWRConfig();
  if (!(cache instanceof Map)) {
    throw new Error(
      "matchMutate requires the cache provider to be a Map instance"
    );
  }

  return (matcher: RegExp, ...args: any[]) =>
    Promise.all(
      Array.from(cache.keys())
        .filter((key) => matcher.test(key))
        .map((key) => mutate(key, ...args))
    );
};

export default useMatchMutate;
