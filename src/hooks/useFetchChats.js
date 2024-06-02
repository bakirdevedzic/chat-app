import { fetchUserChats } from "../services/firebase";
import { useEffect, useState } from "react";

const useFetchChats = (userId, handleNewMessage, setChats) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setIsLoading(true);
        const fetchedChats = await fetchUserChats(
          userId,
          handleNewMessage,
          setChats
        );
        setChats(fetchedChats);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user chats:", error);
        setError(error);
      }
      setIsLoading(false);
    };

    if (userId) {
      fetchChats();
    }
  }, [userId]);

  return { isLoading, error };
};

export default useFetchChats;
