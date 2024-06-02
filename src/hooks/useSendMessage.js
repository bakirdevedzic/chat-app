import { useState, useEffect } from "react";
import { sendMessage } from "../services/firebase";

function useSendMessage(chatId, chatType) {
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const triggerSendMessage = async (messageContent) => {
    setIsSending(true);
    setError(null);

    try {
      await sendMessage(chatId, chatType, messageContent); // Call your original function
      console.log("Message sent successfully");
    } catch (error) {
      console.error("Error sending message:", error);
      setError(error); // Store error for handling
    } finally {
      setIsSending(false);
    }
  };

  return { triggerSendMessage, isSending, error }; // Return renamed function
}

export default useSendMessage;
