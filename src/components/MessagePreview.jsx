const MessagePreview = ({
  name = "bakir",
  message = "hello, how are you",
  time = "15:43",
}) => {
  return (
    <div className="flex items-start justify-between  p-4 pl-[1.5rem] hover:bg-slate-300 hover:cursor-pointer">
      <div>
        <div className="font-bold text-gray-900">{name}</div>
        <div className="text-gray-700">{message}</div>
      </div>
      <div className="text-sm text-primary-indigo">{time}</div>
    </div>
  );
};

export default MessagePreview;
