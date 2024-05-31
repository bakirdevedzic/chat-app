const MessagePreview = ({
  name = "bakir",
  message = "hello, how are you",
  time = "15:43",
}) => {
  return (
    <div className="flex items-start justify-between bg-white p-4 rounded-lg shadow-md">
      <div>
        <div className="font-bold text-gray-900">{name}</div>
        <div className="text-gray-700">{message}</div>
      </div>
      <div className="text-sm text-gray-500">{time}</div>
    </div>
  );
};

export default MessagePreview;
