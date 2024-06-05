import toast from "react-hot-toast";
import {
  fetchExploreGroups,
  fetchUserChats,
} from "../services/chatsFirebaseFunctions";
import { useEffect, useState } from "react";

const useFetchChats = (userId, handleNewMessage, setChats) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setIsLoading(true);
        const fetchedChats = await fetchUserChats(userId, handleNewMessage);
        const fetchedExploreGroups = await fetchExploreGroups(userId);
        setChats(() => [...fetchedChats, ...fetchedExploreGroups]);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
      setIsLoading(false);
    };

    if (userId) {
      fetchChats();
    }
  }, [userId]);

  return { isLoading };
};

export default useFetchChats;
