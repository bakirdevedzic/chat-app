import { useNavigate } from "react-router-dom";

const MessagePreview = ({ chat }) => {
  const navigate = useNavigate();
  const name =
    chat.type === "private" ? chat.participants[0].username : chat.name;
  return (
    <div
      className="flex items-start justify-between  p-4 pl-[1.5rem] hover:bg-primary-indigo hover:bg-opacity-20 hover:cursor-pointer"
      onClick={() => navigate(`/chat/${chat.id}`)}
    >
      <div className="font-bold text-gray-900">{name}</div>
    </div>
  );
};

export default MessagePreview;
