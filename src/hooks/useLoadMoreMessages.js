import { loadMoreMessages } from "../services/firebase";
import { useEffect, useState } from "react";
import { appendMessagesToChat } from "../utils/helpers";
import toast from "react-hot-toast";

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
        toast.error(error.message);
        setLoadChat(false);
      }
      setIsLoading(false);
    };

    if (loadChat) {
      fetchExploreGroupsApi();
    }
  }, [setLoadChat, loadChat]);

  return { isLoading };
};

export default useLoadMoreMessages;
