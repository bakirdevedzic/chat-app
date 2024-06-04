import { useContext } from "react";
import { transformMessages } from "../utils/helpers";
import Message from "./Message";

function Messages({ chat, setLoadChat }) {
  if (!chat.messages || chat.messages.length === 0)
    return (
      <div className="h-full flex justify-center items-center align-middle">
        No messages yet
      </div>
    );
  const transformedMessages = transformMessages(chat);

  function loadMoreMessages() {
    setLoadChat(true);
  }

  return (
    <div className="flex flex-col-reverse bg-slate-50 overflow-y-scroll items-start flex-grow">
      {transformedMessages?.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <div className="flex justify-center w-[100%]">
        {chat.messageCount > chat.fetchedMessageAmount && (
          <button
            className="self-start p-2 text-center shadow-lg mb-6 mt-6 bg-white rounded-xl hover:bg-primary-indigo hover:text-white"
            onClick={loadMoreMessages}
          >
            Load more
          </button>
        )}
      </div>
    </div>
  );
}

export default Messages;
