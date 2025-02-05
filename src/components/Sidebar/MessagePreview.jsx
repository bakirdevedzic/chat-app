import { useNavigate } from "react-router-dom";
import { hasPrivateChat } from "../../utils/helpers";
import { useContext } from "react";
import { mainContext } from "../../context/MainContext";

const MessagePreview = ({ chat, setActiveTab, isSearch }) => {
  const { chats, setJoinChat, setSelectedPerson } = useContext(mainContext);
  const navigate = useNavigate();

  const name = isSearch
    ? chat.username
    : chat.type === "private"
    ? chat.participants[0].username
    : chat.name;

  function handleOnClick() {
    setJoinChat(true);
    setActiveTab("Groups");
  }

  function handlePersonClick() {
    if (isSearch && !hasPrivateChat(chats, chat.id)) {
      navigate("/chat/new");
      setSelectedPerson(chat);
    } else if (isSearch && hasPrivateChat(chats, chat.id)) {
      const chatId = chats.find((c) => c.users.includes(chat.id)).id;
      navigate(`/chat/${chatId}`);
    } else {
      navigate(`/chat/${chat.id}`);
    }
  }

  return (
    <div
      className="flex items-start justify-between  p-4 pl-[1.5rem] hover:bg-primary-indigo hover:bg-opacity-20 hover:cursor-pointer border-b"
      onClick={handlePersonClick}
    >
      <div className="font-bold text-gray-900">{name}</div>
      {chat.type === "explore" ? (
        <button onClick={handleOnClick}>Click to join</button>
      ) : null}
    </div>
  );
};

export default MessagePreview;
