function ChatName({ name }) {
  return (
    <div className="h-[4rem] bg-white pl-12 flex items-center align-middle border-b">
      <p className="text-xl font-bold ">{name}</p>
    </div>
  );
}

export default ChatName;
