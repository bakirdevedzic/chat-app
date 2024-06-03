import { useParams } from "react-router-dom";

import ChatName from "./ChatName";
import Messages from "./Messages";
import NewMessageBox from "./NewMessageBox";
import useSendMessage from "../hooks/useSendMessage";
import { useContext } from "react";
import { ChatContext } from "../pages/AppLayout";
import { isUserInGroup } from "../utils/helpers";

function Chat() {
  const { chats } = useContext(ChatContext);
  const { id } = useParams();

  const isUserInChat = isUserInGroup(id, chats);

  const chat = chats?.find((chat) => chat.id === id);

  const { triggerSendMessage } = useSendMessage(id, chat?.type);
  const name =
    chat?.type === "private" ? chat.participants[0].username : chat?.name;
  if (!isUserInChat)
    return (
      <div className="h-full flex justify-center items-center align-middle text-2xl font-bold text-gray-600 text-center">
        You have no access to this chat!
      </div>
    );
  return (
    <div className="grid grid-rows-[auto_1fr_90px] w-[100%] h-full">
      <ChatName chat={chat} />
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
