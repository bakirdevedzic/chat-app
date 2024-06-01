import ChatName from "./ChatName";
import Messages from "./Messages";
import NewMessageBox from "./NewMessageBox";

function Chat({ setShowSidebar }) {
  return (
    <div className="grid grid-rows-[auto_1fr_90px] w-[100%] h-full">
      <ChatName />
      <Messages />
      <NewMessageBox />
    </div>
  );
}

export default Chat;
{
  /* <button onClick={() => setShowSidebar(true)} className="text-white">
        Show sidebar
      </button> */
}
