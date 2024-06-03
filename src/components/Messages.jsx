import { transformMessages } from "../utils/helpers";
import Message from "./Message";

function Messages({ chat }) {
  if (!chat.messages)
    return (
      <div className="h-full flex justify-center items-center align-middle">
        No messages yet
      </div>
    );
  const transformedMessages = transformMessages(chat);
  console.log(transformedMessages);

  return (
    <div className="flex flex-col-reverse bg-slate-50 overflow-y-scroll">
      {transformedMessages?.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
}

export default Messages;
