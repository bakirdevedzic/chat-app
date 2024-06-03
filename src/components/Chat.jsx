import { useParams } from "react-router-dom";

import ChatName from "./ChatName";
import Messages from "./Messages";
import NewMessageBox from "./NewMessageBox";
import useSendMessage from "../hooks/useSendMessage";
import { useContext, useState } from "react";
import { ChatContext } from "../pages/AppLayout";
import { isUserInGroup } from "../utils/helpers";
import useLoadMoreMessages from "../hooks/useLoadMoreMessages";

function Chat() {
  const { chats, setChats } = useContext(ChatContext);
  const [loadChat, setLoadChat] = useState(false);
  const { id } = useParams();

  const isUserInChat = isUserInGroup(id, chats);

  const chat = chats?.find((chat) => chat.id === id)
    ? chats?.find((chat) => chat.id === id)
    : { type: "group" };

  const lastMessageTimestamp = chat?.messages?.length
    ? chat.messages[chat.messages.length - 1].timestamp
    : null;
  const { loading } = useLoadMoreMessages(
    id,
    chat.type,
    lastMessageTimestamp,
    setChats,
    setLoadChat,
    loadChat,
    chats
  );

  const { triggerSendMessage } = useSendMessage(id, chat?.type);
  if (!isUserInChat)
    return (
      <div className="h-full flex justify-center items-center align-middle text-2xl font-bold text-gray-600 text-center">
        You have no access to this chat!
      </div>
    );
  return (
    <div className="grid grid-rows-[auto_1fr_90px] w-[100%] h-full sm:h-[100vh] us:h-[100vh]">
      <ChatName chat={chat} />

      <Messages chat={chat} setLoadChat={setLoadChat} />

      <NewMessageBox triggerSendMessage={triggerSendMessage} />
    </div>
  );
}

export default Chat;
