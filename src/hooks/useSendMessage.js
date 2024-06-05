import { useState, useContext } from "react";
import { sendMessage } from "../services/firebase";

import { mainContext } from "../context/MainContext";
import toast from "react-hot-toast";

function useSendMessage(chatId, chatType) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useContext(mainContext);
  const triggerSendMessage = async (messageContent) => {
    setError(null);

    try {
      setLoading(true);
      await sendMessage(chatId, chatType, messageContent, userId);
      setLoading(false);
    } catch (error) {
      setError(error);
      toast.error(error.message);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return { triggerSendMessage, error, loading };
}

export default useSendMessage;
