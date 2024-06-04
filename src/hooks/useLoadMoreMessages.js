import { loadMoreMessages } from "../services/firebase";
import { useEffect, useState } from "react";
import { appendMessagesToChat } from "../utils/helpers";

const useLoadMoreMessages = (
  chatId,
  chatType,
  lastTimestamp,
  setChats,
  setLoadChat,
  loadChat,
  chats
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExploreGroupsApi = async () => {
      try {
        setIsLoading(true);
        const messages = await loadMoreMessages(
          chatId,
          chatType,
          lastTimestamp
        );

        appendMessagesToChat(chats, setChats, chatId, messages);
        setLoadChat(false);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching explore groups:", error);
        setError(error);
        setLoadChat(false);
      }
      setIsLoading(false);
    };

    if (loadChat) {
      fetchExploreGroupsApi();
    }
  }, [setLoadChat, loadChat]);

  return { isLoading, error };
};

export default useLoadMoreMessages;
