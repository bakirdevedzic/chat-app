function Message({ message }) {
  return (
    <div className="w-full bg-transparent p-4 border-t">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-sm font-medium">{message.sender}</span>
        <span>&middot;</span>
        <span className="text-xs text-gray-500">{message.time}</span>
      </div>
      <p className="text-base">{message.text}</p>
    </div>
  );
}

export default Message;
