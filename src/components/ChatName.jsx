import { useContext } from "react";
import { ChatContext } from "../pages/AppLayout";

function ChatName({ chat }) {
  const name =
    chat?.type === "private" ? chat.participants[0].username : chat?.name;
  const { setLeaveChat } = useContext(ChatContext);
  function handleLeaveChat() {
    setLeaveChat(true);
  }
  return (
    <div className="h-[4rem] bg-white pl-12 flex items-center align-middle border-b">
      <div className="flex flex-row justify-between w-[100%] pr-10">
        <p className="text-xl font-bold ">{name}</p>
        {chat?.type === "group" && (
          <button onClick={handleLeaveChat}>Leave chat!</button>
        )}
      </div>
    </div>
  );
}

export default ChatName;
