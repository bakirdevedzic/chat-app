import Spinner from "../../ui/Spinner";
import Message from "./Message";

function Messages({ chat, setLoadChat, loadingMessages }) {
  if (!chat.messages || chat.messages.length === 0)
    return (
      <div className="h-full flex justify-center items-center align-middle">
        No messages yet
      </div>
    );
  function loadMoreMessages() {
    setLoadChat(true);
  }

  return (
    <div className="flex flex-col-reverse bg-slate-50 overflow-y-scroll items-start flex-grow">
      {chat.messages?.map((message) => (
        <Message key={message.id} message={message} />
      ))}
      <div className="flex justify-center w-[100%]">
        {loadingMessages ? (
          <Spinner />
        ) : (
          chat.messageCount > chat.fetchedMessageAmount && (
            <button
              className="self-start p-2 text-center shadow-lg mb-6 mt-6 bg-white rounded-xl hover:bg-primary-indigo hover:text-white"
              onClick={loadMoreMessages}
            >
              Load more
            </button>
          )
        )}
      </div>
    </div>
  );
}

export default Messages;
