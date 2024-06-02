import { useState } from "react";
import { IoIosSend } from "react-icons/io";

function NewMessageBox({ triggerSendMessage }) {
  const [message, setMessage] = useState("");

  const handleSendMessage = (event) => {
    if (event.type === "keydown" && event.key === "Enter" && message.trim()) {
      // Send message on Enter key press
      triggerSendMessage(message.trim());
      setMessage("");
    } else if (event.type === "click" && message.trim()) {
      // Send message on icon click
      triggerSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="h-full bg-white flex items-center justify-center border-t">
      <div className="flex items-center w-[90%]  bg-white rounded-lg px-4 py-2 ">
        <input
          type="text"
          placeholder="Send message"
          value={message}
          onChange={handleChange}
          onKeyDown={handleSendMessage}
          className="border-2 outline-none bg-gray-200 rounded-lg w-full h-14 py-3 px-4 mr-2 focus:ring-[1px] focus:ring-primary-indigo"
        />
        <div
          className="text-3xl flex justify-center items-center text-white w-12 h-12 bg-indigo-700 rounded-full hover:cursor-pointer"
          onClick={handleSendMessage} // Maintain click handler
        >
          <IoIosSend />
        </div>
      </div>
    </div>
  );
}

export default NewMessageBox;
