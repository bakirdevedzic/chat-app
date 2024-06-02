import { useState } from "react";
import { IoIosSend } from "react-icons/io";

function NewMessageBox({ triggerSendMessage }) {
  const [message, setMessage] = useState("");
  const handleSendMessage = () => {
    triggerSendMessage(message);
  };
  return (
    <div className="h-full bg-white flex items-center justify-center border-t">
      <div className="flex items-center w-[90%]  bg-white rounded-lg px-4 py-2 ">
        <input
          type="text"
          placeholder="Send message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border-2 outline-none bg-gray-200 rounded-lg w-full h-14 py-3 px-4 mr-2 focus:ring-[1px] focus:ring-primary-indigo"
        />
        <div
          className="text-3xl flex justify-center items-center text-white w-12 h-12 bg-indigo-700 rounded-full hover:cursor-pointer"
          onClick={handleSendMessage}
        >
          <IoIosSend />
        </div>
      </div>
    </div>
  );
}

export default NewMessageBox;
