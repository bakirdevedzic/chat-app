import ChatName from "./ChatName";
import Messages from "./Messages";
import NewMessageBox from "./NewMessageBox";
import useSendMessage from "../../hooks/useSendMessage";
import { useContext, useState } from "react";
import { isUserInGroup } from "../../utils/helpers";
import useLoadMoreMessages from "../../hooks/useLoadMoreMessages";
import useJoinChat from "../../hooks/useJoinChat";
import Spinner from "../../ui/Spinner";
import { mainContext } from "../../context/MainContext";
import MessageToUser from "../../ui/MessageToUser";

function Chat() {
  const {
    chats,
    setChats,
    selectedPerson,
    handleNewMessage,
    userId,
    joinChat,
    setJoinChat,
    id,
    leaveChatLoading,
  } = useContext(mainContext);

  const [loadChat, setLoadChat] = useState(false);

  let isUserInChat = isUserInGroup(id, chats);
  let chat;
  if (id === "new" && selectedPerson) {
    chat = {
      ...selectedPerson,
      type: "private",
      messages: [],
      participants: [{ username: selectedPerson.username }],
    };
    isUserInChat = true;
  } else {
    chat = chats?.find((chat) => chat.id === id)
      ? chats?.find((chat) => chat.id === id)
      : { type: "group" };
  }

  const lastMessageTimestamp = chat?.messages?.length
    ? chat.messages[chat.messages.length - 1].timestamp
    : null;

  const { isLoading: loadingMessages } = useLoadMoreMessages(
    id,
    chat.type,
    lastMessageTimestamp,
    setChats,
    setLoadChat,
    loadChat,
    chats
  );

  const { isLoading: isLoading2 } = useJoinChat(
    id,
    setChats,
    joinChat,
    setJoinChat,
    handleNewMessage,
    userId
  );

  const { triggerSendMessage, loading } = useSendMessage(id, chat?.type);

  if (id === "new_user")
    return <MessageToUser message="You have successfully registered!" />;

  if (id === "logged_in") return <MessageToUser message="Welcome back!" />;

  if (isLoading2) return <Spinner />;

  if (!isUserInChat)
    return <MessageToUser message="You have no access to this chat!" />;

  return (
    <div className="grid grid-rows-[auto_1fr_90px] w-[100%] h-full sm:h-[100vh] us:h-[100vh]">
      <ChatName chat={chat} leaveChatLoading={leaveChatLoading} />

      <Messages
        chat={chat}
        setLoadChat={setLoadChat}
        loadingMessages={loadingMessages}
      />

      <NewMessageBox
        triggerSendMessage={triggerSendMessage}
        loading={loading}
      />
    </div>
  );
}

export default Chat;
