import { useState } from "react";
import SidebarComponent from "../components/SidebarComponent";
import { useMediaQuery } from "react-responsive";
import Chat from "../components/Chat";
import useFetchChats from "../hooks/useFetchChats";
import useSendMessage from "../hooks/useSendMessage";

function AppLayout() {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarHidden = useMediaQuery({ maxWidth: 850 });
  const sidebarVisible = useMediaQuery({ minWidth: 851 });

  const [chats, setChats] = useState([]);

  const handleNewMessage = (chatId, newMessage) => {
    setChats((prevChats) => {
      const chatIndex = prevChats.findIndex((chat) => chat.id === chatId);
      if (chatIndex !== -1) {
        const chat = prevChats[chatIndex];

        const messageExists = chat.messages.some(
          (message) => message.id === newMessage.id
        );
        if (!messageExists) {
          const updatedChat = {
            ...chat,
            messages: [newMessage, ...chat.messages],
          };

          const updatedChats = [
            ...prevChats.slice(0, chatIndex),
            updatedChat,
            ...prevChats.slice(chatIndex + 1),
          ];

          return updatedChats;
        }
      }
      return prevChats;
    });
  };
  console.log(chats);

  const { triggerSendMessage, isSending, error } = useSendMessage(
    "FCYC1IgbhQxtR0MjZ5RQ",
    "group"
  );

  const { isLoading } = useFetchChats(
    "4QXIEU92mtzeoxE3x9f0",
    handleNewMessage,
    setChats
  );

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-row h-[calc(100dvh)] sm:flex sm:flex-col">
      <SidebarComponent
        showSidebar={showSidebar}
        sidebarHidden={sidebarHidden}
        sidebarVisible={sidebarVisible}
        setShowSidebar={setShowSidebar}
        chats={chats}
      />

      <div className={`flex-1 ${sidebarVisible ? "ml-[300px]" : ""}`}>
        <Chat
          setShowSidebar={setShowSidebar}
          chats={chats}
          triggerSendMessage={triggerSendMessage}
        />
      </div>
    </div>
  );
}

export default AppLayout;
