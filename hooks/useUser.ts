import useSWR from "swr";
import fetcher from "~/lib/fetcher";

const useUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(userId ? `/api/v1/users/${userId}` : null, fetcher);

  return {
    data,
    isLoading,
    error,
    mutate
  }
}

export default useUser;