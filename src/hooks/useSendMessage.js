import { useState, useEffect, useContext } from "react";
import { sendMessage } from "../services/firebase";

import { mainContext } from "../context/MainContext";

function useSendMessage(chatId, chatType) {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const { userId } = useContext(mainContext);
  const triggerSendMessage = async (messageContent) => {
    setIsSending(true);
    setError(null);

    try {
      await sendMessage(chatId, chatType, messageContent, userId);
    } catch (error) {
      setError(error);
    } finally {
      setIsSending(false);
    }
  };

  return { triggerSendMessage, isSending, error };
}

export default useSendMessage;
