import { removeUserFromGroupChat } from "../services/firebase";
import { useEffect, useState } from "react";
import { removeChatById } from "../utils/helpers";

const useLeaveChat = (
  chatId,
  setChats,
  leaveChat,
  setLeaveChat,
  chats,
  userId
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const chat = chats.find((chat) => chat.id === chatId);

  useEffect(() => {
    if (leaveChat) {
      const fetchChats = async () => {
        try {
          setIsLoading(true);
          await removeUserFromGroupChat(userId, chatId);
          removeChatById(setChats, chatId);
          const addToExploreChat = {
            id: chatId,
            name: chat.name,
            type: "explore",
          };
          setChats((chats) => [...chats, addToExploreChat]);
          setLeaveChat(false);
          setIsLoading(false);
        } catch (error) {
          console.error("Error fetching user chats:", error);
          setError(error);
          setIsLoading(false);
        }
        setIsLoading(false);
      };

      if (chatId) {
        fetchChats();
      }
    }
  }, [chatId, leaveChat, setChats, setLeaveChat, chat]);

  return { isLoading, error };
};

export default useLeaveChat;
