import { fetchChatAndAddListener, fetchChatMessages } from "../services/firebase";
import { useEffect, useState } from "react";
import { removeChatById } from "../utils/helpers";

const useFetchChat = (chatId, setChats,onNewMessage userId) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setIsLoading(true);
        setChats((chats) => removeChatById(chatId, chats));
        const fetchedChat = await fetchChatAndAddListener(chatId, "group", onNewMessage,userId);
        setChats((chats) => [...chats, fetchedChat]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user chats:", error);
        setError(error);
      }
      setIsLoading(false);
    };

    if (chatId) {
      fetchChats();
    }
  }, [chatId]);

  return { isLoading, error };
};

export default useFetchChat;
