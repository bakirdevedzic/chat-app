import { createContext, useState } from "react";
import AppLayout from "../pages/AppLayout";
import useSearchPerson from "../hooks/useSearchPerson";
import useFetchChats from "../hooks/useFetchChats";
import useLeaveChat from "../hooks/useLeaveChat";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { auth } from "../firebase";

export const mainContext = createContext();

function MainContextProvider() {
  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarHidden = useMediaQuery({ maxWidth: 850 });
  const sidebarVisible = useMediaQuery({ minWidth: 851 });
  const { id } = useParams();

  const user = auth.currentUser;
  const userId = user?.uid ? user?.uid : "";

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

  const { isLoading: isLoading3 } = useLeaveChat(
    id,
    setChats,
    leaveChat,
    setLeaveChat,
    chats,
    userId
  );

  const { isLoading } = useFetchChats(userId, handleNewMessage, setChats);

  const {
    search,
    setSearch,
    loading: loading4,
    people,
    selectedPerson,
    setSelectedPerson,
    setPeople,
  } = useSearchPerson();
  console.log(sidebarVisible);

  return (
    <mainContext.Provider
      value={{
        chats,
        setChats,
        setShowSidebar,
        showSidebar,
        sidebarVisible,
        sidebarHidden,
        userId,
        setLeaveChat,
        search,
        setSearch,
        people,
        setPeople,
        selectedPerson,
        setSelectedPerson,
        handleNewMessage,
        setJoinChat,
        joinChat,
      }}
    >
      <AppLayout />
    </mainContext.Provider>
  );
}

export default MainContextProvider;
