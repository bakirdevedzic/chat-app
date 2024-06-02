import { fetchUserChats } from "../services/firebase";
import { useEffect, useState } from "react";

const useFetchChats = (userId, handleNewMessage) => {
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setIsLoading(true);
        const fetchedChats = await fetchUserChats(userId, handleNewMessage);
        setChats(fetchedChats);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user chats:", error);
        setError(error);
        setIsLoading(false);
      }
      setIsLoading(false);
    };

    if (userId) {
      fetchChats();
    }
  }, []);

  return { isLoading, chats, error };
};

export default useFetchChats;
