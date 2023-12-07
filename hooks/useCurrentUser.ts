import useSWR from "swr";
import fetcher from "~/lib/fetcher";

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/v1/current', fetcher);

  return {
    data,
    isLoading,
    error,
    mutate
  }
}

export default useCurrentUser;