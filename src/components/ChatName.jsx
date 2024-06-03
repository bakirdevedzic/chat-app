import { useContext } from "react";
import { ChatContext } from "../pages/AppLayout";

function ChatName({ name }) {
  const { setLeaveChat } = useContext(ChatContext);
  function handleLeaveChat() {
    setLeaveChat(true);
  }
  return (
    <div className="h-[4rem] bg-white pl-12 flex items-center align-middle border-b">
      <p className="text-xl font-bold ">{name}</p>
      <button onClick={handleLeaveChat}>Leave chat!</button>
    </div>
  );
}

export default ChatName;
