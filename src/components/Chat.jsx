import { useParams } from "react-router-dom";

import ChatName from "./ChatName";
import Messages from "./Messages";
import NewMessageBox from "./NewMessageBox";

function Chat({ setShowSidebar, chats, triggerSendMessage }) {
  const { id } = useParams();

  const chat = chats.find((chat) => chat.id === id);
  const name =
    chat.type === "private" ? chat.participants[0].username : chat.name;
  return (
    <div className="grid grid-rows-[auto_1fr_90px] w-[100%] h-full">
      <ChatName name={name} />
      <Messages chat={chat} />
      <NewMessageBox triggerSendMessage={triggerSendMessage} />
    </div>
  );
}

export default Chat;
{
  /* <button onClick={() => setShowSidebar(true)} className="text-white">
        Show sidebar
      </button> */
}
