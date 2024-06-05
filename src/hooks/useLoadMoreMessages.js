import { loadMoreMessages } from "../services/chatsFirebaseFunctions";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchExploreGroupsApi = async () => {
      try {
        setIsLoading(true);
        const participantNames = chats.find(
          (c) => c.id === chatId
        ).participants;

        const messages = await loadMoreMessages(
          chatId,
          chatType,
          lastTimestamp,
          participantNames
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
