import { fetchExploreGroups, fetchUserChats } from "../services/firebase";
import { useEffect, useState } from "react";

const useFetchExploreGroups = (userId, setChats) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExploreGroupsApi = async () => {
      try {
        setIsLoading(true);
        const fetchedExploreGroups = await fetchExploreGroups(userId);

        setChats((chats) => [...chats, ...fetchedExploreGroups]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching explore groups:", error);
        setError(error);
      }
      setIsLoading(false);
    };

    if (userId) {
      fetchExploreGroupsApi();
    }
  }, [userId, setChats]);

  return { isLoading, error };
};

export default useFetchExploreGroups;
