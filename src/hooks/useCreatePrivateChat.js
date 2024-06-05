import { useContext, useEffect, useState } from "react";
import {
  createPrivateChat,
  fetchChatAndAddListener,
} from "../services/chatsFirebaseFunctions";
import { useNavigate } from "react-router-dom";
import { mainContext } from "../context/MainContext";
import toast from "react-hot-toast";

function useCreatePrivateChat(
  userId,
  personId,
  message,
  setChats,
  createNewChat,
  setCreateNewChat,
  onNewMessage
) {
  const { setPeople, setSelectedPerson } = useContext(mainContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function createChat() {
      try {
        setLoading(true);
        const chatId = await createPrivateChat(userId, personId, message);
        const fetchChat = await fetchChatAndAddListener(
          chatId,
          "private",
          onNewMessage,
          userId
        );
        setCreateNewChat(false);
        setChats((prevChats) => [...prevChats, fetchChat]);
        navigate(`/chat/${chatId}`);
        setPeople([]);
        setSelectedPerson(null);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
        setLoading(false);
      }
      setLoading(false);
    }
    if (createNewChat) createChat();
  }, [
    createNewChat,
    setChats,
    setCreateNewChat,
    message,
    navigate,
    userId,
    personId,
    onNewMessage,
    setPeople,
    setSelectedPerson,
  ]);

  return { loading };
}

export default useCreatePrivateChat;
