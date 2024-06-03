import { removeUserFromGroupChat } from "../services/firebase";
import { useEffect, useState } from "react";
import { removeChatById } from "../utils/helpers";

const useLeaveChat = (chatId, setChats, leaveChat, setLeaveChat, chats) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const chat = chats.find((chat) => chat.id === chatId);
  console.log("chat", chat);
  useEffect(() => {
    if (leaveChat) {
      const fetchChats = async () => {
        try {
          setIsLoading(true);
          await removeUserFromGroupChat("4QXIEU92mtzeoxE3x9f0", chatId);
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
        }
      };

      if (chatId) {
        fetchChats();
      }
    }
  }, [chatId, leaveChat, setChats, setLeaveChat, chat]);

  return { isLoading, error };
};

export default useLeaveChat;
