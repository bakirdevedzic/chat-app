import { useState, useEffect, useContext } from "react";
import { IoIosSend } from "react-icons/io";
import useCreatePrivateChat from "../hooks/useCreatePrivateChat";
import { mainContext } from "../context/MainContext";
import Spinner from "../ui/Spinner";

function NewMessageBox({ triggerSendMessage, loading }) {
  const { selectedPerson, userId, setChats, handleNewMessage } =
    useContext(mainContext);
  const [message, setMessage] = useState("");
  const [isSendingDisabled, setIsSendingDisabled] = useState(false);
  const [createNewChat, setCreateNewChat] = useState(false);
  const [messageNewChat, setMessageNewChat] = useState("");

  useCreatePrivateChat(
    userId,
    selectedPerson?.id,
    messageNewChat,
    setChats,
    createNewChat,
    setCreateNewChat,
    handleNewMessage
  );

  useEffect(() => {
    if (isSendingDisabled) {
      const timer = setTimeout(() => {
        setIsSendingDisabled(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSendingDisabled]);

  const handleSendMessage = (event) => {
    if (
      (event.type === "keydown" && event.key === "Enter" && message.trim()) ||
      (event.type === "click" && message.trim())
    ) {
      if (!isSendingDisabled) {
        if (selectedPerson) {
          setMessageNewChat(message);
          setCreateNewChat(true);
        }
        triggerSendMessage(message.trim());
        setMessage("");
        setIsSendingDisabled(true);
      }
    }
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="h-full bg-white flex items-center justify-center border-t">
      <div className="flex items-center w-[90%] bg-white rounded-lg px-4 py-2">
        <input
          type="text"
          placeholder="Send message"
          value={message}
          onChange={handleChange}
          onKeyDown={handleSendMessage}
          className="border-2 outline-none bg-gray-200 rounded-lg w-full h-14 py-3 px-4 mr-2 focus:ring-[1px] focus:ring-primary-indigo"
          disabled={isSendingDisabled}
        />
        <div
          className={`text-3xl flex justify-center items-center text-white w-12 h-12 ${
            isSendingDisabled ? "bg-gray-400" : "bg-indigo-700"
          } rounded-full hover:cursor-pointer`}
          onClick={handleSendMessage}
          style={{ pointerEvents: isSendingDisabled ? "none" : "auto" }}
        >
          {loading ? <Spinner /> : <IoIosSend />}
        </div>
      </div>
    </div>
  );
}

export default NewMessageBox;
