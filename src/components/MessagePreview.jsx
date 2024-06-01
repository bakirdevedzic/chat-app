const MessagePreview = ({ chat }) => {
  const name = chat.type === "private" ? chat.participants[0] : chat.name;
  const lastMessage = chat.messages[0];
  const message = lastMessage.text;
  const timestamp = lastMessage.timestamp;
  const time = new Date(
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000
  ).toLocaleString();
  console.log(name, message, time);
  return (
    <div className="flex items-start justify-between  p-4 pl-[1.5rem] hover:bg-primary-indigo hover:bg-opacity-20 hover:cursor-pointer">
      <div>
        <div className="font-bold text-gray-900">{name}</div>
        <div className="text-gray-700">
          {message.length > 25 ? message.slice(0, 25) + "..." : message}
        </div>
      </div>
      <div className="text-sm text-primary-indigo">{time}</div>
    </div>
  );
};

export default MessagePreview;
