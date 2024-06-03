import { useContext } from "react";
import { ChatContext } from "../pages/AppLayout";
import { PiChatsCircleBold } from "react-icons/pi";

function ChatName({ chat }) {
  const { setShowSidebar } = useContext(ChatContext);
  const name =
    chat?.type === "private" ? chat.participants[0].username : chat?.name;
  const { setLeaveChat } = useContext(ChatContext);
  function handleLeaveChat() {
    setLeaveChat(true);
  }
  return (
    <div className="h-[4rem] bg-white pl-6  flex items-center align-middle border-b gap-4">
      <div
        className="text-2xl text-primary-indigo hidden sm:block us:block"
        onClick={() => setShowSidebar(true)}
      >
        <PiChatsCircleBold />
      </div>
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
