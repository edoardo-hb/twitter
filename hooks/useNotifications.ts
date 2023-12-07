import useSWR from 'swr';

import fetcher from '~/lib/fetcher';

const useNotifications = (userId?: string) => {
  const url = userId ? `/api/v1/notifications/${userId}` : null;
  const { data, error, isLoading, mutate } = useSWR(url, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate
  }
};

export default useNotifications;