import { useQuery } from "@tanstack/react-query";

export const useQueryHooks = (fnCallback, key) => {
  const query = useQuery({
    queryKey: [`${key}`],
    queryFn: fnCallback,
    retry: 1,
    retryDelay: 1000,
  });

  return query;
};
