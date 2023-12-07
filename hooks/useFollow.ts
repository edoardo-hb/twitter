import { useCallback, useMemo } from "react";
import useCurrentUser from "./useCurrentUser";
import { useLoginModal } from "./useLoginModal";
import useUser from "./useUser";
import toast from "react-hot-toast";
import axios from "axios";

const useFollow = (userId: string) => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { mutate: mutateFetchedUser } = useUser(userId);

  const loginModal = useLoginModal();

  const isFollowing = useMemo(() => {
    const list = currentUser?.followingIds || [];

    return list.includes(userId);
  }, [currentUser?.followingIds, userId])

  const toggleFollow = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let request;

      if (isFollowing) {
        request = () => axios.delete('/api/v1/follow', { data: { userId } });
      } else {
        request = () => axios.post('/api/v1/follow', { userId });
      }

      await request();

      mutateCurrentUser();
      mutateFetchedUser();
      toast.success('Success!');
    } catch (error) {
      toast.error('Something went wrong. Please try again later.');
    }
  }, [currentUser, isFollowing, mutateCurrentUser, mutateFetchedUser, userId, loginModal])

  return { isFollowing, toggleFollow }
}

export default useFollow;