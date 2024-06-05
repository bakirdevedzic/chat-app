import { useContext } from "react";

import { PiChatsCircleBold } from "react-icons/pi";
import { mainContext } from "../../context/MainContext";
import Spinner from "../../ui/Spinner";

function ChatName({ chat, leaveChatLoading }) {
  const { setShowSidebar, setLeaveChat } = useContext(mainContext);
  const name =
    chat?.type === "private" ? chat.participants[0].username : chat?.name;
  function handleLeaveChat() {
    setLeaveChat(true);
  }
  return (
    <div className="h-[4rem] bg-white pl-6  flex items-center align-middle border-b gap-4">
      <div
        className="text-2xl text-primary-indigo hidden sm:block us:block"
        onClick={() => setShowSidebar(true)}
      >
        <PiChatsCircleBold />
      </div>
      <div className="flex flex-row justify-between w-[100%] pr-10">
        <p className="text-xl font-bold ">{name}</p>
        {leaveChatLoading ? (
          <Spinner />
        ) : (
          chat?.type === "group" && (
            <button onClick={handleLeaveChat}>Leave chat</button>
          )
        )}
      </div>
    </div>
  );
}

export default ChatName;
