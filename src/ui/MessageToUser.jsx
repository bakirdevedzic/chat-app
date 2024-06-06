import { useContext } from "react";
import { mainContext } from "../context/MainContext";
import { PiChatsCircleBold } from "react-icons/pi";

function MessageToUser({ message }) {
  const { setShowSidebar, setLeaveChat } = useContext(mainContext);
  return (
    <div className="h-full flex flex-col justify-center items-center align-middle text-2xl font-bold text-gray-600 text-center">
      {message}
      <div
        className="text-2xl text-primary-indigo hidden sm:block us:block"
        onClick={() => setShowSidebar(true)}
      >
        <PiChatsCircleBold />
      </div>
    </div>
  );
}

export default MessageToUser;
