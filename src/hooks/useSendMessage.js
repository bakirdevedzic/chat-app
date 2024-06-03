import { useState, useEffect } from "react";
import { sendMessage } from "../services/firebase";

function useSendMessage(chatId, chatType) {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const triggerSendMessage = async (messageContent) => {
    setIsSending(true);
    setError(null);

    try {
      await sendMessage(chatId, chatType, messageContent);
    } catch (error) {
      setError(error);
    } finally {
      setIsSending(false);
    }
  };

  return { triggerSendMessage, isSending, error };
}

export default useSendMessage;
