function Chat({ setShowSidebar }) {
  return (
    <div className="w-[100%] bg-red-900 h-full">
      <button onClick={() => setShowSidebar(true)} className="text-white">
        Show sidebar
      </button>
    </div>
  );
}

export default Chat;
