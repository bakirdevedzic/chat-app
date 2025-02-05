import { createContext, useState } from "react";
import AppLayout from "../pages/AppLayout";
import useSearchPerson from "../hooks/useSearchPerson";
import useFetchChats from "../hooks/useFetchChats";
import useLeaveChat from "../hooks/useLeaveChat";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { auth } from "../firebase";
import { transformMessage } from "../utils/helpers";
import useFetchUserData from "../hooks/useFetchUserData";

export const mainContext = createContext();

function MainContextProvider() {
  const { id } = useParams();
  const [showSidebar, setShowSidebar] = useState(false);
  const [chats, setChats] = useState([]);
  const [joinChat, setJoinChat] = useState(false);
  const [leaveChat, setLeaveChat] = useState(false);

  const sidebarHidden = useMediaQuery({ maxWidth: 850 });
  const sidebarVisible = useMediaQuery({ minWidth: 851 });

  const user = auth.currentUser;
  const userId = user?.uid;

  const { userData } = useFetchUserData(userId);

  const handleNewMessage = (chatId, newMessage) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId &&
        !chat.messages.some((message) => message.id === newMessage.id)
          ? {
              ...chat,
              newMessage: true,
              messages: [
                transformMessage(newMessage, chat.participants),
                ...chat.messages,
              ],
            }
          : chat
      )
    );
  };

  const { isLoading: leaveChatLoading } = useLeaveChat(
    id,
    setChats,
    leaveChat,
    setLeaveChat,
    chats,
    userId
  );

  const { isLoading: chatsLoading } = useFetchChats(
    userId,
    handleNewMessage,
    setChats
  );

  const {
    search,
    setSearch,
    loading: searchLoad,
    people,
    selectedPerson,
    setSelectedPerson,
    setPeople,
  } = useSearchPerson();

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
        id,
        leaveChatLoading,
        searchLoad,
        chatsLoading,
        userData,
      }}
    >
      <AppLayout />
    </mainContext.Provider>
  );
}

export default MainContextProvider;
