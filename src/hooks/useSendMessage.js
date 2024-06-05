import { useState, useContext } from "react";
import { sendMessage } from "../services/firebase";

import { mainContext } from "../context/MainContext";
import toast from "react-hot-toast";

function useSendMessage(chatId, chatType) {
  const [isSending, setIsSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useContext(mainContext);
  const triggerSendMessage = async (messageContent) => {
    setIsSending(true);
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
      setIsSending(false);
    }
  };

  return { triggerSendMessage, isSending, error, loading };
}

export default useSendMessage;
