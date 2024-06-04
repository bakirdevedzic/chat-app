import { useContext, useEffect, useState } from "react";
import {
  createPrivateChat,
  fetchChatAndAddListener,
} from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../pages/AppLayout";

function useCreatePrivateChat(
  userId,
  personId,
  message,
  setChats,
  createNewChat,
  setCreateNewChat,
  onNewMessage
) {
  const { setPeople, setSelectedPerson } = useContext(ChatContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function createChat() {
      console.log("message2", message);
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
