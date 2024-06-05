import { fetchChatAndAddListener, fetchChatMessages } from "../services/firebase";
import { useEffect, useState } from "react";
import { removeChatById } from "../utils/helpers";
import toast from "react-hot-toast";

const useFetchChat = (chatId, setChats,onNewMessage userId) => {
  const [isLoading, setIsLoading] = useState(true);
 

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
        toast.error(error.message);
      }
      setIsLoading(false);
    };

    if (chatId) {
      fetchChats();
    }
  }, [chatId]);

  return { isLoading };
};

export default useFetchChat;
