import useSWR from "swr";
import fetcher from "~/lib/fetcher";

const usePosts = (userId?: string) => {
  const url = userId ? `/api/v1/posts?userId=${userId}` : '/api/v1/posts';

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    isLoading,
    error,
    mutate
  }
}

export default usePosts;