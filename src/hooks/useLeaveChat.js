import { useEffect, useState } from "react";
import { removeChatById } from "../utils/helpers";
import toast from "react-hot-toast";
import { removeUserFromGroupChat } from "../services/userFirebaseFunctions";

const useLeaveChat = (
  chatId,
  setChats,
  leaveChat,
  setLeaveChat,
  chats,
  userId
) => {
  const [isLoading, setIsLoading] = useState(false);

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
          toast.success("Chat left successfully");
        } catch (error) {
          toast.error(error.message);
          setIsLoading(false);
        }
        setIsLoading(false);
      };

      if (chatId) {
        fetchChats();
      }
    }
  }, [chatId, leaveChat, setChats, setLeaveChat, chat]);

  return { isLoading };
};

export default useLeaveChat;
