import ChatName from "./ChatName";
import NewMessageBox from "./NewMessageBox";

function Chat({ setShowSidebar }) {
  return (
    <div className="grid grid-rows-[auto_1fr_90px] w-[100%] bg-red-900 h-full">
      <ChatName />
      <div>Poruke</div>
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
