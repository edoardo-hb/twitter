import useSWR from "swr";
import fetcher from "~/lib/fetcher";

const usePost = (postId: string) => {
  const url = postId ? `/api/v1/posts/${postId}` : null;

  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    isLoading,
    error,
    mutate
  }
}

export default usePost;