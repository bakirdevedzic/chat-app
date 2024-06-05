function MessageToUser({ message }) {
  return (
    <div className="h-full flex justify-center items-center align-middle text-2xl font-bold text-gray-600 text-center">
      {message}
    </div>
  );
}

export default MessageToUser;
