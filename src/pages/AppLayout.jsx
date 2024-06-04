import { createContext, useState } from "react";
import SidebarComponent from "../components/SidebarComponent";
import { useMediaQuery } from "react-responsive";
import Chat from "../components/Chat";
import useFetchChats from "../hooks/useFetchChats";
import useJoinChat from "../hooks/useJoinChat";
import { useParams } from "react-router-dom";
import useLeaveChat from "../hooks/useLeaveChat";
import useSearchPerson from "../hooks/useSearchPerson";

export const ChatContext = createContext();

const userId = "4QXIEU92mtzeoxE3x9f0";

function AppLayout() {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarHidden = useMediaQuery({ maxWidth: 850 });
  const sidebarVisible = useMediaQuery({ minWidth: 851 });
  const { id } = useParams();

  const [chats, setChats] = useState([]);
  const [joinChat, setJoinChat] = useState(false);
  const [leaveChat, setLeaveChat] = useState(false);

  const handleNewMessage = (chatId, newMessage) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId &&
        !chat.messages.some((message) => message.id === newMessage.id)
          ? {
              ...chat,
              newMessage: true,
              messages: [newMessage, ...chat.messages],
            }
          : chat
      )
    );
  };
  const { isLoading: isLoading2 } = useJoinChat(
    id,
    setChats,
    joinChat,
    setJoinChat,
    chats,
    handleNewMessage,
    "4QXIEU92mtzeoxE3x9f0"
  );

  const { isLoading: isLoading3 } = useLeaveChat(
    id,
    setChats,
    leaveChat,
    setLeaveChat,
    chats,
    chats
  );

  const { isLoading } = useFetchChats(
    "4QXIEU92mtzeoxE3x9f0",
    handleNewMessage,
    setChats
  );

  const {
    search,
    setSearch,
    loading: loading4,
    people,
    selectedPerson,
    setSelectedPerson,
    setPeople,
  } = useSearchPerson();

  if (isLoading && isLoading2 && isLoading3) return <div>Loading...</div>;

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        setShowSidebar,
        showSidebar,
        sidebarVisible,
        sidebarHidden,
        userId,
        setJoinChat,
        setLeaveChat,
        search,
        setSearch,
        people,
        setPeople,
        selectedPerson,
        setSelectedPerson,
        handleNewMessage,
      }}
    >
      <div className="flex flex-row h-[calc(100dvh)] sm:flex sm:flex-col">
        <SidebarComponent />

        <div className={`flex-1 ${sidebarVisible ? "ml-[300px]" : ""}`}>
          <Chat />
        </div>
      </div>
    </ChatContext.Provider>
  );
}

export default AppLayout;
