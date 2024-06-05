import toast from "react-hot-toast";
import { fetchExploreGroups, fetchUserChats } from "../services/firebase";
import { useEffect, useState } from "react";

const useFetchExploreGroups = (userId, setChats) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExploreGroupsApi = async () => {
      try {
        setIsLoading(true);
        const fetchedExploreGroups = await fetchExploreGroups(userId);

        setChats((chats) => [...chats, ...fetchedExploreGroups]);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
      setIsLoading(false);
    };

    if (userId) {
      fetchExploreGroupsApi();
    }
  }, [userId, setChats]);

  return { isLoading };
};

export default useFetchExploreGroups;
