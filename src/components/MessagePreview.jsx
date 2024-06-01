const MessagePreview = ({
  name = "bakir",
  message = "hello, are you good my friend??",
  time = "15:43",
}) => {
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
