import { useContext } from "react";
import { transformMessages } from "../utils/helpers";
import Message from "./Message";

function Messages({ chat, setLoadChat }) {
  if (!chat.messages)
    return (
      <div className="h-full flex justify-center items-center align-middle">
        No messages yet
      </div>
    );
  const transformedMessages = transformMessages(chat);
  console.log(transformedMessages);

  function loadMoreMessages() {
    setLoadChat(true);
  }
  console.log(chat.messages, " ", chat.fetchedMessageAmount);

  return (
    <div className="flex flex-col overflow-y-scroll">
      {chat.messageCount > chat.fetchedMessageAmount && (
        <button className="self-start" onClick={loadMoreMessages}>
          Load more
        </button>
      )}
      <div className="flex flex-col-reverse bg-slate-50 overflow-y-scroll items-start flex-grow">
        {transformedMessages?.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
    </div>
  );
}

export default Messages;
