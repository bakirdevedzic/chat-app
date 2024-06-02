import { addUserToGroupChat, fetchChatMessages } from "../services/firebase";
import { useEffect, useState } from "react";

const useJoinChat = (chatId, setChats, joinChat, setJoinChat) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (joinChat) {
      const fetchChats = async () => {
        try {
          setIsLoading(true);
          const fetchedChat = await fetchChatMessages(chatId, "group");
          await addUserToGroupChat("4QXIEU92mtzeoxE3x9f0", chatId);
          setChats((chats) => [...chats, fetchedChat]);
          setJoinChat(false);
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
  }, [chatId, joinChat, setChats, setJoinChat]);

  return { isLoading, error };
};

export default useJoinChat;
