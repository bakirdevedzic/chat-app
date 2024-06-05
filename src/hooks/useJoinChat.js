import { fetchChatAndAddListener } from "../services/chatsFirebaseFunctions";
import { useEffect, useState } from "react";
import { removeChatById } from "../utils/helpers";
import toast from "react-hot-toast";
import { addUserToGroupChat } from "../services/userFirebaseFunctions";

const useJoinChat = (
  chatId,
  setChats,
  joinChat,
  setJoinChat,
  onNewMessage,
  userId
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (joinChat) {
      const fetchChats = async () => {
        try {
          setIsLoading(true);
          removeChatById(setChats, chatId);

          const fetchedChat = await fetchChatAndAddListener(
            chatId,
            "group",
            onNewMessage,
            userId
          );
          await addUserToGroupChat(userId, chatId);
          setChats((chats) => [...chats, fetchedChat]);
          setJoinChat(false);
          setIsLoading(false);
          toast.success("Chat joined successfully");
        } catch (error) {
          toast.error(error.message);
          setError(error);
        }
      };

      if (chatId) {
        fetchChats();
      }
    }
  }, [chatId, joinChat, setChats, setJoinChat]);

  return { isLoading, error };
};

export default useJoinChat;
