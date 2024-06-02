import { useParams } from "react-router-dom";
import Message from "./Message";

function Messages({ chat }) {
  return (
    <div className="flex flex-col-reverse bg-slate-50 overflow-y-scroll">
      {chat.messages?.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}

export default Messages;
