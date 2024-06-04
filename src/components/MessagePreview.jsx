import { useNavigate } from "react-router-dom";
import { setSeen } from "../utils/helpers";
import { useContext } from "react";
import { ChatContext } from "../pages/AppLayout";

const MessagePreview = ({ chat, setActiveTab, isSearch }) => {
  const { userId, chats, setChats, setJoinChat, setSelectedPerson } =
    useContext(ChatContext);
  const navigate = useNavigate();

  const name = isSearch
    ? chat.username
    : chat.type === "private"
    ? chat.participants[0].username
    : chat.name;

  const isExplore = chat.type === "explore";

  function handleOnClick() {
    if (!isExplore) {
      navigate(`/chat/${chat.id}`);
      setSeen(chat, setChats, chat.id);
    } else {
      setJoinChat(true);
      setActiveTab("Groups");
    }
  }

  function handlePersonClick() {
    if (isSearch) {
      navigate("/chat/new");
      setSelectedPerson(chat);
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
      {isExplore ? (
        <button onClick={handleOnClick}>Click to join!</button>
      ) : null}
    </div>
  );
};

export default MessagePreview;
